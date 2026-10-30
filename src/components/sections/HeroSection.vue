<script setup lang="ts">
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-vue-next'
import CodeWindow from '@/components/common/CodeWindow.vue'

const emit = defineEmits<{ (event: 'roadmap'): void }>()

const heroCode = `int ans = 0;
for (int i = 1; i <= 100; i++)
    ans = ans + i;
cout << ans;   // 5050`

const chips = [
  { label: '找规律', arrow: '算法', top: '12%', left: '-4%' },
  { label: '分类讨论', arrow: '条件判断', top: '54%', left: '-6%' },
  { label: '枚举尝试', arrow: '循环', top: '84%', left: '2%' },
]
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero__grid-bg" aria-hidden="true" />
    <div class="hero__glow" aria-hidden="true" />

    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="eyebrow" v-reveal="{ variant: 'fade' }">少儿编程 · 能力探索</p>
        <h1 class="hero__title" v-reveal="{ delay: 60 }">
          孩子数学不错，<br />要不要学编程？
        </h1>
        <p class="hero__lead" v-reveal="{ delay: 120 }">
          如果孩子喜欢思考、善于发现规律、愿意挑战难题，编程可能是数学思维很好的延伸。
        </p>

        <div class="hero__actions btn-row" v-reveal="{ delay: 180 }">
          <RouterLink class="btn btn--brand" to="/test">
            开始 15 题能力测评
            <ArrowRight :size="18" />
          </RouterLink>
          <button type="button" class="btn btn--ghost" @click="emit('roadmap')">
            了解编程学习路线
          </button>
        </div>

        <ul class="hero__notes" v-reveal="{ delay: 240 }">
          <li><Sparkles :size="16" />15 道题，约 6～8 分钟</li>
          <li><Sparkles :size="16" />适合 6～15 岁，有无基础都可以</li>
          <li><Sparkles :size="16" />结果给出方向建议，而不是给孩子贴标签</li>
        </ul>
      </div>

      <div class="hero__visual" v-reveal="{ delay: 140, variant: 'zoom' }">
        <svg class="hero__graph" viewBox="0 0 320 320" aria-hidden="true">
          <defs>
            <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#1b4dff" stop-opacity="0.55" />
              <stop offset="100%" stop-color="#0fb0d4" stop-opacity="0.25" />
            </linearGradient>
          </defs>
          <circle cx="160" cy="160" r="118" fill="none" stroke="var(--line)" stroke-dasharray="4 7" />
          <circle cx="160" cy="160" r="76" fill="none" stroke="var(--line)" />
          <g stroke="url(#heroLine)" stroke-width="1.4" fill="none">
            <path d="M160 42 L262 104 L262 216 L160 278 L58 216 L58 104 Z" />
            <path d="M160 42 L160 278 M58 104 L262 216 M262 104 L58 216" opacity="0.45" />
          </g>
          <g fill="#1b4dff">
            <circle class="pulse" cx="160" cy="42" r="4.5" />
            <circle class="pulse pulse--2" cx="262" cy="104" r="4.5" />
            <circle class="pulse pulse--3" cx="58" cy="216" r="4.5" />
            <circle class="pulse pulse--4" cx="262" cy="216" r="4.5" />
            <circle class="pulse pulse--5" cx="58" cy="104" r="3.5" />
            <circle class="pulse pulse--6" cx="160" cy="278" r="3.5" />
          </g>
        </svg>

        <span v-for="chip in chips" :key="chip.label" class="hero__chip" :style="{ top: chip.top, left: chip.left }">
          <b>{{ chip.label }}</b>
          <ArrowRight :size="13" />
          <b class="hero__chip-target">{{ chip.arrow }}</b>
        </span>

        <div class="hero__card">
          <div class="hero__card-head">
            <span>同一道题，两种解法</span>
            <span class="tag tag--brand">数学 → 程序</span>
          </div>

          <div class="hero__math">
            <p class="hero__math-label">数学：找规律</p>
            <p class="hero__math-formula mono">1 + 2 + 3 + … + 100 = ?</p>
            <p class="hero__math-note">首尾配对：100 × 101 ÷ 2 = 5050</p>
          </div>

          <div class="hero__arrow" aria-hidden="true">
            <ArrowDown :size="18" />
            <span>把“怎么算”写清楚</span>
          </div>

          <CodeWindow :code="heroCode" title="sum_1_to_100.cpp" compact />

          <p class="hero__result">
            计算机执行结果
            <strong class="mono">5050</strong>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-block: 44px 56px;
  background:
    radial-gradient(120% 80% at 88% -10%, #eef3ff 0%, rgba(255, 255, 255, 0) 58%),
    linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
}

.hero__grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(13, 23, 41, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(13, 23, 41, 0.045) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(90% 70% at 50% 0%, #000 10%, transparent 78%);
  -webkit-mask-image: radial-gradient(90% 70% at 50% 0%, #000 10%, transparent 78%);
  pointer-events: none;
}

.hero__glow {
  position: absolute;
  top: -120px;
  right: -80px;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(27, 77, 255, 0.16), transparent 65%);
  filter: blur(10px);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  display: grid;
  gap: 40px;
}

.hero__title {
  margin-top: 16px;
  font-size: clamp(30px, 8.4vw, 56px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.hero__lead {
  margin-top: 18px;
  max-width: 34em;
  color: var(--ink-500);
  font-size: 16px;
  line-height: 1.9;
}

.hero__actions {
  margin-top: 26px;
}

.hero__actions .btn {
  flex: 1 1 240px;
}

.hero__notes {
  display: grid;
  gap: 8px;
  margin-top: 24px;
  color: var(--ink-400);
  font-size: 13px;
}

.hero__notes li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero__notes svg {
  color: var(--brand-600);
  flex: none;
}

.hero__visual {
  position: relative;
  min-height: 360px;
}

.hero__graph {
  display: none;
}

.hero__chip {
  display: none;
}

.hero__card {
  position: relative;
  display: grid;
  gap: 14px;
  padding: 18px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.hero__card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  font-weight: 650;
  color: var(--ink-500);
}

.hero__math {
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--surface-soft);
}

.hero__math-label {
  color: var(--ink-400);
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.06em;
}

.hero__math-formula {
  margin-top: 6px;
  color: var(--ink-900);
  font-size: 15px;
  font-weight: 600;
}

.hero__math-note {
  margin-top: 6px;
  color: var(--ink-500);
  font-size: 13px;
}

.hero__arrow {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--ink-400);
  font-size: 12px;
  font-weight: 600;
}

.hero__arrow svg {
  color: var(--brand-600);
}

.hero__result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  background: var(--brand-050);
  color: var(--brand-700);
  font-size: 13px;
  font-weight: 650;
}

.hero__result strong {
  font-size: 18px;
  letter-spacing: 0.02em;
}

@keyframes heroPulse {
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 1;
  }
}

.pulse {
  animation: heroPulse 3.4s var(--ease-in-out) infinite;
}

.pulse--2 {
  animation-delay: 0.4s;
}

.pulse--3 {
  animation-delay: 0.9s;
}

.pulse--4 {
  animation-delay: 1.4s;
}

.pulse--5 {
  animation-delay: 1.9s;
}

.pulse--6 {
  animation-delay: 2.4s;
}

@media (min-width: 720px) {
  .hero {
    padding-block: 64px 80px;
  }

  .hero__card {
    padding: 22px;
  }
}

@media (min-width: 1024px) {
  .hero {
    padding-block: 84px 104px;
  }

  .hero__inner {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    align-items: center;
    gap: 56px;
  }

  .hero__visual {
    min-height: 520px;
  }

  .hero__graph {
    display: block;
    position: absolute;
    inset: -6% -8% auto auto;
    width: 108%;
    max-width: none;
    opacity: 0.9;
  }

  .hero__chip {
    position: absolute;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 12px;
    border: 1px solid var(--line);
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.94);
    box-shadow: var(--shadow-sm);
    color: var(--ink-500);
    font-size: 12px;
    backdrop-filter: blur(6px);
    transform: translateX(-50%);
  }

  .hero__chip b {
    font-weight: 650;
    color: var(--ink-800);
  }

  .hero__chip svg {
    color: var(--brand-600);
  }

  .hero__chip-target {
    color: var(--brand-700) !important;
  }

  .hero__card {
    position: relative;
    z-index: 3;
    max-width: 420px;
    margin-left: auto;
  }
}
</style>
