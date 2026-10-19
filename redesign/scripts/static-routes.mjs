import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createServer } from 'vite'
const root = new URL('../dist/', import.meta.url)
const html = await readFile(new URL('index.html', root), 'utf8')
const routes = {
  about: '關於爵邁', services: '服務項目', cases: '案例介紹', clients: '我們的客戶', contact: '聯絡我們',
  'services/app': '應用程式開發', 'services/database': '資料庫解決方案', 'services/iot': '物聯網整合', 'services/pcb': '電路與 PCB 設計',
  'cases/smart-manufacturing': '工業控制・智慧生產', 'cases/cnc-monitoring': 'CNC 機台監控',
  'cases/swallow-training': '吞嚥賦能體感訓練遊戲', 'cases/oral-care': '智慧口腔暨吞嚥賦能照護雲管家',
  'cases/speech-therapy': '語言治療', 'cases/spinal-simulation': '脊髓術前模擬', 'cases/medical-iot': '醫療・物聯網醫美',
  'cases/sport-guard': '自主運動防護管理系統', 'cases/sports-coaches': '運動醫學健身指導人力資源庫',
  'cases/concrete-erp': '混凝土・客製化 ERP', 'cases/container-recognition': '貨櫃港口辨識',
  'cases/wen-yang-metal': '穩揚金屬・生產與服務管理',
  'cases/smart-machine-management': '智慧機台管理系統',
}
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
const { render } = await server.ssrLoadModule('/src/entry-server.ts')
const { cases, services, company } = await server.ssrLoadModule('/src/data.ts')
const home = await render('/')
await writeFile(new URL('index.html', root), html.replace('<div id="app"></div>', `<div id="app">${home}</div>`))
for (const [path, title] of Object.entries(routes)) {
  const directory = new URL(`${path}/`, root)
  await mkdir(directory, { recursive: true })
  const content = await render('/' + path)
  const detail = path.startsWith('cases/') ? cases.find(item => item.slug === path.split('/')[1]) : path.startsWith('services/') ? services.find(item => item.slug === path.split('/')[1]) : undefined
  const description = (detail?.description ?? company.description).replaceAll('&', '&amp;').replaceAll('"', '&quot;')
  const rendered = html.replace(/<title>.*?<\/title>/, `<title>${title}｜爵邁有限公司 Dragon Mile</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`).replace('<div id="app"></div>', `<div id="app">${content}</div>`)
  await writeFile(new URL('index.html', directory), rendered)
  // Cover hosts that resolve clean URLs via .html instead of folder indexes.
  await writeFile(new URL(`${path}.html`, root), rendered)
}
const missing = await render('/404')
await writeFile(new URL('404.html', root), html.replace(/<title>.*?<\/title>/, '<title>找不到頁面｜爵邁有限公司 Dragon Mile</title>').replace('<div id="app"></div>', `<div id="app">${missing}</div>`))
await writeFile(new URL('_redirects', root), '/* /index.html 200\n')
console.log(`Generated ${Object.keys(routes).length + 1} static route entries.`)
} finally { await server.close() }
