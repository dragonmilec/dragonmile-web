<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowUpRight, ArrowLeft, Plus } from 'lucide-vue-next'
import { services, supplementary, cases } from '../data'
import ContactCta from '../components/ContactCta.vue'
import SectionLabel from '../components/SectionLabel.vue'
import CaseCard from '../components/CaseCard.vue'
import NotFound from './NotFound.vue'
const route = useRoute()
const current = computed(() => services.find(s => s.slug === route.params.slug))
const related = computed(() => {
  const names: Record<string, string[]> = { app: ['swallow-training', 'speech-therapy'], database: ['concrete-erp', 'oral-care'], iot: ['cnc-monitoring', 'medical-iot'], pcb: ['smart-manufacturing', 'medical-iot'] }
  return cases.filter(c => (names[current.value?.slug ?? ''] ?? []).includes(c.slug))
})
const process = [{ title: '需求分析', text: '了解業務需求與目標，規劃合適方案。' }, { title: '方案設計', text: '設計系統架構與使用者介面。' }, { title: '開發實作', text: '依循敏捷開發，定期交付可運作的版本。' }, { title: '測試部署', text: '完成品質測試，協助部署至生產環境。' }, { title: '維護支援', text: '提供持續技術支援與系統維護。' }]
</script>
<template>
  <NotFound v-if="route.params.slug && !current" />
  <template v-else-if="current">
    <section class="page-hero container service-detail-hero"><RouterLink class="back-link" to="/services"><ArrowLeft :size="16" /> 全部服務</RouterLink><SectionLabel :number="current.number" :label="current.english.toUpperCase()" /><div class="page-hero-grid"><h1 data-reveal>{{ current.title }}<span class="accent">。</span></h1><p class="page-hero-copy" data-reveal>{{ current.description }}</p></div></section>
    <section class="service-detail section-space"><div class="container service-detail-grid"><div class="service-detail-visual" data-reveal><img :src="current.image" :alt="`爵邁${current.title}原站圖片`" /><span class="eyebrow">DRAGON MILE / {{ current.name }}</span></div><div data-reveal><SectionLabel label="SERVICE OVERVIEW" /><h2>從實際需求，<br />展開技術實作。</h2><p>{{ current.detail }}</p><ul class="scope-list"><li v-for="(scope, i) in current.scope" :key="scope"><span>0{{ i + 1 }}</span>{{ scope }}<Plus :size="16" /></li></ul><RouterLink to="/contact" class="button">討論這項服務 <ArrowUpRight :size="18" /></RouterLink></div></div></section>
    <section class="container section-space"><SectionLabel label="RELATED WORK" /><div class="section-heading"><h2>相關實作案例</h2><RouterLink to="/cases" class="text-link">全部案例 <ArrowUpRight :size="17" /></RouterLink></div><div class="two-case-grid"><CaseCard v-for="item in related" :key="item.slug" :item="item" /></div></section><ContactCta />
  </template>
  <template v-else>
    <section class="page-hero container"><SectionLabel number="02" label="OUR EXPERTISE" /><div class="page-hero-grid"><h1 data-reveal>技術各有所長，<br /><span class="accent">整合自有方向。</span></h1><p class="page-hero-copy" data-reveal>從軟體應用、資料管理到設備連網與電路設計，<br />以四項核心能力，回應不同的技術需求。</p></div><nav class="service-anchor-nav" aria-label="服務分類"><a v-for="s in services" :key="s.slug" :href="`#${s.slug}`">{{ s.number }} <span>{{ s.name }}</span> <ArrowUpRight :size="16" /></a></nav></section>
    <section v-for="(service, i) in services" :id="service.slug" :key="service.slug" class="service-editorial section-space" :class="{ alternate: i % 2 !== 0 }"><div class="container service-editorial-grid"><div data-reveal><SectionLabel :number="service.number" :label="service.english.toUpperCase()" /><h2>{{ service.title }}</h2><p>{{ service.description }}</p><p>{{ service.detail }}</p><div class="scope-tags"><span v-for="scope in service.scope" :key="scope">{{ scope }}</span></div><RouterLink :to="`/services/${service.slug}`" class="text-link">了解服務 <ArrowUpRight :size="18" /></RouterLink></div><div class="service-editorial-image" data-reveal><img :src="service.image" :alt="`爵邁${service.title}實作原圖`" loading="lazy" /><span>{{ service.name }} / {{ service.number }}</span></div></div></section>
    <section class="container section-space"><SectionLabel number="05" label="MORE TECHNICAL SERVICES" /><div class="section-heading"><h2 data-reveal>延伸服務，<br />回應完整需求。</h2><p class="section-description">依據原站服務項目，整合企業應用、<br />網站、雲端與維護支援。</p></div><div class="supplementary-services"><div v-for="service in supplementary" :key="service.title" data-reveal><h3>{{ service.title }}</h3><p>{{ service.description }}</p></div></div></section>
    <section class="process-section section-space"><div class="container"><SectionLabel number="06" label="OUR PROCESS" /><h2 data-reveal>清楚的流程，<br />讓每一步有方向。</h2><ol class="process-grid"><li v-for="(step, i) in process" :key="step.title" data-reveal><span>0{{ i + 1 }}</span><h3>{{ step.title }}</h3><p>{{ step.text }}</p></li></ol></div></section><ContactCta />
  </template>
</template>
