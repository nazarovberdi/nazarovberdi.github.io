/** A post's details, without its body: cheap enough for every page to import. */
export interface BlogPost {
  slug: string
  title: string
  date: string
  summary: string
  readingTime: number
}

interface PostMeta {
  attributes: { title?: string; date?: string; summary?: string }
  summary: string
  readingTime: number
}

// Built by the blog-posts plugin in vite.config.ts. The HTML lives in postHtml.ts.
const metas = import.meta.glob('./content/*.md', {
  eager: true,
  import: 'default',
  query: '?post-meta',
}) as Record<string, PostMeta>

export const slugFromPath = (path: string): string => path.split('/').pop()?.replace(/\.md$/, '') ?? path

export const blogPosts: BlogPost[] = Object.entries(metas)
  .map(([path, meta]) => {
    const slug = slugFromPath(path)
    return {
      slug,
      title: meta.attributes.title ?? slug.replace(/-/g, ' '),
      date: meta.attributes.date ?? '2026-01-01',
      summary: meta.attributes.summary ?? meta.summary,
      readingTime: meta.readingTime,
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const featuredBlogPosts = blogPosts.slice(0, 3)

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const idx = blogPosts.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return { prev: blogPosts[idx - 1] ?? null, next: blogPosts[idx + 1] ?? null }
}

export function formatBlogDate(date: string, locale = 'en'): string {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))
}
