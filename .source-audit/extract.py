from bs4 import BeautifulSoup
from pathlib import Path
import json

root = Path(__file__).resolve().parent.parent
result = []
for path in root.rglob('index.html'):
    if any(p in path.parts for p in ['redesign', 'wp-content', 'wp-includes', 'category', '404', 'simply-static-1-1769745651', 'simply-static-1-1769749891', 'simply-static-1-1769752269']):
        continue
    soup = BeautifulSoup(path.read_text(encoding='utf-8'), 'html.parser')
    main = soup.find('main') or soup
    for tag in main.select('script,style,nav,header,footer'):
        tag.decompose()
    result.append({'file': str(path.relative_to(root)), 'text': main.get_text(' ', strip=True), 'images': [{'src': i.get('src'), 'alt': i.get('alt')} for i in main.select('img')]})
(root / '.source-audit/content.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(result, ensure_ascii=False, indent=2))
