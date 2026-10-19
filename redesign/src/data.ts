import assets from './assets.json'
import portfolioAssets from './portfolio-assets.json'
import sportsAssets from './sports-assets.json'
import erpAssets from './erp-assets.json'
import metalAssets from './metal-assets.json'
import machineAssets from './machine-assets.json'

export const company = {
  name: '爵邁有限公司', english: 'Dragon Mile', phone: '07-5523561', email: 'dgcorplimit@gmail.com',
  contactEmail: 'Jeff.Tseng@dragon-mile.com', mobile: '+886 910921303',
  address: '804 高雄市鼓山區明華路 251 號 10 樓 1002 室',
  description: '自 2019 年成立以來，爵邁專注於提供高品質的技術服務，涵蓋應用程式開發、資料庫管理、物聯網解決方案，以及原理圖與印刷電路板設計。',
}

export const services = [
  { slug: 'app', number: '01', name: 'APP', title: '應用程式開發', english: 'Application Development', description: '從需求分析到設計、開發與測試，讓應用程式在各大平台上順暢運行。', image: assets['about-us'][3], scope: ['iOS 與 Android 應用', '跨平台開發', 'UI/UX 設計', 'App Store 上架'], detail: '依照實際使用需求，規劃行動應用的功能與介面。結合原生與跨平台開發，從設計、開發、測試到上架，提供完整的應用程式開發服務。' },
  { slug: 'database', number: '02', name: 'DATABASE', title: '資料庫解決方案', english: 'Database Solutions', description: '提供高效的資料儲存解決方案，讓資料安全、可靠且易於存取。', image: assets['about-us'][8], scope: ['資料庫系統設計', '資料整合', '權限管理', '報表分析'], detail: '透過資料庫系統設計與管理，整合企業資訊。依據業務需求建置資料儲存、帳號權限與報表分析功能，協助企業掌握及運用資料。' },
  { slug: 'iot', number: '03', name: 'IoT', title: '物聯網整合', english: 'Internet of Things', description: '將設備連接至網路，整合智慧控制與資料分析，連結現場和系統。', image: assets['about-us'][1], scope: ['設備連網', '訊號擷取', '控制整合', '資料分析'], detail: '整合設備訊號與網路連線，將現場資訊回傳至系統，支援設備控制及資料分析。實際應用包含工具機訊號檢測、機台監控與醫美物聯網系統。' },
  { slug: 'pcb', number: '04', name: 'SCHEMATIC / PCB', title: '電路與 PCB 設計', english: 'Schematic & PCB Design', description: '從原理圖到印刷電路板設計，重視電子產品的穩定性能與組裝品質。', image: assets['about-us'][2], scope: ['電路設計', '原理圖設計', 'PCB 佈線', '軟硬體整合'], detail: '提供原理圖與印刷電路板相關設計服務，結合電路設計及軟硬體整合能力，回應電子產品的實際功能需求。' },
]

export const supplementary = [
  { title: '企業系統開發', description: 'ERP、CRM、庫存管理等企業級系統，包含客製化功能、資料整合、權限管理與報表分析。' },
  { title: '網站開發', description: '響應式網站、電商平台與企業官網，包含響應式設計、SEO 優化、效能架構及安全防護。' },
  { title: '雲端服務', description: '雲端架構設計、遷移及 DevOps 自動化部署，包含 AWS / Azure、監控告警與備份恢復。' },
  { title: '系統維護', description: '持續的技術支援、系統更新與安全性維護，包含定期更新、安全檢測及效能優化。' },
  { title: 'UI/UX 設計', description: '使用者介面設計與體驗優化，包含原型設計、使用者測試、視覺及互動設計。' },
]

export const caseCategories = ['智能醫療', '智能工控／服務', 'ERP'] as const
export type CaseCategory = typeof caseCategories[number]

export interface CaseStudy { slug: string; title: string; category: CaseCategory; english: string; description: string; cover: string; gallery: string[]; points: { title: string; text: string }[]; source?: string }
export const cases: CaseStudy[] = [
  {
    slug: 'smart-machine-management', title: '智慧機台管理系統', category: '智能工控／服務', english: 'Smart Machine Management System',
    description: '串接 PLC 數據上傳、機台監控、歷史趨勢與保養提醒，整合經銷商、廠域、角色權限及設備操作紀錄。',
    cover: machineAssets.cover, gallery: Object.values(machineAssets),
    points: [
      { title: '現場 PLC 數據串接', text: '由桌面程式自動採集、連線與上傳機台資料。' },
      { title: '組織與設備管理', text: '串接經銷商、廠域、使用者權限及機台綁定。' },
      { title: '監控與保養作業', text: '查看即時指標、歷史趨勢與 AI 預警，設定保養提醒並追蹤完成紀錄。' },
    ],
  },
  {
    slug: 'wen-yang-metal', title: '穩揚金屬・生產與服務管理', category: '智能工控／服務', english: 'Metal Production & Service Management',
    description: '整合金屬加工製程、物料數量、機台稼動與排程、作業員績效，並提供客戶諮詢、勘查、報價及需求管理介面。',
    cover: metalAssets.dashboard, gallery: Object.values(metalAssets),
    points: [
      { title: '現場生產與物料追蹤', text: '查詢製程數量、進料、倉庫及待加工紀錄。' },
      { title: '機台與人員管理', text: '整理機台稼動率、停機紀錄、工作排程及作業員績效。' },
      { title: '客戶服務作業', text: '串接諮詢、現場勘查、報價、需求與客戶資料查詢。' },
    ],
  },
  { slug: 'smart-manufacturing', title: '工業控制・智慧生產', category: '智能工控／服務', english: 'Smart Manufacturing', description: '從資訊收集平台架構到線上品檢自動化，整合生產現場的資訊與控制需求。', cover: assets['工業控制-智慧生產'][0], gallery: assets['工業控制-智慧生產'].slice(1), points: [{ title: '資訊與場域規劃', text: '資訊收集平台架構規劃、廠區 layout 規劃。' }, { title: '自動化量測與品檢', text: '線上品檢自動化模組、導直滾輪補償參數建議模組、雷射邊緣量測計，以及沖壓頭磨耗監控預警模組。' }], source: '/2022/05/06/工業控制-智慧生產/' },
  { slug: 'cnc-monitoring', title: 'CNC 機台監控', category: '智能工控／服務', english: 'CNC Machine Monitoring', description: '透過訊號擷取卡將機台訊息回傳至運算平台，計算機台使用與維運週期。', cover: assets['cnc機台監控'][0], gallery: [], points: [{ title: '馬達電流與震動監控', text: '偵測馬達運作中的電流，利用資料分析協助機台維運與壽命分析。' }], source: '/2022/05/06/cnc機台監控/' },
  { slug: 'swallow-training', title: '吞嚥賦能體感訓練遊戲', category: '智能醫療', english: 'Interactive Swallowing Training', description: '結合影像辨識與壓力感測健舌器，透過舌頭互動遊戲、即時回饋與進度追蹤，提供舌頭訓練體驗。', cover: portfolioAssets['swallow-training']['z08.png'], gallery: Object.values(portfolioAssets['swallow-training']), points: [{ title: '影像辨識與壓力感測訓練', text: '以舌頭體操互動遊戲及健舌器壓力感測，提供動作評分、文字提示與數值回饋。' }, { title: '分析與後台整合', text: '整合使用者資料、前台進度追蹤、後台分析及 WebSocket 實時資料同步。' }, { title: '教學與使用輔助', text: '提供示範教學、互動提示與任務難易度調整。' }], source: 'https://dragonmile.dev/portfolio/3' },
  { slug: 'oral-care', title: '智慧口腔暨吞嚥賦能照護雲管家', category: '智能醫療', english: 'Oral Care Management', description: '整合口腔影像、資料管理與健康趨勢分析，協助追蹤口腔健康狀況。', cover: assets['智慧口腔暨吞嚥賦能照護雲管家'][1], gallery: assets['智慧口腔暨吞嚥賦能照護雲管家'].slice(1), points: [{ title: '即時拍攝與上傳', text: '於 APP 中啟動相機，拍攝並上傳照片，保存拍攝日期及相關資料。' }, { title: '口腔資料與趨勢', text: '記錄日期、單位、拍攝者及被拍攝者，呈現牙菌斑分析圖與每日覆蓋率趨勢，支援多條件搜尋。' }, { title: '單位、帳號與權限', text: '提供單位與帳號資料的新增、讀取、更新、刪除，以及依角色管理資料存取權限。' }], source: '/2024/10/25/智慧口腔暨吞嚥賦能照護雲管家/' },
  { slug: 'speech-therapy', title: '語言治療', category: '智能醫療', english: 'Speech Therapy Application', description: '透過互動與遊戲化的訓練模式，為語言學習較慢的兒童提供語言學習體驗。', cover: assets['語言治療'][3], gallery: assets['語言治療'].slice(1), points: [{ title: '四種類型的互動訓練', text: '拖曳填空、仿說練習、繪本互動與對話練習，結合語音辨識及即時引導。' }, { title: '個人化學習記錄', text: '記錄關卡、難度、時間及互動細節，透過成長曲線追蹤詞彙使用，並針對反覆答錯的題目提供加強模式。' }, { title: '學習節奏與保護機制', text: '依答題表現調整標準，遇到卡關時切換題目；結合 RPG 探索、獎勵系統與每半小時的休息保護機制。' }], source: '/2024/10/29/語言治療/' },
  { slug: 'spinal-simulation', title: '脊髓術前模擬', category: '智能醫療', english: 'Preoperative Simulation', description: '結合影像辨識與 2D、3D 影像組合旋轉，協助術前模擬與導覽。', cover: assets['脊髓術前模擬'][1], gallery: assets['脊髓術前模擬'].slice(1), points: [{ title: '影像整合與建模', text: '整合 256 切 X 光掃描影像，轉換為 3D 影像，結合骨釘建模及影像旋轉，協助醫師進行術前模擬。' }], source: '/2024/10/06/脊髓術前模擬/' },
  { slug: 'medical-iot', title: '醫療・物聯網醫美', category: '智能醫療', english: 'Medical IoT Integration', description: '整合超音速霧化、藍牙連線與雲端參數管理，透過一次性 QR Code 授權啟用，串接藥劑注射設備與後台資料。', cover: portfolioAssets['medical-iot']['z07.png'], gallery: Object.values(portfolioAssets['medical-iot']), points: [{ title: '霧化與雲端控制', text: '結合超音速霧化、藍牙連線、藥劑參數下載與設備自動校正。' }, { title: 'QR Code 授權使用', text: '透過單瓶一次性 QR Code 啟用裝置使用次數，預設為 200 次。' }, { title: '帳號管理與數據回傳', text: '整合使用者帳號、施打紀錄上傳、使用趨勢分析與設備維護預測。' }], source: 'https://dragonmile.dev/portfolio/4' },
  {
    slug: 'concrete-erp', title: '混凝土・客製化 ERP', category: 'ERP', english: 'Concrete / Customized ERP',
    description: '串接混凝土產業的出貨調度、庫存維護、人事薪資與財務帳務，整合總廠分廠資訊、雲端管理及彈性報表。',
    cover: erpAssets['dispatch-planning'], gallery: Object.values(erpAssets),
    points: [
      { title: '廠部作業整合', text: '整合出貨管理、庫存與維護、車輛回廠及剩退料追蹤。' },
      { title: '財務與人事管理', text: '串接應收應付、發票、票據、出勤薪資、成本及總帳。' },
      { title: '跨廠雲端管理', text: '一致操作介面、帳號權限、歷史資料回復、資料備份及報表範本調整。' },
      { title: '實際導入', text: '已導入台泥子公司鳳勝實業，涵蓋全台 15 個工廠與一總管理處。' },
    ],
    source: '/2022/05/06/混泥土-客製化erp/',
  },
  { slug: 'container-recognition', title: '貨櫃港口辨識', category: '智能工控／服務', english: 'Container Recognition', description: '利用影像辨識辨別貨櫃尺寸與編號，協助辨識貨櫃破損狀態。', cover: assets['貨櫃港口辨識'][0], gallery: [], points: [{ title: '貨櫃辨識應用', text: '透過 AI 學習辨識貨櫃尺寸、編號及破損狀態，協助釐清貨櫃損害賠償責任。' }], source: '/2022/04/28/貨櫃港口辨識/' },
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
]

const clientNames = ['工業技術研究院', '原站客戶標誌', 'PROMO', '金屬工業研究發展中心', '中山科學研究院', '原站客戶標誌', '鳳勝實業', '原站客戶標誌', '資訊工業策進會', '加銘鋼鐵', '原站客戶標誌', '高雄醫學大學', '高雄醫學大學附設中和紀念醫院', '潤輝科技有限公司', '原站客戶標誌', '樹德科技大學', '玉鼎電機實業有限公司', '國立成功大學']
export const clients = assets['elementor-1014'].map((image, i) => ({ image, name: clientNames[i] }))
export const certificate = assets['about-us'][9]
export const categories = ['全部案例', ...caseCategories]
