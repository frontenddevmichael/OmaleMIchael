/**
 * In-page section links scroll without writing the hash into the URL, so
 * reloading the page always starts at the top instead of jumping back to
 * whichever section was last clicked.
 */
import type { MouseEvent } from 'react'

export function sectionClick(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href')
  if (!href || !href.startsWith('#')) return

  const target = document.getElementById(href.slice(1))
  if (!target) return

  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
