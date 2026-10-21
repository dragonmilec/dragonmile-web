<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowUpRight, FileBadge2, X } from 'lucide-vue-next'
import { certificate } from '../data'
import { qualification } from '../qualification'

const emit = defineEmits<{ change: [open: boolean] }>()
const route = useRoute()
const trigger = ref<HTMLButtonElement>()
const dialog = ref<HTMLDialogElement>()
const expanded = ref(false)
let returnFocus: HTMLElement | undefined

async function openCertificate(origin?: HTMLElement) {
  if (expanded.value) return
  returnFocus = origin ?? trigger.value
  expanded.value = true
  emit('change', true)
  await nextTick()
  dialog.value?.showModal()
}
function closeCertificate(restoreFocus = true) {
  if (!expanded.value) return
  dialog.value?.close()
  expanded.value = false
  emit('change', false)
  if (restoreFocus) returnFocus?.focus({ preventScroll: true })
}
function backdropClick(event: MouseEvent) {
  if (event.target === dialog.value) closeCertificate()
}
watch(() => route.fullPath, () => closeCertificate(false))
onUnmounted(() => { if (expanded.value) emit('change', false) })
defineExpose({ openCertificate })
</script>

<template>
  <div class="qualification-banner">
    <button
      ref="trigger"
      class="container qualification-banner-trigger"
      :aria-label="`${qualification.title}，查看證書登錄資料`"
      aria-haspopup="dialog"
      aria-controls="qualification-certificate-dialog"
      :aria-expanded="expanded"
      @click="openCertificate(trigger)"
    >
      <span class="qualification-mark" aria-hidden="true"><FileBadge2 :size="25" :stroke-width="1.35" /></span>
      <span class="qualification-banner-label" aria-hidden="true"><span>QUALIFICATION</span><small>技術服務機構資格</small></span>
      <span class="qualification-banner-title"><span>{{ qualification.bannerLead }}</span><span>{{ qualification.bannerSubject }}</span></span>
      <span class="qualification-banner-action"><span class="qualification-record-label">2026—2028 登錄證書</span><span class="qualification-action-label">查看證書 <ArrowUpRight :size="16" /></span></span>
    </button>

    <dialog
      id="qualification-certificate-dialog"
      ref="dialog"
      class="qualification-preview"
      aria-labelledby="qualification-preview-title"
      aria-describedby="qualification-record-note"
      data-lenis-prevent
      @cancel.prevent="closeCertificate()"
      @click="backdropClick"
      @close="closeCertificate()"
    >
      <div class="qualification-preview-inner">
        <header class="qualification-preview-header">
          <div><p class="eyebrow">QUALIFICATION / 2026—2028</p><h2 id="qualification-preview-title">{{ qualification.title }}</h2></div>
          <button class="qualification-preview-close" aria-label="關閉資質證書" autofocus @click="closeCertificate()"><X :size="24" :stroke-width="1.5" /></button>
        </header>
        <div class="qualification-preview-grid">
          <figure class="qualification-preview-image">
            <a :href="certificate" target="_blank" rel="noopener noreferrer" aria-label="開啟登錄證書原圖（新分頁）"><img :src="certificate" :alt="`${qualification.issuer}核發之${qualification.documentTitle}原件`" width="1247" height="867" /></a>
            <figcaption>{{ qualification.documentTitle }}<span>點選證書查看原圖 <ArrowUpRight :size="13" /></span></figcaption>
          </figure>
          <div class="qualification-preview-details">
            <p class="qualification-document-label">證書登錄資料</p>
            <dl>
              <div><dt>核發單位</dt><dd>{{ qualification.issuer }}</dd></div>
              <div><dt>證書編號</dt><dd class="qualification-document-number">{{ qualification.number }}</dd></div>
              <div><dt>登錄類別</dt><dd>{{ qualification.category }}</dd></div>
              <div><dt>服務項目</dt><dd>{{ qualification.service }}<span>{{ qualification.subitem }}</span></dd></div>
              <div><dt>登錄日期</dt><dd><time :datetime="qualification.registeredAt">{{ qualification.registeredAtRoc }}</time></dd></div>
              <div><dt>證載有效日期</dt><dd><time :datetime="qualification.validUntil">{{ qualification.validUntilRoc }}</time></dd></div>
            </dl>
          </div>
        </div>
        <footer class="qualification-preview-footer">
          <p id="qualification-record-note">{{ qualification.note }}</p>
          <RouterLink to="/about#qualification" class="text-link" @click="closeCertificate(false)">完整資格資料 <ArrowUpRight :size="16" /></RouterLink>
        </footer>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.qualification-banner { background: #344750; color: #f3f2ee; border-bottom: 1px solid #a09171; }
.qualification-banner-trigger { display: flex; align-items: center; gap: 19px; min-height: calc(var(--qualification-row-height) - 1px); text-align: left; padding: 0; }
.qualification-mark { display: grid; place-items: center; color: #dbcaa6; flex: 0 0 30px; }
.qualification-banner-label { display: flex; flex-direction: column; gap: 3px; padding-right: 25px; border-right: 1px solid #697878; color: #d3c5aa; }
.qualification-banner-label > span { font: 8px/1.4 Arial, sans-serif; letter-spacing: .16em; }
.qualification-banner-label > small { font-size: 10px; letter-spacing: .12em; }
.qualification-banner-title { display: flex; flex-wrap: wrap; font-size: 16px; font-weight: 500; line-height: 1.55; letter-spacing: .04em; }
.qualification-banner-action { display: flex; align-items: center; gap: 24px; margin-left: auto; padding-left: 20px; flex-shrink: 0; }
.qualification-record-label { font-size: 10px; color: #c0c8c8; letter-spacing: .04em; }
.qualification-action-label { display: flex; align-items: center; gap: 17px; font-size: 12px; white-space: nowrap; }
.qualification-action-label > svg { color: #dbcaa6; transition: transform .25s; }
.qualification-banner-trigger:hover .qualification-action-label > svg { transform: translate(2px, -2px); }
.qualification-banner-trigger:focus-visible { outline-color: #dbcaa6; outline-offset: -3px; }
.qualification-preview { position: fixed; inset: 0; width: min(1180px, calc(100vw - 64px)); max-width: none; max-height: calc(100dvh - 72px); margin: auto; padding: 0; border: 1px solid #c7ceca; border-top: 3px solid #a09171; border-radius: 2px; overflow: auto; overscroll-behavior: contain; background: #f3f2ee; color: #292f33; }
.qualification-preview::backdrop { background: rgba(31, 45, 51, .72); }
.qualification-preview-inner { padding: 36px 40px 26px; }
.qualification-preview-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 30px; padding-bottom: 28px; border-bottom: 1px solid #cfd5d1; }
.qualification-preview-header .eyebrow { font-size: 9px; color: #647b87; }
.qualification-preview-header h2 { font-size: 27px; line-height: 1.6; letter-spacing: -.025em; margin-top: 13px; }
.qualification-preview-close { width: 42px; height: 42px; display: grid; place-items: center; flex-shrink: 0; }
.qualification-preview-close:hover { background: #e4e9e3; }
.qualification-preview-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 35px; padding-top: 30px; align-items: start; }
.qualification-preview-image { min-width: 0; }
.qualification-preview-image > a { display: block; padding: 18px; border: 1px solid #cfd6d1; background: #e5e9e4; }
.qualification-preview-image img { width: 100%; height: auto; }
.qualification-preview-image figcaption { padding-top: 13px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; font-size: 11px; color: #65747d; line-height: 1.7; }
.qualification-preview-image figcaption > span { display: flex; align-items: center; gap: 7px; font-size: 10px; }
.qualification-document-label { font-size: 16px; margin-bottom: 13px; }
.qualification-preview-details dl { margin: 0; border-top: 1px solid #cbd3ce; }
.qualification-preview-details dl > div { display: grid; grid-template-columns: 94px minmax(0, 1fr); gap: 12px; padding-block: 13px; border-bottom: 1px solid #d5dbd5; font-size: 12px; line-height: 1.8; }
.qualification-preview-details dt { color: #69767d; }
.qualification-preview-details dd { margin: 0; }
.qualification-preview-details dd > span { display: block; font-size: 11px; color: #66747a; margin-top: 5px; }
.qualification-document-number { font-family: Arial, sans-serif; font-size: 11px; overflow-wrap: anywhere; }
.qualification-preview-footer { display: flex; align-items: center; justify-content: space-between; gap: 30px; padding-top: 25px; margin-top: 28px; border-top: 1px solid #cfd5d1; }
.qualification-preview-footer > p { font-size: 11px; line-height: 1.8; color: #62727b; max-width: 690px; }
.qualification-preview-footer .text-link { white-space: nowrap; flex-shrink: 0; font-size: 12px; }
@media (max-width: 1100px) {
  .qualification-banner-trigger { gap: 14px; }
  .qualification-banner-label { padding-right: 18px; }
  .qualification-record-label { display: none; }
  .qualification-banner-title { font-size: 14px; }
  .qualification-preview-grid { gap: 25px; grid-template-columns: 1.15fr 1fr; }
}
@media (max-width: 960px) {
  .qualification-banner-label { display: none; }
  .qualification-banner-title { font-size: 15px; }
  .qualification-banner-action { padding-left: 0; }
}
@media (max-width: 760px) {
  .qualification-banner-trigger { gap: 12px; }
  .qualification-mark { flex-basis: 24px; }
  .qualification-mark > svg { width: 24px; }
  .qualification-banner-title { display: block; font-size: 14px; letter-spacing: .025em; line-height: 1.6; }
  .qualification-banner-title > span { display: block; }
  .qualification-banner-action { margin-left: auto; padding-left: 4px; }
  .qualification-action-label { flex-direction: column; gap: 3px; font-size: 10px; }
  .qualification-action-label > svg { width: 14px; }
  .qualification-preview { width: calc(100vw - 24px); max-height: calc(100dvh - 32px); }
  .qualification-preview-inner { padding: 23px 19px 22px; }
  .qualification-preview-header { gap: 12px; padding-bottom: 21px; }
  .qualification-preview-header h2 { font-size: 23px; line-height: 1.6; }
  .qualification-preview-header .eyebrow { font-size: 7px; }
  .qualification-preview-close { width: 32px; height: 36px; }
  .qualification-preview-grid { grid-template-columns: 1fr; gap: 25px; padding-top: 24px; }
  .qualification-preview-image > a { padding: 10px; }
  .qualification-preview-image figcaption { font-size: 10px; }
  .qualification-preview-details dl > div { grid-template-columns: 92px minmax(0, 1fr); font-size: 12px; padding-block: 12px; }
  .qualification-preview-footer { flex-direction: column; align-items: flex-start; gap: 16px; margin-top: 23px; padding-top: 20px; }
  .qualification-preview-footer > p { font-size: 10px; }
}
@media (max-width: 380px) {
  .qualification-banner-trigger { gap: 8px; }
  .qualification-banner-title { font-size: 13px; }
  .qualification-banner-action { padding-left: 0; }
  .qualification-preview-header h2 { font-size: 21px; }
}
</style>
