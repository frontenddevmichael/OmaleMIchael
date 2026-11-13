import { useEffect } from 'react'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'
import { Pin } from '../components/Decor'
import { ChatIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from '../components/icons'
import {
  resume,
  resumeEducation,
  resumeExperience,
  resumeSkills,
  type ResumeEntry,
} from '../data/content'

function CvList({ entries }: { entries: ResumeEntry[] }) {
  return (
    <ol className="cv-list">
      {entries.map((entry) => (
        <li className="cv-item" key={`${entry.when}-${entry.title}`}>
          <p className="cv-when">{entry.when}</p>
          <div className="cv-body">
            <h3 className="cv-title">{entry.title}</h3>
            <p className="cv-role">{entry.role}</p>
            {entry.detail ? <p className="cv-detail">{entry.detail}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function Resume() {
  useEffect(() => {
    document.title = 'Resume — Michael'
    return () => {
      document.title = 'Michael — Frontend developer and UI/UX designer'
    }
  }, [])

  return (
    <>
      <div className="page">
        <Nav />

        <main className="resume-page">
          <header className="doc-head">
            <p className="doc-kicker">Resume</p>

            <div className="doc-actions">
              <button className="btn-solid" type="button" onClick={() => window.print()}>
                Download PDF
              </button>
              <p className="doc-hint">Print dialog, then Save as PDF</p>
            </div>
          </header>

          <div className="doc-grid">
            <aside className="id-col">
              <figure className="id-photo">
                <span className="id-fill" aria-hidden="true" />
                <img
                  src="/images/portrait.webp"
                  alt="Pencil portrait of Michael"
                  width={700}
                  height={932}
                />
              </figure>

              <h1 className="id-name">
                Michael
                <br />
                Omale
              </h1>

              <p className="id-sub">Frontend developer and UI/UX designer</p>

              <p className="id-bio">{resume.summary}</p>

              <div className="id-block">
                <h2 className="sheet-label">Contact</h2>

                <ul className="id-contact">
                  <li>
                    <PhoneIcon />
                    <a href={`tel:${resume.phone}`}>{resume.phone}</a>
                  </li>
                  <li>
                    <ChatIcon />
                    <a href={`tel:${resume.whatsapp}`}>{resume.whatsapp}</a>
                  </li>
                  <li>
                    <MailIcon />
                    <a href={`mailto:${resume.email}`}>{resume.email}</a>
                  </li>
                  <li>
                    <Pin />
                    <span>{resume.location}</span>
                  </li>
                  <li>
                    <GitHubIcon />
                    <a href={resume.github} target="_blank" rel="noreferrer">
                      {resume.githubLabel}
                    </a>
                  </li>
                  <li>
                    <LinkedInIcon />
                    <a href={resume.linkedin} target="_blank" rel="noreferrer">
                      {resume.linkedinLabel}
                    </a>
                  </li>
                </ul>
              </div>
            </aside>

            <div className="resume-main">
              <section className="doc-section" aria-labelledby="cv-experience">
                <header className="sheet-head">
                  <h2 id="cv-experience">Experience</h2>
                  <span>Timeline</span>
                </header>
                <CvList entries={resumeExperience} />
              </section>

              <section className="doc-section" aria-labelledby="cv-education">
                <header className="sheet-head">
                  <h2 id="cv-education">Education</h2>
                  <span>Academic journey</span>
                </header>
                <CvList entries={resumeEducation} />
              </section>

              <section className="doc-section" aria-labelledby="cv-skills">
                <header className="sheet-head">
                  <h2 id="cv-skills">Skills</h2>
                  <span>What I work with</span>
                </header>

                <div className="cv-skills">
                  {resumeSkills.map((group) => (
                    <div className="cv-skill-group" key={group.title}>
                      <h3>{group.title}</h3>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  )
}
