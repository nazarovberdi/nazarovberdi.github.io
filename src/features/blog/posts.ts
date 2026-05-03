import { markdownToHtml, parseFrontmatter } from './markdown'

export interface BlogPost {
  slug: string
  title: string
  date: string
  summary: string
  html: string
  readingTime: number
}

const rawPosts = import.meta.glob('./content/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function getSlugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? path
}

function getFallbackSummary(markdown: string): string {
  const firstParagraph = markdown
    .split('\n\n')
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('```'))

  return (firstParagraph ?? 'New writing coming soon.')
    .replace(/^[-*]\s+/gm, '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/[*`>#]/g, '')
    .slice(0, 180)
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

const resolvedBlogPosts = await Promise.all(
  Object.entries(rawPosts).map(async ([path, raw]) => {
    const { attributes, body } = parseFrontmatter(raw)
    const slug = getSlugFromPath(path)

    return {
      slug,
      title: attributes.title ?? slug.replace(/-/g, ' '),
      date: attributes.date ?? '2026-01-01',
      summary: attributes.summary ?? getFallbackSummary(body),
      html: await markdownToHtml(body),
      readingTime: estimateReadingTime(body),
    }
  }),
)

export const blogPosts: BlogPost[] = resolvedBlogPosts.sort(
  (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime(),
)

export const featuredBlogPosts = blogPosts.slice(0, 3)

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const idx = blogPosts.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: blogPosts[idx - 1] ?? null,
    next: blogPosts[idx + 1] ?? null,
  }
}

export function formatBlogDate(date: string, locale = 'en'): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}
