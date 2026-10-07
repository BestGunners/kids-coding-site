export interface BridgeRow {
  olympiad: string
  programming: string
  /** 一句话解释两者的迁移关系 */
  note: string
  icon: string
}

/** 奥数能力 → 编程能力 对照 */
export const bridgeRows: BridgeRow[] = [
  {
    olympiad: '找规律',
    programming: '算法',
    note: '从例子中归纳出通用做法，正是算法的第一步。',
    icon: 'search',
  },
  {
    olympiad: '分类讨论',
    programming: '条件判断',
    note: '把“什么情况下怎么做”写清楚，就是 if / else。',
    icon: 'git-branch',
  },
  {
    olympiad: '逻辑推理',
    programming: '程序逻辑',
    note: '推理链变成执行链：每一步都要能被验证。',
    icon: 'workflow',
  },
  {
    olympiad: '枚举尝试',
    programming: '循环',
    note: '人会漏、会累，计算机可以一个不漏地试完。',
    icon: 'repeat',
  },
  {
    olympiad: '抽象建模',
    programming: '数据结构',
    note: '用数字、数组、队列给现实问题“建个模型”。',
    icon: 'boxes',
  },
  {
    olympiad: '优化解法',
    programming: '算法优化',
    note: '从“能做出来”到“更快做出来”，是竞赛的分水岭。',
    icon: 'gauge',
  },
  {
    olympiad: '拆解复杂问题',
    programming: '程序设计',
    note: '大问题拆成小步骤，逐步实现、逐步验证。',
    icon: 'puzzle',
  },
]
