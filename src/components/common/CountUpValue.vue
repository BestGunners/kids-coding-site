<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useCountUp } from '@/composables/useCountUp'

const props = withDefaults(
  defineProps<{
    value: number
    decimals?: number
    prefix?: string
    suffix?: string
    group?: boolean
    duration?: number
  }>(),
  { decimals: 0, prefix: '', suffix: '', group: false, duration: 1400 },
)

const el = ref<HTMLElement | null>(null)
const { display, start } = useCountUp(props.value, {
  decimals: props.decimals,
  group: props.group,
  duration: props.duration,
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    start()
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        start()
        observer?.disconnect()
        observer = null
      }
    },
    { threshold: 0.4 },
  )
  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <span ref="el" class="count-up">{{ prefix }}{{ display }}{{ suffix }}</span>
</template>

<style scoped>
.count-up {
  font-variant-numeric: tabular-nums;
}
</style>
