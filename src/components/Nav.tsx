import { Link, useLocation } from 'react-router-dom'
import { resume } from '../data/content'
import { GitHubIcon, LinkedInIcon } from './icons'

export function Nav() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  return (
    <div className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <div className="nav-links">
          <a className="nav-link" href={onHome ? '#projects' : '/#projects'}>
            Projects
          </a>
          <a className="nav-link" href={onHome ? '#experience' : '/#experience'}>
            Experience
          </a>
          <Link className="nav-link" to="/resume">
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
