from PIL import Image, ImageDraw
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import re
files = sorted([*Path('.source-audit/erp').glob('*.png'), *Path('.source-audit/erp').glob('*.jpeg')], key=lambda p: int(re.search(r'\d+',p.name).group()))
board = Image.new('RGB', (1800, ((len(files)+3)//4)*240), '#e6e8e5')
draw = ImageDraw.Draw(board)
for n, p in enumerate(files):
    im=Image.open(p)
    print(p.name, im.size)
    im.thumbnail((430,210))
    x,y=(n%4)*450,(n//4)*240
    if im.mode == 'RGBA': board.paste(im, (x+(450-im.width)//2,y+24), im)
    else: board.paste(im.convert('RGB'),(x+(450-im.width)//2,y+24))
    draw.text((x+10,y+5), p.name, fill='black')
board.save('.source-audit/erp/contact.jpg')
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
with ZipFile('C:/Users/c2715/Downloads/語言治療/ERP介紹(1).pptx') as z:
    for name in z.namelist():
        if name.startswith('ppt/diagrams/data') and name.endswith('.xml'):
            text=ET.fromstring(z.read(name)).findall('.//a:t',ns)
            print('DIAGRAM', name, ' | '.join(t.text or '' for t in text))
