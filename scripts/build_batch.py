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
    temp_path = out_path + '.download.tmp'
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

        arr = np.array(pil_img)
        img_bgr = cv2.cvtColor(arr, cv2.COLOR_RGB2BGR)
        h, w, _ = img_bgr.shape

        # 1. Background tiled faint watermark removal:
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
            # Look for white gap below logo
            box_max_y = min(int(h * 0.28), int(ys_top.max()) + 50)
            gray_arr = np.mean(img_bgr, axis=2)
            gap_y = box_max_y
            for y in range(box_max_y, min(h, box_max_y + 120)):
                if np.sum(gray_arr[y, :] < 235) < 30:
                    gap_y = y
                    if y + 5 < h and np.sum(gray_arr[y+5, :] < 235) < 30:
                        gap_y = y + 5
                    break
            img_bgr[0:gap_y, :] = [255, 255, 255]

        # Bottom 30% check for logo
        ys_bot, xs_bot = np.where(pink_mask[int(h*0.7):, :] > 0)
        if len(ys_bot) > 40:
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

def clean_html(text):
    if not text:
        return ""
    text = re.sub(r'<[^>]+>', ' ', text)
    text = text.replace('&amp;', '&').replace('&#038;', '&').replace('&#215;', 'x').replace('&quot;', '"').replace('&#8211;', '-').replace('&#8217;', "'")
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def clean_title(title):
    t = clean_html(title)
    # Remove regional marketing noise
    t = re.sub(r'\b(in Pakistan|Pakistan|Shop in Lahore|New in Pakistan|Original|High Quality|Brand New|Hot Sale)\b', '', t, flags=re.I)
    t = re.sub(r'\s*\|\s*$', '', t)
    t = re.sub(r'\s*-\s*$', '', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t

def make_handle(title):
    h = title.lower()
    h = re.sub(r'[^a-z0-9\s-]', '', h)
    h = re.sub(r'\s+', '-', h).strip('-')
    return h[:70]

def extract_specs(desc, title):
    specs = {}
    # Extract voltages: e.g. 3.3V, 5V, 12V, 24V, 220V
    v_match = re.search(r'\b(\d+(\.\d+)?\s*[vV](?:[oO][lL][tT][sS]?)?(?:\s*(?:DC|AC))?)\b', title + ' ' + desc)
    if v_match:
        specs["Operating Voltage"] = v_match.group(1).upper()
        
    # Current: e.g. 10A, 20A, 500mA
    c_match = re.search(r'\b(\d+(\.\d+)?\s*(?:[mM]?[aA]|Amp(?:ere)?s?))\b', title + ' ' + desc)
    if c_match and not c_match.group(1).lower().startswith('0a'):
        specs["Rated Current"] = c_match.group(1).upper()

    # Dimensions: e.g. 40 x 10mm, 40x40mm
    d_match = re.search(r'(\d+\s*[xX]\s*\d+(\s*[xX]\s*\d+)?\s*(?:mm|cm)?)', title + ' ' + desc)
    if d_match:
        specs["Dimensions"] = d_match.group(1)

    # Battery capacity: e.g. 2000mAh, 5200mAh
    b_match = re.search(r'(\d+\s*mAh)', title + ' ' + desc, re.I)
    if b_match:
        specs["Capacity"] = b_match.group(1).upper()

    # Interfaces / chips
    if 'stm32' in (title + desc).lower():
        specs["Microcontroller"] = "STM32 ARM Cortex"
    elif 'atmega328' in (title + desc).lower():
        specs["Microcontroller"] = "ATmega328P"
    elif 'atmega2560' in (title + desc).lower():
        specs["Microcontroller"] = "ATmega2560"
    elif 'attiny85' in (title + desc).lower():
        specs["Microcontroller"] = "ATTiny85"
    elif 'esp8266' in (title + desc).lower():
        specs["Wireless"] = "802.11 b/g/n Wi-Fi (ESP8266)"
    elif 'esp32' in (title + desc).lower():
        specs["Wireless"] = "Wi-Fi + Bluetooth (ESP32)"

    if not specs:
        specs["Condition"] = "Verified Genuine Maker Hardware"
    return specs

def generate_description(title, category, specs):
    if category == "Microcontrollers & Boards":
        return f"High-performance {title} tailored for DIY embedded prototyping, robotics controllers, and IoT development. Fully compatible with standard Arduino IDE and open-source embedded toolchains."
    elif category == "Power & Converters":
        return f"Reliable and efficient {title} engineered for robotics power distribution, battery charging systems, and electronics workbench applications with low ripple and high thermal stability."
    elif category == "Robotics & Motors":
        return f"Precision {title} designed for robotics actuation, automated equipment, thermal cooling, and motor speed regulation with smooth control response."
    else:
        return f"Industrial-grade {title} for automated incubation setups, environmental monitoring, climate regulation, and DIY control circuits."

def run_pipeline():
    with open('scripts/mekatroniks-products.json', 'r', encoding='utf-8') as f:
        source_data = json.load(f)

    with open('data/products.ts', 'r', encoding='utf-8') as f:
        existing_ts = f.read()

    # Identify existing IDs and titles
    existing_titles = re.findall(r'title:\s*"([^"]+)"', existing_ts)
    existing_handles = re.findall(r'handle:\s*"([^"]+)"', existing_ts)
    existing_skus = re.findall(r'sku:\s*"([^"]+)"', existing_ts)

    print(f"Loaded {len(existing_titles)} existing products from catalog.")

    # Deduplication map
    seen_titles = set(t.lower() for t in existing_titles)
    seen_handles = set(existing_handles)
    seen_skus = set(existing_skus)

    # Categories to process
    cat_mapping = {
        'arduino-developments-boards': 'Microcontrollers & Boards',
        'power-modules': 'Power & Converters',
        'incubators-accessories': 'Sensors & Displays' # Will refine per item
    }

    new_products = []
    skipped_products = []
    flagged_images = []
    category_counts = {}

    # Sequential ID generator
    next_id_base = 15469000000000

    item_index = 0

    for cat_slug, items in source_data.items():
        base_cat = cat_mapping.get(cat_slug, 'Power & Converters')
        print(f"\nProcessing category: {cat_slug} ({len(items)} items)...")

        for p in items:
            raw_name = clean_title(p.get('name', ''))
            item_id = str(p.get('id', ''))

            # Check duplicate against existing catalog
            norm_name = raw_name.lower()
            if any(k in norm_name for k in ['arduino uno smd r3', '100w boost converter with digital voltmeter', '10a pwm dc motor speed controller (12v to 40v)']):
                skipped_products.append({"id": item_id, "name": raw_name, "reason": "Already exists in AllTechByte catalog"})
                print(f"  [SKIP EXISTING] {raw_name}")
                continue

            # Check internal duplicate
            # Simplify title for duplicate detection
            simplified_title = re.sub(r'[^a-z0-9]', '', norm_name)
            if simplified_title in seen_titles:
                skipped_products.append({"id": item_id, "name": raw_name, "reason": "Duplicate variant inside source feed"})
                print(f"  [SKIP DUP] {raw_name}")
                continue
            seen_titles.add(simplified_title)

            # Determine refined category
            target_cat = base_cat
            if cat_slug == 'incubators-accessories':
                if any(w in norm_name for w in ['fan', 'motor', 'turner', 'mist maker', 'spray']):
                    target_cat = 'Robotics & Motors'
                elif any(w in norm_name for w in ['heater', 'heating', 'adaptor', 'power supply', '220v to', 'timer switch']):
                    target_cat = 'Power & Converters'
                else:
                    target_cat = 'Sensors & Displays'

            # Clean and generate title
            new_title = raw_name
            if 'arduino' in new_title.lower() and not new_title.lower().startswith('arduino') and 'cable' not in new_title.lower():
                pass # keep as is
            # Prefix category SKU
            cat_code = 'ARD' if target_cat == 'Microcontrollers & Boards' else 'PWR' if target_cat == 'Power & Converters' else 'MOT' if target_cat == 'Robotics & Motors' else 'SNS'
            sku = f"ATB-{cat_code}-{item_id[-4:]}"

            handle = make_handle(new_title)
            if handle in seen_handles:
                handle = f"{handle}-{item_id[-4:]}"
            seen_handles.add(handle)

            # Extract specs
            raw_desc = clean_html(p.get('description', ''))
            specs = extract_specs(raw_desc, new_title)
            desc = generate_description(new_title, target_cat, specs)

            # Process Image
            img_list = p.get('images', [])
            if not img_list:
                skipped_products.append({"id": item_id, "name": raw_name, "reason": "No product image available"})
                continue

            source_img_url = img_list[0].get('src', '')
            prod_id = str(next_id_base + item_index)
            item_index += 1

            img_filename = f"product-{prod_id}.webp"
            img_dest = os.path.join('public', 'products', img_filename)

            # Polite request rate
            time.sleep(1.0)
            ok, flag_reasons, size_kb = clean_and_process_image(source_img_url, img_dest)

            if not ok:
                skipped_products.append({"id": item_id, "name": raw_name, "reason": f"Image processing failed: {flag_reasons}"})
                continue

            if flag_reasons:
                flagged_images.append({
                    "id": prod_id,
                    "title": new_title,
                    "image": f"/products/{img_filename}",
                    "reasons": flag_reasons
                })

            tags = [w.strip() for w in re.split(r'[\s,/]+', new_title) if len(w) > 3][:5]
            if target_cat not in tags:
                tags.append(target_cat.split('&')[0].strip())

            # Create product object
            product_obj = {
                "id": prod_id,
                "title": new_title,
                "handle": handle,
                "price": 0,
                "comparePrice": None,
                "category": target_cat,
                "tags": tags,
                "image": f"/products/{img_filename}",
                "description": desc,
                "inStock": False,
                "isDraft": True,
                "rating": "4.8",
                "reviewsCount": 0,
                "sku": sku,
                "specs": specs
            }

            new_products.append(product_obj)
            category_counts[target_cat] = category_counts.get(target_cat, 0) + 1
            print(f"  [ADDED DRAFT #{len(new_products)}] {new_title} ({target_cat}) -> {img_filename} ({size_kb:.1f} KB)")

    # Save output report
    report = {
        "total_added": len(new_products),
        "category_counts": category_counts,
        "flagged_images_count": len(flagged_images),
        "flagged_images": flagged_images,
        "skipped_products_count": len(skipped_products),
        "skipped_products": skipped_products
    }

    with open('scripts/pipeline_report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)

    with open('scripts/new_products_drafts.json', 'w', encoding='utf-8') as f:
        json.dump(new_products, f, indent=2)

    print("\n================ PIPELINE FINISHED ================")
    print(f"Total new draft products created: {len(new_products)}")
    for cat, cnt in category_counts.items():
        print(f" - {cat}: {cnt} items")
    print(f"Flagged images: {len(flagged_images)}")
    print(f"Skipped products: {len(skipped_products)}")

if __name__ == '__main__':
    run_pipeline()
