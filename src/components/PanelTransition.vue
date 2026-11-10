<template>
  <div ref="panel" class="panel-transition" aria-hidden="true">
    <p class="panel-transition-label font-display">
      <span ref="labelEl">{{ label }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
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

const IN_OUT = 'cubic-bezier(0.76, 0, 0.24, 1)'
const OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

let covered = false
const cleanups: Array<() => void> = []

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const slide = (from: string, to: string) => [{ transform: `translateY(${from})` }, { transform: `translateY(${to})` }]

async function cover(): Promise<void> {
  const el = panel.value!
  el.getAnimations().forEach((a) => a.cancel())
  el.style.visibility = 'visible'
  await Promise.all([
    el.animate(slide('100%', '0%'), { duration: 480, easing: IN_OUT, fill: 'forwards' }).finished,
    labelEl.value!.animate(slide('110%', '0%'), { duration: 420, delay: 200, easing: OUT, fill: 'both' }).finished,
  ])
}

async function reveal(): Promise<void> {
  const el = panel.value!
  labelEl.value!.animate(slide('0%', '-110%'), { duration: 300, easing: 'cubic-bezier(0.5, 0, 0.75, 0)', fill: 'forwards' })
  try {
    await el.animate(slide('0%', '-100%'), { duration: 520, delay: 80, easing: IN_OUT, fill: 'forwards' }).finished
  } catch {
    return // Cancelled by a newer navigation, which owns the panel now.
  }
  el.style.visibility = 'hidden'
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
