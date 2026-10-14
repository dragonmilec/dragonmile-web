import { request } from '@playwright/test'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const project = new URL('../', import.meta.url)
const audit = new URL('../../.source-audit/', import.meta.url)
const directory = new URL('public/assets/portfolio/', project)
await mkdir(directory, { recursive: true })
const sourcePath = new URL('CONTENT-SOURCES.json', project)
const provenance = JSON.parse(await readFile(sourcePath, 'utf8'))
const output = {}
const context = await request.newContext()
try {
  for (const [id, slug] of [[3, 'swallow-training'], [4, 'medical-iot']]) {
    const reference = JSON.parse(await readFile(new URL(`dev-portfolio-${id}.json`, audit), 'utf8'))
    const images = [...new Set(reference.images.map(image => image.src))].filter(src => !src.endsWith('/c02.png'))
    output[slug] = {}
    for (const src of images) {
      const url = new URL(src)
      if (url.origin !== 'https://dragonmile.dev' || !url.pathname.startsWith('/images/')) throw new Error('Unexpected image origin')
      const name = path.posix.basename(url.pathname)
      const response = await context.get(src)
      if (!response.ok()) throw new Error(`Failed to fetch ${src}: ${response.status()}`)
      const bytes = await response.body()
      const filename = `${slug}-${name}`
      await writeFile(new URL(filename, directory), bytes)
      output[slug][name] = `/assets/portfolio/${filename}`
      const asset = `portfolio/${filename}`
      if (!provenance.some(entry => entry.asset === asset)) provenance.push({ asset, source: src, page: reference.url })
    }
  }
  await writeFile(new URL('src/portfolio-assets.json', project), JSON.stringify(output, null, 2) + '\n')
  await writeFile(sourcePath, JSON.stringify(provenance, null, 2) + '\n')
  console.log(JSON.stringify(output, null, 2))
} finally { await context.dispose() }
