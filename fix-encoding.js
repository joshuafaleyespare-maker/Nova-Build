const fs = require('fs');
const dir = 'C:/Users/jahei/OneDrive/Documents/Claude/NovaBuild';
const files = ['index.html','cart.html','checkout.html','admin.html','product.html','novabuild.js'];

// Mojibake: UTF-8 bytes of a character, read as Windows-1252, then stored as UTF-8
// em dash  (U+2014) bytes E2 80 94 → read as cp1252 → â € " → U+00E2 U+20AC U+201D
// en dash  (U+2013) bytes E2 80 93 → read as cp1252 → â € " → U+00E2 U+20AC U+201C
// bullet   (U+25CF) bytes E2 97 8F → read as cp1252 → â — \x8F → U+00E2 U+2014 U+008F
// box-draw (U+2500) bytes E2 94 80 → read as cp1252 → â " € → U+00E2 U+201D U+20AC

const fixes = [
  ['â€”', '—'],  // em dash  —
  ['â€“', '–'],  // en dash  –
  ['â€', '’'],  // right single quote '
  ['â€', '‘'],  // left single quote '
  ['â€', '”'],  // right double quote "
  ['â€', '“'],  // left double quote "
  ['â€¦', '…'],  // ellipsis …
  ['â€‚', '–'],  // another en dash variant
];

files.forEach(f => {
  const path = dir + '/' + f;
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  const orig = content;

  fixes.forEach(([bad, good]) => {
    if (content.includes(bad)) {
      content = content.split(bad).join(good);
      console.log('  Replaced in ' + f + ': ' + JSON.stringify(bad) + ' -> ' + good);
    }
  });

  if (content !== orig) {
    fs.writeFileSync(path, content, 'utf8');
    console.log('Fixed: ' + f);
  } else {
    console.log('Clean: ' + f);
  }
});
console.log('Done.');
