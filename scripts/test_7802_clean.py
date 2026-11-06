import cv2
import numpy as np
from PIL import Image

img = cv2.imread('scripts/sample_imgs/7802.jpg')
h, w, _ = img.shape

hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
cyan_mask = cv2.inRange(hsv, np.array([90, 100, 100]), np.array([115, 255, 255]))
pink_mask = cv2.inRange(hsv, np.array([140, 60, 100]), np.array([170, 255, 255]))

# Find pink pixels
ys, xs = np.where(pink_mask > 0)
if len(ys) > 50:
    min_x = max(0, xs.min() - 110) # include gear to left
    max_x = min(w, xs.max() + 20)
    min_y = max(0, ys.min() - 30)
    max_y = min(h, ys.max() + 45) # include subtitle below
    print(f"Detected logo box: x[{min_x}..{max_x}], y[{min_y}..{max_y}]")
    img[min_y:max_y, min_x:max_x] = [255, 255, 255]

cv2.imwrite('scripts/test_clean_out/7802_fixed.jpg', img)
print("Saved 7802_fixed.jpg")
