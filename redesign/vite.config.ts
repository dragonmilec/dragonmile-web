import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  ssr: { noExternal: ['gsap'] },
  build: { rollupOptions: { output: { manualChunks: { animation: ['gsap', 'lenis', 'motion-v'] } } } },
})
