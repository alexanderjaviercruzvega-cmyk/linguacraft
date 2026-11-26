const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Reemplazar la cadena de scripts
const oldPattern = '<script src="data.js"></script>\n  <script src="app.js"></script>';
const newPattern = '<script src="data.js"></script>\n  <script src="features.js"></script>\n  <script src="app.js"></script>';

if (html.includes(oldPattern)) {
  html = html.replace(oldPattern, newPattern);
  fs.writeFileSync('index.html', html);
  console.log('Script features.js agregado a index.html');
} else {
  console.log('Patrón no encontrado, buscando alternativa...');
  // Buscar cualquier script src de data.js
  const dataIdx = html.indexOf('<script src="data.js">');
  if (dataIdx !== -1) {
    // Insertar después de data.js
    const endTag = '</script>';
    const insertPos = html.indexOf(endTag, dataIdx) + endTag.length;
    const toInsert = '\n  <script src="features.js"></script>';
    html = html.insert(insertPos, toInsert);
    fs.writeFileSync('index.html', html);
    console.log('Script features.js insertado después de data.js');
  } else {
    console.log('No se pudo insertar el script');
  }
}