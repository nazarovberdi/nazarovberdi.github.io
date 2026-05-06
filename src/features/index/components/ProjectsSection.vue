<template>
  <section class="mb-16 animate-fade-up [animation-delay:225ms]">
    <div
      class="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start"
    >
      <div>
        <p class="eyebrow mb-3 text-[11px] uppercase tracking-[0.12em]">
          Pinned Repositories
        </p>
        <h2
          class="font-serif text-[clamp(28px,5vw,40px)] leading-[1.05] tracking-[-0.02em]"
        >
          Recent builds worth opening.
        </h2>
        <p class="body-muted mt-4 max-w-[460px] text-[13px] leading-[1.8]">
          A small set of repositories that show the kind of work I enjoy most:
          practical tools, polished interfaces, and developer-facing systems
          with a clear job to do.
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
      <div
        v-for="(project, index) in projects"
        :key="project.name"
        class="group animate-fade-soft"
        :style="{ animationDelay: `${260 + index * 55}ms` }"
      >
        <article
          class="project-card surface-card flex h-full flex-col p-6 transition-all duration-300 group-hover:-translate-y-1.5"
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
              v-if="displayStars(project) !== null"
              class="pill px-3 py-1 text-[11px] uppercase tracking-[0.08em] body-muted"
            >
              ★ {{ displayStars(project) }}
            </span>
          </div>

          <div class="mb-6">
            <h3
              class="font-serif text-[28px] leading-[1.05] tracking-[-0.02em] text-(--page-text)"
            >
              {{ project.name }}
            </h3>
          </div>

          <p
            class="body-muted min-h-[72px] text-[13px] font-light leading-[1.75]"
          >
            {{ project.description }}
          </p>

          <div
            class="body-muted mt-auto flex flex-col items-end gap-3 pt-5 text-[12px]"
          >
            <div class="flex items-center justify-end gap-3">
              <span class="inline-flex items-center gap-2">
                {{ project.language }}
              </span>
            </div>

            <div
              class="flex flex-wrap items-center justify-end gap-x-4 gap-y-2"
            >
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener"
                class="group/link inline-flex items-center gap-2 text-(--page-muted) transition-colors duration-200 group-hover:text-(--page-text)"
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
                class="group/link inline-flex items-center gap-2 text-(--page-muted) transition-colors duration-200 group-hover:text-(--page-text)"
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { Project } from "../data";

const props = defineProps<{
  projects: readonly Project[];
}>();

const CACHE_KEY = "gh-stars-cache";
const CACHE_TTL = 60 * 60 * 1000;

interface StarsCache {
  ts: number;
  data: Record<string, number>;
}

const liveStars = ref<Record<string, number>>({});

function displayStars(project: Project): number | null {
  const live = liveStars.value[project.name];
  if (live !== undefined) return live;
  return project.stars;
}

onMounted(async () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { ts, data }: StarsCache = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) {
        liveStars.value = data;
        return;
      }
    }
  } catch {}

  const results: Record<string, number> = {};

  await Promise.all(
    props.projects.map(async (project) => {
      const repoSlug = project.repoSlug ?? project.name;
      try {
        const res = await fetch(
          `https://api.github.com/repos/${project.owner}/${repoSlug}`,
        );
        if (res.ok) {
          const data = (await res.json()) as { stargazers_count: number };
          results[project.name] = data.stargazers_count;
        }
      } catch {}
    }),
  );

  liveStars.value = results;
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ts: Date.now(), data: results }),
    );
  } catch {}
});
</script>
