<template>
  <section ref="sectionRef" class="mb-16">
    <p class="hero-anim-eyebrow eyebrow mb-4 text-[11px] uppercase tracking-[0.16em]">
      {{ t('hero.tagline') }}
    </p>
    <h1
      class="hero-title mb-8 font-serif text-[clamp(56px,10vw,96px)] font-normal leading-[0.95] tracking-[-0.03em]"
    >
      <span class="hero-anim-title-1 block">Nazarov</span>
      <span class="hero-anim-title-2 hero-accent block italic text-(--hero-accent)">Berdi</span>
    </h1>
    <div class="grid grid-cols-[minmax(0,1fr)_160px] items-end gap-8 max-sm:grid-cols-1">
      <p class="hero-anim-summary hero-summary body-muted max-w-[500px] text-[14px] font-light leading-[1.85]">
        {{ t('hero.summary') }}
      </p>

      <div
        class="hero-anim-focus self-end border-l border-(--line-strong) pl-5 text-right max-sm:border-l-0 max-sm:border-t max-sm:pl-0 max-sm:pt-4 max-sm:text-left"
      >
        <p class="eyebrow text-[11px] uppercase tracking-[0.12em]">{{ t('hero.focusLabel') }}</p>
        <p class="mt-2 font-serif text-[22px] leading-none text-(--page-text)">
          {{ t('hero.focusStack') }}
        </p>
        <p class="body-muted mt-2 text-[12px] leading-[1.6]">
          {{ t('hero.focusDescription') }}
        </p>
      </div>
    </div>

    <div class="hero-anim-cta mt-10 flex flex-wrap items-center gap-3">
      <RouterLink
        to="/goals"
        class="primary-button group inline-flex items-center gap-2 rounded-full px-5 py-[11px] text-[13px] transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-1"
      >
        <span>{{ t('hero.ctaRoadmap') }}</span>
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
        class="secondary-button group inline-flex items-center gap-2 rounded-full px-5 py-[11px] text-[13px] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--page-text)]"
      >
        <span>{{ t('hero.ctaGithub') }}</span>
        <span
          aria-hidden="true"
          class="transition-transform duration-300 group-hover:translate-x-1"
        >
          ↗
        </span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
let mm: ReturnType<typeof gsap.matchMedia> | undefined

onMounted(() => {
  if (!sectionRef.value) return

  mm = gsap.matchMedia()

  mm.add(
    '(prefers-reduced-motion: no-preference)',
    () => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-anim-eyebrow', { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' })
        .from('.hero-anim-title-1', { opacity: 0, y: 52, duration: 0.7 }, '-=0.3')
        .from('.hero-anim-title-2', { opacity: 0, y: 52, skewX: -4, duration: 0.7 }, '-=0.52')
        .from('.hero-anim-summary', { opacity: 0, y: 20, duration: 0.55, ease: 'power2.out' }, '-=0.35')
        .from('.hero-anim-focus', { opacity: 0, x: 18, duration: 0.55, ease: 'power2.out' }, '<')
        .from('.hero-anim-cta', { opacity: 0, y: 14, duration: 0.45, ease: 'back.out(1.5)' }, '-=0.25')
    },
    sectionRef.value,
  )
})

onUnmounted(() => {
  mm?.revert()
})
</script>
