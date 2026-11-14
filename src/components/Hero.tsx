import { useEffect, useId, useState, type CSSProperties, type ReactNode } from 'react'
import { profile } from '../data/content'
import { useParallax } from '../lib/hooks'
import { sectionClick } from '../lib/scroll'
import { Pin, Sparkle, Squiggle } from './Decor'

/* ---------- pencil-sketched tool marks (drawn natively as SVG) ---------- */

type ToolName = 'react' | 'github' | 'figma' | 'supabase' | 'cloudflare' | 'convex'

// left/top are % of the hero, r is rotation in degrees, w is width in px
const TOOLS: { name: ToolName; left: number; top: number; r: number; w: number }[] = [
  { name: 'react', left: 46, top: 12, r: -7, w: 84 },
  { name: 'supabase', left: 61, top: 20, r: 6, w: 76 },
  { name: 'figma', left: 73, top: 11, r: -4, w: 72 },
  { name: 'github', left: 82, top: 27, r: 8, w: 80 },
  { name: 'cloudflare', left: 66, top: 80, r: -5, w: 88 },
  { name: 'convex', left: 30, top: 81, r: 6, w: 72 },
]

const GITHUB =
  'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z'

// one hand-wobbled orbit; the end overshoots the start like a real pencil loop
const ORBIT =
  'M19 101C20 70 64 67 100 69C141 71 183 80 181 100C179 125 138 133 100 131C58 130 17 123 22 97'

function sketchPaths(name: ToolName, fill: string): ReactNode {
  switch (name) {
    case 'react':
      return (
        <>
          <path className="sk" pathLength={1} d={ORBIT} fill="none" />
          <path className="sk" pathLength={1} d={ORBIT} fill="none" transform="rotate(59 100 100)" />
          <path className="sk" pathLength={1} d={ORBIT} fill="none" transform="rotate(121 100 100)" />
          <path
            className="sk"
            pathLength={1}
            fill="none"
            d="M100 91C109 89 113 98 109 105C103 111 92 107 93 98C95 91 105 92 106 100C106 106 99 108 96 104"
          />
          <circle cx="100" cy="100" r="7" className="sk-solid" />
        </>
      )
    case 'github':
      return (
        <path
          className="sk"
          pathLength={1}
          d={GITHUB}
          fill={fill}
          transform="translate(100 100) scale(7.6) translate(-12 -12)"
          vectorEffect="non-scaling-stroke"
        />
      )
    case 'figma':
      return (
        <>
          <path className="sk" pathLength={1} fill={fill} d="M100 32H78A22 22 0 0 0 77 77H101Z" />
          <path className="sk" pathLength={1} fill={fill} d="M99 32H122A23 23 0 0 1 123 77H100Z" />
          <path className="sk" pathLength={1} fill={fill} d="M101 77H77A22 22 0 0 0 78 122H100Z" />
          <circle className="sk" pathLength={1} fill={fill} cx="122" cy="100" r="22.5" />
          <path className="sk" pathLength={1} fill={fill} d="M100 122H78A22.5 22.5 0 1 0 100 145Z" />
        </>
      )
    case 'supabase':
      return (
        <>
          <path className="sk" pathLength={1} fill={fill} d="M116 29L54 113H97L87 171L148 83H105Z" />
          <path className="sk" pathLength={1} fill="none" d="M123 41L68 113" opacity=".6" />
        </>
      )
    case 'cloudflare':
      return (
        <>
          <path
            className="sk"
            pathLength={1}
            fill={fill}
            d="M41 136H150C169 136 173 118 159 110C160 95 143 87 131 95C122 74 95 75 87 97C65 95 52 113 60 124C48 125 39 131 41 136Z"
          />
          <path
            className="sk"
            pathLength={1}
            fill="none"
            d="M153 136H176C191 136 192 119 177 119C175 112 168 110 161 112"
          />
        </>
      )
    case 'convex':
      return (
        <>
          <path className="sk" pathLength={1} fill="none" d="M146 55A63 63 0 1 0 145 146" strokeWidth={3.4} />
          <path className="sk" pathLength={1} fill="none" d="M135 80A40 40 0 1 0 136 121" />
          <path className="sk" pathLength={1} fill="none" d="M146 55L135 80M145 146L136 121" />
        </>
      )
  }
}

function ToolSketch({ name, style }: { name: ToolName; style?: CSSProperties }) {
  const hatchId = `hatch-${useId().replace(/:/g, '')}`
  return (
    <svg className="tool-sketch" style={style} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={hatchId} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(42)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="1.1" opacity=".5" />
        </pattern>
      </defs>
      <g className="sk-main">{sketchPaths(name, `url(#${hatchId})`)}</g>
      {/* thin second pass, offset like a re-traced pencil line */}
      <g className="sk-ghost">{sketchPaths(name, 'none')}</g>
    </svg>
  )
}

/* ---------- hero ---------- */

export function Hero() {
  const wordRef = useParallax<HTMLHeadingElement>(0.07, 30)
  const figureRef = useParallax<HTMLDivElement>(-0.1, 44)
  const sparkRef = useParallax<HTMLSpanElement>(0.2, 80)
  const toolsRef = useParallax<HTMLDivElement>(0.12, 36)

  const roles = profile.roles
  const [roleIndex, setRoleIndex] = useState(0)
  const prevIndex = (roleIndex + roles.length - 1) % roles.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setRoleIndex((current) => (current + 1) % roles.length), 3600)
    return () => window.clearInterval(id)
  }, [roles.length])

  return (
    <section id="hero" className="hero" aria-labelledby="hero-name">
      <p className="hero-note">
        <span className="sr-only">
          Frontend web developer and mobile app developer, and UI/UX designer for both.
        </span>

        <span className="hero-role" aria-hidden="true">
          <span className="hero-role-lead">Frontend</span>
          <span className="hero-role-roll">
            {roles.map((role, index) => (
              <span
                key={role}
                className={`roll-word${index === roleIndex ? ' is-active' : ''}${
                  index === prevIndex ? ' is-prev' : ''
                }`}
              >
                {role}
              </span>
            ))}
          </span>
        </span>

        <span className="hero-note-lines" aria-hidden="true">
          <span>and UI/UX designer for both.</span>
        </span>

        <Squiggle className="hero-squiggle" />
      </p>

      <h1 id="hero-name" className="hero-word" ref={wordRef}>
        Michael
      </h1>

      {/* pencil-sketched tools: decorative, sits behind the portrait */}
      <div className="hero-tools" ref={toolsRef} aria-hidden="true">
        {TOOLS.map((tool, i) => (
          <ToolSketch
            key={tool.name}
            name={tool.name}
            style={
              {
                left: `${tool.left}%`,
                top: `${tool.top}%`,
                width: tool.w,
                '--r': `${tool.r}deg`,
                '--i': i,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="hero-figure" ref={figureRef}>
        {/* page-coloured silhouette: keeps the name from showing through the drawing */}
        <span className="figure-fill" aria-hidden="true" />
        <img
          src="/images/portrait.webp"
          srcSet="/images/portrait-340.webp 340w, /images/portrait.webp 700w"
          sizes="(max-width: 900px) 74vw, 40vw"
          alt="Pencil portrait of Michael"
          width={700}
          height={932}
          fetchPriority="high"
        />
      </div>

      <div className="hero-foot">
        <div className="hero-cta">
          <a className="btn-solid" href="#projects" onClick={sectionClick}>
            View work
          </a>
          <a className="hero-link" href="#contact" onClick={sectionClick}>
            Get in touch
          </a>
        </div>

        <div className="hero-side">
          <p className="hero-side-line">Open to full-time and contract work.</p>
          <p className="hero-side-line hero-side-place">
            <Pin className="hero-pin" />
            {profile.location}
          </p>
        </div>
      </div>

      <span className="hero-spark" ref={sparkRef} aria-hidden="true">
        <Sparkle />
      </span>
    </section>
  )
}