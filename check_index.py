#!/usr/bin/env python3
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

print('=== INDEX.HTM L VERIFICATION ===')

checks = [
    ('sentenceBuilderPanel', 'sentenceBuilderPanel' in content),
    ('features.js', 'features.js' in content),
    ('activar-minijuego', 'activar-minijuego' in content),
    ('DOMContentLoaded', 'DOMContentLoaded' in content),
    ('startGame', 'startGame' in content),
    ('insertPanel', 'insertPanel()' in content),
]

for name, result in checks:
    status = 'OK' if result else 'FALTA'
    print(status + ': ' + name)

print()
print('Elementos count:')
print('  onclick=initSentenceBuilder:', content.count('initSentenceBuilder'))
print('  DOMContentLoaded:', content.count('DOMContentLoaded'))