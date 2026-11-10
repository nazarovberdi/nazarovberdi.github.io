import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Inertia scrolling for mouse and trackpad only. Touch keeps native scrolling,
 * and reduced motion gets none. Lenis moves the real window scroll, so
 * IntersectionObserver and `scroll` listeners keep working.
 */
let lenis: Lenis | null = null

export function startSmoothScroll(): void {
  if (lenis || import.meta.env.SSR) return
  if (!matchMedia('(pointer: fine)').matches) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  lenis = new Lenis({ autoRaf: true, lerp: 0.11 })
}

export function stopScroll(stopped: boolean): void {
  if (lenis) return stopped ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = stopped ? 'hidden' : ''
}

const SECTION_OFFSET = 24

/** Scroll to an in-page section: eased when allowed, instant otherwise. */
export function scrollToSection(hash: string): void {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  if (lenis) return lenis.scrollTo(el, { offset: -SECTION_OFFSET })
  const top = el.getBoundingClientRect().top + window.scrollY - SECTION_OFFSET
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

/** Jump without easing, e.g. while a Panel transition hides the page. */
export function jumpTo(top: number): void {
  if (lenis) lenis.scrollTo(top, { immediate: true, force: true })
  else window.scrollTo({ top })
}
