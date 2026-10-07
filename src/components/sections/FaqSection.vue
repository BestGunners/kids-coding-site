<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, MessageCircle } from 'lucide-vue-next'
import { faqs } from '@/data/faqs'

const openId = ref<string | null>(faqs[0]?.id ?? null)

function toggle(id: string): void {
  openId.value = openId.value === id ? null : id
}

const emit = defineEmits<{ (event: 'contact'): void }>()
</script>

<template>
  <section id="faq" class="section">
    <div class="container container--narrow">
      <div class="section-head" v-reveal="{ variant: 'fade' }">
        <p class="eyebrow">07 · 家长问答</p>
        <h2 class="section-title">家长最常问的几个问题</h2>
        <p class="section-lead">
          这些问题几乎每一位家长都会问。我们把回答放在这里，是为了让家长在做决定前，先把顾虑说清楚。
        </p>
      </div>

      <ul class="faq" v-reveal="{ delay: 60 }">
        <li v-for="(item, index) in faqs" :key="item.id" :class="{ 'is-open': openId === item.id }">
          <h3>
            <button
              type="button"
              class="faq__question"
              :aria-expanded="openId === item.id"
              :aria-controls="`faq-answer-${item.id}`"
              @click="toggle(item.id)"
            >
              <span class="faq__index mono">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="faq__text">{{ item.question }}</span>
              <ChevronDown class="faq__chevron" :size="18" aria-hidden="true" />
            </button>
          </h3>

          <div :id="`faq-answer-${item.id}`" class="faq__answer">
            <div class="faq__answer-inner">
              <p class="faq__answer-main">{{ item.answer }}</p>
              <p v-if="item.extra" class="faq__answer-extra">{{ item.extra }}</p>
            </div>
          </div>
        </li>
      </ul>

      <p class="faq__more" v-reveal="{ delay: 60 }">
        还有其他疑问？
        <button type="button" class="text-link" @click="emit('contact')">
          <MessageCircle :size="15" />
          直接和编程课程老师沟通
        </button>
      </p>
    </div>
  </section>
</template>

<style scoped>
.faq {
  margin-top: 30px;
  border-top: 1px solid var(--line);
}

.faq li {
  border-bottom: 1px solid var(--line);
}

.faq h3 {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}

.faq__question {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) 24px;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 20px 0;
  text-align: left;
}

.faq__index {
  color: var(--ink-300);
  font-size: 13px;
  font-weight: 700;
}

.faq__text {
  color: var(--ink-900);
  font-size: 16px;
  font-weight: 650;
  line-height: 1.6;
}

.faq__chevron {
  color: var(--ink-400);
  transition: transform var(--dur) var(--ease-out);
}

.faq li.is-open .faq__chevron {
  transform: rotate(180deg);
  color: var(--brand-600);
}

.faq li.is-open .faq__text {
  color: var(--brand-700);
}

.faq__answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms var(--ease-out);
}

.faq li.is-open .faq__answer {
  grid-template-rows: 1fr;
}

.faq__answer-inner {
  overflow: hidden;
}

.faq__answer-main {
  padding-bottom: 12px;
  color: var(--ink-700);
  font-size: 15px;
  line-height: 1.9;
}

.faq__answer-extra {
  margin-bottom: 20px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: var(--surface-soft);
  color: var(--ink-500);
  font-size: 13px;
  line-height: 1.9;
}

.faq__more {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  color: var(--ink-400);
  font-size: 14px;
}

.faq__more .text-link {
  font-size: 14px;
}

@media (min-width: 760px) {
  .faq__question {
    padding: 24px 0;
  }

  .faq__text {
    font-size: 17px;
  }

  .faq__answer-inner {
    padding-left: 42px;
  }
}
</style>
