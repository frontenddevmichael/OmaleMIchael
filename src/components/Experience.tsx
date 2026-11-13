import type { CSSProperties } from 'react'
import { timeline } from '../data/content'
import { useParallax } from '../lib/hooks'
import { Asterisk, Book, Briefcase } from './Decor'
import { Reveal } from './Reveal'

export function Experience() {
  const markRef = useParallax<HTMLSpanElement>(0.12, 36)

  return (
    <section id="experience" className="exp" aria-labelledby="exp-title">
      <Reveal className="exp-head">
        <span className="exp-mark-wrap" ref={markRef} aria-hidden="true">
          <Asterisk className="exp-mark" />
        </span>

        <h2 id="exp-title" className="h2">
          Building since 2024.
        </h2>
      </Reveal>

      <Reveal className="circuit-wrap">
        <div className="circuit">
          <span className="circuit-trace" aria-hidden="true" />

          <ol className="circuit-stops">
            {timeline.map((entry, index) => {
              const opensYear = index === 0 || timeline[index - 1].when !== entry.when

              return (
                <li
                  className={`stop ${index % 2 === 0 ? 'is-above' : 'is-below'}${
                    entry.current ? ' is-now' : ''
                  }`}
                  key={`${entry.when}-${entry.title}`}
                  style={{ '--i': index } as CSSProperties}
                >
                  <span className="stop-pad" aria-hidden="true" />
                  <span className="stop-leg" aria-hidden="true" />

                  <div className="stop-body">
                    <p className="stop-year">{opensYear ? entry.when : '\u00A0'}</p>

                    <h3 className="stop-title">
                      {entry.kind ? (
                        <span className="stop-icon" aria-hidden="true">
                          {entry.kind === 'school' ? <Book /> : <Briefcase />}
                        </span>
                      ) : null}
                      {entry.title}
                    </h3>

                    {entry.detail ? <p className="stop-desc">{entry.detail}</p> : null}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Reveal>
    </section>
  )
}
