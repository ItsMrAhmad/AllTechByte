# All Tech Byte (alltechbyte.pk)

High-performance Next.js web application recreating and modernizing the layout, typography, and responsive UX of [robostan.pk](https://robostan.pk/), completely refactored with native **Tailwind CSS** and optimized for zero-overhead static deployment on **Cloudflare Pages**.

Prioritizes seamless **WhatsApp Direct Commerce** (inspired by [dotmaticprinter.com](https://dotmaticprinter.com/)), completely eliminating tedious checkout carts, registration forms, and payment friction.

---

## 🚀 Key Features

1. **Reverse-Engineered & Enhanced Layout (from robostan.pk)**:
   - **Sliding Announcement Bar**: Real-time rotating updates, store branch indicators, and quick WhatsApp link.
   - **Multi-Level Responsive Header**: Search bar with category dropdowns, live keyword filtering, and brand logo.
   - **Hero Section**: Showcases flagship development hardware (Raspberry Pi 5, Arduino Uno R3, ESP32, Sensors) with instant "Buy Now" triggers.
   - **4-Column Value Proposition Bar**: Nationwide delivery, 100% tested genuine components, WhatsApp ordering, and Lahore walk-in store.
   - **Popular Categories Grid**: Visual category tiles with image previews and item counters.
   - **Flash Deals & Hot Offers**: Promotional discount pricing with percentage savings tags and stock status.
   - **Interactive Product Catalog**: Searchable, filterable, and sortable by price/rating with pre-formatted WhatsApp order buttons.
   - **Zero-Friction WhatsApp Ordering Banner**: 3-step guide detailing direct human ordering without cart friction.
   - **Physical Lahore Store Showcase**: Highlighting the Bund Road retail store with Google Maps directions.
   - **FAQ Accordion & Technical Knowledge Hub**: Customer questions and engineering tutorials.
   - **Interactive Quick-Order Modal**: Real-time quantity selector, subtotal calculation, and customized WhatsApp order builder.
   - **Sticky Floating WhatsApp CTA**: Pulsing WhatsApp shortcut with customer support notification.

2. **Brand Customization**:
   - **Brand Name**: All Tech Byte
   - **Domain**: `alltechbyte.pk`
   - **WhatsApp & Phone**: `03298840694` (`+92 329 8840694`)
   - **Retail & Dispatch Store**: Shop #8, Muhammadia Colony, Near Muhammadia Masjid, Bund Road, Lahore, Punjab
   - **Brand Logos**: Official vector robot mascot logo & favicon placed in `/public/logo.jpg` and `/public/favicon.jpg`.

3. **Cloudflare Pages Optimization**:
   - Configured with `output: "export"` in `next.config.ts`.
   - Generates pure static HTML/CSS/JS in the `out/` directory.
   - Uses standard `<Image unoptimized />` without Node.js native server dependencies.

---

## 🛠️ Development & Build

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Static Site for Production
```bash
npm run build
```
This compiles the application and outputs the standalone static site into `out/`.

---

## 🌐 Cloudflare Pages Deployment

### Option A: Via Cloudflare Dashboard (GitHub / GitLab)
1. Push this repository to GitHub.
2. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and configure build settings:
   - **Framework preset**: `Next.js (Static Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. Click **Save and Deploy**.

### Option B: Via Wrangler CLI (Direct Deploy)
```bash
npx wrangler pages deploy out --project-name=alltechbyte
```
