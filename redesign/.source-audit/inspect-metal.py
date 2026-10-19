from pathlib import Path
from PIL import Image, ImageDraw

files = sorted(Path('C:/Users/c2715/Downloads/穩楊金屬專案介紹(屬於工控與服務那類)').glob('*.png'))
board = Image.new('RGB', (1500, ((len(files)+2)//3)*340), '#e6e8e5')
draw = ImageDraw.Draw(board)
for n, p in enumerate(files):
    im = Image.open(p)
    print(n+1, p.name, im.size)
    im.thumbnail((480,300))
    x, y = (n%3)*500, (n//3)*340
    board.paste(im.convert('RGB'), (x+(500-im.width)//2,y+25))
    draw.text((x+10,y+5), str(n+1), fill='black')
board.save('.source-audit/metal-references.jpg')
