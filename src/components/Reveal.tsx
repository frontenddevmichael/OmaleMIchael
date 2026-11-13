import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
}

/** Fades content in once, the first time it enters the viewport. */
export function Reveal({ children, className = '', delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    // Anything already on screen, or already scrolled past, skips the wait.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      // the tall top margin catches anything a fast scroll or anchor jump skipped
      { threshold: 0.15, rootMargin: '150% 0px -6% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}${shown ? ' is-in' : ''}`.trim()}
      style={{ ...style, '--d': delay } as CSSProperties}
    >
      {children}
    </div>
  )
}
