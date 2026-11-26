#!/usr/bin/env python3
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Buscar la sección modificada
idx = content.find('Intentar obtener el módulo')
if idx >= 0:
    print("Cambio en app.js encontrado")
    # Mostrar 250 caracteres después del hallazgo
    print(content[idx:idx+250])
else:
    print("No se encontró el cambio en app.js")
    
# También buscar el isLast modificado
idx2 = content.find('modules4Count')
if idx2 >= 0:
    print("\nmodules4Count encontrado")
    print(content[idx2:idx2+200])
else:
    print("\nmodules4Count NO encontrado")