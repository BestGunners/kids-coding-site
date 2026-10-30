<script setup lang="ts">
import { useRoute } from 'vue-router'
import { siteConfig, topNav } from '@/data/site'

const route = useRoute()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <strong>{{ siteConfig.productName }}</strong>
        <p>{{ siteConfig.orgNote }}</p>
        <p class="site-footer__org">{{ siteConfig.orgName }}</p>
        <p class="site-footer__contact">电话 {{ siteConfig.phone }} · 微信 {{ siteConfig.wechatId }}</p>
      </div>

      <nav class="site-footer__nav" aria-label="页脚导航">
        <RouterLink v-for="item in topNav" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
      </nav>

      <p v-if="route.name === 'teacher'" class="site-footer__note">
        本页为机构内部素材页，包含老师转发话术与海报链接，建议仅分享给老师使用。
      </p>
      <p v-else class="site-footer__note">
        本页面内容用于家长了解少儿编程学习方向，涉及竞赛与等级认证的部分，请以主办单位当年官方通知为准。
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--ink-900);
  color: #c3cee2;
  padding-block: 40px calc(40px + var(--safe-bottom));
}

.site-footer__inner {
  display: grid;
  gap: 20px;
}

.site-footer__brand strong {
  display: block;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}

.site-footer__brand p {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.8;
}

.site-footer__org {
  color: #8798b5;
}

.site-footer__contact {
  color: #8798b5;
  font-size: 12.5px;
}

.site-footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.site-footer__nav a {
  font-size: 14px;
  font-weight: 600;
  color: #dbe3f1;
}

.site-footer__nav a:hover {
  color: #fff;
}

.site-footer__note {
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: #8798b5;
  font-size: 12px;
  line-height: 1.9;
}

@media (min-width: 860px) {
  .site-footer {
    padding-block: 56px;
  }

  .site-footer__inner {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
    gap: 32px;
  }

  .site-footer__note {
    grid-column: 1 / -1;
  }
}
</style>
