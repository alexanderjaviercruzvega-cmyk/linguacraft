/* ============================================================================
   LinguaCraft · app.js
   JavaScript Vanilla (ES6+)
   Autor: Proyecto escolar de preparatoria
   ----------------------------------------------------------------------------
   La CONTENIDO vive en data.js (LANGUAGES, COURSES, VOCAB_CARDS, QUIZ,
   CULTURE_GUIDES, FALSE_FRIENDS, PLANS). Este archivo solo contiene la lógica.

   ÍNDICE
   1)  Constantes de configuración (EmailJS, APIs)
   2)  Estado de la aplicación + localStorage
   3)  Utilidades (DOM, toast, audio, formato)
   4)  Tema claro / oscuro
   5)  Navegación (navbar, scroll, reveal)
   6)  Idiomas (render + audio)
   7)  Catálogo de cursos (render, filtros, modal, completado)
   8)  Zona de estudio (progreso, racha, meta, tarjetas)
   9)  Traductor instantáneo (MyMemory API + audio)
   10) Quiz interactivo (8 preguntas)
   11) Guías culturales + falsos amigos / modismos
   12) Planes + registro + correo (EmailJS) + certificado
   13) Footer y arranque
   ========================================================================== */

/* ============================================================================
   1) CONSTANTES DE CONFIGURACIÓN
   ----------------------------------------------------------------------------
   👉 CAMBIA ESTOS VALORES POR LOS TUYOS (ver guía al final del proyecto).
   Mientras sigan con el texto "TU_...", la app funciona en MODO SIMULACIÓN:
   no envía correos reales, pero muestra todo de forma visual sin errores.
   ========================================================================== */

const EMAILJS_PUBLIC_KEY  = "bv3LqseYGY0LHMXhS";   // Account > API Keys > Public Key
const EMAILJS_SERVICE_ID  = "service_dmda9d4";   // Email Services > Service ID
const EMAILJS_TEMPLATE_ID = "template_me6qeb9";  // Email Templates > Template ID

// Endpoint de la API gratuita de traducción (no requiere API Key)
const MYMEMORY_ENDPOINT = "https://api.mymemory.translated.net/get";
const MYMEMORY_CONTACT  = "linguacraft@example.com"; // el plan gratuito pide un contacto (opcional)

// Diccionario rápido de idiomas por id (para nombres y banderas)
const LANG_BY_ID = Object.fromEntries(LANGUAGES.map((l) => [l.id, l]));

// Cada pregunta del quiz se apoya en una tarjeta de vocabulario: si fallas,
// esa tarjeta se marca automáticamente para repaso.
const QUIZ_REVIEW_CARD = ["c-ja-1", "c-ko-1", "c-fr-1", "c-ja-1", "c-zh-1", "c-nah-1", "c-it-2", "c-la-1"];

/* ============================================================================
   2) ESTADO + localStorage
   ========================================================================== */

const STORAGE_KEY = "linguacraft_state_v2";

const DEFAULT_STATE = {
  plan: "free",          // "free" | "student" | "pro"
  user: null,            // { name, email }
  billing: "monthly",    // "monthly" | "annual"
  theme: "light",        // "light" | "dark"
  streak: { count: 0, best: 0, lastDay: null },
  goal: 5,               // meta diaria (1–10)
  todayKey: null,        // "YYYY-MM-DD" del último día registrado
  todayCount: 0,         // repasos hechos hoy
  review: [],            // ids de tarjetas marcadas para repaso
  completed: [],         // ids de cursos marcados como completados
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      streak: { ...DEFAULT_STATE.streak, ...(parsed.streak || {}) },
    };
  } catch (err) {
    console.warn("[LinguaCraft] No se pudo leer el estado guardado:", err);
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("[LinguaCraft] No se pudo guardar el estado:", err);
  }
}

/* ============================================================================
   3) UTILIDADES
   ========================================================================== */

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/** Vuelve a dibujar los iconos de Lucide (incluye los generados dinámicamente). */
function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

/** Escapa texto para insertarlo de forma segura en HTML. */
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ICONS_BY_TYPE = { success: "check-circle-2", error: "alert-circle", info: "info" };

/** Muestra una notificación flotante (toast). */
function showToast(title, message = "", type = "info", timeout = 5000) {
  const stack = $("#toastStack");
  if (!stack) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon"><i data-lucide="${ICONS_BY_TYPE[type] || "info"}"></i></span>
    <div class="toast-content">
      <p class="toast-title">${escapeHtml(title)}</p>
      ${message ? `<p class="toast-msg">${escapeHtml(message)}</p>` : ""}
    </div>
    <button class="toast-close" type="button" aria-label="Cerrar notificación"><i data-lucide="x"></i></button>
  `;

  stack.appendChild(toast);
  refreshIcons();

  const remove = () => {
    toast.classList.add("is-hiding");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  };
  $(".toast-close", toast).addEventListener("click", remove);
  if (timeout > 0) setTimeout(remove, timeout);
}

/**
 * Reproduce texto con la voz nativa del navegador (Web Speech API).
 * @param {string} text      Texto a leer
 * @param {string} lang      Código BCP-47, p. ej. "ja-JP"
 * @param {HTMLElement} [btn] Botón opcional para animar mientras habla
 * @param {string} [fallback] Voz de respaldo si no existe voz para `lang`
 */
function speak(text, lang = "es-MX", btn = null, fallback = null) {
  if (!("speechSynthesis" in window)) {
    showToast("Audio no disponible", "Tu navegador no soporta la síntesis de voz.", "error");
    return;
  }
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.lang = lang;

  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find((v) => v.lang === lang);
  const loose = voices.find((v) => v.lang.replace("_", "-").toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()));
  const voice = exact || loose;

  if (voice) utterance.voice = voice;
  else if (fallback) utterance.lang = fallback; // p. ej. náhuatl → es-MX, latín → it-IT

  if (btn) {
    btn.classList.add("is-speaking");
    utterance.onend = () => btn.classList.remove("is-speaking");
    utterance.onerror = () => btn.classList.remove("is-speaking");
  }
  window.speechSynthesis.speak(utterance);
}

/** Devuelve true si las claves de EmailJS ya fueron reemplazadas. */
function isEmailJsConfigured() {
  return (
    !EMAILJS_PUBLIC_KEY.startsWith("TU_") &&
    !EMAILJS_SERVICE_ID.startsWith("TU_") &&
    !EMAILJS_TEMPLATE_ID.startsWith("TU_")
  );
}

/** Control genérico de modales (abrir / cerrar). */
function openModal(el) {
  if (!el) return;
  el.classList.add("is-open");
  el.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(el) {
  if (!el) return;
  el.classList.remove("is-open");
  el.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function closeAllModals() {
  $$(".modal-overlay").forEach((m) => closeModal(m));
}

/** Formatea un precio en pesos mexicanos. */
function formatMoney(n) {
  return `$${n.toLocaleString("es-MX")}`;
}

/** Fechas locales en formato YYYY-MM-DD. */
function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
}

/* ============================================================================
   4) TEMA CLARO / OSCURO
   ========================================================================== */

function applyTheme(theme) {
  const isDark = theme === "dark";
  if (isDark) document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.removeAttribute("data-theme");

  const btn = $("#themeToggle");
  if (btn) {
    btn.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}"></i>`;
    refreshIcons();
  }
}

function initTheme() {
  // Si el usuario nunca eligió, respetamos la preferencia del sistema.
  if (!localStorage.getItem(STORAGE_KEY)) {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    state.theme = prefersDark ? "dark" : "light";
  }
  applyTheme(state.theme);

  $("#themeToggle")?.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveState();
    applyTheme(state.theme);
    showToast(state.theme === "dark" ? "Modo oscuro activado" : "Modo claro activado", "", "info", 2200);
  });
}

/* ============================================================================
   5) NAVEGACIÓN
   ========================================================================== */

function initNavbar() {
  const navbar = $("#navbar");
  const progress = $("#scrollProgress");
  const navLinks = $("#navLinks");
  const navToggle = $("#navToggle");

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle("is-scrolled", y > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menú móvil
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`;
    refreshIcons();
  });

  // Cerrar menú móvil al hacer clic en un enlace
  $$(".nav-link", navLinks).forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.innerHTML = '<i data-lucide="menu"></i>';
      refreshIcons();
    })
  );

  // Enlace activo según la sección visible
  const sections = $$("main section[id]");
  const linkFor = (id) => $(`.nav-link[href="#${id}"]`, navLinks);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$(".nav-link", navLinks).forEach((l) => l.classList.remove("is-active"));
        const link = linkFor(entry.target.id);
        if (link) link.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
}

/** Animación de aparición al hacer scroll. */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Activa con animación escalonada todos los elementos del hero al cargar
  const heroItems = $$(".hero .reveal");
  heroItems.forEach((el, i) => {
    setTimeout(() => el.classList.add("is-visible"), i * 90);
  });

  const obs = new IntersectionObserver(
    (entries, o) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
          e.target.classList.add("is-visible");
          o.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => {
    if (!el.classList.contains("is-visible")) obs.observe(el);
  });
}

/* ============================================================================
   6) IDIOMAS
   ========================================================================== */

function renderLanguages() {
  const grid = $("#langGrid");
  if (!grid) return;

  grid.innerHTML = LANGUAGES.map(
    (l) => `
    <article class="lang-card">
      <div class="lang-head">
        <span class="lang-flag">${l.flag}</span>
        <div>
          <h3>${escapeHtml(l.name)}</h3>
          <span class="lang-tag">${escapeHtml(l.tag)}</span>
        </div>
      </div>
      <p class="lang-tagline">${escapeHtml(l.tagline)}</p>

      <div class="phrase-list">
        ${l.phrases
          .map(
            (p, i) => `
          <div class="phrase-row">
            <div class="phrase-main">
              <div class="phrase-term">${escapeHtml(p.term)}</div>
              <div class="phrase-romaji">${escapeHtml(p.romaji)}</div>
            </div>
            <div class="phrase-mean">${escapeHtml(p.meaning)}</div>
            <button class="phrase-audio" type="button" data-lang="${l.id}" data-phrase="${i}"
                    aria-label="Escuchar ${escapeHtml(p.term)}" aria-pressed="false">
              <i data-lucide="volume-2"></i>
            </button>
          </div>`
          )
          .join("")}
      </div>

      <p class="lang-cultural">${escapeHtml(l.cultural)}</p>
      <p class="lang-note">
        <i data-lucide="volume-2"></i>
        ${l.mymemory ? "Audio y traducción en vivo disponibles" : "Audio con voz de respaldo (sin traducción en vivo)"}
      </p>
    </article>`
  ).join("");

  refreshIcons();
}

function initLanguageGrid() {
  const grid = $("#langGrid");
  if (!grid) return;
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".phrase-audio");
    if (!btn) return;
    const lang = LANG_BY_ID[btn.dataset.lang];
    if (!lang) return;
    const phrase = lang.phrases[Number(btn.dataset.phrase)];
    if (phrase) speak(phrase.term, lang.speech, btn, lang.fallback);
  });
}

/* ============================================================================
   7) CATÁLOGO DE CURSOS
   ========================================================================== */

const courseFilters = { tag: "all", level: "all" };

function isCourseLocked(course) {
  return course.tag === "pro" && state.plan === "free";
}
function isCourseCompleted(course) {
  return state.completed.includes(course.id);
}

// Detecta si venimos de un enlace "curso completo" ?course=ID
const urlParams = new URLSearchParams(window.location.search);
const courseFromParam = urlParams.get("course");

function renderCourses() {
  const grid = $("#courseGrid");
  if (!grid) return;

  // Si venimos del modo "curso completo" en nueva ventana, oc hero y mostramos solo ese curso
  if (courseFromParam) {
    const course = COURSES.find((c) => c.id === courseFromParam);
    if (course) {
      grid.innerHTML = `
        <div class="course-detail-page">
          <button class="btn btn-ghost btn-back" style="position:absolute;top:20px;left:20px" id="backToHome">
            <i data-lucide="arrow-left"></i> Volver al inicio
          </button>
          <div class="course-cover" style="background:${course.cover};height:200px;margin:-20px -20px 20px;border-radius:12px 12px 0 0;">
            <span class="course-tag ${course.tag === "pro" ? "tag-pro" : "tag-free"}">
              <i data-lucide="${course.tag === "pro" ? "crown" : "unlock"}"></i> ${course.tag === "pro" ? "PRO" : "Gratis"}
            </span>
            <span class="cover-flag">${course.flag}</span>
          </div>
          <div class="container">
            <div class="course-detail-header">
              <span class="course-lang">${escapeHtml(course.langName)} · ${escapeHtml(course.level)}</span>
              <h2 class="course-title">${escapeHtml(course.title)}</h2>
              <p class="course-desc">${escapeHtml(course.desc)}</p>
              <div class="course-meta">
                <span><i data-lucide="clock"></i> ${escapeHtml(course.duration)}</span>
                <span><i data-lucide="layers"></i> 3 módulos</span>
                <span><i data-lucide="bar-chart-3"></i> ${escapeHtml(course.level)}</span>
              </div>
            </div>

            <div class="mc-section">
              <h3><i data-lucide="list-checks"></i> Temario</h3>
              <ul>${course.syllabus.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
            </div>

            <div class="mc-section">
              <h3><i data-lucide="book-open"></i> Módulos completos</h3>
              ${course.modules
                .map(
                  (m, i) => `
              <div class="module-item">
                <span class="module-num"><i data-lucide="layers"></i> Módulo ${i + 1}</span>
                <h4>${escapeHtml(m.title)}</h4>
                <p>${escapeHtml(m.summary)}</p>
                <ul>${m.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
              </div>`
                )
                .join("")}
            </div>

            <div class="mc-section">
              <h3><i data-lucide="headphones"></i> Vocabulario con audio</h3>
              ${course.vocab
                .map(
                  (v, i) => `
              <div class="vocab-item">
                <div class="vocab-main">
                  <div class="vocab-term">${escapeHtml(v.term)}</div>
                  <div class="vocab-romaji">${escapeHtml(v.romaji)}</div>
                </div>
                <div class="vocab-mean">${escapeHtml(v.meaning)}</div>
                <button class="vocab-audio" type="button" data-audio="${i}" aria-label="Escuchar ${escapeHtml(v.term)}">
                  <i data-lucide="volume-2"></i>
                </button>
              </div>`
                )
                .join("")}
            </div>

            <div class="mc-section">
              <h3><i data-lucide="messages-square"></i> Diálogo de ejemplo</h3>
              ${course.dialogue
                .map(
                  (d, i) => `
              <div class="dialogue-row">
                <span class="dialogue-who">${escapeHtml(d.who)}</span>
                <div class="dialogue-line">
                  <div class="dialogue-orig">
                    ${escapeHtml(d.line)}
                    <button class="dialogue-audio" type="button" data-dialogue="${i}" aria-label="Escuchar">
                      <i data-lucide="volume-2"></i>
                    </button>
                  </div>
                  <div class="dialogue-tr">${escapeHtml(d.tr)}</div>
                </div>
              </div>`
                )
                .join("")}
            </div>

            <div class="mc-section">
              <div class="cultural-note">
                <h3><i data-lucide="landmark"></i> Nota cultural</h3>
                <p>${escapeHtml(course.cultural)}</p>
              </div>
            </div>

            <div class="course-complete-bar">
              <p><i data-lucide="check-circle-2"></i> ${isCourseCompleted(course) ? "Marcaste este curso como completado." : "¿Terminaste el curso? Márcalo para tu certificado."}</p>
              <button class="btn ${isCourseCompleted(course) ? "btn-ghost" : "btn-accent"}" type="button" id="completeCourseBtn" data-course="${course.id}">
                <i data-lucide="${isCourseCompleted(course) ? "rotate-ccw" : "award"}"></i> ${isCourseCompleted(course) ? "Quitar de completados" : "Marcar como completado"}
              </button>
            </div>
          </div>
        </div>
      `;
      refreshIcons();

      // Audio del vocabulario
      $$("[data-audio]", grid).forEach((btn) => {
        btn.addEventListener("click", () => {
          const v = course.vocab[Number(btn.dataset.audio)];
          if (v) speak(v.term, v.lang, btn, v.fallback || LANG_BY_ID[course.langId]?.fallback);
        });
      });

      // Audio del diálogo
      $$("[data-dialogue]", grid).forEach((btn) => {
        btn.addEventListener("click", () => {
          const d = course.dialogue[Number(btn.dataset.dialogue)];
          const lang = LANG_BY_ID[course.langId];
          if (d) speak(d.line, lang?.speech || "es-MX", btn, lang?.fallback);
        });
      });

      // Marcar curso como completado
      $("#completeCourseBtn")?.addEventListener("click", () => toggleCourseCompleted(course.id));

      // Botón volver al inicio
      $("#backToHome")?.addEventListener("click", () => {
        window.location.hash = "";
        // Forzamos recarga quitando el param
        const newUrl = window.location.pathname + window.location.search.replace(/\?course=[^&]*/, "").replace(/&$/,"").replace(/\?$/, "");
        window.history.replaceState({}, document.title, newUrl);
        renderCourses(); // volvemos a renderizar la pantalla inicial
      });

      return;
    }
  }

  // Vistas normales del catálogo (grid original)
  const list = COURSES.filter(
    (c) =>
      (courseFilters.tag === "all" || c.tag === courseFilters.tag) &&
      (courseFilters.level === "all" || c.level === courseFilters.level)
  );

  if (!list.length) {
    grid.innerHTML = `<div class="deck-empty"><i data-lucide="search-x"></i><p>No hay cursos con esos filtros.</p></div>`;
    refreshIcons();
    return;
  }

  grid.innerHTML = list
    .map((c, i) => {
      const isPro = c.tag === "pro";
      const locked = isCourseLocked(c);
      const done = isCourseCompleted(c);
      return `
        <article class="course-card ${locked ? "is-locked" : ""}" style="animation-delay:${i * 50}ms" data-id="${c.id}">
          <div class="course-cover" style="background:${c.cover}">
            <span class="course-tag ${isPro ? "tag-pro" : "tag-free"}">
              <i data-lucide="${isPro ? "crown" : "unlock"}"></i> ${isPro ? "PRO" : "Gratis"}
            </span>
            <span class="cover-flag">${c.flag}</span>
          </div>
          <div class="course-body">
            <span class="course-lang">${escapeHtml(c.langName)} · ${escapeHtml(c.level)}</span>
            <h3 class="course-title">${escapeHtml(c.title)}</h3>
            <p class="course-desc">${escapeHtml(c.desc)}</p>
            <div class="course-meta">
              <span><i data-lucide="clock"></i> ${escapeHtml(c.duration)}</span>
              <span><i data-lucide="layers"></i> 3 módulos</span>
              <span><i data-lucide="bar-chart-3"></i> ${escapeHtml(c.level)}</span>
            </div>
          </div>
          <div class="course-foot">
            ${locked
              ? `<div class="lock-strip"><i data-lucide="lock"></i> Requiere suscripción PRO</div>`
              : done
                ? `<div class="lock-strip is-done"><i data-lucide="check-circle-2"></i> Curso completado</div>`
                : `<div class="lock-strip is-open"><i data-lucide="check-circle-2"></i> Desbloqueado</div>`}
            <button class="btn ${locked ? "btn-soft" : "btn-primary"} btn-block" type="button" data-open-course="${c.id}">
              <i data-lucide="${locked ? "lock" : "play-circle"}"></i>
              ${locked ? "Ver temario" : "Ver lección"}
            </button>
            <!-- Nuevo botón: Ver curso completo en nueva ventana -->
            <button class="btn ${locked ? "btn-soft" : "btn-secondary"} btn-block course-full-btn" type="button" data-course-full="${c.id}" style="margin-top:8px;background:#3b82f6;border-color:#3b82f6;">
              <i data-lucide="external-link"></i> Curso completo
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  refreshIcons();

  // --- Inicializar los nuevos botones "Curso completo" ---
  initCourseFullButtons();
}

function initCourseFullButtons() {
  $$("[data-course-full]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const courseId = btn.dataset.courseFull;
      // Abre un modal con el curso completo en la misma página
      openCourseCompleteModal(courseId);
    });
  });
}

/* ============================================================================
   Modal de curso completo - se muestra sobre la página actual
   ========================================================================== */

function openCourseCompleteModal(courseId) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return;

  const isLocked = isCourseLocked(course);
  const isDone = isCourseCompleted(course);

  // Construir el HTML del modal
  const modulesHtml = course.modules
    .map(
      (m, i) => `
      <div class="module-item">
        <span class="module-num"><i data-lucide="layers"></i> Módulo ${i + 1}</span>
        <h4>${escapeHtml(m.title)}</h4>
        <p>${escapeHtml(m.summary)}</p>
        <ul>${m.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
      </div>`
    )
    .join("");

  const vocabHtml = course.vocab
    .map(
      (v, i) => `
      <div class="vocab-item">
        <div class="vocab-main">
          <div class="vocab-term">${escapeHtml(v.term)}</div>
          <div class="vocab-romaji">${escapeHtml(v.romaji)}</div>
        </div>
        <div class="vocab-mean">${escapeHtml(v.meaning)}</div>
        <button class="vocab-audio" type="button" data-audio="${i}" aria-label="Escuchar ${escapeHtml(v.term)}">
          <i data-lucide="volume-2"></i>
        </button>
      </div>`
    )
    .join("");

  const dialogueHtml = course.dialogue
    .map(
      (d, i) => `
      <div class="dialogue-row">
        <span class="dialogue-who">${escapeHtml(d.who)}</span>
        <div class="dialogue-line">
          <div class="dialogue-orig">
            ${escapeHtml(d.line)}
            <button class="dialogue-audio" type="button" data-dialogue="${i}" aria-label="Escuchar">
              <i data-lucide="volume-2"></i>
            </button>
          </div>
          <div class="dialogue-tr">${escapeHtml(d.tr)}</div>
        </div>
      </div>`
    )
    .join("");

  const body = $("#courseModalBody");
  const locked = isCourseLocked(course);

  if (locked) {
    body.innerHTML = `
      <div class="mc-hero" style="background:${course.cover}">
        <span class="mc-hero-flag">${course.flag}</span>
        <div>
          <span class="mc-hero-lang">${escapeHtml(course.langName)} · ${escapeHtml(course.level)}</span>
          <h2 id="courseModalTitle">${escapeHtml(course.title)}</h2>
        </div>
      </div>
      <div class="mc-locked">
        <div class="mc-locked-icon"><i data-lucide="lock"></i></div>
        <h3>Este curso es exclusivo del plan PRO</h3>
        <p>«${escapeHtml(course.title)}» incluye 3 módulos completos, vocabulario con audio, un diálogo y notas culturales.</p>
        <div class="syllabus-preview">
          <h4><i data-lucide="list-checks"></i> Vista previa del temario</h4>
          <ul>${course.syllabus.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
        </div>
        <button class="btn btn-primary btn-lg" type="button" id="goToPlansBtn">
          <i data-lucide="crown"></i> Ver planes y desbloquear
        </button>
      </div>
    `;
    refreshIcons();
    openModal($("#courseModal"));
    $("#goToPlansBtn")?.addEventListener("click", () => {
      closeAllModals();
      document.getElementById("planes").scrollIntoView({ behavior: "smooth" });
    });
    return;
  }

  // Curso desbloqueado: mostrar material completo en modal
  const done = isCourseCompleted(course);

  body.innerHTML = `
    <div class="mc-hero" style="background:${course.cover}">
      <span class="mc-hero-flag">${course.flag}</span>
      <div>
        <span class="mc-hero-lang">${escapeHtml(course.langName)} · ${escapeHtml(course.level)}</span>
        <h2 id="courseModalTitle">${escapeHtml(course.title)}</h2>
        <div class="mc-hero-badges">
          <span class="badge"><i data-lucide="clock"></i> ${escapeHtml(course.duration)}</span>
          <span class="badge"><i data-lucide="layers"></i> 3 módulos</span>
          <span class="badge"><i data-lucide="signal"></i> ${escapeHtml(course.level)}</span>
        </div>
      </div>
    </div>

    <div class="mc-section">
      <h3><i data-lucide="list-checks"></i> Temario</h3>
      <ul>${course.syllabus.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
    </div>

    <div class="mc-section">
      <h3><i data-lucide="book-open"></i> Módulos completos</h3>
      ${modulesHtml}
    </div>

    <div class="mc-section">
      <h3><i data-lucide="headphones"></i> Vocabulario con audio</h3>
      ${vocabHtml}
    </div>

    <div class="mc-section">
      <h3><i data-lucide="messages-square"></i> Diálogo de ejemplo</h3>
      ${dialogueHtml}
    </div>

    <div class="mc-section">
      <div class="cultural-note">
        <h3><i data-lucide="landmark"></i> Nota cultural</h3>
        <p>${escapeHtml(course.cultural)}</p>
      </div>
    </div>

    <div class="course-complete-bar">
      <p><i data-lucide="check-circle-2"></i> ${done ? "Marcaste este curso como completado." : "¿Terminaste el curso? Márcalo para tu certificado."}</p>
      <button class="btn ${done ? "btn-ghost" : "btn-accent"}" type="button" id="completeCourseBtn" data-course="${course.id}">
        <i data-lucide="${done ? "rotate-ccw" : "award"}"></i> ${done ? "Quitar de completados" : "Marcar como completado"}
      </button>
    </div>
  `;

  refreshIcons();

  // Audio del vocabulario
  $$("[data-audio]", body).forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = course.vocab[Number(btn.dataset.audio)];
      if (v) speak(v.term, v.lang, btn, v.fallback || LANG_BY_ID[course.langId]?.fallback);
    });
  });

  // Audio del diálogo
  $$("[data-dialogue]", body).forEach((btn) => {
    btn.addEventListener("click", () => {
      const d = course.dialogue[Number(btn.dataset.dialogue)];
      const lang = LANG_BY_ID[course.langId];
      if (d) speak(d.line, lang?.speech || "es-MX", btn, lang?.fallback);
    });
  });

  // Marcar curso como completado
  $("#completeCourseBtn")?.addEventListener("click", () => toggleCourseCompleted(course.id));

  openModal($("#courseModal"));
}

/* ============================================================================
   Inicialización: si hay parámetro ?course=ID, mostrar curso completo al cargar
   ========================================================================== */

function initCourseFromURLParam() {
  // Si ya fue procesado por el render anterior (modo detalle), no hacer nada
  // Pero si recarga la página con ?course=ID, asegurar que se muestre el detalle
  if (courseFromParam) {
    // Ya fue manejado en renderCourses arriba, solo forzamos un re-render limpio
    // quitando el hash si hubiera
    window.history.replaceState({}, document.title, 
      window.location.pathname + window.location.search.replace(/[?&]course=[^&]*/, "").replace(/&$/, "").replace(/\?$/, "")
    );
    // Volvemos a renderizar para quitar el modo detalle si se recarga
    renderCourses();
  }
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", initCourseFromURLParam);

function initCourseFilters() {
  const tagBox = $("#courseFilters");
  const levelBox = $("#levelFilters");

  tagBox?.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip[data-filter]");
    if (!chip) return;
    courseFilters.tag = chip.dataset.filter;
    $$(".chip[data-filter]", tagBox).forEach((c) => c.classList.toggle("is-active", c === chip));
    renderCourses();
  });

  levelBox?.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip[data-level]");
    if (!chip) return;
    courseFilters.level = chip.dataset.level;
    $$(".chip[data-level]", levelBox).forEach((c) => c.classList.toggle("is-active", c === chip));
    renderCourses();
  });
}

function initCourseGrid() {
  const grid = $("#courseGrid");
  if (!grid) return;
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open-course]");
    if (!btn) return;
    openCourseModal(btn.dataset.openCourse);
  });
}

function openCourseModal(courseId) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return;

  const body = $("#courseModalBody");
  const locked = isCourseLocked(course);

  // ---- Contenido bloqueado: solo vista previa del temario ----
  if (locked) {
    body.innerHTML = `
      <div class="mc-hero" style="background:${course.cover}">
        <span class="mc-hero-flag">${course.flag}</span>
        <div>
          <span class="mc-hero-lang">${escapeHtml(course.langName)} · ${escapeHtml(course.level)}</span>
          <h2 id="courseModalTitle">${escapeHtml(course.title)}</h2>
        </div>
      </div>
      <div class="mc-locked">
        <div class="mc-locked-icon"><i data-lucide="lock"></i></div>
        <h3>Este curso es exclusivo del plan PRO</h3>
        <p>«${escapeHtml(course.title)}» incluye 3 módulos completos, vocabulario con audio, un diálogo y notas culturales.</p>

        <div class="syllabus-preview">
          <h4><i data-lucide="list-checks"></i> Vista previa del temario</h4>
          <ul>${course.syllabus.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
        </div>

        <button class="btn btn-primary btn-lg" type="button" id="goToPlansBtn">
          <i data-lucide="crown"></i> Ver planes y desbloquear
        </button>
      </div>
    `;
    refreshIcons();

    $("#goToPlansBtn")?.addEventListener("click", () => {
      closeAllModals();
      document.getElementById("planes").scrollIntoView({ behavior: "smooth" });
    });
    openModal($("#courseModal"));
    return;
  }

  // ---- Curso desbloqueado: material completo ----
  const done = isCourseCompleted(course);

  const modulesHtml = course.modules
    .map(
      (m, i) => `
      <div class="module-item">
        <span class="module-num"><i data-lucide="layers"></i> Módulo ${i + 1}</span>
        <h4>${escapeHtml(m.title)}</h4>
        <p>${escapeHtml(m.summary)}</p>
        <ul>${m.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
      </div>`
    )
    .join("");

  const vocabHtml = course.vocab
    .map(
      (v, i) => `
      <div class="vocab-item">
        <div class="vocab-main">
          <div class="vocab-term">${escapeHtml(v.term)}</div>
          <div class="vocab-romaji">${escapeHtml(v.romaji)}</div>
        </div>
        <div class="vocab-mean">${escapeHtml(v.meaning)}</div>
        <button class="vocab-audio" type="button" data-audio="${i}" aria-label="Escuchar ${escapeHtml(v.term)}">
          <i data-lucide="volume-2"></i>
        </button>
      </div>`
    )
    .join("");

  const dialogueHtml = course.dialogue
    .map(
      (d, i) => `
      <div class="dialogue-row">
        <span class="dialogue-who">${escapeHtml(d.who)}</span>
        <div class="dialogue-line">
          <div class="dialogue-orig">
            ${escapeHtml(d.line)}
            <button class="dialogue-audio" type="button" data-dialogue="${i}" aria-label="Escuchar">
              <i data-lucide="volume-2"></i>
            </button>
          </div>
          <div class="dialogue-tr">${escapeHtml(d.tr)}</div>
        </div>
      </div>`
    )
    .join("");

  body.innerHTML = `
    <div class="mc-hero" style="background:${course.cover}">
      <span class="mc-hero-flag">${course.flag}</span>
      <div>
        <span class="mc-hero-lang">${escapeHtml(course.langName)} · ${escapeHtml(course.level)}</span>
        <h2 id="courseModalTitle">${escapeHtml(course.title)}</h2>
        <div class="mc-hero-badges">
          <span class="badge"><i data-lucide="clock"></i> ${escapeHtml(course.duration)}</span>
          <span class="badge"><i data-lucide="layers"></i> 3 módulos</span>
          <span class="badge"><i data-lucide="signal"></i> ${escapeHtml(course.level)}</span>
        </div>
      </div>
    </div>

    <div class="mc-section">
      <h3><i data-lucide="file-text"></i> Descripción del curso</h3>
      <p>${escapeHtml(course.desc)}</p>
    </div>

    <div class="mc-section">
      <h3><i data-lucide="list-checks"></i> Temario</h3>
      <ul>${course.syllabus.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
    </div>

    <div class="mc-section">
      <h3><i data-lucide="book-open"></i> Contenido de los módulos</h3>
      <div class="module-list">${modulesHtml}</div>
    </div>

    <div class="mc-section">
      <h3><i data-lucide="headphones"></i> Vocabulario con audio</h3>
      <div class="vocab-list">${vocabHtml}</div>
    </div>

    <div class="mc-section">
      <h3><i data-lucide="messages-square"></i> Diálogo de ejemplo</h3>
      <div class="dialogue-list">${dialogueHtml}</div>
    </div>

    <div class="mc-section">
      <div class="cultural-note">
        <h3><i data-lucide="landmark"></i> Nota cultural</h3>
        <p>${escapeHtml(course.cultural)}</p>
      </div>
    </div>

    <div class="course-complete-bar">
      <p><i data-lucide="check-circle-2"></i> ${done ? "Marcaste este curso como completado." : "¿Terminaste el curso? Márcalo para tu certificado."}</p>
      <button class="btn ${done ? "btn-ghost" : "btn-accent"}" type="button" id="completeCourseBtn" data-course="${course.id}">
        <i data-lucide="${done ? "rotate-ccw" : "award"}"></i> ${done ? "Quitar de completados" : "Marcar como completado"}
      </button>
    </div>
  `;
  refreshIcons();

  // Audio del vocabulario
  $$("[data-audio]", body).forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = course.vocab[Number(btn.dataset.audio)];
      if (v) speak(v.term, v.lang, btn, v.fallback || LANG_BY_ID[course.langId]?.fallback);
    });
  });

  // Audio del diálogo
  $$("[data-dialogue]", body).forEach((btn) => {
    btn.addEventListener("click", () => {
      const d = course.dialogue[Number(btn.dataset.dialogue)];
      const lang = LANG_BY_ID[course.langId];
      if (d) speak(d.line, lang?.speech || "es-MX", btn, lang?.fallback);
    });
  });

  // Marcar curso como completado
  $("#completeCourseBtn")?.addEventListener("click", () => toggleCourseCompleted(course.id));

  openModal($("#courseModal"));
}

function toggleCourseCompleted(courseId) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return;

  if (isCourseCompleted(course)) {
    state.completed = state.completed.filter((id) => id !== courseId);
    showToast("Curso reabierto", `«${course.title}» ya no cuenta como completado.`, "info");
  } else {
    state.completed.push(courseId);
    showToast("¡Curso completado! 🎓", `«${course.title}» se añadió a tu certificado.`, "success");
  }
  saveState();
  renderCourses();
  renderProgress();
  openCourseModal(courseId); // refresca el modal con el nuevo estado
}

/* ============================================================================
   8) ZONA DE ESTUDIO (progreso + tarjetas)
   ========================================================================== */

function touchStreak() {
  const today = dayKey();
  if (state.streak.lastDay === today) return;
  state.streak.count = state.streak.lastDay === yesterdayKey() ? state.streak.count + 1 : 1;
  state.streak.lastDay = today;
  state.streak.best = Math.max(state.streak.best, state.streak.count);
}

/** Registra actividad de estudio (repasos de tarjetas o respuestas de quiz). */
function registerStudyActivity(amount = 1) {
  const today = dayKey();
  if (state.todayKey !== today) {
    state.todayKey = today;
    state.todayCount = 0;
  }
  state.todayCount += amount;
  touchStreak();
  saveState();
  renderProgress();
}

function renderProgress() {
  const panel = $("#progressPanel");
  if (!panel) return;

  const today = dayKey();
  const done = state.todayKey === today ? state.todayCount : 0;
  const goal = state.goal;
  const pct = Math.min(100, Math.round((done / goal) * 100));
  const goalMet = done >= goal;

  panel.innerHTML = `
    <div class="streak-box">
      <span class="streak-flame"><i data-lucide="flame"></i></span>
      <div>
        <div class="streak-num">${state.streak.count}</div>
        <div class="streak-lbl">${state.streak.count === 1 ? "día de racha" : "días de racha"}</div>
        <div class="streak-best">Récord: ${state.streak.best} ${state.streak.best === 1 ? "día" : "días"}</div>
      </div>
    </div>

    <div class="goal-box">
      <div class="goal-top">
        <h4><i data-lucide="target" style="width:16px;height:16px;vertical-align:-3px;margin-right:6px"></i>Meta diaria</h4>
        <span class="goal-count">${done} / ${goal} ${goalMet ? "✓" : ""}</span>
      </div>
      <div class="goal-track"><i style="width:${pct}%"></i></div>
      <div class="goal-controls">
        <label for="goalRange">Repasos por día</label>
        <input type="range" id="goalRange" min="1" max="10" step="1" value="${goal}" />
        <span class="goal-hint">${goal} al día · 1–10</span>
      </div>
    </div>

    <div class="stats-box">
      <div class="mini-stat"><i data-lucide="layers"></i><span>Tarjetas: <b>${VOCAB_CARDS.length}</b></span></div>
      <div class="mini-stat"><i data-lucide="star"></i><span>Repaso pendiente: <b>${state.review.length}</b></span></div>
      <div class="mini-stat"><i data-lucide="award"></i><span>Cursos completados: <b>${state.completed.length}</b></span></div>
    </div>
  `;
  refreshIcons();

  // Actualización en vivo (sin re-render) para no perder el foco del slider
  $("#goalRange")?.addEventListener("input", (e) => {
    state.goal = Math.min(10, Math.max(1, Number(e.target.value)));
    saveState();
    const done = state.todayKey === today ? state.todayCount : 0;
    const goalCount = $(".goal-count", panel);
    if (goalCount) goalCount.textContent = `${done} / ${state.goal} ${done >= state.goal ? "✓" : ""}`;
    const track = $(".goal-track i", panel);
    if (track) track.style.width = `${Math.min(100, Math.round((done / state.goal) * 100))}%`;
    const hint = $(".goal-hint", panel);
    if (hint) hint.textContent = `${state.goal} al día · 1–10`;
  });
}

let deckFilter = "all";

function renderDeck() {
  const grid = $("#deckGrid");
  const langSelect = $("#deckLangFilter");
  if (!grid) return;

  const langFilter = langSelect ? langSelect.value : "all";

  const list = VOCAB_CARDS.filter(
    (c) =>
      (deckFilter === "all" || state.review.includes(c.id)) &&
      (langFilter === "all" || c.langId === langFilter)
  );

  if (!list.length) {
    grid.innerHTML = `
      <div class="deck-empty">
        <i data-lucide="inbox"></i>
        <p>${deckFilter === "review"
          ? "No tienes tarjetas marcadas para repaso. Marca alguna con la estrella."
          : "No hay tarjetas para este idioma todavía."}</p>
      </div>`;
    refreshIcons();
    return;
  }

  grid.innerHTML = list
    .map((c) => {
      const on = state.review.includes(c.id);
      const lang = LANG_BY_ID[c.langId];
      return `
      <article class="flashcard" data-id="${c.id}">
        <div class="flashcard-inner">
          <div class="flashcard-face flashcard-front">
            <div class="fc-top">
              <span class="fc-flag">${c.flag}</span>
              <button class="fc-star ${on ? "is-on" : ""}" type="button" data-star="${c.id}"
                      aria-label="Marcar para repaso" aria-pressed="${on}">
                <i data-lucide="star"></i>
              </button>
            </div>
            <div>
              <div class="fc-term">${escapeHtml(c.term)}</div>
              <div class="fc-romaji">${escapeHtml(c.romaji)}</div>
            </div>
            <button class="fc-audio" type="button" data-audio="${c.id}">
              <i data-lucide="volume-2"></i> Escuchar
            </button>
          </div>
          <div class="flashcard-face flashcard-back">
            <div class="fc-back-mean">${escapeHtml(c.meaning)}</div>
            <div class="fc-back-lang">${escapeHtml(lang ? lang.name : "")}</div>
            <div class="fc-actions">
              <button class="btn btn-ghost" type="button" data-again="${c.id}">
                <i data-lucide="rotate-ccw"></i> Repasar
              </button>
              <button class="btn btn-accent" type="button" data-known="${c.id}">
                <i data-lucide="check"></i> La sabía
              </button>
            </div>
          </div>
        </div>
      </article>`;
    })
    .join("");

  refreshIcons();
}

function markReview(id, on) {
  const set = new Set(state.review);
  if (on) set.add(id);
  else set.delete(id);
  state.review = [...set];
  saveState();
  updateReviewCount();
  renderDeck();
  renderProgress();
}

function updateReviewCount() {
  const el = $("#reviewCount");
  if (el) el.textContent = state.review.length;
}

function initDeck() {
  const grid = $("#deckGrid");
  const filters = $("#deckFilters");
  const langSelect = $("#deckLangFilter");

  // Llena el filtro de idiomas a partir de LANGUAGES
  if (langSelect) {
    LANGUAGES.forEach((l) => {
      const opt = document.createElement("option");
      opt.value = l.id;
      opt.textContent = `${l.flag} ${l.name}`;
      langSelect.appendChild(opt);
    });
    langSelect.addEventListener("change", renderDeck);
  }

  filters?.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip[data-deck]");
    if (!chip) return;
    deckFilter = chip.dataset.deck;
    $$(".chip[data-deck]", filters).forEach((c) => c.classList.toggle("is-active", c === chip));
    renderDeck();
  });

  if (!grid) return;

  grid.addEventListener("click", (e) => {
    const star = e.target.closest("[data-star]");
    if (star) {
      const id = star.dataset.star;
      markReview(id, !state.review.includes(id));
      return;
    }

    const audio = e.target.closest("[data-audio]");
    if (audio) {
      const card = VOCAB_CARDS.find((c) => c.id === audio.dataset.audio);
      if (card) speak(card.term, card.lang, audio, card.fallback);
      return;
    }

    const again = e.target.closest("[data-again]");
    if (again) {
      markReview(again.dataset.again, true);
      flipCard(again.dataset.again, false);
      registerStudyActivity(1);
      showToast("A repaso", "La tarjeta quedó marcada para repasar.", "info", 2600);
      return;
    }

    const known = e.target.closest("[data-known]");
    if (known) {
      markReview(known.dataset.known, false);
      flipCard(known.dataset.known, false);
      registerStudyActivity(1);
      return;
    }

    // Clic sobre cualquier otra parte de la tarjeta → girar
    const card = e.target.closest(".flashcard");
    if (card) card.classList.toggle("is-flipped");
  });
}

function flipCard(id, flipped) {
  const card = $(`.flashcard[data-id="${id}"]`);
  if (card) card.classList.toggle("is-flipped", flipped);
}

/* ============================================================================
   9) TRADUCTOR INSTANTÁNEO (MyMemory API)
   ========================================================================== */

let lastTranslation = { text: "", lang: "" };

function initTranslator() {
  const form = $("#translatorForm");
  if (!form) return;

  const sourceText = $("#sourceText");
  const targetLang = $("#targetLang");
  const translateBtn = $("#translateBtn");
  const clearBtn = $("#clearTranslateBtn");
  const resultBox = $("#translateResult");
  const resultText = $("#resultText");
  const resultNote = $("#resultNote");
  const speakBtn = $("#speakResultBtn");

  // Solo los idiomas con soporte MyMemory (8) aparecen en el traductor
  (targetLang ? LANGUAGES.filter((l) => l.mymemory) : []).forEach((l) => {
    const opt = document.createElement("option");
    opt.value = `${l.mymemory}|${l.speech}`;
    opt.textContent = `${l.flag} ${l.name}`;
    targetLang.appendChild(opt);
  });

  const runTranslation = async () => {
    const text = sourceText.value.trim();
    if (!text) {
      showToast("Falta el texto", "Escribe una palabra o frase en español para traducir.", "info");
      sourceText.focus();
      return;
    }

    const [targetCode, speechLang] = targetLang.value.split("|");
    const originalLabel = translateBtn.innerHTML;
    translateBtn.disabled = true;
    translateBtn.innerHTML = `<span class="spinner"></span> Traduciendo…`;

    try {
      const url = `${MYMEMORY_ENDPOINT}?q=${encodeURIComponent(text)}&langpair=es|${targetCode}&de=${encodeURIComponent(MYMEMORY_CONTACT)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const translated = data?.responseData?.translatedText;
      if (!translated || /MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(translated)) {
        throw new Error("Respuesta no válida del servicio");
      }

      resultText.textContent = translated;
      const matches = Array.isArray(data.matches) ? data.matches.filter((m) => m.translation) : [];
      resultNote.textContent =
        matches.length > 1
          ? `Otras opciones: ${matches.slice(1, 4).map((m) => m.translation).join(" · ")}`
          : "Traducción automática por MyMemory. Úsala como apoyo, no como verdad absoluta.";

      lastTranslation = { text: translated, lang: speechLang };
      resultBox.hidden = false;
      showToast("Traducción lista", "Pulsa «Escuchar» para oír la pronunciación.", "success", 3500);
    } catch (err) {
      console.error("[LinguaCraft] Error de traducción:", err);
      resultText.textContent = text;
      resultNote.textContent =
        "No pudimos conectar con el servicio de traducción (revisa tu internet o el límite diario gratuito). Mientras tanto, puedes seguir practicando con el audio.";
      lastTranslation = { text, lang: speechLang };
      resultBox.hidden = false;
      showToast("Sin conexión al traductor", "Mostramos el texto original como respaldo.", "error");
    } finally {
      translateBtn.disabled = false;
      translateBtn.innerHTML = originalLabel;
      refreshIcons();
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    runTranslation();
  });

  clearBtn.addEventListener("click", () => {
    sourceText.value = "";
    resultBox.hidden = true;
    sourceText.focus();
  });

  speakBtn.addEventListener("click", () => {
    if (!lastTranslation.text) return;
    speak(lastTranslation.text, lastTranslation.lang, speakBtn);
  });

  // Ctrl/Cmd + Enter para traducir rápido
  sourceText.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runTranslation();
    }
  });
}

/* ============================================================================
   10) QUIZ
   ========================================================================== */

const quizState = { index: 0, score: 0, answered: false, finished: false };

function initQuiz() {
  const body = $("#quizBody");
  if (!body) return;
  $("#quizResetBtn").addEventListener("click", resetQuiz);
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const body = $("#quizBody");
  const result = $("#quizResult");
  const counter = $("#quizCounter");
  const bar = $("#quizBar");

  if (quizState.finished) {
    body.hidden = true;
    result.hidden = false;
    return;
  }

  body.hidden = false;
  result.hidden = true;

  const q = QUIZ[quizState.index];
  quizState.answered = false;

  counter.textContent = `Pregunta ${quizState.index + 1} de ${QUIZ.length}`;
  bar.style.width = `${((quizState.index + 1) / QUIZ.length) * 100}%`;

  body.innerHTML = `
    <p class="quiz-question">${escapeHtml(q.q)}</p>
    <div class="quiz-options">
      ${q.options
        .map(
          (opt, i) => `
        <button class="quiz-option" type="button" data-option="${i}">
          <span class="key">${String.fromCharCode(65 + i)}</span>
          <span>${escapeHtml(opt)}</span>
        </button>`
        )
        .join("")}
    </div>
    <p class="quiz-feedback" id="quizFeedback"></p>
    <div class="quiz-next" id="quizNextWrap" hidden>
      <button class="btn btn-primary btn-block" type="button" id="quizNextBtn">
        ${quizState.index === QUIZ.length - 1 ? "Ver resultado" : "Siguiente pregunta"}
        <i data-lucide="arrow-right"></i>
      </button>
    </div>
  `;
  refreshIcons();

  $("#quizNextBtn").addEventListener("click", () => {
    quizState.index += 1;
    if (quizState.index >= QUIZ.length) finishQuiz();
    else renderQuizQuestion();
  });

  $$(".quiz-option", body).forEach((btn) =>
    btn.addEventListener("click", () => answerQuiz(Number(btn.dataset.option)))
  );
}

function answerQuiz(selected) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = QUIZ[quizState.index];
  const options = $$(".quiz-option", $("#quizBody"));
  const feedback = $("#quizFeedback");
  const isCorrect = selected === q.correct;

  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("is-correct");
    else if (i === selected) btn.classList.add("is-wrong");
  });

  if (isCorrect) {
    quizState.score += 1;
    feedback.className = "quiz-feedback ok";
    feedback.innerHTML = `<i data-lucide="check-circle-2"></i> ¡Correcto! ${escapeHtml(q.explain)}`;
  } else {
    feedback.className = "quiz-feedback bad";
    feedback.innerHTML = `<i data-lucide="x-circle"></i> ${escapeHtml(q.explain)}`;
    // Los fallos marcan la tarjeta relacionada para repaso
    const cardId = QUIZ_REVIEW_CARD[quizState.index];
    if (cardId && !state.review.includes(cardId)) {
      markReview(cardId, true);
      showToast("Añadido a repaso", "Marcamos la tarjeta relacionada para repasar.", "info", 3000);
    }
  }

  registerStudyActivity(1);

  $("#quizNextWrap").hidden = false;
  refreshIcons();
}

function finishQuiz() {
  quizState.finished = true;
  const result = $("#quizResult");
  const body = $("#quizBody");
  const score = quizState.score;
  const total = QUIZ.length;
  const pct = Math.round((score / total) * 100);

  $("#quizScore").textContent = `${score} / ${total}`;
  let verdict, message;
  if (pct === 100) {
    verdict = "¡Perfecto! 🏆";
    message = "Dominio total. Estás listo para los cursos PRO.";
  } else if (pct >= 75) {
    verdict = "¡Muy bien!";
    message = "Excelente base. Un poco más de práctica y serás imparable.";
  } else if (pct >= 50) {
    verdict = "¡Buen intento!";
    message = "Vas por buen camino. Repasa las tarjetas marcadas y vuelve a intentarlo.";
  } else {
    verdict = "¡Sigue practicando!";
    message = "Revisa el vocabulario y las guías culturales; son una gran ayuda.";
  }

  $("#quizVerdict").textContent = verdict;
  $("#quizMessage").textContent = message;
  $("#quizCounter").textContent = "Quiz completado";
  $("#quizBar").style.width = "100%";

  body.hidden = true;
  result.hidden = false;

  showToast("Quiz completado", `Obtuviste ${score} de ${total} respuestas correctas.`, pct >= 75 ? "success" : "info");
}

function resetQuiz() {
  quizState.index = 0;
  quizState.score = 0;
  quizState.answered = false;
  quizState.finished = false;
  renderQuizQuestion();
}

/* ============================================================================
   11) GUÍAS CULTURALES + FALSOS AMIGOS / MODISMOS
   ========================================================================== */

function renderGuides() {
  const grid = $("#guideGrid");
  if (!grid) return;

  grid.innerHTML = CULTURE_GUIDES.map(
    (g) => `
    <article class="guide-card" data-guide="${g.id}">
      <div class="guide-top">
        <span class="guide-flag">${g.flag}</span>
        <span class="guide-cat">${escapeHtml(g.category)}</span>
        <span class="guide-time"><i data-lucide="clock"></i> ${escapeHtml(g.readTime)}</span>
      </div>
      <h3>${escapeHtml(g.title)}</h3>
      <p>${escapeHtml(g.excerpt)}</p>
      <button class="btn btn-ghost btn-block" type="button" data-guide-open="${g.id}">
        Leer guía completa <i data-lucide="arrow-right"></i>
      </button>
    </article>`
  ).join("");

  refreshIcons();
}

function initGuides() {
  const grid = $("#guideGrid");
  if (!grid) return;
  grid.addEventListener("click", (e) => {
    const el = e.target.closest("[data-guide-open]") || e.target.closest(".guide-card");
    if (!el) return;
    const id = el.dataset.guideOpen || el.dataset.guide;
    openGuideModal(id);
  });
}

function openGuideModal(guideId) {
  const g = CULTURE_GUIDES.find((x) => x.id === guideId);
  if (!g) return;

  const body = $("#guideModalBody");
  body.innerHTML = `
    <div class="guide-top">
      <span class="guide-flag">${g.flag}</span>
      <span class="guide-cat">${escapeHtml(g.category)}</span>
      <span class="guide-time"><i data-lucide="clock"></i> ${escapeHtml(g.readTime)}</span>
    </div>
    <h2 id="guideModalTitle" style="margin:16px 0 4px">${escapeHtml(g.title)}</h2>
    <p class="plan-sub">${escapeHtml(g.langName)} · ${escapeHtml(g.excerpt)}</p>
    <div class="article-body" style="margin-top:20px">
      ${g.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
    </div>
  `;
  refreshIcons();
  openModal($("#guideModal"));
}

function renderExp() {
  const grid = $("#expGrid");
  if (!grid) return;

  grid.innerHTML = FALSE_FRIENDS.map(
    (e) => `
    <article class="exp-card">
      <div class="exp-head">
        <span class="exp-flag">${e.flag}</span>
        <span class="kind-badge ${e.kind === "falso" ? "kind-falso" : "kind-modismo"}">
          ${e.kind === "falso" ? "Falso amigo" : "Modismo"}
        </span>
        <span class="exp-lang">${escapeHtml(e.langName)}</span>
      </div>
      <div class="exp-term">${escapeHtml(e.term)}</div>
      <div class="exp-rows">
        <div class="exp-row no"><i data-lucide="x-circle"></i><span>${escapeHtml(e.misleading)}</span></div>
        <div class="exp-row yes"><i data-lucide="check-circle-2"></i><span>${escapeHtml(e.real)}</span></div>
      </div>
      <p class="exp-example">${escapeHtml(e.example)}</p>
    </article>`
  ).join("");

  refreshIcons();
}

/* ============================================================================
   12) PLANES + REGISTRO + CORREO (EmailJS) + CERTIFICADO
   ========================================================================== */

function planPriceLabel(plan, billing) {
  if (plan.price === 0) return "Gratis";
  return billing === "annual"
    ? `${formatMoney(plan.annualPrice)} MXN/año`
    : `${formatMoney(plan.price)} MXN/mes`;
}

function annualSaving(plan) {
  if (plan.price === 0) return 0;
  return plan.price * 12 - plan.annualPrice;
}

function renderPlans() {
  const grid = $("#plansGrid");
  if (!grid) return;

  const isAnnual = state.billing === "annual";

  grid.innerHTML = Object.values(PLANS)
    .map((p) => {
      const isCurrent = state.plan === p.id;
      const paid = p.price > 0;
      const price = isAnnual ? p.annualPrice : p.price;
      const ctaLabel = isCurrent ? "Plan actual" : paid ? "Suscribirme ahora" : "Comenzar gratis";
      const saving = annualSaving(p);

      return `
        <article class="plan-card ${p.popular ? "is-popular" : ""} ${p.id === "pro" ? "is-pro" : ""} ${isCurrent ? "is-current" : ""}">
          ${p.popular ? `<span class="plan-ribbon">Más popular</span>` : ""}
          ${isCurrent ? `<span class="plan-current-flag"><i data-lucide="check"></i> Activo</span>` : ""}
          <span class="plan-icon"><i data-lucide="${p.icon}"></i></span>
          <h3 class="plan-name">${escapeHtml(p.name)}</h3>
          <p class="plan-sub">${escapeHtml(p.tagline)}</p>

          <div class="plan-price">
            <strong>${p.price === 0 ? "$0" : formatMoney(price)}</strong>
            <span>${p.price === 0 ? "para siempre" : isAnnual ? "MXN / año" : "MXN / mes"}</span>
          </div>
          <p class="plan-billed">${p.price === 0
            ? "Sin tarjeta de crédito"
            : isAnnual
              ? "Facturación anual · equivale a 10 meses"
              : "Facturación mensual · cancela cuando quieras"}</p>
          ${isAnnual && saving > 0
            ? `<span class="plan-saving"><i data-lucide="piggy-bank" style="width:13px;height:13px;vertical-align:-2px;margin-right:5px"></i>Ahorras ${formatMoney(saving)} al año</span>`
            : ""}

          <ul class="plan-features">
            ${p.features
              .map(
                (f) => `
              <li class="${f.on ? "" : "off"}">
                <i data-lucide="${f.on ? "check-circle-2" : "minus-circle"}"></i>
                <span>${escapeHtml(f.text)}</span>
              </li>`
              )
              .join("")}
          </ul>

          <button class="btn ${p.popular ? "btn-primary" : "btn-ghost"} btn-block" type="button" data-plan="${p.id}">
            <i data-lucide="${isCurrent ? "check" : "arrow-right"}"></i> ${ctaLabel}
          </button>
        </article>
      `;
    })
    .join("");

  refreshIcons();
  updateSaveTag();
}

function updateSaveTag() {
  const tag = $("#saveTag");
  if (!tag) return;
  const paid = Object.values(PLANS).filter((p) => p.price > 0);
  const maxPct = Math.round(
    Math.max(...paid.map((p) => (annualSaving(p) / (p.price * 12)) * 100))
  );
  tag.textContent = `Ahorra ${maxPct}%`;

  $("#billMonthly")?.classList.toggle("is-active", state.billing === "monthly");
  $("#billAnnual")?.classList.toggle("is-active", state.billing === "annual");
}

function initPlans() {
  const grid = $("#plansGrid");
  grid?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-plan]");
    if (!btn) return;
    const planId = btn.dataset.plan;
    if (state.plan === planId && state.user) {
      showToast("Ya tienes este plan", `Actualmente usas el ${PLANS[planId].name}.`, "info");
      return;
    }
    openSignupModal(planId);
  });

  $("#openSignupBtn")?.addEventListener("click", () => {
    const target = state.plan === "free" ? "student" : state.plan;
    openSignupModal(target);
  });

  $("#billMonthly")?.addEventListener("click", () => {
    state.billing = "monthly";
    saveState();
    renderPlans();
  });
  $("#billAnnual")?.addEventListener("click", () => {
    state.billing = "annual";
    saveState();
    renderPlans();
  });
}

function openSignupModal(planId) {
  const plan = PLANS[planId] || PLANS.free;
  const isPaid = plan.price > 0;
  const isAnnual = state.billing === "annual";
  const priceLabel = planPriceLabel(plan, state.billing);
  const saving = annualSaving(plan);
  const body = $("#signupModalBody");

  body.innerHTML = `
    <div class="form-head">
      <span class="panel-icon"><i data-lucide="${isPaid ? "credit-card" : "user-plus"}"></i></span>
      <h2 id="signupTitle">${isPaid ? "Activa tu suscripción" : "Crea tu cuenta gratis"}</h2>
      <p>${isPaid ? "Completa tus datos y recibirás un correo de confirmación." : "Regístrate y empieza a aprender en segundos."}</p>
    </div>

    <div class="form-badge-plan">
      <span class="fb-name"><i data-lucide="${plan.icon}" style="width:16px;height:16px;vertical-align:-2px;margin-right:6px"></i>${escapeHtml(plan.name)}</span>
      <span class="fb-price">${priceLabel}</span>
    </div>

    ${isPaid ? `
    <div class="billing-toggle" role="group" aria-label="Periodo de facturación" style="margin:0 auto 18px">
      <button class="bill-btn ${!isAnnual ? "is-active" : ""}" type="button" data-modal-bill="monthly">Mensual</button>
      <button class="bill-btn ${isAnnual ? "is-active" : ""}" type="button" data-modal-bill="annual">Anual</button>
    </div>` : ""}

    <form id="signupForm" novalidate>
      <div class="form-grid">
        <label class="field" id="fieldName">
          <span class="field-label">Nombre completo</span>
          <input type="text" id="inName" placeholder="Ana Martínez" autocomplete="name" />
          <span class="field-error">Escribe tu nombre.</span>
        </label>

        <label class="field" id="fieldEmail">
          <span class="field-label">Correo de Gmail</span>
          <input type="email" id="inEmail" placeholder="tucorreo@gmail.com" autocomplete="email" />
          <span class="field-error">Escribe un correo válido (por ejemplo, tucorreo@gmail.com).</span>
        </label>
      </div>

      ${isPaid ? `
      <div class="pay-divider">Datos de pago (simulados)</div>
      <div class="form-grid">
        <label class="field" id="fieldCard">
          <span class="field-label">Número de tarjeta</span>
          <input type="text" id="inCard" placeholder="4242 4242 4242 4242" inputmode="numeric" maxlength="19" />
          <span class="field-error">Ingresa 16 dígitos.</span>
        </label>
        <div class="form-row">
          <label class="field" id="fieldExp">
            <span class="field-label">Vencimiento</span>
            <input type="text" id="inExp" placeholder="MM/AA" maxlength="5" inputmode="numeric" />
            <span class="field-error">Formato MM/AA.</span>
          </label>
          <label class="field" id="fieldCvv">
            <span class="field-label">CVV</span>
            <input type="text" id="inCvv" placeholder="123" maxlength="4" inputmode="numeric" />
            <span class="field-error">3 o 4 dígitos.</span>
          </label>
        </div>
      </div>
      <p class="pay-note"><i data-lucide="shield-check"></i> Demo educativa: no se procesa ningún pago real. Solo simulamos el flujo.</p>

      <div class="total-row">
        <span>Total a pagar
          <em>${isAnnual ? `Plan anual (antes ${formatMoney(plan.price * 12)})` : "Facturación mensual"}</em>
        </span>
        <b>${isAnnual ? `${formatMoney(saving)} menos` : priceLabel}</b>
      </div>
      ` : ""}

      <div class="form-grid" style="margin-top:18px">
        <button class="btn btn-primary btn-lg btn-block" type="submit" id="signupSubmit">
          <i data-lucide="mail-check"></i> ${isPaid ? `Activar ${escapeHtml(plan.name)}` : "Crear cuenta gratis"}
        </button>
      </div>

      <p class="form-status" id="formStatus"></p>
    </form>
  `;
  refreshIcons();

  // Cambiar Mensual/Anual desde el propio modal (re-render del modal)
  $$("[data-modal-bill]", body).forEach((b) =>
    b.addEventListener("click", () => {
      state.billing = b.dataset.modalBill;
      saveState();
      renderPlans();
      openSignupModal(planId);
    })
  );

  const form = $("#signupForm");
  wirePaymentFormatting();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSignup(plan, isPaid);
  });

  openModal($("#signupModal"));
  setTimeout(() => $("#inName")?.focus(), 320);
}

/** Formatea el número de tarjeta, el vencimiento y limita el CVV. */
function wirePaymentFormatting() {
  const card = $("#inCard");
  const exp = $("#inExp");
  const cvv = $("#inCvv");

  if (card) {
    card.addEventListener("input", () => {
      card.value = card.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    });
  }
  if (exp) {
    exp.addEventListener("input", () => {
      let v = exp.value.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
      exp.value = v;
    });
  }
  if (cvv) {
    cvv.addEventListener("input", () => {
      cvv.value = cvv.value.replace(/\D/g, "").slice(0, 4);
    });
  }
}

function setFieldError(fieldId, hasError) {
  const el = document.getElementById(fieldId);
  if (el) el.classList.toggle("has-error", hasError);
}

async function handleSignup(plan, isPaid) {
  const name = $("#inName").value.trim();
  const email = $("#inEmail").value.trim();
  const submitBtn = $("#signupSubmit");

  let valid = true;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  setFieldError("fieldName", !name);
  setFieldError("fieldEmail", !emailOk);
  if (!name) valid = false;
  if (!emailOk) valid = false;

  if (isPaid) {
    const card = ($("#inCard")?.value || "").replace(/\s/g, "");
    const exp = ($("#inExp")?.value || "").trim();
    const cvv = ($("#inCvv")?.value || "").trim();
    const cardOk = card.length === 16;
    const expOk = /^\d{2}\/\d{2}$/.test(exp);
    const cvvOk = /^\d{3,4}$/.test(cvv);
    setFieldError("fieldCard", !cardOk);
    setFieldError("fieldExp", !expOk);
    setFieldError("fieldCvv", !cvvOk);
    if (!cardOk || !expOk || !cvvOk) valid = false;
  }

  if (!valid) {
    showToast("Revisa el formulario", "Hay campos que necesitan tu atención.", "error");
    return;
  }

  // Estado de carga
  const originalLabel = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="spinner"></span> Activando…`;
  const status = $("#formStatus");
  status.className = "form-status info";
  status.innerHTML = `<i data-lucide="loader-circle"></i> Activando tu plan…`;
  refreshIcons();

  // Guardar estado local
  state.plan = plan.id;
  state.user = { name, email };
  saveState();
  updatePlanUI();

  // Enviar correo (real o simulado)
  const emailResult = await sendWelcomeEmail({ name, email, plan });

  if (emailResult.simulated) {
    status.className = "form-status info";
    status.innerHTML = `<i data-lucide="info"></i> Plan activado. Correo simulado (configura EmailJS para envíos reales).`;
  } else {
    status.className = "form-status ok";
    status.innerHTML = `<i data-lucide="check-circle-2"></i> ¡Correo enviado a ${escapeHtml(email)}!`;
  }
  refreshIcons();

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalLabel;
    refreshIcons();
    closeAllModals();
    renderCourses();
    renderPlans();

    if (emailResult.simulated) {
      showToast(
        "Plan activado (demo)",
        `${plan.name} activado para ${name}. El correo se simula: añade tus claves de EmailJS para envíos reales.`,
        "info",
        6500
      );
    } else if (emailResult.ok) {
      showToast("¡Todo listo! 🎉", `${plan.name} activado. Enviamos un correo de bienvenida a ${email}.`, "success", 6500);
    } else {
      showToast(
        "Plan activado",
        "No pudimos enviar el correo (revisa tus claves de EmailJS), pero tu plan quedó activo.",
        "error",
        6500
      );
    }
  }, 900);
}

/**
 * Envía el correo de bienvenida/confirmación con EmailJS.
 * Devuelve { ok, simulated }.
 */
async function sendWelcomeEmail({ name, email, plan }) {
  const priceLabel = planPriceLabel(plan, state.billing);
  const params = {
    // Campos que debes mapear en tu plantilla de EmailJS:
    to_email: email,
    to_name: name,
    user_name: name,
    user_email: email,
    plan_name: plan.name,
    plan_price: priceLabel,
    subject: `¡Bienvenido a LinguaCraft, ${name}!`,
    message:
      plan.price === 0
        ? `¡Hola ${name}! Tu cuenta gratuita en LinguaCraft ya está activa. Tienes acceso a los 5 cursos gratis, al traductor con audio, a las 20 tarjetas de vocabulario y al quiz de 8 preguntas. ¡A aprender!`
        : `¡Hola ${name}! Confirmamos la activación de tu ${plan.name} (${priceLabel}). Ya desbloqueaste los 15 cursos, las guías culturales, las tarjetas de repaso y el certificado digital. ¡Bienvenido a la experiencia completa de LinguaCraft!`,
  };

  // ---- Modo simulación (claves sin configurar o SDK no disponible) ----
  if (!isEmailJsConfigured() || typeof window.emailjs === "undefined") {
    console.log("[LinguaCraft] 📧 CORREO SIMULADO (EmailJS no configurado) →", params);
    await new Promise((r) => setTimeout(r, 600)); // pequeña espera para el efecto visual
    return { ok: true, simulated: true };
  }

  // ---- Envío real con EmailJS ----
  try {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    const res = await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, {
      publicKey: EMAILJS_PUBLIC_KEY,
    });
    console.log("[LinguaCraft] 📧 Correo enviado correctamente:", res);
    return { ok: true, simulated: false };
  } catch (err) {
    console.error("[LinguaCraft] ❌ Error al enviar el correo con EmailJS:", err);
    return { ok: false, simulated: false };
  }
}

/** Actualiza el indicador del plan en la navbar. */
function updatePlanUI() {
  const plan = PLANS[state.plan] || PLANS.free;
  const badge = $("#planBadge");
  const badgeText = $("#planBadgeText");
  if (!badge || !badgeText) return;

  badge.dataset.plan = plan.id;
  badgeText.textContent =
    plan.name + (state.user && state.user.name ? ` · ${state.user.name.split(" ")[0]}` : "");

  const icon = plan.id === "pro" ? "crown" : plan.id === "student" ? "graduation-cap" : "star";
  const iconEl = badge.querySelector("svg, [data-lucide]");
  if (iconEl) {
    const wrapper = document.createElement("i");
    wrapper.setAttribute("data-lucide", icon);
    iconEl.replaceWith(wrapper);
    refreshIcons();
  }
}

/* ---- Certificado ---- */

function canGetCertificate() {
  return state.plan === "pro" || state.completed.length > 0;
}

function openCertificateModal() {
  const body = $("#certificateModalBody");
  const unlocked = canGetCertificate();

  if (!unlocked) {
    body.innerHTML = `
      <div class="cert-locked">
        <div class="cert-locked-icon"><i data-lucide="award"></i></div>
        <h2 id="certificateTitle">Tu certificado te espera</h2>
        <p class="plan-sub" style="margin:10px auto 20px;max-width:460px">
          Para obtener tu certificado necesitas el <strong>plan Pro</strong> o completar al menos
          <strong>un curso</strong>. Marca un curso como completado desde su lección y vuelve aquí.
        </p>
        <button class="btn btn-primary btn-lg" type="button" id="certGoPlans">
          <i data-lucide="crown"></i> Ver planes
        </button>
      </div>
    `;
    refreshIcons();
    $("#certGoPlans")?.addEventListener("click", () => {
      closeAllModals();
      document.getElementById("planes").scrollIntoView({ behavior: "smooth" });
    });
    openModal($("#certificateModal"));
    return;
  }

  const name = state.user?.name || "Estudiante de LinguaCraft";
  const plan = PLANS[state.plan] || PLANS.free;
  const count = state.completed.length;
  const dateStr = new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  const folio = `LC-${new Date().getFullYear()}-${String(count).padStart(2, "0")}${String(state.streak.best).padStart(2, "0")}`;

  body.innerHTML = `
    <div class="certificate">
      <span class="cert-brand"><i data-lucide="languages"></i> LinguaCraft</span>
      <h2 class="cert-title" id="certificateTitle">Certificado de Finalización</h2>
      <p class="cert-sub">Aprendizaje de idiomas y cultura</p>

      <div class="cert-name">${escapeHtml(name)}</div>

      <p class="cert-text">
        Por haber completado con éxito ${count > 0 ? `${count} ${count === 1 ? "curso" : "cursos"} en la plataforma` : "el programa de aprendizaje"},
        demostrando constancia y dedicación en el estudio de nuevos idiomas y su contexto cultural.
      </p>

      <div class="cert-meta">
        <div><b>${dateStr}</b><span>Fecha de emisión</span></div>
        <div><b>${escapeHtml(plan.name)}</b><span>Plan</span></div>
        <div><b>${count}</b><span>Cursos completados</span></div>
        <div><b>${state.streak.best}</b><span>Mejor racha (días)</span></div>
      </div>

      <div class="cert-seal"><i data-lucide="award"></i></div>

      <div class="cert-actions">
        <button class="btn btn-primary btn-lg" type="button" id="printCertBtn">
          <i data-lucide="printer"></i> Imprimir / Guardar PDF
        </button>
        <button class="btn btn-ghost btn-lg" type="button" data-close-modal>
          <i data-lucide="x"></i> Cerrar
        </button>
      </div>

      <p class="plan-sub" style="margin-top:18px">Folio: ${folio} · Documento con fines educativos</p>
    </div>
  `;
  refreshIcons();
  $("#printCertBtn")?.addEventListener("click", () => window.print());
  openModal($("#certificateModal"));
}

/* ============================================================================
   13) FOOTER + ARRANQUE
   ========================================================================== */

function initFooter() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  $("#certificateBtn")?.addEventListener("click", openCertificateModal);

  const resetBtn = $("#resetSubscriptionBtn");
  resetBtn?.addEventListener("click", () => {
    resetSubscriptionState();
    showToast("Suscripción reiniciada", "Volviste al Plan Gratuito. Los cursos PRO están bloqueados de nuevo.", "info");
  });
}

function resetSubscriptionState() {
  const theme = state.theme; // conservamos el tema elegido
  state = structuredClone(DEFAULT_STATE);
  state.theme = theme;
  saveState();
  updatePlanUI();
  renderCourses();
  renderPlans();
  renderProgress();
}

/** Cierra modales al hacer clic fuera o pulsar Escape. */
function initModalDismiss() {
  $$(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("mousedown", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-modal]")) {
      closeAllModals();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });
}

/** Precarga de voces para la Web Speech API. */
function warmUpVoices() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }
}

function init() {
  initTheme();
  warmUpVoices();
  initNavbar();
  initModalDismiss();
  initLanguageGrid();
  initCourseFilters();
  initCourseGrid();
  initDeck();
  initTranslator();
  initQuiz();
  initGuides();
  initPlans();
  initFooter();

  renderLanguages();
  renderCourses();
  renderProgress();
  renderDeck();
  updateReviewCount();
  renderGuides();
  renderExp();
  renderPlans();
  updatePlanUI();
  // Usar rAF para que el navegador calcule el layout antes de initReveal
  requestAnimationFrame(() => initReveal());
  refreshIcons();

  // Mensaje de estado de EmailJS (útil para la demo)
  if (!isEmailJsConfigured()) {
    console.info(
      "%c[LinguaCraft] Modo demostración de correos activo.\nConfigura EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID y EMAILJS_TEMPLATE_ID en app.js para enviar correos reales.",
      "color:#4F46E5;font-weight:bold"
    );
  }
}

document.addEventListener("DOMContentLoaded", init);
