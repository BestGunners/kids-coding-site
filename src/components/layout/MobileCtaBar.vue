<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { CalendarCheck, ClipboardCheck } from 'lucide-vue-next'

const emit = defineEmits<{
  (event: 'quiz'): void
  (event: 'book'): void
}>()

const visible = ref(false)

function onScroll(): void {
  visible.value = window.scrollY > 620
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="bar">
    <div v-if="visible" class="mobile-bar">
      <button type="button" class="mobile-bar__btn mobile-bar__btn--ghost" @click="emit('quiz')">
        <ClipboardCheck :size="18" />
        测一测
      </button>
      <button type="button" class="mobile-bar__btn mobile-bar__btn--brand" @click="emit('book')">
        <CalendarCheck :size="18" />
        预约体验课
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.mobile-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 45;
  display: flex;
  gap: 10px;
  padding: 10px 14px calc(10px + var(--safe-bottom));
  background: rgba(255, 255, 255, 0.94);
  border-top: 1px solid var(--line);
  backdrop-filter: blur(12px);
}

.mobile-bar__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 48px;
  border-radius: var(--radius-pill);
  font-size: 15px;
  font-weight: 650;
}

.mobile-bar__btn--ghost {
  flex: 0 0 38%;
  border: 1px solid var(--line-strong);
  background: #fff;
  color: var(--ink-800);
}

.mobile-bar__btn--brand {
  flex: 1;
  background: var(--brand-600);
  color: #fff;
  box-shadow: 0 10px 24px -12px rgba(27, 77, 255, 0.8);
}

.bar-enter-active,
.bar-leave-active {
  transition: transform var(--dur) var(--ease-out);
}

.bar-enter-from,
.bar-leave-to {
  transform: translateY(100%);
}

@media (min-width: 900px) {
  .mobile-bar {
    display: none;
  }
}
</style>
