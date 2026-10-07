export interface PosterMeta {
  id: string
  /** 海报标题 */
  title: string
  /** 用于列表页的说明 */
  summary: string
  /** 建议使用场景 */
  scene: string
  /** 视觉主题 */
  theme: 'dark' | 'light'
  /** 海报比例宽度（设计稿像素） */
  width: number
  /** 海报高度（设计稿像素） */
  height: number
}

export const POSTER_WIDTH = 400
/** 画布高度：按 6 张海报内容的最大高度统一取整，保证海报系列尺寸一致 */
export const POSTER_HEIGHT = 680

export const posters: PosterMeta[] = [
  {
    id: 'math-good',
    title: '孩子数学不错，要不要学编程？',
    summary: '首屏认知型海报：用一句话把家长拉进“数学思维可以延伸到编程”的话题。',
    scene: '适合群内第一次触达，或作为朋友圈配图',
    theme: 'dark',
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
  },
  {
    id: 'olympiad-bridge',
    title: '学奥数的孩子，为什么适合学编程？',
    summary: '能力对照型海报：把“奥数能力”和“编程能力”逐条对应起来。',
    scene: '适合数学老师转发给奥数班家长',
    theme: 'light',
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
  },
  {
    id: 'case-demo',
    title: '一道奥数题，用编程怎么解决？',
    summary: '案例演示型海报：同一道题，左边数学做法、右边程序做法。',
    scene: '适合在群里引发讨论，家长最容易看懂',
    theme: 'light',
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
  },
  {
    id: 'quiz-invite',
    title: '你的孩子适合学编程吗？6 题测一测',
    summary: '测评引流型海报：把 6 个问题直接印在海报上，扫码即测。',
    scene: '转化率最高的一张，建议作为主要传播素材',
    theme: 'light',
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
  },
  {
    id: 'roadmap',
    title: '孩子学编程，可以走多远？',
    summary: '成长路线型海报：从兴趣启蒙到信息学竞赛的完整路径。',
    scene: '适合回答家长“学了有什么用、能走到哪”的疑问',
    theme: 'light',
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
  },
  {
    id: 'trial-invite',
    title: '给孩子一次真正的编程体验',
    summary: '体验课邀约型海报：明确体验课信息与咨询方式，承接最终转化。',
    scene: '适合已经做过测试、或主动咨询过的家长',
    theme: 'dark',
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
  },
]

export function findPoster(id: string): PosterMeta | undefined {
  return posters.find((poster) => poster.id === id)
}
