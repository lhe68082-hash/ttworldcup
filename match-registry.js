/**
 * 赛程注册表 - 供服务端和客户端共享
 * 包含所有104场比赛的ID和球队配对，用于实时数据匹配
 * 此文件在 Node.js 和浏览器中均可加载
 */

(function (root) {
    // 参赛球队 (48支) - 与 data.js TEAMS_DATA 保持严格一致
    const TEAMS = {
        A: ['墨西哥', '南非', '韩国', '捷克'],
        B: ['加拿大', '波黑', '卡塔尔', '瑞士'],
        C: ['巴西', '摩洛哥', '海地', '苏格兰'],
        D: ['美国', '巴拉圭', '澳大利亚', '土耳其'],
        E: ['德国', '库拉索', '科特迪瓦', '厄瓜多尔'],
        F: ['荷兰', '日本', '瑞典', '突尼斯'],
        G: ['比利时', '埃及', '伊朗', '新西兰'],
        H: ['西班牙', '佛得角', '沙特阿拉伯', '乌拉圭'],
        I: ['法国', '塞内加尔', '伊拉克', '挪威'],
        J: ['阿根廷', '阿尔及利亚', '奥地利', '约旦'],
        K: ['葡萄牙', '民主刚果', '乌兹别克斯坦', '哥伦比亚'],
        L: ['英格兰', '克罗地亚', '加纳', '巴拿马']
    };

    // 淘汰赛场次定义
    const KNOCKOUTS = [
        { stage: 'r32', name: '1/16决赛', count: 16 },
        { stage: 'r16', name: '1/8决赛', count: 8 },
        { stage: 'qf', name: '1/4决赛', count: 4 },
        { stage: 'sf', name: '半决赛', count: 2 },
        { stage: '3rd', name: '三四名决赛', count: 1 },
        { stage: 'final', name: '🏆 决赛', count: 1 },
    ];

    const registry = [];

    // 生成小组赛匹配 (72场)
    for (const [group, teams] of Object.entries(TEAMS)) {
        const pairs = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
        pairs.forEach((pair, pi) => {
            registry.push({
                id: `G${group}-${pi+1}`,
                stage: 'group',
                home: teams[pair[0]],
                away: teams[pair[1]],
            });
        });
    }

    // 生成淘汰赛占位 (32场, 球队为"待定")
    let koId = 0;
    for (const round of KNOCKOUTS) {
        for (let i = 0; i < round.count; i++) {
            registry.push({
                id: `${round.stage}-${i+1}`,
                stage: round.stage,
                home: '待定',
                away: '待定',
            });
        }
    }

    const MATCH_REGISTRY = registry;

    // 兼容 Node.js 和浏览器
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = MATCH_REGISTRY;
    } else {
        root.MATCH_REGISTRY = MATCH_REGISTRY;
    }
})(typeof self !== 'undefined' ? self : this);
