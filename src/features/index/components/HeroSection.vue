<template>
  <section class="hero">
    <h1
      ref="nameEl"
      class="hero-name line-mask line-intro paint-name font-display"
      :class="{ 'is-painted': painted }"
    >
      <span class="line"><span><span class="hero-b">B</span>erdi</span></span>
      <span class="line" style="--line: 1"><span>Nazarov</span></span>
    </h1>

    <div v-reveal class="hero-foot reveal-group">
      <p class="hero-statement reveal-item" style="--i: 0">
        Frontend engineer building interfaces people <em class="accent-serif">rely on</em>, from railway
        billing to my own apps.
      </p>

      <div class="hero-status reveal-item" style="--i: 1">
        <p class="status-line">
          <span class="status-dot" aria-hidden="true" />Available for contract work · Open to relocation
        </p>
        <p class="meta-label">
          Ashgabat<template v-if="time">, <time>{{ time }}</time></template> (UTC+5)
        </p>
      </div>

      <RouterLink
        :to="{ path: '/', hash: '#work' }"
        class="hero-scroll meta-label reveal-item"
        style="--i: 2"
        @click.prevent="scrollToSection('#work')"
      >
        <SplitHover label="See the work" /><span aria-hidden="true">↓</span>
      </RouterLink>
    </div>
  </section>
</template>

<script lang="ts">
// The Paint reveal plays once per visit; coming back to Home shows the name solid.
let paintedThisVisit = false
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import SplitHover from '@/components/SplitHover.vue'
import { useLocalTime } from '@/composables/useLocalTime'
import { scrollToSection } from '@/motion/smoothScroll'

const time = useLocalTime()

const nameEl = ref<HTMLElement>()
const painted = ref(paintedThisVisit)
let stopPainting: (() => void) | undefined
let unmounted = false

onMounted(async () => {
  const el = nameEl.value
  // Without html.motion the CSS never drew the outline, so there is nothing to paint.
  if (!el || paintedThisVisit || !document.documentElement.classList.contains('motion')) {
    painted.value = true
    return
  }
  paintedThisVisit = true
  // If the painter can't start soon (slow network, failed chunk), show the name solid.
  const fallback = setTimeout(() => (painted.value = true), 3000)
  try {
    const style = getComputedStyle(el)
    const [{ paintName }] = await Promise.all([
      import('@/motion/paintName'),
      document.fonts.load(`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`),
    ])
    clearTimeout(fallback)
    if (unmounted || painted.value) return
    stopPainting = paintName(el, { accentSelector: '.hero-b', onSettle: () => (painted.value = true) })
  } catch {
    clearTimeout(fallback)
    painted.value = true
  }
})

onBeforeUnmount(() => {
  unmounted = true
  stopPainting?.()
})
</script>
