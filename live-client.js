/**
 * 实时数据客户端模块 v2
 * 多数据源自动降级：本地代理服务器 → openfootball GitHub API → 静态数据
 * 自动轮询 + 智能合并 + 积分榜实时计算
 * 
 * 数据源：
 *   1. server.js 的 /api/live/* 端点 (localhost:3001)
 *   2. openfootball/world-cup.json (GitHub raw, 免费公开, CORS支持)
 *   3. 本地静态数据 (data.js)
 */

const LiveData = (() => {
    const PROXY_URL = (typeof LotteryAPI !== 'undefined' && LotteryAPI.PROXY_URL)
        ? LotteryAPI.PROXY_URL
        : 'http://localhost:3001';

    const OPENFOOTBALL_URL = 'https://raw.githubusercontent.com/openfootball/world-cup.json/master/2026/worldcup.json';

    const POLL_INTERVAL = 60 * 1000;   // 60秒轮询
    const FAST_INTERVAL = 15 * 1000;    // 比赛进行中时15秒快速轮询

    let matchUpdates = [];
    let standingsData = null;
    let playerUpdates = [];
    let lastFetchTime = null;
    let pollingTimer = null;
    let isPolling = false;
    let matchCount = 104;
    let playedCount = 0;
    let pendingCount = 104;
    let lastSource = 'initial';
    let listeners = [];
    let hasLiveMatches = false;

    // ========== 球队名称映射：openfootball 英文 → 项目中文 ==========
    const TEAM_NAME_MAP_EN2CN = {
        'Mexico': '墨西哥', 'South Africa': '南非', 'South Korea': '韩国', 'Czech Republic': '捷克',
        'Canada': '加拿大', 'Bosnia & Herzegovina': '波黑', 'Qatar': '卡塔尔', 'Switzerland': '瑞士',
        'Brazil': '巴西', 'Morocco': '摩洛哥', 'Haiti': '海地', 'Scotland': '苏格兰',
        'United States': '美国', 'Paraguay': '巴拉圭', 'Australia': '澳大利亚', 'Turkey': '土耳其',
        'Germany': '德国', 'Curaçao': '库拉索', "Côte d'Ivoire": '科特迪瓦', 'Ecuador': '厄瓜多尔',
        'Netherlands': '荷兰', 'Japan': '日本', 'Sweden': '瑞典', 'Tunisia': '突尼斯',
        'Belgium': '比利时', 'Egypt': '埃及', 'Iran': '伊朗', 'New Zealand': '新西兰',
        'Spain': '西班牙', 'Cape Verde': '佛得角', 'Saudi Arabia': '沙特阿拉伯', 'Uruguay': '乌拉圭',
        'France': '法国', 'Senegal': '塞内加尔', 'Iraq': '伊拉克', 'Norway': '挪威',
        'Argentina': '阿根廷', 'Algeria': '阿尔及利亚', 'Austria': '奥地利', 'Jordan': '约旦',
        'Portugal': '葡萄牙', 'DR Congo': '民主刚果', 'Uzbekistan': '乌兹别克斯坦', 'Colombia': '哥伦比亚',
        'England': '英格兰', 'Croatia': '克罗地亚', 'Ghana': '加纳', 'Panama': '巴拿马',
        // 别名/变体
        'Korea Republic': '韩国', 'USA': '美国', 'Cote d\'Ivoire': '科特迪瓦',
        'Ivory Coast': '科特迪瓦',
    };

    // ========== Round → Stage 映射 ==========
    function mapStage(match) {
        const round = match.round || '';
        const group = match.group || '';
        if (group && round.startsWith('Matchday')) return 'group';
        if (round === 'Round of 32') return 'r32';
        if (round === 'Round of 16') return 'r16';
        if (round === 'Quarter-final') return 'qf';
        if (round === 'Semi-final') return 'sf';
        if (round === 'Match for third place') return '3rd';
        if (round === 'Final') return 'final';
        return 'group';
    }

    // ========== 根据球队名和阶段匹配 MATCH_REGISTRY ID ==========
    function findMatchId(homeCN, awayCN, stage, groupName) {
        if (!window.MATCH_REGISTRY) return null;

        if (stage === 'group') {
            // 小组赛：通过球队名 + 分组匹配
            const gMatch = groupName.match(/Group\s+([A-L])/i);
            const g = gMatch ? gMatch[1] : null;
            return window.MATCH_REGISTRY.find(r =>
                r.stage === 'group' &&
                r.home === homeCN && r.away === awayCN &&
                (!g || r.id.startsWith(`G${g}-`))
            )?.id || null;
        }

        // 淘汰赛：通过球队名匹配（可能包含"待定"）
        return window.MATCH_REGISTRY.find(r =>
            r.stage === stage &&
            (r.home === homeCN || r.home === '待定') &&
            (r.away === awayCN || r.away === '待定')
        )?.id || null;
    }

    function onUpdate(cb) { listeners.push(cb); }
    function notifyListeners(data) {
        listeners.forEach(cb => {
            try { cb(data); } catch (e) { /* ignore */ }
        });
    }

    // ========== 从代理服务器获取数据 ==========
    async function fetchFromProxy() {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 8000);
            const resp = await fetch(`${PROXY_URL}/api/live/all`, {
                signal: controller.signal,
                headers: { 'Accept': 'application/json' }
            });
            clearTimeout(timeout);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const result = await resp.json();
            if (result.success) return result;
        } catch (e) { /* 降级 */ }
        return null;
    }

    // ========== 从 openfootball GitHub API 获取数据 ==========
    async function fetchFromOpenfootball() {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);
            const resp = await fetch(OPENFOOTBALL_URL, {
                signal: controller.signal,
                headers: { 'Accept': 'application/json' },
                cache: 'no-cache'
            });
            clearTimeout(timeout);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json();
            if (data && data.matches) return convertOpenfootballData(data);
        } catch (e) { /* 降级到静态数据 */ }
        return null;
    }

    // ========== 转换 openfootball 数据 → 项目内部格式 ==========
    function convertOpenfootballData(data) {
        const updates = [];
        let played = 0;

        for (const m of data.matches) {
            const homeCN = TEAM_NAME_MAP_EN2CN[m.team1] || m.team1;
            const awayCN = TEAM_NAME_MAP_EN2CN[m.team2] || m.team2;
            const stage = mapStage(m);
            const groupName = m.group || '';
            const matchId = findMatchId(homeCN, awayCN, stage, groupName);

            const hasScore = m.score && m.score.ft && m.score.ft.length === 2;
            const status = hasScore ? 'played' : 'upcoming';

            if (hasScore && matchId) {
                updates.push({
                    id: matchId,
                    status: 'played',
                    homeScore: m.score.ft[0],
                    awayScore: m.score.ft[1],
                    // 附加信息（供扩展使用）
                    homeTeam: homeCN,
                    awayTeam: awayCN,
                    stage: stage,
                    htScore: m.score.ht || null,
                    goals1: m.goals1 || [],
                    goals2: m.goals2 || [],
                });
                played++;
            } else if (matchId && status === 'upcoming') {
                // 记录未开始的比赛（用于统计 pending）
            } else if (!matchId && hasScore) {
                // 淘汰赛阶段，MATCH_REGISTRY 中为"待定"的比赛
                // 尝试按 stage + 顺序匹配
                const koMatches = window.MATCH_REGISTRY
                    ? window.MATCH_REGISTRY.filter(r => r.stage === stage && r.home === '待定')
                    : [];

                if (koMatches.length > 0 && updates.filter(u => u.stage === stage).length < koMatches.length) {
                    const idx = updates.filter(u => u.stage === stage && u._koMatch).length;
                    if (idx < koMatches.length) {
                        updates.push({
                            id: koMatches[idx].id,
                            status: 'played',
                            homeScore: m.score.ft[0],
                            awayScore: m.score.ft[1],
                            homeTeam: homeCN,
                            awayTeam: awayCN,
                            stage: stage,
                            htScore: m.score.ht || null,
                            _koMatch: true,
                        });
                        // 动态更新 MATCH_REGISTRY 中的球队名
                        koMatches[idx].home = homeCN;
                        koMatches[idx].away = awayCN;
                        played++;
                    }
                }
            }
        }

        // 计算积分榜
        const standings = computeStandingsFromUpdates(updates);

        return {
            success: true,
            matchScores: {
                updates: updates,
                total: data.matches.length,
                played: played,
                pending: data.matches.length - played,
                source: 'openfootball (GitHub)',
            },
            standings: standings,
            playerUpdates: { updates: [] },
        };
    }

    // ========== 从比赛更新中计算各小组积分榜 ==========
    function computeStandingsFromUpdates(updates) {
        if (!window.GROUPS || !window.GROUPED_TEAMS) return null;

        const GROUPS = window.GROUPS;
        const GROUPED_TEAMS = window.GROUPED_TEAMS;

        // 构建球队→分组索引
        const teamGroupMap = {};
        GROUPS.forEach(g => {
            (GROUPED_TEAMS[g] || []).forEach(t => { teamGroupMap[t.name] = g; });
        });

        const standings = {};
        GROUPS.forEach(g => {
            const teams = GROUPED_TEAMS[g] || [];
            const teamMap = {};
            teams.forEach(t => {
                teamMap[t.name] = { team: t, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 };
            });
            standings[g] = teamMap;
        });

        // 遍历所有小组赛比分
        updates.forEach(u => {
            if (u.stage !== 'group') return;
            const g = teamGroupMap[u.homeTeam];
            if (!g || !standings[g]) return;
            const ht = standings[g][u.homeTeam];
            const at = standings[g][u.awayTeam];
            if (!ht || !at) return;

            const hg = u.homeScore, ag = u.awayScore;
            ht.P++; at.P++;
            ht.GF += hg; ht.GA += ag;
            at.GF += ag; at.GA += hg;
            if (hg > ag) { ht.W++; ht.Pts += 3; at.L++; }
            else if (hg < ag) { at.W++; at.Pts += 3; ht.L++; }
            else { ht.D++; ht.Pts++; at.D++; at.Pts++; }
        });

        // 按积分/净胜球/进球数排序
        const result = {};
        GROUPS.forEach(g => {
            if (!standings[g]) return;
            const arr = Object.values(standings[g]);
            arr.forEach(t => { t.GD = t.GF - t.GA; });
            result[g] = arr.sort((a, b) =>
                b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF
            );
        });

        return result;
    }

    // ========== 主数据获取（多源降级） ==========
    async function fetchLiveData() {
        if (isPolling) return null;
        isPolling = true;

        let result = null;

        // 优先尝试本地代理服务器
        result = await fetchFromProxy();

        // 降级到 openfootball
        if (!result) {
            result = await fetchFromOpenfootball();
        }

        if (result && result.success) {
            processLiveData(result);
        }

        isPolling = false;
        return result;
    }

    function processLiveData(result) {
        lastFetchTime = new Date();

        if (result.matchScores) {
            matchUpdates = result.matchScores.updates || [];
            matchCount = result.matchScores.total || 104;
            playedCount = result.matchScores.played || 0;
            pendingCount = result.matchScores.pending || matchCount - playedCount;
            lastSource = result.matchScores.source || 'unknown';
            hasLiveMatches = matchUpdates.some(u => u.status === 'live');
        }

        if (result.standings) {
            standingsData = result.standings;
        }

        if (result.playerUpdates) {
            playerUpdates = result.playerUpdates.updates || [];
        }

        notifyListeners({
            matchUpdates,
            standingsData,
            playerUpdates,
            playedCount,
            pendingCount,
            matchCount,
            source: lastSource,
            time: lastFetchTime,
            hasLiveMatches,
        });
    }

    // ========== 将实时数据应用到 SCHEDULE_DATA ==========
    function applyMatchUpdates() {
        if (matchUpdates.length === 0) return 0;
        if (typeof SCHEDULE_DATA === 'undefined') return 0;

        let applied = 0;
        for (const update of matchUpdates) {
            const match = SCHEDULE_DATA.find(m => m.id === update.id);
            if (!match) continue;

            // 手动录入的真实赛果不受覆盖
            if (match._manual) continue;

            const statusChanged = match.status !== update.status;
            const scoreChanged = !match.score
                || match.score.home !== update.homeScore
                || match.score.away !== update.awayScore;

            if (statusChanged || scoreChanged) {
                match.status = update.status;
                match.score = { home: update.homeScore, away: update.awayScore };
                delete match._fallback;

                // 淘汰赛阶段更新球队名（从"待定"变为真实队名）
                if (update.homeTeam && update.homeTeam !== '待定' && match.home !== update.homeTeam) {
                    match.home = update.homeTeam;
                }
                if (update.awayTeam && update.awayTeam !== '待定' && match.away !== update.awayTeam) {
                    match.away = update.awayTeam;
                }

                applied++;
            }
        }
        return applied;
    }

    // ========== 将实时数据应用到 PLAYER_STATUS_DATA ==========
    function applyPlayerUpdates() {
        if (playerUpdates.length === 0) return 0;
        if (typeof PLAYER_STATUS_DATA === 'undefined') return 0;

        let applied = 0;
        for (const update of playerUpdates) {
            for (const team of PLAYER_STATUS_DATA) {
                const player = team.players.find(p => p.name === update.name);
                if (player && player.status !== update.newStatus) {
                    player.status = update.newStatus;
                    player.statusLabel = update.newLabel;
                    player.updated = new Date().toISOString().split('T')[0];
                    applied++;
                }
            }
        }
        return applied;
    }

    function getStandings() {
        return standingsData;
    }

    // ========== 轮询控制 ==========
    function startPolling() {
        stopPolling();
        fetchLiveData(); // 首次立即拉取
        scheduleNext();
    }

    function scheduleNext() {
        pollingTimer = setTimeout(async () => {
            await fetchLiveData();
            scheduleNext();
        }, hasLiveMatches ? FAST_INTERVAL : POLL_INTERVAL);
    }

    function stopPolling() {
        if (pollingTimer) {
            clearTimeout(pollingTimer);
            pollingTimer = null;
        }
    }

    // ========== 手动同步 ==========
    async function syncNow() {
        const result = await fetchLiveData();
        const matchApplied = applyMatchUpdates();
        const playerApplied = applyPlayerUpdates();

        if (typeof renderSchedule === 'function') renderSchedule();
        if (typeof renderPlayerStatus === 'function') renderPlayerStatus();

        const activeGroup = document.querySelector('.gtab.active');
        if (activeGroup && typeof renderStandings === 'function') {
            renderStandings(activeGroup.getAttribute('data-group') || 'A');
        }

        return { matchApplied, playerApplied, source: lastSource, time: lastFetchTime };
    }

    function getStatus() {
        return {
            isPolling: !!pollingTimer,
            lastFetch: lastFetchTime,
            matchUpdates: matchUpdates.length,
            playedCount,
            pendingCount,
            source: lastSource,
            hasLiveMatches,
        };
    }

    function getStatusText() {
        if (!lastFetchTime) return '⏳ 等待同步...';
        if (hasLiveMatches) return '🔴 赛事进行中 · 快速更新';
        const time = lastFetchTime.toLocaleTimeString('zh-CN');
        return `✅ 实时数据 (${time}) · ${lastSource}`;
    }

    return {
        onUpdate,
        fetchLiveData,
        applyMatchUpdates,
        applyPlayerUpdates,
        getStandings,
        startPolling,
        stopPolling,
        syncNow,
        getStatus,
        getStatusText,
        PROXY_URL,
    };
})();
