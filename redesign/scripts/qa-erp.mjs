import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const origin = process.env.QA_URL || 'http://127.0.0.1:4174'
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' })
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto(`${origin}/cases/concrete-erp`)
    await page.getByRole('link', { name: /開發技術平台與備份機制/ }).click()
    await page.waitForTimeout(200)
    const target = await page.locator('#case-technology').boundingBox()
    const header = await page.locator('.site-header').boundingBox()
    assert.ok(target.y >= header.height - 2 && target.y < header.height + 60, `last ERP section clears sticky header at ${width}px`)
    await page.getByRole('link', { name: /發票開立與雲端電子發票/ }).click()
    await page.locator('#case-electronic-invoices .gallery-image').nth(1).click()
    assert.ok(await page.locator('.image-viewer').evaluate(el => el.open))
    assert.equal(await page.locator('.image-viewer img').getAttribute('src'), '/assets/erp/invoice-upload.png')
    await page.keyboard.press('Escape')
    assert.ok(!(await page.locator('.image-viewer').evaluate(el => el.open)))
    assert.ok(await page.locator('#case-electronic-invoices .gallery-image').nth(1).evaluate(el => el === document.activeElement))
  }
  console.log('ERP navigation, portrait image viewer and focus return passed at 1440/768/390/320px.')
} finally { await browser.close() }
