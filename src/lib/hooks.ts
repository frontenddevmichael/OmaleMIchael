import { useEffect, useRef, useState } from 'react'

/**
 * Very light scroll parallax. Uses the standalone `translate` property so it
 * composes with any transform already on the element.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(speed = 0.08, range = 60) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let applied = 0

    const render = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      // rect already includes the offset from the last frame; take it back out so
      // the measurement never feeds into itself
      const base = rect.top - applied
      const distance = base + rect.height / 2 - window.innerHeight / 2
      // clamped: a stale measurement can never throw an element across the page
      applied = Math.max(-range, Math.min(range, -distance * speed))
      el.style.translate = `0 ${applied.toFixed(2)}px`
    }

    const request = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    render()
    // scroll bubbles to the document first, including from inner scrollers
    document.addEventListener('scroll', request, { capture: true, passive: true })
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    window.addEventListener('load', request)
    const settle = window.setTimeout(request, 500)

    return () => {
      document.removeEventListener('scroll', request, { capture: true })
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      window.removeEventListener('load', request)
      window.clearTimeout(settle)
      if (frame) cancelAnimationFrame(frame)
      el.style.translate = ''
    }
  }, [speed, range])

  return ref
}

/** Tracks which page section is under the reading line, for nav highlighting. */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    const sections = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (!sections.length) {
      setActive(null)
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let next: string | null = null

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= line && rect.bottom > line) next = section.id
      }

      setActive(next)
    }

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)

    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [key])

  return active
}
