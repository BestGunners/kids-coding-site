<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { CalendarCheck, Check, Copy, Phone, X } from 'lucide-vue-next'
import { useClipboard } from '@/composables/useClipboard'
import { siteConfig } from '@/data/site'

const props = defineProps<{
  open: boolean
  /** 由测评结果带来的预填提示 */
  fromQuiz?: boolean
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const name = ref('')
const grade = ref('')
const phone = ref('')
const slot = ref('')
const note = ref('')
const submitted = ref(false)
const { copied, copy } = useClipboard(3000)
const { copied: wechatCopied, copy: copyWechat } = useClipboard(2000)

const grades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '其他']
const slots = ['工作日晚上', '周六上午', '周六下午', '周日上午', '周日下午', '都可以，听老师安排']

const phoneValid = computed(() => /^\d{11}$/.test(phone.value.trim()))
const canSubmit = computed(() => name.value.trim().length > 0 && phoneValid.value)

const summary = computed(() =>
  [
    `【编程体验课预约】`,
    `孩子姓名：${name.value.trim()}`,
    `年级：${grade.value || '未填写'}`,
    `家长手机：${phone.value.trim()}`,
    `方便时间：${slot.value || '未填写'}`,
    `备注：${note.value.trim() || '无'}`,
    props.fromQuiz ? '来源：做过「编程能力小测试」' : '来源：家长主动咨询',
  ].join('\n'),
)

function reset(): void {
  submitted.value = false
}

function submit(): void {
  if (!canSubmit.value) return
  submitted.value = true
}

async function copySummary(): Promise<void> {
  await copy(summary.value)
}

function close(): void {
  emit('close')
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') close()
}

watch(
  () => props.open,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) reset()
  },
)

onMounted(() => window.addEventListener('keydown', onKeydown))

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.removeProperty('overflow')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="open" class="dialog" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <div class="dialog__mask" @click="close" />

        <div class="dialog__panel">
          <header class="dialog__head">
            <div>
              <span class="tag tag--brand"><CalendarCheck :size="13" />体验课预约</span>
              <h2 id="booking-title">预约一次真实的编程体验</h2>
            </div>
            <button type="button" class="dialog__close" @click="close">
              <X :size="20" />
              <span class="sr-only">关闭</span>
            </button>
          </header>

          <div v-if="!submitted" class="dialog__body">
            <p class="dialog__lead">
              填写后点击“生成预约信息”，系统会整理成一条微信消息，复制后发送给课程老师即可。
              <strong>信息只保存在你的手机里，不会上传到服务器。</strong>
            </p>

            <form class="form" @submit.prevent="submit">
              <label class="field">
                <span class="field__label">孩子姓名 <em>*</em></span>
                <input v-model="name" type="text" placeholder="例如：小明" autocomplete="off" />
              </label>

              <label class="field">
                <span class="field__label">孩子年级</span>
                <select v-model="grade">
                  <option value="">请选择</option>
                  <option v-for="item in grades" :key="item" :value="item">{{ item }}</option>
                </select>
              </label>

              <label class="field">
                <span class="field__label">家长手机号 <em>*</em></span>
                <input v-model="phone" type="tel" inputmode="numeric" maxlength="11" placeholder="11 位手机号" />
                <small v-if="phone && !phoneValid" class="field__error">请填写 11 位手机号</small>
              </label>

              <label class="field">
                <span class="field__label">方便的时间</span>
                <select v-model="slot">
                  <option value="">请选择</option>
                  <option v-for="item in slots" :key="item" :value="item">{{ item }}</option>
                </select>
              </label>

              <label class="field field--full">
                <span class="field__label">想了解的内容（选填）</span>
                <textarea
                  v-model="note"
                  rows="3"
                  placeholder="例如：孩子学过奥数，想试试 C++，但不确定能不能坚持"
                />
              </label>

              <div class="form__actions field--full">
                <button type="submit" class="btn btn--brand btn--block" :disabled="!canSubmit">
                  生成预约信息
                </button>
              </div>
            </form>

            <p class="dialog__alt">
              也可以直接联系老师：电话
              <a :href="`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`">{{ siteConfig.phone }}</a>
              ｜ 微信 {{ siteConfig.wechatId }}
              <button type="button" class="text-link" @click="copyWechat(siteConfig.wechatId)">
                {{ wechatCopied ? '已复制' : '复制微信号' }}
              </button>
            </p>
          </div>

          <div v-else class="dialog__body">
            <div class="done">
              <span class="done__icon"><Check :size="22" /></span>
              <h3>预约信息已生成</h3>
              <p>复制下面这段内容，发送给 {{ siteConfig.teacherName }} 的微信，我们会尽快回复并确认时间。</p>
            </div>

            <pre class="summary">{{ summary }}</pre>

            <div class="dialog__actions">
              <button type="button" class="btn btn--brand" @click="copySummary">
                <Copy :size="16" />
                {{ copied ? '已复制到剪贴板' : '复制预约信息' }}
              </button>
              <a class="btn btn--ghost" :href="`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`">
                <Phone :size="16" />
                直接拨打老师电话
              </a>
              <button type="button" class="btn btn--quiet" @click="submitted = false">返回修改</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.dialog__mask {
  position: absolute;
  inset: 0;
  background: rgba(6, 12, 26, 0.55);
  backdrop-filter: blur(3px);
}

.dialog__panel {
  position: relative;
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  padding: 22px 20px calc(24px + var(--safe-bottom));
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  background: #fff;
  box-shadow: 0 -20px 60px -20px rgba(6, 12, 26, 0.5);
}

.dialog__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.dialog__head h2 {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 800;
}

.dialog__close {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex: none;
  border: 1px solid var(--line);
  border-radius: 12px;
  color: var(--ink-500);
}

.dialog__body {
  margin-top: 18px;
}

.dialog__lead {
  color: var(--ink-500);
  font-size: 13px;
  line-height: 1.85;
}

.dialog__lead strong {
  color: var(--ink-800);
}

.form {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.field {
  display: grid;
  gap: 6px;
}

.field__label {
  color: var(--ink-600);
  font-size: 13px;
  font-weight: 650;
}

.field__label em {
  color: var(--brand-600);
  font-style: normal;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-md);
  background: #fff;
  color: var(--ink-900);
  font: inherit;
  font-size: 15px;
  transition: border-color var(--dur-fast) linear;
}

.field textarea {
  resize: vertical;
  line-height: 1.7;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--brand-600);
  box-shadow: 0 0 0 3px rgba(27, 77, 255, 0.12);
}

.field__error {
  color: #c0392b;
  font-size: 12px;
}

.dialog__alt {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  color: var(--ink-400);
  font-size: 13px;
  line-height: 1.9;
}

.dialog__alt a {
  color: var(--brand-700);
  font-weight: 650;
}

.dialog__alt .text-link {
  margin-left: 6px;
  font-size: 13px;
}

.done {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: var(--radius-lg);
  background: var(--positive-050);
}

.done__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #fff;
  color: var(--positive-600);
}

.done h3 {
  font-size: 17px;
  font-weight: 750;
}

.done p {
  color: var(--ink-600);
  font-size: 13px;
  line-height: 1.8;
}

.summary {
  margin: 16px 0 0;
  padding: 16px;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-md);
  background: var(--surface-soft);
  color: var(--ink-800);
  font-size: 13px;
  line-height: 1.9;
  white-space: pre-wrap;
}

.dialog__actions {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity var(--dur) var(--ease-out);
}

.dialog-enter-active .dialog__panel,
.dialog-leave-active .dialog__panel {
  transition: transform var(--dur) var(--ease-out);
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .dialog__panel,
.dialog-leave-to .dialog__panel {
  transform: translateY(24px);
}

@media (min-width: 720px) {
  .dialog {
    align-items: center;
  }

  .dialog__panel {
    max-width: 620px;
    padding: 28px;
    border-radius: var(--radius-xl);
  }

  .form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .field--full {
    grid-column: 1 / -1;
  }

  .dialog__actions {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
