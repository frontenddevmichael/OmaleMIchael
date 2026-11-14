import type { CSSProperties } from 'react'
import { credibility } from '../data/content'
import { Reveal } from './Reveal'

/** A colophon band: numbered cells on a hairline rule, not a floating row. */
export function CredibilityStrip() {
  return (
    <Reveal className="strip">
      {credibility.map((item, index) => (
        <div className="strip-item" key={item.name} style={{ '--i': index } as CSSProperties}>
          <span className="strip-index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="strip-body">
            <span className="strip-name">{item.name}</span>
            <span className="strip-detail">{item.detail}</span>
          </span>
        </div>
      ))}
    </Reveal>
  )
}
