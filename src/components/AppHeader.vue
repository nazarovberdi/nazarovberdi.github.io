<template>
  <header
    class="site-header"
    :class="{ 'is-hidden': hidden && !menuOpen, 'is-scrolled': scrolled }"
    @focusin="hidden = false"
  >
    <div class="site-header-inner">
      <RouterLink to="/" class="site-logo font-display" aria-label="Berdi Nazarov, home">
        <SplitHover label="Berdi Nazarov" />
      </RouterLink>

      <nav class="desktop-nav" aria-label="Main">
        <RouterLink v-for="item in navItems" :key="item.label" v-slot="{ href, navigate }" :to="item.to" custom>
          <a
            :href="href"
            class="nav-link"
            :class="{ 'is-active': isActive(item) }"
            :aria-current="isActive(item) ? (item.section ? 'location' : 'page') : undefined"
            @click="onNavClick($event, item, navigate)"
          >
            <SplitHover :label="item.label" />
          </a>
        </RouterLink>
      </nav>

      <div class="header-actions">
        <a href="/resume/resume.pdf" target="_blank" rel="noopener" class="nav-link max-md:hidden">
          <SplitHover label="Résumé" /><span aria-hidden="true">↗</span>
        </a>
        <button class="theme-toggle" type="button" aria-label="Switch colour theme" @click="toggleTheme">
          <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
          </svg>
        </button>
        <button
          class="nav-link md:hidden"
          type="button"
          aria-controls="mobile-menu"
          :aria-expanded="menuOpen"
          @click="menuOpen = true"
        >
          <SplitHover label="Menu" />
        </button>
      </div>
    </div>
  </header>

  <Transition name="mobile-menu">
    <div
      v-if="menuOpen"
      id="mobile-menu"
      class="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div class="site-header-inner">
        <span class="font-display text-[17px] font-semibold tracking-[-0.03em]">Berdi Nazarov</span>
        <button ref="closeButton" class="nav-link" type="button" @click="menuOpen = false">
          <SplitHover label="Close" />
        </button>
      </div>

      <nav class="mobile-menu-nav" aria-label="Main">
        <RouterLink
          v-for="(item, i) in navItems"
          :key="item.label"
          v-slot="{ href, navigate }"
          :to="item.to"
          custom
        >
          <a :href="href" class="mobile-menu-link font-display" @click="onNavClick($event, item, navigate)">
            <span class="mobile-menu-line" :style="{ '--i': i }">{{ item.label }}</span>
          </a>
        </RouterLink>
      </nav>

      <div class="mobile-menu-foot">
        <a href="/resume/resume.pdf" target="_blank" rel="noopener" class="nav-link">Résumé ↗</a>
        <a href="mailto:nazarov120100@gmail.com" class="nav-link">nazarov120100@gmail.com</a>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, type RouteLocationRaw } from 'vue-router'

import { useTheme } from '@/composables/useTheme'
import { scrollToSection, stopScroll } from '@/motion/smoothScroll'

import SplitHover from './SplitHover.vue'

interface NavItem {
  label: string
  to: RouteLocationRaw
  /** Home section this item scrolls to; absent for items that are pages. */
  section?: string
}

const navItems: NavItem[] = [
  { label: 'Work', to: { path: '/', hash: '#work' }, section: 'work' },
  { label: 'About', to: { path: '/', hash: '#about' }, section: 'about' },
  { label: 'Writing', to: '/blog' },
  { label: 'Contact', to: { path: '/', hash: '#contact' }, section: 'contact' },
]

const route = useRoute()
const { toggle: toggleTheme } = useTheme()

const menuOpen = ref(false)
const closeButton = ref<HTMLButtonElement>()
const hidden = ref(false)
const scrolled = ref(false)
const activeSection = ref<string | null>(null)

function isActive(item: NavItem): boolean {
  if (item.section) return route.path === '/' && activeSection.value === item.section
  return route.path.startsWith('/blog')
}

/** On the home page, sections are a glide away; elsewhere the router takes over. */
function onNavClick(event: MouseEvent, item: NavItem, navigate: (e?: MouseEvent) => unknown) {
  menuOpen.value = false
  if (item.section && route.path === '/') {
    event.preventDefault()
    scrollToSection(`#${item.section}`)
    return
  }
  navigate(event)
}

// Hides while reading down the page, returns the moment the visitor scrolls up.
let lastY = 0
let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    scrolled.value = y > 8
    if (y > lastY + 6 && y > 160) hidden.value = true
    else if (y < lastY - 6) hidden.value = false
    lastY = y
    ticking = false
  })
}

// Which home section is in the middle of the screen. Sections opt in with `data-section`.
let spy: IntersectionObserver | undefined
function watchSections() {
  spy?.disconnect()
  activeSection.value = null
  if (route.path !== '/') return
  spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeSection.value = (entry.target as HTMLElement).dataset.section ?? null
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  document.querySelectorAll('[data-section]').forEach((el) => spy!.observe(el))
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') menuOpen.value = false
}

watch(menuOpen, async (open) => {
  stopScroll(open)
  if (open) {
    await nextTick()
    closeButton.value?.focus()
  }
})
watch(() => route.path, () => nextTick(watchSections))

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  watchSections()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  spy?.disconnect()
  stopScroll(false)
})
</script>
