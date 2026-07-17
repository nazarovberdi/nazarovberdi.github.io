<template>
  <section id="work" class="mb-28 scroll-mt-28">
    <div
      class="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start"
    >
      <div>
        <p class="eyebrow mb-4 text-[11px] uppercase tracking-[0.12em]">01 / Selected work</p>
        <h2
          class="font-serif max-w-[620px] text-[clamp(38px,5vw,62px)] font-semibold leading-[.93] tracking-[-0.055em]"
        >
          Built for real use,<br />not just a screenshot.
        </h2>
        <p class="body-muted mt-4 max-w-[460px] text-[13px] leading-[1.8]">
          A focused collection of interfaces, open-source contributions, and practical tools that show how I think through frontend work.
        </p>
      </div>

      <a
        href="https://github.com/nazarovberdi?tab=repositories"
        target="_blank"
        rel="noopener"
        class="body-muted inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] transition-colors duration-150 hover:text-[var(--page-text)]"
      >
        <span>All repositories</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>

    <div class="projects-grid grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] max-sm:grid-cols-1">
      <div
        v-for="(project, index) in projects"
        :key="project.name"
        class="group animate-fade-soft"
        :style="{ animationDelay: `${260 + index * 55}ms` }"
      >
        <article
          class="project-card surface-card flex h-full flex-col p-7"
          :style="{ '--project-color': project.color }"
        >
          <div class="mb-12 flex items-start justify-between gap-4">
            <p class="project-index font-serif text-[46px] font-semibold leading-none tracking-[-0.07em]">0{{ index + 1 }}</p>

            <span
              v-if="displayStars(project) !== null"
              class="pill px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] body-muted"
            >
              ★ {{ displayStars(project) }}
            </span>
          </div>

          <div class="mb-5">
            <p class="eyebrow mb-3 text-[10px] uppercase tracking-[0.1em]">{{ project.owner }}</p>
            <h3
              class="font-serif text-[clamp(27px,3vw,38px)] font-semibold leading-[.95] tracking-[-0.05em] text-(--page-text)"
            >
              {{ project.name }}
            </h3>
          </div>

          <p
            class="body-muted min-h-[72px] text-[14px] leading-[1.7]"
          >
            {{ project.description }}
          </p>

          <div
            class="body-muted mt-auto flex flex-col items-start gap-5 border-t border-[var(--line)] pt-5 text-[12px]"
          >
            <div class="flex items-center justify-end gap-3">
              <span class="font-mono text-[10px] uppercase tracking-[0.08em]">
                {{ project.language }}
              </span>
            </div>

            <div
              class="flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener"
                class="group/link inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-(--page-muted) transition-colors duration-200 hover:text-(--accent-bright)"
              >
                <span>Open live</span>
                <span
                  aria-hidden="true"
                  class="transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5"
                  >↗</span
                >
              </a>

              <a
                :href="project.url"
                target="_blank"
                rel="noopener"
                class="group/link inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-(--page-muted) transition-colors duration-200 hover:text-(--accent-bright)"
              >
                <span>Read source</span>
                <span
                  aria-hidden="true"
                  class="transition-transform duration-200 group-hover/link:translate-x-1.5"
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
