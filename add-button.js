// Script para añadir botón de activación del minijuego
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Buscar el inicio del Mini-Quiz y insertar el botón antes de él
const miniQuizPattern = '<!-- Mini-Quiz -->';
const replacement = '<!-- Mini-Quiz -->\n    <button id="activar-minijuego" class="btn btn-primary" style="margin: 10px auto; display: block;" onclick="initSentenceBuilder()">Abrir Minijuego Ordenar Oraciones</button>';

if (!html.includes('activar-minijuego')) {
  // Buscar el patrón en el HTML actual
  const idx = html.indexOf(miniQuizPattern);
  if (idx !== -1) {
    html = html.substring(0, idx) + replacement + html.substring(idx);
    fs.writeFileSync('index.html', html);
    console.log('Botón de activación añadido antes del Mini-Quiz');
  } else {
    console.log('Patrón no encontrado, intentándolo de otra manera...');
    // Alternativa: insertar al final de la sección #practica
    const practiceEnd = html.lastIndexOf('</section>');
    if (practiceEnd !== -1) {
      html = html.substring(0, practiceEnd) + replacement + html.substring(practiceEnd);
      fs.writeFileSync('index.html', html);
      console.log('Botón añadido al final de la sección #practica');
    }
  }
} else {
  console.log('El botón ya existe en el HTML');
}

// Verificar el resultado
const h2 = fs.readFileSync('index.html', 'utf8');
if (h2.includes('activar-minijuego')) {
  console.log('Éxito: El botón ha sido añadido');
} else {
  console.log('No se pudo añadir el botón');
}