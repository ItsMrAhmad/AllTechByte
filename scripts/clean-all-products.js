const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processAllProducts() {
  const origDir = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/public/products/original';
  const outDir = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/public/products';
  fs.mkdirSync(outDir, { recursive: true });

  const productsFile = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/data/products.ts';
  let productsCode = fs.readFileSync(productsFile, 'utf8');

  const files = fs.readdirSync(origDir);
  console.log(`Processing ${files.length} images...`);

  for (const file of files) {
    const inputPath = path.join(origDir, file);
    const id = file.replace('product-', '').replace(/\.[^.]+$/, '');
    const outputPath = path.join(outDir, `product-${id}.webp`);

    const meta = await sharp(inputPath).metadata();
    const w = meta.width;
    const h = meta.height;

    // Check if this is one of the high-res images with watermark (1254x1254 or similar)
    if (w >= 800 && h >= 800) {
      console.log(`Removing watermark from ${file} (${w}x${h})...`);

      const patchX = Math.round(w * 0.63);
      const patchY = Math.round(h * 0.70);
      const patchW = w - patchX;
      const patchH = h - patchY;

      // Extract clean background strip right above the watermark
      const strip = await sharp(inputPath)
        .extract({
          left: patchX,
          top: Math.max(0, patchY - 25),
          width: patchW,
          height: 20
        })
        .resize(patchW, patchH, { fit: 'fill' })
        .blur(10)
        .toBuffer();

      await sharp(inputPath)
        .composite([
          {
            input: strip,
            left: patchX,
            top: patchY
          }
        ])
        .webp({ quality: 92 })
        .toFile(outputPath);
    } else {
      // Standard product image without watermark: convert/optimize to clean webp
      console.log(`Optimizing ${file} (${w}x${h})...`);
      await sharp(inputPath)
        .webp({ quality: 92 })
        .toFile(outputPath);
    }

    // Update product image URL in products.ts
    // Match the product with this id and replace its image: "..." with "/products/product-${id}.webp"
    const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?image:\\s*)"[^"]+"`, 'g');
    productsCode = productsCode.replace(regex, `$1"/products/product-${id}.webp"`);
  }

  fs.writeFileSync(productsFile, productsCode, 'utf8');
  console.log('Successfully updated all 20 product images in data/products.ts!');
}

processAllProducts().catch(console.error);
