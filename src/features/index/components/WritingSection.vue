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

    <ol class="writing-list">
      <li v-for="post in posts" :key="post.slug" v-reveal class="writing-row">
        <RouterLink :to="`/blog/${post.slug}`" class="writing-row-main">
          <time class="meta-label" :datetime="post.date">{{ formatBlogDate(post.date) }}</time>
          <span class="writing-title font-display"><SplitHover :label="post.title" /></span>
          <span class="meta-label">{{ post.readingTime }} min</span>
          <span class="work-arrow" aria-hidden="true">→</span>
        </RouterLink>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import SplitHover from '@/components/SplitHover.vue'
import { formatBlogDate, type BlogPost } from '@/features/blog/posts'

defineProps<{ posts: readonly BlogPost[] }>()
</script>
