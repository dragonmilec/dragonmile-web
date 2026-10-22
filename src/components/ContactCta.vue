<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import SectionLabel from './SectionLabel.vue'
</script>
<template><section class="contact-cta"><div class="container" data-reveal><SectionLabel number="NEXT" label="LET’S CONNECT" /><div class="cta-content"><h2>從您的需求開始，<br />一起實現下一步<span>。</span></h2><div><p>應用程式、資料庫、物聯網與電路設計。<br />與爵邁聊聊您的技術需求。</p><RouterLink to="/contact" class="button button-light">開始對話 <ArrowUpRight :size="20" /></RouterLink></div></div></div></section></template>
