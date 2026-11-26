#!/usr/bin/env python3
# Script para corregir data.js - agregar módulo 4 a cada curso

with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: cierre del módulos array con 5 espacios y vocab alineado
pattern = '     ],\n     vocab: ['

replacement = '''     ],
     // Módulo 4 adicional para completar el syllabus de 4 módulos
     modules4: [
       { 
         title: "Módulo 4 · Uso real y cultura anglófona", 
         summary: "Small talk, normas sociales y expresiones cotidianas para comunicarse naturalmente. Reglas de orden de palabras comparadas con el español.", 
         points: [
           "El pequeño talk es esencial en países anglosajones: hablar del clima, el fin de semana o el trabajo es una norma social.",
           "El uso de «please» y « thank you » en situaciones cotidianas.",
           "Diferencias entre inglés británico y americano en vocabulario común.",
           "Expresiones idiomáticas: «break a leg», «cost an arm and a leg», «when pigs fly».",
           "Normas de cortesía en pubs y restaurantes británicos.",
           "Vocabulario de uso frecuente: «cheers», «sorry», «excuse me», «my pleasure»."
         ] 
       }
     ],
     vocab: ['''

if pattern in content:
    content = content.replace(pattern, replacement)
    print("Reemplazo exitoso en data.js")
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(content)
else:
    print("Patrón no encontrado - contenido actual alrededor de la línea 285:")
    # Mostrar contenido alrededor
    idx = content.find('     ],')
    if idx >= 0:
        print(repr(content[idx-10:idx+50]))