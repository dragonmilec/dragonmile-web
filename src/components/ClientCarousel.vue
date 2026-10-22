<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useDocumentVisibility, useIntersectionObserver, usePreferredReducedMotion, useRafFn, useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { ArrowUpRight, Pause, Play, X } from 'lucide-vue-next'
import { clients } from '../data'

const section = ref<HTMLElement>()
const viewport = ref<HTMLElement>()
const track = ref<HTMLElement>()
const group = ref<HTMLElement>()
const dialog = ref<HTMLDialogElement>()
const expanded = ref(false)
const paused = ref(false)
const hovered = ref(false)
const focused = ref(false)
const dragging = ref(false)
const visible = ref(false)
const settling = ref(false)
const reducedMotion = usePreferredReducedMotion()
const documentVisibility = useDocumentVisibility()
const mayAnimate = computed(() => visible.value && !paused.value && !hovered.value && !focused.value && !dragging.value && !settling.value && !expanded.value && reducedMotion.value !== 'reduce' && documentVisibility.value === 'visible')
let segmentWidth = 0
let offset = 0
let blockClickUntil = 0
let pointer: { id: number; startX: number; startY: number; lastX: number; horizontal: boolean } | undefined
let trigger: HTMLElement | undefined
let previousOverflow: string | undefined

function paint() {
  if (!segmentWidth || !track.value) return
  offset = ((offset % segmentWidth) + segmentWidth) % segmentWidth
  // Stay in the middle copy so either drag direction has a seamless neighbour.
  track.value.style.transform = `translate3d(${-segmentWidth - offset}px, 0, 0)`
}
function move(distance: number) { offset += distance; paint() }
function measure() { segmentWidth = group.value?.getBoundingClientRect().width ?? 0; paint() }
const { pause, resume } = useRafFn(({ delta }) => move(Math.min(delta, 64) * 0.027), { immediate: false })
const { start: coolDown } = useTimeoutFn(() => { settling.value = false }, 1400, { immediate: false })
watchEffect(() => { if (mayAnimate.value) resume(); else pause() })
useResizeObserver(group, measure)
useIntersectionObserver(section, ([entry]) => { visible.value = entry?.isIntersecting ?? false })

function pointerDown(event: PointerEvent) {
  if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return
  pointer = { id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, horizontal: false }
  settling.value = true
  coolDown()
}
function pointerMove(event: PointerEvent) {
  if (!pointer || pointer.id !== event.pointerId) return
  if (!pointer.horizontal) {
    const dx = event.clientX - pointer.startX, dy = event.clientY - pointer.startY
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 7) return
    if (Math.abs(dy) > Math.abs(dx)) { pointer = undefined; return }
    pointer.horizontal = true
    dragging.value = true
    viewport.value?.setPointerCapture(event.pointerId)
  }
  event.preventDefault()
  move(pointer.lastX - event.clientX)
  pointer.lastX = event.clientX
}
function pointerEnd(event: PointerEvent) {
  if (!pointer || pointer.id !== event.pointerId) return
  if (pointer.horizontal) blockClickUntil = performance.now() + 400
  pointer = undefined
  dragging.value = false
  settling.value = true
  coolDown()
  if (viewport.value?.hasPointerCapture(event.pointerId)) viewport.value.releasePointerCapture(event.pointerId)
}
function captureLost(event: PointerEvent) {
  // Touch starts with implicit capture on a logo; its bubbled release is not
  // the end of the viewport's drag when capture transfers to the viewport.
  if (event.target === viewport.value) pointerEnd(event)
}
function activate(event: MouseEvent) {
  if (event.detail > 0 && performance.now() < blockClickUntil) { event.preventDefault(); return }
  void openClients(event)
}
function keyDown(event: KeyboardEvent) {
  focused.value = true
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    move(event.key === 'ArrowLeft' ? -156 : 156)
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    void openClients(event)
  }
}
async function openClients(event: Event) {
  if (expanded.value) return
  trigger = event.currentTarget as HTMLElement
  expanded.value = true
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  await nextTick()
  dialog.value?.showModal()
}
function restoreScroll() {
  if (previousOverflow !== undefined) { document.body.style.overflow = previousOverflow; previousOverflow = undefined }
}
function closeClients() {
  dialog.value?.close()
  expanded.value = false
  restoreScroll()
  trigger?.focus({ preventScroll: true })
}
function backdropClick(event: MouseEvent) {
  if (event.target === dialog.value) closeClients()
}
onMounted(measure)
onUnmounted(() => { pause(); restoreScroll() })
</script>

<template>
  <section ref="section" class="client-strip" aria-label="我們的客戶">
    <div class="container client-strip-inner">
      <button class="client-strip-heading" aria-haspopup="dialog" aria-controls="all-clients-dialog" :aria-expanded="expanded" @click="openClients">
        <span class="eyebrow">OUR CLIENTS</span>
        <span>我們的客戶 <ArrowUpRight :size="16" /></span>
      </button>
      <div
        ref="viewport"
        class="client-strip-viewport"
        :class="{ dragging }"
        role="button"
        tabindex="0"
        aria-label="客戶標誌輪播，左右方向鍵切換，按 Enter 展開所有合作客戶"
        aria-haspopup="dialog"
        aria-controls="all-clients-dialog"
        :aria-expanded="expanded"
        @pointerdown="pointerDown"
        @pointermove="pointerMove"
        @pointerup="pointerEnd"
        @pointercancel="pointerEnd"
        @lostpointercapture="captureLost"
        @pointerenter="hovered = $event.pointerType === 'mouse'"
        @pointerleave="hovered = false"
        @focus="focused = ($event.target as HTMLElement).matches(':focus-visible')"
        @blur="focused = false"
        @keydown="keyDown"
        @click="activate"
        @dragstart.prevent
      >
        <div ref="track" class="client-strip-track" aria-hidden="true">
          <div v-for="copy in 3" :key="copy" :ref="el => { if (copy === 1) group = el as HTMLElement }" class="client-strip-group">
            <span v-for="client in clients" :key="client.image" class="client-strip-logo">
              <img :src="client.image" alt="" width="120" height="54" draggable="false" />
            </span>
          </div>
        </div>
      </div>
      <div class="client-strip-actions">
        <button class="client-strip-all" aria-haspopup="dialog" aria-controls="all-clients-dialog" :aria-expanded="expanded" @click="openClients">查看全部 <span>{{ clients.length }}</span><ArrowUpRight :size="16" /></button>
        <button class="client-strip-pause" :aria-label="paused ? '播放客戶輪播' : '暫停客戶輪播'" :aria-pressed="paused" @click="paused = !paused"><Play v-if="paused" :size="14" /><Pause v-else :size="14" /></button>
      </div>
    </div>
    <dialog id="all-clients-dialog" ref="dialog" class="all-clients-dialog" aria-labelledby="all-clients-title" data-lenis-prevent @cancel.prevent="closeClients" @click="backdropClick" @close="expanded = false; restoreScroll()">
      <div class="all-clients-content">
        <header class="all-clients-header">
          <div><p class="eyebrow">OUR CLIENTS / {{ String(clients.length).padStart(2, '0') }}</p><h2 id="all-clients-title">我們的合作客戶</h2><p>以專業相連，以信任同行。</p></div>
          <button class="all-clients-close" aria-label="關閉合作客戶視窗" autofocus @click="closeClients"><X :size="24" :stroke-width="1.4" /></button>
        </header>
        <div class="all-clients-grid">
          <div v-for="client in clients" :key="client.image" class="all-clients-logo"><img :src="client.image" :alt="client.name" width="160" height="80" loading="lazy" /></div>
        </div>
        <div class="all-clients-footer"><span class="eyebrow">DRAGON MILE / CONNECTIONS THAT MATTER</span><RouterLink to="/clients" class="text-link" @click="closeClients">前往客戶頁面 <ArrowUpRight :size="16" /></RouterLink></div>
      </div>
    </dialog>
  </section>
</template>

<style scoped>
.client-strip { margin-top: 28px; background: #edeFEa; border-top: 1px solid #d4dad6; }
:global(.client-strip + .company-intro) { margin-top: 0; }
.client-strip-inner { display: grid; grid-template-columns: 180px minmax(0, 1fr) 155px; align-items: center; min-height: 124px; gap: 24px; }
.client-strip-heading { display: flex; flex-direction: column; gap: 9px; align-items: flex-start; text-align: left; padding: 12px 0; }
.client-strip-heading .eyebrow { color: #647780; font-size: 9px; }
.client-strip-heading > span:last-child { display: flex; align-items: center; gap: 20px; font-size: 16px; }
.client-strip-heading svg { color: #536b79; transition: transform .25s; }
.client-strip-heading:hover svg { transform: translate(2px, -2px); }
.client-strip-viewport { overflow: hidden; min-width: 0; touch-action: pan-y pinch-zoom; cursor: grab; user-select: none; -webkit-user-select: none; mask-image: linear-gradient(to right, transparent, #000 28px, #000 calc(100% - 28px), transparent); }
.client-strip-viewport.dragging { cursor: grabbing; }
.client-strip-viewport:focus-visible { outline-offset: -3px; }
.client-strip-track { display: flex; width: max-content; will-change: transform; }
.client-strip-group { display: flex; flex: 0 0 auto; }
.client-strip-logo { display: flex; align-items: center; justify-content: center; width: 156px; height: 88px; padding: 15px 22px; flex-shrink: 0; }
.client-strip-logo img { width: 112px; height: 54px; object-fit: contain; mix-blend-mode: multiply; filter: grayscale(1); opacity: .72; pointer-events: none; transition: filter .3s, opacity .3s; }
.client-strip-logo:hover img { filter: none; opacity: 1; }
.client-strip-actions { display: flex; align-items: center; justify-content: flex-end; gap: 13px; }
.client-strip-all { display: flex; align-items: center; gap: 10px; white-space: nowrap; padding: 12px 0; font-size: 11px; }
.client-strip-all > span { font: 9px Arial, sans-serif; color: #626a70; }
.client-strip-pause { display: grid; place-items: center; min-width: 34px; min-height: 38px; border-left: 1px solid #cad3cd !important; }
.client-strip-all:hover, .client-strip-pause:hover { color: #536b79; }
.all-clients-dialog { position: fixed; inset: 0; margin: auto; width: min(1120px, calc(100vw - 64px)); max-width: none; max-height: min(820px, calc(100dvh - 80px)); padding: 0; border: 1px solid #c7d0ca; border-radius: 2px; background: #f3f2ee; color: #292f33; overflow: auto; overscroll-behavior: contain; }
.all-clients-dialog::backdrop { background: rgba(36, 48, 53, .65); }
.all-clients-content { padding: 38px 42px 26px; }
.all-clients-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 32px; }
.all-clients-header .eyebrow { color: #536b79; font-size: 9px; }
.all-clients-header h2 { margin-top: 14px; font-size: 32px; }
.all-clients-header p:last-child:not(.eyebrow) { margin-top: 12px; color: #626a70; font-size: 14px; }
.all-clients-close { display: grid; place-items: center; width: 44px; height: 44px; flex-shrink: 0; }
.all-clients-close:hover { background: #e3e8e3; }
.all-clients-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); border-top: 1px solid #cfd3d2; border-left: 1px solid #cfd3d2; }
.all-clients-logo { display: grid; place-items: center; min-width: 0; min-height: 130px; padding: 22px; border-right: 1px solid #cfd3d2; border-bottom: 1px solid #cfd3d2; }
.all-clients-logo img { width: 100%; height: 70px; object-fit: contain; mix-blend-mode: multiply; }
.all-clients-footer { display: flex; justify-content: space-between; align-items: center; gap: 24px; padding-top: 25px; }
.all-clients-footer > span { font-size: 8px; color: #626a70; }
.all-clients-footer .text-link { font-size: 12px; }
@media (max-width: 1100px) {
  .client-strip-inner { grid-template-columns: 150px minmax(0, 1fr) 145px; gap: 14px; }
  .client-strip-logo { width: 145px; padding-inline: 22px; }
  .all-clients-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@media (max-width: 760px) {
  .client-strip { margin-top: 16px; }
  .client-strip-inner { grid-template-columns: 1fr auto; gap: 6px 20px; min-height: 0; padding-block: 15px 11px; }
  .client-strip-heading { gap: 6px; padding: 0; }
  .client-strip-heading > span:last-child { font-size: 15px; gap: 12px; }
  .client-strip-heading .eyebrow { font-size: 8px; }
  .client-strip-actions { grid-column: 2; grid-row: 1; gap: 10px; }
  .client-strip-viewport { grid-column: 1 / -1; grid-row: 2; margin-inline: -8px; mask-image: linear-gradient(to right, transparent, #000 15px, #000 calc(100% - 15px), transparent); }
  .client-strip-logo { width: 132px; height: 82px; padding: 12px 20px; }
  .client-strip-logo img { width: 92px; height: 48px; }
  .all-clients-dialog { width: calc(100vw - 24px); max-height: calc(100dvh - 36px); }
  .all-clients-content { padding: 24px 18px 20px; }
  .all-clients-header { gap: 12px; margin-bottom: 24px; }
  .all-clients-header h2 { font-size: 26px; }
  .all-clients-header p:last-child:not(.eyebrow) { font-size: 13px; }
  .all-clients-close { width: 36px; height: 36px; }
  .all-clients-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .all-clients-logo { min-height: 100px; padding: 14px 10px; }
  .all-clients-logo img { height: 54px; }
  .all-clients-footer { flex-wrap: wrap; gap: 14px; padding-top: 20px; }
  .all-clients-footer > span { font-size: 7px; }
}
@media (prefers-reduced-motion: reduce) { .client-strip-logo img, .client-strip-heading svg { transition: none; } }
</style>
