<template>
  <div>
    <div
      class="eyebrow mb-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.12em] animate-fade-up [animation-delay:150ms]"
    >
      <div class="rule-line h-px flex-1" />
      <span>System Snapshot</span>
      <div class="rule-line h-px flex-1" />
    </div>

    <section
      class="profile-grid surface-panel mb-[4.5rem] grid grid-cols-3 overflow-hidden animate-fade-up [animation-delay:200ms] max-sm:grid-cols-1"
    >
      <div class="border-r border-[var(--line)] bg-[color-mix(in_srgb,var(--panel-bg-strong)_90%,var(--page-bg))] p-6 max-sm:border-r-0 max-sm:border-b">
        <div class="mb-5 flex items-center justify-between">
          <div class="eyebrow text-[11px] tracking-[0.08em]">01</div>
          <div class="rule-line h-px w-10" />
        </div>
        <div class="eyebrow mb-2 text-[11px] uppercase tracking-[0.08em]">
          Learning queue
        </div>
        <p class="body-muted text-[13px] font-light leading-[1.7]">
          Vue 3 internals, Vite plugin pipeline, TypeScript type system depth.
        </p>
      </div>
      <div class="surface-alt border-r border-[var(--line)] p-6 max-sm:border-r-0 max-sm:border-b">
        <div class="mb-5 flex items-center justify-between">
          <div class="eyebrow text-[11px] tracking-[0.08em]">02</div>
          <div class="rule-line h-px w-10" />
        </div>
        <div class="eyebrow mb-2 text-[11px] uppercase tracking-[0.08em]">
          Target state
        </div>
        <p class="body-muted text-[13px] font-light leading-[1.7]">
          Building enough depth to contribute meaningfully to the Vite or Vue ecosystem over time.
        </p>
      </div>
      <div class="bg-[color-mix(in_srgb,var(--panel-bg-alt)_74%,var(--accent-soft))] p-6">
        <div class="mb-5 flex items-center justify-between">
          <div class="eyebrow text-[11px] tracking-[0.08em]">03</div>
          <div class="rule-line h-px w-10" />
        </div>
        <div class="eyebrow mb-2 text-[11px] uppercase tracking-[0.08em]">Location</div>
        <p class="body-muted text-[13px] font-light leading-[1.7]">
          Turkmenistan — building in public, one commit at a time.
        </p>
      </div>
    </section>
  </div>
</template>
