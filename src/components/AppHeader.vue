<template>
  <header
    class="fixed top-0 right-0 left-0 z-50 flex h-16 items-center border-b border-[var(--line)] bg-[var(--panel-bg-strong)] px-6 backdrop-blur-md"
  >
    <RouterLink
      to="/"
      class="mr-auto flex items-center gap-3"
      aria-label="Nazarov Berdi — home"
    >
      <span class="pill flex size-9 items-center justify-center font-serif text-[15px]">NB</span>
      <span class="text-[13px] font-medium text-[var(--page-text)]">
        {{ $t('header.name') }}
      </span>
      <span class="body-muted hidden text-[11px] sm:block">
        {{ $t('header.role') }}
      </span>
    </RouterLink>

    <nav class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
      <RouterLink
        to="/blog"
        class="body-muted text-[12px] tracking-[0.04em] transition-colors duration-150 hover:text-[var(--page-text)]"
      >
        {{ $t('nav.blog') }}
      </RouterLink>
      <RouterLink
        to="/goals"
        class="body-muted text-[12px] tracking-[0.04em] transition-colors duration-150 hover:text-[var(--page-text)]"
      >
        {{ $t('nav.goals') }}
      </RouterLink>
    </nav>

    <div class="ml-auto flex items-center gap-2">
      <a
        href="/resume/resume.pdf"
        download
        class="body-muted hidden items-center gap-1 rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[11px] font-medium tracking-[0.06em] transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--page-text)] md:inline-flex"
      >
        {{ $t('header.downloadCV') }} ↓
      </a>

      <button
        class="body-muted rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[11px] font-medium tracking-[0.06em] transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--page-text)]"
        @click="toggleLocale"
      >
        {{ localeLabel }}
      </button>

      <button
        class="body-muted flex size-8 items-center justify-center rounded-full border border-[var(--line)] transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--page-text)]"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            stroke-linecap="round"
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      </button>

      <button
        class="body-muted flex size-8 items-center justify-center rounded-full border border-[var(--line)] transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--page-text)] md:hidden"
        :aria-label="$t('nav.menu')"
        :aria-expanded="menuOpen"
        @click="menuOpen = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </header>

  <Transition name="mobile-menu">
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-[60] flex flex-col backdrop-blur-xl md:hidden"
      style="background: var(--panel-bg-strong)"
      role="dialog"
      :aria-label="$t('nav.menu')"
    >
      <div
        class="flex h-16 shrink-0 items-center justify-end border-b px-6"
        style="border-color: var(--line)"
      >
        <button
          class="body-muted flex size-8 items-center justify-center rounded-full border border-[var(--line)] transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--page-text)]"
          :aria-label="$t('nav.close')"
          @click="menuOpen = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="flex flex-1 flex-col justify-center gap-1 px-8">
        <RouterLink
          to="/blog"
          class="font-serif leading-[1.05] tracking-[-0.04em] transition-colors duration-150 hover:text-[var(--accent)]"
          style="font-size: clamp(52px, 14vw, 80px); color: var(--page-text)"
          @click="menuOpen = false"
        >
          {{ $t('nav.blog') }}
        </RouterLink>
        <RouterLink
          to="/goals"
          class="font-serif leading-[1.05] tracking-[-0.04em] transition-colors duration-150 hover:text-[var(--accent)]"
          style="font-size: clamp(52px, 14vw, 80px); color: var(--page-text)"
          @click="menuOpen = false"
        >
          {{ $t('nav.goals') }}
        </RouterLink>
      </nav>

      <div class="flex items-center justify-between px-8 pb-10">
        <a
          href="/resume/resume.pdf"
          download
          class="primary-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] uppercase tracking-[0.08em]"
          @click="menuOpen = false"
        >
          {{ $t('header.downloadCV') }} ↓
        </a>
        <div class="flex items-center gap-2">
          <button
            class="body-muted rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[11px] font-medium tracking-[0.06em] transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--page-text)]"
            @click="toggleLocale"
          >
            {{ localeLabel }}
          </button>
          <button
            class="body-muted flex size-8 items-center justify-center rounded-full border border-[var(--line)] transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--page-text)]"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.75"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path
                stroke-linecap="round"
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.75"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'

const { toggle: toggleTheme, theme } = useTheme()
const { toggle: toggleLocale, label: localeLabel } = useLocale()

const isDark = computed(() => theme.value === 'dark')
const menuOpen = ref(false)

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') menuOpen.value = false
}

onMounted(() => window.addEventListener('keydown', handleKeydown))

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
