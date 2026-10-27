import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

// Coverage comes from the original case pages supplied by the user.
const expected = {
  'smart-machine-management': ['儀表板與六大管理功能', '使用者、角色與資料範圍', '重設密碼', '經銷商與廠域歸屬管理', '經銷商 → 廠域 → 使用者權限 → 機台綁定', 'PLC 連線與數據自動上傳', 'SmartMachine_PLC', '開機自啟', '自動重連', '首次登錄', '機台查詢、管理與資料匯出', 'CSV', 'Excel', '機台綁定與組織關聯', '失去原本的組織關聯', '保養排程與信箱提醒', '通知信箱', '下次提醒日期', '水箱水', '濾網', '水塔水槽', '保養紀錄與完成確認', '全部／待保養／已完成', '實際保養完成', '即時數據、歷史趨勢與 AI 預警', 'SV 設定值', '水流量', '泵浦與壓縮機電流', '5 分鐘、10 分鐘或 1 小時', '當次模型預測結果', '實際故障仍須依維修流程確認', '使用紀錄與操作軌跡查詢'],
  'wen-yang-metal': ['儀表板與工作看板', '製程數量與每日明細查詢', '投料／轉入數量', '良品數量', '加工報廢數量', '胚不良已加工數量', '未加工胚繳回數量', '累計待加工數量', '進料與倉庫數量管理', '第一製程站', '機台稼動率與停機紀錄', '整月時數', '停機分鐘', '每日稼動率', '機台排程與加工時程', '所需天數', '作業員績效查詢', '可用工時', '品質失分', '薪資點數', '後處理標準管理', '標準作業時間', '未完成製程', '基礎代碼與原因管理', '客戶需求、勘查與報價作業', '快速捲門報價', '客戶資料與作業資訊整合'],
  'sport-guard': ['運動防護分類入口', '課程瀏覽與自主練習', '問卷評估與狀況記錄', '整合自主運動防護流程', '暖身', '影音操作指引', '01／選擇類別', '04／填寫問卷'],
  'sports-coaches': ['訪客端：教練查詢與瀏覽', '教練端：個人資料建立與管理', '送審機制', '管理端：審核與公開把關', '先建立、後審核、再公開', '一般訪客不需登入', '資格與證明', '已完成個人資料設定 + 已送出審核 + 管理端審核通過', '待教練調整後再次送審'],
  'swallow-training': ['專案資訊與技術整合', 'WebSocket', '家庭、復健中心與語言治療機構', '核心功能總覽', '精準分析與後台整合', '健舌器壓力感測訓練', '壓力曲線', '舌頭體操互動訓練', '教學與使用輔助', '動作辨識與分數評估', '後台管理', '示範教學', '任務難易度調整'],
  'smart-manufacturing': ['資訊收集平台架構規劃', '廠區 Layout 規劃', '線上品檢自動化模組', '導直滾輪補償參數建議模組', '雷射邊緣量測計', '沖壓頭磨耗監控預警模組'],
  'cnc-monitoring': ['馬達電流與震動監控分析軟體', '訊號擷取卡', '維運週期', '壽命分析'],
  'spinal-simulation': ['AI 影像辨識', '2D', '3D', '256 切 X 光掃描', '骨釘建模', '術前模擬與導覽'],
  'medical-iot': ['專案資訊與智能技術', '醫美診所、皮膚科與美容中心', '技術核心', '200 nm', '無針設計', '授權使用機制', '一次性 QR Code 驗證', '200 次', '藥劑補充管理', '雲端精準控制', '噴氣時間', '流速曲線', '智慧雲端校正', '藍牙連線', '施打數據回傳', '雲端參數下載', '使用者帳號管理系統', '設備維護預測'],
  'oral-care': ['相機拍攝與照片上傳', '口腔資料庫', '拍攝者', '被拍攝者', '顯示明細', '刪除', '牙菌斑精準分析', '每日健康趨勢圖表', '多條件搜尋', 'CRUD', '權限與安全控制'],
  'speech-therapy': ['語言治療軟體簡介', '拖曳填空', '語音復送', '仿說練習', '繪本互動', '對話練習', '個人化成長記錄與加強模式', '仁慈與嚴謹機制', '100%', '智能題目切換', '防沉迷與護眼保護機制', '沉浸式互動世界', 'RPG', '獎勵系統', '遊戲商店', '治療師專屬獎勵'],
  'concrete-erp': ['混凝土 ERP 系統架構', '雲端網頁化', '帳號權限管理', '資料可追蹤、分析與回復', '私有資料庫', '第三方雲端資料庫', '總廠分廠管理', '一致的操作介面', '資訊共享', '人性化介面與報表呈現', '修改範本', '廠部功能', '總公司功能', '每日調度輸入', '生成出貨單', '剩退料', '材料耗用追蹤', '應付帳款', '採購流程', '付款管理', '應收帳款', '款項追蹤', '雲端電子發票', '應收票據', '應付票據', '票據列印', '出勤管理', '薪資計算', '銀行連動', '成本追蹤', '成本分析', '預算管理', '總帳', '損益表', '資產負債表', '電子報稅', '系統整合優勢', '需求分析', '系統設計', '系統測試與上線', '第一期規劃', '第二期規劃', '第三期規劃', '仁武廠廠部調度排單系統', '電子簽核', 'Vue.js', 'Node.js', 'REST API', 'MariaDB', '主從複製', '排程備份'],
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
      assert.equal(await page.getByRole('link', { name: '案例參考資料' }).count(), 0)
      const content = await page.locator('.case-summary, .case-story-body').allInnerTexts()
      for (const phrase of phrases) assert.ok(content.join('\n').includes(phrase), `${width}px ${slug}: missing ${phrase}`)
      assert.ok(!content.join('').includes('無意義內文'), 'original placeholder excluded')
      const sections = await page.locator('.case-story-section').count()
      assert.equal(await page.locator('nav[aria-label="案例內容導覽"] a').count(), sections)
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `overflow ${width}px ${slug}`)
      await page.locator('.case-story img').evaluateAll(images => { for (const i of images) i.loading = 'eager'; return Promise.all(images.map(i => i.decode())) })
      if (slug === 'smart-machine-management') {
        const pictures = await page.locator('.case-summary img, .case-story-body img').evaluateAll(images => images.map(img => img.getAttribute('src')))
        const names = ['cover', 'dashboard', 'users', 'user-form', 'dealers', 'sites', 'plc-client', 'machines', 'unbound-machine', 'binding', 'maintenance-settings', 'maintenance-records', 'monitoring', 'data-log', 'usage-records']
        assert.deepEqual(pictures.sort(), names.map(name => `/assets/smart-machine/${name}.png`).sort(), 'all 15 original UI screenshots')
        assert.equal(sections, 10)
        await page.getByRole('link', { name: /使用紀錄與操作軌跡查詢/ }).click()
        await page.waitForTimeout(200)
        const target = await page.locator('#case-usage-records').boundingBox()
        const header = await page.locator('.site-header').boundingBox()
        assert.ok(target.y >= header.height - 2 && target.y < header.height + 60, `machine last anchor ${width}px`)
        await page.locator('#case-usage-records .gallery-image').click()
        assert.ok(await page.locator('.image-viewer').evaluate(el => el.open))
        assert.equal(await page.locator('.image-viewer img').getAttribute('src'), '/assets/smart-machine/usage-records.png')
        await page.keyboard.press('Escape')
        assert.ok(!(await page.locator('.image-viewer').evaluate(el => el.open)))
        if (width === 1440 || width === 390) {
          await page.getByRole('link', { name: /即時數據、歷史趨勢與 AI 預警/ }).click()
          await page.screenshot({ path: `qa-artifacts/case-smart-machine-content-${width}.png` })
          await page.goto(`${origin}/cases/${slug}`)
          await page.screenshot({ path: `qa-artifacts/case-smart-machine-intro-${width}.png` })
        }
      }
      if (slug === 'wen-yang-metal') {
        const pictures = await page.locator('.case-story-body img').evaluateAll(images => images.map(img => img.getAttribute('src')))
        assert.deepEqual(pictures.sort(), ['dashboard', 'consultation', 'survey', 'quickQuote', 'quotation', 'requirements', 'customers'].map(name => `/assets/wen-yang-metal/${name}.png`).sort())
        assert.equal(sections, 10)
        await page.getByRole('link', { name: /客戶資料與作業資訊整合/ }).click()
        await page.waitForTimeout(200)
        const target = await page.locator('#case-customer-data').boundingBox()
        const height = (await page.locator('.site-header').boundingBox()).height
        assert.ok(target.y >= height - 2 && target.y < height + 60, `metal final anchor ${width}px`)
        await page.locator('#case-customer-data .gallery-image').click()
        assert.ok(await page.locator('.image-viewer').evaluate(el => el.open))
        assert.equal(await page.locator('.image-viewer img').getAttribute('src'), '/assets/wen-yang-metal/customers.png')
        await page.keyboard.press('Escape')
        assert.ok(!(await page.locator('.image-viewer').evaluate(el => el.open)))
        if (width === 1440 || width === 390) {
          await page.getByRole('link', { name: /客戶需求、勘查與報價作業/ }).click()
          await page.screenshot({ path: `qa-artifacts/case-wen-yang-metal-content-${width}.png` })
          await page.goto(`${origin}/cases/${slug}`)
          await page.screenshot({ path: `qa-artifacts/case-wen-yang-metal-intro-${width}.png` })
        }
      }
      if (slug === 'concrete-erp') {
        const pictures = await page.locator('.case-story-body img').evaluateAll(images => images.map(img => img.getAttribute('src')))
        assert.equal(pictures.length, 36, 'presentation screenshots')
        assert.equal(new Set(pictures).size, 36, 'each selected presentation image appears once in the article')
        assert.ok(pictures.every(src => src.startsWith('/assets/erp/')), 'ERP images come from the supplied presentation')
        assert.equal(sections, 17, 'ERP module, data, implementation and platform sections')
        assert.equal(await page.locator('.case-summary img').getAttribute('src'), '/assets/erp/dispatch-planning.png')
      }
      if (slug === 'swallow-training' || slug === 'medical-iot') {
        const pictures = await page.locator('.case-summary img, .case-story-body img').evaluateAll(images => images.map(img => img.getAttribute('src')))
        const names = slug === 'swallow-training' ? ['z08.png', ...Array.from({ length: 10 }, (_, i) => `o${String(i + 1).padStart(2, '0')}.png`)] : ['z07.png', 'za1.jpg', 'za2.jpg', 'za3.jpg', 'za4.jpg', 'za5.png', 'za6.jpg', 'za7.jpg']
        assert.deepEqual([...new Set(pictures)].sort(), names.map(name => `/assets/portfolio/${slug}-${name}`).sort(), `reference images ${slug}`)
        assert.ok((await page.locator('.case-summary img').getAttribute('src')).endsWith(slug === 'swallow-training' ? 'z08.png' : 'z07.png'))
      }
      const links = await page.locator('nav[aria-label="案例內容導覽"] a').evaluateAll(anchors => anchors.map(a => a.getAttribute('href')))
      if (slug === 'sport-guard' || slug === 'sports-coaches') {
        const names = slug === 'sport-guard' ? ['entrance', 'questionnaire', 'courses', 'lesson'] : ['home', 'directory', 'profile', 'filters', 'account', 'expertise', 'credentials', 'introduction', 'review']
        const pictures = await page.locator('.case-summary img, .case-story-body img').evaluateAll(images => images.map(img => img.getAttribute('src')))
        assert.deepEqual([...new Set(pictures)].sort(), names.map(name => `/assets/sports/${slug}-${name}.png`).sort(), `supplied screenshots ${slug}`)
        await page.locator('.gallery-image').first().click()
        assert.ok(await page.locator('.image-viewer').evaluate(el => el.open))
        assert.ok((await page.locator('.image-viewer img').getAttribute('src')).startsWith(`/assets/sports/${slug}-`))
        await page.keyboard.press('Escape')
        if (width === 1440 || width === 390) {
          await page.screenshot({ path: `qa-artifacts/case-${slug}-content-${width}.png` })
          await page.goto(`${origin}/cases/${slug}`)
          await page.screenshot({ path: `qa-artifacts/case-${slug}-intro-${width}.png` })
        }
      }
      for (const link of links) assert.equal(await page.locator(link).count(), 1, `toc target ${link}`)
      verified.push({ slug, width, sections, contentCharacters: content.join('').length })
      if (width === 1440 && ['speech-therapy', 'oral-care', 'concrete-erp'].includes(slug)) {
        await page.screenshot({ path: `qa-artifacts/case-${slug}-1440.png` })
        await page.locator('.case-story-section').nth(1).scrollIntoViewIfNeeded()
        await page.screenshot({ path: `qa-artifacts/case-${slug}-content-1440.png` })
      }
      if (width === 390 && slug === 'concrete-erp') {
        await page.screenshot({ path: 'qa-artifacts/case-concrete-erp-intro-390.png' })
        await page.locator('#case-dispatch').scrollIntoViewIfNeeded()
        await page.screenshot({ path: 'qa-artifacts/case-concrete-erp-content-390.png' })
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
  assert.equal(await page.locator('.case-card[href="/cases/smart-machine-management"] img').getAttribute('src'), '/assets/smart-machine/cover.png')
  assert.equal(await page.locator('.case-card[href="/cases/concrete-erp"] img').getAttribute('src'), '/assets/erp/dispatch-planning.png')
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
