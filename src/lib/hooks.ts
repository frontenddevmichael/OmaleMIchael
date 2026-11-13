import { useEffect, useRef, useState } from 'react'

export type ResumeState = 'checking' | 'available' | 'missing'

let resumeProbe: Promise<Exclude<ResumeState, 'checking'>> | null = null

function probeResume() {
  if (!resumeProbe) {
    resumeProbe = fetch('/resume.pdf', { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') ?? ''
        return res.ok && type.includes('pdf') ? ('available' as const) : ('missing' as const)
      })
      .catch(() => 'missing' as const)
  }
  return resumeProbe
}

/** The resume PDF is optional; never render a link to a file that is not there. */
export function useResumeAvailable(): ResumeState {
  const [state, setState] = useState<ResumeState>('checking')

  useEffect(() => {
    let alive = true
    probeResume().then((next) => {
      if (alive) setState(next)
    })
    return () => {
      alive = false
    }
  }, [])

  return state
}

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
