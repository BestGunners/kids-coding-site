<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import PosterFrame from '@/components/posters/PosterFrame.vue'
</script>

<template>
  <PosterFrame theme="light" footer-note="扫码让孩子自己做一次能力小测试" qr-caption="扫码测试">
    <span class="p-kicker">案例演示</span>
    <h2 class="p-title">一道奥数题，<br />用编程怎么解决？</h2>

    <p class="question">
      1～100 中，有多少个数<br />
      <span>既是 3 的倍数</span>，又<span>不是 5 的倍数</span>？
    </p>

    <div class="cols">
      <div class="col">
        <p class="col__label">数学思路</p>
        <p class="col__line">3 的倍数：33 个</p>
        <p class="col__line">其中 15 的倍数：6 个</p>
        <p class="col__line">33 − 6 = 27</p>
        <p class="col__result">27 个</p>
      </div>

      <div class="col col--code">
        <p class="col__label">编程思路</p>
        <pre class="code mono">int ans = 0;
for (int i=1; i&lt;=100; i++)
  if (i%3==0 &amp;&amp; i%5!=0)
    ans = ans + 1;
cout &lt;&lt; ans;   // 27</pre>
        <p class="col__result col__result--dark">27</p>
      </div>
    </div>

    <p class="same">
      <Check :size="14" />
      两种思路，得到同一个答案
    </p>

    <p class="p-quote">当问题变得复杂，编程可以让计算机成为我们的“计算助手”。</p>

    <p class="p-foot-note">想看孩子会怎么想？让他自己做一次 6 题小测试。</p>
  </PosterFrame>
</template>

<style scoped>
.question {
  margin-top: 14px;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface-soft);
  color: var(--ink-800);
  font-size: 12.5px;
  font-weight: 650;
  line-height: 1.75;
}

.question span {
  color: var(--brand-700);
  border-bottom: 2px solid var(--brand-300);
  white-space: nowrap;
}

.cols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
}

.col {
  padding: 11px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
}

.col--code {
  background: #0a1120;
  border-color: #0a1120;
}

.col__label {
  color: var(--ink-400);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.col--code .col__label {
  color: #7f8fb3;
}

.col__line {
  margin-top: 7px;
  color: var(--ink-600);
  font-size: 11.5px;
  line-height: 1.5;
}

.code {
  margin: 7px 0 0;
  color: #9fc0ff;
  font-size: 9px;
  line-height: 1.65;
  white-space: pre;
}

.col__result {
  margin-top: 10px;
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--brand-050);
  color: var(--brand-700);
  font-size: 15px;
  font-weight: 800;
  text-align: center;
}

.col__result--dark {
  background: rgba(63, 108, 255, 0.2);
  color: #b9caff;
}

.same {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  color: var(--positive-600);
  font-size: 11.5px;
  font-weight: 650;
}
</style>
