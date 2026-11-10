<template>
  <section data-reveal class="mb-20">
    <div class="contact-panel border-y border-[var(--line)] py-14">
      <p class="eyebrow mb-5 text-[11px] uppercase tracking-[0.12em]">04 / Contact</p>
      <div class="grid grid-cols-[minmax(0,1fr)_300px] gap-8 max-sm:grid-cols-1">
        <div>
          <h2
            class="font-display max-w-[700px] text-[clamp(42px,6vw,76px)] font-semibold leading-[.9] tracking-[-0.065em] text-[var(--page-text)]"
          >
            Let’s make the interface<br />the reason it works.
          </h2>

          <div class="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="mailto:nazarov120100@gmail.com"
              class="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-(--accent-bright) transition-colors duration-150 hover:text-(--page-text)"
            >
              <SplitHover label="Send an email" /> <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div class="grid gap-3 self-end">
          <div
            v-for="profile in socialProfiles"
            :key="profile.label"
            data-reveal-item class="group"
          >
          <a
            :href="profile.url"
            target="_blank"
            rel="noopener"
            class="contact-link surface-card block px-5 py-4 transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="font-display text-[24px] font-semibold leading-none tracking-[-0.04em] text-[var(--page-text)]">
                  {{ profile.label }}
                </p>
                <p class="body-muted mt-2 text-[12px] leading-[1.6]">
                  {{ profile.handle }}
                </p>
              </div>

              <span
                aria-hidden="true"
                class="body-muted text-[14px] transition-transform duration-200 group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
                >↗</span
              >
            </div>
          </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SplitHover from '@/components/SplitHover.vue'

import type { SocialProfile } from '../data'

defineProps<{
  socialProfiles: readonly SocialProfile[]
}>()
</script>
