<template>
  <div>
    <div
      class="mb-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.12em] text-[#b4aea3] animate-fade-up [animation-delay:150ms]"
    >
      <div class="h-px flex-1 bg-[#e8e5de]" />
      <span>Profile Snapshot</span>
      <div class="h-px flex-1 bg-[#e8e5de]" />
    </div>

    <section
      class="mb-[4.5rem] grid grid-cols-3 overflow-hidden rounded-[26px] border border-[#e8e5de] animate-fade-up [animation-delay:200ms] max-sm:grid-cols-1"
    >
      <div class="border-r border-[#e8e5de] bg-[#f8f6f1] p-6 max-sm:border-r-0 max-sm:border-b">
        <div class="mb-5 flex items-center justify-between">
          <div class="text-[11px] tracking-[0.08em] text-[#bbb]">01</div>
          <div class="h-px w-10 bg-[#e4ddd2]" />
        </div>
        <div class="mb-2 text-[11px] uppercase tracking-[0.08em] text-[#999]">
          Currently learning
        </div>
        <p class="text-[13px] font-light leading-[1.7] text-[#555]">
          Vue 3 internals, Vite plugin pipeline, TypeScript type system depth.
        </p>
      </div>
      <div class="border-r border-[#e8e5de] bg-[#f6f3ed] p-6 max-sm:border-r-0 max-sm:border-b">
        <div class="mb-5 flex items-center justify-between">
          <div class="text-[11px] tracking-[0.08em] text-[#bbb]">02</div>
          <div class="h-px w-10 bg-[#e4ddd2]" />
        </div>
        <div class="mb-2 text-[11px] uppercase tracking-[0.08em] text-[#999]">
          Working towards
        </div>
        <p class="text-[13px] font-light leading-[1.7] text-[#555]">
          Building enough depth to contribute meaningfully to the Vite or Vue ecosystem over time.
        </p>
      </div>
      <div class="bg-[#f4f0e8] p-6">
        <div class="mb-5 flex items-center justify-between">
          <div class="text-[11px] tracking-[0.08em] text-[#bbb]">03</div>
          <div class="h-px w-10 bg-[#e4ddd2]" />
        </div>
        <div class="mb-2 text-[11px] uppercase tracking-[0.08em] text-[#999]">Based in</div>
        <p class="text-[13px] font-light leading-[1.7] text-[#555]">
          Turkmenistan — building in public, one commit at a time.
        </p>
      </div>
    </section>
  </div>
</template>
