import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const origin = process.env.QA_URL || 'http://127.0.0.1:5175'
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const page = await browser.newPage({ reducedMotion: 'reduce' })
const errors = [], checks = [], issues = []
page.on('pageerror', error => errors.push(error.message))
const routes = ['/', '/about', '/services', '/services/iot', '/cases', '/clients', '/contact', '/cases/concrete-erp', '/cases/smart-machine-management', '/cases/sports-coaches']
await mkdir('qa-artifacts', { recursive: true })
try {
  for (const width of [1440,1024,768,390,320]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const route of width === 1024 || width === 768 ? ['/', '/contact', '/cases/concrete-erp'] : routes) {
      await page.goto(origin + route, { waitUntil: 'domcontentloaded' })
      await page.locator('h1').waitFor()
      const small = await page.evaluate(() => [...document.querySelectorAll('a,button,p,span,small,h3,h4,dt,dd,label,figcaption,time,li')].filter(node =>
        [...node.childNodes].some(text => text.nodeType === 3 && /[\u4e00-\u9fff]/.test(text.textContent)) &&
        !node.closest('[inert],dialog:not([open])') && node.getBoundingClientRect().height > 0 &&
        getComputedStyle(node).visibility !== 'hidden' && parseFloat(getComputedStyle(node).fontSize) < 18
      ).map(node => ({ class: node.className, text: node.textContent.trim().slice(0,35), size: getComputedStyle(node).fontSize })))
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)
      if (small.length || overflow) issues.push({ width, route, small, overflow })
    }
    await page.goto(origin, { waitUntil: 'domcontentloaded' })
    await page.locator('.showcase-toggle').nth(1).click()
    const clipped = await page.locator('.showcase-panel.is-active').evaluate(node => {
      const bounds = node.getBoundingClientRect()
      return [...node.querySelectorAll('h3,p,.text-link,.showcase-media')].filter(child => child.getBoundingClientRect().bottom > bounds.bottom + 1).map(child => child.className)
    })
    if (clipped.length) issues.push({ width, clipped })
    await page.locator('.opening-hero').screenshot({ path: 'qa-artifacts/readability-hero-' + width + '.png' })
    await page.getByRole('button', { name: '查看資格', exact: true }).click()
    const dialog = page.locator('#qualification-certificate-dialog')
    assert.ok(await dialog.evaluate(node => node.open))
    assert.ok(await dialog.locator('dd').evaluateAll(nodes => nodes.every(node => parseFloat(getComputedStyle(node).fontSize) >= 18)))
    assert.ok(await dialog.evaluate(node => node.scrollWidth <= node.clientWidth + 1))
    await page.screenshot({ path: 'qa-artifacts/readability-certificate-' + width + '.png' })
    await page.keyboard.press('Escape')
    if (width <= 960) {
      await page.getByRole('button', { name: '開啟選單' }).click()
      assert.ok(await page.locator('#main-navigation a').first().isVisible())
      assert.ok(await page.locator('#main-navigation').evaluate(node => node.scrollWidth <= node.clientWidth + 1))
      await page.keyboard.press('Escape')
    }
    checks.push(width + 'px: essential Chinese text at least 18px, no page overflow, readable and unclipped certificate controls, navigation')
  }
  await page.setViewportSize({ width: 720, height: 900 })
  await page.goto(origin + '/contact', { waitUntil: 'domcontentloaded' })
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'reflow at half desktop width')
  await page.getByRole('textbox', { name: /姓名/ }).fill('測試閱讀')
  await page.getByRole('textbox', { name: /電子信箱/ }).fill('reader@example.com')
  await page.getByRole('textbox', { name: /需求說明/ }).fill('請協助確認大字版聯絡表單')
  await page.getByRole('button', { name: '建立諮詢郵件', exact: true }).click()
  assert.ok(await page.locator('.draft-preview').isVisible())
  assert.ok(await page.locator('.draft-preview pre').evaluate(node => parseFloat(getComputedStyle(node).fontSize) >= 20))
  checks.push('contact form and draft remain usable with larger type')
  const report = { checks, issues, errors }
  await writeFile('qa-artifacts/readability-report.json', JSON.stringify(report,null,2))
  console.log(JSON.stringify(report,null,2))
  assert.deepEqual(issues, [])
  assert.deepEqual(errors, [])
} finally { await browser.close() }
