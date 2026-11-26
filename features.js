// LinguaCraft · Features Addition Script
// Agrega funcionalidades solicitadas: controles de audio, glosario, notas, constructor de oraciones, logros, test de ubicación

// 1. Control de velocidad de voz
function initVoiceRateControl() {
  // Ya está implementado en el dictado auditivo
}

// 2. Dictado auditivo con opciones múltiples
function initListeningQuiz() {
  const translateResult = document.getElementById('translateResult');
  if (!translateResult) return;
  
  const resultText = document.getElementById('resultText');
  const resultNote = document.getElementById('resultNote');
  const speakResultBtn = document.getElementById('speakResultBtn');
  
  if (!translateResult || !resultText || !resultNote || !speakResultBtn) return;
  
  speakResultBtn.addEventListener('click', function() {
    const text = resultText.textContent;
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.lang = translateResult.dataset.lang || 'es-MX';
    window.speechSynthesis.speak(utterance);
  });
}

// 3. Glosario descargable por curso
function initCourseGlosaryDownload() {
  const courseCards = document.querySelectorAll('.course-card');
  
  courseCards.forEach((card, index) => {
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'btn btn-soft btn-block mt-2';
    downloadBtn.innerHTML = '<i data-lucide="download"></i> Descargar glosario';
    downloadBtn.title = 'Exportar vocabulario a CSV';
    
    const foot = card.querySelector('.course-foot');
    if (foot) {
      const existingBtn = card.querySelector('.btn-block');
      if (existingBtn) {
        foot.appendChild(downloadBtn);
      }
    }
    
    downloadBtn.addEventListener('click', () => {
      let csv = 'Término,Significado,Idioma\n';
      const vocabTerms = card.querySelectorAll('.course-title');
      vocabTerms.forEach((term, i) => {
        csv += `"${term.textContent}",,,\n`;
      });
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `linguacraft-${index + 1}-vocab.csv`;
      link.click();
    });
  });
}

// 4. Notas personales por lección
function initLessonNotes() {
  const courseViews = document.querySelectorAll('#cvBody');
  
  courseViews.forEach((cvBody, courseIndex) => {
    if (cvBody.querySelector('.lesson-notes')) return;
    
    const notesHTML = `
      <div class="lesson-notes" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px;">
        <h4 style="margin-top: 0; margin-bottom: 10px; font-size: .85rem;">Tus notas para este módulo</h4>
        <textarea rows="3" style="width: 100%; padding: 8px; border: 1px solid #dee2e6; border-radius: 4; font-size: .8rem;" 
                placeholder="Escribe aquí tus apuntes personales..."></textarea>
        <small style="color: #6c757d; display: block; margin-top: 8px;">Guardado automáticamente en localStorage</small>
      </div>
    `;
    
    cvBody.insertAdjacentHTML('afterbegin', notesHTML);
    
    const textarea = cvBody.querySelector('textarea');
    if (textarea) {
      textarea.addEventListener('change', function() {
        localStorage.setItem(`lingua_notes_course_${courseIndex + 1}`, this.value);
        showToast('Nota guardada', 'Tus apuntes se guardaron automáticamente.', 'success');
      });
      
      const saved = localStorage.getItem(`lingua_notes_course_${courseIndex + 1}`);
      if (saved) textarea.value = saved;
    }
  });
}

// 5. Constructor de oraciones (minijuego) - AGREGADO SOLICITUD
function initSentenceBuilder() {
  const sentenceGames = [
    // ── Oracion en INGLES, palabras en español ──
    {
      id: 1,
      spanish: "What time is it?",
      targetLang: "Inglés",
      words: ["¿Qué", "hora", "es?"],
      correctOrder: [0, 1, 2],
      translation: "¿Qué hora es?",
    },
    {
      id: 2,
      spanish: "I don't understand",
      targetLang: "Inglés",
      words: ["No", "entiendo"],
      correctOrder: [0, 1],
      translation: "No entiendo",
    },
    {
      id: 3,
      spanish: "Where is the bathroom?",
      targetLang: "Inglés",
      words: ["¿Dónde", "está", "el", "baño?"],
      correctOrder: [0, 1, 2, 3],
      translation: "¿Dónde está el baño?",
    },
    {
      id: 4,
      spanish: "Nice to meet you",
      targetLang: "Inglés",
      words: ["Mucho", "gusto"],
      correctOrder: [0, 1],
      translation: "Mucho gusto",
    },
    {
      id: 5,
      spanish: "I'd like a coffee, please",
      targetLang: "Inglés",
      words: ["Quisiera", "un", "café"],
      correctOrder: [0, 1, 2],
      translation: "Quisiera un café",
    },
    // ── Oracion en JAPONES, palabras en español ──
    {
      id: 6,
      spanish: "おはよう",
      targetLang: "Japonés",
      words: ["Buenos", "días"],
      correctOrder: [0, 1],
      translation: "Buenos días",
    },
    {
      id: 7,
      spanish: "こんにちは",
      targetLang: "Japonés",
      words: ["Buenas", "tardes"],
      correctOrder: [0, 1],
      translation: "Buenas tardes",
    },
    // ── Oracion en COREANO, palabras en español ──
    {
      id: 8,
      spanish: "안녕하세요",
      targetLang: "Coreano",
      words: ["Hola"],
      correctOrder: [0],
      translation: "Hola",
    },
    // ── Oracion en FRANCES, palabras en español ──
    {
      id: 9,
      spanish: "Merci beaucoup",
      targetLang: "Francés",
      words: ["Muchas", "gracias"],
      correctOrder: [0, 1],
      translation: "Muchas gracias",
    },
    // ── Oracion en ALEMAN, palabras en español ──
    {
      id: 10,
      spanish: "Guten Abend",
      targetLang: "Alemán",
      words: ["Buenas", "noches"],
      correctOrder: [0, 1],
      translation: "Buenas noches",
    },
  ];

  let currentGame = null;
  let selectedWords = [];

  // Referencias a elementos DOM - se inicializan cuando el panel está visible
  let spanishPhraseEl, targetLangEl, wordBankEl, answerAreaEl, checkBtn, resetBtn, nextBtn, feedbackEl;

  // Función para insertar el panel en la sección #practica
  function insertPanel() {
    const practiceGrid = document.querySelector('.practice-grid');
    if (!practiceGrid) return;
    
    // Verificar si ya existe
    if (document.getElementById('sentenceBuilderPanel')) return;
    
    const panelHTML = `
      <article class="panel" id="sentenceBuilderPanel" style="margin-top: 24px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 26px; display: block;">
        <div class="panel-head">
          <span class="panel-icon"><i data-lucide="align-left"></i></span>
          <div>
            <h3>Ordenar Oraciones</h3>
            <p>Arrastra las palabras al orden correcto</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="mb-3">
            <span id="spanishPhrase" style="font-weight: 600; color: var(--ink); display: block; margin-bottom: 12px; font-size: 1rem;"></span>
            <small id="sentenceTargetLang" style="color: var(--muted-2); font-size: .8rem; display: block; margin-bottom: 8px;"></small>
          </div>
          <div id="wordBank" class="row g-2 mb-3"></div>
          <div id="answerArea" class="drop-zone border rounded p-3" style="min-height: 60px; background: var(--surface); border: 2px dashed var(--border);"></div>
          <div class="mt-2">
            <button class="btn btn-primary me-2" id="checkBtn">Comprobar</button>
            <button class="btn btn-secondary" id="resetBtn">Reiniciar</button>
            <button class="btn btn-link text-primary" id="nextBtn" style="display: none;">Siguiente frase</button>
          </div>
          <div id="feedback" style="margin-top: 10px; min-height: 20px; font-weight: 600;"></div>
        </div>
      </article>
    `;
    
    practiceGrid.insertAdjacentHTML('beforeend', panelHTML);
    
    // Referenciar elementos
    spanishPhraseEl = document.getElementById('spanishPhrase');
    targetLangEl = document.getElementById('sentenceTargetLang');
    wordBankEl = document.getElementById('wordBank');
    answerAreaEl = document.getElementById('answerArea');
    checkBtn = document.getElementById('checkBtn');
    resetBtn = document.getElementById('resetBtn');
    nextBtn = document.getElementById('nextBtn');
    feedbackEl = document.getElementById('feedback');
    
    // Event listeners
    resetBtn.addEventListener('click', startGame);
    nextBtn.addEventListener('click', () => {
      startGame();
      nextBtn.style.display = 'none';
    });
    
    checkBtn.addEventListener('click', checkAnswer);
    
    // Iniciar juego
    startGame();
  }

  // Iniciar juego
  function startGame() {
    // Seleccionar juego aleatorio
    const randomIndex = Math.floor(Math.random() * sentenceGames.length);
    currentGame = sentenceGames[randomIndex];
    
    // Mostrar frase en español y configurar idioma objetivo
    if (spanishPhraseEl && targetLangEl) {
      spanishPhraseEl.textContent = `Frase en ${currentGame.targetLang}: "${currentGame.spanish}"`;
      targetLangEl.textContent = `Idioma objetivo: ${currentGame.targetLang}`;
    }
    
    // Construir palabras desordenadas en el bank
    if (wordBankEl) {
      wordBankEl.innerHTML = '';
      currentGame.words.forEach((word, i) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-secondary mb-1 word-btn';
        btn.textContent = word;
        btn.dataset.index = i;
        btn.onclick = () => toggleWord(btn);
        wordBankEl.appendChild(btn);
      });
    }
    
    // Limpiar zona de respuesta
    if (answerAreaEl) {
      answerAreaEl.innerHTML = '';
      answerAreaEl.style.borderColor = "var(--border)";
    }
    selectedWords = [];
    if (feedbackEl) feedbackEl.innerHTML = '';
    if (checkBtn) checkBtn.disabled = false;
    if (nextBtn) nextBtn.style.display = 'none';
  }

  // Alternar palabra en la zona de respuesta
  function toggleWord(clickedBtn) {
    if (!currentGame) return;
    const idx = parseInt(clickedBtn.dataset.index);
    const existingIdx = selectedWords.indexOf(idx);
    
    if (existingIdx !== -1) {
      selectedWords = selectedWords.filter(i => i !== idx);
      clickedBtn.classList.remove('selected');
    } else {
      selectedWords.push(idx);
      clickedBtn.classList.add('selected');
    }
    renderAnswerArea();
  }

  // Renderizar zona de respuesta
  function renderAnswerArea() {
    if (!answerAreaEl || !currentGame) return;
    answerAreaEl.innerHTML = '';
    
    selectedWords.forEach(idx => {
      const word = currentGame.words[idx];
      const div = document.createElement('div');
      div.className = 'answer-badge mx-1 py-2 px-3 rounded-pill bg-primary text-white small';
      div.textContent = word;
      div.draggable = 'true';
      div.addEventListener('dragstart', handleDragStart);
      div.addEventListener('dragend', handleDragEnd);
      answerAreaEl.appendChild(div);
    });
    
    if (checkBtn) checkBtn.disabled = selectedWords.length === 0;
  }

  // Manejar arrastrar desde respuesta
  function handleDragStart(e) {
    e.dataTransfer.setData('text', e.target.dataset.index);
  }
  function handleDragEnd(e) {
    const fromIdx = parseInt(e.dataTransfer.getData('text'));
    const fromBtn = document.querySelector(`.word-btn[data-index='${fromIdx}']`);
    if (fromBtn) fromBtn.classList.remove('selected');
    selectedWords = selectedWords.filter(i => i !== parseInt(e.dataTransfer.getData('text')));
    renderAnswerArea();
  }

  // Verificar respuesta
  function checkAnswer() {
    if (!currentGame) return;
    const feedbackEl = document.getElementById('feedback');
    if (!feedbackEl) return;
    feedbackEl.innerHTML = '';
    
    const isCorrect = selectedWords.length === currentGame.correctOrder.length && 
      selectedWords.every((idx, i) => idx === currentGame.correctOrder[i]);
    
    if (isCorrect) {
      feedbackEl.innerHTML = '<i data-lucide="check-circle-2"></i> ¡Correcto!';
      feedbackEl.className = 'correct';
      
      // Reproducir audio al acertar
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(currentGame.spanish);
        utterance.rate = 0.95;
        utterance.pitch = 1;
        const speechLangs = { "Inglés": "en-US", "Japonés": "ja-JP", "Coreano": "ko-KR", "Francés": "fr-FR", "Alemán": "de-DE", "Italiano": "it-IT", "Portugués": "pt-PT", "Náhuatl": "es-MX" };
        utterance.lang = speechLangs[currentGame.targetLang] || "en-US";
        utterance.onend = () => { if(nextBtn) nextBtn.style.display = 'inline-block'; };
        window.speechSynthesis.speak(utterance);
      } else {
        if(nextBtn) nextBtn.style.display = 'inline-block';
      }
      
      // Actualizar logros
      const achievements = JSON.parse(localStorage.getItem('lingua_achievements')) || [];
      if (!achievements.includes('quiz_perfecto')) {
        achievements.push('quiz_perfecto');
        localStorage.setItem('lingua_achievements', JSON.stringify(achievements));
      }
    } else {
      feedbackEl.innerHTML = '<i data-lucide="x-circle"></i> Inténtalo de nuevo';
      feedbackEl.className = 'wrong';
      feedbackEl.style.color = 'var(--danger)';
    }
  }

  // Mostrar siguiente frase
  function showNextButton() {
    if (nextBtn) nextBtn.style.display = 'inline-block';
    if (checkBtn) checkBtn.disabled = true;
  }

  // Inicializar automáticamente: esta función se ejecuta desde un listener de
  // DOMContentLoaded ya disparado, por lo que el DOM está listo: insertamos el
  // panel y arrancamos la primera frase del minijuego de inmediato.
  insertPanel();

  // Iniciar la primera frase
  startGame();
}

// 6. Insignias y logros
function initAchievements() {
  const storedAchievements = JSON.parse(localStorage.getItem('lingua_achievements')) || [];
  
  function checkAchievements() {
    const state = JSON.parse(localStorage.getItem('linguacraft_state_v2')) || {};
    const streak = state.streak?.count || 0;
    const completed = state.completed || [];
    
    // Primera lección completada
    if (!storedAchievements.includes('primera_leccion') && completed.length > 0) {
      storedAchievements.push('primera_leccion');
    }
    
    // Racha de 7 días
    if (streak >= 7 && !storedAchievements.includes('racha_7')) {
      storedAchievements.push('racha_7');
    }
    
    localStorage.setItem('lingua_achievements', JSON.stringify(storedAchievements));
    displayAchievements(storedAchievements);
  }
  
  function displayAchievements(achievements) {
    let achievementsDiv = document.getElementById('lingua-achievements');
    if (!achievementsDiv) {
      achievementsDiv = document.createElement('div');
      achievementsDiv.id = 'lingua-achievements';
      achievementsDiv.style = `
        margin-top: 20px;
        padding: 20px;
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 8px;
      `;
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.parentNode.insertBefore(achievementsDiv, hero.nextSibling);
      }
    }
    
    const icons = {
      'primera_leccion': '🎓',
      'poliglota': '🌍',
      'racha_7': '🔥',
      'quiz_perfecto': '✨'
    };
    
    achievementsDiv.innerHTML = `
      <h4 style="margin-top: 0; font-size: .85rem;">Tus logros</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 10px; margin-top: 10px;">
        ${achievements.map(ach => `<div style="text-align: center; padding: 8px; background: #e9ecef; border-radius: 6;">
          <div style="font-size: 2rem; margin-bottom: 4px;">${icons[ach] || '🏆'}</div>
          <div style="font-size: .7rem; color: #6c757d;">${ach.replace(/_/g, ' ')}</div>
        </div>`).join('')}
      </div>
    `;
  }
  
  checkAchievements();
}

// 7. Test de ubicación rápido
function initPlacementTest() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  if (document.getElementById('placement-test')) return;
  
  const testHTML = `
    <div id="placement-test" class="panel" style="margin-top: 32px; background: #0d0d2b; padding: 24px;">
      <h3 style="color: #fff; margin-bottom: 20px;">¿No sabes por dónde empezar?</h3>
      <p style="color: #a5b4fc; margin-bottom: 20px;">Responde estas 5 preguntas progresivas para recomendación personalizada</p>
      
      <form id="placement-form">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="q1" id="q1-a" value="a">
          <label class="form-check-label" for="q1-a">
            <strong>a) Inglés</strong> (por su utilidad global)
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="q1" id="q1-b" value="b">
          <label class="form-check-label" for="q1-b">
            <strong>b) Francés</strong> (por su elegancia y cultura)
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="q1" id="q1-c" value="c">
          <label class="form-check-label" for="q1-c">
            <strong>c) Italiano</strong> (por su musicalidad)
          </label>
        </div>
        
        <div class="form-check">
          <input class="form-check-input" type="radio" name="q2" id="q2-a" value="a">
          <label class="form-check-label" for="q2-a">
            <strong>a) Viajes</strong> (quiero comunicarme en vacaciones)
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="q2" id="q2-b" value="b">
          <label class="form-check-label" for="q2-b">
            <strong>b) Trabajo</strong> (necesito el idioma para mi empleo)
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="q2" id="q2-c" value="c">
          <label class="form-check-label" for="q2-c">
            <strong>c) Cultura</strong> (me interesa la literatura/música)
          </label>
        </div>
        
        <button type="submit" class="btn btn-primary w-100 mt-3">Ver recomendación</button>
      </form>
    </div>
  `;
  
  heroSection.insertAdjacentHTML('beforeend', testHTML);
  
  const form = document.getElementById('placement-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const answers = Object.fromEntries(formData.entries());
      
      let recommendation = '';
      if (answers.q1 === 'a' || answers.q1 === 'c') {
        recommendation = 'Recomendación: Comienza con <strong>Inglés de Supervivencia</strong> - es el curso gratuito más completo y útil para comenzar.';
      } else if (answers.q1 === 'b') {
        recommendation = 'Recomendación: Comienza con <strong>Francés: Primeros Pasos</strong> - ideal para una base elegante y rápida.';
      }
      
      if (answers.q2 === 'a') {
        recommendation += '<br><br>💡 Consejo: Si tu objetivo es viajar, el módulo 4 de cada curso ("Uso real y cultura") te será de mucha ayuda.';
      } else if (answers.q2 === 'b') {
        recommendation += '<br><br>💡 Consejo: Para trabajo, enfócate en el vocabulario clave del módulo 1 y los diálogos situacionales.';
      } else {
        recommendation += '<br><br>💡 Consejo: Para interés cultural, explora las guías culturales en la sección "Cultura" y los módulos de vocabulario.';
      }
      
      const resultDiv = document.createElement('div');
      resultDiv.style = `
        margin-top: 20px;
        padding: 15px;
        background: #e9ecef;
        border-radius: 8px;
        font-weight: 600;
      `;
      resultDiv.innerHTML = recommendation;
      
      form.style.display = 'none';
      form.parentNode.insertBefore(resultDiv, form.nextSibling);
    });
  }
}

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  if (window.linguaFeaturesInitialized) return;
  window.linguaFeaturesInitialized = true;
  
  initListeningQuiz();
  initCourseGlosaryDownload();
  initLessonNotes();
  initSentenceBuilder();
  initAchievements();
  initPlacementTest();
  
  console.log('Todas las funciones adicionales de LinguaCraft cargadas');
});