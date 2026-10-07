/** 平滑滚动到指定区块，自动避开吸顶导航 */
export function scrollToSection(id: string, offset = 68): void {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' })
}

/** 复制当前页面链接（可带上锚点） */
export function currentShareLink(hash = ''): string {
  const { origin, pathname, search } = window.location
  return `${origin}${pathname}${search}${hash}`
}
