import images from './machine-assets.json'
import type { CaseContent } from './case-content'

export const machineCaseContent: CaseContent = {
  introduction: [
    '智慧機台管理系統串接現場 PLC 與管理平台，集中管理使用者、經銷商、廠域及設備歸屬，將機台數據、保養提醒與操作紀錄整合在同一套系統中。',
    '現場端透過 SmartMachine_PLC 桌面程式採集與上傳數據；管理人員則可從網頁查看即時指標、歷史趨勢及數據日誌，並依組織權限管理機台與保養作業。',
  ],
  sections: [
    {
      id: 'dashboard', title: '儀表板與六大管理功能',
      paragraphs: ['登入後由左側導覽切換儀表板、使用者管理、經銷商管理、廠域管理、機台管理及使用紀錄。左下角提供帳號、角色與登出入口，右上角可切換顯示模式。'],
      features: [
        { title: '統計與待辦', text: '集中查看使用者、經銷商、廠域、機台及待保養數量。' },
        { title: '快捷操作', text: '直接前往常用管理頁，或從待保養區進入指定機台的保養紀錄。' },
      ],
      figures: [{ src: images.dashboard, caption: '系統儀表板的統計、快捷入口與待保養事項' }],
    },
    {
      id: 'users', title: '使用者、角色與資料範圍',
      features: [
        { title: '查詢與建立帳號', text: '依帳號或姓名篩選使用者，新增時填寫基本資料並設定初始密碼。' },
        { title: '角色權限', text: '分派管理員、經銷商或廠域角色，並指定所屬組織及資料範圍。' },
        { title: '帳號維護', text: '支援編輯資料、重設密碼與刪除帳號。' },
      ],
      figures: [
        { src: images.users, caption: '使用者清單、角色與帳號維護介面' },
        { src: images['user-form'], caption: '新增使用者與角色、組織範圍設定', orientation: 'portrait' },
      ],
    },
    {
      id: 'organizations', title: '經銷商與廠域歸屬管理',
      paragraphs: ['建議依「經銷商 → 廠域 → 使用者權限 → 機台綁定」的順序完成設定，建立設備與組織的關聯。'],
      features: [
        { title: '經銷商管理', text: '以卡片呈現名稱、ID 與關聯廠域，建立並維護經銷商資料。' },
        { title: '廠域管理', text: '依經銷商篩選廠域；新增廠域時指定所屬經銷商，建立後再進行機台綁定。' },
      ],
      figures: [
        { src: images.dealers, caption: '經銷商卡片與關聯廠域資訊' },
        { src: images.sites, caption: '依經銷商篩選與管理所屬廠域' },
      ],
    },
    {
      id: 'plc-upload', title: 'PLC 連線與數據自動上傳',
      paragraphs: ['透過 Windows 桌面程式 SmartMachine_PLC 採集現場 PLC 數據並自動上傳伺服器，串接設備端與管理平台。'],
      features: [
        { title: '設定機台', text: '輸入機台名稱並儲存設定，勾選「開機自動啟動此程式」，再開始連線。' },
        { title: '開機自啟', text: '電腦開機後於背景啟動，自動連線、採集與上報，減少現場手動操作。' },
        { title: '自動重連', text: 'PLC 關機後轉為低頻待機，恢復開機後自動重新連線與上報。' },
        { title: '機台首次登錄', text: '須先由 SmartMachine_PLC 上傳機台數據，設備才會出現在機台管理頁面。' },
      ],
      figures: [{ src: images['plc-client'], caption: 'SmartMachine_PLC 桌面程式的機台、連線與上報設定' }],
    },
    {
      id: 'machine-management', title: '機台查詢、管理與資料匯出',
      features: [
        { title: '條件篩選', text: '依經銷商、廠域縮小設備清單，或只顯示未綁定機台。' },
        { title: '設備卡片', text: '查看綁定狀態、所屬組織、保養提醒及待保養數量。' },
        { title: '管理入口', text: '由卡片進入數據監控、保養紀錄、保養排程設定，或處理解除綁定。' },
        { title: '資料匯出', text: '提供 CSV 與 Excel 匯出，方便檢視設備基本資料。' },
      ],
      figures: [{ src: images.machines, caption: '機台清單、組織篩選與設備管理卡片' }],
    },
    {
      id: 'machine-binding', title: '機台綁定與組織關聯',
      paragraphs: ['在未綁定機台卡片點選綁定，先選經銷商，系統再依所選經銷商過濾可選廠域。選擇對應廠域並提交後，完成設備歸屬設定。', '解除綁定前須確認設備已移轉或不再使用；解綁後，機台會失去原本的組織關聯。'],
      figures: [
        { src: images['unbound-machine'], caption: '未綁定機台的狀態與綁定入口', orientation: 'portrait' },
        { src: images.binding, caption: '選擇經銷商與所屬廠域的綁定視窗' },
      ],
    },
    {
      id: 'maintenance-settings', title: '保養排程與信箱提醒',
      paragraphs: ['由機台卡片進入保養設定，填寫通知信箱及各項目的下次提醒日期，儲存後於機台卡片確認日期更新。'],
      features: [
        { title: '水箱水', text: '冰水機水箱水定期換新提醒。' },
        { title: '濾網', text: '冰水機濾網定期清潔提醒。' },
        { title: '水塔水槽', text: '散熱水塔水槽定期換新提醒。' },
      ],
      figures: [{ src: images['maintenance-settings'], caption: '保養通知信箱與各項目的下次提醒日期設定', orientation: 'portrait' }],
    },
    {
      id: 'maintenance-records', title: '保養紀錄與完成確認',
      paragraphs: ['從機台卡片或儀表板進入保養紀錄，以「全部／待保養／已完成」篩選項目。實際保養完成後執行完成確認，將待辦轉為已完成並記錄完成時間。'],
      figures: [{ src: images['maintenance-records'], caption: '機台保養紀錄、狀態篩選與完成確認' }],
    },
    {
      id: 'data-monitoring', title: '即時數據、歷史趨勢與 AI 預警',
      features: [
        { title: '查詢範圍', text: '指定起始與結束時間、筆數限制及診斷結果，再查詢機台資料。' },
        { title: '即時指標', text: '查看溫度、SV 設定值、水流量、電流、電壓，以及泵浦與壓縮機電流。' },
        { title: '歷史趨勢', text: '切換 5 分鐘、10 分鐘或 1 小時範圍，並選擇溫度、電流、電壓與水流曲線。' },
        { title: '數據日誌', text: '查看各筆資料的時間、狀態與診斷結果，並匯出數據或 AI 預警紀錄。' },
      ],
      paragraphs: ['畫面中的「壓縮機異常」為當次模型預測結果；實際故障仍須依維修流程確認。'],
      figures: [
        { src: images.monitoring, caption: '機台即時指標、診斷結果與歷史趨勢圖' },
        { src: images['data-log'], caption: '數據日誌、診斷結果與 AI 預警紀錄匯出入口' },
      ],
    },
    {
      id: 'usage-records', title: '使用紀錄與操作軌跡查詢',
      paragraphs: ['管理員可透過使用紀錄查看歷史操作日誌，依查詢條件追蹤系統操作軌跡，並匯出紀錄供管理使用。'],
      figures: [{ src: images['usage-records'], caption: '使用紀錄統計、操作日誌查詢與 CSV／Excel 匯出' }],
    },
  ],
}
