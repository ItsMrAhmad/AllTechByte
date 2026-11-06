const fs = require('fs');
const content = fs.readFileSync('C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/data/products.ts', 'utf8');
const regex = /id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"/g;
let m;
let i = 1;
while ((m = regex.exec(content)) !== null) {
  console.log(`${i++}. ${m[2]} | ${m[3]}`);
}
