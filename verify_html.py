#!/usr/bin/env python3
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

body_start = content.find('<body>')
body_end = content.find('</body>')
if body_start >= 0 and body_end >= 0:
    body = content[body_start:body_end]
    print('Body length:', len(body))
    print('  <header:', body.count('<header'))
    print('  <section:', body.count('<section'))
    print('  <div:', body.count('<div'))
    print('  <footer:', body.count('<footer'))
    print('  <button:', body.count('<button'))
else:
    print('No se encontró body completo')

print()
print('Scripts referenciados:')
print('  data.js:', content.count('data.js'))
print('  features.js:', content.count('features.js'))
print('  app.js:', content.count('app.js'))
print('  lucide:', content.count('lucide'))
print('  styles.css:', content.count('styles.css'))