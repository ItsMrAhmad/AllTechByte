const https = require('https');
const fs = require('fs');

const existingProducts = [
  "12-Port Server Power Supply Breakout Board",
  "10A PWM DC Motor Speed Controller (12V to 40V)",
  "100W DC-DC Boost Converter with Digital Voltmeter",
  "100A Spot Welding Controller Board NY-D01",
  "10000ppm MH-Z19C NDIR CO2 Sensor Module",
  "1.8V Adapter for CH341A / RT809H / T48 / TL866II Programmer",
  "1 Meter NEMA 17 Stepper Motor Cable (JST PH2.0 to 4-Pin DuPont)",
  "1 Meter 18650 Battery Pure Nickel Plated Strip (0.15 x 8mm)",
  "Raspberry Pi 5 16GB Single Board Computer",
  "Arduino Uno SMD R3 Development Board with Cable",
  "Raspberry Pi Pico 2 W (Dual Arm Cortex-M33 + Hazard3 RISC-V)",
  "5-Inch HDMI Capacitive Touch Screen LCD for Raspberry Pi & PC",
  "7-Inch HDMI Capacitive Touch LCD Screen (1024x600 IPS)",
  "DS18B20 Waterproof Stainless Steel Temperature Sensor Probe",
  "40-Pin Jumper Wires Ribbon (Female to Female 20cm)",
  "0.36-Inch Mini Digital Voltmeter DC 0-30V (3-Wire Blue LED)",
  "STM32F103C8T6 Blue Pill ARM Cortex-M3 Minimal Board",
  "ESP32-WROOM-32D Dual-Core WiFi & Bluetooth Module",
  "L298N Dual H-Bridge Motor Driver Module",
  "18650 Battery 4-Cell Spot Welder Handheld Pen with Trigger"
];

function fetchPage(catId, page) {
  return new Promise((resolve, reject) => {
    const url = `https://mekatroniks.com/wp-json/wc/store/v1/products?category=${catId}&per_page=50&page=${page}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const totalPages = parseInt(res.headers['x-wp-totalpages'] || '1', 10);
          resolve({ items: Array.isArray(json) ? json : [], totalPages });
        } catch(e) {
          resolve({ items: [], totalPages: 0 });
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const categories = [
    { id: 229, name: 'Arduino Developments Boards', slug: 'arduino-developments-boards' },
    { id: 537, name: 'Incubators Accessories', slug: 'incubators-accessories' },
    { id: 251, name: 'Power Modules', slug: 'power-modules' }
  ];

  const allByCategory = {};

  for (const cat of categories) {
    allByCategory[cat.slug] = [];
    let page = 1;
    let totalPages = 1;
    while (page <= totalPages) {
      console.log(`Fetching ${cat.name} page ${page}...`);
      const res = await fetchPage(cat.id, page);
      allByCategory[cat.slug].push(...res.items);
      totalPages = res.totalPages;
      page++;
      // polite delay
      await new Promise(r => setTimeout(r, 1000));
    }
    console.log(`Finished ${cat.name}: ${allByCategory[cat.slug].length} items.`);
  }

  fs.writeFileSync('scripts/mekatroniks-products.json', JSON.stringify(allByCategory, null, 2));
  console.log('Saved to scripts/mekatroniks-products.json');
}

run().catch(console.error);
