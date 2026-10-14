<script setup lang="ts">
import { ArrowUpRight, FileCheck2 } from 'lucide-vue-next'
import SectionLabel from './SectionLabel.vue'
import { certificate } from '../data'
import { qualification } from '../qualification'

defineProps<{ full?: boolean }>()
</script>

<template>
  <section id="qualification" class="qualification section-space">
    <div class="container qualification-grid">
      <div data-reveal>
        <SectionLabel number="Q" label="QUALIFICATION" />
        <FileCheck2 :size="33" :stroke-width="1.2" class="qualification-icon" />
        <h2>專業技術，<br />有據可循。</h2>
        <p>{{ qualification.documentTitle }}<br />{{ qualification.title }}</p>
        <a :href="qualification.source" target="_blank" rel="noopener noreferrer" class="text-link">查看原站資質資料 <ArrowUpRight :size="17" /></a>
      </div>
      <div class="qualification-document" data-reveal>
        <a :href="certificate" target="_blank" rel="noopener noreferrer" aria-label="開啟證書原圖（新分頁）">
          <img :src="certificate" alt="爵邁技術服務機構服務能量登錄證書原件" loading="lazy" />
        </a>
        <div class="document-meta"><span>TECHNICAL SERVICE QUALIFICATION</span><span>DOCUMENT / 01</span></div>
        <dl v-if="full" class="certificate-facts">
          <div><dt>證書編號</dt><dd>{{ qualification.number }}</dd></div>
          <div><dt>登錄日期</dt><dd><time :datetime="qualification.registeredAt">{{ qualification.registeredAtRoc }}</time></dd></div>
          <div><dt>證載有效日期</dt><dd><time :datetime="qualification.validUntil">{{ qualification.validUntilRoc }}</time></dd></div>
        </dl>
        <p class="source-note">{{ qualification.note }}</p>
      </div>
    </div>
  </section>
</template>
