import cv2
import numpy as np
from PIL import Image

img = cv2.imread('scripts/sample_imgs/11667.png')
print('11667 shape:', img.shape)

# Let's inspect other sample images
import glob
for path in glob.glob('scripts/sample_imgs/*.*'):
    im = cv2.imread(path)
    if im is not None:
        print(path, im.shape)
