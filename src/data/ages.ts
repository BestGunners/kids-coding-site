export interface AgeStage {
  id: string
  age: string
  /** 阶段定位 */
  stage: string
  /** 主要学什么 */
  content: string[]
  /** 家长需要关注的点 */
  focus: string
  icon: string
}

export const ageStages: AgeStage[] = [
  {
    id: 'a',
    age: '6～8 岁',
    stage: '兴趣启蒙',
    content: ['图形化编程', '简单逻辑与顺序', '拼搭式的任务挑战'],
    focus: '重点不是学会代码，而是让孩子体验“我的想法被实现了”。',
    icon: 'sparkles',
  },
  {
    id: 'b',
    age: '8～10 岁',
    stage: '编程基础 + 算法启蒙',
    content: ['变量、条件、循环', '简单算法与流程图', '小项目与作品创作'],
    focus: '开始建立步骤化、结构化的思考习惯，接触真正的算法概念。',
    icon: 'layers',
  },
  {
    id: 'c',
    age: '10 岁+',
    stage: 'C++ / GESP / 竞赛方向',
    content: ['C++ 语法与程序实现', 'GESP 等级认证', '算法与数据结构、CSP-J'],
    focus: '此阶段学习强度更高，需要评估孩子的时间、兴趣与抗挫折能力。',
    icon: 'terminal',
  },
]

export const ageConclusion =
  '真正重要的不是“几岁必须学”，而是孩子是否具备兴趣、耐心和持续思考的意愿。同样的内容，早半年和晚半年学，效果可能完全不同。'
