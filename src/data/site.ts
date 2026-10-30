/** 站点级配置 */
export const siteConfig = {
  productName: '少儿编程成长探索',
  productAlt: '数学思维 × 编程能力',
  orgName: '思创思维',
  orgNote: '少儿奥数 · 数学思维 · 物理 · 少儿编程',
  phone: '18716206590',
  wechatId: '18323687193',
  qrCaption: '扫码添加老师企业微信',
  teacherName: '编程课程老师',
  trialInfo: '体验课 60 分钟 · 需要一台电脑 · 无需编程基础',
} as const

export interface NavItem {
  id: string
  label: string
  /** 是否显示在桌面端顶部导航（移动端菜单始终显示全部） */
  primary?: boolean
}

export const homeNav: NavItem[] = [
  { id: 'bridge', label: '奥数 × 编程', primary: true },
  { id: 'case', label: '案例演示', primary: true },
  { id: 'ability', label: '学什么' },
  { id: 'roadmap', label: '成长路线', primary: true },
  { id: 'age', label: '什么时候开始' },
  { id: 'quiz', label: '1 分钟快测' },
  { id: 'faq', label: '家长问答', primary: true },
]

export const topNav = [
  { label: '首页', to: '/' },
  { label: '编程能力测评', to: '/test' },
]

// TODO（继续开发时补回）：
//   /posters  海报中心（缩略图列表）
//   /poster/:id  海报大图页
//   /teacher  老师素材中心（转发话术一键复制）
