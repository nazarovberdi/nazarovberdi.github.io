<template>
  <section class="hero-section hero-rule relative mb-28 border-b border-[var(--line)] py-12 sm:py-16">
    <SignatureMark />
    <p class="hero-intro eyebrow mb-6 text-[11px] uppercase tracking-[0.16em]">
      Digital experiences built to perform · Frontend engineer
    </p>
    <div class="hero-layout">
      <div class="hero-copy">
        <h1 class="hero-title mb-7 font-serif font-semibold">
          <span class="hero-title-mask"><span data-hero-line>Nazarov</span></span>
          <span class="hero-title-mask"
            ><span data-hero-line class="hero-accent italic text-(--accent-bright)">Berdi</span></span
          >
        </h1>
        <p
          class="hero-summary hero-detail body-muted max-w-[500px] text-[16px] leading-[1.85]"
        >
          Frontend engineer in the Vue / Vite ecosystem — shipping production interfaces for
          organizations, contributing to open-source libraries, and going deep on developer tooling
          and DX.
        </p>
        <div class="hero-detail mt-8 flex flex-wrap items-center gap-3">
          <a
            href="https://github.com/nazarovberdi"
            target="_blank"
            rel="noopener"
            class="secondary-button hover-magnet group inline-flex items-center gap-2 px-5 py-[11px] text-[13px] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span class="hover-magnet-content inline-flex items-center gap-2">
            <HoverLabel label="Browse GitHub" />
            <span
              aria-hidden="true"
              class="transition-transform duration-300 group-hover:translate-x-1"
              >↗</span
            >
            </span>
          </a>
          <a
            href="#work"
            class="hero-work-link body-muted inline-flex items-center gap-2 px-3 py-3 text-[13px]"
          >
            <HoverLabel label="Explore my work" /><span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <figure class="hero-portrait">
        <div class="portrait-frame">
          <img
            class="portrait-image"
            src="/images/berdi.jpg"
            alt="Portrait of Nazarov Berdi"
            width="1060"
            height="855"
            fetchpriority="high"
            decoding="async"
          />
          <div class="portrait-shade" aria-hidden="true" />
          <span class="portrait-corner portrait-corner-top" aria-hidden="true" />
          <span class="portrait-corner portrait-corner-bottom" aria-hidden="true" />
          <span class="portrait-location font-mono text-[10px] uppercase tracking-[0.14em]"
            >Ashgabat, TM</span
          >
        </div>
        <figcaption class="hero-detail mt-5 border-l border-(--line-strong) pl-4">
          <p class="eyebrow text-[10px] uppercase tracking-[0.12em]">Current focus</p>
          <p class="mt-2 font-serif text-[22px] leading-none">Vue / DX / Tooling</p>
          <p class="body-muted mt-2 text-[12px] leading-[1.6]">Interfaces with intention.</p>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import HoverLabel from '@/components/HoverLabel.vue'

import SignatureMark from './SignatureMark.vue'
</script>
