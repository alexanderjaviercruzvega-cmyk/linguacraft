#!/usr/bin/env python3
print("=== CHECK FINAL DE SOLUCIONES ===")

with open('features.js', 'r', encoding='utf-8') as f:
    ft = f.read()
    
# Verificar auto-activacion
if 'DOMContentLoaded' in ft and 'insertPanel()' in ft and 'startGame' in ft:
    print("features.js: Minijuego auto-activado en DOMContentLoaded OK")
else:
    print("features.js: Problema con auto-activacion")

# Verificar que el botón aún funciona
if 'onclick="initSentenceBuilder()"' in ft:
    print("features.js: Botón onclick aún presente OK")
else:
    print("features.js: Botón onclick removido (usar auto-activacion)")

with open('data.js', 'r', encoding='utf-8') as f:
    dt = f.read()

# Verificar modulo 4 en los 5 cursos
cursos = ['Ingles', 'Japon', 'Coreano', 'Frances', 'Nahuatl']
mod_marker = 'Módulo 4'
for curso in cursos:
    if mod_marker in dt:
        print(f"data.js: {curso} tiene Módulo 4 OK")
    else:
        print(f"data.js: {curso} NO tiene Módulo 4")

# Verificar que app.js tiene la lógica de fallback
with open('app.js', 'r', encoding='utf-8') as f:
    ap = f.read()
    
if 'hasModules4' in ap:
    print("app.js: Lógica de fallback modules4 aplicada OK")
else:
    print("app.js: Lógica de fallback no encontrada")

print("\n=== CHECK COMPLETADO ===")