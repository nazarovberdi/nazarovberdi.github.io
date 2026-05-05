<template>
  <div class="blog-page theme-hackful relative min-h-screen overflow-hidden">
    <div class="home-dot-grid pointer-events-none fixed inset-0" />
    <div class="home-veil pointer-events-none fixed inset-0" />
    <div
      class="home-glow pointer-events-none absolute inset-x-0 top-0 h-[360px]"
    />

    <main class="blog-main relative mx-auto flex min-h-[calc(100vh-64px)] flex-col justify-center px-6 py-16 animate-fade-up">
      <p class="eyebrow mb-4 text-[11px] uppercase tracking-[0.12em]">404</p>
      <h1
        class="font-serif text-[clamp(72px,14vw,140px)] leading-[0.88] tracking-[-0.06em]"
      >
        Page not found.
      </h1>
      <p class="body-muted mt-6 max-w-[480px] text-[14px] leading-[1.85]">
        This route doesn't exist. You may have followed a broken link or typed the address incorrectly.
      </p>
      <RouterLink
        to="/"
        class="primary-button mt-10 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-[12px] uppercase tracking-[0.08em]"
      >
        Back to home
      </RouterLink>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta(() => ({
  title: '404 — Page Not Found',
  description: "This page doesn't exist.",
}))
</script>
