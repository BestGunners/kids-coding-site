import {
  dimensionMeta,
  startPoints,
  type DimensionId,
  type TestItem,
} from '@/data/abilityTest'

export interface AnswerRecord {
  itemId: string
  dimension: DimensionId
  correct: boolean
  /** 作答耗时（毫秒） */
  elapsedMs: number
  /** 是否修改过答案 */
  changed: boolean
}

export interface DimensionScore {
  id: DimensionId
  name: string
  short: string
  score: number
  correct: number
  total: number
  programming: string
}

export interface AbilityReport {
  dimensions: DimensionScore[]
  overall: number
  startPoint: (typeof startPoints)[keyof typeof startPoints]
  startPointKey: keyof typeof startPoints
  strongest: DimensionScore[]
  /** 专注与试错观察（行为指标，不参与分数） */
  behaviorNote: string
  totalElapsedMs: number
  changedCount: number
}

const TIER_WEIGHT: Record<TestItem['tier'], number> = {
  basic: 1,
  plus: 1.25,
  challenge: 1.5,
}

export function buildReport(paper: TestItem[], answers: AnswerRecord[]): AbilityReport {
  const byId = new Map(answers.map((answer) => [answer.itemId, answer]))

  const dimensions: DimensionScore[] = dimensionMeta
    .map((meta) => {
      const items = paper.filter((item) => item.dimension === meta.id)
      let earned = 0
      let max = 0
      let correct = 0

      for (const item of items) {
        const weight = TIER_WEIGHT[item.tier]
        max += weight
        if (byId.get(item.id)?.correct) {
          earned += weight
          correct += 1
        }
      }

      const score = max === 0 ? 0 : Math.round((earned / max) * 100)
      return {
        id: meta.id,
        name: meta.name,
        short: meta.short,
        score,
        correct,
        total: items.length,
        programming: meta.programming,
      }
    })
    .filter((dimension) => dimension.total > 0)

  const overall = Math.round(
    dimensions.reduce((total, dimension) => total + dimension.score, 0) / Math.max(dimensions.length, 1),
  )

  const strongest = [...dimensions].sort((a, b) => b.score - a.score).slice(0, 2)
  const pattern = dimensions.find((item) => item.id === 'pattern')?.score ?? 0
  const logic = dimensions.find((item) => item.id === 'logic')?.score ?? 0
  const debug = dimensions.find((item) => item.id === 'debug')?.score ?? 0

  let startPointKey: keyof typeof startPoints = 'interest'
  if (overall >= 62 && (pattern >= 70 || logic >= 70 || debug >= 70)) startPointKey = 'advance'
  else if (overall >= 42) startPointKey = 'basic'

  const totalElapsedMs = answers.reduce((total, answer) => total + answer.elapsedMs, 0)
  const changedCount = answers.filter((answer) => answer.changed).length
  const avgSeconds = totalElapsedMs / Math.max(answers.length, 1) / 1000

  let behaviorNote: string
  if (changedCount >= 3 && avgSeconds >= 15) {
    behaviorNote = '答题过程中会回头修改答案，说明孩子在主动检查自己，而不是急着交卷——这正是编程里“调试”的习惯。'
  } else if (avgSeconds >= 18) {
    behaviorNote = '遇到不好判断的题会停下来多想一会儿，这种“慢一点想清楚”的状态，在学习编程时比抢速度更有价值。'
  } else if (changedCount >= 1) {
    behaviorNote = '有过修改答案的动作，说明孩子会自我检查；节奏偏快，后续可以多引导“做完再看一眼”。'
  } else {
    behaviorNote = '答题节奏比较快、没有中途放弃，专注度不错；接下来可以适当加一点需要多想几秒的题目。'
  }

  return {
    dimensions,
    overall,
    startPoint: startPoints[startPointKey],
    startPointKey,
    strongest,
    behaviorNote,
    totalElapsedMs,
    changedCount,
  }
}
