import './main.css'

import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { i18n } from './i18n'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior: () => ({ top: 0, behavior: 'smooth' }) },
  ({ app }) => {
    app.use(i18n)
  },
)
