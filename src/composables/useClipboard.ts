import { ref, type Ref } from 'vue'

/**
 * 一键复制：优先使用 clipboard API，失败时回退到 textarea 方案
 * （微信内置浏览器与老版本 WebView 常常缺少 clipboard API）。
 */
export function useClipboard(resetDelay = 2000): {
  copied: Ref<boolean>
  error: Ref<boolean>
  copy: (text: string) => Promise<boolean>
} {
  const copied = ref(false)
  const error = ref(false)
  let timer = 0

  async function copy(text: string): Promise<boolean> {
    const success = await writeText(text)
    copied.value = success
    error.value = !success
    if (timer) window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      copied.value = false
      error.value = false
    }, resetDelay)
    return success
  }

  return { copied, error, copy }
}

async function writeText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // 继续走兜底方案
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', 'readonly')
    textarea.style.position = 'fixed'
    textarea.style.top = '-1000px'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, textarea.value.length)
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}
