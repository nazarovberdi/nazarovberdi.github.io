<template>
  <section class="mb-16 animate-fade-up [animation-delay:240ms]">
    <div class="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
      <div>
        <p class="mb-3 text-[11px] uppercase tracking-[0.12em] text-[#aaa]">Toolbox</p>
        <h2 class="font-serif text-[clamp(28px,5vw,40px)] leading-[1.05] tracking-[-0.02em]">
          What I work with most.
        </h2>
      </div>
      <p class="max-w-[280px] text-right text-[12px] leading-[1.7] text-[#8b8479] max-sm:text-left">
        Tools and practices I reach for when building calm, reliable frontend products.
      </p>
    </div>

    <div class="grid grid-cols-[0.8fr_1.2fr] gap-4 max-sm:grid-cols-1">
      <div class="rounded-[26px] border border-[#e8e5de] bg-[#fbfaf7] p-6">
        <div class="mb-5 flex items-center justify-between">
          <p class="text-[11px] uppercase tracking-[0.1em] text-[#9c9589]">Core stack</p>
          <span class="text-[11px] text-[#c2bbaf]">01</span>
        </div>

        <div class="flex flex-wrap gap-3">
          <span
            v-for="skill in coreSkills"
            :key="skill"
            class="animate-fade-soft rounded-full border border-[#e3ddd2] bg-[#f7f4ee] px-4 py-2 text-[12px] text-[#5d564c] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="rounded-[26px] border border-[#e8e5de] bg-[#f6f2ea] p-6">
        <div class="mb-5 flex items-center justify-between">
          <p class="text-[11px] uppercase tracking-[0.1em] text-[#9c9589]">Working style</p>
          <span class="text-[11px] text-[#c2bbaf]">02</span>
        </div>

        <div class="space-y-4">
          <div v-for="trait in workingTraits" :key="trait.title">
            <p class="text-[12px] uppercase tracking-[0.08em] text-[#7d766b]">
              {{ trait.title }}
            </p>
            <p class="mt-1 text-[13px] font-light leading-[1.7] text-[#5f584e]">
              {{ trait.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WorkingTrait } from '../data'

defineProps<{
  coreSkills: readonly string[]
  workingTraits: readonly WorkingTrait[]
}>()
</script>
