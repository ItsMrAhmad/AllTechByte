import os
import sys
import json
import cv2
import numpy as np

def run_audit():
    with open('scripts/live_products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)

    results = []

    # Products that were already approved or generated as high-res studio photos
    already_approved_ids = {
        '15468079710574', # Raspberry Pi 5
        '15468177654126', # 100W Boost Converter
        '15467975203118', # STM32 Blue Pill
        '15468123029870', # 7-Inch HDMI Screen
        '15468028166446', # Pico 2 W
        '15467912384720', # L298N
        '15467954122158', # Jumper Ribbon
        '15467945032110', # 0.36 Voltmeter
        '15468154945902', # MH-Z19C
        '15468161696110', # NY-D01 Spot Welder
        '15468043862382', # Nickel strip
        '15468019951918', # Uno SMD
        '15468320293230', # Server PSU Breakout
        '15468298797422', # 10A PWM Controller
        '15467901847190', # 1.8V SPI Adapter
        '15467965103418', # NEMA 17 Cable
        '15468011248942', # DS18B20 Probe
        '15468036034126', # Spot Welding Pen
        '15467923481230', # ESP32 WROOM
        '15467931120984', # 5-Inch HDMI Screen
        '15469000000153', # Coreless motor pair
        '15469000000154', # DIY fan kit
        '15469000000155'  # JS-30 motor
    }

    for p in products:
        p_id = p.get('id')
        title = p.get('title')
        category = p.get('category')
        img_rel = p.get('image', '').lstrip('/')
        img_path = os.path.join('public', img_rel)

        if not os.path.exists(img_path):
            results.append({
                'id': p_id,
                'title': title,
                'category': category,
                'image': p.get('image'),
                'status': 'MISSING_FILE',
                'reason': 'Image file does not exist on disk',
                'sharpness': 0,
                'size_kb': 0,
                'dim': '0x0'
            })
            continue

        size_kb = os.path.getsize(img_path) / 1024.0

        # Read image
        img = cv2.imread(img_path)
        if img is None:
            results.append({
                'id': p_id,
                'title': title,
                'category': category,
                'image': p.get('image'),
                'status': 'CORRUPT_FILE',
                'reason': 'Could not decode image',
                'sharpness': 0,
                'size_kb': size_kb,
                'dim': '0x0'
            })
            continue

        h, w, _ = img.shape
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Detect foreground product (exclude near-white pixels)
        fg_mask = gray < 240
        fg_pixels = np.sum(fg_mask)
        fg_ratio = fg_pixels / (h * w)

        # Compute sharpness (Laplacian variance) on foreground
        if fg_pixels > 500:
            # Crop to foreground bounding box
            ys, xs = np.where(fg_mask)
            min_y, max_y = ys.min(), ys.max()
            min_x, max_x = xs.min(), xs.max()
            fg_crop = gray[min_y:max_y+1, min_x:max_x+1]
            fg_w = max_x - min_x + 1
            fg_h = max_y - min_y + 1
            sharpness = cv2.Laplacian(fg_crop, cv2.CV_64F).var()
        else:
            fg_w, fg_h = w, h
            sharpness = cv2.Laplacian(gray, cv2.CV_64F).var()

        # Is it in already-approved list?
        is_previously_approved = p_id in already_approved_ids

        # Evaluate blur/quality issues
        reasons = []
        is_blurry = False

        if not is_previously_approved:
            # 1. Low resolution / small dimensions
            if w < 700 or h < 700:
                reasons.append(f"Low source resolution ({w}x{h} px)")
                is_blurry = True

            # 2. Very low sharpness / blur
            if sharpness < 180:
                reasons.append(f"Severe blur / lack of edge detail (Sharpness score: {sharpness:.1f})")
                is_blurry = True
            elif sharpness < 280:
                reasons.append(f"Moderate blur / soft focus (Sharpness score: {sharpness:.1f})")
                is_blurry = True

            # 3. Very low file size for a 900x900 image (indicates heavy blur/compression)
            if size_kb < 18.0:
                reasons.append(f"Heavy compression artifacts / low detail ({size_kb:.1f} KB)")
                is_blurry = True

            # 4. Tiny foreground (product occupies very little of canvas)
            if fg_ratio < 0.12 and (w >= 700 and h >= 700):
                reasons.append(f"Product is tiny in frame ({fg_ratio*100:.1f}% canvas coverage)")
                is_blurry = True

        status = 'APPROVED_STUDIO' if is_previously_approved else ('NEEDS_REPLACEMENT' if is_blurry else 'ACCEPTABLE')

        results.append({
            'id': p_id,
            'title': title,
            'category': category,
            'image': p.get('image'),
            'status': status,
            'reasons': reasons,
            'sharpness': round(sharpness, 1),
            'size_kb': round(size_kb, 1),
            'dim': f"{w}x{h}",
            'fg_dim': f"{fg_w}x{fg_h}",
            'fg_ratio': round(fg_ratio * 100, 1)
        })

    # Save JSON report
    with open('scripts/image_audit_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    needs_replace = [r for r in results if r['status'] == 'NEEDS_REPLACEMENT']
    acceptable = [r for r in results if r['status'] == 'ACCEPTABLE']
    approved = [r for r in results if r['status'] == 'APPROVED_STUDIO']

    print(f"\n================ IMAGE AUDIT SUMMARY ================")
    print(f"Total Live Images Scanned: {len(results)}")
    print(f" - Approved Studio / Verified: {len(approved)}")
    print(f" - Acceptable / Sharp:         {len(acceptable)}")
    print(f" - Needs Replacement (Blurry): {len(needs_replace)}")

    # Print breakdown by category for items needing replacement
    cat_breakdown = {}
    for r in needs_replace:
        cat_breakdown[r['category']] = cat_breakdown.get(r['category'], 0) + 1
    print("\nBlurry Images by Category:")
    for c, cnt in sorted(cat_breakdown.items(), key=lambda x: -x[1]):
        print(f" - {c}: {cnt} images")

if __name__ == '__main__':
    run_audit()
