import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, resolve } from 'path'

const SITE_URL = 'https://nazarovberdi.github.io'
const FEED_TITLE = 'Nazarov Berdi — Writing'
const FEED_DESCRIPTION =
  'Thoughts on frontend craft, the Vue / Vite ecosystem, and developer tooling.'

interface PostMeta {
  slug: string
  title: string
  date: string
  summary: string
}

function parseFrontmatter(raw: string): Record<string, string> {
  if (!raw.startsWith('---\n')) return {}
  const lines = raw.split('\n')
  const closeIdx = lines.findIndex((l, i) => i > 0 && l.trim() === '---')
  if (closeIdx === -1) return {}
  const attrs: Record<string, string> = {}
  for (const line of lines.slice(1, closeIdx)) {
    const sep = line.indexOf(':')
    if (sep === -1) continue
    const key = line.slice(0, sep).trim()
    const val = line
      .slice(sep + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '')
    attrs[key] = val
  }
  return attrs
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const contentDir = resolve('./src/features/blog/content')
const files = readdirSync(contentDir).filter((f) => f.endsWith('.md'))

const posts: PostMeta[] = files
  .map((file) => {
    const raw = readFileSync(join(contentDir, file), 'utf-8')
    const attrs = parseFrontmatter(raw)
    const slug = file.replace(/\.md$/, '')
    return {
      slug,
      title: attrs['title'] ?? slug.replace(/-/g, ' '),
      date: attrs['date'] ?? '2026-01-01',
      summary: attrs['summary'] ?? '',
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const items = posts
  .map(
    (post) => `
  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${SITE_URL}/blog/${post.slug}</link>
    <description>${escapeXml(post.summary)}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
  </item>`,
  )
  .join('')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

writeFileSync('./dist/rss.xml', xml)
console.log(`RSS feed generated → dist/rss.xml (${posts.length} posts)`)
