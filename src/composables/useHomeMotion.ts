import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import gsap from 'gsap'

/** Homepage-only motion. The rendered HTML stays visible without JavaScript. */
export function useHomeMotion(page: Ref<HTMLElement | null>) {
  let media: ReturnType<typeof gsap.matchMedia> | undefined

  onMounted(() => {
    if (!page.value) return
    const root = page.value
    media = gsap.matchMedia()
    media.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 768px)',
      },
      (context) => {
        if (!context.conditions?.motion) return
        const desktop = context.conditions.desktop
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(root.querySelector('.hero-intro'), { opacity: 0, y: 8, duration: 0.45 })
          .from(
            root.querySelectorAll('[data-hero-line]'),
            {
              yPercent: 110,
              duration: desktop ? 0.85 : 0.6,
              stagger: 0.1,
              clearProps: 'transform',
            },
            0.1,
          )
          .from(
            root.querySelector('.portrait-frame'),
            {
              clipPath: 'inset(100% 0% 0% 0%)',
              duration: desktop ? 1 : 0.65,
              clearProps: 'clipPath',
            },
            0.15,
          )
          .from(
            root.querySelector('.portrait-image'),
            {
              scale: desktop ? 1.12 : 1.04,
              duration: 1.1,
              clearProps: 'transform',
            },
            0.15,
          )
          .from(
            root.querySelectorAll('.hero-detail'),
            {
              opacity: 0,
              y: 12,
              duration: 0.55,
              stagger: 0.07,
              clearProps: 'opacity,transform',
            },
            0.4,
          )

        // Reveal on entry, without hiding the server-rendered page while it loads.
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue
              observer.unobserve(entry.target)
              if (entry.target.contains(document.activeElement)) continue
              context.add(() => {
                const section = entry.target as HTMLElement
                gsap.from(Array.from(section.children), {
                  opacity: 0,
                  y: desktop ? 24 : 12,
                  duration: 0.65,
                  stagger: 0.07,
                  ease: 'power3.out',
                  clearProps: 'opacity,transform',
                })
                const items = section.querySelectorAll('[data-reveal-item]')
                if (items.length)
                  gsap.from(items, {
                    opacity: 0,
                    y: desktop ? 18 : 8,
                    duration: 0.55,
                    stagger: 0.055,
                    delay: 0.12,
                    ease: 'power3.out',
                    clearProps: 'opacity,transform',
                  })
              })
            }
          },
          { threshold: 0.08 },
        )
        root.querySelectorAll('[data-reveal]').forEach((section) => observer.observe(section))

        // A keyboard-focused destination must be immediately visible.
        const revealFocus = (event: FocusEvent) => {
          let element = event.target as HTMLElement | null
          while (element && element !== root) {
            gsap.killTweensOf(element)
            gsap.set(element, { clearProps: 'opacity,transform,clipPath' })
            element = element.parentElement
          }
        }
        root.addEventListener('focusin', revealFocus)
        return () => {
          observer.disconnect()
          root.removeEventListener('focusin', revealFocus)
        }
      },
      root,
    )

    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups: Array<() => void> = []
      const track = (element: HTMLElement, move: (event: PointerEvent) => void, leave: () => void) => {
        element.addEventListener('pointermove', move)
        element.addEventListener('pointerleave', leave)
        element.addEventListener('focusout', leave)
        cleanups.push(() => {
          element.removeEventListener('pointermove', move)
          element.removeEventListener('pointerleave', leave)
          element.removeEventListener('focusout', leave)
        })
      }
      root.querySelectorAll<HTMLElement>('.hover-magnet').forEach(element => {
        const content = element.querySelector('.hover-magnet-content')
        if (!content) return
        const x = gsap.quickTo(content, 'x', { duration: 0.3, ease: 'power3.out' })
        const y = gsap.quickTo(content, 'y', { duration: 0.3, ease: 'power3.out' })
        track(element, event => {
          if (event.pointerType === 'touch') return
          const bounds = element.getBoundingClientRect()
          x(((event.clientX - bounds.left) / bounds.width - 0.5) * 12)
          y(((event.clientY - bounds.top) / bounds.height - 0.5) * 8)
        }, () => { x(0); y(0) })
      })
      const portrait = root.querySelector<HTMLElement>('.portrait-frame')
      if (portrait) {
        const rotateX = gsap.quickTo(portrait, 'rotationX', { duration: 0.4, ease: 'power3.out' })
        const rotateY = gsap.quickTo(portrait, 'rotationY', { duration: 0.4, ease: 'power3.out' })
        gsap.set(portrait, { transformPerspective: 900 })
        track(portrait, event => {
          if (event.pointerType === 'touch') return
          const bounds = portrait.getBoundingClientRect()
          rotateX(-((event.clientY - bounds.top) / bounds.height - 0.5) * 5)
          rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 5)
        }, () => { rotateX(0); rotateY(0) })
      }
      root.querySelectorAll<HTMLElement>('.project-card').forEach(card => {
        const spotlight = card.querySelector('.project-spotlight')
        if (!spotlight) return
        gsap.set(spotlight, { x: card.clientWidth / 2, y: card.clientHeight / 2 })
        const x = gsap.quickTo(spotlight, 'x', { duration: 0.35, ease: 'power3.out' })
        const y = gsap.quickTo(spotlight, 'y', { duration: 0.35, ease: 'power3.out' })
        track(card, event => {
          if (event.pointerType === 'touch') return
          const bounds = card.getBoundingClientRect()
          x(event.clientX - bounds.left)
          y(event.clientY - bounds.top)
        }, () => {})
      })
      return () => cleanups.forEach(cleanup => cleanup())
    }, root)
  })
  onBeforeUnmount(() => media?.revert())
}
