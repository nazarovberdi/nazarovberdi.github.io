import type { Directive } from 'vue'

/**
 * `v-reveal` adds `is-in` the first time an element scrolls into view; CSS does
 * the rest (Line mask, Mask reveal, fades in main.css). Hidden starting states
 * only apply under `html.motion`, which index.html sets before paint when motion
 * is allowed, so without JavaScript or with reduced motion everything just shows.
 */
let observer: IntersectionObserver | undefined

function getObserver(): IntersectionObserver {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        observer!.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  // Keyboard focus must never land on something still hidden.
  document.addEventListener('focusin', (event) => {
    let el = event.target as Element | null
    while (el) {
      if (el.matches('[data-reveal]')) el.classList.add('is-in')
      el = el.parentElement
    }
  })
  return observer
}

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.dataset.reveal = ''
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
  getSSRProps: () => ({ 'data-reveal': '' }),
}

/** Tells index.html's fail-safe that the app is up, so hidden states may stay. */
export function markMotionReady(): void {
  document.documentElement.classList.add('motion-ready')
}
