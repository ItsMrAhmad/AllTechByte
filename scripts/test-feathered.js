const sharp = require('sharp');
const fs = require('fs');

async function testFeatheredClean() {
  const input = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/public/products/original/product-15468298797422.png';
  const output = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/public/test-feathered.png';

  const meta = await sharp(input).metadata();
  const w = meta.width;
  const h = meta.height;

  const patchX = Math.round(w * 0.64);
  const patchY = Math.round(h * 0.70);
  const patchW = w - patchX;
  const patchH = h - patchY;

  // Extract clean background strip right above the watermark
  const strip = await sharp(input)
    .extract({
      left: patchX,
      top: patchY - 20,
      width: patchW,
      height: 15
    })
    .resize(patchW, patchH, { fit: 'fill' })
    .blur(8)
    .toBuffer();

  // Create feather mask SVG with linear gradient so left and top edges blend smoothly
  const maskSvg = Buffer.from(`
    <svg width="${patchW}" height="${patchH}">
      <defs>
        <linearGradient id="fadeX" x1="0%" y1="0%" x2="10%" y2="0%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0" />
          <stop offset="100%" stop-color="#fff" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="fadeY" x1="0%" y1="0%" x2="0%" y2="10%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0" />
          <stop offset="100%" stop-color="#fff" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${patchW}" height="${patchH}" fill="#fff" />
    </svg>
  `);

  await sharp(input)
    .composite([
      {
        input: strip,
        left: patchX,
        top: patchY
      }
    ])
    .toFile(output);

  console.log('Feathered clean generated!');
}

testFeatheredClean().catch(console.error);
