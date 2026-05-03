import { useHead } from '@unhead/vue'
import { computed } from 'vue'

interface PageMeta {
  title?: string
  description?: string
  ogType?: string
}

const SITE_NAME = 'Nazarov Berdi'

export function usePageMeta(getMeta: () => PageMeta): void {
  const meta = computed(getMeta)

  useHead({
    title: computed(() => {
      const title = meta.value.title
      return title ? `${title} — ${SITE_NAME}` : SITE_NAME
    }),
    meta: [
      { name: 'description', content: computed(() => meta.value.description ?? '') },
      { property: 'og:title', content: computed(() => meta.value.title ?? SITE_NAME) },
      { property: 'og:description', content: computed(() => meta.value.description ?? '') },
      { property: 'og:type', content: computed(() => meta.value.ogType ?? 'website') },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: computed(() => meta.value.title ?? SITE_NAME) },
      { name: 'twitter:description', content: computed(() => meta.value.description ?? '') },
    ],
  })
}
