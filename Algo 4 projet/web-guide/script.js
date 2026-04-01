/* ═══════════════════════════════════════════════════════════
   ALG4 Guide Interactif — script.js
═══════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollReveal();
  initExpandableCards();
  initAgentCycle();
  initHeroArena();
  initMinimaxTree("mm-svg", false);
  initMinimaxTree("ab-svg", true);
  initEvalCalculator();
  initQTable();
  initEpsSlider();
  initTDSteps();
  initPipeline();
  initAccordion();
  initWeightsChart();
  initThermostat();
  initGammaSlider();
  initBFSDemo();
  initRecapTable();
  initMenuToggle();
  initThemeSwitcher();
});

/* ═══════════════════════════════════════════════════════
   THEME SWITCHER
═══════════════════════════════════════════════════════ */
function initThemeSwitcher() {
  const btns = document.querySelectorAll(".theme-btn");
  if (!btns.length) return;

  const saved = localStorage.getItem("alg4-theme") || "default";
  applyTheme(saved);

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      localStorage.setItem("alg4-theme", theme);
    });
  });

  function applyTheme(theme) {
    if (theme === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    btns.forEach((b) =>
      b.classList.toggle("active", b.dataset.theme === theme),
    );
  }
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION & SCROLL SPY
═══════════════════════════════════════════════════════ */
function initNavigation() {
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const circle = document.getElementById("prog-circle");
  const pctEl = document.getElementById("prog-pct");
  const CIRC = 2 * Math.PI * 22; // r=22

  function update() {
    const scroll = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = Math.min(1, scroll / total);
    const offset = CIRC * (1 - pct);
    if (circle) {
      circle.style.strokeDashoffset = offset;
    }
    if (pctEl) {
      pctEl.textContent = Math.round(pct * 100) + "%";
    }

    let active = "s0";
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top < window.innerHeight * 0.45)
        active = s.id;
    });
    links.forEach((l) => l.classList.toggle("active", l.dataset.s === active));
  }
  window.addEventListener("scroll", update, { passive: true });
  update();

  links.forEach((l) => {
    l.addEventListener("click", (e) => {
      e.preventDefault();
      const t = document.getElementById(l.dataset.s);
      if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("sidebar").classList.remove("open");
    });
  });
}

function initMenuToggle() {
  const btn = document.getElementById("menu-toggle");
  const sb = document.getElementById("sidebar");
  if (!btn || !sb) return;
  btn.addEventListener("click", () => sb.classList.toggle("open"));
  document.addEventListener("click", (e) => {
    if (!sb.contains(e.target) && !btn.contains(e.target))
      sb.classList.remove("open");
  });
}

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

/* ═══════════════════════════════════════════════════════
   HERO ARENA — Pac-Man animation
═══════════════════════════════════════════════════════ */
function initHeroArena() {
  const arena = document.getElementById("hero-arena");
  if (!arena) return;
  const grid = document.getElementById("maze-grid");
  const cols = 12,
    rows = 9;
  const walls = new Set([
    "0,0",
    "1,0",
    "2,0",
    "3,0",
    "4,0",
    "5,0",
    "6,0",
    "7,0",
    "8,0",
    "9,0",
    "10,0",
    "11,0",
    "0,8",
    "1,8",
    "2,8",
    "3,8",
    "4,8",
    "5,8",
    "6,8",
    "7,8",
    "8,8",
    "9,8",
    "10,8",
    "11,8",
    "0,1",
    "0,2",
    "0,3",
    "0,4",
    "0,5",
    "0,6",
    "0,7",
    "11,1",
    "11,2",
    "11,3",
    "11,4",
    "11,5",
    "11,6",
    "11,7",
    "2,2",
    "3,2",
    "5,2",
    "6,2",
    "8,2",
    "2,4",
    "4,4",
    "7,4",
    "9,4",
    "2,6",
    "4,6",
    "6,6",
    "8,6",
    "9,6",
  ]);
  grid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows},1fr)`;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.className =
        "maze-cell " + (walls.has(`${c},${r}`) ? "maze-wall" : "maze-dot");
      grid.appendChild(cell);
    }
  const pac = document.getElementById("hero-pac");
  const g1 = document.getElementById("ghost1");
  const g2 = document.getElementById("ghost2");
  const scoreEl = document.getElementById("hero-score");
  let score = 0;
  const cellW = () => arena.clientWidth / cols;
  const cellH = () => arena.clientHeight / rows;
  function place(el, c, r) {
    el.style.left = c * cellW() + 2 + "px";
    el.style.top = r * cellH() + 2 + "px";
  }
  const path = [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [4, 2],
    [4, 3],
    [3, 3],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
    [5, 4],
    [5, 3],
    [6, 3],
    [7, 3],
    [7, 2],
    [7, 1],
    [8, 1],
    [9, 1],
    [10, 1],
    [10, 2],
    [10, 3],
    [10, 4],
    [9, 4],
    [8, 4],
    [8, 5],
    [9, 5],
    [10, 5],
    [10, 6],
    [9, 6],
    [8, 6],
    [7, 6],
    [6, 6],
    [5, 6],
    [4, 7],
    [3, 7],
    [2, 7],
  ];
  let pi = 0;
  place(pac, path[0][0], path[0][1]);
  place(g1, 9, 1);
  place(g2, 3, 6);
  let g1x = 9,
    g1y = 1,
    g2x = 3,
    g2y = 6;
  setInterval(() => {
    pi = (pi + 1) % path.length;
    const [pc, pr] = path[pi];
    place(pac, pc, pr);
    score += 10;
    scoreEl.textContent = score;
    g1x += (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.7 ? 1 : 0);
    g1y += (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.7 ? 1 : 0);
    g1x = Math.max(1, Math.min(10, g1x));
    g1y = Math.max(1, Math.min(7, g1y));
    g2x += (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.7 ? 1 : 0);
    g2y += (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.7 ? 1 : 0);
    g2x = Math.max(1, Math.min(10, g2x));
    g2y = Math.max(1, Math.min(7, g2y));
    if (!walls.has(`${g1x},${g1y}`)) place(g1, g1x, g1y);
    if (!walls.has(`${g2x},${g2y}`)) place(g2, g2x, g2y);
  }, 420);
}

/* ═══════════════════════════════════════════════════════
   AGENT CYCLE ANIMATION
═══════════════════════════════════════════════════════ */
function initAgentCycle() {
  const nodes = ["cyc1", "cyc2", "cyc3"];
  let ci = 0;
  function tick() {
    nodes.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle("cyc-active", i === ci);
    });
    ci = (ci + 1) % nodes.length;
  }
  tick();
  setInterval(tick, 1400);
}

/* ═══════════════════════════════════════════════════════
   EXPAND PANELS (Section 1 cards)
═══════════════════════════════════════════════════════ */
function initExpandableCards() {
  document.querySelectorAll(".concept-card").forEach((card) => {
    card.addEventListener("click", () => {
      const targetId = card.dataset.expand;
      if (!targetId) return;
      const panel = document.getElementById(targetId);
      if (!panel) return;
      const isOpen = panel.classList.contains("open");
      document
        .querySelectorAll(".expand-panel.open")
        .forEach((p) => p.classList.remove("open"));
      document
        .querySelectorAll(".concept-card")
        .forEach((c) => (c.style.borderColor = ""));
      if (!isOpen) {
        panel.classList.add("open");
        card.style.borderColor = "var(--primary)";
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════
   MINIMAX / ALPHA-BETA TREE SVG
═══════════════════════════════════════════════════════ */
const TREE_NODES = {
  root: { x: 400, y: 48, type: "MAX", label: "Pac-Man" },
  mn: {
    x: 145,
    y: 155,
    type: "MIN",
    label: "Nord",
    parent: "root",
    edge: "Nord",
  },
  me: {
    x: 400,
    y: 155,
    type: "MIN",
    label: "Est",
    parent: "root",
    edge: "Est",
  },
  ms: {
    x: 655,
    y: 155,
    type: "MIN",
    label: "Sud",
    parent: "root",
    edge: "Sud",
  },
  ln1: { x: 75, y: 275, type: "LEAF", value: 10, parent: "mn" },
  ln2: { x: 215, y: 275, type: "LEAF", value: 3, parent: "mn" },
  le1: { x: 328, y: 275, type: "LEAF", value: 7, parent: "me" },
  le2: { x: 472, y: 275, type: "LEAF", value: 2, parent: "me" },
  ls1: { x: 585, y: 275, type: "LEAF", value: 15, parent: "ms" },
  ls2: { x: 725, y: 275, type: "LEAF", value: 1, parent: "ms" },
};

function buildSVG(svgId) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  svg.innerHTML = `
    <defs>
      <filter id="glow-${svgId}">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
  `;
  // Edges
  const edges = document.createElementNS("http://www.w3.org/2000/svg", "g");
  edges.id = `${svgId}-edges`;
  Object.entries(TREE_NODES).forEach(([id, n]) => {
    if (!n.parent) return;
    const p = TREE_NODES[n.parent];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", p.x);
    line.setAttribute("y1", p.y);
    line.setAttribute("x2", n.x);
    line.setAttribute("y2", n.y);
    line.setAttribute("stroke", "rgba(255,255,255,0.12)");
    line.setAttribute("stroke-width", "2");
    line.id = `${svgId}-edge-${id}`;
    edges.appendChild(line);
    if (n.edge) {
      const tx = (p.x + n.x) / 2,
        ty = (p.y + n.y) / 2 - 6;
      const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("x", tx);
      t.setAttribute("y", ty);
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("fill", "rgba(255,255,255,0.35)");
      t.setAttribute("font-size", "11");
      t.setAttribute("font-weight", "700");
      t.textContent = n.edge;
      edges.appendChild(t);
    }
  });
  svg.appendChild(edges);

  // Nodes
  const nodes = document.createElementNS("http://www.w3.org/2000/svg", "g");
  nodes.id = `${svgId}-nodes`;
  Object.entries(TREE_NODES).forEach(([id, n]) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.id = `${svgId}-node-${id}`;
    const r = n.type === "LEAF" ? 22 : 28;
    const col =
      n.type === "MAX"
        ? { fill: "rgba(96,165,250,0.15)", stroke: "#60a5fa" }
        : n.type === "MIN"
          ? { fill: "rgba(248,113,113,0.15)", stroke: "#f87171" }
          : { fill: "rgba(100,116,139,0.2)", stroke: "#64748b" };
    const circ = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circ.setAttribute("cx", n.x);
    circ.setAttribute("cy", n.y);
    circ.setAttribute("r", r);
    circ.setAttribute("fill", col.fill);
    circ.setAttribute("stroke", col.stroke);
    circ.setAttribute("stroke-width", "2");
    g.appendChild(circ);
    const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    lbl.setAttribute("x", n.x);
    lbl.setAttribute("y", n.y + (n.type === "LEAF" ? 5 : 5));
    lbl.setAttribute("text-anchor", "middle");
    lbl.setAttribute("fill", "#e2e8f0");
    lbl.setAttribute("font-size", n.type === "LEAF" ? "13" : "11");
    lbl.setAttribute("font-weight", "700");
    lbl.setAttribute("font-family", "JetBrains Mono,monospace");
    lbl.textContent =
      n.type === "LEAF" ? (n.value > 0 ? "+" + n.value : n.value) : n.label;
    g.appendChild(lbl);
    if (n.type !== "LEAF") {
      const typ = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      typ.setAttribute("x", n.x);
      typ.setAttribute("y", n.y - r - 5);
      typ.setAttribute("text-anchor", "middle");
      typ.setAttribute("fill", n.type === "MAX" ? "#60a5fa" : "#f87171");
      typ.setAttribute("font-size", "10");
      typ.setAttribute("font-weight", "800");
      typ.textContent = n.type;
      g.appendChild(typ);
    }
    // value badge (hidden initially)
    const badge = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text",
    );
    badge.setAttribute("x", n.x);
    badge.setAttribute("y", n.y + r + 15);
    badge.setAttribute("text-anchor", "middle");
    badge.setAttribute("fill", "#fbbf24");
    badge.setAttribute("font-size", "13");
    badge.setAttribute("font-weight", "900");
    badge.setAttribute("font-family", "JetBrains Mono,monospace");
    badge.id = `${svgId}-val-${id}`;
    badge.style.display = "none";
    g.appendChild(badge);
    nodes.appendChild(g);
  });
  svg.appendChild(nodes);
}

function setNodeHighlight(svgId, nodeId, style) {
  // style: 'active' | 'win' | 'pruned' | 'normal'
  const n = TREE_NODES[nodeId];
  if (!n) return;
  const circ = document.querySelector(`#${svgId}-node-${nodeId} circle`);
  if (!circ) return;
  if (style === "active") {
    circ.setAttribute("filter", `url(#glow-${svgId})`);
    circ.setAttribute("stroke-width", "4");
  } else if (style === "win") {
    circ.setAttribute("stroke", "#fbbf24");
    circ.setAttribute("fill", "rgba(251,191,36,0.18)");
    circ.setAttribute("stroke-width", "3");
  } else if (style === "pruned") {
    circ.setAttribute("stroke", "#f87171");
    circ.setAttribute("opacity", "0.3");
  } else {
    circ.setAttribute("stroke-width", "2");
    circ.setAttribute("filter", "");
  }
}
function setEdgeStyle(svgId, childId, style) {
  const edge = document.getElementById(`${svgId}-edge-${childId}`);
  if (!edge) return;
  if (style === "win") {
    edge.setAttribute("stroke", "#fbbf24");
    edge.setAttribute("stroke-width", "3");
  } else if (style === "pruned") {
    edge.setAttribute("stroke", "#f87171");
    edge.setAttribute("opacity", "0.25");
    edge.setAttribute("stroke-dasharray", "5");
  } else {
    edge.setAttribute("stroke", "rgba(255,255,255,0.12)");
    edge.setAttribute("stroke-width", "2");
    edge.removeAttribute("opacity");
    edge.removeAttribute("stroke-dasharray");
  }
}
function showVal(svgId, nodeId, val) {
  const el = document.getElementById(`${svgId}-val-${nodeId}`);
  if (!el) return;
  el.textContent = val > 0 ? "+" + val : val;
  el.style.display = "";
}
function setMsg(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function appendLog(logId, msg) {
  const log = document.getElementById(logId);
  if (!log) return;
  const item = document.createElement("div");
  item.className = "ab-log-item";
  item.innerHTML = msg;
  log.appendChild(item);
  log.scrollTop = log.scrollHeight;
}

function initMinimaxTree(svgId, isAB) {
  buildSVG(svgId);
  const playId = isAB ? "ab-play" : "mm-play";
  const resetId = isAB ? "ab-reset" : "mm-reset";
  const msgId = isAB ? "ab-log" : "mm-msg";
  const playBtn = document.getElementById(playId);
  const resetBtn = document.getElementById(resetId);
  if (!playBtn || !resetBtn) return;
  let running = false;

  function resetTree() {
    buildSVG(svgId);
    setMsg(msgId, "");
    const logEl = document.getElementById("ab-log");
    if (logEl) logEl.innerHTML = "";
    if (isAB) {
      setAB("-∞", "+∞");
    }
    running = false;
    playBtn.disabled = false;
  }

  function setAB(a, b) {
    const ea = document.getElementById("ab-a"),
      eb = document.getElementById("ab-b");
    if (ea) ea.textContent = a;
    if (eb) eb.textContent = b;
  }

  async function delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  // log helper : for AB, appends to the scrollable log; for Minimax, overwrites text
  function log(msg) {
    setMsg(msgId, msg);
    if (isAB) appendLog("ab-log", msg);
  }

  async function simulateMinimax() {
    if (running) return;
    running = true;
    playBtn.disabled = true;

    /* ── Minimax order ── */
    // NORD branch
    log("📍 Exploration de la branche Nord...");
    setNodeHighlight(svgId, "ln1", "active");
    await delay(600);
    setNodeHighlight(svgId, "ln1", "normal");
    log("🍃 Feuille Nord-1 : valeur = +10");
    await delay(600);

    setNodeHighlight(svgId, "ln2", "active");
    await delay(600);
    setNodeHighlight(svgId, "ln2", "normal");
    log("🍃 Feuille Nord-2 : valeur = +3");
    await delay(600);

    setNodeHighlight(svgId, "mn", "active");
    log(
      "👻 MIN choisit min(10, 3) = 3 ← le fantôme prend le pire pour Pac-Man",
    );
    showVal(svgId, "mn", 3);
    await delay(900);
    setNodeHighlight(svgId, "mn", "normal");

    if (isAB) {
      setAB("3", "+∞");
      log(
        "✅ α mis à jour → α = 3 (Pac-Man peut garantir au moins 3 depuis Nord)",
      );
      await delay(800);
    }

    // EST branch
    log("📍 Exploration de la branche Est...");
    setNodeHighlight(svgId, "le1", "active");
    await delay(600);
    setNodeHighlight(svgId, "le1", "normal");
    log("🍃 Feuille Est-1 : valeur = +7");
    await delay(600);

    setNodeHighlight(svgId, "le2", "active");
    await delay(600);
    setNodeHighlight(svgId, "le2", "normal");
    log("🍃 Feuille Est-2 : valeur = +2");
    await delay(600);

    setNodeHighlight(svgId, "me", "active");
    showVal(svgId, "me", 2);
    if (isAB) {
      log(
        "✂️ MIN(Est) = 2. α=3 ≥ β=2 → COUPURE ! Pac-Man a déjà mieux via Nord, inutile d'explorer la suite !",
      );
      setNodeHighlight(svgId, "me", "pruned");
      setEdgeStyle(svgId, "me", "pruned");
      setEdgeStyle(svgId, "le1", "pruned");
      setEdgeStyle(svgId, "le2", "pruned");
    } else {
      log("👻 MIN choisit min(7, 2) = 2");
    }
    await delay(900);
    if (!isAB) setNodeHighlight(svgId, "me", "normal");

    // SUD branch
    log("📍 Exploration de la branche Sud...");
    setNodeHighlight(svgId, "ls1", "active");
    await delay(600);
    setNodeHighlight(svgId, "ls1", "normal");
    log("🍃 Feuille Sud-1 : valeur = +15");
    await delay(600);

    setNodeHighlight(svgId, "ls2", "active");
    await delay(600);
    setNodeHighlight(svgId, "ls2", "normal");
    log("🍃 Feuille Sud-2 : valeur = +1");
    await delay(600);

    setNodeHighlight(svgId, "ms", "active");
    showVal(svgId, "ms", 1);
    if (isAB) {
      log(
        "✂️ MIN(Sud) = 1. α=3 ≥ β=1 → COUPURE ! Pac-Man a déjà mieux, on coupe encore !",
      );
      setNodeHighlight(svgId, "ms", "pruned");
      setEdgeStyle(svgId, "ms", "pruned");
      setEdgeStyle(svgId, "ls1", "pruned");
      setEdgeStyle(svgId, "ls2", "pruned");
    } else {
      log("👻 MIN choisit min(15, 1) = 1");
    }
    await delay(900);
    if (!isAB) setNodeHighlight(svgId, "ms", "normal");

    // ROOT
    setNodeHighlight(svgId, "root", "active");
    showVal(svgId, "root", 3);
    log(
      isAB
        ? "🏆 MAX choisit NORD (valeur 3) ! Même décision que Minimax, mais avec 4 nœuds épargnés !"
        : "🏆 MAX choisit max(3, 2, 1) = 3 → Pac-Man va au NORD !",
    );
    await delay(500);
    setNodeHighlight(svgId, "root", "win");
    setNodeHighlight(svgId, "mn", "win");
    setEdgeStyle(svgId, "mn", "win");
    setEdgeStyle(svgId, "ln1", "win");
    setEdgeStyle(svgId, "ln2", "win");
    running = false;
    playBtn.disabled = false;
  }

  playBtn.addEventListener("click", simulateMinimax);
  resetBtn.addEventListener("click", resetTree);
}

/* ═══════════════════════════════════════════════════════
   EVALUATION FUNCTION CALCULATOR
═══════════════════════════════════════════════════════ */
function initEvalCalculator() {
  const col = document.getElementById("sliders-col");
  const barsEl = document.getElementById("bars-chart");
  const tsVal = document.getElementById("ts-val");
  const verdict = document.getElementById("score-verdict");
  if (!col || !barsEl || !tsVal) return;

  const features = [
    {
      name: "x₁",
      fn: "nearest_food_bfs",
      w: 1.1176,
      min: 0,
      max: 1,
      step: 0.05,
      def: 0.5,
      desc: "Proximité nourriture (0=loin, 1=ici)",
    },
    {
      name: "x₂",
      fn: "ghosts_within_3",
      w: -2.4793,
      min: 0,
      max: 5,
      step: 1,
      def: 0,
      desc: "Fantômes dangereux à ≤3 cases",
    },
    {
      name: "x₃",
      fn: "scared_ghosts_nearby",
      w: 2.0252,
      min: 0,
      max: 3,
      step: 1,
      def: 0,
      desc: "Fantômes mangeables proches",
    },
    {
      name: "x₄",
      fn: "remaining_food",
      w: -0.5549,
      min: 0,
      max: 0.1,
      step: 0.005,
      def: 0.05,
      desc: "Nourriture restante (normalisé)",
    },
    {
      name: "x₅",
      fn: "nearest_capsule_bfs",
      w: 0.0744,
      min: 0,
      max: 1,
      step: 0.05,
      def: 0.5,
      desc: "Proximité capsule (0=loin, 1=ici)",
    },
    {
      name: "x₆",
      fn: "current_score",
      w: 93.7804,
      min: 0,
      max: 1,
      step: 0.05,
      def: 0.3,
      desc: "Score actuel / 1000",
    },
    {
      name: "x₇",
      fn: "nearest_ghost_bfs",
      w: -2.5966,
      min: 0,
      max: 1,
      step: 0.05,
      def: 0.3,
      desc: "Proximité fantôme le plus proche",
    },
  ];
  const BIAS = -0.644;
  const vals = features.map((f) => f.def);

  // Build sliders
  features.forEach((f, i) => {
    const row = document.createElement("div");
    row.className = "slider-row";
    const wStr = (f.w >= 0 ? "+" : "") + f.w.toFixed(2);
    row.innerHTML = `
      <div class="slider-label">
        <span class="slider-fn">${f.name} · ${f.fn}</span>
        <span class="slider-w">w = ${wStr}</span>
      </div>
      <input type="range" id="sl-${i}" min="${f.min}" max="${f.max}" step="${f.step}" value="${f.def}">
      <span class="slider-val ${f.w >= 0 ? "pos" : "neg"}" id="sv-${i}">${f.def.toFixed(2)}</span>
    `;
    col.appendChild(row);
    row.querySelector(`#sl-${i}`).addEventListener("input", (e) => {
      vals[i] = parseFloat(e.target.value);
      document.getElementById(`sv-${i}`).textContent = vals[i].toFixed(2);
      calcScore();
    });
  });

  // Build bar chart
  barsEl.innerHTML = "";
  features.forEach((f, i) => {
    const div = document.createElement("div");
    div.className = "bar-row";
    div.innerHTML = `
      <span class="bar-name">${f.name}</span>
      <div class="bar-track">
        <div class="bar-fill ${f.w >= 0 ? "bar-pos" : "bar-neg"}" id="bar-${i}" style="width:0%"></div>
      </div>
      <span class="bar-cont" id="bc-${i}">0.00</span>
    `;
    barsEl.appendChild(div);
  });

  function calcScore() {
    let total = BIAS;
    let maxAbs = 0;
    const contribs = features.map((f, i) => {
      const c = f.w * vals[i];
      total += c;
      if (Math.abs(c) > maxAbs) maxAbs = Math.abs(c);
      return c;
    });
    if (maxAbs === 0) maxAbs = 1;
    features.forEach((f, i) => {
      const c = contribs[i];
      const pct = Math.min(100, (Math.abs(c) / maxAbs) * 100);
      const bar = document.getElementById(`bar-${i}`);
      const bc = document.getElementById(`bc-${i}`);
      if (bar) {
        bar.style.width = pct.toFixed(1) + "%";
        bar.className = "bar-fill " + (c >= 0 ? "bar-pos" : "bar-neg");
      }
      if (bc) bc.textContent = (c >= 0 ? "+" : "") + c.toFixed(2);
    });
    tsVal.textContent = total.toFixed(2);
    tsVal.style.color = total >= 0 ? "var(--green)" : "var(--red)";
    if (verdict)
      verdict.textContent =
        total > 20
          ? "😊 Situation très favorable !"
          : total > 0
            ? "🙂 Situation positive"
            : total > -10
              ? "😐 Situation neutre"
              : "😰 Situation dangereuse !";
  }
  calcScore();
}

/* ═══════════════════════════════════════════════════════
   Q-TABLE
═══════════════════════════════════════════════════════ */
function initQTable() {
  const wrap = document.getElementById("qtable-wrap");
  const msg = document.getElementById("qt-msg");
  if (!wrap) return;

  const states = [
    "S₁ (près nourriture)",
    "S₂ (près fantôme)",
    "S₃ (près capsule)",
    "S₄ (état neutre)",
  ];
  const actions = ["Nord", "Sud", "Est", "Ouest"];
  let qvals = Array.from({ length: 4 }, () => Array(4).fill(0));

  function buildTable() {
    wrap.innerHTML = "";
    const tbl = document.createElement("table");
    tbl.className = "qtable";
    const hdr = document.createElement("tr");
    hdr.innerHTML =
      "<th>État \\ Action</th>" + actions.map((a) => `<th>${a}</th>`).join("");
    tbl.appendChild(hdr);
    states.forEach((s, si) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td class="qt-state">${s}</td>`;
      const maxV = Math.max(...qvals[si]);
      actions.forEach((_, ai) => {
        const td = document.createElement("td");
        td.id = `qt-${si}-${ai}`;
        const v = qvals[si][ai];
        td.textContent = v.toFixed(2);
        if (v === maxV && v !== 0) td.classList.add("qt-best");
        const r = Math.max(0, Math.min(255, Math.round(((v + 10) / 20) * 255)));
        if (v > 0.1)
          td.style.background = `rgba(52,211,153,${Math.min(0.4, v / 20)})`;
        else if (v < -0.1)
          td.style.background = `rgba(248,113,113,${Math.min(0.4, -v / 20)})`;
        tr.appendChild(td);
      });
      tbl.appendChild(tr);
    });
    wrap.appendChild(tbl);
  }

  buildTable();

  const alphaSlider = document.getElementById("qt-alpha");
  const epsSlider = document.getElementById("qt-eps");
  const alphaVal = document.getElementById("qt-a-val");
  const epsVal = document.getElementById("qt-e-val");
  if (alphaSlider)
    alphaSlider.addEventListener("input", (e) => {
      if (alphaVal) alphaVal.textContent = (e.target.value / 10).toFixed(1);
    });
  if (epsSlider)
    epsSlider.addEventListener("input", (e) => {
      if (epsVal) epsVal.textContent = (e.target.value / 10).toFixed(1);
    });

  const episodeBtn = document.getElementById("qt-episode");
  const resetBtn = document.getElementById("qt-reset");

  const REWARDS = [
    [
      [+10, -2, +3, -1],
      [-8, -5, -6, -4],
      [+7, +2, -1, +3],
      [-3, -1, +4, -2],
    ],
    [
      [+5, -1, +8, -3],
      [+12, +7, +9, +6],
      [-2, +4, +3, -1],
      [+1, -4, +2, +5],
    ],
    [
      [-3, +6, +2, -1],
      [-10, -8, -9, -6],
      [+15, +5, +8, +3],
      [+3, -1, -2, +4],
    ],
  ];
  let epi = 0;

  async function delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  episodeBtn.addEventListener("click", async () => {
    episodeBtn.disabled = true;
    const alpha = alphaSlider ? parseInt(alphaSlider.value) / 10 : 0.3;
    const eps = epsSlider ? parseInt(epsSlider.value) / 10 : 0.3;
    const gamma = 0.9;
    const rewards = REWARDS[epi % REWARDS.length];
    epi++;
    let totalR = 0;
    for (let si = 0; si < 4; si++) {
      // Choose action
      const explore = Math.random() < eps;
      const ai = explore
        ? Math.floor(Math.random() * 4)
        : qvals[si].indexOf(Math.max(...qvals[si]));
      const r = rewards[si][ai];
      totalR += r;
      // Next state (si+1 or 0)
      const ns = (si + 1) % 4;
      const maxQnext = Math.max(...qvals[ns]);
      const tdErr = r + gamma * maxQnext - qvals[si][ai];
      qvals[si][ai] += alpha * tdErr;
      buildTable();
      const td = document.getElementById(`qt-${si}-${ai}`);
      if (td) {
        td.classList.add("qt-flash");
        setTimeout(() => td.classList.remove("qt-flash"), 800);
      }
      if (msg)
        msg.textContent = `${explore ? "🎲 Exploration" : "🎯 Exploitation"} — État ${si + 1}, Action ${actions[ai]}: r=${r > 0 ? "+" : ""}${r}, ΔQ=${(alpha * tdErr).toFixed(2)}`;
      await delay(450);
    }
    if (msg)
      msg.textContent = `Épisode ${epi} terminé — Récompense totale: ${totalR > 0 ? "+" : ""}${totalR}`;
    episodeBtn.disabled = false;
  });

  resetBtn &&
    resetBtn.addEventListener("click", () => {
      qvals = Array.from({ length: 4 }, () => Array(4).fill(0));
      epi = 0;
      buildTable();
      if (msg) msg.textContent = "";
    });
}

/* ═══════════════════════════════════════════════════════
   EPSILON SLIDER (Exploration vs Exploitation)
═══════════════════════════════════════════════════════ */
function initEpsSlider() {
  const sl = document.getElementById("eps-global");
  const expB = document.getElementById("eps-seg-explore");
  const extB = document.getElementById("eps-seg-exploit");
  const ep = document.getElementById("eps-explore-pct");
  const ex = document.getElementById("eps-exploit-pct");
  const desc = document.getElementById("eps-desc");
  if (!sl) return;
  function update() {
    const e = parseInt(sl.value);
    if (expB) expB.style.width = e + "%";
    if (extB) extB.style.width = 100 - e + "%";
    if (ep) ep.textContent = e + "%";
    if (ex) ex.textContent = 100 - e + "%";
    if (desc) {
      const txt =
        e === 0
          ? "ε = 0.00 · Exploitation pure — toujours la meilleure action connue. Risque : rater de meilleures solutions."
          : e === 100
            ? "ε = 1.00 · Exploration pure — toujours aléatoire ! L'agent n'apprend jamais à exploiter."
            : `ε = ${(e / 100).toFixed(2)} · Avec probabilité ${e}% on explore (action aléatoire), sinon on exploite (meilleure action connue)`;
      desc.textContent = txt;
    }
  }
  sl.addEventListener("input", update);
  update();
}

/* ═══════════════════════════════════════════════════════
   TD-LEARNING STEP-BY-STEP
═══════════════════════════════════════════════════════ */
function initTDSteps() {
  const wrap = document.getElementById("td-steps-wrap");
  const prev = document.getElementById("td-prev");
  const next = document.getElementById("td-next");
  const ctr = document.getElementById("td-counter");
  if (!wrap) return;

  const steps = [
    {
      num: "Étape 1 / 6",
      title: "L'agent observe la situation — état s",
      body: "L'agent prend une 'photo' du jeu en ce moment : où est Pac-Man ? Où sont les fantômes ? Combien de gommes restent ? Quel est le score ? À partir de cette photo, on calcule 7 features (des mesures numériques). Puis on calcule V(s), la valeur estimée de cette situation.",
      formula: "V(s) = w₁·x₁ + w₂·x₂ + ... + w₇·x₇ + C = <strong>50</strong>",
    },
    {
      num: "Étape 2 / 6",
      title: "L'agent choisit une action — Alpha-Beta dit 'aller à l'Est'",
      body: "L'algorithme Alpha-Beta explore l'arbre des coups possibles (profondeur = 2). Pour chaque noeud feuille, il appelle f(s) pour obtenir un score. Il remonâte ensuite les valeurs et choisit l'action menant au meilleur score. Le jeu génère l'état suivant s'.",
      formula: "action = argmaxₐ [α-β exploration] = 'Est' → on arrive dans s'",
    },
    {
      num: "Étape 3 / 6",
      title: "Récompense reçue et nouvel état s' observé",
      body: "Pac-Man mange une gomme en allant à l'Est ! La récompense r = différence de score = score(s') − score(s) = +10. On observe le nouvel état s' (nouvelle photo du jeu) et on calcule sa valeur estimée V(s').",
      formula:
        "r = score(s') − score(s) = +10 &nbsp;·&nbsp; V(s') = <strong>60</strong>",
    },
    {
      num: "Étape 4 / 6",
      title: "Calcul de la cible TD — ce qu'on aurait dû prédire",
      body: "La cible TD, c'est la vraie valeur \"corrigée\" de s maintenant qu'on sait ce qui s'est passé. Elle vaut : la récompense immédiate + la valeur future actualisée. Le facteur γ = 0.9 réduit l'importance du futur (un point demain vaut légèrement moins qu'un point maintenant).",
      formula:
        "cible = r + γ·V(s') = 10 + 0.9×60 = 10 + 54 = <strong>64</strong>",
    },
    {
      num: "Étape 5 / 6",
      title: "Erreur TD (δ) — de combien on s'était trompé",
      body: "On avait prédit V(s) = 50. On aurait dû prédire 64 (la cible). L'erreur δ = 64 − 50 = +14. Positive → on sous-estimait cette situation → les poids doivent monter pour prédire plus haut la prochaine fois.",
      formula:
        "δ = cible − V(s) = 64 − 50 = <strong>+14</strong> &nbsp;← on sous-estimait : on doit corriger à la hausse !",
    },
    {
      num: "Étape 6 / 6",
      title: "Mise à jour des poids wᵢ",
      body: "On ajuste chaque poids proportionnellement à l'erreur δ et à la valeur de la feature xᵢ. Si xᵢ = 0, le poids n'est pas touché. Si xᵢ est grand, on l'ajuste fort. α = 0.01 = taux d'apprentissage : petit → stable. On répète cette opération à chaque déplacement, pour chaque poids, pendant 200 parties.",
      formula:
        "wᵢ ← wᵢ + α·δ·xᵢ(s) &nbsp;→&nbsp; ex: w₁ += 0.01 × 14 × 0.33 = <strong>+0.046</strong>",
    },
  ];

  steps.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "td-step" + (i === 0 ? " active" : "");
    div.innerHTML = `
      <div class="td-step-num">${s.num}</div>
      <div class="td-step-title">${s.title}</div>
      <div class="td-step-body">${s.body}</div>
      <div class="td-formula-hl">${s.formula}</div>
    `;
    wrap.appendChild(div);
  });

  let cur = 0;
  function show(i) {
    cur = i;
    document
      .querySelectorAll(".td-step")
      .forEach((s, si) => s.classList.toggle("active", si === cur));
    if (prev) prev.disabled = cur === 0;
    if (next) next.disabled = cur === steps.length - 1;
    if (ctr) ctr.textContent = `${cur + 1} / ${steps.length}`;
  }
  prev && prev.addEventListener("click", () => show(Math.max(0, cur - 1)));
  next &&
    next.addEventListener("click", () =>
      show(Math.min(steps.length - 1, cur + 1)),
    );
  show(0);
}

/* ═══════════════════════════════════════════════════════
   PIPELINE
═══════════════════════════════════════════════════════ */
function initPipeline() {
  const detail = document.getElementById("pipe-detail");
  const steps = document.querySelectorAll(".pipe-step");
  if (!detail || !steps.length) return;

  const info = {
    1: `<strong>🎯 Étape 1 — features.py : Définir les 7 capteurs du jeu</strong><br><br>
      <strong>C'est quoi ?</strong> Avant de pouvoir \"noter\" une situation, il faut choisir quels aspects du jeu observer. Chaque aspect = une feature = une mesure numérique entre 0 et 1.<br><br>
      <strong>Les 7 features :</strong> proximité nourriture, proximité capsule, nombre de fantômes proches, fantôme effrayé proche, score normalisé, proximité fantôme dangereux, fantôme effrayé très proche.<br><br>
      <strong>Exemple :</strong> <code>[0.33, 1.0, 0, 0.015, 0.17, 0.23, 0.33]</code><br><br>
      <span style="opacity:0.6">Toutes entre 0 et 1 pour être comparables — 📄 <code>features.py</code></span>`,
    2: `<strong>🏋️ Étape 2 — train.py : Apprendre les poids par TD-Learning</strong><br><br>
      <strong>C'est quoi ?</strong> Au départ, les poids sont aléatoires. L'agent joue 200 parties complètes. À chaque action, on compare ce qu'on avait prédit avec ce qui s'est réellement passé. Si on s'est trompé, on ajuste les poids d'un petit pas.<br><br>
      <strong>Après 200 parties :</strong> les poids sont calibrés pour refléter les vraies dynamiques du jeu.<br><br>
      <code>Partie 50/200 | Score: 914.9 | Victoires: 60% | α: 0.00995</code><br><br>
      <span style="opacity:0.6">📄 <code>train.py</code> → résultat dans <code>weights.json</code></span>`,
    3: `<strong>🎮 Étape 3 — rlMinimaxAgents.py : Jouer avec les poids appris</strong><br><br>
      <strong>C'est quoi ?</strong> L'agent charge les poids depuis <code>weights.json</code>. Pour chaque situation, il calcule f(s) = w₁·x₁ + ... + w₇·x₇ + C. Ce score remplace la fonction codée manuellement du Lab 1.<br><br>
      <strong>Différence Lab 1 vs Projet :</strong><br>
      • Lab 1 → poids choisis à la main par le programmeur<br>
      • Projet → poids <em>appris automatiquement</em> par expérience<br><br>
      <span style="opacity:0.6">📄 <code>rlMinimaxAgents.py</code> → <code>rl_evaluation_function()</code></span>`,
    4: `<strong>📊 Étape 4 — compare.py : Mesurer l'amélioration</strong><br><br>
      <strong>C'est quoi ?</strong> On fait jouer les deux agents (RLMinimax et Lab 1) sur le même niveau avec les mêmes conditions, et on compare leurs résultats.<br><br>
      <strong>Résultats réels obtenus :</strong><br>
      • RLMinimax → score moyen <strong>+565 points</strong> de plus que Lab 1<br>
      • Taux de victoire RLMinimax : <strong>30%</strong> vs Lab 1 : <strong>0%</strong><br><br>
      <span style="opacity:0.6">📄 <code>compare.py</code></span>`,
  };

  function showStep(s) {
    steps.forEach((ss) => ss.classList.remove("pipe-active"));
    s.classList.add("pipe-active");
    detail.innerHTML = info[s.dataset.step] || "";
    detail.classList.add("open");
  }

  steps.forEach((s) => {
    s.addEventListener("click", () => {
      if (s.classList.contains("pipe-active")) return;
      showStep(s);
    });
  });
  // Show first step on init
  if (steps[0]) showStep(steps[0]);
}

/* ═══════════════════════════════════════════════════════
   ACCORDION
═══════════════════════════════════════════════════════ */
function initAccordion() {
  document.querySelectorAll(".acc-hdr").forEach((hdr) => {
    hdr.addEventListener("click", () => {
      const bodyId = hdr.dataset.acc;
      const body = document.getElementById(bodyId);
      const isOpen = body && body.classList.contains("open");
      // close all
      document
        .querySelectorAll(".acc-body.open")
        .forEach((b) => b.classList.remove("open"));
      document
        .querySelectorAll(".acc-hdr.open")
        .forEach((h) => h.classList.remove("open"));
      if (!isOpen && body) {
        body.classList.add("open");
        hdr.classList.add("open");
        // init sub-components if needed
        if (bodyId === "acc1") initWeightsChart();
        if (bodyId === "acc3") initThermostat();
        if (bodyId === "acc4") initGammaSlider();
        if (bodyId === "acc7") initBFSDemo();
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════
   WEIGHTS CHART
═══════════════════════════════════════════════════════ */
function initWeightsChart() {
  const container = document.getElementById("weights-chart");
  if (!container || container.children.length > 0) return;
  const wdata = [
    { name: "x₁ nearest_food_bfs", val: 1.1176 },
    { name: "x₂ ghosts_within_3", val: -2.4793 },
    { name: "x₃ scared_ghosts_nearby", val: 2.0252 },
    { name: "x₄ remaining_food", val: -0.5549 },
    { name: "x₅ nearest_capsule_bfs", val: 0.0744 },
    { name: "x₆ current_score", val: 93.7804 },
    { name: "x₇ nearest_ghost_bfs", val: -2.5966 },
  ];
  const maxAbs = Math.max(...wdata.map((d) => Math.abs(d.val)));
  wdata.forEach((d) => {
    const pct = (Math.abs(d.val) / maxAbs) * 48; // max 48% of each side
    const row = document.createElement("div");
    row.className = "wt-row";
    const wStr = (d.val >= 0 ? "+" : "") + d.val.toFixed(2);
    const isPos = d.val >= 0;
    row.innerHTML = `
      <span class="wt-name">${d.name}</span>
      <div class="wt-track">
        <div class="wt-center"></div>
        <div class="wt-bar ${isPos ? "wt-bar-pos" : "wt-bar-neg"}" style="width:${pct.toFixed(1)}%"></div>
      </div>
      <span class="wt-val" style="color:${isPos ? "var(--green)" : "var(--red)"}">${wStr}</span>
    `;
    container.appendChild(row);
  });
}

/* ═══════════════════════════════════════════════════════
   THERMOSTAT DEMO (alpha)
═══════════════════════════════════════════════════════ */
function initThermostat() {
  const canvas = document.getElementById("thermo-canvas");
  const result = document.getElementById("thermo-result");
  const btns = document.querySelectorAll(".thermo-btn");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let currentAlpha = 0.01;

  function drawCurve(alpha) {
    const W = canvas.width,
      H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#161d36";
    ctx.fillRect(0, 0, W, H);
    // target line
    ctx.strokeStyle = "rgba(251,191,36,0.4)";
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, H * 0.15);
    ctx.lineTo(W, H * 0.15);
    ctx.stroke();
    ctx.setLineDash([]);
    // label
    ctx.fillStyle = "rgba(251,191,36,0.5)";
    ctx.font = "10px Inter";
    ctx.fillText("20°C (cible)", 4, H * 0.13);
    // sim
    let val = 30; // start at 30°C
    ctx.strokeStyle =
      alpha >= 0.5 ? "#f87171" : alpha >= 0.05 ? "#34d399" : "#60a5fa";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const y = H - (val / 35) * H * 0.8 - H * 0.05;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      val += alpha * (20 - val) + (Math.random() - 0.5) * (alpha * 4);
    }
    ctx.stroke();
    if (result) {
      if (alpha >= 1.0)
        result.textContent =
          "❌ α=1.0 — Trop rapide ! La courbe oscille, instable.";
      else if (alpha <= 0.001)
        result.textContent =
          "🐌 α=0.0001 — Trop lent ! On n'atteint presque jamais la cible.";
      else
        result.textContent =
          "✅ α=0.01 — Idéal ! Convergence stable et progressive vers la cible.";
    }
  }

  btns.forEach((b) => {
    b.addEventListener("click", () => {
      btns.forEach((bb) => bb.classList.remove("thermo-active"));
      b.classList.add("thermo-active");
      currentAlpha = parseFloat(b.dataset.a);
      drawCurve(currentAlpha);
    });
  });
  drawCurve(currentAlpha);
}

/* ═══════════════════════════════════════════════════════
   GAMMA SLIDER
═══════════════════════════════════════════════════════ */
function initGammaSlider() {
  const sl = document.getElementById("gamma-sl");
  const res = document.getElementById("gamma-result");
  if (!sl || !res) return;
  function update() {
    const g = (parseInt(sl.value) / 100).toFixed(2);
    const gf = parseFloat(g);
    if (gf === 0)
      res.textContent =
        "γ = 0.00 → L'agent ignore complètement le futur. Il ne pense qu'à la récompense immédiate (\"je mange la gomme devant moi\").";
    else if (gf >= 1)
      res.textContent =
        "γ = 1.00 → Futur et présent ont la même importance. L'agent planifie très loin... mais peut ne pas converger.";
    else
      res.innerHTML = `γ = ${g} → 
      Récompense dans 1 tour vaut ${(gf ** 1).toFixed(2)}·R &nbsp;·&nbsp; 
      dans 5 tours : ${(gf ** 5).toFixed(2)}·R &nbsp;·&nbsp; 
      dans 10 tours : ${(gf ** 10).toFixed(2)}·R`;
  }
  sl.addEventListener("input", update);
  update();
}

/* ═══════════════════════════════════════════════════════
   BFS DEMO
═══════════════════════════════════════════════════════ */
function initBFSDemo() {
  const gridEl = document.getElementById("bfs-grid");
  const distEl = document.getElementById("bfs-dist");
  const runBtn = document.getElementById("bfs-run");
  const rstBtn = document.getElementById("bfs-reset");
  if (!gridEl || !runBtn) return;

  // 0=open, 1=wall, 2=pacman, 3=food
  const layout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  const ROWS = layout.length,
    COLS = layout[0].length;
  const DIRS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  gridEl.style.gridTemplateColumns = `repeat(${COLS},1fr)`;
  let cells = [];
  let animRunning = false;

  function buildGrid() {
    gridEl.innerHTML = "";
    cells = [];
    for (let r = 0; r < ROWS; r++) {
      cells[r] = [];
      for (let c = 0; c < COLS; c++) {
        const d = document.createElement("div");
        d.className = "bc ";
        if (layout[r][c] === 1)
          ((d.className += "bc-wall"), (d.textContent = "#"));
        else if (layout[r][c] === 2)
          ((d.className += "bc-pacman"), (d.textContent = "P"));
        else if (layout[r][c] === 3)
          ((d.className += "bc-food"), (d.textContent = "·"));
        else d.className += "bc-open";
        gridEl.appendChild(d);
        cells[r][c] = d;
      }
    }
    if (distEl) distEl.textContent = "?";
  }
  buildGrid();

  async function runBFS() {
    if (animRunning) return;
    animRunning = true;
    runBtn.disabled = true;
    buildGrid();
    await new Promise((r) => setTimeout(r, 200));
    let sr = -1,
      sc = -1,
      er = -1,
      ec = -1;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        if (layout[r][c] === 2) {
          sr = r;
          sc = c;
        }
        if (layout[r][c] === 3) {
          er = r;
          ec = c;
        }
      }
    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    const prev = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    const queue = [[sr, sc, 0]];
    visited[sr][sc] = true;
    let found = false,
      foundDist = 0;
    while (queue.length) {
      const [r, c, d] = queue.shift();
      if (r === er && c === ec) {
        found = true;
        foundDist = d;
        break;
      }
      for (const [dr, dc] of DIRS) {
        const nr = r + dr,
          nc = c + dc;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
        if (visited[nr][nc] || layout[nr][nc] === 1) continue;
        visited[nr][nc] = true;
        prev[nr][nc] = [r, c];
        queue.push([nr, nc, d + 1]);
        if (!(nr === er && nc === ec) && layout[nr][nc] !== 2) {
          cells[nr][nc].classList.remove("bc-open");
          cells[nr][nc].classList.add("bc-visited");
        }
        await new Promise((r2) => setTimeout(r2, 60));
      }
    }
    if (found) {
      if (distEl) distEl.textContent = foundDist;
      // trace path
      let cur = [er, ec];
      while (cur && !(cur[0] === sr && cur[1] === sc)) {
        const [r, c] = cur;
        if (layout[r][c] !== 3 && layout[r][c] !== 2) {
          cells[r][c].classList.remove("bc-visited");
          cells[r][c].classList.add("bc-path");
        }
        cur = prev[r][c];
        await new Promise((r2) => setTimeout(r2, 80));
      }
    } else {
      if (distEl) distEl.textContent = "∞";
    }
    animRunning = false;
    runBtn.disabled = false;
  }

  runBtn.addEventListener("click", runBFS);
  rstBtn &&
    rstBtn.addEventListener("click", () => {
      if (!animRunning) {
        buildGrid();
      }
    });
}

/* ═══════════════════════════════════════════════════════
   FLASHCARDS
═══════════════════════════════════════════════════════ */
function initFlashcards() {
  const wrap = document.getElementById("fc-wrap");
  const prev = document.getElementById("fc-prev");
  const next = document.getElementById("fc-next");
  const ctr = document.getElementById("fc-count");
  if (!wrap) return;

  const cards = [
    {
      q: "Algorithme",
      a: "Une liste d'étapes précises et ordonnées pour résoudre un problème — comme une recette de cuisine pour l'ordinateur.",
      file: "multiAgents.py, qlearningAgents.py",
    },
    {
      q: "Agent",
      a: "L'entité qui agit dans le jeu : observe l'état → réfléchit → choisit une action. Pac-Man est un agent, les fantômes aussi.",
      file: "rlMinimaxAgents.py → class RLMinimaxAgent",
    },
    {
      q: "Minimax",
      a: "Algorithme qui maximise le score de Pac-Man en supposant que les fantômes (MIN) vont toujours choisir le pire coup pour lui.",
      file: "rlMinimaxAgents.py → alpha_beta()",
    },
    {
      q: "Élagage Alpha-Beta",
      a: "Optimisation de Minimax qui coupe les branches inutiles (si α≥β). Même résultat, beaucoup moins de calculs.",
      file: "rlMinimaxAgents.py → if alpha >= beta: break",
    },
    {
      q: "Fonction d'évaluation",
      a: "Donne un score à un état intermédiaire : f(s) = Σ(aᵢ·xᵢ) + C. Score élevé = bonne situation, score bas = danger.",
      file: "rlMinimaxAgents.py → rl_evaluation_function()",
    },
    {
      q: "Feature (facteur)",
      a: "Un aspect mesurable de l'état du jeu, ex: proximité de la nourriture, nombre de fantômes dangereux proches...",
      file: "features.py → 7 fonctions x₁ à x₇",
    },
    {
      q: "Poids (weights)",
      a: "Nombres qui mesurent l'importance de chaque feature. Positif → feature bonne. Négatif → feature mauvaise. Appris par RL.",
      file: "weights.json + train.py",
    },
    {
      q: "Biais (bias)",
      a: "Constante C ajoutée au score final. Décale toute l'échelle d'évaluation vers le haut ou le bas.",
      file: 'weights.json → "bias"',
    },
    {
      q: "Q-Learning",
      a: "Apprentissage par essai-erreur : l'agent mémorise Q(s,a) = qualité d'une action dans un état. La Q-table se remplit au fil des parties.",
      file: "qlearningAgents.py",
    },
    {
      q: "TD-Learning",
      a: "Apprendre pendant le jeu (pas seulement à la fin). On calcule δ = cible − prédiction et on ajuste les poids immédiatement.",
      file: "train.py → boucle d'entraînement",
    },
    {
      q: "Taux d'apprentissage α",
      a: "Vitesse des ajustements. Trop grand → instable. Trop petit → lent. Idéal : 0.01. Diminue progressivement (alpha decay).",
      file: "train.py → alpha=0.01, alpha_decay=0.9999",
    },
    {
      q: "Facteur d'actualisation γ",
      a: "Importance accordée au futur. γ=0 → présent seulement. γ=1 → futur = présent. Typiquement 0.9 dans le projet.",
      file: "train.py → gamma=0.9",
    },
    {
      q: "Exploration vs Exploitation",
      a: "Dilemme du Q-Learning : explorer (action aléatoire) pour découvrir ou exploiter (meilleure action connue). Géré par ε-greedy.",
      file: "qlearningAgents.py → getAction() + flipCoin(epsilon)",
    },
    {
      q: "BFS (Breadth-First Search)",
      a: "Parcours en largeur du labyrinthe pour calculer la vraie distance (pas Manhattan). Explore case par case jusqu'à trouver la cible.",
      file: "features.py → _bfs_distance()",
    },
    {
      q: "Gradient Clipping",
      a: 'Limite la taille des ajustements de poids à ±5.0 pour éviter que les gradients "explosent" et déstabilisent l\'apprentissage.',
      file: "train.py → grad_clip = 5.0",
    },
  ];

  cards.forEach((c, i) => {
    const div = document.createElement("div");
    div.className = "fc-card" + (i === 0 ? " fc-active" : "");
    div.innerHTML = `
      <div class="fc-front">
        <div class="fc-q">${c.q}</div>
        <div class="fc-hint">👆 Cliquer pour voir la réponse</div>
      </div>
      <div class="fc-back">
        <div class="fc-a">${c.a}</div>
        <div class="fc-file">${c.file}</div>
      </div>
    `;
    div.addEventListener("click", () => div.classList.toggle("fc-flipped"));
    wrap.appendChild(div);
  });

  let cur = 0;
  function show(i) {
    document.querySelectorAll(".fc-card").forEach((c, ci) => {
      c.classList.toggle("fc-active", ci === i);
      c.classList.remove("fc-flipped");
    });
    cur = i;
    if (prev) prev.disabled = cur === 0;
    if (next) next.disabled = cur === cards.length - 1;
    if (ctr) ctr.textContent = `${cur + 1} / ${cards.length}`;
  }
  prev && prev.addEventListener("click", () => show(Math.max(0, cur - 1)));
  next &&
    next.addEventListener("click", () =>
      show(Math.min(cards.length - 1, cur + 1)),
    );
  show(0);
}

/* ═══════════════════════════════════════════════════════
   RECAP TABLE
═══════════════════════════════════════════════════════ */
function initRecapTable() {
  const tbody = document.getElementById("recap-tbody");
  if (!tbody) return;
  const rows = [
    ["Agent", "Le programme qui prend des décisions", "rlMinimaxAgents.py"],
    [
      "Minimax",
      "Maximiser mon score en supposant que l'ennemi minimise",
      "rlMinimaxAgents.py",
    ],
    [
      "Alpha-Beta",
      "Minimax + couper les branches inutiles (si α≥β)",
      "rlMinimaxAgents.py",
    ],
    [
      "Feature",
      "Un aspect mesurable de l'état du jeu (x₁ à x₇)",
      "features.py",
    ],
    [
      "Fonction d'évaluation",
      "Score = Σ(poids × features) + biais",
      "rlMinimaxAgents.py",
    ],
    [
      "Poids",
      "Importance de chaque feature — appris par renforcement",
      "weights.json",
    ],
    ["Biais", "Constante C décalant l'échelle d'évaluation", "weights.json"],
    [
      "Q-Learning",
      "Apprendre Q(état, action) par essai-erreur",
      "qlearningAgents.py",
    ],
    [
      "TD-Learning",
      "Apprendre les poids en comparant prédictions et réalité",
      "train.py",
    ],
    [
      "Taux d'apprentissage",
      "Vitesse des ajustements (α = 0.01 dans le projet)",
      "train.py",
    ],
    [
      "Facteur d'actualisation",
      "Importance du futur (γ = 0.9 dans le projet)",
      "train.py",
    ],
    [
      "Exploration",
      "Essayer des actions inconnues avec probabilité ε",
      "qlearningAgents.py",
    ],
    [
      "Exploitation",
      "Choisir la meilleure action connue (1−ε du temps)",
      "qlearningAgents.py",
    ],
    ["BFS", "Calculer la vraie distance dans le labyrinthe", "features.py"],
    [
      "Gradient Clipping",
      "Limiter la taille des ajustements pour stabiliser l'entraîn.",
      "train.py",
    ],
  ];
  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="td-concept">${r[0]}</td><td>${r[1]}</td><td class="td-file">${r[2]}</td>`;
    tbody.appendChild(tr);
  });
}
