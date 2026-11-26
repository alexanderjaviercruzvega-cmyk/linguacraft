#!/usr/bin/env python3
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

print("=== VERIFICACION DE DATA.JS ===")

# Check for modules4
if 'modules4:' in content:
    print("AUN PRESENTE: modules4 existe en data.js")
    count = content.count('modules4:')
    print("   Aparece " + str(count) + " veces")
else:
    print("modules4 REMOVIDO de data.js")

# Check for modulo 4 en el contenido
if 'Módulo 4' in content:
    print("Módulo 4 encontrado en data.js")
else:
    print("Módulo 4 NO encontrado en data.js")

# Check syllabus structure
if 'syllabus: [' in content:
    import re
    syllabus_match = re.search(r'syllabus: \[(.*?)\]', content)
    if syllabus_match:
        syllabus_content = syllabus_match.group(1)
        has_4 = 'Módulo 4' in syllabus_content
        print("   Syllabus tiene módulo 4: " + str(has_4))
        print("   Syllabus: " + syllabus_content[:100] + "...")

# Check if module 4 is in the modules array (not modules4)
idx_modules = content.find('modules: [')
if idx_modules >= 0:
    after = content[idx_modules:idx_modules+500]
    has_m4_in_modules = 'Módulo 4' in after
    print("   Módulo 4 en array modules principal: " + str(has_m4_in_modules))

print("\n=== VERIFICACIÓN DE APP.JS ===")
with open('app.js', 'r', encoding='utf-8') as f:
    app_content = f.read()

if 'hasModules4' in app_content:
    print("✅ app.js: Lógica hasModules4 presente")
else:
    print("❌ app.js: Lógica hasModules4 AUSENTE")

if 'course.modules4' in app_content:
    print("✅ app.js: Referencia course.modules4 presente")
else:
    print("⚠️ app.js: Referencia course.modules4 AUSENTE")

print("\n=== VERIFICACIÓN DE FEATURES.JS ===")
with open('features.js', 'r', encoding='utf-8') as f:
    ft = f.read()

if 'DOMContentLoaded' in ft and 'insertPanel()' in ft and 'startGame' in ft:
    print("✅ features.js: Auto-activación configurada")
else:
    print("❌ features.js: Auto-activación NO configurada")

if 'onclick="initSentenceBuilder()"' in ft:
    print("✅ features.js: Función initSentenceBuilder presente")
else:
    print("⚠️ features.js: Función initSentenceBuilder NO presente")

if 'display: none' in ft:
    print("⚠️ features.js: Aún tiene display: none en el panel")
else:
    print("✅ features.js: display: none removido del panel")

print("\n=== RESUMEN ===")
print("Si modules4 AÚN PRESENTE en data.js, eso explica por qué las lecciones no muestran el módulo 4")
print("Si el botón AÚN ESTÁ EN HTML, eso explica por qué el minijuego no carga automáticamente")