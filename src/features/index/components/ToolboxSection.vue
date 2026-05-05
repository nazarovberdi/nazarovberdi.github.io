<template>
  <section class="mb-16 animate-fade-up [animation-delay:240ms]">
    <div class="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
      <div>
        <p class="eyebrow mb-3 text-[11px] uppercase tracking-[0.12em]">Runtime</p>
        <h2 class="font-serif text-[clamp(28px,5vw,40px)] leading-[1.05] tracking-[-0.02em]">
          Stack and operating style.
        </h2>
      </div>
      <p class="body-muted max-w-[280px] text-right text-[12px] leading-[1.7] max-sm:text-left">
        The tools and habits I lean on when building stable, developer-friendly frontend systems.
      </p>
    </div>

    <div class="tool-grid grid grid-cols-[0.8fr_1.2fr] gap-4 max-sm:grid-cols-1">
      <div class="surface-card p-6">
        <div class="mb-5 flex items-center justify-between">
          <p class="eyebrow text-[11px] uppercase tracking-[0.1em]">Core stack</p>
          <span class="eyebrow text-[11px]">01</span>
        </div>

        <div class="flex flex-wrap gap-3">
          <span
            v-for="skill in coreSkills"
            :key="skill"
            class="pill animate-fade-soft px-4 py-2 text-[12px] text-[var(--page-muted)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="surface-panel surface-alt p-6">
        <div class="mb-5 flex items-center justify-between">
          <p class="eyebrow text-[11px] uppercase tracking-[0.1em]">Operating mode</p>
          <span class="eyebrow text-[11px]">02</span>
        </div>

        <div class="space-y-4">
          <div>
            <p class="body-muted text-[12px] uppercase tracking-[0.08em]">Interface craft</p>
            <p class="body-muted mt-1 text-[13px] font-light leading-[1.7]">
              Thoughtful layouts, readable spacing, and product details that feel intentional.
            </p>
          </div>
          <div>
            <p class="body-muted text-[12px] uppercase tracking-[0.08em]">Developer experience</p>
            <p class="body-muted mt-1 text-[13px] font-light leading-[1.7]">
              Tools and workflows that make building, shipping, and maintaining easier.
            </p>
          </div>
          <div>
            <p class="body-muted text-[12px] uppercase tracking-[0.08em]">Open source mindset</p>
            <p class="body-muted mt-1 text-[13px] font-light leading-[1.7]">
              Learning in public, documenting clearly, and building toward thoughtful contributions over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  coreSkills: readonly string[]
}>()
</script>
