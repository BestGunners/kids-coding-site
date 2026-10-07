<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, MessageCircle, X } from 'lucide-vue-next'
import { homeNav, siteConfig, topNav } from '@/data/site'
import { scrollToSection } from '@/utils/dom'

const route = useRoute()
const router = useRouter()

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll(): void {
  scrolled.value = window.scrollY > 12
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') menuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.removeProperty('overflow')
})

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

async function goAnchor(id: string): Promise<void> {
  menuOpen.value = false
  if (route.name !== 'home') {
    await router.push({ name: 'home' })
    window.setTimeout(() => scrollToSection(id), 120)
    return
  }
  window.setTimeout(() => scrollToSection(id), 60)
}

async function goQuiz(): Promise<void> {
  await goAnchor('quiz')
}
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="container site-header__inner">
      <RouterLink class="brand" to="/" aria-label="返回首页">
        <span class="brand__mark" aria-hidden="true">
          <svg viewBox="0 0 28 28" width="26" height="26">
            <rect x="1.2" y="1.2" width="25.6" height="25.6" rx="8" fill="none" stroke="currentColor" stroke-width="1.6" />
            <path d="M9 19V9.6l10 8.4V9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="brand__text">
          <strong>{{ siteConfig.productName }}</strong>
          <em>{{ siteConfig.productAlt }}</em>
        </span>
      </RouterLink>

      <nav class="nav-desktop" aria-label="页面导航">
        <button
          v-for="item in homeNav"
          :key="item.id"
          type="button"
          class="nav-desktop__link"
          @click="goAnchor(item.id)"
        >
          {{ item.label }}
        </button>
        <RouterLink
          v-for="item in topNav.slice(1)"
          :key="item.to"
          class="nav-desktop__link"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="site-header__actions">
        <button type="button" class="btn btn--brand btn--sm header-cta" @click="goQuiz">
          测一测孩子适不适合
        </button>
        <button
          type="button"
          class="menu-toggle"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" :size="22" />
          <Menu v-else :size="22" />
          <span class="sr-only">{{ menuOpen ? '关闭菜单' : '打开菜单' }}</span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="menuOpen" id="mobile-menu" class="menu-panel">
        <div class="container menu-panel__inner">
          <p class="menu-panel__label">页面导航</p>
          <ul class="menu-panel__list">
            <li v-for="item in homeNav" :key="item.id">
              <button type="button" @click="goAnchor(item.id)">
                <span>{{ item.label }}</span>
                <span aria-hidden="true">→</span>
              </button>
            </li>
          </ul>
          <p class="menu-panel__label">传播素材</p>
          <ul class="menu-panel__list">
            <li v-for="item in topNav.slice(1)" :key="item.to">
              <RouterLink :to="item.to">
                <span>{{ item.label }}</span>
                <span aria-hidden="true">→</span>
              </RouterLink>
            </li>
          </ul>
          <div class="menu-panel__actions">
            <button type="button" class="btn btn--brand btn--block" @click="goQuiz">
              测一测孩子适不适合学编程
            </button>
            <button type="button" class="btn btn--ghost btn--block" @click="goAnchor('cta')">
              <MessageCircle :size="18" />
              预约编程体验课
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid transparent;
  transition:
    border-color var(--dur) linear,
    background-color var(--dur) linear,
    box-shadow var(--dur) var(--ease-out);
}

.site-header.is-scrolled {
  border-bottom-color: var(--line);
  box-shadow: 0 8px 24px -20px rgba(13, 23, 41, 0.45);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 11px;
  background: var(--ink-900);
  color: #fff;
  flex: none;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand__text strong {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.brand__text em {
  font-size: 11px;
  font-style: normal;
  color: var(--ink-400);
  letter-spacing: 0.04em;
}

.nav-desktop {
  display: none;
  align-items: center;
  gap: 4px;
}

.nav-desktop__link {
  padding: 8px 12px;
  border-radius: var(--radius-pill);
  color: var(--ink-600);
  font-size: 14px;
  font-weight: 550;
  transition:
    color var(--dur-fast) linear,
    background-color var(--dur-fast) linear;
}

.nav-desktop__link:hover {
  color: var(--ink-900);
  background: var(--surface-muted);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-cta {
  display: none;
}

.menu-toggle {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  color: var(--ink-800);
}

.menu-panel {
  position: fixed;
  inset: 64px 0 0;
  overflow-y: auto;
  background: #fff;
  border-top: 1px solid var(--line);
  padding-bottom: calc(32px + var(--safe-bottom));
}

.menu-panel__inner {
  padding-block: 20px 8px;
}

.menu-panel__label {
  margin: 18px 0 8px;
  color: var(--ink-400);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.menu-panel__list {
  border-top: 1px solid var(--line);
}

.menu-panel__list li + li {
  border-top: 1px solid var(--line);
}

.menu-panel__list button,
.menu-panel__list a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 4px;
  color: var(--ink-800);
  font-size: 16px;
  font-weight: 600;
  text-align: left;
}

.menu-panel__list span[aria-hidden] {
  color: var(--ink-300);
}

.menu-panel__actions {
  display: grid;
  gap: 12px;
  margin-top: 28px;
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (min-width: 1024px) {
  .site-header__inner {
    min-height: 72px;
  }

  .nav-desktop {
    display: flex;
  }

  .header-cta {
    display: inline-flex;
  }

  .menu-toggle {
    display: none;
  }
}
</style>
