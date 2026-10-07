<script setup lang="ts">
import QrPlaceholder from '@/components/common/QrPlaceholder.vue'
import { siteConfig } from '@/data/site'

/**
 * 海报外壳。
 * 画布尺寸由 CSS 变量控制，方便同一份海报在不同场景复用：
 *   --poster-scale   缩放比例（1 = 设计稿尺寸，3 = 导出 3 倍图）
 *   --poster-canvas  画布高度（设计稿像素；设为 0 表示高度自适应，用于测量内容高度）
 * 宽度固定为设计稿 400px。
 */
withDefaults(
  defineProps<{
    theme?: 'dark' | 'light'
    /** 页脚主文案 */
    footerNote?: string
    /** 二维码说明 */
    qrCaption?: string
    /** 是否显示页脚 */
    footer?: boolean
  }>(),
  {
    theme: 'light',
    footerNote: '扫码做一次编程能力小测试',
    qrCaption: '扫码测试 / 咨询',
    footer: true,
  },
)
</script>

<template>
  <div class="poster-frame">
    <div class="poster-stage" data-poster-stage>
      <div class="poster" :class="`poster--${theme}`" data-poster>
        <div class="poster__body">
          <slot />
        </div>

        <footer v-if="footer" class="poster__footer">
          <QrPlaceholder :size="58" caption="" :seed="theme === 'dark' ? 21 : 34" />
          <div class="poster__footer-text">
            <b>{{ footerNote }}</b>
            <p>{{ siteConfig.orgName }} · {{ siteConfig.orgNote }}</p>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style>
/* 海报是固定尺寸画布：内部用绝对像素排版，整体等比缩放，便于截图与打印 */
.poster-frame {
  position: relative;
  overflow: hidden;
  flex: none;
  width: calc(400px * var(--poster-scale, 1));
  height: calc(var(--poster-canvas, 680px) * var(--poster-scale, 1));
}

.poster-stage {
  width: 400px;
  height: var(--poster-canvas, 680px);
  transform-origin: top left;
  transform: scale(var(--poster-scale, 1));
}

.poster {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: var(--poster-canvas, 680px);
  overflow: hidden;
  font-family: var(--font-sans);
  color: var(--ink-900);
  background: #fff;
}

/* 导出 PSD 时只让「字形」透明：
   - 不能用 visibility: hidden，它会把文字所在元素的背景块一起隐藏
   - 不能用 color: transparent，它会让 SVG 图标（stroke=currentColor）一起消失
   - text-fill-color 只影响文字填充，背景、边框、图标都保持不变 */
.poster.is-notext [data-text-leaf] {
  -webkit-text-fill-color: transparent;
  text-shadow: none !important;
}

.poster--dark {
  background: var(--ink-900);
  color: #eef3fc;
}

.poster__body {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 26px 26px 12px;
}

.poster__footer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 26px 18px;
  border-top: 1px solid var(--line);
}

.poster--dark .poster__footer {
  border-top-color: rgba(255, 255, 255, 0.14);
}

.poster__footer-text b {
  display: block;
  font-size: 12.5px;
  font-weight: 700;
  line-height: 1.5;
}

.poster__footer-text p {
  margin-top: 4px;
  color: var(--ink-400);
  font-size: 10.5px;
  line-height: 1.5;
}

.poster--dark .poster__footer-text p {
  color: #8798b5;
}

/* ---------- 海报内通用元素 ---------- */
.p-kicker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--brand-050);
  color: var(--brand-700);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.poster--dark .p-kicker {
  background: rgba(63, 108, 255, 0.22);
  color: #b9caff;
}

.p-title {
  margin-top: 14px;
  color: var(--ink-900);
  font-size: 27px;
  font-weight: 800;
  line-height: 1.32;
  letter-spacing: -0.02em;
}

.poster--dark .p-title {
  color: #ffffff;
}

.p-subtitle {
  margin-top: 10px;
  color: var(--ink-500);
  font-size: 12.5px;
  line-height: 1.75;
}

.poster--dark .p-subtitle {
  color: #a9b7ce;
}

.p-quote {
  margin-top: 14px;
  padding: 12px 14px;
  border-left: 3px solid var(--brand-600);
  border-radius: 0 10px 10px 0;
  background: var(--surface-soft);
  color: var(--ink-800);
  font-size: 12.5px;
  font-weight: 650;
  line-height: 1.7;
}

.poster--dark .p-quote {
  background: rgba(255, 255, 255, 0.06);
  color: #eef3fc;
}

.p-foot-note {
  margin-top: auto;
  padding-top: 12px;
  color: var(--ink-400);
  font-size: 10.5px;
  line-height: 1.6;
}

.poster--dark .p-foot-note {
  color: #8798b5;
}
</style>
