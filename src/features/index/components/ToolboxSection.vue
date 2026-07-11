<template>
  <section class="mb-28">
    <div class="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
      <div>
        <p class="eyebrow mb-4 text-[11px] uppercase tracking-[0.12em]">02 / Capabilities</p>
        <h2 class="font-serif text-[clamp(38px,5vw,58px)] font-semibold leading-[.93] tracking-[-0.055em]">
          The systems<br />behind the surface.
        </h2>
      </div>
      <p class="body-muted max-w-[280px] text-right text-[12px] leading-[1.7] max-sm:text-left">
        Tools, patterns, and principles for building interfaces that hold up after launch.
      </p>
    </div>

    <div class="tool-grid grid grid-cols-[.8fr_1.2fr] gap-px border border-[var(--line)] bg-[var(--line)] max-sm:grid-cols-1">
      <div class="surface-card p-7">
        <div class="mb-5 flex items-center justify-between">
          <p class="eyebrow text-[11px] uppercase tracking-[0.1em]">Core stack</p>
          <span class="eyebrow text-[11px]">01</span>
        </div>

        <div class="flex flex-wrap gap-3">
          <span
            v-for="skill in coreSkills"
            :key="skill"
            class="pill px-3 py-2 font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--page-text)]"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="surface-panel surface-alt p-7">
        <div class="mb-5 flex items-center justify-between">
          <p class="eyebrow text-[11px] uppercase tracking-[0.1em]">Operating mode</p>
          <span class="eyebrow text-[11px]">02</span>
        </div>

        <div class="space-y-4">
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.08em] text-(--accent-bright)">Interface craft</p>
            <p class="body-muted mt-1 text-[13px] font-light leading-[1.7]">
              Thoughtful layouts, readable spacing, and product details that feel intentional.
            </p>
          </div>
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.08em] text-(--accent-bright)">Developer experience</p>
            <p class="body-muted mt-1 text-[13px] font-light leading-[1.7]">
              Tools and workflows that make building, shipping, and maintaining easier.
            </p>
          </div>
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.08em] text-(--accent-bright)">Open source mindset</p>
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
