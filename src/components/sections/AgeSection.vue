<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { ageConclusion, ageStages } from '@/data/ages'
</script>

<template>
  <section id="age" class="section section--soft">
    <div class="container">
      <div class="section-head" v-reveal="{ variant: 'fade' }">
        <p class="eyebrow">06 · 年龄与起点</p>
        <h2 class="section-title">孩子什么时候适合开始学编程？</h2>
        <p class="section-lead">
          不建议简单地说“越早越好”。不同年龄的孩子，认知水平和注意力时长差别很大，
          适合的学习方式也完全不同。
        </p>
      </div>

      <ul class="ages">
        <li v-for="(item, index) in ageStages" :key="item.id" v-reveal="{ delay: index * 80 }">
          <header class="ages__head">
            <span class="ages__icon"><AppIcon :name="item.icon" :size="20" /></span>
            <div>
              <p class="ages__age">{{ item.age }}</p>
              <p class="ages__stage">{{ item.stage }}</p>
            </div>
          </header>

          <ul class="ages__content">
            <li v-for="content in item.content" :key="content">{{ content }}</li>
          </ul>

          <p class="ages__focus">
            <span>家长关注</span>
            {{ item.focus }}
          </p>
        </li>
      </ul>

      <p class="ages__conclusion" v-reveal="{ delay: 80 }">{{ ageConclusion }}</p>
    </div>
  </section>
</template>

<style scoped>
.ages {
  display: grid;
  gap: 14px;
  margin-top: 32px;
}

.ages > li {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 22px 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #fff;
}

.ages__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ages__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 12px;
  background: var(--brand-050);
  color: var(--brand-700);
}

.ages__age {
  color: var(--ink-900);
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.ages__stage {
  color: var(--ink-400);
  font-size: 13px;
}

.ages__content {
  display: grid;
  gap: 8px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.ages__content li {
  display: grid;
  grid-template-columns: 14px minmax(0, 1fr);
  gap: 6px;
  color: var(--ink-600);
  font-size: 14px;
  line-height: 1.7;
}

.ages__content li::before {
  content: '';
  width: 5px;
  height: 5px;
  margin-top: 10px;
  border-radius: 50%;
  background: var(--brand-500);
}

.ages__focus {
  color: var(--ink-500);
  font-size: 13px;
  line-height: 1.8;
}

.ages__focus span {
  display: inline-block;
  margin-right: 6px;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  background: var(--surface-muted);
  color: var(--ink-600);
  font-size: 12px;
  font-weight: 700;
}

.ages__conclusion {
  margin-top: 26px;
  padding: 20px 22px;
  border-left: 3px solid var(--brand-600);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: #fff;
  color: var(--ink-800);
  font-size: 15px;
  font-weight: 650;
  line-height: 1.85;
}

@media (min-width: 860px) {
  .ages {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
