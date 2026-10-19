import assets from './sports-assets.json'
import type { CaseContent } from './case-content'

const guard = assets['sport-guard']
const coaches = assets['sports-coaches']

export const sportsCaseContent: Record<string, CaseContent> = {
  'sport-guard': {
    introduction: [
      '「自主運動防護管理系統」以自主運動、運動防護與健康管理為核心，將分散的運動資訊、課程內容與問卷評估集中在同一個線上服務平台。',
      '使用者可依需求選擇運動防護類別，查看對應的課程與操作指引，再透過問卷了解自身狀況，建立從運動前準備、實際練習到自主評估的完整流程。',
    ],
    sections: [
      {
        id: 'category-entry', title: '運動防護分類入口',
        paragraphs: ['將運動相關內容依功能分類，讓使用者從清楚的入口選擇需要的項目，減少自行搜尋與整理資料的負擔。'],
        features: [
          { title: '依需求選擇', text: '從暖身、收操及其他運動防護項目進入對應內容，取得適合當下需求的操作指引。' },
          { title: '集中內容管理', text: '將課程與相關資訊整合於同一平台，讓整體瀏覽與使用流程更直覺。' },
        ],
        figures: [{ src: guard.entrance, caption: '自主運動防護管理系統的分類入口與影音導引' }],
      },
      {
        id: 'course-library', title: '課程瀏覽與自主練習',
        paragraphs: ['使用者選擇類別後，可瀏覽對應的運動課程，再進入個別課程查看影音與說明。平台提供暖身等課程內容，作為正式運動前的準備，協助建立運動流程與防護觀念。'],
        features: [
          { title: '課程列表', text: '集中呈現同類課程，方便查看不同動作與練習項目。' },
          { title: '影音操作指引', text: '透過課程影片與內容介紹，了解動作方式，依照課程進行自主練習。' },
        ],
        figures: [
          { src: guard.courses, caption: '收操課程列表與不同部位的伸展練習' },
          { src: guard.lesson, caption: '個別運動課程的影片播放與內容介紹' },
        ],
      },
      {
        id: 'questionnaire', title: '問卷評估與狀況記錄',
        paragraphs: ['問卷評估功能讓使用者透過填寫問題，記錄或了解目前的身體與運動狀況，作為後續選擇運動內容及自主健康管理的參考。'],
        figures: [{ src: guard.questionnaire, caption: '進入問卷前的填寫者資訊確認畫面' }],
      },
      {
        id: 'exercise-workflow', title: '整合自主運動防護流程',
        paragraphs: ['平台串接內容選擇、課程學習、實際運動與問卷評估，讓使用者可以循序完成運動準備與自身狀況了解。'],
        features: [
          { title: '01／選擇類別', text: '依自身需求，選擇合適的運動或防護項目。' },
          { title: '02／查看課程', text: '瀏覽對應的課程內容與操作說明。' },
          { title: '03／進行練習', text: '參考課程進行暖身或自主運動。' },
          { title: '04／填寫問卷', text: '記錄並了解自身狀況，作為後續自主健康管理的參考。' },
        ],
      },
    ],
  },
  'sports-coaches': {
    introduction: [
      '「運動醫學健身指導人力資源庫」整合專業教練資料建置、管理審核與公開查詢，建立經審核的人才資料庫，協助訪客找到符合需求的教練。',
      '平台串接訪客端、教練端與管理審核端：教練自行維護個人專業資料，管理單位確認公開條件，通過審核後再供訪客搜尋與瀏覽。',
    ],
    sections: [
      {
        id: 'public-directory', title: '訪客端：教練查詢與瀏覽',
        paragraphs: ['一般訪客不需登入，即可瀏覽已完成資料填寫並通過管理單位審核的公開教練名單。透過篩選條件縮小搜尋範圍，減少逐筆查看資料的時間。'],
        features: [
          { title: '條件篩選', text: '依專業領域、服務內容、相關資格及其他條件查找教練。' },
          { title: '個人資料瀏覽', text: '查看教練介紹、專業背景與服務資訊，進一步取得相關聯絡方式。' },
        ],
        figures: [
          { src: coaches.directory, caption: '公開教練名單與專業、服務資訊一覽' },
          { src: coaches.filters, caption: '依服務模式與服務區域等條件篩選教練', orientation: 'portrait' },
          { src: coaches.profile, caption: '個別教練的公開介紹與服務資訊' },
        ],
      },
      {
        id: 'coach-profile', title: '教練端：個人資料建立與管理',
        paragraphs: ['教練登入帳號後，可以自行建立與維護個人介紹、專業背景、服務內容及資格資訊。正式送審前可持續修改與確認資料，減少對管理人員代為建檔的依賴。'],
        features: [
          { title: '基本與專業資料', text: '管理個人基本資料、臨床指導領域及服務範圍與模式。' },
          { title: '資格與證明', text: '填寫專業進修及證照資訊，提供相關文件供管理單位確認。' },
          { title: '介紹與聯絡資訊', text: '維護深度自我介紹、社群連結與對外服務資訊。' },
        ],
        figures: [
          { src: coaches.account, caption: '教練帳號與個人基本資料管理' },
          { src: coaches.expertise, caption: '臨床指導領域、服務範圍與服務模式設定' },
          { src: coaches.credentials, caption: '專業進修、證照及證明文件設定', orientation: 'portrait' },
          { src: coaches.introduction, caption: '自我介紹與社群聯絡資訊設定', orientation: 'portrait' },
        ],
      },
      {
        id: 'submission', title: '送審機制：完成資料後再送出',
        paragraphs: ['教練完成個人資料後，須主動送出審核，資料才會進入管理端的確認流程，不會因為完成註冊或儲存內容就立即公開。'],
        features: [
          { title: '教練操作流程', text: '教練登入 → 建立／修改個人資料 → 確認資料 → 送出審核。' },
          { title: '資料狀態流程', text: '編輯中 → 已送審 → 審核中 → 審核通過 → 公開顯示。' },
        ],
      },
      {
        id: 'management-review', title: '管理端：審核與公開把關',
        paragraphs: ['管理人員查看教練送出的資料，確認內容完整性及是否符合公開條件。確認無誤並設定為審核通過後，資料才會加入公開人力資源庫。若仍需修改，可維持未通過狀態，待教練調整後再次送審。'],
        figures: [{ src: coaches.review, caption: '平台首頁呈現的服務流程與資格審查機制介紹' }],
      },
      {
        id: 'publication', title: '先建立、後審核、再公開',
        paragraphs: ['公開條件為「已完成個人資料設定 + 已送出審核 + 管理端審核通過」。尚未完成或尚未通過審核的資料，不會出現在訪客可瀏覽的公開名單。', '透過「教練自行維護資料 → 管理端把關 → 訪客公開查詢」的運作模式，將資料管理、資格審核與公開查詢整合在同一套系統中。'],
        features: [
          { title: '對訪客', text: '透過公開名單與條件篩選，查找符合需求的專業教練。' },
          { title: '對教練', text: '自行維護專業資料，確認內容後送交管理單位審核。' },
          { title: '對管理單位', text: '控制資料公開條件，區分編輯中的內容與核准公開的資訊。' },
        ],
      },
    ],
  },
}
