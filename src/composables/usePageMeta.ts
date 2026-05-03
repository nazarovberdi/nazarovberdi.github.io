import { onUnmounted, watchEffect } from 'vue'

interface PageMeta {
  title?: string
  description?: string
  ogType?: string
}

const SITE_NAME = 'Nazarov Berdi'

function setOrCreateMeta(attribute: 'name' | 'property', key: string, content: string): void {
  const selector = `meta[${attribute}="${key}"]`
  let el = document.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function usePageMeta(getMeta: () => PageMeta): void {
  const stop = watchEffect(() => {
    const { title, description, ogType = 'website' } = getMeta()

    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME

    if (title) {
      setOrCreateMeta('property', 'og:title', title)
      setOrCreateMeta('name', 'twitter:title', title)
    }

    if (description) {
      setOrCreateMeta('name', 'description', description)
      setOrCreateMeta('property', 'og:description', description)
      setOrCreateMeta('name', 'twitter:description', description)
    }

    setOrCreateMeta('property', 'og:type', ogType)
  })

  onUnmounted(stop)
}
