<script setup lang="ts">
import { ArrowRight, Sigma } from 'lucide-vue-next'
import ProgramRunner from '@/components/case/ProgramRunner.vue'

const mathSteps = [
  { label: '分析条件', text: '既是 3 的倍数，又不是 5 的倍数' },
  { label: '分类计算', text: '1～100 中 3 的倍数共 33 个' },
  { label: '排除重叠', text: '同时是 3 和 5 的倍数（15 的倍数）共 6 个' },
  { label: '得出结论', text: '33 − 6 = 27' },
]

const flow = [
  { step: '问题', text: '读懂题目要问什么' },
  { step: '算法', text: '让计算机逐个判断' },
  { step: '代码', text: '把判断条件写成程序' },
  { step: '执行', text: '计算机快速跑完 100 次' },
  { step: '结果', text: '得到答案：27' },
]
</script>

<template>
  <section id="case" class="section">
    <div class="container">
      <div class="section-head" v-reveal="{ variant: 'fade' }">
        <p class="eyebrow">02 · 案例演示</p>
        <h2 class="section-title">一道数学题，用编程怎么解决？</h2>
        <p class="section-lead">
          选一道家长和孩子都看得懂的题：同一道题，数学给出思路，程序负责把思路变成计算机能执行的步骤。
        </p>
      </div>

      <div class="question" v-reveal="{ delay: 60 }">
        <span class="question__badge"><Sigma :size="16" />题目</span>
        <p class="question__text">
          1～100 中，有多少个数<span class="question__mark">既是 3 的倍数</span>，
          又<span class="question__mark">不是 5 的倍数</span>？
        </p>
        <span class="question__tag">小学奥数常见题型 · 分类讨论</span>
      </div>

      <div class="case-grid">
        <div class="case-panel" v-reveal="{ variant: 'left', delay: 80 }">
          <header class="case-panel__head">
            <h3>数学思路</h3>
            <span>分析条件 → 分类 → 计算</span>
          </header>

          <ol class="math-steps">
            <li v-for="(item, index) in mathSteps" :key="item.label">
              <span class="math-steps__index">{{ index + 1 }}</span>
              <span class="math-steps__body">
                <b>{{ item.label }}</b>
                <em>{{ item.text }}</em>
              </span>
            </li>
          </ol>

          <p class="case-panel__result">
            <span>答案</span>
            <strong>27 个</strong>
          </p>
        </div>

        <div class="case-panel case-panel--code" v-reveal="{ variant: 'right', delay: 120 }">
          <header class="case-panel__head">
            <h3>编程思路</h3>
            <span>让计算机逐个判断</span>
          </header>

          <ProgramRunner />
        </div>
      </div>

      <div class="flow" v-reveal="{ delay: 60 }">
        <div class="flow__line grow-x" aria-hidden="true" />
        <ol class="flow__list">
          <li v-for="(item, index) in flow" :key="item.step" v-reveal="{ delay: index * 90, variant: 'fade' }">
            <span class="flow__dot" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <b>{{ item.step }}</b>
            <em>{{ item.text }}</em>
            <ArrowRight v-if="index < flow.length - 1" class="flow__arrow" :size="15" aria-hidden="true" />
          </li>
        </ol>
      </div>

      <p class="case-quote" v-reveal="{ delay: 100 }">
        当问题变得复杂，编程可以让计算机成为我们的“计算助手”。
      </p>
    </div>
  </section>
</template>

<style scoped>
.question {
  display: grid;
  gap: 12px;
  margin-top: 28px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, #ffffff 0%, var(--surface-soft) 100%);
}

.question__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: start;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: var(--ink-900);
  color: #fff;
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.04em;
}

.question__text {
  color: var(--ink-900);
  font-size: 18px;
  font-weight: 650;
  line-height: 1.8;
}

.question__mark {
  padding: 2px 4px;
  border-bottom: 2px solid var(--brand-300);
  color: var(--brand-700);
}

.question__tag {
  color: var(--ink-400);
  font-size: 12px;
}

.case-grid {
  display: grid;
  gap: 18px;
  margin-top: 20px;
}

.case-panel {
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #fff;
}

.case-panel--code {
  background: var(--surface-soft);
}

.case-panel__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
}

.case-panel__head h3 {
  font-size: 18px;
  font-weight: 750;
}

.case-panel__head span {
  color: var(--ink-400);
  font-size: 12px;
}

.math-steps {
  display: grid;
  gap: 14px;
}

.math-steps li {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 12px;
}

.math-steps__index {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  color: var(--ink-500);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
}

.math-steps__body {
  display: grid;
  gap: 2px;
}

.math-steps__body b {
  color: var(--ink-800);
  font-size: 14px;
  font-weight: 700;
}

.math-steps__body em {
  color: var(--ink-500);
  font-size: 14px;
  font-style: normal;
  line-height: 1.7;
}

.case-panel__result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: var(--ink-900);
  color: #fff;
  font-size: 14px;
}

.case-panel__result strong {
  font-size: 20px;
  font-weight: 800;
}

.flow {
  position: relative;
  margin-top: 34px;
}

.flow__line {
  display: none;
}

.flow__list {
  display: grid;
  gap: 10px;
}

.flow__list li {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 10px 12px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: #fff;
}

.flow__dot {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  grid-row: span 2;
  border-radius: 10px;
  background: var(--brand-050);
  color: var(--brand-700);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
}

.flow__list b {
  color: var(--ink-900);
  font-size: 15px;
  font-weight: 700;
}

.flow__list em {
  color: var(--ink-400);
  font-size: 13px;
  font-style: normal;
}

.flow__arrow {
  display: none;
}

.case-quote {
  margin-top: 26px;
  padding: 20px 22px;
  border-left: 3px solid var(--ink-900);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: var(--surface-muted);
  color: var(--ink-800);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.75;
}

@media (min-width: 900px) {
  .question {
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 18px;
    padding: 22px 24px;
  }

  .question__text {
    font-size: 20px;
  }

  .case-grid {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    align-items: start;
  }

  .flow__list {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0;
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: #fff;
  }

  .flow__list li {
    grid-template-columns: auto minmax(0, 1fr);
    border: 0;
    border-right: 1px solid var(--line);
    border-radius: 0;
    padding: 18px 16px;
  }

  .flow__list li:last-child {
    border-right: 0;
  }

  .flow__arrow {
    position: absolute;
    right: -8px;
    top: 22px;
    display: block;
    color: var(--brand-400, var(--brand-500));
  }
}
</style>
