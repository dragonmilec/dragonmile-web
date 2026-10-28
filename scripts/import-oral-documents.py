"""Import the supplied oral-care manuals, their text and original illustrations."""
from pathlib import Path
from zipfile import ZipFile
import json
import shutil
import sys
import xml.etree.ElementTree as ET

if len(sys.argv) != 3:
    raise SystemExit('Usage: python scripts/import-oral-documents.py <app.docx> <cloud.docx>')

ns = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
}
selected = {
    'app': {
        'image2.jpg': 'equipment-front', 'image9.jpg': 'equipment-back',
        'image4.png': 'app-login', 'image6.png': 'app-register',
        'image7.png': 'app-home', 'image8.png': 'app-preparation',
        'image12.png': 'app-camera', 'image3.png': 'app-photo-actions',
        'image10.png': 'app-pending-uploads', 'image5.png': 'app-account',
        'image11.png': 'app-history', 'image1.png': 'app-trends',
    },
    'cloud': {
        'image11.png': 'cloud-login', 'image4.png': 'cloud-records',
        'image7.png': 'cloud-record-detail', 'image5.png': 'cloud-instructions',
        'image8.png': 'cloud-search', 'image6.png': 'cloud-trends',
        'image9.png': 'cloud-units', 'image2.png': 'cloud-accounts',
        'image3.png': 'cloud-account-edit', 'image10.png': 'cloud-account-create',
        'image1.png': 'cloud-recycle-bin',
    },
}
asset_dir = Path('public/assets/oral-care')
reference_dir = Path('references/oral-care')
asset_dir.mkdir(parents=True, exist_ok=True)
reference_dir.mkdir(parents=True, exist_ok=True)
sources_file = Path('CONTENT-SOURCES.json')
sources = [s for s in json.loads(sources_file.read_text(encoding='utf-8')) if not s['asset'].startswith('oral-care/')]
assets = {}
for key, argument in zip(selected, sys.argv[1:]):
    source = Path(argument)
    with ZipFile(source) as archive:
        root = ET.fromstring(archive.read('word/document.xml'))
        rels = {r.attrib['Id']: r.attrib['Target'] for r in ET.fromstring(archive.read('word/_rels/document.xml.rels'))}
        paragraphs, context, contexts = [], '', {}
        for paragraph in root.findall('.//w:body/w:p', ns):
            text = ''.join(t.text or '' for t in paragraph.findall('.//w:t', ns))
            images = [rels[b.attrib['{' + ns['r'] + '}embed']] for b in paragraph.findall('.//a:blip', ns)]
            if text:
                context = text
            if text or images:
                paragraphs.append({'text': text, 'images': images})
            for member in images:
                contexts[Path(member).name] = context
        for original, name in selected[key].items():
            filename = name + Path(original).suffix
            with archive.open('word/media/' + original) as content, (asset_dir / filename).open('wb') as target:
                shutil.copyfileobj(content, target)
            assets[name] = '/assets/oral-care/' + filename
            sources.append({'asset': 'oral-care/' + filename, 'source': source.name, 'page': contexts[original], 'media': 'word/media/' + original})
        (reference_dir / (key + '-manual-text.json')).write_text(json.dumps({'source': source.name, 'paragraphs': paragraphs}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

Path('src/oral-assets.json').write_text(json.dumps(assets, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
sources_file.write_text(json.dumps(sources, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(assets)} original illustrations from two oral-care manuals.')
