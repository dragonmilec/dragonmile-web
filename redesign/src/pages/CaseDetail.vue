<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { cases } from '../data'
import CaseArticle from '../components/CaseArticle.vue'
import NotFound from './NotFound.vue'

const route = useRoute()
const item = computed(() => cases.find(c => c.slug === route.params.slug))
</script>

<template>
  <CaseArticle v-if="item" :item="item" />
  <NotFound v-else />
</template>
