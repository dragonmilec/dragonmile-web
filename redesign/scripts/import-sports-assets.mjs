import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

// Import the client's supplied documents and original screenshots unchanged.
const sourceRoot = process.argv[2]
if (!sourceRoot) throw new Error('Provide the supplied reference folder path.')
const projects = [
  { slug: 'sport-guard', folder: '自主運動防護管理系統', images: {
    entrance: '螢幕擷取畫面 2026-10-14 164356.png',
    questionnaire: '螢幕擷取畫面 2026-10-14 164415.png',
    courses: '螢幕擷取畫面 2026-10-14 164430.png',
    lesson: '螢幕擷取畫面 2026-10-14 170751.png',
  } },
  { slug: 'sports-coaches', folder: '運動醫學健身指導人力', images: {
    profile: '0bda0d7f-8924-43de-8602-3d59a37f2e32.png',
    expertise: '教練設定2.png',
    credentials: '教練設定3.png',
    introduction: '教練設定4.png',
    directory: '繁中健身教練一覽平台.png',
    account: '運動醫學人力資源庫個人檔案.png',
    filters: '選擇篩選.png',
    home: '首頁.png',
    review: '首頁2.png',
  } },
]
const assets = {}, sources = JSON.parse(await readFile('CONTENT-SOURCES.json', 'utf8'))
await mkdir('public/assets/sports', { recursive: true })
await mkdir('references/sports', { recursive: true })
for (const project of projects) {
  assets[project.slug] = {}
  await copyFile(path.join(sourceRoot, project.folder, '網站介紹.txt'), `references/sports/${project.slug}.txt`)
  for (const [key, original] of Object.entries(project.images)) {
    const local = `sports/${project.slug}-${key}.png`
    await copyFile(path.join(sourceRoot, project.folder, original), `public/assets/${local}`)
    assets[project.slug][key] = `/assets/${local}`
    if (!sources.some(source => source.asset === local)) sources.push({ asset: local, source: `使用者提供：網頁的參考資料/${project.folder}/${original}`, page: `references/sports/${project.slug}.txt` })
  }
}
await writeFile('src/sports-assets.json', JSON.stringify(assets, null, 2) + '\n')
await writeFile('CONTENT-SOURCES.json', JSON.stringify(sources, null, 2) + '\n')
console.log('Imported 13 screenshots and 2 source documents.')
