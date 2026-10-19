import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const sourceRoot = process.argv[2]
if (!sourceRoot) throw new Error('Provide the supplied metal project folder.')
const pictures = {
  dashboard: '螢幕擷取畫面 2026-10-15 155455.png',
  consultation: '螢幕擷取畫面 2026-10-15 155502.png',
  survey: '螢幕擷取畫面 2026-10-15 155509.png',
  quickQuote: '螢幕擷取畫面 2026-10-15 155516.png',
  quotation: '螢幕擷取畫面 2026-10-15 155524.png',
  requirements: '螢幕擷取畫面 2026-10-15 155532.png',
  customers: '螢幕擷取畫面 2026-10-15 155543.png',
}
await mkdir('public/assets/wen-yang-metal', { recursive: true })
await mkdir('references/wen-yang-metal', { recursive: true })
await copyFile(path.join(sourceRoot, '穩楊金屬專案介紹.txt'), 'references/wen-yang-metal/project-introduction.txt')
const assets = {}, sources = JSON.parse(await readFile('CONTENT-SOURCES.json', 'utf8'))
for (const [key, original] of Object.entries(pictures)) {
  const local = `wen-yang-metal/${key}.png`
  await copyFile(path.join(sourceRoot, original), `public/assets/${local}`)
  assets[key] = `/assets/${local}`
  if (!sources.some(source => source.asset === local)) sources.push({ asset: local, source: `使用者提供：穩楊金屬專案介紹/${original}`, page: 'references/wen-yang-metal/project-introduction.txt' })
}
await writeFile('src/metal-assets.json', JSON.stringify(assets, null, 2) + '\n')
await writeFile('CONTENT-SOURCES.json', JSON.stringify(sources, null, 2) + '\n')
console.log('Imported 7 original screenshots and the supplied project introduction.')
