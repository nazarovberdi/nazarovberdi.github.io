<template>
  <!-- Scroll target and scroll-spy hook: the footer itself is sticky, so its box never moves. -->
  <div id="contact" v-reveal data-section="contact" class="contact-sentinel" />

  <footer class="contact-footer">
    <div class="contact-inner">
      <p class="section-label">04 — Contact</p>

      <h2 class="contact-title font-display">Let's <em class="accent-serif">talk</em>.</h2>
      <p class="contact-note">
        Open to frontend roles and contract work. Remote with full EU-hours overlap, or relocation.
      </p>

      <div class="contact-email">
        <button type="button" class="contact-email-copy font-display split-trigger" @click="copyEmail">
          <SplitHover :label="copied ? 'Copied ✓' : email" />
          <span class="sr-only" aria-live="polite">{{ copied ? 'Email address copied' : '' }}</span>
        </button>
        <a :href="`mailto:${email}`" class="nav-link"><SplitHover label="Write an email" />↗</a>
      </div>

      <ul class="contact-links">
        <li v-for="profile in socialProfiles" :key="profile.label">
          <a :href="profile.url" target="_blank" rel="noopener" class="nav-link">
            <SplitHover :label="profile.label" />↗
          </a>
        </li>
        <li>
          <a :href="resumeUrl" target="_blank" rel="noopener" class="nav-link"><SplitHover label="Résumé" />↗</a>
        </li>
      </ul>

      <div class="contact-bar meta-label">
        <span>© {{ year }} Nazarov Berdi</span>
        <span>Ashgabat<template v-if="time">, {{ time }}</template> (UTC+5)</span>
        <RouterLink to="/goals" class="nav-link"><SplitHover label="Private learning roadmap" />→</RouterLink>
      </div>

      <SignatureMark />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import SplitHover from '@/components/SplitHover.vue'
import { useLocalTime } from '@/composables/useLocalTime'

import { email, resumeUrl, socialProfiles } from '../data'
import SignatureMark from './SignatureMark.vue'

const year = new Date().getFullYear()
const time = useLocalTime()
const copied = ref(false)
let reset: ReturnType<typeof setTimeout> | undefined

/** Copies the address; falls back to opening the mail app if the clipboard is blocked. */
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email)
  } catch {
    location.href = `mailto:${email}`
    return
  }
  copied.value = true
  clearTimeout(reset)
  reset = setTimeout(() => (copied.value = false), 2200)
}
</script>
