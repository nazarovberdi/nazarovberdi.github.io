<template>
  <article v-if="post" class="page post">
    <div class="read-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />

    <header class="section post-head">
      <RouterLink to="/blog" class="post-back nav-link">
        <span aria-hidden="true">←</span><SplitHover label="All writing" />
      </RouterLink>
      <div class="post-head-main">
        <p class="meta-label">
          <time :datetime="post.date">{{ formatBlogDate(post.date) }}</time> · {{ post.readingTime }} min read
        </p>
        <h1 v-reveal class="post-title line-mask font-display">
          <span class="line"><span>{{ post.title }}</span></span>
        </h1>
        <p v-if="post.summary" class="post-summary">{{ post.summary }}</p>
      </div>
    </header>

    <div ref="body" class="section post-body">
      <div class="blog-prose" v-html="post.html" />
    </div>

    <nav v-if="morePosts.length" class="section post-more" aria-label="Keep reading">
      <p class="section-label">Keep reading</p>
      <WritingRows :posts="morePosts" />
    </nav>
  </article>

  <NotFoundView v-else message="There is no post at this address." :set-meta="false" />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import SplitHover from '@/components/SplitHover.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import NotFoundView from '@/features/not-found/NotFoundView.vue'

import { formatBlogDate, getAdjacentPosts, getBlogPostBySlug, type BlogPost } from './posts'
import WritingRows from './WritingRows.vue'

const route = useRoute()
const body = ref<HTMLElement | null>(null)
const progress = ref(0)

const post = computed(() => getBlogPostBySlug(String(route.params.slug ?? '')))
const morePosts = computed<BlogPost[]>(() => {
  if (!post.value) return []
  const { prev, next } = getAdjacentPosts(post.value.slug)
  return [prev, next].filter((p): p is BlogPost => p !== null)
})

usePageMeta(() =>
  post.value
    ? { title: post.value.title, description: post.value.summary, ogType: 'article' }
    : { title: 'Post not found', description: "This post doesn't exist." },
)

// How far through the article body the reader is, 0..1.
let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    const el = body.value
    if (!el) return
    const { top, height } = el.getBoundingClientRect()
    progress.value = Math.min(1, Math.max(0, -top / Math.max(1, height - window.innerHeight)))
  })
}

// Code blocks carry a copy button (rendered at build time in markdown.ts).
const resetTimers = new WeakMap<HTMLButtonElement, number>()
async function onBodyClick(event: Event) {
  const button = (event.target as HTMLElement | null)?.closest('.blog-code-copy')
  if (!(button instanceof HTMLButtonElement) || !button.dataset.code) return
  try {
    await navigator.clipboard.writeText(decodeURIComponent(button.dataset.code))
    button.textContent = 'Copied'
    button.dataset.copied = 'true'
  } catch {
    button.textContent = 'Failed'
  }
  window.clearTimeout(resetTimers.get(button))
  resetTimers.set(
    button,
    window.setTimeout(() => {
      button.textContent = 'Copy'
      delete button.dataset.copied
    }, 1800),
  )
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  body.value?.addEventListener('click', onBodyClick)
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  body.value?.removeEventListener('click', onBodyClick)
})
</script>
