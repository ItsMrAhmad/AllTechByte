import cv2

img = cv2.imread('scripts/sample_imgs/11667.png')
h, w, _ = img.shape

cv2.imwrite('scripts/sample_imgs/11667_TL.png', img[0:int(h*0.3), 0:int(w*0.35)])
cv2.imwrite('scripts/sample_imgs/11667_TR.png', img[0:int(h*0.3), int(w*0.65):w])
cv2.imwrite('scripts/sample_imgs/11667_BL.png', img[int(h*0.7):h, 0:int(w*0.35)])
cv2.imwrite('scripts/sample_imgs/11667_BR.png', img[int(h*0.7):h, int(w*0.65):w])
print("Saved corner crops")
