import { nextTick, ref, watchEffect } from 'vue'

type Theme = 'dark' | 'light'

const theme = ref<Theme>(
  (!import.meta.env.SSR ? (localStorage.getItem('theme') as Theme) : null) ?? 'dark',
)

export function useTheme() {
  watchEffect(() => {
    if (import.meta.env.SSR) return
    const isDark = theme.value === 'dark'
    document.documentElement.dataset.theme = isDark ? '' : 'light'
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', theme.value)
  })

  function toggle() {
    const next = theme.value === 'dark' ? 'light' : 'dark'

    if (
      import.meta.env.SSR ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      theme.value = next
      return
    }

    // watchEffect flushes on nextTick, so the callback has to await it for the
    // view transition to capture the palette after the swap.
    const transition = document.startViewTransition(async () => {
      theme.value = next
      await nextTick()
    })

    // A rapid second toggle skips the in-flight transition; the theme still
    // applies, so swallow the rejection rather than let it surface as uncaught.
    transition.ready.catch(() => {})
  }

  return { theme, toggle }
}
