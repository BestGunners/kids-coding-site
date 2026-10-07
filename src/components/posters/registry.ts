import type { Component } from 'vue'
import PosterMathGood from '@/components/posters/PosterMathGood.vue'
import PosterOlympiadBridge from '@/components/posters/PosterOlympiadBridge.vue'
import PosterCaseDemo from '@/components/posters/PosterCaseDemo.vue'
import PosterQuizInvite from '@/components/posters/PosterQuizInvite.vue'
import PosterRoadmap from '@/components/posters/PosterRoadmap.vue'
import PosterTrialInvite from '@/components/posters/PosterTrialInvite.vue'

/** 海报 id → 海报组件 */
export const posterComponents: Record<string, Component> = {
  'math-good': PosterMathGood,
  'olympiad-bridge': PosterOlympiadBridge,
  'case-demo': PosterCaseDemo,
  'quiz-invite': PosterQuizInvite,
  roadmap: PosterRoadmap,
  'trial-invite': PosterTrialInvite,
}
