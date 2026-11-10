<template>
  <div class="home">
    <div class="home-content">
      <HeroSection />
      <WorkSection :projects="projects" />
      <AboutSection />
      <WritingSection :posts="featuredBlogPosts" />
    </div>
    <ContactFooter />
  </div>
</template>

<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { featuredBlogPosts } from '@/features/blog/posts'

import AboutSection from './components/AboutSection.vue'
import ContactFooter from './components/ContactFooter.vue'
import HeroSection from './components/HeroSection.vue'
import WorkSection from './components/WorkSection.vue'
import WritingSection from './components/WritingSection.vue'
import { projects } from './data'

usePageMeta(() => ({
  title: 'Frontend Engineer',
  description:
    'Frontend engineer in Vue, React and TypeScript. Builds the internal tools Turkmenistan Railways runs on, and ships his own products end to end.',
}))
</script>
