<template>
  <section class="mb-16 animate-fade-up [animation-delay:255ms]">
    <div class="contact-panel surface-panel p-7">
      <p class="eyebrow mb-3 text-[11px] uppercase tracking-[0.12em]">Network</p>
      <div class="grid grid-cols-[minmax(0,1fr)_300px] gap-8 max-sm:grid-cols-1">
        <div>
          <h2
            class="font-serif text-[clamp(30px,5vw,44px)] leading-[1.02] tracking-[-0.02em] text-[var(--page-text)]"
          >
            Available for frontend collaboration and thoughtful product work.
          </h2>
          <p class="body-muted mt-4 max-w-[520px] text-[13px] font-light leading-[1.8]">
            If you're building something user-focused, technical, and intentional, I'd be glad to connect. These are the channels where I publish work, track progress, and stay reachable.
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-4">
            <div
              class="pill body-muted inline-flex items-center gap-3 px-4 py-2 text-[12px]"
            >
              <span class="size-2 rounded-full bg-[#7d9b67]" aria-hidden="true" />
              <span>Open channel for work and collaboration</span>
            </div>

            <a
              href="mailto:nazarov120100@gmail.com"
              class="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-150"
              style="color: var(--accent)"
            >
              Send an email ↗
            </a>
          </div>
        </div>

        <div class="grid gap-3 self-end">
          <a
            v-for="(profile, index) in socialProfiles"
            :key="profile.label"
            :href="profile.url"
            target="_blank"
            rel="noopener"
            class="contact-link surface-card group animate-fade-soft px-5 py-4 transition-all duration-300 hover:-translate-y-1"
            :style="{ animationDelay: `${320 + index * 70}ms` }"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="eyebrow text-[11px] uppercase tracking-[0.1em]">
                  {{ profile.kind }}
                </p>
                <p class="mt-2 font-serif text-[24px] leading-none text-[var(--page-text)]">
                  {{ profile.label }}
                </p>
                <p class="body-muted mt-2 text-[12px] leading-[1.6]">
                  {{ profile.handle }}
                </p>
              </div>

              <span
                aria-hidden="true"
                class="body-muted text-[14px] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
                >↗</span
              >
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SocialProfile } from '../data'

defineProps<{
  socialProfiles: readonly SocialProfile[]
}>()
</script>
