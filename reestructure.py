#!/usr/bin/env python3
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Encontrar todos los bloques modules4
modules4_pattern = r'modules4: \[\s*\{\s*title: "Módulo 4 [^"]*",[^}]*\}\s*\]'
matches = list(re.finditer(modules4_pattern, content))

print("Numero de bloques modules4 encontrados: " + str(len(matches)))

# Para cada match, procesar
offset = 0
for i, match in enumerate(matches):
    print("\n--- Procesando bloque modules4 " + str(i+1) + " ---")
    match_text = match.group()
    match_pos = match.start() - offset
    
    # Buscar "modules:" hacia backward desde la posicion actual
    before_modules4 = content[:match_pos]
    
    # Encontrar el ultimo "modules:" antes de este bloque
    last_modules = before_modules4.rfind('modules: ')
    print("   Ultimo 'modules:' principal esta en posicion: " + str(last_modules))
    
    if last_modules >= 0:
        # El array modules principal va desde last_modules hasta antes del modules4
        segment = content[last_modules:match_pos]
        # Encontrar el ultimo ] en este segmento
        last_bracket = segment.rfind(']')
        print("   Ultimo ']' en segmento principal: " + str(last_bracket) + " de " + str(len(segment)))
        
        if last_bracket >= 0:
            # Posicion absoluta en content
            abs_bracket = last_modules + last_bracket
            print("   Posicion absoluta del cierre: " + str(abs_bracket))
            
            # El modulo 4 a insertar
            modulo4_texto = '''
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
        }'''
            
            # Insertar el módulo 4 antes del cierre ]
            char_before = segment[last_bracket - 1] if last_bracket > 0 else ''
            
            if char_before == ',':
                nuevo = content[:abs_bracket] + modulo4_texto + content[abs_bracket-1:]
            else:
                nuevo = content[:abs_bracket] + "," + modulo4_texto + content[abs_bracket:]
            
            content = nuevo
            print("   Módulo 4 insertado en array modules principal")
            
            # Remover el bloque modules4
            resto = content[match_pos:]
            next_vocab = resto.find('vocab:')
            print("   Próximo 'vocab:' está en posición relativa: " + str(next_vocab))
            
            if next_vocab >= 0:
                close_pattern = '}\n'
                close_idx = resto.find(close_pattern)
                if close_idx >= 0:
                    remover_hasta = match_pos + close_idx + 2
                    content = content[:match_pos] + content[remover_hasta:]
                    print("   Bloque modules4 removido")
                else:
                    print("   No se encontró cierre limpio, removemos 200 chars")
                    content = content[:match_pos] + content[match_pos+200:]
            else:
                print("   No se encontró vocab después, removemos 200 chars")
                content = content[:match_pos] + content[match_pos+200:]
        else:
            print("   No se encontró bracket principal apropiado")
    else:
        print("   No se encontró modules: principal antes de este modules4")

# Guardar el archivo
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nReestructuración completada")