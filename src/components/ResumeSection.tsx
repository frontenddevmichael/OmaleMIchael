import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { resume } from '../data/content'
import { Reveal } from './Reveal'

/* Small line icons, inline so there is no extra dependency. */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="resume-icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

const facts = [
  {
    label: 'Role',
    value: 'Frontend developer and UI/UX designer',
    icon: (
      <Icon>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </Icon>
    ),
  },
  {
    label: 'Based in',
    value: 'Lagos, Nigeria',
    icon: (
      <Icon>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </Icon>
    ),
  },
  {
    label: 'Studying',
    value: 'BSc Computer Science and IT, Bells University, until 2029',
    icon: (
      <Icon>
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c3 2 9 2 12 0v-5" />
      </Icon>
    ),
  },
  {
    label: 'Studio',
    value: 'PrimeAxis Group, started in 2025',
    icon: (
      <Icon>
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </Icon>
    ),
  },
  {
    label: 'Now',
    value: 'Part-time contract at CloudCrave, interning at Zelion this year',
    icon: (
      <Icon>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </Icon>
    ),
  },
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
            Download my resume for a complete overview of my experience, education, and skills as a frontend develope
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
              <dt>
                {fact.icon}
                {fact.label}
              </dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}