import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
const origin = process.env.QA_URL || 'http://127.0.0.1:5175'
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const issues = []
try {
  for (const width of [1440,1024,768,390,320]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    await context.addInitScript(() => localStorage.setItem('dragonmile.showcase-text-scale.v1','1.2'))
    const page = await context.newPage()
    await page.goto(origin)
    assert.equal(await page.locator('.showcase-reading-controls').count(), 0)
    assert.equal(await page.locator('.opening-hero').getAttribute('data-showcase-scale'), null)
    const box = width > 960 ? page.locator('.opening-grid') : page.locator('.hero-showcase')
    assert.ok(Math.abs((await box.boundingBox()).height - (width > 960 ? 650 : 780)) < 1)
    for (const index of [0,1,2]) {
      await page.locator('.showcase-toggle').nth(index).click()
      const clipped = await page.locator('.showcase-panel.is-active').evaluate(node => {
        const bounds = node.getBoundingClientRect()
        return [...node.querySelectorAll('h3,p,.text-link,.showcase-media')].filter(child => child.getBoundingClientRect().bottom > bounds.bottom + 1).map(child => ({ text: child.textContent.slice(0,20), bottom: child.getBoundingClientRect().bottom, limit: bounds.bottom }))
      })
      if (clipped.length) issues.push({ width,index,clipped })
    }
    await page.locator('.showcase-toggle').nth(0).click()
    const image = page.locator('.showcase-panel.erp img')
    assert.equal(await image.getAttribute('src'), '/assets/credentials/tai-ni-feng-sheng-erp.png')
    await image.evaluate(node => node.decode())
    assert.equal(await image.evaluate(node => getComputedStyle(node).objectFit), 'contain')
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
    await context.close()
  }
  console.log(JSON.stringify({ checked: 'five widths: no reading controls or stored scaling, original display dimensions, complete ERP image', issues },null,2))
  assert.deepEqual(issues, [])
} finally { await browser.close() }
