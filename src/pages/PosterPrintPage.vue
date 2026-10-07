<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { posterComponents } from '@/components/posters/registry'
import { POSTER_HEIGHT, POSTER_WIDTH } from '@/data/posters'
import { collectPosterDump, markTextLeaves } from '@/utils/posterDump'

/**
 * 海报导出页：只渲染海报画布本身，方便用截图 / 打印导出为图片。
 * 访问示例：#/print/quiz-invite?scale=3 （scale=3 → 1200 × 1800）
 */
const route = useRoute()

const id = computed(() => String(route.params.id ?? ''))
const component = computed(() => posterComponents[id.value] ?? null)
const measureMode = computed(() => route.query.measure === '1')
/** 导出图层用：隐藏所有文字，只保留背景 / 卡片 / 线条 / 二维码 */
const noTextMode = computed(() => route.query.notext === '1')
/** 版面解析用：把文字行与坐标回传给本地导出脚本 */
const dumpMode = computed(() => route.query.dump === '1')
const canvasHeight = computed(() => {
  const raw = Number(route.query.canvas ?? POSTER_HEIGHT)
  return Number.isFinite(raw) && raw >= 0 ? raw : POSTER_HEIGHT
})
const scale = computed(() => {
  const raw = Number(route.query.scale ?? 1)
  return Number.isFinite(raw) && raw > 0 ? raw : 1
})

const stageStyle = computed(() => ({
  '--poster-scale': String(scale.value),
  '--poster-canvas': `${measureMode.value ? 0 : canvasHeight.value}px`,
}))

onMounted(() => {
  document.documentElement.style.background = '#ffffff'
  document.body.style.background = '#ffffff'
  document.body.style.margin = '0'

  // 标记文字节点：notext 模式下隐藏它们，dump 模式下用于导出可编辑文字图层
  nextTick(() => {
    const poster = document.querySelector<HTMLElement>('[data-poster]')
    if (!poster) return
    markTextLeaves(poster)

    if (noTextMode.value) {
      poster.classList.add('is-notext')
      return
    }

    window.setTimeout(() => {
      // 测量模式：把海报内容的真实高度写进 DOM，便于导出脚本确定画布高度
      if (measureMode.value) {
        document.documentElement.dataset.posterHeight = String(
          Math.round(poster.getBoundingClientRect().height / scale.value),
        )
        document.documentElement.dataset.posterWidth = String(POSTER_WIDTH)
        document.documentElement.dataset.posterId = id.value
        return
      }

      if (dumpMode.value) {
        const dump = collectPosterDump(poster, id.value)
        void fetch('/__dump', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dump),
        }).then(() => {
          document.documentElement.dataset.dumpDone = '1'
        })
      }
    }, 260)
  })
})
</script>

<template>
  <div class="print-page">
    <div v-if="component" class="print-page__stage" :style="stageStyle">
      <component :is="component" />
    </div>
    <p v-else class="print-page__empty">未找到该海报：{{ id }}</p>
  </div>
</template>

<style scoped>
.print-page {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
  background: #fff;
}

.print-page__stage {
  position: relative;
  overflow: hidden;
  flex: none;
}

.print-page__empty {
  padding: 40px;
  color: var(--ink-500);
}
</style>
