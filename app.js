// ============================================
// 2026 世界杯 · 卡通百科 主逻辑
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initDateDisplay();
    initCountdown();
    initSchedule();
    initQuiz();
    initChampions();
    initLottery();
    initSimBet();
    initTeamsGroup();
    initCityDetails();
});

// ==================== 标签切换 ====================
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const pages = document.querySelectorAll('.page');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            pages.forEach(p => p.classList.remove('active'));
            const page = document.getElementById(target);
            if (page) {
                page.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // 首页统计卡片点击跳转
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', () => {
            const target = card.getAttribute('data-goto');
            if (target) switchTab(target);
        });
    });
}

window.switchTab = function(tabId) {
    const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    if (tab) tab.click();
};

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
    const target = new Date(2026, 5, 11, 20, 0, 0);
    function update() {
        const diff = target - new Date();
        if (diff <= 0) {
            ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => document.getElementById(id).textContent='00');
            return;
        }
        const d = Math.floor(diff/86400000);
        const h = Math.floor((diff%86400000)/3600000);
        const m = Math.floor((diff%3600000)/60000);
        const s = Math.floor((diff%60000)/1000);
        document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
        document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
        document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
        document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
    }
    update();
    setInterval(update, 1000);
}

// ==================== 赛程 ====================
function initSchedule() {
    const grid = document.getElementById('scheduleGrid');
    const filterBtns = document.querySelectorAll('#schedule .flt');
    let filter = 'all';

    function render() {
        const filtered = filter === 'all' ? SCHEDULE_DATA : SCHEDULE_DATA.filter(m => m.stage === filter);
        updateProgress();

        grid.innerHTML = filtered.map(m => {
            const ds = m.date.toLocaleDateString('zh-CN', { month:'2-digit', day:'2-digit' });
            const ts = m.date.toLocaleTimeString('zh-CN', { hour:'2-digit', minute:'2-digit', hour12:false });
            let statusHtml, cardClass = '';
            if (m.status === 'played') { statusHtml = '<span class="match-status played-tag">已结束</span>'; cardClass='played'; }
            else if (m.status === 'live') { statusHtml = '<span class="match-status live-tag">● 进行中</span>'; cardClass='live'; }
            else { statusHtml = '<span class="match-status upcoming">未开始</span>'; }

            const scoreHtml = m.score
                ? `<div class="match-score">${m.score.home}:${m.score.away}</div>`
                : '<div class="match-vs">VS</div>';

            return `<div class="match-card ${cardClass}">
                <div class="match-stage">${m.stageName}</div>
                <div class="match-meta"><span>📅 ${ds} ${ts}</span><span>🏟 ${m.venue}</span></div>
                <div class="match-teams">
                    <div class="match-team"><span class="team-flag">${m.homeFlag}</span><span class="team-name">${m.home}</span></div>
                    ${scoreHtml}
                    <div class="match-team"><span class="team-flag">${m.awayFlag}</span><span class="team-name">${m.away}</span></div>
                </div>
                <div style="text-align:center;margin-top:4px">${statusHtml}</div>
            </div>`;
        }).join('');
    }

    function updateProgress() {
        const total = SCHEDULE_DATA.length;
        const played = SCHEDULE_DATA.filter(m => m.status === 'played').length;
        const pct = Math.round((played/total)*100);
        document.getElementById('progressPercent').textContent = pct + '%';
        document.getElementById('progressFill').style.width = pct + '%';
        document.getElementById('playedCount').textContent = played;
        document.getElementById('remainingCount').textContent = total - played;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filter = btn.getAttribute('data-stage');
            render();
        });
    });

    render();
}

// ==================== 问答 ====================
let quizIdx = 0, quizScore = 0, quizDone = false;

function initQuiz() { showQuiz(); }

function showQuiz() {
    const q = QUIZ_DATA[quizIdx % QUIZ_DATA.length];
    document.getElementById('quizQuestion').textContent = `Q${quizIdx+1}: ${q.question}`;
    document.getElementById('quizOptions').innerHTML = q.options.map((o,i) =>
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
    document.getElementById('quizScore').textContent = quizScore;
    all.forEach(o => o.style.pointerEvents = 'none');
};

window.nextQuiz = function() { quizIdx++; showQuiz(); };

// ==================== 历届冠军 ====================
function initChampions() {
    document.getElementById('championsGrid').innerHTML = CHAMPIONS.map(c =>
        `<div class="champ-item"><span class="champ-year">${c.year}</span><span class="champ-flag">${c.flag}</span>${c.winner}</div>`
    ).join('');
}

// ==================== 竞彩玩法介绍 ====================
function initLottery() {
    const tabs = document.querySelectorAll('#lottery .flt');
    const content = document.getElementById('lotteryContent');

    function show(type) {
        const info = LOTTERY_INFO[type];
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
let calcSlip = [];        // 投注单 [{matchId, matchName, betType, betLabel, odds}]
let calcHistory = [];

function initSimBet() {
    const container = document.getElementById('calcContainer');
    renderCalc(container);
}

function renderCalc(container) {
    container.innerHTML = `
        <!-- 投注单 -->
        <div class="calc-slip" id="calcSlip">
            <div class="calc-slip-empty">📋 请添加比赛到投注单</div>
        </div>

        <!-- 选择比赛 -->
        <div class="calc-pick-row">
            <select id="calcMatchPicker">
                <option value="">-- 点击选择比赛 --</option>
                ${SCHEDULE_DATA.filter(m => m.status !== 'played').slice(0, 30).map(m => {
                    const ds = m.date.toLocaleDateString('zh-CN', { month:'2-digit', day:'2-digit' });
                    return `<option value="${m.id}">${m.homeFlag} ${m.home} vs ${m.away} ${m.awayFlag}</option>`;
                }).join('')}
            </select>
            <button class="btn" onclick="addMatchToSlip()" style="flex-shrink:0;padding:10px 14px;">添加</button>
        </div>

        <!-- 赔率选择区 -->
        <div id="calcOddsArea" style="text-align:center;color:var(--text-dim);font-size:13px;padding:8px;">
            👆 先选比赛，再点"添加"选赔率
        </div>

        <!-- 结果 -->
        <div class="calc-result" id="calcResult">
            <span class="cr-label">过关方式：</span>
            <span class="cr-combine" id="calcCombineType">单关</span>
            <span class="cr-label" style="margin-left:12px">预计奖金：</span>
            <span class="cr-val" id="calcPayout">¥0.00</span>
        </div>

        <!-- 操作 -->
        <div class="calc-actions">
            <button class="btn btn-clear" onclick="clearSlip()">🗑 清空</button>
            <button class="btn btn-buy" onclick="submitSlip()">🎯 模拟出票</button>
        </div>

        <!-- 历史 -->
        <div class="sim-history" id="calcHistoryArea" style="display:none">
            <div class="sim-h-title">📝 出票记录</div>
            <div id="calcHistoryList"></div>
        </div>
    `;

    // 监听比赛选择变化
    document.getElementById('calcMatchPicker').addEventListener('change', function() {
        showOddsForPicker(this.value);
    });

    renderSlip();
    renderHistory();
}

// 显示赔率
function showOddsForPicker(matchId) {
    const area = document.getElementById('calcOddsArea');
    if (!matchId) {
        area.innerHTML = `<div style="text-align:center;color:var(--text-dim);font-size:13px;padding:8px;">👆 先选比赛，再点"添加"选赔率</div>`;
        return;
    }
    const m = SCHEDULE_DATA.find(x => x.id === matchId);
    if (!m) return;
    const o = generateOdds();
    area.innerHTML = `
        <div style="font-size:12px;color:var(--text-light);margin-bottom:6px">${m.homeFlag} ${m.home} vs ${m.away} ${m.awayFlag}</div>
        <div class="calc-odds-row">
            <button class="calc-odds-btn" onclick="addPickToSlip('${m.id}','${m.homeFlag} ${m.home} vs ${m.away} ${m.awayFlag}','胜','${o.spf.win}')">
                <div class="co-name">主胜</div><div class="co-odds">${o.spf.win}</div>
            </button>
            <button class="calc-odds-btn" onclick="addPickToSlip('${m.id}','${m.homeFlag} ${m.home} vs ${m.away} ${m.awayFlag}','平','${o.spf.draw}')">
                <div class="co-name-draw">平局</div><div class="co-odds-draw">${o.spf.draw}</div>
            </button>
            <button class="calc-odds-btn" onclick="addPickToSlip('${m.id}','${m.homeFlag} ${m.home} vs ${m.away} ${m.awayFlag}','负','${o.spf.lose}')">
                <div class="co-name">主负</div><div class="co-odds-lose">${o.spf.lose}</div>
            </button>
        </div>
    `;
}

// 添加比赛到投注单（选赔率，最多5场）
window.addMatchToSlip = function() {
    const picker = document.getElementById('calcMatchPicker');
    const matchId = picker.value;
    if (!matchId) { alert('请先选择一场比赛'); return; }
    if (calcSlip.length >= 5) { alert('最多选择5场比赛'); return; }
    if (calcSlip.some(s => s.matchId === matchId)) { alert('该比赛已在投注单中'); return; }
    // 触发赔率展示
    showOddsForPicker(matchId);
    document.getElementById('calcOddsArea').scrollIntoView({ behavior: 'smooth' });
};

// 添加具体投注项
window.addPickToSlip = function(matchId, matchName, betLabel, odds) {
    if (calcSlip.length >= 5) { alert('最多选择5场比赛'); return; }
    if (calcSlip.some(s => s.matchId === matchId && s.betLabel === betLabel)) {
        alert('该选项已在投注单中');
        return;
    }
    calcSlip.push({ matchId, matchName, betType: 'spf', betLabel, odds: parseFloat(odds) });
    renderSlip();
    updatePayoutCalc();
    // 恢复picker
    document.getElementById('calcMatchPicker').value = '';
    document.getElementById('calcOddsArea').innerHTML = `<div style="text-align:center;color:var(--text-dim);font-size:13px;padding:8px;">✅ 已添加，继续选或点"模拟出票"</div>`;
};

function renderSlip() {
    const el = document.getElementById('calcSlip');
    if (!el) return;
    if (calcSlip.length === 0) {
        el.innerHTML = '<div class="calc-slip-empty">📋 请添加比赛到投注单</div>';
    } else {
        el.innerHTML = calcSlip.map((s, i) => `
            <div class="calc-slip-item">
                <span>${s.matchName}</span>
                <span style="font-weight:700;color:var(--red)">${s.betLabel} @${s.odds}</span>
                <span class="cs-del" onclick="removeSlipItem(${i})">✕</span>
            </div>
        `).join('');
    }
}

window.removeSlipItem = function(i) {
    calcSlip.splice(i, 1);
    renderSlip();
    updatePayoutCalc();
};

window.clearSlip = function() {
    calcSlip = [];
    renderSlip();
    updatePayoutCalc();
    document.getElementById('calcOddsArea').innerHTML = `<div style="text-align:center;color:var(--text-dim);font-size:13px;padding:8px;">👆 先选比赛，再点"添加"选赔率</div>`;
};

function updatePayoutCalc() {
    const combineEl = document.getElementById('calcCombineType');
    const payoutEl = document.getElementById('calcPayout');
    if (!combineEl || !payoutEl) return;
    const n = calcSlip.length;
    if (n === 0) {
        combineEl.textContent = '单关';
        payoutEl.textContent = '¥0.00';
        return;
    }
    const combinedOdds = calcSlip.reduce((a, s) => a * s.odds, 1).toFixed(2);
    if (n === 1) {
        combineEl.textContent = '单关';
        payoutEl.textContent = `¥${(combinedOdds * 2).toFixed(2)}`;
    } else if (n <= 5) {
        combineEl.textContent = `${n}串1`;
        payoutEl.textContent = `¥${(combinedOdds * 2).toFixed(2)}`;
    }
}

// 模拟出票
window.submitSlip = function() {
    if (calcSlip.length === 0) { alert('请先添加比赛到投注单'); return; }
    const combinedOdds = calcSlip.reduce((a, s) => a * s.odds, 1);
    const amount = 2; // 默认2元
    const payout = (combinedOdds * amount).toFixed(2);

    // 随机开奖
    const outcomes = ['胜', '平', '负'];
    const allHit = calcSlip.every(() => Math.random() < 0.33);
    const finalPayout = allHit ? payout : '0';
    const combineLabel = calcSlip.length === 1 ? '单关' : `${calcSlip.length}串1`;

    const rec = {
        id: Date.now(),
        picks: calcSlip.map(s => ({ ...s })),
        combine: combineLabel,
        combinedOdds: combinedOdds.toFixed(2),
        amount,
        isWin: allHit,
        payout: finalPayout,
        time: new Date().toLocaleString('zh-CN')
    };
    calcHistory.unshift(rec);
    if (calcHistory.length > 10) calcHistory.pop();

    clearSlip();
    renderHistory();
    rerenderCalc();
    showResultModal(rec);
};

function renderHistory() {
    const area = document.getElementById('calcHistoryArea');
    const list = document.getElementById('calcHistoryList');
    if (!area || !list) return;
    if (calcHistory.length === 0) {
        area.style.display = 'none';
    } else {
        area.style.display = 'block';
        list.innerHTML = calcHistory.map(r => `
            <div class="sim-h-item">
                <div>
                    <div>${r.picks.map(p => `${p.betLabel}@${p.odds}`).join(' × ')} | ${r.combine} | ¥${r.amount}</div>
                    <div style="font-size:10px;color:var(--text-dim)">${r.time}</div>
                </div>
                <div>
                    <span style="font-weight:700" class="${r.isWin?'win':'lose'}">${r.isWin ? '+¥'+r.payout : '-¥'+r.amount}</span>
                </div>
            </div>
        `).join('');
    }
}

function showResultModal(rec) {
    // 移除旧弹窗
    document.querySelectorAll('.sim-modal-overlay, .sim-modal').forEach(e => e.remove());

    const overlay = document.createElement('div');
    overlay.className = 'sim-modal-overlay';
    overlay.onclick = () => { overlay.remove(); modal.remove(); };

    const modal = document.createElement('div');
    modal.className = 'sim-modal';
    modal.innerHTML = `
        <button class="sim-modal-close" onclick="this.parentElement.remove();document.querySelector('.sim-modal-overlay').remove()">✕</button>
        <div style="text-align:center;padding:8px 0 16px">
            <div style="font-size:48px;margin-bottom:8px">${rec.isWin ? '🎉' : '😢'}</div>
            <div style="font-size:18px;font-weight:700">${rec.isWin ? '恭喜中奖！' : '未中奖'}</div>
            <div style="color:var(--text-light);font-size:13px;margin-top:6px">
                ${rec.picks.map(p => `${p.matchName.split(' vs ')[0]} ${p.betLabel}(@${p.odds})`).join('<br>')}
            </div>
            <div style="margin-top:10px;font-size:12px;color:var(--text-light)">${rec.combine} · 综合赔率 ${rec.combinedOdds}</div>
            <div style="font-size:28px;font-weight:900;color:${rec.isWin?'var(--red)':'var(--text-dim)'};margin:10px 0">
                ${rec.isWin ? '¥'+rec.payout : '¥0'}
            </div>
            <div style="font-size:12px;color:var(--text-dim)">投注金额 ¥${rec.amount}</div>
        </div>
    `;
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
}

function rerenderCalc() {
    const container = document.getElementById('calcContainer');
    if (container) renderCalc(container);
}

// ==================== 球队分组 ====================
function initTeamsGroup() {
    // 分组标签
    const groupTabs = document.getElementById('groupTabs');
    groupTabs.innerHTML = GROUPS.map(g => `<button class="gtab" data-group="${g}" onclick="showGroup('${g}')">${g}组</button>`).join('');

    // 默认显示A组
    showGroup('A');

    // 搜索列表
    renderAllTeams();
}

window.showGroup = function(g) {
    document.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.gtab[data-group="${g}"]`).classList.add('active');

    const teams = GROUPED_TEAMS[g] || [];
    document.getElementById('groupContent').innerHTML = `
        <div class="group-teams">
            ${teams.map(t => `
                <div class="group-team team-clickable" data-team="${t.name}" data-flag="${t.flag}">
                    <span class="gt-flag">${t.flag}</span>
                    <span class="gt-name">${t.name}</span>
                    ${t.host ? '<span class="gt-host">东道主</span>' : ''}
                    <span class="gt-rank">#${t.rank}</span>
                    <span class="gt-arrow">▶</span>
                </div>
            `).join('')}
        </div>
    `;

    // 绑定点击事件
    document.querySelectorAll('.team-clickable').forEach(el => {
        el.addEventListener('click', function() {
            showTeamPlayers(this.dataset.team, this.dataset.flag);
        });
    });
};

function renderAllTeams(filter = '') {
    const list = filter
        ? TEAMS_DATA.filter(t => t.name.includes(filter) || t.confederation.includes(filter.toUpperCase()))
        : TEAMS_DATA;
    document.getElementById('teamsGrid').innerHTML = list.map(t => `
        <div class="team-card-item team-clickable" data-team="${t.name}" data-flag="${t.flag}">
            <span class="tc-flag">${t.flag}</span>
            <div class="tc-info">
                <h4>${t.name} ${t.host?'🏠':''}</h4>
                <div class="tc-conf">${t.confederation}</div>
                <div class="tc-rank">世界排名 #${t.rank}</div>
            </div>
            <span class="tc-group-tag">${t.group}组</span>
            <span class="gt-arrow">▶</span>
        </div>
    `).join('');

    // 绑定点击事件
    document.querySelectorAll('#teamsGrid .team-clickable').forEach(el => {
        el.addEventListener('click', function() {
            showTeamPlayers(this.dataset.team, this.dataset.flag);
        });
    });
}

window.filterTeams = function() {
    renderAllTeams(document.getElementById('teamSearch').value);
};

// ==================== 城市详情 ====================
function initCityDetails() {
    function renderCities(data, containerId) {
        document.getElementById(containerId).innerHTML = data.map(c => `
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

// ==================== 球队球员列表弹窗 ====================
function showTeamPlayers(teamName, teamFlag) {
    // 移除旧弹窗
    document.querySelectorAll('.player-modal-overlay, .player-modal').forEach(e => e.remove());

    const players = PLAYERS_DATA[teamName] || [];
    const teamInfo = TEAMS_DATA.find(t => t.name === teamName);
    const conf = teamInfo ? teamInfo.confederation : '';
    const rank = teamInfo ? teamInfo.rank : '--';
    const group = teamInfo ? teamInfo.group : '--';

    const posColor = {
        '前锋': '#e74c3c',
        '中场': '#4a90d9',
        '后卫': '#27ae60',
        '门将': '#f39c12'
    };

    const overlay = document.createElement('div');
    overlay.className = 'player-modal-overlay';
    overlay.onclick = () => { overlay.remove(); modal.remove(); };

    const modal = document.createElement('div');
    modal.className = 'player-modal';
    modal.innerHTML = `
        <div class="player-modal-header">
            <button class="player-modal-close" onclick="this.closest('.player-modal').remove();document.querySelector('.player-modal-overlay').remove()">✕</button>
            <div class="pmh-flag">${teamFlag}</div>
            <div class="pmh-name">${teamName}</div>
            <div class="pmh-info">${group}组 · 世界排名 #${rank} · ${conf}</div>
        </div>
        <div class="player-list">
            ${players.length > 0 ? players.map(p => `
                <div class="player-item player-clickable" data-player='${JSON.stringify(p).replace(/'/g, "&#39;")}' data-team="${teamName}" data-flag="${teamFlag}">
                    <span class="pi-num">${p.num}</span>
                    <span class="pi-pos" style="background:${posColor[p.pos]||'#888'};color:#fff">${p.pos}</span>
                    <span class="pi-name">${p.name}</span>
                    <span class="pi-meta">${p.age}岁 · ${p.club}</span>
                </div>
            `).join('') : `
                <div style="text-align:center;padding:30px;color:var(--text-dim)">
                    <div style="font-size:40px;margin-bottom:8px">📋</div>
                    <div>暂无球员数据</div>
                    <div style="font-size:11px;margin-top:4px">阵容待公布</div>
                </div>
            `}
        </div>
        <div class="player-modal-footer">
            共 ${players.length} 名球员 · 2026 预期阵容
        </div>
    `;

    // 绑定球员点击事件
    modal.querySelectorAll('.player-clickable').forEach(el => {
        el.addEventListener('click', function(e) {
            e.stopPropagation();
            const playerData = JSON.parse(this.dataset.player);
            showPlayerDetail(playerData, this.dataset.team, this.dataset.flag);
        });
    });

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
}

// ==================== 单个球员详情弹窗 ====================
function showPlayerDetail(player, teamName, teamFlag) {
    // 移除旧详情弹窗
    document.querySelectorAll('.pdetail-modal-overlay, .pdetail-modal').forEach(e => e.remove());

    const posColor = {
        '前锋': '#e74c3c',
        '中场': '#4a90d9',
        '后卫': '#27ae60',
        '门将': '#f39c12'
    };

    const posBg = {
        '前锋': 'linear-gradient(135deg, #e74c3c, #c0392b)',
        '中场': 'linear-gradient(135deg, #4a90d9, #357abd)',
        '后卫': 'linear-gradient(135deg, #27ae60, #1e8449)',
        '门将': 'linear-gradient(135deg, #f39c12, #d68910)'
    };

    const posEmoji = {
        '前锋': '⚽',
        '中场': '🎯',
        '后卫': '🛡',
        '门将': '🧤'
    };

    // 用球员名字构建搜索图片的 URL
    const searchName = encodeURIComponent(player.name + ' ' + teamName + ' football player');
    const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&size=200&background=4a90d9&color=fff&bold=true`;

    const overlay = document.createElement('div');
    overlay.className = 'pdetail-modal-overlay';
    overlay.onclick = () => { overlay.remove(); detailModal.remove(); };

    const detailModal = document.createElement('div');
    detailModal.className = 'pdetail-modal';
    detailModal.innerHTML = `
        <button class="pdetail-close" onclick="this.closest('.pdetail-modal').remove();document.querySelector('.pdetail-modal-overlay').remove()">✕</button>
        <div class="pdetail-hero" style="background:${posBg[player.pos] || 'linear-gradient(135deg, #636e72, #2d3436)'}">
            <div class="pdetail-team-badge">
                <span>${teamFlag}</span><span>${teamName}</span>
            </div>
            <div class="pdetail-photo-wrapper">
                <img class="pdetail-photo" 
                    src="${fallbackImg}"
                    alt="${player.name}"
                    onerror="this.onerror=null;this.src='${fallbackImg}'"
                    loading="lazy">
            </div>
            <div class="pdetail-num-big">${player.num}</div>
        </div>
        <div class="pdetail-info-card">
            <h2 class="pdetail-name">${player.name}</h2>
            <div class="pdetail-tags">
                <span class="pdetail-tag pdetail-tag-pos" style="background:${posColor[player.pos]||'#888'};color:#fff">${posEmoji[player.pos]||''} ${player.pos}</span>
                <span class="pdetail-tag pdetail-tag-num">#${player.num}</span>
            </div>
            <div class="pdetail-details">
                <div class="pdetail-row">
                    <span class="pdetail-label">年龄</span>
                    <span class="pdetail-value">${player.age} 岁</span>
                </div>
                <div class="pdetail-row">
                    <span class="pdetail-label">俱乐部</span>
                    <span class="pdetail-value">${player.club}</span>
                </div>
                <div class="pdetail-row">
                    <span class="pdetail-label">国家队</span>
                    <span class="pdetail-value">${teamFlag} ${teamName}</span>
                </div>
                <div class="pdetail-row">
                    <span class="pdetail-label">位置</span>
                    <span class="pdetail-value">${player.pos}</span>
                </div>
                <div class="pdetail-row">
                    <span class="pdetail-label">球衣号码</span>
                    <span class="pdetail-value pdetail-num-val">${player.num}</span>
                </div>
            </div>
            <div class="pdetail-bio">
                <p>${player.name}，${player.age}岁，司职${player.pos}，目前效力于${player.club}。作为${teamName}国家队成员，身穿${player.num}号球衣，将在2026年世界杯上为${teamName}${teamFlag}而战。</p>
            </div>
        </div>
        <div class="pdetail-actions">
            <button class="pdetail-btn-back" onclick="this.closest('.pdetail-modal').remove();document.querySelector('.pdetail-modal-overlay').remove()">← 返回球员列表</button>
        </div>
    `;
    document.body.appendChild(overlay);
    document.body.appendChild(detailModal);
}
