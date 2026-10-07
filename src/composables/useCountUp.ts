import { onBeforeUnmount, ref, type Ref } from 'vue'

interface CountUpOptions {
  duration?: number
  /** 数值保留小数位 */
  decimals?: number
  /** 千分位分隔 */
  group?: boolean
}

const easeOutExpo = (t: number): number => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * 数字滚动动画：元素进入视口时从 0 增长到目标值。
 * 只使用 requestAnimationFrame，兼容微信内置浏览器。
 */
export function useCountUp(
  target: number,
  options: CountUpOptions = {},
): { display: Ref<string>; start: () => void } {
  const { duration = 1400, decimals = 0, group = false } = options
  const display = ref(format(0, decimals, group))
  let frame = 0
  let started = false

  function stop(): void {
    if (frame) window.cancelAnimationFrame(frame)
    frame = 0
  }

  function start(): void {
    if (started) return
    started = true

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (prefersReduced) {
      display.value = format(target, decimals, group)
      return
    }

    const begin = performance.now()
    const tick = (now: number): void => {
      const progress = Math.min((now - begin) / duration, 1)
      display.value = format(target * easeOutExpo(progress), decimals, group)
      if (progress < 1) frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
  }

  onBeforeUnmount(stop)

  return { display, start }
}

function format(value: number, decimals: number, group: boolean): string {
  const fixed = value.toFixed(decimals)
  if (!group) return fixed
  const [int, frac] = fixed.split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return frac ? `${grouped}.${frac}` : grouped
}
