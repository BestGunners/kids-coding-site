<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    /** 0 ~ 100 */
    percent: number
    size?: number
    label?: string
    tone?: 'brand' | 'positive' | 'warn'
  }>(),
  { size: 148, label: '综合评分', tone: 'brand' },
)

const STROKE = 10
const radius = 50 - STROKE / 2
const circumference = 2 * Math.PI * radius

const animated = ref(0)
const dashOffset = computed(() => circumference * (1 - animated.value / 100))

const toneColor = computed(() => {
  if (props.tone === 'positive') return 'var(--positive-500)'
  if (props.tone === 'warn') return 'var(--warn-500)'
  return 'var(--brand-600)'
})

function animateTo(value: number): void {
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  if (prefersReduced) {
    animated.value = value
    return
  }

  const from = animated.value
  const start = performance.now()
  const duration = 900
  const step = (now: number): void => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    animated.value = from + (value - from) * eased
    if (progress < 1) window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}

onMounted(() => animateTo(props.percent))
watch(() => props.percent, (value) => animateTo(value))

const shown = computed(() => Math.round(animated.value))
</script>

<template>
  <div class="score-ring" :style="{ '--ring-size': `${size}px`, '--ring-color': toneColor }">
    <svg viewBox="0 0 100 100" :width="size" :height="size" role="img" :aria-label="`${label} ${percent} 分`">
      <circle cx="50" cy="50" :r="radius" fill="none" stroke="var(--line)" :stroke-width="STROKE" />
      <circle
        class="score-ring__bar"
        cx="50"
        cy="50"
        :r="radius"
        fill="none"
        :stroke="toneColor"
        :stroke-width="STROKE"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <div class="score-ring__center">
      <strong>{{ shown }}<em>%</em></strong>
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.score-ring {
  position: relative;
  width: var(--ring-size);
  height: var(--ring-size);
  flex: none;
}

.score-ring svg {
  transform: rotate(-90deg);
}

.score-ring__bar {
  transition: stroke 240ms linear;
}

.score-ring__center {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 2px;
  text-align: center;
}

.score-ring__center strong {
  color: var(--ink-900);
  font-size: 34px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
}

.score-ring__center em {
  margin-left: 1px;
  color: var(--ink-400);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
}

.score-ring__center span {
  color: var(--ink-400);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
}
</style>
