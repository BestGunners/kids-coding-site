<script setup lang="ts">
import { computed } from 'vue'
import type { GridScene } from '@/data/abilityTest'

const props = defineProps<{ scene: GridScene }>()

const CELL = 54
const GAP = 8

const width = computed(() => props.scene.cols * CELL + (props.scene.cols - 1) * GAP)
const height = computed(() => props.scene.rows * CELL + (props.scene.rows - 1) * GAP)

const box = (x: number, y: number) => ({
  x: x * (CELL + GAP),
  y: y * (CELL + GAP),
})

const cells = computed(() => {
  const list: { key: string; x: number; y: number }[] = []
  for (let y = 0; y < props.scene.rows; y += 1) {
    for (let x = 0; x < props.scene.cols; x += 1) {
      list.push({ key: `${x}-${y}`, ...box(x, y) })
    }
  }
  return list
})

const wallSet = computed(() => new Set((props.scene.walls ?? []).map((w) => `${w.x}-${w.y}`)))
const startBox = computed(() => box(props.scene.start.x, props.scene.start.y))
const goalBox = computed(() => box(props.scene.goal.x, props.scene.goal.y))

const starPoints = computed(() => {
  const cx = CELL / 2
  const cy = CELL / 2
  const outer = 19
  const inner = 8
  const points: string[] = []
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (Math.PI / 5) * i - Math.PI / 2
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`)
  }
  return points.join(' ')
})
</script>

<template>
  <div class="grid-scene">
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      :width="width"
      :height="height"
      role="img"
      aria-label="机器人走到星星的格子图"
    >
      <g v-for="cell in cells" :key="cell.key">
        <rect
          :x="cell.x"
          :y="cell.y"
          :width="CELL"
          :height="CELL"
          rx="12"
          :fill="wallSet.has(cell.key) ? '#17233c' : '#f2f6fd'"
          :stroke="wallSet.has(cell.key) ? '#17233c' : '#dfe6f2'"
          stroke-width="1"
        />
      </g>

      <!-- 起点：机器人 -->
      <g :transform="`translate(${startBox.x}, ${startBox.y})`">
        <rect x="13" y="18" width="28" height="24" rx="8" fill="#1b4dff" />
        <circle cx="23" cy="29" r="3" fill="#ffffff" />
        <circle cx="31" cy="29" r="3" fill="#ffffff" />
        <line x1="27" y1="18" x2="27" y2="11" stroke="#1b4dff" stroke-width="3" stroke-linecap="round" />
        <circle cx="27" cy="9" r="4" fill="#0fb0d4" />
      </g>

      <!-- 终点：星星 -->
      <g :transform="`translate(${goalBox.x}, ${goalBox.y})`">
        <polygon :points="starPoints" fill="#e8912c" />
      </g>
    </svg>
    <p class="grid-scene__legend">
      机器人每走一格算 1 步{{ scene.walls?.length ? '，深色格子不能走' : '' }}
    </p>
  </div>
</template>

<style scoped>
.grid-scene {
  display: grid;
  gap: 10px;
  justify-items: center;
  margin-top: 18px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #fff;
}

.grid-scene svg {
  display: block;
  max-width: 100%;
  height: auto;
}

.grid-scene__legend {
  color: var(--ink-400);
  font-size: 12px;
  text-align: center;
}
</style>
