import cv2
import numpy as np
from PIL import Image
import os

def clean_mekatroniks_image(input_path, output_path):
    # Load with PIL to preserve or convert alpha properly
    pil_img = Image.open(input_path)
    # Convert RGBA to RGB on white background if transparent
    if pil_img.mode == 'RGBA':
        bg = Image.new('RGB', pil_img.size, (255, 255, 255))
        bg.paste(pil_img, mask=pil_img.split()[3])
        pil_img = bg
    else:
        pil_img = pil_img.convert('RGB')

    img = np.array(pil_img)
    img_bgr = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    h, w, _ = img_bgr.shape

    flagged = False
    flag_reason = []

    # 1. Clean background faint tiled watermarks:
    # Any pixel where R > 235, G > 235, B > 235 (near white background with faint watermark) -> set to 255, 255, 255
    near_white_mask = (img[:, :, 0] > 230) & (img[:, :, 1] > 230) & (img[:, :, 2] > 230)
    # Check if corner is near-white
    corner_mean = np.mean(img[0:20, 0:20])
    if corner_mean > 230:
        img_bgr[near_white_mask] = [255, 255, 255]

    # 2. Detect and remove the primary Mekatroniks logo (gear + text)
    # Mekatroniks cyan gear: HSV H in [90..115], S in [120..255], V in [120..255]
    # Mekatroniks pink outline: HSV H in [140..170], S in [80..255], V in [120..255]
    hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
    cyan_mask = cv2.inRange(hsv, np.array([90, 100, 100]), np.array([115, 255, 255]))
    pink_mask = cv2.inRange(hsv, np.array([140, 60, 100]), np.array([170, 255, 255]))
    logo_mask = cv2.bitwise_or(cyan_mask, pink_mask)

    # Check top 28% and bottom 28%
    top_limit = int(h * 0.28)
    bottom_limit = int(h * 0.72)

    top_logo_pixels = np.where(logo_mask[0:top_limit, :] > 0)
    if len(top_logo_pixels[0]) > 50:
        min_y = max(0, int(np.min(top_logo_pixels[0])) - 15)
        max_y = min(top_limit, int(np.max(top_logo_pixels[0])) + 70) # cover subtitle text
        min_x = max(0, int(np.min(top_logo_pixels[1])) - 20)
        max_x = min(w, int(np.max(top_logo_pixels[1])) + 20)
        
        # Check if region is on white background
        bg_sample = img_bgr[min_y:max_y, min_x:max_x]
        # Replace logo region with white (or inpaint)
        img_bgr[min_y:max_y, min_x:max_x] = [255, 255, 255]

    bottom_logo_pixels = np.where(logo_mask[bottom_limit:h, :] > 0)
    if len(bottom_logo_pixels[0]) > 50:
        min_y = max(bottom_limit, bottom_limit + int(np.min(bottom_logo_pixels[0])) - 60)
        max_y = min(h, bottom_limit + int(np.max(bottom_logo_pixels[0])) + 15)
        min_x = max(0, int(np.min(bottom_logo_pixels[1])) - 20)
        max_x = min(w, int(np.max(bottom_logo_pixels[1])) + 20)
        img_bgr[min_y:max_y, min_x:max_x] = [255, 255, 255]

    # 3. Check for diagonal overlay text across central product (between top_limit and bottom_limit)
    mid_logo_pixels = np.where(cyan_mask[top_limit:bottom_limit, :] > 0)
    if len(mid_logo_pixels[0]) > 100:
        # Diagonal text Mekatroniks.com exists across the product
        flagged = True
        flag_reason.append(f"Diagonal watermark 'Mekatroniks.com' across product surface ({len(mid_logo_pixels[0])} pixels)")
        # Inpaint with small radius
        inpaint_mask = np.zeros((h, w), dtype=np.uint8)
        inpaint_mask[top_limit:bottom_limit, :] = cyan_mask[top_limit:bottom_limit, :]
        inpaint_mask = cv2.dilate(inpaint_mask, np.ones((5,5), np.uint8), iterations=2)
        img_bgr = cv2.inpaint(img_bgr, inpaint_mask, 3, cv2.INPAINT_TELEA)

    # 4. Square crop & optimize
    final_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    pil_final = Image.fromarray(final_rgb)
    
    # Make square by adding white padding if needed
    width, height = pil_final.size
    if width != height:
        max_dim = max(width, height)
        square_img = Image.new('RGB', (max_dim, max_dim), (255, 255, 255))
        square_img.paste(pil_final, ((max_dim - width) // 2, (max_dim - height) // 2))
        pil_final = square_img

    # Resize to max 1000x1000 for web performance
    if pil_final.size[0] > 1000:
        pil_final = pil_final.resize((1000, 1000), Image.Resampling.LANCZOS)

    pil_final.save(output_path, 'WEBP', quality=90, method=6)
    size_kb = os.path.getsize(output_path) / 1024
    return flagged, flag_reason, size_kb

os.makedirs('scripts/test_clean_out', exist_ok=True)
test_ids = ['11667', '11063', '11894', '7802', '9896', '11874']
for tid in test_ids:
    for ext in ['.png', '.jpg']:
        inp = f'scripts/sample_imgs/{tid}{ext}'
        if os.path.exists(inp):
            outp = f'scripts/test_clean_out/{tid}.webp'
            flagged, reasons, kb = clean_mekatroniks_image(inp, outp)
            print(f"Cleaned {tid}: {kb:.1f} KB, flagged: {flagged}, reasons: {reasons}")
            break
