<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion } from 'motion-v'
import { usePreferredReducedMotion } from '@vueuse/core'
import { cases, categories } from '../data'
import CaseCard from '../components/CaseCard.vue'
import ContactCta from '../components/ContactCta.vue'
import SectionLabel from '../components/SectionLabel.vue'
const selected = ref('全部案例')
const reduced = usePreferredReducedMotion()
const filtered = computed(() => selected.value === '全部案例' ? cases : cases.filter(item => item.category === selected.value))
</script>
<template><section class="page-hero container"><SectionLabel number="03" label="OUR WORK" /><div class="page-hero-grid"><h1 data-reveal>每個需求，<br /><span class="accent">都有實作的答案。</span></h1><p class="page-hero-copy" data-reveal>從智慧製造到醫療應用，從設備訊號到企業資料，<br />透過真實專案，認識爵邁的技術整合。</p></div></section><section class="container case-index section-space"><div class="case-filters" role="group" aria-label="案例分類"><button v-for="category in categories" :key="category" :aria-pressed="selected === category" :class="{ selected: selected === category }" @click="selected = category">{{ category }} <span>{{ category === '全部案例' ? cases.length : cases.filter(c => c.category === category).length }}</span></button></div><p class="result-count" aria-live="polite">{{ String(filtered.length).padStart(2, '0') }} PROJECTS / {{ selected }}</p><div class="case-index-grid"><motion.div v-for="(item, i) in filtered" :key="`${selected}-${item.slug}`" :initial="reduced === 'reduce' ? false : { opacity: 0, y: 12 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: reduced === 'reduce' ? 0 : .4, delay: reduced === 'reduce' ? 0 : Math.min(i * .04, .2) }"><CaseCard :item="item" :index="cases.indexOf(item)" /></motion.div></div></section><ContactCta /></template>
