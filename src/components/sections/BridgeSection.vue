<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import AppIcon from '@/components/common/AppIcon.vue'
import { bridgeRows } from '@/data/bridge'
</script>

<template>
  <section id="bridge" class="section section--soft">
    <div class="container">
      <div class="section-head" v-reveal="{ variant: 'fade' }">
        <p class="eyebrow">01 · 能力迁移</p>
        <h2 class="section-title">学奥数的孩子，为什么适合学编程？</h2>
        <p class="section-lead">
          奥数训练的是“想到解法”，编程训练的是“把解法写成计算机能执行的步骤”。两者练的其实是同一批底层能力，
          只是一个停留在纸面，一个可以真正跑起来。
        </p>
      </div>

      <div class="bridge" v-reveal="{ delay: 80 }">
        <div class="bridge__head">
          <span>奥数中练的能力</span>
          <span aria-hidden="true" />
          <span>编程中对应的能力</span>
          <span class="bridge__head-note">为什么可以迁移</span>
        </div>

        <ul class="bridge__list">
          <li
            v-for="(row, index) in bridgeRows"
            :key="row.olympiad"
            v-reveal="{ delay: index * 60, variant: 'fade' }"
          >
            <span class="bridge__from">
              <AppIcon :name="row.icon" :size="18" />
              <b>{{ row.olympiad }}</b>
            </span>
            <ArrowRight class="bridge__arrow" :size="16" aria-hidden="true" />
            <span class="bridge__to mono">{{ row.programming }}</span>
            <span class="bridge__note">{{ row.note }}</span>
          </li>
        </ul>
      </div>

      <p class="bridge__quote" v-reveal="{ delay: 120 }">
        数学负责思考问题，编程让计算机帮助我们解决问题。
      </p>
    </div>
  </section>
</template>

<style scoped>
.bridge {
  margin-top: 32px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #fff;
  overflow: hidden;
}

.bridge__head {
  display: none;
}

.bridge__list li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--line);
}

.bridge__list li:last-child {
  border-bottom: 0;
}

.bridge__from {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ink-800);
  font-size: 15px;
  font-weight: 650;
}

.bridge__from svg {
  color: var(--ink-300);
  flex: none;
}

.bridge__arrow {
  color: var(--brand-500);
}

.bridge__to {
  justify-self: start;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  background: var(--brand-050);
  color: var(--brand-700);
  font-size: 13px;
  font-weight: 650;
}

.bridge__note {
  grid-column: 1 / -1;
  color: var(--ink-400);
  font-size: 13px;
  line-height: 1.7;
}

.bridge__quote {
  margin-top: 26px;
  padding: 20px 22px;
  border-left: 3px solid var(--brand-600);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: var(--brand-050);
  color: var(--ink-900);
  font-size: 17px;
  font-weight: 700;
  line-height: 1.7;
}

@media (min-width: 900px) {
  .bridge__head {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) 40px minmax(0, 0.9fr) minmax(0, 1.45fr);
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border-bottom: 1px solid var(--line);
    background: var(--surface-soft);
    color: var(--ink-400);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
  }

  .bridge__list li {
    grid-template-columns: minmax(0, 0.85fr) 40px minmax(0, 0.9fr) minmax(0, 1.45fr);
    padding: 14px 18px;
    transition: background-color var(--dur-fast) linear;
  }

  .bridge__list li:hover {
    background: var(--surface-soft);
  }

  .bridge__note {
    grid-column: auto;
  }
}
</style>
