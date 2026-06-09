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
// 固定正确分组（不随机打乱）
const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const TEAMS_DATA = [
    // ===== A组：墨西哥（东道主）、南非、韩国、捷克 =====
    { name: '墨西哥', flag: '🇲🇽', confederation: 'CONCACAF', rank: 20, group: 'A', host: true },
    { name: '南非', flag: '🇿🇦', confederation: 'CAF', rank: 57, group: 'A' },
    { name: '韩国', flag: '🇰🇷', confederation: 'AFC', rank: 22, group: 'A' },
    { name: '捷克', flag: '🇨🇿', confederation: 'UEFA', rank: 38, group: 'A' },
    // ===== B组：加拿大（东道主）、波黑、卡塔尔、瑞士 =====
    { name: '加拿大', flag: '🇨🇦', confederation: 'CONCACAF', rank: 31, group: 'B', host: true },
    { name: '波黑', flag: '🇧🇦', confederation: 'UEFA', rank: 47, group: 'B' },
    { name: '卡塔尔', flag: '🇶🇦', confederation: 'AFC', rank: 48, group: 'B' },
    { name: '瑞士', flag: '🇨🇭', confederation: 'UEFA', rank: 19, group: 'B' },
    // ===== C组：巴西、摩洛哥、海地、苏格兰 =====
    { name: '巴西', flag: '🇧🇷', confederation: 'CONMEBOL', rank: 5, group: 'C' },
    { name: '摩洛哥', flag: '🇲🇦', confederation: 'CAF', rank: 12, group: 'C' },
    { name: '海地', flag: '🇭🇹', confederation: 'CONCACAF', rank: 86, group: 'C' },
    { name: '苏格兰', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA', rank: 28, group: 'C' },
    // ===== D组：美国（东道主）、巴拉圭、澳大利亚、土耳其 =====
    { name: '美国', flag: '🇺🇸', confederation: 'CONCACAF', rank: 16, group: 'D', host: true },
    { name: '巴拉圭', flag: '🇵🇾', confederation: 'CONMEBOL', rank: 51, group: 'D' },
    { name: '澳大利亚', flag: '🇦🇺', confederation: 'AFC', rank: 24, group: 'D' },
    { name: '土耳其', flag: '🇹🇷', confederation: 'UEFA', rank: 40, group: 'D' },
    // ===== E组：德国、库拉索、科特迪瓦、厄瓜多尔 =====
    { name: '德国', flag: '🇩🇪', confederation: 'UEFA', rank: 10, group: 'E' },
    { name: '库拉索', flag: '🇨🇼', confederation: 'CONCACAF', rank: 82, group: 'E' },
    { name: '科特迪瓦', flag: '🇨🇮', confederation: 'CAF', rank: 41, group: 'E' },
    { name: '厄瓜多尔', flag: '🇪🇨', confederation: 'CONMEBOL', rank: 30, group: 'E' },
    // ===== F组：荷兰、日本、瑞典、突尼斯 =====
    { name: '荷兰', flag: '🇳🇱', confederation: 'UEFA', rank: 7, group: 'F' },
    { name: '日本', flag: '🇯🇵', confederation: 'AFC', rank: 15, group: 'F' },
    { name: '瑞典', flag: '🇸🇪', confederation: 'UEFA', rank: 27, group: 'F' },
    { name: '突尼斯', flag: '🇹🇳', confederation: 'CAF', rank: 41, group: 'F' },
    // ===== G组：比利时、埃及、伊朗、新西兰 =====
    { name: '比利时', flag: '🇧🇪', confederation: 'UEFA', rank: 8, group: 'G' },
    { name: '埃及', flag: '🇪🇬', confederation: 'CAF', rank: 33, group: 'G' },
    { name: '伊朗', flag: '🇮🇷', confederation: 'AFC', rank: 18, group: 'G' },
    { name: '新西兰', flag: '🇳🇿', confederation: 'OFC', rank: 89, group: 'G' },
    // ===== H组：西班牙、佛得角、沙特阿拉伯、乌拉圭 =====
    { name: '西班牙', flag: '🇪🇸', confederation: 'UEFA', rank: 3, group: 'H' },
    { name: '佛得角', flag: '🇨🇻', confederation: 'CAF', rank: 68, group: 'H' },
    { name: '沙特阿拉伯', flag: '🇸🇦', confederation: 'AFC', rank: 53, group: 'H' },
    { name: '乌拉圭', flag: '🇺🇾', confederation: 'CONMEBOL', rank: 11, group: 'H' },
    // ===== I组：法国、塞内加尔、伊拉克、挪威 =====
    { name: '法国', flag: '🇫🇷', confederation: 'UEFA', rank: 2, group: 'I' },
    { name: '塞内加尔', flag: '🇸🇳', confederation: 'CAF', rank: 17, group: 'I' },
    { name: '伊拉克', flag: '🇮🇶', confederation: 'AFC', rank: 56, group: 'I' },
    { name: '挪威', flag: '🇳🇴', confederation: 'UEFA', rank: 43, group: 'I' },
    // ===== J组：阿根廷（卫冕冠军）、阿尔及利亚、奥地利、约旦 =====
    { name: '阿根廷', flag: '🇦🇷', confederation: 'CONMEBOL', rank: 1, group: 'J', champion: true },
    { name: '阿尔及利亚', flag: '🇩🇿', confederation: 'CAF', rank: 37, group: 'J' },
    { name: '奥地利', flag: '🇦🇹', confederation: 'UEFA', rank: 23, group: 'J' },
    { name: '约旦', flag: '🇯🇴', confederation: 'AFC', rank: 64, group: 'J' },
    // ===== K组：葡萄牙、民主刚果、乌兹别克斯坦、哥伦比亚 =====
    { name: '葡萄牙', flag: '🇵🇹', confederation: 'UEFA', rank: 6, group: 'K' },
    { name: '民主刚果', flag: '🇨🇩', confederation: 'CAF', rank: 61, group: 'K' },
    { name: '乌兹别克斯坦', flag: '🇺🇿', confederation: 'AFC', rank: 58, group: 'K' },
    { name: '哥伦比亚', flag: '🇨🇴', confederation: 'CONMEBOL', rank: 14, group: 'K' },
    // ===== L组：英格兰、克罗地亚、加纳、巴拿马 =====
    { name: '英格兰', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA', rank: 4, group: 'L' },
    { name: '克罗地亚', flag: '🇭🇷', confederation: 'UEFA', rank: 13, group: 'L' },
    { name: '加纳', flag: '🇬🇭', confederation: 'CAF', rank: 65, group: 'L' },
    { name: '巴拿马', flag: '🇵🇦', confederation: 'CONCACAF', rank: 35, group: 'L' },
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

// TODO: 比赛开赛后，将通过官方API更新状态和比分

// ---------- 问答 ----------
const QUIZ_DATA = [
    // 2026世界杯基本信息
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

    // 2022世界杯回顾
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

    // 历史冠军记录
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

    // 世界杯历史知识
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

    // 足球规则知识
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

    // 著名球员
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

    // 世界杯记录
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

    // 举办城市和场馆
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

    // 竞彩足球知识
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
        { name:'梅西', enName:'Lionel_Messi', num:10, pos:'前锋', age:38, club:'迈阿密国际' },
        { name:'劳塔罗·马丁内斯', enName:'Lautaro_Mart%C3%ADnez', num:22, pos:'前锋', age:28, club:'国际米兰' },
        { name:'阿尔瓦雷斯', enName:'Juli%C3%A1n_%C3%81lvarez', num:9, pos:'前锋', age:26, club:'马德里竞技' },
        { name:'恩佐·费尔南德斯', enName:'Enzo_Fern%C3%A1ndez', num:24, pos:'中场', age:25, club:'切尔西' },
        { name:'麦卡利斯特', enName:'Alexis_Mac_Allister', num:20, pos:'中场', age:27, club:'利物浦' },
        { name:'罗梅罗', enName:'Cristian_Romero', num:13, pos:'后卫', age:28, club:'热刺' },
        { name:'E.马丁内斯', enName:'Emiliano_Mart%C3%ADnez', num:23, pos:'门将', age:33, club:'阿斯顿维拉' },
    ],
    '巴西': [
        { name:'维尼修斯', enName:'Vin%C3%ADcius_J%C3%BAnior', num:7, pos:'前锋', age:25, club:'皇家马德里' },
        { name:'罗德里戈', enName:'Rodrygo', num:11, pos:'前锋', age:25, club:'皇家马德里' },
        { name:'恩德里克', enName:'Endrick_Felipe', num:9, pos:'前锋', age:19, club:'皇家马德里' },
        { name:'帕奎塔', enName:'Lucas_Paquet%C3%A1', num:8, pos:'中场', age:28, club:'西汉姆联' },
        { name:'吉马良斯', enName:'Bruno_Guimar%C3%A3es', num:5, pos:'中场', age:28, club:'纽卡斯尔' },
        { name:'马尔基尼奥斯', enName:'Marquinhos', num:4, pos:'后卫', age:32, club:'巴黎圣日耳曼' },
        { name:'阿利松', enName:'Alisson_Becker', num:1, pos:'门将', age:33, club:'利物浦' },
    ],
    '法国': [
        { name:'姆巴佩', enName:'Kylian_Mbapp%C3%A9', num:10, pos:'前锋', age:27, club:'皇家马德里' },
        { name:'登贝莱', enName:'Ousmane_Demb%C3%A9l%C3%A9', num:11, pos:'前锋', age:29, club:'巴黎圣日耳曼' },
        { name:'格列兹曼', enName:'Antoine_Griezmann', num:7, pos:'前锋', age:35, club:'马德里竞技' },
        { name:'楚阿梅尼', enName:'Aur%C3%A9lien_Tchouam%C3%A9ni', num:8, pos:'中场', age:26, club:'皇家马德里' },
        { name:'卡马文加', enName:'Eduardo_Camavinga', num:6, pos:'中场', age:23, club:'皇家马德里' },
        { name:'萨利巴', enName:'William_Saliba', num:17, pos:'后卫', age:25, club:'阿森纳' },
        { name:'迈尼昂', enName:'Mike_Maignan', num:16, pos:'门将', age:30, club:'AC米兰' },
    ],
    '英格兰': [
        { name:'凯恩', enName:'Harry_Kane', num:9, pos:'前锋', age:32, club:'拜仁慕尼黑' },
        { name:'贝林厄姆', enName:'Jude_Bellingham', num:10, pos:'中场', age:23, club:'皇家马德里' },
        { name:'萨卡', enName:'Bukayo_Saka', num:7, pos:'前锋', age:24, club:'阿森纳' },
        { name:'福登', enName:'Phil_Foden', num:11, pos:'前锋', age:26, club:'曼城' },
        { name:'赖斯', enName:'Declan_Rice', num:4, pos:'中场', age:27, club:'阿森纳' },
        { name:'斯通斯', enName:'John_Stones', num:5, pos:'后卫', age:32, club:'曼城' },
        { name:'皮克福德', enName:'Jordan_Pickford', num:1, pos:'门将', age:32, club:'埃弗顿' },
    ],
    '西班牙': [
        { name:'亚马尔', enName:'Lamine_Yamal', num:19, pos:'前锋', age:18, club:'巴塞罗那' },
        { name:'佩德里', enName:'Pedri', num:8, pos:'中场', age:23, club:'巴塞罗那' },
        { name:'奥尔莫', enName:'Dani_Olmo', num:10, pos:'中场', age:28, club:'巴塞罗那' },
        { name:'罗德里', enName:'Rodri_(footballer,_born_1996)', num:16, pos:'中场', age:29, club:'曼城' },
        { name:'尼科·威廉姆斯', enName:'Nico_Williams', num:17, pos:'前锋', age:23, club:'毕尔巴鄂' },
        { name:'库库雷利亚', enName:'Marc_Cucurella', num:3, pos:'后卫', age:27, club:'切尔西' },
        { name:'乌奈·西蒙', enName:'Unai_Sim%C3%B3n', num:23, pos:'门将', age:28, club:'毕尔巴鄂' },
    ],
    '德国': [
        { name:'穆西亚拉', enName:'Jamal_Musiala', num:10, pos:'中场', age:23, club:'拜仁慕尼黑' },
        { name:'维尔茨', enName:'Florian_Wirtz', num:17, pos:'中场', age:23, club:'勒沃库森' },
        { name:'哈弗茨', enName:'Kai_Havertz', num:7, pos:'前锋', age:27, club:'阿森纳' },
        { name:'基米希', enName:'Joshua_Kimmich', num:6, pos:'中场', age:31, club:'拜仁慕尼黑' },
        { name:'吕迪格', enName:'Antonio_R%C3%BCdiger', num:2, pos:'后卫', age:33, club:'皇家马德里' },
        { name:'施洛特贝克', enName:'Nico_Schlotterbeck', num:4, pos:'后卫', age:26, club:'多特蒙德' },
        { name:'特尔施特根', enName:'Marc-Andr%C3%A9_ter_Stegen', num:1, pos:'门将', age:34, club:'巴塞罗那' },
    ],
    '葡萄牙': [
        { name:'C罗', enName:'Cristiano_Ronaldo', num:7, pos:'前锋', age:41, club:'利雅得胜利' },
        { name:'B费', enName:'Bruno_Fernandes', num:8, pos:'中场', age:31, club:'曼联' },
        { name:'B席', enName:'Bernardo_Silva', num:10, pos:'中场', age:31, club:'曼城' },
        { name:'莱奥', enName:'Rafael_Le%C3%A3o', num:17, pos:'前锋', age:27, club:'AC米兰' },
        { name:'维蒂尼亚', enName:'Vitinha_(footballer,_born_2000)', num:23, pos:'中场', age:26, club:'巴黎圣日耳曼' },
        { name:'鲁本·迪亚斯', enName:'R%C3%BAben_Dias', num:3, pos:'后卫', age:29, club:'曼城' },
        { name:'迪奥戈·科斯塔', enName:'Diogo_Costa', num:22, pos:'门将', age:26, club:'波尔图' },
    ],
    '南非': [
        { name:'珀西·陶', enName:'Percy_Tau', num:10, pos:'前锋', age:31, club:'开罗国民' },
        { name:'福斯特', enName:'Lyle_Foster', num:9, pos:'前锋', age:25, club:'伯恩利' },
        { name:'莫科纳', enName:'Teboho_Mokoena_(soccer,_born_1997)', num:8, pos:'中场', age:28, club:'马梅洛迪日落' },
        { name:'齐瓦内', enName:'Sphephelo_Sithole', num:6, pos:'中场', age:26, club:'通德拉' },
        { name:'姆瓦拉', enName:'Mothobi_Mvala', num:14, pos:'后卫', age:31, club:'马梅洛迪日落' },
        { name:'穆道', enName:'Khuliso_Mudau', num:2, pos:'后卫', age:30, club:'马梅洛迪日落' },
        { name:'威廉姆斯', enName:'Ronwen_Williams', num:1, pos:'门将', age:34, club:'马梅洛迪日落' },
    ],
    '荷兰': [
        { name:'加克波', enName:'Cody_Gakpo', num:8, pos:'前锋', age:27, club:'利物浦' },
        { name:'德佩', enName:'Memphis_Depay', num:10, pos:'前锋', age:32, club:'科林蒂安' },
        { name:'德容', enName:'Frenkie_de_Jong', num:21, pos:'中场', age:29, club:'巴塞罗那' },
        { name:'赖因德斯', enName:'Tijjani_Reijnders', num:14, pos:'中场', age:27, club:'AC米兰' },
        { name:'范迪克', enName:'Virgil_van_Dijk', num:4, pos:'后卫', age:34, club:'利物浦' },
        { name:'阿克', enName:'Nathan_Ak%C3%A9', num:5, pos:'后卫', age:31, club:'曼城' },
        { name:'弗莱肯', enName:'Mark_Flekken', num:1, pos:'门将', age:32, club:'布伦特福德' },
    ],
    '比利时': [
        { name:'卢卡库', enName:'Romelu_Lukaku', num:9, pos:'前锋', age:33, club:'那不勒斯' },
        { name:'多库', enName:'J%C3%A9r%C3%A9my_Doku', num:11, pos:'前锋', age:24, club:'曼城' },
        { name:'德布劳内', enName:'Kevin_De_Bruyne', num:7, pos:'中场', age:34, club:'曼城' },
        { name:'奥纳纳', enName:'Amadou_Onana', num:6, pos:'中场', age:24, club:'阿斯顿维拉' },
        { name:'蒂勒曼斯', enName:'Youri_Tielemans', num:8, pos:'中场', age:29, club:'阿斯顿维拉' },
        { name:'卡斯塔涅', enName:'Timothy_Castagne', num:21, pos:'后卫', age:30, club:'富勒姆' },
        { name:'库尔图瓦', enName:'Thibaut_Courtois', num:1, pos:'门将', age:34, club:'皇家马德里' },
    ],
    '克罗地亚': [
        { name:'克拉马里奇', enName:'Andrej_Kramari%C4%87', num:9, pos:'前锋', age:34, club:'霍芬海姆' },
        { name:'佩里西奇', enName:'Ivan_Peri%C5%A1i%C4%87', num:4, pos:'前锋', age:37, club:'埃因霍温' },
        { name:'莫德里奇', enName:'Luka_Modri%C4%87', num:10, pos:'中场', age:40, club:'皇家马德里' },
        { name:'科瓦契奇', enName:'Mateo_Kova%C4%8Di%C4%87', num:8, pos:'中场', age:32, club:'曼城' },
        { name:'布罗佐维奇', enName:'Marcelo_Brozovi%C4%87', num:11, pos:'中场', age:33, club:'利雅得胜利' },
        { name:'格瓦迪奥尔', enName:'Jo%C5%A1ko_Gvardiol', num:20, pos:'后卫', age:24, club:'曼城' },
        { name:'利瓦科维奇', enName:'Dominik_Livakovi%C4%87', num:1, pos:'门将', age:31, club:'费内巴切' },
    ],
    '乌拉圭': [
        { name:'努涅斯', enName:'Darwin_N%C3%BA%C3%B1ez', num:11, pos:'前锋', age:27, club:'利物浦' },
        { name:'佩利斯特里', enName:'Facundo_Pellistri', num:8, pos:'前锋', age:24, club:'帕纳辛奈科斯' },
        { name:'巴尔韦德', enName:'Federico_Valverde', num:15, pos:'中场', age:27, club:'皇家马德里' },
        { name:'乌加特', enName:'Manuel_Ugarte', num:5, pos:'中场', age:25, club:'曼联' },
        { name:'本坦库尔', enName:'Rodrigo_Bentancur', num:6, pos:'中场', age:28, club:'热刺' },
        { name:'阿劳霍', enName:'Ronald_Ara%C3%BAjo', num:4, pos:'后卫', age:27, club:'巴塞罗那' },
        { name:'罗切特', enName:'Sergio_Rochet', num:1, pos:'门将', age:33, club:'巴西国际' },
    ],
    '哥伦比亚': [
        { name:'路易斯·迪亚斯', enName:'Luis_D%C3%ADaz_(Colombian_footballer)', num:7, pos:'前锋', age:29, club:'利物浦' },
        { name:'杜兰', enName:'Jhon_Dur%C3%A1n', num:9, pos:'前锋', age:22, club:'利雅得胜利' },
        { name:'J罗', enName:'James_Rodr%C3%ADguez', num:10, pos:'中场', age:34, club:'莱昂' },
        { name:'莱尔马', enName:'Jefferson_Lerma', num:16, pos:'中场', age:31, club:'水晶宫' },
        { name:'穆尼奥斯', enName:'Daniel_Mu%C3%B1oz_(footballer)', num:21, pos:'后卫', age:28, club:'水晶宫' },
        { name:'桑切斯', enName:'Davinson_S%C3%A1nchez', num:23, pos:'后卫', age:29, club:'加拉塔萨雷' },
        { name:'巴尔加斯', enName:'Juan_Pablo_Vargas', num:12, pos:'门将', age:30, club:'百万富翁' },
    ],
    '摩洛哥': [
        { name:'恩内斯里', enName:'Youssef_En-Nesyri', num:19, pos:'前锋', age:29, club:'费内巴切' },
        { name:'齐耶赫', enName:'Hakim_Ziyech', num:7, pos:'前锋', age:33, club:'加拉塔萨雷' },
        { name:'阿什拉夫', enName:'Achraf_Hakimi', num:2, pos:'后卫', age:27, club:'巴黎圣日耳曼' },
        { name:'阿姆拉巴特', enName:'Sofyan_Amrabat', num:4, pos:'中场', age:29, club:'费内巴切' },
        { name:'迪亚斯', enName:'Ismael_D%C3%ADaz_(footballer,_born_1997)', num:10, pos:'中场', age:27, club:'皇家马德里' },
        { name:'阿格尔德', enName:'Nayef_Aguerd', num:5, pos:'后卫', age:30, club:'皇家社会' },
        { name:'布努', enName:'Yassine_Bounou', num:1, pos:'门将', age:35, club:'利雅得新月' },
    ],
    '塞内加尔': [
        { name:'马内', enName:'Sadio_Man%C3%A9', num:10, pos:'前锋', age:34, club:'利雅得胜利' },
        { name:'杰克逊', enName:'Nicolas_Jackson', num:9, pos:'前锋', age:24, club:'切尔西' },
        { name:'伊斯梅拉·萨尔', enName:'Isma%C3%AFla_Sarr', num:18, pos:'前锋', age:28, club:'马赛' },
        { name:'库利巴利', enName:'Kiki_Kouyat%C3%A9', num:3, pos:'后卫', age:34, club:'利雅得新月' },
        { name:'门迪', enName:'%C3%89douard_Mendy', num:16, pos:'门将', age:34, club:'吉达国民' },
        { name:'迪亚塔', enName:'Kr%C3%A9pin_Diatta', num:15, pos:'中场', age:27, club:'摩纳哥' },
        { name:'尼亚凯特', enName:'Moussa_Niakhat%C3%A9', num:4, pos:'后卫', age:30, club:'里昂' },
    ],
    '日本': [
        { name:'三笘薰', enName:'Kaoru_Mitoma', num:7, pos:'前锋', age:29, club:'布莱顿' },
        { name:'久保建英', enName:'Takefusa_Kubo', num:11, pos:'中场', age:25, club:'皇家社会' },
        { name:'南野拓实', enName:'Takumi_Minamino', num:10, pos:'前锋', age:31, club:'摩纳哥' },
        { name:'远藤航', enName:'Wataru_End%C5%8D', num:6, pos:'中场', age:32, club:'利物浦' },
        { name:'富安健洋', enName:'Takehiro_Tomiyasu', num:22, pos:'后卫', age:27, club:'阿森纳' },
        { name:'板仓滉', enName:'Ko_Itakura', num:4, pos:'后卫', age:29, club:'门兴' },
        { name:'铃木彩艳', enName:'Zion_Suzuki', num:23, pos:'门将', age:23, club:'帕尔马' },
    ],
    '韩国': [
        { name:'孙兴慜', enName:'Son_Heung-min', num:7, pos:'前锋', age:33, club:'热刺' },
        { name:'黄喜灿', enName:'Hwang_Hee-chan', num:11, pos:'前锋', age:30, club:'狼队' },
        { name:'李刚仁', enName:'Lee_Kang-in', num:18, pos:'中场', age:25, club:'巴黎圣日耳曼' },
        { name:'黄仁范', enName:'Hwang_In-beom', num:6, pos:'中场', age:29, club:'费耶诺德' },
        { name:'金玟哉', enName:'Kim_Min-jae', num:4, pos:'后卫', age:29, club:'拜仁慕尼黑' },
        { name:'薛英佑', enName:'Seol_Young-woo', num:3, pos:'后卫', age:27, club:'贝尔格莱德红星' },
        { name:'赵贤祐', enName:'Jo_Hyeon-woo', num:1, pos:'门将', age:34, club:'蔚山HD' },
    ],
    '伊朗': [
        { name:'塔雷米', enName:'Mehdi_Taremi', num:9, pos:'前锋', age:33, club:'国际米兰' },
        { name:'阿兹蒙', enName:'Sardar_Azmoun', num:20, pos:'前锋', age:31, club:'迪拜青年国民' },
        { name:'贾汉巴赫什', enName:'Alireza_Jahanbakhsh', num:7, pos:'中场', age:32, club:'海伦芬' },
        { name:'戈利扎德', enName:'Ali_Gholizadeh', num:17, pos:'中场', age:30, club:'莱切' },
        { name:'侯赛尼', enName:'Hossein_Hosseini_(footballer,_born_1992)', num:5, pos:'后卫', age:29, club:'埃斯特格拉尔' },
        { name:'贝兰万德', enName:'Alireza_Beiranvand', num:1, pos:'门将', age:33, club:'波斯波利斯' },
        { name:'哈里扎德', enName:'Morteza_Pouraliganji', num:4, pos:'后卫', age:35, club:'大不里士拖拉机' },
    ],
    '美国': [
        { name:'普利西奇', enName:'Christian_Pulisic', num:10, pos:'前锋', age:27, club:'AC米兰' },
        { name:'巴洛贡', enName:'Folarin_Balogun', num:9, pos:'前锋', age:24, club:'摩纳哥' },
        { name:'麦肯尼', enName:'Weston_McKennie', num:8, pos:'中场', age:27, club:'尤文图斯' },
        { name:'雷纳', enName:'Giovanni_Reyna', num:7, pos:'中场', age:23, club:'多特蒙德' },
        { name:'亚当斯', enName:'Tyler_Adams', num:4, pos:'中场', age:27, club:'伯恩茅斯' },
        { name:'罗宾逊', enName:'Antonee_Robinson', num:5, pos:'后卫', age:28, club:'富勒姆' },
        { name:'特纳', enName:'Matt_Turner_(soccer)', num:1, pos:'门将', age:32, club:'水晶宫' },
    ],
    '墨西哥': [
        { name:'希门尼斯', enName:'Ra%C3%BAl_Jim%C3%A9nez', num:9, pos:'前锋', age:35, club:'富勒姆' },
        { name:'洛萨诺', enName:'Hirving_Lozano', num:11, pos:'前锋', age:30, club:'埃因霍温' },
        { name:'皮内达', enName:'Orbel%C3%ADn_Pineda', num:17, pos:'中场', age:30, club:'雅典AEK' },
        { name:'埃德松', enName:'Edson_%C3%81lvarez', num:4, pos:'中场', age:27, club:'美洲狮' },
        { name:'蒙特斯', enName:'C%C3%A9sar_Montes', num:3, pos:'后卫', age:29, club:'阿尔梅里亚' },
        { name:'巴斯克斯', enName:'Johan_V%C3%A1squez', num:19, pos:'后卫', age:27, club:'热那亚' },
        { name:'奥乔亚', enName:'Guillermo_Ochoa', num:13, pos:'门将', age:40, club:'阿维卡' },
    ],
    '加拿大': [
        { name:'戴维', enName:'Jonathan_David', num:9, pos:'前锋', age:26, club:'里尔' },
        { name:'拉林', enName:'Cyle_Larin', num:17, pos:'前锋', age:31, club:'马洛卡' },
        { name:'阿方索·戴维斯', enName:'Alphonso_Davies', num:19, pos:'后卫', age:25, club:'拜仁慕尼黑' },
        { name:'布坎南', enName:'Tajon_Buchanan', num:7, pos:'中场', age:27, club:'国际米兰' },
        { name:'尤斯塔基奥', enName:'Stephen_Eust%C3%A1quio', num:21, pos:'中场', age:29, club:'波尔图' },
        { name:'康奈尔', enName:'Alistair_Johnston', num:14, pos:'后卫', age:30, club:'欧本' },
        { name:'圣克莱尔', enName:'Dayne_St._Clair', num:1, pos:'门将', age:29, club:'明尼苏达联' },
    ],
    '捷克': [
        { name:'希克', enName:'Patrik_Schick', num:10, pos:'前锋', age:30, club:'勒沃库森' },
        { name:'赫洛泽克', enName:'Adam_Hlo%C5%BEek', num:9, pos:'前锋', age:23, club:'霍芬海姆' },
        { name:'绍切克', enName:'Tom%C3%A1%C5%A1_Sou%C4%8Dek', num:22, pos:'中场', age:31, club:'西汉姆联' },
        { name:'巴拉克', enName:'Anton%C3%ADn_Bar%C3%A1k', num:7, pos:'中场', age:31, club:'佛罗伦萨' },
        { name:'克雷伊奇', enName:'Ladislav_Krej%C4%8D%C3%AD_(footballer,_born_1999)', num:6, pos:'后卫', age:27, club:'布拉格斯巴达' },
        { name:'齐马', enName:'David_Zima', num:4, pos:'后卫', age:25, club:'都灵' },
        { name:'科瓦尔', enName:'Mat%C4%9Bj_Kov%C3%A1%C5%99', num:1, pos:'门将', age:26, club:'勒沃库森' },
    ],
    '瑞士': [
        { name:'恩博洛', enName:'Breel_Embolo', num:9, pos:'前锋', age:29, club:'摩纳哥' },
        { name:'阿姆杜尼', enName:'Zeki_Amdouni', num:19, pos:'前锋', age:25, club:'本菲卡' },
        { name:'扎卡', enName:'Granit_Xhaka', num:10, pos:'中场', age:33, club:'勒沃库森' },
        { name:'弗洛伊勒', enName:'Remo_Freuler', num:8, pos:'中场', age:34, club:'博洛尼亚' },
        { name:'阿坎吉', enName:'Manuel_Akanji', num:5, pos:'后卫', age:30, club:'曼城' },
        { name:'R.罗德里格斯', enName:'Ricardo_Rodr%C3%ADguez_(footballer)', num:13, pos:'后卫', age:33, club:'贝蒂斯' },
        { name:'索默', enName:'Yann_Sommer', num:1, pos:'门将', age:37, club:'国际米兰' },
    ],
    '奥地利': [
        { name:'阿瑙托维奇', enName:'Marko_Arnautovi%C4%87', num:7, pos:'前锋', age:36, club:'国际米兰' },
        { name:'格雷戈里奇', enName:'Michael_Gregoritsch', num:11, pos:'前锋', age:32, club:'弗赖堡' },
        { name:'萨比策', enName:'Marcel_Sabitzer', num:9, pos:'中场', age:32, club:'多特蒙德' },
        { name:'鲍姆加特纳', enName:'Christoph_Baumgartner', num:19, pos:'中场', age:26, club:'RB莱比锡' },
        { name:'莱默尔', enName:'Konrad_Laimer', num:20, pos:'中场', age:29, club:'拜仁慕尼黑' },
        { name:'阿拉巴', enName:'David_Alaba', num:8, pos:'后卫', age:34, club:'皇家马德里' },
        { name:'彭茨', enName:'Patrick_Pentz', num:1, pos:'门将', age:29, club:'布隆德比' },
    ],
    '波黑': [
        { name:'哲科', enName:'Edin_D%C5%BEeko', num:11, pos:'前锋', age:40, club:'费内巴切' },
        { name:'德米罗维奇', enName:'Ermedin_Demirovi%C4%87', num:9, pos:'前锋', age:28, club:'斯图加特' },
        { name:'皮亚尼奇', enName:'Miralem_Pjani%C4%87', num:10, pos:'中场', age:36, club:'莫斯科中央陆军' },
        { name:'克鲁尼奇', enName:'Rade_Kruni%C4%87', num:14, pos:'中场', age:31, club:'费内巴切' },
        { name:'科拉希纳茨', enName:'Sead_Kola%C5%A1inac', num:5, pos:'后卫', age:32, club:'亚特兰大' },
        { name:'艾哈迈多霍吉奇', enName:'Anel_Ahmedhod%C5%BEi%C4%87', num:3, pos:'后卫', age:27, club:'谢菲联' },
        { name:'谢希奇', enName:'Ibrahim_%C5%A0ehi%C4%87', num:12, pos:'门将', age:37, club:'哈伊杜克' },
    ],
    '瑞典': [
        { name:'伊萨克', enName:'Alexander_Isak', num:9, pos:'前锋', age:26, club:'纽卡斯尔' },
        { name:'哲凯赖什', enName:'Viktor_Gy%C3%B6keres', num:17, pos:'前锋', age:28, club:'葡萄牙体育' },
        { name:'库卢塞夫斯基', enName:'Dejan_Kulusevski', num:10, pos:'中场', age:26, club:'热刺' },
        { name:'福斯贝里', enName:'Emil_Forsberg', num:7, pos:'中场', age:34, club:'纽约红牛' },
        { name:'林德洛夫', enName:'Victor_Lindel%C3%B6f', num:3, pos:'后卫', age:31, club:'曼联' },
        { name:'希恩', enName:'Carl_Starfelt', num:14, pos:'后卫', age:27, club:'亚特兰大' },
        { name:'奥尔森', enName:'Robin_Olsen', num:1, pos:'门将', age:36, club:'阿斯顿维拉' },
    ],
    '海地': [
        { name:'皮埃罗', enName:'Frantzdy_Pierrot', num:9, pos:'前锋', age:31, club:'海法马卡比' },
        { name:'纳宗', enName:'Duckens_Nazon', num:10, pos:'前锋', age:32, club:'圣彼得堡泽尼特' },
        { name:'桑特-路易斯', enName:'Steeven_Saba', num:7, pos:'中场', age:28, club:'贝尔谢巴工人' },
        { name:'埃克森', enName:'Bryan_Alceus', num:6, pos:'中场', age:30, club:'波尔多' },
        { name:'克里斯蒂安', enName:'Ricardo_Ad%C3%A9', num:4, pos:'后卫', age:31, club:'皇家盐湖城' },
        { name:'阿克塞尔', enName:'Carlens_Arcus', num:2, pos:'后卫', age:29, club:'维迪' },
        { name:'普拉西德', enName:'Johny_Placide', num:1, pos:'门将', age:38, club:'巴斯蒂亚' },
    ],
    '苏格兰': [
        { name:'麦金', enName:'John_McGinn', num:7, pos:'中场', age:31, club:'阿斯顿维拉' },
        { name:'亚当斯', enName:'Ch%C3%A9_Adams', num:10, pos:'前锋', age:29, club:'都灵' },
        { name:'麦克托米奈', enName:'Scott_McTominay', num:4, pos:'中场', age:29, club:'那不勒斯' },
        { name:'吉尔摩', enName:'Billy_Gilmour', num:14, pos:'中场', age:25, club:'那不勒斯' },
        { name:'蒂尔尼', enName:'Kieran_Tierney', num:6, pos:'后卫', age:29, club:'阿森纳' },
        { name:'罗伯逊', enName:'Andrew_Robertson', num:3, pos:'后卫', age:32, club:'利物浦' },
        { name:'冈恩', enName:'Angus_Gunn', num:1, pos:'门将', age:30, club:'诺维奇' },
    ],
    '埃及': [
        { name:'萨拉赫', enName:'Mohamed_Salah', num:10, pos:'前锋', age:34, club:'利物浦' },
        { name:'马尔穆什', enName:'Omar_Marmoush', num:7, pos:'前锋', age:27, club:'曼城' },
        { name:'特雷泽盖', enName:'Tr%C3%A9z%C3%A9guet_(footballer)', num:22, pos:'前锋', age:31, club:'阿尔赖扬' },
        { name:'埃尔内尼', enName:'Mohamed_Elneny', num:17, pos:'中场', age:33, club:'阿森纳' },
        { name:'法蒂', enName:'Ramadan_Sobhi', num:19, pos:'中场', age:27, club:'金字塔' },
        { name:'赫加齐', enName:'Ahmed_Hegazi', num:6, pos:'后卫', age:35, club:'吉达联合' },
        { name:'埃尔舍纳维', enName:'Mohamed_El_Shenawy', num:1, pos:'门将', age:37, club:'开罗国民' },
    ],
    '巴拉圭': [
        { name:'阿尔米隆', enName:'Miguel_Almir%C3%B3n', num:10, pos:'中场', age:32, club:'纽卡斯尔' },
        { name:'恩西索', enName:'Julio_Enciso_(footballer,_born_2004)', num:19, pos:'前锋', age:22, club:'布莱顿' },
        { name:'索萨', enName:'Ram%C3%B3n_Sosa', num:7, pos:'前锋', age:26, club:'诺丁汉森林' },
        { name:'比利亚桑蒂', enName:'Math%C3%ADas_Villasanti', num:8, pos:'中场', age:28, club:'格雷米奥' },
        { name:'阿尔德雷特', enName:'Omar_Alderete', num:3, pos:'后卫', age:29, club:'赫塔费' },
        { name:'戈麦斯', enName:'Gustavo_G%C3%B3mez', num:15, pos:'后卫', age:33, club:'帕尔梅拉斯' },
        { name:'费尔南德斯', enName:'Roberto_Fern%C3%A1ndez_(Paraguayan_footballer)', num:1, pos:'门将', age:38, club:'博塔弗戈' },
    ],
    '科特迪瓦': [
        { name:'阿莱', enName:'S%C3%A9bastien_Haller', num:22, pos:'前锋', age:31, club:'多特蒙德' },
        { name:'佩佩', enName:'Nicolas_P%C3%A9p%C3%A9', num:19, pos:'前锋', age:31, club:'比利亚雷亚尔' },
        { name:'福法纳', enName:'Mamadou_Fofana_(footballer,_born_1998)', num:8, pos:'中场', age:29, club:'利雅得胜利' },
        { name:'凯西', enName:'Franck_Kessi%C3%A9', num:6, pos:'中场', age:29, club:'吉达国民' },
        { name:'迪奥曼德', enName:'Ousmane_Diomande', num:3, pos:'后卫', age:22, club:'葡萄牙体育' },
        { name:'博利', enName:'Willy_Boly', num:21, pos:'后卫', age:33, club:'诺丁汉森林' },
        { name:'福法纳', enName:'Mamadou_Fofana_(footballer,_born_1998)', num:1, pos:'门将', age:34, club:'昂热' },
    ],
    '土耳其': [
        { name:'恰尔汗奥卢', enName:'Hakan_%C3%87alhano%C4%9Flu', num:10, pos:'中场', age:32, club:'国际米兰' },
        { name:'伊尔马兹', enName:'Bar%C4%B1%C5%9F_Alper_Y%C4%B1lmaz', num:9, pos:'前锋', age:26, club:'加拉塔萨雷' },
        { name:'居莱尔', enName:'Arda_G%C3%BCler', num:11, pos:'中场', age:21, club:'皇家马德里' },
        { name:'克科库', enName:'Orkun_K%C3%B6k%C3%A7%C3%BC', num:17, pos:'中场', age:25, club:'本菲卡' },
        { name:'德米拉尔', enName:'Merih_Demiral', num:3, pos:'后卫', age:28, club:'吉达国民' },
        { name:'卡迪奥卢', enName:'Ferdi_Kad%C4%B1o%C4%9Flu', num:20, pos:'后卫', age:26, club:'布莱顿' },
        { name:'居诺克', enName:'Mert_G%C3%BCnok', num:1, pos:'门将', age:37, club:'贝西克塔斯' },
    ],
    '加纳': [
        { name:'乔丹·阿尤', enName:'Jordan_Ayew', num:9, pos:'前锋', age:34, club:'莱斯特城' },
        { name:'塞梅奥', enName:'Antoine_Semenyo', num:25, pos:'前锋', age:26, club:'伯恩茅斯' },
        { name:'库杜斯', enName:'Mohammed_Kudus', num:10, pos:'中场', age:25, club:'西汉姆联' },
        { name:'托马斯', enName:'Thomas_Partey', num:5, pos:'中场', age:33, club:'阿森纳' },
        { name:'萨利苏', enName:'Mohammed_Salisu', num:18, pos:'后卫', age:27, club:'摩纳哥' },
        { name:'吉库', enName:'Alexander_Djiku', num:4, pos:'后卫', age:31, club:'费内巴切' },
        { name:'阿蒂齐吉', enName:'Lawrence_Ati-Zigi', num:1, pos:'门将', age:29, club:'圣加仑' },
    ],
    '阿尔及利亚': [
        { name:'马赫雷斯', enName:'Riyad_Mahrez', num:7, pos:'前锋', age:35, club:'吉达国民' },
        { name:'古伊里', enName:'Amine_Gouiri', num:9, pos:'前锋', age:26, club:'雷恩' },
        { name:'本纳赛尔', enName:'Isma%C3%ABl_Bennacer', num:6, pos:'中场', age:28, club:'马赛' },
        { name:'奥亚尔', enName:'Houssem_Aouar', num:8, pos:'中场', age:28, club:'吉达联合' },
        { name:'本塞拜尼', enName:'Ramy_Bensebaini', num:21, pos:'后卫', age:31, club:'多特蒙德' },
        { name:'阿塔勒', enName:'Youcef_Atal', num:20, pos:'后卫', age:30, club:'阿尔萨德' },
        { name:'曼德雷亚', enName:'Anthony_Mandrea', num:23, pos:'门将', age:27, club:'卡昂' },
    ],
    '突尼斯': [
        { name:'姆萨克尼', enName:'Youssef_Msakni', num:7, pos:'前锋', age:35, club:'多哈阿拉伯人' },
        { name:'贾齐里', enName:'Seifeddine_Jaziri', num:19, pos:'前锋', age:32, club:'扎马莱克' },
        { name:'斯希里', enName:'Ellyes_Skhiri', num:17, pos:'中场', age:31, club:'法兰克福' },
        { name:'莱多尼', enName:'A%C3%AFssa_La%C3%AFdouni', num:14, pos:'中场', age:25, club:'费伦茨瓦罗斯' },
        { name:'塔尔比', enName:'Montassar_Talbi', num:4, pos:'后卫', age:28, club:'洛里昂' },
        { name:'布隆', enName:'Dylan_Bronn', num:3, pos:'后卫', age:31, club:'皇家贝蒂斯' },
        { name:'达门', enName:'Aymen_Dahmen', num:1, pos:'门将', age:26, club:'萨德' },
    ],
    '沙特阿拉伯': [
        { name:'谢赫里', enName:'Saleh_Al-Shehri', num:11, pos:'前锋', age:31, club:'利雅得新月' },
        { name:'阿尔多萨里', enName:'Salem_Al-Dawsari', num:10, pos:'中场', age:34, club:'利雅得新月' },
        { name:'阿尔比拉坎', enName:'Firas_Al-Buraikan', num:9, pos:'前锋', age:25, club:'吉达国民' },
        { name:'卡诺', enName:'Mohamed_Kanno', num:8, pos:'中场', age:31, club:'利雅得新月' },
        { name:'阿尔布莱希', enName:'Ali_Al-Bulaihi', num:5, pos:'后卫', age:34, club:'利雅得新月' },
        { name:'阿尔沙赫拉尼', enName:'Yasser_Al-Shahrani', num:6, pos:'后卫', age:34, club:'利雅得新月' },
        { name:'阿尔奥维斯', enName:'Mohammed_Al-Owais', num:21, pos:'门将', age:34, club:'利雅得新月' },
    ],
    '澳大利亚': [
        { name:'古德温', enName:'Craig_Goodwin', num:11, pos:'前锋', age:34, club:'麦加统一' },
        { name:'杜克', enName:'Mitchell_Duke', num:15, pos:'前锋', age:35, club:'町田泽维亚' },
        { name:'欧文', enName:'Jackson_Irvine', num:22, pos:'中场', age:33, club:'圣保利' },
        { name:'麦格里', enName:'Riley_McGree', num:14, pos:'中场', age:27, club:'米德尔斯堡' },
        { name:'苏塔', enName:'Harry_Souttar', num:19, pos:'后卫', age:27, club:'谢菲联' },
        { name:'伯吉斯', enName:'Cameron_Burgess', num:4, pos:'后卫', age:31, club:'伊普斯维奇' },
        { name:'瑞安', enName:'Mathew_Ryan', num:1, pos:'门将', age:34, club:'朗斯' },
    ],
    '卡塔尔': [
        { name:'阿菲夫', enName:'Akram_Afif', num:11, pos:'前锋', age:29, club:'萨德' },
        { name:'阿里', enName:'Ali_Jasim', num:19, pos:'前锋', age:29, club:'杜海勒' },
        { name:'海多斯', enName:'Hassan_Al-Haydos', num:10, pos:'中场', age:35, club:'萨德' },
        { name:'布迪亚夫', enName:'Karim_Boudiaf', num:6, pos:'中场', age:35, club:'杜海勒' },
        { name:'萨尔曼', enName:'Tarek_Salman', num:16, pos:'后卫', age:28, club:'萨德' },
        { name:'胡希', enName:'Boualem_Khoukhi', num:5, pos:'后卫', age:33, club:'萨德' },
        { name:'巴尔沙姆', enName:'Meshaal_Barsham', num:1, pos:'门将', age:28, club:'萨德' },
    ],
    '厄瓜多尔': [
        { name:'恩纳·瓦伦西亚', enName:'Enner_Valencia', num:13, pos:'前锋', age:36, club:'巴西国际' },
        { name:'凯塞多', enName:'Mois%C3%A9s_Caicedo', num:23, pos:'中场', age:24, club:'切尔西' },
        { name:'帕乔', enName:'Willian_Pacho', num:6, pos:'后卫', age:24, club:'巴黎圣日耳曼' },
        { name:'埃斯图皮南', enName:'Pervis_Estupi%C3%B1%C3%A1n', num:7, pos:'后卫', age:28, club:'布莱顿' },
        { name:'因卡皮耶', enName:'Piero_Hincapi%C3%A9', num:3, pos:'后卫', age:24, club:'勒沃库森' },
        { name:'普拉塔', enName:'Gonzalo_Plata', num:19, pos:'前锋', age:25, club:'弗拉门戈' },
        { name:'加林德斯', enName:'Hern%C3%A1n_Gal%C3%ADndez', num:1, pos:'门将', age:35, club:'瓦奇巴托' },
    ],
    '库拉索': [
        { name:'廷伯', enName:'Quinten_Timber', num:10, pos:'中场', age:25, club:'费耶诺德' },
        { name:'安东尼', enName:'Jearl_Margaritha', num:9, pos:'前锋', age:26, club:'罗达JC' },
        { name:'巴库纳', enName:'Leandro_Bacuna', num:8, pos:'中场', age:34, club:'格罗宁根' },
        { name:'戈雷', enName:'Kenji_Gorr%C3%A9', num:7, pos:'前锋', age:29, club:'兹沃勒' },
        { name:'马蒂纳', enName:'Cuco_Martina', num:4, pos:'后卫', age:35, club:'布雷达' },
        { name:'范埃伊马', enName:'Roshon_van_Eijma', num:3, pos:'后卫', age:28, club:'瓦尔韦克' },
        { name:'罗姆', enName:'Eloy_Room', num:1, pos:'门将', age:37, club:'维特斯' },
    ],
    '佛得角': [
        { name:'门德斯', enName:'Ryan_Mendes', num:10, pos:'前锋', age:36, club:'科贾埃利体育' },
        { name:'塔瓦雷斯', enName:'Jovane_Cabral', num:9, pos:'前锋', age:28, club:'葡萄牙体育' },
        { name:'罗沙', enName:'Patrick_Andrade', num:8, pos:'中场', age:33, club:'卡拉巴赫' },
        { name:'蒙特罗', enName:'Jamiro_Monteiro', num:14, pos:'中场', age:30, club:'圣何塞地震' },
        { name:'洛佩斯', enName:'Roberto_Lopes_(footballer,_born_1992)', num:4, pos:'后卫', age:34, club:'沙姆洛克流浪' },
        { name:'皮科', enName:'Steven_Fort%C3%A8s', num:5, pos:'后卫', age:34, club:'兰斯' },
        { name:'博尔赫斯', enName:'Vozinha', num:1, pos:'门将', age:39, club:'特伦钦' },
    ],
    '巴拿马': [
        { name:'迪亚斯', enName:'Ismael_D%C3%ADaz_(footballer,_born_1997)', num:10, pos:'前锋', age:27, club:'康塞普西翁大学' },
        { name:'法哈多', enName:'Jos%C3%A9_Fajardo', num:17, pos:'前锋', age:31, club:'天主教大学' },
        { name:'卡拉斯基利亚', enName:'Adalberto_Carrasquilla', num:20, pos:'中场', age:28, club:'休斯顿迪纳摩' },
        { name:'罗德里格斯', enName:'Jos%C3%A9_Luis_Rodr%C3%ADguez_(footballer,_born_1998)', num:8, pos:'中场', age:29, club:'华雷斯' },
        { name:'埃斯科瓦尔', enName:'Fidel_Escobar', num:4, pos:'后卫', age:31, club:'萨普里萨' },
        { name:'米勒', enName:'Roderick_Miller', num:3, pos:'后卫', age:28, club:'波特兰伐木者' },
        { name:'莫斯克拉', enName:'Orlando_Mosquera', num:22, pos:'门将', age:30, club:'阿尔法伊哈' },
    ],
    '挪威': [
        { name:'哈兰德', enName:'Erling_Haaland', num:9, pos:'前锋', age:25, club:'曼城' },
        { name:'厄德高', enName:'Martin_%C3%98degaard', num:10, pos:'中场', age:27, club:'阿森纳' },
        { name:'瑟洛特', enName:'Alexander_S%C3%B8rloth', num:19, pos:'前锋', age:30, club:'马德里竞技' },
        { name:'贝格', enName:'Sander_Berge', num:8, pos:'中场', age:28, club:'富勒姆' },
        { name:'厄斯蒂高', enName:'Leo_%C3%98stig%C3%A5rd', num:4, pos:'后卫', age:26, club:'雷恩' },
        { name:'阿耶尔', enName:'Kristoffer_Ajer', num:3, pos:'后卫', age:28, club:'布伦特福德' },
        { name:'尼兰', enName:'%C3%98rjan_Nyland', num:1, pos:'门将', age:35, club:'塞维利亚' },
    ],
    '伊拉克': [
        { name:'侯赛因', enName:'Aymen_Hussein', num:18, pos:'前锋', age:30, club:'胡齐斯坦钢铁' },
        { name:'伊克巴尔', enName:'Zidane_Iqbal', num:10, pos:'中场', age:23, club:'乌得勒支' },
        { name:'阿里', enName:'Ali_Jasim', num:7, pos:'前锋', age:26, club:'巴格达空军' },
        { name:'拉希德', enName:'Amjad_Attwan', num:8, pos:'中场', age:28, club:'巴格达警察' },
        { name:'纳德姆', enName:'Dhurgham_Ismail', num:4, pos:'后卫', age:28, club:'巴格达空军' },
        { name:'阿德南', enName:'Ali_Adnan_Kadhim', num:5, pos:'后卫', age:32, club:'梅斯' },
        { name:'哈桑', enName:'Majed_Hassan', num:12, pos:'门将', age:33, club:'巴格达警察' },
    ],
    '乌兹别克斯坦': [
        { name:'肖穆罗多夫', enName:'Eldor_Shomurodov', num:14, pos:'前锋', age:30, club:'罗马' },
        { name:'法祖拉耶夫', enName:'Khojimat_Erkinov', num:22, pos:'中场', age:22, club:'莫斯科中央陆军' },
        { name:'马沙里波夫', enName:'Jaloliddin_Masharipov', num:10, pos:'中场', age:32, club:'利雅得胜利' },
        { name:'舒库罗夫', enName:'Otabek_Shukurov', num:9, pos:'中场', age:29, club:'艾因' },
        { name:'阿里库洛夫', enName:'Khusniddin_Alikulov', num:23, pos:'后卫', age:27, club:'棉农' },
        { name:'尤尔达舍夫', enName:'Farrukh_Sayfiev', num:2, pos:'后卫', age:25, club:'下诺夫哥罗德' },
        { name:'尤苏波夫', enName:'Utkir_Yusupov', num:1, pos:'门将', age:29, club:'纳夫巴霍' },
    ],
    '新西兰': [
        { name:'伍德', enName:'Chris_Wood_(footballer,_born_1991)', num:9, pos:'前锋', age:34, club:'诺丁汉森林' },
        { name:'巴尔巴鲁塞斯', enName:'Kosta_Barbarouses', num:7, pos:'前锋', age:36, club:'惠灵顿凤凰' },
        { name:'辛格', enName:'Sarpreet_Singh', num:11, pos:'中场', age:27, club:'海法马卡比' },
        { name:'贝尔', enName:'Joe_Bell_(footballer)', num:8, pos:'中场', age:29, club:'维堡' },
        { name:'史密斯', enName:'Tommy_Smith_(footballer,_born_1990)', num:4, pos:'后卫', age:35, club:'明尼苏达联' },
        { name:'卡卡瑟', enName:'Liberato_Cacace', num:15, pos:'后卫', age:26, club:'恩波利' },
        { name:'赛尔', enName:'Oli_Sail', num:1, pos:'门将', age:26, club:'普利茅斯' },
    ],
    '民主刚果': [
        { name:'巴坎布', enName:'C%C3%A9dric_Bakambu', num:9, pos:'前锋', age:35, club:'贝蒂斯' },
        { name:'维萨', enName:'Yoane_Wissa', num:17, pos:'前锋', age:28, club:'布伦特福德' },
        { name:'姆本巴', enName:'Chancel_Mbemba', num:22, pos:'中场', age:31, club:'马赛' },
        { name:'穆图萨米', enName:'Samuel_Moutoussamy', num:6, pos:'中场', age:29, club:'南特' },
        { name:'基库拉', enName:'Arthur_Masuaku', num:4, pos:'后卫', age:31, club:'贝西克塔斯' },
        { name:'因瓜', enName:'G%C3%A9d%C3%A9on_Kalulu', num:3, pos:'后卫', age:28, club:'洛里昂' },
        { name:'卡马拉', enName:'Brice_Samba', num:1, pos:'门将', age:37, club:'雷恩' },
    ],
    '约旦': [
        { name:'塔马里', enName:'Musa_Al-Taamari', num:10, pos:'前锋', age:29, club:'蒙彼利埃' },
        { name:'纳伊马特', enName:'Yazan_Al-Naimat', num:11, pos:'前锋', age:27, club:'多哈阿拉伯人' },
        { name:'拉瓦什德', enName:'Mahmoud_Al-Mardi', num:7, pos:'中场', age:32, club:'安曼团结' },
        { name:'萨姆雷赫', enName:'Ibrahim_Sadeh', num:8, pos:'中场', age:26, club:'科罗纳' },
        { name:'阿拉伯', enName:'Yazan_Al-Arab', num:5, pos:'后卫', age:30, club:'阿尔萨德' },
        { name:'巴尼·亚辛', enName:'Abdallah_Nasib', num:3, pos:'后卫', age:32, club:'阿尔侯赛因' },
        { name:'阿布·莱拉', enName:'Yazid_Abu_Laila', num:1, pos:'门将', age:33, club:'安曼团结' },
    ],
};

// ============== 积分榜计算 ==============
function getGroupStandings() {
    const standings = {};
    GROUPS.forEach(g => {
        standings[g] = {};
        if (!GROUPED_TEAMS[g]) return;
        GROUPED_TEAMS[g].forEach(t => {
            standings[g][t.name] = { team: t, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 };
        });
    });

    // 遍历已赛小组赛
    SCHEDULE_DATA.filter(m => m.stage === 'group' && m.status === 'played' && m.score).forEach(m => {
        const gm = m.id.match(/^G([A-L])-/);
        if (!gm) return;
        const group = gm[1];
        if (!standings[group]) return;

        const ht = standings[group][m.home];
        const at = standings[group][m.away];
        if (!ht || !at) return;

        const hg = m.score.home, ag = m.score.away;
        ht.P++; at.P++;
        ht.GF += hg; ht.GA += ag;
        at.GF += ag; at.GA += hg;
        if (hg > ag) { ht.W++; ht.Pts += 3; at.L++; }
        else if (hg < ag) { at.W++; at.Pts += 3; ht.L++; }
        else { ht.D++; ht.Pts++; at.D++; at.Pts++; }
    });

    // 计算净胜球并排序
    GROUPS.forEach(g => {
        if (!standings[g]) return;
        Object.values(standings[g]).forEach(t => { t.GD = t.GF - t.GA; });
        standings[g] = Object.values(standings[g]).sort((a, b) =>
            b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF
        );
    });

    return standings;
}

// ============== 球队历史对战记录 (H2H) ==============
const H2H_DATA = {
    '阿根廷': {
        '巴西': { record:'巴西 43胜 vs 阿根廷 41胜 · 26平', wcMatches:'4次世界杯交手：巴西2胜1平1负', last:'2025年南美世预赛 巴西0-1阿根廷', highlight:'1990世界杯1/8决赛 阿根廷1-0巴西' },
        '德国': { record:'德国 8胜 vs 阿根廷 5胜 · 5平', wcMatches:'7次世界杯交手：德国4胜2平1负', last:'2014世界杯决赛 德国1-0阿根廷', highlight:'1986/1990世界杯决赛连续交锋' },
        '法国': { record:'法国 6胜 vs 阿根廷 6胜 · 4平', wcMatches:'3次世界杯交手：阿根廷2胜0平1负', last:'2022世界杯决赛 阿根廷3(4)-(2)3法国', highlight:'2018世界杯1/8决赛 法国4-3阿根廷' },
        '英格兰': { record:'英格兰 14胜 vs 阿根廷 7胜 · 7平', wcMatches:'4次世界杯交手：各2胜', last:'2005友谊赛 英格兰3-2阿根廷', highlight:'1986世界杯1/4决赛 阿根廷2-1英格兰（上帝之手）' },
        '荷兰': { record:'荷兰 5胜 vs 阿根廷 4胜 · 5平', wcMatches:'4次世界杯交手：各1胜2平', last:'2022世界杯1/4决赛 阿根廷2(4)-(3)2荷兰', highlight:'1978世界杯决赛 阿根廷3-1荷兰' },
        '意大利': { record:'意大利 15胜 vs 阿根廷 8胜 · 13平', wcMatches:'3次世界杯交手：意大利2胜1平', last:'2018友谊赛 意大利1-1阿根廷', highlight:'1982世界杯 意大利2-1阿根廷' },
        '乌拉圭': { record:'阿根廷 89胜 vs 乌拉圭 55胜 · 49平', wcMatches:'2次世界杯交手：阿根廷1胜1负', last:'2025世预赛 阿根廷1-0乌拉圭', highlight:'1930世界杯决赛 乌拉圭4-2阿根廷' },
        '西班牙': { record:'西班牙 10胜 vs 阿根廷 6胜 · 3平', wcMatches:'1次世界杯交手：西班牙1-0阿根廷(1966)', last:'2022友谊赛 西班牙1-1阿根廷', highlight:'2010友谊赛 阿根廷4-1西班牙' },
    },
    '巴西': {
        '阿根廷': { record:'巴西 43胜 vs 阿根廷 41胜 · 26平', wcMatches:'4次世界杯交手：巴西2胜1平1负', last:'2025南美世预赛 巴西0-1阿根廷', highlight:'1990世界杯1/8决赛 阿根廷1-0巴西' },
        '德国': { record:'巴西 13胜 vs 德国 5胜 · 5平', wcMatches:'2次世界杯交手：各1胜', last:'2018友谊赛 巴西1-0德国', highlight:'2014世界杯半决赛 德国7-1巴西' },
        '法国': { record:'法国 10胜 vs 巴西 9胜 · 4平', wcMatches:'4次世界杯交手：法国2胜1平1负', last:'2015友谊赛 法国2-0巴西', highlight:'1998世界杯决赛 法国3-0巴西' },
        '意大利': { record:'巴西 15胜 vs 意大利 10胜 · 8平', wcMatches:'5次世界杯交手：巴西2胜1平2负', last:'2013联合会杯 巴西4-2意大利', highlight:'1970/1994世界杯决赛 巴西胜' },
        '英格兰': { record:'巴西 15胜 vs 英格兰 4胜 · 10平', wcMatches:'4次世界杯交手：巴西3胜1平', last:'2017友谊赛 巴西1-0英格兰', highlight:'2002世界杯1/4决赛 巴西2-1英格兰' },
        '荷兰': { record:'荷兰 5胜 vs 巴西 5胜 · 4平', wcMatches:'5次世界杯交手：荷兰3胜1平1负', last:'2010世界杯1/4决赛 荷兰2-1巴西', highlight:'1998世界杯半决赛 巴西1(4)-(2)1荷兰' },
        '乌拉圭': { record:'巴西 61胜 vs 乌拉圭 36胜 · 39平', wcMatches:'1次世界杯交手：巴西1-0(1970)', last:'2025世预赛 乌拉圭2-0巴西', highlight:'1950世界杯决赛 乌拉圭2-1巴西（马拉卡纳惨案）' },
        '葡萄牙': { record:'巴西 14胜 vs 葡萄牙 4胜 · 7平', wcMatches:'1次世界杯交手：葡萄牙2-1(1966)', last:'2019友谊赛 巴西3-1葡萄牙', highlight:'1966世界杯小组赛 葡萄牙3-1巴西' },
    },
    '法国': {
        '阿根廷': { record:'法国 6胜 vs 阿根廷 6胜 · 4平', wcMatches:'3次世界杯交手：阿根廷2胜0平1负', last:'2022世界杯决赛 阿根廷3(4)-(2)3法国', highlight:'2018世界杯1/8决赛 法国4-3阿根廷' },
        '巴西': { record:'法国 10胜 vs 巴西 9胜 · 4平', wcMatches:'4次世界杯交手：法国2胜1平1负', last:'2015友谊赛 法国2-0巴西', highlight:'1998世界杯决赛 法国3-0巴西' },
        '德国': { record:'德国 10胜 vs 法国 14胜 · 8平', wcMatches:'4次世界杯交手：德国3胜0平1负', last:'2024友谊赛 法国0-0德国', highlight:'2016欧洲杯半决赛 法国2-0德国' },
        '英格兰': { record:'英格兰 17胜 vs 法国 10胜 · 5平', wcMatches:'2次世界杯交手：各1胜', last:'2022世界杯1/4决赛 英格兰1-2法国', highlight:'1966世界杯小组赛 英格兰2-0法国' },
        '意大利': { record:'意大利 19胜 vs 法国 11胜 · 10平', wcMatches:'4次世界杯交手：意大利2胜1平1负', last:'2018友谊赛 法国3-1意大利', highlight:'2006世界杯决赛 意大利1(5)-(3)1法国' },
        '西班牙': { record:'西班牙 16胜 vs 法国 13胜 · 7平', wcMatches:'1次世界杯交手：西班牙2-1(2006)', last:'2024欧洲杯半决赛 法国2-1西班牙', highlight:'1984欧洲杯决赛 法国2-0西班牙' },
        '葡萄牙': { record:'法国 19胜 vs 葡萄牙 6胜 · 3平', wcMatches:'2次世界杯交手：法国2胜', last:'2024欧洲杯1/4决赛 法国0(5)-(3)0葡萄牙', highlight:'2016欧洲杯决赛 葡萄牙1-0法国' },
        '克罗地亚': { record:'法国 7胜 vs 克罗地亚 1胜 · 3平', wcMatches:'2次世界杯交手：法国全胜', last:'2022欧国联 法国0(4)-(5)0克罗地亚', highlight:'2018世界杯决赛 法国4-2克罗地亚' },
    },
    '英格兰': {
        '德国': { record:'德国 15胜 vs 英格兰 17胜 · 8平', wcMatches:'5次世界杯交手：德国3胜1平1负', last:'2022欧国联 英格兰3-3德国', highlight:'1966世界杯决赛 英格兰4-2德国' },
        '阿根廷': { record:'英格兰 14胜 vs 阿根廷 7胜 · 7平', wcMatches:'4次世界杯交手：各2胜', last:'2005友谊赛 英格兰3-2阿根廷', highlight:'1998世界杯1/8决赛 阿根廷2(4)-(3)2英格兰' },
        '法国': { record:'英格兰 17胜 vs 法国 10胜 · 5平', wcMatches:'2次世界杯交手：各1胜', last:'2022世界杯1/4决赛 英格兰1-2法国', highlight:'1982世界杯 英格兰3-1法国' },
        '意大利': { record:'意大利 11胜 vs 英格兰 9胜 · 9平', wcMatches:'2次世界杯交手：意大利全胜', last:'2023欧预赛 意大利2-1英格兰', highlight:'2020欧洲杯决赛 意大利1(3)-(2)1英格兰' },
        '西班牙': { record:'英格兰 14胜 vs 西班牙 10胜 · 3平', wcMatches:'2次世界杯交手：各1胜', last:'2018欧国联 英格兰3-2西班牙', highlight:'1996欧洲杯1/4决赛 英格兰0(4)-(2)0西班牙' },
        '荷兰': { record:'荷兰 9胜 vs 英格兰 7胜 · 10平', wcMatches:'世界杯无交手', last:'2024欧洲杯半决赛 英格兰2-1荷兰', highlight:'1996欧洲杯 英格兰4-1荷兰' },
        '葡萄牙': { record:'英格兰 12胜 vs 葡萄牙 9胜 · 8平', wcMatches:'2次世界杯交手：1胜1平', last:'2016友谊赛 英格兰2-1葡萄牙', highlight:'2006世界杯1/4决赛 葡萄牙0(3)-(1)0英格兰' },
    },
    '德国': {
        '巴西': { record:'巴西 13胜 vs 德国 5胜 · 5平', wcMatches:'2次世界杯交手：各1胜', last:'2018友谊赛 巴西1-0德国', highlight:'2002世界杯决赛 巴西2-0德国' },
        '阿根廷': { record:'德国 8胜 vs 阿根廷 5胜 · 5平', wcMatches:'7次世界杯交手：德国4胜2平1负', last:'2019友谊赛 德国1-2阿根廷', highlight:'2014世界杯决赛 德国1-0阿根廷' },
        '法国': { record:'德国 10胜 vs 法国 14胜 · 8平', wcMatches:'4次世界杯交手：德国3胜0平1负', last:'2024友谊赛 德国2-0法国', highlight:'2014世界杯1/4决赛 德国1-0法国' },
        '意大利': { record:'意大利 16胜 vs 德国 9胜 · 13平', wcMatches:'5次世界杯交手：意大利3胜2平', last:'2023友谊赛 意大利2-1德国', highlight:'2006世界杯半决赛 意大利2-0德国' },
        '英格兰': { record:'德国 15胜 vs 英格兰 17胜 · 8平', wcMatches:'5次世界杯交手：德国3胜1平1负', last:'2022欧国联 英格兰3-3德国', highlight:'2010世界杯1/8决赛 德国4-1英格兰' },
        '西班牙': { record:'西班牙 8胜 vs 德国 9胜 · 8平', wcMatches:'5次世界杯交手：德国2胜1平2负', last:'2024欧洲杯1/4决赛 西班牙2-1德国', highlight:'2010世界杯半决赛 西班牙1-0德国' },
        '荷兰': { record:'荷兰 12胜 vs 德国 16胜 · 17平', wcMatches:'1次世界杯交手：德国2-1(1974)', last:'2024友谊赛 德国2-1荷兰', highlight:'1974世界杯决赛 西德2-1荷兰' },
    },
    '意大利': {
        '巴西': { record:'巴西 15胜 vs 意大利 10胜 · 8平', wcMatches:'5次世界杯交手：巴西2胜1平2负', last:'2013联合会杯 巴西4-2意大利', highlight:'1982世界杯 意大利3-2巴西' },
        '德国': { record:'意大利 16胜 vs 德国 9胜 · 13平', wcMatches:'5次世界杯交手：意大利3胜2平', last:'2023友谊赛 德国1-2意大利', highlight:'1982世界杯决赛 意大利3-1西德' },
        '法国': { record:'意大利 19胜 vs 法国 11胜 · 10平', wcMatches:'4次世界杯交手：意大利2胜1平1负', last:'2018友谊赛 法国3-1意大利', highlight:'2006世界杯决赛 意大利1(5)-(3)1法国' },
        '西班牙': { record:'西班牙 14胜 vs 意大利 10胜 · 16平', wcMatches:'3次世界杯交手：意大利2胜1平', last:'2024欧洲杯 西班牙1-0意大利', highlight:'2020欧洲杯半决赛 意大利1(4)-(2)1西班牙' },
        '阿根廷': { record:'意大利 15胜 vs 阿根廷 8胜 · 13平', wcMatches:'3次世界杯交手：意大利2胜1平', last:'2018友谊赛 阿根廷2-0意大利', highlight:'1990世界杯半决赛 阿根廷1(4)-(3)1意大利' },
        '英格兰': { record:'意大利 11胜 vs 英格兰 9胜 · 9平', wcMatches:'2次世界杯交手：意大利全胜', last:'2023欧预赛 意大利3-1英格兰', highlight:'2014世界杯 意大利2-1英格兰' },
        '荷兰': { record:'意大利 12胜 vs 荷兰 3胜 · 9平', wcMatches:'1次世界杯交手：荷兰2-1(1978)', last:'2020欧国联 意大利2-1荷兰', highlight:'2000欧洲杯半决赛 意大利0(3)-(1)0荷兰' },
    },
    '西班牙': {
        '阿根廷': { record:'西班牙 10胜 vs 阿根廷 6胜 · 3平', wcMatches:'1次世界杯交手：西班牙1-0(1966)', last:'2022友谊赛 西班牙1-1阿根廷', highlight:'2010世界杯决赛 西班牙1-0荷兰' },
        '巴西': { record:'巴西 9胜 vs 西班牙 5胜 · 3平', wcMatches:'1次世界杯交手：巴西3-1(1934)', last:'2024友谊赛 西班牙3-3巴西', highlight:'2013联合会杯决赛 巴西3-0西班牙' },
        '德国': { record:'西班牙 8胜 vs 德国 9胜 · 8平', wcMatches:'5次世界杯交手：德国2胜1平2负', last:'2024欧洲杯1/4决赛 西班牙2-1德国', highlight:'2010世界杯半决赛 西班牙1-0德国' },
        '法国': { record:'西班牙 16胜 vs 法国 13胜 · 7平', wcMatches:'世界杯无交手记录', last:'2024欧洲杯半决赛 西班牙2-1法国', highlight:'2012欧洲杯1/4决赛 西班牙2-0法国' },
        '葡萄牙': { record:'西班牙 17胜 vs 葡萄牙 9胜 · 13平', wcMatches:'2次世界杯交手：西班牙1胜1平', last:'2022欧国联 西班牙1-0葡萄牙', highlight:'2018世界杯小组赛 西班牙3-3葡萄牙' },
        '意大利': { record:'西班牙 14胜 vs 意大利 10胜 · 16平', wcMatches:'3次世界杯交手：意大利2胜1平', last:'2024欧洲杯 西班牙1-0意大利', highlight:'2012欧洲杯决赛 西班牙4-0意大利' },
        '荷兰': { record:'荷兰 10胜 vs 西班牙 5胜 · 2平', wcMatches:'1次世界杯交手：西班牙1-0(2010决赛)', last:'2020友谊赛 西班牙1-1荷兰', highlight:'2014世界杯 荷兰5-1西班牙' },
        '克罗地亚': { record:'西班牙 6胜 vs 克罗地亚 3胜 · 2平', wcMatches:'世界杯无交手', last:'2024欧洲杯小组赛 西班牙3-0克罗地亚', highlight:'2020欧洲杯1/8决赛 西班牙5-3克罗地亚' },
    },
    '荷兰': {
        '阿根廷': { record:'荷兰 5胜 vs 阿根廷 4胜 · 5平', wcMatches:'4次世界杯交手：各1胜2平', last:'2022世界杯1/4决赛 荷兰2(3)-(4)2阿根廷', highlight:'1978世界杯决赛 阿根廷3-1荷兰' },
        '巴西': { record:'荷兰 5胜 vs 巴西 5胜 · 4平', wcMatches:'5次世界杯交手：荷兰3胜1平1负', last:'2014世界杯三四名 荷兰3-0巴西', highlight:'2010世界杯1/4决赛 荷兰2-1巴西' },
        '德国': { record:'荷兰 12胜 vs 德国 16胜 · 17平', wcMatches:'1次世界杯交手：德国2-1(1974)', last:'2024友谊赛 德国2-1荷兰', highlight:'1988欧洲杯半决赛 荷兰2-1德国' },
        '西班牙': { record:'荷兰 10胜 vs 西班牙 5胜 · 2平', wcMatches:'1次世界杯交手：西班牙1-0(2010决赛)', last:'2020友谊赛 荷兰1-1西班牙', highlight:'2014世界杯 荷兰5-1西班牙' },
        '英格兰': { record:'荷兰 9胜 vs 英格兰 7胜 · 10平', wcMatches:'世界杯无交手', last:'2024欧洲杯半决赛 荷兰1-2英格兰', highlight:'1996欧洲杯 英格兰4-1荷兰' },
        '葡萄牙': { record:'葡萄牙 8胜 vs 荷兰 4胜 · 4平', wcMatches:'1次世界杯交手：葡萄牙1-0(2006)', last:'2018友谊赛 荷兰3-0葡萄牙', highlight:'2019欧国联决赛 葡萄牙1-0荷兰' },
        '法国': { record:'法国 11胜 vs 荷兰 8胜 · 5平', wcMatches:'世界杯无交手', last:'2024欧洲杯 法国1-0荷兰', highlight:'2018欧国联 荷兰2-0法国' },
    },
    '葡萄牙': {
        '西班牙': { record:'西班牙 17胜 vs 葡萄牙 9胜 · 13平', wcMatches:'2次世界杯交手：西班牙1胜1平', last:'2022欧国联 葡萄牙0-1西班牙', highlight:'2018世界杯小组赛 葡萄牙3-3西班牙' },
        '法国': { record:'法国 19胜 vs 葡萄牙 6胜 · 3平', wcMatches:'2次世界杯交手：法国2胜', last:'2024欧洲杯1/4决赛 葡萄牙0(3)-(5)0法国', highlight:'2016欧洲杯决赛 葡萄牙1-0法国' },
        '英格兰': { record:'英格兰 12胜 vs 葡萄牙 9胜 · 8平', wcMatches:'2次世界杯交手：1胜1平', last:'2016友谊赛 葡萄牙1-0英格兰', highlight:'2004欧洲杯1/4决赛 葡萄牙2(6)-(5)2英格兰' },
        '巴西': { record:'巴西 14胜 vs 葡萄牙 4胜 · 7平', wcMatches:'1次世界杯交手：葡萄牙2-1(1966)', last:'2019友谊赛 葡萄牙2-3巴西', highlight:'1966世界杯小组赛 葡萄牙3-1巴西' },
        '荷兰': { record:'葡萄牙 8胜 vs 荷兰 4胜 · 4平', wcMatches:'1次世界杯交手：葡萄牙1-0(2006)', last:'2018友谊赛 葡萄牙0-3荷兰', highlight:'2019欧国联决赛 葡萄牙1-0荷兰' },
        '德国': { record:'德国 11胜 vs 葡萄牙 4胜 · 5平', wcMatches:'4次世界杯交手：德国3胜0平1负', last:'2020欧洲杯 德国4-2葡萄牙', highlight:'2014世界杯小组赛 德国4-0葡萄牙' },
    },
    '日本': {
        '韩国': { record:'韩国 42胜 vs 日本 27胜 · 23平', wcMatches:'世界杯无交手', last:'2022东亚杯 日本3-0韩国', highlight:'2011亚洲杯半决赛 日本2(3)-(0)2韩国' },
        '巴西': { record:'巴西 10胜 vs 日本 0胜 · 1平', wcMatches:'1次世界杯交手：巴西4-1(2006)', last:'2017友谊赛 巴西3-1日本', highlight:'2006世界杯小组赛 巴西4-1日本' },
        '德国': { record:'德国 1胜 vs 日本 2胜 · 1平', wcMatches:'2次世界杯交手：日本2胜', last:'2023友谊赛 德国1-4日本', highlight:'2022世界杯小组赛 日本2-1德国' },
        '西班牙': { record:'西班牙 2胜 vs 日本 1胜 · 0平', wcMatches:'1次世界杯交手：日本2-1(2022)', last:'2022世界杯小组赛 日本2-1西班牙', highlight:'2022世界杯小组赛 日本2-1西班牙逆袭出线' },
        '克罗地亚': { record:'克罗地亚 1胜 vs 日本 0胜 · 1平', wcMatches:'2次世界杯交手：克罗地亚1胜1平', last:'2022世界杯1/8决赛 日本1(1)-(3)1克罗地亚', highlight:'2006世界杯 克罗地亚0-0日本' },
        '比利时': { record:'比利时 4胜 vs 日本 2胜 · 1平', wcMatches:'1次世界杯交手：比利时3-2(2018)', last:'2018世界杯1/8决赛 比利时3-2日本', highlight:'2018世界杯1/8决赛 日本2-0领先被逆转' },
    },
    '韩国': {
        '日本': { record:'韩国 42胜 vs 日本 27胜 · 23平', wcMatches:'世界杯无交手', last:'2022东亚杯 韩国0-3日本', highlight:'2011亚洲杯半决赛 日本2(3)-(0)2韩国' },
        '德国': { record:'德国 3胜 vs 韩国 1胜 · 0平', wcMatches:'3次世界杯交手：德国2胜1负', last:'2018世界杯小组赛 韩国2-0德国', highlight:'2018世界杯 韩国2-0淘汰卫冕冠军德国' },
        '葡萄牙': { record:'葡萄牙 1胜 vs 韩国 1胜 · 0平', wcMatches:'2次世界杯交手：各1胜', last:'2022世界杯小组赛 韩国2-1葡萄牙', highlight:'2002世界杯 韩国1-0葡萄牙' },
        '意大利': { record:'意大利 12胜 vs 韩国 2胜 · 1平', wcMatches:'1次世界杯交手：韩国2-1(2002)', last:'2018友谊赛 韩国1-3意大利', highlight:'2002世界杯1/8决赛 韩国2-1意大利' },
        '西班牙': { record:'西班牙 5胜 vs 韩国 1胜 · 2平', wcMatches:'2次世界杯交手：1胜1平', last:'2016友谊赛 西班牙6-1韩国', highlight:'2002世界杯1/4决赛 韩国0(5)-(3)0西班牙' },
        '乌拉圭': { record:'乌拉圭 6胜 vs 韩国 1胜 · 1平', wcMatches:'2次世界杯交手：乌拉圭全胜', last:'2022世界杯 韩国2-1葡萄牙后出线', highlight:'2010世界杯1/8决赛 乌拉圭2-1韩国' },
    },
    '美国': {
        '墨西哥': { record:'墨西哥 36胜 vs 美国 23胜 · 17平', wcMatches:'1次世界杯交手：美国2-0(2002)', last:'2024中北美国家联赛决赛 美国2-0墨西哥', highlight:'2002世界杯1/8决赛 美国2-0墨西哥' },
        '加拿大': { record:'美国 17胜 vs 加拿大 11胜 · 12平', wcMatches:'世界杯无交手', last:'2023金杯赛 美国2(3)-(2)2加拿大', highlight:'2022世预赛 美国1-1加拿大' },
        '英格兰': { record:'英格兰 8胜 vs 美国 2胜 · 1平', wcMatches:'2次世界杯交手：1胜1平', last:'2022世界杯小组赛 英格兰0-0美国', highlight:'1950世界杯 美国1-0英格兰（世纪冷门）' },
        '德国': { record:'德国 9胜 vs 美国 2胜 · 2平', wcMatches:'3次世界杯交手：德国2胜0平1负', last:'2015友谊赛 美国2-1德国', highlight:'2002世界杯1/4决赛 德国1-0美国' },
        '巴西': { record:'巴西 13胜 vs 美国 1胜 · 0平', wcMatches:'1次世界杯交手：巴西1-0(1994)', last:'2018友谊赛 美国0-2巴西', highlight:'1994世界杯1/8决赛 巴西1-0美国' },
    },
    '墨西哥': {
        '美国': { record:'墨西哥 36胜 vs 美国 23胜 · 17平', wcMatches:'1次世界杯交手：美国2-0(2002)', last:'2024中北美决赛 墨西哥0-2美国', highlight:'2015金杯赛决赛 墨西哥3-1美国' },
        '巴西': { record:'巴西 23胜 vs 墨西哥 9胜 · 7平', wcMatches:'5次世界杯交手：巴西4胜1平', last:'2018世界杯1/8决赛 巴西2-0墨西哥', highlight:'2018世界杯1/8决赛 巴西2-0墨西哥' },
        '阿根廷': { record:'阿根廷 16胜 vs 墨西哥 11胜 · 14平', wcMatches:'3次世界杯交手：阿根廷3胜', last:'2022世界杯小组赛 阿根廷2-0墨西哥', highlight:'2006世界杯1/8决赛 阿根廷2-1墨西哥' },
        '德国': { record:'德国 7胜 vs 墨西哥 1胜 · 5平', wcMatches:'3次世界杯交手：德国1胜1平1负', last:'2018世界杯小组赛 墨西哥1-0德国', highlight:'2018世界杯 墨西哥1-0卫冕冠军德国' },
    },
    '克罗地亚': {
        '法国': { record:'法国 7胜 vs 克罗地亚 1胜 · 3平', wcMatches:'2次世界杯交手：法国全胜', last:'2022欧国联 法国0(4)-(5)0克罗地亚', highlight:'2018世界杯决赛 法国4-2克罗地亚' },
        '巴西': { record:'巴西 2胜 vs 克罗地亚 0胜 · 0平', wcMatches:'2次世界杯交手：巴西全胜', last:'2022世界杯1/4决赛 巴西1(2)-(4)1克罗地亚', highlight:'2014世界杯揭幕战 巴西3-1克罗地亚' },
        '英格兰': { record:'英格兰 5胜 vs 克罗地亚 3胜 · 2平', wcMatches:'1次世界杯交手：克罗地亚2-1(2018)', last:'2020欧洲杯 英格兰1-0克罗地亚', highlight:'2018世界杯半决赛 克罗地亚2-1英格兰' },
        '阿根廷': { record:'阿根廷 3胜 vs 克罗地亚 2胜 · 1平', wcMatches:'2次世界杯交手：各1胜', last:'2022世界杯半决赛 阿根廷3-0克罗地亚', highlight:'2018世界杯小组赛 克罗地亚3-0阿根廷' },
        '西班牙': { record:'西班牙 6胜 vs 克罗地亚 3胜 · 2平', wcMatches:'世界杯无交手', last:'2024欧洲杯小组赛 西班牙3-0克罗地亚', highlight:'2020欧洲杯1/8决赛 西班牙5-3克罗地亚' },
        '意大利': { record:'意大利 5胜 vs 克罗地亚 3胜 · 5平', wcMatches:'世界杯无交手', last:'2024欧预赛 意大利1-1克罗地亚', highlight:'2012欧洲杯 克罗地亚1-1意大利' },
    },
    '比利时': {
        '日本': { record:'比利时 4胜 vs 日本 2胜 · 1平', wcMatches:'1次世界杯交手：比利时3-2(2018)', last:'2018世界杯1/8决赛 比利时3-2日本', highlight:'2018世界杯1/8决赛 比利时逆转3-2日本' },
        '巴西': { record:'巴西 4胜 vs 比利时 2胜 · 0平', wcMatches:'1次世界杯交手：比利时2-1(2002)', last:'2018世界杯1/4决赛 巴西2-1比利时', highlight:'2002世界杯1/8决赛 比利时2-1巴西' },
        '法国': { record:'法国 15胜 vs 比利时 8胜 · 9平', wcMatches:'3次世界杯交手：法国1胜1平1负', last:'2024欧洲杯1/8决赛 法国1-0比利时', highlight:'2018世界杯半决赛 法国1-0比利时' },
        '英格兰': { record:'英格兰 17胜 vs 比利时 4胜 · 5平', wcMatches:'3次世界杯交手：英格兰2胜1负', last:'2020欧国联 比利时2-0英格兰', highlight:'2018世界杯三四名 比利时2-0英格兰' },
        '荷兰': { record:'荷兰 13胜 vs 比利时 8胜 · 5平', wcMatches:'世界杯无交手', last:'2022欧国联 荷兰4-1比利时', highlight:'2022欧国联 荷兰4-0比利时' },
        '德国': { record:'德国 20胜 vs 比利时 4胜 · 1平', wcMatches:'世界杯无交手', last:'2018友谊赛 比利时1-4德国', highlight:'1980欧洲杯决赛 西德2-1比利时' },
    },
    '乌拉圭': {
        '巴西': { record:'巴西 61胜 vs 乌拉圭 36胜 · 39平', wcMatches:'1次世界杯交手：巴西1-0(1970半决赛)', last:'2025世预赛 乌拉圭2-0巴西', highlight:'1950世界杯决赛 乌拉圭2-1巴西（马拉卡纳惨案）' },
        '阿根廷': { record:'阿根廷 89胜 vs 乌拉圭 55胜 · 49平', wcMatches:'1次世界杯交手：乌拉圭2-1(1930)', last:'2025世预赛 乌拉圭1-2阿根廷', highlight:'1930世界杯决赛 乌拉圭4-2阿根廷' },
        '德国': { record:'德国 7胜 vs 乌拉圭 1胜 · 2平', wcMatches:'3次世界杯交手：德国2胜1平', last:'2010世界杯三四名决赛 德国3-2乌拉圭', highlight:'2010世界杯三四名 德国3-2乌拉圭' },
        '法国': { record:'法国 7胜 vs 乌拉圭 4胜 · 7平', wcMatches:'3次世界杯交手：法国1胜2平', last:'2018世界杯1/4决赛 法国2-0乌拉圭', highlight:'2018世界杯1/4决赛 法国2-0乌拉圭' },
        '韩国': { record:'乌拉圭 6胜 vs 韩国 1胜 · 1平', wcMatches:'2次世界杯交手：乌拉圭全胜', last:'2018友谊赛 乌拉圭2-1韩国', highlight:'2010世界杯1/8决赛 乌拉圭2-1韩国' },
    },
    '摩洛哥': {
        '法国': { record:'法国 4胜 vs 摩洛哥 0胜 · 1平', wcMatches:'1次世界杯交手：法国2-0(2022半决赛)', last:'2022世界杯半决赛 法国2-0摩洛哥', highlight:'2022世界杯半决赛 法国2-0摩洛哥' },
        '西班牙': { record:'西班牙 3胜 vs 摩洛哥 0胜 · 1平', wcMatches:'2次世界杯交手：摩洛哥1胜1平', last:'2022世界杯1/8决赛 摩洛哥0(3)-(0)0西班牙', highlight:'2022世界杯1/8决赛 摩洛哥点球胜西班牙' },
        '葡萄牙': { record:'葡萄牙 1胜 vs 摩洛哥 1胜 · 0平', wcMatches:'2次世界杯交手：各1胜', last:'2022世界杯1/4决赛 摩洛哥1-0葡萄牙', highlight:'2022世界杯1/4决赛 摩洛哥1-0葡萄牙创造历史' },
        '克罗地亚': { record:'摩洛哥 0胜 vs 克罗地亚 0胜 · 2平', wcMatches:'1次世界杯交手：0-0(2022)', last:'2022世界杯三四名 克罗地亚2-1摩洛哥', highlight:'2022世界杯小组赛 摩洛哥0-0克罗地亚' },
        '比利时': { record:'比利时 3胜 vs 摩洛哥 1胜 · 0平', wcMatches:'2次世界杯交手：各1胜', last:'2022世界杯小组赛 摩洛哥2-0比利时', highlight:'2022世界杯 摩洛哥2-0世界排名第二比利时' },
    },
    '塞内加尔': {
        '法国': { record:'法国 3胜 vs 塞内加尔 0胜 · 0平', wcMatches:'1次世界杯交手：塞内加尔1-0(2002揭幕战)', last:'2022友谊赛 法国3-1塞内加尔', highlight:'2002世界杯揭幕战 塞内加尔1-0卫冕冠军法国' },
        '荷兰': { record:'荷兰 1胜 vs 塞内加尔 0胜 · 0平', wcMatches:'1次世界杯交手：荷兰2-0(2022)', last:'2022世界杯小组赛 荷兰2-0塞内加尔', highlight:'2022世界杯小组赛 荷兰2-0塞内加尔' },
        '英格兰': { record:'英格兰 1胜 vs 塞内加尔 0胜 · 0平', wcMatches:'1次世界杯交手：英格兰3-0(2022)', last:'2022世界杯1/8决赛 英格兰3-0塞内加尔', highlight:'2022世界杯1/8决赛 英格兰3-0塞内加尔' },
        '厄瓜多尔': { record:'塞内加尔 1胜 vs 厄瓜多尔 0胜 · 0平', wcMatches:'1次世界杯交手：塞内加尔2-1(2022)', last:'2022世界杯小组赛 塞内加尔2-1厄瓜多尔', highlight:'2022世界杯 塞内加尔2-1厄瓜多尔出线' },
    },
    '丹麦': {
        '德国': { record:'德国 16胜 vs 丹麦 8胜 · 5平', wcMatches:'1次世界杯交手：德国2-0(1986)', last:'2024欧洲杯1/8决赛 德国2-0丹麦', highlight:'1992欧洲杯决赛 丹麦2-0德国夺冠神话' },
        '英格兰': { record:'英格兰 14胜 vs 丹麦 6胜 · 5平', wcMatches:'1次世界杯交手：英格兰3-0(2002)', last:'2024欧洲杯 丹麦1-1英格兰', highlight:'2020欧洲杯半决赛 英格兰2-1丹麦' },
        '法国': { record:'法国 9胜 vs 丹麦 6胜 · 2平', wcMatches:'3次世界杯交手：法国2胜0平1负', last:'2022世界杯小组赛 法国2-1丹麦', highlight:'2002世界杯 丹麦2-0法国' },
        '瑞典': { record:'瑞典 46胜 vs 丹麦 41胜 · 20平', wcMatches:'世界杯无交手', last:'2020友谊赛 丹麦2-0瑞典', highlight:'北欧德比·百年宿敌对决' },
        '荷兰': { record:'荷兰 12胜 vs 丹麦 7胜 · 9平', wcMatches:'1次世界杯交手：丹麦2-0(2010)', last:'2012欧洲杯 丹麦1-0荷兰', highlight:'2010世界杯小组赛 丹麦2-0荷兰' },
        '巴西': { record:'巴西 4胜 vs 丹麦 1胜 · 0平', wcMatches:'1次世界杯交手：巴西3-2(1998)', last:'1998世界杯1/4决赛 巴西3-2丹麦', highlight:'1998世界杯1/4决赛 巴西3-2丹麦' },
    },
    '瑞士': {
        '德国': { record:'德国 37胜 vs 瑞士 9胜 · 8平', wcMatches:'3次世界杯交手：德国2胜1平', last:'2024欧洲杯 德国1-1瑞士', highlight:'2006世界杯 瑞士0(0)-(0)0乌克兰' },
        '意大利': { record:'意大利 31胜 vs 瑞士 8胜 · 20平', wcMatches:'2次世界杯交手：意大利1胜1平', last:'2020欧洲杯小组赛 意大利3-0瑞士', highlight:'1954世界杯 瑞士2-1意大利' },
        '法国': { record:'法国 15胜 vs 瑞士 13胜 · 10平', wcMatches:'1次世界杯交手：法国0-0(2006)', last:'2020欧洲杯1/8决赛 瑞士3(5)-(4)3法国', highlight:'2020欧洲杯 瑞士点球淘汰法国' },
        '西班牙': { record:'西班牙 14胜 vs 瑞士 1胜 · 5平', wcMatches:'2次世界杯交手：西班牙1胜1负', last:'2020欧国联 西班牙1-2瑞士', highlight:'2010世界杯 瑞士1-0西班牙(卫冕冠军)' },
        '塞尔维亚': { record:'瑞士 3胜 vs 塞尔维亚 1胜 · 0平', wcMatches:'2次世界杯交手：瑞士2胜', last:'2022世界杯小组赛 瑞士3-2塞尔维亚', highlight:'2018世界杯 瑞士2-1塞尔维亚' },
        '巴西': { record:'巴西 7胜 vs 瑞士 2胜 · 1平', wcMatches:'2次世界杯交手：各1胜1平', last:'2022世界杯 巴西1-0瑞士', highlight:'2018世界杯 瑞士1-1巴西' },
    },
    '奥地利': {
        '德国': { record:'德国 25胜 vs 奥地利 11胜 · 6平', wcMatches:'4次世界杯交手：德国3胜1负', last:'2024欧洲杯 奥地利3-2德国', highlight:'1978世界杯 奥地利3-2德国' },
        '意大利': { record:'意大利 23胜 vs 奥地利 13胜 · 13平', wcMatches:'3次世界杯交手：意大利3胜', last:'2020欧洲杯1/8决赛 意大利2-1奥地利', highlight:'1934世界杯半决赛 意大利1-0奥地利' },
        '瑞士': { record:'奥地利 16胜 vs 瑞士 11胜 · 8平', wcMatches:'世界杯无交手', last:'2023友谊赛 奥地利2-1瑞士', highlight:'1954世界杯 奥地利7-5瑞士' },
        '荷兰': { record:'荷兰 16胜 vs 奥地利 5胜 · 2平', wcMatches:'1次世界杯交手：奥地利3-2(1978)', last:'2024欧洲杯 奥地利3-2荷兰', highlight:'2024欧洲杯 奥地利力压荷兰法国夺小组第一' },
        '法国': { record:'法国 14胜 vs 奥地利 9胜 · 3平', wcMatches:'2次世界杯交手：法国1胜1平', last:'2024欧洲杯 法国1-0奥地利', highlight:'1982世界杯 法国1-0奥地利' },
    },
    '瑞典': {
        '德国': { record:'德国 28胜 vs 瑞典 15胜 · 11平', wcMatches:'4次世界杯交手：德国3胜0平1负', last:'2018世界杯小组赛 德国2-1瑞典', highlight:'1958世界杯决赛 巴西5-2瑞典' },
        '英格兰': { record:'英格兰 8胜 vs 瑞典 7胜 · 9平', wcMatches:'2次世界杯交手：1胜1平', last:'2018世界杯1/4决赛 英格兰2-0瑞典', highlight:'2002世界杯 英格兰1-1瑞典' },
        '巴西': { record:'巴西 9胜 vs 瑞典 2胜 · 3平', wcMatches:'7次世界杯交手：巴西5胜2平', last:'2012友谊赛 巴西3-0瑞典', highlight:'1958世界杯决赛 巴西5-2瑞典' },
        '丹麦': { record:'瑞典 46胜 vs 丹麦 41胜 · 20平', wcMatches:'世界杯无交手', last:'2020友谊赛 瑞典0-2丹麦', highlight:'北欧德比·1897年首次交锋' },
        '荷兰': { record:'荷兰 10胜 vs 瑞典 6胜 · 6平', wcMatches:'世界杯无交手', last:'2018友谊赛 瑞典1-1荷兰', highlight:'1994世界杯半决赛 巴西1-0瑞典' },
    },
    '波兰': {
        '德国': { record:'德国 12胜 vs 波兰 2胜 · 6平', wcMatches:'3次世界杯交手：德国2胜1平', last:'2016欧洲杯 德国0-0波兰', highlight:'1974世界杯 西德1-0波兰' },
        '阿根廷': { record:'阿根廷 7胜 vs 波兰 3胜 · 1平', wcMatches:'2次世界杯交手：各1胜', last:'2022世界杯小组赛 阿根廷2-0波兰', highlight:'1974世界杯 波兰3-2阿根廷' },
        '法国': { record:'法国 9胜 vs 波兰 3胜 · 5平', wcMatches:'2次世界杯交手：法国1胜1负', last:'2022世界杯1/8决赛 法国3-1波兰', highlight:'1982世界杯三四名 波兰3-2法国' },
        '英格兰': { record:'英格兰 12胜 vs 波兰 1胜 · 7平', wcMatches:'2次世界杯交手：各1胜', last:'2021世预赛 波兰1-1英格兰', highlight:'1974世预赛 波兰1-1英格兰(淘汰英格兰)' },
        '巴西': { record:'巴西 8胜 vs 波兰 2胜 · 4平', wcMatches:'4次世界杯交手：巴西3胜0平1负', last:'2015友谊赛 巴西3-1波兰', highlight:'1938世界杯 巴西6-5波兰(世界杯经典)' },
    },
    '塞尔维亚': {
        '巴西': { record:'巴西 2胜 vs 塞尔维亚 0胜 · 0平', wcMatches:'2次世界杯交手：巴西全胜', last:'2022世界杯 巴西2-0塞尔维亚', highlight:'2018世界杯 巴西2-0塞尔维亚' },
        '瑞士': { record:'瑞士 3胜 vs 塞尔维亚 1胜 · 0平', wcMatches:'2次世界杯交手：瑞士2胜', last:'2022世界杯 瑞士3-2塞尔维亚', highlight:'2018世界杯 瑞士2-1塞尔维亚' },
        '德国': { record:'德国 3胜 vs 塞尔维亚 1胜 · 1平', wcMatches:'1次世界杯交手：塞尔维亚1-0(2010)', last:'2022友谊赛 塞尔维亚0-1德国', highlight:'2010世界杯 塞尔维亚1-0德国' },
        '荷兰': { record:'荷兰 3胜 vs 塞尔维亚 0胜 · 0平', wcMatches:'1次世界杯交手：荷兰1-0(2006)', last:'2006世界杯 荷兰1-0塞尔维亚', highlight:'2006世界杯 荷兰1-0塞尔维亚' },
        '克罗地亚': { record:'克罗地亚 2胜 vs 塞尔维亚 0胜 · 2平', wcMatches:'世界杯无交手', last:'2018友谊赛 克罗地亚2-0塞尔维亚', highlight:'巴尔干德比·前南分裂后首次交锋' },
    },
    '埃及': {
        '沙特阿拉伯': { record:'沙特阿拉伯 5胜 vs 埃及 4胜 · 2平', wcMatches:'1次世界杯交手：沙特2-1(2018)', last:'2018世界杯 沙特2-1埃及', highlight:'2018世界杯 沙特2-1埃及' },
        '摩洛哥': { record:'摩洛哥 17胜 vs 埃及 9胜 · 10平', wcMatches:'世界杯无交手', last:'2022非洲杯1/4决赛 摩洛哥2-1埃及', highlight:'北非德比·非洲杯经典对决' },
        '塞内加尔': { record:'塞内加尔 5胜 vs 埃及 4胜 · 2平', wcMatches:'世界杯无交手', last:'2022世预赛附加赛 塞内加尔1(3)-(1)0埃及', highlight:'2022非洲杯决赛 塞内加尔0(4)-(2)0埃及' },
        '突尼斯': { record:'埃及 14胜 vs 突尼斯 8胜 · 9平', wcMatches:'世界杯无交手', last:'2019非洲杯 突尼斯2-1埃及', highlight:'北非劲旅·非洲杯多次交锋' },
        '乌拉圭': { record:'乌拉圭 1胜 vs 埃及 0胜 · 0平', wcMatches:'1次世界杯交手：乌拉圭1-0(2018)', last:'2018世界杯 乌拉圭1-0埃及', highlight:'2018世界杯 乌拉圭1-0埃及' },
    },
    '尼日利亚': {
        '阿根廷': { record:'阿根廷 5胜 vs 尼日利亚 1胜 · 0平', wcMatches:'5次世界杯交手：阿根廷5胜', last:'2018世界杯 阿根廷2-1尼日利亚', highlight:'1994-2018五届世界杯连续交锋纪录' },
        '英格兰': { record:'英格兰 2胜 vs 尼日利亚 1平 · 0胜', wcMatches:'1次世界杯交手：英格兰0-0(2002)', last:'2018友谊赛 英格兰2-1尼日利亚', highlight:'2002世界杯 英格兰0-0尼日利亚' },
        '克罗地亚': { record:'克罗地亚 1胜 vs 尼日利亚 0胜 · 0平', wcMatches:'1次世界杯交手：克罗地亚2-0(2018)', last:'2018世界杯 克罗地亚2-0尼日利亚', highlight:'2018世界杯 克罗地亚2-0尼日利亚' },
        '法国': { record:'法国 2胜 vs 尼日利亚 0胜 · 1平', wcMatches:'1次世界杯交手：法国2-0(2014)', last:'2014世界杯1/8决赛 法国2-0尼日利亚', highlight:'2014世界杯1/8决赛 法国2-0尼日利亚' },
        '巴西': { record:'巴西 1胜 vs 尼日利亚 0平 · 0胜', wcMatches:'世界杯无交手', last:'2019友谊赛 巴西1-1尼日利亚', highlight:'1996奥运会半决赛 尼日利亚4-3巴西' },
    },
    '喀麦隆': {
        '巴西': { record:'巴西 4胜 vs 喀麦隆 0胜 · 0平', wcMatches:'2次世界杯交手：巴西全胜', last:'2022世界杯 巴西1-0喀麦隆', highlight:'1994世界杯 巴西3-0喀麦隆' },
        '英格兰': { record:'英格兰 1胜 vs 喀麦隆 0胜 · 0平', wcMatches:'1次世界杯交手：英格兰3-2(1990)', last:'1990世界杯1/4决赛 英格兰3-2喀麦隆', highlight:'1990世界杯 喀麦隆2-1阿根廷(揭幕战)' },
        '德国': { record:'德国 2胜 vs 喀麦隆 1平 · 0胜', wcMatches:'2次世界杯交手：德国全胜', last:'2002世界杯 德国2-0喀麦隆', highlight:'2002世界杯 德国2-0喀麦隆' },
        '阿根廷': { record:'阿根廷 2胜 vs 喀麦隆 1胜 · 0平', wcMatches:'2次世界杯交手：各1胜', last:'2010世界杯 阿根廷1-0喀麦隆', highlight:'1990世界杯揭幕战 喀麦隆1-0阿根廷' },
        '埃及': { record:'埃及 7胜 vs 喀麦隆 5胜 · 6平', wcMatches:'世界杯无交手', last:'2022非洲杯半决赛 埃及0(3)-(1)0喀麦隆', highlight:'非洲雄狮vs法老·非洲足坛巅峰对决' },
    },
    '加纳': {
        '乌拉圭': { record:'乌拉圭 1胜 vs 加纳 0胜 · 1平', wcMatches:'1次世界杯交手：乌拉圭1(4)-(2)1(2010)', last:'2022世界杯小组赛 乌拉圭2-0加纳', highlight:'2010世界杯1/4决赛 苏亚雷斯手球+吉安点球中楣' },
        '德国': { record:'德国 1胜 vs 加纳 1平 · 0胜', wcMatches:'2次世界杯交手：德国1胜1平', last:'2014世界杯 德国2-2加纳', highlight:'2014世界杯 德国2-2加纳经典进球大战' },
        '美国': { record:'美国 2胜 vs 加纳 1胜 · 0平', wcMatches:'3次世界杯交手：美国2胜1负', last:'2014世界杯 美国2-1加纳', highlight:'2010世界杯1/8决赛 加纳2-1美国' },
        '葡萄牙': { record:'葡萄牙 2胜 vs 加纳 0胜 · 0平', wcMatches:'2次世界杯交手：葡萄牙全胜', last:'2022世界杯 葡萄牙3-2加纳', highlight:'2014世界杯 葡萄牙2-1加纳' },
        '巴西': { record:'巴西 1胜 vs 加纳 0胜 · 0平', wcMatches:'1次世界杯交手：巴西3-0(2006)', last:'2006世界杯1/8决赛 巴西3-0加纳', highlight:'2006世界杯1/8决赛 巴西3-0加纳' },
    },
    '阿尔及利亚': {
        '德国': { record:'德国 2胜 vs 阿尔及利亚 1胜 · 1平', wcMatches:'2次世界杯交手：德国1胜1负', last:'2014世界杯1/8决赛 德国2-1阿尔及利亚', highlight:'1982世界杯 阿尔及利亚2-1西德(世纪冷门)' },
        '英格兰': { record:'英格兰 1胜 vs 阿尔及利亚 1平 · 0胜', wcMatches:'1次世界杯交手：英格兰0-0(2010)', last:'2010世界杯 英格兰0-0阿尔及利亚', highlight:'2010世界杯 阿尔及利亚逼平英格兰' },
        '法国': { record:'法国 2胜 vs 阿尔及利亚 0胜 · 1平', wcMatches:'世界杯无交手', last:'2019友谊赛 法国4-1阿尔及利亚', highlight:'2014世界杯1/8决赛 德国2-1阿尔及利亚' },
        '韩国': { record:'韩国 1胜 vs 阿尔及利亚 1胜 · 0平', wcMatches:'1次世界杯交手：阿尔及利亚4-2(2014)', last:'2014世界杯 阿尔及利亚4-2韩国', highlight:'2014世界杯 阿尔及利亚历史性闯入16强' },
        '阿根廷': { record:'阿根廷 2胜 vs 阿尔及利亚 0平 · 0胜', wcMatches:'世界杯无交手', last:'2019友谊赛 阿根廷4-0阿尔及利亚', highlight:'沙漠之狐·2014世界杯16强' },
    },
    '厄瓜多尔': {
        '英格兰': { record:'英格兰 1胜 vs 厄瓜多尔 0平 · 0胜', wcMatches:'1次世界杯交手：英格兰1-0(2006)', last:'2006世界杯1/8决赛 英格兰1-0厄瓜多尔', highlight:'2006世界杯1/8决赛 贝克汉姆任意球制胜' },
        '德国': { record:'德国 1胜 vs 厄瓜多尔 0平 · 0胜', wcMatches:'1次世界杯交手：德国3-0(2006)', last:'2006世界杯 德国3-0厄瓜多尔', highlight:'2006世界杯 德国3-0厄瓜多尔' },
        '荷兰': { record:'荷兰 1胜 vs 厄瓜多尔 1平 · 0胜', wcMatches:'1次世界杯交手：荷兰1-1(2022)', last:'2022世界杯 荷兰1-1厄瓜多尔', highlight:'2022世界杯 厄瓜多尔1-1荷兰' },
        '塞内加尔': { record:'塞内加尔 1胜 vs 厄瓜多尔 0胜 · 0平', wcMatches:'1次世界杯交手：塞内加尔2-1(2022)', last:'2022世界杯 塞内加尔2-1厄瓜多尔', highlight:'2022世界杯 塞内加尔2-1厄瓜多尔' },
        '阿根廷': { record:'阿根廷 6胜 vs 厄瓜多尔 1胜 · 2平', wcMatches:'世界杯无交手', last:'2024美洲杯 阿根廷1(4)-(2)1厄瓜多尔', highlight:'2026世预赛 阿根廷1-0厄瓜多尔' },
    },
    '智利': {
        '巴西': { record:'巴西 47胜 vs 智利 10胜 · 14平', wcMatches:'4次世界杯交手：巴西3胜1平', last:'2014世界杯1/8决赛 巴西1(3)-(2)1智利', highlight:'2014世界杯1/8决赛 巴西点球淘汰智利' },
        '阿根廷': { record:'阿根廷 55胜 vs 智利 6胜 · 23平', wcMatches:'1次世界杯交手：阿根廷2-1(1930)', last:'2025世预赛 阿根廷3-0智利', highlight:'2015/2016美洲杯决赛 智利点球战胜阿根廷' },
        '西班牙': { record:'西班牙 11胜 vs 智利 3胜 · 2平', wcMatches:'2次世界杯交手：各1胜', last:'2014世界杯 智利2-0西班牙', highlight:'2010世界杯 西班牙2-1智利' },
        '荷兰': { record:'荷兰 3胜 vs 智利 1平 · 0胜', wcMatches:'1次世界杯交手：荷兰2-0(2014)', last:'2014世界杯 荷兰2-0智利', highlight:'2014世界杯 荷兰2-0智利' },
        '澳大利亚': { record:'智利 2胜 vs 澳大利亚 0平 · 0胜', wcMatches:'1次世界杯交手：智利3-1(2014)', last:'2014世界杯 智利3-1澳大利亚', highlight:'2014世界杯 智利3-1澳大利亚' },
    },
    '澳大利亚': {
        '意大利': { record:'意大利 3胜 vs 澳大利亚 0平 · 1胜', wcMatches:'1次世界杯交手：意大利1-0(2006)', last:'2006世界杯1/8决赛 意大利1-0澳大利亚', highlight:'2006世界杯1/8决赛 "伟大的意大利左后卫"' },
        '巴西': { record:'巴西 5胜 vs 澳大利亚 0胜 · 1平', wcMatches:'2次世界杯交手：巴西全胜', last:'2014世界杯 巴西2-1澳大利亚', highlight:'2006世界杯 巴西2-0澳大利亚' },
        '荷兰': { record:'荷兰 1胜 vs 澳大利亚 0平 · 1胜', wcMatches:'1次世界杯交手：荷兰3-2(2014)', last:'2014世界杯 荷兰3-2澳大利亚', highlight:'2014世界杯 荷兰3-2澳大利亚' },
        '日本': { record:'日本 5胜 vs 澳大利亚 2胜 · 4平', wcMatches:'世界杯无交手', last:'2022世预赛 澳大利亚0-2日本', highlight:'2011亚洲杯决赛 日本1-0澳大利亚' },
        '克罗地亚': { record:'克罗地亚 1胜 vs 澳大利亚 0胜 · 1平', wcMatches:'1次世界杯交手：克罗地亚2-2(2006)', last:'2006世界杯 克罗地亚2-2澳大利亚', highlight:'2006世界杯 克罗地亚2-2澳大利亚' },
    },
    '沙特阿拉伯': {
        '阿根廷': { record:'阿根廷 1胜 vs 沙特 0平 · 0胜', wcMatches:'1次世界杯交手：沙特2-1(2022)', last:'2022世界杯 沙特2-1阿根廷', highlight:'2022世界杯 沙特2-1阿根廷(世纪冷门)' },
        '墨西哥': { record:'墨西哥 2胜 vs 沙特 0平 · 1胜', wcMatches:'1次世界杯交手：沙特0-0(2022)', last:'2022世界杯 墨西哥2-1沙特', highlight:'2022世界杯 沙特0-0墨西哥' },
        '波兰': { record:'波兰 2胜 vs 沙特 0胜 · 0平', wcMatches:'1次世界杯交手：波兰2-0(2022)', last:'2022世界杯 波兰2-0沙特', highlight:'2022世界杯 波兰2-0沙特' },
        '德国': { record:'德国 1胜 vs 沙特 1胜 · 0平', wcMatches:'1次世界杯交手：德国8-0(2002)', last:'2002世界杯 德国8-0沙特', highlight:'2002世界杯 德国8-0沙特(世界杯最大分差)' },
        '埃及': { record:'沙特阿拉伯 5胜 vs 埃及 4胜 · 2平', wcMatches:'1次世界杯交手：沙特2-1(2018)', last:'2018世界杯 沙特2-1埃及', highlight:'2018世界杯 沙特2-1埃及' },
    },
    '哥斯达黎加': {
        '巴西': { record:'巴西 10胜 vs 哥斯达黎加 1胜 · 0平', wcMatches:'2次世界杯交手：巴西全胜', last:'2018世界杯 巴西2-0哥斯达黎加', highlight:'2002世界杯 巴西5-2哥斯达黎加' },
        '德国': { record:'德国 1胜 vs 哥斯达黎加 0胜 · 0平', wcMatches:'2次世界杯交手：德国全胜', last:'2022世界杯 德国4-2哥斯达黎加', highlight:'2006世界杯揭幕战 德国4-2哥斯达黎加' },
        '英格兰': { record:'英格兰 1平 vs 哥斯达黎加 0胜 · 0胜', wcMatches:'1次世界杯交手：英格兰0-0(2014)', last:'2014世界杯 英格兰0-0哥斯达黎加', highlight:'2014世界杯 哥斯达黎加闯入8强创造历史' },
        '意大利': { record:'意大利 1胜 vs 哥斯达黎加 1胜 · 0平', wcMatches:'1次世界杯交手：哥斯达黎加1-0(2014)', last:'2014世界杯 哥斯达黎加1-0意大利', highlight:'2014世界杯 哥斯达黎加1-0意大利' },
        '荷兰': { record:'荷兰 1平 vs 哥斯达黎加 0胜 · 0胜', wcMatches:'1次世界杯交手：荷兰0(4)-(3)0(2014)', last:'2014世界杯1/4决赛 荷兰0(4)-(3)0哥斯达黎加', highlight:'2014世界杯1/4决赛 荷兰点球淘汰哥斯达黎加' },
    },
    '伊朗': {
        '美国': { record:'伊朗 1胜 vs 美国 0平 · 1胜', wcMatches:'2次世界杯交手：各1胜', last:'2022世界杯 伊朗0-1美国', highlight:'1998世界杯 伊朗2-1美国(政治意义之战)' },
        '葡萄牙': { record:'葡萄牙 1胜 vs 伊朗 1平 · 0胜', wcMatches:'2次世界杯交手：葡萄牙1胜1平', last:'2022世界杯 葡萄牙1-0伊朗', highlight:'2018世界杯 葡萄牙1-1伊朗' },
        '西班牙': { record:'西班牙 2胜 vs 伊朗 0平 · 0胜', wcMatches:'1次世界杯交手：西班牙1-0(2018)', last:'2018世界杯 西班牙1-0伊朗', highlight:'2018世界杯 西班牙1-0伊朗' },
        '阿根廷': { record:'阿根廷 1胜 vs 伊朗 0平 · 0胜', wcMatches:'1次世界杯交手：阿根廷1-0(2014)', last:'2014世界杯 阿根廷1-0伊朗', highlight:'2014世界杯 梅西绝杀伊朗' },
        '摩洛哥': { record:'摩洛哥 1胜 vs 伊朗 0平 · 0胜', wcMatches:'1次世界杯交手：摩洛哥1-0(2018)', last:'2018世界杯 摩洛哥1-0伊朗', highlight:'2018世界杯 摩洛哥1-0伊朗' },
    },
    '突尼斯': {
        '法国': { record:'法国 2胜 vs 突尼斯 1胜 · 1平', wcMatches:'2次世界杯交手：各1胜', last:'2022世界杯 突尼斯1-0法国', highlight:'2022世界杯 突尼斯1-0卫冕冠军法国' },
        '英格兰': { record:'英格兰 1胜 vs 突尼斯 0平 · 1胜', wcMatches:'2次世界杯交手：各1胜', last:'2022世界杯 突尼斯0-0英格兰', highlight:'2018世界杯 英格兰2-1突尼斯' },
        '比利时': { record:'比利时 1胜 vs 突尼斯 0平 · 1胜', wcMatches:'2次世界杯交手：各1胜', last:'2018世界杯 比利时5-2突尼斯', highlight:'2002世界杯 突尼斯1-1比利时' },
        '西班牙': { record:'西班牙 2胜 vs 突尼斯 0平 · 0胜', wcMatches:'1次世界杯交手：西班牙3-1(2006)', last:'2006世界杯 西班牙3-1突尼斯', highlight:'2006世界杯 西班牙3-1突尼斯' },
        '埃及': { record:'埃及 14胜 vs 突尼斯 8胜 · 9平', wcMatches:'世界杯无交手', last:'2019非洲杯 突尼斯2-1埃及', highlight:'北非强队·非洲杯传统劲旅' },
    },
    '卡塔尔': {
        '荷兰': { record:'荷兰 1胜 vs 卡塔尔 0平 · 0胜', wcMatches:'1次世界杯交手：荷兰2-0(2022)', last:'2022世界杯 荷兰2-0卡塔尔', highlight:'2022世界杯揭幕战 卡塔尔0-2厄瓜多尔' },
        '厄瓜多尔': { record:'厄瓜多尔 1胜 vs 卡塔尔 0平 · 0胜', wcMatches:'1次世界杯交手：厄瓜多尔2-0(2022)', last:'2022世界杯 厄瓜多尔2-0卡塔尔', highlight:'2022世界杯揭幕战 卡塔尔0-2厄瓜多尔' },
        '塞内加尔': { record:'塞内加尔 1胜 vs 卡塔尔 0平 · 0胜', wcMatches:'1次世界杯交手：塞内加尔3-1(2022)', last:'2022世界杯 塞内加尔3-1卡塔尔', highlight:'2022世界杯 塞内加尔3-1卡塔尔' },
        '日本': { record:'日本 1胜 vs 卡塔尔 1平 · 1胜', wcMatches:'世界杯无交手', last:'2019亚洲杯决赛 卡塔尔3-1日本', highlight:'2019亚洲杯 卡塔尔夺冠奇迹' },
        '沙特阿拉伯': { record:'卡塔尔 5胜 vs 沙特 4胜 · 5平', wcMatches:'世界杯无交手', last:'2022海湾杯 卡塔尔1-0沙特', highlight:'海湾德比·2022世界杯东道主' },
    },
    '科特迪瓦': {
        '阿根廷': { record:'阿根廷 2胜 vs 科特迪瓦 0平 · 0胜', wcMatches:'1次世界杯交手：阿根廷2-1(2006)', last:'2006世界杯 阿根廷2-1科特迪瓦', highlight:'2006世界杯 阿根廷2-1科特迪瓦' },
        '巴西': { record:'巴西 1胜 vs 科特迪瓦 0平 · 0胜', wcMatches:'1次世界杯交手：巴西3-1(2010)', last:'2010世界杯 巴西3-1科特迪瓦', highlight:'2010世界杯 巴西3-1科特迪瓦' },
        '荷兰': { record:'荷兰 2胜 vs 科特迪瓦 0平 · 0胜', wcMatches:'1次世界杯交手：荷兰2-1(2006)', last:'2006世界杯 荷兰2-1科特迪瓦', highlight:'2006世界杯 荷兰2-1科特迪瓦' },
        '葡萄牙': { record:'葡萄牙 1平 vs 科特迪瓦 0胜 · 0胜', wcMatches:'1次世界杯交手：葡萄牙0-0(2010)', last:'2010世界杯 葡萄牙0-0科特迪瓦', highlight:'2010世界杯 葡萄牙0-0科特迪瓦' },
        '塞内加尔': { record:'塞内加尔 3胜 vs 科特迪瓦 2胜 · 2平', wcMatches:'世界杯无交手', last:'2023非洲杯 科特迪瓦1(4)-(3)1塞内加尔', highlight:'西非劲旅·非洲杯冠军' },
    },
    '巴拿马': {
        '英格兰': { record:'英格兰 1胜 vs 巴拿马 0平 · 0胜', wcMatches:'1次世界杯交手：英格兰6-1(2018)', last:'2018世界杯 英格兰6-1巴拿马', highlight:'2018世界杯 英格兰6-1巴拿马' },
        '比利时': { record:'比利时 1胜 vs 巴拿马 0平 · 0胜', wcMatches:'1次世界杯交手：比利时3-0(2018)', last:'2018世界杯 比利时3-0巴拿马', highlight:'2018世界杯 比利时3-0巴拿马' },
        '突尼斯': { record:'突尼斯 1胜 vs 巴拿马 0平 · 0胜', wcMatches:'1次世界杯交手：突尼斯2-1(2018)', last:'2018世界杯 突尼斯2-1巴拿马', highlight:'2018世界杯 巴拿马首球创造历史' },
        '美国': { record:'美国 13胜 vs 巴拿马 0平 · 2胜', wcMatches:'世界杯无交手', last:'2024中北美国家联赛 美国2-0巴拿马', highlight:'2023金杯赛 巴拿马点球淘汰美国' },
    },
    '牙买加': {
        '美国': { record:'美国 19胜 vs 牙买加 3胜 · 10平', wcMatches:'世界杯无交手', last:'2024中北美国家联赛 美国1-0牙买加', highlight:'2015金杯赛 牙买加2-1美国进决赛' },
        '墨西哥': { record:'墨西哥 22胜 vs 牙买加 3胜 · 4平', wcMatches:'世界杯无交手', last:'2023金杯赛半决赛 墨西哥3-0牙买加', highlight:'加勒比足球代表·速度型球队' },
        '加拿大': { record:'加拿大 10胜 vs 牙买加 5胜 · 5平', wcMatches:'世界杯无交手', last:'2023金杯赛 加拿大1-0牙买加', highlight:'牙买加首次世界杯正赛亮相' },
    },
    '乌克兰': {
        '德国': { record:'德国 5胜 vs 乌克兰 0平 · 0胜', wcMatches:'世界杯无交手', last:'2020欧国联 德国3-1乌克兰', highlight:'2006世界杯 乌克兰闯入8强' },
        '意大利': { record:'意大利 7胜 vs 乌克兰 1平 · 0胜', wcMatches:'1次世界杯交手：意大利3-0(2006)', last:'2024欧预赛 意大利2-1乌克兰', highlight:'2006世界杯1/4决赛 意大利3-0乌克兰' },
        '西班牙': { record:'西班牙 5胜 vs 乌克兰 1平 · 0胜', wcMatches:'1次世界杯交手：西班牙4-0(2006)', last:'2020欧国联 西班牙4-0乌克兰', highlight:'2006世界杯 西班牙4-0乌克兰' },
        '英格兰': { record:'英格兰 5胜 vs 乌克兰 1平 · 0胜', wcMatches:'世界杯无交手', last:'2024欧预赛 英格兰2-0乌克兰', highlight:'2020欧洲杯 乌克兰闯入8强' },
        '波兰': { record:'波兰 5胜 vs 乌克兰 3胜 · 2平', wcMatches:'世界杯无交手', last:'2023友谊赛 波兰2-0乌克兰', highlight:'东欧邻居·足球传统对决' },
    },
    '加拿大': {
        '美国': { record:'美国 17胜 vs 加拿大 11胜 · 12平', wcMatches:'世界杯无交手', last:'2023金杯赛 美国2(3)-(2)2加拿大', highlight:'2022世预赛 加拿大36年来首进世界杯' },
        '墨西哥': { record:'墨西哥 16胜 vs 加拿大 4胜 · 5平', wcMatches:'世界杯无交手', last:'2024中北美国家联赛 加拿大0-2墨西哥', highlight:'2021世预赛 加拿大2-1墨西哥(冰雪之战)' },
        '英格兰': { record:'英格兰 2胜 vs 加拿大 0胜 · 0平', wcMatches:'世界杯无交手', last:'1986友谊赛 英格兰1-0加拿大', highlight:'1986世界杯 加拿大首次参赛' },
        '法国': { record:'法国 3胜 vs 加拿大 0胜 · 0平', wcMatches:'世界杯无交手', last:'2024友谊赛 加拿大0-0法国', highlight:'加拿大法语区渊源·2026世界杯东道主' },
        '哥斯达黎加': { record:'哥斯达黎加 12胜 vs 加拿大 8胜 · 5平', wcMatches:'世界杯无交手', last:'2024友谊赛 加拿大1-0哥斯达黎加', highlight:'中北美劲旅·多次世预赛交锋' },
        '比利时': { record:'比利时 2胜 vs 加拿大 0胜 · 0平', wcMatches:'1次世界杯交手：比利时1-0(2022)', last:'2022世界杯小组赛 比利时1-0加拿大', highlight:'2022世界杯 加拿大时隔36年重返' },
        '克罗地亚': { record:'克罗地亚 1胜 vs 加拿大 0胜 · 0平', wcMatches:'1次世界杯交手：克罗地亚4-1(2022)', last:'2022世界杯小组赛 克罗地亚4-1加拿大', highlight:'2022世界杯 克罗地亚4-1加拿大' },
    },
    '哥伦比亚': {
        '巴西': { record:'巴西 22胜 vs 哥伦比亚 4胜 · 9平', wcMatches:'3次世界杯交手：巴西2胜1平', last:'2021世预赛 巴西2-1哥伦比亚', highlight:'2014世界杯1/4决赛 巴西2-1哥伦比亚' },
        '阿根廷': { record:'阿根廷 21胜 vs 哥伦比亚 9胜 · 8平', wcMatches:'1次世界杯交手：阿根廷3-2(1994)', last:'2024美洲杯决赛 阿根廷1(4)-(2)1哥伦比亚', highlight:'2024美洲杯决赛 阿根廷点球夺冠' },
        '乌拉圭': { record:'乌拉圭 18胜 vs 哥伦比亚 10胜 · 10平', wcMatches:'1次世界杯交手：乌拉圭2-0(2014)', last:'2023世预赛 乌拉圭2-2哥伦比亚', highlight:'2014世界杯1/8决赛 乌拉圭2-0哥伦比亚' },
        '英格兰': { record:'英格兰 1胜 vs 哥伦比亚 0胜 · 1平', wcMatches:'1次世界杯交手：英格兰1(4)-(3)1(2018)', last:'2018世界杯1/8决赛 英格兰点球淘汰哥伦比亚', highlight:'2018世界杯 英格兰点球淘汰哥伦比亚' },
        '日本': { record:'哥伦比亚 2胜 vs 日本 1胜 · 1平', wcMatches:'2次世界杯交手：各1胜', last:'2018世界杯 日本2-1哥伦比亚', highlight:'2014世界杯 哥伦比亚4-1日本' },
        '塞内加尔': { record:'哥伦比亚 1胜 vs 塞内加尔 0胜 · 0平', wcMatches:'1次世界杯交手：哥伦比亚1-0(2018)', last:'2018世界杯 哥伦比亚1-0塞内加尔', highlight:'2018世界杯 哥伦比亚1-0塞内加尔出线' },
        '波兰': { record:'哥伦比亚 1胜 vs 波兰 0胜 · 0平', wcMatches:'1次世界杯交手：哥伦比亚3-0(2018)', last:'2018世界杯 哥伦比亚3-0波兰', highlight:'2018世界杯 哥伦比亚3-0波兰' },
    },
    '伊拉克': {
        '伊朗': { record:'伊朗 19胜 vs 伊拉克 7胜 · 11平', wcMatches:'世界杯无交手', last:'2024世预赛 伊朗1-0伊拉克', highlight:'西亚宿敌·波斯湾经典对决' },
        '韩国': { record:'韩国 8胜 vs 伊拉克 2胜 · 5平', wcMatches:'世界杯无交手', last:'2024世预赛 韩国3-2伊拉克', highlight:'2007亚洲杯半决赛 伊拉克1-0韩国' },
        '日本': { record:'日本 11胜 vs 伊拉克 2胜 · 3平', wcMatches:'世界杯无交手', last:'2024世预赛 日本3-0伊拉克', highlight:'2004亚洲杯 日本3-1伊拉克' },
        '沙特阿拉伯': { record:'沙特阿拉伯 8胜 vs 伊拉克 5胜 · 4平', wcMatches:'世界杯无交手', last:'2024海湾杯 沙特2-1伊拉克', highlight:'海湾杯宿敌·多次经典交锋' },
        '澳大利亚': { record:'澳大利亚 5胜 vs 伊拉克 2胜 · 3平', wcMatches:'世界杯无交手', last:'2021世预赛 澳大利亚1-0伊拉克', highlight:'2007亚洲杯 伊拉克3-1澳大利亚' },
        '卡塔尔': { record:'伊拉克 6胜 vs 卡塔尔 5胜 · 4平', wcMatches:'世界杯无交手', last:'2024海湾杯 伊拉克2-1卡塔尔', highlight:'海湾杯宿敌·西亚劲旅' },
    },
    '乌兹别克斯坦': {
        '伊朗': { record:'伊朗 9胜 vs 乌兹别克斯坦 2胜 · 3平', wcMatches:'世界杯无交手', last:'2024世预赛 伊朗3-2乌兹别克斯坦', highlight:'中亚宿敌·世预赛多次交锋' },
        '韩国': { record:'韩国 11胜 vs 乌兹别克斯坦 1胜 · 2平', wcMatches:'世界杯无交手', last:'2024世预赛 韩国3-1乌兹别克斯坦', highlight:'2011亚洲杯 乌兹别克斯坦2-1韩国' },
        '日本': { record:'日本 7胜 vs 乌兹别克斯坦 1胜 · 1平', wcMatches:'世界杯无交手', last:'2024友谊赛 日本4-0乌兹别克斯坦', highlight:'2011亚洲杯半决赛 日本2-2乌兹别克斯坦' },
        '澳大利亚': { record:'澳大利亚 4胜 vs 乌兹别克斯坦 1胜 · 0平', wcMatches:'世界杯无交手', last:'2024友谊赛 澳大利亚3-1乌兹别克斯坦', highlight:'2011亚洲杯 澳大利亚6-0乌兹别克斯坦' },
        '沙特阿拉伯': { record:'沙特阿拉伯 5胜 vs 乌兹别克斯坦 2胜 · 2平', wcMatches:'世界杯无交手', last:'2024世预赛 沙特1-1乌兹别克斯坦', highlight:'亚洲杯宿敌·中亚vs西亚' },
        '卡塔尔': { record:'乌兹别克斯坦 3胜 vs 卡塔尔 2胜 · 1平', wcMatches:'世界杯无交手', last:'2024世预赛 乌兹别克斯坦3-2卡塔尔', highlight:'亚洲杯多次交锋·西亚劲旅' },
    },
    '新西兰': {
        '澳大利亚': { record:'澳大利亚 7胜 vs 新西兰 3胜 · 5平', wcMatches:'世界杯无交手', last:'2024友谊赛 澳大利亚2-0新西兰', highlight:'大洋洲德比·跨塔斯曼海宿敌' },
        '墨西哥': { record:'墨西哥 3胜 vs 新西兰 0胜 · 0平', wcMatches:'1次世界杯交手：墨西哥2-1(2010)', last:'2014友谊赛 墨西哥2-1新西兰', highlight:'2010世界杯 墨西哥2-1新西兰' },
        '意大利': { record:'意大利 1胜 vs 新西兰 0胜 · 1平', wcMatches:'1次世界杯交手：意大利1-1(2010)', last:'2010世界杯 意大利1-1新西兰', highlight:'2010世界杯 新西兰逼平卫冕冠军意大利' },
        '巴拉圭': { record:'巴拉圭 1胜 vs 新西兰 0胜 · 0平', wcMatches:'1次世界杯交手：巴拉圭0-0(2010)', last:'2010世界杯 巴拉圭0-0新西兰', highlight:'2010世界杯 新西兰历史性3战不败' },
        '斯洛伐克': { record:'新西兰 1胜 vs 斯洛伐克 0胜 · 0平', wcMatches:'1次世界杯交手：新西兰1-1(2010)', last:'2010世界杯 新西兰1-1斯洛伐克', highlight:'2010世界杯 新西兰队史世界杯首分' },
        '法国': { record:'法国 2胜 vs 新西兰 0胜 · 0平', wcMatches:'世界杯无交手', last:'2017联合会杯 法国2-1新西兰', highlight:'2017联合会杯 法国2-1新西兰' },
    },
    '阿联酋': {
        '伊拉克': { record:'伊拉克 10胜 vs 阿联酋 6胜 · 5平', wcMatches:'世界杯无交手', last:'2024海湾杯 伊拉克1-1阿联酋', highlight:'海湾杯宿敌·多次经典交锋' },
        '沙特阿拉伯': { record:'沙特阿拉伯 7胜 vs 阿联酋 3胜 · 2平', wcMatches:'世界杯无交手', last:'2023海湾杯 沙特1-0阿联酋', highlight:'海湾德比·西亚足球劲旅' },
        '卡塔尔': { record:'卡塔尔 8胜 vs 阿联酋 4胜 · 2平', wcMatches:'世界杯无交手', last:'2024世预赛 卡塔尔3-2阿联酋', highlight:'海湾德比·2019亚洲杯半决赛' },
        '日本': { record:'日本 6胜 vs 阿联酋 1胜 · 2平', wcMatches:'世界杯无交手', last:'2024世预赛 日本5-0阿联酋', highlight:'2015亚洲杯 阿联酋季军' },
        '韩国': { record:'韩国 6胜 vs 阿联酋 1胜 · 2平', wcMatches:'世界杯无交手', last:'2024友谊赛 韩国3-1阿联酋', highlight:'2019亚洲杯1/4决赛 阿联酋1-0澳大利亚' },
        '澳大利亚': { record:'澳大利亚 3胜 vs 阿联酋 1胜 · 1平', wcMatches:'世界杯无交手', last:'2022世预赛附加赛 澳大利亚2-1阿联酋', highlight:'2022世预赛附加赛 澳大利亚2-1阿联酋' },
    },
    '马里': {
        '科特迪瓦': { record:'科特迪瓦 12胜 vs 马里 6胜 · 8平', wcMatches:'世界杯无交手', last:'2023非洲杯 科特迪瓦2-0马里', highlight:'西非劲旅·非洲杯多次交锋' },
        '塞内加尔': { record:'塞内加尔 7胜 vs 马里 3胜 · 5平', wcMatches:'世界杯无交手', last:'2023非洲杯 塞内加尔3-1马里', highlight:'西非劲旅·非洲杯传统对手' },
        '尼日利亚': { record:'尼日利亚 9胜 vs 马里 3胜 · 3平', wcMatches:'世界杯无交手', last:'2023友谊赛 尼日利亚3-0马里', highlight:'非洲杯宿敌·西非vs中非' },
        '埃及': { record:'埃及 5胜 vs 马里 1胜 · 3平', wcMatches:'世界杯无交手', last:'2021友谊赛 埃及1-0马里', highlight:'非洲杯多次交锋·北非vs西非' },
        '突尼斯': { record:'突尼斯 6胜 vs 马里 3胜 · 4平', wcMatches:'世界杯无交手', last:'2021非洲杯 突尼斯1-0马里', highlight:'非洲杯宿敌·2021非洲杯小组对决' },
        '摩洛哥': { record:'摩洛哥 5胜 vs 马里 2胜 · 3平', wcMatches:'世界杯无交手', last:'2023友谊赛 摩洛哥3-0马里', highlight:'非洲杯多次交锋·北非vs西非' },
        '阿尔及利亚': { record:'阿尔及利亚 6胜 vs 马里 3胜 · 3平', wcMatches:'世界杯无交手', last:'2022友谊赛 阿尔及利亚1-1马里', highlight:'非洲杯宿敌·北非vs西非' },
        '法国': { record:'法国 3胜 vs 马里 0胜 · 0平', wcMatches:'世界杯无交手', last:'2022友谊赛 法国1-0马里', highlight:'殖民历史渊源·法语区足球' },
    },
};
