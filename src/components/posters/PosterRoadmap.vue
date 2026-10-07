<script setup lang="ts">
import PosterFrame from '@/components/posters/PosterFrame.vue'
import { roadmapStages } from '@/data/roadmap'

const tracks = ['兴趣路线', '能力路线', '竞赛路线']
</script>

<template>
  <PosterFrame theme="light" footer-note="扫码查看完整学习路线与阶段说明" qr-caption="扫码看路线">
    <span class="p-kicker">成长路线</span>
    <h2 class="p-title">孩子学编程，<br />可以走多远？</h2>

    <ol class="path">
      <li v-for="(stage, index) in roadmapStages" :key="stage.id">
        <span class="path__rail" aria-hidden="true">
          <i v-if="index !== roadmapStages.length - 1" />
        </span>
        <b>{{ stage.name }}</b>
        <em>{{ stage.age }}</em>
      </li>
    </ol>

    <ul class="tracks">
      <li v-for="track in tracks" :key="track">{{ track }}</li>
    </ul>

    <p class="tip"><b>家长提示：</b>先培养兴趣与能力，再考虑竞赛。</p>

    <p class="p-foot-note">不是每个孩子都必须走竞赛路线，兴趣与能力同样重要。</p>
  </PosterFrame>
</template>

<style scoped>
.path {
  display: grid;
  gap: 5px;
  margin-top: 16px;
}

.path li {
  display: grid;
  grid-template-columns: 14px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  padding: 6px 10px 6px 4px;
  border-radius: 8px;
  background: var(--surface-soft);
}

.path__rail {
  position: relative;
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
}

.path__rail::after {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--brand-600);
}

.path__rail i {
  position: absolute;
  top: 12px;
  width: 1.5px;
  height: 12px;
  background: var(--brand-100);
}

.path b {
  color: var(--ink-800);
  font-size: 12.5px;
  font-weight: 700;
}

.path em {
  color: var(--ink-400);
  font-size: 10.5px;
  font-style: normal;
}

.tracks {
  display: flex;
  gap: 7px;
  margin-top: 12px;
}

.tracks li {
  flex: 1;
  padding: 7px 0;
  border-radius: 8px;
  background: var(--brand-050);
  color: var(--brand-700);
  font-size: 11px;
  font-weight: 700;
  text-align: center;
}

.tip {
  margin-top: 14px;
  color: var(--ink-500);
  font-size: 11.5px;
  line-height: 1.7;
}

.tip b {
  color: var(--brand-700);
  font-weight: 700;
}
</style>
