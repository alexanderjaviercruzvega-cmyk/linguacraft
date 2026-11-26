const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
console.log('panel:', h.includes('sentenceBuilderPanel'));
console.log('button:', h.includes('activar-minijuego'));
console.log('features:', h.includes('features.js'));
console.log('initSentenceBuilder:', h.includes('function initSentenceBuilder'));
console.log('startGame:', h.includes('function startGame'));
console.log('sentenceGames:', h.includes('sentenceGames'));