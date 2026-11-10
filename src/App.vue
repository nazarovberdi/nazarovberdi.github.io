<script setup lang="ts">
import { useHead } from '@unhead/vue'
import displayFont from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url'
import bodyFont from '@fontsource-variable/dm-sans/files/dm-sans-latin-opsz-normal.woff2?url'

import { onMounted } from 'vue'

import AppHeader from './components/AppHeader.vue'
import PanelTransition from './components/PanelTransition.vue'
import { useTheme } from './composables/useTheme'
import { startSmoothScroll } from './motion/smoothScroll'

useTheme()
onMounted(startSmoothScroll)

// The hero headline and body text are on screen first; fetch them before the CSS asks.
useHead({
  link: [displayFont, bodyFont].map((href) => ({
    rel: 'preload', as: 'font', type: 'font/woff2', href, crossorigin: '',
  })),
})
</script>

<template>
  <a href="#main" class="skip-link">Skip to content</a>
  <AppHeader />
  <div id="main" tabindex="-1" class="outline-none" style="padding-top: var(--header-height)">
    <router-view />
  </div>
  <PanelTransition />
</template>

<style scoped></style>
