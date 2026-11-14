import { Link } from 'react-router-dom'
import { Todo } from '../Todo'
import type { Study } from '../../lib/work'

/** The side rail: the facts at a glance, with a TODO where one is still missing. */
export function StudyMeta({ study }: { study: Study }) {
  return (
    <aside className="study-aside" aria-label="Project details">
      <dl className="study-meta">
        <div>
          <dt>Status</dt>
          <dd>{study.status}</dd>
        </div>
        <div>
          <dt>Metric</dt>
          <dd>{study.metric ? study.metric : <Todo label="metric" />}</dd>
        </div>
        <div>
          <dt>Live</dt>
          <dd>
            {study.live ? (
              <a href={study.live} target="_blank" rel="noreferrer">
                {study.live.replace(/^https?:\/\//, '')}
              </a>
            ) : (
              <Todo label="live link" />
            )}
          </dd>
        </div>
        <div>
          <dt>Repo</dt>
          <dd>
            {study.repo ? (
              <a href={study.repo} target="_blank" rel="noreferrer">
                {study.repo.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/')}
              </a>
            ) : (
              <Todo label="repo link" />
            )}
          </dd>
        </div>
      </dl>

      <p className="study-ask">Want the longer version? Ask me about it.</p>

      <Link className="study-back" to="/#projects">
        <span aria-hidden="true">&larr;</span> All work
      </Link>
    </aside>
  )
}
