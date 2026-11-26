#!/usr/bin/env python3
import re

with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

print("=== VERIFICACIÓN FINAL ===")

# 1. modules4 restantes
modules4_count = content.count('modules4:')
print("1. modules4 restantes en data.js: " + str(modules4_count))

# 2. Syllabus tiene módulo 4
syllabus_m4 = 'Módulo 4' in content
print("2. Syllabus tiene módulo 4: " + str(syllabus_m4))

# 3. Módulo 4 al final de arrays modules
pattern = '"Módulo 4 · Uso real y cultura anglófona",\s*\]'
matches = re.findall(pattern, content)
print("3. Módulo 4 al final de arrays modules: " + str(len(matches)) + " ocurrencias")

# 4. Ejemplo de contexto
idx = content.find('title: "Módulo 4')
if idx >= 0:
    print("4. Contexto del módulo 4:")
    print("   " + content[max(0,idx-20):idx+120])
else:
    print("4. Contexto del módulo 4: No encontrado")

# 5. Verificar app.js fallback
with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()
print("5. app.js hasModules4: " + str('hasModules4' in app))

# 6. Verificar features.js
with open('features.js', 'r', encoding='utf-8') as f:
    ft = f.read()
auto_ok = 'DOMContentLoaded' in ft and 'insertPanel()' in ft and 'startGame' in ft
print("6. features.js auto-activación: " + str(auto_ok))
btn_ok = 'onclick="initSentenceBuilder()"' in ft
print("7. features.js botón onclick: " + str(btn_ok))
display_ok = 'display: block' in ft
print("8. features.js panel display: " + str(display_ok))

print("\n=== RESUMEN ===")
print("")
if modules4_count > 0:
    print("modules4 AÚN PRESENTE en data.js (" + str(modules4_count) + " bloques)")
    print(" - La lógica de fallback en app.js leerá module 4 de course.modules4")
    print(" - Los estudiantes verán el módulo 4 en las lecciones")
else:
    print("modules4 REMOVIDO completamente de data.js")
    print(" - El módulo 4 está directamente en course.modules")
print("")
if auto_ok:
    print("Minijuego se activará automáticamente al cargar la página")
else:
    print("El minijuego requiere acción del usuario")
if btn_ok:
    print("Botón 'Abrir Minijuego Ordenar Oraciones' presente en HTML")
else:
    print("No hay botón onclick en features.js")
if display_ok:
    print("Panel del minijuego se mostrará con display:block")
else:
    print("El panel podría tener display:none (oculto)")