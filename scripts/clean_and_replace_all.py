import os
import cv2
import numpy as np
from PIL import Image

os.makedirs("public/categories", exist_ok=True)
os.makedirs("public/news", exist_ok=True)

def remove_watermark(img):
    h, w, _ = img.shape
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Robostan exact color masks
    orange = (img_rgb[:, :, 0] > 180) & (img_rgb[:, :, 1] > 100) & (img_rgb[:, :, 1] < 210) & (img_rgb[:, :, 2] < 100)
    green = (img_rgb[:, :, 1] > 120) & (img_rgb[:, :, 0] < 180) & (img_rgb[:, :, 2] < 140)
    
    regions = [
        ('TL', 0, int(h * 0.35), 0, int(w * 0.5)),
        ('TR', 0, int(h * 0.35), int(w * 0.5), w),
        ('TC', 0, int(h * 0.35), int(w * 0.25), int(w * 0.75)),
        ('BR', int(h * 0.65), h, int(w * 0.5), w),
        ('BL', int(h * 0.65), h, 0, int(w * 0.5)),
    ]
    
    cleaned = img.copy()
    cleaned_any = False
    
    for rname, y1, y2, x1, x2 in regions:
        patch_o = orange[y1:y2, x1:x2]
        patch_g = green[y1:y2, x1:x2]
        o_cnt = np.count_nonzero(patch_o)
        g_cnt = np.count_nonzero(patch_g)
        
        if o_cnt >= 20 and g_cnt >= 5:
            combined = (patch_o | patch_g).astype(np.uint8) * 255
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (15, 15))
            dilated = cv2.dilate(combined, kernel, iterations=2)
            contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            for cnt in contours:
                cx, cy, cw, ch = cv2.boundingRect(cnt)
                if np.count_nonzero(patch_o[cy:cy+ch, cx:cx+cw]) >= 10 and np.count_nonzero(patch_g[cy:cy+ch, cx:cx+cw]) >= 2:
                    pad_w = max(20, int(cw * 0.25))
                    pad_h = max(20, int(ch * 0.3))
                    abs_x1 = max(0, x1 + cx - pad_w)
                    abs_y1 = max(0, y1 + cy - pad_h)
                    abs_x2 = min(w, x1 + cx + cw + pad_w)
                    abs_y2 = min(h, y1 + cy + ch + pad_h)
                    
                    patch = img[abs_y1:abs_y2, abs_x1:abs_x2]
                    border = np.concatenate([
                        patch[0, :, :], patch[-1, :, :],
                        patch[:, 0, :], patch[:, -1, :]
                    ], axis=0)
                    bg_col = np.median(border, axis=0)
                    
                    diff = np.linalg.norm(patch.astype(np.float32) - bg_col, axis=-1)
                    p_mask = (diff > 12).astype(np.uint8) * 255
                    p_dilated = cv2.dilate(p_mask, cv2.getStructuringElement(cv2.MORPH_RECT, (7, 7)), iterations=2)
                    
                    full_mask = np.zeros((h, w), dtype=np.uint8)
                    full_mask[abs_y1:abs_y2, abs_x1:abs_x2] = p_dilated
                    cleaned = cv2.inpaint(cleaned, full_mask, 7, cv2.INPAINT_TELEA)
                    cleaned_any = True
                    print(f"    Cleaned watermark at {rname} ({abs_x1},{abs_y1})-({abs_x2},{abs_y2})")
                    
    return cleaned, cleaned_any

def save_as_webp(cv_img, dest_path, quality=90):
    im_pil = Image.fromarray(cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB))
    im_pil.save(dest_path, "WEBP", quality=quality)
    print(f"  Saved {dest_path} ({os.path.getsize(dest_path)} bytes)")

# 1. Clean Category and News images
print("--- 1. Processing Category and News Images ---")
cdn_map = {
    "public/categories/category-boards.webp": "scripts/cdn_inspect/arduino-uno-smd-r3.webp",
    "public/categories/category-sensors.webp": "scripts/cdn_inspect/gemini-8en.webp",
    "public/categories/category-robotics.webp": "scripts/cdn_inspect/chatgpt-8.png",
    "public/categories/category-power.webp": "scripts/cdn_inspect/chatgpt-2.png",
    "public/categories/category-components.webp": "scripts/cdn_inspect/chatgpt-1.png",
    "public/categories/category-tools.webp": "scripts/cdn_inspect/jumper-wires.jpg",
    "public/news/news-raspberry-pi.webp": "scripts/cdn_inspect/raspberry-pi-5-16gb.jpg",
    "public/news/news-arduino-uno.webp": "scripts/cdn_inspect/arduino-uno-smd-r3.webp",
    "public/news/news-spot-welder.webp": "scripts/cdn_inspect/chatgpt-7.png",
}

for dest, src in cdn_map.items():
    print(f"Processing {src} -> {dest}")
    img = cv2.imread(src)
    if img is not None:
        cleaned, was_cleaned = remove_watermark(img)
        save_as_webp(cleaned, dest)

# 2. Clean public/products/ images that have the Robostan logo
print("--- 2. Processing public/products/ Images ---")
products_dir = "public/products"
cleaned_products_count = 0

for f in sorted(os.listdir(products_dir)):
    if not f.endswith(('.webp', '.png', '.jpg')): continue
    p = os.path.join(products_dir, f)
    img = cv2.imread(p)
    if img is None: continue
    
    cleaned, was_cleaned = remove_watermark(img)
    if was_cleaned:
        save_as_webp(cleaned, p)
        cleaned_products_count += 1

print(f"Total product images cleaned: {cleaned_products_count}")
