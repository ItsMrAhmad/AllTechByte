import cv2
import numpy as np

img = cv2.imread('scripts/sample_imgs/7802.jpg')
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
pink_mask = cv2.inRange(hsv, np.array([140, 60, 100]), np.array([170, 255, 255]))
ys, xs = np.where(pink_mask > 0)
print('Pink min_y, max_y:', ys.min(), ys.max())
print('Pink min_x, max_x:', xs.min(), xs.max())
print('Image height, width:', img.shape[:2])
