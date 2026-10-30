/**
 * 少儿编程能力测评题库（每套 15 题）
 *
 * 设计原则：
 * - 不考记忆、不考计算速度、不考识字量、不考超纲数学知识
 * - 题目以图形为主，手机上一屏一题，点选即可作答
 * - 6～8 岁使用最后 4 题的「低龄替代题」，每次测试都是 15 题
 */

export type DimensionId = 'pattern' | 'logic' | 'sequence' | 'abstract' | 'debug' | 'method'
export type ItemType = 'choice' | 'sequence'
export type ItemTier = 'basic' | 'plus' | 'challenge'

export interface TestOption {
  label: string
  /** 图形选项上的大符号 */
  glyph?: string
}

export interface TestItem {
  id: string
  dimension: DimensionId
  tier: ItemTier
  type: ItemType
  /** 题目正文 */
  prompt: string
  /** 给家长看的补充说明（可折叠） */
  hint?: string
  /** 图形序列，空格分隔，渲染成一排格子 */
  visual?: string
  options: TestOption[]
  /** 单选类型的正确选项下标 */
  answer?: number
  /** 排序类型的正确顺序（按 label） */
  sequenceAnswer?: string[]
  /** 题目考察点，用于老师端与结果说明 */
  focus: string
  /** 是否仅用于 6～8 岁 */
  forYoung?: boolean
}

export interface DimensionMeta {
  id: DimensionId
  name: string
  short: string
  /** 这个维度在测什么 */
  description: string
  /** 对应的编程能力 */
  programming: string
}

export const dimensionMeta: DimensionMeta[] = [
  {
    id: 'pattern',
    name: '规律识别',
    short: '规律',
    description: '从图形与数字中找出重复和变化的结构',
    programming: '算法、循环',
  },
  {
    id: 'logic',
    name: '条件逻辑',
    short: '逻辑',
    description: '判断“如果…那么…”是否真的成立',
    programming: '条件判断 if / else',
  },
  {
    id: 'sequence',
    name: '步骤规划',
    short: '步骤',
    description: '把动作排成正确、可执行的顺序',
    programming: '程序结构、流程',
  },
  {
    id: 'abstract',
    name: '拆解抽象',
    short: '抽象',
    description: '分类、筛选、用符号代替具体的东西',
    programming: '变量、数据结构',
  },
  {
    id: 'debug',
    name: '纠错调试',
    short: '调试',
    description: '找出哪一步错了，并判断错在哪里',
    programming: '调试 debug',
  },
  {
    id: 'method',
    name: '方法意识',
    short: '方法',
    description: '面对大数量时，先想有没有更快的办法',
    programming: '算法优化',
  },
]

/** 15 道主卷（8 岁以上使用全部；6～8 岁把最后 4 题换成低龄替代题） */
export const mainItems: TestItem[] = [
  {
    id: 'm01',
    dimension: 'pattern',
    tier: 'basic',
    type: 'choice',
    prompt: '看这串图形，接下来应该是哪一个？',
    visual: '● ▲ ▲ ● ▲ ▲ ?',
    options: [{ label: '▲', glyph: '▲' }, { label: '●', glyph: '●' }, { label: '■', glyph: '■' }, { label: '◆', glyph: '◆' }],
    answer: 0,
    focus: '周期重复（每 3 个一循环）',
  },
  {
    id: 'm02',
    dimension: 'abstract',
    tier: 'basic',
    type: 'choice',
    prompt: '哪一组里的图形“全部都是圆形”？',
    options: [
      { label: '● ▲ ●', glyph: '● ▲ ●' },
      { label: '■ ■ ▲', glyph: '■ ■ ▲' },
      { label: '● ● ●', glyph: '● ● ●' },
      { label: '■ ● ▲', glyph: '■ ● ▲' },
    ],
    answer: 2,
    focus: '按属性筛选、分类',
  },
  {
    id: 'm03',
    dimension: 'sequence',
    tier: 'basic',
    type: 'sequence',
    prompt: '点一下，把“早上出门”的步骤排成正确的顺序（点错可以取消）',
    options: [{ label: '穿鞋' }, { label: '起床' }, { label: '刷牙' }, { label: '出门' }],
    sequenceAnswer: ['起床', '刷牙', '穿鞋', '出门'],
    focus: '顺序意识：先做什么、再做什么',
  },
  {
    id: 'm04',
    dimension: 'logic',
    tier: 'basic',
    type: 'choice',
    prompt: '小机器人只有一条规则：看到红灯就停下。现在它停下来了，一定是因为红灯吗？',
    options: [{ label: '一定是因为红灯' }, { label: '不一定，也可能是别的原因' }, { label: '一定不是红灯' }],
    answer: 1,
    focus: '逻辑严谨性（很多孩子会直接答“一定”）',
  },
  {
    id: 'm05',
    dimension: 'pattern',
    tier: 'plus',
    type: 'choice',
    prompt: '按规律填数：2、4、8、16、?',
    options: [{ label: '18' }, { label: '24' }, { label: '32' }, { label: '64' }],
    answer: 2,
    focus: '倍数递增',
  },
  {
    id: 'm06',
    dimension: 'logic',
    tier: 'plus',
    type: 'choice',
    prompt: '哪个数“是偶数，而且比 10 大”？',
    options: [{ label: '7' }, { label: '9' }, { label: '12' }, { label: '15' }],
    answer: 2,
    focus: '两个条件同时满足（and）',
  },
  {
    id: 'm07',
    dimension: 'sequence',
    tier: 'plus',
    type: 'choice',
    prompt: '机器人要走到星星那里，只允许“前进”和“转向”。哪一组指令是对的？',
    visual: '[机器人] ▢ ▢ [星星]',
    options: [
      { label: '前进 2 步' },
      { label: '前进 1 步，右转，前进 1 步' },
      { label: '右转 2 次，前进 1 步' },
      { label: '后退 2 步' },
    ],
    answer: 0,
    focus: '用最少的步骤达成目标（指令规划）',
  },
  {
    id: 'm08',
    dimension: 'abstract',
    tier: 'plus',
    type: 'choice',
    prompt: '★ = 3，并且 ★ + ★ + ◆ = 11，那么 ◆ 是多少？',
    options: [{ label: '3' }, { label: '5' }, { label: '6' }, { label: '8' }],
    answer: 1,
    focus: '用符号代表具体数量（变量的雏形）',
  },
  {
    id: 'm09',
    dimension: 'debug',
    tier: 'plus',
    type: 'choice',
    prompt: '机器人要去最右边的星星。它执行了：前进、前进、右转、前进，结果没到。哪一步出了问题？',
    visual: '[机器人] ▢ ▢ ▢ [星星]',
    options: [{ label: '第 1 步（前进）' }, { label: '第 2 步（前进）' }, { label: '第 3 步（右转）' }, { label: '第 4 步（前进）' }],
    answer: 2,
    focus: '定位错误位置，而不是全部重来',
  },
  {
    id: 'm10',
    dimension: 'pattern',
    tier: 'plus',
    type: 'choice',
    prompt: '按规律填数：1、1、2、3、5、?',
    options: [{ label: '6' }, { label: '7' }, { label: '8' }, { label: '10' }],
    answer: 2,
    focus: '前两项相加得到下一项（递推）',
  },
  {
    id: 'm11',
    dimension: 'method',
    tier: 'plus',
    type: 'choice',
    prompt: '要数出 1～100 里有多少个偶数，不用一个个数。你觉得最好的办法是？',
    options: [
      { label: '一个个数最保险' },
      { label: '找规律，直接算出来' },
      { label: '随便猜一个' },
      { label: '这题太难，跳过' },
    ],
    answer: 1,
    focus: '主动寻找方法，而不是硬算',
  },
  {
    id: 'm12',
    dimension: 'logic',
    tier: 'challenge',
    type: 'choice',
    prompt: '三个盒子里只有一个装了糖果，盒子上的话只有一句是真的。糖果在哪个盒子里？\n红盒：糖果在这里\n蓝盒：糖果不在红盒里\n绿盒：糖果不在这里',
    options: [{ label: '红盒子里' }, { label: '蓝盒子里' }, { label: '绿盒子里' }],
    answer: 2,
    focus: '真话 / 假话推理（排除法）',
  },
  {
    id: 'm13',
    dimension: 'debug',
    tier: 'challenge',
    type: 'choice',
    prompt: '这串数里有一个不符合规律，是哪一个？3、6、9、13、15',
    options: [{ label: '6' }, { label: '9' }, { label: '13' }, { label: '15' }],
    answer: 2,
    focus: '从一组数据里发现异常项',
  },
  {
    id: 'm14',
    dimension: 'pattern',
    tier: 'challenge',
    type: 'choice',
    prompt: '一台“神秘机器”：输入 1 得到 2，输入 2 得到 5，输入 3 得到 10，输入 4 得到 17。输入 5 会得到多少？',
    options: [{ label: '24' }, { label: '25' }, { label: '26' }, { label: '27' }],
    answer: 2,
    focus: '从结果反推规则（算法的核心动作）',
  },
  {
    id: 'm15',
    dimension: 'method',
    tier: 'challenge',
    type: 'choice',
    prompt: '如果题目变成“1～10000 里有多少个偶数”，你觉得最聪明的做法是什么？',
    options: [
      { label: '用计算器或电脑来算' },
      { label: '花一晚上慢慢数' },
      { label: '只数前 100 个，再猜' },
      { label: '这题没法做' },
    ],
    answer: 0,
    focus: '遇到繁重任务时，是否想到借助工具（编程兴趣的强信号）',
  },
]

/** 6～8 岁的替代题（替换主卷最后 4 题，保证每次仍然是 15 题） */
export const youngItems: TestItem[] = [
  {
    id: 'y12',
    dimension: 'logic',
    tier: 'plus',
    type: 'choice',
    prompt: '规则是：一个圆形后面跟一个三角形。哪一组符合规则？',
    options: [
      { label: '● ▲', glyph: '● ▲' },
      { label: '▲ ●', glyph: '▲ ●' },
      { label: '● ●', glyph: '● ●' },
      { label: '▲ ▲', glyph: '▲ ▲' },
    ],
    answer: 0,
    focus: '按规则判断顺序与搭配',
    forYoung: true,
  },
  {
    id: 'y13',
    dimension: 'debug',
    tier: 'plus',
    type: 'choice',
    prompt: '积木要按“红、黄、红、黄”排队，现在排成了“红、黄、红、红”。哪一块放错了？',
    options: [{ label: '第 1 块' }, { label: '第 2 块' }, { label: '第 3 块' }, { label: '第 4 块' }],
    answer: 3,
    focus: '发现不符合规则的那一个',
    forYoung: true,
  },
  {
    id: 'y14',
    dimension: 'pattern',
    tier: 'plus',
    type: 'choice',
    prompt: '接下来应该是哪一个？',
    visual: '■ ■ ● ■ ■ ● ?',
    options: [{ label: '●', glyph: '●' }, { label: '■', glyph: '■' }, { label: '▲', glyph: '▲' }],
    answer: 0,
    focus: '每 3 个一循环',
    forYoung: true,
  },
  {
    id: 'y15',
    dimension: 'method',
    tier: 'plus',
    type: 'choice',
    prompt: '碗里有 20 颗糖，要数出里面有多少颗红色的，你会怎么做？',
    options: [
      { label: '一颗一颗全部数一遍' },
      { label: '先把红色的挑出来，再数红色' },
      { label: '猜一个数' },
      { label: '不数了' },
    ],
    answer: 1,
    focus: '先分类再处理，减少工作量的直觉',
    forYoung: true,
  },
]

export const totalQuestionCount = 15

/** 6～8 岁：前 11 题共用，后 4 题换低龄版；8 岁以上：15 题主卷 */
export function buildPaper(age: AgeGroup): TestItem[] {
  if (age === '6-8') {
    return [...mainItems.slice(0, 11), ...youngItems]
  }
  return mainItems
}

export type AgeGroup = '6-8' | '8-10' | '10-12' | '12+'

export const ageOptions: { id: AgeGroup; label: string; note: string }[] = [
  { id: '6-8', label: '6～8 岁', note: '图形题为主，家长可读题' },
  { id: '8-10', label: '8～10 岁', note: '图形 + 简单文字题' },
  { id: '10-12', label: '10～12 岁', note: '加入推理题' },
  { id: '12+', label: '12 岁以上', note: '更接近信息学思维' },
]

/** 每个维度的结果解读（分高 / 中 / 低三档，低档也不写负面结论） */
export const dimensionAnalysis: Record<DimensionId, { high: string; mid: string; low: string }> = {
  pattern: {
    high: '能很快看出图形和数字里的重复结构，这类孩子学“循环”会非常顺。',
    mid: '能看出明显的规律，遇到需要多层推理的规律时还在建立感觉。',
    low: '规律类的题还在起步阶段，这属于可以练的能力，和天赋无关。',
  },
  logic: {
    high: '对“如果…那么…”的推理很严谨，能分清条件和结论，编程里的判断逻辑会很轻松。',
    mid: '单条件判断比较稳，多个条件同时出现时需要多想一会儿。',
    low: '条件类问题刚开始接触，建议先用生活中的规则练习“如果…就…”。',
  },
  sequence: {
    high: '能把步骤排得清楚有顺序，这正是程序“从上到下执行”的思维基础。',
    mid: '顺序意识已经建立，步骤变多时偶尔会漏掉一步。',
    low: '多步任务还需要引导，可以从“先做一件、再做一件”的日常小事练起。',
  },
  abstract: {
    high: '会用符号代表具体的东西，能主动分类筛选，这是“变量”概念的基础。',
    mid: '分类和替换基本能理解，抽象层次再高一点时需要提示。',
    low: '抽象题还在建立阶段，用实物或图形练习“一一对应”会很有帮助。',
  },
  debug: {
    high: '能准确指出哪一步出错，而不是全部推倒重来——这是学编程最值钱的能力。',
    mid: '能发现结果不对，定位到具体哪一步时还需要多一点时间。',
    low: '找错需要引导，可以从“对照正确例子找不同”开始练习。',
  },
  method: {
    high: '面对繁琐任务会主动找更省力的办法，甚至会想到“让工具来做”，这是算法思维的强信号。',
    mid: '知道要动脑筋找方法，选择的办法不一定最优。',
    low: '更习惯一步一步硬做，这很踏实，接下来可以多问一句“有没有更快的办法”。',
  },
}

/** 推荐起点 */
export const startPoints = {
  interest: {
    title: '建议起点：兴趣启蒙（图形化编程）',
    description:
      '先用图形化编程和小项目建立成就感，观察 1～2 个月，再决定是否进入代码阶段。',
    tags: ['图形化编程', '逻辑小游戏', '项目式体验'],
  },
  basic: {
    title: '建议起点：编程基础 + 算法启蒙',
    description:
      '从变量、条件、循环入手，配合简单算法题，建立“想清楚再动手”的习惯。',
    tags: ['变量 / 条件 / 循环', '算法启蒙', '小项目'],
  },
  advance: {
    title: '建议起点：C++ 起步，可衔接 GESP',
    description:
      '适合较早接触真实代码，可以把 GESP 等级认证作为阶段目标。',
    tags: ['C++ 起步', 'GESP 阶段目标', '算法思维'],
  },
} as const
