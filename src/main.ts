// Self-hosted, so text paints without waiting on a third-party stylesheet.
import '@fontsource-variable/dm-sans/opsz.css'
import '@fontsource-variable/bricolage-grotesque/wght.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './main.css'

import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { scrollToSection } from './motion/smoothScroll'
import { routes } from './router'

export const createApp = ViteSSG(App, {
  routes,
  // The first navigation is the page load: keep where the visitor scrolled while it
  // loaded, or else restore the reload's position.
  scrollBehavior: (to, from, savedPosition) => {
    if (!from.matched.length) return window.scrollY > 0 ? false : (savedPosition ?? false)
    // A section on the current page: glide there.
    if (to.hash && to.path === from.path) {
      scrollToSection(to.hash)
      return false
    }
    // A new page sits under the Panel transition, so jump straight there.
    if (to.hash) return { el: to.hash, top: 24 }
    return savedPosition ?? { top: 0 }
  },
})
