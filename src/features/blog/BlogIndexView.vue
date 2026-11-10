<template>
  <div class="page">
    <header class="section page-head">
      <p class="section-label">Writing</p>
      <h1 v-reveal class="page-title line-mask font-display">
        <span class="line"><span>Writing</span></span>
      </h1>
      <p v-reveal class="page-intro reveal-group">
        <span class="reveal-item">Short write-ups on frontend craft, developer tooling, and the small decisions that make
          products feel intentional.</span>
      </p>
      <p class="page-aside meta-label">
        {{ blogPosts.length }} posts ·
        <a href="/rss.xml" class="nav-link"><SplitHover label="RSS" />↗</a>
      </p>
    </header>

    <section class="section page-body" aria-label="All posts">
      <WritingRows :posts="blogPosts" with-summary />
    </section>
  </div>
</template>

<script setup lang="ts">
import SplitHover from '@/components/SplitHover.vue'
import { usePageMeta } from '@/composables/usePageMeta'

import { blogPosts } from './posts'
import WritingRows from './WritingRows.vue'

usePageMeta(() => ({
  title: 'Writing',
  description:
    'Short write-ups on frontend craft, developer tooling, and the small decisions that make products feel intentional.',
}))
</script>
