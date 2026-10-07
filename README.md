# 少儿编程招生宣发系统

面向奥数 / 数学 / 物理学生家长的少儿编程招生宣发站点，包含：

- **首页**：奥数 × 编程能力对照、数学题→编程案例演示（可运行动画）、6 题家长快测、编程能学什么、成长路线（GESP / CSP-J / CSP-S）、适龄说明、家长问答、体验课转化
- **编程能力测评（15 题）**：孩子动手做的能力测评，按年龄段出题，结果给出 6 个维度的画像与推荐学习起点
- **海报导出页**：`#/print/<海报id>?scale=3`，用于导出高清招生海报

## 线上地址

- 站点首页：https://bestgunners.github.io/kids-coding-site/
- 能力测评：https://bestgunners.github.io/kids-coding-site/#/test

> GitHub Pages 的访问速度在国内可能偏慢，若需要更快的国内访问，建议后续迁移到国内静态托管（腾讯云 COS / 阿里云 OSS / 自建服务器）。

## 目录说明

```
index.html          入口页
src/                源码（Vue 3 + TypeScript + Vite）
  data/             文案与题库数据（海报、测评题、FAQ、路线等）
  components/       组件（首页区块、测评、海报、通用组件）
  pages/            页面（首页、能力测评、海报导出）
docs/               构建产物（GitHub Pages 从这里发布）
```

## 本地开发与构建

```bash
npm install
npm run dev        # 本地开发
npm run build      # 类型检查 + 构建到 dist/
npx vite build --outDir docs --emptyOutDir   # 构建到 docs/ 供 GitHub Pages 发布
```

## 常见修改位置

| 要改的内容 | 文件 |
| --- | --- |
| 机构名称、电话、微信号、二维码文案 | `src/data/site.ts` |
| 能力测评题目、选项、结果文案 | `src/data/abilityTest.ts` |
| 首页文案、FAQ、成长路线 | `src/data/faqs.ts`、`src/data/roadmap.ts`、`src/data/ages.ts` |
| 海报文案与版式 | `src/data/posters.ts`、`src/components/posters/*.vue` |

## 待办

- [ ] 海报中心页（`#/posters`）与老师素材中心页（`#/teacher`）
- [ ] 替换海报与页面中的占位二维码（换成能力测评链接）
- [ ] 若需要更快访问，迁移到国内静态托管
