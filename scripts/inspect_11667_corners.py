from PIL import Image
import numpy as np

im = Image.open('scripts/sample_imgs/11667.png')
arr = np.array(im)
alpha = arr[:, :, 3]

# Where is alpha > 0?
ys, xs = np.where(alpha > 0)
print(f"Opaque bounds: x in [{xs.min()}..{xs.max()}], y in [{ys.min()}..{ys.max()}]")
print(f"Image size: {im.size}")
