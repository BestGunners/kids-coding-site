<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { abilityDestinations, abilityModules } from '@/data/abilities'
</script>

<template>
  <section id="ability" class="section section--soft">
    <div class="container">
      <div class="section-head" v-reveal="{ variant: 'fade' }">
        <p class="eyebrow">03 · 能力培养</p>
        <h2 class="section-title">编程，不只是“学电脑”。</h2>
        <p class="section-lead">
          学编程真正沉淀下来的，是一种处理问题的习惯：把复杂的事拆开、找到更优的做法、再交给计算机去执行。
        </p>
      </div>

      <ul class="ability">
        <li
          v-for="(item, index) in abilityModules"
          :key="item.title"
          class="ability__item"
          v-reveal="{ delay: index * 80 }"
        >
          <div class="ability__top">
            <span class="ability__icon"><AppIcon :name="item.icon" :size="20" /></span>
            <span class="ability__index mono">{{ item.index }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p class="ability__summary">{{ item.summary }}</p>
          <p class="ability__observable">
            <span>家长可以观察到</span>
            {{ item.observable }}
          </p>
        </li>
      </ul>

      <div class="destinations" v-reveal="{ delay: 80 }">
        <div class="destinations__text">
          <b>这些能力可以通向</b>
          <p>方向很多，但基础是同一套：先学会把问题想清楚、写下来、跑起来。</p>
        </div>
        <ul class="destinations__tags">
          <li v-for="tag in abilityDestinations" :key="tag">{{ tag }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ability {
  display: grid;
  gap: 1px;
  margin-top: 32px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--line);
  overflow: hidden;
}

.ability__item {
  display: grid;
  gap: 10px;
  padding: 22px 20px;
  background: #fff;
}

.ability__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ability__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--brand-050);
  color: var(--brand-700);
}

.ability__index {
  color: var(--ink-200);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.ability__item h3 {
  font-size: 18px;
  font-weight: 750;
}

.ability__summary {
  color: var(--ink-500);
  font-size: 14px;
  line-height: 1.75;
}

.ability__observable {
  padding-top: 12px;
  border-top: 1px dashed var(--line-strong);
  color: var(--ink-400);
  font-size: 13px;
  line-height: 1.75;
}

.ability__observable span {
  display: block;
  margin-bottom: 2px;
  color: var(--ink-600);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.destinations {
  display: grid;
  gap: 16px;
  margin-top: 22px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #fff;
}

.destinations__text b {
  color: var(--ink-900);
  font-size: 15px;
  font-weight: 750;
}

.destinations__text p {
  margin-top: 6px;
  color: var(--ink-500);
  font-size: 13px;
  line-height: 1.75;
}

.destinations__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.destinations__tags li {
  padding: 6px 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  background: var(--surface-soft);
  color: var(--ink-600);
  font-size: 13px;
  font-weight: 600;
}

@media (min-width: 760px) {
  .ability {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1000px) {
  .ability {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .destinations {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 24px;
  }
}
</style>
