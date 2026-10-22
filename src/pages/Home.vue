<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { company, services, cases } from '../data'
import SectionLabel from '../components/SectionLabel.vue'
import ContactCta from '../components/ContactCta.vue'
import CaseCard from '../components/CaseCard.vue'
import Qualification from '../components/Qualification.vue'
import ClientCarousel from '../components/ClientCarousel.vue'
import HomeHero from '../components/HomeHero.vue'

const manufacturingCase = cases.find(item => item.slug === 'smart-manufacturing')!
const selectedCases = ['sports-coaches', 'wen-yang-metal', 'concrete-erp'].map(slug => cases.find(item => item.slug === slug)!)
</script>

<template>
  <HomeHero />

  <ClientCarousel />

  <section id="introduction" class="company-intro section-space"><div class="container"><SectionLabel number="01" label="ABOUT DRAGON MILE" /><div class="intro-grid"><h2 data-reveal>專業，源於細節。<br />整合，創造可能。</h2><div class="intro-copy" data-reveal><p>{{ company.description }}</p><p>以客戶需求為導向，將不同領域的技術連結起來，為實際問題提供合適的解決方案。</p><RouterLink to="/about" class="text-link">認識爵邁 <ArrowUpRight :size="18" /></RouterLink></div><div class="founded" data-reveal><span>ESTABLISHED</span><strong>2019<span>↗</span></strong><small>從需求出發，持續專注技術。</small></div></div></div></section>

  <section class="home-services section-space"><div class="container"><SectionLabel number="02" label="OUR EXPERTISE" /><div class="section-heading" data-reveal><h2>四項核心能力，<br /><span class="muted">一體思考。</span></h2><RouterLink to="/services" class="text-link">完整服務項目 <ArrowUpRight :size="18" /></RouterLink></div><div class="service-index"><RouterLink v-for="service in services" :key="service.slug" :to="`/services/${service.slug}`" class="service-row" data-reveal><span class="service-no">{{ service.number }}</span><div class="service-name"><h3>{{ service.name }}</h3><span>{{ service.title }}</span></div><p>{{ service.description }}</p><span class="service-row-arrow"><ArrowUpRight :size="24" :stroke-width="1.4" /></span></RouterLink></div></div></section>

  <section class="featured-case section-space"><div class="container"><SectionLabel number="03" label="ENGINEERING IN PRACTICE" /><div class="feature-grid"><RouterLink to="/cases/smart-manufacturing" class="feature-image" data-reveal><img :src="manufacturingCase.cover" alt="智慧生產案例原站工業生產示意照片" loading="lazy" /><span class="feature-image-caption">FIELD / SMART MANUFACTURING <ArrowUpRight :size="21" /></span></RouterLink><div class="feature-copy" data-reveal><span class="eyebrow">FEATURED PROJECT · 智能工控／服務</span><h2>讓現場資訊，<br />連結生產決策。</h2><h3>{{ manufacturingCase.title }}</h3><p>{{ manufacturingCase.description }}</p><div class="feature-tags"><span>資訊收集平台</span><span>自動化品檢</span><span>量測與監控</span></div><RouterLink to="/cases/smart-manufacturing" class="text-link">深入了解案例 <ArrowUpRight :size="18" /></RouterLink></div></div></div></section>

  <section class="selected-cases section-space"><div class="container"><SectionLabel number="04" label="SELECTED WORK" /><div class="section-heading" data-reveal><h2>不同領域，<br />同樣專注。</h2><RouterLink to="/cases" class="text-link">瀏覽全部案例 <ArrowUpRight :size="18" /></RouterLink></div><div class="selected-grid"><CaseCard v-for="item in selectedCases" :key="item.slug" :item="item" :index="cases.indexOf(item)" data-reveal /></div></div></section>
  <Qualification />
  <ContactCta />
</template>
