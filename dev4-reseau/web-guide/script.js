/* ═══════════════════════════════════════════════════════════
   DEV4 Réseau — Script interactif
   Navigation · Scroll reveal · Thèmes · Démos
═══════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollReveal();
  initProgressRing();
  initThemeSwitcher();
  initOOPDemo();
  initNumpyDemo();
  initCaesarDemo();
  initPipelineDemo();
});

/* ─── NAVIGATION & SIDEBAR ─────────────────────────── */
function initNavigation() {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("menu-toggle");
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  toggle.addEventListener("click", () => sidebar.classList.toggle("open"));

  links.forEach((l) =>
    l.addEventListener("click", () => sidebar.classList.remove("open")),
  );

  // Scroll spy
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach((l) =>
            l.classList.toggle("active", l.dataset.s === id),
          );
        }
      });
    },
    { rootMargin: "-30% 0px -65% 0px" },
  );
  sections.forEach((s) => obs.observe(s));
}

/* ─── SCROLL REVEAL ────────────────────────────────── */
function initScrollReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

/* ─── PROGRESS RING ────────────────────────────────── */
function initProgressRing() {
  const circle = document.getElementById("prog-circle");
  const label = document.getElementById("prog-pct");
  if (!circle) return;
  const circumference = 2 * Math.PI * 22;
  circle.style.strokeDasharray = circumference;

  function update() {
    const sections = document.querySelectorAll(".section");
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct =
      docH > 0 ? Math.min(Math.round((scrollTop / docH) * 100), 100) : 0;
    circle.style.strokeDashoffset = circumference - (pct / 100) * circumference;
    label.textContent = pct + "%";
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ─── THEME SWITCHER ───────────────────────────────── */
function initThemeSwitcher() {
  const btns = document.querySelectorAll(".theme-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.theme;
      if (t === "default")
        document.documentElement.removeAttribute("data-theme");
      else document.documentElement.setAttribute("data-theme", t);
      btns.forEach((b) => b.classList.toggle("active", b === btn));
    });
  });
}

/* ─── OOP DEMO ─────────────────────────────────────── */
function initOOPDemo() {
  const nameInput = document.getElementById("oop-name");
  const weightSlider = document.getElementById("oop-weight");
  const weightVal = document.getElementById("oop-weight-val");
  const result = document.getElementById("oop-result");
  if (!nameInput || !weightSlider) return;

  function render() {
    const n = nameInput.value || "Inconnu";
    const w = weightSlider.value;
    weightVal.textContent = w + " kg";
    result.innerHTML = `
      <div class="oop-class-title">Dog</div>
      <span class="oop-attr">__name = "${n}"</span>
      <span class="oop-attr">__weight = ${w}</span>
      <span class="oop-attr">__hungry = False</span>
      <span class="oop-method">sound() → "Woof!"</span>
      <span class="oop-method">__str__() → "Dog(${n})"</span>
    `;
  }
  nameInput.addEventListener("input", render);
  weightSlider.addEventListener("input", render);
  render();
}

/* ─── NUMPY RESHAPE DEMO ──────────────────────────── */
function initNumpyDemo() {
  const countSlider = document.getElementById("np-count");
  const rowsSlider = document.getElementById("np-rows");
  const countVal = document.getElementById("np-count-val");
  const rowsVal = document.getElementById("np-rows-val");
  const grid = document.getElementById("np-grid-wrap");
  const msg = document.getElementById("np-msg");
  if (!countSlider || !rowsSlider) return;

  function render() {
    const count = parseInt(countSlider.value);
    const rows = parseInt(rowsSlider.value);
    countVal.textContent = count;
    rowsVal.textContent = rows;

    if (count % rows !== 0) {
      msg.textContent = `⚠ ${count} n'est pas divisible par ${rows} — reshape impossible !`;
      msg.style.color = "var(--red)";
      grid.innerHTML = "";
      return;
    }
    const cols = count / rows;
    msg.textContent = `Shape : (${rows}, ${cols}) — ${count} éléments`;
    msg.style.color = "var(--teal)";

    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    let html = "";
    for (let i = 0; i < count; i++) {
      const hue = Math.round((i / count) * 200 + 180);
      html += `<div class="np-cell" style="background:hsl(${hue},60%,30%);animation-delay:${i * 30}ms">${i}</div>`;
    }
    grid.innerHTML = html;
  }
  countSlider.addEventListener("input", render);
  rowsSlider.addEventListener("input", render);
  render();
}

/* ─── CAESAR CIPHER DEMO ──────────────────────────── */
function initCaesarDemo() {
  const keySlider = document.getElementById("caesar-key");
  const keyVal = document.getElementById("caesar-key-val");
  const input = document.getElementById("caesar-input");
  const output = document.getElementById("caesar-output");
  const alphabetGrid = document.getElementById("caesar-alphabet");
  if (!keySlider || !input) return;

  function caesarChar(ch, shift) {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90)
      return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    if (code >= 97 && code <= 122)
      return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    return ch;
  }

  function encrypt(text, shift) {
    return text
      .split("")
      .map((c) => caesarChar(c, shift))
      .join("");
  }

  function renderAlphabet(shift) {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let html = "";
    for (let i = 0; i < 26; i++) {
      const shifted = alpha[(i + shift) % 26];
      const isActive = i === shift ? " caesar-active" : "";
      html += `<div class="caesar-cell${isActive}"><small style="color:var(--text-d)">${alpha[i]}</small><span style="font-weight:700;color:var(--accent)">${shifted}</span></div>`;
    }
    alphabetGrid.innerHTML = html;
  }

  function update() {
    const key = parseInt(keySlider.value);
    keyVal.textContent = key;
    output.value = encrypt(input.value.toUpperCase(), key);
    renderAlphabet(key);
  }

  keySlider.addEventListener("input", update);
  input.addEventListener("input", update);
  update();
}

/* ─── PIPELINE DEMO ────────────────────────────────── */
function initPipelineDemo() {
  const blocks = document.querySelectorAll("[data-prep]");
  const msgEl = document.getElementById("prep-msg");
  if (!blocks.length || !msgEl) return;

  const descriptions = {
    raw: "📂 Les données brutes : c'est le CSV tel quel, avec des trous, du texte, des valeurs bizarres. Il faut tout nettoyer avant d'utiliser un modèle.",
    missing:
      "🕳 Les valeurs manquantes : certaines cases sont vides (ex: l'âge de 177 passagers). On peut les remplir avec la moyenne, la médiane, ou un mini-modèle ML.",
    anomalies:
      "⚠ Les anomalies (outliers) : des valeurs extrêmes qui faussent les calculs. Ex: un billet à 512$ alors que 75% sont < 40$. On les détecte avec k-NN.",
    encoding:
      '🔤 L\'encodage : transformer le texte en nombres. "male"→1, "female"→0 (ordinal) ou créer des colonnes 0/1 (one-hot). Les algos ne comprennent que les chiffres !',
    scaling:
      "📏 La mise à l'échelle : remettre toutes les colonnes dans le même ordre de grandeur. StandardScaler (moyenne=0, écart-type=1) ou MinMaxScaler (entre 0 et 1).",
    dim: '📉 La réduction de dimensionnalité : si tu as trop de colonnes, PCA les combine en gardant l\'essentiel. Évite le "fléau de la dimensionnalité".',
    ready:
      "✅ Les données sont prêtes ! On peut maintenant entraîner un modèle (arbre de décision, K-Means...) et mesurer ses performances.",
  };

  blocks.forEach((b) => {
    b.addEventListener("click", () => {
      blocks.forEach((x) => x.classList.remove("pipe-active"));
      b.classList.add("pipe-active");
      msgEl.textContent = descriptions[b.dataset.prep] || "";
    });
  });
}
