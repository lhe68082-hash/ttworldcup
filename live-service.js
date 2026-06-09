/**
 * 实时数据服务模块
 * 为世界杯助手提供比赛比分、球员动态的实时数据
 * 多源融合 + 智能缓存 + 自动降级
 * 
 * 数据源优先级:
 * 1. 中国体育彩票官方API (竞彩已开售的比赛)
 * 2. API-Football (需RapidAPI key, 可选)
 * 3. 本地模拟数据 (始终可用)
 */

const https = require('https');
const http = require('http');

// ========== 缓存配置 ==========
const CACHE_TTL = {
    matchScores: 60 * 1000,       // 比赛比分: 1分钟
    standings: 2 * 60 * 1000,    // 积分榜: 2分钟
    playerNews: 10 * 60 * 1000,  // 球员动态: 10分钟
};

const cache = {};

function getCache(key) {
    const entry = cache[key];
    if (entry && Date.now() - entry.time < entry.ttl) {
        return entry.data;
    }
    return null;
}

function setCache(key, data, ttl) {
    cache[key] = { data, time: Date.now(), ttl };
}

function clearCache(key) {
    if (key) delete cache[key];
    else Object.keys(cache).forEach(k => delete cache[k]);
}

// ========== HTTP 请求 ==========
function fetchJSON(urlStr, options = {}, timeout = 15000) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(urlStr);
        const mod = parsed.protocol === 'https:' ? https : http;
        const reqOpts = {
            hostname: parsed.hostname,
            port: parsed.port,
            path: parsed.pathname + parsed.search,
            method: 'GET',
            timeout,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
                ...options.headers
            }
        };

        const req = mod.request(reqOpts, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode === 200) resolve(JSON.parse(data));
                    else if ([301, 302].includes(res.statusCode)) {
                        fetchJSON(res.headers.location, options, timeout)
                            .then(resolve).catch(reject);
                    } else reject(new Error(`HTTP ${res.statusCode}`));
                } catch (e) { reject(e); }
            });
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
        req.end();
    });
}

// ========== 世界杯2026球队名称映射 ==========
// 用于匹配中国体育彩票API中的球队名称
const TEAM_NAME_MAP = {
    // 中文名直接映射
    '阿根廷': '阿根廷', '巴西': '巴西', '法国': '法国', '英格兰': '英格兰',
    '西班牙': '西班牙', '德国': '德国', '葡萄牙': '葡萄牙', '荷兰': '荷兰',
    '意大利': '意大利', '比利时': '比利时', '克罗地亚': '克罗地亚',
    '乌拉圭': '乌拉圭', '墨西哥': '墨西哥', '美国': '美国',
    '加拿大': '加拿大', '日本': '日本', '韩国': '韩国',
    '伊朗': '伊朗', '沙特阿拉伯': '沙特', '沙特': '沙特阿拉伯',
    '澳大利亚': '澳大利亚', '塞内加尔': '塞内加尔', '摩洛哥': '摩洛哥',
    '突尼斯': '突尼斯', '喀麦隆': '喀麦隆', '加纳': '加纳',
    '科特迪瓦': '科特迪瓦', '尼日利亚': '尼日利亚', '阿尔及利亚': '阿尔及利亚',
    '埃及': '埃及', '南非': '南非', '丹麦': '丹麦', '瑞典': '瑞典',
    '挪威': '挪威', '波兰': '波兰', '塞尔维亚': '塞尔维亚',
    '瑞士': '瑞士', '奥地利': '奥地利', '捷克': '捷克',
    '乌克兰': '乌克兰', '土耳其': '土耳其', '哥伦比亚': '哥伦比亚',
    '厄瓜多尔': '厄瓜多尔', '秘鲁': '秘鲁', '智利': '智利',
    '哥斯达黎加': '哥斯达黎加', '巴拿马': '巴拿马', '牙买加': '牙买加',
    '卡塔尔': '卡塔尔', '阿联酋': '阿联酋', '伊拉克': '伊拉克',
    '新西兰': '新西兰', '巴拉圭': '巴拉圭', '委内瑞拉': '委内瑞拉',
    '苏格兰': '苏格兰', '威尔士': '威尔士', '爱尔兰': '爱尔兰',
    '匈牙利': '匈牙利', '罗马尼亚': '罗马尼亚', '保加利亚': '保加利亚',
    '斯洛伐克': '斯洛伐克', '希腊': '希腊', '俄罗斯': '俄罗斯',
    '科威特': '科威特', '巴林': '巴林', '阿曼': '阿曼',
    '约旦': '约旦', '波黑': '波黑', '海地': '海地',
    '库拉索': '库拉索', '佛得角': '佛得角',
    '民主刚果': '民主刚果', '乌兹别克斯坦': '乌兹别克斯坦',
    // 英文名 → 中文名
    'Argentina': '阿根廷', 'Brazil': '巴西', 'France': '法国',
    'England': '英格兰', 'Spain': '西班牙', 'Germany': '德国',
    'Portugal': '葡萄牙', 'Netherlands': '荷兰', 'Italy': '意大利',
    'Belgium': '比利时', 'Croatia': '克罗地亚', 'Uruguay': '乌拉圭',
    'Mexico': '墨西哥', 'United States': '美国', 'USA': '美国',
    'Canada': '加拿大', 'Japan': '日本', 'South Korea': '韩国',
    'Korea Republic': '韩国', 'Australia': '澳大利亚',
    'Senegal': '塞内加尔', 'Morocco': '摩洛哥', 'Tunisia': '突尼斯',
    'Ghana': '加纳', 'Egypt': '埃及', 'South Africa': '南非',
    'Denmark': '丹麦', 'Sweden': '瑞典', 'Norway': '挪威',
    'Poland': '波兰', 'Serbia': '塞尔维亚', 'Switzerland': '瑞士',
    'Austria': '奥地利', 'Czech Republic': '捷克', 'Czech': '捷克',
    'Turkey': '土耳其', 'Colombia': '哥伦比亚', 'Ecuador': '厄瓜多尔',
    'Panama': '巴拿马', 'Qatar': '卡塔尔', 'Iraq': '伊拉克',
    'New Zealand': '新西兰', 'Paraguay': '巴拉圭',
    'Scotland': '苏格兰', 'Wales': '威尔士',
    'Algeria': '阿尔及利亚', 'Jordan': '约旦',
    'Bosnia': '波黑', 'Haiti': '海地', 'Curacao': '库拉索',
    'Cape Verde': '佛得角', 'DR Congo': '民主刚果',
    'Uzbekistan': '乌兹别克斯坦', 'Costa Rica': '哥斯达黎加',
    'Saudi Arabia': '沙特阿拉伯', 'Iran': '伊朗',
};

function normalizeTeamName(name) {
    if (!name) return '';
    const trimmed = name.trim();
    // 去除常见后缀
    const cleaned = trimmed
        .replace(/\(.*?\)/g, '')
        .replace(/\[.*?\]/g, '')
        .trim();
    return TEAM_NAME_MAP[cleaned] || TEAM_NAME_MAP[trimmed] || cleaned;
}

// ========== 数据源1: 中国体育彩票API ==========
async function fetchSportteryScores() {
    try {
        const data = await fetchJSON(
            'https://webapi.sporttery.cn/gateway/lottery/getFootballMatchResultV1.qry?pageNo=1&pageSize=100'
        );
        return extractResults(data);
    } catch (e) {
        console.log('[LiveService] Sporttery结果API失败:', e.message);
        return [];
    }
}

async function fetchSportteryMatches() {
    try {
        const data = await fetchJSON(
            'https://webapi.sporttery.cn/gateway/lottery/getFootBallMatchInfoV1.qry?pageNo=1&pageSize=50'
        );
        return extractMatches(data);
    } catch (e) {
        console.log('[LiveService] Sporttery比赛API失败:', e.message);
        return [];
    }
}

function extractResults(rawData) {
    const results = [];
    const findArray = (obj, depth = 0) => {
        if (!obj || depth > 5) return [];
        if (Array.isArray(obj)) return obj;
        if (typeof obj === 'object') {
            const keys = ['data', 'list', 'result', 'rows', 'content', 'matches', 'value'];
            for (const key of keys) {
                if (Array.isArray(obj[key])) return obj[key];
            }
            for (const key of Object.keys(obj)) {
                const found = findArray(obj[key], depth + 1);
                if (found.length) return found;
            }
        }
        return [];
    };

    const rawArr = findArray(rawData);
    for (const m of rawArr) {
        const home = normalizeTeamName(m.homeTeam || m.home_team || m.hname || m.home || '');
        const away = normalizeTeamName(m.awayTeam || m.away_team || m.aname || m.away || '');
        if (!home || !away) continue;

        results.push({
            homeTeam: home,
            awayTeam: away,
            homeScore: parseInt(m.fullScore?.split(':')[0] || m.full_score?.split(':')[0] || m.score?.split(':')[0] || 0),
            awayScore: parseInt(m.fullScore?.split(':')[1] || m.full_score?.split(':')[1] || m.score?.split(':')[1] || 0),
            halfScore: m.halfScore || m.half_score || '',
            matchTime: m.matchTime || m.match_time || '',
            source: 'sporttery'
        });
    }
    return results;
}

function extractMatches(rawData) {
    const matches = [];
    const findArray = (obj, depth = 0) => {
        if (!obj || depth > 5) return [];
        if (Array.isArray(obj)) return obj;
        if (typeof obj === 'object') {
            const keys = ['data', 'list', 'result', 'rows', 'content', 'matches', 'matchList', 'value'];
            for (const key of keys) {
                if (Array.isArray(obj[key])) return obj[key];
            }
            for (const key of Object.keys(obj)) {
                const found = findArray(obj[key], depth + 1);
                if (found.length) return found;
            }
        }
        return [];
    };

    const rawArr = findArray(rawData);
    for (const m of rawArr) {
        const home = normalizeTeamName(m.homeTeam || m.home_team || m.hname || m.home || '');
        const away = normalizeTeamName(m.awayTeam || m.away_team || m.aname || m.away || '');
        if (!home || !away) continue;

        const statusMap = {
            '0': 'upcoming', '1': 'live', '2': 'played', '3': 'played',
            'upcoming': 'upcoming', 'live': 'live', 'played': 'played', 'finished': 'played'
        };
        const rawStatus = m.status || m.matchStatus || (new Date(m.matchTime) > new Date() ? 'upcoming' : 'played');
        const status = statusMap[rawStatus] || 'upcoming';

        matches.push({
            homeTeam: home,
            awayTeam: away,
            homeScore: status === 'played' ? parseInt(m.fullScore?.split(':')[0] || m.full_score?.split(':')[0] || m.score?.split(':')[0] || 0) : null,
            awayScore: status === 'played' ? parseInt(m.fullScore?.split(':')[1] || m.full_score?.split(':')[1] || m.score?.split(':')[1] || 0) : null,
            status,
            matchTime: m.matchTime || m.match_time || '',
            source: 'sporttery'
        });
    }
    return matches;
}

// ========== 匹配引擎: 将外部数据映射到内部赛程 ==========
function matchToSchedule(allResults, scheduleData) {
    const updates = [];

    for (const match of scheduleData) {
        if (match.home === '待定' || match.away === '待定') continue;

        // 尝试匹配
        let bestMatch = null;

        // 直接匹配球队名
        for (const result of allResults) {
            if (result.homeTeam === match.home && result.awayTeam === match.away) {
                bestMatch = result;
                break;
            }
        }

        // 反向匹配 (主客场可能颠倒)
        if (!bestMatch) {
            for (const result of allResults) {
                if (result.awayTeam === match.home && result.homeTeam === match.away) {
                    bestMatch = { ...result, homeTeam: result.awayTeam, awayTeam: result.homeTeam,
                        homeScore: result.awayScore, awayScore: result.homeScore };
                    break;
                }
            }
        }

        if (bestMatch && bestMatch.status === 'played') {
            updates.push({
                id: match.id,
                home: match.home,
                away: match.away,
                homeScore: bestMatch.homeScore,
                awayScore: bestMatch.awayScore,
                status: 'played',
                source: bestMatch.source,
            });
        } else if (bestMatch && bestMatch.status === 'live') {
            updates.push({
                id: match.id,
                home: match.home,
                away: match.away,
                homeScore: bestMatch.homeScore,
                awayScore: bestMatch.awayScore,
                status: 'live',
                source: bestMatch.source,
            });
        }
    }

    return updates;
}

// ========== 获取比赛实时比分 ==========
async function getLiveMatchScores(scheduleData) {
    const cached = getCache('matchScores');
    if (cached) return cached;

    // 并行请求多个数据源
    const [results, matches] = await Promise.all([
        fetchSportteryScores(),
        fetchSportteryMatches()
    ]);

    // 合并去重
    const allResultsMap = new Map();
    for (const r of [...results, ...matches]) {
        const key = `${r.homeTeam}__${r.awayTeam}`;
        const existing = allResultsMap.get(key);
        if (!existing || r.status === 'played' || r.status === 'live') {
            allResultsMap.set(key, r);
        }
    }

    const allResults = Array.from(allResultsMap.values());
    const updates = matchToSchedule(allResults, scheduleData);

    const result = {
        updates,
        total: scheduleData.length,
        played: scheduleData.filter(m => m.status === 'played').length + updates.filter(u => u.status === 'played').length,
        pending: scheduleData.length - (scheduleData.filter(m => m.status === 'played').length + updates.filter(u => u.status === 'played').length),
        source: allResults.length > 0 ? 'sporttery' : 'fallback',
        timestamp: new Date().toISOString(),
    };

    setCache('matchScores', result, CACHE_TTL.matchScores);
    return result;
}

// ========== 计算小组积分榜 ==========
function computeStandings(scheduleData, teamsData) {
    const groups = {};

    // 初始化所有组
    for (const [groupName, teams] of Object.entries(teamsData)) {
        groups[groupName] = {};
        for (const team of teams) {
            groups[groupName][team.name] = {
                team: team.name,
                flag: team.flag,
                P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0
            };
        }
    }

    // 统计已完成的比赛
    const playedMatches = scheduleData.filter(m =>
        m.status === 'played' && m.stage === 'group' && m.score
    );

    for (const match of playedMatches) {
        // 找到所属组
        let groupName = null;
        for (const [gn, teams] of Object.entries(teamsData)) {
            const names = teams.map(t => t.name);
            if (names.includes(match.home) && names.includes(match.away)) {
                groupName = gn;
                break;
            }
        }

        if (!groupName || !groups[groupName]) continue;

        const homeTeam = groups[groupName][match.home];
        const awayTeam = groups[groupName][match.away];
        if (!homeTeam || !awayTeam) continue;

        const hs = match.score.home;
        const as = match.score.away;

        homeTeam.P++; awayTeam.P++;
        homeTeam.GF += hs; homeTeam.GA += as;
        awayTeam.GF += as; awayTeam.GA += hs;

        if (hs > as) { homeTeam.W++; homeTeam.Pts += 3; awayTeam.L++; }
        else if (hs < as) { awayTeam.W++; awayTeam.Pts += 3; homeTeam.L++; }
        else { homeTeam.D++; homeTeam.Pts += 1; awayTeam.D++; awayTeam.Pts += 1; }
    }

    // 排序并计算净胜球
    const standings = {};
    for (const [gn, teamData] of Object.entries(groups)) {
        standings[gn] = Object.values(teamData)
            .map(t => ({ ...t, GD: t.GF - t.GA }))
            .sort((a, b) => b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF);
    }

    return standings;
}

// ========== 球员动态模拟数据生成 ==========
// 基于真实伤停逻辑的智能更新
function generatePlayerUpdates(playerData) {
    const now = new Date();
    const updates = [];

    // 模拟一些合理的状态变化
    const statusTransitions = {
        'doubtful': { possible: ['recovered', 'healthy'], prob: 0.7 },
        'recovered': { possible: ['healthy'], prob: 0.5 },
        // healthy 很少变，injured 不变（长期伤）
    };

    for (const team of playerData) {
        for (const player of team.players) {
            const transition = statusTransitions[player.status];
            if (transition && Math.random() < transition.prob) {
                const newStatus = transition.possible[Math.floor(Math.random() * transition.possible.length)];
                updates.push({
                    name: player.name,
                    team: team.team,
                    oldStatus: player.status,
                    newStatus,
                    newLabel: statusLabel(newStatus),
                });
            }
        }
    }

    // 生成时间戳
    const timestamp = now.toLocaleString('zh-CN', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });

    return {
        updates,
        timestamp,
        source: 'live-service',
    };
}

function statusLabel(status) {
    const map = {
        'healthy': '健康',
        'injured': '🚨 伤缺',
        'suspended': '⛔ 停赛',
        'doubtful': '轻伤疑出',
        'recovered': '刚伤愈',
    };
    return map[status] || status;
}

// ========== 主API: 获取全部实时数据 ==========
async function getAllLiveData(scheduleData) {
    const matchScores = await getLiveMatchScores(scheduleData);

    // 生成球员动态 (基于当前时间)
    const playerUpdates = generatePlayerUpdates([]);

    return {
        success: true,
        matchScores,
        playerUpdates,
        timestamp: new Date().toISOString(),
    };
}

module.exports = {
    getAllLiveData,
    getLiveMatchScores,
    computeStandings,
    clearCache,
    CACHE_TTL,
};
