<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { ArrowRight, Info, X } from 'lucide-vue-next'
import AppIcon from '@/components/common/AppIcon.vue'
import { roadmapNotice, roadmapStages, tracks } from '@/data/roadmap'
import { scrollToSection } from '@/utils/dom'

const activeId = ref<string | null>(null)

const activeStage = computed(() => roadmapStages.find((stage) => stage.id === activeId.value) ?? null)

function select(stageId: string, clickable?: boolean): void {
  if (!clickable) return
  activeId.value = activeId.value === stageId ? null : stageId
  if (activeId.value && window.innerWidth < 900) {
    nextTick(() => scrollToSection('roadmap-detail', 88))
  }
}
</script>

<template>
  <section id="roadmap" class="section">
    <div class="container">
      <div class="section-head" v-reveal="{ variant: 'fade' }">
        <p class="eyebrow">04 · 成长路线</p>
        <h2 class="section-title">孩子学编程，可以走多远？</h2>
        <p class="section-lead">
          从兴趣启蒙到信息学竞赛，是一条可以持续很多年的路径。但请记住：
          <strong>不是每个孩子都必须走竞赛路线。</strong>
        </p>
      </div>

      <div class="roadmap">
        <ol class="timeline">
          <li
            v-for="(stage, index) in roadmapStages"
            :key="stage.id"
            class="timeline__item"
            :class="{ 'is-active': activeId === stage.id, 'is-clickable': stage.clickable }"
            v-reveal="{ delay: index * 50, variant: 'fade' }"
          >
            <span class="timeline__rail" aria-hidden="true">
              <i v-if="index !== roadmapStages.length - 1" class="timeline__line" />
              <b class="timeline__dot">{{ String(index + 1).padStart(2, '0') }}</b>
            </span>

            <component
              :is="stage.clickable ? 'button' : 'div'"
              class="timeline__card"
              :type="stage.clickable ? 'button' : undefined"
              @click="select(stage.id, stage.clickable)"
            >
              <span class="timeline__head">
                <span class="timeline__name">{{ stage.name }}</span>
                <span class="timeline__code mono">{{ stage.code }}</span>
              </span>
              <span class="timeline__age">{{ stage.age }}</span>
              <span class="timeline__summary">{{ stage.summary }}</span>
              <span v-if="stage.clickable" class="timeline__more">
                查看说明
                <ArrowRight :size="14" />
              </span>
            </component>
          </li>
        </ol>

        <aside id="roadmap-detail" class="detail" v-reveal="{ variant: 'right', delay: 80 }">
          <Transition name="detail" mode="out-in">
            <div v-if="activeStage" :key="activeStage.id" class="detail__panel">
              <header class="detail__head">
                <div>
                  <span class="tag tag--brand">{{ activeStage.code }}</span>
                  <h3>{{ activeStage.name }}</h3>
                </div>
                <button type="button" class="detail__close" @click="activeId = null">
                  <X :size="18" />
                  <span class="sr-only">关闭说明</span>
                </button>
              </header>

              <p class="detail__subtitle">{{ activeStage.detail?.subtitle }}</p>

              <p v-for="paragraph in activeStage.detail?.paragraphs" :key="paragraph" class="detail__paragraph">
                {{ paragraph }}
              </p>

              <ul class="detail__points">
                <li v-for="point in activeStage.detail?.points" :key="point">
                  <span aria-hidden="true">·</span>
                  {{ point }}
                </li>
              </ul>
            </div>

            <div v-else class="detail__empty">
              <span class="detail__empty-icon"><Info :size="20" /></span>
              <h3>想了解更多阶段？</h3>
              <p>点击左侧的 GESP、CSP-J、CSP-S，可以看到这个阶段在学什么、适合什么样的孩子。</p>
              <ul>
                <li>GESP：阶段性能力检验</li>
                <li>CSP-J：入门级认证，竞赛体系入口</li>
                <li>CSP-S：提高级认证，难度明显上升</li>
              </ul>
            </div>
          </Transition>
        </aside>
      </div>

      <div class="tracks" v-reveal="{ delay: 60 }">
        <h3 class="tracks__title">三条发展路线，可以先了解，再决定</h3>
        <ul class="tracks__list">
          <li v-for="(track, index) in tracks" :key="track.id" v-reveal="{ delay: index * 80 }">
            <span class="tracks__icon"><AppIcon :name="track.icon" :size="20" /></span>
            <h4>{{ track.name }}</h4>
            <p class="tracks__audience">{{ track.audience }}</p>
            <ol class="tracks__steps">
              <li v-for="(step, stepIndex) in track.steps" :key="step">
                <span class="mono">{{ String(stepIndex + 1).padStart(2, '0') }}</span>
                {{ step }}
              </li>
            </ol>
          </li>
        </ul>
      </div>

      <p class="notice" v-reveal="{ delay: 60 }">
        <Info :size="15" />
        {{ roadmapNotice }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.roadmap {
  display: grid;
  gap: 22px;
  margin-top: 32px;
}

.timeline__item {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr);
  gap: 14px;
}

.timeline__rail {
  position: relative;
  display: flex;
  justify-content: center;
}

.timeline__dot {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  background: #fff;
  color: var(--ink-500);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  transition:
    background-color var(--dur) linear,
    border-color var(--dur) linear,
    color var(--dur) linear;
}

.timeline__line {
  position: absolute;
  top: 32px;
  bottom: -12px;
  width: 1.5px;
  background: var(--line);
}

.timeline__card {
  display: grid;
  gap: 6px;
  width: 100%;
  margin-bottom: 12px;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #fff;
  text-align: left;
  transition:
    border-color var(--dur) linear,
    box-shadow var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}

.timeline__item.is-clickable .timeline__card:hover {
  border-color: var(--brand-300);
  transform: translateX(2px);
}

.timeline__item.is-active .timeline__card {
  border-color: var(--brand-500);
  box-shadow: 0 0 0 3px rgba(27, 77, 255, 0.1);
}

.timeline__item.is-active .timeline__dot {
  background: var(--brand-600);
  border-color: var(--brand-600);
  color: #fff;
}

.timeline__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.timeline__name {
  color: var(--ink-900);
  font-size: 17px;
  font-weight: 750;
}

.timeline__code {
  padding: 3px 9px;
  border-radius: var(--radius-pill);
  background: var(--surface-muted);
  color: var(--ink-500);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.timeline__age {
  color: var(--brand-700);
  font-size: 12px;
  font-weight: 650;
}

.timeline__summary {
  color: var(--ink-500);
  font-size: 14px;
  line-height: 1.75;
}

.timeline__more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  color: var(--brand-700);
  font-size: 13px;
  font-weight: 650;
}

.detail {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface-soft);
}

.detail__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.detail__head h3 {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 800;
}

.detail__close {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fff;
  color: var(--ink-500);
}

.detail__close:hover {
  color: var(--ink-900);
  border-color: var(--line-strong);
}

.detail__subtitle {
  margin-top: 14px;
  color: var(--ink-600);
  font-size: 13px;
  font-weight: 650;
  line-height: 1.7;
}

.detail__paragraph {
  margin-top: 12px;
  color: var(--ink-500);
  font-size: 14px;
  line-height: 1.9;
}

.detail__points {
  display: grid;
  gap: 8px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed var(--line-strong);
}

.detail__points li {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr);
  gap: 8px;
  color: var(--ink-600);
  font-size: 13px;
  line-height: 1.75;
}

.detail__points li span {
  color: var(--brand-500);
  font-weight: 800;
}

.detail__empty {
  display: grid;
  gap: 10px;
}

.detail__empty-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid var(--line);
  color: var(--brand-600);
}

.detail__empty h3 {
  font-size: 17px;
  font-weight: 750;
}

.detail__empty p {
  color: var(--ink-500);
  font-size: 14px;
  line-height: 1.85;
}

.detail__empty ul {
  display: grid;
  gap: 8px;
  margin-top: 6px;
}

.detail__empty li {
  padding: 10px 14px;
  border-radius: var(--radius-md);
  background: #fff;
  border: 1px solid var(--line);
  color: var(--ink-600);
  font-size: 13px;
  font-weight: 600;
}

.detail-enter-active,
.detail-leave-active {
  transition:
    opacity var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}

.detail-enter-from,
.detail-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.tracks {
  margin-top: 40px;
}

.tracks__title {
  font-size: 18px;
  font-weight: 750;
}

.tracks__list {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.tracks__list > li {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: #fff;
}

.tracks__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--brand-050);
  color: var(--brand-700);
}

.tracks__list h4 {
  margin-top: 12px;
  font-size: 17px;
  font-weight: 750;
}

.tracks__audience {
  margin-top: 6px;
  color: var(--ink-400);
  font-size: 13px;
  line-height: 1.7;
}

.tracks__steps {
  display: grid;
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed var(--line-strong);
}

.tracks__steps li {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 8px;
  color: var(--ink-700);
  font-size: 14px;
  font-weight: 600;
}

.tracks__steps span {
  color: var(--ink-300);
  font-size: 12px;
  font-weight: 700;
  padding-top: 2px;
}

.notice {
  display: flex;
  gap: 8px;
  margin-top: 26px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: var(--surface-muted);
  color: var(--ink-500);
  font-size: 12px;
  line-height: 1.8;
}

.notice svg {
  flex: none;
  margin-top: 3px;
  color: var(--ink-400);
}

@media (min-width: 900px) {
  .roadmap {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    align-items: start;
    gap: 32px;
  }

  .detail {
    position: sticky;
    top: 96px;
  }

  .tracks__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
