import json

with open('scripts/mekatroniks-products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for cat, prods in data.items():
    print(f"=== {cat} ({len(prods)} items) ===")
    for p in prods:
        print(f"[{p['id']}] {p['name']}")
