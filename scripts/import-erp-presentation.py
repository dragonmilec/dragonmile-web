"""Extract original ERP screenshots and text from the client's presentation."""
from pathlib import Path
from zipfile import ZipFile
import json
import posixpath
import re
import sys
import xml.etree.ElementTree as ET

if len(sys.argv) != 2:
    raise SystemExit('Usage: python scripts/import-erp-presentation.py <presentation.pptx>')
source = Path(sys.argv[1])
ns = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main', 'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
selected = {
    2: 'daily-dispatch', 3: 'dispatch-planning', 4: 'delivery-order', 5: 'vehicle-return',
    6: 'material-usage', 7: 'maintenance', 11: 'purchase-payment', 12: 'payable-records',
    13: 'sales-delivery', 15: 'receivable-invoices', 16: 'receivable-reports',
    17: 'receivable-monthly', 18: 'unpaid-details', 19: 'invoice-creation',
    20: 'invoice-upload', 21: 'invoice-management', 22: 'receivable-notes',
    23: 'payable-notes', 24: 'note-printing', 25: 'attendance', 26: 'salary',
    27: 'cost-reports', 28: 'product-cost', 29: 'department-cost', 31: 'general-ledger',
    37: 'history-recovery', 38: 'permissions', 39: 'private-database',
    40: 'cloud-database', 41: 'headquarters', 42: 'branch-factory',
    43: 'report-output', 44: 'interface-settings', 45: 'report-template',
    46: 'report-format', 47: 'display-settings',
}
asset_dir = Path('public/assets/erp')
reference_dir = Path('references/erp')
asset_dir.mkdir(parents=True, exist_ok=True)
reference_dir.mkdir(parents=True, exist_ok=True)
sources = json.loads(Path('CONTENT-SOURCES.json').read_text(encoding='utf-8'))
assets, slides, media_slides = {}, [], {}
with ZipFile(source) as z:
    slide_files = sorted((name for name in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml', name)), key=lambda name: int(re.search(r'(\d+)\.xml', name).group(1)))
    for name in slide_files:
        number = int(re.search(r'(\d+)\.xml', name).group(1))
        root = ET.fromstring(z.read(name))
        text = [''.join(t.itertext()) for t in root.findall('.//a:t', ns)]
        rel_file = posixpath.join(posixpath.dirname(name), '_rels', posixpath.basename(name) + '.rels')
        relationships = {rel.attrib['Id']: rel.attrib['Target'] for rel in ET.fromstring(z.read(rel_file))} if rel_file in z.namelist() else {}
        images = []
        for blip in root.findall('.//a:blip', ns):
            target = relationships.get(blip.attrib.get('{' + ns['r'] + '}embed'))
            if target:
                member = posixpath.normpath(posixpath.join(posixpath.dirname(name), target))
                if member.startswith('ppt/media/'):
                    images.append(posixpath.basename(member))
                    media_slides.setdefault(member, []).append(number)
        slides.append({'slide': number, 'text': text, 'images': images})
    diagrams = []
    for name in z.namelist():
        if name.startswith('ppt/diagrams/data') and name.endswith('.xml'):
            diagrams.append({'part': name, 'text': [t.text or '' for t in ET.fromstring(z.read(name)).findall('.//a:t', ns)]})
    for member, slide_numbers in media_slides.items():
        number = int(re.search(r'image(\d+)', member).group(1))
        if number not in selected:
            continue
        key = selected[number]
        filename = key + Path(member).suffix
        (asset_dir / filename).write_bytes(z.read(member))
        assets[key] = '/assets/erp/' + filename
        asset = 'erp/' + filename
        if not any(record['asset'] == asset for record in sources):
            sources.append({'asset': asset, 'source': source.name, 'page': '簡報第 ' + '、'.join(map(str, slide_numbers)) + ' 頁', 'media': member})
if len(assets) != len(selected):
    raise RuntimeError('Some selected images were not found in the supplied presentation.')
Path('src/erp-assets.json').write_text(json.dumps(assets, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
Path('CONTENT-SOURCES.json').write_text(json.dumps(sources, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(reference_dir / 'presentation-text.json').write_text(json.dumps({'source': source.name, 'slides': slides, 'diagrams': diagrams}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(assets)} original images and text from {len(slides)} slides.')
