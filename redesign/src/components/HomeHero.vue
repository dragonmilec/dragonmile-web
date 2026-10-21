<script setup lang="ts">
import { computed, inject, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useEventListener, usePreferredReducedMotion } from '@vueuse/core'
import { ArrowUpRight, ArrowDown, Plus, Minus, X } from 'lucide-vue-next'
import gsap from 'gsap'
import { cases, certificate } from '../data'
import erpImages from '../erp-assets.json'
import HeroProjects from './HeroProjects.vue'
import { qualification, openQualificationKey } from '../qualification'

const showQualification = inject(openQualificationKey)

const credentials = [
  { number: '01', title: '台泥鳳勝 ERP 供應商', description: '企業資源規劃・跨廠整合', image: erpImages['daily-dispatch'], alt: '混凝土 ERP 操作畫面示意', kind: 'erp', to: '/cases/concrete-erp' },
  { number: '02', title: '科技輔導廠商', description: `${qualification.issuer}登錄`, image: certificate, alt: '2026–2028 技術服務機構服務能量登錄證書', kind: 'certificate', to: '/about#qualification' },
  { number: '03', title: '科技競賽優勝', description: 'R&D 100 Awards', image: '/assets/credentials/rd-100-awards.jpg', alt: '使用者提供的 R&D 100 Awards 圖片', kind: 'award', to: '' },
  { number: '04', title: '專案展示', description: 'PROJECT SHOWCASE', image: cases.find(item => item.slug === 'cnc-monitoring')!.cover, alt: '專案展示', kind: 'project', to: '/cases' },
]
const root = ref<HTMLElement>()
const active = ref(3)
const revealed = ref(4)
const playing = ref(false)
const reduced = usePreferredReducedMotion()
const collapsed = computed(() => Array.from({ length: revealed.value }, (_, i) => i).reverse().filter(i => i !== active.value))
const viewer = ref<HTMLDialogElement>()
const selectedImage = ref(credentials[0]!)
let returnFocus: HTMLElement | undefined
let timer: ReturnType<typeof setTimeout> | undefined
let motion: gsap.core.Tween | undefined
let disposed = false

function stop() { clearTimeout(timer); motion?.kill(); motion = undefined; playing.value = false }
function finish() {
  stop()
  active.value = 3
  revealed.value = 4
  if (root.value) gsap.set(root.value.querySelectorAll('.showcase-panel'), { clearProps: 'transform,clipPath' })
}
async function enter(index: number) {
  active.value = index
  revealed.value = index + 1
  await nextTick()
  if (disposed || !playing.value) return
  const panel = root.value?.querySelectorAll<HTMLElement>('.showcase-panel')[index]
  if (panel) motion = gsap.fromTo(panel, { yPercent: -100, clipPath: 'inset(0 0 100% 0)' }, {
    yPercent: 0, clipPath: 'inset(0 0 0% 0)', duration: .85, ease: 'power3.inOut', clearProps: 'transform,clipPath',
  })
  timer = setTimeout(() => {
    if (index < 3) void enter(index + 1)
    else stop()
  }, index === 3 ? 900 : 2350)
}
function select(index: number) {
  stop()
  revealed.value = 4
  if (root.value) gsap.set(root.value.querySelectorAll('.showcase-panel'), { clearProps: 'transform,clipPath' })
  active.value = index
}
function openCertificate(event: Event) {
  select(1)
  showQualification?.(event.currentTarget as HTMLElement)
}
function panelStyle(index: number) {
  return { '--slot': Math.max(0, collapsed.value.indexOf(index)), zIndex: active.value === index ? 5 : 4 - index }
}
async function openImage(index: number, event: Event) {
  select(index)
  selectedImage.value = credentials[index]!
  returnFocus = event.currentTarget as HTMLElement
  await nextTick()
  viewer.value?.showModal()
}
function closeImage() { viewer.value?.close(); returnFocus?.focus({ preventScroll: true }) }

onMounted(() => {
  delete document.documentElement.dataset.credentialsOpening
  if (reduced.value === 'reduce' || location.hash) return
  playing.value = true
  void enter(0)
})
useEventListener(typeof document === 'undefined' ? undefined : document, 'visibilitychange', () => { if (document.hidden && playing.value) finish() })
watch(reduced, value => { if (value === 'reduce') finish() })
onUnmounted(() => { disposed = true; stop(); viewer.value?.close(); delete document.documentElement.dataset.credentialsOpening })
</script>

<template>
  <section ref="root" class="home-hero opening-hero container" :data-opening-state="playing ? 'playing' : 'settled'" :data-active-step="active + 1">
    <div class="hero-topline"><span class="eyebrow"><i class="status-dot" /> ENGINEERING CONNECTIONS</span><span class="eyebrow opening-location">KAOHSIUNG, TAIWAN · EST. 2019</span></div>
    <div class="opening-grid">
      <div class="opening-copy">
        <p class="opening-kicker">軟硬體整合・專業技術服務</p>
        <h1>整合技術，<br />讓想法<span class="accent">落地。</span></h1>
        <div class="opening-intro"><p>從應用程式到電路設計，<br />連結軟體、資料與設備，回應每一個真實需求。</p><RouterLink to="/services" class="button">探索我們的服務 <ArrowUpRight :size="19" /></RouterLink></div>
      </div>
      <section class="hero-showcase" aria-label="企業實績與專案介紹" :style="{ '--collapsed-count': revealed - 1 }">
        <article v-for="(item, index) in credentials" :key="item.number" class="showcase-panel" :class="[{ 'is-active': active === index, 'is-collapsed': active !== index }, item.kind]" :data-visible="index < revealed" :style="panelStyle(index)" :inert="index >= revealed">
          <h2 class="showcase-heading">
            <button :id="`showcase-trigger-${index}`" class="showcase-toggle" :aria-expanded="active === index" :aria-controls="`showcase-content-${index}`" @click="select(index)">
              <span class="showcase-number">{{ item.number }}</span><span class="showcase-title">{{ item.title }}</span><Minus v-if="active === index" :size="16" /><Plus v-else :size="16" />
            </button>
          </h2>
          <div :id="`showcase-content-${index}`" class="showcase-content" role="region" :aria-labelledby="`showcase-trigger-${index}`" :inert="active !== index" :aria-hidden="active !== index">
            <div v-if="item.kind !== 'project'" class="showcase-detail">
              <div><span class="eyebrow">SELECTED CREDENTIALS</span><h3>{{ item.title }}</h3><p>{{ item.description }}</p><p v-if="item.kind === 'certificate'" class="showcase-validity">{{ qualification.registeredAt.slice(0, 4) }}–{{ qualification.validUntil.slice(0, 4) }} 登錄證書</p></div>
              <button v-if="item.kind === 'certificate'" class="text-link" aria-haspopup="dialog" aria-controls="qualification-certificate-dialog" @click="openCertificate">查看資格 <ArrowUpRight :size="17" /></button>
              <RouterLink v-else-if="item.to" :to="item.to" class="text-link">了解專案 <ArrowUpRight :size="17" /></RouterLink>
              <button v-else class="text-link" @click="openImage(index, $event)">檢視圖片 <ArrowUpRight :size="17" /></button>
            </div>
            <button v-if="item.kind !== 'project'" class="showcase-media" :aria-label="`放大圖片：${item.title}`" @click="openImage(index, $event)">
              <img :src="item.image" :alt="item.alt" loading="eager" />
              <span v-if="item.kind === 'erp'" class="showcase-image-note">畫面示意</span><ArrowUpRight class="showcase-image-arrow" :size="22" :stroke-width="1.2" />
            </button>
            <HeroProjects v-else :enabled="active === index && !playing" />
          </div>
        </article>
      </section>
    </div>
    <div class="hero-bottom"><span>APP DEVELOPMENT <span>/</span> DATABASE <span>/</span> IoT <span>/</span> SCHEMATIC & PCB</span><a href="#introduction">向下探索 <ArrowDown :size="15" /></a></div>
    <dialog ref="viewer" class="image-viewer credential-viewer" aria-label="企業實績圖片檢視" data-lenis-prevent @cancel.prevent="closeImage" @click="closeImage"><button aria-label="關閉實績圖片" @click="closeImage"><X :size="24" /></button><img :src="selectedImage.image" :alt="selectedImage.alt" @click.stop /><p>{{ selectedImage.title }}<span v-if="selectedImage.kind === 'erp'">・ERP 操作畫面示意</span></p></dialog>
  </section>
</template>

<style>
.opening-hero { --showcase-row: 44px; }
.opening-hero .hero-topline { padding: 25px 0; }
.opening-grid { display: grid; grid-template-columns: .95fr 1.05fr; gap: 58px; min-height: 470px; height: clamp(470px, calc(100svh - var(--site-header-height,149px) - 125px), 650px); }
.opening-copy { padding-top: 30px; display: flex; flex-direction: column; align-items: flex-start; }
.opening-kicker { font-size: 11px; color: var(--steel); letter-spacing: .1em; margin-bottom: 35px; }
.opening-copy h1 { font-size: clamp(50px,5vw,72px); line-height: 1.4; letter-spacing: -.055em; }
.opening-intro { margin-top: 35px; }
.opening-intro > p { font-size: 15px; line-height: 1.9; color: var(--muted); margin-bottom: 27px; }
.hero-showcase { position: relative; min-width: 0; height: 100%; overflow: hidden; --expanded-height: calc(100% - var(--showcase-row) * var(--collapsed-count)); }
.showcase-panel { position: absolute; left: 0; width: 100%; background: var(--paper); overflow: hidden; transition: top .85s cubic-bezier(.65,0,.25,1), height .85s cubic-bezier(.65,0,.25,1); }
.showcase-panel[data-visible="false"] { visibility: hidden; pointer-events: none; }
.showcase-panel.is-active { top: 0; height: var(--expanded-height); }
.showcase-panel.is-collapsed { top: calc(var(--expanded-height) + var(--slot) * var(--showcase-row)); height: var(--showcase-row); }
.showcase-panel[data-visible="false"] { top: 0; height: var(--expanded-height); }
.showcase-heading { height: var(--showcase-row); margin: 0; border-top: 1px solid var(--line); }
.showcase-toggle { display: flex; align-items: center; gap: 16px; width: 100%; height: 100%; padding: 0 12px 0 3px; text-align: left; }
.showcase-toggle:hover { color: var(--steel); }
.showcase-toggle:focus-visible { outline-offset: -3px; }
.showcase-number { font: 11px/1 Arial,sans-serif; color: var(--steel); letter-spacing: .1em; }
.showcase-title { font-size: 14px; font-weight: 500; letter-spacing: .025em; }
.showcase-toggle > svg { margin-left: auto; flex-shrink: 0; color: var(--steel); }
.showcase-content { position: relative; display: grid; grid-template-columns: .65fr 1.35fr; gap: 24px; height: calc(100% - var(--showcase-row)); padding: 22px 0 28px; transition: opacity .3s; }
.is-collapsed .showcase-content { opacity: 0; pointer-events: none; }
.showcase-detail { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 30px; min-width: 0; }
.showcase-detail .eyebrow { display: block; font-size: 8px; line-height: 1.4; color: var(--steel); }
.showcase-detail h3 { font-size: 28px; line-height: 1.6; letter-spacing: -.025em; margin-top: 14px; text-wrap: balance; }
.showcase-detail p { font-size: 12px; color: var(--muted); margin-top: 12px; }
.showcase-detail .showcase-validity { font-size: 11px; line-height: 1.7; }
.showcase-detail .text-link { font-size: 12px; gap: 15px; }
.showcase-media { position: relative; height: 100%; min-height: 0; width: 100%; padding: 0; overflow: hidden; background: #e9eae6 !important; }
.showcase-media img { width: 100%; height: 100%; object-fit: contain; }
.showcase-panel.certificate .showcase-media { background: #fff !important; }
.showcase-panel.certificate .showcase-media img { padding: 12px; }
.showcase-panel.erp .showcase-media img { object-fit: cover; object-position: left center; }
.showcase-image-note { position: absolute; bottom: 10px; left: 10px; padding: 3px 7px; background: var(--paper); color: var(--steel); font-size: 10px; }
.showcase-image-arrow { position: absolute; top: 12px; right: 12px; color: var(--steel); }
.showcase-panel.project .showcase-content { display: block; padding: 0; }
.opening-hero .showcase-project { height: 100%; min-height: 0; margin: 0; display: block; }
.showcase-project img { width: 100%; height: 100%; object-fit: cover; }
.showcase-project .hero-image-top { top: 25px; }
.opening-hero .hero-bottom { margin-top: 25px; padding-block: 18px 20px; }
.credential-viewer > img { display: block; width: auto; max-width: 85vw; height: auto; margin: auto; }
.credential-viewer > p { margin-top: 13px; font-size: 12px; color: var(--steel); }
html[data-credentials-opening="pending"] .showcase-panel { visibility: hidden; }
@media(max-width:1100px) and (min-width:761px) {
  .opening-grid { gap: 30px; grid-template-columns: .9fr 1.1fr; }
  .opening-copy h1 { font-size: 49px; }
  .opening-intro > p { font-size: 13px; }
  .showcase-content { gap: 16px; }
  .showcase-detail h3 { font-size: 23px; }
}
@media(max-height:740px) and (min-width:761px) {
  .opening-grid { height: 450px; min-height: 450px; }
  .opening-copy { padding-top: 20px; }
  .opening-kicker { margin-bottom: 24px; }
  .opening-copy h1 { font-size: 57px; }
  .opening-intro { margin-top: 25px; }
  .opening-intro > p { font-size: 14px; margin-bottom: 22px; }
}
@media(max-width:760px) {
  .opening-hero { --showcase-row: 42px; }
  .opening-hero .hero-topline { padding: 18px 0; }
  .opening-hero .hero-topline .eyebrow { font-size: 7px; letter-spacing: .05em; }
  .opening-location { max-width: 116px; text-align: right; }
  .opening-grid { grid-template-columns: minmax(0,1fr); gap: 30px; height: auto; min-height: 0; }
  .opening-copy { padding-top: 10px; }
  .opening-kicker { font-size: 10px; margin-bottom: 20px; }
  .opening-copy h1 { font-size: clamp(40px,10.8vw,58px); line-height: 1.3; }
  .opening-intro { margin-top: 23px; }
  .opening-intro > p { font-size: 14px; margin-bottom: 20px; }
  .opening-intro .button { min-height: 44px; padding: 11px 16px; font-size: 12px; }
  .hero-showcase { height: clamp(420px,110vw,520px); }
  .showcase-content { grid-template-columns: .8fr 1.2fr; gap: 16px; padding: 15px 0 20px; }
  .showcase-detail { gap: 14px; min-height: 0; }
  .showcase-title { font-size: 13px; }
  .showcase-detail h3 { font-size: 22px; line-height: 1.4; }
  .showcase-detail p { font-size: 11px; line-height: 1.7; }
  .showcase-detail .eyebrow { font-size: 7px; letter-spacing: .04em; }
  .showcase-detail .text-link { font-size: 11px; gap: 9px; }
  .opening-hero .hero-bottom { margin-top: 22px; padding-block: 15px; }
  .opening-hero .hero-bottom > span { display: none; }
  .opening-hero .hero-bottom { justify-content: flex-end; }
}
@media(prefers-reduced-motion:reduce) {
  .showcase-panel, .showcase-content { transition: none; }
}
</style>
