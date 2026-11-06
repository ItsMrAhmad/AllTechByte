const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

async function downloadAll() {
  const productsFile = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/data/products.ts';
  const content = fs.readFileSync(productsFile, 'utf8');

  // Extract products
  const regex = /id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g;
  let match;
  const products = [];
  while ((match = regex.exec(content)) !== null) {
    products.push({ id: match[1], title: match[2], image: match[3] });
  }

  console.log(`Found ${products.length} products.`);

  const destDir = 'C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/public/products/original';
  fs.mkdirSync(destDir, { recursive: true });

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const url = p.image;
    const ext = url.includes('.png') ? '.png' : url.includes('.webp') ? '.webp' : '.jpg';
    const filename = `product-${p.id}${ext}`;
    const filePath = path.join(destDir, filename);

    if (!fs.existsSync(filePath)) {
      console.log(`Downloading (${i + 1}/${products.length}): ${p.title.substring(0, 30)}...`);
      await downloadFile(url, filePath);
    }
  }

  console.log('All downloads completed!');
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(dest);
      });
    }).on('error', reject);
  });
}

downloadAll().catch(console.error);
