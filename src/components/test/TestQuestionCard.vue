<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-vue-next'
import type { TestItem } from '@/data/abilityTest'
import GridScene from '@/components/test/GridScene.vue'

const props = defineProps<{
  item: TestItem
  index: number
  total: number
  /** 单选已选下标 */
  selected: number | null
  /** 排序题已排好的顺序 */
  ordered: string[]
}>()

const emit = defineEmits<{
  (event: 'pick', optionIndex: number): void
  (event: 'add', label: string): void
  (event: 'remove', label: string): void
  (event: 'next'): void
  (event: 'prev'): void
}>()

const visualTokens = computed(() => (props.item.visual ? props.item.visual.split(' ') : []))

const remaining = computed(() =>
  props.item.options.map((option) => option.label).filter((label) => !props.ordered.includes(label)),
)

const canGoNext = computed(() =>
  props.item.type === 'sequence' ? props.ordered.length === props.item.options.length : props.selected !== null,
)

function toneFor(label: string): string {
  if (label.includes('红')) return 'is-red'
  if (label.includes('蓝')) return 'is-blue'
  if (label.includes('绿')) return 'is-green'
  return ''
}
</script>

<template>
  <article class="q">
    <header class="q__head">
      <button type="button" class="q__prev" :disabled="index === 0" @click="emit('prev')">
        <ArrowLeft :size="16" />
        上一题
      </button>
      <span class="q__count">
        第 <b>{{ index + 1 }}</b> / {{ total }} 题
      </span>
    </header>

    <div class="q__progress" aria-hidden="true">
      <span :style="{ width: `${((index + 1) / total) * 100}%` }" />
    </div>

    <h2 class="q__prompt">{{ item.prompt }}</h2>

    <div v-if="visualTokens.length" class="q__visual">
      <span
        v-for="(token, tokenIndex) in visualTokens"
        :key="`${token}-${tokenIndex}`"
        class="q__cell"
        :class="[toneFor(token), { 'is-wide': token.length > 3 }]"
      >
        {{ token }}
      </span>
    </div>

    <GridScene v-if="item.grid" :scene="item.grid" />

    <!-- 单选题 -->
    <ul v-if="item.type === 'choice'" class="q__options">
      <li v-for="(option, optionIndex) in item.options" :key="optionIndex">
        <button
          type="button"
          class="q__option"
          :class="{ 'is-selected': selected === optionIndex, 'has-glyph': Boolean(option.glyph) }"
          :aria-pressed="selected === optionIndex"
          @click="emit('pick', optionIndex)"
        >
          <span class="q__mark" aria-hidden="true">
            <Check v-if="selected === optionIndex" :size="14" />
          </span>
          <span v-if="option.glyph" class="q__glyph">{{ option.glyph }}</span>
          <span v-if="!option.glyph || option.label !== option.glyph" class="q__label">{{ option.label }}</span>
        </button>
      </li>
    </ul>

    <!-- 排序题 -->
    <div v-else class="q__sequence">
      <div class="q__slots">
        <div v-for="slotIndex in item.options.length" :key="slotIndex" class="q__slot">
          <span class="q__slot-index mono">{{ slotIndex }}</span>
          <button
            v-if="ordered[slotIndex - 1]"
            type="button"
            class="q__slot-value"
            @click="emit('remove', ordered[slotIndex - 1])"
          >
            {{ ordered[slotIndex - 1] }}
          </button>
          <span v-else class="q__slot-empty">点下面的选项</span>
        </div>
      </div>

      <div class="q__pool">
        <button
          v-for="label in remaining"
          :key="label"
          type="button"
          class="q__chip"
          @click="emit('add', label)"
        >
          {{ label }}
        </button>
        <span v-if="remaining.length === 0" class="q__pool-done">
          <RotateCcw :size="14" />
          已排完，点上面任意一项可以取消重排
        </span>
      </div>
    </div>

    <footer class="q__foot">
      <button type="button" class="btn btn--brand btn--block" :disabled="!canGoNext" @click="emit('next')">
        {{ index + 1 === total ? '看看结果' : '下一题' }}
        <ArrowRight :size="18" />
      </button>
      <p class="q__foot-note">不确定也没关系，凭第一感觉选就行</p>
    </footer>
  </article>
</template>

<style scoped>
.q__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.q__prev {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  margin-left: -10px;
  border-radius: var(--radius-pill);
  color: var(--ink-500);
  font-size: 14px;
  font-weight: 600;
}

.q__prev:disabled {
  opacity: 0.4;
}

.q__prev:not(:disabled):hover {
  background: var(--surface-muted);
  color: var(--ink-800);
}

.q__count {
  color: var(--ink-400);
  font-size: 13px;
  font-weight: 600;
}

.q__count b {
  color: var(--brand-700);
  font-size: 15px;
}

.q__progress {
  height: 6px;
  margin-top: 12px;
  border-radius: 6px;
  background: var(--surface-muted);
  overflow: hidden;
}

.q__progress span {
  display: block;
  height: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--brand-600), var(--cyan-500));
  transition: width var(--dur) var(--ease-out);
}

.q__prompt {
  margin-top: 22px;
  font-size: clamp(18px, 5vw, 23px);
  font-weight: 750;
  line-height: 1.55;
  white-space: pre-line;
}

.q__visual {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.q__cell {
  display: grid;
  place-items: center;
  min-width: 52px;
  min-height: 52px;
  padding: 6px 10px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--surface-soft);
  color: var(--ink-900);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.q__cell.is-wide {
  min-width: auto;
  padding-inline: 12px;
  font-size: 14px;
  font-weight: 650;
  color: var(--ink-700);
  text-align: left;
  line-height: 1.5;
}

.q__cell.is-red {
  border-color: #f0c7c2;
  background: #fdf1ef;
  color: #b23b2c;
}

@media (max-width: 760px) {
  .q__visual {
    gap: 6px;
  }

  .q__cell {
    min-width: 32px;
    min-height: 44px;
    padding: 4px 6px;
    font-size: 17px;
  }

  .q__cell.is-wide {
    font-size: 12.5px;
    padding-inline: 8px;
  }
}

.q__cell.is-blue {
  border-color: var(--brand-300);
  background: var(--brand-050);
  color: var(--brand-700);
}

.q__cell.is-green {
  border-color: #bfe4d3;
  background: var(--positive-050);
  color: var(--positive-600);
}

.q__options {
  display: grid;
  gap: 10px;
  margin-top: 20px;
}

.q__option {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 60px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: #fff;
  text-align: left;
  transition:
    border-color var(--dur-fast) linear,
    background-color var(--dur-fast) linear,
    transform var(--dur-fast) var(--ease-out);
}

.q__option:active {
  transform: scale(0.995);
}

.q__option:hover {
  border-color: var(--brand-300);
  background: var(--brand-050);
}

.q__option.is-selected {
  border-color: var(--brand-600);
  background: var(--brand-050);
  box-shadow: 0 0 0 3px rgba(27, 77, 255, 0.1);
}

.q__mark {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex: none;
  border: 1.5px solid var(--line-strong);
  border-radius: 50%;
  color: #fff;
  transition:
    background-color var(--dur-fast) linear,
    border-color var(--dur-fast) linear;
}

.q__option.is-selected .q__mark {
  background: var(--brand-600);
  border-color: var(--brand-600);
}

.q__glyph {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--ink-900);
}

.q__label {
  color: var(--ink-800);
  font-size: 15px;
  font-weight: 600;
  line-height: 1.6;
}

.q__sequence {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.q__slots {
  display: grid;
  gap: 8px;
}

.q__slot {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  min-height: 54px;
  padding: 8px 14px 8px 10px;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-md);
  background: var(--surface-soft);
}

.q__slot-index {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid var(--line);
  color: var(--ink-500);
  font-size: 12px;
  font-weight: 700;
}

.q__slot-value {
  width: 100%;
  padding: 6px 8px;
  border-radius: var(--radius-sm);
  background: #fff;
  border: 1px solid var(--line);
  color: var(--ink-900);
  font-size: 15px;
  font-weight: 650;
  text-align: left;
}

.q__slot-empty {
  color: var(--ink-300);
  font-size: 13px;
}

.q__pool {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.q__chip {
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-pill);
  background: #fff;
  color: var(--ink-800);
  font-size: 15px;
  font-weight: 650;
}

.q__chip:hover {
  border-color: var(--brand-500);
  background: var(--brand-050);
  color: var(--brand-700);
}

.q__pool-done {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ink-400);
  font-size: 13px;
}

.q__foot {
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.q__foot-note {
  margin-top: 10px;
  color: var(--ink-400);
  font-size: 12px;
  text-align: center;
}
</style>
