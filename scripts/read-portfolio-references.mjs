import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const audit = new URL('../.source-audit/', import.meta.url)
await mkdir(audit, { recursive: true })
try {
  for (const id of [3, 4]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    const requests = []
    page.on('response', response => {
      if (['fetch', 'xhr'].includes(response.request().resourceType())) requests.push({ url: response.url(), status: response.status() })
    })
    const response = await page.goto(`https://dragonmile.dev/portfolio/${id}`, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(1200)
    const data = await page.evaluate(() => ({
      title: document.title,
      text: (document.querySelector('main') ?? document.body).innerText,
      headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(el => ({ tag: el.tagName, text: el.innerText })),
      images: [...document.images].map(img => ({ src: img.currentSrc || img.src, alt: img.alt, width: img.naturalWidth, height: img.naturalHeight })),
      scripts: [...document.scripts].map(script => script.src).filter(Boolean),
    }))
    Object.assign(data, { url: page.url(), status: response?.status(), requests })
    await writeFile(new URL(`dev-portfolio-${id}.json`, audit), JSON.stringify(data, null, 2))
    await writeFile(new URL(`dev-portfolio-${id}.html`, audit), await page.content())
    await page.screenshot({ path: new URL(`dev-portfolio-${id}.png`, audit).pathname.replace(/^\/(\w:)/, '$1'), fullPage: true })
    console.log(JSON.stringify(data, null, 2))
    await page.close()
  }
} finally { await browser.close() }
