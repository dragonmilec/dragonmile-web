import images from './erp-assets.json'
import type { CaseContent } from './case-content'

// Based on the client's 26-slide ERP introduction. Roadmap items remain plans.
export const erpCaseContent: CaseContent = {
  introduction: [
    '為混凝土產業規劃的 ERP 系統，整合廠部與總公司的營運資料，串接出貨、庫存、車輛回廠、出勤薪資、應收應付、發票、票據、成本與總帳管理，讓現場作業與財務資訊共用一致的資料。',
    '以雲端網頁化介面支援跨廠管理，結合帳號權限、歷史資料追蹤與回復、彈性報表及資料備份，協助企業減少重複輸入，掌握各部門的作業與經營資訊。',
    '系統已導入台泥子公司鳳勝實業，涵蓋全台 15 個工廠與一總管理處。',
  ],
  sections: [
    {
      id: 'project-scope', title: '混凝土 ERP 系統架構與功能範圍',
      paragraphs: ['依廠部與總公司的作業需求安排功能模組，將現場出貨、材料與設備管理，串接至企業的財務與人事作業。'],
      features: [
        { title: '廠部功能', text: '出貨管理、庫存與維護、車輛回廠、應收帳款、應付帳款、發票開立，以及廠部出勤薪資。' },
        { title: '總公司功能', text: '應收帳款、應付帳款、發票開立、總公司出勤薪資、票據管理、成本管理與總帳。' },
      ],
    },
    {
      id: 'dispatch', title: '出貨管理：從每日排單到出貨單',
      features: [
        { title: '每日調度輸入', text: '輸入每日出貨計畫，包含工地規劃及客戶需求的混凝土數量。' },
        { title: '出貨調度', text: '以視覺化介面呈現廠內預備車輛及對應工地，協助調度人員安排出貨。' },
        { title: '生成出貨單', text: '調度完成後自動生成對應出貨單，供後續追蹤與管理。' },
      ],
      figures: [
        { src: images['daily-dispatch'], caption: '每日出貨計畫與調度資料輸入' },
        { src: images['dispatch-planning'], caption: '廠內車輛與工地的出貨調度介面' },
        { src: images['delivery-order'], caption: '調度完成後的出貨單資料管理' },
      ],
    },
    {
      id: 'vehicle-return', title: '車輛回廠與剩退料管理',
      paragraphs: ['記錄車輛回廠後的剩料處理情形，生成剩退料資料表，讓後續的管理、追蹤與資源利用有據可查。'],
      figures: [{ src: images['vehicle-return'], caption: '車輛回廠、剩料與退料資料登錄' }],
    },
    {
      id: 'inventory-maintenance', title: '庫存與維護管理',
      features: [
        { title: '材料耗用追蹤', text: '管理原材料與成品的耗用情況，保留詳細使用紀錄，作為庫存掌握與採購規劃的依據。' },
        { title: '車輛與機械維護', text: '記錄設備維護時間、項目與成本，協助管理人員追蹤維護狀況及安排後續作業。' },
      ],
      figures: [
        { src: images['material-usage'], caption: '材料耗用與庫存相關資料管理' },
        { src: images.maintenance, caption: '車輛與機械維護資料管理' },
      ],
    },
    {
      id: 'accounts-payable', title: '應付帳款：採購、發票與付款',
      features: [
        { title: '採購流程', text: '記錄採購單、核對收貨單，再建立對應的應付帳款。' },
        { title: '發票管理', text: '管理各項發票並核對內容，維持單據資料的一致性。' },
        { title: '付款管理', text: '記錄付款資訊與定期付款作業，掌握應付項目及資金流動。' },
      ],
      figures: [
        { src: images['purchase-payment'], caption: '採購付款資料與相關單據管理' },
        { src: images['payable-records'], caption: '應付帳款資料查詢與維護' },
      ],
    },
    {
      id: 'accounts-receivable', title: '應收帳款：銷售與款項追蹤',
      features: [
        { title: '銷售流程', text: '記錄銷售單、生成出貨單，並確認出貨完成。' },
        { title: '開立發票', text: '自動生成發票並關聯相關單據，保持銷售、出貨與發票資料一致。' },
        { title: '款項追蹤', text: '追蹤應收款項與付款進度，協助安排催收及掌握資金回流。' },
      ],
      figures: [
        { src: images['sales-delivery'], caption: '銷售出貨與應收資料管理' },
        { src: images['receivable-invoices'], caption: '應收帳款的發票與相關單據資料' },
        { src: images['receivable-reports'], caption: '應收帳款報表功能一覽' },
        { src: images['receivable-monthly'], caption: '應收帳款月報表的查詢條件' },
        { src: images['unpaid-details'], caption: '未沖帳明細表的查詢條件' },
      ],
    },
    {
      id: 'electronic-invoices', title: '發票開立與雲端電子發票',
      features: [
        { title: '資料整合', text: '連動出貨單與單價資料，自動生成發票資訊。' },
        { title: '發票種類', text: '支援多種發票種類，回應不同客戶的開立需求。' },
        { title: '發票上傳', text: '串接雲端服務，上傳開立雲端電子發票。' },
      ],
      figures: [
        { src: images['invoice-creation'], caption: '發票資訊建立與相關資料連動' },
        { src: images['invoice-upload'], caption: '電子發票上傳操作介面', orientation: 'portrait' },
        { src: images['invoice-management'], caption: '發票開立與資料管理畫面' },
      ],
    },
    {
      id: 'notes', title: '票據管理與列印',
      features: [
        { title: '應收票據', text: '將應收系統的相關資料轉為票據，生成傳票。' },
        { title: '應付票據', text: '將應付系統的相關資料轉為票據，生成支票。' },
        { title: '票據列印', text: '依格式需求列印支票與傳票。' },
      ],
      figures: [
        { src: images['receivable-notes'], caption: '應收票據與傳票資料管理' },
        { src: images['payable-notes'], caption: '應付票據與支票資料管理' },
        { src: images['note-printing'], caption: '票據列印與相關資料設定' },
      ],
    },
    {
      id: 'attendance-payroll', title: '出勤薪資與銀行連動',
      features: [
        { title: '出勤管理', text: '記錄員工每日出勤時間、自動計算工時，並生成出勤報表。' },
        { title: '薪資計算', text: '依出勤資料計算薪資、稅金及社保扣款，生成薪資單。' },
        { title: '銀行連動', text: '與銀行系統串接，處理薪資發放作業。' },
        { title: '報表輸出', text: '提供多種報表格式，供人事管理與分析使用。' },
      ],
      figures: [
        { src: images.attendance, caption: '員工出勤資料與工時管理' },
        { src: images.salary, caption: '人員薪資與相關資料管理' },
      ],
    },
    {
      id: 'cost-management', title: '成本追蹤、分析與預算管理',
      features: [
        { title: '成本追蹤', text: '記錄各部門及各項成本支出，追蹤成本變化。' },
        { title: '成本分析', text: '分析成本結構，找出成本控制重點，作為經營改善的依據。' },
        { title: '預算管理', text: '制定預算、掌握支出，協助控制超支情形。' },
      ],
      figures: [
        { src: images['cost-reports'], caption: '成本管理與分析報表入口' },
        { src: images['product-cost'], caption: '產品成本相關資料維護' },
        { src: images['department-cost'], caption: '部門成本與費用項目設定' },
      ],
    },
    {
      id: 'general-ledger', title: '總帳、財務報表與電子報稅',
      features: [
        { title: '帳戶管理', text: '建立與管理帳戶，記錄交易資料。' },
        { title: '財務報表', text: '生成損益表、資產負債表等報表，提供財務分析依據。' },
        { title: '資金流動', text: '監控資金流動狀況，協助掌握財務資訊。' },
        { title: '電子報稅', text: '產生電子報稅檔案，供上傳國稅局與報稅作業使用。' },
      ],
      figures: [{ src: images['general-ledger'], caption: '總帳系統的財務報表與功能入口' }],
    },
    {
      id: 'security-data', title: '雲端網頁化與資料安全管理',
      features: [
        { title: '資料可追蹤、分析與回復', text: '保留歷史資料與回復能力，降低人為操作對資料管理的影響。' },
        { title: '帳號權限管理', text: '依帳號管理系統功能與資料存取權限。' },
        { title: '私有資料庫與第三方雲端資料庫', text: '依需求規劃資料庫建置方式及系統安全管理。' },
      ],
      figures: [
        { src: images['history-recovery'], caption: '歷史資料記錄、追蹤與回復畫面' },
        { src: images.permissions, caption: '系統帳號與權限管理設定' },
        { src: images['private-database'], caption: '簡報中的私有資料庫架構示意' },
        { src: images['cloud-database'], caption: '簡報中的第三方雲端資料庫與安全架構示意' },
      ],
    },
    {
      id: 'factory-integration', title: '總廠分廠管理與資訊共享',
      paragraphs: ['總廠與分廠使用一致的操作介面，全公司可依權限共享資訊並即時取得資料，讓管理人員掌握各廠作業。'],
      figures: [
        { src: images.headquarters, caption: '總公司操作介面與資料管理' },
        { src: images['branch-factory'], caption: '分廠使用一致的系統操作介面' },
      ],
    },
    {
      id: 'reports', title: '人性化介面與報表呈現',
      paragraphs: ['依使用習慣調整介面與報表，透過修改範本快速變更報表格式，也可由後台設定調整網頁操作介面的顯示方式。'],
      figures: [
        { src: images['report-output'], caption: '企業資料報表輸出範例', orientation: 'portrait' },
        { src: images['interface-settings'], caption: '後台介面與顯示條件設定' },
        { src: images['report-template'], caption: '透過試算表範本調整報表內容' },
        { src: images['report-format'], caption: '報表格式與欄位編排範例' },
        { src: images['display-settings'], caption: '操作介面的顯示方式與參數設定' },
      ],
    },
    {
      id: 'integration-benefits', title: '系統整合優勢',
      features: [
        { title: '效率提升', text: '透過自動化流程減少重複作業與人工作業負擔。' },
        { title: '資料準確', text: '統一管理資料，減少重複輸入及資料不一致。' },
        { title: '資訊透明', text: '共享作業資訊，協助跨部門協作。' },
        { title: '決策支援', text: '提供數據分析與報表，作為企業經營決策的依據。' },
      ],
    },
    {
      id: 'implementation', title: '系統實施流程與擴充規劃',
      paragraphs: ['依需求分析、系統設計、系統測試與正式上線的流程導入。簡報另外提出分期擴充規劃，作為後續建置與整合的方向。'],
      features: [
        { title: '需求分析', text: '了解企業需求，規劃功能與模組。' },
        { title: '系統設計', text: '設計系統架構、資料庫及邏輯流程。' },
        { title: '系統測試與上線', text: '確認穩定性及功能運作，完成部署後正式上線。' },
        { title: '第一期規劃', text: '廠部出貨、庫存與維護、車輛回廠、應收應付、發票及薪資；總公司應收應付、發票、薪資、票據、成本與總帳。' },
        { title: '第二期規劃', text: '仁武廠廠部調度排單系統。' },
        { title: '第三期規劃', text: '總公司與廠部電子簽核系統。' },
      ],
    },
    {
      id: 'technology', title: '開發技術平台與備份機制',
      features: [
        { title: '前端技術', text: '採用 Vue.js 建置網頁操作介面。' },
        { title: '後端服務', text: '以 Node.js 與 REST API 串接系統功能及資料。' },
        { title: '資料庫', text: '採用 MariaDB，透過主從複製保留資料副本。' },
        { title: '排程備份', text: '依需求設定每日、每週等排程，額外備份資料。' },
      ],
    },
  ],
}
