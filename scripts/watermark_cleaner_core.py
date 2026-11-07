import os
import cv2
import numpy as np
from PIL import Image

def remove_robostan_watermark(img_path, out_path=None):
    img = cv2.imread(img_path)
    if img is None:
        return False, "Failed to read"
    h, w, _ = img.shape
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Robostan exact color ranges
    # Orange visor / 'STAN': R in [185..255], G in [105..205], B in [0..95]
    orange = (img_rgb[:, :, 0] > 185) & (img_rgb[:, :, 1] > 105) & (img_rgb[:, :, 1] < 205) & (img_rgb[:, :, 2] < 95)
    # Green 'ACHIEVING TOGETHER': G in [120..230], R in [0..175], B in [0..135]
    green = (img_rgb[:, :, 1] > 120) & (img_rgb[:, :, 0] < 175) & (img_rgb[:, :, 2] < 135)
    
    # Search in corners: TL, TR, BR, BL, TC
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
            # Found Robostan logo in this region!
            combined = (patch_o | patch_g).astype(np.uint8) * 255
            # Dilate to connect characters
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (15, 15))
            dilated = cv2.dilate(combined, kernel, iterations=2)
            contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            for cnt in contours:
                cx, cy, cw, ch = cv2.boundingRect(cnt)
                # Check if this contour has orange and green
                if np.count_nonzero(patch_o[cy:cy+ch, cx:cx+cw]) >= 10 and np.count_nonzero(patch_g[cy:cy+ch, cx:cx+cw]) >= 2:
                    # Absolute coords
                    abs_x1 = max(0, x1 + cx - max(15, int(cw * 0.15)))
                    abs_y1 = max(0, y1 + cy - max(15, int(ch * 0.2)))
                    abs_x2 = min(w, x1 + cx + cw + max(15, int(cw * 0.15)))
                    abs_y2 = min(h, y1 + cy + ch + max(15, int(ch * 0.2)))
                    
                    patch = img[abs_y1:abs_y2, abs_x1:abs_x2]
                    # Estimate background from border of the bounding box
                    border = np.concatenate([
                        patch[0, :, :], patch[-1, :, :],
                        patch[:, 0, :], patch[:, -1, :]
                    ], axis=0)
                    bg_col = np.median(border, axis=0)
                    
                    diff = np.linalg.norm(patch.astype(np.float32) - bg_col, axis=-1)
                    p_mask = (diff > 15).astype(np.uint8) * 255
                    p_dilated = cv2.dilate(p_mask, cv2.getStructuringElement(cv2.MORPH_RECT, (7, 7)), iterations=2)
                    
                    full_mask = np.zeros((h, w), dtype=np.uint8)
                    full_mask[abs_y1:abs_y2, abs_x1:abs_x2] = p_dilated
                    cleaned = cv2.inpaint(cleaned, full_mask, 7, cv2.INPAINT_TELEA)
                    cleaned_any = True
                    print(f"  [{os.path.basename(img_path)}] Cleaned {rname} at ({abs_x1},{abs_y1})-({abs_x2},{abs_y2})")
                    
    if cleaned_any and out_path:
        # Save as WebP if .webp or matching extension
        if out_path.endswith('.webp'):
            # Use PIL to save high-quality WebP
            im_pil = Image.fromarray(cv2.cvtColor(cleaned, cv2.COLOR_BGR2RGB))
            im_pil.save(out_path, "WEBP", quality=90)
        else:
            cv2.imwrite(out_path, cleaned)
            
    return cleaned_any, cleaned

print("Defined remove_robostan_watermark function")
