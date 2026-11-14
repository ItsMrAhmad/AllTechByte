import productsData from "./products.json";
export interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  comparePrice: number | null;
  category: string;
  tags: string[];
  image: string;
  gallery?: string[];
  description: string;
  inStock: boolean;
  rating: string;
  reviewsCount: number;
  sku?: string;
  specs?: Record<string, string>;
  isDraft?: boolean;
  isFlashSale?: boolean;
  isFeatured?: boolean;
}

export const CATEGORIES = [
  { id: 'all', name: 'All Products', count: 174, icon: 'Cpu' },
  { id: 'boards', name: 'Microcontrollers & Boards', count: 30, icon: 'CircuitBoard', query: ['board', 'arduino', 'raspberry', 'stm', 'breakout', 'controller'] },
  { id: 'components', name: 'Electronic Components & ICs', count: 12, icon: 'Cpu', query: ['ic', 'sop', 'dip', 'transistor', 'diode', 'mosfet', 'oscillator'] },
  { id: 'sensors', name: 'Sensors & Displays', count: 34, icon: 'Activity', query: ['sensor', 'voltmeter', 'lcd', 'display', 'temperature', 'touch screen'] },
  { id: 'robotics', name: 'Robotics & Motors', count: 12, icon: 'Bot', query: ['motor', 'speed controller', 'pwm', 'stepper', 'robotics'] },
  { id: 'power', name: 'Power & Converters', count: 94, icon: 'Zap', query: ['boost converter', 'power supply', 'spot welder', 'charger', 'battery'] },
  { id: 'tools', name: 'Tools, Cables & Wires', count: 4, icon: 'Wrench', query: ['cable', 'wire', 'jumper', 'tape', 'strip', 'adapter', 'tool'] }
];

export type CategoryConfig = (typeof CATEGORIES)[number];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.id === slug);
}

export function getLiveProducts(): Product[] {
  return PRODUCTS.filter((p) => !p.isDraft);
}

const CATEGORY_KEYWORDS: Record<string, RegExp> = {
  boards:
    /\b(arduino|raspberry|pico|stm32|esp32|esp8266|wemos|digispark|mega2560|atmega|attiny|breakout|development board|minimal board|pro mini|pro micro|nano v3|leonardo|lora|sx1278|ra-02)\b/i,
  components:
    /\b(ic|ics|sop|dip|chip|transistor|diode|mosfet|oscillator|regulator|eeprom|flash memory|ch340|ch340g|ft232|ne555|ams1117|mp1584|programmer|timer switch)\b/i,
  sensors:
    /\b(sensor|voltmeter|ammeter|lcd|oled|tft|display|touch screen|temperature|humidity|thermostat|thermometer|hygro|co2|ndir|incubator controller|delay module|timer)\b/i,
  robotics:
    /\b(motor|speed controller|pwm|stepper|servo|gearbox|fan|humidifier|mist maker|cooling block|h-bridge|propeller)\b/i,
  power:
    /\b(boost|buck|step up|step-up|step down|step-down|power supply|spot weld|spot welding|charger|charging|battery|batteries|cell|18650|21700|lipo|li-po|li-ion|bms|adaptor|adapter|power bank|cr2032)\b/i,
  tools:
    /\b(cable|wire|wires|jumper|ribbon|tape|nickel strip|adapter for|programmer|holder|case)\b/i,
};

export function matchesCategory(product: Product, slug: string): boolean {
  if (!slug || slug === 'all') return true;
  const cat = getCategoryBySlug(slug);
  if (!cat) return false;
  if (product.category.toLowerCase() === cat.name.toLowerCase()) return true;

  const pattern = CATEGORY_KEYWORDS[slug];
  const searchable = `${product.title} ${(product.tags || []).join(' ')}`;
  if (pattern) {
    return pattern.test(searchable);
  }

  return (
    'query' in cat &&
    Array.isArray(cat.query) &&
    cat.query.some((q) => searchable.toLowerCase().includes(q.toLowerCase()))
  );
}

export function getProductsByCategory(slug: string): Product[] {
  const live = getLiveProducts();
  if (!slug || slug === 'all') return live;
  if (!getCategoryBySlug(slug)) return [];

  return live.filter((p) => matchesCategory(p, slug));
}

export function getCategorySlugForProduct(product: Product): string {
  const exact = CATEGORIES.find(
    (c) => c.id !== 'all' && c.name.toLowerCase() === product.category.toLowerCase()
  );
  if (exact) return exact.id;

  const text = `${product.title} ${product.description} ${product.category} ${product.tags.join(' ')}`.toLowerCase();
  const matched = CATEGORIES.find(
    (c) =>
      c.id !== 'all' &&
      'query' in c &&
      Array.isArray(c.query) &&
      c.query.some((q) => text.includes(q.toLowerCase()))
  );
  return matched ? matched.id : 'boards';
}

export interface CategoryDetail {
  description: string;
  image: string;
  seoDescription: string;
  keywords: string[];
}

export const CATEGORY_DETAILS: Record<string, CategoryDetail> = {
  boards: {
    description:
      'Shop Arduino UNO, Nano & Mega, Raspberry Pi single-board computers, ESP32/ESP8266 Wi-Fi modules, STM controllers, and development breakout boards ready for dispatch from Lahore.',
    image: '/categories/category-boards.webp',
    seoDescription:
      'Buy Arduino, Raspberry Pi 5, Pico 2W, ESP32 & development boards in Pakistan at All Tech Byte. Cash on delivery & Lahore pickup.',
    keywords: ['Arduino Pakistan', 'Raspberry Pi Pakistan', 'ESP32 Lahore', 'Microcontrollers', 'Development Boards'],
  },
  components: {
    description:
      'Browse essential semiconductor ICs, MOSFETs, transistors, diodes, voltage regulators, oscillators, and discrete maker hardware stocked for rapid prototyping and repair.',
    image: '/categories/category-components.webp',
    seoDescription:
      'Buy integrated circuits, MOSFETs, transistors, diodes & electronic components in Pakistan at All Tech Byte Lahore.',
    keywords: ['Electronic Components Pakistan', 'ICs Lahore', 'MOSFETs', 'Transistors', 'Voltage Regulators'],
  },
  sensors: {
    description:
      'Explore temperature, NDIR gas, distance, current, and industrial sensors alongside LCD, OLED, voltmeter, and touch display modules.',
    image: '/categories/category-sensors.webp',
    seoDescription:
      'Buy NDIR sensors, temperature probes, OLED & LCD displays, and panel voltmeters in Pakistan at All Tech Byte.',
    keywords: ['Sensors Pakistan', 'LCD Display Lahore', 'Voltmeter Module', 'Temperature Sensor'],
  },
  robotics: {
    description:
      'Find N20 micro metal gear motors, high-torque DC geared motors, stepper drives, PWM speed controllers, and actuation parts for robotics builds.',
    image: '/categories/category-robotics.webp',
    seoDescription:
      'Buy N20 gear motors, stepper motors, PWM speed controllers & robotics parts in Pakistan at All Tech Byte.',
    keywords: ['Robotics Pakistan', 'N20 Gear Motor', 'PWM Speed Controller', 'Stepper Motors Lahore'],
  },
  power: {
    description:
      'Power your projects with DC-DC boost and buck converters, 18650 & 21700 Li-ion cells, LiPo packs, battery holders, chargers, BMS boards, and spot welders.',
    image: '/categories/category-power.webp',
    seoDescription:
      'Buy 18650 & 21700 batteries, DC-DC boost converters, BMS chargers & spot welders in Pakistan at All Tech Byte.',
    keywords: ['18650 Spot Welder Pakistan', 'Boost Converter', '21700 Battery Lahore', 'Battery Holders'],
  },
  tools: {
    description:
      'Stock up on jumper wires, multimeter leads, silicone cables, adapter cables, high-temp insulation tapes, and electronics workbench accessories.',
    image: '/categories/category-tools.webp',
    seoDescription:
      'Buy jumper wires, cables, adapters & electronics workbench tools in Pakistan at All Tech Byte Lahore.',
    keywords: ['Jumper Wires Pakistan', 'Electronics Tools Lahore', 'Test Leads', 'Workbench Cables'],
  },
};

export const PRODUCTS: Product[] = (productsData as unknown) as Product[];

export const BRAND_INFO = {
  name: "All Tech Byte",
  domain: "alltechbyte.pk",
  phone: "03298840694",
  whatsappNumber: "923298840694",
  whatsappFormatted: "+92 329 8840694",
  email: "support@alltechbyte.pk",
  tagline: "Powering Every Project",
  subtagline: "Pakistan's Premier Store for Robotics, Arduino, Raspberry Pi, Sensors & Electronic Components",
  address1: {
    title: "Lahore Retail Branch (Bund Road)",
    line: "Shop #8, Muhammadia Colony, Near Muhammadia Masjid, Bund Road, Lahore, Punjab",
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
