import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const HomePage = () => import('@/pages/HomePage.vue')
const PosterPrintPage = () => import('@/pages/PosterPrintPage.vue')
const AbilityTestPage = () => import('@/pages/AbilityTestPage.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: '少儿编程成长探索｜孩子数学不错，要不要学编程？' },
  },
  {
    // 少儿编程能力测评（15 题，孩子动手做）
    path: '/test',
    name: 'ability-test',
    component: AbilityTestPage,
    meta: { title: '编程能力测评（15 题）｜少儿编程成长探索' },
  },
  {
    // 海报导出页：只渲染海报画布，供截图 / 打印导出使用
    path: '/print/:id',
    name: 'poster-print',
    component: PosterPrintPage,
    meta: { title: '海报导出｜少儿编程成长探索' },
  },
  // TODO（继续开发时补回）：
  //   /posters           海报中心（缩略图列表）
  //   /poster/:id        海报大图页（复制链接 / 打印导出）
  //   /teacher           老师素材中心（转发话术一键复制）
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  // 使用 hash 模式：无需服务器 rewrite，方便直接放进任意静态目录或本地打开
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 72 }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta.title
  if (typeof title === 'string') document.title = title
})
