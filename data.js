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

// ---------- 球队数据（2026世界杯48支参赛球队）----------
// 2026年世界杯分组抽签尚未进行，以下为基于当前预选赛形势的模拟分组
// 东道主：美国、加拿大、墨西哥（自动晋级）
// 南美洲：巴西、阿根廷、乌拉圭、哥伦比亚、厄瓜多尔、智利
// 欧洲：法国、德国、西班牙、英格兰、葡萄牙、比利时、荷兰、克罗地亚、意大利、波兰、瑞士、丹麦、塞尔维亚、乌克兰、奥地利、苏格兰
// 亚洲：日本、韩国、伊朗、沙特阿拉伯、澳大利亚、卡塔尔、伊拉克、阿联酋
// 非洲：摩洛哥、塞内加尔、尼日利亚、埃及、阿尔及利亚、喀麦隆、加纳、突尼斯、南非
// 中北美（不含东道主）：哥斯达黎加、巴拿马、牙买加
// 大洋洲：新西兰

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const TEAMS_DATA = [
    // ===== A组：墨西哥（东道主）、波兰、沙特阿拉伯、尼日利亚 =====
    { name: '墨西哥', flag: '🇲🇽', confederation: 'CONCACAF', rank: 15, group: 'A', host: true },
    { name: '波兰', flag: '🇵🇱', confederation: 'UEFA', rank: 28, group: 'A' },
    { name: '沙特阿拉伯', flag: '🇸🇦', confederation: 'AFC', rank: 54, group: 'A' },
    { name: '尼日利亚', flag: '🇳🇬', confederation: 'CAF', rank: 40, group: 'A' },
    // ===== B组：加拿大（东道主）、西班牙、乌克兰、喀麦隆 =====
    { name: '加拿大', flag: '🇨🇦', confederation: 'CONCACAF', rank: 33, group: 'B', host: true },
    { name: '西班牙', flag: '🇪🇸', confederation: 'UEFA', rank: 3, group: 'B' },
    { name: '乌克兰', flag: '🇺🇦', confederation: 'UEFA', rank: 22, group: 'B' },
    { name: '喀麦隆', flag: '🇨🇲', confederation: 'CAF', rank: 45, group: 'B' },
    // ===== C组：巴西、塞尔维亚、瑞士、日本 =====
    { name: '巴西', flag: '🇧🇷', confederation: 'CONMEBOL', rank: 5, group: 'C' },
    { name: '塞尔维亚', flag: '🇷🇸', confederation: 'UEFA', rank: 25, group: 'C' },
    { name: '瑞士', flag: '🇨🇭', confederation: 'UEFA', rank: 19, group: 'C' },
    { name: '日本', flag: '🇯🇵', confederation: 'AFC', rank: 18, group: 'C' },
    // ===== D组：美国（东道主）、德国、摩洛哥、哥斯达黎加 =====
    { name: '美国', flag: '🇺🇸', confederation: 'CONCACAF', rank: 16, group: 'D', host: true },
    { name: '德国', flag: '🇩🇪', confederation: 'UEFA', rank: 9, group: 'D' },
    { name: '摩洛哥', flag: '🇲🇦', confederation: 'CAF', rank: 12, group: 'D' },
    { name: '哥斯达黎加', flag: '🇨🇷', confederation: 'CONCACAF', rank: 38, group: 'D' },
    // ===== E组：阿根廷（卫冕冠军）、荷兰、厄瓜多尔、埃及 =====
    { name: '阿根廷', flag: '🇦🇷', confederation: 'CONMEBOL', rank: 1, group: 'E', champion: true },
    { name: '荷兰', flag: '🇳🇱', confederation: 'UEFA', rank: 6, group: 'E' },
    { name: '厄瓜多尔', flag: '🇪🇨', confederation: 'CONMEBOL', rank: 31, group: 'E' },
    { name: '埃及', flag: '🇪🇬', confederation: 'CAF', rank: 34, group: 'E' },
    // ===== F组：法国、比利时、韩国、澳大利亚 =====
    { name: '法国', flag: '🇫🇷', confederation: 'UEFA', rank: 2, group: 'F' },
    { name: '比利时', flag: '🇧🇪', confederation: 'UEFA', rank: 14, group: 'F' },
    { name: '韩国', flag: '🇰🇷', confederation: 'AFC', rank: 23, group: 'F' },
    { name: '澳大利亚', flag: '🇦🇺', confederation: 'AFC', rank: 26, group: 'F' },
    // ===== G组：英格兰、葡萄牙、乌拉圭、突尼斯 =====
    { name: '英格兰', flag: '🏴', confederation: 'UEFA', rank: 4, group: 'G' },
    { name: '葡萄牙', flag: '🇵🇹', confederation: 'UEFA', rank: 8, group: 'G' },
    { name: '乌拉圭', flag: '🇺🇾', confederation: 'CONMEBOL', rank: 11, group: 'G' },
    { name: '突尼斯', flag: '🇹🇳', confederation: 'CAF', rank: 43, group: 'G' },
    // ===== H组：克罗地亚、意大利、哥伦比亚、南非 =====
    { name: '克罗地亚', flag: '🇭🇷', confederation: 'UEFA', rank: 13, group: 'H' },
    { name: '意大利', flag: '🇮🇹', confederation: 'UEFA', rank: 7, group: 'H' },
    { name: '哥伦比亚', flag: '🇨🇴', confederation: 'CONMEBOL', rank: 17, group: 'H' },
    { name: '南非', flag: '🇿🇦', confederation: 'CAF', rank: 50, group: 'H' },
    // ===== I组：丹麦、奥地利、智利、阿尔及利亚 =====
    { name: '丹麦', flag: '🇩🇰', confederation: 'UEFA', rank: 21, group: 'I' },
    { name: '奥地利', flag: '🇦🇹', confederation: 'UEFA', rank: 32, group: 'I' },
    { name: '智利', flag: '🇨🇱', confederation: 'CONMEBOL', rank: 29, group: 'I' },
    { name: '阿尔及利亚', flag: '🇩🇿', confederation: 'CAF', rank: 39, group: 'I' },
    // ===== J组：苏格兰、卡塔尔、伊拉克、塞内加尔 =====
    { name: '苏格兰', flag: '🏴', confederation: 'UEFA', rank: 36, group: 'J' },
    { name: '卡塔尔', flag: '🇶🇦', confederation: 'AFC', rank: 48, group: 'J' },
    { name: '伊拉克', flag: '🇮🇶', confederation: 'AFC', rank: 56, group: 'J' },
    { name: '塞内加尔', flag: '🇸🇳', confederation: 'CAF', rank: 17, group: 'J' },
    // ===== K组：伊朗、阿联酋、巴拿马、牙买加 =====
    { name: '伊朗', flag: '🇮🇷', confederation: 'AFC', rank: 24, group: 'K' },
    { name: '阿联酋', flag: '🇦🇪', confederation: 'AFC', rank: 68, group: 'K' },
    { name: '巴拿马', flag: '🇵🇦', confederation: 'CONCACAF', rank: 57, group: 'K' },
    { name: '牙买加', flag: '🇯🇲', confederation: 'CONCACAF', rank: 53, group: 'K' },
    // ===== L组：新西兰、加纳、玻利维亚、委内瑞拉 =====
    { name: '新西兰', flag: '🇳🇿', confederation: 'OFC', rank: 89, group: 'L' },
    { name: '加纳', flag: '🇬🇭', confederation: 'CAF', rank: 60, group: 'L' },
    { name: '玻利维亚', flag: '🇧🇴', confederation: 'CONMEBOL', rank: 78, group: 'L' },
    { name: '委内瑞拉', flag: '🇻🇪', confederation: 'CONMEBOL', rank: 46, group: 'L' },
];

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
    { year: 1966, winner: '英格兰', flag: '🏴', host: '英格兰' },
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

// ===== 小组赛场地映射 =====
const GROUP_VENUE_MAP = {
    'GA-1': '墨西哥城', 'GA-2': '瓜达拉哈拉', 'GA-3': '墨西哥城',
    'GA-4': '瓜达拉哈拉', 'GA-5': '蒙特雷',   'GA-6': '休斯顿',
    'GB-1': '洛杉矶',   'GB-2': '温哥华',     'GB-3': '多伦多',
    'GB-4': '西雅图',   'GB-5': '温哥华',     'GB-6': '休斯顿',
    'GC-1': '达拉斯',   'GC-2': '波士顿',     'GC-3': '迈阿密',
    'GC-4': '亚特兰大', 'GC-5': '费城',       'GC-6': '堪萨斯城',
    'GD-1': '旧金山湾区', 'GD-2': '洛杉矶',   'GD-3': '西雅图',
    'GD-4': '旧金山湾区', 'GD-5': '达拉斯',   'GD-6': '多伦多',
    'GE-1': '迈阿密',     'GE-2': '休斯顿',   'GE-3': '纽约/新泽西',
    'GE-4': '费城',       'GE-5': '亚特兰大', 'GE-6': '波士顿',
    'GF-1': '西雅图',   'GF-2': '达拉斯',     'GF-3': '堪萨斯城',
    'GF-4': '达拉斯',   'GF-5': '休斯顿',     'GF-6': '迈阿密',
    'GG-1': '洛杉矶',     'GG-2': '西雅图',   'GG-3': '温哥华',
    'GG-4': '西雅图',     'GG-5': '温哥华',   'GG-6': '旧金山湾区',
    'GH-1': '休斯顿',     'GH-2': '亚特兰大', 'GH-3': '瓜达拉哈拉',
    'GH-4': '休斯顿',     'GH-5': '达拉斯',   'GH-6': '迈阿密',
    'GI-1': '多伦多',     'GI-2': '费城',     'GI-3': '波士顿',
    'GI-4': '多伦多',     'GI-5': '纽约/新泽西','GI-6': '堪萨斯城',
    'GJ-1': '堪萨斯城',   'GJ-2': '迈阿密',   'GJ-3': '达拉斯',
    'GJ-4': '堪萨斯城',   'GJ-5': '亚特兰大', 'GJ-6': '费城',
    'GK-1': '波士顿',     'GK-2': '休斯顿',   'GK-3': '迈阿密',
    'GK-4': '亚特兰大',   'GK-5': '洛杉矶',   'GK-6': '旧金山湾区',
    'GL-1': '达拉斯',     'GL-2': '波士顿',   'GL-3': '纽约/新泽西',
    'GL-4': '费城',       'GL-5': '迈阿密',   'GL-6': '温哥华',
};

const MATCHES_PER_DAY = [2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 6, 9];
const GROUP_START_DAY = 12;

function getDayInfo(seqIndex) {
    let acc = 0;
    for (let d = 0; d < MATCHES_PER_DAY.length; d++) {
        if (seqIndex < acc + MATCHES_PER_DAY[d]) {
            return { day: d, index: seqIndex - acc };
        }
        acc += MATCHES_PER_DAY[d];
    }
    return { day: MATCHES_PER_DAY.length - 1, index: 0 };
}

const TIME_POOL = [3, 6, 9, 12, 1, 4, 7, 10, 2, 5, 8, 11];

const groupTeams = {};
GROUPS.forEach((g, gi) => {
    const pool = GROUPED_TEAMS[g];
    if (!pool || pool.length < 4) return;
    groupTeams[g] = pool;
    const pairs = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
    pairs.forEach((pair, pi) => {
        const seqIndex = gi * 6 + pi;
        const { day, index } = getDayInfo(seqIndex);
        const baseDate = new Date(2026, 5, GROUP_START_DAY + day);
        const matchId = `G${g}-${pi+1}`;
        const hours = matchId === 'GA-1' ? 3 : TIME_POOL[index % TIME_POOL.length];
        SCHEDULE_DATA.push({
            id: matchId,
            stage: 'group',
            stageName: `小组赛 ${g}组`,
            home: pool[pair[0]].name,
            away: pool[pair[1]].name,
            homeFlag: pool[pair[0]].flag,
            awayFlag: pool[pair[1]].flag,
            date: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), hours, 0),
            venue: GROUP_VENUE_MAP[matchId] || '待定',
            status: 'upcoming',
            score: null
        });
    });
});

const KO_SCHEDULE = {
    'r32-1':  { date: '2026-06-29T03:00', venue: '洛杉矶' },
    'r32-2':  { date: '2026-06-30T01:00', venue: '休斯顿' },
    'r32-3':  { date: '2026-06-30T04:30', venue: '波士顿' },
    'r32-4':  { date: '2026-06-30T09:00', venue: '蒙特雷' },
    'r32-5':  { date: '2026-07-01T01:00', venue: '达拉斯' },
    'r32-6':  { date: '2026-07-01T05:00', venue: '纽约/新泽西' },
    'r32-7':  { date: '2026-07-01T09:00', venue: '墨西哥城' },
    'r32-8':  { date: '2026-07-02T00:00', venue: '亚特兰大' },
    'r32-9':  { date: '2026-07-02T04:00', venue: '西雅图' },
    'r32-10': { date: '2026-07-02T08:00', venue: '旧金山湾区' },
    'r32-11': { date: '2026-07-03T03:00', venue: '洛杉矶' },
    'r32-12': { date: '2026-07-03T07:00', venue: '迈阿密' },
    'r32-13': { date: '2026-07-03T11:00', venue: '温哥华' },
    'r32-14': { date: '2026-07-04T02:00', venue: '达拉斯' },
    'r32-15': { date: '2026-07-04T06:00', venue: '迈阿密' },
    'r32-16': { date: '2026-07-04T09:30', venue: '堪萨斯城' },
    'r16-1':  { date: '2026-07-05T01:00', venue: '休斯顿' },
    'r16-2':  { date: '2026-07-05T05:00', venue: '费城' },
    'r16-3':  { date: '2026-07-06T04:00', venue: '纽约/新泽西' },
    'r16-4':  { date: '2026-07-06T08:00', venue: '墨西哥城' },
    'r16-5':  { date: '2026-07-07T03:00', venue: '达拉斯' },
    'r16-6':  { date: '2026-07-07T08:00', venue: '西雅图' },
    'r16-7':  { date: '2026-07-08T00:00', venue: '亚特兰大' },
    'r16-8':  { date: '2026-07-08T04:00', venue: '温哥华' },
    'qf-1':   { date: '2026-07-10T04:00', venue: '波士顿' },
    'qf-2':   { date: '2026-07-11T03:00', venue: '洛杉矶' },
    'qf-3':   { date: '2026-07-12T05:00', venue: '迈阿密' },
    'qf-4':   { date: '2026-07-12T09:00', venue: '堪萨斯城' },
    'sf-1':   { date: '2026-07-15T03:00', venue: '达拉斯' },
    'sf-2':   { date: '2026-07-16T03:00', venue: '亚特兰大' },
    '3rd-1':  { date: '2026-07-18T20:00', venue: '迈阿密' },
    'final-1':{ date: '2026-07-19T20:00', venue: '纽约/新泽西' },
};

const KO_ROUNDS = [
    { stage: 'r32', name: '1/16决赛', count: 16 },
    { stage: 'r16', name: '1/8决赛', count: 8 },
    { stage: 'qf', name: '1/4决赛', count: 4 },
    { stage: 'sf', name: '半决赛', count: 2 },
    { stage: '3rd', name: '三四名决赛', count: 1 },
    { stage: 'final', name: '🏆 决赛', count: 1 },
];

KO_ROUNDS.forEach(round => {
    for (let i = 0; i < round.count; i++) {
        const id = `${round.stage}-${i+1}`;
        const ko = KO_SCHEDULE[id] || {};
        const d = ko.date ? new Date(ko.date) : new Date(2026, 5, 11);
        SCHEDULE_DATA.push({
            id,
            stage: round.stage,
            stageName: round.name,
            home: '待定',
            away: '待定',
            homeFlag: '❓',
            awayFlag: '❓',
            date: d,
            venue: ko.venue || '待定',
            status: 'upcoming',
            score: null
        });
    }
});

// ---------- 问答 ----------
const QUIZ_DATA = [
    { question: '2026世界杯由哪三个国家联合主办？', options: ['美国、加拿大、墨西哥', '美国、巴西、阿根廷', '英国、法国、德国', '中国、日本、韩国'], answer: 0 },
    { question: '2026世界杯共有多少支球队参赛？', options: ['32支', '40支', '48支', '64支'], answer: 2 },
    { question: '2026世界杯决赛将在哪个城市举行？', options: ['洛杉矶', '墨西哥城', '多伦多', '纽约/新泽西'], answer: 3 },
    { question: '2026世界杯总共将进行多少场比赛？', options: ['64场', '80场', '104场', '128场'], answer: 2 },
    { question: '2026世界杯的举办时间是？', options: ['6月-7月', '11月-12月', '5月-6月', '7月-8月'], answer: 0 },
    { question: '2026世界杯是第几届世界杯？', options: ['第21届', '第22届', '第23届', '第24届'], answer: 2 },
    { question: '2026世界杯扩军后，共分成几个小组？', options: ['6个', '8个', '12个', '16个'], answer: 2 },
    { question: '2026世界杯每个小组有多少支球队？', options: ['3支', '4支', '5支', '6支'], answer: 1 },
    { question: '2026世界杯小组赛采用什么赛制？', options: ['单循环', '双循环', '淘汰制', '积分制'], answer: 0 },
    { question: '2026世界杯小组赛每队进行几场比赛？', options: ['2场', '3场', '4场', '5场'], answer: 1 },
    { question: '2026世界杯小组赛共有多少场比赛？', options: ['36场', '48场', '72场', '96场'], answer: 1 },
    { question: '2026世界杯小组赛结束后，多少支球队晋级淘汰赛？', options: ['16支', '24支', '32支', '36支'], answer: 2 },
    { question: '2026世界杯八分之一决赛有几场？', options: ['4场', '8场', '16场', '32场'], answer: 1 },
    { question: '2026世界杯四分之一决赛有几场？', options: ['2场', '4场', '8场', '16场'], answer: 1 },
    { question: '2026世界杯半决赛有几场？', options: ['1场', '2场', '4场', '8场'], answer: 1 },
    { question: '2026世界杯在美国共有多少个举办城市？', options: ['8个', '10个', '11个', '13个'], answer: 2 },
    { question: '2026世界杯在墨西哥共有多少个举办城市？', options: ['3个', '4个', '5个', '6个'], answer: 0 },
    { question: '2026世界杯在加拿大共有多少个举办城市？', options: ['2个', '3个', '4个', '5个'], answer: 1 },
    { question: '2026世界杯开幕式在哪个城市举行？', options: ['墨西哥城', '洛杉矶', '多伦多', '迈阿密'], answer: 0 },
    { question: '2026世界杯决赛场地容量约为多少？', options: ['6万人', '7万人', '8万人', '9万人'], answer: 2 },
    { question: '2022年卡塔尔世界杯的冠军是？', options: ['法国', '巴西', '德国', '阿根廷'], answer: 3 },
    { question: '2022年卡塔尔世界杯亚军是？', options: ['法国', '克罗地亚', '英格兰', '摩洛哥'], answer: 0 },
    { question: '2022年世界杯金球奖得主是？', options: ['梅西', '姆巴佩', '莫德里奇', '格列兹曼'], answer: 0 },
    { question: '2022年世界杯金靴奖得主是？', options: ['梅西', '姆巴佩', '本泽马', '内马尔'], answer: 1 },
    { question: '2022年世界杯金手套奖（最佳门将）得主是？', options: ['洛里', '布努', '马丁内斯', '诺伊尔'], answer: 2 },
    { question: '2022年世界杯最佳年轻球员奖得主是？', options: ['贝林厄姆', '佩德里', '楚阿梅尼', '穆西亚拉'], answer: 0 },
    { question: '2022年世界杯决赛比分是？', options: ['3-2', '3-3', '4-2', '4-3'], answer: 1 },
    { question: '2022年世界杯决赛进行了几场点球大战？', options: ['1场', '2场', '3场', '无点球'], answer: 0 },
    { question: '2022年世界杯首次进入四强的非洲球队是？', options: ['塞内加尔', '喀麦隆', '加纳', '摩洛哥'], answer: 3 },
    { question: '2022年卡塔尔世界杯是第几届？', options: ['第20届', '第21届', '第22届', '第23届'], answer: 2 },
    { question: '世界杯历史上夺冠次数最多的国家是？', options: ['德国', '巴西', '阿根廷', '意大利'], answer: 1 },
    { question: '巴西队共获得过多少次世界杯冠军？', options: ['3次', '4次', '5次', '6次'], answer: 2 },
    { question: '德国队共获得过多少次世界杯冠军？', options: ['2次', '3次', '4次', '5次'], answer: 2 },
    { question: '意大利队共获得过多少次世界杯冠军？', options: ['1次', '2次', '3次', '4次'], answer: 2 },
    { question: '阿根廷队共获得过多少次世界杯冠军？', options: ['1次', '2次', '3次', '4次'], answer: 2 },
    { question: '法国队共获得过多少次世界杯冠军？', options: ['1次', '2次', '3次', '从未夺冠'], answer: 1 },
    { question: '乌拉圭队获得过几次世界杯冠军？', options: ['1次', '2次', '3次', '从未夺冠'], answer: 1 },
    { question: '英格兰队获得过几次世界杯冠军？', options: ['1次', '2次', '从未夺冠', '3次'], answer: 0 },
    { question: '西班牙队获得过几次世界杯冠军？', options: ['1次', '2次', '从未夺冠', '3次'], answer: 0 },
    { question: '哪支球队是第一届世界杯（1930年）的冠军？', options: ['巴西', '乌拉圭', '阿根廷', '意大利'], answer: 1 },
    { question: '第一届世界杯在哪个国家举办？', options: ['巴西', '乌拉圭', '阿根廷', '意大利'], answer: 1 },
    { question: '第一届世界杯的冠军是？', options: ['巴西', '乌拉圭', '阿根廷', '意大利'], answer: 1 },
    { question: '哪座体育场将第三次举办世界杯比赛？', options: ['马拉卡纳', '温布利', '阿兹特克', '诺坎普'], answer: 2 },
    { question: '1958年瑞典世界杯冠军是？', options: ['巴西', '德国', '英格兰', '瑞典'], answer: 0 },
    { question: '1974年西德世界杯冠军是？', options: ['巴西', '西德', '荷兰', '意大利'], answer: 1 },
    { question: '1986年墨西哥世界杯冠军是？', options: ['巴西', '西德', '阿根廷', '法国'], answer: 2 },
    { question: '1998年法国世界杯冠军是？', options: ['德国', '巴西', '法国', '意大利'], answer: 2 },
    { question: '2002年韩日世界杯冠军是？', options: ['德国', '巴西', '意大利', '法国'], answer: 1 },
    { question: '2006年德国世界杯冠军是？', options: ['德国', '巴西', '意大利', '法国'], answer: 2 },
    { question: '2010年南非世界杯冠军是？', options: ['德国', '荷兰', '西班牙', '巴西'], answer: 2 },
    { question: '2014年巴西世界杯冠军是？', options: ['巴西', '德国', '阿根廷', '荷兰'], answer: 1 },
    { question: '2018年俄罗斯世界杯冠军是？', options: ['法国', '克罗地亚', '比利时', '英格兰'], answer: 0 },
    { question: '哪个国家首次参加世界杯就在首届比赛中夺冠？', options: ['巴西', '乌拉圭', '阿根廷', '意大利'], answer: 1 },
    { question: '哪支球队参加了全部的世界杯决赛圈比赛？', options: ['巴西', '德国', '阿根廷', '意大利'], answer: 0 },
    { question: '哪个大洲的国家从未举办过世界杯？', options: ['欧洲', '南美洲', '非洲', '亚洲'], answer: 2 },
    { question: '足球比赛全场时间为多少分钟？', options: ['80分钟', '90分钟', '100分钟', '120分钟'], answer: 1 },
    { question: '每支球队在场上比赛时有多少名球员？', options: ['9名', '10名', '11名', '12名'], answer: 2 },
    { question: '点球点距离球门多少码？', options: ['10码', '11码', '12码', '14码'], answer: 2 },
    { question: '越位规则中，球员在什么情况下不算越位？', options: ['在自己半场', '在最前面', '没有意义', '在球后面'], answer: 0 },
    { question: '一场比赛最多可以使用多少个换人名额？', options: ['2个', '3个', '4个', '5个'], answer: 3 },
    { question: '足球比赛中最少需要多少名球员才能进行比赛？', options: ['5名', '6名', '7名', '9名'], answer: 2 },
    { question: '直接任意球可以直接射门得分吗？', options: ['可以', '不可以', '只有点球可以', '视情况而定'], answer: 0 },
    { question: '角球是对方球员将球踢出本方球门线后判罚的吗？', options: ['是的', '不是，是本方球员', '只有守门员', '错误描述'], answer: 1 },
    { question: '黄牌警告累计几张会两黄变一红被罚下场？', options: ['1张', '2张', '3张', '4张'], answer: 1 },
    { question: '守门员在禁区内可以用手触球吗？', options: ['可以', '不可以', '只有本方后卫可以', '有特殊情况'], answer: 0 },
    { question: '世界杯历史最佳射手是谁？', options: ['罗纳尔多', '克洛泽', '穆勒', '贝利'], answer: 1 },
    { question: '克洛泽共在世界杯打进多少个进球？', options: ['12个', '14个', '16个', '18个'], answer: 2 },
    { question: '罗纳尔多（巴西）共在世界杯打进多少个进球？', options: ['12个', '14个', '15个', '16个'], answer: 2 },
    { question: '托马斯·穆勒在世界杯共打进多少球？', options: ['8个', '10个', '12个', '14个'], answer: 1 },
    { question: '梅西共参加了几届世界杯？', options: ['3届', '4届', '5届', '6届'], answer: 2 },
    { question: 'C罗共参加了几届世界杯？', options: ['3届', '4届', '5届', '6届'], answer: 2 },
    { question: '谁是世界杯历史上年龄最大的进球球员？', options: ['罗杰·米拉', '哈达里', '马特乌斯', '佐夫'], answer: 1 },
    { question: '谁是世界杯历史上最年轻的进球球员？', options: ['贝利', '姆巴佩', '厄瓜多尔球员', '梅西'], answer: 0 },
    { question: '2022年世界杯决赛打进3球的球员是？', options: ['梅西', '姆巴佩', '迪玛利亚', '阿尔瓦雷斯'], answer: 1 },
    { question: '第一位在世界杯决赛中进球的非洲球员是？', options: ['埃托奥', '亚亚·图雷', '奥巴梅扬', '曼朱基奇'], answer: 0 },
    { question: '世界杯历史上最快的进球是用多少秒打进的？', options: ['8秒', '10秒', '11秒', '15秒'], answer: 2 },
    { question: '单届世界杯进球最多的球员是？', options: ['方丹', '罗纳尔多', '穆勒', '克林斯曼'], answer: 0 },
    { question: '方丹在1958年世界杯打进多少球？', options: ['10个', '12个', '13个', '15个'], answer: 2 },
    { question: '世界杯单场比赛进球最多的纪录是多少球？', options: ['7球', '8球', '9球', '10球'], answer: 2 },
    { question: '哪位球员保持着世界杯出场次数最多纪录？', options: ['马特乌斯', '马尔蒂尼', '克洛泽', '布冯'], answer: 0 },
    { question: '马特乌斯共在世界杯出场多少次？', options: ['23场', '25场', '27场', '29场'], answer: 1 },
    { question: '哪位守门员在世界杯保持了最长零封纪录？', options: ['曾加', '卡恩', '诺伊尔', '布冯'], answer: 0 },
    { question: '世界杯点球大战进球成功率最高的是哪个国家？', options: ['德国', '西班牙', '阿根廷', '巴西'], answer: 0 },
    { question: '哪届世界杯的总进球数最多？', options: ['1998法国', '2014巴西', '2022卡塔尔', '2002韩日'], answer: 1 },
    { question: '2026年世界杯新增了几支参赛球队，相比之前？', options: ['8支', '12支', '16支', '20支'], answer: 2 },
    { question: '2026世界杯决赛场地MetLife Stadium位于哪个城市？', options: ['洛杉矶', '纽约/新泽西', '旧金山', '达拉斯'], answer: 1 },
    { question: '著名的阿兹特克球场位于哪个城市？', options: ['坎昆', '墨西哥城', '瓜达拉哈拉', '蒙特雷'], answer: 1 },
    { question: '索菲亚体育场位于哪个国家？', options: ['加拿大', '美国', '墨西哥', '巴西'], answer: 0 },
    { question: '2026世界杯新增的世界杯举办国是？', options: ['美国', '加拿大', '墨西哥', '都是新增'], answer: 1 },
    { question: '迈阿密硬石体育场可容纳观众约为多少？', options: ['6万', '7万', '8万', '9万'], answer: 1 },
    { question: '洛杉矶SoFi体育场可容纳观众约为多少？', options: ['6万', '7万', '8万', '9万'], answer: 2 },
    { question: '2026世界杯是世界杯首次在多少个国家举办？', options: ['2个', '3个', '4个', '5个'], answer: 1 },
    { question: '哪个北美城市将举办2026世界杯的开幕式？', options: ['洛杉矶', '墨西哥城', '多伦多', '迈阿密'], answer: 1 },
    { question: '阿兹特克球场是第几次举办世界杯？', options: ['第1次', '第2次', '第3次', '第4次'], answer: 1 },
    { question: '2026世界杯的官方用球叫什么？', options: ['Al Rihla', 'Connecting', 'The One', 'Trieste'], answer: 1 },
    { question: '竞彩足球单注最高奖金是多少？', options: ['50万', '100万', '500万', '1000万'], answer: 1 },
    { question: '竞彩足球混合过关最多可选几场比赛？', options: ['4场', '6场', '8场', '10场'], answer: 2 },
    { question: '竞彩足球"胜平负"玩法的正确简称是？', options: ['胜平', 'SPF', 'SP', '胜负'], answer: 1 },
    { question: '2串1是指选择几场比赛进行串关？', options: ['1场', '2场', '3场', '4场'], answer: 1 },
    { question: '竞彩足球的竞猜范围是比赛多少分钟内的结果？', options: ['60分钟', '75分钟', '90分钟', '120分钟'], answer: 2 },
    { question: '比分玩法中，"胜其他"是指主队进球数为多少及以上？', options: ['4球', '5球', '6球', '7球'], answer: 2 },
    { question: '总进球数"7+"玩法表示总进球多少个及以上？', options: ['5个', '6个', '7个', '8个'], answer: 2 },
    { question: '半全场"负胜"是什么意思？', options: ['半场负全场胜', '半场负全场负', '半场负全场平', '半场胜全场负'], answer: 0 },
    { question: '竞彩足球每注金额是多少？', options: ['1元', '2元', '5元', '10元'], answer: 1 },
    { question: '串关中奖的条件是什么？', options: ['猜对1场即可', '必须全部猜对', '猜对半数以上', '无特殊要求'], answer: 1 },
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

// ---------- 竞彩赔率生成器 ----------
function generateOdds() {
    const r = (lo, hi) => (lo + Math.random() * (hi - lo)).toFixed(2);

    const spf = { win: r(1.5, 6.5), draw: r(2.5, 6.5), lose: r(2.0, 10.0) };

    const handicap = Math.random() > 0.5 ? '-2' : '-1';
    const rqspf = {
        handicap,
        win: r(2.2, 5.5),
        draw: r(3.0, 6.5),
        lose: r(1.8, 4.8)
    };

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

    const bqcOdds = {};
    const bqcMap = [
        { key: '胜胜', base: 2.8 }, { key: '胜平', base: 12 }, { key: '胜负', base: 25 },
        { key: '平胜', base: 4.0 }, { key: '平平', base: 4.5 }, { key: '平负', base: 4.2 },
        { key: '负胜', base: 22 }, { key: '负平', base: 13 }, { key: '负负', base: 3.0 }
    ];
    bqcMap.forEach(x => { bqcOdds[x.key] = r(x.base, x.base + 6); });

    const zjqOdds = {};
    [{key:'0',base:8},{key:'1',base:4},{key:'2',base:3.2},{key:'3',base:3.5},{key:'4',base:5},{key:'5',base:8},{key:'6',base:14},{key:'7+',base:18}]
        .forEach(x => { zjqOdds[x.key] = r(x.base, x.base + 5); });

    return { spf, rqspf, scoreOdds, bqcOdds, zjqOdds };
}

// ---------- 球员数据 ----------
const PLAYERS_DATA = {
    '阿根廷': [
        { name:'E.马丁内斯', enName:'Emiliano_Mart%C3%ADnez', num:23, pos:'门将', age:33, club:'阿斯顿维拉' },
        { name:'鲁利', enName:'Ger%C3%B3nimo_Rulli', num:12, pos:'门将', age:34, club:'马赛' },
        { name:'穆索', enName:'Juan_Musso', num:1, pos:'门将', age:32, club:'马德里竞技' },
        { name:'罗梅罗', enName:'Cristian_Romero', num:13, pos:'后卫', age:28, club:'热刺' },
        { name:'奥塔门迪', enName:'Nicol%C3%A1s_Otamendi', num:19, pos:'后卫', age:38, club:'本菲卡' },
        { name:'利桑德罗·马丁内斯', enName:'Lisandro_Mart%C3%ADnez', num:6, pos:'后卫', age:28, club:'曼联' },
        { name:'塔利亚菲科', enName:'Nicol%C3%A1s_Tagliafico', num:3, pos:'后卫', age:33, club:'里昂' },
        { name:'莫利纳', enName:'Nahuel_Molina', num:2, pos:'后卫', age:28, club:'马德里竞技' },
        { name:'蒙铁尔', enName:'Gonzalo_Montiel', num:4, pos:'后卫', age:29, club:'河床' },
        { name:'佩泽拉', enName:'Germ%C3%A1n_Pezzella', num:5, pos:'后卫', age:34, club:'河床' },
        { name:'恩佐·费尔南德斯', enName:'Enzo_Fern%C3%A1ndez', num:24, pos:'中场', age:25, club:'切尔西' },
        { name:'麦卡利斯特', enName:'Alexis_Mac_Allister', num:20, pos:'中场', age:27, club:'利物浦' },
        { name:'德保罗', enName:'Rodrigo_De_Paul', num:7, pos:'中场', age:32, club:'马德里竞技' },
        { name:'帕雷德斯', enName:'Leandro_Paredes', num:5, pos:'中场', age:31, club:'罗马' },
        { name:'洛塞尔索', enName:'Giovani_Lo_Celso', num:16, pos:'中场', age:30, club:'贝蒂斯' },
        { name:'阿尔马达', enName:'Thiago_Almada', num:17, pos:'中场', age:25, club:'博塔弗戈' },
        { name:'帕拉西奥斯', enName:'Exequiel_Palacios', num:14, pos:'中场', age:27, club:'勒沃库森' },
        { name:'埃切维里', enName:'Claudio_Echeverri', num:21, pos:'中场', age:20, club:'河床' },
        { name:'梅西', enName:'Lionel_Messi', num:10, pos:'前锋', age:38, club:'迈阿密国际' },
        { name:'劳塔罗·马丁内斯', enName:'Lautaro_Mart%C3%ADnez', num:22, pos:'前锋', age:28, club:'国际米兰' },
        { name:'阿尔瓦雷斯', enName:'Juli%C3%A1n_%C3%81lvarez', num:9, pos:'前锋', age:26, club:'马德里竞技' },
        { name:'迪马利亚', enName:'%C3%81ngel_Di_Mar%C3%ADa', num:11, pos:'前锋', age:38, club:'本菲卡' },
        { name:'冈萨雷斯', enName:'Nicol%C3%A1s_Gonz%C3%A1lez_(footballer,_born_1998)', num:15, pos:'前锋', age:28, club:'尤文图斯' },
    ],
    '巴西': [
        { name:'阿利松', enName:'Alisson_Becker', num:1, pos:'门将', age:33, club:'利物浦' },
        { name:'埃德森', enName:'Ederson_(footballer,_born_1993)', num:23, pos:'门将', age:32, club:'曼城' },
        { name:'本托', enName:'Bento_(footballer,_born_1999)', num:12, pos:'门将', age:26, club:'利雅得胜利' },
        { name:'马尔基尼奥斯', enName:'Marquinhos', num:4, pos:'后卫', age:32, club:'巴黎圣日耳曼' },
        { name:'米利唐', enName:'%C3%89der_Milit%C3%A3o', num:3, pos:'后卫', age:28, club:'皇家马德里' },
        { name:'加布里埃尔', enName:'Gabriel_Magalh%C3%A3es', num:14, pos:'后卫', age:28, club:'阿森纳' },
        { name:'阿拉纳', enName:'Guilherme_Arana', num:6, pos:'后卫', age:29, club:'米内罗竞技' },
        { name:'达尼洛', enName:'Danilo_(footballer,_born_1991)', num:2, pos:'后卫', age:34, club:'尤文图斯' },
        { name:'万德松', enName:'Vanderson_(footballer,_born_2001)', num:13, pos:'后卫', age:25, club:'摩纳哥' },
        { name:'穆里略', enName:'Murillo_(footballer)', num:15, pos:'后卫', age:23, club:'诺丁汉森林' },
        { name:'帕奎塔', enName:'Lucas_Paquet%C3%A1', num:8, pos:'中场', age:28, club:'西汉姆联' },
        { name:'吉马良斯', enName:'Bruno_Guimar%C3%A3es', num:5, pos:'中场', age:28, club:'纽卡斯尔' },
        { name:'拉菲尼亚', enName:'Raphinha', num:10, pos:'中场', age:29, club:'巴塞罗那' },
        { name:'马丁内利', enName:'Gabriel_Martinelli', num:19, pos:'中场', age:25, club:'阿森纳' },
        { name:'若昂·戈麦斯', enName:'Jo%C3%A3o_Gomes_(footballer,_born_2001)', num:20, pos:'中场', age:25, club:'狼队' },
        { name:'安德烈', enName:'Andr%C3%A9_(footballer,_born_2001)', num:17, pos:'中场', age:25, club:'狼队' },
        { name:'热尔松', enName:'Gerson_(footballer,_born_1997)', num:18, pos:'中场', age:29, club:'弗拉门戈' },
        { name:'道格拉斯·路易斯', enName:'Douglas_Luiz', num:22, pos:'中场', age:28, club:'尤文图斯' },
        { name:'维尼修斯', enName:'Vin%C3%ADcius_J%C3%BAnior', num:7, pos:'前锋', age:25, club:'皇家马德里' },
        { name:'罗德里戈', enName:'Rodrygo', num:11, pos:'前锋', age:25, club:'皇家马德里' },
        { name:'恩德里克', enName:'Endrick_Felipe', num:9, pos:'前锋', age:19, club:'皇家马德里' },
        { name:'库尼亚', enName:'Matheus_Cunha', num:21, pos:'前锋', age:27, club:'狼队' },
        { name:'萨维奥', enName:'S%C3%A1vio', num:16, pos:'前锋', age:22, club:'曼城' },
    ],
    '法国': [
        { name:'迈尼昂', enName:'Mike_Maignan', num:16, pos:'门将', age:30, club:'AC米兰' },
        { name:'阿雷奥拉', enName:'Alphonse_Areola', num:1, pos:'门将', age:33, club:'西汉姆联' },
        { name:'桑巴', enName:'Brice_Samba', num:23, pos:'门将', age:32, club:'雷恩' },
        { name:'萨利巴', enName:'William_Saliba', num:17, pos:'后卫', age:25, club:'阿森纳' },
        { name:'特奥·埃尔南德斯', enName:'Theo_Hern%C3%A1ndez', num:22, pos:'后卫', age:28, club:'AC米兰' },
        { name:'科纳特', enName:'Ibrahima_Konat%C3%A9', num:5, pos:'后卫', age:27, club:'利物浦' },
        { name:'孔德', enName:'Jules_Kound%C3%A9', num:2, pos:'后卫', age:27, club:'巴塞罗那' },
        { name:'于帕梅卡诺', enName:'Dayot_Upamecano', num:4, pos:'后卫', age:27, club:'拜仁慕尼黑' },
        { name:'克洛斯', enName:'Jonathan_Clauss', num:3, pos:'后卫', age:33, club:'尼斯' },
        { name:'门迪', enName:'Ferland_Mendy', num:21, pos:'后卫', age:30, club:'皇家马德里' },
        { name:'楚阿梅尼', enName:'Aur%C3%A9lien_Tchouam%C3%A9ni', num:8, pos:'中场', age:26, club:'皇家马德里' },
        { name:'卡马文加', enName:'Eduardo_Camavinga', num:6, pos:'中场', age:23, club:'皇家马德里' },
        { name:'拉比奥', enName:'Adrien_Rabiot', num:14, pos:'中场', age:31, club:'马赛' },
        { name:'埃梅里', enName:'Warren_Za%C3%AFre-Emery', num:18, pos:'中场', age:20, club:'巴黎圣日耳曼' },
        { name:'福法纳', enName:'Youssouf_Fof