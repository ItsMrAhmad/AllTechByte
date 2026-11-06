import os
import sys
import json
import time
import urllib.request
import re
import cv2
import numpy as np
from PIL import Image

def clean_and_process_image(img_url, out_path):
    temp_path = out_path + '.tmp'
    try:
        req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=15) as resp, open(temp_path, 'wb') as f:
            f.write(resp.read())
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return False, [f"Download error: {str(e)}"], 0

    flagged = False
    reasons = []

    try:
        pil_img = Image.open(temp_path)
        if pil_img.mode == 'RGBA':
            bg = Image.new('RGB', pil_img.size, (255, 255, 255))
            bg.paste(pil_img, mask=pil_img.split()[3])
            pil_img = bg
        else:
            pil_img = pil_img.convert('RGB')

        img_bgr = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
        h, w, _ = img_bgr.shape

        # 1. Clean background faint tiled watermarks:
        gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
        corner_mean = np.mean(gray[0:20, 0:20])
        if corner_mean > 225:
            near_white = gray > 228
            img_bgr[near_white] = [255, 255, 255]

        # 2. Check and remove Mekatroniks logo header/footer
        hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
        pink_mask = cv2.inRange(hsv, np.array([140, 60, 100]), np.array([170, 255, 255]))
        cyan_mask = cv2.inRange(hsv, np.array([90, 80, 100]), np.array([115, 255, 255]))

        # Top 30% check for logo
        ys_top, xs_top = np.where(pink_mask[:int(h*0.3), :] > 0)
        if len(ys_top) > 40:
            # Logo is at the top banner
            box_max_y = min(int(h * 0.28), int(ys_top.max()) + 55)
            img_bgr[0:box_max_y, :] = [255, 255, 255]

        # Bottom 30% check for logo
        ys_bot, xs_bot = np.where(pink_mask[int(h*0.7):, :] > 0)
        if len(ys_bot) > 40:
            # Logo is at the bottom corner
            min_x = max(0, int(xs_bot.min()) - 130)
            max_x = min(w, int(xs_bot.max()) + 40)
            min_y = max(int(h * 0.68), int(h * 0.7) + int(ys_bot.min()) - 35)
            max_y = min(h, int(h * 0.7) + int(ys_bot.max()) + 45)
            img_bgr[min_y:max_y, min_x:max_x] = [255, 255, 255]

        # 3. Check for diagonal overlay across central product
        mid_cyan = np.where(cyan_mask[int(h*0.3):int(h*0.7), :] > 0)
        if len(mid_cyan[0]) > 250:
            flagged = True
            reasons.append(f"Diagonal watermark 'Mekatroniks.com' detected across central product body ({len(mid_cyan[0])} px)")
            # Inpaint gently
            mid_mask = np.zeros((h, w), dtype=np.uint8)
            mid_mask[int(h*0.3):int(h*0.7), :] = cyan_mask[int(h*0.3):int(h*0.7), :]
            kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
            mid_mask = cv2.dilate(mid_mask, kernel, iterations=1)
            img_bgr = cv2.inpaint(img_bgr, mid_mask, 3, cv2.INPAINT_TELEA)

        # 4. Square crop & optimize
        final_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
        pil_final = Image.fromarray(final_rgb)
        
        width, height = pil_final.size
        if width != height:
            max_dim = max(width, height)
            square_img = Image.new('RGB', (max_dim, max_dim), (255, 255, 255))
            square_img.paste(pil_final, ((max_dim - width) // 2, (max_dim - height) // 2))
            pil_final = square_img

        if pil_final.size[0] > 900:
            pil_final = pil_final.resize((900, 900), Image.Resampling.LANCZOS)

        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        pil_final.save(out_path, 'WEBP', quality=88, method=6)
        size_kb = os.path.getsize(out_path) / 1024

        if os.path.exists(temp_path):
            os.remove(temp_path)

        return True, reasons if flagged else [], size_kb

    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return False, [f"Processing error: {str(e)}"], 0

if __name__ == '__main__':
    # Test on one image
    test_url = 'https://mekatroniks.com/wp-content/uploads/2026/10/Mekatroniks-cooling-fan-with-logo.png'
    ok, res, kb = clean_and_process_image(test_url, 'public/products/test-clean.webp')
    print('Test result:', ok, res, f'{kb:.1f} KB')
