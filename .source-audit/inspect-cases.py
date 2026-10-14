from pathlib import Path
from bs4 import BeautifulSoup
import json, re

root = Path(__file__).resolve().parent.parent
entries = json.loads((root / '.source-audit/content.json').read_text(encoding='utf8'))
for entry in entries:
    if not entry['file'].startswith(('2022', '2024', '2026')):
        continue
    soup = BeautifulSoup((root / entry['file']).read_text(encoding='utf8'), 'html.parser')
    print('\n\nPAGE:', entry['file'])
    for el in soup.select('main .elementor-widget'):
        text = el.get_text(' ', strip=True)
        imgs = [i.get('src', '') for i in el.select('img')]
        if text or imgs:
            print(json.dumps({'text': text, 'images': imgs}, ensure_ascii=False))
    styles = []
    for link in soup.select('link[href]'):
        href = link.get('href')
        if 'elementor/css/post-' in href:
            name = href.split('/')[-1].split('?')[0]
            path = root / 'wp-content/uploads/elementor/css' / name
            if path.exists():
                styles.extend(re.findall(r'url\(([^)]+)\)', path.read_text(encoding='utf8')))
    print('BACKGROUND IMAGES:', json.dumps(styles, ensure_ascii=False))
    if entry['file'].startswith('2026'):
        for el in soup.select('main style, main .elementor-widget-html'):
            print('HTML WIDGET:', str(el)[:18000])
