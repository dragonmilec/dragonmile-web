<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDocumentVisibility, useIntersectionObserver, useIntervalFn, usePreferredReducedMotion } from '@vueuse/core'
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-vue-next'
import { cases } from '../data'

const props = defineProps<{ enabled: boolean }>()
// Each project remains visible for five seconds while autoplay is running.
const PROJECT_INTERVAL_MS = 5000
const projects = ['cnc-monitoring', 'smart-machine-management', 'sports-coaches', 'concrete-erp']
  .map(slug => cases.find(item => item.slug === slug)!)
const root = ref<HTMLElement>()
const index = ref(0)
const project = computed(() => projects[index.value]!)
const paused = ref(false)
const hovered = ref(false)
const focused = ref(false)
const visible = ref(false)
const reduced = usePreferredReducedMotion()
const visibility = useDocumentVisibility()
const mayRotate = computed(() => props.enabled && visible.value && !paused.value && !hovered.value && !focused.value && reduced.value !== 'reduce' && visibility.value === 'visible')
const { pause, resume } = useIntervalFn(() => { index.value = (index.value + 1) % projects.length }, PROJECT_INTERVAL_MS, { immediate: false })
watch(mayRotate, enabled => enabled ? resume() : pause(), { immediate: true })
useIntersectionObserver(root, ([entry]) => { visible.value = entry?.isIntersecting ?? false })
function move(direction: number) {
  paused.value = true
  index.value = (index.value + direction + projects.length) % projects.length
}
function focusOut(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node | null)) focused.value = false
}
</script>

<template>
  <div ref="root" class="hero-projects" aria-label="專案展示輪播" aria-roledescription="輪播" :data-project="project.slug" @mouseenter="hovered = true" @mouseleave="hovered = false" @focusin="focused = true" @focusout="focusOut">
    <div class="project-slides" :aria-live="paused || reduced === 'reduce' ? 'polite' : 'off'">
      <Transition name="project-fade" mode="out-in">
        <RouterLink :key="project.slug" :to="`/cases/${project.slug}`" class="hero-visual showcase-project" :class="{ 'is-screen': project.slug !== 'cnc-monitoring' }" :aria-label="`查看 ${project.title}案例`">
          <img :src="project.cover" :alt="`${project.title}專案展示`" :fetchpriority="index === 0 ? 'high' : 'auto'" />
          <div class="hero-image-top"><span>{{ project.category }}</span><ArrowUpRight :size="25" :stroke-width="1" /></div>
          <div class="hero-image-bottom"><span><small>PROJECT SHOWCASE</small>{{ project.title }}</span></div>
        </RouterLink>
      </Transition>
    </div>
    <div class="project-toolbar">
      <span class="project-counter">{{ String(index + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}</span>
      <RouterLink to="/cases" class="project-all">全部案例 <ArrowUpRight :size="13" /></RouterLink>
      <div class="project-controls">
        <button aria-label="上一個專案" @click="move(-1)"><ChevronLeft :size="17" /></button>
        <button :aria-label="paused || reduced === 'reduce' ? '播放專案輪播' : '暫停專案輪播'" :disabled="reduced === 'reduce'" @click="paused = !paused"><Play v-if="paused || reduced === 'reduce'" :size="13" /><Pause v-else :size="13" /></button>
        <button aria-label="下一個專案" @click="move(1)"><ChevronRight :size="17" /></button>
      </div>
    </div>
  </div>
</template>

<style>
.hero-projects { height: 100%; min-height: 0; }
.project-slides { position: relative; height: calc(100% - 42px); }
.project-toolbar { height: 42px; display: flex; align-items: center; gap: 20px; color: var(--steel); }
.project-counter { font: 10px/1 Arial,sans-serif; letter-spacing: .08em; white-space: nowrap; }
.project-all { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; }
.project-controls { margin-left: auto; display: flex; align-items: center; gap: 2px; }
.project-controls > button { display: grid; place-items: center; width: 32px; height: 36px; padding: 0; }
.project-controls > button:hover { background: #e2e6e4; }
.project-controls > button:disabled { opacity: .4; }
.project-controls > button:focus-visible { outline-offset: -3px; }
.showcase-project.is-screen > img { object-fit: contain; object-position: center; padding: 42px 16px 72px; filter: none; background: #e4e9e7; }
.showcase-project.is-screen:after { background: linear-gradient(180deg,transparent 50%,rgba(9,19,23,.86)); }
.showcase-project.is-screen .hero-image-top { color: #344750; }
.hero-projects .hero-image-bottom { bottom: 22px; }
.hero-projects .hero-image-bottom > span:first-child { font-size: clamp(16px,1.5vw,21px); letter-spacing: .015em; line-height: 1.5; }
.project-fade-enter-active, .project-fade-leave-active { transition: opacity .35s; }
.project-fade-enter-from, .project-fade-leave-to { opacity: 0; }
@media(max-width:760px) {
  .project-toolbar { gap: 12px; }
  .project-counter { font-size: 9px; }
  .project-all { font-size: 10px; gap: 4px; }
  .showcase-project.is-screen > img { padding: 34px 10px 70px; }
  .hero-projects .hero-image-bottom { left: 17px; right: 17px; bottom: 15px; }
  .hero-projects .hero-image-bottom > span:first-child { font-size: 16px; gap: 7px; }
}
@media(prefers-reduced-motion:reduce) {
  .project-fade-enter-active, .project-fade-leave-active { transition: none; }
}
</style>
