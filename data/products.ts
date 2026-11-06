export interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  comparePrice: number | null;
  category: string;
  tags: string[];
  image: string;
  description: string;
  inStock: boolean;
  rating: string;
  reviewsCount: number;
  sku?: string;
  specs?: Record<string, string>;
}

export const CATEGORIES = [
  { id: 'all', name: 'All Products', count: 50, icon: 'Cpu' },
  { id: 'boards', name: 'Microcontrollers & Boards', count: 14, icon: 'CircuitBoard', query: ['board', 'arduino', 'raspberry', 'stm', 'breakout', 'controller'] },
  { id: 'components', name: 'Electronic Components & ICs', count: 12, icon: 'Cpu', query: ['ic', 'sop', 'dip', 'transistor', 'diode', 'mosfet', 'oscillator'] },
  { id: 'sensors', name: 'Sensors & Displays', count: 10, icon: 'Activity', query: ['sensor', 'voltmeter', 'lcd', 'display', 'temperature', 'touch screen'] },
  { id: 'robotics', name: 'Robotics & Motors', count: 8, icon: 'Bot', query: ['motor', 'speed controller', 'pwm', 'stepper', 'robotics'] },
  { id: 'power', name: 'Power & Converters', count: 9, icon: 'Zap', query: ['boost converter', 'power supply', 'spot welder', 'charger', 'battery'] },
  { id: 'tools', name: 'Tools, Cables & Wires', count: 7, icon: 'Wrench', query: ['cable', 'wire', 'jumper', 'tape', 'strip', 'adapter', 'tool'] }
];

export const PRODUCTS: Product[] = [
  {
    id: "15468320293230",
    title: "12-Port Server Power Supply Breakout Board",
    handle: "12-port-server-power-supply-breakout-board",
    price: 2093,
    comparePrice: 2633,
    category: "Power & Converters",
    tags: ["Breakout Boards", "Power Supply", "Mining", "Robotics"],
    image: "/products/product-15468320293230.webp",
    description: "High-grade 12-port breakout board for HP/Delta common slot server power supplies. Ideal for high current 12V robotics, 3D printers, battery charging stations, and maker projects.",
    inStock: true,
    rating: "4.9",
    reviewsCount: 38,
    sku: "ATB-PWR-012",
    specs: { "Input Voltage": "12V Common Slot", "Ports": "12x PCIe 6-Pin", "Output": "Up to 1200W", "Dimensions": "90 x 90 mm" }
  },
  {
    id: "15468298797422",
    title: "10A PWM DC Motor Speed Controller (12V to 40V)",
    handle: "10a-pwm-dc-motor-speed-controller-12v-to-40v",
    price: 878,
    comparePrice: 1148,
    category: "Robotics & Motors",
    tags: ["Modules and Motors", "PWM", "Speed Controller"],
    image: "/products/product-15468298797422.webp",
    description: "High-efficiency 10A PWM DC motor speed controller module with potentiometer and forward reverse switch capability. Smooth speed regulation without loss of torque.",
    inStock: true,
    rating: "4.8",
    reviewsCount: 42,
    sku: "ATB-MOT-PWM10",
    specs: { "Operating Voltage": "DC 12V - 40V", "Max Current": "10A Continuous", "PWM Frequency": "13 kHz", "Duty Cycle": "10% - 100%" }
  },
  {
    id: "15468177654126",
    title: "100W DC-DC Boost Converter with Digital Voltmeter",
    handle: "100w-dc-dc-boost-converter-with-digital-voltmeter",
    price: 1215,
    comparePrice: 1620,
    category: "Power & Converters",
    tags: ["Boost Converter", "Power Modules", "Step-Up"],
    image: "/products/product-15468177654126.webp",
    description: "High power step-up voltage regulator with integrated dual 3-digit LED voltmeter. Easy monitoring of input and output voltages with push-button toggle.",
    inStock: true,
    rating: "4.9",
    reviewsCount: 51,
    sku: "ATB-BST-100W",
    specs: { "Input Voltage": "3.0V - 35V", "Output Voltage": "3.5V - 35V Adjustable", "Max Power": "100W", "Efficiency": "Up to 96%" }
  },
  {
    id: "15468161696110",
    title: "100A Spot Welding Controller Board NY-D01",
    handle: "100a-spot-welding-controller-board-ny-d01",
    price: 4320,
    comparePrice: 5130,
    category: "Power & Converters",
    tags: ["Spot Welder", "18650 Battery", "Welding Machine"],
    image: "/products/product-15468161696110.webp",
    description: "Industrial NY-D01 100A digital spot welder control board with dual pulse timing and current regulation displays. Essential for 18650 lithium battery pack assembly.",
    inStock: true,
    rating: "5.0",
    reviewsCount: 29,
    sku: "ATB-SPT-NYD01",
    specs: { "Current Capacity": "100A Thyristor", "Display": "Dual Digital LED", "Time Adjust": "1-50 cycles", "Current Adjust": "30-99%" }
  },
  {
    id: "15468154945902",
    title: "10000ppm MH-Z19C NDIR CO2 Sensor Module",
    handle: "10000ppm-mh-z19c-co2-sensor-module-ndir",
    price: 12150,
    comparePrice: 14175,
    category: "Sensors & Displays",
    tags: ["Sensor", "Air Quality", "NDIR", "CO2"],
    image: "/products/product-15468154945902.webp",
    description: "Genuine Winsen MH-Z19C Non-Dispersive Infrared (NDIR) carbon dioxide gas sensor. High selectivity, non-oxygen dependency, and long operational lifespan for smart home & HVAC.",
    inStock: true,
    rating: "4.9",
    reviewsCount: 19,
    sku: "ATB-SNS-MHZ19C",
    specs: { "Target Gas": "CO2", "Range": "400 - 10000 ppm", "Output": "UART / PWM / Analog", "Accuracy": "+-(50ppm + 5% reading)" }
  },
  {
    id: "15468123029870",
    title: "1.8V Adapter for CH341A / RT809H / T48 / TL866II Programmer",
    handle: "1-8v-adapter-for-ch341a-rt809h-t48-tl866ii",
    price: 2970,
    comparePrice: 3510,
    category: "Tools, Cables & Wires",
    tags: ["Programmer", "Flash Memory", "Adapter", "CH341A"],
    image: "/products/product-15468123029870.webp",
    description: "Low-voltage level shifter adapter converting 3.3V/5V programmer lines to safe 1.8V for modern SPI flash memory chips (Winbond, Macronix, GigaDevice) used in motherboards and routers.",
    inStock: true,
    rating: "4.8",
    reviewsCount: 31,
    sku: "ATB-TL-ADP18",
    specs: { "Voltage": "1.8V Regulated", "Compatibility": "CH341A, TL866II Plus, T48", "Supported Chips": "W25Q64FW, GD25LQ64, MX25U6435" }
  },
  {
    id: "15468079710574",
    title: "1 Meter NEMA 17 Stepper Motor Cable (JST PH2.0 to 4-Pin DuPont)",
    handle: "1-meter-nema-17-stepper-motor-extension-cable-4-pin-female-jst-ph2-0-to-4-pin-dupont-extension-wire-for-3d-printers-cnc-in-pakistan",
    price: 270,
    comparePrice: 378,
    category: "Tools, Cables & Wires",
    tags: ["Stepper Motor", "3D Printer", "CNC", "Cables"],
    image: "/products/product-15468079710574.webp",
    description: "Premium flexible 1-meter 4-wire stepper motor lead cable. Connector A: 6-pin JST-PH2.0 (4 wires connected), Connector B: 4-pin 2.54mm DuPont female header. Perfect for Ender 3, Voron, CNC.",
    inStock: true,
    rating: "4.7",
    reviewsCount: 64,
    sku: "ATB-CBL-NEMA1M",
    specs: { "Length": "100 cm", "Gauge": "26 AWG Copper", "Connectors": "PH2.0-6P to 2.54mm 4P", "Application": "NEMA 17 Stepper" }
  },
  {
    id: "15468043862382",
    title: "1 Meter 18650 Battery Pure Nickel Plated Strip (0.15 x 8mm)",
    handle: "1-meter-18650-nickel-plated-strip-tape",
    price: 351,
    comparePrice: 473,
    category: "Tools, Cables & Wires",
    tags: ["18650", "Nickel Strip", "Spot Welding", "Battery Pack"],
    image: "/products/product-15468043862382.webp",
    description: "High-conductivity nickel-plated steel strip tape for spot welding 18650, 21700, and 26650 lithium battery packs. Low internal resistance and clean spot weld formation.",
    inStock: true,
    rating: "4.8",
    reviewsCount: 88,
    sku: "ATB-BAT-NCK015",
    specs: { "Thickness": "0.15 mm", "Width": "8 mm", "Length": "1 Meter", "Material": "Nickel-Plated SPCC" }
  },
  {
    id: "15468028166446",
    title: "Raspberry Pi 5 16GB Single Board Computer",
    handle: "raspberry-pi-5-16gb",
    price: 60075,
    comparePrice: 64800,
    category: "Microcontrollers & Boards",
    tags: ["Raspberry Pi", "SBC", "Linux", "AI & Robotics"],
    image: "/products/product-15468028166446.webp",
    description: "The most powerful Raspberry Pi ever made! Quad-core 64-bit Arm Cortex-A76 processor at 2.4GHz with 16GB LPDDR4X SDRAM, PCIe 2.0 interface, dual 4Kp60 HDMI, and dual MIPI camera/display transceivers.",
    inStock: true,
    rating: "5.0",
    reviewsCount: 75,
    sku: "ATB-RPI-5-16GB",
    specs: { "CPU": "Quad-core Arm Cortex-A76 @ 2.4GHz", "RAM": "16GB LPDDR4X", "PCIe": "1x PCIe 2.0 interface", "Display": "2x 4Kp60 HDMI" }
  },
  {
    id: "15468019951918",
    title: "Arduino Uno SMD R3 Development Board with Cable",
    handle: "arduino-uno-smd-r3-best-price-in-pakistan",
    price: 2498,
    comparePrice: 2970,
    category: "Microcontrollers & Boards",
    tags: ["Arduino", "ATmega328P", "DIY Electronics", "Development Board"],
    image: "/products/product-15468019951918.webp",
    description: "Original design Arduino Uno SMD R3 with ATmega328P microcontroller and CH340G USB interface. The gold standard for university student projects, automation, and DIY robotics in Pakistan.",
    inStock: true,
    rating: "4.9",
    reviewsCount: 142,
    sku: "ATB-ARD-UNO-R3",
    specs: { "Microcontroller": "ATmega328P", "Operating Voltage": "5V", "Clock Speed": "16 MHz", "Digital I/O": "14 pins (6 PWM)" }
  },
  {
    id: "15468011248942",
    title: "Raspberry Pi Pico 2 W (Dual Arm Cortex-M33 + Hazard3 RISC-V)",
    handle: "buy-raspberry-pi-pico-2w-online-best-price-in-pakistan",
    price: 3308,
    comparePrice: 3915,
    category: "Microcontrollers & Boards",
    tags: ["Raspberry Pi", "Pico 2W", "RP2350", "WiFi & Bluetooth"],
    image: "/products/product-15468011248942.webp",
    description: "Next-gen Raspberry Pi Pico 2 W powered by RP2350 microcontroller featuring on-board 2.4GHz 802.11n wireless LAN, Bluetooth 5.2, hardware security, and unique dual Arm/RISC-V core selectable architecture.",
    inStock: true,
    rating: "4.9",
    reviewsCount: 47,
    sku: "ATB-PICO-2W",
    specs: { "SoC": "RP2350 Dual Arm / RISC-V @ 150MHz", "Wireless": "WiFi 4 + Bluetooth 5.2", "SRAM": "520KB on-chip", "Flash": "4MB QSPI" }
  },
  {
    id: "15467988310318",
    title: "5-Inch HDMI Capacitive Touch Screen LCD for Raspberry Pi & PC",
    handle: "5-inch-hdmi-capacitive-touch-screen-lcd-for-raspberry-pi",
    price: 11475,
    comparePrice: 13230,
    category: "Sensors & Displays",
    tags: ["LCD", "HDMI", "Touch Screen", "Raspberry Pi"],
    image: "/products/product-15467988310318.webp",
    description: "800x480 hardware resolution IPS LCD display with 5-point capacitive touch control via USB. Compatible with Raspberry Pi 5/4/3, Jetson Nano, Windows 11/10/8/7, and mini-PCs.",
    inStock: true,
    rating: "4.8",
    reviewsCount: 39,
    sku: "ATB-LCD-5IN-HDMI",
    specs: { "Resolution": "800 x 480 IPS", "Touch": "5-Point Capacitive USB", "Video Input": "HDMI Standard", "Audio": "3.5mm Headphone Jack" }
  },
  {
    id: "15467975203118",
    title: "7-Inch HDMI Capacitive Touch LCD Screen (1024x600 IPS)",
    handle: "7-inch-hdmi-capacitive-touch-lcd-screen-for-raspberry",
    price: 18225,
    comparePrice: 20925,
    category: "Sensors & Displays",
    tags: ["LCD", "7 Inch", "HDMI", "Touch Screen"],
    image: "/products/product-15467975203118.webp",
    description: "High definition 1024x600 7-inch display panel with toughened glass capacitive touch screen. Supports Raspbian, Ubuntu, Kali, and RetroPie out-of-the-box without drivers.",
    inStock: true,
    rating: "4.9",
    reviewsCount: 28,
    sku: "ATB-LCD-7IN-HDMI",
    specs: { "Resolution": "1024 x 600 IPS Wide Angle", "Backlight": "Independent ON/OFF Switch", "Touch Interface": "Micro-USB HID" }
  },
  {
    id: "15467965103418",
    title: "DS18B20 Waterproof Stainless Steel Temperature Sensor Probe",
    handle: "ds18b20-water-proof",
    price: 513,
    comparePrice: 675,
    category: "Sensors & Displays",
    tags: ["Sensor", "Temperature", "Waterproof", "Arduino"],
    image: "/products/product-15467965103418.webp",
    description: "Encapsulated stainless steel probe with 1-meter high temperature PVC cable. Communicates over 1-Wire interface requiring only one digital pin on Arduino or ESP32.",
    inStock: true,
    rating: "4.8",
    reviewsCount: 93,
    sku: "ATB-SNS-DS18B20",
    specs: { "Range": "-55 C to +125 C", "Accuracy": "+-0.5 C from -10 C to +85 C", "Probe Size": "6 x 50 mm", "Cable Length": "100 cm" }
  },
  {
    id: "15467954122158",
    title: "40-Pin Jumper Wires Ribbon (Female to Female 20cm)",
    handle: "jumper-wires-female-to-female",
    price: 243,
    comparePrice: 338,
    category: "Tools, Cables & Wires",
    tags: ["Jumper Wires", "Ribbon Cable", "Arduino", "Breadboard"],
    image: "/products/product-15467954122158.webp",
    description: "Multicolor 40-conductor ribbon cable with standard 2.54mm pitch female to female Dupont connectors. Can be separated into individual single or multi-pin assemblies for rapid prototyping.",
    inStock: true,
    rating: "4.9",
    reviewsCount: 165,
    sku: "ATB-JMP-FF20",
    specs: { "Pitch": "2.54 mm Standard", "Length": "20 cm", "Conductors": "40 Pieces Ribbon", "Colors": "10 Assorted Colors" }
  },
  {
    id: "15467945032110",
    title: "0.36-Inch Mini Digital Voltmeter DC 0-30V (3-Wire Blue LED)",
    handle: "buy-0-36-inch-digital-voltmeter-dc-30v-3-wire-display-online-in-pakistan",
    price: 297,
    comparePrice: 432,
    category: "Sensors & Displays",
    tags: ["Voltmeter", "Display", "LED", "Power Monitor"],
    image: "/products/product-15467945032110.webp",
    description: "Ultra-compact 3-wire digital DC voltage panel meter with reverse polarity protection. 3-digit ultra bright blue LED display. Measures 0V to 30V DC with external power.",
    inStock: true,
    rating: "4.7",
    reviewsCount: 78,
    sku: "ATB-VLT-036B",
    specs: { "Measurement Range": "DC 0.00V - 30.0V", "Operating Voltage": "DC 4.0V - 30.0V", "Refresh Rate": "Approx 200ms", "Accuracy": "1%" }
  },
  {
    id: "15467931120984",
    title: "STM32F103C8T6 Blue Pill ARM Cortex-M3 Minimal Board",
    handle: "stm32f103c8t6-blue-pill-board",
    price: 1148,
    comparePrice: 1485,
    category: "Microcontrollers & Boards",
    tags: ["STM32", "ARM", "Cortex-M3", "Blue Pill"],
    image: "/products/product-15467931120984.webp",
    description: "The classic 72MHz STM32 ARM Cortex-M3 32-bit development board. Features 64KB Flash, 20KB SRAM, USB mini/type-C port, onboard crystal oscillator and SWD debug port.",
    inStock: true,
    rating: "4.8",
    reviewsCount: 56,
    sku: "ATB-STM-F103",
    specs: { "Core": "Arm 32-bit Cortex-M3 @ 72MHz", "Flash": "64 KB", "SRAM": "20 KB", "Timers": "4x 16-bit timers" }
  },
  {
    id: "15467923481230",
    title: "ESP32-WROOM-32D Dual-Core WiFi & Bluetooth Module",
    handle: "esp32-wroom-32d-development-board",
    price: 1823,
    comparePrice: 2295,
    category: "Microcontrollers & Boards",
    tags: ["ESP32", "WiFi", "Bluetooth", "IoT"],
    image: "/products/product-15467923481230.webp",
    description: "Versatile ESP32-WROOM-32D nodeMCU style development board with built-in CP2102/CH340 chip. Perfect for IoT automation, wireless data logging, smart agriculture, and robotics.",
    inStock: true,
    rating: "4.9",
    reviewsCount: 118,
    sku: "ATB-ESP-32D",
    specs: { "Processor": "Dual-core Xtensa 32-bit LX6 @ 240MHz", "Wireless": "WiFi 802.11 b/g/n + BLE 4.2", "Memory": "520KB SRAM + 4MB Flash" }
  },
  {
    id: "15467912384720",
    title: "L298N Dual H-Bridge Motor Driver Module",
    handle: "l298n-dual-h-bridge-motor-driver-module",
    price: 648,
    comparePrice: 878,
    category: "Robotics & Motors",
    tags: ["Motor Driver", "L298N", "H-Bridge", "Robotics"],
    image: "/products/product-15467912384720.webp",
    description: "High-power L298N dual H-bridge motor driver capable of driving two DC motors simultaneously or one 4-phase bipolar stepper motor with speed and direction control.",
    inStock: true,
    rating: "4.8",
    reviewsCount: 96,
    sku: "ATB-MOT-L298N",
    specs: { "Drive Voltage": "5V - 35V", "Peak Current": "2A per Bridge", "Logic Voltage": "5V Onboard Regulator", "Max Power": "25W" }
  },
  {
    id: "15467901847190",
    title: "18650 Battery 4-Cell Spot Welder Handheld Pen with Trigger",
    handle: "18650-battery-spot-welder-handheld-pen",
    price: 6615,
    comparePrice: 7830,
    category: "Power & Converters",
    tags: ["Spot Welder", "Battery Tool", "18650", "Welding Pen"],
    image: "/products/product-15467901847190.webp",
    description: "Integrated automatic trigger spot welding pen with Japanese concentric needle tips and dual pressure springs. Designed for prolonged comfortable battery pack fabrication.",
    inStock: true,
    rating: "5.0",
    reviewsCount: 22,
    sku: "ATB-SPT-PEN01",
    specs: { "Cable Size": "16 sq mm Pure Copper", "Pin Spacing": "4mm Adjustable", "Trigger": "Built-in microswitch", "Current": "Supports up to 800A pulse" }
  }
];

export const BRAND_INFO = {
  name: "All Tech Byte",
  domain: "alltechbyte.pk",
  phone: "03298840694",
  whatsappNumber: "923298840694",
  whatsappFormatted: "+92 329 8840694",
  email: "support@alltechbyte.pk",
  tagline: "Smart Tech, Honest Prices",
  subtagline: "Pakistan's Premier Store for Robotics, Arduino, Raspberry Pi, Sensors & Electronic Components",
  address1: {
    title: "Lahore Retail Branch (Bund Road)",
    line: "Shop #8, Muhammadia Colony, Near Muhammadia Masjid, Bund Road, Lahore, Punjab",
    city: "Lahore"
  },
  address2: {
    title: "Gulberg Corporate & Tech Office",
    line: "2nd Floor Office, Al Latif Center, 40 Main Boulevard Gulberg, Block D1, Gulberg III, Lahore",
    city: "Lahore"
  },
  hours: "Monday - Saturday: 10:00 AM - 8:30 PM (Sunday Closed)",
  deliveryPromise: "Same-Day Dispatch in Lahore | 1-2 Days Express Delivery Nationwide across Pakistan"
};

export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(message.trim())}`;
}

export function createProductOrderUrl(product: Product, quantity = 1, customerNote = ''): string {
  const noteText = customerNote ? `\n*Note:* ${customerNote}` : '';
  const message = `Hello All Tech Byte! 👋
I would like to order:
📦 *Product:* ${product.title}
💰 *Price:* Rs ${product.price.toLocaleString()} PKR
🔢 *Quantity:* ${quantity}
💵 *Subtotal:* Rs ${(product.price * quantity).toLocaleString()} PKR${noteText}

Please confirm stock availability, delivery charges, and dispatch to my city. Thank you!`;
  return createWhatsAppUrl(message);
}

export function createGeneralInquiryUrl(topic = 'General Inquiry'): string {
  const message = `Hello All Tech Byte! 👋
I have an inquiry regarding *${topic}*. Could you please provide me with assistance?`;
  return createWhatsAppUrl(message);
}
