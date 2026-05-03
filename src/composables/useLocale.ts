import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLocale() {
  const { locale } = useI18n()

  function toggle() {
    locale.value = locale.value === 'en' ? 'tk' : 'en'
    if (!import.meta.env.SSR) {
      localStorage.setItem('locale', locale.value)
      document.documentElement.lang = locale.value
    }
  }

  const label = computed(() => (locale.value === 'en' ? 'TK' : 'EN'))

  return { locale, toggle, label }
}
