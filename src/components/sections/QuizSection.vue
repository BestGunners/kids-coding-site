<script setup lang="ts">
import QuizRunner from '@/components/quiz/QuizRunner.vue'

const emit = defineEmits<{ (event: 'book'): void }>()
</script>

<template>
  <section id="quiz" class="quiz-section">
    <div class="quiz-section__bg" aria-hidden="true" />
    <div class="container quiz-section__inner">
      <div class="section-head section-head--center" v-reveal="{ variant: 'fade' }">
        <p class="eyebrow">06 · 1 分钟快测</p>
        <h2 class="section-title">你的孩子适合学编程吗？</h2>
        <p class="section-lead">6 道题，约 1 分钟，家长代填即可。</p>
      </div>

      <div class="quiz-section__card" v-reveal="{ delay: 80 }">
        <QuizRunner @book="emit('book')" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.quiz-section {
  position: relative;
  overflow: hidden;
  padding-block: var(--section-y);
  background:
    radial-gradient(90% 60% at 50% 0%, #eef3ff 0%, rgba(255, 255, 255, 0) 62%),
    linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
}

.quiz-section__bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(13, 23, 41, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(13, 23, 41, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 78%);
  -webkit-mask-image: radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 76%);
  pointer-events: none;
}

.quiz-section__inner {
  position: relative;
}

.quiz-section__card {
  margin-top: 32px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  background: #fff;
  box-shadow: var(--shadow-lg);
}

@media (min-width: 760px) {
  .quiz-section__card {
    padding: 32px;
  }
}
</style>
