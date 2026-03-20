<template>
  <section class="mb-16 animate-fade-up [animation-delay:225ms]">
    <div class="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
      <div>
        <p class="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#aaa]">Pinned Projects</p>
        <h2 class="font-serif text-[clamp(28px,5vw,40px)] leading-[1.05] tracking-[-0.02em]">
          Selected work from GitHub.
        </h2>
        <p class="mt-4 max-w-[460px] text-[13px] leading-[1.8] text-[#7c756a]">
          A small set of projects that represent what I like building: practical tools, polished
          interfaces, and developer-facing work with a clear purpose.
        </p>
      </div>

      <a
        href="https://github.com/nazarovberdi?tab=repositories"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] text-[#777] transition-colors duration-150 hover:text-[#1a1916]"
      >
        <span>View All Repos</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>

    <div class="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
      <article
        v-for="(project, index) in projects"
        :key="project.name"
        class="group animate-fade-soft flex h-full flex-col rounded-[24px] border border-[#e8e5de] bg-[#fbfaf7] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d8d2c7] hover:shadow-[0_20px_50px_rgba(26,25,22,0.07)]"
        :style="{ animationDelay: `${260 + index * 55}ms` }"
      >
        <div class="mb-6 flex items-center justify-between gap-4">
          <div class="inline-flex items-center gap-2">
            <span
              class="size-2 rounded-full transition-transform duration-300 group-hover:scale-125"
              :style="{ backgroundColor: project.color }"
              aria-hidden="true"
            />
            <p class="text-[11px] uppercase tracking-[0.1em] text-[#9d9589]">
              {{ project.owner }}
            </p>
          </div>

          <span
            v-if="project.stars !== null"
            class="rounded-full border border-[#e6dfd4] px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[#8a8378]"
          >
            ★ {{ project.stars }}
          </span>
        </div>

        <div class="mb-6">
          <h3 class="font-serif text-[28px] leading-[1.05] tracking-[-0.02em] text-[#1f1d18]">
            {{ project.name }}
          </h3>
        </div>

        <p class="min-h-[72px] text-[13px] font-light leading-[1.75] text-[#666]">
          {{ project.description }}
        </p>

        <div class="mt-auto flex flex-col items-end gap-3 pt-5 text-[12px] text-[#8a8378]">
          <div class="flex items-center justify-end gap-3">
            <span class="inline-flex items-center gap-2">
              {{ project.language }}
            </span>
          </div>

          <div class="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener"
              class="group/link inline-flex items-center gap-2 text-[#555] transition-colors duration-200 group-hover:text-[#1a1916]"
            >
              <span>Live demo</span>
              <span
                aria-hidden="true"
                class="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5"
                >↗</span
              >
            </a>

            <a
              :href="project.url"
              target="_blank"
              rel="noopener"
              class="group/link inline-flex items-center gap-2 text-[#555] transition-colors duration-200 group-hover:text-[#1a1916]"
            >
              <span>Source</span>
              <span
                aria-hidden="true"
                class="transition-transform duration-300 group-hover/link:translate-x-1.5"
                >→</span
              >
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '../data'

defineProps<{
  projects: readonly Project[]
}>()
</script>
