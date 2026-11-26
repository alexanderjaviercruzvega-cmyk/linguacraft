#!/usr/bin/env python3
with open('data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Buscar línea con id: "en-supervivencia"
for i, line in enumerate(lines, 1):
    if 'en-supervivencia' in line:
        print(f"Línea {i}: {line.rstrip()}")
        # Mostrar las siguientes 20 líneas
        for j in range(i, min(i+25, len(lines))):
            print(f"  Línea {j}: {lines[j-1].rstrip()[:100]}")
        break