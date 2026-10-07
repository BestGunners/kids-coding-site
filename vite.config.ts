import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 相对路径部署：可直接放进任意静态目录 / CDN 子目录，也方便本地双击预览
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // 兼顾微信内置浏览器（X5 / WKWebView）与较老的安卓机型
    target: 'es2019',
    cssTarget: 'chrome80',
    chunkSizeWarningLimit: 900,
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
