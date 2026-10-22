// 正式發布網址；本機開發仍使用相對路徑載入資源。
export const SITE_URL = 'https://dragon-mile.com/'

export function canonicalUrl(path = '/') {
  return new URL(path.replace(/^\/+/, ''), SITE_URL).href
}
