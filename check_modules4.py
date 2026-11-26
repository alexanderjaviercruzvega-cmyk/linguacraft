#!/usr/bin/env python3
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

importances = [
    ("Inglés", "Módulo 4 · Uso real y cultura anglófona"),
    ("Japonés", "Módulo 4 · Uso real y cultura"),
    ("Coreano", "Módulo 4 · Uso real y cultura"),
    ("Francés", "Módulo 4 · Uso real y cultura"),
    ("Náhuatl", "Módulo 4 · Uso real y cultura"),
]

for name, marker in importances:
    idx = content.find(marker)
    status = "PRESENTE" if idx >= 0 else "AUSENTE"
    print(f"{name}: {status}")