<template>
  <section class="mb-16 animate-fade-up [animation-delay:100ms]">
    <p class="mb-4 text-[11px] uppercase tracking-[0.16em] text-[#a7a094]">
      Designing useful software, one careful release at a time
    </p>
    <h1
      class="mb-8 font-serif text-[clamp(56px,10vw,96px)] font-normal leading-[0.95] tracking-[-0.03em]"
    >
      <span class="block">Berdi</span>
      <span class="block italic text-[#3a3a38]">Nazarov</span>
    </h1>
    <div class="grid grid-cols-[minmax(0,1fr)_160px] items-end gap-8 max-sm:grid-cols-1">
      <p class="max-w-[500px] text-[14px] font-light leading-[1.85] text-[#666]">
        Building interfaces and tools in the Vue / Vite ecosystem. Especially interested in
        developer experience, frontend systems, and growing toward future contributions in the Vite
        and Vue world.
      </p>

      <div
        class="self-end border-l border-[#ddd6c9] pl-5 text-right max-sm:border-l-0 max-sm:border-t max-sm:pl-0 max-sm:pt-4 max-sm:text-left"
      >
        <p class="text-[11px] uppercase tracking-[0.12em] text-[#aaa39a]">Current focus</p>
        <p class="mt-2 font-serif text-[22px] leading-none text-[#26231e]">Vue + DX</p>
        <p class="mt-2 text-[12px] leading-[1.6] text-[#847d72]">
          Frontend systems, tooling, and steady ecosystem learning.
        </p>
      </div>
    </div>

    <div class="mt-10 flex flex-wrap items-center gap-3">
      <RouterLink
        to="/goals"
        class="group inline-flex items-center gap-2 rounded-full bg-[#1a1916] px-5 py-[11px] text-[13px] text-[#F7F5F0] transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-1 hover:bg-[#333]"
      >
        <span>View Learning Roadmap</span>
        <svg
          class="transition-transform duration-300 group-hover:translate-x-1.5"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </RouterLink>

      <a
        href="https://github.com/nazarovberdi"
        target="_blank"
        rel="noopener"
        class="group inline-flex items-center gap-2 rounded-full border border-[#ddd6c9] bg-[#fbfaf7] px-5 py-[11px] text-[13px] text-[#5b554b] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#cfc6b7] hover:text-[#1a1916]"
      >
        <span>Browse GitHub</span>
        <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">
          ↗
        </span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
