const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function checkAll() {
  const dir = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/public/products/original';
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
    
    let countYellow = 0;
    let countGreen = 0;

    // Check bottom-right 25% quadrant
    for (let y = Math.round(info.height * 0.7); y < info.height; y++) {
      for (let x = Math.round(info.width * 0.65); x < info.width; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 200 && g > 150 && b < 100) countYellow++;
        if (g > r + 30 && g > b + 30 && r > 100) countGreen++;
      }
    }

    const hasLogo = (countYellow > 100 && countGreen > 100);
    console.log(file, `${info.width}x${info.height}`, 'Logo detected:', hasLogo, { countYellow, countGreen });
  }
}

checkAll().catch(console.error);
