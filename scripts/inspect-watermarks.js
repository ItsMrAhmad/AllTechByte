const sharp = require('sharp');

async function checkL298Logo() {
  const meta = await sharp('public/products/product-15467912384720.webp').metadata();
  console.log(meta);
  // Let's crop corner areas and check
  const tl = await sharp('public/products/product-15467912384720.webp').extract({ left: 0, top: 0, width: 80, height: 40 }).raw().toBuffer();
  // check if any non-white/grey
  console.log('TL sample bytes:', tl.length);
}
checkL298Logo();
