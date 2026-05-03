export interface SocialProfile {
  label: string
  kind: string
  handle: string
  url: string
}

export interface Project {
  name: string
  repoSlug?: string
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
    label: 'GitHub',
    kind: 'Code',
    handle: 'nazarovberdi',
    url: 'https://github.com/nazarovberdi',
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

export const projects: readonly Project[] = [
  {
    name: 'date-fns-locale-tk',
    owner: 'nazarovberdi',
    description:
      'Turkmen (tk) locale for date-fns. Full date formatting support for the Turkmen language, contributed upstream.',
    language: 'JavaScript',
    color: '#f1e05a',
    stars: 2,
    url: 'https://github.com/nazarovberdi/date-fns-locale-tk',
    liveUrl: null,
  },
  {
    name: 'weather-wise',
    owner: 'nazarovberdi',
    description:
      'Weather app built with Vue 3 and the Open-Meteo API. Location search, hourly forecasts, and a clean responsive interface.',
    language: 'Vue',
    color: '#41b883',
    stars: null,
    url: 'https://github.com/nazarovberdi/weather-wise',
    liveUrl: 'https://weather-wize.vercel.app',
  },
  {
    name: 'vue-media',
    owner: 'TurkmenistanRailways',
    description:
      'Internal media portal for Turkmenistan Railways — news, routes, and asset management built with Vue 3.',
    language: 'Vue',
    color: '#41b883',
    stars: 3,
    url: 'https://github.com/TurkmenistanRailways/vue-media',
    liveUrl: null,
  },
  {
    name: 'Physicist Explorer',
    repoSlug: 'Physicst-Explorer',
    owner: 'nazarovberdi',
    description:
      'React Native app for exploring physics constants, formulas, and unit conversions. Built for offline use.',
    language: 'TypeScript',
    color: '#3178c6',
    stars: 1,
    url: 'https://github.com/nazarovberdi/Physicst-Explorer',
    liveUrl: null,
  },
] as const
