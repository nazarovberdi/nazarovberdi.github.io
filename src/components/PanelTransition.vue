<template>
  <div ref="panel" class="panel-transition" aria-hidden="true">
    <p class="panel-transition-label font-display">
      <span ref="labelEl">{{ label }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { jumpTo } from '@/motion/smoothScroll'

/**
 * Panel transition: an accent panel rises over the page, the destination's
 * name flashes on it, the route changes underneath, and the panel exits upward.
 */
const router = useRouter()
const panel = ref<HTMLElement>()
const labelEl = ref<HTMLElement>()
const label = ref('')

let covered = false
const cleanups: Array<() => void> = []

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

function cover(): Promise<void> {
  return new Promise((resolve) => {
    gsap
      .timeline({ onComplete: resolve })
      .set(panel.value!, { visibility: 'visible' })
      .fromTo(panel.value!, { yPercent: 100 }, { yPercent: 0, duration: 0.48, ease: 'power3.inOut' })
      .fromTo(labelEl.value!, { yPercent: 110 }, { yPercent: 0, duration: 0.42, ease: 'power3.out' }, 0.2)
  })
}

function reveal(): void {
  gsap
    .timeline()
    .to(labelEl.value!, { yPercent: -110, duration: 0.3, ease: 'power2.in' })
    .to(panel.value!, { yPercent: -100, duration: 0.52, ease: 'power3.inOut' }, 0.08)
    .set(panel.value!, { visibility: 'hidden' })
}

onMounted(() => {
  // Registered after mount, so the page load itself never plays the transition.
  cleanups.push(
    router.beforeEach(async (to, from) => {
      if (to.path === from.path || reducedMotion()) return
      label.value = to.meta.label ?? ''
      covered = true
      await cover()
    }),
    router.afterEach(async (to, from) => {
      if (to.path === from.path) return
      // Wait for the new page to render and the router to restore the scroll.
      await nextTick()
      await new Promise(requestAnimationFrame)
      // Screen readers and keyboards start on the new page, not the old link.
      document.getElementById('main')?.focus({ preventScroll: true })
      if (!covered) return
      covered = false
      jumpTo(window.scrollY)
      reveal()
    }),
  )
})

onBeforeUnmount(() => cleanups.forEach((stop) => stop()))
</script>
