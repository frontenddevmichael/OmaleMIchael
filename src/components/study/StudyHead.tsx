import type { Study } from '../../lib/work'

/** The masthead: name across the page, then the one-line summary. */
export function StudyHead({ study }: { study: Study }) {
  return (
    <header className="study-head">
      <h1>{study.title}</h1>
      <p className="study-summary">{study.summary}</p>
    </header>
  )
}
