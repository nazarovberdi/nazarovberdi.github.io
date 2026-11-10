<template>
  <section id="writing" data-section="writing" class="section">
    <header class="section-head">
      <p class="section-label">03 — Writing</p>
      <h2 v-reveal class="section-title line-mask font-display">
        <span class="line"><span>Notes from</span></span>
        <span class="line" style="--line: 1"><span>the workbench.</span></span>
      </h2>
      <RouterLink to="/blog" class="section-aside nav-link">
        <SplitHover label="All writing" /><span aria-hidden="true">→</span>
      </RouterLink>
    </header>

    <WritingRows :posts="posts" />
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import SplitHover from '@/components/SplitHover.vue'
import type { BlogPost } from '@/features/blog/posts'
import WritingRows from '@/features/blog/WritingRows.vue'

defineProps<{ posts: readonly BlogPost[] }>()
</script>
