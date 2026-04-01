/* ═══════════════════════════════════════════════════════════
   DEV4 Guide Interactif — script.js
═══════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollReveal();
  initHeroWave();
  initSineWave();
  initSamplingDemo();
  initFreqCompare();
  initInterleavedDemo();
  initWavDemo();
  initCircularBuffer();
  initSequencer();
  initArchPipeline();
  initLoadAnim();
  initBufDict();
  initPlayerSim();
  initCallbackSim();
  initArchVisuals();
  initThemeSwitcher();
  initMenuToggle();
});

/* ═══════════════════════════════════════════════════════
   NAVIGATION & SCROLL SPY
═══════════════════════════════════════════════════════ */
function initNavigation() {
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const progCircle = document.getElementById("prog-circle");
  const progPct = document.getElementById("prog-pct");
  const circumference = 2 * Math.PI * 22;

  function updateActive() {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    links.forEach((l) => {
      l.classList.toggle("active", l.dataset.s === current);
    });
    const idx = Array.from(sections).findIndex((s) => s.id === current);
    const pct = Math.round(((idx + 1) / sections.length) * 100);
    if (progCircle)
      progCircle.style.strokeDashoffset =
        circumference - (circumference * pct) / 100;
    if (progPct) progPct.textContent = pct + "%";
  }

  window.addEventListener("scroll", updateActive);
  updateActive();
}

function initScrollReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.02 },
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

function initMenuToggle() {
  const btn = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  if (!btn || !sidebar) return;
  btn.addEventListener("click", () => sidebar.classList.toggle("open"));
  document.querySelectorAll(".nav-link").forEach((l) => {
    l.addEventListener("click", () => sidebar.classList.remove("open"));
  });
}

function initThemeSwitcher() {
  const btns = document.querySelectorAll(".theme-btn");
  if (!btns.length) return;
  const saved = localStorage.getItem("dev4-theme") || "default";
  applyTheme(saved);
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      localStorage.setItem("dev4-theme", theme);
    });
  });
  function applyTheme(theme) {
    if (theme === "default")
      document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", theme);
    btns.forEach((b) =>
      b.classList.toggle("active", b.dataset.theme === theme),
    );
  }
}

/* ═══════════════════════════════════════════════════════
   HERO ANIMATED WAVE
═══════════════════════════════════════════════════════ */
function initHeroWave() {
  const canvas = document.getElementById("hero-wave");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let t = 0;

  function draw() {
    const W = canvas.width,
      H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 2.5;

    // Draw 2 waves
    const waves = [
      { color: "#2dd4bf", freq: 2, amp: 0.35, phase: 0 },
      { color: "#4a9eff", freq: 3, amp: 0.25, phase: 1.5 },
    ];

    waves.forEach((w) => {
      ctx.beginPath();
      ctx.strokeStyle = w.color;
      for (let x = 0; x < W; x++) {
        const y =
          H / 2 +
          Math.sin((x / W) * w.freq * Math.PI * 2 + t + w.phase) * w.amp * H;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    // Center line
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.setLineDash([4, 4]);
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    t += 0.03;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ═══════════════════════════════════════════════════════
   INTERACTIVE SINE WAVE (Section 1)
═══════════════════════════════════════════════════════ */
function initSineWave() {
  const canvas = document.getElementById("sine-canvas");
  const freqSlider = document.getElementById("wave-freq");
  const ampSlider = document.getElementById("wave-amp");
  const freqVal = document.getElementById("wave-freq-val");
  const ampVal = document.getElementById("wave-amp-val");
  if (!canvas || !freqSlider) return;
  const ctx = canvas.getContext("2d");

  function draw() {
    const W = canvas.width,
      H = canvas.height;
    const freq = parseFloat(freqSlider.value);
    const amp = parseFloat(ampSlider.value);
    if (freqVal) freqVal.textContent = freq.toFixed(1) + " Hz";
    if (ampVal) ampVal.textContent = amp.toFixed(2);

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.moveTo(0, H * 0.1);
    ctx.lineTo(W, H * 0.1);
    ctx.moveTo(0, H * 0.9);
    ctx.lineTo(W, H * 0.9);
    ctx.stroke();

    // Labels
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.font = "11px Inter";
    ctx.fillText("+1", 4, H * 0.1 + 12);
    ctx.fillText("-1", 4, H * 0.9 - 4);

    // Silence line (dashed)
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.setLineDash([5, 5]);
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Wave
    ctx.beginPath();
    ctx.strokeStyle = "#2dd4bf";
    ctx.lineWidth = 2.5;
    let creteX = -1,
      creuxX = -1,
      creteY = H,
      creuxY = 0;
    for (let x = 0; x < W; x++) {
      const norm = x / W;
      const y = H / 2 - Math.sin(norm * freq * Math.PI * 2) * amp * (H * 0.4);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      if (y < creteY && x > 30 && x < W - 30) {
        creteY = y;
        creteX = x;
      }
      if (y > creuxY && x > 30 && x < W - 30) {
        creuxY = y;
        creuxX = x;
      }
    }
    ctx.stroke();

    // Peak & trough dots
    if (creteX > 0) {
      ctx.beginPath();
      ctx.arc(creteX, creteY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#fb923c";
      ctx.fill();
      ctx.fillStyle = "#fb923c";
      ctx.font = "bold 11px Inter";
      ctx.fillText("crête", creteX + 10, creteY + 4);
    }
    if (creuxX > 0) {
      ctx.beginPath();
      ctx.arc(creuxX, creuxY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#f87171";
      ctx.fill();
      ctx.fillStyle = "#f87171";
      ctx.font = "bold 11px Inter";
      ctx.fillText("creux", creuxX + 10, creuxY + 4);
    }
  }

  freqSlider.addEventListener("input", draw);
  ampSlider.addEventListener("input", draw);
  draw();
}

/* ═══════════════════════════════════════════════════════
   SAMPLING DEMO (Section 2)
═══════════════════════════════════════════════════════ */
function initSamplingDemo() {
  const canvas = document.getElementById("sampling-canvas");
  const countSlider = document.getElementById("sample-count");
  const countVal = document.getElementById("sample-count-val");
  const cellsWrap = document.getElementById("sample-buffer-cells");
  const animBtn = document.getElementById("animate-sampling-btn");
  if (!canvas || !countSlider) return;
  const ctx = canvas.getContext("2d");

  function getSampleValues(n) {
    const vals = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      vals.push(Math.sin(t * 2 * Math.PI * 1.5));
    }
    return vals;
  }

  function draw() {
    const W = canvas.width,
      H = canvas.height;
    const n = parseInt(countSlider.value);
    if (countVal) countVal.textContent = n;
    ctx.clearRect(0, 0, W, H);

    // Draw continuous wave
    ctx.beginPath();
    ctx.strokeStyle = "#2dd4bf";
    ctx.lineWidth = 2;
    for (let x = 0; x < W; x++) {
      const t = x / W;
      const y = H / 2 - Math.sin(t * 2 * Math.PI * 1.5) * (H * 0.35);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw sample points and connecting lines
    const vals = getSampleValues(n);
    ctx.beginPath();
    ctx.strokeStyle = "rgba(251,146,60,0.5)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    vals.forEach((v, i) => {
      const x = (i / (n - 1)) * W;
      const y = H / 2 - v * (H * 0.35);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw dots
    vals.forEach((v, i) => {
      const x = (i / (n - 1)) * W;
      const y = H / 2 - v * (H * 0.35);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#fb923c";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
    });

    // Update buffer cells
    if (cellsWrap) {
      cellsWrap.innerHTML = "";
      vals.forEach((v) => {
        const cell = document.createElement("span");
        cell.className = "bc";
        cell.textContent = v.toFixed(2);
        cellsWrap.appendChild(cell);
      });
    }
  }

  countSlider.addEventListener("input", draw);
  draw();

  // Animate button
  if (animBtn) {
    animBtn.addEventListener("click", async () => {
      const cells = cellsWrap.querySelectorAll(".bc");
      for (const c of cells) {
        c.classList.remove("filled");
      }
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.add("filled");
        await new Promise((r) => setTimeout(r, 120));
      }
    });
  }
}

/* ═══════════════════════════════════════════════════════
   FREQUENCY COMPARISON (Section 3)
═══════════════════════════════════════════════════════ */
function initFreqCompare() {
  const ptsSlider = document.getElementById("freq-pts");
  const ptsVal = document.getElementById("freq-pts-val");
  const lowCanvas = document.getElementById("freq-low-canvas");
  const highCanvas = document.getElementById("freq-high-canvas");
  const verdict = document.getElementById("freq-verdict");
  if (!ptsSlider || !lowCanvas || !highCanvas) return;

  function drawComp(canvas, nPts, color) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Real wave (dashed)
    ctx.beginPath();
    ctx.strokeStyle = "rgba(251,146,60,0.3)";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x++) {
      const t = x / W;
      const y = H / 2 - Math.sin(t * Math.PI * 6) * (H * 0.35);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Sampled reconstruction
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for (let i = 0; i < nPts; i++) {
      const t = i / (nPts - 1);
      const x = t * W;
      const y = H / 2 - Math.sin(t * Math.PI * 6) * (H * 0.35);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Dots
    for (let i = 0; i < nPts; i++) {
      const t = i / (nPts - 1);
      const x = t * W;
      const y = H / 2 - Math.sin(t * Math.PI * 6) * (H * 0.35);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    // Label
    ctx.fillStyle = color;
    ctx.font = "bold 14px Inter";
    ctx.fillText(nPts + " pts", 8, 22);
  }

  function update() {
    const n = parseInt(ptsSlider.value);
    if (ptsVal) ptsVal.textContent = n + " pts";
    drawComp(lowCanvas, Math.max(4, Math.round(n / 4)), "#f87171");
    drawComp(highCanvas, n * 4, "#34d399");

    // Verdict
    if (verdict) {
      if (n < 10) {
        verdict.textContent = "😵 Mauvais";
        verdict.style.color = "#f87171";
      } else if (n < 25) {
        verdict.textContent = "🔥 Qualité correcte";
        verdict.style.color = "#fbbf24";
      } else {
        verdict.textContent = "✅ Excellent";
        verdict.style.color = "#34d399";
      }
    }
  }

  ptsSlider.addEventListener("input", update);
  update();
}

/* ═══════════════════════════════════════════════════════
   INTERLEAVED BUFFER DEMO (Section 4)
═══════════════════════════════════════════════════════ */
function initInterleavedDemo() {
  const wrap = document.getElementById("interleaved-cells");
  const advBtn = document.getElementById("il-advance");
  const resetBtn = document.getElementById("il-reset");
  const msg = document.getElementById("il-msg");
  const earL = document.getElementById("ear-l");
  const earR = document.getElementById("ear-r");
  if (!wrap) return;

  const TOTAL = 16;
  let frameIdx = 0;

  function buildCells() {
    wrap.innerHTML = "";
    for (let i = 0; i < TOTAL; i++) {
      const cell = document.createElement("span");
      cell.className = "ic";
      cell.textContent = i % 2 === 0 ? "L" : "R";
      wrap.appendChild(cell);
    }
  }
  buildCells();

  function reset() {
    frameIdx = 0;
    buildCells();
    if (msg)
      msg.textContent =
        'Clique "Avancer 1 frame" pour voir comment le buffer se remplit.';
    if (earL) earL.textContent = "—";
    if (earR) earR.textContent = "—";
  }

  advBtn &&
    advBtn.addEventListener("click", () => {
      if (frameIdx >= TOTAL / 2) {
        if (msg) msg.textContent = "✅ Buffer plein ! (8 frames stéréo)";
        return;
      }
      const cells = wrap.querySelectorAll(".ic");
      const li = frameIdx * 2;
      const ri = frameIdx * 2 + 1;
      const lv = (Math.sin(frameIdx * 0.8) * 0.7).toFixed(2);
      const rv = (Math.cos(frameIdx * 0.8) * 0.6).toFixed(2);

      if (cells[li]) {
        cells[li].textContent = lv;
        cells[li].classList.add("l-active");
      }
      if (cells[ri]) {
        cells[ri].textContent = rv;
        cells[ri].classList.add("r-active");
      }
      if (earL) earL.textContent = lv;
      if (earR) earR.textContent = rv;
      if (msg)
        msg.textContent = `Frame ${frameIdx + 1} : L=${lv}, R=${rv} — index ${li}=gauche, index ${ri}=droite`;
      frameIdx++;
    });
  resetBtn && resetBtn.addEventListener("click", reset);
}

/* ═══════════════════════════════════════════════════════
   WAV FILE DEMO (Section 5)
═══════════════════════════════════════════════════════ */
function initWavDemo() {
  const loadBtn = document.getElementById("wav-load-btn");
  const wavMsg = document.getElementById("wav-msg");
  const metaEl = document.getElementById("wav-meta");
  const dataEl = document.getElementById("wav-data-section");
  if (!loadBtn) return;
  let step = 0;

  loadBtn.addEventListener("click", async () => {
    step++;
    if (step === 1) {
      loadBtn.textContent = "▶ Étape 2 : lire le header";
      if (wavMsg)
        wavMsg.textContent =
          "📂 Fichier ouvert ! On lit d'abord le header (métadonnées)...";
    } else if (step === 2) {
      if (metaEl)
        metaEl.innerHTML =
          'sample_rate: <strong style="color:var(--teal)">44100</strong> &nbsp; channels: <strong style="color:var(--teal)">2</strong> &nbsp; bit_depth: <strong style="color:var(--teal)">16</strong>';
      loadBtn.textContent = "▶ Étape 3 : extraire les samples";
      if (wavMsg)
        wavMsg.textContent =
          "✅ Header lu ! sample_rate=44100, channels=2 (stéréo), bit_depth=16";
    } else if (step === 3) {
      if (dataEl) {
        dataEl.innerHTML =
          '— <span style="color:var(--green)">DATA (samples)</span><br>';
        const vals = [0.2, 0.1, 0.5, 0.3, -0.3, -0.2, 0.4, 0.6, -0.1, -0.5];
        let html =
          '<div style="display:flex;gap:3px;flex-wrap:wrap;margin-top:0.4rem">';
        vals.forEach((v) => {
          const c = v >= 0 ? "var(--green)" : "var(--red)";
          html += `<span style="background:var(--surf);border:1px solid ${c};color:${c};padding:2px 6px;border-radius:3px;font-size:0.72rem;font-family:var(--mono)">${v.toFixed(1)}</span>`;
        });
        html +=
          '<span style="color:var(--text-d);font-size:0.72rem">...</span></div>';
        dataEl.innerHTML += html;
      }
      loadBtn.textContent = "✅ Chargement terminé !";
      loadBtn.disabled = true;
      if (wavMsg)
        wavMsg.innerHTML =
          "🔊 <strong>Buffer rempli !</strong> Les samples sont en mémoire → prêt à jouer, looper, modifier !";
    }
  });
}

/* ═══════════════════════════════════════════════════════
   CIRCULAR BUFFER DEMO (Section 6)
═══════════════════════════════════════════════════════ */
function initCircularBuffer() {
  const cellsWrap = document.getElementById("circ-cells");
  const delaySlider = document.getElementById("circ-delay");
  const delayVal = document.getElementById("circ-delay-val");
  const stepBtn = document.getElementById("circ-step");
  const resetBtn = document.getElementById("circ-reset");
  const msgEl = document.getElementById("circ-msg");
  const wLabel = document.getElementById("circ-w-label");
  const rLabel = document.getElementById("circ-r-label");
  if (!cellsWrap) return;

  const SIZE = 8;
  const sounds = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  let writeIdx = 0,
    soundIdx = 0;

  function buildCells() {
    cellsWrap.innerHTML = "";
    for (let i = 0; i < SIZE; i++) {
      const cell = document.createElement("span");
      cell.className = "cc";
      cell.id = "cc-" + i;
      cellsWrap.appendChild(cell);
    }
  }
  buildCells();

  function getDelay() {
    return parseInt(delaySlider.value);
  }

  function updateHighlights() {
    const delay = getDelay();
    const readIdx = (writeIdx - delay + SIZE * 100) % SIZE;
    for (let i = 0; i < SIZE; i++) {
      const cell = document.getElementById("cc-" + i);
      cell.classList.remove("write", "read", "both");
      if (i === writeIdx && i === readIdx) cell.classList.add("both");
      else if (i === writeIdx) cell.classList.add("write");
      else if (i === readIdx) cell.classList.add("read");
    }
  }

  function reset() {
    writeIdx = 0;
    soundIdx = 0;
    buildCells();
    updateHighlights();
    if (msgEl)
      msgEl.textContent = 'Clique "Avancer 1 pas" pour voir le buffer tourner.';
  }

  delaySlider &&
    delaySlider.addEventListener("input", () => {
      if (delayVal) delayVal.textContent = delaySlider.value;
      updateHighlights();
    });

  stepBtn &&
    stepBtn.addEventListener("click", () => {
      const delay = getDelay();
      const readIdx = (writeIdx - delay + SIZE * 100) % SIZE;
      const currentSound = sounds[soundIdx % sounds.length];
      const cell = document.getElementById("cc-" + writeIdx);
      const oldVal = cell.textContent;

      // Read old value
      const readCell = document.getElementById("cc-" + readIdx);
      const readVal = readCell.textContent || "∅";

      cell.textContent = currentSound;
      cell.classList.add("has-val");

      if (msgEl) {
        if (readVal && readVal !== "∅" && readVal.trim()) {
          msgEl.innerHTML = `✍ WRITE[${writeIdx}] = <strong>${currentSound}</strong> &nbsp;|&nbsp; 📖 READ[${readIdx}] = <strong>${readVal}</strong> &nbsp;|&nbsp; sortie = ${currentSound} + ${readVal} = <strong>écho !</strong>`;
        } else {
          msgEl.innerHTML = `✍ WRITE[${writeIdx}] = <strong>${currentSound}</strong> &nbsp;|&nbsp; 📖 READ[${readIdx}] = ∅ (vide) → pas encore d'écho`;
        }
      }

      writeIdx = (writeIdx + 1) % SIZE;
      soundIdx++;
      updateHighlights();
    });
  resetBtn && resetBtn.addEventListener("click", reset);
  updateHighlights();
}

/* ═══════════════════════════════════════════════════════
   STEP SEQUENCER (Section 7)
═══════════════════════════════════════════════════════ */
function initSequencer() {
  const gridEl = document.getElementById("seq-grid");
  const playBtn = document.getElementById("seq-play");
  const clearBtn = document.getElementById("seq-clear");
  const preset1Btn = document.getElementById("seq-preset1");
  const preset2Btn = document.getElementById("seq-preset2");
  const bpmSlider = document.getElementById("seq-bpm");
  const bpmVal = document.getElementById("seq-bpm-val");
  if (!gridEl) return;

  const TRACKS = 4,
    STEPS = 16;
  const trackNames = ["Kick", "Snare", "Hi-Hat", "Clap"];
  let grid = Array.from({ length: TRACKS }, () => Array(STEPS).fill(false));
  let playing = false,
    currentStep = -1,
    intervalId = null;

  function buildGrid() {
    gridEl.innerHTML = "";
    gridEl.style.gridTemplateRows = `repeat(${TRACKS}, 1fr)`;
    for (let t = 0; t < TRACKS; t++) {
      const row = document.createElement("div");
      row.className = "s-row";
      const label = document.createElement("span");
      label.className = "s-label";
      label.textContent = trackNames[t];
      row.appendChild(label);
      for (let s = 0; s < STEPS; s++) {
        const cell = document.createElement("div");
        cell.className = "s-cell" + (grid[t][s] ? " on" : "");
        cell.dataset.track = t;
        cell.dataset.step = s;
        cell.addEventListener("click", () => {
          grid[t][s] = !grid[t][s];
          cell.classList.toggle("on", grid[t][s]);
        });
        row.appendChild(cell);
      }
      gridEl.appendChild(row);
    }
  }
  buildGrid();

  bpmSlider &&
    bpmSlider.addEventListener("input", () => {
      if (bpmVal) bpmVal.textContent = bpmSlider.value + " BPM";
      if (playing) {
        stopSeq();
        startSeq();
      }
    });

  function highlightCol(step) {
    document
      .querySelectorAll(".s-cell")
      .forEach((c) => c.classList.remove("active-col"));
    if (step < 0) return;
    document
      .querySelectorAll(`.s-cell[data-step="${step}"]`)
      .forEach((c) => c.classList.add("active-col"));
  }

  function startSeq() {
    const bpm = parseInt(bpmSlider ? bpmSlider.value : 120);
    const stepMs = (60 / bpm / 4) * 1000;
    playing = true;
    playBtn.textContent = "⏹ Stop";
    intervalId = setInterval(() => {
      currentStep = (currentStep + 1) % STEPS;
      highlightCol(currentStep);
    }, stepMs);
  }

  function stopSeq() {
    playing = false;
    playBtn.textContent = "▶ Play";
    clearInterval(intervalId);
    currentStep = -1;
    highlightCol(-1);
  }

  playBtn &&
    playBtn.addEventListener("click", () => {
      if (playing) stopSeq();
      else startSeq();
    });

  clearBtn &&
    clearBtn.addEventListener("click", () => {
      grid = Array.from({ length: TRACKS }, () => Array(STEPS).fill(false));
      buildGrid();
    });

  // Presets
  const basicBeat = [
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  ];
  const techno = [
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  ];

  function applyPreset(p) {
    grid = p.map((r) => r.map((v) => !!v));
    buildGrid();
  }

  preset1Btn &&
    preset1Btn.addEventListener("click", () => applyPreset(basicBeat));
  preset2Btn && preset2Btn.addEventListener("click", () => applyPreset(techno));
}

/* ═══════════════════════════════════════════════════════
   ARCHITECTURE PIPELINE (Section 8)
═══════════════════════════════════════════════════════ */
function initArchPipeline() {
  const msgEl = document.getElementById("arch-msg");
  const blocks = document.querySelectorAll(".arch-block");
  if (!blocks.length) return;

  const info = {
    seq: "<strong>🎼 Step Sequencer</strong> — Le chef d'orchestre. Il avance dans la grille (16 steps) au rythme du BPM. À chaque step, il regarde quelles cases sont activées et dit aux Audio Players correspondants de commencer à jouer.",
    player:
      '<strong>🎵 Audio Player (×4)</strong> — Chaque player est un petit lecteur dédié à une piste (kick, snare, hihat, clap). Quand le séquenceur dit "START", il lit son fichier WAV buffer par buffer (256 frames à la fois) jusqu\'à la fin du son.',
    delay:
      "<strong>⏱ Delay (×4)</strong> — Ajoute un écho au son de la piste. Utilise un buffer circulaire : il écrit le son actuel (WRITE) et lit un ancien son (READ). Distance entre les deux = delay time. Le mélange actuel+ancien = écho.",
    mixer:
      "<strong>🎛 Mixer</strong> — Prend le buffer actuel de CHAQUE piste (4 buffers de 256 frames) et les additionne frame par frame. Résultat = 1 seul buffer final contenant le mélange de tous les instruments.",
    out: "<strong>🔊 Audio Out</strong> — Envoie le buffer final vers la carte son → haut-parleurs → tes oreilles. Cela se répète ~172 fois par seconde (toutes les ~6ms).",
  };

  blocks.forEach((b) => {
    b.addEventListener("click", () => {
      blocks.forEach((bb) => bb.classList.remove("arch-active"));
      b.classList.add("arch-active");
      const key = b.dataset.arch;
      if (msgEl && info[key]) msgEl.innerHTML = info[key];
    });
  });
}

/* ═══════════════════════════════════════════════════════
   LOAD ANIMATION (Section 8 — Chargement en mémoire)
═══════════════════════════════════════════════════════ */
function initLoadAnim() {
  const btn = document.getElementById("load-anim-btn");
  const resetBtn = document.getElementById("load-anim-reset");
  const cellsEl = document.getElementById("load-anim-cells");
  const msgEl = document.getElementById("load-anim-msg");
  const fileEl = document.getElementById("load-anim-file");
  const arrowEl = document.getElementById("load-anim-arrow");
  const ramEl = document.getElementById("load-anim-ram");
  if (!btn || !cellsEl) return;

  const sampleVals = [
    0.0, 0.12, 0.45, 0.78, 0.95, 0.67, 0.34, -0.12, -0.56, -0.89, -0.73, -0.41,
    -0.08, 0.23, 0.61, 0.84,
  ];

  function reset() {
    cellsEl.innerHTML = "";
    for (let i = 0; i < 16; i++) {
      const c = document.createElement("div");
      c.className = "lar-cell";
      c.textContent = "—";
      cellsEl.appendChild(c);
    }
    if (fileEl) fileEl.classList.remove("active");
    if (arrowEl) arrowEl.classList.remove("active");
    if (ramEl) ramEl.classList.remove("active");
    if (msgEl)
      msgEl.textContent =
        "Clique pour voir le fichier WAV se charger en mémoire étape par étape.";
  }

  reset();

  btn.addEventListener("click", () => {
    reset();
    const cells = cellsEl.querySelectorAll(".lar-cell");

    // Step 1: highlight file
    setTimeout(() => {
      if (fileEl) fileEl.classList.add("active");
      if (msgEl)
        msgEl.textContent =
          "Étape 1 — SDL_LoadWAV() lit le fichier sur le disque…";
    }, 200);

    // Step 2: arrow active
    setTimeout(() => {
      if (arrowEl) arrowEl.classList.add("active");
      if (msgEl)
        msgEl.textContent = "Étape 2 — Conversion en floats stéréo 44100 Hz…";
    }, 1000);

    // Step 3: fill cells one by one
    setTimeout(() => {
      if (ramEl) ramEl.classList.add("active");
      if (msgEl)
        msgEl.textContent =
          "Étape 3 — Remplissage du vector<float> en mémoire…";
    }, 1800);

    cells.forEach((cell, i) => {
      setTimeout(
        () => {
          cell.classList.add("filled");
          cell.textContent = sampleVals[i].toFixed(2);
          if (i === cells.length - 1 && msgEl) {
            msgEl.textContent =
              "✅ Chargé ! Le sample buffer contient maintenant " +
              cells.length +
              " floats (en vrai, des milliers).";
          }
        },
        2000 + i * 120,
      );
    });
  });

  resetBtn && resetBtn.addEventListener("click", reset);
}

/* ═══════════════════════════════════════════════════════
   BUFFER DICTIONARY (Section 8 — Les 5 buffers)
═══════════════════════════════════════════════════════ */
function initBufDict() {
  const btns = document.querySelectorAll(".buf-dict-btn");
  const info = document.getElementById("buf-dict-info");
  if (!btns.length || !info) return;

  const data = {
    sample: {
      title: "📁 Sample Buffer",
      desc: "C'est le fichier WAV entier chargé en mémoire sous forme de <code>vector&lt;float&gt;</code>. Il contient TOUS les échantillons du son (ex: un kick de 0.3s = ~26 460 floats en stéréo). Il est créé UNE SEULE FOIS au démarrage et ne change plus jamais. C'est la « bibliothèque » dans laquelle le player pioche.",
      size: "Variable (milliers de floats)",
      lifetime: "Permanent (toute la durée du programme)",
    },
    track: {
      title: "🎵 Track Buffer",
      desc: "C'est un petit buffer temporaire de 512 floats (256 frames × 2 canaux). À chaque callback, l'AudioPlayer y copie les 256 prochaines frames qu'il lit dans le sample buffer. C'est le « morceau en cours de lecture ». Il est écrasé à chaque callback.",
      size: "512 floats (BUFFER_SIZE)",
      lifetime: "Écrasé à chaque callback (~6ms)",
    },
    delay: {
      title: "⏱ Delay Buffer",
      desc: "C'est un buffer circulaire de 88 200 floats (= 1 seconde de son stéréo à 44100 Hz). Le delay y écrit le son actuel et lit un ancien son pour créer l'écho. Les indices read/write tournent en boucle (modulo 88200). Il garde l'historique du son.",
      size: "88 200 floats (DELAY_BUFFER_SIZE)",
      lifetime: "Permanent, écrit en continu",
    },
    output: {
      title: "🔊 Output Buffer",
      desc: "C'est le buffer final de 512 floats que PortAudio envoie à la carte son. Le Mixer le remplit en additionnant les 4 track buffers (un par piste). C'est ce que tes oreilles entendent. Il est fourni par PortAudio via le pointeur <code>output</code> du callback.",
      size: "512 floats (BUFFER_SIZE)",
      lifetime: "Fourni par PortAudio à chaque callback",
    },
  };

  function show(key) {
    const d = data[key];
    if (!d) return;
    info.innerHTML = `<h4>${d.title}</h4><p>${d.desc}</p><p style="margin-top:0.5rem;font-size:0.78rem;color:var(--text-d)"><strong>Taille :</strong> ${d.size}<br><strong>Durée de vie :</strong> ${d.lifetime}</p>`;
    btns.forEach((b) => b.classList.toggle("active", b.dataset.buf === key));
  }

  btns.forEach((b) => b.addEventListener("click", () => show(b.dataset.buf)));
  show("sample");
}

/* ═══════════════════════════════════════════════════════
   PLAYER SIMULATOR (Section 8 — Audio Player)
═══════════════════════════════════════════════════════ */
function initPlayerSim() {
  const stepBtn = document.getElementById("player-sim-step");
  const autoBtn = document.getElementById("player-sim-auto");
  const resetBtn = document.getElementById("player-sim-reset");
  const progressEl = document.getElementById("player-sim-progress");
  const cursorEl = document.getElementById("player-sim-cursor");
  const posEl = document.getElementById("player-sim-pos");
  const maxEl = document.getElementById("player-sim-max");
  const playingEl = document.getElementById("player-sim-playing");
  const cbEl = document.getElementById("player-sim-cb");
  const msgEl = document.getElementById("player-sim-msg");
  if (!stepBtn) return;

  const TOTAL = 2000;
  const CHUNK = 256;
  let pos = 0;
  let cb = 0;
  let autoId = null;

  function update() {
    const pct = Math.min((pos / TOTAL) * 100, 100);
    if (progressEl) progressEl.style.width = pct + "%";
    if (cursorEl) cursorEl.style.left = pct + "%";
    if (posEl) posEl.textContent = pos;
    if (maxEl) maxEl.textContent = TOTAL;
    if (cbEl) cbEl.textContent = "#" + cb;
    const playing = pos < TOTAL;
    if (playingEl) {
      playingEl.textContent = playing ? "true" : "false";
      playingEl.style.color = playing ? "var(--green)" : "var(--red)";
    }
    if (!playing && msgEl) {
      msgEl.textContent =
        "✅ Son terminé ! Il a fallu " +
        cb +
        " callbacks pour lire le fichier entier (~" +
        cb * 6 +
        "ms).";
      stopAuto();
    }
  }

  function step() {
    if (pos >= TOTAL) return;
    const read = Math.min(CHUNK, TOTAL - pos);
    pos += read;
    cb++;
    if (msgEl && pos < TOTAL) {
      msgEl.textContent =
        "Callback #" +
        cb +
        " — lu frames " +
        (pos - read) +
        "→" +
        pos +
        " (" +
        read +
        " frames). Reste " +
        (TOTAL - pos) +
        " frames.";
    }
    update();
  }

  function stopAuto() {
    if (autoId) {
      clearInterval(autoId);
      autoId = null;
    }
  }

  function reset() {
    stopAuto();
    pos = 0;
    cb = 0;
    if (msgEl)
      msgEl.textContent = "Clique pour avancer le player de 256 frames.";
    update();
  }

  stepBtn.addEventListener("click", step);
  autoBtn &&
    autoBtn.addEventListener("click", () => {
      if (autoId) {
        stopAuto();
        return;
      }
      autoId = setInterval(step, 200);
    });
  resetBtn && resetBtn.addEventListener("click", reset);
  update();
}

/* ═══════════════════════════════════════════════════════
   CALLBACK SIMULATOR (Section 8 — Un callback complet)
═══════════════════════════════════════════════════════ */
function initCallbackSim() {
  const stepBtn = document.getElementById("cb-sim-step");
  const allBtn = document.getElementById("cb-sim-all");
  const resetBtn = document.getElementById("cb-sim-reset");
  const msgEl = document.getElementById("cb-sim-msg");
  const steps = document.querySelectorAll("#callback-steps .cb-step");
  if (!stepBtn || !steps.length) return;

  const msgs = [
    "Le Sequencer vérifie si on doit avancer de step. Si oui, il dit 'START' aux players concernés.",
    "Chaque AudioPlayer lit 256 frames depuis son sample buffer et remplit son track buffer.",
    "Chaque Delay lit/écrit dans son buffer circulaire pour ajouter l'écho au track buffer.",
    "Le Mixer additionne les 4 track buffers frame par frame dans le output buffer.",
    "Le output buffer est envoyé à PortAudio → carte son → haut-parleurs. Tu entends le son !",
  ];

  let currentStep = -1;

  function reset() {
    currentStep = -1;
    steps.forEach((s) => {
      s.classList.remove("done", "active");
    });
    for (let i = 0; i < 5; i++) {
      const st = document.getElementById("cb-status-" + i);
      if (st) st.textContent = "⏳";
    }
    if (msgEl)
      msgEl.textContent = "Clique pour simuler les étapes d'un callback audio.";
  }

  function doStep(idx) {
    if (idx >= steps.length) return;
    // mark previous as done
    if (idx > 0) {
      steps[idx - 1].classList.remove("active");
      steps[idx - 1].classList.add("done");
      const prevSt = document.getElementById("cb-status-" + (idx - 1));
      if (prevSt) prevSt.textContent = "✅";
    }
    steps[idx].classList.add("active");
    if (msgEl) msgEl.textContent = "Étape " + (idx + 1) + " — " + msgs[idx];
  }

  function advance() {
    currentStep++;
    if (currentStep >= steps.length) {
      // finish last
      steps[steps.length - 1].classList.remove("active");
      steps[steps.length - 1].classList.add("done");
      const lastSt = document.getElementById("cb-status-" + (steps.length - 1));
      if (lastSt) lastSt.textContent = "✅";
      if (msgEl)
        msgEl.textContent =
          "✅ Callback terminé ! Tout ça en ~6ms. Puis PortAudio rappelle pour le prochain buffer.";
      return;
    }
    doStep(currentStep);
  }

  function showAll() {
    reset();
    steps.forEach((s, i) => {
      s.classList.add("done");
      const st = document.getElementById("cb-status-" + i);
      if (st) st.textContent = "✅";
    });
    currentStep = steps.length;
    if (msgEl)
      msgEl.textContent =
        "✅ Les 5 étapes se déroulent en ~6ms. Puis ça recommence 172 fois par seconde !";
  }

  stepBtn.addEventListener("click", advance);
  allBtn && allBtn.addEventListener("click", showAll);
  resetBtn && resetBtn.addEventListener("click", reset);
}

/* ═══════════════════════════════════════════════════════
   ARCHITECTURE VISUALS — Buffer cells, mixer bars, etc.
═══════════════════════════════════════════════════════ */
function initArchVisuals() {
  // ── Buffer visual cells ──
  function fillCells(id, count, color, maxH) {
    const el = document.getElementById(id);
    if (!el) return;
    for (let i = 0; i < count; i++) {
      const c = document.createElement("div");
      c.className = "bv-cell";
      const h = Math.random() * maxH + 4;
      c.style.height = h + "px";
      c.style.background = color;
      c.style.opacity = 0.3 + Math.random() * 0.7;
      el.appendChild(c);
    }
  }

  fillCells("bv-sample-cells", 60, "var(--teal)", 28);
  fillCells("bv-track-cells", 20, "var(--green)", 28);
  fillCells("bv-output-cells", 20, "var(--purple)", 28);

  // ── Mixer bars ──
  const mixerData = {
    kick: [0.8, 0.7, 0.5, 0.2, 0.6, 0.9, 0.4, 0.3],
    snare: [0, 0, 0, 0, 0, 0, 0, 0],
    hihat: [0.3, 0.3, 0.1, 0.15, 0.25, 0.2, 0.35, 0.1],
    clap: [0, 0, 0, 0, 0, 0, 0, 0],
  };

  function createBars(id, values, color) {
    const el = document.getElementById(id);
    if (!el) return;
    values.forEach((v) => {
      const bar = document.createElement("div");
      bar.className = "mx-bar";
      bar.style.height = Math.max(v * 24, 2) + "px";
      bar.style.background = v > 0 ? color : "var(--surf3)";
      el.appendChild(bar);
    });
  }

  createBars("mx-bars-kick", mixerData.kick, "var(--teal)");
  createBars("mx-bars-snare", mixerData.snare, "var(--surf3)");
  createBars("mx-bars-hihat", mixerData.hihat, "var(--green)");
  createBars("mx-bars-clap", mixerData.clap, "var(--surf3)");

  // Output bars = sum
  const outEl = document.getElementById("mx-bars-out");
  if (outEl) {
    for (let i = 0; i < mixerData.kick.length; i++) {
      const sum =
        mixerData.kick[i] +
        mixerData.snare[i] +
        mixerData.hihat[i] +
        mixerData.clap[i];
      const bar = document.createElement("div");
      bar.className = "mx-bar";
      bar.style.height = Math.max(sum * 18, 2) + "px";
      bar.style.background = "var(--purple)";
      outEl.appendChild(bar);
    }
  }

  // ── Audio out chain animation ──
  const chain = document.getElementById("audio-out-chain");
  if (chain) {
    const steps = chain.querySelectorAll(".aoc-step");
    steps.forEach((step, i) => {
      step.style.animationDelay = i * 0.15 + "s";
    });
  }
}
