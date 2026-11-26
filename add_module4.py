#!/usr/bin/env python3
"""
Agrega el Módulo 4 a los 5 cursos gratuitos en data.js.
Cada syllabus ya indicaba 4 módulos, pero solo tenían 3 en el array modules.
"""

with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Patrones para cada curso - buscamos el cierre del array modules y agregamos el módulo 4

# 1. Curso de inglés (en-supervivencia) - ya fue agregado parcialmente
# Verificamos si ya tiene módulo 4
if 'Módulo 4 · Uso real y cultura anglófona' in content:
    print("El curso inglés ya tiene el Módulo 4")
else:
    print("El curso inglés NO tiene Módulo 4")

# 2. Curso de japonés (jp-viajeros) - agregar módulo 4
# El syllabus dice: ["Módulo 1 · Saludos y cortesía", "Módulo 2 · Moverte por la ciudad", "Módulo 3 · Comer y comprar", "Módulo 4 · Uso real y cultura"]
# Los modules array solo tienen 3 módulos

# Buscar el patrón del módulo 3 japonés y agregar el 4
# El patrón será: después del módulo 3 japonés, antes del cierre del array modules

jp_marker = 'id: "jp-viajeros"'
jp_idx = content.find(jp_marker)

if jp_idx >= 0:
    # Encontrar el array modules después del curso japonés
    after_jp = content[jp_idx:]
    # Buscar modules: después de japonés
    modules_idx = after_jp.find('modules:')
    if modules_idx >= 0:
        # Buscar el cierre del array modules ( ], seguido de vocab o el siguiente curso)
        # Los módulos japoneses terminan antes del vocab
        rest = after_jp[modules_idx:]
        # Buscar el patrón de cierre: 3 módulos y luego vocab
        # Patrn: después del punto 4 del módulo 3, el cierre }
        # Este es complejo, usaremos un enfoque diferente
        
        # Buscar la posición después de los 3 módulos japoneses
        # Los módulos japoneses tienen un patrón: cierran con "]," y luego hay vocab
        # Busquemos "いただきます" o "御洒落" u otros términos japoneses del módulo 3
        
        # Enfoque: buscar el módulo 3 japonés y agregar después de él
        mod3_marker = 'Módulo 3 · Comer y comprar'
        mod3_idx = content.find(mod3_marker)
        
        if mod3_idx >= 0:
            # Agregar el módulo 4 después del módulo 3 japonés
            # Necesitamos insertar antes del cierre del array modules
            # El módulo 3 japonés termina con ] y luego hay ,
            # Buscemos el patrón después del módulo 3
            
            module4_jp = '''
        { 
          title: "Módulo 4 · Uso real y cultura",
          summary: "Small talk, normas sociales y expresiones cotidianas en japonés. Reglas de construcción de oraciones comparadas con el español.", 
          points: [
            "El pequeño talk en japonés: hablar del clima, familia y situaciones cotidianas.",
            "El uso de お願いします (onegaishimasu) en situaciones sociales.",
            "Diferencias entre keigo (lenguaje honorífico) y lenguaje casual.",
            "Expresiones comunes: いいえ (no), ええ (yes), すみません (excuse me).",
            "Vocabulario de uso frecuente para interacciones básicas.",
            "Normas de cortesía al saludar y dirigirse a desconocidos."
          ] 
        }'''
            
            # Insertar después del módulo 3 japonés, antes del cierre del array
            # Encontrar el final del módulo 3 (buscar el patrón de cierre }
            after_mod3 = content[mod3_idx:mod3_idx+500]
            # Buscar el patrón de cierre del módulo 3
            close_pattern = 'En Japón la cortesía es parte del idioma'
            close_idx = after_mod3.find(close_pattern)
            
            if close_idx >= 0:
                # Insertar el módulo 4 después de esta línea
                insert_pos = mod3_idx + close_idx + len(close_pattern)
                content = content[:insert_pos] + module4_jp + '\n' + content[insert_pos:]
                print("Módulo 4 agregado a japonés")
            else:
                print("No se encontró el patrón de cierre para japonés")
        else:
            print("No se encontró el módulo 3 japonés")
    else:
        print("No se encontró modules: después de japonés")
else:
    print("Curso japonés NO encontrado")

# 3. Curso de coreano (ko-kdramas) - agregar módulo 4
# El syllabus tiene solo 3 módulos: ["Módulo 1 · Hangul y saludos", "Módulo 2 · Emociones de drama", "Módulo 3 · Comida y vida diaria"]
# Necesitamos agregar el módulo 4 tanto al syllabus como al array modules

ko_marker = 'id: "ko-kdramas"'
ko_idx = content.find(ko_marker)

if ko_idx >= 0:
    # Agregar módulo 4 al syllabus y modules del coreano
    # Primero, actualizar el syllabus de 3 a 4 módulos
    old_syllabus_ko = 'syllabus: \["Módulo 1 · Hangul y saludos", "Módulo 2 · Emociones de drama", "Módulo 3 · Comida y vida diaria"\]'
    new_syllabus_ko = 'syllabus: ["Módulo 1 · Hangul y saludos", "Módulo 2 · Emociones de drama", "Módulo 3 · Comida y vida diaria", "Módulo 4 · Uso real y cultura"]'
    
    if old_syllabus_ko in content:
        content = content.replace(old_syllabus_ko, new_syllabus_ko)
        print("Syllabus del coreano actualizado")
    else:
        print("Patrón de syllabus coreano no encontrado")
    
    # Agregar módulo 4 al array modules del coreano
    # Buscar el cierre del modules array del coreano
    mod_ko_marker = 'Módulo 3 · Comida y vida diaria'
    mod_ko_idx = content.find(mod_ko_marker)
    
    if mod_ko_idx >= 0:
        module4_ko = '''
        { 
          title: "Módulo 4 · Uso real y cultura",
          summary: "Small talk, normas sociales y expresiones cotidianas en coreano. Construcción de oraciones y vocabulario avanzado.", 
          points: [
            "El pequeño talk en coreano: hablar del clima, trabajo y situaciones cotidianas.",
            "El uso de존댓말 (honorífico) y banmal (casual) apropiadamente.",
            "Expresiones comunes: 네 (yes), 아니요 (no), 죄송합니다 (excuse me).",
            "Vocabulario de uso frecuente para interacciones básicas.",
            "Normas de cortesía al saludar y dirigirse a desconocidos."
          ] 
        }'''
        
        # Insertar después del módulo 3 coreano
        after_mod3_ko = content[mod_ko_idx:mod_ko_idx+400]
        # Buscar "cultural:" que viene después de los modules
        cultural_idx = after_mod3_ko.find('cultural:')
        if cultural_idx >= 0:
            insert_pos = mod_ko_idx + cultural_idx
            content = content[:insert_pos] + module4_ko + '\n' + content[insert_pos:]
            print("Módulo 4 agregado a coreano")
        else:
            print("No se encontró cultural: después del módulo 3 coreano")
    else:
        print("No se encontró el módulo 3 coreano")
else:
    print("Curso coreano NO encontrado")

# 4. Curso de francés (fr-primeros-pasos) - agregar módulo 4
fr_marker = 'id: "fr-primeros-pasos"'
fr_idx = content.find(fr_marker)

if fr_idx >= 0:
    # Actualizar el syllabus francés de 3 a 4 módulos
    old_syllabus_fr = 'syllabus: ["Módulo 1 · Saludos y cortesía", "Módulo 2 · Números y compras", "Módulo 3 · Presentarte"]'
    new_syllabus_fr = 'syllabus: ["Módulo 1 · Saludos y cortesía", "Módulo 2 · Números y compras", "Módulo 3 · Presentarte", "Módulo 4 · Uso real y cultura"]'
    
    if old_syllabus_fr in content:
        content = content.replace(old_syllabus_fr, new_syllabus_fr)
        print("Syllabus del francés actualizado")
    else:
        print("Patrón de syllabus francés no encontrado")
    
    # Agregar módulo 4 al array modules del francés
    mod_fr_marker = 'Módulo 3 · Presentarte'
    mod_fr_idx = content.find(mod_fr_marker)
    
    if mod_fr_idx >= 0:
        module4_fr = '''
        { 
          title: "Módulo 4 · Uso real y cultura",
          summary: "Small talk, normas sociales y expresiones cotidianas en francés. Construcción de oraciones y vocabulario avanzado.", 
          points: [
            "El pequeño talk en francés: hablar del clima, trabajo y situaciones cotidianas.",
            "El uso de tu/vous apropiadamente en situaciones sociales.",
            "Expresiones comunes: oui (yes), non (no), excusez-moi (excuse me).",
            "Vocabulario de uso frecuente para interacciones básicas.",
            "Normas de cortesía al saludar y dirigirse a desconocidos."
          ] 
        }'''
        
        after_mod3_fr = content[mod_fr_idx:mod_fr_idx+400]
        cultural_idx = after_mod3_fr.find('cultural:')
        if cultural_idx >= 0:
            insert_pos = mod_fr_idx + cultural_idx
            content = content[:insert_pos] + module4_fr + '\n' + content[insert_pos:]
            print("Módulo 4 agregado a francés")
        else:
            print("No se encontró cultural: después del módulo 3 francés")
    else:
        print("No se encontró el módulo 3 francés")
else:
    print("Curso francés NO encontrado")

# 5. Curso de Náhuatl (nah-raices) - agregar módulo 4
nah_marker = 'id: "nah-raices"'
nah_idx = content.find(nah_marker)

if nah_idx >= 0:
    # Actualizar el syllabus náhuatl de 3 a 4 módulos
    old_syllabus_nah = 'syllabus: ["Módulo 1 · Saludos y sonidos", "Módulo 2 · Palabras que ya usas", "Módulo 3 · Cosmovisión y cultura"]'
    new_syllabus_nah = 'syllabus: ["Módulo 1 · Saludos y sonidos", "Módulo 2 · Palabras que ya usas", "Módulo 3 · Cosmovisión y cultura", "Módulo 4 · Uso real y cultura"]'
    
    if old_syllabus_nah in content:
        content = content.replace(old_syllabus_nah, new_syllabus_nah)
        print("Syllabus del náhuatl actualizado")
    else:
        print("Patrón de syllabus náhuatl no encontrado")
    
    # Agregar módulo 4 al array modules del náhuatl
    mod_nah_marker = 'Módulo 3 · Cosmovisión y cultura'
    mod_nah_idx = content.find(mod_nah_marker)
    
    if mod_nah_idx >= 0:
        module4_nah = '''
        { 
          title: "Módulo 4 · Uso real y cultura",
          summary: "Small talk, normas sociales y expresiones cotidianas en náhuatl. Vocabulario adicional y diálogos situacionales.", 
          points: [
            "El pequeño talk en náhuatl: hablar del clima, familia y situaciones cotidianas.",
            "El uso de partículas y construcción de oraciones en náhuatl.",
            "Expresiones comunes: Niltze (hola), Tlazohcamati (gracias).",
            "Vocabulario de uso frecuente para interacciones básicas.",
            "Normas de cortesía al saludar y dirigirse a desconocidos."
          ] 
        }'''
        
        after_mod3_nah = content[mod_nah_idx:mod_nah_idx+400]
        cultural_idx = after_mod3_nah.find('cultural:')
        if cultural_idx >= 0:
            insert_pos = mod_nah_idx + cultural_idx
            content = content[:insert_pos] + module4_nah + '\n' + content[insert_pos:]
            print("Módulo 4 agregado a náhuatl")
        else:
            print("No se encontró cultural: después del módulo 3 náhuatl")
    else:
        print("No se encontró el módulo 3 náhuatl")
else:
    print("Curso náhuatl NO encontrado")

# Guardar el archivo
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n¡Proceso completado! Revisa los cambios en data.js")