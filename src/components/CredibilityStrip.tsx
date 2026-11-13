import type { CSSProperties } from 'react'
import { credibility } from '../data/content'
import { Reveal } from './Reveal'

export function CredibilityStrip() {
  return (
    <Reveal className="strip">
      {credibility.map((item, index) => (
        <div className="strip-item" key={item.name} style={{ '--i': index } as CSSProperties}>
          <span className="strip-name">{item.name}</span>
          <span className="strip-detail">{item.detail}</span>
        </div>
      ))}
    </Reveal>
  )
}
