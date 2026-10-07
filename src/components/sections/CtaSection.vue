<script setup lang="ts">
import { CalendarCheck, Copy, MessageCircle, Phone, QrCode, Sparkles } from 'lucide-vue-next'
import QrPlaceholder from '@/components/common/QrPlaceholder.vue'
import { useClipboard } from '@/composables/useClipboard'
import { siteConfig } from '@/data/site'

const emit = defineEmits<{
  (event: 'book'): void
  (event: 'quiz'): void
}>()

const { copied, copy } = useClipboard()

const trialTags = ['60 分钟体验课', '一人一台电脑', '无需编程基础', '家长可陪同旁听']

const telHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`
</script>

<template>
  <section id="cta" class="cta">
    <div class="cta__bg" aria-hidden="true" />
    <div class="container cta__inner">
      <div class="cta__copy" v-reveal="{ variant: 'fade' }">
        <p class="eyebrow">08 · 体验与咨询</p>
        <h2 class="cta__title">给孩子一次真正的编程体验</h2>
        <p class="cta__lead">
          不需要提前准备，也不需要有编程基础。让孩子亲自体验一次，再决定是否适合。
        </p>

        <ul class="cta__tags">
          <li v-for="tag in trialTags" :key="tag">
            <Sparkles :size="14" />
            {{ tag }}
          </li>
        </ul>

        <div class="cta__actions">
          <button type="button" class="btn btn--brand" @click="emit('book')">
            <CalendarCheck :size="18" />
            预约编程体验课
          </button>
          <a class="btn btn--outline-light" :href="telHref">
            <Phone :size="16" />
            咨询课程老师
          </a>
          <RouterLink class="btn btn--outline-light" to="/test">
            <QrCode :size="16" />
            领取编程能力测评
          </RouterLink>
        </div>

        <p class="cta__note">
          先在群里看到海报 → 了解“为什么学编程” → 做一次能力测试 → 再预约体验。我们不会一上来就推销课程。
        </p>
      </div>

      <aside class="contact" v-reveal="{ variant: 'right', delay: 80 }">
        <p class="contact__title">扫码咨询 · 领取测评</p>
        <QrPlaceholder :size="150" :caption="siteConfig.qrCaption" :seed="13" />

        <ul class="contact__list">
          <li>
            <span>课程老师</span>
            <b>{{ siteConfig.teacherName }}</b>
          </li>
          <li>
            <span>咨询电话</span>
            <a :href="telHref">{{ siteConfig.phone }}</a>
          </li>
          <li>
            <span>微信号</span>
            <b>{{ siteConfig.wechatId }}</b>
            <button type="button" class="contact__copy" @click="copy(siteConfig.wechatId)">
              <Copy :size="13" />
              {{ copied ? '已复制' : '复制' }}
            </button>
          </li>
        </ul>

        <p class="contact__hint">
          <MessageCircle :size="14" />
          二维码为占位图，上线前替换为课程老师的微信二维码即可。
        </p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  overflow: hidden;
  padding-block: var(--section-y);
  background: var(--ink-900);
  color: #eaf0fb;
}

.cta__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(70% 60% at 82% 8%, rgba(27, 77, 255, 0.34) 0%, transparent 62%),
    radial-gradient(60% 50% at 8% 92%, rgba(15, 176, 212, 0.2) 0%, transparent 60%);
  pointer-events: none;
}

.cta__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(80% 70% at 50% 40%, #000 0%, transparent 80%);
  -webkit-mask-image: radial-gradient(80% 70% at 50% 40%, #000 0%, transparent 80%);
}

.cta__inner {
  position: relative;
  display: grid;
  gap: 34px;
}

.cta__title {
  margin-top: 16px;
  color: #fff;
  font-size: clamp(26px, 7vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.cta__lead {
  margin-top: 16px;
  max-width: 34em;
  color: #b9c6dd;
  font-size: 16px;
  line-height: 1.9;
}

.cta__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.cta__tags li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 13px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.05);
  color: #d7e0f0;
  font-size: 13px;
  font-weight: 600;
}

.cta__tags svg {
  color: #9bb3ff;
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.cta__actions .btn {
  flex: 1 1 220px;
}

.btn--outline-light {
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.06);
  color: #eaf0fb;
}

.btn--outline-light:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.12);
}

.cta__note {
  margin-top: 20px;
  max-width: 40em;
  color: #8798b5;
  font-size: 13px;
  line-height: 1.9;
}

.contact {
  display: grid;
  gap: 16px;
  justify-items: center;
  padding: 24px 20px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
}

.contact__title {
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.contact__list {
  display: grid;
  gap: 10px;
  width: 100%;
}

.contact__list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.06);
  font-size: 13px;
}

.contact__list span {
  color: #8798b5;
  flex: none;
}

.contact__list b,
.contact__list a {
  color: #fff;
  font-weight: 650;
}

.contact__copy {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  padding: 4px 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-pill);
  color: #cfd9ec;
  font-size: 12px;
  font-weight: 600;
}

.contact__copy:hover {
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
}

.contact__hint {
  display: flex;
  gap: 6px;
  color: #8798b5;
  font-size: 12px;
  line-height: 1.7;
  text-align: left;
}

.contact__hint svg {
  flex: none;
  margin-top: 3px;
}

@media (min-width: 1000px) {
  .cta__inner {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    align-items: center;
    gap: 56px;
  }

  .cta__actions .btn {
    flex: 0 1 auto;
  }
}
</style>
