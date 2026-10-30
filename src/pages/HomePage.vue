<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '@/components/sections/HeroSection.vue'
import StatsStrip from '@/components/sections/StatsStrip.vue'
import BridgeSection from '@/components/sections/BridgeSection.vue'
import CaseSection from '@/components/sections/CaseSection.vue'
import QuizSection from '@/components/sections/QuizSection.vue'
import AbilitySection from '@/components/sections/AbilitySection.vue'
import RoadmapSection from '@/components/sections/RoadmapSection.vue'
import AgeSection from '@/components/sections/AgeSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import MobileCtaBar from '@/components/layout/MobileCtaBar.vue'
import BookingDialog from '@/components/common/BookingDialog.vue'
import { scrollToSection } from '@/utils/dom'

const router = useRouter()
const bookingOpen = ref(false)
const fromQuiz = ref(false)

function openBooking(isFromQuiz: boolean): void {
  fromQuiz.value = isFromQuiz
  bookingOpen.value = true
}

function goTest(): void {
  void router.push('/test')
}

function goRoadmap(): void {
  scrollToSection('roadmap')
}
</script>

<template>
  <div class="page page--home">
    <HeroSection @roadmap="goRoadmap" />
    <StatsStrip />
    <BridgeSection />
    <CaseSection />
    <AbilitySection />
    <RoadmapSection />
    <AgeSection />
    <QuizSection @book="openBooking(true)" />
    <FaqSection @contact="openBooking(false)" />
    <CtaSection @book="openBooking(false)" />

    <MobileCtaBar @test="goTest" @book="openBooking(false)" />
    <BookingDialog :open="bookingOpen" :from-quiz="fromQuiz" @close="bookingOpen = false" />
  </div>
</template>
