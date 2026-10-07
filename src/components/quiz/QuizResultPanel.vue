<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  ClipboardCheck,
  RefreshCw,
  Share2,
  Target,
} from 'lucide-vue-next'
import ScoreRing from '@/components/common/ScoreRing.vue'
import { quizQuestions, type QuizResult } from '@/data/quiz'

const props = defineProps<{
  result: QuizResult
  percent: number
  score: number
  maxScore: number
  answers: (number | null)[]
  copied: boolean
}>()

defineEmits<{
  (event: 'retake'): void
  (event: 'book'): void
  (event: 'roadmap'): void
  (event: 'share'): void
}>()

const detailsOpen = ref(false)

const toneClass = computed(() => `result--${props.result.tone}`)

const details = computed(() =>
  quizQuestions.map((question, questionIndex) => {
    const answerIndex = props.answers[questionIndex]
    return {
      id: question.id,
      index: question.index,
      title: question.title,
      answer: answerIndex === null ? '未作答' : question.options[answerIndex].label,
      score: answerIndex === null ? 0 : question.options[answerIndex].score,
    }
  }),
)
</script>

<template>
  <div class="result" :class="toneClass">
    <header class="result__head">
      <ScoreRing :percent="percent" :tone="result.tone" />
      <div class="result__head-text">
        <span class="result__level">{{ result.level }} · {{ result.title }}</span>
        <p class="result__recommend">{{ result.recommendation }}</p>
        <p class="result__desc">{{ result.description }}</p>
        <p class="result__score-note">
          本次作答得分
          <b class="mono">{{ score }} / {{ maxScore }}</b>
          <span>（{{ percent }} 分，仅作为方向参考）</span>
        </p>
      </div>
    </header>

    <div class="result__grid">
      <section class="result__card">
        <h4><Target :size="18" />推荐学习方向</h4>
        <p class="result__card-title">{{ result.direction.title }}</p>
        <p class="result__card-text">{{ result.direction.description }}</p>
        <ul class="result__tags">
          <li v-for="tag in result.direction.tags" :key="tag">{{ tag }}</li>
        </ul>
      </section>

      <section class="result__card">
        <h4><ClipboardCheck :size="18" />下一步行动</h4>
        <ol class="result__steps">
          <li v-for="(step, index) in result.nextSteps" :key="step">
            <span class="mono">{{ index + 1 }}</span>
            {{ step }}
          </li>
        </ol>
      </section>
    </div>

    <div class="result__actions">
      <button type="button" class="btn btn--brand" @click="$emit('book')">
        <CalendarCheck :size="18" />
        预约编程体验课
      </button>
      <RouterLink class="btn btn--ghost" to="/test">
        <Target :size="16" />
        让孩子做 15 题能力测评
      </RouterLink>
      <button type="button" class="btn btn--quiet" @click="$emit('roadmap')">
        查看编程成长路线
      </button>
      <button type="button" class="btn btn--quiet" @click="$emit('share')">
        <Share2 :size="16" />
        {{ copied ? '链接已复制' : '把测试发给其他家长' }}
      </button>
      <button type="button" class="btn btn--quiet" @click="$emit('retake')">
        <RefreshCw :size="16" />
        重新测试
      </button>
    </div>

    <div class="result__details">
      <button
        type="button"
        class="result__details-toggle"
        :aria-expanded="detailsOpen"
        @click="detailsOpen = !detailsOpen"
      >
        查看作答明细
        <ChevronDown :size="16" :class="{ 'is-open': detailsOpen }" />
      </button>

      <Transition name="details">
        <ul v-if="detailsOpen" class="result__details-list">
          <li v-for="item in details" :key="item.id">
            <span class="mono">{{ String(item.index).padStart(2, '0') }}</span>
            <span class="result__details-title">{{ item.title }}</span>
            <span class="result__details-answer">{{ item.answer }}</span>
          </li>
        </ul>
      </Transition>
    </div>

    <p class="result__notice">
      这个结果只是帮助家长了解孩子在哪些方面已经具备基础，并不意味着孩子“只能”或“必须”走某条路线。
      <button type="button" class="text-link" @click="$emit('book')">
        让孩子亲自体验一次
        <ArrowRight :size="14" />
      </button>
    </p>
  </div>
</template>

<style scoped>
.result {
  display: grid;
  gap: 22px;
}

.result__head {
  display: grid;
  gap: 20px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, #ffffff 0%, var(--surface-soft) 100%);
}

.result--positive .result__head {
  background: linear-gradient(180deg, #ffffff 0%, var(--positive-050) 100%);
}

.result--warn .result__head {
  background: linear-gradient(180deg, #ffffff 0%, var(--warn-050) 100%);
}

.result--brand .result__head {
  background: linear-gradient(180deg, #ffffff 0%, var(--brand-050) 100%);
}

.result__level {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background: var(--ink-900);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.result__recommend {
  margin-top: 12px;
  color: var(--ink-600);
  font-size: 14px;
  font-weight: 650;
}

.result__desc {
  margin-top: 10px;
  color: var(--ink-500);
  font-size: 15px;
  line-height: 1.9;
}

.result__score-note {
  margin-top: 14px;
  color: var(--ink-400);
  font-size: 13px;
}

.result__score-note b {
  margin: 0 4px;
  color: var(--ink-900);
  font-size: 16px;
  font-weight: 750;
}

.result__grid {
  display: grid;
  gap: 16px;
}

.result__card {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #fff;
}

.result__card h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--ink-900);
  font-size: 15px;
  font-weight: 750;
}

.result__card h4 svg {
  color: var(--brand-600);
}

.result__card-title {
  margin-top: 12px;
  color: var(--brand-700);
  font-size: 15px;
  font-weight: 700;
}

.result__card-text {
  margin-top: 8px;
  color: var(--ink-500);
  font-size: 14px;
  line-height: 1.85;
}

.result__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.result__tags li {
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  background: var(--brand-050);
  color: var(--brand-700);
  font-size: 12px;
  font-weight: 650;
}

.result__steps {
  display: grid;
  gap: 12px;
  margin-top: 14px;
}

.result__steps li {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 10px;
  color: var(--ink-600);
  font-size: 14px;
  line-height: 1.75;
}

.result__steps span {
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

.result__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.result__actions .btn {
  flex: 1 1 200px;
}

.result__details {
  border-top: 1px solid var(--line);
  padding-top: 16px;
}

.result__details-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ink-500);
  font-size: 14px;
  font-weight: 650;
}

.result__details-toggle svg {
  transition: transform var(--dur) var(--ease-out);
}

.result__details-toggle svg.is-open {
  transform: rotate(180deg);
}

.result__details-list {
  display: grid;
  gap: 2px;
  margin-top: 12px;
}

.result__details-list li {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
  font-size: 13px;
}

.result__details-list span:first-child {
  color: var(--ink-300);
  font-weight: 700;
}

.result__details-title {
  color: var(--ink-600);
}

.result__details-answer {
  color: var(--ink-800);
  font-weight: 650;
}

.details-enter-active,
.details-leave-active {
  transition:
    opacity var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}

.details-enter-from,
.details-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.result__notice {
  color: var(--ink-400);
  font-size: 13px;
  line-height: 1.9;
}

.result__notice .text-link {
  margin-left: 4px;
  font-size: 13px;
}

@media (min-width: 820px) {
  .result__head {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 28px;
    padding: 28px;
  }

  .result__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .result__actions .btn {
    flex: 0 1 auto;
  }
}
</style>
