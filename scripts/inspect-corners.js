const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function inspectCorners() {
  const dir = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/public/products/original';
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
    
    // Check variance / details in bottom-right 20%
    let nonWhitePixels = 0;
    const startX = Math.round(info.width * 0.75);
    const startY = Math.round(info.height * 0.85);

    for (let y = startY; y < info.height; y++) {
      for (let x = startX; x < info.width; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        // If not white/light-grey background
        if (r < 245 || g < 245 || b < 245) {
          nonWhitePixels++;
        }
      }
    }

    console.log(file, `${info.width}x${info.height}`, 'Non-white in bottom-right corner:', nonWhitePixels);
  }
}

inspectCorners().catch(console.error);
