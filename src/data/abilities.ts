export interface AbilityModule {
  index: string
  title: string
  /** 一句话说明 */
  summary: string
  /** 家长能观察到的具体表现 */
  observable: string
  icon: string
}

export const abilityModules: AbilityModule[] = [
  {
    index: '01',
    title: '逻辑思维',
    summary: '把复杂问题拆成一步一步。',
    observable: '孩子能说清“先做什么、再做什么”，并发现中间漏掉的环节。',
    icon: 'list-ordered',
  },
  {
    index: '02',
    title: '算法思维',
    summary: '寻找更高效的解决方案。',
    observable: '同一道题，孩子会主动比较两种做法的快慢与优劣。',
    icon: 'trending-up',
  },
  {
    index: '03',
    title: '问题解决能力',
    summary: '从“知道答案”到“找到方法”。',
    observable: '面对没见过的题目，先尝试、再调整，而不是直接放弃。',
    icon: 'target',
  },
  {
    index: '04',
    title: '计算思维',
    summary: '学会利用计算机处理复杂问题。',
    observable: '遇到重复、繁琐的任务时，会想到“能不能让电脑来做”。',
    icon: 'cpu',
  },
]

/** 编程可以通向的方向（仅作视觉元素，不做过度宣传） */
export const abilityDestinations = ['游戏', 'AI', '机器人', '软件', '数据']
