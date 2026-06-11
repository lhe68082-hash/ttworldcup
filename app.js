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

// ==================== 卡密验证（设备限制版） ====================
const KEY_STORAGE = 'hw2026_activated_key';
const DEVICE_KEY = 'hw2026_device_id';
const KEY_DEVICES_KEY = 'hw2026_key_devices';
const MAX_DEVICES = 3; // 每个卡密最多绑定3个设备

// 生成/获取设备唯一ID
function getDeviceId() {
    let deviceId = localStorage.getItem(DEVICE_KEY);
    if (!deviceId) {
        deviceId = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem(DEVICE_KEY, deviceId);
    }
    return deviceId;
}

// 获取所有卡密的设备注册表
function getKeyDeviceRegistry() {
    try {
        return JSON.parse(localStorage.getItem(KEY_DEVICES_KEY) || '{}');
    } catch(e) { return {}; }
}

// 保存设备注册表
function saveKeyDeviceRegistry(registry) {
    localStorage.setItem(KEY_DEVICES_KEY, JSON.stringify(registry));
}

// 检查卡密是否有效且未超设备限制
function checkKeyDeviceLimit(key) {
    const registry = getKeyDeviceRegistry();
    const deviceId = getDeviceId();
    const keyReg = registry[key] || { devices: [] };

    // 情况1：此设备已注册过此卡密（换浏览器后重新激活）
    if (keyReg.devices.includes(deviceId)) {
        return { ok: true, alreadyRegistered: true, usedBy: keyReg.devices.length };
    }

    // 情况2：卡密已达最大设备数
    if (keyReg.devices.length >= MAX_DEVICES) {
        return { ok: false, reason: 'limit', usedBy: MAX_DEVICES };
    }

    // 情况3：正常注册
    return { ok: true, alreadyRegistered: false, usedBy: keyReg.devices.length };
}

// 注册设备到卡密
function registerDeviceToKey(key) {
    const registry = getKeyDeviceRegistry();
    const deviceId = getDeviceId();
    if (!registry[key]) registry[key] = { devices: [] };
    if (!registry[key].devices.includes(deviceId)) {
        registry[key].devices.push(deviceId);
    }
    saveKeyDeviceRegistry(registry);
}

// 显示设备使用情况
function getKeyUsageInfo(key) {
    const registry = getKeyDeviceRegistry();
    const info = registry[key];
    if (!info) return { used: 0, max: MAX_DEVICES };
    return { used: info.devices.length, max: MAX_DEVICES };
}

// 统计全局卡密激活情况
function getTotalKeyStats() {
    const registry = getKeyDeviceRegistry();
    let activated = 0;
    let totalDevices = 0;
    VALID_KEYS.forEach(k => {
        const info = registry[k];
        if (info && info.devices && info.devices.length > 0) {
            activated++;
            totalDevices += info.devices.length;
        }
    });
    return { activated, total: VALID_KEYS.length, totalDevices };
}

function renderKeyStats() {
    const el = document.getElementById('keyStats');
    if (!el) return;
    const stats = getTotalKeyStats();
    el.innerHTML = `<span class="ks-activated">已激活 ${stats.activated}</span><span class="ks-sep">/</span><span class="ks-total">共 ${stats.total} 份</span>`;
}

function isKeyActivated() {
    const saved = localStorage.getItem(KEY_STORAGE);
    if (!saved) return false;
    if (!VALID_KEYS.includes(saved)) {
        // 卡密被禁用，从激活状态移除
        localStorage.removeItem(KEY_STORAGE);
        return false;
    }
    return true;
}

function activateKey() {
    const input = document.getElementById('keyInput');
    const errorEl = document.getElementById('keyError');
    const btn = document.getElementById('keyActivateBtn');
    const key = input ? input.value.trim().toUpperCase() : '';

    if (!key) {
        if (errorEl) errorEl.textContent = '⚠️ 请输入卡密';
        return;
    }

    if (!validateKey(key)) {
        if (errorEl) errorEl.innerHTML = '❌ 卡密无效，请检查后重试';
        if (input) {
            input.style.borderColor = 'var(--red)';
            input.style.boxShadow = '0 0 0 8px rgba(255,71,87,0.12)';
            setTimeout(() => {
                input.style.borderColor = 'var(--border)';
                input.style.boxShadow = 'none';
            }, 800);
        }
        return;
    }

    // 检查设备限制
    const check = checkKeyDeviceLimit(key);
    if (!check.ok) {
        const usageInfo = getKeyUsageInfo(key);
        if (errorEl) {
            errorEl.innerHTML = `⚠️ 此卡密已在 ${usageInfo.used} 台设备激活<br><small style="color:var(--text-light);">每个卡密最多支持 ${MAX_DEVICES} 台设备，如需更多请重新购买</small>`;
        }
        return;
    }

    // 注册设备
    registerDeviceToKey(key);
    localStorage.setItem(KEY_STORAGE, key);

    if (errorEl) {
        const usageInfo = getKeyUsageInfo(key);
        errorEl.innerHTML = `✅ 激活成功！<br><small style="color:var(--green);">已在设备列表注册（${usageInfo.used}/${MAX_DEVICES}）</small>`;
        errorEl.style.color = 'var(--green)';
    }
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>✅ 验证通过，正在进入...</span>';
    }

    setTimeout(() => {
        const overlay = document.getElementById('keyActivationOverlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.4s ease';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 400);
        }
    }, 1000);
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
    // 显示卡密激活统计
    renderKeyStats();

    initTheme();
    initBottomNav();
    initScrollSpy();
    initDateDisplay();
    initCountdown();
    initSchedule();
    initQuiz();
    initChampions();
    initLottery();
    // 竞彩模拟器可能因 lottery-api.js 加载失败而出错，不影响核心功能
    try { initSimBet(); } catch(e) { /* 竞彩模块加载失败 */ }
    try { initLedger(); } catch(e) { /* 记账本加载失败 */ }
    initTeamsGroup();
    initChampionAndAI();
    initCityDetails();
    initHostCountries();
    initLiveUpdates();
    initNewsTicker();
    initPlayerStatus();
});

// ==================== 底部导航 ====================
function initBottomNav() {
    const items = document.querySelectorAll('.bnav-item');
    const pages = document.querySelectorAll('.page');
    const allSubnavs = document.querySelectorAll('.subnav');

    function showSubnavFor(tabId) {
        // 隐藏所有二级导航
        allSubnavs.forEach(s => s.classList.remove('active'));
        // 显示当前页面对应的二级导航
        const subnav = document.getElementById('subnav-' + tabId);
        if (subnav) subnav.classList.add('active');
    }

    items.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-tab');
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            pages.forEach(p => p.classList.remove('active'));
            const page = document.getElementById(target);
            if (page) {
                page.classList.add('active');
                showSubnavFor(target);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // 懒加载触发
                if (target === 'schedule') { refreshScheduleIfNeeded(); renderBracket(); }
            }
        });
    });

    // 初始化：首页不显示二级导航
    showSubnavFor('home');

    // 二级导航点击事件（委托）
    document.addEventListener('click', function(e) {
        const subItem = e.target.closest('.subnav-item');
        if (!subItem) return;
        const anchorId = subItem.getAttribute('data-anchor');
        if (!anchorId) return;
        const anchor = document.getElementById(anchorId);
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // 更新激活状态
            const parentSubnav = subItem.closest('.subnav');
            if (parentSubnav) {
                parentSubnav.querySelectorAll('.subnav-item').forEach(si => si.classList.remove('active'));
                subItem.classList.add('active');
            }
        }
    });
}

window.switchTab = function(tabId) {
    const btn = document.querySelector(`.bnav-item[data-tab="${tabId}"]`);
    if (btn) btn.click();
};

// ==================== 滚动监听联动（Scroll Spy） ====================
// 向下滚动页面时，顶部子菜单自动高亮当前所在模块，并水平跟随滚动
let scrollSpyRaf = null;

function initScrollSpy() {
    window.addEventListener('scroll', () => {
        if (scrollSpyRaf) return;
        scrollSpyRaf = requestAnimationFrame(() => {
            updateSubnavOnScroll();
            scrollSpyRaf = null;
        });
    }, { passive: true });
}

function updateSubnavOnScroll() {
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;

    const subnav = activePage.querySelector('.subnav.active');
    if (!subnav) return;

    const buttons = subnav.querySelectorAll('.subnav-item');
    if (buttons.length === 0) return;

    // 触发线：顶栏(48px) + 子导航(~44px) + 一些余量
    const triggerY = window.scrollY + 110;

    let activeBtn = null;
    buttons.forEach(btn => {
        const anchorId = btn.getAttribute('data-anchor');
        if (!anchorId) return;
        const section = document.getElementById(anchorId);
        if (!section) return;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= triggerY) {
            activeBtn = btn;
        }
    });

    // 如果还没滚到任何模块（页面顶部），默认高亮第一个
    if (!activeBtn && buttons.length > 0) {
        activeBtn = buttons[0];
    }

    if (activeBtn && !activeBtn.classList.contains('active')) {
        buttons.forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
        // 水平滚动子导航，让激活按钮居中可见
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

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
    const btn = document.getElementById('themeToggle');
    if (btn) {
        const iconEl = btn.querySelector('.theme-icon');
        const labelEl = btn.querySelector('.theme-label');
        if (iconEl) iconEl.textContent = theme === 'light' ? '🌙' : '☀️';
        if (labelEl) labelEl.textContent = theme === 'light' ? '日间' : '夜间';
    }
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
    // 使用 ISO 8601 +08:00 明确北京时间，消除时区歧义
    const opening = new Date('2026-06-12T03:00:00+08:00'); // 6月12日 03:00 揭幕战
    const final   = new Date('2026-07-19T20:00:00+08:00'); // 7月19日 20:00 决赛（与赛程一致）

    function update() {
        const now = new Date();
        const titleEl = document.getElementById('cdTitle');
        const rowEl = document.getElementById('cdRow');

        if (now < opening) {
            // 开幕前：倒计时
            if (titleEl) titleEl.textContent = '揭幕战倒计时';
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
    renderBracket();
}

// ==================== 淘汰赛对阵表渲染 ====================
function renderBracket() {
    const container = document.getElementById('bracketContainer');
    if (!container) return;

    // 从 SCHEDULE_DATA 中提取淘汰赛阶段比赛
    const koStages = ['final', '3rd', 'sf', 'qf', 'r16', 'r32'];
    const stageConfig = {
        'final': { title: '🏆 决赛 · 7月19日', venue: '📍 纽约/新泽西 · 大都会人寿体育场', cls: 'final-match' },
        '3rd': { title: '🥉 三四名决赛 · 7月18日', venue: '📍 迈阿密', cls: '' },
        'sf': { title: '🔥 半决赛 · 7月14-15日', venue: '', cls: '' },
        'qf': { title: '💥 1/4决赛 · 7月9-12日', venue: '', cls: '' },
        'r16': { title: '⚡ 1/8决赛 · 7月5-8日 · 8场', venue: '', cls: '' },
        'r32': { title: '🎯 1/16决赛 · 6月28日-7月4日 · 16场', venue: '', cls: '' },
    };

    let html = '';
    koStages.forEach(stage => {
        const matches = SCHEDULE_DATA.filter(m => m.stage === stage);
        if (matches.length === 0) return;
        const cfg = stageConfig[stage];

        html += `<div class="bk-round"><div class="bk-round-title">${cfg.title}</div>`;

        // 最高轮次（决赛和三四名）：单场展示
        if (matches.length === 1) {
            const m = matches[0];
            const hasResult = m.score !== null;
            html += `<div class="bk-match ${cfg.cls}">
                <div class="bk-team"><span>${m.homeFlag}</span><span>${m.home}</span>${hasResult ? `<span style="font-weight:900;color:var(--accent)">${m.score.home}</span>` : ''}</div>
                <div class="bk-vs">${hasResult ? '<span style="color:var(--text-dim)">:</span>' : 'VS'}</div>
                <div class="bk-team"><span>${m.awayFlag}</span><span>${m.away}</span>${hasResult ? `<span style="font-weight:900;color:var(--blue)">${m.score.away}</span>` : ''}</div>
            </div>`;
            if (cfg.venue) html += `<div class="bk-venue">${cfg.venue}</div>`;
        } else if (matches.length === 2) {
            // 半决赛：2场并列
            html += '<div class="bk-row-2">';
            matches.forEach(m => {
                const hasResult = m.score !== null;
                html += `<div class="bk-match">
                    <div class="bk-team"><span style="font-size:20px">${m.homeFlag}</span><span style="font-size:11px">${m.home}</span>${hasResult ? `<span style="font-weight:900;color:var(--accent);font-size:12px">${m.score.home}</span>` : ''}</div>
                    <div class="bk-vs">VS</div>
                    <div class="bk-team"><span style="font-size:20px">${m.awayFlag}</span><span style="font-size:11px">${m.away}</span>${hasResult ? `<span style="font-weight:900;color:var(--blue);font-size:12px">${m.score.away}</span>` : ''}</div>
                </div>`;
            });
            html += '</div>';
            if (cfg.venue) html += `<div class="bk-venue">${cfg.venue}</div>`;
        } else if (matches.length === 4) {
            // 1/4决赛：4场两行
            html += '<div class="bk-row-4">';
            matches.forEach(m => {
                html += renderBracketMiniMatch(m);
            });
            html += '</div>';
        } else if (matches.length === 8) {
            // 1/8决赛：8场分两行
            html += '<div class="bk-row-4">';
            matches.slice(0, 4).forEach(m => { html += renderBracketMiniMatch(m); });
            html += '</div><div class="bk-row-4">';
            matches.slice(4, 8).forEach(m => { html += renderBracketMiniMatch(m); });
            html += '</div>';
        } else if (matches.length === 16) {
            // 1/16决赛：16场，简化显示（场次太多），只显示待定或有结果的
            const decided = matches.filter(m => m.home !== '待定' || m.away !== '待定' || m.score);
            if (decided.length > 0) {
                html += '<div class="bk-row-4">';
                decided.slice(0, 4).forEach(m => { html += renderBracketMiniMatch(m); });
                html += '</div>';
                if (decided.length > 4) {
                    html += '<div class="bk-row-4">';
                    decided.slice(4, 8).forEach(m => { html += renderBracketMiniMatch(m); });
                    html += '</div>';
                }
            } else {
                html += '<div class="bk-summary">32队争夺16强席位 — 2026赛制新增轮次</div>';
            }
        }
        html += '</div>';
    });

    // 小组赛说明
    html += '<div class="bk-round"><div class="bk-round-title">🌍 小组赛 · 6月12日-6月28日 · 72场</div><div class="bk-summary">48队 · 12组 · 每组前2名+8个最佳第三名晋级32强</div></div>';

    container.innerHTML = html;
}

function renderBracketMiniMatch(m) {
    const hasResult = m.score !== null;
    return `<div class="bk-match">
        <div class="bk-team"><span style="font-size:16px">${m.homeFlag}</span><span style="font-size:10px">${m.home}</span>${hasResult ? `<span style="font-weight:900;color:var(--accent);font-size:11px">${m.score.home}</span>` : ''}</div>
        <span class="bk-vs-sm">${hasResult ? ':' : 'VS'}</span>
        <div class="bk-team"><span style="font-size:16px">${m.awayFlag}</span><span style="font-size:10px">${m.away}</span>${hasResult ? `<span style="font-weight:900;color:var(--blue);font-size:11px">${m.score.away}</span>` : ''}</div>
    </div>`;
}

function refreshScheduleIfNeeded() {
    if (Date.now() - lastScheduleRender > 30000) renderSchedule();
}

function renderSchedule() {
    const grid = document.getElementById('scheduleGrid');
    if (!grid) return;
    lastScheduleRender = Date.now();

    const filtered = scheduleFilter === 'all' ? SCHEDULE_DATA :
        scheduleFilter === 'final' ? SCHEDULE_DATA.filter(m => m.stage === 'final' || m.stage === '3rd') :
        SCHEDULE_DATA.filter(m => m.stage === scheduleFilter);
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
        return `<div class="match-card ${cardClass}" data-date="${m.date.toISOString().slice(0,10)}">
            <div class="match-stage">${m.stageName}</div>
            <div class="match-meta"><span>📅 ${ds} ${ts} (北京时间)</span><span>🏟 ${m.venue}</span></div>
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

    // 显示/隐藏"返回今日"按钮
    const todayBtn = document.getElementById('scrollTodayBtn');
    if (todayBtn) {
        todayBtn.style.display = filtered.length > 10 ? 'inline-flex' : 'none';
    }
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

// ============== 滚动到今日比赛 ==============
function scrollToToday() {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const cards = document.querySelectorAll('#scheduleGrid .match-card');
    let targetEl = null;

    // 找第一个 >= 今天的未结束比赛
    for (const card of cards) {
        const cardDate = card.getAttribute('data-date');
        if (cardDate && cardDate >= today && !card.classList.contains('played')) {
            targetEl = card;
            break;
        }
    }
    // 全部比完了就找最后一个
    if (!targetEl && cards.length > 0) {
        targetEl = cards[cards.length - 1];
    }

    if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ==================== 广播消息栏 ====================
function initNewsTicker() {
    const scroll = document.querySelector('.news-scroll');
    if (!scroll) return;

    const now = new Date();
    const opening = new Date(2026, 5, 11, 0, 0, 0); // 6月11日开幕

    let messages;
    if (now < opening) {
        // 开幕前：预热消息
        messages = [
            '🔥 世界杯首次三国联办！',
            '🏟 决赛在纽约大都会人寿体育场',
            '🌎 48队分12组每组4队',
            '🎯 32强晋级淘汰赛',
            '⚡ 梅西C罗最后一舞？',
            '🏆 卫冕冠军阿根廷',
        ];
    } else {
        // 比赛期间：基于赛程数据动态生成
        messages = generateLiveMessages();
    }

    // 复制一遍用于无缝滚动
    const allMessages = [...messages, ...messages];
    scroll.innerHTML = allMessages.map(m => `<span>${m}</span>`).join('');
}

function generateLiveMessages() {
    const messages = [];
    const now = new Date();

    const live = SCHEDULE_DATA.filter(m => m.status === 'live');
    const recent = SCHEDULE_DATA.filter(m => m.status === 'played').slice(-3);
    const upcoming = SCHEDULE_DATA.filter(m => m.status !== 'played' && m.date > now).slice(0, 3);

    if (live.length > 0) {
        live.forEach(m => {
            const score = m.score ? `${m.score.home}:${m.score.away}` : 'vs';
            messages.push(`🔴 LIVE ${m.homeFlag}${m.home} ${score} ${m.away}${m.awayFlag}`);
        });
    }

    recent.forEach(m => {
        messages.push(`🏁 ${m.homeFlag}${m.home} ${m.score.home}:${m.score.away} ${m.away}${m.awayFlag}`);
    });

    upcoming.forEach(m => {
        const ds = m.date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        messages.push(`⏰ ${ds} ${m.homeFlag}${m.home} vs ${m.away}${m.awayFlag}`);
    });

    if (messages.length === 0) {
        messages.push('🏆 2026世界杯火热进行中！');
    }

    return messages;
}

// ==================== 实时更新 ====================
function initLiveUpdates() {
    // 使用 LiveData 模块获取实时数据
    if (typeof LiveData !== 'undefined') {
        // 监听数据更新后自动刷新界面
        LiveData.onUpdate((data) => {
            const applied = LiveData.applyMatchUpdates();
            const playerApplied = LiveData.applyPlayerUpdates();

            // 自动刷新赛程界面
            const schedulePage = document.getElementById('schedule');
            if (schedulePage && schedulePage.classList.contains('active')) {
                renderSchedule();
                renderBracket();
            }

            // 更新时间戳
            const refEl = document.getElementById('scheduleRefresh');
            if (refEl) {
                const statusText = LiveData.getStatusText();
                refEl.innerHTML = `<span class="live-indicator"></span> ${statusText}`;
            }

            // 刷新积分榜
            if (currentGroup) {
                renderStandings(currentGroup);
            }

            // 有实际数据变更时自动刷新界面
            if (applied > 0 || playerApplied > 0) {
                // 数据已应用
            }
        });

        // 启动轮询
        LiveData.startPolling();
    } else {
        // 降级：30秒静态刷新
        setInterval(() => {
            const schedulePage = document.getElementById('schedule');
            if (schedulePage && schedulePage.classList.contains('active')) {
                renderSchedule();
                renderBracket();
            }
            const refEl = document.getElementById('scheduleRefresh');
            if (refEl) refEl.innerHTML = `<span class="live-indicator"></span> 更新于 ${new Date().toLocaleTimeString('zh-CN')}`;
            renderStandings(currentGroup);
        }, 30000);
    }
}

// ==================== 球员动态 ====================
let playerStatusFilter = 'all'; // all / healthy / injured / suspended / doubtful / recovered
let psOverlayFilter = 'all';

function initPlayerStatus() {
    renderPlayerStatusFilter();
    renderPlayerStatus();
}

function renderPlayerStatusFilter() {
    const el = document.getElementById('playerStatusFilter');
    if (!el) return;
    const filters = [
        { value: 'all', label: '全部', icon: '👥' },
        { value: 'healthy', label: '健康', icon: '✅' },
        { value: 'doubtful', label: '疑出', icon: '⚠️' },
        { value: 'recovered', label: '伤愈', icon: '💊' },
        { value: 'injured', label: '伤缺', icon: '🚨' },
        { value: 'suspended', label: '停赛', icon: '⛔' },
    ];
    el.innerHTML = filters.map(f =>
        `<button class="ps-filter-btn${playerStatusFilter === f.value ? ' active' : ''}" onclick="setPlayerStatusFilter('${f.value}')">${f.icon} ${f.label}</button>`
    ).join('');
}

window.setPlayerStatusFilter = function(filter) {
    playerStatusFilter = filter;
    renderPlayerStatusFilter();
    renderPlayerStatus();
};

function getFilteredPlayers() {
    const search = (document.getElementById('playerSearch')?.value || '').trim().toLowerCase();
    let allData = PLAYER_STATUS_DATA.flatMap(team => team.players.map(p => ({
        ...p, team: team.team, teamFlag: team.teamFlag
    })));

    if (playerStatusFilter !== 'all') {
        allData = allData.filter(p => p.status === playerStatusFilter);
    }
    if (search) {
        allData = allData.filter(p => p.name.toLowerCase().includes(search));
    }
    return allData;
}

function renderPlayerStatus() {
    const grid = document.getElementById('playerStatusGrid');
    const timeEl = document.getElementById('playerStatusTime');
    const btn = document.getElementById('psViewAllBtn');
    if (!grid) return;

    let allData = getFilteredPlayers();
    const totalCount = allData.length;
    const showData = allData.slice(0, 5);

    if (allData.length === 0) {
        grid.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-dim);font-size:13px;">暂无符合条件的球员动态</div>';
    } else {
        grid.innerHTML = showData.map(p => renderPlayerStatusCard(p)).join('');
    }

    // 查看全部按钮
    if (btn) {
        btn.style.display = totalCount > 5 ? 'block' : 'none';
        btn.textContent = `👥 查看全部球员（共${totalCount}名）`;
    }

    // 更新时间
    const now = new Date();
    const opening = new Date(2026, 5, 11, 0, 0, 0);
    if (timeEl) {
        let liveStatus = '';
        if (typeof LiveData !== 'undefined') {
            const status = LiveData.getStatus();
            if (status.lastFetch) {
                liveStatus = ' · ' + LiveData.getStatusText();
            }
        }
        if (now < opening) {
            timeEl.textContent = `🕐 赛前动态 · 更新于 ${now.toLocaleDateString('zh-CN')}${liveStatus} · 开赛后实时更新`;
        } else {
            timeEl.textContent = `🔴 实时更新 · ${now.toLocaleDateString('zh-CN')} ${now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}${liveStatus}`;
        }
    }
}

// ----- 全屏查看全部球员 -----
window.showAllPlayers = function() {
    const overlay = document.getElementById('psOverlay');
    if (!overlay) return;
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    renderOverlayFilter();
    renderAllPlayers();
};

window.closeAllPlayers = function() {
    const overlay = document.getElementById('psOverlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    document.body.style.overflow = '';
};

function renderOverlayFilter() {
    const el = document.getElementById('psOverlayFilter');
    if (!el) return;
    const filters = [
        { value: 'all', label: '全部', icon: '👥' },
        { value: 'healthy', label: '健康', icon: '✅' },
        { value: 'doubtful', label: '疑出', icon: '⚠️' },
        { value: 'recovered', label: '伤愈', icon: '💊' },
        { value: 'injured', label: '伤缺', icon: '🚨' },
        { value: 'suspended', label: '停赛', icon: '⛔' },
    ];
    el.innerHTML = filters.map(f =>
        `<button class="ps-filter-btn${psOverlayFilter === f.value ? ' active' : ''}" onclick="setOverlayFilter('${f.value}')">${f.icon} ${f.label}</button>`
    ).join('');
}

window.setOverlayFilter = function(filter) {
    psOverlayFilter = filter;
    renderOverlayFilter();
    renderAllPlayers();
};

window.renderAllPlayers = function() {
    const grid = document.getElementById('psOverlayGrid');
    const timeEl = document.getElementById('psOverlayTime');
    if (!grid) return;

    const search = (document.getElementById('psOverlaySearch')?.value || '').trim().toLowerCase();
    let allData = PLAYER_STATUS_DATA.flatMap(team => team.players.map(p => ({
        ...p, team: team.team, teamFlag: team.teamFlag
    })));

    if (psOverlayFilter !== 'all') {
        allData = allData.filter(p => p.status === psOverlayFilter);
    }
    if (search) {
        allData = allData.filter(p => p.name.toLowerCase().includes(search));
    }

    if (allData.length === 0) {
        grid.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-dim);font-size:13px;">暂无符合条件的球员</div>';
    } else {
        grid.innerHTML = allData.map(p => renderPlayerStatusCard(p)).join('');
    }

    const now = new Date();
    if (timeEl) {
        timeEl.textContent = `共 ${allData.length} 名球员 · 数据更新中`;
    }
};

function renderPlayerStatusCard(p) {
    const valueClass = p.valueColor === 'gold' ? ' ps-value-gold' : '';
    return `
    <div class="ps-card">
        <div class="ps-card-header">
            <span class="ps-team-flag">${p.teamFlag}</span>
            <span class="ps-team-name">${p.team}</span>
        </div>
        <div class="ps-player-info">
            <span class="ps-name">${p.name}</span>
            <span class="ps-pos ps-pos-${p.pos}">${p.pos}</span>
            <span class="ps-status ps-status-${p.status}">${p.statusLabel}</span>
        </div>
        <div class="ps-meta-row">
            <span class="ps-meta-item"><span class="ps-meta-label">球衣</span> #${p.num}</span>
            <span class="ps-meta-item"><span class="ps-meta-label">俱乐部</span> ${p.club}</span>
            <span class="ps-meta-item"><span class="ps-meta-label">身价</span> <span class="ps-value${valueClass}">${p.marketValue}</span></span>
        </div>
        <div class="ps-form">📊 ${p.recentForm}</div>
        ${p.note ? `<div class="ps-note">💡 ${p.note}</div>` : ''}
        <div class="ps-updated">更新于 ${p.updated}</div>
    </div>`;
}

// ==================== 问答 ====================
let quizIdx = 0, quizScore = 0, quizDone = false;
let quizUsedIndices = []; // 记录已出现的题目索引，防止重复

function initQuiz() { quizUsedIndices = []; showQuiz(); }
function showQuiz() {
    // 如果所有题目都出过一轮，清空记录重新随机
    if (quizUsedIndices.length >= QUIZ_DATA.length) {
        quizUsedIndices = [];
    }
    // 从未出的题目中随机选一道
    const available = QUIZ_DATA.map((_, i) => i).filter(i => !quizUsedIndices.includes(i));
    const randomIdx = available[Math.floor(Math.random() * available.length)];
    quizUsedIndices.push(randomIdx);
    quizIdx = randomIdx;
    const q = QUIZ_DATA[quizIdx];
    // 更新题目文字
    setText('quizQuestion', q.question);
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
    if (idx === q.answer) {
        el.classList.add('correct');
        quizScore++;
        // 答对特效：撒花 + 鼓励语
        showQuizCelebration();
    } else {
        el.classList.add('wrong');
        all[q.answer].classList.add('correct');
    }
    setText('quizScore', quizScore);
    all.forEach(o => o.style.pointerEvents = 'none');
};

// 答对撒花特效
function showQuizCelebration() {
    const messages = [
        '太棒了！🎉', '厉害！🔥', '答对了！✨', '知识渊博！💯', '继续加油！🏆',
        '你是懂球的！⚽', '稳稳的！👍', '高手！👑', '完美！🌟', '继续冲！💪'
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];

    // 显示鼓励文字
    const tipEl = document.getElementById('quizTip');
    if (tipEl) {
        tipEl.textContent = msg;
        tipEl.classList.add('quiz-tip-pop');
        tipEl.style.display = 'block';
    }

    // 创建彩色粒子
    createQuizParticles();

    // 2秒后隐藏
    setTimeout(() => {
        if (tipEl) {
            tipEl.classList.remove('quiz-tip-pop');
            tipEl.style.display = 'none';
        }
    }, 2000);
}

// 创建彩色粒子特效
function createQuizParticles() {
    const container = document.getElementById('quizParticles');
    if (!container) return;
    const colors = ['#f0c75e', '#ff6b6b', '#4ecdc4', '#a78bfa', '#34d399', '#f472b6', '#60a5fa'];
    const emojis = ['✨', '🎉', '⭐', '💫', '🌟', '🔥', '⚡'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'quiz-particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.setProperty('--x', (Math.random() - 0.5) * 300 + 'px');
        particle.style.setProperty('--y', (Math.random() - 0.5) * 300 + 'px');
        particle.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        particle.style.animationDelay = (Math.random() * 0.3) + 's';
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }
}
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
let calcStrategy = 'balanced'; // 保守 conservative / 稳健 balanced / 激进 aggressive

// 切换投注策略
window.setCalcStrategy = function(s) {
    calcStrategy = s;
    const tabs = document.querySelectorAll('.calc-strategy-tab');
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = Array.from(tabs).find(t => t.textContent.includes(s === 'conservative' ? '保守' : s === 'aggressive' ? '激进' : '稳健'));
    if (activeTab) activeTab.classList.add('active');

    // 策略提示（自动调整倍数建议）
    const hintEl = document.getElementById('calcParlayNote');
    if (hintEl) {
        if (s === 'conservative') {
            hintEl.textContent = '单关为主，降低风险';
            hintEl.style.color = 'var(--blue)';
        } else if (s === 'aggressive') {
            hintEl.textContent = '高倍串关，追求回报';
            hintEl.style.color = 'var(--red)';
        } else {
            hintEl.textContent = '2-3场串关为主';
            hintEl.style.color = 'var(--accent)';
        }
    }
};

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
    try { renderCalc(container); } catch(e) { /* renderCalc error */ }
    try { initSyncUI(); } catch(e) { /* initSyncUI error */ }
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
    if (typeof LotteryAPI === 'undefined') {
        // 未加载API时显示"暂未开放"
        const text = document.getElementById('syncText');
        const btn = document.getElementById('syncBtn');
        const autoCheck = document.getElementById('syncAutoCheck');
        const dot = document.getElementById('syncDot');
        if (dot) dot.className = 'sync-dot inactive';
        if (text) text.textContent = '🔒 暂未开放';
        if (btn) { btn.disabled = true; btn.textContent = '暂未开放'; }
        if (autoCheck) { autoCheck.disabled = true; autoCheck.parentElement.style.opacity = '0.5'; }
        return;
    }
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
    // 同时触发实时数据同步
    if (typeof LiveData !== 'undefined') {
        await LiveData.syncNow();
    }
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
    const analysisEl = document.getElementById('ledgerAnalysis');
    if (!tbody) return;

    if (ledgerData.length === 0) {
        tbody.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'block';
        if (analysisEl) analysisEl.style.display = 'none';
    } else {
        if (emptyEl) emptyEl.style.display = 'none';
        if (analysisEl) analysisEl.style.display = 'block';
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

    // 盈亏曲线图
    renderLedgerChart();
    // 投注分析统计
    renderLedgerAnalysis();
}

function renderLedgerChart() {
    const chartSection = document.getElementById('ledgerChartSection');
    const svg = document.getElementById('ledgerChartSvg');
    if (!chartSection || !svg) return;

    // 至少3条记录才画曲线
    if (ledgerData.length < 3) {
        svg.innerHTML = `<text x="300" y="130" text-anchor="middle" font-size="16" fill="var(--text-dim)">📊 添加至少 3 条记录后显示盈亏曲线</text><text x="300" y="156" text-anchor="middle" font-size="14" fill="var(--text-dim)" opacity="0.6">↑ 在上方添加购彩记录即可生成图表</text>`;
        return;
    }

    // 按日期升序排列
    const sorted = [...ledgerData].sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id);

    // 计算累计盈亏点
    let cumNet = 0;
    const points = sorted.map(e => {
        cumNet += (e.win - e.buy);
        return { date: e.date, net: e.win - e.buy, cumNet };
    });

    // 计算Y轴范围
    const cumValues = points.map(p => p.cumNet);
    const maxVal = Math.max(...cumValues, 0);
    const minVal = Math.min(...cumValues, 0);
    const yRange = maxVal - minVal || 100; // 避免除零
    const yPad = yRange * 0.15; // 上下留15%边距
    const yMin = minVal - yPad;
    const yMax = maxVal + yPad;
    const ySpan = yMax - yMin;

    // SVG 坐标系
    const W = 600, H = 280;
    const padL = 48, padR = 16, padT = 20, padB = 36;
    const pw = W - padL - padR;  // 绘图宽
    const ph = H - padT - padB;  // 绘图高

    // 缩放函数
    const xScale = (i) => points.length === 1 ? padL + pw / 2 : padL + (i / (points.length - 1)) * pw;
    const yScale = (v) => padT + ph - ((v - yMin) / ySpan) * ph;

    // 零线Y坐标
    const zeroY = yScale(0);

    // 构建 SVG
    let svgHtml = '';

    // 背景渐变区域（正负）
    if (maxVal > 0 && minVal < 0) {
        // 正区域
        let posArea = `<path d="M${padL},${zeroY} `;
        points.forEach((p, i) => {
            posArea += `L${xScale(i)},${yScale(Math.max(p.cumNet, 0))} `;
        });
        posArea += `L${padL + pw},${zeroY} Z" fill="rgba(64,192,87,0.08)" />`;
        // 负区域
        let negArea = `<path d="M${padL},${zeroY} `;
        points.forEach((p, i) => {
            negArea += `L${xScale(i)},${yScale(Math.min(p.cumNet, 0))} `;
        });
        negArea += `L${padL + pw},${zeroY} Z" fill="rgba(255,71,87,0.08)" />`;
        svgHtml += posArea + negArea;
    } else if (minVal >= 0) {
        let area = `<path d="M${padL},${zeroY} `;
        points.forEach((p, i) => area += `L${xScale(i)},${yScale(p.cumNet)} `);
        area += `L${padL + pw},${zeroY} Z" fill="rgba(64,192,87,0.08)" />`;
        svgHtml += area;
    } else {
        let area = `<path d="M${padL},${zeroY} `;
        points.forEach((p, i) => area += `L${xScale(i)},${yScale(p.cumNet)} `);
        area += `L${padL + pw},${zeroY} Z" fill="rgba(255,71,87,0.08)" />`;
        svgHtml += area;
    }

    // 网格线 (Y轴)
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
        const val = yMin + (ySpan * i / gridLines);
        const y = yScale(val);
        svgHtml += `<line x1="${padL}" y1="${y}" x2="${padL + pw}" y2="${y}" stroke="var(--border)" stroke-width="0.5" />`;
        svgHtml += `<text x="${padL - 4}" y="${y + 4}" text-anchor="end" font-size="9" fill="var(--text-dim)">${val >= 0 ? '+¥' : '-¥'}${Math.abs(val).toFixed(0)}</text>`;
    }

    // X轴标签（日期，最多显示6个）
    const labelStep = Math.max(1, Math.ceil(points.length / 5));
    points.forEach((p, i) => {
        if (i % labelStep === 0 || i === points.length - 1) {
            const lbl = p.date.slice(5); // MM-DD
            svgHtml += `<text x="${xScale(i)}" y="${padT + ph + 16}" text-anchor="middle" font-size="9" fill="var(--text-dim)">${lbl}</text>`;
        }
    });

    // 零线（加粗虚线）
    svgHtml += `<line x1="${padL}" y1="${zeroY}" x2="${padL + pw}" y2="${zeroY}" stroke="var(--text-dim)" stroke-width="1" stroke-dasharray="4,3" opacity="0.5" />`;

    // 曲线分段绘制（正绿负红）
    let lineD = '';
    for (let i = 0; i < points.length; i++) {
        lineD += (i === 0 ? 'M' : 'L') + `${xScale(i)},${yScale(points[i].cumNet)} `;
    }
    svgHtml += `<path d="${lineD}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" />`;

    // 数据点
    points.forEach((p, i) => {
        const cx = xScale(i), cy = yScale(p.cumNet);
        const isLast = i === points.length - 1;
        const dotColor = p.cumNet >= 0 ? 'var(--green)' : 'var(--red)';
        svgHtml += `<circle cx="${cx}" cy="${cy}" r="${isLast ? 4.5 : 3}" fill="${dotColor}" stroke="var(--bg-card)" stroke-width="1.5" />`;

        // 首尾标注数值
        if (i === 0 || isLast) {
            const sign = p.cumNet >= 0 ? '+' : '';
            svgHtml += `<text x="${cx}" y="${cy - 8}" text-anchor="middle" font-size="10" font-weight="700" fill="${dotColor}">${sign}¥${p.cumNet.toFixed(0)}</text>`;
        }
    });

    svg.innerHTML = svgHtml;
}

function renderLedgerAnalysis() {
    const analysisEl = document.getElementById('ledgerAnalysis');
    const winRateEl = document.getElementById('laWinRate');
    const avgOddsEl = document.getElementById('laAvgOdds');
    const totalBetsEl = document.getElementById('laTotalBets');
    const strategyTagEl = document.getElementById('laStrategyTag');
    const strategyDescEl = document.getElementById('laStrategyDesc');
    if (!analysisEl) return;

    if (ledgerData.length < 3) {
        analysisEl.style.display = 'none';
        return;
    }
    analysisEl.style.display = 'block';

    // 胜率
    const wins = ledgerData.filter(e => e.win > e.buy).length;
    const winRate = ledgerData.length > 0 ? (wins / ledgerData.length * 100) : 0;

    // 平均赔率（用中奖金额/购彩金额估算）
    const avgOdds = ledgerData.reduce((sum, e) => {
        return sum + (e.buy > 0 ? e.win / e.buy : 0);
    }, 0) / ledgerData.length;

    // 总投注额
    const totalBuy = ledgerData.reduce((s,e) => s + e.buy, 0);

    if (winRateEl) winRateEl.textContent = winRate.toFixed(0) + '%';
    if (avgOddsEl) avgOddsEl.textContent = avgOdds.toFixed(2) + 'x';
    if (totalBetsEl) totalBetsEl.textContent = '¥' + totalBuy.toFixed(0);

    // 策略建议
    const net = totalBuy > 0 ? (ledgerData.reduce((s,e) => s + e.win - e.buy, 0)) : 0;
    let strategy, strategyDesc, strategyClass;

    if (winRate >= 45 && avgOdds >= 1.8 && net >= 0) {
        strategy = '🏆 激进型';
        strategyClass = 'aggressive';
        strategyDesc = `胜率 ${winRate.toFixed(0)}%、均赔 ${avgOdds.toFixed(2)}，表现优秀！可适当加大投注，但建议单次不超过总资金的20%。`;
    } else if (winRate >= 38 && avgOdds >= 1.4) {
        strategy = '⚖️ 稳健型';
        strategyClass = 'balanced';
        strategyDesc = `胜率 ${winRate.toFixed(0)}%、均赔 ${avgOdds.toFixed(2)}，整体盈利。继续当前策略，控制串关场次（≤3场）。`;
    } else {
        strategy = '🛡️ 保守型';
        strategyClass = 'conservative';
        strategyDesc = `胜率 ${winRate.toFixed(0)}%、均赔 ${avgOdds.toFixed(2)}，建议减少投注频率，只投注胜率较高的选项，单关为主。`;
    }

    if (strategyTagEl) {
        strategyTagEl.textContent = strategy;
        strategyTagEl.className = 'ledger-strategy-tag ' + strategyClass;
    }
    if (strategyDescEl) strategyDescEl.textContent = strategyDesc;
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
        <!-- 投注策略建议 -->
        <div class="calc-strategy-tabs">
            <div class="calc-strategy-tab conservative${calcStrategy==='conservative'?' active':''}" onclick="setCalcStrategy('conservative')">🛡️ 保守</div>
            <div class="calc-strategy-tab${calcStrategy==='balanced'||!calcStrategy?' active':''}" onclick="setCalcStrategy('balanced')">⚖️ 稳健</div>
            <div class="calc-strategy-tab aggressive${calcStrategy==='aggressive'?' active':''}" onclick="setCalcStrategy('aggressive')">🚀 激进</div>
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

    // 策略提示
    let strategyTip = '';
    if (isWin) {
        const tips = {
            conservative: '🛡️ 保守策略效果不错！稳稳的收益，继续保持~',
            balanced: '⚖️ 稳健投注命中！策略得当，继续保持节奏~',
            aggressive: '🚀 激进串关命中！高风险高回报，你做到了！'
        };
        strategyTip = tips[calcStrategy] || tips.balanced;
    } else {
        const tips = {
            conservative: '🛡️ 未中也没关系，保守策略降低了损失，下次继续加油！',
            balanced: '⚖️ 这次差一点，不要气馁，分析后再战！',
            aggressive: '🚀 激进串关风险高，建议下次适当降低串关场次~'
        };
        strategyTip = tips[calcStrategy] || tips.balanced;
    }

    const rec = { id: Date.now(), picks: calcSlip.map(s => ({ ...s })), combine: getParlayOptions(n).find(o => o.value === calcParlayType)?.label || '单关', betCount, multiplier: calcMultiplier, amount: totalAmount, isWin, payout: finalPayout, strategy: calcStrategy, strategyTip, time: new Date().toLocaleString('zh-CN') };
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
    const strategyTip = rec.strategyTip || '';
    modal.innerHTML = `<button class="sim-modal-close" onclick="this.parentElement.remove();document.querySelector('.sim-modal-overlay').remove()">✕</button>
        <div style="text-align:center;padding:8px 0 16px">
            <div style="font-size:48px;margin-bottom:8px">${rec.isWin ? '🎉' : '😢'}</div>
            <div style="font-size:18px;font-weight:700">${rec.isWin ? '恭喜中奖！' : '未中奖'}</div>
            <div style="color:var(--text-light);font-size:12px;margin-top:8px;line-height:1.8">${rec.picks.map(p => `[${p.lotteryCode}] <span style="background:rgba(0,212,170,0.1);padding:1px 6px;border-radius:4px;font-size:10px;color:var(--accent)">${(PLAY_TYPES.find(x=>x.value===p.playType)||{label:p.playType}).label}</span> ${p.betLabel}(@${p.odds})`).join('<br>')}</div>
            <div style="margin-top:10px;font-size:12px;color:var(--text-light)">${rec.combine} · ${rec.betCount}注×${rec.multiplier}倍</div>
            <div style="font-size:28px;font-weight:900;color:${rec.isWin?'var(--green)':'var(--text-dim)'};margin:10px 0">${rec.isWin?'¥'+rec.payout:'¥0'}</div>
            <div style="font-size:12px;color:var(--text-dim)">投注金额 ¥${rec.amount}</div>
            ${strategyTip ? `<div style="margin-top:12px;font-size:12px;color:${rec.isWin?'var(--green)':'var(--text-light)'};background:${rec.isWin?'rgba(64,192,87,0.08)':'rgba(255,255,255,0.04)'};padding:10px 12px;border-radius:8px;border-left:3px solid ${rec.isWin?'var(--green)':'var(--text-dim)'};text-align:left;line-height:1.6">${strategyTip}</div>` : ''}
        </div>`;
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
    // 刷新AI预测（积分榜数据可能已更新）
    renderAIPredictions();
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

// ==================== 冠军竞猜 ====================
const CHAMPION_VOTE_KEY = 'wc2026_champion_vote';
let championVotes = {};

function loadChampionVotes() {
    try {
        const saved = localStorage.getItem(CHAMPION_VOTE_KEY);
        if (saved) championVotes = JSON.parse(saved);
    } catch(e) { championVotes = {}; }
}

function saveChampionVotes() {
    localStorage.setItem(CHAMPION_VOTE_KEY, JSON.stringify(championVotes));
}

function initChampionVote() {
    loadChampionVotes();
    const select = document.getElementById('championVoteSelect');
    if (!select) return;
    // 按排名排序所有球队
    const sorted = [...TEAMS_DATA].sort((a, b) => a.rank - b.rank);
    select.innerHTML = '<option value="">-- 选择你支持的球队 --</option>' +
        sorted.map(t => `<option value="${t.name}">${t.flag} ${t.name} (${t.group}组 · #${t.rank})</option>`).join('');
    renderChampionResults();
}

window.castChampionVote = function() {
    const select = document.getElementById('championVoteSelect');
    if (!select || !select.value) {
        alert('请先选择一支球队');
        return;
    }
    const team = select.value;
    championVotes[team] = (championVotes[team] || 0) + 1;
    saveChampionVotes();
    select.value = '';
    renderChampionResults();
    // 动画反馈
    const btn = document.querySelector('.cv-vote-btn');
    if (btn) { btn.textContent = '✅ 投票成功！'; setTimeout(() => { btn.textContent = '🗳️ 投票'; }, 1500); }
};

function renderChampionResults() {
    const container = document.getElementById('championResults');
    if (!container) return;
    const entries = Object.entries(championVotes).filter(([,c]) => c > 0);
    if (entries.length === 0) {
        container.innerHTML = '<div class="cv-empty">还没有人投票，快来投出第一票吧！</div>';
        return;
    }
    entries.sort((a, b) => b[1] - a[1]);
    const total = entries.reduce((s, [,c]) => s + c, 0);
    const maxVotes = entries[0][1];
    container.innerHTML = entries.map(([team, count], i) => {
        const teamInfo = TEAMS_DATA.find(t => t.name === team);
        const pct = Math.round((count / total) * 100);
        const barWidth = Math.round((count / maxVotes) * 100);
        return `<div class="cv-row">
            <span class="cv-rank">${i + 1}</span>
            <span class="cv-flag">${teamInfo ? teamInfo.flag : '⚽'}</span>
            <span class="cv-name">${team}</span>
            <div class="cv-bar-wrap"><div class="cv-bar" style="width:${barWidth}%"></div></div>
            <span class="cv-votes">${count}票</span>
            <span class="cv-pct">${pct}%</span>
        </div>`;
    }).join('');
}

// ==================== AI预测 ====================
function renderAIPredictions() {
    const container = document.getElementById('aiPredictions');
    if (!container) return;

    // 获取积分榜数据
    const allStandings = getGroupStandings();

    // 综合评分算法：
    // - 世界排名分：排名越低越好 (max 40分)
    // - 东道主加成：+8分
    // - 小组赛表现：如果有比赛结果，根据积分/净胜球加分 (max 25分)
    // - 洲际系数：南美/欧洲球队略高
    const confBonus = { 'UEFA': 5, 'CONMEBOL': 5, 'CAF': 2, 'CONCACAF': 3, 'AFC': 2, 'OFC': 1 };

    const scores = TEAMS_DATA.map(t => {
        let score = 0;
        // 排名分 (排名越低分越高，第1名=40, 第100名=0)
        score += Math.max(0, 40 - t.rank * 0.4);
        // 东道主加成
        if (t.host) score += 8;
        // 洲际加成
        score += confBonus[t.confederation] || 0;

        // 小组赛表现加成
        const gs = allStandings[t.group];
        if (gs) {
            const standing = gs.find(s => s.team.name === t.name);
            if (standing && standing.P > 0) {
                score += standing.Pts * 1.5;
                score += standing.GD * 0.5;
                // 小组排名加成
                const idx = gs.indexOf(standing);
                if (idx === 0) score += 10;
                else if (idx === 1) score += 5;
                else if (idx === 2) score += 2;
            }
        }
        // 确定性去重：用球队名hash做微小差异，避免同分且每次结果一致
        let hash = 0;
        for (let c of t.name) hash = ((hash << 5) - hash + c.charCodeAt(0)) | 0;
        score += (Math.abs(hash) % 30) / 10; // 0~2.9 的确定性偏移
        return { team: t, score: Math.round(score * 10) / 10 };
    });

    scores.sort((a, b) => b.score - a.score);

    // 计算概率
    const totalScore = scores.reduce((s, x) => s + x.score, 0);
    const top20 = scores.slice(0, 20);

    const maxScore = top20[0].score;
    const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];

    container.innerHTML = top20.map((item, i) => {
        const barPct = totalScore > 0 ? Math.round((item.score / totalScore) * 100) : 0;
        const probability = totalScore > 0 ? ((item.score / totalScore) * 100).toFixed(1) : '0.0';
        const medal = i < 3 ? ['🥇','🥈','🥉'][i] : '';
        const rowColor = i < 3 ? colors[i] : '';
        const confLabel = { 'UEFA':'欧', 'CONMEBOL':'南美', 'CAF':'非', 'CONCACAF':'中美', 'AFC':'亚', 'OFC':'大洋' };
        return `<div class="ai-row" style="${rowColor ? `border-left:3px solid ${rowColor};padding-left:7px` : ''}">
            <span class="ai-rank">${medal || (i + 1)}</span>
            <span class="ai-flag">${item.team.flag}</span>
            <span class="ai-name">${item.team.name}</span>
            <span class="ai-conf-tag">${confLabel[item.team.confederation] || ''}</span>
            ${item.team.host ? '<span class="ai-host-tag">东道主</span>' : ''}
            <div class="ai-bar-wrap"><div class="ai-bar" style="width:${barPct}%;background:${i < 3 ? colors[i] : 'var(--accent)'}"></div></div>
            <span class="ai-prob">${probability}%</span>
        </div>`;
    }).join('');

    // 暗马推荐
    const darkHorses = scores.filter(s => s.team.rank > 15 && !s.team.host && s.score > 30).slice(0, 3);
    if (darkHorses.length > 0) {
        container.innerHTML += `<div class="ai-darkhorses">
            <div class="ai-dh-title">🐴 潜在黑马</div>
            ${darkHorses.map(dh => `
                <span class="ai-dh-item">${dh.team.flag} ${dh.team.name} <small>(#${dh.team.rank}, 评分:${dh.score})</small></span>
            `).join('')}
        </div>`;
    }
}

function initChampionAndAI() {
    initChampionVote();
    renderAIPredictions();
}

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

// 生成本地 SVG 头像（不依赖外部网络）
function generateLocalAvatar(name, pos) {
    const initial = name.charAt(0);
    const posColors = {
        '前锋': { bg1: '#ff4757', bg2: '#c0392b' },
        '中场': { bg1: '#4dabf7', bg2: '#2d6da4' },
        '后卫': { bg1: '#40c057', bg2: '#1e7a34' },
        '门将': { bg1: '#ff922b', bg2: '#d47516' }
    };
    const c = posColors[pos] || { bg1: '#636e72', bg2: '#2d3436' };
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${c.bg1}"/><stop offset="100%" stop-color="${c.bg2}"/></linearGradient></defs><circle cx="100" cy="100" r="100" fill="url(#g)"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-size="95" font-weight="900" font-family="-apple-system,BlinkMacSystemFont,Arial,sans-serif">${initial}</text></svg>`;
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// 预加载图片验证，成功后才替换
function preloadAndSet(imgEl, url, fallbackSvg, onSuccess) {
    const testImg = new Image();
    testImg.onload = function() {
        imgEl.src = url;
        if (onSuccess) onSuccess();
    };
    testImg.onerror = function() {
        // 保持 fallback，不做替换
    };
    testImg.src = url;
}

function fetchPlayerPhoto(enName, imgEl, fallbackSvg) {
    // 优先从缓存读取
    if (PHOTO_CACHE[enName]) {
        preloadAndSet(imgEl, PHOTO_CACHE[enName], fallbackSvg);
        return;
    }

    // 3秒超时保护
    let timedOut = false;
    const timeoutId = setTimeout(() => { timedOut = true; }, 3000);

    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(enName)}&prop=pageimages&format=json&pithumbsize=300&origin=*`;
    fetch(apiUrl)
        .then(r => {
            if (timedOut) throw new Error('timeout');
            return r.json();
        })
        .then(data => {
            if (timedOut) return;
            clearTimeout(timeoutId);
            const pages = data.query.pages;
            const page = Object.values(pages)[0];
            if (page && page.thumbnail && page.thumbnail.source) {
                let imgUrl = page.thumbnail.source;
                // 强制 https，避免混合内容被浏览器阻止
                if (imgUrl.startsWith('http:')) imgUrl = 'https:' + imgUrl.slice(5);
                // 预加载验证成功后才替换
                preloadAndSet(imgEl, imgUrl, fallbackSvg, () => {
                    PHOTO_CACHE[enName] = imgUrl;
                    savePhotoCache();
                });
            }
        })
        .catch(() => { clearTimeout(timeoutId); });
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
    const fallbackSvg = generateLocalAvatar(player.name, player.pos);

    const overlay = document.createElement('div'); overlay.className = 'pdetail-modal-overlay';
    overlay.onclick = () => { overlay.remove(); detailModal.remove(); };

    const detailModal = document.createElement('div'); detailModal.className = 'pdetail-modal';
    detailModal.innerHTML = `
        <div class="pdetail-hero" style="background:${posBg[player.pos] || 'linear-gradient(135deg, #636e72, #2d3436)'}">
            <button class="pdetail-close" onclick="this.closest('.pdetail-modal').remove();document.querySelector('.pdetail-modal-overlay').remove()">✕</button>
            <div class="pdetail-team-badge"><span>${teamFlag}</span><span>${teamName}</span></div>
            <div class="pdetail-photo-wrapper">
                <img class="pdetail-photo" src="${fallbackSvg}" alt="${player.name}" loading="lazy">
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
        fetchPlayerPhoto(player.enName, photoImg, fallbackSvg);
    }
}
