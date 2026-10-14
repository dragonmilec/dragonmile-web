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

- Vue 3 + TypeScript + Vue Router
- TailwindCSS 4，搭配集中管理的視覺樣式與設計變數
- GSAP + ScrollTrigger：段落與圖片揭示
- Lenis：桌面平滑捲動
- Motion for Vue (`motion-v`)：案例篩選轉場
- VueUse：捲動、動態偏好、鍵盤事件與剪貼簿
- Lucide：一致的介面圖示

所有動態效果尊重 `prefers-reduced-motion`。此設計未使用選配 Three.js / TresJS。

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
| `/cases` | 九個真實案例及分類篩選 |
| `/cases/:slug` | 個別案例、原站說明、實作圖庫 |
| `/clients` | 原站十八個客戶標誌 |
| `/contact` | 原站聯絡資料及諮詢郵件草稿 |

## 內容依據與維護

- 首頁、關於、服務、案例、客戶、聯絡及資質頁皆取自原站。
- `src/data.ts` 是重整後的公司、服務、案例與客戶資料。
- `src/case-content.ts` 保留八個案例的功能介紹，依段落整理並配對實作圖片。吞嚥訓練與物聯網醫美依使用者指定的新參考頁更新，分別來自 `https://dragonmile.dev/portfolio/3`、`https://dragonmile.dev/portfolio/4`；其他案例沿用原本來源。`src/components/CaseArticle.vue` 提供案例簡介、內容目錄、完整文字、圖說及圖片放大。
- `CONTENT-SOURCES.json` 記錄每個複製素材的原始網址與來源頁。
- `public/assets/` 中使用原站實際素材，不依賴遠端圖片連線。
- `src/portfolio-assets.json` 對應新參考頁的十九張案例圖片，實體檔案在 `public/assets/portfolio/`。原始網址一併記錄於 `CONTENT-SOURCES.json`。
- 以原站照片作為示意的案例，並未聲稱照片是爵邁自有設備或廠房。
- 保留原站公司電話 `07-5523561`、公司信箱 `dgcorplimit@gmail.com`，以及聯絡頁專案電話、信箱與地址，並以標籤區分。
- 證書所載有效日期是民國 115 年 1 月 15 日（2026-01-15）。網站呈現原件及日期，未宣稱目前仍有效。取得更新證書後，應一併更新日期與素材。
- 未加入虛構的專案、客戶、績效、獎項或里程碑。

聯絡表單會驗證必填項目並產生可檢視、複製的郵件草稿。使用者點選「開啟郵件程式」後自行寄送；目前沒有表單 API、資料庫或自動寄信服務。

首頁主視覺與公司介紹之間的客戶 Logo 帶支援無縫循環、滑鼠及觸控左右拖曳。點擊 Logo 帶、「我們的客戶」或「查看全部」可開啟含十八個原站標誌的視窗。拖曳不會觸發點擊，手機垂直捲動保持可用；支援暫停、鍵盤方向鍵、Enter、Escape 與關閉後的焦點返回。減少動態效果設定會停用自動播放，但保留手動操作。

所有頁面的 Header 上方常駐資質列，以深藍灰底、暖金細線與證書圖示，完整呈現「經濟部認證之自動化服務機構輔導廠商」。捲動時僅縮小導覽列，資質入口持續顯示。點擊可檢視原證書、登錄類別與分項、證書編號及原始日期，也可前往 About 的完整資料。依使用者確認沿用原站證書，未更動有效日期；資料集中於 `src/qualification.ts`。頁內錨點與手機選單會依實際 Header 高度調整，避免常駐列遮住內容。

## 瀏覽器驗證

`scripts/qa.mjs` 使用 Playwright 與本機 Edge，預設驗證 `http://127.0.0.1:5173`。可透過 `QA_URL` 指定正式預覽伺服器。

```sh
node scripts/qa.mjs
```

檢查十九個桌面頁面路徑，以及六個主頁於 768px、390px、320px 的版面。包含頁面回應、主要標題、圖片、橫向溢出、案例篩選、郵件草稿、行動選單、圖片放大、404、頁面標題與一般動態效果。當 `QA_URL` 指向 4173 正式預覽時，另驗證十九個頁面在停用 JavaScript 下仍有完整內容。報告與截圖在忽略追蹤的 `qa-artifacts/`。

客戶 Logo 帶的獨立驗證使用 `node scripts/qa-client-carousel.mjs`，涵蓋循環邊界、滑鼠及原生觸控拖曳、拖曳與點擊區分、視窗、鍵盤、焦點、捲動鎖定、手機垂直捲動及四種螢幕寬度。

案例內容驗證使用 `node scripts/qa-case-content.mjs`，預設連接 4174 正式預覽。依原始八個案例逐項核對功能文字、目錄與圖片，驗證 1440px、768px、390px、320px 版面、圖片放大，以及停用 JavaScript 時的完整內容。

資質常駐列驗證使用 `node scripts/qa-qualification-header.mjs`，預設連接 4174 正式預覽。檢查五種螢幕寬度、跨頁顯示、捲動固定、證書原件與日期、鍵盤焦點、關閉與捲動恢復、手機選單及頁內錨點。
