// node audit/shot.mjs <url> <width> <scrollY> <outfile>
import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const [url, width, scrollY, out] = process.argv.slice(2)
const PORT = 9800 + Math.floor(Math.random() * 300)

const chrome = spawn('google-chrome', [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=/tmp/cdp-shot-${PORT}`,
  '--no-first-run',
  '--hide-scrollbars',
  '--disable-gpu',
  'about:blank',
], { stdio: 'ignore' })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const http = (path, method = 'GET') => fetch(`http://127.0.0.1:${PORT}${path}`, { method }).then((r) => r.json())

let target
for (let i = 0; i < 60; i += 1) {
  try {
    target = await http('/json/new?about:blank', 'PUT')
    break
  } catch {
    await sleep(250)
  }
}

const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((res, rej) => {
  ws.onopen = res
  ws.onerror = rej
})

let id = 1
const pending = new Map()
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m)
    pending.delete(m.id)
  }
}
const send = (method, params = {}) =>
  new Promise((res) => {
    const n = id++
    pending.set(n, res)
    ws.send(JSON.stringify({ id: n, method, params }))
  })

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(width),
  height: 900,
  deviceScaleFactor: 1,
  mobile: Number(width) < 768,
})
await send('Page.navigate', { url })
await sleep(2200)
// scroll in steps so the reveal observers fire the way they do for a reader
for (const y of [0, 200, 400, 600, Number(scrollY)]) {
  if (y > Number(scrollY)) break
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` })
  await sleep(320)
}
await sleep(700)

const shot = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync(out, Buffer.from(shot.result.data, 'base64'))
ws.close()
chrome.kill()
console.log('saved', out)
