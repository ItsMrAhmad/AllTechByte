import os
import json

def generate_html():
    with open('scripts/image_audit_results.json', 'r', encoding='utf-8') as f:
        results = json.load(f)

    artifact_dir = r"C:\Users\Master\.gemini\antigravity\brain\84f24e24-f6be-4d42-9c2a-77e422eabcb1"
    out_html = os.path.join(artifact_dir, "image_quality_audit_preview.html")

    flagged = [r for r in results if r['status'] == 'NEEDS_REPLACEMENT']
    acceptable = [r for r in results if r['status'] == 'ACCEPTABLE']
    approved = [r for r in results if r['status'] == 'APPROVED_STUDIO']

    # Project absolute public directory for image src
    proj_public = r"file:///C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/public"

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AllTechByte Catalog Image Quality Audit</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      padding: 30px;
      margin: 0;
    }}
    .header {{
      background: #ffffff;
      padding: 24px 30px;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
      margin-bottom: 24px;
    }}
    h1 {{ margin: 0 0 10px 0; font-size: 26px; color: #1e293b; }}
    .stats {{
      display: flex;
      gap: 16px;
      margin-top: 15px;
    }}
    .stat-pill {{
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
    }}
    .pill-red {{ background: #fee2e2; color: #b91c1c; border: 1px solid #f87171; }}
    .pill-green {{ background: #dcfce7; color: #15803d; border: 1px solid #86efac; }}
    .pill-blue {{ background: #e0e7ff; color: #3730a3; border: 1px solid #a5b4fc; }}
    
    .filters {{
      margin: 20px 0;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }}
    .filter-btn {{
      padding: 8px 16px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
    }}
    .filter-btn.active {{
      background: #2563eb;
      color: #ffffff;
      border-color: #2563eb;
    }}
    
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }}
    .card {{
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04);
      border: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
    }}
    .card.needs-replace {{
      border-color: #fca5a5;
    }}
    .img-box {{
      position: relative;
      background: #f8fafc;
      width: 100%;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #e2e8f0;
    }}
    .img-box img {{
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    }}
    .badge {{
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }}
    .badge-red {{ background: #ef4444; color: #fff; }}
    .badge-green {{ background: #10b981; color: #fff; }}
    .badge-blue {{ background: #3b82f6; color: #fff; }}

    .card-body {{
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }}
    .category {{
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 4px;
    }}
    .card-title {{
      font-size: 14px;
      font-weight: 600;
      line-height: 1.35;
      color: #0f172a;
      margin-bottom: 10px;
      flex-grow: 1;
    }}
    .meta {{
      font-size: 12px;
      color: #475569;
      background: #f8fafc;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      margin-bottom: 8px;
    }}
    .reasons {{
      font-size: 12px;
      color: #b91c1c;
      background: #fff1f2;
      border: 1px solid #fecdd3;
      padding: 6px 10px;
      border-radius: 6px;
      line-height: 1.3;
    }}
  </style>
</head>
<body>
  <div class="header">
    <h1>AllTechByte Catalog Image Quality Audit</h1>
    <p>Comprehensive scan across all 171 live products in the storefront catalog.</p>
    <div class="stats">
      <div class="stat-pill pill-red">Needs Replacement: {len(flagged)} Blurry / Low-Res</div>
      <div class="stat-pill pill-blue">Approved Studio Photos: {len(approved)} High-Res</div>
      <div class="stat-pill pill-green">Acceptable Quality: {len(acceptable)} Items</div>
    </div>
  </div>

  <div class="filters">
    <button class="filter-btn active" onclick="filterCategory('all')">Show All ({len(results)})</button>
    <button class="filter-btn" onclick="filterCategory('flagged')">🔴 Blurry / Needs Replacement ({len(flagged)})</button>
    <button class="filter-btn" onclick="filterCategory('Microcontrollers & Boards')">Microcontrollers ({len([r for r in flagged if r['category'] == 'Microcontrollers & Boards'])})</button>
    <button class="filter-btn" onclick="filterCategory('Robotics & Motors')">Robotics & Motors ({len([r for r in flagged if r['category'] == 'Robotics & Motors'])})</button>
    <button class="filter-btn" onclick="filterCategory('Sensors & Displays')">Sensors & Displays ({len([r for r in flagged if r['category'] == 'Sensors & Displays'])})</button>
    <button class="filter-btn" onclick="filterCategory('Power & Converters')">Power & Converters ({len([r for r in flagged if r['category'] == 'Power & Converters'])})</button>
    <button class="filter-btn" onclick="filterCategory('approved')">🟢 Sharp / Approved ({len(approved) + len(acceptable)})</button>
  </div>

  <div class="grid" id="productGrid">
"""

    for r in results:
        status_class = "needs-replace" if r['status'] == 'NEEDS_REPLACEMENT' else "approved"
        badge_class = "badge-red" if r['status'] == 'NEEDS_REPLACEMENT' else ("badge-blue" if r['status'] == 'APPROVED_STUDIO' else "badge-green")
        badge_text = "Blurry / Low-Res" if r['status'] == 'NEEDS_REPLACEMENT' else ("Studio Sharp" if r['status'] == 'APPROVED_STUDIO' else "Sharp / OK")
        img_url = proj_public + r['image']
        reasons_html = f"<div class='reasons'><strong>Issues:</strong> {'; '.join(r['reasons'])}</div>" if r['reasons'] else ""

        html += f"""
    <div class="card {status_class}" data-category="{r['category']}" data-status="{r['status']}">
      <div class="img-box">
        <span class="badge {badge_class}">{badge_text}</span>
        <img src="{img_url}" alt="{r['title']}" loading="lazy" />
      </div>
      <div class="card-body">
        <div class="category">{r['category']}</div>
        <div class="card-title">[{r['id']}] {r['title']}</div>
        <div class="meta">
          <strong>Resolution:</strong> {r['dim']} | <strong>File Size:</strong> {r['size_kb']} KB | <strong>Sharpness:</strong> {r['sharpness']}
        </div>
        {reasons_html}
      </div>
    </div>
"""

    html += """
  </div>

  <script>
    function filterCategory(cat) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        if (cat === 'all') {
          card.style.display = 'flex';
        } else if (cat === 'flagged') {
          card.style.display = card.getAttribute('data-status') === 'NEEDS_REPLACEMENT' ? 'flex' : 'none';
        } else if (cat === 'approved') {
          card.style.display = card.getAttribute('data-status') !== 'NEEDS_REPLACEMENT' ? 'flex' : 'none';
        } else {
          card.style.display = (card.getAttribute('data-category') === cat && card.getAttribute('data-status') === 'NEEDS_REPLACEMENT') ? 'flex' : 'none';
        }
      });
    }
  </script>
</body>
</html>
"""

    with open(out_html, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"Successfully generated HTML preview report at: {out_html}")

if __name__ == '__main__':
    generate_html()
