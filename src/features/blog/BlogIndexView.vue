<template>
  <div class="blog-page relative min-h-screen overflow-x-hidden">
    <main class="blog-main relative mx-auto px-5 pt-10 pb-16 sm:px-8 sm:pt-16 animate-fade-up">
      <header
        class="mb-12 flex items-start justify-between gap-6 max-lg:flex-col max-lg:items-start"
      >
        <div class="min-w-0 flex-1">
          <p class="eyebrow mb-4 text-[11px] uppercase tracking-[0.12em]">Writing / frontend notes</p>
          <h1
            class="font-serif text-[clamp(52px,10vw,120px)] font-semibold leading-[.85] tracking-[-0.07em]"
          >
            Thoughts &amp; Learnings
          </h1>
        </div>

        <RouterLink
          to="/"
          class="secondary-button inline-flex items-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[0.08em] max-lg:self-start"
        >
          <span aria-hidden="true">←</span>
          <span>Back home</span>
        </RouterLink>
      </header>

      <section class="grid gap-5">
        <RouterLink
          v-for="(post, index) in blogPosts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="surface-panel animate-fade-soft blog-row-link block min-w-0 p-6 transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:p-8"
          :style="{ animationDelay: `${120 + index * 50}ms` }"
        >
          <div class="flex items-start justify-between gap-6 max-md:flex-col">
            <div class="min-w-0 flex-1">
              <p class="eyebrow mb-3 text-[11px] uppercase tracking-[0.12em]">
                {{ formatBlogDate(post.date) }}
                <span aria-hidden="true"> · </span>
                {{ post.readingTime }} min read
              </p>
              <h2
                class="font-serif text-[clamp(28px,3vw,42px)] font-semibold leading-[.95] tracking-[-0.05em]"
              >
                {{ post.title }}
              </h2>
              <p
                class="body-muted mt-4 max-w-[640px] text-[14px] leading-[1.85]"
              >
                {{ post.summary }}
              </p>
            </div>

            <span
              class="mt-1 shrink-0 text-[12px] uppercase tracking-[0.08em] text-(--page-text)"
            >
              Open post →
            </span>
          </div>
        </RouterLink>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { blogPosts, formatBlogDate } from './posts'
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta(() => ({
  title: 'Writing',
  description: 'Short write-ups on frontend craft, developer tooling, and the small decisions that make products feel more intentional.',
}))
</script>
