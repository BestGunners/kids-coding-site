<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const visible = ref(false)

function onScroll(): void {
  visible.value = window.scrollY > 900
}

function toTop(): void {
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="fade">
    <button v-if="visible" type="button" class="back-to-top" @click="toTop">
      <ArrowUp :size="18" />
      <span class="sr-only">回到顶部</span>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 20px;
  bottom: calc(24px + var(--safe-bottom));
  z-index: 30;
  display: none;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: var(--ink-700);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(8px);
}

.back-to-top:hover {
  color: var(--brand-700);
  border-color: var(--brand-300);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (min-width: 900px) {
  .back-to-top {
    display: grid;
  }
}
</style>
