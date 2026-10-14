import { chromium } from '@playwright/test'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const origin = process.env.QA_URL || 'http://127.0.0.1:5173'
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
const errors = [], failed = [], checked = []
page.on('pageerror', e => errors.push(e.message))
page.on('response', r => { if (r.status() >= 400 && new URL(r.url()).origin === origin) failed.push(`${r.status()} ${r.url()}`) })
const mainRoutes = ['/', '/about', '/services', '/cases', '/clients', '/contact']
const detailRoutes = ['app', 'database', 'iot', 'pcb'].map(s => `/services/${s}`).concat(['smart-manufacturing', 'cnc-monitoring', 'swallow-training', 'oral-care', 'speech-therapy', 'spinal-simulation', 'medical-iot', 'concrete-erp', 'container-recognition'].map(s => `/cases/${s}`))
await mkdir('qa-artifacts', { recursive: true })
try {
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const route of width === 1440 ? [...mainRoutes, ...detailRoutes] : mainRoutes) {
      const response = await page.goto(origin + route)
      assert.equal(response.status(), 200, route)
      await page.locator('main h1').waitFor()
      assert.equal(await page.locator('main h1').count(), 1, `single h1 ${route}`)
      await page.evaluate(() => document.fonts.ready)
      const dimensions = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: window.innerWidth }))
      assert.ok(dimensions.document <= dimensions.viewport + 1, `overflow ${width} ${route}: ${JSON.stringify(dimensions)}`)
      const broken = await page.locator('img').evaluateAll(images => images.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src))
      assert.deepEqual(broken, [], `images ${route}`)
      checked.push(`${width}px ${route}`)
      if (route === '/' || route === '/cases' || route === '/contact') {
        await page.locator('img').evaluateAll(images => images.forEach(i => { i.loading = 'eager' }))
        await page.locator('img').evaluateAll(images => Promise.all(images.map(i => i.decode().catch(() => {}))))
        await page.screenshot({ path: `qa-artifacts/${route.slice(1) || 'home'}-${width}.png`, fullPage: true })
      }
    }
  }
  await page.goto(origin + '/cases')
  await page.getByRole('button', { name: /智慧製造/ }).click()
  assert.equal(await page.locator('.case-card').count(), 2)
  await page.getByRole('button', { name: /全部案例/ }).click()
  assert.equal(await page.locator('.case-card').count(), 9)
  await page.goto(origin + '/contact')
  await page.getByRole('textbox', { name: '姓名' }).fill('測試訪客')
  await page.getByRole('textbox', { name: '電子信箱' }).fill('qa@example.com')
  await page.getByRole('textbox', { name: '需求說明' }).fill('想討論 IoT 設備整合需求。')
  await page.getByRole('button', { name: '建立諮詢郵件' }).click()
  const mail = await page.getByRole('link', { name: '開啟郵件程式' }).getAttribute('href')
  assert.ok(mail.startsWith('mailto:Jeff.Tseng@dragon-mile.com?'))
  assert.ok(decodeURIComponent(mail).includes('測試訪客'))
  await page.getByRole('button', { name: '開啟選單' }).click()
  await page.getByRole('link', { name: '關於爵邁', exact: true }).first().waitFor({ state: 'visible' })
  await page.keyboard.press('Escape')
  assert.equal(await page.getByRole('button', { name: '開啟選單' }).getAttribute('aria-expanded'), 'false')
  await page.goto(origin + '/cases/speech-therapy')
  assert.ok((await page.title()).startsWith('語言治療'))
  await page.locator('.gallery-image').first().click()
  assert.ok(await page.locator('.image-viewer').evaluate(el => el.open))
  await page.keyboard.press('Escape')
  assert.ok(!(await page.locator('.image-viewer').evaluate(el => el.open)))
  await page.goto(origin + '/cases/unknown-case')
  assert.ok(await page.getByText('404 / PAGE NOT FOUND').isVisible())
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(origin + '/')
  await page.waitForTimeout(1100)
  assert.ok(Number(await page.locator('h1').evaluate(el => getComputedStyle(el).opacity)) > .95)
  await page.getByRole('link', { name: '案例介紹', exact: true }).first().click()
  await page.locator('.case-card').first().waitFor()
  assert.equal(await page.locator('.case-card').count(), 9)
  await page.goto(origin + '/')
  await page.waitForTimeout(1800)
  await page.screenshot({ path: 'qa-artifacts/home-1440-motion.png' })
  assert.deepEqual(errors, [], 'browser exceptions')
  assert.deepEqual(failed, [], 'failed local requests')
  if (origin.includes('4173')) {
    const staticPage = await browser.newPage({ javaScriptEnabled: false })
    for (const route of [...mainRoutes, ...detailRoutes]) {
      await staticPage.goto(origin + route)
      assert.equal(await staticPage.locator('main h1').count(), 1, `static content ${route}`)
      assert.ok((await staticPage.locator('main').innerText()).length > 100, `static body ${route}`)
    }
    await staticPage.close()
  }
  const report = { passed: true, checked, interactions: ['case category filtering', 'contact email draft', 'mobile menu and Escape', 'image viewer and Escape', 'unknown case fallback', 'normal motion and route navigation'], errors, failed }
  await writeFile('qa-artifacts/report.json', JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
} finally { await browser.close() }
