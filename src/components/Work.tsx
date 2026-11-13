import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/content'
import { useParallax } from '../lib/hooks'
import { BrowserDoodle, Cursor } from './Decor'
import { Reveal } from './Reveal'

const layout = [
  { rot: '-3.5deg', y: '26px' },
  { rot: '1.8deg', y: '0px' },
  { rot: '-1.2deg', y: '30px' },
  { rot: '3.4deg', y: '6px' },
]

export function Work() {
  const doodleRef = useParallax<HTMLSpanElement>(0.14, 46)

  return (
    <section id="projects" className="work" aria-labelledby="work-title">
      <Reveal className="work-head">
        <div>
          <h2 id="work-title" className="h2">
            Things I&rsquo;ve built.
          </h2>
        </div>
        <span className="work-doodle-wrap" ref={doodleRef} aria-hidden="true">
          <BrowserDoodle className="work-doodle" />
        </span>
      </Reveal>

      <Reveal className="stage">
        {projects.map((project, index) => {
          const spot = layout[index % layout.length]
          return (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              className={`folder${project.lead ? ' is-lead' : ''}`}
              style={
                {
                  '--rot': spot.rot,
                  '--y': spot.y,
                  '--i': index,
                  zIndex: index + 1,
                } as CSSProperties
              }
              aria-label={`${project.name}, open case study`}
            >
              <span className="folder-back" aria-hidden="true" />
              <span className="folder-tab" aria-hidden="true" />
              <span className="folder-year" aria-hidden="true">
                {project.year}
              </span>

              <span className="folder-lid">
                <span className="folder-name">{project.name}</span>
                <span className="folder-foot">
                  {project.status}
                  <span className="folder-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </span>
              </span>
            </Link>
          )
        })}
        <Cursor className="stage-cursor" />
      </Reveal>
    </section>
  )
}
