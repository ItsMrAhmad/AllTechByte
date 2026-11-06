import cv2
from PIL import Image

# Downscale 11667 to 400x400 and save with white background for inspection
im = Image.open('scripts/sample_imgs/11667.png')
bg = Image.new('RGB', im.size, (255, 255, 255))
if im.mode == 'RGBA':
    bg.paste(im, mask=im.split()[3])
else:
    bg.paste(im)

bg.resize((400, 400), Image.Resampling.LANCZOS).save('scripts/sample_imgs/11667_thumb.jpg', 'JPEG')
print('Saved 11667_thumb.jpg')
