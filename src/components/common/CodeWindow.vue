<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    code: string
    /** 标题（例如：3_and_not_5.cpp） */
    title?: string
    /** 语言角标 */
    language?: string
    /** 当前高亮的行号（1 起） */
    activeLine?: number | null
    /** 需要在视觉上强调的行号 */
    accentLines?: number[]
    /** 紧凑模式：用于卡片内的小代码片段 */
    compact?: boolean
  }>(),
  { title: '', language: 'C++', activeLine: null, accentLines: () => [], compact: false },
)

const CODE_KEYWORDS = [
  'int',
  'long',
  'double',
  'float',
  'bool',
  'char',
  'void',
  'const',
  'for',
  'while',
  'if',
  'else',
  'return',
  'break',
  'continue',
  'using',
  'namespace',
  'struct',
  'vector',
  'string',
]

const TOKEN_PATTERN = new RegExp(
  [
    '(\\/\\/[^\\n]*)',
    '("(?:[^"\\\\]|\\\\.)*")',
    '(\\b\\d+\\b)',
    `(\\b(?:${CODE_KEYWORDS.join('|')})\\b)`,
    '([A-Za-z_]\\w*)',
  ].join('|'),
  'g',
)

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** 轻量 C++ 语法着色：不引入额外依赖，输出均为转义后的纯文本 */
function highlightLine(line: string): string {
  let out = ''
  let last = 0
  TOKEN_PATTERN.lastIndex = 0

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0
    out += escapeHtml(line.slice(last, index))
    const text = match[0]
    const tokenClass = match[1]
      ? 'tok-comment'
      : match[2]
        ? 'tok-string'
        : match[3]
          ? 'tok-number'
          : match[4]
            ? 'tok-keyword'
            : 'tok-ident'
    out += `<span class="${tokenClass}">${escapeHtml(text)}</span>`
    last = index + text.length
  }

  return out + escapeHtml(line.slice(last))
}

const lines = computed(() => props.code.replace(/\n+$/, '').split('\n').map(highlightLine))

function pad(value: number): string {
  return value < 10 ? `0${value}` : String(value)
}
</script>

<template>
  <div class="code-window" :class="{ 'code-window--compact': compact }">
    <div class="code-window__bar">
      <span class="code-window__dots" aria-hidden="true">
        <i /><i /><i />
      </span>
      <span v-if="title" class="code-window__title mono">{{ title }}</span>
      <span class="code-window__lang">{{ language }}</span>
    </div>
    <div class="code-window__body">
      <pre class="code-gutter" aria-hidden="true"><span
        v-for="(_, index) in lines"
        :key="`g-${index}`"
        class="code-line"
        :class="{ 'is-active': activeLine === index + 1 }"
      >{{ pad(index + 1) }}</span></pre>
      <pre class="code-content"><code><span
        v-for="(line, index) in lines"
        :key="`c-${index}`"
        class="code-line"
        :class="{
          'is-active': activeLine === index + 1,
          'is-accent': accentLines.includes(index + 1),
        }"
        v-html="line"
      /></code></pre>
    </div>
  </div>
</template>

<style scoped>
.code-window {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  background: #0a1120;
  color: #dde6f7;
  box-shadow: var(--shadow-lg);
}

.code-window__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

.code-window__dots {
  display: inline-flex;
  gap: 5px;
}

.code-window__dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
}

.code-window__title {
  flex: 1;
  color: #8fa2c4;
  font-size: 12px;
  letter-spacing: 0.02em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.code-window__lang {
  padding: 3px 9px;
  border-radius: var(--radius-pill);
  background: rgba(63, 108, 255, 0.18);
  color: #a9c0ff;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
}

.code-window__body {
  display: flex;
  gap: 0;
  padding: 14px 0;
  overflow-x: auto;
}

.code-gutter,
.code-content {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.75;
  tab-size: 4;
}

.code-gutter {
  flex: none;
  padding: 0 12px 0 14px;
  color: #46557a;
  text-align: right;
  user-select: none;
}

.code-content {
  flex: 1;
  padding-right: 16px;
  color: #dde6f7;
}

.code-line {
  display: block;
  min-height: 1.75em;
  white-space: pre;
}

.code-content .code-line {
  border-left: 2px solid transparent;
  padding-left: 12px;
  margin-left: -2px;
  transition:
    background-color 120ms linear,
    border-color 120ms linear;
}

.code-content .code-line.is-active {
  background: rgba(63, 108, 255, 0.16);
  border-left-color: var(--brand-500);
}

.code-content .code-line.is-accent:not(.is-active) {
  background: rgba(255, 255, 255, 0.04);
}

.code-gutter .code-line.is-active {
  color: #cfe0ff;
  font-weight: 700;
}

.code-window--compact .code-gutter,
.code-window--compact .code-content {
  font-size: 12px;
  line-height: 1.7;
}

:deep(.tok-keyword) {
  color: #7fa7ff;
}

:deep(.tok-number) {
  color: #f2b96b;
}

:deep(.tok-string) {
  color: #6fd0a4;
}

:deep(.tok-comment) {
  color: #5e719a;
  font-style: italic;
}

:deep(.tok-ident) {
  color: #dde6f7;
}
</style>
