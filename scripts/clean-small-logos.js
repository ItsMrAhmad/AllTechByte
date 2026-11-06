const sharp = require('sharp');
const fs = require('fs');

async function cleanPiAndUno() {
  // 1. Raspberry Pi 5 16GB: product-15468028166446.webp (320x240)
  const piBuf = fs.readFileSync('public/products/product-15468028166446.webp');
  const { data: piData, info: piInfo } = await sharp(piBuf).raw().toBuffer({ resolveWithObject: true });
  
  const bgIdx = (5 * piInfo.width + 60) * piInfo.channels;
  const bgR = piData[bgIdx], bgG = piData[bgIdx+1], bgB = piData[bgIdx+2];

  const patchWidth = 115;
  const patchHeight = 45;
  
  const patchSvg = `<svg width="${patchWidth}" height="${patchHeight}">
    <rect width="${patchWidth}" height="${patchHeight}" fill="rgb(${bgR},${bgG},${bgB})" />
  </svg>`;
  
  const blurredPatch = await sharp(Buffer.from(patchSvg))
    .blur(2)
    .toBuffer();

  const cleanedPiBuf = await sharp(piBuf)
    .composite([
      { input: blurredPatch, left: 5, top: 8 }
    ])
    .webp({ quality: 92 })
    .toBuffer();

  fs.writeFileSync('public/products/product-15468028166446.webp', cleanedPiBuf);
  console.log('Cleaned Pi logo successfully!');

  // 2. Arduino Uno: product-15468019951918.webp (320x320)
  const unoBuf = fs.readFileSync('public/products/product-15468019951918.webp');
  const { data: unoData, info: unoInfo } = await sharp(unoBuf).raw().toBuffer({ resolveWithObject: true });
  const unoBgIdx = (10 * unoInfo.width + 200) * unoInfo.channels;
  const uR = unoData[unoBgIdx], uG = unoData[unoBgIdx+1], uB = unoData[unoBgIdx+2];

  const unoPatchSvg = `<svg width="155" height="32">
    <rect width="155" height="32" fill="rgb(${uR},${uG},${uB})" />
  </svg>`;
  const unoBlurredPatch = await sharp(Buffer.from(unoPatchSvg)).blur(2).toBuffer();

  const cleanedUnoBuf = await sharp(unoBuf)
    .composite([
      { input: unoBlurredPatch, left: 5, top: 1 }
    ])
    .webp({ quality: 92 })
    .toBuffer();

  fs.writeFileSync('public/products/product-15468019951918.webp', cleanedUnoBuf);
  console.log('Cleaned Uno logo successfully!');
}

cleanPiAndUno().catch(console.error);
