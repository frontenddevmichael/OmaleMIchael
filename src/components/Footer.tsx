import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useParallax } from '../lib/hooks'
import { ArrowUpRight, Pin, SketchCircle, Sparkle } from './Decor'
import { resume } from '../data/content'
import { GitHubIcon, LinkedInIcon } from './icons'
import { Reveal } from './Reveal'

export function Footer() {
  const circleRef = useParallax<HTMLSpanElement>(-0.09, 56)

  return (
    <footer id="contact" className="footer">
      <div className="band">
        <span className="band-circle" ref={circleRef}>
          <SketchCircle />
        </span>

        <Reveal className="band-inner">
          <h2 className="band-headline">
            Let&rsquo;s work <strong>together</strong>.
          </h2>

          <div className="band-cta">
            <p className="band-line">
              Tell me what you&rsquo;re building, and I&rsquo;ll tell you how I&rsquo;d approach it.
            </p>

            <div className="band-actions">
              <a
                className="band-button"
                href={`mailto:${resume.email}?subject=${encodeURIComponent('Let us work together')}`}
              >
                Email me
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </Reveal>

        <Sparkle className="band-spark" />
      </div>

      <Reveal className="footer-body">
        <div className="footer-grid">
          <nav className="footer-col" aria-label="Footer" style={{ '--i': 0 } as CSSProperties}>
            <p className="footer-title">Around here</p>
            <a className="footer-link" href="/#projects">
              Work
            </a>
            <a className="footer-link" href="/#experience">
              Experience
            </a>
            <Link className="footer-link" to="/resume">
              Resume
            </Link>
            <a className="footer-link" href="#hero">
              Back to top
            </a>
          </nav>

          <div className="footer-col" style={{ '--i': 1 } as CSSProperties}>
            <p className="footer-title">Elsewhere</p>
            <a className="footer-social" href={resume.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon />
              LinkedIn
            </a>
            <a className="footer-social" href={resume.github} target="_blank" rel="noreferrer">
              <GitHubIcon />
              GitHub
            </a>
            <a className="footer-social" href={`mailto:${resume.email}`}>
              <span className="footer-at" aria-hidden="true">
                @
              </span>
              Email
            </a>
          </div>

          <div className="footer-col" style={{ '--i': 2 } as CSSProperties}>
            <p className="footer-title">Details</p>
            <p className="footer-place">
              <Pin className="footer-pin" />
              Lagos, Nigeria
            </p>
            <p className="footer-muted">GMT +1</p>
            <a className="footer-link" href="tel:+2349164300395">
              +2349164300395
            </a>
          </div>
        </div>

        <div className="footer-base">
          <p>&copy; 2026 Michael Omale</p>
          <p>Designed and built by me, in Lagos.</p>
        </div>
      </Reveal>

      <Reveal className="wordmark-wrap">
        <div className="wordmark-top" aria-hidden="true">
          <span className="wordmark-rule" />
          <Sparkle className="wordmark-spark" />
        </div>

        <div className="wordmark-stage" aria-hidden="true">
          <span className="wordmark">michael</span>
        </div>
      </Reveal>
    </footer>
  )
}
