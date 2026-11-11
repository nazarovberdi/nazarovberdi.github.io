export interface SocialProfile {
  label: string
  handle: string
  url: string
}

/** See GLOSSARY.md: Product, Open source. */
export type ProjectKind = 'product' | 'open-source'

export interface Project {
  name: string
  kind: ProjectKind
  /** One line on what it is. */
  summary: string
  /** One line on what came of it, shown on its Preview. */
  outcome?: string
  year: string
  stack: readonly string[]
  /** Colour of the block on its Poster. */
  color: string
  /** Screenshot under /public/images/work. Without one, the Preview is a Poster. */
  preview?: string
  liveUrl?: string
  /** App store listing, for projects that ship as an installable app. */
  storeUrl?: string
  /** Public repo. */
  repoUrl?: string
  /** Slug of its Case study in Writing. */
  caseStudy?: string
}

export const email = 'nazarov120100@gmail.com'

export const socialProfiles: readonly SocialProfile[] = [
  { label: 'LinkedIn', handle: 'berdi-nazarov', url: 'https://www.linkedin.com/in/berdi-nazarov/' },
  { label: 'X', handle: '@berdi_nazarov', url: 'https://x.com/berdi_nazarov' },
  { label: 'GitHub', handle: 'nazarovberdi', url: 'https://github.com/nazarovberdi' },
]

export const resumeUrl = '/resume/resume.pdf'

/** Grouped as on the résumé. */
export const skillGroups: ReadonlyArray<{ label: string; skills: readonly string[] }> = [
  { label: 'Languages', skills: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  { label: 'Frameworks', skills: ['Vue 3', 'Nuxt', 'React', 'Next.js'] },
  { label: 'State & data', skills: ['Pinia', 'Zustand', 'Redux Toolkit', 'TanStack Table', 'Supabase'] },
  { label: 'UI', skills: ['Tailwind CSS', 'shadcn-vue', 'Motion', 'GSAP', 'Accessibility (WCAG)'] },
  { label: 'Tools', skills: ['Vite', 'Tauri', 'Git'] },
]

export const projects: readonly Project[] = [
  {
    name: 'Lyne',
    kind: 'product',
    summary: 'Cross-device EPUB reader that syncs your exact reading position.',
    outcome: '100+ installs on Google Play',
    year: '2026',
    stack: ['React', 'Supabase', 'Kotlin'],
    color: '#3178c6',
    preview: '/images/work/lyne.webp',
    liveUrl: 'https://lyne.page',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.enjoyablereader',
    caseStudy: 'how-lyne-resumes-on-the-exact-line',
  },
  {
    name: 'Bileje',
    kind: 'product',
    summary: 'Playful date invitations, sent as a link.',
    outcome: 'First paying customer',
    year: '2026',
    stack: ['React 19', 'Motion', 'Supabase'],
    color: '#e0457b',
    preview: '/images/work/bileje.webp',
    liveUrl: 'https://bileje.biz',
    caseStudy: 'bileje-paid-links-without-a-checkout',
  },
  {
    name: 'date-fns-locale-tk',
    kind: 'open-source',
    summary: 'Turkmen locale for date-fns.',
    outcome: 'Proposed upstream, PR #3845',
    year: '2024',
    stack: ['JavaScript'],
    color: '#f1e05a',
    repoUrl: 'https://github.com/nazarovberdi/date-fns-locale-tk',
  },
]

export const kindLabel: Record<ProjectKind, string> = {
  product: 'Product',
  'open-source': 'Open source',
}

/** Where a Project row leads: the live site, else the code. */
export const projectHref = (p: Project): string | undefined => p.liveUrl ?? p.repoUrl
