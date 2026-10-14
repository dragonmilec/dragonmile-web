<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
</script>
<template><section class="container not-found"><span class="eyebrow">404 / PAGE NOT FOUND</span><h1>這個頁面，<br />暫時沒有連結。</h1><p>您可以返回首頁，或繼續瀏覽爵邁的服務與案例。</p><RouterLink to="/" class="button">返回首頁 <ArrowUpRight :size="18" /></RouterLink></section></template>
