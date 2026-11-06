import cv2
import numpy as np

img = cv2.imread('scripts/sample_imgs/11063.png')
h, w, _ = img.shape

# 1. Clean background faint tiled watermarks:
# If corner is near white, threshold any near-white (>225) to pure white
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
near_white = gray > 228
img[near_white] = [255, 255, 255]

# 2. Find pink letters
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
pink_mask = cv2.inRange(hsv, np.array([140, 60, 100]), np.array([170, 255, 255]))

ys, xs = np.where(pink_mask > 0)
if len(ys) > 50:
    min_x = max(0, xs.min() - 150)
    max_x = min(w, xs.max() + 40)
    min_y = max(0, ys.min() - 40)
    max_y = min(h, ys.max() + 60)
    print(f"11063 logo: x[{min_x}..{max_x}], y[{min_y}..{max_y}]")
    img[min_y:max_y, min_x:max_x] = [255, 255, 255]

cv2.imwrite('scripts/test_clean_out/11063_fixed.jpg', img)
print("Saved 11063_fixed.jpg")
