import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const origin = process.env.QA_URL || 'http://127.0.0.1:5175'
await mkdir('qa-artifacts', { recursive: true })
const checks = [], errors = []
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
  const page = await context.newPage()
  page.on('pageerror', error => errors.push(error.message))
  await context.addInitScript(() => {
    window.__descending = []
    let started = false
    const sample = () => {
      const root = document.querySelector('.opening-hero')
      if (root?.dataset.openingState === 'playing') started = true
      const panel = root?.querySelector('.showcase-panel.is-active')
      if (panel && new DOMMatrix(getComputedStyle(panel).transform).m42 < -5) window.__descending.push(root.dataset.activeStep)
      if (!started || root?.dataset.openingState !== 'settled') requestAnimationFrame(sample)
    }
    requestAnimationFrame(sample)
  })
  await page.goto(origin)
  const rowHeight = await page.locator('.opening-hero').evaluate(node => parseFloat(getComputedStyle(node).getPropertyValue('--showcase-row')))
  for (const step of [1,2,3,4]) {
    await page.waitForFunction(step => document.querySelector('.opening-hero')?.dataset.activeStep === String(step), step)
    await page.waitForTimeout(1000)
    const expanded = page.locator('.showcase-panel.is-active')
    assert.equal(await expanded.count(), 1)
    assert.equal(await page.locator('.showcase-panel[data-visible="true"]').count(), step)
    const geometry = await page.locator('.showcase-panel[data-visible="true"]').evaluateAll(nodes => nodes.map(node => ({active: node.classList.contains('is-active'), y:node.getBoundingClientRect().y, height:node.getBoundingClientRect().height})))
    const active = geometry.find(item => item.active)
    for (const item of geometry.filter(item => !item.active)) { assert.ok(Math.abs(item.height-rowHeight)<1); assert.ok(item.y >= active.y+active.height-1) }
    if (step < 4) assert.ok(await expanded.evaluate(node => getComputedStyle(node).transform === 'none'))
    await page.screenshot({ path: 'qa-artifacts/opening-step-'+step+'.png' })
  }
  await page.waitForFunction(() => document.querySelector('.opening-hero')?.dataset.openingState === 'settled')
  assert.deepEqual(await page.evaluate(() => [...new Set(window.__descending)]), ['1','2','3','4'])
  checks.push('four sequential stages, incoming top-down motion, previous panels compact below')
  const showcase = await page.locator('.hero-showcase').boundingBox()
  for (const index of [0,2,1,3,0]) {
    await page.locator('.showcase-toggle').nth(index).click()
    await page.waitForTimeout(1000)
    assert.equal(await page.locator('.showcase-toggle[aria-expanded="true"]').count(),1)
    assert.equal(await page.locator('.showcase-toggle').nth(index).getAttribute('aria-expanded'),'true')
    const expanded = await page.locator('.showcase-panel.is-active').boundingBox()
    assert.ok(Math.abs(expanded.height-(showcase.height-3*rowHeight))<1)
    assert.equal(await page.locator('.showcase-panel.is-collapsed').count(),3)
  }
  checks.push('all four panels can reopen at identical size, exactly one open, other three compact')
  await page.getByRole('button',{name:'放大圖片：台泥鳳勝 ERP 供應商',exact:true}).click()
  assert.ok(await page.locator('.credential-viewer').evaluate(node=>node.open))
  await page.keyboard.press('Escape')
  assert.ok(!(await page.locator('.credential-viewer').evaluate(node=>node.open)))
  await page.locator('.showcase-toggle').nth(3).click()
  await page.waitForTimeout(950)
  await page.getByRole('link',{name:'查看 CNC 機台監控案例',exact:true}).click()
  await page.waitForURL('**/cases/cnc-monitoring')
  checks.push('image viewer, Escape and project navigation')
  await page.goto(origin)
  await page.waitForFunction(() => document.querySelector('.opening-hero')?.dataset.openingState === 'playing')
  assert.equal(await page.locator('.opening-hero').getAttribute('data-active-step'),'1')
  await page.reload()
  await page.waitForFunction(() => document.querySelector('.opening-hero')?.dataset.openingState === 'playing')
  assert.equal(await page.locator('.opening-hero').getAttribute('data-active-step'),'1')
  await page.getByRole('link',{name:'探索我們的服務',exact:true}).click()
  await page.waitForURL('**/services')
  await page.getByRole('link',{name:'爵邁 Dragon Mile 首頁',exact:true}).click()
  await page.waitForFunction(() => document.querySelector('.opening-hero')?.dataset.openingState === 'playing')
  assert.equal(await page.locator('.opening-hero').getAttribute('data-active-step'),'1')
  checks.push('opening replays on every home navigation and reload')
  await context.close()
  for (const [width,height] of [[1280,665],[1024,768],[768,1024],[390,844],[320,568]]) {
    const ctx = await browser.newContext({ viewport:{width,height}, reducedMotion:'reduce' })
    const p = await ctx.newPage()
    p.on('pageerror', error => errors.push(error.message))
    await p.goto(origin)
    assert.equal(await p.locator('.opening-hero').getAttribute('data-active-step'),'4')
    assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1))
    await p.locator('.showcase-toggle').nth(1).click()
    assert.equal(await p.locator('.showcase-toggle').nth(1).getAttribute('aria-expanded'),'true')
    await p.locator('.showcase-media img').nth(1).evaluate(img=>img.decode())
    await p.screenshot({path:'qa-artifacts/opening-responsive-'+width+'.png',fullPage:false})
    checks.push(width+'px reduced motion, no overflow, manual expansion')
    await ctx.close()
  }
  if (origin.includes('417')) {
    const ctx = await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:900}})
    const p=await ctx.newPage(); await p.goto(origin)
    assert.equal(await p.locator('.showcase-panel').count(),4)
    assert.ok(await p.locator('.showcase-panel.is-active').evaluate(node=>node.classList.contains('project')))
    assert.ok(await p.getByRole('link',{name:'查看 CNC 機台監控案例'}).isVisible())
    await ctx.close();checks.push('static HTML retains project link and all credential titles')
  }
  assert.deepEqual(errors,[])
  await writeFile('qa-artifacts/opening-report.json',JSON.stringify({checks,errors},null,2))
  console.log(JSON.stringify({checks,errors},null,2))
} finally { await browser.close() }
