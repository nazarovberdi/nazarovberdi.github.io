import { ref, watchEffect } from 'vue'

type Theme = 'dark' | 'light'

const theme = ref<Theme>((localStorage.getItem('theme') as Theme) ?? 'dark')

export function useTheme() {
  watchEffect(() => {
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
