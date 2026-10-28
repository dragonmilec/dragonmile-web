import assets from './oral-assets.json'
import type { CaseContent } from './case-content'

export const oralCaseContent: CaseContent = {
  introduction: [
    '智慧口腔暨吞嚥賦能照護雲管家整合行動拍攝、AI 牙菌斑辨識與雲端紀錄，讓口腔清潔狀況看得見、照護歷程有跡可循。',
    '以服務使用者與照顧團隊的日常需求為出發點，串接影像、趨勢與照護建議，協助團隊掌握變化，支持個別化照護與跨專業協作。',
  ],
  sections: [
    {
      id: 'camera-upload', title: '行動拍攝與影像管理',
      paragraphs: ['透過手機 APP 記錄口腔影像，整合拍攝、照片保存與雲端上傳，讓照顧者在日常服務中輕鬆累積照護紀錄。'],
      figures: [
        { src: assets['app-home'], caption: '行動照護 APP', orientation: 'portrait' },
        { src: assets['app-camera'], caption: '口腔影像拍攝', fullWidth: true },
      ],
    },
    {
      id: 'plaque-analysis', title: 'AI 牙菌斑辨識',
      paragraphs: ['運用 AI 辨識牙菌斑分布，將原始影像與分析結果直觀呈現，協助使用者與照顧者了解口腔清潔情形，作為日常衛教與照護的參考。'],
      figures: [
        { src: assets['app-history'], caption: '口腔影像與牙菌斑辨識結果', orientation: 'portrait' },
      ],
    },
    {
      id: 'health-trends', title: '口腔健康趨勢追蹤',
      paragraphs: ['以圖表呈現歷次紀錄的變化，讓照顧團隊持續掌握口腔清潔狀況，觀察照護前後的差異，作為調整照護方式的參考。'],
      figures: [
        { src: assets['app-trends'], caption: 'APP 健康趨勢', orientation: 'portrait' },
        { src: assets['cloud-trends'], caption: '雲端口腔健康分析', fullWidth: true },
      ],
    },
    {
      id: 'health-records', title: '照護紀錄與團隊協作',
      paragraphs: ['集中保存口腔影像、分析結果與醫囑建議，讓照顧團隊在同一處了解照護歷程，支持持續追蹤與跨專業溝通。'],
      figures: [
        { src: assets['cloud-instructions'], caption: '口腔照護紀錄與醫囑建議', fullWidth: true },
      ],
    },
    {
      id: 'cloud-management', title: '雲端資料與單位管理',
      paragraphs: ['整合照護資料查詢、單位與帳號管理，依使用者角色提供對應的資料存取權限，協助團隊有系統地管理日常照護資訊。'],
      figures: [
        { src: assets['cloud-records'], caption: '雲端照護資料總覽', fullWidth: true },
        { src: assets['cloud-accounts'], caption: '團隊帳號管理', fullWidth: true },
      ],
    },
  ],
}
