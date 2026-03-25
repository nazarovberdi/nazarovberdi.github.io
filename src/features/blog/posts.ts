import { markdownToHtml, parseFrontmatter } from './markdown'

export interface BlogPost {
  slug: string
  title: string
  date: string
  summary: string
  html: string
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

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}
