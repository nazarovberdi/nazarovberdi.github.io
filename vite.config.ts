import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import type {} from 'vite-ssg'

import { estimateReadingTime, getFallbackSummary, markdownToHtml, parseFrontmatter } from './src/features/blog/markdown'

/**
 * Renders posts at build time, so Shiki never ships to the browser. `?post-meta`
 * gives a post's details (every page), `?post-html` its body (the post page only).
 */
function blogPosts(): Plugin {
  return {
    name: 'blog-posts',
    enforce: 'pre',
    async load(id) {
      const [file, query] = id.split('?')
      if (query !== 'post-meta' && query !== 'post-html') return
      const { attributes, body } = parseFrontmatter(readFileSync(file, 'utf8'))
      const data =
        query === 'post-meta'
          ? { attributes, summary: getFallbackSummary(body), readingTime: estimateReadingTime(body) }
          : await markdownToHtml(body)
      return `export default ${JSON.stringify(data)}`
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
