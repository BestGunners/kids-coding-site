import type { Directive, DirectiveBinding } from 'vue'

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom' | 'line-y' | 'line-x'

interface RevealOptions {
  variant?: RevealVariant
  /** 延迟，单位毫秒 */
  delay?: number
  /** 进入视口后延迟移除 will-change 的等待时间 */
  once?: boolean
}

const BASE_CLASS = 'reveal'
const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: 'reveal--up',
  down: 'reveal--down',
  left: 'reveal--left',
  right: 'reveal--right',
  fade: 'reveal--fade',
  zoom: 'reveal--zoom',
  'line-y': 'grow-line',
  'line-x': 'grow-x',
}

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.classList.add('is-visible')
          window.setTimeout(() => el.classList.add('is-done'), 900)
          observer?.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
  }
  return observer
}

function normalize(value: DirectiveBinding<RevealOptions | number | undefined>['value']): RevealOptions {
  if (typeof value === 'number') return { delay: value }
  return value ?? {}
}

function apply(el: HTMLElement, binding: DirectiveBinding<RevealOptions | number | undefined>): void {
  const options = normalize(binding.value)
  const variant: RevealVariant = options.variant ?? 'up'

  el.classList.add(BASE_CLASS, VARIANT_CLASS[variant])
  if (options.delay) el.style.setProperty('--reveal-delay', `${options.delay}ms`)

  // 不支持 IntersectionObserver 或用户偏好减少动效时，直接显示
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  if (typeof IntersectionObserver === 'undefined' || prefersReduced) {
    el.classList.add('is-visible')
    return
  }

  getObserver().observe(el)
}

export const reveal: Directive<HTMLElement, RevealOptions | number | undefined> = {
  mounted: apply,
  unmounted(el) {
    observer?.unobserve(el)
  },
}
