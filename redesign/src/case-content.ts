import assets from './assets.json'
import portfolioAssets from './portfolio-assets.json'

export interface CaseFigure {
  src: string
  caption: string
  orientation?: 'portrait'
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
const oral = assets['智慧口腔暨吞嚥賦能照護雲管家']
const speech = assets['語言治療']
const erp = assets['混泥土-客製化erp']

// Keep descriptions and figures together. The swallow-training and medical-iot
// entries follow the user's newer dragonmile.dev references; other cases retain
// their original dragon-mile.com sources.
export const caseContent: Record<string, CaseContent> = {
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
  'oral-care': {
    introduction: [
      '智慧口腔暨吞嚥賦能照護雲管家整合 APP 相機拍攝、照片上傳、口腔資料庫與分析功能，協助記錄及追蹤使用者的口腔健康狀況。',
      '從口腔影像及牙菌斑分析，到每日健康趨勢、條件搜尋及單位帳號管理，將拍攝、資料檢視與後台維護串接在同一套管理流程中。',
    ],
    sections: [
      {
        id: 'camera-upload', title: '相機拍攝與照片上傳',
        paragraphs: [
          '使用者可直接在 APP 內啟動相機，拍攝需要記錄的照片，無須切換至其他應用程式。',
          '拍攝後可將照片上傳至系統。牙齒影像及其他健康記錄會保存上傳日期與相關資料，讓後續記錄與追蹤具有可追溯性。',
        ],
        figures: [{ src: oral[1], caption: 'APP 口腔相機拍攝介面' }],
      },
      {
        id: 'oral-database', title: '口腔資料庫與明細檢視',
        paragraphs: ['口腔資料庫記錄每位使用者的日期、所屬單位、拍攝者名稱及被拍攝者等資訊，保存口腔檢測資料的關聯。'],
        features: [
          { title: '完整資料記錄', text: '記錄日期、單位、拍攝者與被拍攝者，保留口腔檢測資料的追溯資訊。' },
          { title: '顯示明細與刪除', text: '每筆資料提供「顯示明細」與「刪除」操作，方便檢視及維護。' },
          { title: '詳細明細視窗', text: '呈現牙齒圖片、牙菌斑分析圖與口腔健康紀錄，包含拍攝位置及牙菌斑覆蓋率。' },
        ],
        figures: [
          { src: oral[2], caption: '口腔影像與分析資料檢視' },
          { src: oral[3], caption: '口腔影像與健康記錄明細' },
        ],
      },
      {
        id: 'plaque-analysis', title: '牙菌斑精準分析',
        paragraphs: ['在「顯示明細」中，系統會生成牙菌斑分析圖，並提供口腔健康紀錄，讓醫療人員查看牙菌斑覆蓋率及口腔健康趨勢。'],
        figures: [{ src: oral[5], caption: '口腔資料分析與趨勢管理介面' }],
      },
      {
        id: 'health-trends', title: '每日健康趨勢圖表',
        paragraphs: ['系統以每日牙菌斑覆蓋率趨勢圖呈現口腔健康變化，將資料轉為圖表，協助醫療團隊追蹤長期狀況。'],
        figures: [{ src: oral[4], caption: '每日牙菌斑覆蓋率與健康趨勢畫面' }],
      },
      {
        id: 'search', title: '多條件搜尋功能',
        paragraphs: ['可依拍攝日期、使用者姓名及所屬單位等條件篩選，尋找需要的口腔健康資料。'],
      },
      {
        id: 'organisation-accounts', title: '靈活的單位與帳號管理',
        paragraphs: ['單位資料庫與帳號資料庫皆支援新增、讀取、更新及刪除（CRUD）操作，讓管理者維護單位與帳號的基本資訊。介面提供相對應的操作方式，方便新增、修改及查詢資料。'],
        features: [
          { title: '完整 CRUD 操作', text: '新增、讀取、更新、刪除單位及帳號資訊。' },
          { title: '權限與安全控制', text: '依帳號與角色管理存取權限，讓不同使用者存取對應的功能及資料。' },
        ],
      },
    ],
  },
  'speech-therapy': {
    introduction: [
      '這是一款為語言學習較慢的兒童設計的語言治療軟體，結合互動遊戲、AI 引導、即時回饋與成長追蹤，提供個人化的語言學習體驗。',
      '從句子填空、仿說、繪本互動到與 NPC 對話，透過四種類型的訓練，讓孩子在情境與遊戲中進行語言練習。',
    ],
    sections: [
      {
        id: 'introduction', title: '語言治療軟體簡介',
        paragraphs: ['透過多樣化訓練模式與互動設計，在作答過程中提供即時引導與回饋，並依答題紀錄調整學習內容與節奏。'],
        features: [
          { title: '創新語言學習體驗', text: '各訓練方式具有互動與引導機制，透過遊戲化設計維持學習參與。' },
          { title: '智能引導與個性化學習', text: 'AI 檢測答題情形，並依使用者答題記錄進行個人化調整。' },
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
          '使用者透過拖曳將句子拼湊完整，作答時由 AI 提供引導，搭配類似 KTV 的文字導讀，協助理解句子。',
          '正確拼湊後進入「語音復送」，使用者重複唸出完整句子，由 AI 評估語音正確性並提供指導，完成後獲得金幣獎勵。題目分為簡單、中等及困難，並提供不同情境挑戰。',
        ],
        figures: [{ src: speech[5], caption: '拖曳填空與句子練習介面' }],
      },
      {
        id: 'imitation', title: '仿說練習',
        paragraphs: ['玩家點選選項並回答物件名稱。答錯時由 AI 引導，全部選項答對後獲得金幣獎勵，透過反覆互動練習詞彙辨識及應用。'],
        figures: [{ src: speech[6], caption: '仿說練習操作畫面' }],
      },
      {
        id: 'picture-book', title: '繪本互動',
        paragraphs: ['玩家觀看有聲故事並跟隨文字導讀。各章節包含小題，依故事情境進行拖曳與回答，答錯時由 AI 提供引導。拖曳正確後進入回答階段，依目前情境練習語言表達。'],
        figures: [{ src: speech[7], caption: '有聲故事與繪本互動介面' }],
      },
      {
        id: 'conversation', title: '對話練習',
        paragraphs: ['玩家以俯視角度在地圖中與 NPC 互動，透過麥克風進行對話。對話表現良好時獲得金幣獎勵，在模擬情境中練習語音交流。'],
        figures: [{ src: speech[8], caption: '地圖探索與 NPC 對話練習' }],
      },
      {
        id: 'progress', title: '個人化成長記錄與加強模式',
        paragraphs: [
          '系統記錄每位使用者的遊玩關卡、難度、時間，以及 AI 與使用者的互動細節，並以成長曲線追蹤詞彙量與不同類型詞彙的使用情形。',
          '針對多次答錯的題目，提供「加強模式」，讓使用者對較不熟悉的內容進行重點練習。',
        ],
        figures: [
          { src: speech[9], caption: '個人化學習與成長記錄畫面' },
          { src: speech[10], caption: '語言訓練記錄與管理介面' },
        ],
      },
      {
        id: 'assessment', title: '仁慈與嚴謹機制',
        paragraphs: [
          '「仁慈」機制可適度降低答題標準，讓使用者在答案尚未完全正確時仍能持續練習。',
          '同一題目多次答對後，系統可切換至「嚴謹」模式，要求 100% 正確答案，進行更高標準的練習。',
        ],
      },
      {
        id: 'question-switching', title: '智能題目切換',
        paragraphs: ['若使用者在同一題目停留過久，系統自動切換至相同難度的其他題目，協助維持學習動力，減少卡關帶來的挫折。'],
      },
      {
        id: 'eye-protection', title: '防沉迷與護眼保護機制',
        paragraphs: ['遊戲設有每半小時的休息保護機制，提醒使用者適時休息，避免長時間連續使用電子設備。'],
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
  'concrete-erp': {
    introduction: [
      '混凝土 ERP 系統提供企業資源規劃解決方案，涵蓋雲端網頁化、帳號權限、資料追蹤與回復、資料庫建置、總廠分廠資訊共享，以及介面與報表調整。',
      '系統已導入台泥子公司鳳勝實業，涵蓋全台 15 個工廠與一總管理處。',
    ],
    sections: [
      {
        id: 'web-system', title: '混凝土 ERP 系統架構與雲端網頁化',
        paragraphs: ['以雲端網頁化的系統提供企業資源規劃功能，包含歷史資料追蹤與回復，以及系統安全管理。'],
      },
      {
        id: 'permissions', title: '帳號權限管理',
        paragraphs: ['系統納入帳號權限管理功能，管理企業系統的帳號與操作權限。'],
        figures: [{ src: erp[1], caption: 'ERP 帳號與權限管理介面' }],
      },
      {
        id: 'history', title: '資料可追蹤、分析與回復',
        paragraphs: ['提供歷史資料追蹤、分析與回復功能，降低人為操作因素對資料管理的影響。'],
        figures: [{ src: erp[2], caption: 'ERP 資料追蹤與歷史記錄畫面' }],
      },
      {
        id: 'databases', title: '私有資料庫與第三方雲端資料庫',
        features: [{ title: '建置私有資料庫' }, { title: '第三方雲端資料庫' }],
        figures: [
          { src: erp[3], caption: '私有資料庫與企業資訊架構示意' },
          { src: erp[4], caption: '第三方雲端資料庫架構示意' },
        ],
      },
      {
        id: 'factory-integration', title: '總廠分廠管理與資訊共享',
        paragraphs: ['整合公司資訊，讓總廠與分廠管理更方便。總廠、分廠使用一致的操作介面，讓全公司共享資訊並即時取得資料。'],
        figures: [
          { src: erp[5], caption: '企業資料與總廠分廠管理畫面' },
          { src: erp[6], caption: '企業資訊與報表呈現' },
        ],
      },
      {
        id: 'reports', title: '人性化介面與報表呈現',
        paragraphs: ['依照使用習慣調整介面與報表呈現。透過修改範本，快速調整報表格式。'],
        figures: [
          { src: erp[7], caption: 'ERP 操作介面與範本調整' },
          { src: erp[8], caption: 'ERP 報表與資料呈現畫面' },
        ],
      },
    ],
  },
}
