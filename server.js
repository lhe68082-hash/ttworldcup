/**
 * 竞彩官方数据代理服务器 + 实时数据服务
 * 运行: node server.js
 * 端口: 3001
 * 作用: 
 *   1. 从中国体育彩票官方接口抓取竞彩足球数据
 *   2. 提供世界杯实时比分、积分榜、球员动态API
 *   绕过浏览器CORS及WAF限制
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = 3001;
const CACHE_TTL = 5 * 60 * 1000; // 5分钟缓存
const cache = {};

// 加载实时数据服务和赛程注册表
let liveService, MATCH_REGISTRY;
try {
    liveService = require('./live-service.js');
    MATCH_REGISTRY = require('./match-registry.js');
    console.log('[Server] 实时数据服务已加载, 赛程注册表:', MATCH_REGISTRY.length, '场比赛');
} catch (e) {
    console.log('[Server] 实时数据服务加载失败:', e.message);
    liveService = null;
    MATCH_REGISTRY = [];
}

// ============== 数据源配置 ==============
const SOURCES = {
    // 竞彩足球比赛池
    matchPool: [
        {
            name: 'sporttery-pool',
            url: 'https://webapi.sporttery.cn/gateway/lottery/getFootBallMatchInfoV1.qry',
            params: '?pageNo=1&pageSize=50'
        },
    ],
    // 竞彩足球赔率（按比赛ID）
    matchOdds: [
        {
            name: 'sporttery-odds',
            url: 'https://webapi.sporttery.cn/gateway/lottery/getFootBallMatchInfoV1.qry',
            params: '?pageNo=1&pageSize=50'  // 赔率通常包含在比赛信息中
        },
    ],
    // 开奖结果
    matchResult: [
        {
            name: 'lottery-result',
            url: 'https://webapi.sporttery.cn/gateway/lottery/getFootballMatchResultV1.qry',
            params: '?pageNo=1&pageSize=50'
        },
    ]
};

// ============== HTTP 请求封装 ==============
function fetchUrl(urlStr, timeout = 15000) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(urlStr);
        const mod = parsed.protocol === 'https:' ? https : http;
        const options = {
            hostname: parsed.hostname,
            port: parsed.port,
            path: parsed.pathname + parsed.search,
            method: 'GET',
            timeout,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.sporttery.cn/',
                'Origin': 'https://www.sporttery.cn',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
            }
        };

        const req = mod.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode === 200) {
                        const json = JSON.parse(data);
                        resolve(json);
                    } else if (res.statusCode === 301 || res.statusCode === 302) {
                        fetchUrl(res.headers.location, timeout).then(resolve).catch(reject);
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 200)}`));
                    }
                } catch (e) {
                    reject(new Error(`Parse error: ${e.message}`));
                }
            });
        });

        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
        req.end();
    });
}

// ============== 数据格式化 ==============
function formatMatchData(rawData) {
    // 尝试多种可能的响应格式
    let matches = [];

    const findArray = (obj, depth = 0) => {
        if (!obj || depth > 5) return [];
        if (Array.isArray(obj)) return obj;
        if (typeof obj === 'object') {
            // 常见字段名
            for (const key of ['data', 'list', 'result', 'rows', 'content', 'matches', 'matchList', 'value']) {
                if (Array.isArray(obj[key])) return obj[key];
            }
            for (const key of Object.keys(obj)) {
                const found = findArray(obj[key], depth + 1);
                if (found.length) return found;
            }
        }
        return [];
    };

    const rawMatches = findArray(rawData);

    matches = rawMatches.map(m => {
        // 尝试多种字段映射
        const homeTeam = m.homeTeam || m.home_team || m.homeTeamName || m.hname || m.home || '';
        const awayTeam = m.awayTeam || m.away_team || m.awayTeamName || m.aname || m.away || '';
        const matchNum = m.matchNum || m.match_num || m.matchCode || m.num || m.code || '';
        const leagueName = m.leagueName || m.league_name || m.league || m.tournament || '';
        const matchTime = m.matchTime || m.match_time || m.matchDate || m.time || m.kickoff || '';

        return {
            id: m.matchId || m.match_id || m.id || `m_${Math.random().toString(36).slice(2, 8)}`,
            code: matchNum,
            league: leagueName,
            homeTeam,
            awayTeam,
            matchTime,
            status: m.status || m.matchStatus || (new Date(matchTime) > new Date() ? 'upcoming' : 'played'),
            // 胜平负
            spfWin: parseFloat(m.spfWin || m.spf_win || m.spf_w || (m.spf && m.spf.w) || 0),
            spfDraw: parseFloat(m.spfDraw || m.spf_draw || m.spf_d || (m.spf && m.spf.d) || 0),
            spfLose: parseFloat(m.spfLose || m.spf_lose || m.spf_l || (m.spf && m.spf.l) || 0),
            // 让球胜平负
            handicap: m.handicap || m.rqspf_handicap || (m.rqspf && m.rqspf.handicap) || '-1',
            rqspfWin: parseFloat(m.rqspfWin || m.rqspf_win || (m.rqspf && m.rqspf.w) || 0),
            rqspfDraw: parseFloat(m.rqspfDraw || m.rqspf_draw || (m.rqspf && m.rqspf.d) || 0),
            rqspfLose: parseFloat(m.rqspfLose || m.rqspf_lose || (m.rqspf && m.rqspf.l) || 0),
            // 比分赔率（可能是对象）
            bf: m.bf || m.scoreOdds || m.score_odds || null,
            // 总进球赔率
            zjq: m.zjq || m.jq || m.goalOdds || m.goal_odds || null,
            // 半全场赔率
            bqc: m.bqc || m.halfFull || m.half_full || null,
            // 比分结果
            halfScore: m.halfScore || m.half_score || '',
            fullScore: m.fullScore || m.full_score || m.score || '',
            // 开奖SP值
            resultSpf: m.resultSpf || m.result_spf || '',
            resultRqspf: m.resultRqspf || m.result_rqspf || '',
        };
    }).filter(m => m.homeTeam && m.awayTeam);

    return matches;
}

// ============== 带缓存的获取数据 ==============
async function getCachedOrFetch(cacheKey, sourceList) {
    const cached = cache[cacheKey];
    if (cached && Date.now() - cached.time < CACHE_TTL) {
        return { success: true, source: cached.source, cached: true, data: cached.data };
    }

    let lastError = null;
    for (const src of sourceList) {
        try {
            const url = src.url + (src.params || '');
            const raw = await fetchUrl(url);
            const formatted = formatMatchData(raw);

            if (formatted.length > 0) {
                cache[cacheKey] = { time: Date.now(), source: src.name, data: formatted };
                return { success: true, source: src.name, cached: false, data: formatted };
            }
        } catch (e) {
            lastError = e;
            console.log(`[${src.name}] 请求失败: ${e.message}`);
        }
    }

    // 降级：返回过期缓存
    if (cached) {
        return { success: true, source: cached.source + '(expired)', cached: true, data: cached.data };
    }

    return { success: false, error: lastError ? lastError.message : '所有数据源均不可用' };
}

// ============== HTTP 服务器 ==============
const server = http.createServer(async (req, res) => {
    // CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

    // 健康检查
    if (reqUrl.pathname === '/api/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString(), cache: Object.keys(cache) }));
    }

    // 获取比赛列表+赔率
    if (reqUrl.pathname === '/api/matches') {
        const result = await getCachedOrFetch('matches', SOURCES.matchPool);
        res.writeHead(result.success ? 200 : 502, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(result));
    }

    // 获取赛果
    if (reqUrl.pathname === '/api/results') {
        const result = await getCachedOrFetch('results', SOURCES.matchResult);
        res.writeHead(result.success ? 200 : 502, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(result));
    }

    // 强制刷新竞彩数据
    if (reqUrl.pathname === '/api/refresh') {
        delete cache['matches'];
        delete cache['results'];
        const result = await getCachedOrFetch('matches', SOURCES.matchPool);
        res.writeHead(result.success ? 200 : 502, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ...result, refreshed: true }));
    }

    // ============== 实时数据接口 ==============

    // 获取全部实时数据 (比分+积分榜+球员)
    if (reqUrl.pathname === '/api/live/all') {
        if (!liveService) {
            res.writeHead(503, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                error: '实时数据服务未加载',
                hint: '请确保 live-service.js 文件存在'
            }));
        }

        try {
            const scheduleData = MATCH_REGISTRY || [];
            const result = await liveService.getAllLiveData(scheduleData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(result));
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                error: e.message
            }));
        }
    }

    // 仅获取比赛比分
    if (reqUrl.pathname === '/api/live/scores') {
        if (!liveService) {
            res.writeHead(503, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: false, error: '服务未加载' }));
        }

        try {
            const scheduleData = MATCH_REGISTRY || [];
            const result = await liveService.getLiveMatchScores(scheduleData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(result));
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: false, error: e.message }));
        }
    }

    // 清除实时数据缓存
    if (reqUrl.pathname === '/api/live/refresh') {
        if (liveService) liveService.clearCache();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: true, refreshed: true }));
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: 'Not found',
        endpoints: [
            '/api/health', '/api/matches', '/api/results', '/api/refresh',
            '/api/live/all', '/api/live/scores', '/api/live/refresh'
        ]
    }));
});

server.listen(PORT, () => {
    console.log(`🏟  竞彩数据代理 + 实时数据服务器已启动`);
    console.log(`📍 地址: http://localhost:${PORT}`);
    console.log(`📡 竞彩接口: /api/matches | /api/results | /api/refresh | /api/health`);
    console.log(`🔄 实时数据: /api/live/all | /api/live/scores | /api/live/refresh`);
    console.log(`⏱  缓存: 竞彩${CACHE_TTL / 1000}s | 比分${liveService ? liveService.CACHE_TTL.matchScores / 1000 : 'N/A'}s`);
    console.log('');
    console.log(`💡 提示: 保持此窗口运行，前端即可获取实时比赛数据`);
});
