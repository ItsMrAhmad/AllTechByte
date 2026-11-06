import urllib.request
import json
import os

with open('scripts/mekatroniks-products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

os.makedirs('scripts/sample_imgs', exist_ok=True)
for cat, prods in data.items():
    print(f"=== Category: {cat} ===")
    for p in prods[:5]:
        if p.get('images'):
            img_url = p['images'][0]['src']
            ext = os.path.splitext(img_url)[1] or '.png'
            dest = f"scripts/sample_imgs/{p['id']}{ext}"
            if not os.path.exists(dest):
                try:
                    req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req) as resp, open(dest, 'wb') as out:
                        out.write(resp.read())
                    print(f"Downloaded {p['id']} ({p['name'][:30]}) -> {dest}")
                except Exception as e:
                    print(f"Error {p['id']}: {e}")
            else:
                print(f"Already exists: {dest}")
