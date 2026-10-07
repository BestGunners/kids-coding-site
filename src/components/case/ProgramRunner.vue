<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { CircleCheckBig, Play, RotateCcw } from 'lucide-vue-next'
import CodeWindow from '@/components/common/CodeWindow.vue'

const CODE = `int ans = 0;
for (int i = 1; i <= 100; i++)
{
    if (i % 3 == 0 && i % 5 != 0)
        ans = ans + 1;
}
cout << ans;`

const TOTAL = 100
const DURATION = 2600

const current = ref(0)
const hits = ref(0)
const running = ref(false)
const finished = ref(false)

let frame = 0

const isMultipleOf3 = computed(() => current.value > 0 && current.value % 3 === 0)
const isNotMultipleOf5 = computed(() => current.value > 0 && current.value % 5 !== 0)
const counted = computed(() => isMultipleOf3.value && isNotMultipleOf5.value)
const activeLine = computed(() => (running.value ? (counted.value ? 5 : 3) : null))
const progress = computed(() => (current.value / TOTAL) * 100)

function reset(): void {
  if (frame) window.cancelAnimationFrame(frame)
  frame = 0
  running.value = false
  finished.value = false
  current.value = 0
  hits.value = 0
}

function finish(): void {
  running.value = false
  finished.value = true
  current.value = TOTAL
  hits.value = 27
  frame = 0
}

function run(): void {
  reset()
  running.value = true

  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  if (prefersReduced) {
    finish()
    return
  }

  const start = performance.now()
  const tick = (now: number): void => {
    const ratio = Math.min((now - start) / DURATION, 1)
    const target = Math.max(1, Math.round(ratio * TOTAL))

    for (let value = current.value + 1; value <= target; value += 1) {
      if (value % 3 === 0 && value % 5 !== 0) hits.value += 1
    }
    current.value = target

    if (ratio < 1) {
      frame = window.requestAnimationFrame(tick)
    } else {
      finish()
    }
  }
  frame = window.requestAnimationFrame(tick)
}

onBeforeUnmount(() => {
  if (frame) window.cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="runner">
    <CodeWindow :code="CODE" title="count_3_not_5.cpp" :active-line="activeLine" />

    <div class="runner__panel">
      <div class="runner__watch">
        <p class="runner__watch-label">变量监视</p>
        <div class="runner__vars mono">
          <span><em>i</em>{{ current }}</span>
          <span><em>ans</em>{{ hits }}</span>
        </div>
        <div class="runner__progress" aria-hidden="true">
          <span :style="{ width: `${progress}%` }" />
        </div>
      </div>

      <ul class="runner__checks">
        <li :class="{ 'is-on': isMultipleOf3 }">
          <span class="mono">i % 3 == 0</span>
          <b>{{ current ? (isMultipleOf3 ? '成立' : '不成立') : '—' }}</b>
        </li>
        <li :class="{ 'is-on': isNotMultipleOf5 }">
          <span class="mono">i % 5 != 0</span>
          <b>{{ current ? (isNotMultipleOf5 ? '成立' : '不成立') : '—' }}</b>
        </li>
        <li class="runner__checks-result" :class="{ 'is-count': counted }">
          <span>是否计入</span>
          <b>{{ counted ? '计入 +1' : '不计入' }}</b>
        </li>
      </ul>

      <div class="runner__console">
        <p v-if="!current" class="runner__console-line is-idle">// 点击“运行程序”，让计算机自己判断</p>
        <template v-else>
          <p class="runner__console-line">
            <span class="prompt">›</span>
            正在依次判断 1 ~ {{ current }} …
          </p>
          <p v-if="finished" class="runner__console-line is-done">
            <CircleCheckBig :size="16" />
            输出结果：<b class="mono">27</b>
          </p>
          <p v-else class="runner__console-line is-running">
            <span class="cursor" aria-hidden="true" />
            人工枚举要判断 100 次，计算机瞬间完成
          </p>
        </template>
      </div>

      <div class="runner__actions">
        <button type="button" class="btn btn--brand btn--sm" :disabled="running" @click="run">
          <Play :size="16" />
          {{ running ? '正在执行…' : finished ? '再运行一次' : '运行程序' }}
        </button>
        <button v-if="current" type="button" class="btn btn--quiet btn--sm" @click="reset">
          <RotateCcw :size="16" />
          重置
        </button>
        <span class="runner__hint">它不会漏掉任何一个数</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.runner {
  display: grid;
  gap: 14px;
}

.runner__panel {
  display: grid;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #fff;
}

.runner__watch-label {
  color: var(--ink-400);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.runner__vars {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}

.runner__vars span {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  color: var(--ink-900);
  font-size: 22px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.runner__vars em {
  color: var(--ink-400);
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
}

.runner__progress {
  height: 4px;
  margin-top: 12px;
  border-radius: 4px;
  background: var(--surface-muted);
  overflow: hidden;
}

.runner__progress span {
  display: block;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--brand-600), var(--cyan-500));
  transition: width 80ms linear;
}

.runner__checks {
  display: grid;
  gap: 8px;
}

.runner__checks li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--surface-soft);
  color: var(--ink-500);
  font-size: 13px;
  transition:
    border-color 120ms linear,
    background-color 120ms linear,
    color 120ms linear;
}

.runner__checks li b {
  font-weight: 700;
}

.runner__checks li.is-on {
  border-color: var(--brand-300);
  background: var(--brand-050);
  color: var(--brand-700);
}

.runner__checks-result.is-count {
  border-color: var(--positive-500);
  background: var(--positive-050);
  color: var(--positive-600);
}

.runner__console {
  min-height: 92px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  background: #0a1120;
  color: #b9c6dd;
  font-size: 13px;
}

.runner__console-line {
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.9;
  font-variant-numeric: tabular-nums;
}

.runner__console-line.is-idle {
  color: #64769c;
  font-family: var(--font-mono);
  font-size: 12px;
}

.runner__console-line .prompt {
  color: var(--brand-300);
}

.runner__console-line.is-done {
  color: #6fd0a4;
  font-weight: 650;
}

.runner__console-line.is-done b {
  color: #fff;
  font-size: 15px;
}

.runner__console-line.is-running {
  color: #7f8fb3;
}

.cursor {
  width: 7px;
  height: 14px;
  background: var(--brand-300);
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.runner__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.runner__hint {
  color: var(--ink-400);
  font-size: 12px;
}
</style>
