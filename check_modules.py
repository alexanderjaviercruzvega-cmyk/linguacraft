#!/usr/bin/env python3
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Verificar la estructura de módulos del curso inglés
idx = content.find('id: "en-supervicencia"')
# Actually let's find en-supervivencia
idx = content.find('id: "en-supervivencia"')
if idx >= 0:
    snippet = content[idx:idx+600]
    # Buscar modules:
    mid = snippet.find('modules: [')
    if mid >= 0:
        # Encontrar el cierre del array modules
        # Buscar pattern de cierre: } followed by , or ]
        print("Módulos del inglés encontrados")
        # Mostrar desde modules: hasta el vocab
        rest = snippet[mid:mid+400]
        print(rest[:300])
    else:
        print("No se encontró modules: para inglés")
else:
    print("No se encontró curso inglés")

# Verificar sylabus
idx2 = content.find('Módulo 4 · Uso real y cultura anglófona')
if idx2 >= 0:
    print("\nMódulo 4 inglés: PRESENTE")
else:
    print("\nMódulo 4 inglés: AUSENTE")