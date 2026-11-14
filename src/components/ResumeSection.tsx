import { Link } from 'react-router-dom'
import { resume } from '../data/content'
import { ArrowUpRight } from './Decor'
import { Reveal } from './Reveal'

const sections = ['Experience', 'Education', 'Skills']

export function ResumeSection() {
  return (
    <section id="resume" className="resume" aria-labelledby="resume-title">
      <Reveal className="resume-grid">
        <div className="resume-copy">
          <h2 id="resume-title" className="h2">
            The short version.
          </h2>

          <p className="resume-lede">Open it, print it, or save it as a PDF. Everything, on one page.</p>

          <div className="resume-actions">
            <Link className="btn-solid" to="/resume">
              Open the resume
            </Link>
            <a className="resume-mail" href={`mailto:${resume.email}`}>
              Email me
            </a>
          </div>

          <p className="resume-meta">A4 · one page · print-ready</p>
        </div>

        <Link className="resume-stack" to="/resume" aria-label="Open Michael's resume">
          <span className="resume-sheet resume-sheet-back is-far" aria-hidden="true" />
          <span className="resume-sheet resume-sheet-back" aria-hidden="true" />

          <span className="resume-sheet resume-sheet-front" aria-hidden="true">
            <span className="resume-paper-head">
              <span className="resume-paper-kicker">Curriculum Vitae</span>
              <span className="resume-paper-year">2026</span>
            </span>

            <span className="resume-paper-id">
              <span className="resume-paper-photo">
                <span className="resume-paper-fill" />
                <img
                  src="/images/portrait.webp"
                  alt=""
                  width={700}
                  height={932}
                  loading="lazy"
                />
              </span>

              <span className="resume-paper-who">
                <span className="resume-paper-name">
                  Michael
                  <br />
                  Omale
                </span>
                <span className="resume-paper-role">
                  Frontend developer
                  <br />
                  &amp; UI/UX designer
                </span>
              </span>
            </span>

            <span className="resume-paper-body">
              {sections.map((label) => (
                <span className="resume-paper-section" key={label}>
                  <span className="resume-paper-label">{label}</span>
                  <span className="resume-paper-rule" />
                  <span className="resume-paper-rule is-short" />
                </span>
              ))}
            </span>

            <span className="resume-paper-foot">
              <span className="resume-paper-open">
                Open <ArrowUpRight />
              </span>
              <span className="resume-paper-badge">PDF</span>
            </span>
          </span>
        </Link>
      </Reveal>
    </section>
  )
}
