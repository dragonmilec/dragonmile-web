<script setup lang="ts">
import { clients } from '../data'
import SectionLabel from '../components/SectionLabel.vue'
import ContactCta from '../components/ContactCta.vue'
</script>
<template><section class="page-hero container"><SectionLabel number="04" label="OUR CLIENTS" /><div class="page-hero-grid"><h1 data-reveal>以專業相連，<br /><span class="accent">以信任同行。</span></h1><p class="page-hero-copy" data-reveal>我們致力於提供量身打造的解決方案，<br />回應每個客戶的特定需求。</p></div></section><section class="all-clients section-space"><div class="container"><div class="client-grid" data-reveal><div v-for="client in clients" :key="client.image" class="client-logo"><img :src="client.image" :alt="client.name" loading="lazy" /></div></div><div class="clients-endnote"><span class="eyebrow">CONNECTIONS THAT MATTER</span><p>從每一次理解需求開始，建立合作的基礎。</p></div></div></section><ContactCta /></template>
