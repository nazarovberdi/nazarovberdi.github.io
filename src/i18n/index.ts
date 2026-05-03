import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import tk from './locales/tk.json'

const savedLocale = (!import.meta.env.SSR ? localStorage.getItem('locale') : null) ?? 'en'

if (!import.meta.env.SSR) {
  document.documentElement.lang = savedLocale
}

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, tk },
})
