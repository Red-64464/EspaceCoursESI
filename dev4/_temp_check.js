
  var pStep = 0;
  function show(id) {
    document
      .querySelectorAll(".section")
      .forEach((s) => s.classList.remove("active"));
    document
      .querySelectorAll(".nav-btn")
      .forEach((b) => b.classList.remove("active"));
    document.getElementById("s-" + id).classList.add("active");
    event.target.classList.add("active");
  }

  // POINTEURS
  function stepPointer() {
    pStep++;
    var a = document.getElementById("box-a");
    var p = document.getElementById("box-p");
    var vp = document.getElementById("val-p");
    var va = document.getElementById("val-a");
    var arr = document.getElementById("pointer-arrow");
    var expl = document.getElementById("pointer-expl");
    if (pStep === 1) {
      p.style.background = "#0C447C";
      p.style.borderColor = "#378ADD";
      p.style.borderStyle = "solid";
      vp.textContent = "0x01";
      vp.style.color = "";
      arr.textContent = "p â†’ adresse de a â†’";
      arr.style.color = "#85B7EB";
      expl.textContent =
        "int* p = &a; â€” p contient maintenant l'adresse de a (0x01)";
    } else if (pStep === 2) {
      va.textContent = "10";
      a.style.background = "#633806";
      a.style.borderColor = "#BA7517";
      expl.textContent =
        "*p = 10; â€” on dÃ©rÃ©fÃ©rence p, on va Ã  l'adresse 0x01 et on modifie a â†’ a vaut maintenant 10 !";
    } else {
      pStep = 0;
      va.textContent = "5";
      a.style.background = "";
      a.style.borderColor = "#378ADD";
      p.style.background = "var(--color-background-secondary)";
      p.style.borderStyle = "dashed";
      vp.textContent = "???";
      vp.style.color = "var(--color-text-tertiary)";
      arr.textContent = "â €";
      expl.textContent = "Recommencer...";
    }
  }

  // RÃ‰FÃ‰RENCES
  var refChanged = false;
  function changeRef() {
    refChanged = !refChanged;
    var rv = refChanged ? 99 : 5;
    document.getElementById("rv-a").textContent = rv;
    document.getElementById("rv-ref").textContent = rv;
    document
      .getElementById("ref-val-a")
      .classList.toggle("highlight", refChanged);
    document
      .getElementById("ref-val-ref")
      .classList.toggle("highlight", refChanged);
    document.getElementById("ref-expl").textContent = refChanged
      ? "ref = 99 â†’ a vaut aussi 99 ! Ce sont la mÃªme variable. La rÃ©fÃ©rence modifie l'original."
      : "Retour Ã  5. La rÃ©fÃ©rence est juste un surnom â€” jamais une copie.";
  }

  // STACK & HEAP
  var stackItems = [],
    heapItems = [],
    heapCount = 0;
  function pushStack() {
    var vars = ["mySong", "x = 5", "result", "i = 0", "player"];
    var nm = vars[stackItems.length % vars.length];
    stackItems.push(nm);
    renderSH();
    document.getElementById("sh-expl").textContent =
      '"' +
      nm +
      '" ajoutÃ© Ã  la Stack. Automatique, rapide â€” disparaÃ®t Ã  la fin du bloc.';
  }
  function popStack() {
    if (!stackItems.length) {
      document.getElementById("sh-expl").textContent = "La Stack est vide !";
      return;
    }
    var rm = stackItems.pop();
    renderSH();
    document.getElementById("sh-expl").textContent =
      '"' +
      rm +
      '" supprimÃ© automatiquement (fin du bloc). Aucun delete nÃ©cessaire !';
  }
  function pushHeap() {
    heapCount++;
    heapItems.push({ id: heapCount, deleted: false });
    renderSH();
    document.getElementById("sh-expl").textContent =
      "new Song() crÃ©e Song #" +
      heapCount +
      " dans le Heap. Tu dois faire delete manuellement !";
  }
  function deleteHeap() {
    var alive = heapItems.filter((x) => !x.deleted);
    if (!alive.length) {
      document.getElementById("sh-expl").textContent =
        "Heap vide â€” rien Ã  supprimer.";
      return;
    }
    alive[alive.length - 1].deleted = true;
    renderSH();
    document.getElementById("sh-expl").textContent =
      "delete libÃ¨re la mÃ©moire. Si tu oublies â†’ memory leak !";
  }
  function renderSH() {
    var si = document.getElementById("stack-items");
    si.innerHTML = stackItems
      .slice()
      .reverse()
      .map(
        (n) =>
          '<div class="anim-box" style="background:#0C447C;border-color:#378ADD;color:#B5D4F4;margin-bottom:3px">' +
          n +
          "</div>",
      )
      .join("");
    if (!stackItems.length)
      si.innerHTML =
        '<div style="font-size:12px;color:var(--color-text-tertiary);text-align:center;padding:12px">vide</div>';
    var hi = document.getElementById("heap-items");
    hi.innerHTML = heapItems
      .map(
        (x) =>
          '<div class="anim-box ' +
          (x.deleted ? "deleted" : "") +
          (x.deleted ? "" : " highlight") +
          '" style="margin-bottom:3px">' +
          (x.deleted ? "[libÃ©rÃ©]" : "Song #" + x.id) +
          " </div>",
      )
      .join("");
    if (!heapItems.length)
      hi.innerHTML =
        '<div style="font-size:12px;color:var(--color-text-tertiary);text-align:center;padding:12px">vide</div>';
  }
  renderSH();

  // COPIE VS REF
  var titleChanged = false;
  function changeTitle() {
    titleChanged = !titleChanged;
    var t = titleChanged ? "nouveau titre" : "mon sinus";
    document.getElementById("song-original").textContent = titleChanged
      ? "nouveau titre"
      : "mon sinus";
    document.getElementById("song-ref").textContent = titleChanged
      ? "nouveau titre"
      : "mon sinus";
    document.getElementById("song-copy").textContent = "mon sinus";
    document.getElementById("copy-expl").textContent = titleChanged
      ? 'mySong â†’ "nouveau titre" | mySongCopy â†’ "mon sinus" (copie indÃ©pendante !) | mySongRef â†’ "nouveau titre" (alias = mÃªme objet)'
      : "Retour Ã  l'Ã©tat initial.";
  }

  // MEMORY LEAK
  var leakInterval = null,
    leakCount = 0;
  function startLeak() {
    if (leakInterval) return;
    leakInterval = setInterval(function () {
      leakCount++;
      var pct = Math.min(99, 5 + leakCount * 3);
      document.getElementById("ram-bar").style.width = pct + "%";
      document.getElementById("ram-label").textContent = pct + "%";
      var box = document.createElement("div");
      box.className = "anim-box highlight";
      box.style.marginBottom = "3px";
      box.style.fontSize = "12px";
      box.textContent =
        "Song #" + leakCount + " â€” adresse perdue, jamais libÃ©rÃ©e";
      var c = document.getElementById("leak-items");
      c.appendChild(box);
      c.scrollTop = c.scrollHeight;
      document.getElementById("leak-expl").textContent =
        "ðŸš¨ " +
        leakCount +
        " objet(s) en mÃ©moire, jamais supprimÃ©(s). RAM: " +
        pct +
        "%";
      if (leakCount >= 20) stopLeak();
    }, 400);
  }
  function stopLeak() {
    clearInterval(leakInterval);
    leakInterval = null;
    if (leakCount > 0)
      document.getElementById("leak-expl").textContent =
        "Boucle stoppÃ©e. " +
        leakCount +
        " Song en mÃ©moire et aucun delete â†’ fuite totale !";
  }
  function resetLeak() {
    stopLeak();
    leakCount = 0;
    document.getElementById("ram-bar").style.width = "5%";
    document.getElementById("ram-label").textContent = "5%";
    document.getElementById("leak-items").innerHTML = "";
    document.getElementById("leak-expl").textContent =
      "Reset. PrÃªt pour une nouvelle simulation.";
  }

  // AUDIO
  function updateAudio() {
    var vol = parseFloat(document.getElementById("vol-slider").value) / 100;
    document.getElementById("vol-label").textContent = vol.toFixed(1);
    var pts = [];
    var samples = [];
    var n = 50;
    for (var i = 0; i < n; i++) {
      var raw = Math.sin(((2 * Math.PI * 440 * i) / 44100) * 80);
      var v = raw * vol;
      if (v > 1) v = 1;
      if (v < -1) v = -1;
      samples.push(v);
      var x = 20 + (600 / n) * i;
      var y = 60 - v * 40;
      pts.push(x + "," + y);
    }
    document.getElementById("wave-line").setAttribute("points", pts.join(" "));
    var color = vol > 1.5 ? "#E24B4A" : vol < 0.3 ? "#9c9a92" : "#85B7EB";
    document.getElementById("wave-line").setAttribute("stroke", color);

    var boxes = document.getElementById("sample-boxes");
    boxes.innerHTML = "";
    for (var j = 0; j < 5; j++) {
      var sv = samples[j * 4];
      var b = document.createElement("div");
      b.className = "anim-box";
      b.style.fontSize = "11px";
      b.style.padding = "6px 4px";
      b.textContent = sv.toFixed(3);
      var intensity = Math.abs(sv);
      b.style.background = "rgba(24,95,165," + (0.1 + intensity * 0.4) + ")";
      b.style.borderColor = "rgba(24,95,165," + (0.3 + intensity * 0.5) + ")";
      b.style.color = "var(--color-text-primary)";
      boxes.appendChild(b);
    }

    var msg =
      vol === 0
        ? "Volume 0 â€” silence total."
        : vol < 0.5
          ? "Volume faible â€” signal rÃ©duit."
          : vol === 1.0
            ? "Volume 1.0 â€” signal original."
            : vol > 1.5
              ? "ðŸš¨ Volume > 1 â€” valeurs limitÃ©es entre -1 et +1 (clipping) !"
              : "Volume modifiÃ© â€” toutes les valeurs multipliÃ©es par " +
                vol.toFixed(1);
    document.getElementById("audio-expl").textContent = msg;
  }
  updateAudio();

  // BUFFER
  var bufSamples = [0.0, 0.5, 0.9, 0.5, 0.0, -0.5, -0.9, -0.5];
  function bufExpl(what) {
    var msgs = {
      queue:
        "ðŸš¶ File d'attente â€” Imagine des gens qui arrivent au guichet. Le buffer, c'est la file : les donnÃ©es arrivent, attendent, puis sont traitÃ©es dans l'ordre. Sans buffer, tout arriverait en mÃªme temps = chaos !",
      array:
        "ðŸ“¦ En C++, un buffer c'est un tableau : float buffer[1024]. Chaque case contient une donnÃ©e. On remplit le tableau, puis on le lit case par case.",
      why: "â“ Pourquoi un buffer ? Parce que le processeur et la carte son ne travaillent pas Ã  la mÃªme vitesse. Le buffer fait tampon â€” il accumule des donnÃ©es pour les envoyer d'un coup, ce qui est beaucoup plus rapide.",
    };
    document.getElementById("buf-expl").textContent = msgs[what] || "";
  }

  // AudioBuffer cells
  (function initBufCells() {
    var cells = document.getElementById("buf-cells");
    var pts = [];
    var dots = "";
    for (var i = 0; i < bufSamples.length; i++) {
      var v = bufSamples[i];
      var cell = document.createElement("div");
      cell.className = "anim-box";
      cell.style.fontSize = "11px";
      cell.style.padding = "8px 2px";
      cell.style.cursor = "pointer";
      cell.textContent = "[" + i + "]";
      cell.setAttribute("data-idx", i);
      cell.onclick = function () {
        var idx = parseInt(this.getAttribute("data-idx"));
        var val = bufSamples[idx];
        document.getElementById("buf-cell-expl").textContent =
          "buffer[" +
          idx +
          "] = " +
          val.toFixed(1) +
          (val > 0
            ? " â†’ haut-parleur poussÃ© vers l'avant"
            : val < 0
              ? " â†’ haut-parleur tirÃ© vers l'arriÃ¨re"
              : " â†’ haut-parleur au repos (silence)");
        document.querySelectorAll("#buf-cells .anim-box").forEach(function (c) {
          c.style.background = "";
          c.style.borderColor = "";
        });
        this.style.background = "#0C447C";
        this.style.borderColor = "#378ADD";
        // highlight dot
        document
          .querySelectorAll("#buf-wave-dots circle")
          .forEach(function (c, ci) {
            c.setAttribute("r", ci === idx ? "6" : "3");
            c.setAttribute("fill", ci === idx ? "#85B7EB" : "#0C447C");
          });
      };
      cells.appendChild(cell);
      var x = 20 + (600 / (bufSamples.length - 1)) * i;
      var y = 50 - v * 40;
      pts.push(x + "," + y);
      dots +=
        '<circle cx="' +
        x +
        '" cy="' +
        y +
        '" r="3" fill="#0C447C" stroke="#85B7EB" stroke-width="1" style="cursor:pointer"/>';
    }
    document
      .getElementById("buf-wave-line")
      .setAttribute("points", pts.join(" "));
    document.getElementById("buf-wave-dots").innerHTML = dots;
  })();

  // Sine buffer
  function updateBufSine() {
    var n = parseInt(document.getElementById("buf-size-slider").value);
    document.getElementById("buf-size-label").textContent = n;
    var pts = [];
    var dots = "";
    for (var i = 0; i < n; i++) {
      var v = Math.sin((2 * Math.PI * i) / n);
      var x = 20 + (600 / (n - 1)) * i;
      var y = 60 - v * 45;
      pts.push(x + "," + y);
      dots +=
        '<circle cx="' +
        x +
        '" cy="' +
        y +
        '" r="3" fill="#085041" stroke="#5DCAA5" stroke-width="1"/>';
    }
    document
      .getElementById("buf-sine-line")
      .setAttribute("points", pts.join(" "));
    document.getElementById("buf-sine-dots").innerHTML = dots;
    var msg =
      n <= 8
        ? 'Peu d\'Ã©chantillons â†’ la courbe est trÃ¨s approximative, le son serait "pixelisÃ©".'
        : n <= 20
          ? "On commence Ã  voir la forme sinusoÃ¯dale. Plus il y a de points, plus le son est fidÃ¨le."
          : n <= 40
            ? "La courbe est bien dÃ©finie â€” un son propre et clair."
            : "Beaucoup d'Ã©chantillons â†’ courbe trÃ¨s lisse. En vrai, on utilise 44100 Ã©chantillons par seconde !";
    document.getElementById("buf-sine-expl").textContent = msg;
  }
  updateBufSine();

