<template>
  <section data-reveal class="mb-28">
    <div class="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
      <div>
        <p class="eyebrow mb-4 text-[11px] uppercase tracking-[0.12em]">03 / Capabilities</p>
        <h2 class="font-display text-[clamp(38px,5vw,58px)] font-semibold leading-[.93] tracking-[-0.055em]">
          The systems<br />behind the surface.
        </h2>
      </div>
    </div>

    <div class="tool-grid border border-[var(--line)]">
      <div class="surface-card p-7">

        <div class="flex flex-wrap gap-3">
          <span
            v-for="skill in coreSkills"
            :key="skill"
            data-reveal-item class="pill px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--page-text)]"
          >
            {{ skill }}
          </span>
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
