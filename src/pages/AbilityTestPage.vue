<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Play } from 'lucide-vue-next'
import TestQuestionCard from '@/components/test/TestQuestionCard.vue'
import TestResultView from '@/components/test/TestResultView.vue'
import BookingDialog from '@/components/common/BookingDialog.vue'
import { ageOptions, buildPaper, type AgeGroup, type TestItem } from '@/data/abilityTest'
import { buildReport, type AnswerRecord } from '@/utils/abilityTestScore'

type Phase = 'intro' | 'quiz' | 'result'

interface ItemState {
  selected: number | null
  ordered: string[]
  firstTouched: boolean
  changed: boolean
}

const phase = ref<Phase>('intro')
const age = ref<AgeGroup | null>(null)
const index = ref(0)
const bookingOpen = ref(false)

const states = reactive<Record<string, ItemState>>({})
const records = reactive<Record<string, AnswerRecord>>({})
let questionStartedAt = 0

const paper = computed<TestItem[]>(() => (age.value ? buildPaper(age.value) : []))
const current = computed<TestItem | null>(() => paper.value[index.value] ?? null)
const currentState = computed<ItemState | null>(() => (current.value ? states[current.value.id] ?? null : null))
const ageLabel = computed(() => ageOptions.find((item) => item.id === age.value)?.label ?? '')

const report = computed(() => buildReport(paper.value, Object.values(records)))

function ensureState(item: TestItem): ItemState {
  if (!states[item.id]) {
    states[item.id] = { selected: null, ordered: [], firstTouched: false, changed: false }
  }
  return states[item.id]
}

function start(): void {
  if (!age.value) return
  for (const key of Object.keys(states)) delete states[key]
  for (const key of Object.keys(records)) delete records[key]
  index.value = 0
  questionStartedAt = performance.now()
  if (current.value) ensureState(current.value)
  phase.value = 'quiz'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function pick(optionIndex: number): void {
  const item = current.value
  if (!item) return
  const state = ensureState(item)
  if (state.firstTouched && state.selected !== optionIndex) state.changed = true
  state.firstTouched = true
  state.selected = optionIndex
}

function add(label: string): void {
  const item = current.value
  if (!item) return
  const state = ensureState(item)
  if (!state.ordered.includes(label)) state.ordered.push(label)
}

function remove(label: string): void {
  const item = current.value
  if (!item) return
  const state = ensureState(item)
  state.changed = true
  state.ordered = state.ordered.filter((value) => value !== label)
}

function isCorrect(item: TestItem, state: ItemState): boolean {
  if (item.type === 'sequence') {
    return JSON.stringify(state.ordered) === JSON.stringify(item.sequenceAnswer ?? [])
  }
  return state.selected !== null && state.selected === item.answer
}

function next(): void {
  const item = current.value
  const state = item ? ensureState(item) : null
  if (!item || !state) return

  records[item.id] = {
    itemId: item.id,
    dimension: item.dimension,
    correct: isCorrect(item, state),
    elapsedMs: performance.now() - questionStartedAt,
    changed: state.changed,
  }

  if (index.value + 1 >= paper.value.length) {
    phase.value = 'result'
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  index.value += 1
  questionStartedAt = performance.now()
  if (current.value) ensureState(current.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function prev(): void {
  if (index.value === 0) return
  index.value -= 1
  questionStartedAt = performance.now()
  if (current.value) ensureState(current.value)
}

function retake(): void {
  start()
}

function backToIntro(): void {
  phase.value = 'intro'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="test-page">
    <section class="test-hero">
      <div class="test-hero__bg" aria-hidden="true" />
      <div class="container test-hero__inner">
        <p class="eyebrow">编程能力测评 · 15 题</p>
        <h1 class="test-hero__title">看看孩子适合从哪里开始学编程</h1>
        <p class="test-hero__lead">15 题，约 6～8 分钟。图形题为主，不需要编程基础。</p>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container container--narrow">
        <!-- 开始页 -->
        <div v-if="phase === 'intro'" class="card card--pad intro">
          <h2 class="intro__title">选择孩子年龄</h2>
          <p class="intro__lead">不同年龄题目不同，6～8 岁全部为图形题。</p>

          <ul class="ages">
            <li v-for="option in ageOptions" :key="option.id">
              <button
                type="button"
                class="ages__btn"
                :class="{ 'is-active': age === option.id }"
                :aria-pressed="age === option.id"
                @click="age = option.id"
              >
                <b>{{ option.label }}</b>
                <em>{{ option.note }}</em>
              </button>
            </li>
          </ul>

          <button type="button" class="btn btn--brand btn--block" :disabled="!age" @click="start">
            <Play :size="18" />
            开始测试（共 15 题）
          </button>
          <p class="intro__note">可以随时返回上一题修改答案</p>
        </div>

        <!-- 答题页 -->
        <div v-else-if="phase === 'quiz' && current && currentState" class="card card--pad">
          <TestQuestionCard
            :item="current"
            :index="index"
            :total="paper.length"
            :selected="currentState.selected"
            :ordered="currentState.ordered"
            @pick="pick"
            @add="add"
            @remove="remove"
            @next="next"
            @prev="prev"
          />
        </div>

        <!-- 结果页 -->
        <div v-else class="result-wrap">
          <TestResultView
            :report="report"
            :age="age ?? '8-10'"
            :age-label="ageLabel"
            @retake="retake"
            @book="bookingOpen = true"
          />
          <button type="button" class="text-link result-wrap__back" @click="backToIntro">
            换个年龄段重新测
          </button>
        </div>
      </div>
    </section>

    <BookingDialog :open="bookingOpen" :from-quiz="true" @close="bookingOpen = false" />
  </div>
</template>

<style scoped>
.test-page {
  min-height: 60vh;
}

.test-hero {
  position: relative;
  overflow: hidden;
  padding-block: 40px 36px;
  background:
    radial-gradient(120% 80% at 88% -10%, #eef3ff 0%, rgba(255, 255, 255, 0) 58%),
    linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
}

.test-hero__bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(13, 23, 41, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(13, 23, 41, 0.045) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(90% 70% at 50% 0%, #000 10%, transparent 78%);
  -webkit-mask-image: radial-gradient(90% 70% at 50% 0%, #000 10%, transparent 78%);
  pointer-events: none;
}

.test-hero__inner {
  position: relative;
}

.test-hero__title {
  margin-top: 14px;
  font-size: clamp(24px, 6.8vw, 42px);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.test-hero__lead {
  margin-top: 14px;
  max-width: 42em;
  color: var(--ink-500);
  font-size: 15px;
  line-height: 1.9;
}

.test-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.test-hero__meta li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.8);
  color: var(--ink-600);
  font-size: 13px;
  font-weight: 600;
}

.test-hero__meta svg {
  color: var(--brand-600);
}

.intro__title {
  font-size: clamp(19px, 5.2vw, 22px);
  font-weight: 800;
}

.intro__lead {
  margin-top: 10px;
  color: var(--ink-500);
  font-size: 14px;
  line-height: 1.85;
}

.ages {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.ages__btn {
  display: grid;
  gap: 4px;
  width: 100%;
  min-height: 62px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: #fff;
  text-align: left;
  transition:
    border-color var(--dur-fast) linear,
    background-color var(--dur-fast) linear;
}

.ages__btn b {
  color: var(--ink-900);
  font-size: 16px;
  font-weight: 700;
}

.ages__btn em {
  color: var(--ink-400);
  font-size: 13px;
  font-style: normal;
}

.ages__btn.is-active {
  border-color: var(--brand-600);
  background: var(--brand-050);
  box-shadow: 0 0 0 3px rgba(27, 77, 255, 0.1);
}

.ages__btn.is-active em {
  color: var(--brand-700);
}

.intro__story {
  display: grid;
  gap: 6px;
  margin: 18px 0;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: var(--surface-soft);
  color: var(--ink-500);
  font-size: 13px;
  line-height: 1.85;
}

.intro__note {
  margin-top: 10px;
  color: var(--ink-400);
  font-size: 12px;
  text-align: center;
}

.result-wrap {
  display: grid;
  gap: 16px;
}

.result-wrap__back {
  justify-self: center;
  color: var(--ink-400);
  font-size: 13px;
}

@media (min-width: 760px) {
  .test-hero {
    padding-block: 60px 48px;
  }

  .ages {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
