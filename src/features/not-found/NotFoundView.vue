<template>
  <section class="section not-found">
    <p class="section-label">404</p>
    <h1 v-reveal class="not-found-title line-mask font-display">
      <span class="line"><span>Lost</span></span>
      <span class="line" style="--line: 1"><span>the <em class="accent-serif">thread</em>.</span></span>
    </h1>
    <p class="page-intro">{{ message }}</p>
    <div class="not-found-links">
      <RouterLink to="/" class="nav-link"><span aria-hidden="true">←</span><SplitHover label="Back home" /></RouterLink>
      <RouterLink to="/blog" class="nav-link"><SplitHover label="All writing" /><span aria-hidden="true">→</span></RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import SplitHover from '@/components/SplitHover.vue'
import { usePageMeta } from '@/composables/usePageMeta'

/** Also shown by the post page when no post matches the URL. */
const props = withDefaults(defineProps<{ message?: string; setMeta?: boolean }>(), {
  message: "This page doesn't exist, or it has moved.",
  setMeta: true,
})

if (props.setMeta) {
  usePageMeta(() => ({ title: 'Page not found', description: "This page doesn't exist." }))
}
</script>
