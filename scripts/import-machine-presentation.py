"""Extract original UI screenshots and text from the Smart Machine manual."""
from pathlib import Path
from zipfile import ZipFile
import json
import posixpath
import re
import sys
import xml.etree.ElementTree as ET

if len(sys.argv) != 2:
    raise SystemExit('Usage: python scripts/import-machine-presentation.py <presentation.pptx>')
source = Path(sys.argv[1])
ns = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main', 'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
selected = {
    3: 'cover', 5: 'dashboard', 7: 'users', 8: 'user-form',
    16: 'dealers', 13: 'sites', 12: 'plc-client', 22: 'machines',
    17: 'unbound-machine', 14: 'binding', 15: 'maintenance-settings',
    19: 'maintenance-records', 11: 'monitoring', 18: 'data-log', 24: 'usage-records',
}
asset_dir = Path('public/assets/smart-machine')
reference_dir = Path('references/smart-machine')
asset_dir.mkdir(parents=True, exist_ok=True)
reference_dir.mkdir(parents=True, exist_ok=True)
sources = json.loads(Path('CONTENT-SOURCES.json').read_text(encoding='utf-8'))
assets, slides, media_slides = {}, [], {}
with ZipFile(source) as z:
    names = sorted((name for name in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml', name)), key=lambda name: int(re.search(r'(\d+)\.xml', name).group(1)))
    for name in names:
        number = int(re.search(r'(\d+)\.xml', name).group(1))
        root = ET.fromstring(z.read(name))
        text = [t.text or '' for t in root.findall('.//a:t', ns)]
        rel_file = posixpath.join(posixpath.dirname(name), '_rels', posixpath.basename(name) + '.rels')
        rels = {rel.attrib['Id']: rel.attrib['Target'] for rel in ET.fromstring(z.read(rel_file))} if rel_file in z.namelist() else {}
        images = []
        for blip in root.findall('.//a:blip', ns):
            target = rels.get(blip.attrib.get('{' + ns['r'] + '}embed'))
            if target:
                member = posixpath.normpath(posixpath.join(posixpath.dirname(name), target))
                if member.startswith('ppt/media/'):
                    images.append(posixpath.basename(member))
                    media_slides.setdefault(member, []).append(number)
        slides.append({'slide': number, 'text': text, 'images': images})
    for member, numbers in media_slides.items():
        number = int(re.search(r'image(\d+)', member).group(1))
        if number not in selected:
            continue
        key = selected[number]
        filename = key + Path(member).suffix
        (asset_dir / filename).write_bytes(z.read(member))
        assets[key] = '/assets/smart-machine/' + filename
        asset = 'smart-machine/' + filename
        if not any(record['asset'] == asset for record in sources):
            sources.append({'asset': asset, 'source': source.name, 'page': '簡報第 ' + '、'.join(map(str, numbers)) + ' 頁', 'media': member})
if len(assets) != len(selected):
    raise RuntimeError('Some selected screenshots are missing from the supplied presentation.')
Path('src/machine-assets.json').write_text(json.dumps(assets, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
Path('CONTENT-SOURCES.json').write_text(json.dumps(sources, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(reference_dir / 'presentation-text.json').write_text(json.dumps({'source': source.name, 'slides': slides}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(assets)} screenshots and text from {len(slides)} slides.')
