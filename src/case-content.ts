import assets from './assets.json'
import portfolioAssets from './portfolio-assets.json'
import { sportsCaseContent } from './sports-case-content'
import { erpCaseContent } from './erp-case-content'
import { metalCaseContent } from './metal-case-content'
import { machineCaseContent } from './machine-case-content'
import { oralCaseContent } from './oral-case-content'

export interface CaseFigure {
  src: string
  caption: string
  orientation?: 'portrait'
  fullWidth?: boolean
}

export interface CaseSection {
  id: string
  title: string
  paragraphs?: string[]
  features?: { title: string; text?: string }[]
  figures?: CaseFigure[]
}

export interface CaseContent {
  introduction: string[]
  sections: CaseSection[]
}

const manufacturing = assets['工業控制-智慧生產']
const swallow = portfolioAssets['swallow-training']
const medical = portfolioAssets['medical-iot']
const speech = assets['語言治療']
const speechPortfolio = portfolioAssets['speech-therapy']

// Keep source descriptions and figures together. Newer project pages, supplied
// sports documents and the ERP presentation supplement the original cases.
export const caseContent: Record<string, CaseContent> = {
  ...sportsCaseContent,
  'smart-machine-management': machineCaseContent,
  'wen-yang-metal': metalCaseContent,
  'swallow-training': {
    introduction: [
      '透過舌頭體感互動遊戲，結合影像辨識與壓力感測健舌器，讓使用者在遊戲過程中練習舌頭靈活度與舌肌力量。',
      'APP 提供動作評分、即時文字回饋、進度追蹤與統計，將前台互動訓練和後台數據分析串接，適用於家庭、復健中心與語言治療機構的使用者。',
    ],
    sections: [
      {
        id: 'project-info', title: '專案資訊與技術整合',
        features: [
          { title: '核心功能', text: '前台進度追蹤與統計，搭配舌頭體感互動訓練。' },
          { title: '適用場景', text: '家庭、復健中心與語言治療機構使用者。' },
          { title: '影像與感測', text: '影像辨識與舌頭動作分析，以及壓力感測健舌器互動。' },
          { title: '評分與資料追蹤', text: '動作評分、即時文字回饋、後台數據分析與統計追蹤。' },
          { title: '即時資料同步', text: '透過 WebSocket 進行實時資料同步。' },
        ],
        figures: [{ src: swallow['o10.png'], caption: '吞嚥訓練 APP 登入與使用入口', orientation: 'portrait' }],
      },
      {
        id: 'core-training', title: '核心功能總覽',
        paragraphs: ['將影像辨識與壓力感測融入遊戲互動，提供舌頭體操與健舌器訓練兩種方式。'],
        features: [
          { title: '舌頭體操互動訓練（影像辨識）', text: '透過攝影機辨識舌頭動作，在遊戲中練習舌頭靈活度。系統即時判定動作完成度，提供文字提示與得分基準。' },
          { title: '健舌器壓力感測訓練', text: '透過健舌器量測舌壓，將訓練表現轉為可量化回饋。使用者可在操作過程中查看壓力曲線、得分與完成度。' },
        ],
        figures: [
          { src: swallow['o01.png'], caption: '舌頭動作辨識與互動訓練畫面', orientation: 'portrait' },
          { src: swallow['o02.png'], caption: '訓練完成後的成績與回饋', orientation: 'portrait' },
          { src: swallow['o03.png'], caption: '訓練模式與進度入口', orientation: 'portrait' },
          { src: swallow['o04.png'], caption: '健舌器訓練操作說明', orientation: 'portrait' },
        ],
      },
      {
        id: 'analysis', title: '精準分析與後台整合',
        paragraphs: ['以訓練資料追蹤使用者進展，將前台訓練紀錄、分析與後台管理整合。'],
        features: [
          { title: '智能數據分析', text: '動作辨識與分數評估、進度追蹤與趨勢圖，以及訓練過程中的行為提示。' },
          { title: '後台管理', text: '使用者資料管理、後台數據分析，以及前台進度追蹤與統計。' },
        ],
        figures: [
          { src: swallow['o05.png'], caption: '訓練記錄、成效與趨勢圖', orientation: 'portrait' },
          { src: swallow['o06.png'], caption: '訓練資料的操作確認視窗', orientation: 'portrait' },
        ],
      },
      {
        id: 'guidance', title: '教學與使用輔助',
        paragraphs: ['透過操作示範、過程提示與難度設定，協助使用者循序進行訓練。'],
        features: [
          { title: '示範教學', text: '提供完整操作流程與示範，協助使用者了解訓練方式。' },
          { title: '互動提示', text: '在遊戲與訓練中提供提示及建議，協助完成正確動作。' },
          { title: '任務難易度調整', text: '依使用者能力調整訓練難度與目標。' },
        ],
        figures: [
          { src: swallow['o08.png'], caption: '訓練示範教學', orientation: 'portrait' },
          { src: swallow['o09.png'], caption: '舌頭動作與互動提示', orientation: 'portrait' },
          { src: swallow['o07.png'], caption: '訓練目標與任務難度設定', orientation: 'portrait' },
        ],
      },
    ],
  },
  'smart-manufacturing': {
    introduction: [
      '以自動化生產為方向，規劃資訊收集平台架構與廠區配置，並整合線上品檢、導直滾輪補償、雷射量測及沖壓頭磨耗監控等模組。',
    ],
    sections: [
      {
        id: 'planning', title: '資訊收集平台與廠區規劃',
        features: [
          { title: '資訊收集平台架構規劃' },
          { title: '廠區 Layout 規劃' },
        ],
        figures: [{ src: manufacturing[1], caption: '智慧生產資訊收集與平台架構規劃' }],
      },
      {
        id: 'inspection', title: '線上品檢與滾輪補償',
        features: [
          { title: '線上品檢自動化模組' },
          { title: '導直滾輪補償參數建議模組' },
        ],
        figures: [{ src: manufacturing[2], caption: '導直滾輪補償與生產模組整合示意' }],
      },
      {
        id: 'measurement', title: '雷射量測與磨耗預警',
        features: [
          { title: '雷射邊緣量測計' },
          { title: '沖壓頭磨耗監控預警模組' },
        ],
        figures: [
          { src: manufacturing[3], caption: '雷射邊緣量測示意' },
          { src: manufacturing[4], caption: '沖壓頭磨耗監控與預警模組示意' },
        ],
      },
    ],
  },
  'cnc-monitoring': {
    introduction: [
      'CNC 機台監控透過訊號擷取卡，將機台訊息回傳至運算平台，計算機台使用情形與維運週期。',
      '專案包含馬達電流與震動監控分析軟體，利用馬達運作中的電流資料，協助機台維運及壽命分析。',
    ],
    sections: [
      {
        id: 'signal-collection', title: '機台訊號擷取與回傳',
        paragraphs: ['使用訊號擷取卡取得機台訊息，並回傳至運算平台，作為計算機台使用及維運週期的資料。'],
      },
      {
        id: 'motor-analysis', title: '馬達電流與震動監控分析軟體',
        paragraphs: ['偵測馬達運作中的電流，透過數據分析協助機台維運與壽命分析，以提升生產線產能及降低維運成本為應用目標。'],
      },
    ],
  },
  'spinal-simulation': {
    introduction: [
      '結合 AI 影像辨識與 2D、3D 影像組合旋轉，將掃描影像轉換為可操作的 3D 影像，並加入骨釘建模，協助醫師進行術前模擬與導覽。',
    ],
    sections: [
      {
        id: 'image-recognition', title: 'AI 影像辨識與 2D／3D 影像操作',
        paragraphs: ['整合影像辨識，以及 2D、3D 影像的組合與旋轉功能，呈現術前模擬所需的影像資訊。'],
        figures: [{ src: assets['脊髓術前模擬'][1], caption: '脊髓術前模擬的 2D／3D 影像操作介面' }],
      },
      {
        id: 'scan-conversion', title: '256 切 X 光掃描影像整合',
        paragraphs: ['整合 256 切 X 光掃描的脊髓影像，轉換成 3D 影像。'],
      },
      {
        id: 'screw-modelling', title: '骨釘建模與術前導覽',
        paragraphs: ['將骨釘建模，結合影像操作功能，協助醫師進行術前模擬與導覽。'],
      },
    ],
  },
  'medical-iot': {
    introduction: [
      '物聯網醫美藥劑注射系統結合超音速霧化設備、藍牙連線與雲端控制，並以一次性 QR Code 管理藥劑授權與裝置啟用。',
      '從藥劑參數下載、施打紀錄回傳到使用者帳號管理，串接設備操作與後台分析，應用場景包含醫美診所、皮膚科與美容中心。',
    ],
    sections: [
      {
        id: 'project-info', title: '專案資訊與智能技術',
        features: [
          { title: '核心功能', text: '無針藥劑注射，搭配雲端噴射參數控制與藥劑管理。' },
          { title: '適用場景', text: '醫美診所、皮膚科與美容中心。' },
          { title: '設備技術', text: '超音速霧化技術、藍牙連線與 IoT 裝置互動。' },
          { title: '授權與追蹤', text: 'QR Code 授權啟用、單瓶藥劑追蹤、自動資料上傳與使用狀況分析。' },
        ],
      },
      {
        id: 'technical-core', title: '技術核心',
        paragraphs: ['以超音速氣流霧化與無針藥劑傳遞作為設備的技術方向。'],
        features: [
          { title: '霧化技術', text: '使用超音速氣流將藥劑均勻霧化，微粒規格為 200 nm 級。' },
          { title: '真皮層傳遞', text: '以微粒穿過表皮、將藥劑送達真皮層作為設計目標。' },
          { title: '無針設計', text: '採無針式注射設計，以降低交叉感染風險為目標。' },
        ],
        figures: [{ src: medical['za1.jpg'], caption: '物聯網醫美無針注射設備介紹', orientation: 'portrait' }],
      },
      {
        id: 'authorization', title: '授權使用機制',
        features: [
          { title: '一次性 QR Code 驗證', text: '每瓶藥劑附有一次性 QR Code 驗證標籤。' },
          { title: '裝置啟用次數', text: '掃描藥劑標籤後啟用裝置使用次數，預設為 200 次。' },
          { title: '藥劑補充管理', text: '藥劑耗盡後，需購買並啟用新的藥劑瓶。' },
          { title: '使用安全保障', text: '透過授權與驗證機制管理藥劑使用，防止未授權操作與偽造藥劑。' },
        ],
        figures: [
          { src: medical['za6.jpg'], caption: '一次性藥劑 QR Code 與授權啟用介面' },
          { src: medical['za4.jpg'], caption: '藥劑使用資料與紀錄查詢' },
          { src: medical['za5.png'], caption: '藥劑資訊與裝置操作畫面' },
        ],
      },
      {
        id: 'cloud-control', title: '雲端精準控制',
        paragraphs: [
          '不同藥劑具有各自的噴氣時間與流速曲線。設備從雲端下載對應參數，並自動校正設定，讓使用者無須逐項人工調整。',
          '將每瓶藥劑的參數與設備操作連結，提供即插即用的使用流程。',
        ],
        features: [{ title: '智慧雲端校正', text: '依對應藥劑下載參數，自動調整設備的噴射設定。' }],
        figures: [
          { src: medical['za2.jpg'], caption: '藥劑注射設備與行動裝置整合示意', orientation: 'portrait' },
          { src: medical['za3.jpg'], caption: '藥劑噴射參數設定畫面' },
        ],
      },
      {
        id: 'cloud-integration', title: '雲端整合功能',
        features: [
          { title: '藍牙連線', text: '連結裝置與資料同步流程，將使用資料傳送至雲端。' },
          { title: '施打數據回傳', text: '回傳施打量、使用次數與參數紀錄。' },
          { title: '雲端參數下載', text: '更新不同批次藥劑所需的噴射設定。' },
        ],
      },
      {
        id: 'account-management', title: '使用者帳號管理系統',
        paragraphs: [
          '使用者透過一次性 QR Code 啟用藥劑，並將施打紀錄即時上傳至雲端，讓醫療單位掌握使用情況。',
          '後台可進行使用趨勢統計與設備維護預測，串接使用者管理、資料分析及設備維護流程。',
        ],
        figures: [{ src: medical['za7.jpg'], caption: '使用者帳號與後台管理介面' }],
      },
    ],
  },
  'oral-care': oralCaseContent,
  'speech-therapy': {
    introduction: [
      '這是一款為語言學習較慢的兒童設計的語言治療軟體，結合互動遊戲、AI 引導、即時回饋與成長追蹤，提供個人化的語言學習體驗。',
      '透過拖曳填空、仿說練習、繪本互動與對話練習，讓孩子在故事與生活情境中練習理解和表達，家長與治療師也能持續了解學習歷程。',
    ],
    sections: [
      {
        id: 'introduction', title: '語言治療軟體簡介',
        paragraphs: ['結合多樣化的互動訓練與即時回饋，讓孩子以適合自己的節奏練習語言。'],
        features: [
          { title: '創新語言學習體驗', text: '各訓練方式具有互動與引導機制，透過遊戲化設計維持學習參與。' },
          { title: '智能引導與個性化學習', text: '透過即時提示與個人化練習，支持不同學習需求。' },
        ],
        figures: [
          { src: speech[1], caption: '語言治療應用程式畫面' },
          { src: speech[2], caption: '語言學習互動介面' },
          { src: speech[4], caption: '語言治療遊戲操作畫面' },
        ],
      },
      {
        id: 'drag-fill', title: '拖曳填空',
        paragraphs: [
          '透過拖曳組合句子，搭配文字導讀與語音練習，協助孩子理解句意、練習組句與口語表達。',
        ],
        figures: [{ src: speech[5], caption: '拖曳填空與句子練習介面' }],
      },
      {
        id: 'imitation', title: '仿說練習',
        paragraphs: ['結合圖像、示範與語音互動，讓孩子練習物件命名及詞彙表達，並透過即時提示獲得引導。'],
        figures: [
          { src: speech[6], caption: '仿說練習操作畫面' },
          { src: speech[9], caption: '情境問答與選項提示，協助孩子練習理解與回答' },
        ],
      },
      {
        id: 'picture-book', title: '繪本互動',
        paragraphs: ['以有聲故事、文字導讀及情境問答，陪伴孩子閱讀繪本，在故事中練習理解與表達。'],
        figures: [{ src: speech[7], caption: '有聲故事與繪本互動介面' }],
      },
      {
        id: 'conversation', title: '對話練習',
        paragraphs: ['透過與遊戲角色的語音互動，在模擬生活情境中練習問答與交流，增加開口表達的機會。'],
        figures: [{ src: speech[8], caption: '地圖探索與 NPC 對話練習' }],
      },
      {
        id: 'ai-guidance', title: 'AI 即時互動引導',
        paragraphs: [
          '在練習過程中提供文字與語音提示，協助孩子理解題意、嘗試回答並修正表達，讓互動更有方向。',
        ],
        features: [
          { title: '語音互動', text: '以自然的語音回答與角色交流，練習情境對話。' },
          { title: '即時提示與鼓勵', text: '透過引導與回饋，支持孩子持續嘗試。' },
        ],
        figures: [
          { src: speech[10], caption: 'AI 即時提示與語音互動', fullWidth: true },
        ],
      },
      {
        id: 'progress', title: '成長追蹤與語言能力分析',
        paragraphs: [
          '以練習紀錄與視覺化圖表呈現學習變化，讓家長與治療師了解孩子的練習情形，作為後續引導與課程調整的參考。',
        ],
        features: [
          { title: '學習歷程回顧', text: '集中檢視練習紀錄與成長趨勢，掌握需要持續練習的方向。' },
          { title: '治療師線上複評', text: '支援治療師查看紀錄與分析結果，提供練習建議。' },
        ],
        figures: [
          { src: speechPortfolio['h03.png'], caption: '學習成長趨勢', fullWidth: true },
          { src: speechPortfolio['h02.png'], caption: '學習紀錄查詢' },
          { src: speechPortfolio['h01.png'], caption: '練習歷程回顧' },
        ],
      },
      {
        id: 'assessment', title: '個人化練習與使用提醒',
        paragraphs: [
          '提供符合個人學習需求的練習與加強內容，搭配適時的休息提醒，支持孩子持續參與並保持合宜的使用節奏。',
        ],
      },
      {
        id: 'immersive-world', title: '沉浸式互動世界',
        paragraphs: ['結合 RPG 探索與語言訓練。玩家可控制角色在地圖中探索，並與 NPC 進行語音對話；NPC 依語音辨識結果回應，模擬點餐、購物及求助等情境，提供語言理解與口語表達的練習。'],
        figures: [{ src: speech[11], caption: 'RPG 探索與情境互動世界' }],
      },
      {
        id: 'rewards', title: '獎勵系統',
        paragraphs: ['以遊戲化獎勵回應練習表現，玩家完成練習與語音任務後，可取得金幣及經驗值。'],
        features: [
          { title: '遊戲商店', text: '使用獎勵購買裝飾物、角色服裝或特殊技能。' },
          { title: '治療師專屬獎勵', text: '支援治療師設定專屬獎勵，鼓勵學生完成訓練。' },
        ],
        figures: [{ src: speech[12], caption: '遊戲獎勵與商店畫面' }],
      },
    ],
  },
  'concrete-erp': erpCaseContent,
}
