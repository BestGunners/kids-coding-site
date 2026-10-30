<script setup lang="ts">
import CountUpValue from '@/components/common/CountUpValue.vue'

const stats = [
  { value: 8, suffix: ' 个', label: '成长阶段', note: '从兴趣启蒙到信息学竞赛' },
  { value: 3, suffix: ' 条', label: '发展路线', note: '兴趣 / 能力 / 竞赛' },
  { value: 15, suffix: ' 道题', label: '能力测评', note: '约 6～8 分钟，孩子动手做' },
  { value: 60, suffix: ' 分钟', label: '体验课', note: '无需任何编程基础' },
]
</script>

<template>
  <section class="stats" aria-label="项目概览">
    <div class="container">
      <ul class="stats__list">
        <li v-for="(item, index) in stats" :key="item.label" v-reveal="{ delay: index * 70 }">
          <p class="stats__value">
            <CountUpValue :value="item.value" :suffix="item.suffix" />
          </p>
          <p class="stats__label">{{ item.label }}</p>
          <p class="stats__note">{{ item.note }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.stats {
  padding-block: 8px 0;
}

.stats__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--line);
}

.stats__list li {
  padding: 18px 16px;
  background: #fff;
}

.stats__value {
  color: var(--ink-900);
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.stats__label {
  margin-top: 4px;
  color: var(--ink-700);
  font-size: 14px;
  font-weight: 650;
}

.stats__note {
  margin-top: 4px;
  color: var(--ink-400);
  font-size: 12px;
  line-height: 1.6;
}

@media (min-width: 860px) {
  .stats__list {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .stats__list li {
    padding: 24px 22px;
  }
}
</style>
