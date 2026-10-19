from pathlib import Path
p = Path('src/data.ts')
s = p.read_text(encoding='utf-8')
s = s.replace("import portfolioAssets from './portfolio-assets.json'", "import portfolioAssets from './portfolio-assets.json'\nimport sportsAssets from './sports-assets.json'")
s = s.replace("category: '智慧醫療'", "category: '智能醫療'").replace("category: '智慧製造'", "category: '智能工控／服務'").replace("category: '影像辨識'", "category: '智能工控／服務'").replace("category: '客製化 ERP'", "category: 'ERP'")
s = s.replace('export interface CaseStudy {', "export const caseCategories = ['智能醫療', '智能工控／服務', 'ERP'] as const\nexport type CaseCategory = typeof caseCategories[number]\n\nexport interface CaseStudy {")
s = s.replace('category: string; english:', 'category: CaseCategory; english:')
s = s.replace("export const categories = ['全部案例', ...new Set(cases.map(c => c.category))]", "export const categories = ['全部案例', ...caseCategories]")
insert = '''
  {
    slug: 'sport-guard', title: '自主運動防護管理系統', category: '智能醫療', english: 'Self-directed Exercise & Protection',
    description: '整合運動防護分類、影音課程與問卷評估，串接運動前準備、自主練習及自身狀況了解。',
    cover: sportsAssets['sport-guard'].entrance, gallery: Object.values(sportsAssets['sport-guard']),
    points: [
      { title: '分類入口與影音課程', text: '依需求選擇運動防護類別，瀏覽對應課程及操作指引。' },
      { title: '問卷評估與健康管理', text: '透過問卷記錄身體與運動狀況，作為自主健康管理的參考。' },
      { title: '完整自主運動流程', text: '從選擇類別、查看課程、進行暖身或自主運動，到填寫問卷與了解自身狀況。' },
    ],
    source: 'https://atakecare.com/sport_guard/portal/categoryEntry',
  },
  {
    slug: 'sports-coaches', title: '運動醫學健身指導人力資源庫', category: '智能醫療', english: 'Sports Medicine Coaching Directory',
    description: '整合專業教練建檔、管理審核與公開查詢，讓訪客依條件篩選，教練自行維護專業資訊。',
    cover: sportsAssets['sports-coaches'].home, gallery: Object.values(sportsAssets['sports-coaches']),
    points: [
      { title: '訪客查詢與篩選', text: '不需登入即可瀏覽通過審核的教練，依專業、服務與資格等條件查詢。' },
      { title: '教練建檔與送審', text: '教練登入後維護個人介紹、背景、服務及資格資訊，確認內容後送審。' },
      { title: '管理審核與公開', text: '採先建立、後審核、再公開機制，通過審核的資料才加入公開人力資源庫。' },
    ],
    source: 'https://psmhpc.com/med_sport_referral/',
  },
'''
s = s.replace("\n]\n\nconst clientNames", insert + "]\n\nconst clientNames")
p.write_text(s, encoding='utf-8')
p = Path('src/pages/Cases.vue')
s = p.read_text(encoding='utf-8').replace('從智慧製造到醫療應用，從設備訊號到企業資料，', '智能醫療、智能工控／服務與 ERP，')
p.write_text(s, encoding='utf-8')
p = Path('src/pages/Home.vue')
s = p.read_text(encoding='utf-8').replace("import ClientCarousel from '../components/ClientCarousel.vue'", "import ClientCarousel from '../components/ClientCarousel.vue'\n\nconst selectedCases = ['sports-coaches', 'smart-manufacturing', 'concrete-erp'].map(slug => cases.find(item => item.slug === slug)!)")
s = s.replace('FEATURED PROJECT · 智慧製造', 'FEATURED PROJECT · 智能工控／服務')
s = s.replace('<CaseCard :item="cases[2]!" :index="2" data-reveal /><CaseCard :item="cases[7]!" :index="7" data-reveal /><CaseCard :item="cases[4]!" :index="4" data-reveal />', '<CaseCard v-for="item in selectedCases" :key="item.slug" :item="item" :index="cases.indexOf(item)" data-reveal />')
p.write_text(s, encoding='utf-8')
p = Path('scripts/static-routes.mjs')
s = p.read_text(encoding='utf-8').replace("  'cases/concrete-erp':", "  'cases/sport-guard': '自主運動防護管理系統', 'cases/sports-coaches': '運動醫學健身指導人力資源庫',\n  'cases/concrete-erp':")
p.write_text(s, encoding='utf-8')
p = Path('scripts/qa.mjs')
s = p.read_text(encoding='utf-8').replace("'container-recognition'].map", "'container-recognition', 'sport-guard', 'sports-coaches'].map").replace('name: /智慧製造/', 'name: /智能工控／服務/').replace("locator('.case-card').count(), 2", "locator('.case-card').count(), 3").replace("locator('.case-card').count(), 9", "locator('.case-card').count(), 11")
p.write_text(s, encoding='utf-8')
