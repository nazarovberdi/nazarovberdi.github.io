export interface SocialProfile {
  label: string;
  handle: string;
  url: string;
}

export interface Project {
  name: string;
  repoSlug?: string;
  owner: string;
  description: string;
  language: string;
  /** The card's own accent: its number and hover bar. */
  color: string;
  stars: number | null;
  /** Public repo link. Omitted for closed-source work, which hides "Read source". */
  url?: string;
  liveUrl: string | null;
  /** App store listing, for projects that ship as an installable app. */
  storeUrl?: string;
}

export const socialProfiles: readonly SocialProfile[] = [
  {
    label: "LinkedIn",
    handle: "berdi-nazarov",
    url: "https://www.linkedin.com/in/berdi-nazarov/",
  },
  {
    label: "X",
    handle: "@berdi_nazarov",
    url: "https://x.com/berdi_nazarov",
  },
  {
    label: "GitHub",
    handle: "nazarovberdi",
    url: "https://github.com/nazarovberdi",
  },
] as const;

export const coreSkills = [
  "Vue 3",
  "React",
  "Nuxt",
  "Vite",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Vue Router",
  "GitHub",
] as const;

export const projects: readonly Project[] = [
  {
    name: "Lyne",
    owner: "nazarovberdi",
    description: "Cross-device EPUB reader with synced progress.",
    language: "TypeScript",
    color: "#3178c6",
    stars: null,
    liveUrl: "https://lyne.page",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.enjoyablereader",
  },
  {
    name: "Bileje",
    owner: "nazarovberdi",
    description: "Playful date invitations, sent as a link.",
    language: "TypeScript",
    color: "#e0457b",
    stars: null,
    liveUrl: "https://bileje.biz",
  },
  {
    name: "date-fns-locale-tk",
    owner: "nazarovberdi",
    description: "Turkmen locale for date-fns.",
    language: "JavaScript",
    color: "#f1e05a",
    stars: 2,
    url: "https://github.com/nazarovberdi/date-fns-locale-tk",
    liveUrl: null,
  },
  {
    name: "weather-wise",
    owner: "nazarovberdi",
    description: "Vue weather app on Open-Meteo.",
    language: "Vue",
    color: "#41b883",
    stars: null,
    url: "https://github.com/nazarovberdi/weather-wise",
    liveUrl: "https://weather-wize.vercel.app",
  },
  {
    name: "Physicist Explorer",
    repoSlug: "Physicst-Explorer",
    owner: "nazarovberdi",
    description: "Offline physics formulas and unit converter.",
    language: "TypeScript",
    color: "#8b5cf6",
    stars: 1,
    url: "https://github.com/nazarovberdi/Physicst-Explorer",
    liveUrl: null,
  },
] as const;
