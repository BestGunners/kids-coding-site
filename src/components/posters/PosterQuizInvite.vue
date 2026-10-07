<script setup lang="ts">
import PosterFrame from '@/components/posters/PosterFrame.vue'
import { quizQuestions } from '@/data/quiz'
</script>

<template>
  <PosterFrame theme="light" footer-note="扫码开始测试 · 约 1 分钟" qr-caption="扫码开始测试">
    <span class="p-kicker">6 题速测 · 面向奥数 / 物理学生家长</span>
    <h2 class="p-title">你的孩子<br />适合学编程吗？</h2>
    <p class="p-subtitle">用 6 个问题，快速了解孩子的编程潜力。家长代填即可。</p>

    <ol class="questions">
      <li v-for="item in quizQuestions" :key="item.id">
        <span class="mono">{{ String(item.index).padStart(2, '0') }}</span>
        {{ item.title }}
      </li>
    </ol>

    <p class="p-quote">
      结果会给出推荐学习方向与下一步建议，不会出现“孩子不适合学编程”这样的结论。
    </p>

    <p class="p-foot-note">测试结果仅作为方向参考，不构成对孩子学习能力的评价。</p>
  </PosterFrame>
</template>

<style scoped>
.questions {
  display: grid;
  gap: 7px;
  margin-top: 16px;
}

.questions li {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 8px;
  padding: 8px 11px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fff;
  color: var(--ink-800);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.55;
}

.questions span {
  color: var(--brand-600);
  font-size: 11px;
  font-weight: 700;
  padding-top: 1px;
}
</style>
