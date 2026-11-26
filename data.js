/* ============================================================================
   LinguaCraft · data.js
   CONTENIDO de la plataforma (separado de la lógica).
   ----------------------------------------------------------------------------
   Aquí viven los 10 idiomas, los 15 cursos con su material completo, las 20
   tarjetas de vocabulario, el quiz de 8 preguntas, las guías culturales y los
   falsos amigos / modismos.
   ========================================================================== */

 /* ============================================================================
   1) IDIOMAS (10)
   speech    → código de voz para speechSynthesis
   fallback  → voz de respaldo si el navegador no tiene voz nativa
   mymemory  → código para la API de traducción (null = sin traducción en vivo)
   ========================================================================== */
 
 const LANGUAGES = [
   {
     id: "en", name: "Inglés", flag: "🇬🇧", tag: "Global",
     speech: "en-US", fallback: null, mymemory: "en",
     tagline: "El idioma de los negocios y el internet",
     speakers: "1 500 millones",
     countries: "59 países oficiales",
     difficulty: "Fácil",
     difficultyStars: 2,
     family: "Germánica occidental",
     script: "Alfabeto latino",
     curiosity: "El inglés toma prestadas palabras de más de 350 idiomas distintos. Aproximadamente el 30 % de su vocabulario proviene del francés, otro 30 % del latín clásico y el resto de raíces germánicas y otros orígenes.",
     phrases: [
       { term: "Nice to meet you",         romaji: "/naɪs tə miːt juː/",    meaning: "Encantado de conocerte" },
       { term: "How much is it?",           romaji: "/haʊ mʌtʃ ɪz ɪt/",     meaning: "¿Cuánto cuesta?" },
       { term: "Could you help me?",        romaji: "/kʊd juː help miː/",    meaning: "¿Podrías ayudarme?" },
       { term: "I don't understand",        romaji: "/aɪ doʊnt ʌndəˈstænd/",meaning: "No entiendo" },
       { term: "Where is the bathroom?",    romaji: "/weər ɪz ðə ˈbɑːθruːm/",meaning: "¿Dónde está el baño?" },
       { term: "Have a nice day!",          romaji: "/hæv ə naɪs deɪ/",     meaning: "¡Que tengas un buen día!" },
     ],
     cultural: "Con más de 1 500 millones de hablantes, el inglés funciona como lingua franca en ciencia, aviación y tecnología. No existe un único inglés «correcto»: el británico, el estadounidense y el australiano conviven, y la claridad pesa más que el acento.",
   },
   {
     id: "ja", name: "Japonés", flag: "🇯🇵", tag: "Cortesía",
     speech: "ja-JP", fallback: null, mymemory: "ja",
     tagline: "Precisión, honoríficos y tres escrituras",
     speakers: "125 millones",
     countries: "1 país oficial (Japón)",
     difficulty: "Muy difícil",
     difficultyStars: 5,
     family: "Japónica",
     script: "Hiragana · Katakana · Kanji",
     curiosity: "El japonés utiliza tres sistemas de escritura simultáneamente en un mismo texto: hiragana (sílabas nativas), katakana (palabras extranjeras) y kanji (caracteres chinos adaptados). Un periódico japonés promedio usa los tres en la misma página.",
     phrases: [
       { term: "こんにちは",           romaji: "Konnichiwa",         meaning: "Hola / Buenas tardes" },
       { term: "ありがとうございます", romaji: "Arigatou gozaimasu", meaning: "Muchas gracias (formal)" },
       { term: "お願いします",         romaji: "Onegaishimasu",      meaning: "Por favor (al pedir algo)" },
       { term: "すみません",           romaji: "Sumimasen",          meaning: "Disculpe / Perdón" },
       { term: "おはようございます",   romaji: "Ohayou gozaimasu",   meaning: "Buenos días (formal)" },
       { term: "いただきます",         romaji: "Itadakimasu",        meaning: "Buen provecho (antes de comer)" },
     ],
     cultural: "El japonés ordena la frase distinto: el verbo va al final y el nivel de cortesía cambia la conjugación completa. Conviven tres escrituras —hiragana, katakana y kanji— dentro de un mismo texto, algo que en español no tiene equivalente.",
   },
   {
     id: "ko", name: "Coreano", flag: "🇰🇷", tag: "Hangul",
     speech: "ko-KR", fallback: null, mymemory: "ko",
     tagline: "Un alfabeto lógico y honoríficos por edad",
     speakers: "80 millones",
     countries: "2 países oficiales (Corea del Sur y del Norte)",
     difficulty: "Difícil",
     difficultyStars: 4,
     family: "Koreánica",
     script: "Hangul (alfabeto silábico)",
     curiosity: "El Hangul fue diseñado en 1443 por el rey Sejong el Grande con el objetivo explícito de ser fácil de aprender. Cada letra imita la posición de la boca y la lengua al pronunciar el sonido correspondiente. Se puede aprender a leer en menos de un día.",
     phrases: [
       { term: "안녕하세요",   romaji: "Annyeonghaseyo", meaning: "Hola (cortés)" },
       { term: "감사합니다",   romaji: "Gamsahamnida",   meaning: "Gracias (formal)" },
       { term: "맛있어요",    romaji: "Masiisseoyo",     meaning: "Está delicioso" },
       { term: "화이팅!",     romaji: "Hwaiting!",       meaning: "¡Ánimo! / ¡Tú puedes!" },
       { term: "사랑해요",    romaji: "Saranghaeyo",     meaning: "Te quiero" },
       { term: "잘 지내세요?", romaji: "Jal jinaeseyo?",  meaning: "¿Cómo está usted?" },
     ],
     cultural: "El Hangul (한글) es uno de los alfabetos más científicos del mundo: se aprende a leer en pocas horas porque sus letras imitan la forma de la boca al hablar. Además, la edad determina el nivel de habla, por eso la primera pregunta suele ser «¿cuántos años tienes?».",
   },
   {
     id: "fr", name: "Francés", flag: "🇫🇷", tag: "Elegancia",
     speech: "fr-FR", fallback: null, mymemory: "fr",
     tagline: "El idioma de las liaison y la diplomacia",
     speakers: "320 millones",
     countries: "29 países oficiales",
     difficulty: "Intermedio",
     difficultyStars: 3,
     family: "Romance (latina)",
     script: "Alfabeto latino con diacríticos",
     curiosity: "El francés fue el idioma diplomático global durante más de tres siglos (siglos XVII–XX). Hoy es idioma oficial de la ONU, la UE, la OTAN, el COI y más de 25 organizaciones internacionales. Se habla en cinco continentes.",
     phrases: [
       { term: "Bonjour",              romaji: "/bɔ̃.ʒuʁ/",        meaning: "Hola / Buenos días" },
       { term: "Merci beaucoup",       romaji: "/mɛʁ.si bo.ku/",   meaning: "Muchas gracias" },
       { term: "Ça marche",            romaji: "/sa maʁʃ/",        meaning: "De acuerdo / Funciona" },
       { term: "S'il vous plaît",      romaji: "/sil vu plɛ/",     meaning: "Por favor" },
       { term: "Je ne comprends pas",  romaji: "/ʒə nə kɔ̃.pʁɑ̃ pa/", meaning: "No entiendo" },
       { term: "Enchanté(e)",          romaji: "/ɑ̃.ʃɑ̃.te/",       meaning: "Encantado/a de conocerte" },
     ],
     cultural: "En Francia, entrar a una tienda sin decir «bonjour» se considera descortés: el saludo es la puerta de entrada a cualquier interacción. Las comidas son un ritual social, y por eso «bon appétit» se dice siempre antes de empezar a comer.",
   },
   {
     id: "de", name: "Alemán", flag: "🇩🇪", tag: "Precisión",
     speech: "de-DE", fallback: null, mymemory: "de",
     tagline: "Palabras compuestas y orden lógico",
     speakers: "100 millones",
     countries: "6 países oficiales",
     difficulty: "Difícil",
     difficultyStars: 4,
     family: "Germánica occidental",
     script: "Alfabeto latino + ä, ö, ü, ß",
     curiosity: "El alemán puede crear palabras compuestas de longitud casi ilimitada. La palabra 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz' (63 letras) fue una ley real alemana sobre el etiquetado de carne de vaca, en vigor hasta 2013.",
     phrases: [
       { term: "Guten Tag",          romaji: "/ˈɡuːtn̩ taːk/",   meaning: "Buenos días" },
       { term: "Danke schön",        romaji: "/ˈdaŋkə ʃøːn/",   meaning: "Muchas gracias" },
       { term: "Wie geht's?",        romaji: "/viː ɡeːts/",      meaning: "¿Cómo estás?" },
       { term: "Entschuldigung",     romaji: "/ɛntˈʃʊldɪɡʊŋ/",  meaning: "Disculpe / Perdón" },
       { term: "Ich verstehe nicht", romaji: "/ɪç fɛɐ̯ˈʃteːə nɪçt/", meaning: "No entiendo" },
       { term: "Auf Wiedersehen",    romaji: "/aʊf ˈviːdɐˌzeːən/", meaning: "Hasta la vista / Adiós" },
     ],
     cultural: "El alemán construye palabras como piezas de Lego: «Handschuh» (guante) es literalmente «zapato de mano». También usa cuatro casos gramaticales que cambian los artículos, lo que exige pensar la frase completa antes de hablar.",
   },
   {
     id: "it", name: "Italiano", flag: "🇮🇹", tag: "Melodía",
     speech: "it-IT", fallback: null, mymemory: "it",
     tagline: "Ritmo, gestos y dolce vita",
     speakers: "85 millones",
     countries: "4 países oficiales",
     difficulty: "Fácil-Intermedio",
     difficultyStars: 2,
     family: "Romance (latina)",
     script: "Alfabeto latino",
     curiosity: "El italiano es el idioma más cercano al latín de todas las lenguas romances. Es además la lengua oficial de la música clásica: términos como piano, forte, allegro, soprano, aria y tutti son italiano y se usan en partituras de todo el mundo.",
     phrases: [
       { term: "Buongiorno",        romaji: "/bwonˈdʒorno/",         meaning: "Buenos días" },
       { term: "Che bello!",        romaji: "/ke ˈbɛllo/",           meaning: "¡Qué bonito!" },
       { term: "In bocca al lupo",  romaji: "/in ˈbokka al ˈlupo/",  meaning: "¡Mucha suerte!" },
       { term: "Grazie mille",      romaji: "/ˈɡrattsjɛ ˈmille/",    meaning: "Muchísimas gracias" },
       { term: "Per favore",        romaji: "/per faˈvoːre/",         meaning: "Por favor" },
       { term: "Prego",             romaji: "/ˈprɛːɡo/",             meaning: "De nada / Por favor / Adelante" },
     ],
     cultural: "El italiano se apoya tanto en el ritmo como en los gestos: los hablantes nativos acompañan la frase con las manos casi de forma automática. La mayoría de las palabras terminan en vocal, lo que le da esa musicalidad tan reconocible.",
   },
   {
     id: "pt", name: "Portugués", flag: "🇵🇹", tag: "Saudade",
     speech: "pt-BR", fallback: null, mymemory: "pt",
     tagline: "Nasales suaves y alma brasileña",
     speakers: "260 millones",
     countries: "9 países oficiales",
     difficulty: "Fácil-Intermedio",
     difficultyStars: 2,
     family: "Romance (latina)",
     script: "Alfabeto latino con diacríticos",
     curiosity: "La palabra 'saudade' (melancolía nostálgica por algo o alguien amado) no tiene traducción exacta en ningún otro idioma, y es considerada parte del alma cultural portuguesa y brasileña. Los lingüistas la llaman una 'palabra intraducible'.",
     phrases: [
       { term: "Obrigado / Obrigada", romaji: "/obɾiˈɡadu/",    meaning: "Gracias (masc. / fem.)" },
       { term: "Tudo bem?",           romaji: "/ˈtudu bẽj/",    meaning: "¿Todo bien?" },
       { term: "Fica à vontade",      romaji: "/ˈfikɐ a võˈtadʒi/", meaning: "Ponte cómodo" },
       { term: "Com licença",         romaji: "/kõ liˈsẽsɐ/",   meaning: "Con permiso" },
       { term: "Não entendo",         romaji: "/nɐ̃w̃ ẽˈtẽdu/",  meaning: "No entiendo" },
       { term: "Até logo",            romaji: "/aˈtɛ ˈloɡu/",   meaning: "Hasta luego" },
     ],
     cultural: "El portugués está lleno de sonidos nasales que se producen sin cerrar del todo la boca, algo que cuesta al principio. Brasil y Portugal comparten la lengua pero difieren en pronunciación y vocabulario, como ocurre entre el español de México y el de España.",
   },
   {
     id: "zh", name: "Chino Mandarín", flag: "🇨🇳", tag: "Tonos",
     speech: "zh-CN", fallback: null, mymemory: "zh-CN",
     tagline: "Cinco tonos que cambian el significado",
     speakers: "920 millones (nativos)",
     countries: "5 países oficiales",
     difficulty: "Muy difícil",
     difficultyStars: 5,
     family: "Sino-tibetana",
     script: "Caracteres chinos + Pinyin",
     curiosity: "El chino mandarín es el idioma con más hablantes nativos del mundo. Para leer un periódico se necesitan conocer al menos 2 500 caracteres; para ser considerado culto, 5 000. Sin embargo, el sistema de tonos se domina más rápido de lo que parece con práctica constante.",
     phrases: [
       { term: "你好",    romaji: "Nǐ hǎo",    meaning: "Hola" },
       { term: "谢谢",    romaji: "Xièxie",    meaning: "Gracias" },
       { term: "不客气",  romaji: "Bú kèqi",   meaning: "De nada" },
       { term: "对不起",  romaji: "Duìbuqǐ",   meaning: "Lo siento / Perdón" },
       { term: "我不懂",  romaji: "Wǒ bù dǒng", meaning: "No entiendo" },
       { term: "再见",    romaji: "Zàijiàn",   meaning: "Adiós / Hasta luego" },
     ],
     cultural: "El mandarín es tonal: la misma sílaba «ma» puede significar «mamá», «cáñamo», «caballo» o «regañar» según el tono. No usa alfabeto, sino caracteres, y el pinyin con marcas (ā, á, ǎ, à) sirve de apoyo para estudiantes.",
   },
   {
     id: "nah", name: "Náhuatl", flag: "🇲🇽", tag: "Herencia",
     speech: "nah", fallback: "es-MX", mymemory: null,
     tagline: "La lengua viva de Mesoamérica",
     speakers: "1.7 millones",
     countries: "México (reconocido legalmente)",
     difficulty: "Muy difícil",
     difficultyStars: 5,
     family: "Uto-azteca",
     script: "Alfabeto latino adaptado",
     curiosity: "El náhuatl aportó al español más de 200 palabras de uso cotidiano: chocolate, tomate, aguacate, chile, cacahuate, copal, petate y muchas más. La Academia Mexicana de la Lengua documenta y protege activamente este aporte lingüístico.",
     phrases: [
       { term: "Niltze",         romaji: "nil-tze",          meaning: "Hola" },
       { term: "Tlazohcamati",   romaji: "tla-zoh-ca-ma-ti", meaning: "Gracias" },
       { term: "Cualli tonalli", romaji: "cua-lli to-nal-li", meaning: "Buenos días" },
       { term: "Macehualli",     romaji: "ma-ce-hua-lli",    meaning: "Persona / Ser humano" },
       { term: "Xocolatl",       romaji: "sho-ko-latl",      meaning: "Chocolate" },
       { term: "Tlalli",         romaji: "tla-lli",          meaning: "Tierra / Suelo" },
     ],
     cultural: "El náhuatl sigue vivo: cerca de 1,7 millones de personas lo hablan en México, con variantes regionales tan distintas como los dialectos del árabe. Muchas palabras del español vienen de aquí: chocolate (xocolatl), tomate (tomatl) y aguacate (ahuacatl).",
   },
   {
     id: "la", name: "Latín", flag: "🏛️", tag: "Raíz",
     speech: "la", fallback: "it-IT", mymemory: null,
     tagline: "La lengua madre del romance",
     speakers: "~1 000 hablantes activos",
     countries: "Vaticano (único país oficial)",
     difficulty: "Muy difícil",
     difficultyStars: 5,
     family: "Itálica (indo-europea)",
     script: "Alfabeto latino clásico",
     curiosity: "El latín es el único idioma 'muerto' que tiene un país que lo usa como oficial: el Vaticano. Además, el latín sigue evolucionando: en 2017 se crearon términos latinos oficiales para 'selfie' (imago sui ipsius), 'internet' (interrete) y 'smartphone' (telephonium alare).",
     phrases: [
       { term: "Carpe diem",         romaji: "car-pe di-em",         meaning: "Aprovecha el día" },
       { term: "Veni, vidi, vici",    romaji: "ve-ni vi-di vi-ci",    meaning: "Vine, vi, vencí" },
       { term: "Gratias tibi ago",    romaji: "gra-tias ti-bi a-go",  meaning: "Te doy las gracias" },
       { term: "Salve",               romaji: "sal-ve",               meaning: "Hola / Salud" },
       { term: "Vale",                romaji: "va-le",                meaning: "Adiós / Cuídate" },
       { term: "Amor vincit omnia",   romaji: "a-mor vin-cit om-nia", meaning: "El amor lo conquista todo" },
     ],
     cultural: "El latín no está muerto: es el ancestro del español, portugués, francés, italiano y rumano, y sigue siendo el idioma oficial del Vaticano. Aprenderlo hace visible la lógica de la gramática romance, porque explica de dónde vienen los casos y las conjugaciones actuales.",
   },
 ];

 /* ============================================================================
   2) CURSOS (15: 5 Gratis · 10 PRO)
   Cada curso está diseñado para que el estudiante realmente aprenda el idioma
   a través de situaciones prácticas, vocabulario útil y cultura profunda.
   Estructura por curso:
   - 3 módulos progresivos con vocabulario contextual y situaciones reales
   - Lista completa de vocabulario con romaji/transliteración y audio
   - Diálogo completo con roles y traducción
   - Nota cultural profunda sobre costumbres, etiqueta o historia
   - Actividades prácticas y frases clave
   ========================================================================== */

 const COURSES = [

   /* ------------------------------- GRATIS (5) ------------------------------ */
   {
     id: "en-supervivencia",
     title: "Inglés de Supervivencia",
     langId: "en", langName: "Inglés", flag: "🇬🇧",
     level: "Básico", tag: "free",
     cover: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
     duration: "6 semanas",
     desc: "Lo esencial para viajar y hacerte entender en cualquier país de habla inglesa desde el primer día. Aprenderás a pronunciar correctamente, entender la gramática básica, manejar vocabulario de situaciones reales y desenvolverte en conversaciones cotidianas.",
     syllabus: ["Módulo 1 · Fonética y pronunciación", "Módulo 2 · Gramática esencial", "Módulo 3 · Vocabulario de supervivencia", "Módulo 4 · Uso real y cultura anglófona"],
     modules: [
       { 
         title: "Módulo 1 · Saludos y presentaciones", 
         summary: "Aprenderás a presentarte, preguntar el nombre y despedirte con naturalidad en situaciones cotidianas.", 
         points: [
           "Presentaciones con «I'm…» y «Nice to meet you»",
           "Preguntas base: «What's your name?», «Where are you from?».",
           "Despedidas formales («Goodbye») e informales («See you soon»).",
           "El pequeño talk sobre el clima es una norma social en países anglosajones."
         ] 
       },
       { 
         title: "Módulo 2 · Aeropuerto y hotel", 
         summary: "Vocabulario y frases para moverte sin estrés al llegar a tu destino. Todo lo que necesitas para tu primer día en el país.", 
         points: [
           "Orientarte: «Where is gate B12?».",
           "Registro: «I have a reservation under López».",
           "Pedir repetición: «Could you repeat that, please?»." ,
           "El personal de aeropuerto suele hablar más lento a extranjeros."
         ] 
       },
       { 
         title: "Módulo 3 · Comida y direcciones", 
         summary: "Sobrevive en un restaurante y encuentra el camino de regreso. Las frases más usadas en restaurantes y dando direcciones.", 
         points: [
           "Pedir con cortesía: «I'd like a coffee, please».",
           "La cuenta: «Can I have the bill?».",
           "Direcciones: «turn left», «go straight», «next corner».",
           "En restaurantes anglosajones se deja propina del 15-20%."
         ] 
       },
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
        },
      ],
     vocab: [
       { term: "Nice to meet you", romaji: "/naɪs tə miːt juː/", meaning: "Encantado de conocerte", lang: "en-US" },
       { term: "How much is it?", romaji: "/haʊ mʌtʃ ɪz ɪt/", meaning: "¿Cuánto cuesta?", lang: "en-US" },
       { term: "Could you help me?", romaji: "/kʊd juː help miː/", meaning: "¿Podrías ayudarme?", lang: "en-US" },
       { term: "I'd like a coffee, please", romaji: "/aɪd laɪk ə ˈkɒfi pliːz/", meaning: "Quisiera un café, por favor", lang: "en-US" },
       { term: "Where is the bathroom?", romaji: "/weər ɪz ðə ˈbɑːθruːm/", meaning: "¿Dónde está el baño?", lang: "en-US" },
       { term: "I don't understand", romaji: "/aɪ doʊnt ˌʌndərˈstænd/", meaning: "No entiendo", lang: "en-US" },
       { term: "Can I have the bill?", romaji: "/kən aɪ hæv ðə bɪl/", meaning: "¿Me trae la cuenta?", lang: "en-US" },
       { term: "Cheers", romaji: "/tʃɪərz/", meaning: "Salud / Gracias", lang: "en-US" },
       { term: "Sorry", romaji: "/ˈsɔːri/", meaning: "Disculpe / Perdone", lang: "en-US" },
       { term: "Excuse me", romaji: "/ɪkˈskjuːz miː/", meaning: "Con permiso", lang: "en-US" },
       { term: "Have a nice day", romaji: "/hæv ə naɪsdeɪ/", meaning: "Que tenga buen día", lang: "en-US" },
       { term: "What time is it?", romaji: "/wɔːt taɪm ɪz ɪt/", meaning: "¿Qué hora es?", lang: "en-US" },
     { term: "Turn left/right", romaji: "/tɜːrn lɛft / raɪt/", meaning: "Gire a la izquierda/derecha", lang: "en-US" },
     { term: "Go straight", romaji: "/ɡoʊ streɪt/", meaning: "Siga recto", lang: "en-US" },
     { term: "It's on the right", romaji: "/ɪts ɒn ðə raɪt/", meaning: "Está a la derecha", lang: "en-US" },
     ],
     dialogue: [
       { who: "Turista", line: "Excuse me, where is the train station?", tr: "Disculpe, ¿dónde está la estación de tren?" },
       { who: "Local", line: "Go straight and turn left at the corner.", tr: "Siga recto y gire a la izquierda en la esquina." },
       { who: "Turista", line: "Thank you so much! And how much is a ticket?", tr: "¡Muchas gracias! ¿Y cuánto cuesta un boleto?" },
       { who: "Local", line: "It's two dollars. Have a nice day!", tr: "Son dos dólares. ¡Que tenga buen día!" },
       
       { who: "Local", line: "Sure, it's around the corner. Two blocks and you'll see it.", tr: "Sí, es alrededor de la esquina. Dos cuadras y lo verá." },
     ],
     cultural: "En los países anglosajones el «small talk» —charla breve sobre el clima, el tráfico o el fin de semana— es una norma social, no una pérdida de tiempo. En los países anglosajones el pequeño talk es una norma social, no una pérdida de tiempo. El inglés tiene muchos acentos locales válidos; el objetivo es ser claro, no imitar un acento específico. Dejar propina del 15-20% en restaurantes de EE.UU. es estándar. Las expresiones coloquiales como 'no worries', 'sounds good' y 'by the way' son el verdadero inglés del día a día. En EE.UU., no dejar propina puede ofender seriamente al mesero, ya que los meseros dependen de ella como parte principal de su ingreso.",
   },
   {
     id: "jp-viajeros",
     title: "Japonés Básico para Viajeros",
     langId: "ja", langName: "Japonés", flag: "🇯🇵",
     level: "Básico", tag: "free",
     cover: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)",
     duration: "6 semanas",
     desc: "Frases esenciales para disfrutar tu primer viaje a Japón: transporte, comida y cortesía. Aprende las fórmulas mágicas que todo visitante debe conocer.",
     syllabus: ["Módulo 1 · Saludos y cortesía", "Módulo 2 · Moverte por la ciudad", "Módulo 3 · Comer y comprar", "Módulo 4 · Uso real y cultura"],
     modules: [
       { 
         title: "Módulo 1 · Saludos y cortesía", 
         summary: "Los saludos cambian según la hora y el nivel de respeto. La primera impresión cuenta mucho en Japón.", 
         points: [
           "おはよう (mañana), こんにちは (tarde), こんばんは (noche).",
           "すみません sirve para llamar la atención con respeto o pedir disculpas.",
           "La partícula は (wa) marca el tema de la oración.",
           "Inclinarse ligeramente (ojigi) es importante al saludar a desconocidos."
         ] 
       },
       { 
         title: "Módulo 2 · Moverte por la ciudad", 
         summary: "Preguntar direcciones y usar el transporte público. Navegar por ciudades japonesas es más fácil con estas frases.", 
         points: [
           "「えきはどこですか» ¿Dónde está la estación?",
           "Contar estaciones con ひとつ、ふたつ、みっつ.",
           "El tren es silencioso: evita hablar por teléfono.",
           "Los botones de las puertas de los trenes tienen símbolos, no letras."
         ] 
       },
       { 
         title: "Módulo 3 · Comer y comprar", 
         summary: "Pedido en un restaurante y comprar sin malentendidos. La cultura de comer en Japón es única.", 
         points: [
           "「おねがいします」 al pedir o llamar al mesero.",
           "「いくらですか» ¿cuánto cuesta?",
           "Pagar en la caja, no en la mesa: es lo habitual.",
           "Escribir tu nombre en kanji en un mostrador puede ofender."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "こんにちは", romaji: "Konnichiwa", meaning: 'Hola / Buenas tardes', lang: "ja-JP" },
       { term: "ありがとう", romaji: "Arigatou", meaning: "Gracias", lang: "ja-JP" },
       { term: "すみません", romaji: "Sumimasen", meaning: "Disculpe / Perdón", lang: "ja-JP" },
       { term: "えきはどこですか", romaji: "Eki wa doko desu ka", meaning: "¿Dónde está la estación?", lang: "ja-JP" },
       { term: "いくらですか", romaji: "Ikura desu ka", meaning: "¿Cuánto cuesta?", lang: "ja-JP" },
       { term: "おねがいします", romaji: "Onegaishimasu", meaning: "Por favor (al pedir algo)", lang: "ja-JP" },
       { term: "たすけてください", romaji: "Tasukete kudasai", meaning: "Ayúdeme, por favor", lang: "ja-JP" },
       { term: "トイレ", romaji: "Toire", meaning: "Baño", lang: "ja-JP" },
       { term: "いくら", romaji: "Ikura", meaning: "¿Cuánto?", lang: "ja-JP" },
       { term: "マック", romaji: "Makkusu", meaning: "McDonald's", lang: "ja-JP" },
       { term: "コーヒー", romaji: "Koohii", meaning: "Café", lang: "ja-JP" },
       { term: "ビール", romaji: "Biru", meaning: "Cerveza", lang: "ja-JP" },
     ],
     dialogue: [
       { who: "Viajero", line: "すみません、えきはどこですか。", tr: "Disculpe, ¿dónde está la estación?" },
       { who: "Local", line: "まっすぐです。みぎです。", tr: "Todo recto. A la derecha." },
       { who: "Viajero", line: "ありがとうございます！", tr: "¡Muchas gracias!" },
       { who: "Local", line: "いいえ、どういたしまして。", tr: "No, de nada." },
       { who: "Viajero", line: "おねがいします。", tr: "Por favor." },
       { who: "Local", line: "はい、こちらです。", tr: "Sí, aquí tiene." },
     ],
     cultural: "En Japón la cortesía es parte del idioma: inclinarse ligeramente al saludar (お辞儀, ojigi) es tan importante como las palabras. Evita hablar en el tren, se considera de mala educación, y un pequeño «すみません» abre más puertas que cualquier frase larga. El concepto de «omotenomi» (hospitalidad japonesa) significa que el servicio es proactivo y atento. Los restaurantes suelen ofrecer toallas húmedas (oshibori) antes de comer.",
   },
   {
     id: "ko-kdramas",
     title: "Coreano con K-Dramas",
     langId: "ko", langName: "Coreano", flag: "🇰🇷",
     level: "Básico", tag: "free",
     cover: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
     duration: "6 semanas",
     desc: "Aprende coreano real con las frases más repetidas en los dramas: emociones, comida y vida cotidiana. Conviértete en fan de los dramas sin necesidad de subtítulos.",
     syllabus: ["Módulo 1 · Hangul y saludos", "Módulo 2 · Emociones de drama", "Módulo 3 · Comida y vida diaria"],
     modules: [
       { 
         title: "Módulo 1 · Hangul y saludos", 
         summary: "Leer 한글 en pocas horas y saludar correctamente. El alfabeto fonético más lógico del mundo.", 
         points: [
           "El Hangul es un silabario: letras = sonidos, no ideas.",
           "안녕하세요 es el saludo universal cortés.",
           "감사합니다 para agradecer de forma formal.",
           "Cada bloque de letras tiene 2-3 consonantes y 1-2 vocales."
         ] 
       },
       { 
         title: "Módulo 2 · Emociones de drama", 
         summary: "Las expresiones que escucharás una y otra vez en cualquier drama coreano.", 
         points: [
           "대박 (daebak) expresa sorpresa positiva o algo enorme.",
           "진짜? (jinjja) equivale a «¿en serio?».",
           "화이팅 (hwaiting) es «¡ánimo!» - animar a alguien.",
           "아야 (aya) = ¡ay! duele."
         ] 
       },
       { 
         title: "Módulo 3 · Comida y vida diaria", 
         summary: "Comer, pedir y describir lo cotidiano. Vocabulario esencial para sobrevivir.", 
         points: [
           "맛있어요: está delicioso.",
           "배고파요: tengo hambre.",
           "El verbo va al final: «저는 밥을 먹어요».",
           "Los coreanos suelen decir «맛있어요» antes de empezar a comer."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "안녕하세요", romaji: "Annyeonghaseyo", meaning: "Hola (cortés)", lang: "ko-KR" },
       { term: "고마워요", romaji: "Gomawoyo", meaning: "Gracias", lang: "ko-KR" },
       { term: "대박", romaji: "Daebak", meaning: "¡Increíble! / ¡Genial!", lang: "ko-KR" },
       { term: "진짜?", romaji: "Jinjja?", meaning: "¿En serio?", lang: "ko-KR" },
       { term: "맛있어요", romaji: "Masiisseoyo", meaning: "Está delicioso", lang: "ko-KR" },
       { term: "화이팅", romaji: "Hwaiting", meaning: "¡Ánimo! / ¡Tú puedes!", lang: "ko-KR" },
       { term: "사랑해요", romaji: "Saranghaeyo", meaning: "Te quiero", lang: "ko-KR" },
       { term: "사과", romaji: "Sagwa", meaning: "Manzana", lang: "ko-KR" },
       { term: "물", romaji: "Mul", meaning: "Agua", lang: "ko-KR" },
       { term: "밥", romaji: "Bap", meaning: "Arroz / Comida", lang: "ko-KR" },
       { term: "시간", romaji: "Sigan", meaning: "Tiempo", lang: "ko-KR" },
       { term: "어디", romaji: "Eodi", meaning: "¿Dónde?", lang: "ko-KR" },
     ],
     dialogue: [
       { who: "Minji", line: "오늘 뭐 먹을래요?", tr: "¿Qué queremos comer hoy?" },
       { who: "Junho", line: "김치찌개 어때요? 맛있어요!", tr: "¿Qué tal el kimchi jjigae? ¡Está delicioso!" },
       { who: "Minji", line: "대박! 좋아요.", tr: "¡Genial! De acuerdo." },
       { who: "Junho", line: "화이팅!", tr: "¡Ánimo!" },
       { who: "Minji", line: "사랑해요", tr: "Te quiero." },
       { who: "Junho", line: "어디가?", tr: "¿A dónde?" },
     ],
     cultural: "El coreano refleja la jerarquía social: se usa lenguaje honorífico con mayores y desconocidos. Por eso en los dramas el tono cambia cuando los personajes se hacen cercanos. La edad es tan importante que la primera pregunta suele ser «¿cuántos años tienes?» para elegir el nivel de habla. En Corea, el grupo prevalece sobre el individuo y el respeto por la edad estructura casi toda interacción. El «nunchi» —leer el ambiente social— es una habilidad muy valorada.",
   },
   {
     id: "fr-primeros-pasos",
     title: "Francés: Primeros Pasos",
     langId: "fr", langName: "Francés", flag: "🇫🇷",
     level: "Básico", tag: "free",
     cover: "linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)",
     duration: "6 semanas",
     desc: "Empieza desde cero con el saludo, los números y las frases que usarás todos los días en Francia. El francés es un idioma de elegancia y sutileza.",
     syllabus: ["Módulo 1 · Saludos y cortesía", "Módulo 2 · Números y compras", "Módulo 3 · Presentarte", "Módulo 4 · Uso real y cultura"],
     modules: [
       { 
         title: "Módulo 1 · Saludos y cortesía", 
         summary: "El «bonjour» como llave social y las fórmulas de cortesía. La base de cualquier interacción en Francia.", 
         points: [
           "Bonjour (día) vs. Bonsoir (noche).",
           "S'il vous plaît y merci, imprescindibles.",
           "«Tu» vs. «vous»: informal y formal. Usa «vous» con desconocidos siempre.",
           "En Francia, no saludar con bonjour es casi un insulto."
         ] 
       },
       { 
         title: "Módulo 2 · Números y compras", 
         summary: "Contar, preguntar precios y pagar. Cuidado con los números irregulares (70 = soixante-dix).", 
         points: [
           "Los números del 1 al 20 y sus trampas (70 = soixante-dix, 80 = quatre-vingts).",
           "«Combien ça coûte ?» ¿cuánto cuesta?",
           "«Je voudrais…» pido con cortesía.",
           "En los mercados franceses se regatea poco, los precios son fijos."
         ] 
       },
       { 
         title: "Módulo 3 · Presentarte", 
         summary: "Hablar de ti: nombre, origen y gustos básicos. La introducción social en francés.", 
         points: [
           "«Je m'appelle…» me llamo…",
           "«J'habite à…» vivo en…",
           "«J'aime / Je n'aime pas» me gusta / no me gusta.",
           "Los franceses valoran la educación: siempre empieza con bonjour."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "Bonjour", romaji: "/bɔ̃.ʒuʁ/", meaning: "Hola / Buenos días", lang: "fr-FR" },
       { term: "S'il vous plaît", romaji: "/sil vu plɛ/", meaning: "Por favor", lang: "fr-FR" },
       { term: "Merci beaucoup", romaji: "/mɛʁ.si bo.ku/", meaning: "Muchas gracias", lang: "fr-FR" },
       { term: "Je m'appelle…", romaji: "/ʒə ma.pɛl/", meaning: "Me llamo…", lang: "fr-FR" },
       { term: "Combien ça coûte ?", romaji: "/kɔ̃.bjɛ̃ sa kut/", meaning: "¿Cuánto cuesta?", lang: "fr-FR" },
       { term: "Je voudrais…", romaji: "/ʒə vu.dʁɛ/", meaning: "Quisiera…", lang: "fr-FR" },
       { term: "Au revoir", romaji: "/o ʁə.vwaʁ/", meaning: "Adiós", lang: "fr-FR" },
       { term: "Quelle heure est-il ?", romaji: "/kɛlœʁ‿e.til/", meaning: "¿Qué hora es?", lang: "fr-FR" },
       { term: "Quel beau temps !", romaji: "/kɛl bon tɑ̃/", meaning: "¡Qué buen tiempo!", lang: "fr-FR" },
       { term: "Pardon", romaji: "/paʁdɔ̃/", meaning: "Disculpe", lang: "fr-FR" },
       { term: "Excusez-moi", romaji: "/ɛk.syz.mwa/", meaning: "Con permiso / Lo siento", lang: "fr-FR" },
       { term: "Bonne nuit", romaji: "/bɔn.nɥi/", meaning: "Buenas noches", lang: "fr-FR" },
     ],
     dialogue: [
       { who: "Cliente", line: "Bonjour ! Je voudrais un café, s'il vous plaît.", tr: "¡Hola! Quisiera un café, por favor." },
       { who: "Camarero", line: "Très bien. Et avec ça ?", tr: "Muy bien. ¿Y algo más?" },
       { who: "Cliente", line: "Non, merci. Combien ça coûte ?", tr: "No, gracias. ¿Cuánto cuesta?" },
       { who: "Camarero", line: "Deux euros. Bonne journée !", tr: "Dos euros. ¡Buen día!" },
       { who: "Cliente", line: "Au revoir, merci pour tout.", tr: "Adiós, gracias por todo." },
       { who: "Camarero", line: "À bientôt !", tr: "¡Hasta pronto!" },
     ],
     cultural: "En Francia, entrar a una tienda sin decir «bonjour» se considera descortés: el saludo es obligatorio antes de cualquier petición. Las comidas son un ritual social lento, no una pausa rápida, y el «bon appétit» antes de comer es casi sagrado. El «vous» de respeto se mantiene con desconocidos toda la vida, incluso después de años de conocerlos. El francés tiene muchas excepciones ortográficas que solo se aprenden con la práctica.",
   },
   {
     id: "nah-raices",
     title: "Náhuatl: Raíces Vivas",
     langId: "nah", langName: "Náhuatl", flag: "🇲🇽",
     level: "Cultura", tag: "free",
     cover: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
     duration: "5 semanas",
     desc: "Descubre la lengua originaria que sigue viva en México y que prestó cientos de palabras al español. Conecta tu español con sus raíces mesoamericanas.",
     syllabus: ["Módulo 1 · Saludos y sonidos", "Módulo 2 · Palabras que ya usas", "Módulo 3 · Cosmovisión y cultura", "Módulo 4 · Uso real y cultura"],
     modules: [
       { 
         title: "Módulo 1 · Saludos y sonidos", 
         summary: "Los sonidos «tl» y «tz», marca sonora del náhuatl. El sistema fonético único.", 
         points: [
           "«tl» y «tz» son un solo sonido, no dos letras.",
           "Niltze (hola) y Tlazohcamati (gracias).",
           "El acento recae casi siempre en la penúltima sílaba.",
           "Las consonantes dobles se pronuncian con duración simple."
         ] 
       },
       { 
         title: "Módulo 2 · Palabras que ya usas", 
         summary: "Descubre el náhuatl escondido en el español cotidiano. Más de 200 palabras de origen náhuatl.", 
         points: [
           "Chocolate ← xocolatl.",
           "Aguacate ← ahuacatl.",
           "Tomate ← tomatl.",
           "Cenote ← tzonotl.",
           "Otomí ← otomi (grupo étnico)."
         ] 
       },
       { 
         title: "Módulo 3 · Cosmovisión y cultura", 
         summary: "El idioma como forma de ver el mundo. La filosofía náhuatl en pocas palabras.", 
         points: [
           "Muchos sustantivos llevan sufijos de respeto.",
           "El náhuatl usa reduplicación para dar intensidad (e.g., cacahuautl → cacahuatl).",
           "Existen 30+ variantes regionales vivas.",
           "La cosmovisión náhuatl ve la naturaleza como viva y participante."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "Niltze", romaji: "nil-tze", meaning: "Hola", lang: "nah", fallback: "es-MX" },
       { term: "Tlazohcamati", romaji: "tla-zoh-ca-ma-ti", meaning: "Gracias", lang: "nah", fallback: "es-MX" },
       { term: "Cualli tonalli", romaji: "cua-lli to-nal-li", meaning: "Buenos días", lang: "nah", fallback: "es-MX" },
       { term: "Xocolatl", romaji: "sho-ko-latl", meaning: "Chocolate", lang: "nah", fallback: "es-MX" },
       { term: "Ahuacatl", romaji: "a-hua-catl", meaning: "Aguacate", lang: "nah", fallback: "es-MX" },
       { term: "Tlalli", romaji: "tla-lli", meaning: "Tierra", lang: "nah", fallback: "es-MX" },
       { term: "Café", romaji: "ka-fe", meaning: "Café", lang: "nah", fallback: "es-MX" },
       { term: "Metl", romaji: "metl", meaning: "Maguey / Agave", lang: "nah", fallback: "es-MX" },
       { term: "Metzontli", romaji: "me-tzon-tli", meaning: "Cielo", lang: "nah", fallback: "es-MX" },
       { term: "Cenotl", romaji: "se-no-tl", meaning: "Ceniza", lang: "nah", fallback: "es-MX" },
     ],
     dialogue: [
       { who: "Tlamatini", line: "Niltze! ¿Quen tinemi?", tr: "¡Hola! ¿Cómo estás?" },
       { who: "Estudiante", line: "Cualli, tlazohcamati.", tr: "Bien, gracias." },
       { who: "Tlamatini", line: "¿Ticnequi xocolatl?", tr: "¿Quieres chocolate?" },
       { who: "Estudiante", line: "Quema, tlazohcamati!", tr: "¡Sí, gracias!" },
       { who: "Tlamatini", line: "Tlen nican tlahtoani. Macehualtikeh.", tr: "Somos personas. Todos somos gente." },
     ],
     cultural: "El náhuatl sigue vivo: alrededor de 1,7 millones de personas lo hablan en México, con variantes tan distintas entre sí como los dialectos del árabe. Muchas palabras del español provienen de aquí, y aprenderlas reconecta el idioma cotidiano con su raíz mesoamericana. El náhuatl clásico se sigue estudiando en universidades y en programas de revitalización comunitaria. Saber el origen de palabras como chocolate o tomate cambia la forma en que ves la comida cotidiana.",
   },

   /* ------------------------------- PRO (10) ------------------------------ */
   {
     id: "en-negocios",
     title: "Inglés de Negocios",
     langId: "en", langName: "Inglés", flag: "🇬🇧",
     level: "Intermedio", tag: "pro",
     cover: "linear-gradient(135deg, #CFFAFE 0%, #A5F3FC 100%)",
     duration: "8 semanas",
     desc: "Correos, reuniones y presentaciones: el inglés profesional que realmente se usa en la oficina. Este curso te prepara para el entorno laboral anglosajón.",
     syllabus: ["Módulo 1 · Correos profesionales", "Módulo 2 · Reuniones y negociación", "Módulo 3 · Presentaciones y reportes"],
     modules: [
       { 
         title: "Módulo 1 · Correos profesionales", 
         summary: "Estructura de un correo claro, breve y accionable. La comunicación escrita en entornos corporativos.", 
         points: [
           "Asunto específico y una sola petición por mensaje.",
           "«I'm writing to…» abre con propósito.",
           "Cierra con «Let me know if that works».",
           "Los correos corporativos deben ser escaneables en 30 segundos."
         ] 
       },
       { 
         title: "Módulo 2 · Reuniones y negociación", 
         summary: "Intervenir, discrepar y acordar sin sonar agresivo. Habilidades de reunión en inglés.", 
         points: [
           "«Could I add something here?» para intervenir.",
           "«I see your point, however…» para discrepar.",
           "«Let's circle back» para posponer un tema.",
           "En reuniones virtuales, se usa «Can you hear me?» para verificar."
         ] 
       },
       { 
         title: "Módulo 3 · Presentaciones y reportes", 
         summary: "Exponer datos y recomendaciones con seguridad. Hablar en público en inglés.", 
         points: [
           "«My recommendation would be to…».",
           "«The bottom line is…» para cerrar con impacto.",
           "«Question?» abre turno de preguntas.",
           "Usa visuales claros: un solo concepto por slide."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "Deadline", romaji: "/ˈdedlaɪn/", meaning: "Fecha límite", lang: "en-US" },
       { term: "To follow up", romaji: "/ˈfɒloʊ ʌp/", meaning: "Dar seguimiento", lang: "en-US" },
       { term: "Stakeholder", romaji: "/ˈsteɪkhoʊldər/", meaning: "Parte interesada", lang: "en-US" },
       { term: "To touch base", romaji: "/tʌtʃ beɪs/", meaning: "Ponerse en contacto brevemente", lang: "en-US" },
       { term: "Bottom line", romaji: "/ˈbɒtəm laɪn/", meaning: "Lo esencial / La conclusión", lang: "en-US" },
       { term: "To circle back", romaji: "/ˈsɜːrkəl bæk/", meaning: "Retomar un tema después", lang: "en-US" },
       { term: "Scope", romaji: "/skoʊp/", meaning: "Alcance (de un proyecto)", lang: "en-US" },
       { term: "Agenda", romaji: "/ˈændʒə/", meaning: "Orden del día", lang: "en-US" },
       { term: "Minutes", romaji: "/ˈmɪnɪts/", meaning: "Actas de la reunión", lang: "en-US" },
       { term: "Agreement", romaji: "/əˈɡriːdmənt/", meaning: "Acuerdo", lang: "en-US" },
       { term: "Disagreement", romaji: "/ˌdɪsəˈɡriːdmənt/", meaning: "Desacuerdo", lang: "en-US" },
       { term: "Urgent", romaji: "/ˈɜːrdʒənt/", meaning: "Urgente", lang: "en-US" },
     ],
     dialogue: [
       { who: "Ana", line: "I'm writing to follow up on the proposal.", tr: "Escribo para dar seguimiento a la propuesta." },
       { who: "Ben", line: "Thanks! The bottom line is we need more time.", tr: "¡Gracias! En resumen, necesitamos más tiempo." },
       { who: "Ana", line: "Could I add something here? Let's adjust the scope.", tr: "¿Puedo añadir algo? Ajustemos el alcance." },
       { who: "Ben", line: "That works. I'll send the new deadline today.", tr: "Funciona. Envío hoy la nueva fecha límite." },
       { who: "Ana", line: "Let's circle back to the budget issue next week.", tr: "Retomemos el tema del presupuesto la próxima semana." },
       { who: "Ben", line: "Agreed. I'll send a summary by Friday.", tr: "De acuerdo. Enviaré un resumen el viernes." },
     ],
     cultural: "En la cultura de negocios anglosajona se valora la puntualidad y la claridad directa: un «no» sin rodeos no es grosero, es eficiencia. Los correos tienden a ser breves y con una sola petición por mensaje, y se espera respuesta el mismo día hábil o al siguiente. La pequeña talk al inicio de reuniones rompe el hielo y establece rapport. Los títulos profesionales (Mr., Mrs., Dr.) se usan hasta que se establece la camaradería.",
   },
   {
     id: "en-pronunciacion",
     title: "Pronunciación Nativa en Inglés",
     langId: "en", langName: "Inglés", flag: "🇬🇧",
     level: "Intermedio", tag: "pro",
     cover: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
     duration: "6 semanas",
     desc: "Suena natural: fonética, ritmo, entonación y los sonidos que más cuesta distinguir desde el español. Domina la 'th', la reducción vocálica y la entonación de preguntas.",
     syllabus: ["Módulo 1 · Sonidos que no existen en español", "Módulo 2 · Ritmo y reducción vocálica", "Módulo 3 · Entonación y fluidez"],
     modules: [
       { 
         title: "Módulo 1 · Sonidos que no existen en español", 
         summary: "La «th», la /v/ y la /b/, y la «r» americana. Los fonéticos básicos para hispanohablantes.", 
         points: [
           "/θ/ y /ð/: lengua entre los dientes, sin vibración.",
           "La /v/ roza con los dientes; la /b/ no toca los dientes.",
           "La «r» americana se hace sin tocar el paladar, es una vibración retrofleja.",
           "Ejemplos: «think», «this», «river», «buy»."
         ] 
       },
       { 
         title: "Módulo 2 · Ritmo y reducción vocálica", 
         summary: "Por qué el inglés suena «comprimido». El inglés es stress-timed: acentúa y reduce.", 
         points: [
           "El inglés es stress-timed: acentúa y reduce las sílabas no tónicas.",
           "La schwa /ə/ aparece en sílabas débiles: 'about' suena /əˈbaʊt/.",
           "«Comfortable» se dice /ˈkʌmftəbl/, no como se escribe.",
           "Las palabras funcionales se reducen: 'and' → /ənd/, 'to' → /tə/."
         ] 
       },
       { 
         title: "Módulo 3 · Entonación y fluidez", 
         summary: "Subir y bajar la voz para sonar natural. Patrones de entonación en inglés.", 
         points: [
           "Preguntas de sí/no suben al final.",
           "Preguntas «wh-» bajan al final (what, where, when).",
           "Enlaza palabras: 'an_apple' suena /əˈnæpəl/.",
           "La entonación cambia el significado: ¿Really? vs. really!"
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "Through", romaji: "/θruː/", meaning: "A través de", lang: "en-US" },
       { term: "Thought", romaji: "/θɔːt/", meaning: "Pensamiento / Pensé", lang: "en-US" },
       { term: "Squirrel", romaji: "/ˈskwɪrəl/", meaning: "Ardilla", lang: "en-US" },
       { term: "Comfortable", romaji: "/ˈkʌmftəbl/", meaning: "Cómodo", lang: "en-US" },
       { term: "Schedule", romaji: "/ˈskedʒuːl/", meaning: "Horario", lang: "en-US" },
       { term: "Thorough", romaji: "/ˈθʌroʊ/", meaning: "Exhaustivo / Minucioso", lang: "en-US" },
       { term: "Rural", romaji: "/ˈrʊrəl/", meaning: "Rural", lang: "en-US" },
       { term: "Although", romaji: "/əˈlaʊθ/", meaning: "Aunque", lang: "en-US" },
       { term: "Enough", romaji: "/ɪˈnʌf/", meaning: "Suficiente", lang: "en-US" },
       { term: "Promise", romaji: "/ˈprɒmiːs/", meaning: "Prometer", lang: "en-US" },
       { term: "Variety", romaji: "/vəˈraɪəti/", meaning: "Variedad", lang: "en-US" },
     ],
     dialogue: [
       { who: "Coach", line: "Say «thought», not «fought».", tr: "Di «thought», no «fought»." },
       { who: "Alumno", line: "Thought… that's hard!", tr: "Thought… ¡qué difícil!" },
       { who: "Coach", line: "Great! Now «thorough» and «through».", tr: "¡Muy bien! Ahora «thorough» y «through»." },
       { who: "Alumno", line: "I'm getting comfortable with it.", tr: "Me estoy sintiendo cómodo con esto." },
       { who: "Coach", line: "Perfect! You're using the schwa correctly.", tr: "¡Perfecto! Estás usando la schwa correctamente." },
       { who: "Alumno", line: "Thanks! I feel more confident now.", tr: "¡Gracias! Me siento más confiado ahora." },
     ],
     cultural: "Existen muchísimos acentos nativos válidos: británico, estadounidense, australiano, irlandés… El objetivo no es borrar tu acento, sino ser claro y seguro. Como el inglés global se habla sobre todo entre personas no nativas, la inteligibilidad importa más que imitar un acento concreto. La pronunciación «Received Pronunciation» (RP) es solo uno de muchos acentos válidos. Los speakers no nativos suelen ser más comprensibles entre sí que los nativos de acentos fuertes.",
   },
   {
     id: "jp-gramatica",
     title: "Gramática Japonesa Avanzada",
     langId: "ja", langName: "Japonés", flag: "🇯🇵",
     level: "Avanzado", tag: "pro",
     cover: "linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)",
     duration: "10 semanas",
     desc: "Estructuras avanzadas, keigo (lenguaje honorífico) y matices que separan al estudiante del hablante fluido. Para quienes ya dominan lo básico y quieren sonar natural.",
     syllabus: ["Módulo 1 · Voz pasiva y causativa", "Módulo 2 · Keigo: los tres registros", "Módulo 3 · Matices y conectores"],
     modules: [
       { 
         title: "Módulo 1 · Voz pasiva y causativa", 
         summary: "Cómo cambia el matiz según la estructura verbal. Gramática avanzada para expresar acciones sobre otros.", 
         points: [
           "La pasiva puede expresar cortesía o molestia: \"食べられる\" (taberareru).",
           "Causativa: hacer que alguien haga algo:「〜させる».",
           "「〜てしまう»: terminar por completo o sin querer.",
           "「〜られる»: forma pasiva respetuosa o forma casual pasiva."
         ] 
       },
       { 
         title: "Módulo 2 · Keigo: los tres registros", 
         summary: "尊敬語, 謙譲語 y 丁寧語 en contexto laboral y social. El arte de la cortesía japonesa.", 
         points: [
           "尊敬語 eleva al interlocutor: oir verbos con honoríficos.",
           "謙譲語 humilla al hablante para respetar: humildad extrema.",
           "丁寧語 es el registro cortés neutro: el japonés educado estándar.",
           "Keigo es tan importante que los empleados lo entrenan continuamente."
         ] 
       },
       { 
         title: "Módulo 3 · Matices y conectores", 
         summary: "Matizar, contrastar y expresar condición. El japonés sutil y sus matices.", 
         points: [
           "「〜わけではない»: no es que necesariamente…",
           "「〜ながら»: mientras hace algo.",
           "「〜ので» vs. «〜から»: causa suave y causa fuerte.",
           "「というもの»: así es como las cosas son, expresión de sabiduría."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "いらっしゃいます", romaji: "Irasshaimasu", meaning: "Estar / Ir (respetuoso)", lang: "ja-JP" },
       { term: "いただきます", romaji: "Itadakimasu", meaning: "Recibir (humilde) / Buen provecho", lang: "ja-JP" },
       { term: "〜てしまいます", romaji: "-te shimaimasu", meaning: "Terminar por completo / Sin querer", lang: "ja-JP" },
       { term: "おそれいります", romaji: "Osoreirimasu", meaning: "Disculpe la molestia (muy formal)", lang: "ja-JP" },
       { term: "わけではない", romaji: "wake de wa nai", meaning: "No es que necesariamente…", lang: "ja-JP" },
       { term: "〜ながら", romaji: "-nagara", meaning: "Mientras (hace dos cosas a la vez)", lang: "ja-JP" },
       { term: "かしこまりました", romaji: "Kashikomarimashita", meaning: "Entendido (muy formal)", lang: "ja-JP" },
       { term: "ご覧になる", romaji: "Goran naru", meaning: "Ver (respeto)", lang: "ja-JP" },
       { term: "申し上げます", romaji: "Mashiagemasu", meaning: "Decir (formal)", lang: "ja-JP" },
       { term: "差し上げます", romaji: "Sashiagemasu", meaning: "Dar (formal)", lang: "ja-JP" },
     ],
     dialogue: [
       { who: "Cliente", line: "担当の方はいらっしゃいますか。", tr: "¿Está el responsable?" },
       { who: "Empleado", line: "はい、かしこまりました。少々お待ちください。", tr: "Sí, entendido. Un momento, por favor." },
       { who: "Cliente", line: "おそれいります。", tr: "Disculpe la molestia." },
       { who: "Empleado", line: "いいえ、とんでもございません。", tr: "No, de ninguna manera." },
       { who: "Cliente", line: "ご報告がございます。", tr: "Tengo un informe que dar." },
       { who: "Empleado", line: "承りました。", tr: "Entendido, tomaré nota." },
     ],
     cultural: "El keigo no es solo vocabulario: refleja la armonía grupal (和, wa). En una empresa japonesa, el empleado usa lenguaje humilde para sí mismo y respetuoso hacia el cliente o el jefe. Dominarlo es señal de madurez profesional y abre puertas en el ámbito laboral. El uso incorrecto de keigo puede crear distanciamiento social grave. Los estudiantes extranjeros que dominan keigo son muy respetados en el ámbito laboral japonés.",
   },
   {
     id: "ko-cultura",
     title: "Corea: Etiqueta y Sociedad",
     langId: "ko", langName: "Coreano", flag: "🇰🇷",
     level: "Cultura", tag: "pro",
     cover: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)",
     duration: "5 semanas",
     desc: "Entiende el «por qué» detrás del idioma: jerarquía, nunchi, comida compartida y etiqueta social. Para comprender la mente coreana a través de su lenguaje.",
     syllabus: ["Módulo 1 · Jerarquía y niveles de habla", "Módulo 2 · Nunchi y vida social", "Módulo 3 · Mesa, comida y respeto"],
     modules: [
       { 
         title: "Módulo 1 · Jerarquía y niveles de habla", 
         summary: "Por qué el verbo cambia según con quién hablas. La jerarquía es absoluta en coreano.", 
         points: [
           "반말 (informal) vs. 존댓말 (formal).",
           "La edad define el nivel desde el primer minuto.",
           "Los títulos (선배, 후배) sustituyen al nombre.",
           "Usar el nombre propio sin título es íntimo o irrespetuoso."
         ] 
       },
       { 
         title: "Módulo 2 · Nunchi y vida social", 
         summary: "El arte de leer el ambiente sin palabras. La habilidad social coreana por excelencia.", 
         points: [
           "눈치 = captar lo que otros sienten sin que lo digan.",
           "Se evita contradecir a un mayor en público.",
           "El grupo pesa más que la opinión individual.",
           "Los coreanos suelen preguntar «눈치 채셨나요?» ¿Se dieron cuenta?"
         ] 
       },
       { 
         title: "Módulo 3 · Mesa, comida y respeto", 
         summary: "Reglas al comer y brindar. La cultura de la comida coreana es profunda.", 
         points: [
           "Se espera a que el mayor empiece a comer.",
           "Servir y recibir con ambas manos.",
           "Al brindar se gira la cara; se dice «건배».",
           "Los colores de la comida deben ser cinco (piedra, madera, fuego, agua, tierra)."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "선배", romaji: "Seonbae", meaning: "Mayor / Compañero con más experiencia", lang: "ko-KR" },
       { term: "후배", romaji: "Hubae", meaning: "Menor / Compañero con menos experiencia", lang: "ko-KR" },
       { term: "눈치", romaji: "Nunchi", meaning: "Leer el ambiente social", lang: "ko-KR" },
       { term: "존댓말", romaji: "Jondaenmal", meaning: "Lenguaje formal / Cortés", lang: "ko-KR" },
       { term: "건배", romaji: "Geonbae", meaning: "¡Salud! (brindis)", lang: "ko-KR" },
       { term: "잘 먹겠습니다", romaji: "Jal meokgesseumnida", meaning: "Voy a comer bien (antes de comer)", lang: "ko-KR" },
       { term: "수고하셨습니다", romaji: "Sugohasyeotseumnida", meaning: "Gracias por tu esfuerzo", lang: "ko-KR" },
       { term: "죄송합니다", romaji: "Joesonghamnida", meaning: "Lo siento / Discúlpeme", lang: "ko-KR" },
       { term: "미안합니다", romaji: "Mianhamnida", meaning: "Siento mucho", lang: "ko-KR" },
       { term: "아니에요", romaji: "Aniieyo", meaning: "No pasa nada / De nada", lang: "ko-KR" },
     ],
     dialogue: [
       { who: "Seonbae", line: "먼저 드세요.", tr: "Coma usted primero." },
       { who: "Hubae", line: "감사합니다. 잘 먹겠습니다!", tr: "Gracias. ¡Voy a comer bien!" },
       { who: "Seonbae", line: "건배!", tr: "¡Salud!" },
       { who: "Hubae", line: "수고하셨습니다, 선배님.", tr: "Gracias por su esfuerzo, seonbae." },
       { who: "Seonbae", line: "오늘은 휴일입니다.", tr: "Hoy es día de descanso." },
       { who: "Hubae", line: "편히 주무세요.", tr: "Descansen bien." },
     ],
     cultural: "En Corea el grupo prevalece sobre el individuo y el respeto por la edad estructura casi toda interacción. El «nunchi» —leer el ambiente— es una habilidad social muy valorada, y comentar el esfuerzo ajeno («수고하셨습니다») es una cortesía cotidiana en el trabajo. Las fiestas de empresa (회식, hoesik) son importantes para el bonding del equipo, aunque pueden ser intensas. Regalar algo con ambas manos es la forma correcta de entregar objetos en contextos formales.",
   },
   {
     id: "fr-conversacion",
     title: "Francés Conversacional",
     langId: "fr", langName: "Francés", flag: "🇫🇷",
     level: "Conversación", tag: "pro",
     cover: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
     duration: "8 semanas",
     desc: "Habla francés con naturalidad: expresiones de la vida diaria, música y encuentros sociales. Suena como un nativo en situaciones reales.",
     syllabus: ["Módulo 1 · El francés que se habla", "Módulo 2 · Expresiones del día a día", "Módulo 3 · Conversar y quedar"],
     modules: [
       { 
         title: "Módulo 1 · El francés que se habla", 
         summary: "Contracciones y sonidos que no aparecen en los libros. El francés real de la calle.", 
         points: [
           "Se omite el «ne»: «Je sais pas».",
           "La liaison une palabras: «vous_avez».",
           "La entonación ascendente convierte en pregunta.",
           "En francés coloquial, «quoi» al final significa ¿qué? o ¡vaya!"
         ] 
       },
       { 
         title: "Módulo 2 · Expresiones del día a día", 
         summary: "Modismos que suenan naturales y que todo francófono usa.", 
         points: [
           "«Ça marche» = de acuerdo.",
           "«Nickel» = perfecto / impecable.",
           "«C'est pas grave» = no pasa nada.",
           "«Bof» = indiferencia con encogimiento de hombros."
         ] 
       },
       { 
         title: "Módulo 3 · Conversar y quedar", 
         summary: "Quedar con alguien e invitar. Las frases románticas y sociales del francés.", 
         points: [
           "«On se voit demain ?» ¿nos vemos mañana?",
           "«Ça te dit ?» ¿te apetece?",
           "«Bonne journée !» al despedirse.",
           "Los franceses valoran el «bonjour» como puerta de entrada."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "Ça marche", romaji: "/sa maʁʃ/", meaning: "De acuerdo / Funciona", lang: "fr-FR" },
       { term: "Nickel", romaji: "/ni.kɛl/", meaning: "Perfecto / Impecable", lang: "fr-FR" },
       { term: "Tu vois ?", romaji: "/ty vwa/", meaning: "¿Ves? / ¿Entiendes?", lang: "fr-FR" },
       { term: "C'est pas grave", romaji: "/sɛ pa ɡʁav/", meaning: "No pasa nada", lang: "fr-FR" },
       { term: "Bon appétit", romaji: "/bɔ̃n‿a.pe.ti/", meaning: "¡Buen provecho!", lang: "fr-FR" },
       { term: "Ça te dit ?", romaji: "/sa tə di/", meaning: "¿Te apetece?", lang: "fr-FR" },
       { term: "On se voit demain ?", romaji: "/ɔ̃ sə vwa də.mɛ̃/", meaning: "¿Nos vemos mañana?", lang: "fr-FR" },
       { term: "Quelle soirée !", romaji: "/kɛl sɔi.eʁ/", meaning: "¡Qué noche más!", lang: "fr-FR" },
       { term: "Rien de spécial", romaji: "/ʁjɛn də spé.sjal/", meaning: "Nada especial", lang: "fr-FR" },
       { term: "De rien", romaji: "/də ʁjɛn/", meaning: "De nada", lang: "fr-FR" },
       { term: "À bientôt", romaji: "/a bjɔ̃t/", meaning: "Hasta luego", lang: "fr-FR" },
     ],
     dialogue: [
       { who: "Léa", line: "Ça te dit un ciné ce soir ?", tr: "¿Te apetece un cine esta noche?" },
       { who: "Tom", line: "Ça marche ! À quelle heure ?", tr: "¡De acuerdo! ¿A qué hora?" },
       { who: "Léa", line: "Huit heures, nickel ?", tr: "A las ocho, ¿perfecto?" },
       { who: "Tom", line: "Nickel. Bonne journée !", tr: "Perfecto. ¡Buen día!" },
       { who: "Léa", line: "On se voit demain ?", tr: "¿Nos vemos mañana?" },
       { who: "Tom", line: "Avec plaisir. Bonne nuit !", tr: "Con gusto. ¡Buenas noches!" },
     ],
     cultural: "Los franceses valoran el «bonjour» como puerta de entrada a cualquier interacción, y el tuteo solo llega cuando existe cercanía. Las comidas son un ritual social, no una pausa rápida, y el famoso encogimiento de hombros con un «bof» expresa indiferencia sin necesidad de palabras. El francés tiene muchas regionalismos: el del sur (Provenza) difiere del del norte. En Quebec, el francés tiene Anglicismos únicos.",
   },
   {
     id: "de-desde-cero",
     title: "Alemán desde Cero",
     langId: "de", langName: "Alemán", flag: "🇩🇪",
     level: "Básico", tag: "pro",
     cover: "linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%)",
     duration: "7 semanas",
     desc: "Derrumba el mito del alemán difícil: artículos, orden de la frase y frases útiles para empezar. El alemán tiene una lógica interna que una vez comprendida, se vuelve predecible.",
     syllabus: ["Módulo 1 · Artículos y género", "Módulo 2 · Orden de la frase", "Módulo 3 · Frases para sobrevivir"],
     modules: [
       { 
         title: "Módulo 1 · Artículos y género", 
         summary: "Der, die, das y por qué importan. El género de los sustantivos alemanes.", 
         points: [
           "Tres géneros: der (masculino), die (femenino), das (neutro).",
           "Los sustantivos siempre con mayúscula: ein großer Hund.",
           "El género a veces es lógico (homres = masculino), a veces aleatorio.",
           "Memorizar el artículo junto con la palabra es la clave."
         ] 
       },
       { 
         title: "Módulo 2 · Orden de la frase", 
         summary: "La regla de oro del alemán: el verbo conjugado va en segunda posición.", 
         points: [
           "El verbo conjugado va en segunda posición: «Ich esse».",
           "En pregunta el verbo va primero: «Isst du?» ¿Comes tú?",
           "Los verbos separables se parten: anrufen → Ich rufe an.",
           "Con dos verbos, el segundo va al final: «Ich möchte gehen»."
         ] 
       },
       { 
         title: "Módulo 3 · Frases para sobrevivir", 
         summary: "Saludar, presentarte y pedir ayuda. Las situaciones básicas en alemán.", 
         points: [
           "Guten Tag / Guten Morgen.",
           "«Ich heiße…» me llamo…",
           "«Sprechen Sie Englisch?» ¿habla inglés?",
           "En emergencias: «Hilfe!» = ¡Ayuda!"
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "Guten Tag", romaji: "/ˈɡuːtn̩ taːk/", meaning: "Buenos días", lang: "de-DE" },
       { term: "Danke schön", romaji: "/ˈdaŋkə ʃøːn/", meaning: "Muchas gracias", lang: "de-DE" },
       { term: "Ich heiße…", romaji: "/ɪç ˈhaɪsə/", meaning: "Me llamo…", lang: "de-DE" },
       { term: "Sprechen Sie Englisch?", romaji: "/ˈʃpʁɛçn̩ ziː ˈɛŋlɪʃ/", meaning: "¿Habla inglés?", lang: "de-DE" },
       { term: "Wie geht's?", romaji: "/viː ɡeːts/", meaning: "¿Cómo estás?", lang: "de-DE" },
       { term: "Entschuldigung", romaji: "/ɛntˈʃʊldɪɡʊŋ/", meaning: "Disculpe / Perdón", lang: "de-DE" },
       { term: "Bis später", romaji: "/bɪs ˈʃpɛːtɐ/", meaning: "Hasta luego", lang: "de-DE" },
       { term: "Gute Reise", romaji: "/ˈɡʊtə ˈʁaɪzə/", meaning: "Buen viaje", lang: "de-DE" },
       { term: "Entfernung", romaji: "/ɛnˈfɛɐ̯nung/", meaning: "Distancia", lang: "de-DE" },
       { term: "Schilder", romaji: "/ˈʃildɐ/", meaning: "Carteles / Señales", lang: "de-DE" },
       { term: "Apotheke", romaji: "/ˈapotheːkə/", meaning: "Farmacia", lang: "de-DE" },
       { term: "Notarzt", romaji: "/ˈnoːtaʁts/", meaning: "Médico de urgencias", lang: "de-DE" },
     ],
     dialogue: [
       { who: "Anna", line: "Guten Tag! Ich heiße Anna. Und du?", tr: "¡Buenos días! Me llamo Anna. ¿Y tú?" },
       { who: "Luis", line: "Ich heiße Luis. Wie geht's?", tr: "Me llamo Luis. ¿Cómo estás?" },
       { who: "Anna", line: "Gut, danke! Sprichst du Englisch?", tr: "¡Bien, gracias! ¿Hablas inglés?" },
       { who: "Luis", line: "Ja, ein bisschen. Bis später!", tr: "Sí, un poco. ¡Hasta luego!" },
       { who: "Anna", line: "Gute Reise! Pass auf dich auf.", tr: "¡Buen viaje! Cuida de ti." },
       { who: "Luis", line: "Danke! Bis bald!", tr: "¡Gracias! ¡Hasta pronto!" },
     ],
     cultural: "El alemán construye palabras compuestas con lógica: «Handschuh» (guante) es literalmente «zapato de mano» y «Kühlschrank» (refrigerador) es «armario frío». También es famoso por la puntualidad y la franqueza: una crítica directa no busca ofender, sino ahorrar tiempo. En alemán, las pausas en la habla son normales y no indican desconexión. La directitud no es grosería, es eficiencia. Los domingos (Sonntag) casi todo está cerrado por ley religiosa.",
   },
   {
     id: "it-espresso",
     title: "Italiano con Sabor a Espresso",
     langId: "it", langName: "Italiano", flag: "🇮🇹",
     level: "Conversación", tag: "pro",
     cover: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
     duration: "6 semanas",
     desc: "Aprende el italiano vivo: café, gestos, familia y las expresiones que hacen sonreír a un local. El idioma de la dolce vita para viajar con sabor.",
     syllabus: ["Módulo 1 · En el bar y la piazza", "Módulo 2 · Familia y afectos", "Módulo 3 · Modismos y gestos"],
     modules: [
       { 
         title: "Módulo 1 · En el bar y la piazza", 
         summary: "Pedir café como un italiano auténtico. La cultura del café en Italia es sagrada.", 
         points: [
           "«Un caffè» = un espresso. No digas «un expreso».",
           "Se paga en la caja, luego se pide en la barra.",
           "«Al banco» o «al tavolo» cambia el precio.",
           "Los italianos toman el café de pie y en pocos minutos."
         ] 
       },
       { 
         title: "Módulo 2 · Familia y afectos", 
         summary: "Hablar de la gente que te importa. Los afectos en italiano.", 
         points: [
           "«Mamma mia!» es sorpresa, no solo mamá.",
           "Diminutivos: -ino, -etto (paisanito, perrito).",
           "«Ti voglio bene» ≠ «Ti amo». Afecto vs. amor romántico.",
           "Los gestos acompañan y cambian el sentido de la frase."
         ] 
       },
       { 
         title: "Módulo 3 · Modismos y gestos", 
         summary: "La comunicación no verbal italiana. Hablar con las manos es un arte.", 
         points: [
           "«In bocca al lupo» = mucha suerte.",
           "«Che palle!» = ¡qué aburrido! / ¡qué lata!",
           "Un gesto de manos puede sí o no una frase entera.",
           "El gesto de tocar la barbilla significa 'yo'."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "Buongiorno", romaji: "/bwonˈdʒorno/", meaning: "Buenos días", lang: "it-IT" },
       { term: "Un caffè, per favore", romaji: "/un kafˈfɛ per faˈvore/", meaning: "Un café, por favor", lang: "it-IT" },
       { term: "Che bello!", romaji: "/ke ˈbɛllo/", meaning: "¡Qué bonito!", lang: "it-IT" },
       { term: "In bocca al lupo", romaji: "/in ˈbokka al ˈlupo/", meaning: "¡Mucha suerte!", lang: "it-IT" },
       { term: "Ti voglio bene", romaji: "/ti ˈvɔʎʎo ˈbɛne/", meaning: "Te quiero (afecto)", lang: "it-IT" },
       { term: "Mamma mia!", romaji: "/ˈmamma ˈmia/", meaning: "¡Madre mía!", lang: "it-IT" },
       { term: "Andiamo!", romaji: "/anˈdjamo/", meaning: "¡Vamos!", lang: "it-IT" },
       { term: "Per favore", romaji: "/per faˈvore/", meaning: "Por favor", lang: "it-IT" },
       { term: "Grazie mille", romaji: "/ɡratˈt͡si ˈmil·le/", meaning: "Muchas gracias", lang: "it-IT" },
       { term: "Mi scusi", romaji: "/mi ˈskuːzi/", meaning: "Disculpe", lang: "it-IT" },
       { term: "Scusa", romaji: "/ˈskuːsa/", meaning: "Perdón / Tchau", lang: "it-IT" },
     ],
     dialogue: [
       { who: "Cliente", line: "Buongiorno! Un caffè, per favore.", tr: "¡Buenos días! Un café, por favor." },
       { who: "Barista", line: "Subito! Al banco o al tavolo?", tr: "¡Ahora mismo! ¿En la barra o en la mesa?" },
       { who: "Cliente", line: "Al banco, grazie. Che bello questo posto!", tr: "En la barra, gracias. ¡Qué bonito este lugar!" },
       { who: "Barista", line: "Mamma mia, grazie! Buona giornata!", tr: "¡Madre mía, gracias! ¡Buen día!" },
       { who: "Cliente", line: "Grazie mille! A domani!", tr: "¡Muchas gracias! Hasta mañana!" },
       { who: "Barista", line: "Arrivederci!", tr: "¡Hasta luego!" },
     ],
     cultural: "El italiano se apoya tanto en el ritmo como en los gestos: los hablantes acompañan la frase con las manos casi de forma automática, y un mismo gesto puede cambiar el significado. El café se toma de pie y rápido, y «ti voglio bene» expresa afecto sin la intensidad romántica de «ti amo». Los italianos usan los gestos para enfatizar: tocar la barbilla = yo, tirar de la oreja = ¿escuchas?, mover la mano de lado a lado = no. Cada región tiene sus gestos característicos.",
   },
   {
     id: "pt-brasil",
     title: "Portugués de Brasil",
     langId: "pt", langName: "Portugués", flag: "🇵🇹",
     level: "Intermedio", tag: "pro",
     cover: "linear-gradient(135deg, #CCFBF1 0%, #99F6E4 100%)",
     duration: "7 semanas",
     desc: "El portugués cálido de Brasil: playa, música, comida y la palabra que no se puede traducir: saudade. Conecta con el latido cultural de Brasil.",
     syllabus: ["Módulo 1 · Sonidos nasales", "Módulo 2 · Cotidiano y comida", "Módulo 3 · Saudade y cultura"],
     modules: [
       { 
         title: "Módulo 1 · Sonidos nasales", 
         summary: "El reto número uno para hispanohablantes. Dominar las nasales portuguesas.", 
         points: [
           "ã y õ salen por la nariz sin cerrar la boca.",
           "«pão» (pan) vs. «pao» mal dicho.",
           "La «de» final suena «dji» en Brasil: 'obrigado' → 'obrigadi'.",
           "Las nasales son la señal de identidad del portugués brasileño."
         ] 
       },
       { 
         title: "Módulo 2 · Cotidiano y comida", 
         summary: "Pedir, invitar y compartir. La vida diaria en portugués brasileño.", 
         points: [
           "«Tudo bem?» ¿todo bien?",
           "«Fica à vontade» ponte cómodo.",
           "«Um cafezinho» es un café pequeño y dulce.",
           "En Brasil, el café nunca falta en ninguna reunión."
         ] 
       },
       { 
         title: "Módulo 3 · Saudade y cultura", 
         summary: "La palabra que define el alma brasileña. Saudade = nostalgia + cariño.", 
         points: [
           "Saudade = nostalgia mezclada con cariño, intraducible.",
           "«Ficar de boa» = estar tranquilo, en modo relajado.",
           "«Beleza» = de acuerdo / vale / qué pasa.",
           "La saudade es la razón de muchos éxitos de la música brasileña."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "Obrigado / Obrigada", romaji: "/obɾiˈɡadu/", meaning: "Gracias (masc. / fem.)", lang: "pt-BR" },
       { term: "Tudo bem?", romaji: "/ˈtudu bẽj/", meaning: "¿Todo bien?", lang: "pt-BR" },
       { term: "Fica à vontade", romaji: "/ˈfikɐ a õˈtadʒi/", meaning: "Ponte cómodo", lang: "pt-BR" },
       { term: "Saudade", romaji: "/sawˈdadʒi/", meaning: "Nostalgia afectiva (intraducible)", lang: "pt-BR" },
       { term: "Beleza", romaji: "/beˈlezɐ/", meaning: "Vale / De acuerdo", lang: "pt-BR" },
       { term: "Um cafezinho", romaji: "/ũ kafeˈziɲu/", meaning: "Un cafecito", lang: "pt-BR" },
       { term: "Que legal!", romaji: "/ki leˈɡaw/", meaning: "¡Qué padre! / ¡Qué bien!", lang: "pt-BR" },
       { term: "Legal", romaji: "/leˈgaw/", meaning: "Genial / Está bien", lang: "pt-BR" },
       { term: "Obrigado", romaji: "/obɾiˈɡadu/", meaning: "Gracias (masc.)", lang: "pt-BR" },
       { term: "De nada", romaji: "/de ˈnadɐ/", meaning: "De nada", lang: "pt-BR" },
     ],
     dialogue: [
       { who: "Marina", line: "Oi! Tudo bem? Aceita um cafezinho?", tr: "¡Hola! ¿Todo bien? ¿Aceptas un cafecito?" },
       { who: "Diego", line: "Aceito sim, obrigado! Que legal.", tr: "Sí acepto, ¡gracias! ¡Qué bien!" },
       { who: "Marina", line: "Fica à vontade. Está em casa.", tr: "Ponte cómodo. Estás en casa." },
       { who: "Diego", line: "Beleza. Que saudade do Brasil!", tr: "Vale. ¡Qué nostalgia de Brasil!" },
       { who: "Marina", line: "Até mais!", tr: "¡Hasta luego!" },
       { who: "Diego", line: "Tchau!", tr: "¡Chau!" },
     ],
     cultural: "El portugués está lleno de sonidos nasales que cuesta controlar al principio, y Brasil y Portugal difieren en pronunciación y vocabulario tanto como el español de México y el de España. «Saudade» es intraducible: mezcla nostalgia, cariño y ausencia, y se considera la palabra que mejor define el alma brasileña. La música es esencial en la vida brasileña: bossa nova, samba, funk y tropicalia. Los domingos (domingos) son para el family time y el asado (churrasco) en parques y playas.",
   },
   {
     id: "zh-tonos",
     title: "Chino Mandarín: Los 4 Tonos",
     langId: "zh", langName: "Chino Mandarín", flag: "🇨🇳",
     level: "Básico", tag: "pro",
     cover: "linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%)",
     duration: "7 semanas",
     desc: "Domina los tonos y el pinyin para empezar a hablar el idioma con más hablantes nativos del mundo. El idioma con más hablantes nativos a nivel global.",
     syllabus: ["Módulo 1 · Pinyin y los 4 tonos", "Módulo 2 · Saludos y cortesía", "Módulo 3 · Números y compras"],
     modules: [
       { 
         title: "Módulo 1 · Pinyin y los 4 tonos", 
         summary: "Por qué el tono cambia el significado. El sistema pinyin con marcas tonales.", 
         points: [
           "Cuatro tonos + tono neutro.",
           "mā (mamá), mǎ (caballo), mà (regañar), ma (partícula de pregunta).",
           "El pinyin con marcas indica el tono: ā, á, ǎ, à.",
           "Si el tono cambia, cambia el significado completamente."
         ] 
       },
       { 
         title: "Módulo 2 · Saludos y cortesía", 
         summary: "Las fórmulas cotidianas del mandarín. Las saludos más usados.", 
         points: [
           "你好 (nǐ hǎo) hola.",
           "谢谢 (xièxie) gracias.",
           "不客气 (bú kèqi) de nada.",
           "早上好 (zǎo shang hǎo) buenos días."
         ] 
       },
       { 
         title: "Módulo 3 · Números y compras", 
         summary: "Contar y preguntar precios. El regateo en mercados chinos.", 
         points: [
           "Del 1 al 10: yī, èr, sān, sì, wǔ, liù, qī, bā, jiǔ, shí.",
           "«多少钱?» (duōshao qián) ¿cuánto cuesta?",
           "「太贵了」 (tài guì le) ¡qué caro!",
           "Regatear en mercados es normal y hasta esperado."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "你好", romaji: "Nǐ hǎo", meaning: "Hola", lang: "zh-CN" },
       { term: "谢谢", romaji: "Xièxie", meaning: "Gracias", lang: "zh-CN" },
       { term: "不客气", romaji: "Bú kèqi", meaning: "De nada", lang: "zh-CN" },
       { term: "多少钱？", romaji: "Duōshao qián?", meaning: "¿Cuánto cuesta?", lang: "zh-CN" },
       { term: "太贵了", romaji: "Tài guì le", meaning: "¡Qué caro!", lang: "zh-CN" },
       { term: "对不起", romaji: "Duìbuqǐ", meaning: "Perdón / Lo siento", lang: "zh-CN" },
       { term: "再见", romaji: "Zàijiàn", meaning: "Adiós", lang: "zh-CN" },
       { term: "没关系", romaji: "Méi guānxi", meaning: "No importa / De nada", lang: "zh-CN" },
       { term: "请问", romaji: "Qǐngwèn", meaning: "¿Puedo preguntar?", lang: "zh-CN" },
       { term: "太太", romaji: "Tàitai", meaning: "Señora / Mujer", lang: "zh-CN" },
       { term: "先生", romaji: "Xiānsheng", meaning: "Señor / Sr.", lang: "zh-CN" },
     ],
     dialogue: [
       { who: "Cliente", line: "你好！这个多少钱？", tr: "¡Hola! ¿Cuánto cuesta esto?" },
       { who: "Vendedor", line: "五十块。", tr: "Cincuenta yuanes." },
       { who: "Cliente", line: "太贵了！四十，可以吗？", tr: "¡Qué caro! ¿Cuarenta, está bien?" },
       { who: "Vendedor", line: "好吧，四十。谢谢！", tr: "Está bien, cuarenta. ¡Gracias!" },
       { who: "Cliente", line: "便宜一点吗？", tr: "¿Más barato?" },
       { who: "Vendedor", line: "好，三十五。", tr: "Bueno, treinta y cinco." },
     ],
     cultural: "El mandarín es tonal: la misma sílaba puede significar cosas muy distintas según el tono, así que la entonación no es «adorno» sino significado. No usa alfabeto sino caracteres, y el pinyin con marcas (ā, á, ǎ, à) es el apoyo de los estudiantes. Regatear en mercados es normal y hasta esperado. El color rojo es auspicioso y se usa en todas las celebraciones. El té (cha) es central en la cultura china y se sirve caliente en cualquier hora.",
   },
   {
     id: "la-clasico",
     title: "Latín Clásico: El Idioma del Imperio",
     langId: "la", langName: "Latín", flag: "🏛️",
     level: "Avanzado", tag: "pro",
     cover: "linear-gradient(135deg, #F5F5F4 0%, #E7E5E4 100%)",
     duration: "9 semanas",
     desc: "La lengua madre del español: casos, declinaciones y la lógica que explica tu propia gramática. Para entender de dónde vienen las palabras y estructuras que usas todos los días.",
     syllabus: ["Módulo 1 · Casos y declinaciones", "Módulo 2 · Verbos y conjugaciones", "Módulo 3 · Lectura y cultura"],
     modules: [
       { 
         title: "Módulo 1 · Casos y declinaciones", 
         summary: "Por qué el orden de las palabras es libre en latín. Las 5 funciones gramaticales.", 
         points: [
           "Nominativo, acusativo, genitivo, dativo y ablativo.",
           "La terminación indica la función, no la posición de la palabra.",
           "«Ros-a» (nom.) vs. «ros-am» (acus.): el caso cambia el significado.",
           "Los adjetivos concordan con el sustantivo en caso, género y número."
         ] 
       },
       { 
         title: "Módulo 2 · Verbos y conjugaciones", 
         summary: "Cuatro conjugaciones y sus tiempos. Los verbos latinos y sus flexiones.", 
         points: [
           "Amare, videre, legere, audire: las 4 conjugaciones.",
           "El verbo va normalmente al final en oraciones subordinadas.",
           "No hay artículos definidos/indeterminados en latín.",
           "Los tiempos principales: presente, imperfecto, futuro perfecto."
         ] 
       },
       { 
         title: "Módulo 3 · Lectura y cultura", 
         summary: "Frases célebres y su huella en el español. Leer textos latinos simplificados.", 
         points: [
           "«Veni, vidi, vici» (Julio César).",
           "«Carpe diem» (Horacio).",
           "Raíces latinas en cientos de palabras cotidianas.",
           "Leer latín ayuda a entender la etimología de tu propio idioma."
         ] 
       },
     ],
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
        },
      ],
      vocab: [
       { term: "Carpe diem", romaji: "car-pe di-em", meaning: "Aprovecha el día", lang: "la", fallback: "it-IT" },
       { term: "Veni, vidi, vici", romaji: "ve-ni vi-di vi-ci", meaning: "Vine, vi, vencí", lang: "la", fallback: "it-IT" },
       { term: "Gratias tibi ago", romaji: "gra-ti-as ti-bi a-go", meaning: "Te doy las gracias", lang: "la", fallback: "it-IT" },
       { term: "Aqua", romaji: "a-qua", meaning: "Agua", lang: "la", fallback: "it-IT" },
       { term: "Liber", romaji: "li-ber", meaning: "Libro / Libre", lang: "la", fallback: "it-IT" },
       { term: "Amicitia", romaji: "a-mi-ci-ti-a", meaning: "Amistad", lang: "la", fallback: "it-IT" },
       { term: "Terra", romaji: "ter-ra", meaning: "Tierra", lang: "la", fallback: "it-IT" },
       { term: "Mors", romaji: "mors", meaning: "Muerte", lang: "la", fallback: "it-IT" },
       { term: "Pax", romaji: "pax", meaning: "Paz", lang: "la", fallback: "it-IT" },
       { term: "Tempus", romaji: "temp-us", meaning: "Tiempo", lang: "la", fallback: "it-IT" },
     ],
     dialogue: [
       { who: "Magister", line: "Salve, discipule!", tr: "¡Saludos, alumno!" },
       { who: "Discipulus", line: "Salve, magister. Gratias tibi ago.", tr: "Saludos, maestro. Te doy las gracias." },
       { who: "Magister", line: "Quid agis hodie?", tr: "¿Cómo estás hoy?" },
       { who: "Discipulus", line: "Bene. Carpe diem!", tr: "Bien. ¡Aprovecha el día!" },
       { who: "Magister", line: "Iter longum est. Pace ibis.", tr: "El camino es largo. Ve en paz." },
       { who: "Discipulus", line: "Gratias ago. Vale.", tr: "Gracias. Adiós." },
     ],
     cultural: "El latín no está muerto: es el ancestro del español, portugués, francés, italiano y rumano, y sigue siendo la lengua oficial del Vaticano. Aprenderlo hace visible la lógica de la gramática romance, porque explica de dónde vienen los casos, la concordancia y buena parte del vocabulario culto. Muchas expresiones latinas están tan integradas en español que no las notamos: «homo homini lupus», «carpe diem», «alma mater», «ex officio». El estudio del latín mejora el vocabulario y la precisión en tu propio idioma materno.",
   },
 ];


/* ============================================================================
   3) TARJETAS DE VOCABULARIO (20)
   ========================================================================== */

const VOCAB_CARDS = [
  { id: "c-en-1",  langId: "en",  flag: "🇬🇧", term: "Nice to meet you",   romaji: "/naɪs tə miːt juː/",   meaning: "Encantado de conocerte",    lang: "en-US" },
  { id: "c-en-2",  langId: "en",  flag: "🇬🇧", term: "Could you help me?", romaji: "/kʊd juː help miː/",    meaning: "¿Podrías ayudarme?",        lang: "en-US" },
  { id: "c-ja-1",  langId: "ja",  flag: "🇯🇵", term: "こんにちは",           romaji: "Konnichiwa",             meaning: "Hola / Buenas tardes",      lang: "ja-JP" },
  { id: "c-ja-2",  langId: "ja",  flag: "🇯🇵", term: "ありがとうございます", romaji: "Arigatou gozaimasu",     meaning: "Muchas gracias (formal)",   lang: "ja-JP" },
  { id: "c-ko-1",  langId: "ko",  flag: "🇰🇷", term: "안녕하세요",           romaji: "Annyeonghaseyo",         meaning: "Hola (cortés)",             lang: "ko-KR" },
  { id: "c-ko-2",  langId: "ko",  flag: "🇰🇷", term: "감사합니다",           romaji: "Gamsahamnida",           meaning: "Gracias (formal)",          lang: "ko-KR" },
  { id: "c-fr-1",  langId: "fr",  flag: "🇫🇷", term: "Bonjour",             romaji: "/bɔ̃.ʒuʁ/",              meaning: "Hola / Buenos días",        lang: "fr-FR" },
  { id: "c-fr-2",  langId: "fr",  flag: "🇫🇷", term: "Merci beaucoup",      romaji: "/mɛʁ.si bo.ku/",         meaning: "Muchas gracias",            lang: "fr-FR" },
  { id: "c-de-1",  langId: "de",  flag: "🇩🇪", term: "Guten Tag",           romaji: "/ˈɡuːtn̩ taːk/",         meaning: "Buenos días",               lang: "de-DE" },
  { id: "c-de-2",  langId: "de",  flag: "🇩🇪", term: "Danke schön",         romaji: "/ˈdaŋkə ʃøːn/",          meaning: "Muchas gracias",            lang: "de-DE" },
  { id: "c-it-1",  langId: "it",  flag: "🇮🇹", term: "Buongiorno",          romaji: "/bwonˈdʒorno/",           meaning: "Buenos días",               lang: "it-IT" },
  { id: "c-it-2",  langId: "it",  flag: "🇮🇹", term: "Grazie mille",        romaji: "/ɡratˈt͡si ˈmille/",     meaning: "Muchas gracias",            lang: "it-IT" },
  { id: "c-pt-1",  langId: "pt",  flag: "🇵🇹", term: "Obrigado",            romaji: "/obɾiˈɡadu/",            meaning: "Gracias",                   lang: "pt-BR" },
  { id: "c-pt-2",  langId: "pt",  flag: "🇵🇹", term: "Tudo bem?",           romaji: "/ˈtudu bẽj/",            meaning: "¿Todo bien?",               lang: "pt-BR" },
  { id: "c-zh-1",  langId: "zh",  flag: "🇨🇳", term: "你好",                romaji: "Nǐ hǎo",                 meaning: "Hola",                      lang: "zh-CN" },
  { id: "c-zh-2",  langId: "zh",  flag: "🇨🇳", term: "谢谢",                romaji: "Xièxie",                 meaning: "Gracias",                   lang: "zh-CN" },
  { id: "c-nah-1", langId: "nah", flag: "🇲🇽", term: "Niltze",              romaji: "nil-tze",                meaning: "Hola",                      lang: "nah", fallback: "es-MX" },
  { id: "c-nah-2", langId: "nah", flag: "🇲🇽", term: "Tlazohcamati",        romaji: "tla-zoh-ca-ma-ti",       meaning: "Gracias",                   lang: "nah", fallback: "es-MX" },
  { id: "c-la-1",  langId: "la",  flag: "🏛️", term: "Carpe diem",          romaji: "car-pe di-em",           meaning: "Aprovecha el día",          lang: "la",  fallback: "it-IT" },
  { id: "c-la-2",  langId: "la",  flag: "🏛️", term: "Veni, vidi, vici",    romaji: "ve-ni vi-di vi-ci",      meaning: "Vine, vi, vencí",           lang: "la",  fallback: "it-IT" },
];

/* ============================================================================
   4) QUIZ (8 preguntas)
   ========================================================================== */

const QUIZ = [
  {
    q: "¿Qué significa 'こんにちは' (Konnichiwa) en japonés?",
    options: ["Buenos días", "Hola / Buenas tardes", "Buenas noches", "Muchas gracias"],
    correct: 1,
    explain: "'こんにちは' se usa desde el mediodía hasta el anochecer. Por la mañana se dice 'おはようございます' y por la noche 'こんばんは'.",
  },
  {
    q: "En coreano, ¿cuál es el significado de '감사합니다' (Gamsahamnida)?",
    options: ["Por favor", "De nada", "Gracias (formal)", "Hola"],
    correct: 2,
    explain: "'감사합니다' es la forma más formal de agradecer. Entre amigos se usa '고마워' (Gomawo).",
  },
  {
    q: "¿Qué idioma tiene 5 tonos que cambian el significado de las palabras?",
    options: ["Japonés", "Coreano", "Chino Mandarín", "Vietnamita"],
    correct: 2,
    explain: "El mandarín tiene 4 tonos principales más un tono neutro. La sílaba 'ma' puede significar 'mamá', 'cáñamo', 'caballo' o 'regañar' según el tono.",
  },
  {
    q: "¿De qué idioma proviene la palabra 'chocolate'?",
    options: ["Latín", "Náhuatl", "Árabe", "Quechua"],
    correct: 1,
    explain: "Chocolate viene del náhuatl 'xocolatl'. También aguacate (ahuacatl), tomate (tomatl) y chile (chilli) son de origen náhuatl.",
  },
  {
    q: "¿Qué significa '你好' (Nǐ hǎo) en chino mandarín?",
    options: ["Gracias", "Adiós", "Por favor", "Hola"],
    correct: 3,
    explain: "'你好' es el saludo más universal en chino. Literalmente significa 'tú bueno'. Para 'hola' formal se usa '您好' (Nín hǎo).",
  },
  {
    q: "¿Cuál es el significado de 'Tlazohcamati' en náhuatl?",
    options: ["Buenos días", "Por favor", "Gracias", "Adiós"],
    correct: 2,
    explain: "'Tlazohcamati' es la forma de agradecer en náhuatl clásico. La raíz 'tlazohti' significa amar o estimar algo con valor.",
  },
  {
    q: "En italiano, '¡In bocca al lupo!' significa literalmente...",
    options: ["¡Qué bonito!", "¡En la boca del lobo!", "¡Buen provecho!", "¡Qué buena suerte!"],
    correct: 1,
    explain: "Esta expresión italiana equivale a '¡Mucha suerte!'. La respuesta correcta es 'Crepi!' (¡Que reviente!). Nunca se debe responder 'grazie' o traerá mala suerte.",
  },
  {
    q: "¿Qué famosa frase en latín dijo Julio César tras conquistar el Ponto?",
    options: ["Carpe diem", "Veni, vidi, vici", "Cogito ergo sum", "Alea iacta est"],
    correct: 1,
    explain: "'Veni, vidi, vici' significa 'Vine, vi, vencí'. César la pronunció en 47 a.C. para describir su rapidísima victoria sobre Farnaces II. La brevedad de la frase refleja la contundencia de la victoria.",
  },
];

/* ============================================================================
   5) GUÍAS CULTURALES (6)
   ========================================================================== */

const CULTURE_GUIDES = [
  {
    id: "g-japon",
    flag: "🇯🇵",
    category: "Etiqueta",
    readTime: "4 min",
    title: "El arte de la cortesía japonesa",
    excerpt: "Por qué inclinarse, callar y esperar son formas de respeto en Japón.",
    langName: "Japonés",
    body: [
      "En Japón, la cortesía no es una opción social: está integrada en la gramática misma del idioma. Los verbos cambian de forma según el nivel de respeto que debes mostrar a tu interlocutor, y omitir esas formas honoríficas se percibe como una ofensa, aunque no seas consciente de ello.",
      "El ojigi (お辞儀), la inclinación al saludar, tiene sus propias reglas. Una inclinación de 15 grados es suficiente para un saludo casual entre conocidos. Una de 30 grados expresa respeto genuino. Una de 45 grados se reserva para disculpas profundas o situaciones muy formales. Inclinarse más de lo que tu interlocutor espera puede resultar incómodo.",
      "El silencio también comunica. En una reunión de negocios japonesa, hacer una pausa antes de responder no indica duda, sino que estás tomando la pregunta en serio. Responder demasiado rápido puede parecer superficial o incluso irrespetuoso.",
      "El concepto de 'omotenashi' (おもてなし), la hospitalidad desinteresada, explica por qué en Japón el servicio es proactivo: el objetivo es anticipar lo que necesitas antes de que lo pidas. Esta mentalidad se extiende desde los restaurantes hasta las tiendas de conveniencia.",
      "Aprender aunque sea unas pocas frases en japonés genera una reacción genuinamente positiva. Los japoneses son perfectamente conscientes de la dificultad de su idioma, y cualquier esfuerzo auténtico se percibe como una muestra de respeto hacia su cultura.",
    ],
  },
  {
    id: "g-corea",
    flag: "🇰🇷",
    category: "Sociedad",
    readTime: "4 min",
    title: "Jerarquía y nunchi en Corea",
    excerpt: "Cómo la edad y el contexto social determinan cada conversación coreana.",
    langName: "Coreano",
    body: [
      "El coreano es uno de los idiomas donde la jerarquía social más condiciona la gramática. No es solo cuestión de vocabulario: los verbos, las terminaciones y hasta el tono de voz cambian radicalmente dependiendo de si hablas con alguien mayor, menor o de tu misma generación.",
      "La distinción fundamental es entre 존댓말 (jondaemal, lenguaje formal) y 반말 (banmal, lenguaje informal). Usar banmal con alguien mayor sin permiso explícito es una falta de respeto grave. Por eso, en muchas relaciones coreanas existe un momento en que una persona mayor le dice a otra más joven que pueden 'hablar en banmal': es una señal de cercanía y confianza.",
      "El concepto de nunchi (눈치) es difícil de traducir al español: significa algo parecido a 'la habilidad de leer el ambiente social'. Alguien con buen nunchi sabe cuándo hablar y cuándo callarse, cuándo ofrecer ayuda y cuándo retirarse. Es una de las habilidades sociales más valoradas en la cultura coreana.",
      "La pregunta '몇 살이에요?' ('¿Cuántos años tienes?') que puede resultar extraña para un hispanohablante, es completamente normal en Corea. No es indiscreción: es información necesaria para saber en qué registro del idioma dirigirse a esa persona.",
      "En los dramas coreanos puedes observar estos cambios de registro constantemente: cuando dos personajes que se trataban de usted empiezan a tutearse, es una escena cargada de significado emocional.",
    ],
  },
  {
    id: "g-francia",
    flag: "🇫🇷",
    category: "Costumbres",
    readTime: "3 min",
    title: "Bonjour: la llave de Francia",
    excerpt: "Por qué no saludar al entrar a un local puede arruinar tu experiencia en Francia.",
    langName: "Francés",
    body: [
      "Existe una regla no escrita en Francia que los turistas descubren por las malas: si entras a una tienda, una panadería o un restaurante sin decir 'bonjour', el personal tiene todo el derecho de ignorarte o atenderte con desgana. No es grosería, es protocolo.",
      "El saludo en Francia no es un mero trámite de cortesía: es una afirmación de que reconoces a la otra persona como individuo, no como un instrumento de servicio. Saltárselo, aunque sea por prisa o timidez, se lee como arrogancia o desprecio.",
      "La distinción entre 'tu' y 'vous' también carga con un peso cultural enorme. 'Vous' con un desconocido no es formalidad pasada de moda: es respeto. Muchas personas en Francia mantienen el 'vous' con vecinos o compañeros de trabajo durante años. Tutear a alguien sin que haya habido un acuerdo implícito puede sentirse como una invasión del espacio social.",
      "Las comidas son otro ritual central. Un almuerzo de trabajo en Francia raramente dura menos de una hora. No es ineficiencia: es la forma en que se construyen las relaciones. Preguntar por la cuenta nada más terminar de comer se considera de muy mala educación; lo correcto es esperar, conversar, y pedir la cuenta cuando la atmósfera lo permita.",
    ],
  },
  {
    id: "g-china",
    flag: "🇨🇳",
    category: "Escritura",
    readTime: "5 min",
    title: "Tonos y caracteres: el sistema del chino",
    excerpt: "Por qué el mandarín suena musical y qué hace que sus caracteres sean un sistema tan poderoso.",
    langName: "Chino Mandarín",
    body: [
      "El chino mandarín es un idioma tonal: el significado de una sílaba cambia completamente dependiendo del tono con que se pronuncie. La sílaba 'ma' puede significar 'mamá' (mā, tono 1), 'cáñamo' (má, tono 2), 'caballo' (mǎ, tono 3) o 'regañar' (mà, tono 4). Un error de tono puede cambiar el mensaje de forma cómica o incluso ofensiva.",
      "Para los hispanohablantes, los tonos representan uno de los mayores retos del chino, porque en español el tono expresa emoción o énfasis, no significado léxico. Entrenar el oído es el primer paso: antes de intentar hablar con los tonos correctos, es fundamental aprender a escucharlos.",
      "El sistema de escritura del chino no usa un alfabeto. Los caracteres son logogramas: cada uno representa una sílaba con un significado asociado. Existen más de 50.000 caracteres, aunque con 2.500 se puede leer un periódico y con 3.500 se cubre el 99% del uso cotidiano.",
      "El pinyin (pīnyīn) es el sistema de romanización oficial del chino, desarrollado en la década de 1950. Representa los sonidos del mandarín con el alfabeto latino más marcas de tono (ā, á, ǎ, à). Es la herramienta fundamental para los estudiantes y para escribir en dispositivos electrónicos.",
      "Un dato curioso: el chino escrito permite comunicarse entre hablantes de dialectos mutuamente ininteligibles. Un hablante de cantonés de Hong Kong y uno de shanghainés del norte pueden no entenderse hablando, pero sí leer los mismos caracteres escritos.",
    ],
  },
  {
    id: "g-nahuatl",
    flag: "🇲🇽",
    category: "Historia",
    readTime: "4 min",
    title: "El náhuatl que ya hablas sin saberlo",
    excerpt: "Más de 200 palabras del español cotidiano tienen su origen en el náhuatl.",
    langName: "Náhuatl",
    body: [
      "Cuando dices 'aguacate', 'tomate', 'chocolate' o 'chile', estás hablando náhuatl. No metafóricamente: estas palabras llegaron al español directamente del náhuatl, el idioma que hablaban los mexicas cuando los españoles llegaron a Mesoamérica en el siglo XVI.",
      "El náhuatl aportó al español más de 200 palabras de uso cotidiano. Algunas son obvias: xocolatl (chocolate), ahuacatl (aguacate), tomatl (tomate), chilli (chile), cacahuatl (cacahuate). Otras sorprenden: 'petate' viene de petlatl, 'chapulín' de chapolin y 'comal' de comalli.",
      "El náhuatl no es una lengua muerta. Hoy lo hablan aproximadamente 1.7 millones de personas en México, con más de 30 variantes dialectales. Las comunidades que lo hablan se concentran principalmente en Hidalgo, Puebla, Veracruz, San Luis Potosí y la Ciudad de México.",
      "La gramática del náhuatl es polisintética: puede construir palabras muy largas incorporando prefijos y sufijos que en español requerirían frases enteras. 'Nicnequi' significa 'lo quiero' (con todas las referencias de persona incluidas en el verbo). Esta estructura hace que aprender náhuatl cambie profundamente la forma en que percibes el lenguaje.",
      "Organizaciones y universidades en México trabajan activamente en la revitalización del náhuatl, desarrollando materiales didácticos, diccionarios digitales y programas de enseñanza bilingüe. Conocer aunque sea algunas palabras es una forma de conectar con una de las culturas más complejas e influyentes de América.",
    ],
  },
  {
    id: "g-latin",
    flag: "🏛️",
    category: "Raíces",
    readTime: "4 min",
    title: "Por qué el latín sigue vivo",
    excerpt: "El idioma 'muerto' que está en cada frase que pronuncias y en la ley que rige tu país.",
    langName: "Latín",
    body: [
      "El latín lleva siglos siendo declarado idioma muerto, y lleva siglos demostrando que esa etiqueta no le hace justicia. Es la lengua madre del español, el portugués, el francés, el italiano y el rumano: cinco idiomas que juntos suman más de 900 millones de hablantes nativos. En ese sentido, el latín no murió, se multiplicó.",
      "El derecho de casi todos los países del mundo está escrito en latín jurídico. 'Habeas corpus', 'in flagrante delicto', 'ipso facto', 'alibi', 'bona fide', 'pro bono': estas expresiones no son arcaísmos nostálgicos, son terminología técnica activa en tribunales y contratos del siglo XXI.",
      "La ciencia también habla latín. La nomenclatura taxonómica de todos los seres vivos del planeta (Homo sapiens, Canis lupus, Rosa centifolia) usa latín y griego. Los médicos aprenden anatomía en latín. Los farmacéuticos leen recetas en latín. Es el idioma de la precisión técnica internacional.",
      "Aprender latín transforma la relación con el español. Las palabras difíciles dejan de serlo cuando entiendes sus raíces: 'benevolente' (bene + volens: querer bien), 'intransigente' (in + transigere: no ceder), 'perspicaz' (per + specere: ver a través de). Un par de meses de latín básico mejoran notablemente el vocabulario en cualquier lengua romance.",
      "El Vaticano mantiene el latín como idioma oficial. Se siguen publicando encíclicas papales en latín, y existe una comisión que crea neologismos latinos para términos modernos: 'interrete' (internet), 'telephonium alare' (teléfono móvil), 'autocinetus' (automóvil). El latín no está muerto; está actualizándose.",
    ],
  },
];

/* ============================================================================
   6) FALSOS AMIGOS Y MODISMOS (12)
   ========================================================================== */

const FALSE_FRIENDS = [
  {
    flag: "🇬🇧", kind: "falso", langName: "Inglés",
    term: "Embarrassed",
    misleading: "❌ No significa 'embarazada'",
    real: "✓ Significa 'avergonzado / incómodo'",
    example: "\"I was so embarrassed\" → Estaba muy avergonzado.",
  },
  {
    flag: "🇬🇧", kind: "falso", langName: "Inglés",
    term: "Actually",
    misleading: "❌ No significa 'actualmente'",
    real: "✓ Significa 'en realidad / de hecho'",
    example: "\"Actually, I disagree\" → En realidad, no estoy de acuerdo.",
  },
  {
    flag: "🇫🇷", kind: "falso", langName: "Francés",
    term: "Sensible",
    misleading: "❌ No significa 'sensible (emocional)'",
    real: "✓ Significa 'sensato / razonable'",
    example: "\"C'est très sensible\" → Es muy razonable.",
  },
  {
    flag: "🇩🇪", kind: "falso", langName: "Alemán",
    term: "Gift",
    misleading: "❌ No significa 'regalo'",
    real: "✓ Significa 'veneno'",
    example: "\"Das ist Gift\" → Eso es veneno. (El regalo sería 'Geschenk')",
  },
  {
    flag: "🇮🇹", kind: "falso", langName: "Italiano",
    term: "Morbido",
    misleading: "❌ No significa 'morboso'",
    real: "✓ Significa 'suave / blando'",
    example: "\"Il pane è morbido\" → El pan está suave.",
  },
  {
    flag: "🇵🇹", kind: "falso", langName: "Portugués",
    term: "Polvo",
    misleading: "❌ No significa 'polvo (suciedad)'",
    real: "✓ En portugués de Portugal significa 'pulpo'",
    example: "\"Polvo à lagareiro\" → Pulpo a la lagareiro (plato típico).",
  },
  {
    flag: "🇬🇧", kind: "modismo", langName: "Inglés",
    term: "Break a leg",
    misleading: "❌ Literalmente: 'rómpete una pierna'",
    real: "✓ Significa '¡Mucha suerte!' (en contexto teatral)",
    example: "\"Break a leg tonight!\" → ¡Mucha suerte esta noche!",
  },
  {
    flag: "🇫🇷", kind: "modismo", langName: "Francés",
    term: "Avoir le cafard",
    misleading: "❌ Literalmente: 'tener la cucaracha'",
    real: "✓ Significa 'estar deprimido / triste'",
    example: "\"J'ai le cafard» → Estoy deprimido.",
  },
  {
    flag: "🇩🇪", kind: "modismo", langName: "Alemán",
    term: "Ich drücke dir die Daumen",
    misleading: "❌ Literalmente: 'te aprieto los pulgares'",
    real: "✓ Significa '¡Buena suerte!' (equivale a 'cruzar los dedos')",
    example: "\"Ich drücke dir die Daumen!\" → ¡Mucha suerte! / Te cruzo los dedos.",
  },
  {
    flag: "🇯🇵", kind: "modismo", langName: "Japonés",
    term: "猫の手も借りたい (Neko no te mo karitai)",
    misleading: "❌ Literalmente: 'quiero pedir prestada hasta la pata de un gato'",
    real: "✓ Significa 'estoy tan ocupado que necesito cualquier ayuda'",
    example: "\"今、猫の手も借りたい\" → Ahora mismo necesito ayuda de cualquier lado.",
  },
  {
    flag: "🇰🇷", kind: "modismo", langName: "Coreano",
    term: "눈이 높다 (Nuni nopda)",
    misleading: "❌ Literalmente: 'tener los ojos altos'",
    real: "✓ Significa 'tener estándares muy altos (para pareja o trabajo)'",
    example: "\"그녀는 눈이 높아\" → Ella tiene estándares muy altos.",
  },
  {
    flag: "🇨🇳", kind: "modismo", langName: "Chino Mandarín",
    term: "马到成功 (Mǎ dào chénggōng)",
    misleading: "❌ Literalmente: 'el caballo llega y el éxito llega'",
    real: "✓ Significa '¡Éxito inmediato!' / '¡Que todo salga bien desde el primer intento!'",
    example: "\"祝你马到成功！\" → ¡Te deseo éxito inmediato!",
  },
];

/* ============================================================================
   7) PLANES (3: Gratis · Estudiante · Pro)
   ========================================================================== */

const PLANS = {
  free: {
    id: "free",
    name: "Plan Gratuito",
    tagline: "Empieza sin límites de tiempo",
    price: 0,
    annualPrice: 0,
    icon: "star",
    popular: false,
    features: [
      { text: "5 cursos básicos completos",          on: true  },
      { text: "10 idiomas con frases y audio",        on: true  },
      { text: "Traductor a 8 idiomas",                on: true  },
      { text: "Quiz de idiomas",                       on: true  },
      { text: "Tarjetas de vocabulario (20)",          on: true  },
      { text: "Racha diaria y meta de estudio",       on: true  },
      { text: "10 cursos PRO desbloqueados",          on: false },
      { text: "Guías culturales completas",           on: false },
      { text: "Certificado imprimible",               on: false },
      { text: "Sin anuncios",                         on: false },
    ],
  },
  student: {
    id: "student",
    name: "Estudiante",
    tagline: "El favorito de los estudiantes",
    price: 79,
    annualPrice: 699,
    icon: "graduation-cap",
    popular: true,
    features: [
      { text: "Todo lo del Plan Gratuito",            on: true  },
      { text: "10 cursos PRO desbloqueados",          on: true  },
      { text: "Guías culturales completas",           on: true  },
      { text: "Falsos amigos y modismos",             on: true  },
      { text: "Sin anuncios",                         on: true  },
      { text: "Certificado imprimible",               on: false },
      { text: "Acceso anticipado a nuevos cursos",   on: false },
      { text: "Soporte prioritario",                  on: false },
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    tagline: "Para el aprendiz comprometido",
    price: 149,
    annualPrice: 1299,
    icon: "crown",
    popular: false,
    features: [
      { text: "Todo lo del Plan Estudiante",          on: true  },
      { text: "Certificado imprimible en PDF",        on: true  },
      { text: "Acceso anticipado a nuevos cursos",   on: true  },
      { text: "Soporte prioritario por correo",      on: true  },
      { text: "Descarga de material en PDF",         on: true  },
      { text: "Insignias de logro",                  on: true  },
    ],
  },
};
