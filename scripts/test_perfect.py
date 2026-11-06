from PIL import Image
import numpy as np
import cv2

im = Image.open('scripts/sample_imgs/11667.png')
bg = Image.new('RGB', im.size, (255, 255, 255))
if im.mode == 'RGBA':
    bg.paste(im, mask=im.split()[3])
else:
    bg.paste(im)

arr = np.array(bg)
gray = np.mean(arr, axis=2)

# Start searching from y=280 downwards for white gap (non-white < 30)
gap_y = 280
for y in range(280, 450):
    if np.sum(gray[y, :] < 235) < 30:
        gap_y = y
        # check if subsequent rows are also white
        if np.sum(gray[y+5, :] < 235) < 30:
            gap_y = y + 5
        break

print(f"Gap found at y={gap_y}")
arr[0:gap_y, :] = [255, 255, 255]
Image.fromarray(arr).resize((400, 400), Image.Resampling.LANCZOS).save('public/products/11667_perfect.webp', 'WEBP', quality=90)
print("Saved 11667_perfect.webp")
