from pathlib import Path
import re

p = Path('src/case-content.ts')
s = p.read_text(encoding='utf-8')
s = s.replace("import { sportsCaseContent } from './sports-case-content'", "import { sportsCaseContent } from './sports-case-content'\nimport { erpCaseContent } from './erp-case-content'")
s = s.replace("const erp = assets['混泥土-客製化erp']\n", '')
s = s[:s.index("  'concrete-erp': {")] + "  'concrete-erp': erpCaseContent,\n}\n"
s = s.replace('// Keep descriptions and figures together. The swallow-training and medical-iot\n// entries follow the user\'s newer dragonmile.dev references; other cases retain\n// their original dragon-mile.com sources.', '// Keep source descriptions and figures together. Newer project pages, supplied\n// sports documents and the ERP presentation supplement the original cases.')
p.write_text(s, encoding='utf-8')
p = Path('src/data.ts')
s = p.read_text(encoding='utf-8').replace("import sportsAssets from './sports-assets.json'", "import sportsAssets from './sports-assets.json'\nimport erpAssets from './erp-assets.json'")
replacement = '''  {
    slug: 'concrete-erp', title: '混凝土・客製化 ERP', category: 'ERP', english: 'Concrete / Customized ERP',
    description: '串接混凝土產業的出貨調度、庫存維護、人事薪資與財務帳務，整合總廠分廠資訊、雲端管理及彈性報表。',
    cover: erpAssets['dispatch-planning'], gallery: Object.values(erpAssets),
    points: [
      { title: '廠部作業整合', text: '整合出貨管理、庫存與維護、車輛回廠及剩退料追蹤。' },
      { title: '財務與人事管理', text: '串接應收應付、發票、票據、出勤薪資、成本及總帳。' },
      { title: '跨廠雲端管理', text: '一致操作介面、帳號權限、歷史資料回復、資料備份及報表範本調整。' },
      { title: '實際導入', text: '已導入台泥子公司鳳勝實業，涵蓋全台 15 個工廠與一總管理處。' },
    ],
    source: '/2022/05/06/混泥土-客製化erp/',
  },'''
s, count = re.subn(r"^  \{ slug: 'concrete-erp'.*$", lambda _: replacement, s, flags=re.M)
assert count == 1
p.write_text(s, encoding='utf-8')
