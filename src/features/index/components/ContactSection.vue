<template>
  <section class="mb-16 animate-fade-up [animation-delay:255ms]">
    <div
      class="rounded-[30px] border border-[#ddd7cc] bg-[linear-gradient(135deg,#fbfaf7_0%,#f2ede3_100%)] p-7"
    >
      <p class="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#9d9589]">Let&apos;s Connect</p>
      <div class="grid grid-cols-[minmax(0,1fr)_300px] gap-8 max-sm:grid-cols-1">
        <div>
          <h2
            class="font-serif text-[clamp(30px,5vw,44px)] leading-[1.02] tracking-[-0.02em] text-[#211f1a]"
          >
            Open to frontend collaboration, and meaningful connection.
          </h2>
          <p class="mt-4 max-w-[520px] text-[13px] font-light leading-[1.8] text-[#6f685d]">
            If you&apos;re building something careful and user-focused, I&apos;d be happy to talk.
            The roadmap is my learning path, and these are the places where I share, follow along,
            and stay reachable.
          </p>

          <div
            class="mt-8 inline-flex items-center gap-3 rounded-full border border-[#ded7ca] bg-[#fbfaf7]/80 px-4 py-2 text-[12px] text-[#6b6459]"
          >
            <span class="size-2 rounded-full bg-[#7d9b67]" aria-hidden="true" />
            <span>Open to work and collaboration</span>
          </div>
        </div>

        <div class="grid gap-3 self-end">
          <a
            v-for="(profile, index) in socialProfiles"
            :key="profile.label"
            :href="profile.url"
            target="_blank"
            rel="noopener"
            class="group animate-fade-soft rounded-[22px] border border-[#e1dbcf] bg-[#fbfaf7]/88 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#d0c7b8] hover:bg-[#fffdf9]"
            :style="{ animationDelay: `${320 + index * 70}ms` }"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[11px] uppercase tracking-[0.1em] text-[#9b9387]">
                  {{ profile.kind }}
                </p>
                <p class="mt-2 font-serif text-[24px] leading-none text-[#26231e]">
                  {{ profile.label }}
                </p>
                <p class="mt-2 text-[12px] leading-[1.6] text-[#736c61]">
                  {{ profile.handle }}
                </p>
              </div>

              <span
                aria-hidden="true"
                class="text-[14px] text-[#8a8378] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
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
