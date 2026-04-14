const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const code = fs.readFileSync(path.join(__dirname, 'app', 'page.jsx'), 'utf8');
try {
  parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
  console.log('PARSE_OK');
} catch (err) {
  console.error(err.message);
  console.error('LOC:', err.loc);
  process.exit(1);
}
