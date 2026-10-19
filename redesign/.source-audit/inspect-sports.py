from PIL import Image, ImageDraw
from pathlib import Path
files = sorted(Path('C:/Users/c2715/Downloads/網頁的參考資料').rglob('*.png'))
board = Image.new('RGB', (1500, ((len(files)+2)//3)*320), '#e6e8e5')
draw = ImageDraw.Draw(board)
for n, p in enumerate(files):
    im = Image.open(p)
    print(n+1, p.parent.name, p.name, im.size)
    im.thumbnail((480, 280))
    x, y = (n%3)*500, (n//3)*320
    board.paste(im, (x+(500-im.width)//2, y+25))
    draw.text((x+12,y+5), str(n+1), fill='black')
board.save('.source-audit/sports-references.jpg')
