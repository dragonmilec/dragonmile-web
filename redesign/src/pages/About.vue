<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { company, services } from '../data'
import SectionLabel from '../components/SectionLabel.vue'
import Qualification from '../components/Qualification.vue'
import ContactCta from '../components/ContactCta.vue'
</script>
<template>
  <section class="page-hero container"><SectionLabel number="01" label="ABOUT DRAGON MILE" /><div class="page-hero-grid"><h1 data-reveal>以專業為本，<br /><span class="accent">連結每個可能。</span></h1><div class="page-hero-copy" data-reveal><span class="eyebrow">爵邁有限公司 / DRAGON MILE</span><p>{{ company.description }}</p></div></div></section>
  <section class="about-statement"><div class="container about-statement-grid"><div class="about-year" data-reveal><span class="eyebrow">OUR BEGINNING</span><strong>2019</strong><span>專注技術服務的起點</span></div><div data-reveal><SectionLabel label="OUR APPROACH" /><h2>從理解需求，<br />到實踐解決方案。</h2><p>爵邁以客戶需求為導向，持續專注於技術研發與應用。從應用程式、資料庫到物聯網與電路設計，將各領域的技術能力整合，回應客戶的實際需求。</p><p>專業、整合、勤勉、誠懇，是爵邁原站所呈現的核心精神，也是我們介紹每一項技術服務的出發點。</p></div></div></section>
  <section class="section-space container"><SectionLabel number="02" label="TECHNICAL CAPABILITIES" /><div class="section-heading"><h2 data-reveal>軟體與硬體，<br />在這裡連結。</h2><p class="section-description">電路設計、APP 跨平台開發與資料庫系統設計，<br />構成爵邁的技術整合能力。</p></div><div class="capability-grid"><RouterLink v-for="service in services" :key="service.slug" :to="`/services/${service.slug}`" class="capability" data-reveal><div class="capability-image"><img :src="service.image" :alt="`爵邁${service.title}原站實作圖片`" loading="lazy" /></div><span class="eyebrow">{{ service.number }} / {{ service.english }}</span><h3>{{ service.title }} <ArrowUpRight :size="21" /></h3></RouterLink></div></section>
  <Qualification full />
  <ContactCta />
</template>
