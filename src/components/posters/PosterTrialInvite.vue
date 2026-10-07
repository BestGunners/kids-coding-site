<script setup lang="ts">
import { CalendarCheck, Check } from 'lucide-vue-next'
import PosterFrame from '@/components/posters/PosterFrame.vue'

const facts = [
  { label: '时长', value: '60 分钟' },
  { label: '设备', value: '一人一台电脑' },
  { label: '基础', value: '无需编程基础' },
]

const todos = [
  '先做一次 6 题能力小测试，了解孩子的兴趣方向',
  '预约一次真实体验课，让孩子亲手写出第一段程序',
  '课后与老师沟通，再决定是否长期学习',
]
</script>

<template>
  <PosterFrame theme="dark" footer-note="扫码预约体验课 / 咨询课程老师" qr-caption="扫码预约 / 咨询">
    <span class="p-kicker">体验课邀约</span>
    <h2 class="p-title">给孩子一次<br />真正的编程体验</h2>
    <p class="p-subtitle">不需要提前准备，也不需要有编程基础。让孩子亲自体验一次，再决定是否适合。</p>

    <ul class="facts">
      <li v-for="fact in facts" :key="fact.label">
        <span>{{ fact.label }}</span>
        <b>{{ fact.value }}</b>
      </li>
    </ul>

    <ol class="todos">
      <li v-for="(todo, index) in todos" :key="todo">
        <span class="todos__index mono">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="todos__text">{{ todo }}</span>
      </li>
    </ol>

    <p class="p-quote">
      <Check :size="14" />
      我们不会一上来就卖课：先让孩子体验，再由家长决定。
    </p>

    <ul class="extra">
      <li>体验课内容：先理解“程序如何执行”，再亲手写出第一段代码</li>
      <li>适合年龄：6～15 岁，有无编程基础都可以</li>
    </ul>

    <p class="p-foot-note">
      <CalendarCheck :size="12" style="display: inline; vertical-align: -2px" />
      预约后老师会联系确认时间，名额以实际安排为准。
    </p>
  </PosterFrame>
</template>

<style scoped>
.facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 16px;
}

.facts li {
  padding: 10px 8px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  text-align: center;
}

.facts span {
  display: block;
  color: #8798b5;
  font-size: 10px;
  letter-spacing: 0.06em;
}

.facts b {
  display: block;
  margin-top: 5px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.todos {
  display: grid;
  gap: 9px;
  margin-top: 16px;
}

.todos li {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 9px;
  align-items: start;
}

.todos__index {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: rgba(63, 108, 255, 0.22);
  color: #b9caff;
  font-size: 10.5px;
  font-weight: 700;
}

.todos__text {
  color: #cfd9ec;
  font-size: 11.5px;
  line-height: 1.65;
}

.p-quote {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 16px;
}

.p-quote svg {
  flex: none;
  margin-top: 2px;
  color: #6fd0a4;
}

.extra {
  display: grid;
  gap: 7px;
  margin-top: 14px;
}

.extra li {
  position: relative;
  padding-left: 14px;
  color: #b9c6dd;
  font-size: 11.5px;
  line-height: 1.7;
}

.extra li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #7fa7ff;
}
</style>
