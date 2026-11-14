// Writes real HTML for each route into dist/, so a crawler that never runs
// JavaScript still sees the page instead of an empty <div id="root">.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')

const { render } = await import(resolve(root, '.ssr/entry-server.js'))

const shell = readFileSync(resolve(dist, 'index.html'), 'utf8')

/** Frontmatter is flat YAML by design, so a tiny reader is enough. */
function frontmatter(file) {
  const source = readFileSync(file, 'utf8')
  const meta = {}
  for (const line of source.split('\n')) {
    const match = line.match(/^([a-z-]+):\s*(.*)$/i)
    if (match) meta[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
  }
  return meta
}

const workDir = resolve(root, 'src/content/work')
const studies = readdirSync(workDir)
  .filter((name) => name.endsWith('.md'))
  .map((name) => frontmatter(resolve(workDir, name)))

const routes = [
  {
    path: '/',
    title: 'Michael — Frontend developer and UI/UX designer',
    description:
      'Michael (Omale Michael) is a frontend developer and UI/UX designer in Lagos. Selected work, experience and resume.',
  },
  {
    path: '/resume',
    title: 'Resume — Michael Omale',
    description: 'The one page resume of Michael Omale, frontend developer and UI/UX designer in Lagos.',
  },
  ...studies.map((study) => ({
    path: `/work/${study.slug}`,
    title: `${study.title} — Michael`,
    description: study.summary,
  })),
]

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

let written = 0

for (const route of routes) {
  const html = render(route.path)
  let page = shell
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(route.title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${escape(route.description)}$2`,
    )
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${escape(route.title)}$2`)
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${escape(route.description)}$2`,
    )

  const target =
    route.path === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${route.path}/index.html`)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, page)
  written += 1
}

console.log(`prerendered ${written} routes`)
