export interface QuizOption {
  /** 选项文案 */
  label: string
  /** 得分 */
  score: number
  /** 选择后的一句观察提示，帮助家长判断 */
  note: string
}

export interface QuizQuestion {
  id: string
  index: number
  /** 题目 */
  title: string
  /** 给家长的解释，说明这道题在观察什么 */
  hint: string
  /** 图标键（由组件映射到图标组件） */
  icon: string
  options: QuizOption[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    index: 1,
    title: '孩子是否喜欢数学、奥数？',
    hint: '喜欢数字与图形之间的关系，是编程学习最自然的起点。',
    icon: 'calculator',
    options: [
      { label: '是，平时比较喜欢', score: 2, note: '对数字与规律有天然好感。' },
      { label: '有一点，谈不上特别喜欢', score: 1, note: '兴趣可以随着“能解决问题”的成就感建立。' },
      { label: '否，不太喜欢', score: 0, note: '编程同样可以从兴趣项目切入，不必经过数学。' },
    ],
  },
  {
    id: 'q2',
    index: 2,
    title: '遇到难题时，孩子是否愿意自己研究？',
    hint: '编程学习里，调试一个错误往往需要反复尝试，耐心比聪明更重要。',
    icon: 'puzzle',
    options: [
      { label: '是，会自己想办法', score: 2, note: '遇到卡点愿意停留，是编程学习最关键的品质。' },
      { label: '看情况，需要鼓励', score: 1, note: '适当的成就感与陪伴能明显提升坚持度。' },
      { label: '否，容易放弃', score: 0, note: '可以从非常短的、能立刻看到结果的小任务开始。' },
    ],
  },
  {
    id: 'q3',
    index: 3,
    title: '孩子是否喜欢寻找规律？',
    hint: '“找规律”是算法思维的雏形：从具体例子中抽象出通用做法。',
    icon: 'search',
    options: [
      { label: '是，常自己总结规律', score: 2, note: '抽象与归纳能力，会直接迁移到算法设计。' },
      { label: '有时会', score: 1, note: '在引导下可以逐步形成归纳习惯。' },
      { label: '否，很少', score: 0, note: '这项能力可以通过结构化训练慢慢培养。' },
    ],
  },
  {
    id: 'q4',
    index: 4,
    title: '孩子是否喜欢研究“为什么”？',
    hint: '程序不会说谎：为什么这样写能跑通、那样写会出错，都需要追问到底。',
    icon: 'lightbulb',
    options: [
      { label: '是，经常追着问原因', score: 2, note: '对原理的好奇心，是长期学习的动力源。' },
      { label: '偶尔会问', score: 1, note: '可以通过“可验证的小实验”激发追问。' },
      { label: '否，更在意结果', score: 0, note: '用能立刻看到效果的项目，更容易建立兴趣。' },
    ],
  },
  {
    id: 'q5',
    index: 5,
    title: '孩子是否喜欢电脑、游戏、机器人、科技产品？',
    hint: '兴趣是最好的入口：喜欢的东西，孩子愿意钻研得更久。',
    icon: 'cpu',
    options: [
      { label: '是，很感兴趣', score: 2, note: '从“玩”到“做”，是很好的转化机会。' },
      { label: '一般', score: 1, note: '可以先用一次体验课看看真实反应。' },
      { label: '否，兴趣不大', score: 0, note: '可以尝试用数学问题驱动的编程方式。' },
    ],
  },
  {
    id: 'q6',
    index: 6,
    title: '孩子是否喜欢把事情一步一步弄清楚？',
    hint: '编程的本质就是：把一件复杂的事，拆成计算机能一步步执行的指令。',
    icon: 'route',
    options: [
      { label: '是，喜欢有条理地做', score: 2, note: '步骤化表达的习惯，与程序设计高度契合。' },
      { label: '有一点', score: 1, note: '拆解能力可以通过流程图训练快速提升。' },
      { label: '否，比较随意', score: 0, note: '可以从“先做什么、再做什么”的日常小事切入。' },
    ],
  },
]

export const quizMaxScore = quizQuestions.reduce(
  (total, question) => total + Math.max(...question.options.map((option) => option.score)),
  0,
)

export type QuizLevel = 'A' | 'B' | 'C'

export interface QuizResult {
  level: QuizLevel
  /** 结果标签，例如「非常适合进一步了解编程」 */
  title: string
  /** 推荐程度 */
  recommendation: string
  /** 结果说明 */
  description: string
  /** 推荐学习方向 */
  direction: {
    title: string
    description: string
    tags: string[]
  }
  /** 下一步行动 */
  nextSteps: string[]
  /** 结果主色主题 */
  tone: 'brand' | 'positive' | 'warn'
}

const resultA: QuizResult = {
  level: 'A',
  title: '非常适合进一步了解编程',
  recommendation: '推荐程度：高 · 建议尽快安排一次系统体验',
  description:
    '孩子在逻辑思考、问题解决、探索兴趣方面表现较好，可以尝试系统接触编程。这类孩子通常在“把想法变成能运行的程序”这件事上，容易获得明显的成就感。',
  direction: {
    title: '建议方向：算法思维 + C++ 起步',
    description:
      '可以从编程基础与算法启蒙同步推进，学习过程中观察孩子对抽象符号（变量、循环、条件）的接受度，再决定是否进入 GESP / CSP 体系。',
    tags: ['编程基础', '算法启蒙', 'C++ 起步', '可衔接 GESP'],
  },
  nextSteps: [
    '先完成一次 60 分钟的真实编程体验，观察孩子独立完成任务的意愿',
    '让孩子做 2～3 道“数学题改写成程序”的题目，感受两种思路的差别',
    '与编程老师沟通一次，确认入门阶段的知识节奏与频率',
  ],
  tone: 'positive',
}

const resultB: QuizResult = {
  level: 'B',
  title: '值得尝试',
  recommendation: '推荐程度：中 · 建议用一次体验课来判断',
  description:
    '孩子具备一定的编程学习潜力，可以通过体验课进一步判断兴趣。目前的关键不是“有没有天赋”，而是孩子能否在动手过程中获得持续的成就感。',
  direction: {
    title: '建议方向：编程基础 + 算法启蒙',
    description:
      '从图形化或简单代码入手，先用小项目建立“程序由我控制”的直观感受，再逐步过渡到变量、条件判断与循环。',
    tags: ['编程基础', '图形化 / 简单代码', '小项目实践'],
  },
  nextSteps: [
    '预约一次体验课，重点观察孩子在动手环节的专注时长',
    '课后和孩子聊一聊：哪一步最有意思，哪一步最难',
    '根据体验结果，再决定学习频率与课程方向',
  ],
  tone: 'brand',
}

const resultC: QuizResult = {
  level: 'C',
  title: '可以先体验',
  recommendation: '推荐程度：建议先体验 · 不需要提前准备',
  description:
    '编程是否适合孩子，单靠测试无法判断。建议通过一次真实体验了解孩子的兴趣。很多孩子在纸上“看不出反应”，但一旦亲手让程序动起来，兴趣会立刻显现。',
  direction: {
    title: '建议方向：兴趣入门 · 先建立成就感',
    description:
      '从图形化编程或项目式小任务开始，把难度控制在“跳一跳够得着”的范围，先解决兴趣问题，再谈能力与竞赛。',
    tags: ['图形化编程', '项目式体验', '逻辑小游戏'],
  },
  nextSteps: [
    '预约一次体验课，全程不需要孩子提前准备任何知识',
    '不急于下结论，给孩子 2～3 次接触的机会',
    '与老师沟通孩子的性格特点，选择合适的入门方式',
  ],
  tone: 'warn',
}

export function resolveQuizResult(score: number): QuizResult {
  if (score >= 9) return resultA
  if (score >= 4) return resultB
  return resultC
}

/** 综合评分：0～100 */
export function toScorePercent(score: number): number {
  return Math.round((score / quizMaxScore) * 100)
}
