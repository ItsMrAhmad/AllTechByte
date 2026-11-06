import cv2
import numpy as np

img = cv2.imread('scripts/sample_imgs/11667.png')
h, w, _ = img.shape
print(f"Image size: {w}x{h}")

# Check 4 corners (top-left, top-right, bottom-left, bottom-right)
corners = {
    'TL': img[0:int(h*0.3), 0:int(w*0.35)],
    'TR': img[0:int(h*0.3), int(w*0.65):w],
    'BL': img[int(h*0.7):h, 0:int(w*0.35)],
    'BR': img[int(h*0.7):h, int(w*0.65):w]
}

for name, patch in corners.items():
    # If corner is not solid background, variance or edge count will be higher
    gray = cv2.cvtColor(patch, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    edge_count = np.sum(edges > 0)
    print(f"Corner {name}: edge pixels = {edge_count}, std = {np.std(gray):.2f}")
