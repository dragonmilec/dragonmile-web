<script setup lang="ts">
defineProps<{ number?: string; label: string }>()
</script>
<template><p class="section-label"><span v-if="number">{{ number }} /</span>{{ label }}<span class="label-rule" /></p></template>
