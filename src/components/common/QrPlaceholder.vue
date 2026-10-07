<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** 渲染尺寸（px），内部按 25 × 25 模块绘制 */
    size?: number
    /** 中心提示文字 */
    caption?: string
    /** 随机种子：不同位置使用不同占位图案 */
    seed?: number
  }>(),
  { size: 132, caption: '二维码占位', seed: 7 },
)

const MODULES = 25

/** 确定性伪随机，保证每次渲染图案一致（占位图无需可扫描） */
function pseudoRandom(seed: number): () => number {
  let state = seed * 9301 + 49297
  return () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
}

const cells = computed(() => {
  const random = pseudoRandom(props.seed || 7)
  const grid: boolean[][] = Array.from({ length: MODULES }, () => Array(MODULES).fill(false))

  for (let y = 0; y < MODULES; y += 1) {
    for (let x = 0; x < MODULES; x += 1) {
      grid[y][x] = random() > 0.52
    }
  }

  const stampFinder = (ox: number, oy: number): void => {
    for (let y = 0; y < 7; y += 1) {
      for (let x = 0; x < 7; x += 1) {
        const edge = x === 0 || y === 0 || x === 6 || y === 6
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4
        grid[oy + y][ox + x] = edge || core
      }
    }
    // 定位图案外的一圈留白
    for (let i = -1; i < 8; i += 1) {
      if (oy + i >= 0 && oy + i < MODULES) {
        if (ox - 1 >= 0) grid[oy + i][ox - 1] = false
        if (ox + 7 < MODULES) grid[oy + i][ox + 7] = false
      }
      if (ox + i >= 0 && ox + i < MODULES) {
        if (oy - 1 >= 0) grid[oy - 1][ox + i] = false
        if (oy + 7 < MODULES) grid[oy + 7][ox + i] = false
      }
    }
    void true
  }

  stampFinder(0, 0)
  stampFinder(MODULES - 7, 0)
  stampFinder(0, MODULES - 7)

  // 中心留白，用于放置机构 Logo 或文字
  for (let y = 10; y <= 14; y += 1) {
    for (let x = 10; x <= 14; x += 1) grid[y][x] = false
  }

  return grid
})

const paths = computed(() => {
  let d = ''
  cells.value.forEach((row, y) => {
    row.forEach((on, x) => {
      if (on) d += `M${x} ${y}h1v1h-1z`
    })
  })
  return d
})
</script>

<template>
  <figure class="qr" :style="{ width: `${size}px` }">
    <svg
      class="qr__code"
      viewBox="-1 -1 27 27"
      :width="size"
      :height="size"
      role="img"
      :aria-label="caption"
    >
      <rect x="-1" y="-1" width="27" height="27" rx="2.4" fill="#ffffff" />
      <path :d="paths" fill="#0d1729" />
      <rect x="10" y="10" width="5" height="5" rx="1" fill="#ffffff" />
      <text
        x="12.5"
        y="13.05"
        text-anchor="middle"
        font-size="2.1"
        font-family="var(--font-sans)"
        fill="#1b4dff"
      >
        QR
      </text>
    </svg>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.qr {
  margin: 0;
  display: grid;
  gap: 8px;
  justify-items: center;
}

.qr__code {
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fff;
}

figcaption {
  color: var(--ink-400);
  font-size: 12px;
  text-align: center;
  line-height: 1.6;
}
</style>
