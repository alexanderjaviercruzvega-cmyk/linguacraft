#!/usr/bin/env python3
with open('data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Empezar desde la línea 246 (id: "en-supervivencia")
for i in range(245, min(245+45, len(lines))):
    print(f"Línea {i+1}: {lines[i].rstrip()[:150]}")