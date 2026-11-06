import cv2
import numpy as np

img = cv2.imread('scripts/sample_imgs/11894.png')
h, w, _ = img.shape

# 1. Clean background
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
near_white = gray > 230
img[near_white] = [255, 255, 255]

# 2. Header logo
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
pink_logo = cv2.inRange(hsv, np.array([140, 60, 100]), np.array([170, 255, 255]))
ys, xs = np.where(pink_logo[:int(h*0.35), :] > 0)
if len(ys) > 50:
    min_x = max(0, xs.min() - 150)
    max_x = min(w, xs.max() + 40)
    min_y = max(0, ys.min() - 40)
    max_y = min(h, ys.max() + 60)
    img[min_y:max_y, min_x:max_x] = [255, 255, 255]

# 3. Detect cyan text on battery
cyan_mask = cv2.inRange(hsv, np.array([90, 80, 100]), np.array([115, 255, 255]))
# Keep cyan only below top 35%
cyan_mid = np.zeros_like(cyan_mask)
cyan_mid[int(h*0.35):, :] = cyan_mask[int(h*0.35):, :]

# Dilate and inpaint
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
inpaint_mask = cv2.dilate(cyan_mid, kernel, iterations=2)
cleaned = cv2.inpaint(img, inpaint_mask, 3, cv2.INPAINT_TELEA)

cv2.imwrite('scripts/test_clean_out/11894_fixed.jpg', cleaned)
print("Saved 11894_fixed.jpg")
