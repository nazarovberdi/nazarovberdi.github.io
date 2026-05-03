import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import tk from './locales/tk.json'

const savedLocale = localStorage.getItem('locale') ?? 'en'
document.documentElement.lang = savedLocale

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, tk },
})
