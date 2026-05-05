<template>
  <section class="mb-16 animate-fade-up [animation-delay:255ms]">
    <div class="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
      <div>
        <p class="eyebrow mb-3 text-[11px] uppercase tracking-[0.12em]">Blog</p>
        <h2 class="font-serif text-[clamp(28px,5vw,40px)] leading-[1.05] tracking-[-0.02em]">
          Notes from the workbench.
        </h2>
        <p class="body-muted mt-4 max-w-[480px] text-[13px] leading-[1.8]">
          Short write-ups on frontend craft, developer tooling, and the small decisions that make products feel more intentional.
        </p>
      </div>

      <RouterLink
        to="/blog"
        class="body-muted inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] transition-colors duration-150 hover:text-(--page-text)"
      >
        <span>Open Blog</span>
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <div class="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
      <RouterLink
        v-for="(post, index) in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="surface-card blog-listing-card group animate-fade-soft flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5"
        :style="{ animationDelay: `${290 + index * 55}ms` }"
      >
        <p class="eyebrow mb-4 text-[11px] uppercase tracking-[0.12em]">
          {{ formatBlogDate(post.date) }}
        </p>
        <h3 class="mb-4 font-serif text-[26px] leading-[1.05] tracking-[-0.02em]">
          {{ post.title }}
        </h3>
        <p class="body-muted text-[13px] leading-[1.8]">
          {{ post.summary }}
        </p>
        <span
          class="mt-auto pt-6 text-[12px] uppercase tracking-[0.08em] text-(--page-text) transition-transform duration-300 group-hover:translate-x-1"
        >
          Read entry
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { BlogPost } from './posts'
import { formatBlogDate } from './posts'

defineProps<{
  posts: BlogPost[]
}>()
</script>
