/**
 * 少儿编程能力测评题库
 *
 * 四个年龄段各一套 15 题（6～8 / 8～10 / 10～12 / 12+），
 * 每套都覆盖 6 个维度：规律识别、条件逻辑、步骤规划、拆解抽象、纠错调试、方法意识。
 */

export type DimensionId = 'pattern' | 'logic' | 'sequence' | 'abstract' | 'debug' | 'method'
export type ItemType = 'choice' | 'sequence'
export type ItemTier = 'basic' | 'plus' | 'challenge'
export type AgeGroup = '6-8' | '8-10' | '10-12' | '12+'

export interface TestOption {
  label: string
  /** 图形选项上的大符号 */
  glyph?: string
}

/** 机器人走格子的图形场景 */
export interface GridScene {
  cols: number
  rows: number
  start: { x: number; y: number }
  goal: { x: number; y: number }
  walls?: { x: number; y: number }[]
}

export interface TestItem {
  id: string
  dimension: DimensionId
  tier: ItemTier
  type: ItemType
  prompt: string
  /** 图形序列，空格分隔，渲染成一排格子 */
  visual?: string
  /** 机器人走格子图 */
  grid?: GridScene
  options: TestOption[]
  answer?: number
  sequenceAnswer?: string[]
  focus: string
}

export interface DimensionMeta {
  id: DimensionId
  name: string
  short: string
  description: string
  programming: string
}

export const dimensionMeta: DimensionMeta[] = [
  { id: 'pattern', name: '规律识别', short: '规律', description: '从图形与数字中找出重复和变化的结构', programming: '算法、循环' },
  { id: 'logic', name: '条件逻辑', short: '逻辑', description: '判断“如果…那么…”是否真的成立', programming: '条件判断 if / else' },
  { id: 'sequence', name: '步骤规划', short: '步骤', description: '把动作排成正确、可执行的顺序', programming: '程序结构、流程' },
  { id: 'abstract', name: '拆解抽象', short: '抽象', description: '分类、筛选、用符号代替具体的东西', programming: '变量、数据结构' },
  { id: 'debug', name: '纠错调试', short: '调试', description: '找出哪一步错了，并判断错在哪里', programming: '调试 debug' },
  { id: 'method', name: '方法意识', short: '方法', description: '面对大数量时，先想有没有更快的办法', programming: '算法优化' },
]

export const ageOptions: { id: AgeGroup; label: string; note: string }[] = [
  { id: '6-8', label: '6～8 岁', note: '图形题为主，家长可读题' },
  { id: '8-10', label: '8～10 岁', note: '图形 + 简单文字题' },
  { id: '10-12', label: '10～12 岁', note: '加入推理题' },
  { id: '12+', label: '12 岁以上', note: '更接近信息学思维' },
]

/* ---------------- 6～8 岁：全图形 ---------------- */
const paperA: TestItem[] = [
  {
    id: 'a01', dimension: 'pattern', tier: 'basic', type: 'choice',
    prompt: '接下来应该是哪一个？',
    visual: '● ▲ ▲ ● ▲ ▲ ?',
    options: [{ label: '▲', glyph: '▲' }, { label: '●', glyph: '●' }, { label: '■', glyph: '■' }, { label: '◆', glyph: '◆' }],
    answer: 0, focus: '图形周期（3 个一循环）',
  },
  {
    id: 'a02', dimension: 'pattern', tier: 'basic', type: 'choice',
    prompt: '方块越来越多，接下来是哪一个？',
    visual: '■ ■■ ■■■ ?',
    options: [{ label: '■■■■', glyph: '■■■■' }, { label: '■■■', glyph: '■■■' }, { label: '■', glyph: '■' }],
    answer: 0, focus: '数量递增',
  },
  {
    id: 'a03', dimension: 'pattern', tier: 'basic', type: 'choice',
    prompt: '下一个是什么？',
    visual: '★ ● ★ ● ★ ?',
    options: [{ label: '●', glyph: '●' }, { label: '★', glyph: '★' }, { label: '■', glyph: '■' }],
    answer: 0, focus: '交替规律',
  },
  {
    id: 'a04', dimension: 'abstract', tier: 'basic', type: 'choice',
    prompt: '哪一组图形全是圆形？',
    options: [{ label: '● ▲ ●', glyph: '● ▲ ●' }, { label: '■ ■ ▲', glyph: '■ ■ ▲' }, { label: '● ● ●', glyph: '● ● ●' }, { label: '■ ● ▲', glyph: '■ ● ▲' }],
    answer: 2, focus: '按属性筛选',
  },
  {
    id: 'a05', dimension: 'abstract', tier: 'basic', type: 'choice',
    prompt: '哪一个是三角形？',
    options: [{ label: '●', glyph: '●' }, { label: '▲', glyph: '▲' }, { label: '■', glyph: '■' }, { label: '◆', glyph: '◆' }],
    answer: 1, focus: '形状辨认',
  },
  {
    id: 'a06', dimension: 'sequence', tier: 'basic', type: 'sequence',
    prompt: '把“早上出门”的步骤排成正确顺序',
    options: [{ label: '穿鞋' }, { label: '起床' }, { label: '刷牙' }, { label: '出门' }],
    sequenceAnswer: ['起床', '刷牙', '穿鞋', '出门'], focus: '顺序意识',
  },
  {
    id: 'a07', dimension: 'sequence', tier: 'basic', type: 'choice',
    prompt: '机器人走到星星，要走几格？',
    grid: { cols: 5, rows: 1, start: { x: 0, y: 0 }, goal: { x: 3, y: 0 } },
    options: [{ label: '2 格' }, { label: '3 格' }, { label: '4 格' }, { label: '5 格' }],
    answer: 1, focus: '数格子、建立位置感',
  },
  {
    id: 'a08', dimension: 'sequence', tier: 'basic', type: 'sequence',
    prompt: '把积木从大到小排队',
    options: [{ label: '中积木' }, { label: '小积木' }, { label: '大积木' }],
    sequenceAnswer: ['大积木', '中积木', '小积木'], focus: '按规则排序',
  },
  {
    id: 'a09', dimension: 'logic', tier: 'basic', type: 'choice',
    prompt: '规则是：一个圆形后面跟一个三角形。哪一组符合规则？',
    options: [{ label: '● ▲', glyph: '● ▲' }, { label: '▲ ●', glyph: '▲ ●' }, { label: '● ●', glyph: '● ●' }, { label: '▲ ▲', glyph: '▲ ▲' }],
    answer: 0, focus: '按规则判断搭配',
  },
  {
    id: 'a10', dimension: 'logic', tier: 'basic', type: 'choice',
    prompt: '机器人只有一条规则：看到红灯就停下。它停下了，一定是因为红灯吗？',
    options: [{ label: '一定是因为红灯' }, { label: '不一定，也可能是别的原因' }, { label: '一定不是红灯' }],
    answer: 1, focus: '逻辑严谨性',
  },
  {
    id: 'a11', dimension: 'logic', tier: 'basic', type: 'choice',
    prompt: '哪一组正好有 2 个圆形？',
    options: [{ label: '●', glyph: '●' }, { label: '●●', glyph: '●●' }, { label: '●●●', glyph: '●●●' }, { label: '●▲●', glyph: '●▲●' }],
    answer: 1, focus: '数量条件',
  },
  {
    id: 'a12', dimension: 'debug', tier: 'basic', type: 'choice',
    prompt: '积木要按“红、黄、红、黄”排队，现在排成了“红、黄、红、红”。哪一块放错了？',
    options: [{ label: '第 1 块' }, { label: '第 2 块' }, { label: '第 3 块' }, { label: '第 4 块' }],
    answer: 3, focus: '发现不符合规则的位置',
  },
  {
    id: 'a13', dimension: 'debug', tier: 'basic', type: 'choice',
    prompt: '车厢按“红、红、黄”重复，现在有一节错了。哪一节错了？',
    visual: '红 红 黄 红 红 黄 红 红 红',
    options: [{ label: '第 3 节' }, { label: '第 6 节' }, { label: '第 9 节' }],
    answer: 2, focus: '在序列中找异常',
  },
  {
    id: 'a14', dimension: 'method', tier: 'basic', type: 'choice',
    prompt: '碗里有 20 颗糖，要数出红色糖有几颗，你会怎么做？',
    options: [{ label: '一颗一颗全部数一遍' }, { label: '先把红色的挑出来再数' }, { label: '猜一个数' }, { label: '不数了' }],
    answer: 1, focus: '先分类再处理',
  },
  {
    id: 'a15', dimension: 'method', tier: 'basic', type: 'choice',
    prompt: '纸上有很多图形，要数出三角形有几个，哪种做法最快？',
    options: [{ label: '从头到尾一个个看' }, { label: '先把三角形挑出来再数' }, { label: '随便猜' }, { label: '不做' }],
    answer: 1, focus: '分类计数的直觉',
  },
]

/* ---------------- 8～10 岁 ---------------- */
const paperB: TestItem[] = [
  {
    id: 'b01', dimension: 'pattern', tier: 'plus', type: 'choice',
    prompt: '按规律填数：2、4、8、16、?',
    options: [{ label: '18' }, { label: '24' }, { label: '32' }, { label: '64' }],
    answer: 2, focus: '倍数递增',
  },
  {
    id: 'b02', dimension: 'pattern', tier: 'plus', type: 'choice',
    prompt: '1、1、2、3、5、?',
    options: [{ label: '6' }, { label: '7' }, { label: '8' }, { label: '10' }],
    answer: 2, focus: '前两项相加（递推）',
  },
  {
    id: 'b03', dimension: 'pattern', tier: 'plus', type: 'choice',
    prompt: '接下来应该是哪一个？',
    visual: '● ▲ ■ ● ▲ ■ ?',
    options: [{ label: '●', glyph: '●' }, { label: '▲', glyph: '▲' }, { label: '■', glyph: '■' }],
    answer: 0, focus: '4 个一循环的图形序列',
  },
  {
    id: 'b04', dimension: 'logic', tier: 'plus', type: 'choice',
    prompt: '哪个数“是偶数，而且比 10 大”？',
    options: [{ label: '7' }, { label: '9' }, { label: '12' }, { label: '15' }],
    answer: 2, focus: '两个条件同时满足',
  },
  {
    id: 'b05', dimension: 'logic', tier: 'plus', type: 'choice',
    prompt: '老师说“下雨就带伞”。小明带伞了，一定下雨了吗？',
    options: [{ label: '一定下雨了' }, { label: '不一定' }, { label: '一定没下雨' }],
    answer: 1, focus: '条件和结论的方向',
  },
  {
    id: 'b06', dimension: 'logic', tier: 'plus', type: 'choice',
    prompt: '买儿童票的规则：身高超过 1.3 米，或者有家长陪同。哪种情况买不了？',
    options: [{ label: '1.4 米，自己来' }, { label: '1.25 米，有家长陪同' }, { label: '1.25 米，自己来' }, { label: '1.5 米，有家长陪同' }],
    answer: 2, focus: '“或”的条件判断',
  },
  {
    id: 'b07', dimension: 'sequence', tier: 'plus', type: 'choice',
    prompt: '机器人要走到星星，最少要走几格？',
    grid: { cols: 3, rows: 3, start: { x: 0, y: 2 }, goal: { x: 2, y: 0 } },
    options: [{ label: '3 格' }, { label: '4 格' }, { label: '5 格' }, { label: '6 格' }],
    answer: 1, focus: '规划最短路线',
  },
  {
    id: 'b08', dimension: 'sequence', tier: 'plus', type: 'sequence',
    prompt: '把煎鸡蛋的步骤排好',
    options: [{ label: '热锅' }, { label: '倒油' }, { label: '打蛋' }, { label: '下锅' }, { label: '出锅' }],
    sequenceAnswer: ['热锅', '倒油', '打蛋', '下锅', '出锅'], focus: '多步骤排序',
  },
  {
    id: 'b09', dimension: 'sequence', tier: 'plus', type: 'choice',
    prompt: '要让机器人连续前进 4 次，哪种写法最简洁？',
    options: [{ label: '写 4 次“前进”' }, { label: '重复 4 次：前进' }, { label: '前进 1 次' }, { label: '一直转圈' }],
    answer: 1, focus: '循环的直觉',
  },
  {
    id: 'b10', dimension: 'abstract', tier: 'plus', type: 'choice',
    prompt: '★ = 3，并且 ★ + ★ + ◆ = 11，那么 ◆ 是多少？',
    options: [{ label: '3' }, { label: '5' }, { label: '6' }, { label: '8' }],
    answer: 1, focus: '用符号代表数量（变量雏形）',
  },
  {
    id: 'b11', dimension: 'abstract', tier: 'plus', type: 'choice',
    prompt: '这组图形里有几个三角形？',
    visual: '▲ ● ▲ ■ ●',
    options: [{ label: '1 个' }, { label: '2 个' }, { label: '3 个' }, { label: '4 个' }],
    answer: 1, focus: '按形状筛选计数',
  },
  {
    id: 'b12', dimension: 'debug', tier: 'plus', type: 'choice',
    prompt: '这串数里有一个不符合规律，是哪一个？3、6、9、13、15',
    options: [{ label: '6' }, { label: '9' }, { label: '13' }, { label: '15' }],
    answer: 2, focus: '发现异常项',
  },
  {
    id: 'b13', dimension: 'debug', tier: 'plus', type: 'choice',
    prompt: '机器人要去星星那里，执行了：前进、前进、右转、前进，结果没到。哪一步错了？',
    grid: { cols: 5, rows: 1, start: { x: 0, y: 0 }, goal: { x: 3, y: 0 } },
    options: [{ label: '第 1 步（前进）' }, { label: '第 2 步（前进）' }, { label: '第 3 步（右转）' }, { label: '第 4 步（前进）' }],
    answer: 2, focus: '定位出错的那一步',
  },
  {
    id: 'b14', dimension: 'method', tier: 'plus', type: 'choice',
    prompt: '要数出 1～100 里有多少个偶数，不用一个个数。最好的办法是？',
    options: [{ label: '一个个数最保险' }, { label: '找规律，直接算出来' }, { label: '随便猜一个' }, { label: '跳过这题' }],
    answer: 1, focus: '主动找方法',
  },
  {
    id: 'b15', dimension: 'method', tier: 'plus', type: 'choice',
    prompt: '1～100 里有多少个 3 的倍数？',
    options: [{ label: '30 个' }, { label: '33 个' }, { label: '34 个' }, { label: '50 个' }],
    answer: 1, focus: '用规律计数，而不是硬数',
  },
]

/* ---------------- 10～12 岁 ---------------- */
const paperC: TestItem[] = [
  {
    id: 'c01', dimension: 'pattern', tier: 'challenge', type: 'choice',
    prompt: '一台“神秘机器”：输入 1 得到 2，输入 2 得到 5，输入 3 得到 10，输入 4 得到 17。输入 5 得到多少？',
    options: [{ label: '24' }, { label: '25' }, { label: '26' }, { label: '27' }],
    answer: 2, focus: '从结果反推规则',
  },
  {
    id: 'c02', dimension: 'pattern', tier: 'plus', type: 'choice',
    prompt: '2、6、12、20、?',
    options: [{ label: '28' }, { label: '30' }, { label: '32' }, { label: '36' }],
    answer: 1, focus: '差为连续偶数（n²+n）',
  },
  {
    id: 'c03', dimension: 'pattern', tier: 'plus', type: 'choice',
    prompt: '1、4、9、16、?',
    options: [{ label: '20' }, { label: '24' }, { label: '25' }, { label: '36' }],
    answer: 2, focus: '平方数',
  },
  {
    id: 'c04', dimension: 'logic', tier: 'challenge', type: 'choice',
    prompt: '三个盒子只有一个装了糖果，盒子上的话只有一句是真的。糖果在哪个盒子里？\n红盒：糖果在这里\n蓝盒：糖果不在红盒里\n绿盒：糖果不在这里',
    options: [{ label: '红盒子' }, { label: '蓝盒子' }, { label: '绿盒子' }],
    answer: 2, focus: '真假话推理（排除法）',
  },
  {
    id: 'c05', dimension: 'logic', tier: 'plus', type: 'choice',
    prompt: '哪个数同时满足：是 3 的倍数、不是偶数、比 10 大？',
    options: [{ label: '9' }, { label: '12' }, { label: '15' }, { label: '18' }],
    answer: 2, focus: '多条件组合筛选',
  },
  {
    id: 'c06', dimension: 'logic', tier: 'plus', type: 'choice',
    prompt: '灯亮的规则：三个开关里至少两个打开。现在 1 号、3 号打开，2 号关闭，灯亮吗？',
    options: [{ label: '亮' }, { label: '不亮' }, { label: '不能确定' }],
    answer: 0, focus: '“至少”条件判断',
  },
  {
    id: 'c07', dimension: 'sequence', tier: 'challenge', type: 'choice',
    prompt: '绕开深色格子，机器人最少走几格能到星星？',
    grid: { cols: 4, rows: 3, start: { x: 0, y: 0 }, goal: { x: 3, y: 2 }, walls: [{ x: 1, y: 1 }, { x: 2, y: 1 }] },
    options: [{ label: '4 格' }, { label: '5 格' }, { label: '6 格' }, { label: '7 格' }],
    answer: 1, focus: '带障碍的路线规划',
  },
  {
    id: 'c08', dimension: 'sequence', tier: 'plus', type: 'choice',
    prompt: '要连续前进 4 次，程序里怎么写最合理？',
    options: [{ label: '重复 4 次：前进' }, { label: '只写一次前进' }, { label: '写 4 遍相同代码' }, { label: '重复 2 次：前进' }],
    answer: 0, focus: '循环结构',
  },
  {
    id: 'c09', dimension: 'sequence', tier: 'plus', type: 'sequence',
    prompt: '按顺序排好“求平均数”的步骤',
    options: [{ label: '把数加起来' }, { label: '数一共有几个数' }, { label: '总和除以个数' }, { label: '得到平均数' }],
    sequenceAnswer: ['把数加起来', '数一共有几个数', '总和除以个数', '得到平均数'], focus: '算法步骤的先后',
  },
  {
    id: 'c10', dimension: 'abstract', tier: 'plus', type: 'choice',
    prompt: '表格：第 1 行 3 5 7；第 2 行 4 6 8；第 3 行 9 2 1。第 3 行第 2 列是多少？',
    options: [{ label: '5' }, { label: '9' }, { label: '2' }, { label: '8' }],
    answer: 2, focus: '二维坐标 / 数组下标直觉',
  },
  {
    id: 'c11', dimension: 'abstract', tier: 'plus', type: 'choice',
    prompt: 'a = 3，b = a + 2，那么 a × b 等于多少？',
    options: [{ label: '9' }, { label: '12' }, { label: '15' }, { label: '18' }],
    answer: 2, focus: '变量赋值与替换',
  },
  {
    id: 'c12', dimension: 'debug', tier: 'challenge', type: 'choice',
    prompt: '要让数字 1 到 10 都被处理，循环写成 i < 10 会怎样？',
    options: [{ label: '少处理 10 这一个数' }, { label: '多处理一个数' }, { label: '完全没影响' }, { label: '程序报错' }],
    answer: 0, focus: '边界条件 (off-by-one)',
  },
  {
    id: 'c13', dimension: 'debug', tier: 'plus', type: 'choice',
    prompt: '同一条算式 2 + 3 × 4，先算乘法还是先算加法，结果不同。正确结果是多少？',
    options: [{ label: '14' }, { label: '20' }, { label: '9' }, { label: '24' }],
    answer: 0, focus: '执行顺序',
  },
  {
    id: 'c14', dimension: 'method', tier: 'challenge', type: 'choice',
    prompt: '如果题目变成“1～10000 里有多少个偶数”，最聪明的做法是？',
    options: [{ label: '用计算器或电脑来算' }, { label: '花一晚上慢慢数' }, { label: '只数前 100 个再猜' }, { label: '这题没法做' }],
    answer: 0, focus: '借助工具（编程兴趣强信号）',
  },
  {
    id: 'c15', dimension: 'method', tier: 'plus', type: 'choice',
    prompt: '从 100 个数里找出最大的一个，至少要比多少次？',
    options: [{ label: '1 次' }, { label: '50 次' }, { label: '99 次' }, { label: '100 次' }],
    answer: 2, focus: '算法效率的直觉',
  },
]

/* ---------------- 12 岁以上 ---------------- */
const paperD: TestItem[] = [
  {
    id: 'd01', dimension: 'pattern', tier: 'challenge', type: 'choice',
    prompt: '1、3、7、15、31、?',
    options: [{ label: '47' }, { label: '63' }, { label: '64' }, { label: '127' }],
    answer: 1, focus: '×2 + 1 的递推',
  },
  {
    id: 'd02', dimension: 'pattern', tier: 'challenge', type: 'choice',
    prompt: '2、3、5、8、13、?',
    options: [{ label: '18' }, { label: '20' }, { label: '21' }, { label: '23' }],
    answer: 2, focus: '差值为斐波那契式的递推',
  },
  {
    id: 'd03', dimension: 'pattern', tier: 'plus', type: 'choice',
    prompt: '1、1、3、5、9、?',
    options: [{ label: '13' }, { label: '14' }, { label: '15' }, { label: '17' }],
    answer: 2, focus: '前两项相加再加 1',
  },
  {
    id: 'd04', dimension: 'logic', tier: 'challenge', type: 'choice',
    prompt: '四个孩子站成一排：A 在 B 左边，B 在 C 左边，D 在 A 左边。谁在最右边？',
    options: [{ label: 'A' }, { label: 'B' }, { label: 'C' }, { label: 'D' }],
    answer: 2, focus: '关系推理',
  },
  {
    id: 'd05', dimension: 'logic', tier: 'challenge', type: 'choice',
    prompt: '已知“如果下雨，就带伞”。现在他没有带伞，可以推出什么？',
    options: [{ label: '一定下雨了' }, { label: '一定没下雨' }, { label: '不能确定' }],
    answer: 1, focus: '逆否命题',
  },
  {
    id: 'd06', dimension: 'logic', tier: 'challenge', type: 'choice',
    prompt: '“不是（小明和小红都及格）”这句话等价于？',
    options: [{ label: '两人都没及格' }, { label: '至少有一人没及格' }, { label: '两人都及格了' }],
    answer: 1, focus: '命题取反（德摩根律）',
  },
  {
    id: 'd07', dimension: 'sequence', tier: 'challenge', type: 'choice',
    prompt: '绕开深色格子，机器人最少走几格到星星？',
    grid: { cols: 3, rows: 3, start: { x: 0, y: 0 }, goal: { x: 2, y: 2 }, walls: [{ x: 1, y: 0 }] },
    options: [{ label: '3 格' }, { label: '4 格' }, { label: '5 格' }, { label: '6 格' }],
    answer: 1, focus: '最短路规划',
  },
  {
    id: 'd08', dimension: 'sequence', tier: 'plus', type: 'choice',
    prompt: '从 0 开始，重复 5 次“加 2”，最后是多少？',
    options: [{ label: '7' }, { label: '8' }, { label: '10' }, { label: '12' }],
    answer: 2, focus: '循环执行次数',
  },
  {
    id: 'd09', dimension: 'sequence', tier: 'plus', type: 'sequence',
    prompt: '排好“找一组数里最大值”的步骤',
    options: [{ label: '先假设第一个数是最大值' }, { label: '看下一个数' }, { label: '更大就替换' }, { label: '全部看完' }],
    sequenceAnswer: ['先假设第一个数是最大值', '看下一个数', '更大就替换', '全部看完'], focus: '算法流程设计',
  },
  {
    id: 'd10', dimension: 'abstract', tier: 'challenge', type: 'choice',
    prompt: '数组 a = [5, 8, 2, 9]，下标从 0 开始。a[3] 是多少？',
    options: [{ label: '2' }, { label: '5' }, { label: '8' }, { label: '9' }],
    answer: 3, focus: '数组下标',
  },
  {
    id: 'd11', dimension: 'abstract', tier: 'plus', type: 'choice',
    prompt: '在 1～6 里，“是 3 的倍数或者是偶数”的数有几个？',
    options: [{ label: '3 个' }, { label: '4 个' }, { label: '5 个' }, { label: '6 个' }],
    answer: 1, focus: '集合筛选与去重',
  },
  {
    id: 'd12', dimension: 'debug', tier: 'challenge', type: 'choice',
    prompt: '要让 1～100 全部判断一遍，循环条件写成 i < 100 会漏掉哪个数？',
    options: [{ label: '1' }, { label: '50' }, { label: '99' }, { label: '100' }],
    answer: 3, focus: '边界条件',
  },
  {
    id: 'd13', dimension: 'debug', tier: 'plus', type: 'choice',
    prompt: '程序要把 10 个数都加起来，循环却少跑了一次，结果会怎样？',
    options: [{ label: '结果偏大' }, { label: '结果偏小' }, { label: '没有影响' }, { label: '程序报错' }],
    answer: 1, focus: '循环次数错误的影响',
  },
  {
    id: 'd14', dimension: 'method', tier: 'challenge', type: 'choice',
    prompt: '在已经排好序的 1～100 里找一个数，最快的方法是？',
    options: [{ label: '从 1 开始一个个找' }, { label: '每次从中间猜，砍掉一半' }, { label: '随便猜' }, { label: '全部看完再找' }],
    answer: 1, focus: '二分查找的直觉',
  },
  {
    id: 'd15', dimension: 'method', tier: 'challenge', type: 'choice',
    prompt: '要从 100 个数里挑出最大的一个，最少需要比较多少次？',
    options: [{ label: '1 次' }, { label: '50 次' }, { label: '99 次' }, { label: '100 次' }],
    answer: 2, focus: '算法复杂度直觉',
  },
]

export const papers: Record<AgeGroup, TestItem[]> = {
  '6-8': paperA,
  '8-10': paperB,
  '10-12': paperC,
  '12+': paperD,
}

export const totalQuestionCount = 15

export function buildPaper(age: AgeGroup): TestItem[] {
  return papers[age]
}

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

export const startPoints = {
  interest: {
    title: '建议起点：兴趣启蒙（图形化编程）',
    description: '先用图形化编程和小项目建立成就感，观察 1～2 个月，再决定是否进入代码阶段。',
    tags: ['图形化编程', '逻辑小游戏', '项目式体验'],
  },
  basic: {
    title: '建议起点：编程基础 + 算法启蒙',
    description: '从变量、条件、循环入手，配合简单算法题，建立“想清楚再动手”的习惯。',
    tags: ['变量 / 条件 / 循环', '算法启蒙', '小项目'],
  },
  advance: {
    title: '建议起点：C++ 起步，可衔接 GESP',
    description: '适合较早接触真实代码，可以把 GESP 等级认证作为阶段目标。',
    tags: ['C++ 起步', 'GESP 阶段目标', '算法思维'],
  },
} as const
