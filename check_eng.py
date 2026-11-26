#!/usr/bin/env python3
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Buscar el curso inglés
idx = content.find('id: "en-supervivencia"')
if idx >= 0:
    print("Curso inglés encontrado")
    # Encontrar el syllabus
    snippet = content[idx:idx+500]
    # Buscar syllabus:
    syl_idx = snippet.find('syllabus:')
    if syl_idx >= 0:
        print("Syllabus inglés:")
        # Encontrar el final del syllabus (corchete de cierre)
        # El syllabus es un array, encontrar ]
        end_syl = snippet.find(']', syl_idx + 10)
        if end_syl >= 0:
            print(snippet[syl_idx:end_syl+20])
    
    # Buscar modules:
    mod_idx = snippet.find('modules:')
    if mod_idx >= 0:
        print("\nModules inglés:")
        end_mod = snippet.find('],', mod_idx + 8)
        if end_mod >= 0:
            print(snippet[mod_idx:end_mod+30])
        else:
            # Buscar con patrón diferente
            print(snippet[mod_idx:mod_idx+300])
    else:
        print("No se encontró modules: para inglés")
else:
    print("Curso inglés NO encontrado")