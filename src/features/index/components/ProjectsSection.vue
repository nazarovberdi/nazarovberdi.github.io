<template>
  <section class="mb-16 animate-fade-up [animation-delay:225ms]">
    <div class="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
      <div>
        <p class="eyebrow mb-3 text-[11px] uppercase tracking-[0.12em]">Pinned Repositories</p>
        <h2 class="font-serif text-[clamp(28px,5vw,40px)] leading-[1.05] tracking-[-0.02em]">
          Recent builds worth opening.
        </h2>
        <p class="body-muted mt-4 max-w-[460px] text-[13px] leading-[1.8]">
          A small set of repositories that show the kind of work I enjoy most: practical tools,
          polished interfaces, and developer-facing systems with a clear job to do.
        </p>
      </div>

      <a
        href="https://github.com/nazarovberdi?tab=repositories"
        target="_blank"
        rel="noopener"
        class="body-muted inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] transition-colors duration-150 hover:text-[var(--page-text)]"
      >
        <span>Inspect All Repos</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>

    <div class="projects-grid grid grid-cols-2 gap-4 max-sm:grid-cols-1">
      <article
        v-for="(project, index) in projects"
        :key="project.name"
        class="project-card surface-card group animate-fade-soft flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5"
        :style="{ animationDelay: `${260 + index * 55}ms` }"
      >
        <div class="mb-6 flex items-center justify-between gap-4">
          <div class="inline-flex items-center gap-2">
            <span
              class="size-2 rounded-full transition-transform duration-300 group-hover:scale-125"
              :style="{ backgroundColor: project.color }"
              aria-hidden="true"
            />
            <p class="eyebrow text-[11px] uppercase tracking-[0.1em]">
              {{ project.owner }}
            </p>
          </div>

          <span
            v-if="project.stars !== null"
            class="pill px-3 py-1 text-[11px] uppercase tracking-[0.08em] body-muted"
          >
            ★ {{ project.stars }}
          </span>
        </div>

        <div class="mb-6">
          <h3 class="font-serif text-[28px] leading-[1.05] tracking-[-0.02em] text-[var(--page-text)]">
            {{ project.name }}
          </h3>
        </div>

        <p class="body-muted min-h-[72px] text-[13px] font-light leading-[1.75]">
          {{ project.description }}
        </p>

        <div class="body-muted mt-auto flex flex-col items-end gap-3 pt-5 text-[12px]">
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
              class="group/link inline-flex items-center gap-2 text-[var(--page-muted)] transition-colors duration-200 group-hover:text-[var(--page-text)]"
            >
              <span>Open live</span>
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
              class="group/link inline-flex items-center gap-2 text-[var(--page-muted)] transition-colors duration-200 group-hover:text-[var(--page-text)]"
            >
              <span>Read source</span>
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
