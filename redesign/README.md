# 爵邁有限公司 / Dragon Mile

以原站 https://dragon-mile.com/ 內容及本機原始素材重建的企業網站。

## 開發

需要 Node.js 22 或以上版本。

```sh
cd redesign
npm install
npm run dev
```

Windows PowerShell 若停用 `.ps1`，使用 `npm.cmd` 取代 `npm`。

```sh
npm run check
npm run build
npm run preview
```

正式輸出位於 `dist/`。建置時由 Vue 伺服器端渲染產生每個頁面的完整靜態 HTML，瀏覽器再接管互動；主頁內容不依賴 JavaScript 才能讀取。`dist/_redirects` 提供支援該格式的靜態主機 fallback。

## 技術

主要內文、聯絡資訊與輸入內容已調整為 20px，操作文字、標籤、案例分類、圖說、證書資料與輔助說明至少 18px，手機與桌面共用相同閱讀尺寸。純裝飾性英文、章節序號與圖片索引維持原樣。設定集中於 `src/readability.css`；手機首頁展示、單欄表單及證書欄位會重新排列，避免大字被裁切。`node scripts/qa-readability.mjs` 檢查五種視窗的字體、溢出、證書及表單。

- Vue 3 + TypeScript + Vue Router
- TailwindCSS 4，搭配集中管理的視覺樣式與設計變數
- GSAP + ScrollTrigger：段落與圖片揭示
- Lenis：桌面平滑捲動
- Motion for Vue (`motion-v`)：案例篩選轉場
- VueUse：捲動、動態偏好、鍵盤事件與剪貼簿
- Lucide：一致的介面圖示

所有動態效果尊重 `prefers-reduced-motion`。此設計未使用選配 Three.js / TresJS。

## 首頁實績揭示

首頁右側依序展示台泥鳳勝 ERP、科技輔導、科技競賽及專案展示；新項目由上方進入，前一項同步壓縮到底部。完成後前三項保留在專案下方，點選可重新展開到相同尺寸，其餘項目同步收起。手機將展示區放在主標題及服務按鈕下方。

`src/components/HeroProjects.vue` 展示 CNC 機台監控、智慧機台管理系統、運動醫學健身指導人力資源庫與混凝土 ERP 四個案例，支援自動輪播、手動切換及暫停；每項時間由 `PROJECT_INTERVAL_MS = 5000` 設定（毫秒）。圖片與標題均連至自己的案例頁，收合或減少動態時停用自動輪播。

`src/components/HomeHero.vue` 使用現有 ERP 畫面及先前提供的證書、競賽圖片，保存在 `public/assets/credentials/`。每次載入、重整或站內返回首頁都重新播放展示；減少動態設定會略過開場並保留手動切換。`QA_URL=http://127.0.0.1:5175 node scripts/qa-opening.mjs` 驗證順序、移動方向、收合、等尺寸展開、圖片視窗與窄版面；指向 4176 正式預覽時加驗靜態 HTML。

## 頁面

| 路徑 | 內容 |
| --- | --- |
| `/` | 公司、核心服務、精選案例、資質、客戶 |
| `/about` | 公司與技術能力、證書原件及原始日期 |
| `/services` | 四項核心能力、原站延伸服務、開發流程 |
| `/services/app` | 應用程式開發 |
| `/services/database` | 資料庫解決方案 |
| `/services/iot` | 物聯網整合 |
| `/services/pcb` | 電路與 PCB 設計 |
| `/cases` | 十三個真實案例，依智能醫療、智能工控／服務、ERP 篩選 |
| `/cases/sport-guard` | 自主運動防護管理系統 |
| `/cases/sports-coaches` | 運動醫學健身指導人力資源庫 |
| `/cases/wen-yang-metal` | 穩揚金屬・生產與服務管理，歸於智能工控／服務 |
| `/cases/smart-machine-management` | 智慧機台管理系統，歸於智能工控／服務 |
| `/cases/:slug` | 個別案例、原站說明、實作圖庫 |
| `/clients` | 原站十八個客戶標誌 |
| `/contact` | 原站聯絡資料及諮詢郵件草稿 |

## 內容依據與維護

- 首頁、關於、服務、客戶、聯絡及資質頁以原站資料為基礎；案例另採使用者指定的新版參考頁及提供的專案文件。
- `src/data.ts` 是重整後的公司、服務、案例與客戶資料。
- `src/machine-case-content.ts` 依 `智慧機台管理系統_操作說明.pptx` 整理十個段落，涵蓋儀表板、帳號權限、組織、PLC 上傳、機台管理與綁定、保養提醒、紀錄、數據監控與操作日誌。重複的 PLC 說明合併呈現，保留首次上傳前提、解綁影響及 AI 預測仍須依維修流程確認的原始說明。
- `src/machine-assets.json` 對應 `public/assets/smart-machine/` 的十五張原始系統截圖；簡報文字保存在 `references/smart-machine/presentation-text.json`，素材頁次記錄於 `CONTENT-SOURCES.json`。使用 `python scripts/import-machine-presentation.py <簡報.pptx>` 可重新匯入。裝飾背景未作為系統畫面，此案沒有外部參考網址。
- `src/metal-case-content.ts` 依提供的穩揚金屬專案文件整理生產、物料、機台、排程、績效、後處理與基礎代碼功能，並依使用者確認整合客戶服務介面。七張原始截圖的內容是工作看板、客戶諮詢與訂單追蹤、場勘、快速報價、報價單、需求及客戶資料，圖說以實際畫面為準。分類依使用者指定為智能工控／服務。
- `src/metal-assets.json` 對應 `public/assets/wen-yang-metal/` 的七張圖片；原始文件保存在 `references/wen-yang-metal/`，素材依據記錄於 `CONTENT-SOURCES.json`。可使用 `node scripts/import-metal-assets.mjs <專案資料夾>` 重新匯入。此案未提供可公開參考網址，案例頁不顯示外部參考連結。
- `/cases/concrete-erp` 依使用者提供的 `ERP介紹(1).pptx` 擴充既有混凝土 ERP 案例，維持原路徑與分類。`src/erp-case-content.ts` 整理出貨、剩退料、庫存維護、應收應付、發票、票據、薪資、成本、總帳、資料管理、導入與技術平台等十七個段落。分期擴充明確標為規劃，不宣稱電子簽核已完成。
- `src/erp-assets.json` 對應簡報中的三十六張原始系統畫面、報表及架構示意，保存在 `public/assets/erp/`。`references/erp/presentation-text.json` 保留二十六頁的文字與 SmartArt 內容；`CONTENT-SOURCES.json` 記錄素材所在頁次。可使用 `python scripts/import-erp-presentation.py <簡報.pptx>` 重新匯入；裝飾圖示與通用情境照片未作為實作畫面。
- `src/sports-case-content.ts` 依使用者提供的兩份介紹文件整理新增案例。原始文字保存在 `references/sports/`；十三張原始截圖保存於 `public/assets/sports/`，對應表為 `src/sports-assets.json`。可使用 `node scripts/import-sports-assets.mjs <參考資料夾>` 重新匯入素材。
- 案例統一使用三類：智能醫療（七案）、智能工控／服務（五案，含智慧機台管理、穩揚金屬及貨櫃辨識）、ERP（一案）；四項技術服務保持獨立。首頁精選案例各呈現其中一類，並展示新增的人力資源庫。
- `src/case-content.ts` 保留八個案例的功能介紹，依段落整理並配對實作圖片。吞嚥訓練與物聯網醫美依使用者指定的新參考頁更新，分別來自 `https://dragonmile.dev/portfolio/3`、`https://dragonmile.dev/portfolio/4`；其他案例沿用原本來源。`src/components/CaseArticle.vue` 提供案例簡介、內容目錄、完整文字、圖說及圖片放大。
- `CONTENT-SOURCES.json` 記錄每個複製素材的原始網址與來源頁。
- `public/assets/` 中使用原站實際素材，不依賴遠端圖片連線。
- `src/portfolio-assets.json` 對應新參考頁的十九張案例圖片，實體檔案在 `public/assets/portfolio/`。原始網址一併記錄於 `CONTENT-SOURCES.json`。
- 以原站照片作為示意的案例，並未聲稱照片是爵邁自有設備或廠房。
- 保留原站公司電話 `07-5523561`、公司信箱 `dgcorplimit@gmail.com`，以及聯絡頁專案電話、信箱與地址，並以標籤區分。
- 使用提供的新版證書，編號 115-AU-5-50955037-1113，登錄期間為 2026-05-01 至 2028-05-01。首頁、頂部資質視窗及 About 資格資料共用新版圖片與日期。
- 未加入虛構的專案、客戶、績效、獎項或里程碑。

聯絡表單會驗證必填項目並產生可檢視、複製的郵件草稿。使用者點選「開啟郵件程式」後自行寄送；目前沒有表單 API、資料庫或自動寄信服務。

首頁主視覺與公司介紹之間的客戶 Logo 帶支援無縫循環、滑鼠及觸控左右拖曳。點擊 Logo 帶、「我們的客戶」或「查看全部」可開啟含十八個原站標誌的視窗。拖曳不會觸發點擊，手機垂直捲動保持可用；支援暫停、鍵盤方向鍵、Enter、Escape 與關閉後的焦點返回。減少動態效果設定會停用自動播放，但保留手動操作。

所有頁面的 Header 上方常駐資質列，呈現「經濟部登錄之自動化技術服務機構」。點擊可檢視新版證書、登錄類別與分項、編號及 2026-05-01 至 2028-05-01 的登錄期間，也可前往 About 的完整資料。首頁「查看資格」直接開啟相同證書視窗。資料集中於 `src/qualification.ts`，手機版按鈕保持在展開區域內，關閉證書後焦點返回原按鈕。

## 瀏覽器驗證

`scripts/qa.mjs` 使用 Playwright 與本機 Edge，預設驗證 `http://127.0.0.1:5173`。可透過 `QA_URL` 指定正式預覽伺服器。

```sh
node scripts/qa.mjs
```

檢查二十三個桌面頁面路徑，以及六個主頁於 768px、390px、320px 的版面。包含頁面回應、主要標題、圖片、橫向溢出、三大案例分類與數量、郵件草稿、行動選單、圖片放大、404、頁面標題與一般動態效果。當 `QA_URL` 指向 4173 正式預覽時，另驗證二十三個頁面在停用 JavaScript 下仍有完整內容。報告與截圖在忽略追蹤的 `qa-artifacts/`。

客戶 Logo 帶的獨立驗證使用 `node scripts/qa-client-carousel.mjs`，涵蓋循環邊界、滑鼠及原生觸控拖曳、拖曳與點擊區分、視窗、鍵盤、焦點、捲動鎖定、手機垂直捲動及四種螢幕寬度。

案例內容驗證使用 `node scripts/qa-case-content.mjs`，預設連接 4174 正式預覽。依十二個完整案例逐項核對功能文字、目錄與圖片，包含新增兩案的十三張截圖與參考連結；驗證 1440px、768px、390px、320px 版面、圖片放大，以及停用 JavaScript 時的完整內容。

資質常駐列驗證使用 `node scripts/qa-qualification-header.mjs`，預設連接 4174 正式預覽。檢查五種螢幕寬度、跨頁顯示、捲動固定、證書原件與日期、鍵盤焦點、關閉與捲動恢復、手機選單及頁內錨點。
