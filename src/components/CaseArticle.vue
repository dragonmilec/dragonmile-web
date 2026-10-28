<script setup lang="ts">
import { computed, ref } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { ArrowLeft, ArrowUpRight, X, Expand } from 'lucide-vue-next'
import { cases, type CaseStudy } from '../data'
import { caseContent, type CaseSection } from '../case-content'
import SectionLabel from './SectionLabel.vue'
import ContactCta from './ContactCta.vue'
import CaseCard from './CaseCard.vue'

const props = defineProps<{ item: CaseStudy }>()
const content = computed(() => caseContent[props.item.slug])
const introduction = computed(() => content.value?.introduction ?? [props.item.description])
const sections = computed<CaseSection[]>(() => content.value?.sections ?? props.item.points.map((point, i) => ({ id: `overview-${i + 1}`, title: point.title, paragraphs: [point.text] })))
const remainingImages = computed(() => {
  const used = new Set([props.item.cover, ...sections.value.flatMap(section => section.figures?.map(figure => figure.src) ?? [])])
  return props.item.gallery.filter(src => !used.has(src))
})
const related = computed(() => cases.filter(c => c.slug !== props.item.slug && c.category === props.item.category).slice(0, 2))
const viewer = ref<HTMLDialogElement>()
const image = ref(props.item.cover)
const imageCaption = ref(props.item.title)
const returnFocus = ref<HTMLElement>()

function openImage(src: string, caption: string, event: Event) {
  image.value = src
  imageCaption.value = caption
  returnFocus.value = event.currentTarget as HTMLElement
  viewer.value?.showModal()
}
function closeImage() {
  if (!viewer.value?.open) return
  viewer.value.close()
  returnFocus.value?.focus({ preventScroll: true })
}
onKeyStroke('Escape', closeImage)
</script>

<template>
  <section class="page-hero container case-detail-hero">
    <RouterLink to="/cases" class="back-link"><ArrowLeft :size="16" /> 全部案例</RouterLink>
    <SectionLabel :label="`${item.category} / ${item.english.toUpperCase()}`" />
    <h1 data-reveal>{{ item.title }}</h1>
    <p class="case-detail-intro" data-reveal>{{ item.description }}</p>
  </section>

  <section class="case-summary">
    <div class="container case-summary-grid">
      <div class="case-summary-copy" data-reveal>
        <SectionLabel label="PROJECT INTRODUCTION" />
        <h2>專案介紹</h2>
        <p v-for="paragraph in introduction" :key="paragraph">{{ paragraph }}</p>
      </div>
      <figure class="case-summary-figure" data-reveal>
        <img :src="item.cover" :alt="item.title" fetchpriority="high" />
        <figcaption>DRAGON MILE / {{ item.english.toUpperCase() }}</figcaption>
      </figure>
    </div>
  </section>

  <section class="container case-story section-space">
    <aside class="case-story-aside">
      <div class="case-story-navigation">
        <SectionLabel label="INSIDE THE PROJECT" />
        <p class="case-story-nav-title">案例導覽</p>
        <nav aria-label="案例內容導覽">
          <a v-for="(section, i) in sections" :key="section.id" :href="`#case-${section.id}`"><span>{{ String(i + 1).padStart(2, '0') }}</span>{{ section.title }}</a>
        </nav>
      </div>
    </aside>

    <div class="case-story-body">
      <article v-for="(section, i) in sections" :id="`case-${section.id}`" :key="section.id" class="case-story-section">
        <header class="case-story-section-heading" data-reveal>
          <span class="eyebrow">{{ String(i + 1).padStart(2, '0') }} / PROJECT DETAIL</span>
          <h2>{{ section.title }}</h2>
        </header>
        <div v-if="section.paragraphs?.length" class="case-story-paragraphs" data-reveal>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </div>
        <dl v-if="section.features?.length" class="case-feature-list" data-reveal>
          <div v-for="feature in section.features" :key="feature.title" :class="{ 'title-only': !feature.text }">
            <dt>{{ feature.title }}</dt>
            <dd v-if="feature.text">{{ feature.text }}</dd>
          </div>
        </dl>
        <div v-if="section.figures?.length" class="case-story-figures" :class="{ multiple: section.figures.length > 1 }">
          <figure v-for="figure in section.figures" :key="figure.src" :class="{ 'full-width': figure.fullWidth }" data-reveal>
            <button class="gallery-image case-story-image" :class="{ portrait: figure.orientation === 'portrait' }" :aria-label="`放大圖片：${figure.caption}`" @click="openImage(figure.src, figure.caption, $event)">
              <img :src="figure.src" :alt="figure.caption" loading="lazy" />
              <Expand :size="19" />
            </button>
            <figcaption>{{ figure.caption }}</figcaption>
          </figure>
        </div>
      </article>
    </div>
  </section>

  <section v-if="remainingImages.length" class="project-gallery section-space">
    <div class="container">
      <SectionLabel label="PROJECT GALLERY" />
      <div class="section-heading"><h2>更多專案畫面</h2><span class="eyebrow">點選圖片檢視原圖</span></div>
      <div class="gallery-grid">
        <figure v-for="(src, i) in remainingImages" :key="src">
          <button class="gallery-image" :aria-label="`放大${item.title}圖片 ${i + 1}`" @click="openImage(src, `${item.title}實作畫面 ${i + 1}`, $event)">
            <img :src="src" :alt="`${item.title}實作畫面 ${i + 1}`" loading="lazy" /><Expand :size="19" />
          </button>
        </figure>
      </div>
    </div>
  </section>

  <section v-if="related.length" class="container section-space">
    <SectionLabel label="EXPLORE MORE" />
    <div class="section-heading"><h2>延伸閱讀</h2><RouterLink to="/cases" class="text-link">全部案例 <ArrowUpRight :size="17" /></RouterLink></div>
    <div class="two-case-grid"><CaseCard v-for="c in related" :key="c.slug" :item="c" /></div>
  </section>
  <ContactCta />
  <dialog ref="viewer" class="image-viewer" aria-label="專案圖片檢視" data-lenis-prevent @cancel.prevent="closeImage" @click="closeImage">
    <button aria-label="關閉圖片" @click="closeImage"><X :size="25" /></button>
    <img :src="image" :alt="imageCaption" @click.stop />
    <p class="case-viewer-caption">{{ imageCaption }}</p>
  </dialog>
</template>

<style scoped>
.case-detail-hero { padding-bottom: 48px; }
.case-summary { padding-block: 48px; background: #e7eae6; border-block: 1px solid #d1d9d3; }
.case-summary-grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: 76px; align-items: center; }
.case-summary-copy .section-label { margin-bottom: 26px; }
.case-summary-copy h2 { font-size: 30px; margin-bottom: 24px; }
.case-summary-copy > p:not(.section-label) { font-size: 16px; line-height: 2; color: #59656b; }
.case-summary-copy > p + p { margin-top: 18px; }
.case-summary-figure { min-width: 0; background: #f3f2ee; padding: 24px 24px 16px; }
.case-summary-figure img { width: 100%; height: 290px; object-fit: contain; }
.case-summary-figure figcaption { border-top: 1px solid #d1d7d2; padding-top: 13px; margin-top: 18px; font: 8px/1.6 Arial, sans-serif; letter-spacing: .1em; color: #62737c; }
.case-story { display: grid; grid-template-columns: 250px minmax(0, 1fr); gap: 80px; align-items: start; }
.case-story-navigation { position: sticky; top: calc(var(--site-header-height, 148px) + 22px); max-height: calc(100dvh - var(--site-header-height, 148px) - 44px); overflow-y: auto; }
.case-story-aside { align-self: stretch; }
.case-story-navigation > .section-label { margin-bottom: 25px; font-size: 9px; }
.case-story-nav-title { font-size: 20px; margin-bottom: 22px; }
.case-story-navigation nav { display: flex; flex-direction: column; border-top: 1px solid #cfd3d2; }
.case-story-navigation nav > a { display: flex; align-items: baseline; gap: 14px; padding-block: 11px; border-bottom: 1px solid #d7dcd7; font-size: 12px; line-height: 1.7; color: #59676f; transition: color .2s; }
.case-story-navigation nav > a:hover { color: #263f4d; }
.case-story-navigation nav > a > span { font: 9px Arial, sans-serif; color: #73848b; flex-shrink: 0; }
.case-story-body { min-width: 0; }
.case-story-section { border-top: 1px solid #c6d0cb; padding-top: 28px; padding-bottom: 56px; scroll-margin-top: calc(var(--site-header-height, 148px) + 18px); }
.case-story-section + .case-story-section { margin-top: 12px; }
.case-story-section:last-child { padding-bottom: 0; }
.case-story-section-heading .eyebrow { font-size: 9px; color: #627a87; }
.case-story-section h2 { font-size: 30px; line-height: 1.55; margin-top: 15px; margin-bottom: 24px; letter-spacing: -.035em; }
.case-story-paragraphs p { font-size: 16px; line-height: 2; color: #59656b; }
.case-story-paragraphs p + p { margin-top: 18px; }
.case-feature-list { margin-top: 27px; margin-bottom: 0; }
.case-feature-list > div { display: grid; grid-template-columns: minmax(150px, .65fr) 1.35fr; gap: 30px; padding-block: 19px; border-top: 1px solid #d2d8d3; }
.case-feature-list > div:last-child { border-bottom: 1px solid #d2d8d3; }
.case-feature-list dt { font-size: 15px; font-weight: 500; line-height: 1.9; }
.case-feature-list dd { margin: 0; font-size: 15px; color: #626c71; line-height: 1.9; }
.case-feature-list .title-only { display: block; }
.case-feature-list .title-only dt:before { content: '+'; color: #6f8490; margin-right: 18px; font: 15px Arial, sans-serif; }
.case-story-figures { display: grid; grid-template-columns: minmax(0, 1fr); gap: 28px; margin-top: 30px; }
.case-story-figures.multiple { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.case-story-figures > figure { min-width: 0; }
.case-story-figures > .full-width { grid-column: 1 / -1; }
.case-story-image { width: 100%; min-height: 0; padding: 22px !important; background: #e4e8e3 !important; }
.case-story-image img { width: 100%; height: auto; min-height: 0; max-height: 440px; object-fit: contain; }
.case-story-figures.multiple .case-story-image img { height: 260px; }
.case-story-figures > .full-width .case-story-image img { height: auto; max-height: none; }
.case-story-figures .case-story-image.portrait img { height: 440px; max-height: 440px; }
.case-story-figures figcaption { padding-top: 12px; font-size: 12px; line-height: 1.8; color: #63717a; }
.case-viewer-caption { margin-top: 14px; font-size: 13px; color: #536b79; }
@media (max-width: 1100px) {
  .case-summary-grid { gap: 45px; }
  .case-story { grid-template-columns: 200px minmax(0, 1fr); gap: 45px; }
  .case-story-section h2 { font-size: 28px; }
  .case-feature-list > div { grid-template-columns: 1fr; gap: 8px; }
}
@media (max-width: 760px) {
  .case-summary { padding-block: 32px; }
  .case-summary-grid { grid-template-columns: 1fr; gap: 28px; }
  .case-summary-copy h2 { font-size: 27px; margin-bottom: 20px; }
  .case-summary-copy > p:not(.section-label) { font-size: 15px; }
  .case-summary-figure { padding: 18px 18px 12px; }
  .case-summary-figure img { height: 240px; }
  .case-story { grid-template-columns: 1fr; gap: 40px; }
  .case-story-navigation { position: static; max-height: none; overflow: visible; }
  .case-story-navigation nav { display: grid; grid-template-columns: 1fr 1fr; column-gap: 20px; }
  .case-story-navigation nav > a { font-size: 12px; gap: 10px; }
  .case-story-navigation > .section-label { margin-bottom: 18px; }
  .case-story-nav-title { margin-bottom: 15px; font-size: 19px; }
  .case-story-section { padding-top: 24px; padding-bottom: 40px; }
  .case-story-section h2 { font-size: 26px; margin-bottom: 20px; }
  .case-story-paragraphs p { font-size: 15px; }
  .case-feature-list dt, .case-feature-list dd { font-size: 14px; }
  .case-story-figures, .case-story-figures.multiple { grid-template-columns: 1fr; gap: 24px; }
  .case-story-image { padding: 15px !important; }
  .case-story-image img, .case-story-figures.multiple .case-story-image img { height: auto; max-height: 440px; }
  .case-story-figures figcaption { font-size: 11px; }
}
@media (max-width: 380px) {
  .case-story-navigation nav { grid-template-columns: 1fr; }
  .case-story-section h2 { font-size: 24px; }
}
</style>
