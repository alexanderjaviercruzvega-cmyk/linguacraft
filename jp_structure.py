#!/usr/bin/env python3
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('id: "jp-viajeros"')
if idx >= 0:
    print("Japonés encontrado en data.js")
    snippet = content[idx:idx+800]
    mod_idx = snippet.find('modules:')
    if mod_idx >= 0:
        print("modules: encontrado")
        # Imprimir los módulos existentes
        end = min(mod_idx + 600, len(snippet))
        print(snippet[mod_idx:end])
else:
    print("Japonés NO encontrado")