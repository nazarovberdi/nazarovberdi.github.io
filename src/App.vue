<script setup lang="ts">
import { useHead } from '@unhead/vue'
import displayFont from '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url'
import bodyFont from '@fontsource-variable/dm-sans/files/dm-sans-latin-opsz-normal.woff2?url'

import AppHeader from './components/AppHeader.vue'
import { useTheme } from './composables/useTheme'

useTheme()

// The hero headline and body text are on screen first; fetch them before the CSS asks.
useHead({
  link: [displayFont, bodyFont].map((href) => ({
    rel: 'preload', as: 'font', type: 'font/woff2', href, crossorigin: '',
  })),
})
</script>

<template>
  <AppHeader />
  <div style="padding-top: var(--header-height)">
    <router-view />
  </div>
</template>

<style scoped></style>
