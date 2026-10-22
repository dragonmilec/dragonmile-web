import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true})
const origin=process.env.QA_URL || 'http://127.0.0.1:5175'
const slugs=['cnc-monitoring','smart-machine-management','sports-coaches','concrete-erp']
const checks=[],errors=[]
await mkdir('qa-artifacts',{recursive:true})
try {
 for(const width of [1440,390,320]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'})
  page.on('pageerror',e=>errors.push(e.message))
  await page.goto(origin)
  const carousel=page.locator('.hero-projects')
  assert.ok((await page.locator('.showcase-toggle').nth(3).innerText()).includes('專案展示'))
  for(let i=0;i<slugs.length;i++) {
   assert.equal(await carousel.getAttribute('data-project'),slugs[i])
   await page.waitForFunction(slug=>document.querySelector('.hero-projects a.showcase-project')?.getAttribute('href')==='/cases/'+slug,slugs[i])
   assert.equal(await carousel.locator('a.showcase-project').getAttribute('href'),'/cases/'+slugs[i])
   await carousel.locator('img').evaluate(img=>img.decode())
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1))
   const panel=await page.locator('.showcase-panel.is-active').boundingBox()
   const controls=await page.locator('.project-toolbar').boundingBox()
   assert.ok(controls.y>=panel.y && controls.y+controls.height<=panel.y+panel.height+1)
   if(i===1) { await carousel.scrollIntoViewIfNeeded(); await page.screenshot({path:'qa-artifacts/projects-'+width+'.png'}) }
   await page.getByRole('button',{name:'下一個專案',exact:true}).click()
  }
  assert.equal(await carousel.getAttribute('data-project'),slugs[0])
  await page.getByRole('button',{name:'上一個專案',exact:true}).click()
  assert.equal(await carousel.getAttribute('data-project'),slugs[3])
  await page.waitForFunction(()=>document.querySelector('.hero-projects a.showcase-project')?.getAttribute('href')==='/cases/concrete-erp')
  await carousel.locator('a.showcase-project').click()
  await page.waitForURL('**/cases/concrete-erp')
  checks.push(width+'px: four projects, matching images and links, previous/next wrap, controls fit')
  await page.close()
 }
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'})
 page.on('pageerror',e=>errors.push(e.message))
 await page.goto(origin)
 await page.locator('.showcase-toggle').nth(3).click()
 await page.locator('.hero-projects').scrollIntoViewIfNeeded()
 await page.mouse.move(0,0)
 await page.waitForFunction(()=>document.querySelector('.hero-projects')?.dataset.project==='smart-machine-management',{},{timeout:7500})
 await page.waitForTimeout(800)
 await page.locator('.hero-projects').hover()
 await page.waitForTimeout(5300)
 assert.equal(await page.locator('.hero-projects').getAttribute('data-project'),'smart-machine-management')
 await page.getByRole('button',{name:'暫停專案輪播',exact:true}).click()
 await page.mouse.move(0,0)
 await page.waitForTimeout(5300)
 assert.equal(await page.locator('.hero-projects').getAttribute('data-project'),'smart-machine-management')
 await page.getByRole('button',{name:'下一個專案',exact:true}).click()
 await page.waitForTimeout(800)
 assert.equal(await page.locator('.hero-projects').getAttribute('data-project'),'sports-coaches')
 checks.push('autoplay advances after five seconds; hover, pause and manual navigation work')
 assert.deepEqual(errors,[])
 console.log(JSON.stringify({checks,errors},null,2))
}finally{await browser.close()}
