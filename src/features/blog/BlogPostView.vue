<template>
  <div class="blog-page theme-hackful relative min-h-screen overflow-hidden">
    <div class="home-dot-grid pointer-events-none fixed inset-0" />
    <div class="home-veil pointer-events-none fixed inset-0" />
    <div
      class="home-glow pointer-events-none absolute inset-x-0 top-0 h-[360px] animate-gentle-drift"
    />

    <main class="blog-main relative mx-auto px-6 pt-8 pb-16 animate-fade-up">
      <template v-if="post">
        <header class="mb-10">
          <RouterLink
            to="/blog"
            class="body-muted mb-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.08em] transition-colors duration-150 hover:text-(--page-text)"
          >
            <span aria-hidden="true">←</span>
            <span>Back to blog</span>
          </RouterLink>

          <p class="eyebrow mb-4 text-[11px] uppercase tracking-[0.12em]">
            {{ formatBlogDate(post.date) }}
          </p>
          <h1 class="font-serif text-[clamp(40px,9vw,80px)] leading-[0.96] tracking-[-0.05em]">
            {{ post.title }}
          </h1>
          <p class="body-muted mt-5 max-w-[620px] text-[14px] leading-[1.85]">
            {{ post.summary }}
          </p>
        </header>

        <article ref="articleRef" class="surface-panel blog-article p-8 max-sm:p-6">
          <div class="blog-prose" v-html="post.html" />
        </article>
      </template>

      <template v-else>
        <section class="surface-panel max-w-[720px] p-8">
          <p class="eyebrow mb-4 text-[11px] uppercase tracking-[0.12em]">Missing post</p>
          <h1 class="font-serif text-[clamp(34px,8vw,64px)] leading-[0.96] tracking-[-0.05em]">
            This entry does not exist yet.
          </h1>
          <p class="body-muted mt-5 max-w-[520px] text-[14px] leading-[1.85]">
            The route is wired correctly, but there is no markdown file matching this slug.
          </p>
          <RouterLink
            to="/blog"
            class="primary-button mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] uppercase tracking-[0.08em]"
          >
            Return to blog
          </RouterLink>
        </section>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { formatBlogDate, getBlogPostBySlug } from './posts'

const route = useRoute()
const articleRef = ref<HTMLElement | null>(null)
const copyResetTimers = new WeakMap<HTMLButtonElement, number>()

const post = computed(() => getBlogPostBySlug(String(route.params.slug ?? '')))

async function handleArticleClick(event: Event): Promise<void> {
  const target = event.target

  if (!(target instanceof HTMLElement)) {
    return
  }

  const button = target.closest('.blog-code-copy')
  if (!(button instanceof HTMLButtonElement)) {
    return
  }

  const encodedCode = button.dataset.code
  if (!encodedCode) {
    return
  }

  try {
    await navigator.clipboard.writeText(decodeURIComponent(encodedCode))
    button.textContent = 'Copied'
    button.dataset.copied = 'true'

    const existingTimer = copyResetTimers.get(button)
    if (existingTimer) {
      window.clearTimeout(existingTimer)
    }

    const resetTimer = window.setTimeout(() => {
      button.textContent = 'Copy'
      delete button.dataset.copied
      copyResetTimers.delete(button)
    }, 1800)

    copyResetTimers.set(button, resetTimer)
  } catch {
    button.textContent = 'Failed'

    window.setTimeout(() => {
      button.textContent = 'Copy'
    }, 1800)
  }
}

onMounted(() => {
  articleRef.value?.addEventListener('click', handleArticleClick)
})

onBeforeUnmount(() => {
  articleRef.value?.removeEventListener('click', handleArticleClick)
})
</script>
