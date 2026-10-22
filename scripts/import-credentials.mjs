import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises'

const certificateSource = process.argv[2]
const awardSource = process.argv[3]
if (!certificateSource || !awardSource) throw new Error('Provide the certificate scan and award image paths.')
await mkdir('public/assets/credentials', { recursive: true })
await copyFile(certificateSource, 'public/assets/credentials/certificate-2026-original.jpg')
await copyFile(awardSource, 'public/assets/credentials/rd-100-awards.jpg')
// Keep the scan's raster pixels unchanged. A native SVG wrapper presents the
// sideways original upright, including when opened directly from the document.
const jpeg = (await readFile(certificateSource)).toString('base64')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1247" height="867" viewBox="0 0 1247 867"><title>爵邁有限公司技術服務機構服務能量登錄證書，2026–2028</title><image width="867" height="1247" transform="translate(0 867) rotate(-90)" href="data:image/jpeg;base64,${jpeg}"/></svg>\n`
await writeFile('public/assets/credentials/certificate-2026.svg', svg)
const sources = JSON.parse(await readFile('CONTENT-SOURCES.json', 'utf8'))
for (const entry of [
  { asset: 'credentials/certificate-2026-original.jpg', source: '使用者提供：Scan_2026_10_19_172806.jpg', page: '2026 年新版技術服務機構服務能量登錄證書' },
  { asset: 'credentials/certificate-2026.svg', source: 'credentials/certificate-2026-original.jpg', page: '以 SVG 轉正呈現，嵌入未修改的原始掃描像素' },
  { asset: 'credentials/rd-100-awards.jpg', source: '使用者提供：名片資料夾/R-and-D-100-Awards.jpg', page: '首頁競賽優勝實績圖片' },
]) {
  if (!sources.some(item => item.asset === entry.asset)) sources.push(entry)
}
await writeFile('CONTENT-SOURCES.json', JSON.stringify(sources, null, 2) + '\n')
console.log('Imported original scan, upright SVG document and R&D 100 image.')
