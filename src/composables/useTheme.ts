import { ref, watchEffect } from 'vue'

import { pixelSweep } from '@/motion/pixelToggle'

type Theme = 'dark' | 'light'

/** Mirrors `--page-bg` in main.css: the colour the Pixel toggle covers the screen in. */
const PAGE_BG: Record<Theme, string> = { dark: '#11100e', light: '#f2ede4' }

function initialTheme(): Theme {
  if (import.meta.env.SSR) return 'dark'
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored
  } catch {}
  // No choice made yet: follow the system.
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const theme = ref<Theme>(initialTheme())
let sweeping = false

export function useTheme() {
  watchEffect(() => {
    if (import.meta.env.SSR) return
    const isDark = theme.value === 'dark'
    document.documentElement.dataset.theme = isDark ? '' : 'light'
    document.documentElement.classList.toggle('dark', isDark)
    // Mobile browser bars match the page.
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', PAGE_BG[theme.value])
  })

  function apply(next: Theme) {
    theme.value = next
    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  /** Pass the click so the Pixel toggle sweeps out from the button that was pressed. */
  function toggle(event?: MouseEvent) {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    if (import.meta.env.SSR || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(next)
    if (sweeping) return
    sweeping = true

    // Keyboard presses have no pointer position, so start from the button's centre.
    const box = (event?.currentTarget as HTMLElement | null)?.getBoundingClientRect()
    const origin = box
      ? { x: box.left + box.width / 2, y: box.top + box.height / 2 }
      : { x: window.innerWidth - 40, y: 40 }

    pixelSweep(origin, PAGE_BG[next], () => {
      apply(next)
      // Apply now rather than on Vue's next tick, so the reveal shows the new theme.
      document.documentElement.dataset.theme = next === 'dark' ? '' : 'light'
      document.documentElement.classList.toggle('dark', next === 'dark')
    }).finally(() => (sweeping = false))
  }

  return { theme, toggle }
}
