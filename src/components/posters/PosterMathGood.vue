<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import PosterFrame from '@/components/posters/PosterFrame.vue'
import { quizQuestions } from '@/data/quiz'

const rows = [
  { from: '奥数训练孩子「想出答案」', to: '编程训练孩子「让计算机执行答案」' },
  { from: '一道题只有一种结果', to: '一段程序可以反复运行、反复验证' },
]

const questionCount = quizQuestions.length
</script>

<template>
  <PosterFrame theme="dark" footer-note="扫码做一次编程能力小测试" qr-caption="扫码测试">
    <span class="p-kicker">少儿编程 · 能力探索</span>
    <h2 class="p-title">孩子数学不错，<br />要不要学编程？</h2>
    <p class="p-subtitle">
      如果孩子喜欢思考、善于发现规律、愿意挑战难题，编程可能是数学思维很好的延伸。
    </p>

    <ul class="rows">
      <li v-for="row in rows" :key="row.from">
        <b>{{ row.from }}</b>
        <ArrowRight :size="14" />
        <b class="rows__to">{{ row.to }}</b>
      </li>
    </ul>

    <div class="code">
      <p class="code__math mono">1 + 2 + 3 + … + 100 = 5050</p>
      <p class="code__row mono">for (int i = 1; i &lt;= 100; i++)</p>
      <p class="code__row mono">&nbsp;&nbsp;&nbsp;&nbsp;ans = ans + i;</p>
      <p class="code__result">同一道题，两种解法</p>
    </div>

    <p class="p-quote">
      会做题，是一种能力。<br />让计算机帮你解决问题，是另一种能力。
    </p>

    <p class="p-foot-note">{{ questionCount }} 道题 · 约 1 分钟 · 测完立刻看到建议方向</p>
  </PosterFrame>
</template>

<style scoped>
.rows {
  display: grid;
  gap: 8px;
  margin-top: 16px;
}

.rows li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  padding: 9px 11px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  font-size: 11px;
  line-height: 1.5;
}

.rows b {
  font-weight: 650;
  color: #dbe4f4;
}

.rows svg {
  color: #7fa7ff;
}

.rows__to {
  color: #a9c0ff !important;
}

.code {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.32);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.code__math {
  color: #b9c6dd;
  font-size: 11px;
}

.code__row {
  margin-top: 5px;
  color: #7fa7ff;
  font-size: 11px;
}

.code__result {
  margin-top: 8px;
  color: #6fd0a4;
  font-size: 11px;
  font-weight: 650;
}
</style>
