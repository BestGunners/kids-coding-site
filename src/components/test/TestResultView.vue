<script setup lang="ts">
import { computed } from 'vue'
import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  RefreshCw,
  Share2,
  Sparkles,
  TrendingUp,
} from 'lucide-vue-next'
import { dimensionAnalysis, type AgeGroup } from '@/data/abilityTest'
import type { AbilityReport } from '@/utils/abilityTestScore'
import { useClipboard } from '@/composables/useClipboard'
import { currentShareLink } from '@/utils/dom'

const props = defineProps<{
  report: AbilityReport
  age: AgeGroup
  ageLabel: string
}>()

defineEmits<{
  (event: 'retake'): void
  (event: 'book'): void
}>()

const { copied: linkCopied, copy: copyLink } = useClipboard()
const { copied: reportCopied, copy: copyReport } = useClipboard()

function levelOf(score: number): 'high' | 'mid' | 'low' {
  if (score >= 70) return 'high'
  if (score >= 40) return 'mid'
  return 'low'
}

const nextSteps = computed(() => [
  '把结果发给老师，让老师先了解孩子的情况',
  '预约一次 60 分钟体验课',
  '课后和老师一起看：孩子更喜欢“做作品”还是“想解法”',
])

const summaryText = computed(() => {
  const lines = props.report.dimensions.map((item) => `${item.name} ${item.score}`).join('｜')
  return [
    '【少儿编程能力测评结果】',
    `年龄段：${props.ageLabel}`,
    `综合：${props.report.overall} 分`,
    lines,
    `推荐起点：${props.report.startPoint.title.replace('建议起点：', '')}`,
    '（测评仅作为学习方向参考，不对孩子做评价或排名）',
  ].join('\n')
})
</script>

<template>
  <div class="report">
    <header class="report__head">
      <span class="report__kicker"><Sparkles :size="13" />编程思维画像</span>
      <h2 class="report__title">孩子在这 6 个方面的表现</h2>
      <p class="report__lead">
        综合参考分 <b class="mono">{{ report.overall }}</b> / 100，仅作学习方向参考。
      </p>
    </header>

    <ul class="bars">
      <li v-for="item in report.dimensions" :key="item.id" :class="`bars--${levelOf(item.score)}`">
        <div class="bars__top">
          <span class="bars__name">{{ item.name }}</span>
          <span class="bars__score mono">{{ item.score }}</span>
        </div>
        <div class="bars__track" aria-hidden="true">
          <span :style="{ width: `${item.score}%` }" />
        </div>
        <p class="bars__text">{{ dimensionAnalysis[item.id][levelOf(item.score)] }}</p>
        <p class="bars__meta">
          对应编程能力：{{ item.programming }} · 答对 {{ item.correct }} / {{ item.total }}
        </p>
      </li>
    </ul>

    <section class="highlight">
      <h3><TrendingUp :size="18" />相对突出的方面</h3>
      <p>
        {{ report.strongest.map((item) => item.name).join('、') }}
        —— 这几个方向是孩子比较自然的入口。
      </p>
    </section>

    <section class="behavior">
      <h3><ClipboardCheck :size="18" />答题状态观察</h3>
      <p>{{ report.behaviorNote }}</p>
    </section>

    <section class="start">
      <span class="start__label">推荐起点</span>
      <h3>{{ report.startPoint.title }}</h3>
      <p>{{ report.startPoint.description }}</p>
      <ul class="start__tags">
        <li v-for="tag in report.startPoint.tags" :key="tag">{{ tag }}</li>
      </ul>
    </section>

    <section class="steps">
      <h3>接下来可以做的 3 件事</h3>
      <ol>
        <li v-for="(step, index) in nextSteps" :key="step">
          <span class="mono">{{ index + 1 }}</span>
          {{ step }}
        </li>
      </ol>
    </section>

    <div class="actions">
      <button type="button" class="btn btn--brand" @click="$emit('book')">
        <CalendarCheck :size="18" />
        预约编程体验课
      </button>
      <button type="button" class="btn btn--ghost" @click="copyReport(summaryText)">
        <Share2 :size="16" />
        {{ reportCopied ? '结果已复制' : '把结果发给老师' }}
      </button>
      <button type="button" class="btn btn--quiet" @click="copyLink(currentShareLink('#/test'))">
        {{ linkCopied ? '链接已复制' : '把测试发给其他家长' }}
      </button>
      <button type="button" class="btn btn--quiet" @click="$emit('retake')">
        <RefreshCw :size="16" />
        重新测试
      </button>
    </div>

    <p class="notice">
      结果仅作方向参考，最终以一次真实体验为准。
      <button type="button" class="text-link" @click="$emit('book')">
        让孩子试一次
        <ArrowRight :size="14" />
      </button>
    </p>
  </div>
</template>

<style scoped>
.report {
  display: grid;
  gap: 22px;
}

.report__kicker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  background: var(--ink-900);
  color: #fff;
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.04em;
}

.report__title {
  margin-top: 12px;
  font-size: clamp(20px, 5.6vw, 28px);
  font-weight: 800;
}

.report__lead {
  margin-top: 10px;
  color: var(--ink-500);
  font-size: 14px;
  line-height: 1.85;
}

.report__lead b {
  color: var(--brand-700);
  font-size: 17px;
}

.bars {
  display: grid;
  gap: 14px;
}

.bars > li {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #fff;
}

.bars__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.bars__name {
  color: var(--ink-900);
  font-size: 16px;
  font-weight: 700;
}

.bars__score {
  color: var(--ink-400);
  font-size: 16px;
  font-weight: 700;
}

.bars__track {
  height: 8px;
  margin-top: 10px;
  border-radius: 8px;
  background: var(--surface-muted);
  overflow: hidden;
}

.bars__track span {
  display: block;
  height: 100%;
  border-radius: 8px;
  background: var(--brand-600);
  transition: width var(--dur-slow) var(--ease-out);
}

.bars--high .bars__track span {
  background: linear-gradient(90deg, var(--brand-600), var(--cyan-500));
}

.bars--mid .bars__track span {
  background: var(--brand-500);
}

.bars--low .bars__track span {
  background: var(--ink-300);
}

.bars__text {
  margin-top: 12px;
  color: var(--ink-600);
  font-size: 14px;
  line-height: 1.8;
}

.bars__meta {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--line);
  color: var(--ink-400);
  font-size: 12px;
}

.highlight,
.behavior {
  padding: 18px;
  border-radius: var(--radius-lg);
  background: var(--surface-soft);
  border: 1px solid var(--line);
}

.highlight h3,
.behavior h3,
.steps h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 750;
}

.highlight h3 svg,
.behavior h3 svg {
  color: var(--brand-600);
}

.highlight p,
.behavior p {
  margin-top: 8px;
  color: var(--ink-600);
  font-size: 14px;
  line-height: 1.85;
}

.behavior__meta {
  color: var(--ink-400) !important;
  font-size: 12px !important;
}

.start {
  padding: 20px;
  border: 1px solid var(--brand-300);
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, #fff 0%, var(--brand-050) 100%);
}

.start__label {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: var(--brand-600);
  color: #fff;
  font-size: 12px;
  font-weight: 650;
}

.start h3 {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 800;
  color: var(--brand-700);
}

.start p {
  margin-top: 10px;
  color: var(--ink-600);
  font-size: 14px;
  line-height: 1.9;
}

.start__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.start__tags li {
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  background: #fff;
  border: 1px solid var(--brand-300);
  color: var(--brand-700);
  font-size: 12px;
  font-weight: 650;
}

.steps ol {
  display: grid;
  gap: 12px;
  margin-top: 14px;
}

.steps li {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 10px;
  color: var(--ink-600);
  font-size: 14px;
  line-height: 1.8;
}

.steps li span {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin-top: 2px;
  border-radius: 50%;
  background: var(--surface-muted);
  color: var(--ink-600);
  font-size: 12px;
  font-weight: 700;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.actions .btn {
  flex: 1 1 200px;
}

.notice {
  color: var(--ink-400);
  font-size: 13px;
  line-height: 1.9;
}

.notice .text-link {
  margin-left: 4px;
  font-size: 13px;
}

@media (min-width: 820px) {
  .bars {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .actions .btn {
    flex: 0 1 auto;
  }
}
</style>
