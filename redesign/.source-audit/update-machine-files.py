from pathlib import Path

p=Path('scripts/qa.mjs')
s=p.read_text(encoding='utf-8').replace("'wen-yang-metal'].map", "'wen-yang-metal', 'smart-machine-management'].map")
s=s.replace("locator('.case-card').count(), 4", "locator('.case-card').count(), 5").replace("locator('.case-card').count(), 12", "locator('.case-card').count(), 13")
s=s.replace("assert.equal(await page.locator('.case-card[href=\"/cases/wen-yang-metal\"]').count(), 1)", "assert.equal(await page.locator('.case-card[href=\"/cases/wen-yang-metal\"]').count(), 1)\n  assert.equal(await page.locator('.case-card[href=\"/cases/smart-machine-management\"]').count(), 1)")
p.write_text(s,encoding='utf-8')
p=Path('README.md')
s=p.read_text(encoding='utf-8').replace('十二個真實案例','十三個真實案例').replace('二十二個','二十三個').replace('依十一個完整案例','依十二個完整案例').replace('智能工控／服務（四案，含穩揚金屬及貨櫃辨識）','智能工控／服務（五案，含智慧機台管理、穩揚金屬及貨櫃辨識）')
p.write_text(s,encoding='utf-8')
