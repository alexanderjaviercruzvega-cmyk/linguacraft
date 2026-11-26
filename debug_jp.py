#!/usr/bin/env python3
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Buscar la sección de japonés
idx = content.find('id: "jp-viajeros"')
if idx >= 0:
    print("Japonés encontrado en data.js")
    # Mostrar desde el id hasta el módulos array
    snippet = content[idx:idx+800]
    # Buscar el modules:
    mod_idx = snippet.find('modules:')
    if mod_idx >= 0:
        print("modules: encontrado")
        print(snippet[mod_idx:mod_idx+500])
    else:
        print("modules: NO encontrado")
else:
    print("Japonés NO encontrado")