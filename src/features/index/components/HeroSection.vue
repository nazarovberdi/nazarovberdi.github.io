<template>
  <section class="hero-rule relative mb-28 grid min-h-[640px] content-center overflow-hidden border-b border-[var(--line)] py-16 lg:min-h-[720px]">
    <div class="hero-grid pointer-events-none absolute right-[-6rem] bottom-[-4rem] size-[27rem] opacity-55" />
    <div class="hero-orb pointer-events-none absolute right-[7%] bottom-[10%] size-48 opacity-70 blur-2xl" />
    <p class="eyebrow animate-fade-up mb-7 text-[11px] uppercase tracking-[0.16em]">Frontend engineer · Ashgabat, TM</p>
    <SignatureMark />
    <div class="relative">
      <h1 class="animate-fade-up relative z-10 max-w-[1000px] font-serif text-[clamp(58px,10.5vw,152px)] font-semibold leading-[.82] tracking-[-0.075em] [animation-delay:100ms]">
        Digital experiences<br />built to <span class="text-(--accent-bright)">perform.</span>
      </h1>
    </div>
    <div class="animate-fade-up mt-12 grid max-w-[850px] grid-cols-[minmax(0,1fr)_180px] gap-9 border-t border-[var(--line)] pt-6 [animation-delay:200ms] max-sm:grid-cols-1">
      <p class="body-muted max-w-[550px] text-[16px] leading-[1.75]">
        I build thoughtful, production-ready interfaces with Vue, TypeScript, and Vite—where visual precision meets developer-friendly systems.
      </p>
      <p class="font-mono text-[11px] leading-[1.65] text-(--page-soft-text)">
        AVAILABLE FOR<br />FRONTEND COLLABORATION<br />AND PRODUCT WORK
      </p>
    </div>
    <div class="animate-fade-up mt-10 flex flex-wrap gap-3 [animation-delay:280ms]">
      <a href="#work" class="primary-button inline-flex items-center gap-3 px-5 py-3 text-[11px] uppercase tracking-[.09em]">View selected work <span aria-hidden="true">↓</span></a>
      <a href="mailto:nazarov120100@gmail.com" class="secondary-button inline-flex items-center gap-3 px-5 py-3 text-[11px] uppercase tracking-[.09em]">Start a conversation <span aria-hidden="true">↗</span></a>
    </div>
  </section>
</template>

<script setup lang="ts">
import SignatureMark from './SignatureMark.vue'
</script>
