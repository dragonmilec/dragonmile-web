from pathlib import Path
from PIL import Image, ImageDraw
import re
files = sorted([*Path('.source-audit/machine').glob('*.png'), *Path('.source-audit/machine').glob('*.jpg')], key=lambda p: int(re.search(r'\d+',p.name).group()))
board = Image.new('RGB', (1600, ((len(files)+3)//4)*260), '#e6e8e5')
draw = ImageDraw.Draw(board)
for n, p in enumerate(files):
    im = Image.open(p)
    print(p.name, im.size)
    im.thumbnail((380,225))
    x,y=(n%4)*400,(n//4)*260
    if im.mode == 'RGBA': board.paste(im, (x+(400-im.width)//2,y+25), im)
    else: board.paste(im.convert('RGB'), (x+(400-im.width)//2,y+25))
    draw.text((x+10,y+5),p.name,fill='black')
board.save('.source-audit/machine/contact.jpg')
