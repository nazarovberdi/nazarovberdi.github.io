<template>
  <div class="relative min-h-screen bg-[#F7F5F0] text-[#1a1916] font-mono overflow-hidden">
    <!-- Dot grid -->
    <div
      class="pointer-events-none fixed inset-0 opacity-[0.18] dark:opacity-[0.12]"
      :style="dotGridStyle"
    />

    <main class="relative max-w-[720px] mx-auto px-6 pt-10 pb-16 animate-fade-up">
      <!-- Header -->
      <header
        class="flex items-center justify-between mb-20 animate-fade-up [animation-delay:50ms]"
      >
        <span
          class="text-[11px] tracking-[0.08em] uppercase text-[#888] border border-[#ddd] px-[10px] py-1 rounded-full"
        >
          Open to work
        </span>
        <a
          href="https://github.com/nazarovberdi"
          target="_blank"
          rel="noopener"
          class="text-[12px] tracking-[0.04em] text-[#888] hover:text-[#1a1916] transition-colors duration-150"
          >GitHub</a
        >
      </header>

      <!-- Hero -->
      <section class="mb-16 animate-fade-up [animation-delay:100ms]">
        <p class="text-[11px] tracking-[0.12em] uppercase text-[#aaa] mb-4">Software Engineer</p>
        <h1
          class="font-serif text-[clamp(56px,10vw,96px)] font-normal leading-[0.95] tracking-[-0.02em] mb-8"
        >
          <span class="block">Berdi</span>
          <span class="block italic text-[#3a3a38]">Nazarov</span>
        </h1>
        <p class="max-w-[460px] text-[14px] leading-[1.7] text-[#666] font-light mb-10">
          Building interfaces and tools in the Vue / Vite ecosystem. Interested in open source,
          developer experience, and well-crafted software.
        </p>
        <RouterLink
          to="/goals"
          class="inline-flex items-center gap-2 text-[13px] text-[#F7F5F0] bg-[#1a1916] px-5 py-[11px] rounded-full hover:bg-[#333] transition-all duration-200 hover:translate-x-1 group"
        >
          <span>View OSS Roadmap</span>
          <svg
            class="transition-transform duration-200 group-hover:translate-x-1"
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
      </section>

      <!-- Divider -->
      <div class="h-px bg-[#e8e5de] mb-12 animate-fade-up [animation-delay:150ms]" />

      <!-- Cards -->
      <section
        class="grid grid-cols-3 max-sm:grid-cols-1 border border-[#e8e5de] rounded-xl overflow-hidden mb-16 animate-fade-up [animation-delay:200ms]"
      >
        <div class="bg-[#F7F5F0] p-6 border-r max-sm:border-r-0 max-sm:border-b border-[#e8e5de]">
          <div class="text-[11px] tracking-[0.08em] text-[#bbb] mb-4">01</div>
          <div class="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-2">
            Currently learning
          </div>
          <p class="text-[13px] text-[#555] leading-[1.6] font-light">
            Vue 3 internals, Vite plugin pipeline, TypeScript type system depth.
          </p>
        </div>
        <div class="bg-[#F7F5F0] p-6 border-r max-sm:border-r-0 max-sm:border-b border-[#e8e5de]">
          <div class="text-[11px] tracking-[0.08em] text-[#bbb] mb-4">02</div>
          <div class="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-2">
            Working towards
          </div>
          <p class="text-[13px] text-[#555] leading-[1.6] font-light">
            First meaningful OSS contribution to the Vite or Vue ecosystem.
          </p>
        </div>
        <div class="bg-[#F7F5F0] p-6">
          <div class="text-[11px] tracking-[0.08em] text-[#bbb] mb-4">03</div>
          <div class="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-2">Based in</div>
          <p class="text-[13px] text-[#555] leading-[1.6] font-light">
            Turkmenistan — building in public, one commit at a time.
          </p>
        </div>
      </section>

      <!-- Footer -->
      <footer
        class="flex items-center justify-between text-[12px] text-[#aaa] animate-fade-up [animation-delay:250ms]"
      >
        <span>© {{ year }} Berdi Nazarov</span>
        <RouterLink
          to="/goals"
          class="text-[#888] hover:text-[#1a1916] transition-colors duration-150"
        >
          OSS Roadmap →
        </RouterLink>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const dotGridStyle = {
  backgroundImage: `radial-gradient(circle, #1a1916 1px, transparent 1px)`,
  backgroundSize: '24px 24px',
}
</script>
