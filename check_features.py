#!/usr/bin/env python3
with open('features.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Buscar la sección de inicialización
idx = content.find('// Inicializar automáticamente')
if idx >= 0:
    print("Encontrada sección de inicialización automática")
    print(content[idx:idx+300])
else:
    print("NO encontrada sección de inicialización automática")

# Buscar startGame en el contexto
idx2 = content.find('setTimeout(startGame')
if idx2 >= 0:
    print("\nEncontrado setTimeout(startGame)")
    print(content[idx2:idx2+200])
else:
    print("\nNO encontrado setTimeout(startGame)")