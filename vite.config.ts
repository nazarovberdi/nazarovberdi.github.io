import { readdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import type {} from 'vite-ssg'

export default defineConfig({
  plugins: [vue(), tailwindcss(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/',
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths) {
      const slugs = readdirSync('./src/features/blog/content')
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace(/\.md$/, ''))

      return paths.flatMap((path) =>
        path === '/blog/:slug' ? slugs.map((slug) => `/blog/${slug}`) : path,
      )
    },
  },
})
