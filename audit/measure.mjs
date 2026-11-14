// Breakpoint audit driver: launches Chrome, walks a list of viewport widths,
// and reports overflow, hero geometry and folder layout for each one.
import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'

const URL = process.argv[2] ?? 'http://127.0.0.1:5300/'
const OUT = process.argv[3] ?? 'audit/shots'
const WIDTHS = (process.argv[4] ?? '360,390,414,768,834,1024,1280,1440,1920,2560').split(',').map(Number)
const PORT = 9333 + Math.floor(Math.random() * 400)

mkdirSync(OUT, { recursive: true })

const chrome = spawn('google-chrome', [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=/tmp/cdp-portfolio-${PORT}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--hide-scrollbars',
  '--disable-gpu',
  'about:blank',
], { stdio: 'ignore' })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const http = (path, method = 'GET') =>
  fetch(`http://127.0.0.1:${PORT}${path}`, { method }).then((r) => r.json())

let target
for (let i = 0; i < 60; i += 1) {
  try {
    target = await http('/json/new?about:blank', 'PUT')
    break
  } catch {
    await sleep(250)
  }
}
if (!target) {
  chrome.kill()
  throw new Error('chrome did not expose a debugging target')
}

const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  ws.onopen = resolve
  ws.onerror = reject
})

let nextId = 1
const pending = new Map()
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg)
    pending.delete(msg.id)
  }
}

const send = (method, params = {}) =>
  new Promise((resolve) => {
    const id = nextId
    nextId += 1
    pending.set(id, resolve)
    ws.send(JSON.stringify({ id, method, params }))
  })

await send('Page.enable')
await send('Runtime.enable')
// reveals are IntersectionObserver driven; reduced motion makes them paint so a
// full-page capture shows every section instead of blank space
await send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
})

const MEASURE = `(() => {
  const vw = innerWidth;
  const rect = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { l: Math.round(r.left), t: Math.round(r.top + scrollY), r: Math.round(r.right), b: Math.round(r.bottom + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
  const overflowing = [...document.querySelectorAll('body *')]
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.width > 0 && (r.right > vw + 1 || r.left < -1))
    .slice(0, 6)
    .map(({ el, r }) => ({ tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 40), l: Math.round(r.left), r: Math.round(r.right) }));
  const folders = [...document.querySelectorAll('.folder')].map((el) => {
    const r = el.getBoundingClientRect();
    return { name: el.querySelector('.folder-name')?.textContent, t: Math.round(r.top + scrollY), l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width) };
  });
  const word = document.querySelector('.hero-word');
  const figure = document.querySelector('.hero-figure');
  const cs = word ? getComputedStyle(word) : null;
  const clipped = word ? (word.scrollWidth > word.clientWidth + 1) : null;
  return {
    vw,
    docW: document.documentElement.scrollWidth,
    docH: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth > vw + 1,
    overflowing,
    hero: {
      h: Math.round(document.querySelector('.hero')?.getBoundingClientRect().height ?? 0),
      word: rect(word),
      wordFont: cs?.fontSize,
      wordClipped: clipped,
      figure: rect(figure),
    },
    nav: rect(document.querySelector('.nav')),
    navLinks: rect(document.querySelector('.nav-links')),
    folders,
    folderRows: [...new Set(folders.map((f) => f.t))].length,
    workTop: Math.round((document.querySelector('.stage')?.getBoundingClientRect().top ?? 0) + scrollY),
  };
})()`

const results = []

for (const width of WIDTHS) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile: width < 768,
  })
  await send('Page.navigate', { url: URL })
  await sleep(1600)

  const measured = await send('Runtime.evaluate', { expression: MEASURE, returnByValue: true })
  const value = measured.result?.result?.value
  results.push({ width, ...value })
  console.log(JSON.stringify({ width, docW: value?.docW, overflowX: value?.overflowX, wordFont: value?.hero?.wordFont, wordWidth: value?.hero?.word?.w, wordFits: value?.hero?.word ? value.hero.word.l >= 0 && value.hero.word.r <= width : null, heroH: value?.hero?.h, folderRows: value?.folderRows, firstFolder: value?.folders?.[0] }, null, 0))

  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
  if (shot.result?.data) writeFileSync(`${OUT}/${width}.png`, Buffer.from(shot.result.data, 'base64'))
}

writeFileSync(`${OUT}/report.json`, JSON.stringify(results, null, 2))
ws.close()
chrome.kill()
