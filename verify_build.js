const fs = require('fs');

const html = fs.readFileSync('C:/Users/Master/.gemini/antigravity/scratch/alltechbyte/out/index.html', 'utf8');

console.log('HTML size:', html.length);
console.log('Contains All Tech Byte:', html.includes('All Tech Byte'));
console.log('Contains alltechbyte.pk:', html.includes('alltechbyte.pk'));
console.log('Contains WhatsApp 03298840694:', html.includes('03298840694'));
console.log('Contains Bund Road address:', html.includes('Bund Road'));
console.log('Contains Al Latif Center Gulberg address:', html.includes('Al Latif Center'));
console.log('Contains wa.me/923298840694:', html.includes('wa.me/923298840694'));
console.log('Contains logo.jpg:', html.includes('/logo.jpg') || html.includes('logo.jpg'));
console.log('Contains favicon.jpg:', html.includes('favicon.jpg'));
console.log('Contains Robostan (should be NO):', html.includes('Robostan.pk') || html.includes('robostan.pk'));
