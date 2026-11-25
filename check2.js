const fs = require('fs');
const code = fs.readFileSync('./data.js','utf8');
const lines = code.split('\n');
lines.forEach((l,i)=>{
  // Find unclosed quotes in romaji fields
  const m = l.match(/romaji:\s*"([^"]*$)/);
  const m2 = l.match(/romaji:\s*'([^']*$)/);
  if(m || m2) console.log('LINE '+(i+1)+':', l.trim().substring(0,120));
});
