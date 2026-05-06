<template>
  <div>
    <div
      class="eyebrow mb-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.12em]"
    >
      <div class="rule-line h-px flex-1" />
      <span>System Snapshot</span>
      <div class="rule-line h-px flex-1" />
    </div>

    <section
      class="profile-grid surface-panel mb-[4.5rem] grid grid-cols-3 overflow-hidden animate-fade-up [animation-delay:200ms] max-sm:grid-cols-1"
    >
      <div
        class="border-r border-[var(--line)] bg-[color-mix(in_srgb,var(--panel-bg-strong)_90%,var(--page-bg))] p-6 max-sm:border-r-0 max-sm:border-b"
      >
        <div class="mb-5 flex items-center justify-between">
          <div class="eyebrow text-[11px] tracking-[0.08em]">01</div>
          <div class="rule-line h-px w-10" />
        </div>
        <div class="eyebrow mb-2 text-[11px] uppercase tracking-[0.08em]">
          Open Source
        </div>
        <p class="body-muted text-[13px] font-light leading-[1.7]">
          Authored the Turkmen locale for date-fns — PR open upstream, already
          shipping in production via fork.
        </p>
      </div>
      <div
        class="surface-alt border-r border-[var(--line)] p-6 max-sm:border-r-0 max-sm:border-b"
      >
        <div class="mb-5 flex items-center justify-between">
          <div class="eyebrow text-[11px] tracking-[0.08em]">02</div>
          <div class="rule-line h-px w-10" />
        </div>
        <div class="eyebrow mb-2 text-[11px] uppercase tracking-[0.08em]">
          Focus
        </div>
        <p class="body-muted text-[13px] font-light leading-[1.7]">
          Vue 3, Vite, TypeScript — production interfaces, developer tooling,
          and plugin systems.
        </p>
      </div>
      <div
        class="bg-[color-mix(in_srgb,var(--panel-bg-alt)_74%,var(--accent-soft))] p-6"
      >
        <div class="mb-5 flex items-center justify-between">
          <div class="eyebrow text-[11px] tracking-[0.08em]">03</div>
          <div class="rule-line h-px w-10" />
        </div>
        <div class="eyebrow mb-2 text-[11px] uppercase tracking-[0.08em]">
          Based in
        </div>
        <p class="body-muted text-[13px] font-light leading-[1.7]">
          Ashgabat, Turkmenistan.
        </p>
      </div>
    </section>
  </div>
</template>
