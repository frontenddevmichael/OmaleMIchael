import { Link, useLocation } from 'react-router-dom'
import { useActiveSection } from '../lib/hooks'
import { resume } from '../data/content'
import { GitHubIcon, LinkedInIcon } from './icons'

const SECTIONS = ['projects', 'experience'] as const

export function Nav() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const activeSection = useActiveSection(SECTIONS)

  const projectsActive = pathname.startsWith('/work') || (onHome && activeSection === 'projects')
  const experienceActive = onHome && activeSection === 'experience'
  const resumeActive = pathname === '/resume'
  const linkClass = (active: boolean) => `nav-link${active ? ' is-active' : ''}`

  return (
    <div className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <div className="nav-links">
          <a
            className={linkClass(projectsActive)}
            href={onHome ? '#projects' : '/#projects'}
            aria-current={projectsActive ? 'location' : undefined}
          >
            Projects
          </a>
          <a
            className={linkClass(experienceActive)}
            href={onHome ? '#experience' : '/#experience'}
            aria-current={experienceActive ? 'location' : undefined}
          >
            Experience
          </a>
          <Link
            className={linkClass(resumeActive)}
            to="/resume"
            aria-current={resumeActive ? 'page' : undefined}
          >
            Resume
          </Link>
        </div>

        <Link className="nav-name" to="/" aria-label="Michael — home">
          {/*Michael*/}
        </Link>

        <div className="nav-social">
          <a
            className="nav-social-item"
            href={resume.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
            <span className="nav-social-label">LinkedIn</span>
          </a>
          <a
            className="nav-social-item"
            href={resume.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon />
            <span className="nav-social-label">GitHub</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
