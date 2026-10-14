<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useWindowScroll, usePreferredReducedMotion, useResizeObserver, onKeyStroke } from '@vueuse/core'
import { ArrowUpRight, ArrowUp, Menu, X } from 'lucide-vue-next'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { company } from './data'
import QualificationBar from './components/QualificationBar.vue'

gsap.registerPlugin(ScrollTrigger)
const route = useRoute()
const { y } = useWindowScroll()
const reduced = usePreferredReducedMotion()
const menuOpen = ref(false)
const qualificationOpen = ref(false)
const header = ref<HTMLElement>()
const menuToggle = ref<HTMLButtonElement>()
const navigation = ref<HTMLElement>()
const nav = [{ path: '/about', label: '關於爵邁' }, { path: '/services', label: '服務項目' }, { path: '/cases', label: '案例介紹' }, { path: '/clients', label: '我們的客戶' }]
let lenis: Lenis | undefined
let ctx: gsap.Context | undefined
let mutationFrame = 0

function animatePage() {
  ctx?.revert()
  if (reduced.value === 'reduce') return
  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
      gsap.from(el, { opacity: 0, y: 24, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } })
    })
    gsap.from('.hero-visual img', { scale: 1.045, duration: 1.6, ease: 'power2.out' })
  }, document.querySelector('main')!)
  ScrollTrigger.refresh()
}
watch(() => route.fullPath, async () => {
  menuOpen.value = false
  await nextTick()
  lenis?.resize()
  if (!route.hash) lenis?.scrollTo(0, { immediate: true })
  mutationFrame = requestAnimationFrame(animatePage)
  document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true })
})
watch([menuOpen, qualificationOpen], async ([menu, certificate]) => {
  document.body.style.overflow = menu || certificate ? 'hidden' : ''
  if (menu || certificate) lenis?.stop()
  else lenis?.start()
  if (menu && !certificate) { await nextTick(); navigation.value?.querySelector<HTMLElement>('a')?.focus() }
})
function onQualificationChange(open: boolean) {
  if (open) menuOpen.value = false
  qualificationOpen.value = open
}
function headerOffset() { return Math.ceil(header.value?.getBoundingClientRect().height ?? 148) + 18 }
function updateHeaderMetrics() {
  const height = Math.ceil(header.value?.getBoundingClientRect().height ?? 148)
  document.documentElement.style.setProperty('--site-header-height', `${height}px`)
  if (lenis) lenis.options.anchors = { offset: -height - 18 }
}
useResizeObserver(header, updateHeaderMetrics)
onKeyStroke('Escape', () => { if (menuOpen.value) { menuOpen.value = false; menuToggle.value?.focus() } })
function trapMenu(event: KeyboardEvent) {
  if (!menuOpen.value || event.key !== 'Tab') return
  const links = [...(navigation.value?.querySelectorAll<HTMLElement>('a') ?? []), menuToggle.value!]
  const first = links[0], last = links[links.length - 1]
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}
function startScroll() {
  lenis?.destroy()
  lenis = undefined
  if (reduced.value !== 'reduce') {
    lenis = new Lenis({ autoRaf: true, duration: 1.05, anchors: { offset: -headerOffset() } })
    lenis.on('scroll', ScrollTrigger.update)
    if (menuOpen.value || qualificationOpen.value) lenis.stop()
  }
}
function goTop() {
  if (lenis) lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: reduced.value === 'reduce' ? 'instant' : 'smooth' })
}
watch(reduced, () => { startScroll(); animatePage() })
onMounted(() => { updateHeaderMetrics(); startScroll(); mutationFrame = requestAnimationFrame(animatePage) })
onUnmounted(() => { ctx?.revert(); lenis?.destroy(); cancelAnimationFrame(mutationFrame); document.body.style.overflow = ''; document.documentElement.style.removeProperty('--site-header-height') })
</script>

<template>
  <a class="skip-link" href="#main">跳至主要內容</a>
  <header ref="header" class="site-header" :class="{ compact: y > 48 }" @keydown="trapMenu">
    <QualificationBar @change="onQualificationChange" />
    <div class="header-inner">
      <RouterLink to="/" class="brand" aria-label="爵邁 Dragon Mile 首頁">
        <img src="/assets/brand.png" alt="" width="42" height="42" />
        <span><strong>DRAGON MILE<span class="brand-dot">.</span></strong><small>爵邁有限公司</small></span>
      </RouterLink>
      <nav id="main-navigation" ref="navigation" aria-label="主要導覽" :class="{ open: menuOpen }">
        <RouterLink v-for="item in nav" :key="item.path" :to="item.path" :class="{ active: route.path.startsWith(item.path) }">{{ item.label }}</RouterLink>
        <RouterLink to="/contact" class="button header-contact">聯絡我們 <ArrowUpRight :size="17" /></RouterLink>
      </nav>
      <button ref="menuToggle" class="menu-toggle" :aria-expanded="menuOpen" aria-controls="main-navigation" :aria-label="menuOpen ? '關閉選單' : '開啟選單'" @click="menuOpen = !menuOpen"><X v-if="menuOpen" /><Menu v-else /></button>
    </div>
  </header>
  <main id="main" tabindex="-1"><RouterView :key="route.path" /></main>
  <footer class="site-footer">
    <div class="container footer-top">
      <div><RouterLink to="/" class="footer-brand">DRAGON MILE<span>.</span></RouterLink><p>爵邁有限公司</p><span class="eyebrow">PROFESSION · INTEGRATION · DILIGENCE · SINCERITY</span></div>
      <div class="footer-links"><RouterLink to="/about">關於爵邁</RouterLink><RouterLink to="/services">服務項目</RouterLink><RouterLink to="/cases">案例介紹</RouterLink><RouterLink to="/clients">我們的客戶</RouterLink><RouterLink to="/contact">聯絡我們</RouterLink></div>
      <div class="footer-contact"><a href="tel:075523561">{{ company.phone }}</a><a :href="`mailto:${company.email}`">{{ company.email }} <ArrowUpRight :size="14" /></a><p>{{ company.address }}</p></div>
    </div>
    <div class="container footer-bottom"><span>© {{ new Date().getFullYear() }} Dragon Mile Co., Ltd. 版權所有</span><span>軟體 × 硬體 × 技術整合</span><button @click="goTop" aria-label="回到頁首">BACK TO TOP <ArrowUp :size="14" /></button></div>
  </footer>
</template>
