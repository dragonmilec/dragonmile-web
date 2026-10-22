import type { InjectionKey } from 'vue'

export const openQualificationKey: InjectionKey<(trigger: HTMLElement) => void> = Symbol('openQualification')

// Transcribed from the replacement certificate supplied on 2026-10-19.
export const qualification = {
  title: '經濟部登錄之自動化技術服務機構',
  bannerLead: '經濟部登錄之',
  bannerSubject: '自動化技術服務機構',
  issuer: '經濟部產業發展署',
  documentTitle: '技術服務機構服務能量登錄證書',
  number: '115-AU-5-50955037-1113',
  category: '自動化服務機構',
  service: '商業服務自動化技術服務項目',
  subitem: '商品資料庫建立及管理',
  registeredAt: '2026-05-01',
  validUntil: '2028-05-01',
  registeredAtRoc: '115 年 5 月 1 日',
  validUntilRoc: '117 年 5 月 1 日',
  source: '/assets/credentials/certificate-2026.svg',
  note: '證書登錄有效期間為 2026 年 5 月 1 日至 2028 年 5 月 1 日。服務能量與登錄範圍以證書所載為準。',
}
