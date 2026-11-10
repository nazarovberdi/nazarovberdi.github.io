import { slugFromPath } from './posts'

/**
 * Post bodies as HTML, rendered at build time. Only the post page imports this,
 * so it lands in that page's chunk and the rest of the site never downloads it.
 */
const bodies = import.meta.glob('./content/*.md', {
  eager: true,
  import: 'default',
  query: '?post-html',
}) as Record<string, string>

const bySlug = new Map(Object.entries(bodies).map(([path, html]) => [slugFromPath(path), html]))

export const getPostHtml = (slug: string): string | undefined => bySlug.get(slug)
