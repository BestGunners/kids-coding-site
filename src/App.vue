<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import BackToTop from '@/components/layout/BackToTop.vue'

const route = useRoute()

/** 海报导出页需要干净的画布，不渲染站点头尾 */
const bareLayout = computed(() => route.name === 'poster-print')
</script>

<template>
  <template v-if="bareLayout">
    <RouterView />
  </template>

  <template v-else>
    <a class="skip-link" href="#main">跳到主要内容</a>
    <SiteHeader />
    <main id="main">
      <RouterView />
    </main>
    <SiteFooter />
    <BackToTop />
  </template>
</template>
