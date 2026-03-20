<template>
  <div class="relative min-h-screen bg-[#F7F5F0] text-[#1a1916] font-mono overflow-hidden">
    <div
      class="pointer-events-none fixed inset-0 opacity-[0.3] dark:opacity-[0.14]"
      :style="dotGridStyle"
    />
    <div
      class="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,rgba(247,245,240,0.18),rgba(247,245,240,0.72)_38%,rgba(247,245,240,0.92)_72%,#F7F5F0_100%)]"
    />
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-[420px] animate-gentle-drift bg-[radial-gradient(circle_at_top,rgba(202,190,164,0.24),transparent_62%)]"
    />

    <main class="relative mx-auto max-w-[760px] px-6 pt-8 pb-16 animate-fade-up">
      <HomeHeader />
      <HeroSection />
      <ProfileSnapshotSection />
      <ProjectsSection :projects="projects" />
      <ToolboxSection :core-skills="coreSkills" :working-traits="workingTraits" />
      <ContactSection :social-profiles="socialProfiles" />
      <HomeFooter :year="year" />
    </main>
  </div>
</template>

<script setup lang="ts">
import ContactSection from './components/ContactSection.vue'
import HeroSection from './components/HeroSection.vue'
import HomeFooter from './components/HomeFooter.vue'
import HomeHeader from './components/HomeHeader.vue'
import ProfileSnapshotSection from './components/ProfileSnapshotSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ToolboxSection from './components/ToolboxSection.vue'
import { coreSkills, projects, socialProfiles, workingTraits } from './data'

const year = new Date().getFullYear()

const dotGridStyle = {
  backgroundImage: `
    radial-gradient(circle at center, rgba(52, 47, 40, 0.16) 0.85px, transparent 0.95px),
    radial-gradient(circle at center, rgba(176, 164, 142, 0.1) 0.65px, transparent 0.75px)
  `,
  backgroundSize: '30px 30px, 90px 90px',
  backgroundPosition: '0 0, 15px 18px',
}
</script>
