<template>
  <section class="hero">
    <h1 v-reveal class="hero-name line-mask font-display">
      <span class="line"><span>Nazarov</span></span>
      <span class="line" style="--line: 1"><span>Berdi</span></span>
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

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import SplitHover from '@/components/SplitHover.vue'
import { useLocalTime } from '@/composables/useLocalTime'
import { scrollToSection } from '@/motion/smoothScroll'

const time = useLocalTime()
</script>
