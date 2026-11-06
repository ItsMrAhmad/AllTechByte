import glob
import os
from PIL import Image

os.makedirs('scripts/thumbs', exist_ok=True)
for path in glob.glob('scripts/sample_imgs/*.*'):
    if 'thumb' in path or 'crop' in path or 'TL' in path or 'TR' in path or 'BL' in path or 'BR' in path:
        continue
    try:
        im = Image.open(path)
        bg = Image.new('RGB', im.size, (255, 255, 255))
        if im.mode == 'RGBA':
            bg.paste(im, mask=im.split()[3])
        else:
            bg.paste(im.convert('RGB'))
        name = os.path.splitext(os.path.basename(path))[0]
        bg.resize((300, 300), Image.Resampling.LANCZOS).save(f'scripts/thumbs/{name}.jpg', 'JPEG')
    except Exception as e:
        print(path, e)
print("Thumbs created!")
