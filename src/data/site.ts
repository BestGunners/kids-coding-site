/** 站点级配置：机构信息均为占位内容，上线前替换即可 */
export const siteConfig = {
  productName: '少儿编程成长探索',
  productAlt: '数学思维 × 编程能力',
  orgName: '（机构名称占位）',
  orgNote: '少儿奥数 · 数学思维 · 物理 · 少儿编程',
  /** 占位电话 */
  phone: '000-0000 0000',
  /** 占位微信号 */
  wechatId: '（微信号占位）',
  /** 二维码占位文案 */
  qrCaption: '微信扫码 · 添加编程课程老师',
  /** 课程老师姓名占位 */
  teacherName: '编程课程老师',
  /** 机构地址占位 */
  address: '（校区地址占位）',
  /** 体验课信息占位 */
  trialInfo: '体验课 60 分钟 · 需要一台电脑 · 无需编程基础',
} as const

export interface NavItem {
  id: string
  label: string
}

export const homeNav: NavItem[] = [
  { id: 'bridge', label: '奥数 × 编程' },
  { id: 'case', label: '案例演示' },
  { id: 'quiz', label: '能力测评' },
  { id: 'ability', label: '学什么' },
  { id: 'roadmap', label: '成长路线' },
  { id: 'age', label: '什么时候开始' },
  { id: 'faq', label: '家长问答' },
]

export const topNav = [
  { label: '首页', to: '/' },
  { label: '编程能力测评', to: '/test' },
]

// TODO（继续开发时补回）：
//   /posters  海报中心（缩略图列表）
//   /poster/:id  海报大图页
//   /teacher  老师素材中心（转发话术一键复制）
