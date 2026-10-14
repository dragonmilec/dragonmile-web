from pathlib import Path
from urllib.parse import unquote, urlparse
import json, shutil

project = Path(__file__).resolve().parents[1]
root = project.parent
out = project / 'public/assets'
out.mkdir(parents=True, exist_ok=True)
data = json.loads((root / '.source-audit/content.json').read_text(encoding='utf8'))
assets = {}
provenance = []
for item in data:
    key = item['file'].split('\\')[-2] if '\\' in item['file'] else 'home'
    images = []
    for index, img in enumerate(item['images']):
        path = root / unquote(urlparse(img['src']).path).lstrip('/')
        if not path.exists() or 'wp-content/uploads' not in path.as_posix():
            continue
        name = f'original-{len(provenance):02d}{path.suffix}'
        shutil.copy2(path, out / name)
        images.append('/assets/' + name)
        provenance.append({'asset': name, 'source': img['src'], 'page': item['file']})
    assets[key] = images
shutil.copy2(root / 'wp-content/uploads/2024/06/logo.png', out / 'brand.png')
(project / 'src/assets.json').write_text(json.dumps(assets, ensure_ascii=False, indent=2), encoding='utf8')
(project / 'CONTENT-SOURCES.json').write_text(json.dumps(provenance, ensure_ascii=False, indent=2), encoding='utf8')
print(f'Copied {len(provenance)} source assets and original company logo.')
