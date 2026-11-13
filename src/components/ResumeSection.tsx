import { Link } from 'react-router-dom'
import { resume } from '../data/content'
import { Reveal } from './Reveal'

const facts = [
  { label: 'Role', value: 'Frontend developer and UI/UX designer' },
  { label: 'Based in', value: 'Lagos, Nigeria' },
  { label: 'Studying', value: 'BSc Computer Science and IT, Bells University, until 2029' },
  { label: 'Studio', value: 'PrimeAxis Group, started in 2025' },
  { label: 'Now', value: 'Part-time contract at CloudCrave, interning at Zelion this year' },
]

export function ResumeSection() {
  return (
    <section id="resume" className="resume" aria-labelledby="resume-title">
      <Reveal className="resume-grid">
        <div className="resume-copy">
          <h2 id="resume-title" className="h2">
            The short version.
          </h2>

          <p>
            I build interfaces for the web and for mobile, and design them too. Most of the work is
            React, TypeScript and React Native.
          </p>

          <div className="resume-actions">
            <Link className="btn-solid" to="/resume">
              Open the resume
            </Link>
            <a className="resume-mail" href={`mailto:${resume.email}`}>
              Email me
            </a>
          </div>
        </div>

        <dl className="resume-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
