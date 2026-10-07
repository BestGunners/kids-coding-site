<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  Blocks,
  Bot,
  Boxes,
  Brain,
  Calculator,
  ChartLine,
  ClipboardCheck,
  Clock,
  Compass,
  Cpu,
  Database,
  Gamepad2,
  Gauge,
  GitBranch,
  GraduationCap,
  Layers,
  Lightbulb,
  ListOrdered,
  Puzzle,
  Repeat,
  Route,
  Search,
  Sigma,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Trophy,
  Workflow,
} from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    /** 数据文件中使用的图标键（kebab-case） */
    name: string
    size?: number | string
    strokeWidth?: number
  }>(),
  { size: 20, strokeWidth: 1.8 },
)

/** 数据层只用字符串引用图标，方便后续替换图标库 */
const registry: Record<string, Component> = {
  calculator: Calculator,
  puzzle: Puzzle,
  search: Search,
  lightbulb: Lightbulb,
  cpu: Cpu,
  route: Route,
  'git-branch': GitBranch,
  workflow: Workflow,
  repeat: Repeat,
  boxes: Boxes,
  gauge: Gauge,
  'list-ordered': ListOrdered,
  'trending-up': TrendingUp,
  target: Target,
  gamepad: Gamepad2,
  brain: Brain,
  trophy: Trophy,
  sparkles: Sparkles,
  layers: Layers,
  terminal: Terminal,
  sigma: Sigma,
  bot: Bot,
  database: Database,
  blocks: Blocks,
  'chart-line': ChartLine,
  compass: Compass,
  clock: Clock,
  'graduation-cap': GraduationCap,
  'clipboard-check': ClipboardCheck,
}

const icon = computed<Component>(() => registry[props.name] ?? Sparkles)
</script>

<template>
  <component :is="icon" :size="size" :stroke-width="strokeWidth" aria-hidden="true" />
</template>
