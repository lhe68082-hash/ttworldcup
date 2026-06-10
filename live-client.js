/**
 * 实时数据客户端模块
 * 负责从本地代理服务器获取实时比赛比分、积分榜和球员动态
 * 自动轮询 + 智能合并 + 降级保障
 * 
 * 依赖: server.js 的 /api/live/* 端点
 */

const LiveData = (() => {
    const PROXY_URL = (typeof LotteryAPI !== 'undefined' && LotteryAPI.PROXY_URL)
        ? LotteryAPI.PROXY_URL
        : 'http://localhost:3001';

    const POLL_INTERVAL = 60 * 1000;  // 60秒轮询
    const FAST_INTERVAL = 15 * 1000;   // 比赛进行中时15秒快速轮询

    let matchUpdates = [];      // 最新的比分更新
    let standingsData = null;   // 最新积分榜
    let playerUpdates = [];     // 球员状态更新
    let lastFetchTime = null;
    let pollingTimer = null;
    let isPolling = false;
    let matchCount = 0;
    let playedCount = 0;
    let pendingCount = 104;
    let lastSource = 'initial';
    let listeners = [];
    let hasLiveMatches = false; // 是否有进行中的比赛

    function onUpdate(cb) { listeners.push(cb); }
    function notifyListeners(data) {
        listeners.forEach(cb => {
            try { cb(data); } catch (e) { /* ignore */ }
        });
    }

    // ========== 从代理服务器获取数据 ==========
    async function fetchLiveData() {
        if (isPolling) return null;
        isPolling = true;

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);

            const resp = await fetch(`${PROXY_URL}/api/live/all`, {
                signal: controller.signal,
                headers: { 'Accept': 'application/json' }
            });
            clearTimeout(timeout);

            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const result = await resp.json();

            if (result.success) {
                processLiveData(result);
                return result;
            }
        } catch (e) {
            // 服务器可能未运行，使用静态数据
        } finally {
            isPolling = false;
        }
        return null;
    }

    function processLiveData(result) {
        lastFetchTime = new Date();

        // 处理比赛比分
        if (result.matchScores) {
            matchUpdates = result.matchScores.updates || [];
            matchCount = result.matchScores.total || 0;
            playedCount = result.matchScores.played || 0;
            pendingCount = result.matchScores.pending || matchCount - playedCount;
            lastSource = result.matchScores.source || 'unknown';

            // 检查是否有进行中的比赛
            hasLiveMatches = matchUpdates.some(u => u.status === 'live');
        }

        // 处理积分榜
        if (result.standings) {
            standingsData = result.standings;
        }

        // 处理球员动态
        if (result.playerUpdates) {
            playerUpdates = result.playerUpdates.updates || [];
        }

        // 通知监听器
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

        let applied = 0;
        for (const update of matchUpdates) {
            const match = SCHEDULE_DATA.find(m => m.id === update.id);
            if (!match) continue;

            // 只更新有变化的数据
            const statusChanged = match.status !== update.status;
            const scoreChanged = !match.score
                || match.score.home !== update.homeScore
                || match.score.away !== update.awayScore;

            if (statusChanged || scoreChanged) {
                match.status = update.status;
                match.score = { home: update.homeScore, away: update.awayScore };
                applied++;
            }
        }
        return applied;
    }

    // ========== 将实时数据应用到 PLAYER_STATUS_DATA ==========
    function applyPlayerUpdates() {
        if (playerUpdates.length === 0) return 0;

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

    // ========== 获取积分榜实时数据 ==========
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
            // 有进行中比赛时加快轮询
            const interval = hasLiveMatches ? FAST_INTERVAL : POLL_INTERVAL;
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
        // 积分榜刷新
        const activeGroup = document.querySelector('.group-tab.active');
        if (activeGroup && typeof renderStandings === 'function') {
            renderStandings(activeGroup.getAttribute('data-group') || 'A');
        }

        return { matchApplied, playerApplied, source: lastSource, time: lastFetchTime };
    }

    // ========== 获取状态信息 ==========
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
        return `✅ 实时数据 (${time})`;
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
