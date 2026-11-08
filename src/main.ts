// Self-hosted, so text paints without waiting on a third-party stylesheet.
import '@fontsource-variable/dm-sans/opsz.css'
import '@fontsource-variable/space-grotesk'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './main.css'

import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(App, {
  routes,
  // The first navigation is the page load: keep where the visitor scrolled while it
  // loaded, or else restore the reload's position. Only later navigations go to the top.
  scrollBehavior: (_to, from, savedPosition) => {
    if (from.matched.length) return { top: 0, behavior: 'smooth' }
    return window.scrollY > 0 ? false : (savedPosition ?? false)
  },
})
