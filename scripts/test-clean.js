const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function testClean() {
  const inputPath = 'C:/Users/Master/.gemini/antigravity/brain/84f24e24-f6be-4d42-9c2a-77e422eabcb1/.user_uploaded/media_1793738381838_8518f3f8.png';
  const outputPath = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/public/test-cleaned.png';

  const meta = await sharp(inputPath).metadata();
  const width = meta.width;
  const height = meta.height;

  // The watermark is strictly inside:
  // left: Math.round(width * 0.72)
  // top: Math.round(height * 0.88)
  // width: width - left
  // height: height - top

  const patchX = Math.round(width * 0.70);
  const patchY = Math.round(height * 0.88);
  const patchW = width - patchX;
  const patchH = height - patchY;

  // Extract the patch region, blur it heavily so the text disappears into smooth background,
  // or sample the background color just above the watermark:
  // Let's sample a strip from patchY - 25 to patchY, and stretch it downwards!
  const cleanStrip = await sharp(inputPath)
    .extract({
      left: patchX,
      top: Math.max(0, patchY - 15),
      width: patchW,
      height: 10
    })
    .resize(patchW, patchH, { fit: 'fill' })
    .blur(5)
    .toBuffer();

  await sharp(inputPath)
    .composite([
      {
        input: cleanStrip,
        left: patchX,
        top: patchY
      }
    ])
    .toFile(outputPath);

  console.log('Test image generated at:', outputPath);
}

testClean().catch(console.error);
