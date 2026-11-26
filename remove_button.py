#!/usr/bin/env python3
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Buscar y contar el botón
button_count = content.count('activar-minijuego')
print("Número de botones activar-minijuego en index.html: " + str(button_count))

if button_count > 0:
    # Remover todos los botones
    new_content = content.replace('<button id="activar-minijuego" class="btn btn-primary" style="margin: 10px auto; display: block;" onclick="initSentenceBuilder()">Abrir Minijuego Ordenar Oraciones</button>', '')
    # Limpiar posible doble espacio o salto de línea dejado
    new_content = new_content.replace('\n\n\n', '\n\n')
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Botones removidos del index.html")
else:
    print("No hay botones activar-minijuego en index.html")