import os
import shutil
from PIL import Image
import numpy as np

upload_dir = r"C:\Users\Master\.gemini\antigravity\brain\84f24e24-f6be-4d42-9c2a-77e422eabcb1\.user_uploaded"
out_dir = r"public\products"
os.makedirs(out_dir, exist_ok=True)

# 1. ESP32 board
esp_src = os.path.join(upload_dir, "media_1793969817381_d5c41d9d.jpg")
esp_im = Image.open(esp_src).convert("RGB")
esp_out_path = os.path.join(out_dir, "product-15469000000149.webp")
esp_im.save(esp_out_path, "WEBP", quality=90)
print(f"Saved {esp_out_path}: {os.path.getsize(esp_out_path)} bytes, size {esp_im.size}")

# Also update existing product 15467923481230 image
esp_existing_path = os.path.join(out_dir, "product-15467923481230.webp")
shutil.copyfile(esp_out_path, esp_existing_path)
print(f"Updated {esp_existing_path} with authentic ESP32 board image.")

# 2. GA12-N20 Front Shaft
n20_front_src = os.path.join(upload_dir, "media_1793969817384_49cc1b69.jpg")
n20_front_im = Image.open(n20_front_src).convert("RGB")
n20_front_out = os.path.join(out_dir, "product-15469000000150.webp")
n20_front_im.save(n20_front_out, "WEBP", quality=90)
print(f"Saved {n20_front_out}: {os.path.getsize(n20_front_out)} bytes, size {n20_front_im.size}")

# 3. GA12-N20 Side Gearbox
n20_side_src = os.path.join(upload_dir, "media_1793969817370_021f4a97.jpg")
n20_side_im = Image.open(n20_side_src).convert("RGB")
n20_side_out = os.path.join(out_dir, "product-15469000000151.webp")
n20_side_im.save(n20_side_out, "WEBP", quality=90)
print(f"Saved {n20_side_out}: {os.path.getsize(n20_side_out)} bytes, size {n20_side_im.size}")

# 4. GA12-N20 Dimensions (padded to square 720x720)
n20_dims_src = os.path.join(upload_dir, "media_1793969817381_5b2ae968.jpg")
n20_dims_im = Image.open(n20_dims_src).convert("RGB")
arr = np.array(n20_dims_im)
pad_left = 45
pad_right = 45
left_col = arr[:, :1, :]
right_col = arr[:, -1:, :]
left_padding = np.repeat(left_col, pad_left, axis=1)
right_padding = np.repeat(right_col, pad_right, axis=1)
padded_arr = np.concatenate([left_padding, arr, right_padding], axis=1)
n20_dims_padded = Image.fromarray(padded_arr)
n20_dims_out = os.path.join(out_dir, "product-15469000000152.webp")
n20_dims_padded.save(n20_dims_out, "WEBP", quality=90)
print(f"Saved {n20_dims_out}: {os.path.getsize(n20_dims_out)} bytes, size {n20_dims_padded.size}")
