import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import Home from './pages/Home.vue'
import { services, cases, company } from './data'

export const router = createRouter({
  history: typeof window === 'undefined' ? createMemoryHistory() : createWebHistory(),
  routes: [
    { path: '/', component: Home, meta: { title: '技術整合・專業實踐' } },
    { path: '/about', component: () => import('./pages/About.vue'), meta: { title: '關於爵邁' } },
    { path: '/services/:slug?', component: () => import('./pages/Services.vue'), meta: { title: '服務項目' } },
    { path: '/cases', component: () => import('./pages/Cases.vue'), meta: { title: '案例介紹' } },
    { path: '/cases/:slug', component: () => import('./pages/CaseDetail.vue'), meta: { title: '案例介紹' } },
    { path: '/clients', component: () => import('./pages/Clients.vue'), meta: { title: '我們的客戶' } },
    { path: '/contact', component: () => import('./pages/Contact.vue'), meta: { title: '聯絡我們' } },
    { path: '/:pathMatch(.*)*', component: () => import('./pages/NotFound.vue'), meta: { title: '找不到頁面' } },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      const height = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 148
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return { el: to.hash, top: height + 18, behavior: reduced ? 'instant' : 'smooth' }
    }
    return { top: 0 }
  },
})
router.afterEach(to => {
  if (typeof document !== 'undefined') {
    const detail = to.path.startsWith('/cases/') ? cases.find(item => item.slug === to.params.slug) : to.path.startsWith('/services/') ? services.find(item => item.slug === to.params.slug) : undefined
    document.title = `${detail?.title ?? to.meta.title}｜爵邁有限公司 Dragon Mile`
    document.querySelector('meta[name="description"]')?.setAttribute('content', detail?.description ?? company.description)
  }
})
