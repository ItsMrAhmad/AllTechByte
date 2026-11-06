const fs = require('fs');
const mekaData = JSON.parse(fs.readFileSync('scripts/mekatroniks-products.json'));
const currentProductsContent = fs.readFileSync('data/products.ts', 'utf8');

const regex = /title:\s*"([^"]+)"/g;
const existingTitles = [];
let m;
while ((m = regex.exec(currentProductsContent)) !== null) {
  existingTitles.push(m[1].toLowerCase());
}

console.log('Existing titles in catalog:', existingTitles.length);

const categories = ['arduino-developments-boards', 'incubators-accessories', 'power-modules'];

for (const cat of categories) {
  const items = mekaData[cat];
  console.log(`\n=== Category: ${cat} (${items.length} items) ===`);
  let dupCount = 0;
  items.forEach((p, idx) => {
    const pName = p.name.replace(/&amp;/g, '&').replace(/&#038;/g, '&').replace(/&#215;/g, 'x');
    // Check if title or keywords match existing
    const isDup = existingTitles.some(et => {
      const simplified1 = pName.toLowerCase().replace(/[^a-z0-9]/g, ' ');
      const simplified2 = et.toLowerCase().replace(/[^a-z0-9]/g, ' ');
      // match strong overlap
      if (simplified1.includes('arduino uno smd r3') && simplified2.includes('arduino uno smd r3')) return true;
      if (simplified1.includes('raspberry pi 5') && simplified2.includes('raspberry pi 5')) return true;
      if (simplified1.includes('l298n') && simplified2.includes('l298n')) return true;
      if (simplified1.includes('stm32f103c8t6') && simplified2.includes('stm32f103c8t6')) return true;
      if (simplified1.includes('esp32 wroom 32d') && simplified2.includes('esp32 wroom 32d')) return true;
      if (simplified1.includes('spot welding controller board ny d01') && simplified2.includes('spot welding controller board ny d01')) return true;
      if (simplified1.includes('mh z19c') && simplified2.includes('mh z19c')) return true;
      if (simplified1.includes('ds18b20') && simplified2.includes('ds18b20')) return true;
      if (simplified1.includes('10a pwm dc motor') && simplified2.includes('10a pwm dc motor')) return true;
      return false;
    });

    if (isDup) {
      dupCount++;
      console.log(`  [DUPLICATE SKIP] ${pName}`);
    } else {
      if (idx < 5) console.log(`  [NEW] ${pName}`);
    }
  });
  console.log(`Total duplicates found in ${cat}: ${dupCount}`);
}
