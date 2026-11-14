import { useId, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { projects, type Project } from '../data/content'
import { useParallax } from '../lib/hooks'
import { ArrowUpRight, BrowserDoodle } from './Decor'
import { Reveal } from './Reveal'

/* Folder silhouette drawn in a 320x236 box: back panel with tab, then the
   front flap whose top edge rises toward the right. */
const BACK_PATH =
  'M 12 28 L 32 28 L 32 10 Q 32 2 40 2 L 112 2 Q 120 2 120 10 L 120 28 L 306 28 Q 318 28 318 40 L 318 220 Q 318 234 304 234 L 16 234 Q 2 234 2 220 L 2 40 Q 2 28 12 28 Z'

const FRONT_PATH =
  'M 14 234 Q 6 234 6 224 L 6 84 Q 6 76 14 76 L 92 76 C 112 76 128 66 150 62 L 296 46 Q 314 44 314 58 L 314 218 Q 314 234 298 234 Z'

const tilt = ['-1.6deg', '1.1deg', '-0.9deg', '1.6deg']

function ProjectFolder({ project, index }: { project: Project; index: number }) {
  const uid = useId().replace(/:/g, '')
  const backGradient = `folder-back-${uid}`
  const frontGradient = `folder-front-${uid}`

  /* no aria-label on purpose: the card's own words are the accessible name,
     so screen readers hear exactly what the card shows */
  return (
    <Link
      to={`/work/${project.slug}`}
      className="folder"
      style={
        {
          '--rot': tilt[index % tilt.length],
          '--z': index + 1,
          '--i': index,
        } as CSSProperties
      }
    >
      <span className="folder-back-art" aria-hidden="true">
        <svg
          className="folder-svg"
          viewBox="0 0 320 236"
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            <linearGradient id={backGradient} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f8f8f5" stopOpacity="0.9" />
              <stop offset="1" stopColor="#e2e2de" stopOpacity="0.72" />
            </linearGradient>
          </defs>
          <path
            d={BACK_PATH}
            fill={`url(#${backGradient})`}
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.2"
          />
        </svg>
      </span>

      <span className="folder-tab-word" aria-hidden="true">
        {project.year}
      </span>

      <span className="folder-cover">
        <span className="folder-front-art" aria-hidden="true">
          <svg
            className="folder-svg"
            viewBox="0 0 320 236"
            preserveAspectRatio="none"
            focusable="false"
          >
            <defs>
              <linearGradient id={frontGradient} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.94" />
                <stop offset="1" stopColor="#f0f0ed" stopOpacity="0.72" />
              </linearGradient>
            </defs>
            <path
              d={FRONT_PATH}
              fill={`url(#${frontGradient})`}
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1.2"
            />
          </svg>
        </span>

        <span className="folder-content">
          <span className="folder-name">{project.name}</span>

          <span className="folder-meta">
            <span className="folder-status">
              <span className="folder-dot" aria-hidden="true" />
              {project.status}
            </span>

            {project.lead ? <span className="folder-lead">Lead</span> : null}

            <span className="folder-arrow" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </span>
        </span>
      </span>
    </Link>
  )
}

export function Work() {
  const doodleRef = useParallax<HTMLSpanElement>(0.14, 46)

  return (
    <section id="projects" className="work" aria-labelledby="work-title">
      <Reveal className="work-head">
        <div>
          <h2 id="work-title" className="h2">
            Products I&rsquo;ve built.
          </h2>
        </div>
        <span className="work-doodle-wrap" ref={doodleRef} aria-hidden="true">
          <BrowserDoodle className="work-doodle" />
        </span>
      </Reveal>

      <Reveal className="stage">
        {projects.map((project, index) => (
          <ProjectFolder key={project.slug} project={project} index={index} />
        ))}
      </Reveal>
    </section>
  )
}
