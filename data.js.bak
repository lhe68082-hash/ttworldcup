// ============================================
// 2026 世界杯 · 数据文件
// ============================================

// ---------- 城市详情 ----------
const CITY_DETAILS = {
    USA: [
        {
            name: '纽约/新泽西',
            stadium: '大都会人寿体育场',
            capacity: 82500,
            note: '🏆 决赛场地',
            desc: '大都会人寿体育场是NFL纽约巨人队和喷气机队的主场，位于新泽西州东卢瑟福。这座现代化体育场可容纳82500名观众，将承办2026世界杯决赛。'
        },
        {
            name: '洛杉矶',
            stadium: 'SoFi体育场',
            capacity: 70240,
            note: '',
            desc: 'SoFi体育场是NFL洛杉矶公羊队和闪电队的主场，耗资55亿美元建造，是世界上最昂贵的体育场之一，拥有先进的视听系统。'
        },
        {
            name: '达拉斯',
            stadium: 'AT&T体育场',
            capacity: 80000,
            note: '',
            desc: 'AT&T体育场是NFL达拉斯牛仔队的主场，以其巨大的可伸缩屋顶和世界最大的高清视频屏幕而闻名，被誉为"美国之队的主场"。'
        },
        {
            name: '旧金山湾区',
            stadium: '李维斯体育场',
            capacity: 68500,
            note: '',
            desc: '李维斯体育场位于硅谷中心圣克拉拉市，是NFL旧金山49人队的主场。球场设计融合了高科技元素，周边环境优美。'
        },
        {
            name: '迈阿密',
            stadium: '硬石体育场',
            capacity: 65326,
            note: '',
            desc: '硬石体育场位于迈阿密花园市，是NFL迈阿密海豚队的主场。以热带风情和热情的拉丁文化闻名，球场翻新后设施一流。'
        },
        {
            name: '亚特兰大',
            stadium: '梅赛德斯-奔驰体育场',
            capacity: 71000,
            note: '',
            desc: '梅赛德斯-奔驰体育场拥有独特的可伸缩花瓣形屋顶，是NFL亚特兰大猎鹰队和MLS亚特兰大联队的主场，2017年投入使用。'
        },
        {
            name: '西雅图',
            stadium: '流明球场',
            capacity: 69000,
            note: '',
            desc: '流明球场是NFL西雅图海鹰队的主场，以震耳欲聋的球迷噪音闻名。球场设计独特，可远眺西雅图天际线和雷尼尔雪山。'
        },
        {
            name: '休斯顿',
            stadium: 'NRG体育场',
            capacity: 72220,
            note: '',
            desc: 'NRG体育场是NFL休斯顿德州人队的主场，也是全美首个拥有可伸缩屋顶的NFL球场，曾举办过超级碗。'
        },
        {
            name: '费城',
            stadium: '林肯金融球场',
            capacity: 67594,
            note: '',
            desc: '林肯金融球场是NFL费城老鹰队的主场，以激情四射的球迷文化著称。球场位于费城南部的体育综合体区域。'
        },
        {
            name: '堪萨斯城',
            stadium: '箭头体育场',
            capacity: 76416,
            note: '',
            desc: '箭头体育场是NFL堪萨斯城酋长队的主场，以创纪录的球迷噪音分贝数闻名世界，被誉为NFL最吵的主场之一。'
        },
        {
            name: '波士顿',
            stadium: '吉列体育场',
            capacity: 65878,
            note: '',
            desc: '吉列体育场位于马萨诸塞州福克斯堡，是NFL新英格兰爱国者队和MLS新英格兰革命队的主场，见证了爱国者王朝的辉煌。'
        }
    ],
    MEX: [
        {
            name: '墨西哥城',
            stadium: '阿兹特克体育场',
            capacity: 87523,
            note: '🏛 第三次举办世界杯比赛',
            desc: '阿兹特克体育场是世界足坛的圣殿之一。贝利在此捧起1970年世界杯，马拉多纳在此上演"上帝之手"和"世纪进球"（1986年）。这座传奇球场将第三次迎来世界杯。'
        },
        {
            name: '瓜达拉哈拉',
            stadium: '阿克伦体育场',
            capacity: 48071,
            note: '',
            desc: '阿克伦体育场是墨西哥最现代化的球场之一，2010年启用，设计灵感来自火山和龙舌兰。瓜达拉哈拉是墨西哥传统文化中心。'
        },
        {
            name: '蒙特雷',
            stadium: 'BBVA体育场',
            capacity: 53500,
            note: '',
            desc: 'BBVA体育场又称"钢铁巨人"，2015年启用，坐落在蒙特雷壮丽的群山背景下，是墨西哥北部工业之都的标志性建筑。'
        }
    ],
    CAN: [
        {
            name: '多伦多',
            stadium: 'BMO球场',
            capacity: 45000,
            note: '',
            desc: 'BMO球场位于多伦多市中心安大略湖畔，是MLS多伦多FC的主场。多伦多是加拿大最大城市，多元文化交融，足球氛围日益浓厚。'
        },
        {
            name: '温哥华',
            stadium: 'BC广场',
            capacity: 54500,
            note: '',
            desc: 'BC广场拥有独特的可伸缩屋顶，是加拿大最著名的体育场之一，曾举办2010年冬奥会开闭幕式，坐拥壮丽的山海景色。'
        }
    ]
};

// ---------- 球队数据（含模拟分组） ----------
// 随机分配到12个小组
function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

const TEAMS_RAW = [
    // 亚洲 AFC
    { name: '日本', flag: '🇯🇵', confederation: 'AFC', rank: 15 },
    { name: '韩国', flag: '🇰🇷', confederation: 'AFC', rank: 22 },
    { name: '伊朗', flag: '🇮🇷', confederation: 'AFC', rank: 18 },
    { name: '沙特阿拉伯', flag: '🇸🇦', confederation: 'AFC', rank: 53 },
    { name: '澳大利亚', flag: '🇦🇺', confederation: 'AFC', rank: 24 },
    { name: '卡塔尔', flag: '🇶🇦', confederation: 'AFC', rank: 48 },
    { name: '伊拉克', flag: '🇮🇶', confederation: 'AFC', rank: 56 },
    { name: '乌兹别克斯坦', flag: '🇺🇿', confederation: 'AFC', rank: 58 },
    // 非洲 CAF
    { name: '摩洛哥', flag: '🇲🇦', confederation: 'CAF', rank: 12 },
    { name: '塞内加尔', flag: '🇸🇳', confederation: 'CAF', rank: 17 },
    { name: '埃及', flag: '🇪🇬', confederation: 'CAF', rank: 33 },
    { name: '尼日利亚', flag: '🇳🇬', confederation: 'CAF', rank: 36 },
    { name: '科特迪瓦', flag: '🇨🇮', confederation: 'CAF', rank: 41 },
    { name: '喀麦隆', flag: '🇨🇲', confederation: 'CAF', rank: 44 },
    { name: '加纳', flag: '🇬🇭', confederation: 'CAF', rank: 65 },
    { name: '阿尔及利亚', flag: '🇩🇿', confederation: 'CAF', rank: 37 },
    { name: '突尼斯', flag: '🇹🇳', confederation: 'CAF', rank: 41 },
    // 欧洲 UEFA
    { name: '法国', flag: '🇫🇷', confederation: 'UEFA', rank: 2 },
    { name: '英格兰', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA', rank: 4 },
    { name: '西班牙', flag: '🇪🇸', confederation: 'UEFA', rank: 3 },
    { name: '德国', flag: '🇩🇪', confederation: 'UEFA', rank: 10 },
    { name: '葡萄牙', flag: '🇵🇹', confederation: 'UEFA', rank: 6 },
    { name: '意大利', flag: '🇮🇹', confederation: 'UEFA', rank: 9 },
    { name: '荷兰', flag: '🇳🇱', confederation: 'UEFA', rank: 7 },
    { name: '比利时', flag: '🇧🇪', confederation: 'UEFA', rank: 8 },
    { name: '克罗地亚', flag: '🇭🇷', confederation: 'UEFA', rank: 13 },
    { name: '丹麦', flag: '🇩🇰', confederation: 'UEFA', rank: 21 },
    { name: '瑞士', flag: '🇨🇭', confederation: 'UEFA', rank: 19 },
    { name: '奥地利', flag: '🇦🇹', confederation: 'UEFA', rank: 23 },
    { name: '乌克兰', flag: '🇺🇦', confederation: 'UEFA', rank: 25 },
    { name: '瑞典', flag: '🇸🇪', confederation: 'UEFA', rank: 27 },
    { name: '波兰', flag: '🇵🇱', confederation: 'UEFA', rank: 34 },
    { name: '塞尔维亚', flag: '🇷🇸', confederation: 'UEFA', rank: 32 },
    // 南美 CONMEBOL
    { name: '阿根廷', flag: '🇦🇷', confederation: 'CONMEBOL', rank: 1 },
    { name: '巴西', flag: '🇧🇷', confederation: 'CONMEBOL', rank: 5 },
    { name: '乌拉圭', flag: '🇺🇾', confederation: 'CONMEBOL', rank: 11 },
    { name: '哥伦比亚', flag: '🇨🇴', confederation: 'CONMEBOL', rank: 14 },
    { name: '厄瓜多尔', flag: '🇪🇨', confederation: 'CONMEBOL', rank: 30 },
    { name: '智利', flag: '🇨🇱', confederation: 'CONMEBOL', rank: 39 },
    // 中北美 CONCACAF
    { name: '美国', flag: '🇺🇸', confederation: 'CONCACAF', rank: 16, host: true },
    { name: '墨西哥', flag: '🇲🇽', confederation: 'CONCACAF', rank: 20, host: true },
    { name: '加拿大', flag: '🇨🇦', confederation: 'CONCACAF', rank: 31, host: true },
    { name: '哥斯达黎加', flag: '🇨🇷', confederation: 'CONCACAF', rank: 49 },
    { name: '巴拿马', flag: '🇵🇦', confederation: 'CONCACAF', rank: 35 },
    { name: '牙买加', flag: '🇯🇲', confederation: 'CONCACAF', rank: 55 },
    // 大洋洲 OFC
    { name: '新西兰', flag: '🇳🇿', confederation: 'OFC', rank: 89 },
];

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const shuffled = shuffle([...TEAMS_RAW]);
const TEAMS_DATA = shuffled.map((t, i) => ({ ...t, group: GROUPS[Math.floor(i / 4)] }));

// 分组数据
const GROUPED_TEAMS = {};
GROUPS.forEach(g => { GROUPED_TEAMS[g] = TEAMS_DATA.filter(t => t.group === g); });

// ---------- 历届冠军 ----------
const CHAMPIONS = [
    { year: 2022, winner: '阿根廷', flag: '🇦🇷', host: '卡塔尔' },
    { year: 2018, winner: '法国', flag: '🇫🇷', host: '俄罗斯' },
    { year: 2014, winner: '德国', flag: '🇩🇪', host: '巴西' },
    { year: 2010, winner: '西班牙', flag: '🇪🇸', host: '南非' },
    { year: 2006, winner: '意大利', flag: '🇮🇹', host: '德国' },
    { year: 2002, winner: '巴西', flag: '🇧🇷', host: '韩国/日本' },
    { year: 1998, winner: '法国', flag: '🇫🇷', host: '法国' },
    { year: 1994, winner: '巴西', flag: '🇧🇷', host: '美国' },
    { year: 1990, winner: '德国', flag: '🇩🇪', host: '意大利' },
    { year: 1986, winner: '阿根廷', flag: '🇦🇷', host: '墨西哥' },
    { year: 1982, winner: '意大利', flag: '🇮🇹', host: '西班牙' },
    { year: 1978, winner: '阿根廷', flag: '🇦🇷', host: '阿根廷' },
    { year: 1974, winner: '德国', flag: '🇩🇪', host: '西德' },
    { year: 1970, winner: '巴西', flag: '🇧🇷', host: '墨西哥' },
    { year: 1966, winner: '英格兰', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', host: '英格兰' },
    { year: 1962, winner: '巴西', flag: '🇧🇷', host: '智利' },
    { year: 1958, winner: '巴西', flag: '🇧🇷', host: '瑞典' },
    { year: 1954, winner: '德国', flag: '🇩🇪', host: '瑞士' },
    { year: 1950, winner: '乌拉圭', flag: '🇺🇾', host: '巴西' },
    { year: 1938, winner: '意大利', flag: '🇮🇹', host: '法国' },
    { year: 1934, winner: '意大利', flag: '🇮🇹', host: '意大利' },
    { year: 1930, winner: '乌拉圭', flag: '🇺🇾', host: '乌拉圭' },
];

// ---------- 赛程数据 ----------
const SCHEDULE_DATA = [];
const groupTeams = {};
GROUPS.forEach((g, gi) => {
    const pool = GROUPED_TEAMS[g];
    if (!pool || pool.length < 4) return;
    groupTeams[g] = pool;
    const pairs = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
    pairs.forEach((pair, pi) => {
        const baseDate = new Date(2026, 5, 11 + gi * 2 + pi);
        const hours = [13, 16, 19, 21][pi % 4];
        const usaCities = CITY_DETAILS.USA;
        SCHEDULE_DATA.push({
            id: `G${g}-${pi+1}`,
            stage: 'group',
            stageName: `小组赛 ${g}组`,
            home: pool[pair[0]].name,
            away: pool[pair[1]].name,
            homeFlag: pool[pair[0]].flag,
            awayFlag: pool[pair[1]].flag,
            date: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), hours, 0),
            venue: usaCities[gi % 11].name,
            status: 'upcoming',
            score: null
        });
    });
});

const knockoutRounds = [
    { stage: 'r32', name: '1/16决赛', count: 16, startDay: 28 },
    { stage: 'r16', name: '1/8决赛', count: 8, startDay: 35 },
    { stage: 'qf', name: '1/4决赛', count: 4, startDay: 39 },
    { stage: 'sf', name: '半决赛', count: 2, startDay: 42 },
    { stage: '3rd', name: '三四名决赛', count: 1, startDay: 44 },
    { stage: 'final', name: '🏆 决赛', count: 1, startDay: 45 },
];

let koId = 0;
knockoutRounds.forEach(round => {
    for (let i = 0; i < round.count; i++) {
        const baseDate = new Date(2026, 5, 11 + round.startDay + i);
        SCHEDULE_DATA.push({
            id: `${round.stage}-${i+1}`,
            stage: round.stage,
            stageName: round.name,
            home: '待定',
            away: '待定',
            homeFlag: '❓',
            awayFlag: '❓',
            date: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 20, 0),
            venue: round.stage === 'final'
                ? '纽约/新泽西'
                : CITY_DETAILS.USA[(koId++) % 11].name,
            status: 'upcoming',
            score: null
        });
    }
});

// 模拟部分已赛
SCHEDULE_DATA.forEach((m, i) => {
    if (i < 24) { m.status = 'played'; m.score = { home: Math.floor(Math.random()*4), away: Math.floor(Math.random()*3) }; }
    if (i >= 24 && i < 26) { m.status = 'live'; m.score = { home: Math.floor(Math.random()*3), away: Math.floor(Math.random()*2) }; }
});

// ---------- 问答 ----------
const QUIZ_DATA = [
    { question: '2026世界杯由哪三个国家联合主办？', options: ['美国、加拿大、墨西哥', '美国、巴西、阿根廷', '英国、法国、德国', '中国、日本、韩国'], answer: 0 },
    { question: '2026世界杯共有多少支球队参赛？', options: ['32支', '40支', '48支', '64支'], answer: 2 },
    { question: '2026世界杯决赛将在哪个城市举行？', options: ['洛杉矶', '墨西哥城', '多伦多', '纽约/新泽西'], answer: 3 },
    { question: '世界杯历史上夺冠次数最多的国家是？', options: ['德国', '巴西', '阿根廷', '意大利'], answer: 1 },
    { question: '2026世界杯小组赛阶段，每组几支球队？', options: ['3支', '4支', '5支', '6支'], answer: 1 },
    { question: '2026世界杯总共将进行多少场比赛？', options: ['64场', '80场', '104场', '128场'], answer: 2 },
    { question: '2022年卡塔尔世界杯的冠军是？', options: ['法国', '巴西', '德国', '阿根廷'], answer: 3 },
    { question: '哪座体育场将第三次举办世界杯比赛？', options: ['马拉卡纳', '温布利', '阿兹特克', '诺坎普'], answer: 2 },
    { question: '小组赛结束后，多少支球队晋级淘汰赛？', options: ['16支', '24支', '32支', '48支'], answer: 2 },
    { question: '2026世界杯的举办时间是？', options: ['6月-7月', '11月-12月', '5月-6月', '7月-8月'], answer: 0 },
];

// ---------- 竞彩数据 ----------
const LOTTERY_INFO = {
    spf: {
        title: '竞彩足球胜平负',
        desc: '竞猜全场90分钟（含伤停补时）比赛的胜、平、负结果，是最基础、最受欢迎的竞彩玩法。',
        rules: [
            '<strong>胜(3)：</strong>主队进球数多于客队',
            '<strong>平(1)：</strong>主客队进球数相同',
            '<strong>负(0)：</strong>主队进球数少于客队',
            '只计算90分钟常规时间+伤停补时，不含加时赛和点球大战',
            '可单场投注，也可串关（2串1、3串1等）',
            '每注2元，单票最高可中100万元'
        ]
    },
    rqspf: {
        title: '竞彩足球让球胜平负',
        desc: '在考虑让球因素后竞猜比赛结果。让球方（强队）需减去让球数，受让方（弱队）加上让球数后判断胜负。',
        rules: [
            '<strong>让球胜(3)：</strong>让球方减去让球数后仍赢',
            '<strong>让球平(1)：</strong>让球方减去让球数后打平',
            '<strong>让球负(0)：</strong>让球方减去让球数后输',
            '让球数通常为-1、-2等，由体彩中心根据实力差距设定',
            '适合强弱分明的比赛，赔率更均衡'
        ]
    },
    bf: {
        title: '竞彩足球比分',
        desc: '竞猜比赛最终的准确比分。难度高，但赔率也最高，是资深彩民喜爱的玩法。',
        rules: [
            '需准确预测90分钟内的最终比分',
            '可选比分范围：0:0 至 5:5，以及"胜其他"、"平其他"、"负其他"',
            '"胜其他"：主队进球数≥6的获胜比分',
            '"平其他"：双方进球数≥6的平局比分',
            '"负其他"：客队进球数≥6的获胜比分'
        ]
    },
    zjq: {
        title: '竞彩足球总进球数',
        desc: '竞猜比赛双方的总进球数（90分钟内）。不需要判断胜负，只猜进球总数。',
        rules: [
            '可选总进球数：0、1、2、3、4、5、6、7+',
            '"7+"表示总进球数≥7个',
            '只计算90分钟常规时间+伤停补时内的进球',
            '2球和3球是出现频率最高的选项'
        ]
    },
    bqc: {
        title: '竞彩足球半全场胜平负',
        desc: '同时竞猜半场和全场的胜负结果。将比赛分为上半场和全场两个阶段分别预测。',
        rules: [
            '共9种组合：胜胜、胜平、胜负、平胜、平平、平负、负胜、负平、负负',
            '<strong>胜胜：</strong>半场主队领先，全场主队获胜',
            '<strong>平胜：</strong>半场打平，全场主队获胜',
            '<strong>负胜：</strong>半场客队领先，全场主队逆转获胜',
            '逆转类选项赔率通常较高'
        ]
    },
    hhgg: {
        title: '竞彩足球混合过关',
        desc: '将不同玩法的比赛组合在一起进行串关投注，是最灵活的高级玩法。',
        rules: [
            '可将胜平负、让球胜平负、比分、总进球数、半全场等玩法混合串关',
            '至少选择2场比赛，最多可选择8场',
            '所有选中的比赛结果必须全部猜中才能中奖',
            '可选择"自由过关"或"组合过关"方式',
            '单注最高奖金受玩法限制，比分玩法串关最高可中1000万'
        ]
    }
};

// ---------- 竞彩赔率生成器（5种玩法） ----------
function generateOdds() {
    const r = (lo, hi) => (lo + Math.random() * (hi - lo)).toFixed(2);

    // 胜平负
    const spf = { win: r(1.5, 6.5), draw: r(2.5, 6.5), lose: r(2.0, 10.0) };

    // 让球胜平负
    const handicap = Math.random() > 0.5 ? '-2' : '-1';
    const rqspf = {
        handicap,
        win: r(2.2, 5.5),
        draw: r(3.0, 6.5),
        lose: r(1.8, 4.8)
    };

    // 比分（常用比分 + 其他）
    const scoreOdds = {};
    const scores = [
        '1:0','2:0','2:1','3:0','3:1','3:2',
        '0:0','1:1','2:2','3:3',
        '0:1','0:2','1:2','0:3','1:3','2:3'
    ];
    scores.forEach(s => {
        const parts = s.split(':');
        const diff = parseInt(parts[0]) - parseInt(parts[1]);
        const baseOdds = Math.abs(diff) >= 3 ? 12 : Math.abs(diff) >= 2 ? 8 : diff === 0 ? 5 : 6.5;
        scoreOdds[s] = r(baseOdds, baseOdds + 8);
    });
    scoreOdds['胜其他'] = r(15, 50);
    scoreOdds['平其他'] = r(30, 100);
    scoreOdds['负其他'] = r(15, 50);

    // 半全场（9种组合）
    const bqcOdds = {};
    const bqcMap = [
        { key: '胜胜', base: 2.8 }, { key: '胜平', base: 12 }, { key: '胜负', base: 25 },
        { key: '平胜', base: 4.0 }, { key: '平平', base: 4.5 }, { key: '平负', base: 4.2 },
        { key: '负胜', base: 22 }, { key: '负平', base: 13 }, { key: '负负', base: 3.0 }
    ];
    bqcMap.forEach(x => { bqcOdds[x.key] = r(x.base, x.base + 6); });

    // 总进球数
    const zjqOdds = {};
    [{key:'0',base:8},{key:'1',base:4},{key:'2',base:3.2},{key:'3',base:3.5},{key:'4',base:5},{key:'5',base:8},{key:'6',base:14},{key:'7+',base:18}]
        .forEach(x => { zjqOdds[x.key] = r(x.base, x.base + 5); });

    return { spf, rqspf, scoreOdds, bqcOdds, zjqOdds };
}

// ---------- 球员数据 ----------
const PLAYERS_DATA = {
    '阿根廷': [
        { name:'梅西', num:10, pos:'前锋', age:38, club:'迈阿密国际' },
        { name:'劳塔罗·马丁内斯', num:22, pos:'前锋', age:28, club:'国际米兰' },
        { name:'阿尔瓦雷斯', num:9, pos:'前锋', age:26, club:'马德里竞技' },
        { name:'恩佐·费尔南德斯', num:24, pos:'中场', age:25, club:'切尔西' },
        { name:'麦卡利斯特', num:20, pos:'中场', age:27, club:'利物浦' },
        { name:'罗梅罗', num:13, pos:'后卫', age:28, club:'热刺' },
        { name:'E.马丁内斯', num:23, pos:'门将', age:33, club:'阿斯顿维拉' },
    ],
    '巴西': [
        { name:'维尼修斯', num:7, pos:'前锋', age:25, club:'皇家马德里' },
        { name:'罗德里戈', num:11, pos:'前锋', age:25, club:'皇家马德里' },
        { name:'恩德里克', num:9, pos:'前锋', age:19, club:'皇家马德里' },
        { name:'帕奎塔', num:8, pos:'中场', age:28, club:'西汉姆联' },
        { name:'吉马良斯', num:5, pos:'中场', age:28, club:'纽卡斯尔' },
        { name:'马尔基尼奥斯', num:4, pos:'后卫', age:32, club:'巴黎圣日耳曼' },
        { name:'阿利松', num:1, pos:'门将', age:33, club:'利物浦' },
    ],
    '法国': [
        { name:'姆巴佩', num:10, pos:'前锋', age:27, club:'皇家马德里' },
        { name:'登贝莱', num:11, pos:'前锋', age:29, club:'巴黎圣日耳曼' },
        { name:'格列兹曼', num:7, pos:'前锋', age:35, club:'马德里竞技' },
        { name:'楚阿梅尼', num:8, pos:'中场', age:26, club:'皇家马德里' },
        { name:'卡马文加', num:6, pos:'中场', age:23, club:'皇家马德里' },
        { name:'萨利巴', num:17, pos:'后卫', age:25, club:'阿森纳' },
        { name:'迈尼昂', num:16, pos:'门将', age:30, club:'AC米兰' },
    ],
    '英格兰': [
        { name:'凯恩', num:9, pos:'前锋', age:32, club:'拜仁慕尼黑' },
        { name:'贝林厄姆', num:10, pos:'中场', age:23, club:'皇家马德里' },
        { name:'萨卡', num:7, pos:'前锋', age:24, club:'阿森纳' },
        { name:'福登', num:11, pos:'前锋', age:26, club:'曼城' },
        { name:'赖斯', num:4, pos:'中场', age:27, club:'阿森纳' },
        { name:'斯通斯', num:5, pos:'后卫', age:32, club:'曼城' },
        { name:'皮克福德', num:1, pos:'门将', age:32, club:'埃弗顿' },
    ],
    '西班牙': [
        { name:'亚马尔', num:19, pos:'前锋', age:18, club:'巴塞罗那' },
        { name:'佩德里', num:8, pos:'中场', age:23, club:'巴塞罗那' },
        { name:'奥尔莫', num:10, pos:'中场', age:28, club:'巴塞罗那' },
        { name:'罗德里', num:16, pos:'中场', age:29, club:'曼城' },
        { name:'尼科·威廉姆斯', num:17, pos:'前锋', age:23, club:'毕尔巴鄂' },
        { name:'库库雷利亚', num:3, pos:'后卫', age:27, club:'切尔西' },
        { name:'乌奈·西蒙', num:23, pos:'门将', age:28, club:'毕尔巴鄂' },
    ],
    '德国': [
        { name:'穆西亚拉', num:10, pos:'中场', age:23, club:'拜仁慕尼黑' },
        { name:'维尔茨', num:17, pos:'中场', age:23, club:'勒沃库森' },
        { name:'哈弗茨', num:7, pos:'前锋', age:27, club:'阿森纳' },
        { name:'基米希', num:6, pos:'中场', age:31, club:'拜仁慕尼黑' },
        { name:'吕迪格', num:2, pos:'后卫', age:33, club:'皇家马德里' },
        { name:'施洛特贝克', num:4, pos:'后卫', age:26, club:'多特蒙德' },
        { name:'特尔施特根', num:1, pos:'门将', age:34, club:'巴塞罗那' },
    ],
    '葡萄牙': [
        { name:'C罗', num:7, pos:'前锋', age:41, club:'利雅得胜利' },
        { name:'B费', num:8, pos:'中场', age:31, club:'曼联' },
        { name:'B席', num:10, pos:'中场', age:31, club:'曼城' },
        { name:'莱奥', num:17, pos:'前锋', age:27, club:'AC米兰' },
        { name:'维蒂尼亚', num:23, pos:'中场', age:26, club:'巴黎圣日耳曼' },
        { name:'鲁本·迪亚斯', num:3, pos:'后卫', age:29, club:'曼城' },
        { name:'迪奥戈·科斯塔', num:22, pos:'门将', age:26, club:'波尔图' },
    ],
    '意大利': [
        { name:'基耶萨', num:7, pos:'前锋', age:28, club:'利物浦' },
        { name:'巴雷拉', num:18, pos:'中场', age:29, club:'国际米兰' },
        { name:'托纳利', num:8, pos:'中场', age:26, club:'纽卡斯尔' },
        { name:'迪马尔科', num:3, pos:'后卫', age:28, club:'国际米兰' },
        { name:'巴斯托尼', num:23, pos:'后卫', age:27, club:'国际米兰' },
        { name:'卡拉菲奥里', num:5, pos:'后卫', age:24, club:'阿森纳' },
        { name:'多纳鲁马', num:1, pos:'门将', age:27, club:'巴黎圣日耳曼' },
    ],
    '荷兰': [
        { name:'加克波', num:8, pos:'前锋', age:27, club:'利物浦' },
        { name:'德佩', num:10, pos:'前锋', age:32, club:'科林蒂安' },
        { name:'德容', num:21, pos:'中场', age:29, club:'巴塞罗那' },
        { name:'赖因德斯', num:14, pos:'中场', age:27, club:'AC米兰' },
        { name:'范迪克', num:4, pos:'后卫', age:34, club:'利物浦' },
        { name:'阿克', num:5, pos:'后卫', age:31, club:'曼城' },
        { name:'弗莱肯', num:1, pos:'门将', age:32, club:'布伦特福德' },
    ],
    '比利时': [
        { name:'卢卡库', num:9, pos:'前锋', age:33, club:'那不勒斯' },
        { name:'多库', num:11, pos:'前锋', age:24, club:'曼城' },
        { name:'德布劳内', num:7, pos:'中场', age:34, club:'曼城' },
        { name:'奥纳纳', num:6, pos:'中场', age:24, club:'阿斯顿维拉' },
        { name:'蒂勒曼斯', num:8, pos:'中场', age:29, club:'阿斯顿维拉' },
        { name:'卡斯塔涅', num:21, pos:'后卫', age:30, club:'富勒姆' },
        { name:'库尔图瓦', num:1, pos:'门将', age:34, club:'皇家马德里' },
    ],
    '克罗地亚': [
        { name:'克拉马里奇', num:9, pos:'前锋', age:34, club:'霍芬海姆' },
        { name:'佩里西奇', num:4, pos:'前锋', age:37, club:'埃因霍温' },
        { name:'莫德里奇', num:10, pos:'中场', age:40, club:'皇家马德里' },
        { name:'科瓦契奇', num:8, pos:'中场', age:32, club:'曼城' },
        { name:'布罗佐维奇', num:11, pos:'中场', age:33, club:'利雅得胜利' },
        { name:'格瓦迪奥尔', num:20, pos:'后卫', age:24, club:'曼城' },
        { name:'利瓦科维奇', num:1, pos:'门将', age:31, club:'费内巴切' },
    ],
    '乌拉圭': [
        { name:'努涅斯', num:11, pos:'前锋', age:27, club:'利物浦' },
        { name:'佩利斯特里', num:8, pos:'前锋', age:24, club:'帕纳辛奈科斯' },
        { name:'巴尔韦德', num:15, pos:'中场', age:27, club:'皇家马德里' },
        { name:'乌加特', num:5, pos:'中场', age:25, club:'曼联' },
        { name:'本坦库尔', num:6, pos:'中场', age:28, club:'热刺' },
        { name:'阿劳霍', num:4, pos:'后卫', age:27, club:'巴塞罗那' },
        { name:'罗切特', num:1, pos:'门将', age:33, club:'巴西国际' },
    ],
    '哥伦比亚': [
        { name:'路易斯·迪亚斯', num:7, pos:'前锋', age:29, club:'利物浦' },
        { name:'杜兰', num:9, pos:'前锋', age:22, club:'利雅得胜利' },
        { name:'J罗', num:10, pos:'中场', age:34, club:'莱昂' },
        { name:'莱尔马', num:16, pos:'中场', age:31, club:'水晶宫' },
        { name:'穆尼奥斯', num:21, pos:'后卫', age:28, club:'水晶宫' },
        { name:'桑切斯', num:23, pos:'后卫', age:29, club:'加拉塔萨雷' },
        { name:'巴尔加斯', num:12, pos:'门将', age:30, club:'百万富翁' },
    ],
    '摩洛哥': [
        { name:'恩内斯里', num:19, pos:'前锋', age:29, club:'费内巴切' },
        { name:'齐耶赫', num:7, pos:'前锋', age:33, club:'加拉塔萨雷' },
        { name:'阿什拉夫', num:2, pos:'后卫', age:27, club:'巴黎圣日耳曼' },
        { name:'阿姆拉巴特', num:4, pos:'中场', age:29, club:'费内巴切' },
        { name:'迪亚斯', num:10, pos:'中场', age:27, club:'皇家马德里' },
        { name:'阿格尔德', num:5, pos:'后卫', age:30, club:'皇家社会' },
        { name:'布努', num:1, pos:'门将', age:35, club:'利雅得新月' },
    ],
    '塞内加尔': [
        { name:'马内', num:10, pos:'前锋', age:34, club:'利雅得胜利' },
        { name:'杰克逊', num:9, pos:'前锋', age:24, club:'切尔西' },
        { name:'伊斯梅拉·萨尔', num:18, pos:'前锋', age:28, club:'马赛' },
        { name:'库利巴利', num:3, pos:'后卫', age:34, club:'利雅得新月' },
        { name:'门迪', num:16, pos:'门将', age:34, club:'吉达国民' },
        { name:'迪亚塔', num:15, pos:'中场', age:27, club:'摩纳哥' },
        { name:'尼亚凯特', num:4, pos:'后卫', age:30, club:'里昂' },
    ],
    '日本': [
        { name:'三笘薰', num:7, pos:'前锋', age:29, club:'布莱顿' },
        { name:'久保建英', num:11, pos:'中场', age:25, club:'皇家社会' },
        { name:'南野拓实', num:10, pos:'前锋', age:31, club:'摩纳哥' },
        { name:'远藤航', num:6, pos:'中场', age:32, club:'利物浦' },
        { name:'富安健洋', num:22, pos:'后卫', age:27, club:'阿森纳' },
        { name:'板仓滉', num:4, pos:'后卫', age:29, club:'门兴' },
        { name:'铃木彩艳', num:23, pos:'门将', age:23, club:'帕尔马' },
    ],
    '韩国': [
        { name:'孙兴慜', num:7, pos:'前锋', age:33, club:'热刺' },
        { name:'黄喜灿', num:11, pos:'前锋', age:30, club:'狼队' },
        { name:'李刚仁', num:18, pos:'中场', age:25, club:'巴黎圣日耳曼' },
        { name:'黄仁范', num:6, pos:'中场', age:29, club:'费耶诺德' },
        { name:'金玟哉', num:4, pos:'后卫', age:29, club:'拜仁慕尼黑' },
        { name:'薛英佑', num:3, pos:'后卫', age:27, club:'贝尔格莱德红星' },
        { name:'赵贤祐', num:1, pos:'门将', age:34, club:'蔚山HD' },
    ],
    '伊朗': [
        { name:'塔雷米', num:9, pos:'前锋', age:33, club:'国际米兰' },
        { name:'阿兹蒙', num:20, pos:'前锋', age:31, club:'迪拜青年国民' },
        { name:'贾汉巴赫什', num:7, pos:'中场', age:32, club:'海伦芬' },
        { name:'戈利扎德', num:17, pos:'中场', age:30, club:'莱切' },
        { name:'侯赛尼', num:5, pos:'后卫', age:29, club:'埃斯特格拉尔' },
        { name:'贝兰万德', num:1, pos:'门将', age:33, club:'波斯波利斯' },
        { name:'哈里扎德', num:4, pos:'后卫', age:35, club:'大不里士拖拉机' },
    ],
    '美国': [
        { name:'普利西奇', num:10, pos:'前锋', age:27, club:'AC米兰' },
        { name:'巴洛贡', num:9, pos:'前锋', age:24, club:'摩纳哥' },
        { name:'麦肯尼', num:8, pos:'中场', age:27, club:'尤文图斯' },
        { name:'雷纳', num:7, pos:'中场', age:23, club:'多特蒙德' },
        { name:'亚当斯', num:4, pos:'中场', age:27, club:'伯恩茅斯' },
        { name:'罗宾逊', num:5, pos:'后卫', age:28, club:'富勒姆' },
        { name:'特纳', num:1, pos:'门将', age:32, club:'水晶宫' },
    ],
    '墨西哥': [
        { name:'希门尼斯', num:9, pos:'前锋', age:35, club:'富勒姆' },
        { name:'洛萨诺', num:11, pos:'前锋', age:30, club:'埃因霍温' },
        { name:'皮内达', num:17, pos:'中场', age:30, club:'雅典AEK' },
        { name:'埃德松', num:4, pos:'中场', age:27, club:'美洲狮' },
        { name:'蒙特斯', num:3, pos:'后卫', age:29, club:'阿尔梅里亚' },
        { name:'巴斯克斯', num:19, pos:'后卫', age:27, club:'热那亚' },
        { name:'奥乔亚', num:13, pos:'门将', age:40, club:'阿维卡' },
    ],
    '加拿大': [
        { name:'戴维', num:9, pos:'前锋', age:26, club:'里尔' },
        { name:'拉林', num:17, pos:'前锋', age:31, club:'马洛卡' },
        { name:'阿方索·戴维斯', num:19, pos:'后卫', age:25, club:'拜仁慕尼黑' },
        { name:'布坎南', num:7, pos:'中场', age:27, club:'国际米兰' },
        { name:'尤斯塔基奥', num:21, pos:'中场', age:29, club:'波尔图' },
        { name:'康奈尔', num:14, pos:'后卫', age:30, club:'欧本' },
        { name:'圣克莱尔', num:1, pos:'门将', age:29, club:'明尼苏达联' },
    ],
    '丹麦': [
        { name:'霍伊伦', num:9, pos:'前锋', age:23, club:'曼联' },
        { name:'多尔贝格', num:12, pos:'前锋', age:28, club:'安德莱赫特' },
        { name:'埃里克森', num:10, pos:'中场', age:34, club:'曼联' },
        { name:'霍伊别尔', num:23, pos:'中场', age:30, club:'马赛' },
        { name:'克里斯滕森', num:6, pos:'后卫', age:30, club:'巴塞罗那' },
        { name:'安德森', num:2, pos:'后卫', age:30, club:'富勒姆' },
        { name:'小舒梅切尔', num:1, pos:'门将', age:39, club:'凯尔特人' },
    ],
    '瑞士': [
        { name:'恩博洛', num:9, pos:'前锋', age:29, club:'摩纳哥' },
        { name:'阿姆杜尼', num:19, pos:'前锋', age:25, club:'本菲卡' },
        { name:'扎卡', num:10, pos:'中场', age:33, club:'勒沃库森' },
        { name:'弗洛伊勒', num:8, pos:'中场', age:34, club:'博洛尼亚' },
        { name:'阿坎吉', num:5, pos:'后卫', age:30, club:'曼城' },
        { name:'R.罗德里格斯', num:13, pos:'后卫', age:33, club:'贝蒂斯' },
        { name:'索默', num:1, pos:'门将', age:37, club:'国际米兰' },
    ],
    '奥地利': [
        { name:'阿瑙托维奇', num:7, pos:'前锋', age:36, club:'国际米兰' },
        { name:'格雷戈里奇', num:11, pos:'前锋', age:32, club:'弗赖堡' },
        { name:'萨比策', num:9, pos:'中场', age:32, club:'多特蒙德' },
        { name:'鲍姆加特纳', num:19, pos:'中场', age:26, club:'RB莱比锡' },
        { name:'莱默尔', num:20, pos:'中场', age:29, club:'拜仁慕尼黑' },
        { name:'阿拉巴', num:8, pos:'后卫', age:34, club:'皇家马德里' },
        { name:'彭茨', num:1, pos:'门将', age:29, club:'布隆德比' },
    ],
    '乌克兰': [
        { name:'多夫比克', num:11, pos:'前锋', age:28, club:'罗马' },
        { name:'亚列姆丘克', num:9, pos:'前锋', age:30, club:'奥林匹亚科斯' },
        { name:'穆德里克', num:10, pos:'前锋', age:25, club:'切尔西' },
        { name:'津琴科', num:17, pos:'中场', age:29, club:'阿森纳' },
        { name:'马利诺夫斯基', num:8, pos:'中场', age:33, club:'热那亚' },
        { name:'扎巴尔尼', num:22, pos:'后卫', age:23, club:'伯恩茅斯' },
        { name:'卢宁', num:1, pos:'门将', age:27, club:'皇家马德里' },
    ],
    '瑞典': [
        { name:'伊萨克', num:9, pos:'前锋', age:26, club:'纽卡斯尔' },
        { name:'哲凯赖什', num:17, pos:'前锋', age:28, club:'葡萄牙体育' },
        { name:'库卢塞夫斯基', num:10, pos:'中场', age:26, club:'热刺' },
        { name:'福斯贝里', num:7, pos:'中场', age:34, club:'纽约红牛' },
        { name:'林德洛夫', num:3, pos:'后卫', age:31, club:'曼联' },
        { name:'希恩', num:14, pos:'后卫', age:27, club:'亚特兰大' },
        { name:'奥尔森', num:1, pos:'门将', age:36, club:'阿斯顿维拉' },
    ],
    '波兰': [
        { name:'莱万多夫斯基', num:9, pos:'前锋', age:37, club:'巴塞罗那' },
        { name:'希维德尔斯基', num:16, pos:'前锋', age:29, club:'夏洛特FC' },
        { name:'泽林斯基', num:20, pos:'中场', age:32, club:'国际米兰' },
        { name:'基维奥尔', num:14, pos:'后卫', age:26, club:'阿森纳' },
        { name:'萨拉蒙', num:2, pos:'后卫', age:35, club:'波兹南莱赫' },
        { name:'弗兰科夫斯基', num:19, pos:'中场', age:31, club:'朗斯' },
        { name:'什琴斯尼', num:1, pos:'门将', age:36, club:'巴塞罗那' },
    ],
    '塞尔维亚': [
        { name:'弗拉霍维奇', num:9, pos:'前锋', age:26, club:'尤文图斯' },
        { name:'米特罗维奇', num:7, pos:'前锋', age:31, club:'利雅得新月' },
        { name:'塔迪奇', num:10, pos:'中场', age:37, club:'费内巴切' },
        { name:'米林科维奇', num:20, pos:'中场', age:31, club:'利雅得新月' },
        { name:'古德利', num:8, pos:'中场', age:34, club:'塞维利亚' },
        { name:'帕夫洛维奇', num:4, pos:'后卫', age:25, club:'AC米兰' },
        { name:'V.米林科维奇', num:23, pos:'门将', age:29, club:'都灵' },
    ],
    '埃及': [
        { name:'萨拉赫', num:10, pos:'前锋', age:34, club:'利物浦' },
        { name:'马尔穆什', num:7, pos:'前锋', age:27, club:'曼城' },
        { name:'特雷泽盖', num:22, pos:'前锋', age:31, club:'阿尔赖扬' },
        { name:'埃尔内尼', num:17, pos:'中场', age:33, club:'阿森纳' },
        { name:'法蒂', num:19, pos:'中场', age:27, club:'金字塔' },
        { name:'赫加齐', num:6, pos:'后卫', age:35, club:'吉达联合' },
        { name:'埃尔舍纳维', num:1, pos:'门将', age:37, club:'开罗国民' },
    ],
    '尼日利亚': [
        { name:'奥斯梅恩', num:9, pos:'前锋', age:27, club:'加拉塔萨雷' },
        { name:'卢克曼', num:11, pos:'前锋', age:28, club:'亚特兰大' },
        { name:'丘库埃泽', num:21, pos:'前锋', age:27, club:'AC米兰' },
        { name:'伊沃比', num:17, pos:'中场', age:30, club:'富勒姆' },
        { name:'恩迪迪', num:4, pos:'中场', age:29, club:'莱斯特城' },
        { name:'巴锡', num:21, pos:'后卫', age:26, club:'富勒姆' },
        { name:'乌佐霍', num:23, pos:'门将', age:27, club:'奥莫尼亚' },
    ],
    '科特迪瓦': [
        { name:'阿莱', num:22, pos:'前锋', age:31, club:'多特蒙德' },
        { name:'佩佩', num:19, pos:'前锋', age:31, club:'比利亚雷亚尔' },
        { name:'福法纳', num:8, pos:'中场', age:29, club:'利雅得胜利' },
        { name:'凯西', num:6, pos:'中场', age:29, club:'吉达国民' },
        { name:'迪奥曼德', num:3, pos:'后卫', age:22, club:'葡萄牙体育' },
        { name:'博利', num:21, pos:'后卫', age:33, club:'诺丁汉森林' },
        { name:'福法纳', num:1, pos:'门将', age:34, club:'昂热' },
    ],
    '喀麦隆': [
        { name:'阿布巴卡尔', num:10, pos:'前锋', age:34, club:'哈塔伊体育' },
        { name:'舒波莫廷', num:13, pos:'前锋', age:35, club:'纽约红牛' },
        { name:'安古伊萨', num:8, pos:'中场', age:30, club:'那不勒斯' },
        { name:'翁圭内', num:17, pos:'中场', age:28, club:'法兰克福' },
        { name:'卡斯特莱托', num:21, pos:'后卫', age:31, club:'南特' },
        { name:'托洛', num:5, pos:'后卫', age:28, club:'西雅图海湾人' },
        { name:'奥纳纳', num:1, pos:'门将', age:30, club:'曼联' },
    ],
    '加纳': [
        { name:'乔丹·阿尤', num:9, pos:'前锋', age:34, club:'莱斯特城' },
        { name:'塞梅奥', num:25, pos:'前锋', age:26, club:'伯恩茅斯' },
        { name:'库杜斯', num:10, pos:'中场', age:25, club:'西汉姆联' },
        { name:'托马斯', num:5, pos:'中场', age:33, club:'阿森纳' },
        { name:'萨利苏', num:18, pos:'后卫', age:27, club:'摩纳哥' },
        { name:'吉库', num:4, pos:'后卫', age:31, club:'费内巴切' },
        { name:'阿蒂齐吉', num:1, pos:'门将', age:29, club:'圣加仑' },
    ],
    '阿尔及利亚': [
        { name:'马赫雷斯', num:7, pos:'前锋', age:35, club:'吉达国民' },
        { name:'古伊里', num:9, pos:'前锋', age:26, club:'雷恩' },
        { name:'本纳赛尔', num:6, pos:'中场', age:28, club:'马赛' },
        { name:'奥亚尔', num:8, pos:'中场', age:28, club:'吉达联合' },
        { name:'本塞拜尼', num:21, pos:'后卫', age:31, club:'多特蒙德' },
        { name:'阿塔勒', num:20, pos:'后卫', age:30, club:'阿尔萨德' },
        { name:'曼德雷亚', num:23, pos:'门将', age:27, club:'卡昂' },
    ],
    '突尼斯': [
        { name:'姆萨克尼', num:7, pos:'前锋', age:35, club:'多哈阿拉伯人' },
        { name:'贾齐里', num:19, pos:'前锋', age:32, club:'扎马莱克' },
        { name:'斯希里', num:17, pos:'中场', age:31, club:'法兰克福' },
        { name:'莱多尼', num:14, pos:'中场', age:25, club:'费伦茨瓦罗斯' },
        { name:'塔尔比', num:4, pos:'后卫', age:28, club:'洛里昂' },
        { name:'布隆', num:3, pos:'后卫', age:31, club:'皇家贝蒂斯' },
        { name:'达门', num:1, pos:'门将', age:26, club:'萨德' },
    ],
    '沙特阿拉伯': [
        { name:'谢赫里', num:11, pos:'前锋', age:31, club:'利雅得新月' },
        { name:'阿尔多萨里', num:10, pos:'中场', age:34, club:'利雅得新月' },
        { name:'阿尔比拉坎', num:9, pos:'前锋', age:25, club:'吉达国民' },
        { name:'卡诺', num:8, pos:'中场', age:31, club:'利雅得新月' },
        { name:'阿尔布莱希', num:5, pos:'后卫', age:34, club:'利雅得新月' },
        { name:'阿尔沙赫拉尼', num:6, pos:'后卫', age:34, club:'利雅得新月' },
        { name:'阿尔奥维斯', num:21, pos:'门将', age:34, club:'利雅得新月' },
    ],
    '澳大利亚': [
        { name:'古德温', num:11, pos:'前锋', age:34, club:'麦加统一' },
        { name:'杜克', num:15, pos:'前锋', age:35, club:'町田泽维亚' },
        { name:'欧文', num:22, pos:'中场', age:33, club:'圣保利' },
        { name:'麦格里', num:14, pos:'中场', age:27, club:'米德尔斯堡' },
        { name:'苏塔', num:19, pos:'后卫', age:27, club:'谢菲联' },
        { name:'伯吉斯', num:4, pos:'后卫', age:31, club:'伊普斯维奇' },
        { name:'瑞安', num:1, pos:'门将', age:34, club:'朗斯' },
    ],
    '卡塔尔': [
        { name:'阿菲夫', num:11, pos:'前锋', age:29, club:'萨德' },
        { name:'阿里', num:19, pos:'前锋', age:29, club:'杜海勒' },
        { name:'海多斯', num:10, pos:'中场', age:35, club:'萨德' },
        { name:'布迪亚夫', num:6, pos:'中场', age:35, club:'杜海勒' },
        { name:'萨尔曼', num:16, pos:'后卫', age:28, club:'萨德' },
        { name:'胡希', num:5, pos:'后卫', age:33, club:'萨德' },
        { name:'巴尔沙姆', num:1, pos:'门将', age:28, club:'萨德' },
    ],
    '厄瓜多尔': [
        { name:'恩纳·瓦伦西亚', num:13, pos:'前锋', age:36, club:'巴西国际' },
        { name:'凯塞多', num:23, pos:'中场', age:24, club:'切尔西' },
        { name:'帕乔', num:6, pos:'后卫', age:24, club:'巴黎圣日耳曼' },
        { name:'埃斯图皮南', num:7, pos:'后卫', age:28, club:'布莱顿' },
        { name:'因卡皮耶', num:3, pos:'后卫', age:24, club:'勒沃库森' },
        { name:'普拉塔', num:19, pos:'前锋', age:25, club:'弗拉门戈' },
        { name:'加林德斯', num:1, pos:'门将', age:35, club:'瓦奇巴托' },
    ],
    '智利': [
        { name:'布里尔顿', num:22, pos:'前锋', age:27, club:'谢菲联' },
        { name:'达维拉', num:9, pos:'前锋', age:28, club:'美洲狮' },
        { name:'比达尔', num:8, pos:'中场', age:39, club:'科洛科洛' },
        { name:'普尔加', num:13, pos:'中场', age:32, club:'弗拉门戈' },
        { name:'马里潘', num:3, pos:'后卫', age:32, club:'都灵' },
        { name:'苏亚索', num:17, pos:'后卫', age:28, club:'图卢兹' },
        { name:'科尔特斯', num:12, pos:'门将', age:34, club:'科洛科洛' },
    ],
    '哥斯达黎加': [
        { name:'乌加尔德', num:9, pos:'前锋', age:24, club:'莫斯科斯巴达' },
        { name:'坎贝尔', num:12, pos:'前锋', age:33, club:'萨普里萨' },
        { name:'鲁伊斯', num:10, pos:'中场', age:40, club:'萨普里萨' },
        { name:'阿吉莱拉', num:17, pos:'中场', age:22, club:'埃斯特利' },
        { name:'卡尔沃', num:15, pos:'后卫', age:33, club:'华雷斯' },
        { name:'巴尔加斯', num:8, pos:'后卫', age:33, club:'百万富翁' },
        { name:'纳瓦斯', num:1, pos:'门将', age:39, club:'萨普里萨' },
    ],
    '巴拿马': [
        { name:'迪亚斯', num:10, pos:'前锋', age:27, club:'康塞普西翁大学' },
        { name:'法哈多', num:17, pos:'前锋', age:31, club:'天主教大学' },
        { name:'卡拉斯基利亚', num:20, pos:'中场', age:28, club:'休斯顿迪纳摩' },
        { name:'罗德里格斯', num:8, pos:'中场', age:29, club:'华雷斯' },
        { name:'埃斯科瓦尔', num:4, pos:'后卫', age:31, club:'萨普里萨' },
        { name:'米勒', num:3, pos:'后卫', age:28, club:'波特兰伐木者' },
        { name:'莫斯克拉', num:22, pos:'门将', age:30, club:'阿尔法伊哈' },
    ],
    '牙买加': [
        { name:'安东尼奥', num:9, pos:'前锋', age:36, club:'西汉姆联' },
        { name:'贝利', num:11, pos:'前锋', age:28, club:'阿斯顿维拉' },
        { name:'格雷', num:7, pos:'前锋', age:29, club:'热刺' },
        { name:'德科多瓦-里德', num:15, pos:'中场', age:33, club:'莱斯特城' },
        { name:'平诺克', num:5, pos:'后卫', age:32, club:'布伦特福德' },
        { name:'贝尔', num:4, pos:'后卫', age:22, club:'奥兰多城' },
        { name:'布莱克', num:1, pos:'门将', age:35, club:'费城联合' },
    ],
    '伊拉克': [
        { name:'侯赛因', num:18, pos:'前锋', age:30, club:'胡齐斯坦钢铁' },
        { name:'伊克巴尔', num:10, pos:'中场', age:23, club:'乌得勒支' },
        { name:'阿里', num:7, pos:'前锋', age:26, club:'巴格达空军' },
        { name:'拉希德', num:8, pos:'中场', age:28, club:'巴格达警察' },
        { name:'纳德姆', num:4, pos:'后卫', age:28, club:'巴格达空军' },
        { name:'阿德南', num:5, pos:'后卫', age:32, club:'梅斯' },
        { name:'哈桑', num:12, pos:'门将', age:33, club:'巴格达警察' },
    ],
    '乌兹别克斯坦': [
        { name:'肖穆罗多夫', num:14, pos:'前锋', age:30, club:'罗马' },
        { name:'法祖拉耶夫', num:22, pos:'中场', age:22, club:'莫斯科中央陆军' },
        { name:'马沙里波夫', num:10, pos:'中场', age:32, club:'利雅得胜利' },
        { name:'舒库罗夫', num:9, pos:'中场', age:29, club:'艾因' },
        { name:'阿里库洛夫', num:23, pos:'后卫', age:27, club:'棉农' },
        { name:'尤尔达舍夫', num:2, pos:'后卫', age:25, club:'下诺夫哥罗德' },
        { name:'尤苏波夫', num:1, pos:'门将', age:29, club:'纳夫巴霍' },
    ],
    '新西兰': [
        { name:'伍德', num:9, pos:'前锋', age:34, club:'诺丁汉森林' },
        { name:'巴尔巴鲁塞斯', num:7, pos:'前锋', age:36, club:'惠灵顿凤凰' },
        { name:'辛格', num:11, pos:'中场', age:27, club:'海法马卡比' },
        { name:'贝尔', num:8, pos:'中场', age:29, club:'维堡' },
        { name:'史密斯', num:4, pos:'后卫', age:35, club:'明尼苏达联' },
        { name:'卡卡瑟', num:15, pos:'后卫', age:26, club:'恩波利' },
        { name:'赛尔', num:1, pos:'门将', age:26, club:'普利茅斯' },
    ],
};
