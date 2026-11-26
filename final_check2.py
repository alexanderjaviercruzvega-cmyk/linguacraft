#!/usr/bin/env python3
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

print('=== INDEX.HTM L FINAL ===')

checks = [
    ('sentenceBuilderPanel', 'sentenceBuilderPanel' in content),
    ('features.js', 'features.js' in content),
    ('app.js', 'app.js' in content),
    ('DOMContentLoaded', 'DOMContentLoaded' in content),
    ('insertPanel', 'insertPanel()' in content),
    ('startGame', 'startGame' in content),
    ('activar-minijuego', 'activar-minijuego' in content),
    ('data.js', 'data.js' in content),
]

for name, result in checks:
    status = 'OK' if result else 'FALTA'
    print(status + ': ' + name)

print()
print('Scripts count:')
print('  data.js:', content.count('src="data.js"'))
print('  features.js:', content.count('src="features.js"'))
print('  app.js:', content.count('src="app.js"'))
print('  lucide:', 'lucide' in content)