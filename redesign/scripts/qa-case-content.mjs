import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

// Coverage comes from the original case pages supplied by the user.
const expected = {
  'swallow-training': ['專案資訊與技術整合', 'WebSocket', '家庭、復健中心與語言治療機構', '核心功能總覽', '精準分析與後台整合', '健舌器壓力感測訓練', '壓力曲線', '舌頭體操互動訓練', '教學與使用輔助', '動作辨識與分數評估', '後台管理', '示範教學', '任務難易度調整'],
  'smart-manufacturing': ['資訊收集平台架構規劃', '廠區 Layout 規劃', '線上品檢自動化模組', '導直滾輪補償參數建議模組', '雷射邊緣量測計', '沖壓頭磨耗監控預警模組'],
  'cnc-monitoring': ['馬達電流與震動監控分析軟體', '訊號擷取卡', '維運週期', '壽命分析'],
  'spinal-simulation': ['AI 影像辨識', '2D', '3D', '256 切 X 光掃描', '骨釘建模', '術前模擬與導覽'],
  'medical-iot': ['專案資訊與智能技術', '醫美診所、皮膚科與美容中心', '技術核心', '200 nm', '無針設計', '授權使用機制', '一次性 QR Code 驗證', '200 次', '藥劑補充管理', '雲端精準控制', '噴氣時間', '流速曲線', '智慧雲端校正', '藍牙連線', '施打數據回傳', '雲端參數下載', '使用者帳號管理系統', '設備維護預測'],
  'oral-care': ['相機拍攝與照片上傳', '口腔資料庫', '拍攝者', '被拍攝者', '顯示明細', '刪除', '牙菌斑精準分析', '每日健康趨勢圖表', '多條件搜尋', 'CRUD', '權限與安全控制'],
  'speech-therapy': ['語言治療軟體簡介', '拖曳填空', '語音復送', '仿說練習', '繪本互動', '對話練習', '個人化成長記錄與加強模式', '仁慈與嚴謹機制', '100%', '智能題目切換', '防沉迷與護眼保護機制', '沉浸式互動世界', 'RPG', '獎勵系統', '遊戲商店', '治療師專屬獎勵'],
  'concrete-erp': ['混凝土 ERP 系統架構', '雲端網頁化', '帳號權限管理', '資料可追蹤、分析與回復', '私有資料庫', '第三方雲端資料庫', '總廠分廠管理', '一致的操作介面', '資訊共享', '人性化介面與報表呈現', '修改範本'],
}
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const origin = process.env.QA_URL || 'http://127.0.0.1:4174'
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
const errors = [], failed = [], verified = []
page.on('pageerror', e => errors.push(e.message))
page.on('response', r => { if (r.status() >= 400 && new URL(r.url()).origin === origin) failed.push(`${r.status()} ${r.url()}`) })
await mkdir('qa-artifacts', { recursive: true })
try {
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const [slug, phrases] of Object.entries(expected)) {
      await page.goto(`${origin}/cases/${slug}`)
      await page.locator('.case-summary').waitFor()
      assert.equal(await page.locator('main h1').count(), 1)
      const content = await page.locator('.case-summary, .case-story-body').allInnerTexts()
      for (const phrase of phrases) assert.ok(content.join('\n').includes(phrase), `${width}px ${slug}: missing ${phrase}`)
      assert.ok(!content.join('').includes('無意義內文'), 'original placeholder excluded')
      const sections = await page.locator('.case-story-section').count()
      assert.equal(await page.locator('nav[aria-label="案例內容導覽"] a').count(), sections)
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `overflow ${width}px ${slug}`)
      await page.locator('.case-story img').evaluateAll(images => { for (const i of images) i.loading = 'eager'; return Promise.all(images.map(i => i.decode())) })
      if (slug === 'swallow-training' || slug === 'medical-iot') {
        const pictures = await page.locator('.case-summary img, .case-story-body img').evaluateAll(images => images.map(img => img.getAttribute('src')))
        const names = slug === 'swallow-training' ? ['z08.png', ...Array.from({ length: 10 }, (_, i) => `o${String(i + 1).padStart(2, '0')}.png`)] : ['z07.png', 'za1.jpg', 'za2.jpg', 'za3.jpg', 'za4.jpg', 'za5.png', 'za6.jpg', 'za7.jpg']
        assert.deepEqual([...new Set(pictures)].sort(), names.map(name => `/assets/portfolio/${slug}-${name}`).sort(), `reference images ${slug}`)
        const url = `https://dragonmile.dev/portfolio/${slug === 'swallow-training' ? 3 : 4}`
        assert.equal(await page.getByRole('link', { name: '案例參考資料' }).getAttribute('href'), url)
        assert.ok((await page.locator('.case-summary img').getAttribute('src')).endsWith(slug === 'swallow-training' ? 'z08.png' : 'z07.png'))
      }
      const links = await page.locator('nav[aria-label="案例內容導覽"] a').evaluateAll(anchors => anchors.map(a => a.getAttribute('href')))
      for (const link of links) assert.equal(await page.locator(link).count(), 1, `toc target ${link}`)
      verified.push({ slug, width, sections, contentCharacters: content.join('').length })
      if (width === 1440 && ['speech-therapy', 'oral-care', 'concrete-erp'].includes(slug)) {
        await page.screenshot({ path: `qa-artifacts/case-${slug}-1440.png` })
        await page.locator('.case-story-section').nth(1).scrollIntoViewIfNeeded()
        await page.screenshot({ path: `qa-artifacts/case-${slug}-content-1440.png` })
      }
      if (width === 390 && slug === 'speech-therapy') {
        await page.locator('#case-drag-fill').scrollIntoViewIfNeeded()
        await page.screenshot({ path: 'qa-artifacts/case-speech-therapy-content-390.png' })
      }
    }
  }
  await page.goto(`${origin}/cases/speech-therapy`)
  await page.getByRole('link', { name: /獎勵系統/ }).click()
  await page.waitForTimeout(200)
  const anchorBounds = await page.locator('#case-rewards').boundingBox()
  const stickyHeight = (await page.locator('.site-header').boundingBox()).height
  assert.ok(anchorBounds.y >= stickyHeight - 2 && anchorBounds.y < stickyHeight + 60, `toc clears measured header: target=${anchorBounds.y}, header=${stickyHeight}`)
  await page.locator('#case-rewards .gallery-image').click()
  assert.ok(await page.locator('.image-viewer').evaluate(el => el.open))
  assert.equal(await page.locator('.image-viewer img').getAttribute('alt'), '遊戲獎勵與商店畫面')
  await page.keyboard.press('Escape')
  assert.ok(!(await page.locator('.image-viewer').evaluate(el => el.open)))
  await page.goto(`${origin}/cases/container-recognition`)
  await page.locator('.case-summary').waitFor()
  assert.ok((await page.locator('.case-story-body').innerText()).includes('貨櫃尺寸'))
  await page.goto(`${origin}/cases/unknown`)
  assert.ok(await page.getByText('404 / PAGE NOT FOUND').isVisible())
  await page.goto(`${origin}/cases`)
  for (const [slug, cover] of [['swallow-training', 'z08.png'], ['medical-iot', 'z07.png']]) {
    assert.equal(await page.locator(`.case-card[href="/cases/${slug}"] img`).getAttribute('src'), `/assets/portfolio/${slug}-${cover}`)
  }

  const staticPage = await browser.newPage({ javaScriptEnabled: false })
  for (const [slug, phrases] of Object.entries(expected)) {
    await staticPage.goto(`${origin}/cases/${slug}`)
    const content = await staticPage.locator('.case-summary, .case-story-body').allInnerTexts()
    for (const phrase of phrases) assert.ok(content.join('\n').includes(phrase), `static ${slug}: missing ${phrase}; title=${await staticPage.title()}; content=${content.join('\n').slice(0, 250)}`)
  }
  await staticPage.close()
  assert.deepEqual(errors, [], 'browser errors')
  assert.deepEqual(failed, [], 'HTTP errors')
  const report = { passed: true, verified, noJavaScript: Object.keys(expected), interactions: ['case navigation anchors', 'captioned image viewer', 'Escape dismissal', 'other case fallback', 'unknown case 404'], errors, failed }
  await writeFile('qa-artifacts/case-content-report.json', JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
} finally { await browser.close() }
