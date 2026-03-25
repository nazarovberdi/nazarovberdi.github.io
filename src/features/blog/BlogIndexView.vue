<template>
  <div class="blog-page theme-hackful relative min-h-screen overflow-x-hidden">
    <div class="home-dot-grid pointer-events-none fixed inset-0" />
    <div class="home-veil pointer-events-none fixed inset-0" />
    <div
      class="home-glow pointer-events-none absolute inset-x-0 top-0 h-[360px] animate-gentle-drift"
    />

    <main class="blog-main relative mx-auto px-6 pt-8 pb-16 animate-fade-up">
      <header
        class="mb-12 flex items-start justify-between gap-6 max-lg:flex-col max-lg:items-start"
      >
        <div class="min-w-0 flex-1">
          <p class="eyebrow mb-4 text-[11px] uppercase tracking-[0.12em]">Writing</p>
          <h1 class="font-serif text-[clamp(42px,10vw,86px)] leading-[0.95] tracking-[-0.05em]">
            Blog posts in markdown, rendered with the site’s own voice.
          </h1>
          <p class="body-muted mt-5 max-w-[580px] text-[14px] leading-[1.85]">
            Each post lives as a plain markdown file, which keeps writing lightweight while letting
            the site control the presentation, spacing, and typography.
          </p>
        </div>

        <RouterLink
          to="/"
          class="secondary-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] uppercase tracking-[0.08em] transition-transform duration-200 hover:-translate-y-0.5 max-lg:self-start"
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
          class="surface-panel animate-fade-soft blog-row-link block min-w-0 p-6 transition-all duration-300 hover:-translate-y-1"
          :style="{ animationDelay: `${120 + index * 50}ms` }"
        >
          <div class="flex items-start justify-between gap-6 max-md:flex-col">
            <div class="min-w-0 flex-1">
              <p class="eyebrow mb-3 text-[11px] uppercase tracking-[0.12em]">
                {{ formatBlogDate(post.date) }}
              </p>
              <h2 class="font-serif text-[32px] leading-[1.05] tracking-[-0.03em]">
                {{ post.title }}
              </h2>
              <p class="body-muted mt-4 max-w-[640px] text-[14px] leading-[1.85]">
                {{ post.summary }}
              </p>
            </div>

            <span class="mt-1 shrink-0 text-[12px] uppercase tracking-[0.08em] text-(--page-text)">
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
</script>
