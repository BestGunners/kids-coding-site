<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { ArrowLeft, ArrowRight, Check, Clock, RefreshCw, Share2, Sparkles } from 'lucide-vue-next'
import { quizMaxScore, quizQuestions, resolveQuizResult, toScorePercent } from '@/data/quiz'
import { useClipboard } from '@/composables/useClipboard'
import { currentShareLink, scrollToSection } from '@/utils/dom'
import QuizResultPanel from '@/components/quiz/QuizResultPanel.vue'

type Phase = 'intro' | 'question' | 'result'

const emit = defineEmits<{ (event: 'book'): void }>()

const phase = ref<Phase>('intro')
const index = ref(0)
const answers = ref<(number | null)[]>(quizQuestions.map(() => null))
const pendingAdvance = ref(false)
const { copied, copy } = useClipboard()

let advanceTimer = 0

const question = computed(() => quizQuestions[index.value])
const progressPercent = computed(() => ((index.value + (answers.value[index.value] === null ? 0 : 1)) / quizQuestions.length) * 100)
const isLast = computed(() => index.value === quizQuestions.length - 1)
const answeredCount = computed(() => answers.value.filter((value) => value !== null).length)
const score = computed(() =>
  answers.value.reduce<number>((total, value, questionIndex) => {
    if (value === null) return total
    return total + quizQuestions[questionIndex].options[value].score
  }, 0),
)
const result = computed(() => resolveQuizResult(score.value))
const percent = computed(() => toScorePercent(score.value))
const selectedOption = computed(() => answers.value[index.value])

function start(): void {
  phase.value = 'intro'
  index.value = 0
  answers.value = quizQuestions.map(() => null)
  phase.value = 'question'
  nextTick(() => scrollToSection('quiz', 80))
}

function choose(optionIndex: number): void {
  answers.value[index.value] = optionIndex

  if (isLast.value) {
    pendingAdvance.value = true
    advanceTimer = window.setTimeout(() => {
      phase.value = 'result'
      pendingAdvance.value = false
      nextTick(() => scrollToSection('quiz', 80))
    }, 320)
    return
  }

  pendingAdvance.value = true
  advanceTimer = window.setTimeout(() => {
    index.value += 1
    pendingAdvance.value = false
  }, 240)
}

function back(): void {
  if (index.value === 0) {
    phase.value = 'intro'
    return
  }
  index.value -= 1
}

function retake(): void {
  if (advanceTimer) window.clearTimeout(advanceTimer)
  answers.value = quizQuestions.map(() => null)
  index.value = 0
  phase.value = 'question'
}

async function shareQuiz(): Promise<void> {
  await copy(currentShareLink('#/'))
}

function goBook(): void {
  emit('book')
}

function goRoadmap(): void {
  scrollToSection('roadmap')
}
</script>

<template>
  <div class="quiz">
    <template v-if="phase === 'intro'">
      <div class="quiz-intro">
        <div class="quiz-intro__main">
          <h3>先回答 6 个问题，再决定要不要学</h3>
          <p class="quiz-intro__lead">
            这几个问题都在观察同一件事：孩子遇到问题时，愿不愿意自己想办法、并把过程一步步弄清楚。
            请按照平时的真实情况选择，不必刻意“往好处答”。
          </p>

          <ul class="quiz-intro__meta">
            <li><Clock :size="16" />约 1 分钟</li>
            <li><Sparkles :size="16" />6 道单选题</li>
            <li><Check :size="16" />不会给出“不适合”的结论</li>
          </ul>

          <div class="quiz-intro__actions">
            <button type="button" class="btn btn--brand" @click="start">
              开始测试
              <ArrowRight :size="18" />
            </button>
            <button type="button" class="btn btn--ghost" @click="shareQuiz">
              <Share2 :size="16" />
              {{ copied ? '链接已复制' : '把测试发给其他家长' }}
            </button>
          </div>

          <p class="quiz-intro__deeper">
            想要更有说服力的结果？<RouterLink to="/test">
              让孩子做 15 题能力测评（约 8 分钟）
            </RouterLink>
          </p>
        </div>

        <div class="quiz-intro__preview">
          <p class="quiz-intro__preview-label">测试内容预览</p>
          <ol>
            <li v-for="item in quizQuestions" :key="item.id">
              <span class="mono">{{ String(item.index).padStart(2, '0') }}</span>
              {{ item.title }}
            </li>
          </ol>
          <p class="quiz-intro__preview-note">结果仅作为方向参考，不构成对孩子学习能力的评价。</p>
        </div>
      </div>
    </template>

    <template v-else-if="phase === 'question'">
      <div class="quiz-question">
        <header class="quiz-question__head">
          <button type="button" class="quiz-question__back" @click="back">
            <ArrowLeft :size="16" />
            上一题
          </button>
          <span class="quiz-question__count">
            第 <b>{{ index + 1 }}</b> / {{ quizQuestions.length }} 题
          </span>
        </header>

        <div class="quiz-question__progress" aria-hidden="true">
          <span :style="{ width: `${progressPercent}%` }" />
        </div>

        <Transition name="swap" mode="out-in">
          <div :key="question.id" class="quiz-question__body">
            <h3 class="quiz-question__title">
              <span class="mono">{{ String(question.index).padStart(2, '0') }}</span>
              {{ question.title }}
            </h3>
            <p class="quiz-question__hint">{{ question.hint }}</p>

            <ul class="quiz-options">
              <li v-for="(option, optionIndex) in question.options" :key="option.label">
                <button
                  type="button"
                  class="quiz-option"
                  :class="{ 'is-selected': selectedOption === optionIndex }"
                  :disabled="pendingAdvance"
                  :aria-pressed="selectedOption === optionIndex"
                  @click="choose(optionIndex)"
                >
                  <span class="quiz-option__mark" aria-hidden="true">
                    <Check v-if="selectedOption === optionIndex" :size="14" />
                  </span>
                  <span class="quiz-option__body">
                    <b>{{ option.label }}</b>
                    <em v-if="selectedOption === optionIndex">{{ option.note }}</em>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </Transition>

        <footer class="quiz-question__foot">
          <span>已答 {{ answeredCount }} / {{ quizQuestions.length }}</span>
          <button type="button" class="text-link" @click="retake">
            <RefreshCw :size="14" />
            重新开始
          </button>
        </footer>
      </div>
    </template>

    <template v-else>
      <QuizResultPanel
        :result="result"
        :percent="percent"
        :score="score"
        :max-score="quizMaxScore"
        :answers="answers"
        :copied="copied"
        @retake="retake"
        @book="goBook"
        @roadmap="goRoadmap"
        @share="shareQuiz"
      />
    </template>
  </div>
</template>

<style scoped>
.quiz-intro {
  display: grid;
  gap: 24px;
}

.quiz-intro__main h3 {
  font-size: clamp(20px, 5.4vw, 26px);
  font-weight: 800;
}

.quiz-intro__lead {
  margin-top: 12px;
  color: var(--ink-500);
  font-size: 15px;
  line-height: 1.9;
}

.quiz-intro__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.quiz-intro__meta li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  background: var(--surface-muted);
  color: var(--ink-600);
  font-size: 13px;
  font-weight: 600;
}

.quiz-intro__meta svg {
  color: var(--brand-600);
}

.quiz-intro__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.quiz-intro__actions .btn {
  flex: 1 1 220px;
}

.quiz-intro__deeper {
  margin-top: 14px;
  color: var(--ink-400);
  font-size: 13px;
  line-height: 1.8;
}

.quiz-intro__deeper a {
  color: var(--brand-700);
  font-weight: 650;
}

.quiz-intro__preview {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface-soft);
}

.quiz-intro__preview-label {
  color: var(--ink-400);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.quiz-intro__preview ol {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.quiz-intro__preview li {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 8px;
  color: var(--ink-700);
  font-size: 14px;
  line-height: 1.6;
}

.quiz-intro__preview li span {
  color: var(--ink-300);
  font-size: 12px;
  font-weight: 700;
  padding-top: 2px;
}

.quiz-intro__preview-note {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed var(--line-strong);
  color: var(--ink-400);
  font-size: 12px;
  line-height: 1.7;
}

.quiz-question__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.quiz-question__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  margin-left: -10px;
  border-radius: var(--radius-pill);
  color: var(--ink-500);
  font-size: 14px;
  font-weight: 600;
}

.quiz-question__back:hover {
  background: var(--surface-muted);
  color: var(--ink-800);
}

.quiz-question__count {
  color: var(--ink-400);
  font-size: 13px;
  font-weight: 600;
}

.quiz-question__count b {
  color: var(--brand-700);
  font-size: 15px;
}

.quiz-question__progress {
  height: 6px;
  margin-top: 14px;
  border-radius: 6px;
  background: var(--surface-muted);
  overflow: hidden;
}

.quiz-question__progress span {
  display: block;
  height: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--brand-600), var(--cyan-500));
  transition: width var(--dur) var(--ease-out);
}

.quiz-question__body {
  margin-top: 24px;
}

.quiz-question__title {
  display: flex;
  gap: 10px;
  align-items: baseline;
  font-size: clamp(19px, 5.2vw, 24px);
  font-weight: 750;
  line-height: 1.5;
}

.quiz-question__title span {
  color: var(--brand-500);
  font-size: 15px;
  font-weight: 700;
}

.quiz-question__hint {
  margin-top: 10px;
  color: var(--ink-400);
  font-size: 14px;
  line-height: 1.8;
}

.quiz-options {
  display: grid;
  gap: 10px;
  margin-top: 22px;
}

.quiz-option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  min-height: 60px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: #fff;
  text-align: left;
  transition:
    border-color var(--dur-fast) linear,
    background-color var(--dur-fast) linear,
    transform var(--dur-fast) var(--ease-out);
}

.quiz-option:hover {
  border-color: var(--brand-300);
  background: var(--brand-050);
}

.quiz-option.is-selected {
  border-color: var(--brand-600);
  background: var(--brand-050);
  box-shadow: 0 0 0 3px rgba(27, 77, 255, 0.1);
}

.quiz-option__mark {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex: none;
  margin-top: 2px;
  border: 1.5px solid var(--line-strong);
  border-radius: 50%;
  color: #fff;
  transition:
    background-color var(--dur-fast) linear,
    border-color var(--dur-fast) linear;
}

.quiz-option.is-selected .quiz-option__mark {
  background: var(--brand-600);
  border-color: var(--brand-600);
}

.quiz-option__body {
  display: grid;
  gap: 4px;
}

.quiz-option__body b {
  color: var(--ink-800);
  font-size: 15px;
  font-weight: 650;
}

.quiz-option__body em {
  color: var(--ink-500);
  font-size: 13px;
  font-style: normal;
  line-height: 1.7;
}

.quiz-question__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  color: var(--ink-400);
  font-size: 13px;
}

.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 180ms var(--ease-out),
    transform 180ms var(--ease-out);
}

.swap-enter-from {
  opacity: 0;
  transform: translateX(14px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateX(-14px);
}

@media (min-width: 900px) {
  .quiz-intro {
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.85fr);
    gap: 36px;
  }
}
</style>
