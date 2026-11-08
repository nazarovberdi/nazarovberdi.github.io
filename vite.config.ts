import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import type {} from 'vite-ssg'

import { markdownToHtml, parseFrontmatter } from './src/features/blog/markdown'

/**
 * Renders `*.md?post` imports to HTML at build time, so Shiki never ships to
 * the browser. Highlighting in the browser held back startup by 1–3 seconds.
 */
function blogPosts(): Plugin {
  return {
    name: 'blog-posts',
    enforce: 'pre',
    async load(id) {
      if (!id.endsWith('.md?post')) return
      const { attributes, body } = parseFrontmatter(readFileSync(id.slice(0, -'?post'.length), 'utf8'))
      const html = await markdownToHtml(body)
      return `export default ${JSON.stringify({ attributes, body, html })}`
    },
  }
}

export default defineConfig({
  plugins: [blogPosts(), vue(), tailwindcss(), vueDevTools()],
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
