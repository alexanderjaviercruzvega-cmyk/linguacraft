#!/usr/bin/env python3
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Para el curso de inglés: Quitar modules4 y agregar módulo 4 al array modules

# Patrón para encontrar el módulo 4 en modules4 inglés (buscando el título específico)
mod4_marker = 'Módulo 4 · Uso real y cultura anglófona'
mod4_pos = content.find(mod4_marker)

if mod4_pos >= 0:
    print("Found módulo 4 inglés en data.js")
    # Ahora borraremos el bloque modules4 y reestructuraremos
    # Encontrar dónde empieza modules4 (antes debería haber "// Módulo 4 adicional")
    # Y dónde termina (después del módulo 4, debería haber "],\n      vocab:")
    
    # Encontrar el inicio del bloque: buscar "// Módulo 4 adicional" arriba
    # y el cierre después del módulo 4
    
    # Más simple: reemplazar todo el bloque modules4 por vacío, 
    # e insertar el módulo 4 dentro del array modules
    
    # Primero, removamos el bloque modules4 completo
    # El bloque comienza con "// Módulo 4 adicional" y termina con "],\n      vocab:"
    
    # Buscemos el inicio: buscar desde "modules4:" 
    modules4_start = content.find('modules4: [')
    if modules4_start >= 0:
        # Encontrar el cierre: buscar el patrón "],\n      vocab:"
        modules4_end = content.find('],\n      vocab:', modules4_start)
        if modules4_end >= 0:
            # Eliminar el bloque modules4
            block_to_remove = content[modules4_start:modules4_end+6]  # +6 para incluir "],\n      vocab:"
            print(f"Removiendo bloque modules4 de {len(block_to_remove)} chars")
            content = content[:modules4_start] + content[modules4_end+6:]
            print("Bloque modules4 removido")
        else:
            print("No se encontró el final del bloque modules4")
    else:
        print("No se encontró 'modules4: ['")
else:
    print("Módulo 4 inglés NO encontrado - ¿ya fue procesado?")

# Ahora insertar el módulo 4 al final del array modules del inglés
# El array modules del inglés debería terminar con '],' antes de 'vocab:'
# Buscemos el patrón: después del módulo 3, antes de vocab:

# Insertar módulo 4 justo antes de "vocab:" en el curso inglés
# Primero encontremos la posición del curso inglés
eng_course_marker = 'id: "en-supervivencia"'
eng_pos = content.find(eng_course_marker)

if eng_pos >= 0:
    # Encontrar el array modules de inglés
    # Después del id viene el objeto del curso, con modules: [ ... ], luego vocab:
    after_course = content[eng_pos:eng_pos+500]
    
    # Buscar "modules:" en este fragmento
    modules_idx = after_course.find('modules:')
    if modules_idx >= 0:
        # Buscar el cierre del array modules: "]," seguido de nuevo renglón y vocab o el siguiente curso
        # El módulos array cierra con "]," y luego viene el vocab o el siguiente course {}
        # Busquemos el patrón: "]," seguido de newline y entonces "vocab:" o "id:"
        
        # Encontrar el cierre del módulos array
        # El módulo 3 del inglés termina y luego hay } cierra el objeto del curso,
        # pero actually el modules array cierra antes
        
        # Intentemos otro enfoque: buscar el último "]," antes de "vocab:" en el curso completo
        full_after = content[eng_pos:eng_pos+1000]
        
        # Buscar "vocab:" y tomar todo lo antes como el modules array
        vocab_idx = full_after.find('vocab:')
        if vocab_idx >= 0:
            # El modules array va desde "modules:" hasta antes de "vocab:"
            modules_end_in_fragment = vocab_idx
            modules_array = full_after[:modules_end_in_fragment]
            
            # Ahora agregarle el módulo 4 al final del modules array
            module4_html = '''\n        { 
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
            
            # Agregar el módulo 4 antes de la última corchete de cierre
            # El modules_array termina con "]" así que agregaremos , módulo 4 antes de ese ]
            if modules_array.rstrip().endswith(']'):
                # Agregar módulo 4 antes del cierre
                new_modules = modules_array[:-1] + module4_html + '\n      ]'
                # Reemplazar en el contenido completo
                # La posición exacta: eng_pos + modules_idx hasta eng_pos + vocab_idx en el fragmento
                abs_modules_end = eng_pos + modules_end_in_fragment
                
                # El contenido nuevo: todo lo que estaba antes del modules end, más el nuevo módulo, más el ]
                new_content = content[:abs_modules_end] + new_modules + content[abs_modules_end:]
                
                # Pero espera, modules_array ya incluye el cierre ], así que necesito tener cuidado
                # En realidad modules_array incluye todo desde "modules:" hasta antes de "vocab:"
                # Así que if modules_array ends with ], we need to replace that ] with , módulo 4 + ]
                
                print("Intentando insertar módulo 4 en inglés")
            else:
                print("El modules_array no termina como esperábamos")
        else:
            print("No se encontró vocab: en el fragmento")
    else:
        print("No se encontró modules: en el fragmento después del curso inglés")
else:
    print("Curso inglés NO encontrado")

# Guardar
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nProceso completado")