from PIL import Image
import numpy as np

im = Image.open('scripts/sample_imgs/11667.png')
bg = Image.new('RGB', im.size, (255, 255, 255))
if im.mode == 'RGBA':
    bg.paste(im, mask=im.split()[3])
else:
    bg.paste(im)

arr = np.array(bg)
gray = np.mean(arr, axis=2)
for y in range(250, 380, 10):
    row = gray[y, :]
    print(f"y={y}: min={row.min():.1f}, mean={row.mean():.1f}, non-white={np.sum(row < 240)}")
