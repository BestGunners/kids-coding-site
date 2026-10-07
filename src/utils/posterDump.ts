/**
 * 海报版面导出工具：把渲染后的海报 DOM 解析成「可编辑图层」描述，
 * 供离线脚本生成 PSD 源文件使用（文字保持可编辑，背景为位图）。
 */

export interface PosterTextLayer {
  /** 图层名（取前若干字） */
  name: string
  /** 文本内容（多行用 \r 连接，与 PSD 一致） */
  text: string
  /** 设计稿坐标（400 × canvasHeight 画布内） */
  x: number
  y: number
  width: number
  height: number
  fontSize: number
  lineHeight: number
  fontWeight: number
  /** rgb 十六进制，例如 #0d1729 */
  color: string
  family: 'sans' | 'mono'
  letterSpacing: number
  /** 行数，便于脚本按行拆分 */
  lines: string[]
}

export interface PosterDump {
  id: string
  canvasWidth: number
  canvasHeight: number
  layers: PosterTextLayer[]
}

const MONO_HINTS = ['mono', 'consolas', 'courier', 'menlo']

interface LineBox {
  chars: { char: string; left: number; right: number; top: number; bottom: number }[]
}

function collectLineBoxes(node: Text): LineBox[] {
  const range = document.createRange()
  const text = node.data
  const lines: LineBox[] = []
  let current: LineBox | null = null

  for (let i = 0; i < text.length; i += 1) {
    range.setStart(node, i)
    range.setEnd(node, i + 1)
    const rect = range.getClientRects()[0]
    const char = text[i]

    if (!rect || (rect.width === 0 && rect.height === 0)) {
      if (current) current.chars.push({ char, left: 0, right: 0, top: 0, bottom: 0 })
      continue
    }

    if (current && current.chars.length > 0) {
      const ref = current.chars.find((item) => item.top !== 0) ?? current.chars[0]
      if (Math.abs(rect.top - ref.top) < 1.5) {
        current.chars.push({ char, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom })
        continue
      }
    }

    current = { chars: [{ char, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom }] }
    lines.push(current)
  }

  return lines
}

function rgbToHex(color: string): string {
  const match = color.match(/rgba?\(([^)]+)\)/)
  if (!match) return '#000000'
  const [r, g, b] = match[1].split(',').map((value) => Math.round(parseFloat(value)))
  const toHex = (value: number): string => value.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/** 标记所有「直接包含文字」的元素，供隐藏文字后渲染背景图 */
export function markTextLeaves(root: HTMLElement): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  let node = walker.nextNode()
  while (node) {
    textNodes.push(node as Text)
    node = walker.nextNode()
  }

  for (const textNode of textNodes) {
    if (!textNode.data.trim()) continue
    const parent = textNode.parentElement
    if (!parent) continue
    // 二维码等 SVG 保留为位图，不参与文字图层拆分
    if (parent.closest('svg')) continue
    parent.setAttribute('data-text-leaf', 'true')
  }
}

export function collectPosterDump(root: HTMLElement, id: string): PosterDump {
  const rootRect = root.getBoundingClientRect()
  const scale = rootRect.width / 400
  const layers: PosterTextLayer[] = []

  for (const el of Array.from(root.querySelectorAll<HTMLElement>('*'))) {
    if (el.closest('svg')) continue

    const style = getComputedStyle(el)
    if (style.display === 'none' || style.visibility === 'hidden') continue

    const directTextNodes: Text[] = []
    for (const child of Array.from(el.childNodes)) {
      if (child instanceof Text && child.data.trim().length > 0) directTextNodes.push(child)
    }
    if (directTextNodes.length === 0) continue

    const fontSize = parseFloat(style.fontSize)
    const lineHeight =
      style.lineHeight === 'normal' ? fontSize * 1.4 : parseFloat(style.lineHeight) || fontSize * 1.4
    const family: 'sans' | 'mono' = MONO_HINTS.some((hint) =>
      style.fontFamily.toLowerCase().includes(hint),
    )
      ? 'mono'
      : 'sans'
    const keepLeadingSpace = style.whiteSpace.startsWith('pre')

    const lineTexts: string[] = []
    let minLeft = Number.POSITIVE_INFINITY
    let maxRight = Number.NEGATIVE_INFINITY
    let minTop = Number.POSITIVE_INFINITY
    let maxBottom = Number.NEGATIVE_INFINITY

    for (const textNode of directTextNodes) {
      for (const line of collectLineBoxes(textNode)) {
        const visible = line.chars.filter((item) => item.right > 0)
        if (visible.length === 0) continue

        let text = visible.map((item) => item.char).join('')
        let left = visible[0].left

        if (!keepLeadingSpace) {
          const trimmed = text.replace(/^\s+/, '')
          const removed = text.length - trimmed.length
          text = trimmed.replace(/\s+$/, '')
          if (removed > 0) left = visible[Math.min(removed, visible.length - 1)].left
        }
        if (!text) continue

        const right = visible[visible.length - 1].right
        lineTexts.push(text)
        minLeft = Math.min(minLeft, left)
        maxRight = Math.max(maxRight, right)
        minTop = Math.min(minTop, visible[0].top)
        maxBottom = Math.max(maxBottom, visible[0].bottom)
      }
    }

    if (lineTexts.length === 0) continue

    layers.push({
      name: lineTexts.join(' ').slice(0, 18) || '文字',
      text: lineTexts.join('\r'),
      x: (minLeft - rootRect.left) / scale,
      y: (minTop - rootRect.top) / scale,
      width: (maxRight - minLeft) / scale,
      height: (maxBottom - minTop) / scale,
      fontSize: fontSize / scale,
      lineHeight: lineHeight / scale,
      fontWeight: Number(style.fontWeight) || 400,
      color: rgbToHex(style.color),
      family,
      letterSpacing: (parseFloat(style.letterSpacing) || 0) / scale,
      lines: lineTexts,
    })
  }

  layers.sort((a, b) => a.y - b.y)

  return {
    id,
    canvasWidth: 400,
    canvasHeight: rootRect.height / scale,
    layers,
  }
}
