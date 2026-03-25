<template>
  <div class="home-page theme-hackful relative">
    <div class="home-dot-grid pointer-events-none fixed inset-0" />
    <div class="home-veil pointer-events-none fixed inset-0" />
    <div
      class="home-glow pointer-events-none absolute inset-x-0 top-0 h-[420px] animate-gentle-drift"
    />

    <main class="home-main relative mx-auto px-6 pt-8 pb-16 animate-fade-up">
      <HomeHeader />
      <HeroSection />
      <ProfileSnapshotSection />
      <ProjectsSection :projects="projects" />
      <BlogSection :posts="featuredBlogPosts" />
      <ToolboxSection :core-skills="coreSkills" :working-traits="workingTraits" />
      <ContactSection :social-profiles="socialProfiles" />
      <HomeFooter :year="year" />
    </main>
  </div>
</template>

<script setup lang="ts">
import BlogSection from '@/features/blog/BlogSection.vue'
import { featuredBlogPosts } from '@/features/blog/posts'

import ContactSection from './components/ContactSection.vue'
import HeroSection from './components/HeroSection.vue'
import HomeFooter from './components/HomeFooter.vue'
import HomeHeader from './components/HomeHeader.vue'
import ProfileSnapshotSection from './components/ProfileSnapshotSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ToolboxSection from './components/ToolboxSection.vue'
import { coreSkills, projects, socialProfiles, workingTraits } from './data'

const year = new Date().getFullYear()
</script>
