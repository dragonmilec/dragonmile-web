import images from './metal-assets.json'
import type { CaseContent } from './case-content'

// Production features follow the supplied document; service screens are captioned
// by their actual function rather than being presented as machine dashboards.
export const metalCaseContent: CaseContent = {
  introduction: [
    '穩揚金屬 ERP 是依企業日常作業打造的客製化管理系統，集中整理金屬加工的生產製程、進料與加工數量、機台使用、工作排程及作業員績效，協助相關人員查詢與管理現場資料。',
    '系統亦提供客戶諮詢、現場勘查、報價、需求及客戶資料等服務作業介面，讓生產管理與客戶營運資料可在同一專案中集中呈現。',
  ],
  sections: [
    {
      id: 'dashboard', title: '儀表板與工作看板',
      paragraphs: ['透過儀表板集中呈現重要作業資訊，作為管理功能的入口。工作看板將待處理的服務作業分項整理，協助使用者掌握當前工作。'],
      figures: [{ src: images.dashboard, caption: '穩揚金屬 ERP 工作看板與待處理作業概覽' }],
    },
    {
      id: 'process-quantities', title: '製程數量與每日明細查詢',
      paragraphs: ['依條件查詢產品與製程的生產數量，分別查看進料倉庫及各製程站的資料，追蹤物料從進料到製程加工的每日數量變化。'],
      features: [
        { title: '投入與產出', text: '投料／轉入數量、良品數量及完工小計。' },
        { title: '報廢與不良', text: '加工報廢數量、胚不良已加工數量。' },
        { title: '繳回與待加工', text: '未加工胚繳回數量，以及累計待加工數量。' },
      ],
    },
    {
      id: 'warehouse', title: '進料與倉庫數量管理',
      paragraphs: ['整理進料、領料及待加工數量，呈現生產所需物料的數量狀況，並與第一製程站的投料紀錄對應，作為物料流動查詢的依據。'],
    },
    {
      id: 'machine-utilization', title: '機台稼動率與停機紀錄',
      paragraphs: ['依實際開機時間與停機紀錄統計機台使用狀況，提供月份及每日的運作資訊，方便查看實際生產與停機時間。'],
      features: [
        { title: '月度統計', text: '整月時數、開機工時、停機分鐘與機台稼動比。' },
        { title: '每日紀錄', text: '每日開機時間與每日稼動率。' },
      ],
    },
    {
      id: 'machine-scheduling', title: '機台排程與加工時程',
      paragraphs: ['依指定機台查看近期的生產工作安排，整理不同產品與製程的加工時程。'],
      features: [
        { title: '產品與製程', text: '產品／料號、機台、製程及來料資訊。' },
        { title: '日期與工期', text: '開始日期、所需天數、結束日期與備註。' },
      ],
    },
    {
      id: 'operator-performance', title: '作業員績效查詢',
      paragraphs: ['依現場生產紀錄整理作業員績效資料，提供生產紀錄與績效數值的查詢依據。'],
      features: [
        { title: '工時資料', text: '實際工時與可用工時。' },
        { title: '績效參數', text: '品質失分、操作別參數與薪資點數。' },
      ],
    },
    {
      id: 'post-processing', title: '後處理標準管理',
      paragraphs: ['建立與維護產品的後處理標準，統一記錄不同產品的作業內容與標準資料。'],
      features: [
        { title: '產品與作業標準', text: '產品編號、後處理內容、標準人數及標準作業時間。' },
        { title: '製程狀態', text: '後處理狀態與未完成製程。' },
        { title: '生效與啟用', text: '生效日期、啟用狀態及備註。' },
      ],
    },
    {
      id: 'base-codes', title: '基礎代碼與原因管理',
      paragraphs: ['集中維護不良原因、停機原因與後處理作業類型，讓生產紀錄及各項統計使用一致的分類與資料內容。'],
    },
    {
      id: 'customer-service', title: '客戶需求、勘查與報價作業',
      paragraphs: ['客戶服務介面將諮詢、現場勘查、快速報價、報價單及需求表單分別管理，透過查詢條件與案件列表定位作業資料。'],
      features: [
        { title: '客戶諮詢與訂單追蹤', text: '依案件、日期及狀態等條件查詢，查看案件清單與處理進度。' },
        { title: '現場勘查', text: '查詢捲門現場勘查紀錄，再由案件列表進入編輯與補充場勘內容。' },
        { title: '報價與需求', text: '提供快速捲門報價、客戶報價單及客戶需求表單的查詢入口。' },
      ],
      figures: [
        { src: images.consultation, caption: '客戶諮詢表及訂單追蹤查詢' },
        { src: images.survey, caption: '捲門現場勘查紀錄表與案件清單' },
        { src: images.quickQuote, caption: '快速捲門報價的條件查詢與報價清單' },
        { src: images.quotation, caption: '客戶報價單查詢與版本、狀態管理畫面' },
        { src: images.requirements, caption: '客戶需求表單查詢與案件資料' },
      ],
    },
    {
      id: 'customer-data', title: '客戶資料與作業資訊整合',
      paragraphs: ['集中查詢與維護客戶資料，並透過系統整理原本分散的生產與服務紀錄。從進料、製程、機台與排程，到作業員績效及客戶服務資訊，提供日常管理的查詢依據。'],
      figures: [{ src: images.customers, caption: '客戶資料表的條件查詢與資料清單' }],
    },
  ],
}
