const fs = require('fs');

const currentContent = fs.readFileSync('data/products.ts', 'utf8');
const drafts = JSON.parse(fs.readFileSync('scripts/new_products_drafts.json', 'utf8'));

// 1. Add isDraft?: boolean to Product interface if not present
let updatedContent = currentContent;
if (!updatedContent.includes('isDraft?: boolean')) {
  updatedContent = updatedContent.replace(
    'specs?: Record<string, string>;',
    'specs?: Record<string, string>;\n  isDraft?: boolean;'
  );
}

// 2. Find the end of PRODUCTS array: last '];'
const lastBracketIndex = updatedContent.lastIndexOf('];');
if (lastBracketIndex === -1) {
  console.error('Could not find closing bracket of PRODUCTS array');
  process.exit(1);
}

// Format drafts as TypeScript objects
const formattedDrafts = drafts.map(d => {
  return `  {\n` +
    `    id: ${JSON.stringify(d.id)},\n` +
    `    title: ${JSON.stringify(d.title)},\n` +
    `    handle: ${JSON.stringify(d.handle)},\n` +
    `    price: ${d.price},\n` +
    `    comparePrice: ${d.comparePrice === null ? 'null' : d.comparePrice},\n` +
    `    category: ${JSON.stringify(d.category)},\n` +
    `    tags: ${JSON.stringify(d.tags)},\n` +
    `    image: ${JSON.stringify(d.image)},\n` +
    `    description: ${JSON.stringify(d.description)},\n` +
    `    inStock: ${d.inStock},\n` +
    `    isDraft: ${d.isDraft},\n` +
    `    rating: ${JSON.stringify(d.rating)},\n` +
    `    reviewsCount: ${d.reviewsCount},\n` +
    `    sku: ${JSON.stringify(d.sku)},\n` +
    `    specs: ${JSON.stringify(d.specs)}\n` +
    `  }`;
}).join(',\n');

// Insert formatted drafts right before the last closing '];'
const before = updatedContent.slice(0, lastBracketIndex).trimEnd();
// check if there's a comma before
const comma = before.endsWith(',') ? '\n' : ',\n';
const after = '\n' + updatedContent.slice(lastBracketIndex);

const finalFileContent = before + comma + formattedDrafts + after;
fs.writeFileSync('data/products.ts', finalFileContent, 'utf8');
console.log(`Successfully appended ${drafts.length} draft products to data/products.ts!`);
