/**
 * Case study copy lives in `src/content/work/*.md` and is parsed here at build
 * time, so the writing stays out of the components and no markdown runtime is
 * shipped. The files use a deliberately small subset: frontmatter, `##`
 * sections, `-` bullets, and `**lead.** text` lines for decisions.
 */

const files = import.meta.glob('../content/work/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type StudyImage = { src: string; alt: string }

export type StudyBlock =
  | { kind: 'text'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'pair'; lead: string; text: string }
  | { kind: 'link'; label: string; value: string }

export type StudySection = { heading: string; blocks: StudyBlock[] }

export type Study = {
  slug: string
  title: string
  summary: string
  status: string
  live: string | null
  repo: string | null
  metric: string | null
  images: StudyImage[]
  sections: StudySection[]
}

function unquote(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, '')
}

function isTodo(value: string | null): boolean {
  return !value || value === 'TODO'
}

function clean(value: string): string | null {
  const trimmed = value.trim()
  return isTodo(trimmed) ? null : trimmed
}

function parseFrontmatter(lines: string[]) {
  const meta: Record<string, string> = {}
  const images: StudyImage[] = []

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    const image = line.match(/^\s*-\s*src:\s*(.+)$/)
    const alt = line.match(/^\s+alt:\s*(.+)$/)

    if (image) {
      images.push({ src: unquote(image[1]), alt: '' })
    } else if (alt && images.length) {
      images[images.length - 1].alt = unquote(alt[1])
    } else {
      const entry = line.match(/^([a-z-]+):\s*(.*)$/i)
      if (entry) meta[entry[1]] = unquote(entry[2])
    }
  }

  return { meta, images }
}

function parseSection(lines: string[]): StudyBlock[] {
  const blocks: StudyBlock[] = []
  let prose: string[] = []
  let bullets: string[] = []

  const flushProse = () => {
    if (prose.length) {
      blocks.push({ kind: 'text', text: prose.join(' ').trim() })
      prose = []
    }
  }

  const flushBullets = () => {
    if (bullets.length) {
      blocks.push({ kind: 'list', items: [...bullets] })
      bullets = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      flushProse()
      flushBullets()
      continue
    }

    const bullet = trimmed.match(/^[-*]\s+(.*)$/)
    if (bullet) {
      flushProse()
      bullets.push(bullet[1])
      continue
    }

    const link = trimmed.match(/^(Live|Repo|Code):\s*(.*)$/i)
    if (link) {
      flushProse()
      flushBullets()
      blocks.push({ kind: 'link', label: link[1], value: link[2].trim() })
      continue
    }

    const pair = trimmed.match(/^\*\*(.+?)\*\*\s*(.*)$/)
    if (pair) {
      flushProse()
      flushBullets()
      blocks.push({ kind: 'pair', lead: pair[1], text: pair[2].trim() })
      continue
    }

    flushBullets()
    prose.push(trimmed)
  }

  flushProse()
  flushBullets()

  return blocks
}

function parse(source: string): Study {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const start = lines.findIndex((line) => line.trim() === '---')
  const end = start >= 0 ? lines.findIndex((line, index) => index > start && line.trim() === '---') : -1

  const metaLines = start >= 0 && end > start ? lines.slice(start + 1, end) : []
  const body = end > start ? lines.slice(end + 1) : lines
  const { meta, images } = parseFrontmatter(metaLines)

  const sections: StudySection[] = []
  let current: string | null = null
  let buffer: string[] = []

  const close = () => {
    if (current) sections.push({ heading: current, blocks: parseSection(buffer) })
    buffer = []
  }

  for (const line of body) {
    const heading = line.match(/^##\s+(.*)$/)
    if (heading) {
      close()
      current = heading[1].trim()
      continue
    }
    if (current) buffer.push(line)
  }
  close()

  return {
    slug: meta.slug ?? '',
    title: meta.title ?? '',
    summary: meta.summary ?? '',
    status: meta.status ?? 'In development',
    live: clean(meta.live),
    repo: clean(meta.repo),
    metric: clean(meta.metric),
    images,
    sections,
  }
}

const studies: Study[] = Object.values(files).map(parse).filter((study) => study.slug)

export function getStudy(slug: string): Study | null {
  return studies.find((study) => study.slug === slug) ?? null
}

export function allStudies(): Study[] {
  return studies
}
