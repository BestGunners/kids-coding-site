export interface RoadmapStage {
  id: string
  /** 阶段名 */
  name: string
  /** 英文/缩写，用于视觉点缀 */
  code: string
  /** 适合年龄 */
  age: string
  /** 一句话说明 */
  summary: string
  /** 是否可点击查看详情 */
  clickable?: boolean
  /** 详情内容 */
  detail?: {
    /** 完整名称与主办方说明 */
    subtitle: string
    paragraphs: string[]
    points: string[]
  }
}

export const roadmapStages: RoadmapStage[] = [
  {
    id: 'interest',
    name: '兴趣启蒙',
    code: 'START',
    age: '6～8 岁',
    summary: '图形化编程、逻辑小游戏，让孩子先体验到“我能控制它”。',
  },
  {
    id: 'basic',
    name: '编程基础',
    code: 'BASIC',
    age: '8～10 岁',
    summary: '变量、条件判断、循环、函数：程序的四块积木。',
  },
  {
    id: 'cpp',
    name: 'C++ 学习',
    code: 'C++',
    age: '10 岁+',
    summary: '从图形化走向真实代码，开始与竞赛语言接轨。',
  },
  {
    id: 'gesp',
    name: 'GESP 等级考试',
    code: 'GESP',
    age: '10 岁+',
    summary: '把“学到了什么”变成看得见的阶段成果。',
    clickable: true,
    detail: {
      subtitle: '编程能力等级认证 · 由中国计算机学会（CCF）主办',
      paragraphs: [
        'GESP 是面向青少年的编程能力等级认证，C++ 方向分为多个级别，逐级考察从基础语法到算法与数据结构的掌握程度。',
        '对家长来说，它的价值在于：把长期、模糊的“学得怎么样”，变成阶段性的、可见的检验节点，也给孩子提供明确的小目标。',
      ],
      points: [
        '适合人群：已经完成 C++ 基础语法学习的孩子',
        '学习意义：以考促学，暴露知识漏洞，形成阶段性成就感',
        '与后续衔接：高级别内容与 CSP-J 的知识范围有重合，可作为过渡',
        '注意：级别设置与报名安排请以 CCF 当年官方通知为准',
      ],
    },
  },
  {
    id: 'cspj',
    name: 'CSP-J',
    code: 'CSP-J',
    age: '小学高年级～初中',
    summary: '入门级认证，信息学竞赛体系的重要入口。',
    clickable: true,
    detail: {
      subtitle: '入门级 · CCF CSP 非专业级别软件能力认证（入门级）',
      paragraphs: [
        'CSP-J 面向算法学习的入门阶段学生，通常分为第一轮（笔试/机试）与第二轮（上机编程）两个环节，考察基础算法与程序实现能力。',
        '它更像一次“真实检验”：能不能在有限时间内读懂题目、设计算法、写出正确且高效的程序。',
      ],
      points: [
        '知识范围：模拟、枚举、排序、二分、贪心、简单递归、基础数据结构等',
        '能力要求：代码实现能力 + 读题分析能力 + 调试能力',
        '准备周期：一般在完成 C++ 基础与算法启蒙后开始系统准备',
        '注意：认证形式、时间与报名方式请以 CCF 当年官方通知为准',
      ],
    },
  },
  {
    id: 'csps',
    name: 'CSP-S',
    code: 'CSP-S',
    age: '初中～高中',
    summary: '提高级认证，算法深度与思维难度的明显跃升。',
    clickable: true,
    detail: {
      subtitle: '提高级 · CCF CSP 非专业级别软件能力认证（提高级）',
      paragraphs: [
        'CSP-S 难度显著高于入门级，涉及更复杂的算法思想与数据结构，对数学基础、思维深度与代码能力都有更高要求。',
        '这一阶段的学习节奏会明显放慢：同一道题可能要经历读题、建模、验证、优化的完整过程，这也是竞赛训练最有价值的部分。',
      ],
      points: [
        '知识范围：动态规划、图论、复杂数据结构、数论与组合数学等',
        '学习特点：从“会写”走向“会想”，更强调算法设计与复杂度分析',
        '衔接方向：常作为进入更高层次信息学竞赛的必经环节',
        '注意：难度跨度较大，建议在老师评估后规划节奏，避免拔苗助长',
      ],
    },
  },
  {
    id: 'noi',
    name: '信息学竞赛',
    code: 'OI',
    age: '中学阶段',
    summary: '更高层次的算法竞赛，考察长期积累与思维深度。',
  },
  {
    id: 'cs',
    name: '算法与计算机科学',
    code: 'CS',
    age: '长期方向',
    summary: '把算法思维延续到人工智能、软件工程与计算科学的长期兴趣。',
  },
]

export interface Track {
  id: string
  name: string
  /** 适合什么样的孩子 */
  audience: string
  steps: string[]
  icon: string
}

export const tracks: Track[] = [
  {
    id: 'interest',
    name: '兴趣路线',
    audience: '喜欢动手、喜欢做出作品的孩子',
    steps: ['编程', '游戏', 'AI', '机器人', '软件'],
    icon: 'gamepad',
  },
  {
    id: 'ability',
    name: '能力路线',
    audience: '希望提升思维与学习能力的孩子',
    steps: ['逻辑思维', '算法思维', '计算思维'],
    icon: 'brain',
  },
  {
    id: 'contest',
    name: '竞赛路线',
    audience: '数学基础扎实、愿意接受挑战的孩子',
    steps: ['C++', 'GESP', 'CSP-J / S', '信息学竞赛'],
    icon: 'trophy',
  },
]

export const roadmapNotice =
  '竞赛与等级认证的相关政策每年可能调整，具体报名时间、级别设置与考试形式，请以主办单位当年发布的官方通知为准。'
