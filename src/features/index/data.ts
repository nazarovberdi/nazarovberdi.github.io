export interface SocialProfile {
  label: string
  kind: string
  handle: string
  url: string
}

export interface WorkingTrait {
  title: string
  description: string
}

export interface Project {
  name: string
  owner: string
  description: string
  language: string
  color: string
  stars: number | null
  url: string
  liveUrl: string | null
}

export const socialProfiles: readonly SocialProfile[] = [
  {
    label: 'LinkedIn',
    kind: 'Professional',
    handle: 'berdi-nazarov',
    url: 'https://www.linkedin.com/in/berdi-nazarov/',
  },
  {
    label: 'X',
    kind: 'Social',
    handle: '@berdi_nazarov',
    url: 'https://x.com/berdi_nazarov',
  },
  {
    label: 'Instagram',
    kind: 'Visual',
    handle: '@nberdi0',
    url: 'https://www.instagram.com/nberdi0',
  },
] as const

export const coreSkills = [
  'Vue 3',
  'Nuxt',
  'Vite',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Vue Router',
  'GitHub',
] as const

export const workingTraits: readonly WorkingTrait[] = [
  {
    title: 'Interface craft',
    description: 'Thoughtful layouts, readable spacing, and product details that feel intentional.',
  },
  {
    title: 'Developer experience',
    description: 'Tools and workflows that make building, shipping, and maintaining easier.',
  },
  {
    title: 'Open source mindset',
    description:
      'Learning in public, documenting clearly, and building toward thoughtful contributions over time.',
  },
] as const

export const projects: readonly Project[] = [
  {
    name: 'date-fns-locale-tk',
    owner: 'nazarovberdi',
    description: 'Turkmen locale support package for date-fns.',
    language: 'JavaScript',
    color: '#f1e05a',
    stars: 2,
    url: 'https://github.com/nazarovberdi/date-fns-locale-tk',
    liveUrl: null,
  },
  {
    name: 'weather-wise',
    owner: 'nazarovberdi',
    description: 'Weather web application.',
    language: 'Vue',
    color: '#41b883',
    stars: null,
    url: 'https://github.com/nazarovberdi/weather-wise',
    liveUrl: 'https://weather-wize.vercel.app',
  },
  {
    name: 'vue-media',
    owner: 'TurkmenistanRailways',
    description: 'Media portal for railways.',
    language: 'Vue',
    color: '#41b883',
    stars: 3,
    url: 'https://github.com/TurkmenistanRailways/vue-media',
    liveUrl: null,
  },
  {
    name: 'Physicst-Explorer',
    owner: 'nazarovberdi',
    description: 'React Native app.',
    language: 'TypeScript',
    color: '#3178c6',
    stars: 1,
    url: 'https://github.com/nazarovberdi/Physicst-Explorer',
    liveUrl: null,
  },
] as const
