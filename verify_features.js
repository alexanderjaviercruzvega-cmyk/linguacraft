const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const checks = {
  'Voice rate control': html.includes('voice-rate-control'),
  'Lesson notes': html.includes('lesson-notes'),
  'Sentence builder': html.includes('sentence-builder'),
  'Achievements': html.includes('lingua-achievements') || html.includes('logros'),
  'Placement test': html.includes('placement-test') || html.includes('No sabes por dónde')
};

let total = 0;
console.log('=== Verificación de Features ===');
for (const [key, value] of Object.entries(checks)) {
  console.log('  ' + key + ':', value ? '✅' : '❌');
  if (value) total++;
}
console.log('\\nTotal features found: ' + total + '/5');
console.log('\\nArchivo features.jssize:', (fs.readFileSync('features.js', 'utf8').length) + ' bytes');