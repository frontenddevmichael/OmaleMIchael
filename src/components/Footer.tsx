import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { resume } from '../data/content'
import { ArrowUpRight, Sparkle } from './Decor'
import { ChatIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './icons'
import { Reveal } from './Reveal'

/** 09164300395 also works on WhatsApp, so the international form is built from the phone. */
const phoneDigits = resume.phone.replace(/\D/g, '')
const phoneIntl = `234${phoneDigits.replace(/^0/, '')}`
const whatsappHref = `https://wa.me/${phoneIntl}`

function lagosTime() {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Lagos',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(new Date())
    .replace(/\u202f/g, ' ')
}

const explore = [
  { label: 'Work', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Resume', href: '/resume' },
]

export function Footer() {
  const [time, setTime] = useState(lagosTime)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => setTime(lagosTime()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  // Only the card travels: as the footer comes up, the panel lifts by up to
  // --lift and settles flush, so it rides over the section above it.
  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const LIFT = 220
    let frame = 0

    const update = () => {
      frame = 0
      const rect = footer.getBoundingClientRect()
      const travel = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight * 0.5)))
      footer.style.setProperty('--lift', `${((1 - travel) * LIFT).toFixed(1)}px`)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <footer id="contact" className="footer" ref={footerRef}>
      <Reveal className="footer-panel">
        <div className="footer-top">
          <nav
            className="footer-col footer-explore"
            aria-label="Footer"
            style={{ '--i': 0 } as CSSProperties}
          >
            <p className="footer-heading">Explore</p>
            {explore.map((item) =>
              item.href.startsWith('/#') ? (
                <a className="footer-link" href={item.href} key={item.label}>
                  {item.label}
                </a>
              ) : (
                <Link className="footer-link" to={item.href} key={item.label}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="footer-col footer-follow" style={{ '--i': 1 } as CSSProperties}>
            <p className="footer-heading">Follow me</p>

            <div className="footer-socials">
              <a
                className="footer-social"
                href={resume.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>

              <a className="footer-social" href={resume.github} target="_blank" rel="noreferrer">
                <GitHubIcon />
                <span>GitHub</span>
              </a>

              <a className="footer-social" href={`mailto:${resume.email}`}>
                <MailIcon />
                <span>Email</span>
              </a>

              <a
                className="footer-social"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <ChatIcon />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="footer-touch" style={{ '--i': 2 } as CSSProperties}>
            <a className="footer-call" href={`tel:+${phoneIntl}`}>
              <span className="footer-call-label">Call Michael</span>
              <span className="footer-call-icon" aria-hidden="true">
                <PhoneIcon />
              </span>
            </a>
            <p className="footer-note">Let&rsquo;s work together</p>

            <a
              className="footer-chat"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <span className="footer-chat-label">Chat me on WhatsApp</span>
              <span className="footer-chat-icon" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </a>
            <p className="footer-note">Let&rsquo;s talk</p>
          </div>
        </div>

        <div className="footer-mark-wrap" aria-hidden="true">
          <span className="footer-mark">michael</span>
        </div>

        <div className="footer-base">
          <div className="footer-base-left">
            <p>Michael &copy;2026</p>
            <a href={`mailto:${resume.email}`}>Say hello</a>
          </div>

          <div className="footer-base-right">
            <span>Lagos, Nigeria</span>
            <span className="footer-dot" aria-hidden="true" />
            <span className="footer-time">{time}</span>
            <span className="footer-zone">WAT</span>
            <Sparkle className="footer-base-mark" />
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
