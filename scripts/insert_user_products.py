import json

new_products = [
  {
    "id": "15469000000149",
    "title": "ESP32 NodeMCU 30-Pin WiFi & Bluetooth Development Board (CP2102)",
    "handle": "esp32-nodemcu-30-pin-cp2102-wifi-bluetooth-dev-board",
    "price": 0,
    "comparePrice": None,
    "category": "Microcontrollers & Boards",
    "tags": ["ESP32", "NodeMCU", "WiFi", "Bluetooth", "CP2102", "Microcontrollers", "IoT"],
    "image": "/products/product-15469000000149.webp",
    "description": "Compact 30-pin ESP32 NodeMCU development board powered by ESP-WROOM-32 with integrated Silicon Labs CP2102 USB-to-UART bridge. Features 2.4GHz dual-mode Wi-Fi and Bluetooth BLE 4.2 with onboard EN and BOOT buttons for rapid IoT and robotics prototyping.",
    "inStock": False,
    "isDraft": True,
    "rating": "5.0",
    "reviewsCount": 0,
    "sku": "ATB-MCU-ESP32-30P",
    "specs": {
      "Core Module": "ESP-WROOM-32",
      "USB Interface": "Silicon Labs CP2102 Micro-USB",
      "Pin Count": "30 Pins (2.54mm pitch)",
      "Wireless Connectivity": "2.4 GHz Wi-Fi (802.11 b/g/n) + Bluetooth v4.2 BR/EDR & BLE",
      "Buttons": "EN (Reset) & BOOT pushbuttons"
    }
  },
  {
    "id": "15469000000150",
    "title": "GA12-N20 Micro Metal Gear Motor with 3mm D-Shaft",
    "handle": "ga12-n20-micro-metal-gear-motor-3mm-d-shaft",
    "price": 0,
    "comparePrice": None,
    "category": "Robotics & Motors",
    "tags": ["N20", "Motor", "Gear Motor", "GA12-N20", "Robotics", "DC Motor"],
    "image": "/products/product-15469000000150.webp",
    "description": "High-precision GA12-N20 micro DC motor featuring an integrated all-metal reduction gearbox, flat 3mm D-cut drive shaft, and dual M1.6 front faceplate mounting holes for miniature robotics, smart locks, and automation projects.",
    "inStock": False,
    "isDraft": True,
    "rating": "5.0",
    "reviewsCount": 0,
    "sku": "ATB-MOT-N20-D3",
    "specs": {
      "Motor Model": "GA12-N20",
      "Shaft Profile": "3mm D-Shaft",
      "Gearbox Structure": "All-Metal Spur Gearhead",
      "Mounting Pattern": "Dual M1.6 threaded faceplate holes",
      "Gearbox Face": "12 mm x 9 mm"
    }
  },
  {
    "id": "15469000000151",
    "title": "GA12-N20 High-Torque Miniature All-Metal Gearbox DC Motor",
    "handle": "ga12-n20-high-torque-miniature-all-metal-gearbox-dc-motor",
    "price": 0,
    "comparePrice": None,
    "category": "Robotics & Motors",
    "tags": ["N20", "Gearbox", "DC Motor", "Robotics", "Micro Motor"],
    "image": "/products/product-15469000000151.webp",
    "description": "Rugged GA12-N20 sub-miniature DC gearmotor built with a multi-stage all-metal gear train supported between rigid brass end plates. Designed for high torque output, wear resistance, and long operational life in compact robotic chassis.",
    "inStock": False,
    "isDraft": True,
    "rating": "5.0",
    "reviewsCount": 0,
    "sku": "ATB-MOT-N20-GB",
    "specs": {
      "Gear Construction": "Solid steel and brass spur gears",
      "Frame Material": "Brass end plates with steel spacers",
      "Shaft Diameter": "3 mm D-Cut",
      "Motor Type": "N20 DC motor"
    }
  },
  {
    "id": "15469000000152",
    "title": "GA12-N20 Micro Metal Gear Motor 24mm (M1.6 Mounting, 3mm D-Shaft)",
    "handle": "ga12-n20-micro-metal-gear-motor-24mm-m16-mount",
    "price": 0,
    "comparePrice": None,
    "category": "Robotics & Motors",
    "tags": ["N20", "Micro Metal Gear Motor", "24mm", "M1.6", "Motor", "Robotics"],
    "image": "/products/product-15469000000152.webp",
    "description": "Standard 24mm GA12-N20 micro DC gearmotor with verified physical dimensions: 24mm overall length, 12mm motor body height, 3mm D-shaft with 3.8mm shaft extension, 12mm x 9mm gearbox profile, and M1.6 mounting threads.",
    "inStock": False,
    "isDraft": True,
    "rating": "5.0",
    "reviewsCount": 0,
    "sku": "ATB-MOT-N20-24MM",
    "specs": {
      "Total Length": "24 mm",
      "Motor Body Height": "12 mm",
      "Output Shaft Diameter": "3 mm (D-Shape)",
      "Output Shaft Length": "3.8 mm",
      "Gearbox Profile": "12 mm x 9 mm",
      "Mounting Screws": "M1.6"
    }
  }
]

with open('data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Check if any ID already exists
for p in new_products:
    if f'"{p["id"]}"' in content:
        print(f"Product {p['id']} already exists, skipping")

# Format into TypeScript objects
formatted_items = []
for p in new_products:
    item_str = (
        "  {\n"
        f"    id: {json.dumps(p['id'])},\n"
        f"    title: {json.dumps(p['title'])},\n"
        f"    handle: {json.dumps(p['handle'])},\n"
        f"    price: {p['price']},\n"
        f"    comparePrice: {'null' if p['comparePrice'] is None else p['comparePrice']},\n"
        f"    category: {json.dumps(p['category'])},\n"
        f"    tags: {json.dumps(p['tags'])},\n"
        f"    image: {json.dumps(p['image'])},\n"
        f"    description: {json.dumps(p['description'])},\n"
        f"    inStock: {'true' if p['inStock'] else 'false'},\n"
        f"    isDraft: {'true' if p['isDraft'] else 'false'},\n"
        f"    rating: {json.dumps(p['rating'])},\n"
        f"    reviewsCount: {p['reviewsCount']},\n"
        f"    sku: {json.dumps(p['sku'])},\n"
        f"    specs: {json.dumps(p['specs'])}\n"
        "  }"
    )
    formatted_items.append(item_str)

last_bracket = content.rfind('];')
if last_bracket == -1:
    raise Exception("Could not find closing bracket of PRODUCTS")

before = content[:last_bracket].rstrip()
if before.endswith(','):
    new_content = before + "\n" + ",\n".join(formatted_items) + "\n" + content[last_bracket:]
else:
    new_content = before + ",\n" + ",\n".join(formatted_items) + "\n" + content[last_bracket:]

with open('data/products.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Successfully inserted {len(new_products)} products into data/products.ts!")
