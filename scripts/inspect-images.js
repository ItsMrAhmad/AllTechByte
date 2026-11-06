const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function inspectAll() {
  const dir = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/public/products/original';
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const meta = await sharp(filePath).metadata();
    console.log(file, `${meta.width}x${meta.height}`, meta.format);
  }
}

inspectAll().catch(console.error);
