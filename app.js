// ============================================
// 2026 世界杯 · 高级版 · 主逻辑
// ============================================

// ---------- 竞彩编号 ----------
const WEEKDAY_CN = ['周日','周一','周二','周三','周四','周五','周六'];
function generateLotteryCodes() {
    const byDate = {};
    SCHEDULE_DATA.forEach(m => {
        const ds = m.date.toLocaleDateString('zh-CN', { year:'numeric', month:'2-digit', day:'2-digit' });
        if (!byDate[ds]) byDate[ds] = [];
        byDate[ds].push(m);
    });
    Object.keys(byDate).sort().forEach(ds => {
        const matches = byDate[ds];
        matches.sort((a,b) => a.date - b.date);
        const d = matches[0].date;
        const wd = WEEKDAY_CN[d.getDay()];
        matches.forEach((m, i) => {
            m.lotteryCode = `${wd}${String(i+1).padStart(3,'0')}`;
        });
    });
}
generateLotteryCodes();

// ==================== 卡密验证 ====================
const KEY_STORAGE = 'hw2026_activated_key';

function isKeyActivated() {
    const saved = localStorage.getItem(KEY_STORAGE);
    if (!saved) return false;
    return VALID_KEYS.includes(saved);
}

function activateKey() {
    const input = document.getElementById('keyInput');
    const errorEl = document.getElementById('keyError');
    const btn = document.getElementById('keyActivateBtn');
    const key = input ? input.value.trim().toUpperCase() : '';

    if (!key) {
        if (errorEl) errorEl.textContent = '请输入卡密';
        return;
    }

    if (validateKey(key)) {
        localStorage.setItem(KEY_STORAGE, key);
        if (errorEl) errorEl.textContent = '';
        if (btn) { btn.disabled = true; btn.innerHTML = '<span>✅ 验证通过，正在进入...</span>'; }
        // 延迟隐藏，给用户反馈
        setTimeout(() => {
            const overlay = document.getElementById('keyActivationOverlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.4s ease';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 400);
            }
        }, 600);
    } else {
        if (errorEl) errorEl.textContent = '❌ 卡密无效，请检查后重试';
        if (input) { input.value = ''; input.focus(); }
        // 震动反馈
        if (input) {
            input.style.borderColor = 'var(--red)';
            input.style.boxShadow = '0 0 0 8px rgba(255,71,87,0.12)';
            setTimeout(() => {
                input.style.borderColor = 'var(--border)';
                input.style.boxShadow = 'none';
            }, 800);
        }
    }
}

// 回车键激活
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const overlay = document.getElementById('keyActivationOverlay');
        if (overlay && overlay.style.display !== 'none') {
            activateKey();
        }
    }
});

// ---------- 初始化 ----------
document.addEventListener('DOMContentLoaded', () => {
    // 卡密验证：已激活则隐藏验证界面
    if (isKeyActivated()) {
        const overlay = document.getElementById('keyActivationOverlay');
        if (overlay) overlay.style.display = 'none';
    }

    initTheme();
    initBottomNav();
    initDateDisplay();
    initCountdown();
    initSchedule();
    initQuiz();
    initChampions();
    initLottery();
    // 竞彩模拟器可能因 lottery-api.js 加载失败而出错，不影响核心功能
    try { initSimBet(); } catch(e) { console.warn('竞彩模块加载失败:', e.message); }
    try { initLedger(); } catch(e) { console.warn('记账本加载失败:', e.message); }
    initTeamsGroup();
    initCityDetails();
    initHostCountries();
    initLiveUpdates();
});

// ==================== 底部导航 ====================
function initBottomNav() {
    const items = document.querySelectorAll('.bnav-item');
    const pages = document.querySelectorAll('.page');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-tab');
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            pages.forEach(p => p.classList.remove('active'));
            const page = document.getElementById(target);
            if (page) {
                page.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // 懒加载触发
                if (target === 'schedule') refreshScheduleIfNeeded();
            }
        });
    });
}

window.switchTab = function(tabId) {
    const btn = document.querySelector(`.bnav-item[data-tab="${tabId}"]`);
    if (btn) btn.click();
};

// ==================== 主题切换 ====================
function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    applyTheme(saved);
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.addEventListener('click', toggleTheme);
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('themeToggle');
    if (icon) icon.textContent = theme === 'light' ? '🌙' : '☀️';
    const meta = document.getElementById('metaThemeColor');
    if (meta) meta.content = theme === 'light' ? '#f0f2f5' : '#121926';
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
}

// ==================== 日期 ====================
function initDateDisplay() {
    const el = document.getElementById('dateDisplay');
    function update() {
        el.textContent = new Date().toLocaleDateString('zh-CN', { month:'2-digit', day:'2-digit', weekday:'short' });
    }
    update();
    setInterval(update, 60000);
}

// ==================== 倒计时 ====================
function initCountdown() {
    const opening = new Date(2026, 5, 11, 0, 0, 0); // 6月11日开幕
    const final = new Date(2026, 6, 19, 0, 0, 0);   // 7月19日决赛

    function update() {
        const now = new Date();
        const titleEl = document.getElementById('cdTitle');
        const rowEl = document.getElementById('cdRow');

        if (now < opening) {
            // 开幕前：倒计时
            if (titleEl) titleEl.textContent = '距开幕还有';
            const diff = opening - now;
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            if (rowEl) {
                rowEl.innerHTML = `
                    <div class="cd-item"><span class="cd-num">${String(d).padStart(2, '0')}</span><span>天</span></div>
                    <span class="cd-colon">:</span>
                    <div class="cd-item"><span class="cd-num">${String(h).padStart(2, '0')}</span><span>时</span></div>
                    <span class="cd-colon">:</span>
                    <div class="cd-item"><span class="cd-num">${String(m).padStart(2, '0')}</span><span>分</span></div>
                    <span class="cd-colon">:</span>
                    <div class="cd-item"><span class="cd-num">${String(s).padStart(2, '0')}</span><span>秒</span></div>
                `;
            }
        } else if (now >= opening && now < final) {
            // 比赛期间：第x比赛日 + 距决赛天数
            const matchDay = Math.floor((now - opening) / 86400000) + 1;
            const daysToFinal = Math.ceil((final - now) / 86400000);
            if (titleEl) titleEl.textContent = `第 ${matchDay} 个比赛日 · 距决赛还有 ${daysToFinal} 天`;
            if (rowEl) {
                rowEl.innerHTML = `
                    <div style="display:flex;gap:16px;justify-content:center;align-items:center;padding:8px 0;">
                        <div style="text-align:center;">
                            <div style="font-size:32px;font-weight:900;color:var(--accent);line-height:1;">${matchDay}</div>
                            <div style="font-size:11px;color:var(--text-light);margin-top:4px;">比赛日</div>
                        </div>
                        <div style="width:1px;height:40px;background:var(--border);"></div>
                        <div style="text-align:center;">
                            <div style="font-size:32px;font-weight:900;color:var(--gold);line-height:1;">${daysToFinal}</div>
                            <div style="font-size:11px;color:var(--text-light);margin-top:4px;">距决赛</div>
                        </div>
                    </div>
                `;
            }
        } else {
            // 决赛后
            if (titleEl) titleEl.textContent = '🏆 2026世界杯已圆满落幕';
            if (rowEl) {
                rowEl.innerHTML = `
                    <div style="font-size:14px;color:var(--text-light);padding:10px 0;">
                        感谢关注，下一届再见！
                    </div>
                `;
            }
        }
    }
    update();
    setInterval(update, 1000);
}

function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }

// ==================== 赛程 ====================
let scheduleFilter = 'all';
let lastScheduleRender = 0;

function initSchedule() {
    const filterBtns = document.querySelectorAll('#schedule .flt');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            scheduleFilter = btn.getAttribute('data-stage');
            renderSchedule();
        });
    });
    renderSchedule();
}

function refreshScheduleIfNeeded() {
    if (Date.now() - lastScheduleRender > 30000) renderSchedule();
}

function renderSchedule() {
    const grid = document.getElementById('scheduleGrid');
    if (!grid) return;
    lastScheduleRender = Date.now();

    const filtered = scheduleFilter === 'all' ? SCHEDULE_DATA : SCHEDULE_DATA.filter(m => m.stage === scheduleFilter);
    updateProgress();

    // 更新刷新指示器
    const refEl = document.getElementById('scheduleRefresh');
    if (refEl) refEl.innerHTML = `<span class="live-indicator"></span> 更新于 ${new Date().toLocaleTimeString('zh-CN')}`;

    grid.innerHTML = filtered.map(m => {
        const ds = m.date.toLocaleDateString('zh-CN', { month:'2-digit', day:'2-digit' });
        const ts = m.date.toLocaleTimeString('zh-CN', { hour:'2-digit', minute:'2-digit', hour12:false });
        let statusHtml, cardClass = '';

        if (m.status === 'played') { statusHtml = '<span class="match-status played-tag">已结束</span>'; cardClass='played'; }
        else if (m.status === 'live') { statusHtml = '<span class="match-status live-tag">● LIVE</span>'; cardClass='live'; }
        else { statusHtml = '<span class="match-status upcoming">未开始</span>'; }

        const scoreHtml = m.score
            ? `<div class="match-score"><span class="ms-home">${m.score.home}</span><span class="ms-sep">:</span><span class="ms-away">${m.score.away}</span></div>`
            : '<div class="match-vs">VS</div>';

        // 主客队名，用data属性存储用于点击
        return `<div class="match-card ${cardClass}">
            <div class="match-stage">${m.stageName}</div>
            <div class="match-meta"><span>📅 ${ds} ${ts}</span><span>🏟 ${m.venue}</span></div>
            <div class="match-teams">
                <div class="match-team" data-team="${m.home}" data-flag="${m.homeFlag}" onclick="showTeamDetail(event, '${m.home}', '${m.homeFlag}')">
                    <span class="team-flag">${m.homeFlag}</span>
                    <span class="team-name">${m.home}</span>
                    ${m.home !== '待定' ? '<span class="team-name-sm">点击查看</span>' : ''}
                </div>
                ${scoreHtml}
                <div class="match-team" data-team="${m.away}" data-flag="${m.awayFlag}" onclick="showTeamDetail(event, '${m.away}', '${m.awayFlag}')">
                    <span class="team-flag">${m.awayFlag}</span>
                    <span class="team-name">${m.away}</span>
                    ${m.away !== '待定' ? '<span class="team-name-sm">点击查看</span>' : ''}
                </div>
            </div>
            <div>${statusHtml}</div>
        </div>`;
    }).join('');
}

function updateProgress() {
    const total = SCHEDULE_DATA.length;
    const played = SCHEDULE_DATA.filter(m => m.status === 'played').length;
    const pct = Math.round((played/total)*100);
    setText('progressPercent', pct + '%');
    const fill = document.getElementById('progressFill');
    if (fill) fill.style.width = pct + '%';
    setText('playedCount', played);
    setText('remainingCount', total - played);
}

// ==================== 实时更新 ====================
function initLiveUpdates() {
    // 每30秒自动更新赛程和积分榜
    setInterval(() => {
        const schedulePage = document.getElementById('schedule');
        if (schedulePage && schedulePage.classList.contains('active')) {
            renderSchedule();
        }
        // 更新时间戳
        const refEl = document.getElementById('scheduleRefresh');
        if (refEl) refEl.innerHTML = `<span class="live-indicator"></span> 更新于 ${new Date().toLocaleTimeString('zh-CN')}`;
        // 同步更新积分榜
        renderStandings(currentGroup);
    }, 30000);
}

// ==================== 问答 ====================
let quizIdx = 0, quizScore = 0, quizDone = false;
function initQuiz() { showQuiz(); }
function showQuiz() {
    const q = QUIZ_DATA[quizIdx % QUIZ_DATA.length];
    setText('quizQuestion', `Q${quizIdx+1}: ${q.question}`);
    const opsEl = document.getElementById('quizOptions');
    if (opsEl) opsEl.innerHTML = q.options.map((o,i) =>
        `<button class="q-opt" onclick="answerQuiz(${i},this)">${o}</button>`
    ).join('');
    quizDone = false;
}
window.answerQuiz = function(idx, el) {
    if (quizDone) return;
    quizDone = true;
    const q = QUIZ_DATA[quizIdx % QUIZ_DATA.length];
    const all = document.querySelectorAll('.q-opt');
    if (idx === q.answer) { el.classList.add('correct'); quizScore++; }
    else { el.classList.add('wrong'); all[q.answer].classList.add('correct'); }
    setText('quizScore', quizScore);
    all.forEach(o => o.style.pointerEvents = 'none');
};
window.nextQuiz = function() { quizIdx++; showQuiz(); };

// ==================== 历届冠军 ====================
function initChampions() {
    const el = document.getElementById('championsGrid');
    if (el) el.innerHTML = CHAMPIONS.map(c =>
        `<div class="champ-item"><span class="champ-year">${c.year}</span><span class="champ-flag">${c.flag}</span>${c.winner}</div>`
    ).join('');
}

// ==================== 城市详情 ====================
function initCityDetails() {
    function renderCities(data, containerId) {
        const el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = data.map(c => `
            <div class="city-item">
                <div class="ci-name">${c.name}</div>
                <div class="ci-stadium">🏟 ${c.stadium} · ${c.capacity.toLocaleString()}座</div>
                ${c.note ? `<div class="ci-note">${c.note}</div>` : ''}
                <div style="font-size:12px;color:var(--text-light);margin-top:4px">${c.desc}</div>
            </div>
        `).join('');
    }
    renderCities(CITY_DETAILS.USA, 'usaCities');
    renderCities(CITY_DETAILS.MEX, 'mexCities');
    renderCities(CITY_DETAILS.CAN, 'canCities');
}

// ==================== 主办国家 ====================
function initHostCountries() {
    const el = document.getElementById('hostCountries');
    if (!el) return;
    el.innerHTML = `
        <div style="margin-bottom:12px">
            <strong>🇺🇸 美国</strong>
            <p style="font-size:12px;color:var(--text-light);margin-top:4px">承办城市最多的主办国，决赛在纽约/新泽西举行。1994年后第二次举办男足世界杯。</p>
        </div>
        <div style="margin-bottom:12px">
            <strong>🇲🇽 墨西哥</strong>
            <p style="font-size:12px;color:var(--text-light);margin-top:4px">首个三次主办世界杯的国家（1970、1986、2026）。阿兹特克体育场传奇再续。</p>
        </div>
        <div>
            <strong>🇨🇦 加拿大</strong>
            <p style="font-size:12px;color:var(--text-light);margin-top:4px">首次主办男足世界杯，2015年成功举办女足世界杯。多伦多和温哥华两城承办。</p>
        </div>
    `;
}

// ==================== 竞彩玩法介绍 ====================
function initLottery() {
    const tabs = document.querySelectorAll('#lottery .flt');
    const content = document.getElementById('lotteryContent');
    function show(type) {
        const info = LOTTERY_INFO[type];
        if (!content) return;
        content.innerHTML = `<div class="lottery-detail">
            <h3>${info.title}</h3>
            <p class="lottery-desc">${info.desc}</p>
            <ul class="rule-list">${info.rules.map(r => `<li>${r}</li>`).join('')}</ul>
        </div>`;
    }
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            show(tab.getAttribute('data-lottery'));
        });
    });
    show('spf');
}

// ==================== 竞彩模拟计算器 ====================
let calcSlip = [];
let calcHistory = [];
let calcMultiplier = 1;
let calcParlayType = 'single';
let calcPlayType = 'spf';

const PLAY_TYPES = [
    { value: 'spf', label: '胜平负', icon: '⚽', desc: '猜胜/平/负' },
    { value: 'rqspf', label: '让球胜平负', icon: '🎯', desc: '让球后猜胜/平/负' },
    { value: 'bf', label: '比分', icon: '🔢', desc: '猜最终比分' },
    { value: 'zjq', label: '总进球数', icon: '⚡', desc: '猜总进球' },
    { value: 'bqc', label: '半全场', icon: '⏱', desc: '猜半场+全场' },
];

function getParlayOptions(count) {
    const opts = [{ value: 'single', label: '单关（各场独立）', note: '每场单独计奖·中一场赚一场' }];
    for (let n = 2; n <= Math.min(count, 5); n++) {
        opts.push({ value: `${n}-1`, label: `${n}串1`, note: `${n}场全中才中奖` });
    }
    return opts;
}

function getBetCount(parlayType, count) {
    return parlayType === 'single' ? count : 1;
}

function initSimBet() {
    const container = document.getElementById('calcContainer');
    if (!container) return;
    try { renderCalc(container); } catch(e) { console.warn('renderCalc error:', e); }
    try { initSyncUI(); } catch(e) { console.warn('initSyncUI error:', e); }
    // 如果 LotteryAPI 不可用，跳过同步
    if (typeof LotteryAPI !== 'undefined' && LotteryAPI.syncMatches) {
        LotteryAPI.syncMatches(false).then(() => {
            updateSyncUI();
            rerenderCalc();
        }).catch(() => updateSyncUI());
    } else {
        updateSyncUI();
    }
}

// ============== 数据同步UI ==============
function initSyncUI() {
    if (typeof LotteryAPI === 'undefined') return;
    LotteryAPI.onStatusChange(() => updateSyncUI());
    updateSyncUI();
}

function updateSyncUI() {
    if (typeof LotteryAPI === 'undefined') return;
    const status = LotteryAPI.getStatus();
    const dot = document.getElementById('syncDot');
    const text = document.getElementById('syncText');
    const btn = document.getElementById('syncBtn');
    const autoCheck = document.getElementById('syncAutoCheck');

    if (dot) {
        dot.className = 'sync-dot';
        if (status.status === 'syncing') dot.classList.add('syncing');
        else if (status.source === 'official') dot.classList.add('official');
        else dot.classList.add('simulated');
    }
    if (text) {
        text.textContent = LotteryAPI.getStatusText();
        text.className = status.source === 'official' ? 'sync-text-official' : 'sync-text-sim';
    }
    if (btn) {
        btn.disabled = status.status === 'syncing';
        btn.textContent = status.status === 'syncing' ? '⏳ 同步中...' : '🔄 同步官方';
    }
    if (autoCheck) autoCheck.checked = LotteryAPI.isAutoSyncEnabled();
}

window.triggerSync = async function() {
    if (typeof LotteryAPI === 'undefined') return;
    updateSyncUI();
    await LotteryAPI.syncMatches(true);
    updateSyncUI();
    rerenderCalc();
};

window.toggleAutoSync = function(enabled) {
    if (typeof LotteryAPI === 'undefined') return;
    if (enabled) LotteryAPI.startAutoSync();
    else LotteryAPI.stopAutoSync();
    updateSyncUI();
};

function rerenderCalc() {
    const container = document.getElementById('calcContainer');
    if (container) renderCalc(container);
}

// ==================== 个人购彩记账本 ====================
let ledgerData = [];
const LEDGER_KEY = 'wc_bet_ledger';

function loadLedger() {
    try { ledgerData = JSON.parse(localStorage.getItem(LEDGER_KEY) || '[]'); } catch(e) { ledgerData = []; }
}
function saveLedger() {
    try { localStorage.setItem(LEDGER_KEY, JSON.stringify(ledgerData)); } catch(e) {}
}
function initLedger() {
    loadLedger();
    const dateInput = document.getElementById('ledgerDate');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    renderLedger();
}

window.addLedgerEntry = function() {
    const dateEl = document.getElementById('ledgerDate');
    const buyEl = document.getElementById('ledgerBuy');
    const winEl = document.getElementById('ledgerWin');
    const date = dateEl ? dateEl.value : '';
    const buy = parseFloat(buyEl ? buyEl.value : 0) || 0;
    const win = parseFloat(winEl ? winEl.value : 0) || 0;
    if (!date) { alert('请选择日期'); return; }
    if (buy <= 0 && win <= 0) { alert('购彩金额和中奖金额至少填写一项'); return; }

    ledgerData.push({ id: Date.now(), date, buy, win });
    ledgerData.sort((a,b) => b.date.localeCompare(a.date) || b.id - a.id);
    saveLedger();
    renderLedger();
    if (buyEl) buyEl.value = '';
    if (winEl) winEl.value = '';
};

window.delLedgerEntry = function(id) {
    ledgerData = ledgerData.filter(e => e.id !== id);
    saveLedger();
    renderLedger();
};

window.copyLedger = function() {
    if (ledgerData.length === 0) { alert('暂无记录可复制'); return; }
    const totalBuy = ledgerData.reduce((s,e) => s + e.buy, 0);
    const totalWin = ledgerData.reduce((s,e) => s + e.win, 0);
    const totalNet = totalWin - totalBuy;
    let text = '📒 我的购彩记账本\n';
    text += '━━━━━━━━━━━━━━━━\n';
    ledgerData.forEach(e => {
        const net = e.win - e.buy;
        const netSign = net >= 0 ? '+' : '';
        text += `📅 ${e.date}\n   购彩: ¥${e.buy.toFixed(2)}   中奖: ¥${e.win.toFixed(2)}   盈亏: ${netSign}¥${net.toFixed(2)}\n\n`;
    });
    text += '━━━━━━━━━━━━━━━━\n';
    text += `💰 总购彩: ¥${totalBuy.toFixed(2)}\n`;
    text += `🏆 总中奖: ¥${totalWin.toFixed(2)}\n`;
    text += `📊 净盈亏: ${totalNet >= 0 ? '+' : ''}¥${totalNet.toFixed(2)}\n`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => alert('记录已复制到剪贴板，可粘贴到微信/WPS/记事本')).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
};

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); alert('记录已复制到剪贴板，可粘贴到微信/WPS/记事本'); }
    catch(e) { alert('复制失败，请手动复制'); }
    document.body.removeChild(ta);
}

window.exportLedgerCSV = function() {
    if (ledgerData.length === 0) { alert('暂无记录可导出'); return; }
    const totalBuy = ledgerData.reduce((s,e) => s + e.buy, 0);
    const totalWin = ledgerData.reduce((s,e) => s + e.win, 0);
    const totalNet = totalWin - totalBuy;
    let csv = '\uFEFF日期,购彩金额,中奖金额,盈亏\n';
    ledgerData.forEach(e => {
        csv += `${e.date},${e.buy.toFixed(2)},${e.win.toFixed(2)},${(e.win - e.buy).toFixed(2)}\n`;
    });
    csv += `总计,${totalBuy.toFixed(2)},${totalWin.toFixed(2)},${totalNet.toFixed(2)}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '购彩记账本_' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
};

function renderLedger() {
    const tbody = document.getElementById('ledgerBody');
    const emptyEl = document.getElementById('ledgerEmpty');
    const sumBuyEl = document.getElementById('sumBuy');
    const sumWinEl = document.getElementById('sumWin');
    const sumNetEl = document.getElementById('sumNet');
    const netRow = document.getElementById('ledgerNetRow');
    if (!tbody) return;

    if (ledgerData.length === 0) {
        tbody.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'block';
    } else {
        if (emptyEl) emptyEl.style.display = 'none';
        tbody.innerHTML = ledgerData.map(e => {
            const net = e.win - e.buy;
            const netCls = net >= 0 ? 'ledger-net-pos' : 'ledger-net-neg';
            const netSign = net >= 0 ? '+' : '';
            return `<tr>
                <td>${e.date}</td>
                <td class="ledger-amount buy">-¥${e.buy.toFixed(2)}</td>
                <td class="ledger-amount win">+¥${e.win.toFixed(2)}</td>
                <td class="${netCls}">${netSign}¥${net.toFixed(2)}</td>
                <td><button class="ledger-del" onclick="delLedgerEntry(${e.id})" title="删除">🗑</button></td>
            </tr>`;
        }).join('');
    }

    const totalBuy = ledgerData.reduce((s,e) => s + e.buy, 0);
    const totalWin = ledgerData.reduce((s,e) => s + e.win, 0);
    const totalNet = totalWin - totalBuy;

    if (sumBuyEl) sumBuyEl.textContent = '¥' + totalBuy.toFixed(2);
    if (sumWinEl) sumWinEl.textContent = '¥' + totalWin.toFixed(2);
    if (sumNetEl) {
        const sign = totalNet >= 0 ? '+' : '';
        sumNetEl.textContent = sign + '¥' + totalNet.toFixed(2);
    }
    if (netRow) {
        netRow.classList.remove('positive', 'negative');
        if (totalNet > 0) netRow.classList.add('positive');
        else if (totalNet < 0) netRow.classList.add('negative');
    }
}

function renderCalc(container) {
    if (!container) return;
    const parlayOpts = getParlayOptions(Math.max(calcSlip.length, 1));
    container.innerHTML = `
        <div class="calc-pick-row">
            <select id="calcMatchPicker">
                <option value="">-- 选择比赛 --</option>
                ${buildMatchPickerOptions()}
            </select>
            <button class="btn" onclick="addMatchToSlip()" style="flex-shrink:0;padding:10px 14px;">+ 添加</button>
        </div>
        <div id="calcOddsArea" style="text-align:center;color:var(--text-dim);font-size:13px;padding:10px;">👆 选比赛后点"添加"</div>
        <div class="calc-slip" id="calcSlip">
            <div class="calc-slip-empty">📋 请添加比赛到投注单</div>
        </div>
        <div class="calc-config-row">
            <label class="calc-config-label">🎲 玩法</label>
            <select id="calcPlayTypeSelect" class="calc-config-select" onchange="onPlayTypeChange(this.value)">
                ${PLAY_TYPES.map(p => `<option value="${p.value}" ${p.value===calcPlayType?'selected':''}>${p.icon} ${p.label}</option>`).join('')}
            </select>
            <span class="calc-config-hint" id="calcPlayTypeHint">猜胜/平/负</span>
        </div>
        <div class="calc-config-row">
            <label class="calc-config-label">🎯 串关</label>
            <select id="calcParlaySelect" class="calc-config-select" onchange="onParlayChange(this.value)">
                ${parlayOpts.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
            </select>
            <span class="calc-config-note" id="calcParlayNote">每场单独计奖</span>
        </div>
        <div class="calc-config-row">
            <label class="calc-config-label">✖️ 倍数</label>
            <select id="calcMultiplierSelect" class="calc-config-select" onchange="onMultiplierChange(this.value)">
                ${[1,2,5,10,20,50,99].map(n => `<option value="${n}" ${n===calcMultiplier?'selected':''}>${n}倍</option>`).join('')}
            </select>
            <span class="calc-config-hint">2元/注 × 倍数</span>
        </div>
        <div class="calc-summary" id="calcSummary" style="display:none">
            <div class="csm-row"><span>数据来源</span><span id="csrSource">${typeof LotteryAPI !== 'undefined' ? LotteryAPI.getStatusText() : '📋 模拟数据'}</span></div>
            <div class="csm-row"><span>场次</span><span id="csrMatches">0场</span></div>
            <div class="csm-row"><span>玩法</span><span class="csr-playtype" id="csrPlayType">胜平负</span></div>
            <div class="csm-row"><span>过关方式</span><span id="csrParlay">单关</span></div>
            <div class="csm-row"><span>注数</span><span id="csrBetCount">0注</span></div>
            <div class="csm-row"><span>倍数</span><span class="csr-mult" id="csrMultiplier">1倍</span></div>
            <div class="csm-row csm-highlight"><span>投注金额</span><span class="csm-amount" id="csrAmount">¥0</span></div>
            <div class="csm-row csm-bonus"><span>💰 预计最高奖金</span><span class="csm-payout" id="csrPayout">¥0.00</span></div>
        </div>
        <div class="calc-actions">
            <button class="btn btn-clear" onclick="clearSlip()">🗑 清空</button>
            <button class="btn btn-buy" onclick="submitSlip()">🎯 模拟出票</button>
        </div>
        <div class="sim-history" id="calcHistoryArea" style="display:none">
            <div class="sim-h-title">📝 出票记录</div>
            <div id="calcHistoryList"></div>
        </div>
    `;

    const picker = document.getElementById('calcMatchPicker');
    if (picker) picker.addEventListener('change', function() { showOddsForPicker(this.value); });

    const parlaySel = document.getElementById('calcParlaySelect');
    if (parlaySel && calcParlayType) {
        const exists = Array.from(parlaySel.options).some(o => o.value === calcParlayType);
        if (exists) parlaySel.value = calcParlayType;
    }
    const pt = PLAY_TYPES.find(p => p.value === calcPlayType);
    const hintEl = document.getElementById('calcPlayTypeHint');
    if (hintEl && pt) hintEl.textContent = pt.desc;

    renderSlip();
    updatePayoutCalc();
    renderHistory();
}

function buildMatchPickerOptions() {
    if (typeof LotteryAPI !== 'undefined') {
        const calcMatches = LotteryAPI.getCalcMatches();
        if (calcMatches && calcMatches.length > 0) {
            return calcMatches.filter(m => m.status !== 'played').map(m => {
                const code = m.code || (SCHEDULE_DATA.find(x => x.id === m.id)?.lotteryCode || '');
                return `<option value="${m.id}">[${code}] ${m.homeFlag||''}${m.homeTeam||m.home} vs ${m.awayFlag||''}${m.awayTeam||m.away}</option>`;
            }).join('');
        }
    }
    return SCHEDULE_DATA.filter(m => m.status !== 'played').slice(0, 60).map(m =>
        `<option value="${m.id}">[${m.lotteryCode}] ${m.homeFlag}${m.home} vs ${m.awayFlag}${m.away}</option>`
    ).join('');
}

function getMatchOddsForCalc(matchId) {
    if (typeof LotteryAPI !== 'undefined') {
        const realOdds = LotteryAPI.getMatchOdds(matchId);
        if (realOdds) return realOdds;
    }
    return generateOdds();
}

function showOddsForPicker(matchId) {
    const area = document.getElementById('calcOddsArea');
    if (!matchId) { if(area) area.innerHTML = `<div style="text-align:center;color:var(--text-dim);font-size:13px;padding:10px;">👆 选比赛后点"添加"，再选择投注选项</div>`; return; }
    const m = SCHEDULE_DATA.find(x => x.id === matchId);
    if (!m) return;
    const o = getMatchOddsForCalc(matchId);
    const matchLabel = `${m.homeFlag} ${m.home} vs ${m.away} ${m.awayFlag}`;
    const sourceLabel = (typeof LotteryAPI !== 'undefined' && LotteryAPI.getStatus().source === 'official') ? '<span class="data-source-tag">官方</span>' : '';
    const playTypeLabel = PLAY_TYPES.find(p => p.value === calcPlayType)?.label || '胜平负';
    let oddsHtml = '';

    if (calcPlayType === 'spf') {
        const w = fix2(o.spf.win), d = fix2(o.spf.draw), l = fix2(o.spf.lose);
        oddsHtml = `<div class="odds-section-title">${playTypeLabel} 赔率 ${sourceLabel}</div>
        <div class="calc-odds-row">
            <button class="calc-odds-btn" onclick="addPickToSlip('${m.id}','${m.lotteryCode}','${matchLabel}','胜','${w}','spf')"><div class="co-name">主胜</div><div class="co-odds">${w}</div></button>
            <button class="calc-odds-btn" onclick="addPickToSlip('${m.id}','${m.lotteryCode}','${matchLabel}','平','${d}','spf')"><div class="co-name-draw">平局</div><div class="co-odds-draw">${d}</div></button>
            <button class="calc-odds-btn" onclick="addPickToSlip('${m.id}','${m.lotteryCode}','${matchLabel}','负','${l}','spf')"><div class="co-name">主负</div><div class="co-odds-lose">${l}</div></button>
        </div>`;
    } else if (calcPlayType === 'rqspf') {
        const handicap = o.rqspf.handicap || '-1';
        const h = parseInt(handicap), hText = h > 0 ? `+${h}` : `${h}`;
        const rw = fix2(o.rqspf.win), rd = fix2(o.rqspf.draw), rl = fix2(o.rqspf.lose);
        oddsHtml = `<div class="odds-section-title">${playTypeLabel} · 让球 <span class="handicap-badge">${hText}</span> ${sourceLabel}</div>
        <div class="calc-odds-row">
            <button class="calc-odds-btn" onclick="addPickToSlip('${m.id}','${m.lotteryCode}','${matchLabel}','让胜(${hText})','${rw}','rqspf')"><div class="co-name">让胜</div><div class="co-odds">${rw}</div></button>
            <button class="calc-odds-btn" onclick="addPickToSlip('${m.id}','${m.lotteryCode}','${matchLabel}','让平(${hText})','${rd}','rqspf')"><div class="co-name-draw">让平</div><div class="co-odds-draw">${rd}</div></button>
            <button class="calc-odds-btn" onclick="addPickToSlip('${m.id}','${m.lotteryCode}','${matchLabel}','让负(${hText})','${rl}','rqspf')"><div class="co-name">让负</div><div class="co-odds-lose">${rl}</div></button>
        </div>`;
    } else if (calcPlayType === 'bf') {
        oddsHtml = `<div class="odds-section-title">${playTypeLabel} · 请选择比分 ${sourceLabel}</div><div class="odds-grid odds-grid-bf">${Object.entries(o.scoreOdds||{}).map(([s,od]) => {
            let cls='odds-chip'; if(s==='胜其他')cls+=' odds-chip-home';else if(s==='平其他')cls+=' odds-chip-draw';else if(s==='负其他')cls+=' odds-chip-away';else{const p=s.split(':');cls+=+p[0]>+p[1]?' odds-chip-home':+p[0]<+p[1]?' odds-chip-away':' odds-chip-draw';}
            return `<button class="${cls}" onclick="addPickToSlip('${m.id}','${m.lotteryCode}','${matchLabel}','比分${s}','${fix2(od)}','bf')"><span class="oc-score">${s}</span><span class="oc-odds">${fix2(od)}</span></button>`;
        }).join('')}</div>`;
    } else if (calcPlayType === 'zjq') {
        oddsHtml = `<div class="odds-section-title">${playTypeLabel} · 进球数 ${sourceLabel}</div><div class="odds-grid odds-grid-zjq">${Object.entries(o.zjqOdds||{}).map(([k,od]) => 
            `<button class="odds-chip odds-chip-neutral" onclick="addPickToSlip('${m.id}','${m.lotteryCode}','${matchLabel}','${k}球','${fix2(od)}','zjq')"><span class="oc-score">${k}</span><span class="oc-odds">${fix2(od)}</span></button>`
        ).join('')}</div>`;
    } else {
        oddsHtml = `<div class="odds-section-title">${playTypeLabel} · 半场/全场 ${sourceLabel}</div><div class="odds-grid odds-grid-bqc">${Object.entries(o.bqcOdds||{}).map(([k,od]) =>
            `<button class="odds-chip odds-chip-neutral" onclick="addPickToSlip('${m.id}','${m.lotteryCode}','${matchLabel}','${k}','${fix2(od)}','bqc')"><span class="oc-score">${k}</span><span class="oc-odds">${fix2(od)}</span></button>`
        ).join('')}</div>`;
    }
    if (area) area.innerHTML = `<div style="font-size:12px;color:var(--text-light);margin-bottom:4px"><span class="lottery-code-badge">${m.lotteryCode}</span>${matchLabel}</div>${oddsHtml}`;
}

function fix2(v) { return typeof v === 'number' ? v.toFixed(2) : v; }

window.addMatchToSlip = function() {
    const picker = document.getElementById('calcMatchPicker');
    const matchId = picker ? picker.value : null;
    if (!matchId) { alert('请先选择一场比赛'); return; }
    const allowMulti = ['bf','zjq','bqc'].includes(calcPlayType);
    const existingCount = calcSlip.filter(s => s.matchId === matchId).length;
    if (!allowMulti) {
        if (calcSlip.length >= 5) { alert('最多选5场比赛'); return; }
        if (existingCount > 0) { alert('该比赛已在投注单中'); return; }
    } else {
        if (calcSlip.length >= 5) { alert('最多选5场比赛'); return; }
        if (calcSlip.some(s => s.matchId === matchId && s.playType !== calcPlayType)) { alert('同一场只能用一种玩法'); return; }
        if (existingCount >= 3) { alert('每场最多3个选项'); return; }
    }
    showOddsForPicker(matchId);
    const oddsArea = document.getElementById('calcOddsArea');
    if (oddsArea) oddsArea.scrollIntoView({ behavior: 'smooth' });
};

window.addPickToSlip = function(matchId, lotteryCode, matchName, betLabel, odds, playType) {
    if (calcSlip.length >= 5) { alert('最多5场'); return; }
    if (calcSlip.some(s => s.matchId === matchId && s.betLabel === betLabel && s.playType === playType)) { alert('已存在'); return; }
    calcSlip.push({ matchId, lotteryCode, matchName, betLabel, odds: parseFloat(odds), playType: playType || calcPlayType });
    if (calcSlip.length >= 2 && calcParlayType === 'single') calcParlayType = '2-1';
    renderSlip();
    updatePayoutCalc();
    const picker = document.getElementById('calcMatchPicker');
    if (picker) picker.value = '';
    const oddsArea = document.getElementById('calcOddsArea');
    if (oddsArea) oddsArea.innerHTML = '<div style="text-align:center;color:var(--text-dim);font-size:13px;padding:10px;">✅ 已添加，继续选或"模拟出票"</div>';
};

function renderSlip() {
    const el = document.getElementById('calcSlip');
    if (!el) return;
    if (calcSlip.length === 0) {
        el.innerHTML = '<div class="calc-slip-empty">📋 请添加比赛到投注单</div>';
    } else {
        el.innerHTML = calcSlip.map((s, i) => {
            const pt = PLAY_TYPES.find(p => p.value === s.playType) || { label: s.playType };
            return `<div class="calc-slip-item">
                <span class="csi-code">[${s.lotteryCode}]</span>
                <span class="csi-playtype">${pt.label}</span>
                <span class="csi-match">${s.matchName}</span>
                <span class="csi-pick">${s.betLabel} <span class="csi-odds">@${s.odds}</span></span>
                <span class="cs-del" onclick="removeSlipItem(${i})">✕</span>
            </div>`;
        }).join('');
    }
}

window.onPlayTypeChange = function(val) {
    calcPlayType = val;
    const pt = PLAY_TYPES.find(p => p.value === val);
    const hintEl = document.getElementById('calcPlayTypeHint');
    if (hintEl) hintEl.textContent = pt ? pt.desc : '';
    const oddsArea = document.getElementById('calcOddsArea');
    if (oddsArea) oddsArea.innerHTML = `<div style="text-align:center;color:var(--text-dim);font-size:13px;padding:10px;">👆 选比赛后点"添加"，选择${pt?pt.label:''}选项</div>`;
};

window.removeSlipItem = function(i) { calcSlip.splice(i, 1); if (calcSlip.length < 2) calcParlayType = 'single'; renderSlip(); updatePayoutCalc(); };
window.clearSlip = function() { calcSlip = []; calcParlayType = 'single'; calcMultiplier = 1; renderSlip(); updatePayoutCalc();
    const oddsArea = document.getElementById('calcOddsArea');
    if (oddsArea) oddsArea.innerHTML = '<div style="text-align:center;color:var(--text-dim);font-size:13px;padding:10px;">👆 选比赛后点"添加"，再选择投注选项</div>';
};
window.onParlayChange = function(val) { calcParlayType = val; updatePayoutCalc(); };
window.onMultiplierChange = function(val) { calcMultiplier = parseInt(val); updatePayoutCalc(); };

function updatePayoutCalc() {
    const n = calcSlip.length;
    const summaryEl = document.getElementById('calcSummary');
    if (!summaryEl) return;
    if (n === 0) { summaryEl.style.display = 'none'; return; }
    summaryEl.style.display = 'block';
    setText('csrSource', typeof LotteryAPI !== 'undefined' ? LotteryAPI.getStatusText() : '📋 模拟数据');
    setText('csrMatches', `${n}场`);
    const uniqueTypes = [...new Set(calcSlip.map(s => s.playType))];
    setText('csrPlayType', uniqueTypes.map(t => PLAY_TYPES.find(p => p.value === t)?.label || t).join('+'));
    setText('csrParlay', getParlayOptions(n).find(o => o.value === calcParlayType)?.label || '单关');
    const betCount = getBetCount(calcParlayType, n);
    setText('csrBetCount', `${betCount}注`);
    setText('csrMultiplier', `${calcMultiplier}倍`);
    const totalAmount = betCount * 2 * calcMultiplier;
    setText('csrAmount', `¥${totalAmount}`);
    let payout = 0;
    if (calcParlayType === 'single') { payout = calcSlip.reduce((sum, s) => sum + s.odds * 2 * calcMultiplier, 0); }
    else { const parlayN = parseInt(calcParlayType.split('-')[0]); if (parlayN <= n) payout = calcSlip.slice(0, parlayN).reduce((a, s) => a * s.odds, 1) * 2 * calcMultiplier; }
    setText('csrPayout', `¥${payout.toFixed(2)}`);

    const parlaySel = document.getElementById('calcParlaySelect');
    if (parlaySel && n >= 2) {
        const opts = getParlayOptions(n);
        const curVal = parlaySel.value;
        parlaySel.innerHTML = opts.map(o => `<option value="${o.value}" ${o.value===curVal?'selected':''}>${o.label}</option>`).join('');
        if (!opts.some(o => o.value === curVal)) { parlaySel.value = opts[opts.length-1].value; calcParlayType = parlaySel.value; }
    }
}

window.submitSlip = function() {
    if (calcSlip.length === 0) { alert('请先添加比赛'); return; }
    const n = calcSlip.length;
    const betCount = getBetCount(calcParlayType, n);
    const totalAmount = betCount * 2 * calcMultiplier;
    let payout = 0;
    if (calcParlayType === 'single') { payout = calcSlip.reduce((sum, s) => sum + s.odds * 2 * calcMultiplier, 0); }
    else { const parlayN = parseInt(calcParlayType.split('-')[0]); payout = calcSlip.slice(0, parlayN).reduce((a, s) => a * s.odds, 1) * 2 * calcMultiplier; }
    let finalPayout = '0', isWin = false;
    if (calcParlayType === 'single') { const winSlips = calcSlip.filter(() => Math.random() < 0.33); finalPayout = winSlips.reduce((sum, s) => sum + s.odds * 2 * calcMultiplier, 0).toFixed(2); isWin = winSlips.length > 0; }
    else { isWin = calcSlip.every(() => Math.random() < 0.33); finalPayout = isWin ? payout.toFixed(2) : '0'; }
    const rec = { id: Date.now(), picks: calcSlip.map(s => ({ ...s })), combine: getParlayOptions(n).find(o => o.value === calcParlayType)?.label || '单关', betCount, multiplier: calcMultiplier, amount: totalAmount, isWin, payout: finalPayout, time: new Date().toLocaleString('zh-CN') };
    calcHistory.unshift(rec);
    if (calcHistory.length > 10) calcHistory.pop();
    clearSlip(); renderHistory(); rerenderCalc(); showResultModal(rec);
};

function renderHistory() {
    const area = document.getElementById('calcHistoryArea');
    const list = document.getElementById('calcHistoryList');
    if (!area || !list) return;
    if (calcHistory.length === 0) { area.style.display = 'none'; }
    else { area.style.display = 'block';
        list.innerHTML = calcHistory.map(r => `<div class="sim-h-item"><div>
            <div>${r.picks.map(p => `[${p.lotteryCode}]<span class="h-playtype">${(PLAY_TYPES.find(x=>x.value===p.playType)||{label:p.playType}).label}</span> ${p.betLabel}@${p.odds}`).join('<br>')}</div>
            <div style="font-size:10px;color:var(--text-dim);margin-top:4px">${r.combine} · ${r.betCount}注×${r.multiplier}倍 · ¥${r.amount}</div>
            <div style="font-size:9px;color:var(--text-dim)">${r.time}</div></div>
            <div><span class="${r.isWin?'win':'lose'}">${r.isWin?'+¥'+r.payout:'-¥'+r.amount}</span></div></div>`).join('');
    }
}

function showResultModal(rec) {
    document.querySelectorAll('.sim-modal-overlay, .sim-modal').forEach(e => e.remove());
    const overlay = document.createElement('div'); overlay.className = 'sim-modal-overlay';
    const modal = document.createElement('div'); modal.className = 'sim-modal';
    modal.innerHTML = `<button class="sim-modal-close" onclick="this.parentElement.remove();document.querySelector('.sim-modal-overlay').remove()">✕</button>
        <div style="text-align:center;padding:8px 0 16px">
            <div style="font-size:48px;margin-bottom:8px">${rec.isWin ? '🎉' : '😢'}</div>
            <div style="font-size:18px;font-weight:700">${rec.isWin ? '恭喜中奖！' : '未中奖'}</div>
            <div style="color:var(--text-light);font-size:12px;margin-top:8px;line-height:1.8">${rec.picks.map(p => `[${p.lotteryCode}] <span style="background:rgba(0,212,170,0.1);padding:1px 6px;border-radius:4px;font-size:10px;color:var(--accent)">${(PLAY_TYPES.find(x=>x.value===p.playType)||{label:p.playType}).label}</span> ${p.betLabel}(@${p.odds})`).join('<br>')}</div>
            <div style="margin-top:10px;font-size:12px;color:var(--text-light)">${rec.combine} · ${rec.betCount}注×${rec.multiplier}倍</div>
            <div style="font-size:28px;font-weight:900;color:${rec.isWin?'var(--green)':'var(--text-dim)'};margin:10px 0">${rec.isWin?'¥'+rec.payout:'¥0'}</div>
            <div style="font-size:12px;color:var(--text-dim)">投注金额 ¥${rec.amount}</div></div>`;
    overlay.onclick = () => { overlay.remove(); modal.remove(); };
    document.body.appendChild(overlay); document.body.appendChild(modal);
}

// ==================== 球队分组 ====================
let currentGroup = 'A';

function initTeamsGroup() {
    const groupTabs = document.getElementById('groupTabs');
    if (!groupTabs) return;
    groupTabs.innerHTML = GROUPS.map(g => `<button class="gtab" data-group="${g}" onclick="showGroup('${g}')">${g}组</button>`).join('');
    showGroup('A');
    renderAllTeams();
}

window.showGroup = function(g) {
    currentGroup = g;
    document.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
    const active = document.querySelector(`.gtab[data-group="${g}"]`);
    if (active) active.classList.add('active');

    const teams = GROUPED_TEAMS[g] || [];
    const content = document.getElementById('groupContent');
    if (!content) return;
    content.innerHTML = `<div class="group-teams">${teams.map(t => `
        <div class="group-team" data-team="${t.name}" data-flag="${t.flag}">
            <span class="gt-flag">${t.flag}</span>
            <span class="gt-name">${t.name}</span>
            ${t.host ? '<span class="gt-host">东道主</span>' : ''}
            <span class="gt-rank">#${t.rank}</span>
            <span class="gt-arrow">▶</span>
        </div>`).join('')}</div>`;

    content.querySelectorAll('.group-team').forEach(el => {
        el.addEventListener('click', function() { showTeamDetail(null, this.dataset.team, this.dataset.flag); });
    });

    // 同步更新积分榜
    renderStandings(g);
};

// ==================== 积分榜 ====================
function renderStandings(group) {
    const table = document.getElementById('standingsTable');
    const hint = document.getElementById('standingsHint');
    if (!table) return;

    const allStandings = getGroupStandings();
    const gs = allStandings[group] || [];

    const hasResults = gs.some(t => t.P > 0);
    if (hint) {
        hint.textContent = hasResults ? '✅ 实时更新中' : '小组赛开赛后实时更新';
    }

    if (gs.length === 0) {
        table.innerHTML = '<div class="standings-empty">暂无数据</div>';
        return;
    }

    // 小组前2名大概率晋级，前8个小组第三也有机会
    table.innerHTML = `
    <div class="st-table">
        <div class="st-header">
            <span class="st-col-rank">#</span>
            <span class="st-col-team">球队</span>
            <span class="st-col-stat">场</span>
            <span class="st-col-stat">胜</span>
            <span class="st-col-stat">平</span>
            <span class="st-col-stat">负</span>
            <span class="st-col-stat">进</span>
            <span class="st-col-stat">失</span>
            <span class="st-col-stat">净</span>
            <span class="st-col-pts">分</span>
        </div>
        ${gs.map((t, i) => {
            let rowClass = '';
            if (hasResults) {
                if (i === 0) rowClass = 'st-qualify st-top1';
                else if (i === 1) rowClass = 'st-qualify';
            }
            return `<div class="st-row ${rowClass}">
                <span class="st-col-rank">${i + 1}</span>
                <span class="st-col-team">
                    <span class="st-flag">${t.team.flag}</span>
                    <span class="st-name">${t.team.name}</span>
                </span>
                <span class="st-col-stat">${t.P}</span>
                <span class="st-col-stat">${t.W}</span>
                <span class="st-col-stat">${t.D}</span>
                <span class="st-col-stat">${t.L}</span>
                <span class="st-col-stat">${t.GF}</span>
                <span class="st-col-stat">${t.GA}</span>
                <span class="st-col-stat st-gd">${t.GD > 0 ? '+' + t.GD : t.GD}</span>
                <span class="st-col-pts">${t.Pts}</span>
            </div>`;
        }).join('')}
    </div>
    <div class="st-legend">🏷 绿色高亮 = 直接晋级区（小组前2）</div>`;
}

function renderAllTeams(filter = '') {
    const list = filter ? TEAMS_DATA.filter(t => t.name.includes(filter) || t.confederation.includes(filter.toUpperCase())) : TEAMS_DATA;
    const grid = document.getElementById('teamsGrid');
    if (!grid) return;
    grid.innerHTML = list.map(t => `<div class="team-card-item" data-team="${t.name}" data-flag="${t.flag}">
        <span class="tc-flag">${t.flag}</span>
        <div class="tc-info">
            <h4>${t.name} ${t.host?'🏠':''}</h4>
            <div class="tc-conf">${t.confederation}</div>
            <div class="tc-rank">世界排名 #${t.rank}</div>
        </div>
        <span class="tc-group-tag">${t.group}组</span>
        <span class="tc-arrow">▶</span>
    </div>`).join('');

    grid.querySelectorAll('.team-card-item').forEach(el => {
        el.addEventListener('click', function() { showTeamDetail(null, this.dataset.team, this.dataset.flag); });
    });
}

window.filterTeams = function() {
    const inp = document.getElementById('teamSearch');
    renderAllTeams(inp ? inp.value : '');
};

// ==================== 球队详情弹窗（球员+H2H） ====================
let currentTeamName = '';
let currentTeamFlag = '';

window.showTeamDetail = function(event, teamName, teamFlag) {
    if (event && event.stopPropagation) event.stopPropagation();
    if (teamName === '待定') return;
    currentTeamName = teamName;
    currentTeamFlag = teamFlag;

    document.querySelectorAll('.player-modal-overlay, .player-modal, .h2h-modal-overlay, .h2h-modal').forEach(e => e.remove());

    const players = PLAYERS_DATA[teamName] || [];
    const teamInfo = TEAMS_DATA.find(t => t.name === teamName);
    const conf = teamInfo ? teamInfo.confederation : '';
    const rank = teamInfo ? teamInfo.rank : '--';
    const group = teamInfo ? teamInfo.group : '--';

    const overlay = document.createElement('div');
    overlay.className = 'player-modal-overlay';
    overlay.onclick = () => { overlay.remove(); modal.remove(); };

    const modal = document.createElement('div');
    modal.className = 'player-modal';
    modal.id = 'teamDetailModal';

    const posColor = { '前锋': '#ff4757', '中场': '#4dabf7', '后卫': '#40c057', '门将': '#ff922b' };

    modal.innerHTML = `
        <div class="player-modal-header">
            <button class="player-modal-close" onclick="this.closest('.player-modal').remove();document.querySelector('.player-modal-overlay').remove()">✕</button>
            <div class="pmh-flag">${teamFlag}</div>
            <div class="pmh-name">${teamName}</div>
            <div class="pmh-info">${group}组 · 世界排名 #${rank} · ${conf}</div>
            <div class="pmh-tabs">
                <button class="pmh-tab active" data-section="players" onclick="switchTeamTab('players')">👥 球员名单</button>
                <button class="pmh-tab" data-section="h2h" onclick="switchTeamTab('h2h')">⚔️ 历史对战</button>
            </div>
        </div>
        <div id="teamPlayersSection" class="player-list">
            ${players.length > 0 ? players.map(p => `
                <div class="player-item" data-player='${JSON.stringify(p).replace(/'/g, "&#39;")}' data-team="${teamName}" data-flag="${teamFlag}">
                    <span class="pi-num">${p.num}</span>
                    <span class="pi-pos" style="background:${posColor[p.pos]||'#888'}">${p.pos}</span>
                    <span class="pi-name">${p.name}</span>
                    <span class="pi-meta">${p.age}岁 · ${p.club}</span>
                </div>`).join('') : `
                <div style="text-align:center;padding:40px;color:var(--text-dim)">
                    <div style="font-size:40px;margin-bottom:8px">📋</div>
                    <div>暂无球员数据</div>
                    <div style="font-size:11px;margin-top:4px">阵容待公布</div>
                </div>`}
            <div class="player-modal-footer">共 ${players.length} 名球员</div>
        </div>
        <div id="teamH2hSection" class="h2h-section" style="display:none">
            ${renderH2HContent(teamName)}
        </div>
    `;

    // 绑定球员点击
    modal.querySelectorAll('#teamPlayersSection .player-item').forEach(el => {
        el.addEventListener('click', function(e) {
            e.stopPropagation();
            const playerData = JSON.parse(this.dataset.player);
            showPlayerDetail(playerData, this.dataset.team, this.dataset.flag);
        });
    });

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
};

function renderH2HContent(teamName) {
    const h2hData = H2H_DATA[teamName];
    if (!h2hData || Object.keys(h2hData).length === 0) {
        return `<div class="h2h-empty">
            <div class="h2h-empty-icon">📊</div>
            <div>暂无历史对战数据</div>
            <div style="font-size:11px;color:var(--text-dim);margin-top:4px">数据持续更新中</div>
        </div>`;
    }

    return Object.entries(h2hData).map(([opponent, data]) => {
        const oppTeam = TEAMS_DATA.find(t => t.name === opponent);
        const oppFlag = oppTeam ? oppTeam.flag : '';
        return `<div class="h2h-match">
            <div class="h2h-vs-header">
                <span class="h2h-vs-team">${currentTeamFlag}</span>
                <span class="h2h-vs-text">vs</span>
                <span class="h2h-vs-team">${oppFlag}</span>
                <span style="font-size:14px;font-weight:700">${opponent}</span>
            </div>
            <div class="h2h-record">📊 ${data.record}</div>
            <div class="h2h-wc">🏆 ${data.wcMatches}</div>
            <div class="h2h-last">📅 ${data.last}</div>
            <div class="h2h-highlight">⭐ ${data.highlight}</div>
        </div>`;
    }).join('');
}

window.switchTeamTab = function(section) {
    document.querySelectorAll('.pmh-tab').forEach(t => t.classList.remove('active'));
    const tab = document.querySelector(`.pmh-tab[data-section="${section}"]`);
    if (tab) tab.classList.add('active');

    const playersSec = document.getElementById('teamPlayersSection');
    const h2hSec = document.getElementById('teamH2hSection');
    if (playersSec && h2hSec) {
        playersSec.style.display = section === 'players' ? 'block' : 'none';
        h2hSec.style.display = section === 'h2h' ? 'block' : 'none';
    }
};

// ==================== 单个球员详情弹窗 ====================
// Wikipedia 头像缓存 (localStorage)
const PHOTO_CACHE = (() => {
    try { return JSON.parse(localStorage.getItem('wc_photo_cache') || '{}'); } catch(e) { return {}; }
})();
function savePhotoCache() { try { localStorage.setItem('wc_photo_cache', JSON.stringify(PHOTO_CACHE)); } catch(e) {} }

function fetchPlayerPhoto(enName, imgEl, fallbackImg) {
    // 优先从缓存读取
    if (PHOTO_CACHE[enName]) {
        imgEl.src = PHOTO_CACHE[enName];
        return;
    }
    // 调用 Wikipedia API
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${enName}&prop=pageimages&format=json&pithumbsize=300&origin=*`;
    fetch(apiUrl)
        .then(r => r.json())
        .then(data => {
            const pages = data.query.pages;
            const page = Object.values(pages)[0];
            if (page && page.thumbnail && page.thumbnail.source) {
                PHOTO_CACHE[enName] = page.thumbnail.source;
                savePhotoCache();
                imgEl.src = page.thumbnail.source;
            }
        })
        .catch(() => {});
}

function showPlayerDetail(player, teamName, teamFlag) {
    document.querySelectorAll('.pdetail-modal-overlay, .pdetail-modal').forEach(e => e.remove());

    const posBg = {
        '前锋': 'linear-gradient(135deg, #ff4757, #c0392b)',
        '中场': 'linear-gradient(135deg, #4dabf7, #2d6da4)',
        '后卫': 'linear-gradient(135deg, #40c057, #1e7a34)',
        '门将': 'linear-gradient(135deg, #ff922b, #d47516)'
    };
    const posEmoji = { '前锋': '⚽', '中场': '🎯', '后卫': '🛡', '门将': '🧤' };
    const posColor = { '前锋': '#ff4757', '中场': '#4dabf7', '后卫': '#40c057', '门将': '#ff922b' };
    const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&size=200&background=1a1d2e&color=00d4aa&bold=true`;

    const overlay = document.createElement('div'); overlay.className = 'pdetail-modal-overlay';
    overlay.onclick = () => { overlay.remove(); detailModal.remove(); };

    const detailModal = document.createElement('div'); detailModal.className = 'pdetail-modal';
    detailModal.innerHTML = `
        <div class="pdetail-hero" style="background:${posBg[player.pos] || 'linear-gradient(135deg, #636e72, #2d3436)'}">
            <button class="pdetail-close" onclick="this.closest('.pdetail-modal').remove();document.querySelector('.pdetail-modal-overlay').remove()">✕</button>
            <div class="pdetail-team-badge"><span>${teamFlag}</span><span>${teamName}</span></div>
            <div class="pdetail-photo-wrapper">
                <img class="pdetail-photo" src="${fallbackImg}" alt="${player.name}" onerror="this.onerror=null;this.src='${fallbackImg}'" loading="lazy" referrerpolicy="no-referrer">
            </div>
            <div class="pdetail-num-big">${player.num}</div>
        </div>
        <div class="pdetail-info-card">
            <h2 class="pdetail-name">${player.name}</h2>
            <div class="pdetail-tags">
                <span class="pdetail-tag" style="background:${posColor[player.pos]||'#888'};color:#fff">${posEmoji[player.pos]||''} ${player.pos}</span>
                <span class="pdetail-tag pdetail-tag-num">#${player.num}</span>
            </div>
            <div class="pdetail-details">
                <div class="pdetail-row"><span class="pdetail-label">年龄</span><span class="pdetail-value">${player.age} 岁</span></div>
                <div class="pdetail-row"><span class="pdetail-label">俱乐部</span><span class="pdetail-value">${player.club}</span></div>
                <div class="pdetail-row"><span class="pdetail-label">国家队</span><span class="pdetail-value">${teamFlag} ${teamName}</span></div>
                <div class="pdetail-row"><span class="pdetail-label">位置</span><span class="pdetail-value">${player.pos}</span></div>
                <div class="pdetail-row"><span class="pdetail-label">球衣号码</span><span class="pdetail-value pdetail-num-val">${player.num}</span></div>
            </div>
            <div class="pdetail-bio">
                <p>${player.name}，${player.age}岁，司职${player.pos}，目前效力于${player.club}。作为${teamName}国家队成员，身穿${player.num}号球衣，将代表${teamFlag} ${teamName}征战2026世界杯。</p>
            </div>
        </div>
        <div class="pdetail-actions">
            <button class="pdetail-btn-back" onclick="this.closest('.pdetail-modal').remove();document.querySelector('.pdetail-modal-overlay').remove()">← 返回球员列表</button>
        </div>`;
    document.body.appendChild(overlay); document.body.appendChild(detailModal);

    // 如果球员有 enName，用 Wikipedia API 获取真实头像
    if (player.enName) {
        const photoImg = detailModal.querySelector('.pdetail-photo');
        fetchPlayerPhoto(player.enName, photoImg, fallbackImg);
    }
}
