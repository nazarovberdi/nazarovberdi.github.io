import { ref, watchEffect } from 'vue'

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
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggle }
}
