/**
 * 竞彩官方数据同步模块
 * 负责与本地代理服务器通信，获取实时比赛和赔率数据
 * 如果代理服务器不可用，降级为本地模拟数据
 */

const LotteryAPI = (() => {
    const PROXY_URL = 'http://localhost:3001';
    const SYNC_INTERVAL = 5 * 60 * 1000; // 5分钟自动同步

    let syncedMatches = null;     // 已同步的比赛数据
    let syncedResults = null;     // 已同步的赛果数据
    let lastSyncTime = null;
    let syncStatus = 'idle';      // idle | syncing | success | error
    let syncSource = 'simulated'; // simulated | official
    let autoSyncTimer = null;
    let autoSyncEnabled = false;
    let listeners = [];

    // 状态变更回调
    function onStatusChange(cb) { listeners.push(cb); }
    function notifyListeners() {
        listeners.forEach(cb => cb({ status: syncStatus, source: syncSource, lastSync: lastSyncTime }));
    }

    function setStatus(status, source) {
        syncStatus = status;
        if (source) syncSource = source;
        notifyListeners();
    }

    // ============== API 请求 ==============
    async function fetchFromProxy(endpoint) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        try {
            const resp = await fetch(`${PROXY_URL}${endpoint}`, {
                signal: controller.signal,
                headers: { 'Accept': 'application/json' }
            });
            clearTimeout(timeout);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            return await resp.json();
        } catch (e) {
            clearTimeout(timeout);
            if (e.name === 'AbortError') throw new Error('请求超时');
            throw e;
        }
    }

    // ============== 检查代理服务器是否运行 ==============
    async function checkProxy() {
        try {
            const resp = await fetch(`${PROXY_URL}/api/health`, {
                signal: AbortSignal.timeout(3000)
            });
            return resp.ok;
        } catch {
            return false;
        }
    }

    // ============== 同步比赛数据 ==============
    async function syncMatches(forceRefresh = false) {
        setStatus('syncing');
        const proxyAvailable = await checkProxy();

        if (!proxyAvailable) {
            console.log('[LotteryAPI] 代理服务器未运行，使用本地模拟数据');
            setStatus('success', 'simulated');
            return { success: true, source: 'simulated', data: generateSimulatedMatches() };
        }

        try {
            const endpoint = forceRefresh ? '/api/refresh' : '/api/matches';
            const result = await fetchFromProxy(endpoint);

            if (result.success && result.data && result.data.length > 0) {
                syncedMatches = result.data;
                lastSyncTime = new Date();
                setStatus('success', 'official');
                console.log(`[LotteryAPI] 同步成功: ${result.data.length} 场比赛, 来源=${result.source}`);
                return result;
            } else {
                throw new Error(result.error || '返回数据为空');
            }
        } catch (e) {
            console.warn('[LotteryAPI] 同步失败:', e.message);
            // 降级到模拟数据
            setStatus('success', 'simulated');
            return { success: true, source: 'simulated', data: generateSimulatedMatches() };
        }
    }

    // ============== 同步赛果 ==============
    async function syncResults() {
        try {
            const result = await fetchFromProxy('/api/results');
            if (result.success && result.data) {
                syncedResults = result.data;
                return result;
            }
        } catch (e) {
            console.warn('[LotteryAPI] 赛果同步失败:', e.message);
        }
        return { success: false, data: [] };
    }

    // ============== 生成模拟比赛数据 ==============
    function generateSimulatedMatches() {
        // 基于世界杯赛程生成更真实的模拟数据
        const upcoming = SCHEDULE_DATA.filter(m => m.status !== 'played').slice(0, 30);
        const now = new Date();
        const today = now.toLocaleDateString('zh-CN', { weekday: 'short' }).replace('周', '周');

        return upcoming.map((m, i) => {
            const o = generateOdds();
            const ds = m.date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
            const ts = m.date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });

            return {
                id: m.id,
                code: m.lotteryCode,
                league: '世界杯',
                homeTeam: m.home,
                awayTeam: m.away,
                homeFlag: m.homeFlag,
                awayFlag: m.awayFlag,
                matchTime: `${ds} ${ts}`,
                status: m.status,
                stage: m.stage,
                stageName: m.stageName,
                venue: m.venue,
                // 5种玩法赔率
                spfWin: parseFloat(o.spf.win),
                spfDraw: parseFloat(o.spf.draw),
                spfLose: parseFloat(o.spf.lose),
                handicap: o.rqspf.handicap,
                rqspfWin: parseFloat(o.rqspf.win),
                rqspfDraw: parseFloat(o.rqspf.draw),
                rqspfLose: parseFloat(o.rqspf.lose),
                bf: o.scoreOdds,
                zjq: o.zjqOdds,
                bqc: o.bqcOdds,
            };
        });
    }

    // ============== 获取比赛数据（用于计算器） ==============
    function getCalcMatches() {
        if (syncedMatches && syncedMatches.length > 0) {
            return syncedMatches;
        }
        return generateSimulatedMatches();
    }

    // 获取单个比赛的5种赔率
    function getMatchOdds(matchId) {
        const matches = syncedMatches || generateSimulatedMatches();
        const m = matches.find(x => x.id === matchId);
        if (!m) {
            // 不在列表中，动态生成
            const schedMatch = SCHEDULE_DATA.find(x => x.id === matchId);
            if (!schedMatch) return null;
            const o = generateOdds();
            return {
                spf: { win: parseFloat(o.spf.win), draw: parseFloat(o.spf.draw), lose: parseFloat(o.spf.lose) },
                rqspf: {
                    handicap: o.rqspf.handicap,
                    win: parseFloat(o.rqspf.win),
                    draw: parseFloat(o.rqspf.draw),
                    lose: parseFloat(o.rqspf.lose)
                },
                scoreOdds: o.scoreOdds,
                zjqOdds: o.zjqOdds,
                bqcOdds: o.bqcOdds,
            };
        }

        // 从同步数据构造赔率对象
        return {
            spf: { win: m.spfWin || 1.5, draw: m.spfDraw || 3.5, lose: m.spfLose || 5.0 },
            rqspf: {
                handicap: m.handicap || '-1',
                win: m.rqspfWin || 2.8,
                draw: m.rqspfDraw || 3.4,
                lose: m.rqspfLose || 2.2
            },
            scoreOdds: m.bf || generateOdds().scoreOdds,
            zjqOdds: m.zjq || generateOdds().zjqOdds,
            bqcOdds: m.bqc || generateOdds().bqcOdds,
        };
    }

    // ============== 自动同步 ==============
    function startAutoSync() {
        stopAutoSync();
        autoSyncEnabled = true;
        syncMatches(false); // 初始同步
        autoSyncTimer = setInterval(() => syncMatches(false), SYNC_INTERVAL);
        console.log('[LotteryAPI] 自动同步已启动, 间隔=' + SYNC_INTERVAL / 1000 + '秒');
    }

    function stopAutoSync() {
        autoSyncEnabled = false;
        if (autoSyncTimer) {
            clearInterval(autoSyncTimer);
            autoSyncTimer = null;
        }
    }

    function isAutoSyncEnabled() {
        return autoSyncEnabled;
    }

    // ============== 获取同步状态 ==============
    function getStatus() {
        return {
            status: syncStatus,
            source: syncSource,
            lastSync: lastSyncTime,
            matchCount: syncedMatches ? syncedMatches.length : 0,
            autoSync: autoSyncEnabled,
        };
    }

    // 获取状态文字
    function getStatusText() {
        if (syncStatus === 'syncing') return '⏳ 同步中...';
        if (syncSource === 'official') {
            const time = lastSyncTime ? lastSyncTime.toLocaleTimeString('zh-CN') : '';
            return `✅ 官方数据 ${time ? '· ' + time : ''}`;
        }
        return '📋 模拟数据';
    }

    // 获取数据来源标签样式
    function getSourceClass() {
        return syncSource === 'official' ? 'src-official' : 'src-simulated';
    }

    return {
        onStatusChange,
        checkProxy,
        syncMatches,
        syncResults,
        getCalcMatches,
        getMatchOdds,
        startAutoSync,
        stopAutoSync,
        isAutoSyncEnabled,
        getStatus,
        getStatusText,
        getSourceClass,
        PROXY_URL,
    };
})();
