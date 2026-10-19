from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import json, re, posixpath

source = Path('C:/Users/c2715/Downloads/網頁的參考資料/智慧機台管理系統_操作說明.pptx')
out = Path('.source-audit/machine')
out.mkdir(parents=True, exist_ok=True)
ns = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main', 'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
slides = []
with ZipFile(source) as z:
    names = sorted((n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml', n)), key=lambda n:int(re.search(r'(\d+)\.xml',n).group(1)))
    for name in names:
        root = ET.fromstring(z.read(name))
        text = [''.join(p.itertext()) for p in root.findall('.//a:t', ns)]
        relpath = posixpath.join(posixpath.dirname(name), '_rels', posixpath.basename(name)+'.rels')
        rels = {r.attrib['Id']: r.attrib['Target'] for r in ET.fromstring(z.read(relpath))} if relpath in z.namelist() else {}
        images=[]
        for b in root.findall('.//a:blip', ns):
            target=rels.get(b.attrib.get('{'+ns['r']+'}embed'))
            if target:
                member=posixpath.normpath(posixpath.join(posixpath.dirname(name),target))
                if member.startswith('ppt/media/'):
                    dest=out/posixpath.basename(member)
                    dest.write_bytes(z.read(member))
                    images.append(dest.name)
        item={'slide':len(slides)+1, 'text':text, 'images':images}
        slides.append(item)
        print('\nSLIDE', item['slide'], '\n'+'\n'.join(text), '\nIMAGES', ', '.join(images))
    for name in z.namelist():
        if (name.startswith('ppt/diagrams/data') or name.startswith('ppt/notesSlides/notesSlide')) and name.endswith('.xml'):
            text = ET.fromstring(z.read(name)).findall('.//a:t', ns)
            print('EXTRA', name, ' | '.join(t.text or '' for t in text))
(out/'slides.json').write_text(json.dumps(slides, ensure_ascii=False, indent=2), encoding='utf-8')
