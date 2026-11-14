import type { CSSProperties } from 'react'
import { timeline, type TimelineEntry } from '../data/content'
import { useParallax } from '../lib/hooks'
import { Asterisk, Book, Briefcase } from './Decor'
import { Reveal } from './Reveal'

type YearGroup = {
  when: string
  entries: TimelineEntry[]
  current: boolean
}

const years = timeline.reduce<YearGroup[]>((groups, entry) => {
  const last = groups[groups.length - 1]

  if (last && last.when === entry.when) {
    last.entries.push(entry)
    last.current = last.current || Boolean(entry.current)
  } else {
    groups.push({
      when: entry.when,
      entries: [entry],
      current: Boolean(entry.current),
    })
  }

  return groups
}, [])

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

      <Reveal className="exp-ledger-wrap">
        <div className="exp-ledger">
          {years.map((group, groupIndex) => (
            <div
              className={`exp-year${group.current ? ' is-current' : ''}`}
              key={group.when}
              style={{ '--i': groupIndex } as CSSProperties}
            >
              <div className="exp-year-head">
                <h3 className="exp-year-num">{group.when}</h3>
                {group.current ? <span className="exp-now">Now</span> : null}
              </div>

              <ul className="exp-list">
                {group.entries.map((entry, entryIndex) => (
                  <li
                    className="exp-entry"
                    key={`${entry.when}-${entry.title}`}
                    style={{ '--i': entryIndex } as CSSProperties}
                  >
                    <span className="exp-entry-icon" aria-hidden="true">
                      {entry.kind === 'school' ? (
                        <Book />
                      ) : entry.kind === 'work' ? (
                        <Briefcase />
                      ) : (
                        <span className="exp-entry-dot" />
                      )}
                    </span>
                    <span className="exp-entry-title">{entry.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
