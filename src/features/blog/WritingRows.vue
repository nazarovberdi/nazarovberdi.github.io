<template>
  <ol class="writing-list">
    <li v-for="post in posts" :key="post.slug" v-reveal class="writing-row">
      <RouterLink :to="`/blog/${post.slug}`" class="writing-row-main">
        <time class="meta-label" :datetime="post.date">{{ formatBlogDate(post.date) }}</time>
        <span class="writing-title font-display"><SplitHover :label="post.title" /></span>
        <span class="meta-label">{{ post.readingTime }} min</span>
        <span class="work-arrow" aria-hidden="true">→</span>
        <span v-if="withSummary" class="writing-summary">{{ post.summary }}</span>
      </RouterLink>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import SplitHover from '@/components/SplitHover.vue'

import { formatBlogDate, type BlogPost } from './posts'

/** Writing as rows: date, title, reading time. Shared by the home page and /blog. */
defineProps<{ posts: readonly BlogPost[]; withSummary?: boolean }>()
</script>
