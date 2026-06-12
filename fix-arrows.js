const fs = require('fs');
const dir = 'C:/Users/jahei/OneDrive/Documents/Claude/NovaBuild';
const files = ['index.html','cart.html','checkout.html','admin.html','product.html','novabuild.js'];

// Build mojibake strings from exact code points (safe from any editor encoding)
const rightArrow = String.fromCodePoint(0x00E2, 0x2020, 0x2019);  // â†' = →
const leftArrow  = String.fromCodePoint(0x00E2, 0x2020, 0x2018);  // â†' = ←
const checkMark  = String.fromCodePoint(0x00E2, 0x009C, 0x0093);  // âœ" = ✓

files.forEach(f => {
  const path = dir + '/' + f;
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  const orig = content;
  const rCount = content.split(rightArrow).length - 1;
  const lCount = content.split(leftArrow).length - 1;
  content = content.split(rightArrow).join('→');
  content = content.split(leftArrow).join('←');
  content = content.split(checkMark).join('✓');
  if (content !== orig) {
    fs.writeFileSync(path, content, 'utf8');
    console.log('Fixed ' + (rCount + lCount) + ' arrows in: ' + f);
  } else {
    console.log('Clean: ' + f);
  }
});
console.log('Done.');
