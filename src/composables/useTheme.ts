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

  /** Pass the click so the new theme grows from the button that was pressed. */
  function toggle(event?: MouseEvent) {
    const next = theme.value === 'dark' ? 'light' : 'dark'

    if (
      import.meta.env.SSR ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      theme.value = next
      return
    }

    // Read now: currentTarget is gone once the handler returns. The button's
    // centre also works for keyboard presses, which have no pointer position.
    const button = (event?.currentTarget as HTMLElement | null)?.getBoundingClientRect()
    const x = button ? button.left + button.width / 2 : window.innerWidth - 40
    const y = button ? button.top + button.height / 2 : 40
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    // watchEffect flushes on nextTick, so the callback has to await it for the
    // view transition to capture the palette after the swap.
    const transition = document.startViewTransition(async () => {
      theme.value = next
      await nextTick()
    })

    // A rapid second toggle skips the in-flight transition; the theme still
    // applies, so swallow the rejection rather than let it surface as uncaught.
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 560, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => {})
  }

  return { theme, toggle }
}
