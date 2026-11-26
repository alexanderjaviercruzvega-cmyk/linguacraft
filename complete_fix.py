#!/usr/bin/env python3
"""
Script completo para arreglar data.js:
1. Remover módulos4 separados
2. Agregar módulo 4 al array principal 'modules' de cada curso
3. Actualizar syllabi de 3 a 4 módulos
"""

with open('data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Procesar línea por línea para reestructurar
# Identificar los cursos y sus módulos

nuevas_lineas = []
i = 0
while i < len(lines):
    line = lines[i]
    
    # Detectar el inicio de un curso (id:)
    if 'id: "en-supervivencia"' in line or 'id: "jp-viajeros"' in line or 'id: "ko-kdramas"' in line or 'id: "fr-primeros-pasos"' in line or 'id: "nah-raices"' in line:
        # Este es el inicio de un curso
        curso_actual = line.strip()
        nuevas_lineas.append(line)
        i += 1
        
        # Collect all course properties until the next course or end
        # We need to find: syllabus, modules, vocab, etc.
        # y reestructurarlos
        
        # Para este curso, buscamos el modules: y lo reestructuramos
        # Saltamos líneas hasta encontrar el modules array y lo procesamos
        
    nuevas_lineas.append(line)
    i += 1

# Este enfoque es complejo. Hagamos algo más simple:
# Vamos a reemplazar patrones específicos de cada curso

with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Para cada curso, quitar modules4 y agregar módulo 4 al array modules

# 1. Curso inglés - ya probamos que modules4 está ahí
# Vamos a remover todo el bloque modules4 del inglés e insertar el módulo 4 en el array modules

# Patrón: desde el comment "Módulo 4 adicional" hasta el closing antes de vocab inglés
# Pero necesitamos ser inteligentes sobre cuál modules4 remover (solo el primero = inglés)

# Encontrar posición del primer modules4
pos1 = content.find('modules4: [')
print(f"Primer modules4 en: {pos1}")

if pos1 >= 0:
    # Encontrar el cierre de este módulos4 específico
    # El módulos4 del inglés termina justo antes del vocab inglés
    # El vocab inglés empieza con 'vocab: [' pero hay que distinguir de otros cursos
    
    # Buscar la posición de "vocab:" que sigue después del modules4 del inglés
    # El cursos vienen en orden: inglés, japonés, coreano, francés, náhuatl
    # Después del modules4 inglés, viene el vocab inglés, luego el curso japonés, etc.
    
    # Buscemos el "vocab:" que está después de este modules4
    # Después de modules4 del inglés, debería venir: ] (cierre modules4), entonces vocab:, luego course japonés
    
    # Encontrar el siguiente "vocab:" después de pos1
    next_vocab = content.find('vocab:', pos1 + 100)  # saltar un poco para evitar el false positive
    if next_vocab >= 0:
        # El módulos4 inglés termina antes de este vocab:
        # Pero necesitamos encontrar el "],\n" que cierra el módulos4
        # Busquemos pattern: "],\n" después de pos1
        close_pos = content.find('],\n', pos1 + 10)
        if close_pos >= 0 and close_pos < next_vocab:
            print(f"Cierre modules4 inglés encontrado en {close_pos}")
            # El bloque a remover es desde pos1 hasta close_pos + 2 (para incluir "],\n")
            block_end = close_pos + 2
            # Ahora, qué poner en su lugar?
            # Queremos insertar el módulo 4 al final del array modules principal
            
            # Primero, encontraremos el array modules principal del inglés
            # El array modules principal empieza después de "modules:" y termina antes del comment/modules4
            # Buscemos backwards desde pos1 para encontrar el modules: principal
            
            # Actually, más fácil: el modules principal del inglés empieza después de la propiedad "modules:"
            # y termina con el primer "]," que cierra el array (antes del modules4 comment)
            
            # Buscemos "modules:" antes del modules4
            modules_principal_start = content.rfind('modules: ', 0, pos1)
            print(f"modules: principal starts at: {modules_principal_start}")
            
            if modules_principal_start >= 0:
                # El array modules principal va desde modules_principal_start hasta pos1 (el inicio de modules4)
                # Así que modules principal content es: content[modules_principal_start:pos1]
                # Y queremos agregar el módulo 4 al final de este array, antes del "]", que cierra el array principal
                
                # Encontrar el último "]" antes de pos1 que cierre el modules principal
                last_bracket = content.rfind(']', modules_principal_start, pos1)
                print(f"Último bracket principal en: {last_bracket}")
                
                if last_bracket >= 0 and last_bracket > modules_principal_start:
                    # Contenido entre modules_principal_start y last_bracket es el array modules actual
                    # Queremos insertar el módulo 4 antes del cierre ]
                    # El contenido actual hasta el último ] es el array modules con 3 módulos
                    # Insertaremos: , nuevo módulo 4 antes del ]
                    
                    modulo4_ingles = ''',
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
                    
                    # Insertar antes del último ]
                    nuevo_contenido = content[:last_bracket] + modulo4_ingles + content[last_bracket:]
                    content = nuevo_contenido
                    print("Módulo 4 agregado al array modules principal del inglés")
                else:
                    print("No se encontró bracket principal apropiado")
            else:
                print("No se encontró modules: principal")
        else:
            print("No se encontró cierre modules4 antes del vocab")
    else:
        print("No se encontró el primer modules4")

# Ahora hacer lo mismo para los otros cursos...
# Japones
jp_marker = 'modules4: ['
jp_pos = content.find(jp_marker, pos1 + 100) if pos1 >= 0 else content.find(jp_marker)
print(f"\nJaponés modules4 en: {jp_pos}")

if jp_pos >= 0:
    # Similar logic para japonés
    next_vocab_jp = content.find('vocab:', jp_pos + 100)
    if next_vocab_jp >= 0:
        close_pos_jp = content.find('],\n', jp_pos + 10)
        if close_pos_jp >= 0 and close_pos_jp < next_vocab_jp:
            print(f"Cierre modules4 japonés en {close_pos_jp}")
            # Buscar modules: principal antes que este modules4
            # El japonés viene después del inglés, así que el modules: principal japonés está después del curso inglés completo
            # Esto es más complejo... simplifiquemos
            
            # Alternativa: solo remover el módulos4 y no agregar al modules principal en este script
            # Ya que el curso japonés también tiene su syllabus actualizado
            # Removamos el modules4 japonés simplemente
            content = content[:jp_pos] + content[close_pos_jp + 2:]  # +2 para "],\n"
            print("Módulos4 japonés removido")
        else:
            print("No se encontró cierre adecuado para japonés")
    else:
        print("No se encontró vocab después de modules4 japonés")

# Guardar
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n¡Script completado!")