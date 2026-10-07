<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import PosterFrame from '@/components/posters/PosterFrame.vue'
import { bridgeRows } from '@/data/bridge'

const rows = bridgeRows.slice(0, 6)
</script>

<template>
  <PosterFrame theme="light" footer-note="扫码做一次编程能力小测试" qr-caption="扫码测试">
    <span class="p-kicker">奥数 × 编程</span>
    <h2 class="p-title">学奥数的孩子，<br />为什么适合学编程？</h2>
    <p class="p-subtitle">同一个能力，在数学里是解法，在编程里是程序。</p>

    <ul class="pairs">
      <li v-for="row in rows" :key="row.olympiad">
        <b>{{ row.olympiad }}</b>
        <ArrowRight :size="13" />
        <span class="mono">{{ row.programming }}</span>
      </li>
    </ul>

    <p class="p-quote">数学负责思考问题，编程让计算机帮助我们解决问题。</p>

    <p class="p-foot-note">测完立刻看到孩子的推荐学习方向。</p>
  </PosterFrame>
</template>

<style scoped>
.pairs {
  display: grid;
  gap: 6px;
  margin-top: 16px;
}

.pairs li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fff;
}

.pairs b {
  color: var(--ink-800);
  font-size: 12.5px;
  font-weight: 700;
}

.pairs svg {
  color: var(--brand-500);
}

.pairs span {
  justify-self: start;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--brand-050);
  color: var(--brand-700);
  font-size: 11.5px;
  font-weight: 700;
}

.p-quote {
  margin-top: 12px;
}
</style>
