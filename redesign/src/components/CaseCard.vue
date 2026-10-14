<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { CaseStudy } from '../data'
defineProps<{ item: CaseStudy; index?: number }>()
</script>
<template><RouterLink :to="`/cases/${item.slug}`" class="case-card"><div class="case-card-image" :class="{ screenshot: !item.cover.endsWith('.jpg') }"><img :src="item.cover" :alt="item.title" loading="lazy" /><span class="image-index">DM / {{ String((index ?? 0) + 1).padStart(2, '0') }}</span><span class="image-arrow"><ArrowUpRight :size="22" /></span></div><div class="case-card-meta"><span>{{ item.category }}</span><span>{{ item.english }}</span></div><h3>{{ item.title }} <ArrowUpRight :size="21" /></h3><p>{{ item.description }}</p></RouterLink></template>
