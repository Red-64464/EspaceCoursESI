
/* ═══════════════════════════ TABS ═══════════════════════════ */
const TABS={

intro:`<div class="fade">
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 10px;line-height:1.7">
Docker c'est comme une <strong>boîte magique</strong> 📦 : tu mets ton application dedans avec tout ce qu'il lui faut pour tourner. Elle marchera partout, peu importe l'ordinateur. Clique sur chaque élément pour comprendre.
</p>
<svg width="100%" viewBox="0 0 680 290">
<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>

<!-- Docker Hub -->
<g onclick="xi('hub')" style="cursor:pointer">
  <rect x="240" y="10" width="200" height="50" rx="10" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
  <text font-size="13" font-weight="500" x="340" y="34" text-anchor="middle" fill="#633806">🌐 Docker Hub</text>
  <text font-size="10" x="340" y="50" text-anchor="middle" fill="#854F0B">registre d'images en ligne</text>
</g>

<!-- arrow hub -> image -->
<line class="fan" x1="340" y1="62" x2="340" y2="98" stroke="#BA7517" stroke-width="1.8" marker-end="url(#ar)"/>
<text font-size="10" x="360" y="84" fill="#888780">pull</text>

<!-- Image -->
<g onclick="xi('image')" style="cursor:pointer">
  <rect x="200" y="100" width="280" height="60" rx="10" fill="#EEEDFE" stroke="#534AB7" stroke-width="1"/>
  <text font-size="13" font-weight="500" x="340" y="126" text-anchor="middle" fill="#3C3489">🖼 Image Docker</text>
  <text font-size="10" x="340" y="146" text-anchor="middle" fill="#534AB7">le "plan de construction" (lecture seule)</text>
</g>

<!-- arrow image -> conteneur -->
<line class="fan" x1="290" y1="162" x2="230" y2="208" stroke="#534AB7" stroke-width="1.8" marker-end="url(#ar)"/>
<line class="fan" x1="340" y1="162" x2="340" y2="208" stroke="#534AB7" stroke-width="1.8" marker-end="url(#ar)"/>
<line class="fan" x1="390" y1="162" x2="450" y2="208" stroke="#534AB7" stroke-width="1.8" marker-end="url(#ar)"/>
<text font-size="10" x="340" y="192" text-anchor="middle" fill="#888780">docker run (instancie)</text>

<!-- Conteneurs -->
<g onclick="xi('c1')" style="cursor:pointer">
  <rect x="100" y="210" width="120" height="60" rx="8" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
  <text font-size="12" font-weight="500" x="160" y="234" text-anchor="middle" fill="#085041">Conteneur 1</text>
  <text font-size="10" x="160" y="252" text-anchor="middle" fill="#0F6E56">en cours / arrêté</text>
  <text font-size="10" x="160" y="264" text-anchor="middle" fill="#888780">port 8080:8080</text>
</g>
<g onclick="xi('c1')" style="cursor:pointer">
  <rect x="280" y="210" width="120" height="60" rx="8" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
  <text font-size="12" font-weight="500" x="340" y="234" text-anchor="middle" fill="#085041">Conteneur 2</text>
  <text font-size="10" x="340" y="252" text-anchor="middle" fill="#0F6E56">autre instance</text>
  <text font-size="10" x="340" y="264" text-anchor="middle" fill="#888780">port 9000:8080</text>
</g>
<g onclick="xi('c1')" style="cursor:pointer">
  <rect x="460" y="210" width="120" height="60" rx="8" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
  <text font-size="12" font-weight="500" x="520" y="234" text-anchor="middle" fill="#085041">Conteneur 3</text>
  <text font-size="10" x="520" y="252" text-anchor="middle" fill="#0F6E56">même image</text>
  <text font-size="10" x="520" y="264" text-anchor="middle" fill="#888780">port 8081:8080</text>
</g>

<!-- Dockerfile -->
<g onclick="xi('dockerfile')" style="cursor:pointer">
  <rect x="10" y="100" width="140" height="60" rx="8" fill="#FAECE7" stroke="#D85A30" stroke-width="0.5"/>
  <text font-size="12" font-weight="500" x="80" y="124" text-anchor="middle" fill="#712B13">📄 Dockerfile</text>
  <text font-size="10" x="80" y="142" text-anchor="middle" fill="#993C1D">recette pour créer</text>
  <text font-size="10" x="80" y="154" text-anchor="middle" fill="#993C1D">une image</text>
</g>
<line x1="152" y1="130" x2="198" y2="130" stroke="#D85A30" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#ar)"/>
<text font-size="10" x="175" y="124" text-anchor="middle" fill="#D85A30">build</text>
</svg>
<div id="xi-box" class="card" style="min-height:68px">
  <p style="font-size:13px;color:var(--color-text-secondary);margin:0">👆 Clique sur une brique pour voir l'explication.</p>
</div>
</div>`,

images:`<div class="fade">
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 10px;line-height:1.7">
Une image Docker c'est comme un <strong>moule à gaufres</strong> 🧇 : tu peux faire autant de gaufres (conteneurs) que tu veux à partir du même moule. L'image elle-même ne change jamais.
</p>
<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap">
  <button class="nb on" id="im0" onclick="showImg(0,this)">Couches d'une image</button>
  <button class="nb" id="im1" onclick="showImg(1,this)">Image vs Conteneur</button>
  <button class="nb" id="im2" onclick="showImg(2,this)">Alpine vs Ubuntu</button>
</div>
<div id="img-box"></div>
</div>`,

conteneurs:`<div class="fade">
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 10px;line-height:1.7">
Un conteneur c'est une image qui tourne. Clique sur les étapes du cycle de vie pour voir ce qui se passe.
</p>
<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
  <button class="nb on" id="cv0" onclick="showCv(0,this)">Créer</button>
  <button class="nb" id="cv1" onclick="showCv(1,this)">Entrer dedans</button>
  <button class="nb" id="cv2" onclick="showCv(2,this)">Voir les logs</button>
  <button class="nb" id="cv3" onclick="showCv(3,this)">Arrêter / Supprimer</button>
  <button class="nb" id="cv4" onclick="showCv(4,this)">docker commit</button>
</div>
<div id="cv-box"></div>
</div>`,

dockerfile:`<div class="fade">
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 10px;line-height:1.7">
Un Dockerfile c'est une <strong>recette de cuisine</strong> 🍳 : tu listes les étapes pour construire ton image. Docker les exécute dans l'ordre. Clique sur chaque instruction pour l'apprendre.
</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
<div>
<pre class="code" style="font-size:11px"><span class="kw" style="cursor:pointer" onclick="showDF('FROM')">FROM</span> ubuntu:24.04
<span class="kw" style="cursor:pointer" onclick="showDF('LABEL')">LABEL</span> author="g12345"
<span class="kw" style="cursor:pointer" onclick="showDF('RUN')">RUN</span> apt-get update && \\
    apt-get install -y openjdk-21-jre && \\
    apt-get clean
<span class="kw" style="cursor:pointer" onclick="showDF('ENV')">ENV</span> JAVA_HOME=/usr/lib/jvm/java-17-openjdk
<span class="kw" style="cursor:pointer" onclick="showDF('WORKDIR')">WORKDIR</span> /app
<span class="kw" style="cursor:pointer" onclick="showDF('COPY')">COPY</span> demo-1.0.0.jar /app/app.jar
<span class="kw" style="cursor:pointer" onclick="showDF('EXPOSE')">EXPOSE</span> 8080
<span class="kw" style="cursor:pointer" onclick="showDF('CMD')">CMD</span> ["java","-jar","/app/app.jar"]</pre>
<p style="font-size:11px;color:var(--color-text-secondary);margin:4px 0 0">👆 Clique sur un mot-clé pour l'expliquer →</p>
</div>
<div id="df-box" class="card" style="min-height:200px">
  <p style="font-size:13px;color:var(--color-text-secondary);margin:0">Clique sur une instruction à gauche.</p>
</div>
</div>
</div>`,

ports:`<div class="fade">
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 10px;line-height:1.7">
Le conteneur est <strong>isolé</strong> — son port 8080 n'est pas le tien. Il faut créer un tunnel entre ton PC et le conteneur. C'est la <strong>redirection de port</strong>.
</p>
<canvas id="port-canvas" width="660" height="240" style="width:100%;border-radius:10px;border:0.5px solid var(--color-border-tertiary);background:var(--color-background-secondary)"></canvas>
<div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;align-items:center">
  <label style="font-size:13px;color:var(--color-text-secondary)">Port machine hôte :</label>
  <input type="range" id="host-port" min="1000" max="9999" step="1" value="9000" style="width:140px" oninput="drawPort(this.value)">
  <span id="hp-label" style="font-size:13px;font-weight:500;color:var(--color-text-primary)">9000</span>
  <span style="font-size:12px;color:var(--color-text-secondary)">→ port conteneur toujours 8080</span>
</div>
<div class="card" style="margin-top:10px">
  <p style="font-size:13px;margin:0;line-height:1.8;color:var(--color-text-primary)">
  Format : <code style="font-family:var(--font-mono);font-size:12px;color:#534AB7">-p PORT_MACHINE:PORT_CONTENEUR</code><br>
  Exemple : <code style="font-family:var(--font-mono);font-size:12px">docker run -p 9000:8080 mon-image</code><br>
  → Tu accèdes via <code style="font-family:var(--font-mono);font-size:12px">localhost:9000</code> mais l'appli écoute sur le port <code style="font-family:var(--font-mono);font-size:12px">8080</code> dans le conteneur.
  </p>
</div>
</div>`,

volumes:`<div class="fade">
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 10px;line-height:1.7">
Sans volume, quand tu supprimes un conteneur MySQL, <strong>toutes tes données disparaissent</strong> 💀. Un volume crée un lien entre un dossier de ton PC et un dossier dans le conteneur.
</p>
<div style="display:flex;gap:8px;margin-bottom:10px">
  <button class="nb on" id="v0" onclick="showVol(0,this)">Sans volume</button>
  <button class="nb" id="v1" onclick="showVol(1,this)">Avec volume</button>
  <button class="nb" id="v2" onclick="showVol(2,this)">Commandes mysql</button>
</div>
<div id="vol-box"></div>
</div>`,

multistage:`<div class="fade">
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 10px;line-height:1.7">
Un <strong>multi-stage build</strong> c'est utiliser deux images dans un même Dockerfile : une grosse pour compiler, une petite pour exécuter. Tu gardes seulement le résultat — ton image finale est beaucoup plus légère.
</p>
<svg width="100%" viewBox="0 0 680 260">
<defs><marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>

<!-- Stage 1 -->
<rect x="20" y="30" width="260" height="140" rx="10" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
<text font-size="12" font-weight="500" x="150" y="52" text-anchor="middle" fill="#633806">Stage 1 — builder</text>
<text font-size="10" x="36" y="74" fill="#854F0B">FROM maven:3.9 AS builder</text>
<text font-size="10" x="36" y="92" fill="#854F0B">COPY pom.xml .</text>
<text font-size="10" x="36" y="110" fill="#854F0B">COPY src ./src</text>
<text font-size="10" x="36" y="128" fill="#854F0B">RUN mvn package</text>
<rect x="36" y="144" width="228" height="18" rx="4" fill="#EF9F27" opacity=".3"/>
<text font-size="10" x="150" y="157" text-anchor="middle" fill="#633806">→ produit : app.jar (gros)</text>
<text font-size="10" x="150" y="188" text-anchor="middle" fill="#888780">image maven ~500 MB</text>

<!-- Arrow -->
<line x1="282" y1="130" x2="358" y2="130" stroke="#1D9E75" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#ar2)"/>
<text font-size="10" x="320" y="123" text-anchor="middle" fill="#1D9E75">COPY --from</text>
<text font-size="10" x="320" y="144" text-anchor="middle" fill="#888780">=builder</text>

<!-- Stage 2 -->
<rect x="360" y="30" width="260" height="140" rx="10" fill="#E1F5EE" stroke="#1D9E75" stroke-width="1"/>
<text font-size="12" font-weight="500" x="490" y="52" text-anchor="middle" fill="#085041">Stage 2 — image finale</text>
<text font-size="10" x="376" y="74" fill="#0F6E56">FROM eclipse-temurin:17-jre</text>
<text font-size="10" x="376" y="92" fill="#0F6E56">WORKDIR /app</text>
<text font-size="10" x="376" y="110" fill="#0F6E56">COPY --from=builder /app/target/app.jar .</text>
<text font-size="10" x="376" y="128" fill="#0F6E56">EXPOSE 8080</text>
<text font-size="10" x="376" y="146" fill="#0F6E56">CMD ["java","-jar","app.jar"]</text>
<text font-size="10" x="490" y="188" text-anchor="middle" fill="#888780">image finale ~200 MB seulement</text>

<!-- Comparison -->
<rect x="20" y="215" width="260" height="34" rx="6" fill="#FCEBEB" stroke="#A32D2D" stroke-width="0.5"/>
<text font-size="12" x="150" y="236" text-anchor="middle" fill="#791F1F">❌ Image avec maven : ~700 MB</text>
<rect x="360" y="215" width="260" height="34" rx="6" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
<text font-size="12" x="490" y="236" text-anchor="middle" fill="#085041">✅ Image multi-stage : ~200 MB</text>
</svg>
<pre class="code" style="font-size:11px"><span class="cm"># Stage 1 : compilation (on s'en débarrassera)</span>
<span class="kw">FROM</span> maven:3.9 <span class="kw">AS</span> builder
<span class="kw">WORKDIR</span> /app
<span class="kw">COPY</span> pom.xml .
<span class="kw">COPY</span> src ./src
<span class="kw">RUN</span> mvn package -DskipTests

<span class="cm"># Stage 2 : image finale légère</span>
<span class="kw">FROM</span> eclipse-temurin:17-jre
<span class="kw">WORKDIR</span> /app
<span class="kw">COPY</span> --from=builder /app/target/demo-1.0.0.jar app.jar  <span class="cm">← copie SEULEMENT le jar</span>
<span class="kw">EXPOSE</span> 8080
<span class="kw">CMD</span> ["java", "-jar", "app.jar"]</pre>
</div>`,

commandes:`<div class="fade">
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 12px;line-height:1.7">Toutes les commandes du TD03 décortiquées. Clique pour déplier chaque commande.</p>
<div id="cmd-list"></div>
</div>`
};

/* ═══ EXPLICATIONS BRIQUES INTRO ═══ */
const XI={
  hub:{t:'🌐 Docker Hub',c:'#BA7517',tx:'C\'est le "App Store" des images Docker. Tu y trouves des images officielles : ubuntu, mysql, nginx, java… Quand tu fais <code>docker pull ubuntu</code>, Docker va chercher là-bas.'},
  image:{t:'🖼 Image Docker',c:'#534AB7',tx:'Une image c\'est un fichier figé qui contient tout ce qu\'il faut : le système, les bibliothèques, ton code. Elle ne change jamais. C\'est le "plan". Tu peux créer 100 conteneurs à partir d\'une seule image.'},
  c1:{t:'📦 Conteneur Docker',c:'#0F6E56',tx:'Un conteneur c\'est une image qui tourne. Il est isolé du reste de ton PC. Plusieurs conteneurs peuvent tourner en même temps à partir de la même image, sur des ports différents.'},
  dockerfile:{t:'📄 Dockerfile',c:'#D85A30',tx:'C\'est la recette pour créer une image. Tu écris les étapes : quelle image de base, quels fichiers copier, quelles commandes installer, quel port ouvrir. Docker lit ce fichier et construit l\'image.'},
};

/* ═══ IMAGES ═══ */
const IMGS=[
  {t:'Les couches d\'une image',svg:`<svg width="100%" viewBox="0 0 680 220">
  <rect x="100" y="170" width="480" height="34" rx="6" fill="#D3D1C7" stroke="#5F5E5A" stroke-width="0.5"/>
  <text font-size="11" font-weight="500" x="340" y="192" text-anchor="middle" fill="#2C2C2A">Couche 0 — OS de base (ubuntu:24.04)</text>
  <rect x="100" y="128" width="480" height="34" rx="6" fill="#B5D4F4" stroke="#185FA5" stroke-width="0.5"/>
  <text font-size="11" font-weight="500" x="340" y="150" text-anchor="middle" fill="#0C447C">Couche 1 — RUN apt install openjdk (Java)</text>
  <rect x="100" y="86" width="480" height="34" rx="6" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/>
  <text font-size="11" font-weight="500" x="340" y="108" text-anchor="middle" fill="#085041">Couche 2 — COPY demo.jar /app/</text>
  <rect x="100" y="44" width="480" height="34" rx="6" fill="#CECBF6" stroke="#534AB7" stroke-width="0.5"/>
  <text font-size="11" font-weight="500" x="340" y="66" text-anchor="middle" fill="#3C3489">Couche 3 — CMD ["java","-jar","app.jar"]</text>
  <text font-size="10" x="340" y="18" text-anchor="middle" fill="#888780">chaque instruction RUN/COPY/CMD ajoute une couche → plus de couches = image plus lourde</text>
  <text font-size="10" x="72" y="192" text-anchor="middle" fill="#888780">bas</text>
  <text font-size="10" x="72" y="62" text-anchor="middle" fill="#888780">haut</text>
  </svg>`,
  tx:'Chaque instruction du Dockerfile ajoute une "couche" à l\'image. C\'est comme un mille-feuille 🥐. Docker met en cache ces couches — si tu changes seulement la dernière, il ne recalcule pas toutes les autres. C\'est pour ça qu\'on regroupe les <code>RUN</code> en une seule instruction.'},
  {t:'Image vs Conteneur',svg:`<svg width="100%" viewBox="0 0 680 180">
  <defs><marker id="ar3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
  <rect x="20" y="60" width="180" height="70" rx="10" fill="#EEEDFE" stroke="#534AB7" stroke-width="1"/>
  <text font-size="13" font-weight="500" x="110" y="90" text-anchor="middle" fill="#3C3489">🖼 Image</text>
  <text font-size="10" x="110" y="108" text-anchor="middle" fill="#534AB7">lecture seule</text>
  <text font-size="10" x="110" y="122" text-anchor="middle" fill="#534AB7">ne change jamais</text>
  <line class="fan" x1="202" y1="95" x2="240" y2="80" stroke="#534AB7" stroke-width="1.5" marker-end="url(#ar3)"/>
  <line class="fan" x1="202" y1="95" x2="240" y2="110" stroke="#534AB7" stroke-width="1.5" marker-end="url(#ar3)"/>
  <text font-size="10" x="221" y="92" text-anchor="middle" fill="#888780">run</text>
  <rect x="242" y="30" width="150" height="55" rx="8" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
  <text font-size="12" font-weight="500" x="317" y="53" text-anchor="middle" fill="#085041">Conteneur A</text>
  <text font-size="10" x="317" y="70" text-anchor="middle" fill="#0F6E56">port 8080:8080</text>
  <text font-size="10" x="317" y="82" text-anchor="middle" fill="#888780">en cours d'exec</text>
  <rect x="242" y="100" width="150" height="55" rx="8" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
  <text font-size="12" font-weight="500" x="317" y="123" text-anchor="middle" fill="#085041">Conteneur B</text>
  <text font-size="10" x="317" y="140" text-anchor="middle" fill="#0F6E56">port 9000:8080</text>
  <text font-size="10" x="317" y="152" text-anchor="middle" fill="#888780">autre instance</text>
  <text font-size="10" x="430" y="97" text-anchor="middle" fill="#888780">même image,</text>
  <text font-size="10" x="430" y="110" text-anchor="middle" fill="#888780">deux conteneurs</text>
  <text font-size="10" x="430" y="123" text-anchor="middle" fill="#888780">indépendants</text>
  </svg>`,
  tx:'L\'image = le moule. Les conteneurs = les gaufres. Tu peux créer autant de conteneurs que tu veux depuis la même image. Chaque conteneur est <strong>indépendant</strong> — modifier l\'un ne change pas les autres.'},
  {t:'Alpine vs Ubuntu — taille',svg:`<svg width="100%" viewBox="0 0 680 170">
  <rect x="40" y="30" width="260" height="100" rx="10" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
  <text font-size="13" font-weight="500" x="170" y="55" text-anchor="middle" fill="#633806">ubuntu:24.04</text>
  <rect x="60" y="70" width="220" height="22" rx="4" fill="#EF9F27"/>
  <text font-size="11" x="170" y="85" text-anchor="middle" fill="#412402">~77 MB</text>
  <text font-size="10" x="170" y="116" text-anchor="middle" fill="#888780">OS complet, tous les outils</text>
  <rect x="380" y="30" width="130" height="100" rx="10" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
  <text font-size="13" font-weight="500" x="445" y="55" text-anchor="middle" fill="#085041">alpine:latest</text>
  <rect x="400" y="70" width="90" height="22" rx="4" fill="#1D9E75"/>
  <text font-size="11" x="445" y="85" text-anchor="middle" fill="#E1F5EE">~7 MB</text>
  <text font-size="10" x="445" y="116" text-anchor="middle" fill="#888780">ultra léger</text>
  <text font-size="10" x="340" y="155" text-anchor="middle" fill="#888780">Alpine est 10x plus petite → images finales plus légères et plus sécurisées</text>
  </svg>`,
  tx:'Alpine Linux est un mini-OS de seulement 7 MB. Ubuntu fait 77 MB. Pour des images Docker, on préfère Alpine ou des images spécialisées comme <code>eclipse-temurin:17-jre</code> qui contient juste Java, sans rien d\'inutile.'},
];

/* ═══ CYCLE DE VIE CONTENEUR ═══ */
const CVS=[
  {t:'Créer et démarrer un conteneur',
   svg:`<svg width="100%" viewBox="0 0 680 120">
   <defs><marker id="a4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
   <rect x="10" y="30" width="100" height="50" rx="8" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
   <text font-size="11" font-weight="500" x="60" y="56" text-anchor="middle" fill="#633806">Image</text>
   <text font-size="10" x="60" y="72" text-anchor="middle" fill="#854F0B">ubuntu:24.04</text>
   <line x1="112" y1="55" x2="168" y2="55" stroke="#888780" stroke-width="1.5" marker-end="url(#a4)"/>
   <text font-size="10" x="140" y="48" text-anchor="middle" fill="#888780">docker run</text>
   <rect x="170" y="30" width="130" height="50" rx="8" fill="#E1F5EE" stroke="#1D9E75" stroke-width="1"/>
   <text font-size="11" font-weight="500" x="235" y="56" text-anchor="middle" fill="#085041">Conteneur</text>
   <text font-size="10" x="235" y="72" text-anchor="middle" fill="#0F6E56">devops-hello</text>
   <line x1="302" y1="55" x2="358" y2="55" stroke="#888780" stroke-width="1.5" marker-end="url(#a4)"/>
   <text font-size="10" x="330" y="48" text-anchor="middle" fill="#888780">exécute</text>
   <rect x="360" y="30" width="160" height="50" rx="8" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
   <text font-size="11" font-weight="500" x="440" y="56" text-anchor="middle" fill="#3C3489">echo 'Hello World!'</text>
   <text font-size="10" x="440" y="72" text-anchor="middle" fill="#534AB7">commande dans le conteneur</text>
   <rect x="540" y="30" width="120" height="50" rx="8" fill="#E6F1FB" stroke="#185FA5" stroke-width="0.5"/>
   <text font-size="11" font-weight="500" x="600" y="56" text-anchor="middle" fill="#0C447C">S'arrête</text>
   <text font-size="10" x="600" y="72" text-anchor="middle" fill="#185FA5">commande finie</text>
   <line x1="522" y1="55" x2="538" y2="55" stroke="#888780" stroke-width="1.5" marker-end="url(#a4)"/>
   </svg>`,
   tx:'<code>docker run --name devops-hello ubuntu:24.04 echo "Hello World!"</code><br>→ Crée le conteneur nommé "devops-hello" depuis ubuntu:24.04, exécute <code>echo</code> dedans, puis le conteneur s\'arrête (la commande est finie). Il existe encore mais n\'est plus actif.'},
  {t:'Entrer dans un conteneur actif',
   svg:`<svg width="100%" viewBox="0 0 680 130">
   <rect x="20" y="20" width="200" height="90" rx="10" fill="#E1F5EE" stroke="#1D9E75" stroke-width="1"/>
   <text font-size="12" font-weight="500" x="120" y="44" text-anchor="middle" fill="#085041">Conteneur devops-sleep</text>
   <text font-size="10" x="120" y="62" text-anchor="middle" fill="#0F6E56">sleep 1800 (tourne 30 min)</text>
   <text font-size="10" x="120" y="80" text-anchor="middle" fill="#888780">statut : running</text>
   <defs><marker id="a5" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
   <line x1="390" y1="65" x2="222" y2="65" stroke="#534AB7" stroke-width="1.5" marker-end="url(#a5)"/>
   <text font-size="10" x="310" y="58" text-anchor="middle" fill="#534AB7">docker exec -it devops-sleep bash</text>
   <rect x="392" y="30" width="270" height="70" rx="8" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
   <text font-size="12" font-weight="500" x="527" y="54" text-anchor="middle" fill="#3C3489">Ton terminal (shell)</text>
   <text font-size="10" x="527" y="72" text-anchor="middle" fill="#534AB7">tu es DANS le conteneur</text>
   <text font-size="10" x="527" y="88" text-anchor="middle" fill="#888780">ls, cd, apt install, git clone…</text>
   </svg>`,
   tx:'<code>docker exec -it devops-sleep bash</code><br>• <code>exec</code> = exécute une commande dans un conteneur qui tourne<br>• <code>-i</code> = interactif (ton clavier fonctionne)<br>• <code>-t</code> = ouvre un pseudo-terminal (comme une vraie console)<br>• <code>bash</code> = le shell qu\'on ouvre dedans<br>Tu es maintenant à l\'intérieur du conteneur 🚀'},
  {t:'Voir les logs d\'un conteneur',
   svg:`<svg width="100%" viewBox="0 0 680 120">
   <rect x="20" y="20" width="160" height="80" rx="8" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
   <text font-size="12" font-weight="500" x="100" y="50" text-anchor="middle" fill="#085041">Conteneur</text>
   <text font-size="10" x="100" y="68" text-anchor="middle" fill="#0F6E56">devops-hello</text>
   <text font-size="10" x="100" y="86" text-anchor="middle" fill="#888780">(arrêté)</text>
   <defs><marker id="a6" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
   <line x1="182" y1="60" x2="238" y2="60" stroke="#888780" stroke-width="1.5" marker-end="url(#a6)"/>
   <text font-size="10" x="210" y="52" text-anchor="middle" fill="#888780">docker logs</text>
   <rect x="240" y="20" width="420" height="80" rx="8" fill="#2C2C2A"/>
   <text font-size="11" font-family="monospace" x="256" y="44" fill="#9FE1CB">$ docker logs devops-hello</text>
   <text font-size="11" font-family="monospace" x="256" y="64" fill="#E0E0E0">Hello World!</text>
   <text font-size="11" font-family="monospace" x="256" y="82" fill="#E0E0E0">Hello World!</text>
   <text font-size="10" x="450" y="112" text-anchor="middle" fill="#888780">2 lignes = le conteneur a tourné 2 fois (docker start)</text>
   </svg>`,
   tx:'<code>docker logs devops-hello</code> → affiche tout ce que le conteneur a écrit dans le terminal depuis sa création. Très utile pour déboguer. Si tu as relancé le conteneur avec <code>docker start</code>, tu verras deux fois "Hello World!".'},
  {t:'Arrêter et supprimer',
   svg:`<svg width="100%" viewBox="0 0 680 130">
   <defs><marker id="a7" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
   <rect x="20" y="30" width="130" height="60" rx="8" fill="#E1F5EE" stroke="#1D9E75" stroke-width="1"/>
   <text font-size="11" font-weight="500" x="85" y="58" text-anchor="middle" fill="#085041">Running</text>
   <text font-size="10" x="85" y="76" text-anchor="middle" fill="#0F6E56">devops-sleep</text>
   <line x1="152" y1="60" x2="198" y2="60" stroke="#D85A30" stroke-width="1.5" marker-end="url(#a7)"/>
   <text font-size="10" x="175" y="52" text-anchor="middle" fill="#D85A30">docker stop</text>
   <rect x="200" y="30" width="130" height="60" rx="8" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
   <text font-size="11" font-weight="500" x="265" y="58" text-anchor="middle" fill="#633806">Stopped</text>
   <text font-size="10" x="265" y="76" text-anchor="middle" fill="#854F0B">existe encore</text>
   <line x1="332" y1="60" x2="378" y2="60" stroke="#A32D2D" stroke-width="1.5" marker-end="url(#a7)"/>
   <text font-size="10" x="355" y="52" text-anchor="middle" fill="#A32D2D">docker rm</text>
   <rect x="380" y="30" width="130" height="60" rx="8" fill="#FCEBEB" stroke="#A32D2D" stroke-width="0.5"/>
   <text font-size="11" font-weight="500" x="445" y="58" text-anchor="middle" fill="#791F1F">Supprimé</text>
   <text font-size="10" x="445" y="76" text-anchor="middle" fill="#A32D2D">n'existe plus</text>
   <text font-size="10" x="590" y="60" text-anchor="middle" fill="#888780">ou docker run --rm</text>
   <text font-size="10" x="590" y="74" text-anchor="middle" fill="#888780">(auto-suppression)</text>
   </svg>`,
   tx:'<code>docker stop devops-sleep</code> → envoie un signal d\'arrêt propre.<br><code>docker rm devops-sleep</code> → supprime définitivement le conteneur (mais pas l\'image).<br><code>docker rmi mon-image</code> → supprime l\'image.<br><code>docker run --rm ...</code> → suppression automatique après l\'arrêt.'},
  {t:'docker commit — sauvegarder ses modifications',
   svg:`<svg width="100%" viewBox="0 0 680 130">
   <defs><marker id="a8" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
   <rect x="20" y="30" width="160" height="70" rx="8" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
   <text font-size="11" font-weight="500" x="100" y="56" text-anchor="middle" fill="#085041">Conteneur modifié</text>
   <text font-size="10" x="100" y="74" text-anchor="middle" fill="#0F6E56">ubuntu + git installé</text>
   <text font-size="10" x="100" y="89" text-anchor="middle" fill="#888780">par apt install</text>
   <line x1="182" y1="65" x2="248" y2="65" stroke="#534AB7" stroke-width="1.5" marker-end="url(#a8)"/>
   <text font-size="10" x="215" y="56" text-anchor="middle" fill="#534AB7">docker commit</text>
   <rect x="250" y="30" width="180" height="70" rx="8" fill="#EEEDFE" stroke="#534AB7" stroke-width="1"/>
   <text font-size="11" font-weight="500" x="340" y="56" text-anchor="middle" fill="#3C3489">Nouvelle image</text>
   <text font-size="10" x="340" y="74" text-anchor="middle" fill="#534AB7">"ajout_de_git"</text>
   <text font-size="10" x="340" y="89" text-anchor="middle" fill="#888780">ubuntu + git intégré</text>
   <rect x="460" y="30" width="200" height="70" rx="8" fill="#FAEEDA" stroke="#BA7517" stroke-width="0.5"/>
   <text font-size="11" font-weight="500" x="560" y="50" text-anchor="middle" fill="#633806">⚠️ Préférer</text>
   <text font-size="10" x="560" y="68" text-anchor="middle" fill="#854F0B">le Dockerfile</text>
   <text font-size="10" x="560" y="84" text-anchor="middle" fill="#888780">plus reproductible</text>
   </svg>`,
   tx:'<code>docker commit -a "g12345" -m "git installé" &lt;id_conteneur&gt; ajout_de_git</code><br>Sauvegarde l\'état actuel du conteneur comme nouvelle image. Pratique mais moins propre qu\'un Dockerfile. L\'image sera plus lourde car Docker garde toutes les couches intermédiaires.'},
];

/* ═══ DOCKERFILE INSTRUCTIONS ═══ */
const DF={
  FROM:{t:'FROM — image de base',c:'#534AB7',tx:'<strong>La première instruction obligatoire.</strong> Elle dit à Docker : "pars de cette image existante". C\'est comme choisir la base de ta recette. <code>FROM ubuntu:24.04</code> = commence avec Ubuntu 24.04. <code>FROM eclipse-temurin:17-jre</code> = commence avec une image qui a déjà Java 17.'},
  LABEL:{t:'LABEL — métadonnées',c:'#888780',tx:'Ajoute des informations sur l\'image : auteur, version, description. Ça n\'affecte pas le fonctionnement. <code>LABEL author="g12345"</code> <code>LABEL version="1.0"</code>'},
  RUN:{t:'RUN — exécuter une commande pendant le build',c:'#D85A30',tx:'<strong>Exécuté UNE SEULE FOIS pendant la construction de l\'image.</strong> Chaque RUN crée une nouvelle couche. Pour optimiser, on chaîne les commandes avec <code>&&</code> :<br><code>RUN apt update && apt install -y git && apt clean</code><br>→ 1 seule couche au lieu de 3.'},
  ENV:{t:'ENV — variable d\'environnement',c:'#185FA5',tx:'Définit une variable d\'environnement disponible pendant le build ET à l\'exécution du conteneur. <code>ENV JAVA_HOME=/usr/lib/jvm/java-17</code>. Spring Boot utilise les ENV pour sa configuration (ex: <code>SPRING_DATASOURCE_URL</code>).'},
  WORKDIR:{t:'WORKDIR — dossier de travail',c:'#0F6E56',tx:'Définit le dossier courant pour les instructions suivantes. Comme faire <code>cd /app</code> mais de façon permanente. Si le dossier n\'existe pas, Docker le crée. Toutes les commandes COPY, RUN, CMD s\'exécutent depuis ce dossier.'},
  COPY:{t:'COPY — copier des fichiers',c:'#1D9E75',tx:'Copie des fichiers de ta machine vers l\'image. <code>COPY demo-1.0.0.jar /app/app.jar</code> = prend le jar local et le met dans /app/ du conteneur. Avec multi-stage : <code>COPY --from=builder /app/target/app.jar .</code> = copie depuis le stage précédent.'},
  EXPOSE:{t:'EXPOSE — déclarer un port',c:'#BA7517',tx:'<strong>Documente</strong> le port que l\'application utilise. C\'est une déclaration d\'intention — ça n\'ouvre pas vraiment le port ! Pour vraiment exposer le port, tu dois utiliser <code>-p</code> dans <code>docker run</code>. <code>EXPOSE 8080</code> dit "mon appli écoute sur 8080".'},
  CMD:{t:'CMD — commande au démarrage du conteneur',c:'#993C1D',tx:'<strong>Exécuté à chaque démarrage du conteneur.</strong> C\'est la commande principale. <code>CMD ["java","-jar","/app/app.jar"]</code>. Peut être remplacée en passant des arguments à <code>docker run</code>. Différent de RUN : RUN = pendant le build, CMD = pendant l\'exécution.'},
};

/* ═══ VOLUMES ═══ */
const VOLS=[
  {t:'Sans volume — données perdues',svg:`<svg width="100%" viewBox="0 0 680 180">
  <defs><marker id="av" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
  <rect x="200" y="20" width="280" height="100" rx="10" fill="#E1F5EE" stroke="#1D9E75" stroke-width="1"/>
  <text font-size="12" font-weight="500" x="340" y="44" text-anchor="middle" fill="#085041">Conteneur MySQL</text>
  <text font-size="10" x="340" y="64" text-anchor="middle" fill="#0F6E56">/var/lib/mysql (données)</text>
  <text font-size="10" x="340" y="82" text-anchor="middle" fill="#0F6E56">table person : Alice, Bob</text>
  <text font-size="10" x="340" y="100" text-anchor="middle" fill="#888780">données stockées DANS le conteneur</text>
  <rect x="200" y="140" width="280" height="34" rx="8" fill="#FCEBEB" stroke="#A32D2D" stroke-width="0.5"/>
  <text font-size="11" x="340" y="162" text-anchor="middle" fill="#791F1F">docker rm → 💀 toutes les données perdues</text>
  <line x1="340" y1="122" x2="340" y2="138" stroke="#A32D2D" stroke-width="1.5" marker-end="url(#av)"/>
  </svg>`,tx:'Sans volume, les données vivent DANS le conteneur. Quand tu fais <code>docker rm mysql-container</code>, tout disparaît : ta base de données, tes tables, tes données. C\'est comme formater un disque dur.'},
  {t:'Avec volume — données persistantes',svg:`<svg width="100%" viewBox="0 0 680 190">
  <defs><marker id="av2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
  <rect x="180" y="20" width="200" height="80" rx="10" fill="#E1F5EE" stroke="#1D9E75" stroke-width="1"/>
  <text font-size="12" font-weight="500" x="280" y="44" text-anchor="middle" fill="#085041">Conteneur MySQL</text>
  <text font-size="10" x="280" y="64" text-anchor="middle" fill="#0F6E56">/var/lib/mysql</text>
  <text font-size="10" x="280" y="80" text-anchor="middle" fill="#888780">(lien vers ton PC)</text>
  <line x1="382" y1="60" x2="418" y2="60" stroke="#BA7517" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#av2)"/>
  <text font-size="10" x="400" y="52" text-anchor="middle" fill="#BA7517">-v</text>
  <rect x="420" y="20" width="220" height="80" rx="10" fill="#FAEEDA" stroke="#BA7517" stroke-width="1"/>
  <text font-size="12" font-weight="500" x="530" y="44" text-anchor="middle" fill="#633806">📁 Ton PC</text>
  <text font-size="10" x="530" y="64" text-anchor="middle" fill="#854F0B">mysql_data/</text>
  <text font-size="10" x="530" y="80" text-anchor="middle" fill="#888780">données réelles ici</text>
  <rect x="180" y="130" width="200" height="34" rx="6" fill="#FCEBEB" stroke="#A32D2D" stroke-width="0.5"/>
  <text font-size="11" x="280" y="152" text-anchor="middle" fill="#791F1F">docker rm → conteneur supprimé</text>
  <rect x="420" y="130" width="220" height="34" rx="6" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
  <text font-size="11" x="530" y="152" text-anchor="middle" fill="#085041">✅ données conservées !</text>
  <text font-size="10" x="340" y="185" text-anchor="middle" fill="#888780">commande : docker run -v /chemin/mysql_data:/var/lib/mysql mysql:9.2.0</text>
  </svg>`,tx:'Avec <code>-v chemin_local:chemin_conteneur</code>, Docker crée un lien entre un dossier de ton PC et un dossier dans le conteneur. Quand MySQL écrit dans <code>/var/lib/mysql</code>, ça va directement dans ton dossier <code>mysql_data</code>. Même si tu supprimes le conteneur, tes données sont sauves.'},
  {t:'Commandes MySQL dans un conteneur',svg:`<svg width="100%" viewBox="0 0 680 120">
  <rect x="20" y="20" width="640" height="80" rx="8" fill="#2C2C2A"/>
  <text font-size="11" font-family="monospace" x="36" y="44" fill="#9FE1CB">$ docker exec mysql-container mysql -u g12345 -psecret -D mydatabase \</text>
  <text font-size="11" font-family="monospace" x="36" y="62" fill="#E0E0E0">  -e "CREATE TABLE person (MATRICULE INT PRIMARY KEY, NAME VARCHAR(100));"</text>
  <text font-size="11" font-family="monospace" x="36" y="80" fill="#9FE1CB">$ docker exec mysql-container mysql -u g12345 -psecret -D mydatabase \</text>
  <text font-size="11" font-family="monospace" x="36" y="98" fill="#E0E0E0">  -e "SELECT * FROM person;"</text>
  </svg>`,tx:'On utilise <code>docker exec</code> pour lancer l\'outil <code>mysql</code> DANS le conteneur. Options : <code>-u</code> = utilisateur, <code>-p</code> = mot de passe (collé sans espace !), <code>-D</code> = base de données, <code>-e</code> = requête SQL à exécuter.'},
];

/* ═══ COMMANDES ═══ */
const CMDS=[
  {l:'docker --version',b:'pb',bl:'info',d:'Vérifie que Docker est bien installé et affiche la version.',ps:[{c:'docker --version',d:'Affiche la version installée. Si ça marche, Docker est prêt.'}]},
  {l:'docker image ls',b:'pb',bl:'image',d:'Liste toutes les images présentes sur ta machine.',ps:[{c:'docker image ls',d:'Affiche : nom, tag (version), ID, date de création, taille'}]},
  {l:'docker pull ubuntu:24.04',b:'pa',bl:'image',d:'Télécharge une image depuis Docker Hub sans lancer de conteneur.',ps:[{c:'docker pull',d:'Télécharge l\'image'},{c:'ubuntu:24.04',d:'Nom de l\'image : le mot avant : est le nom, après : est le tag (version)'}]},
  {l:'docker rmi <id_image>',b:'pc',bl:'image',d:'Supprime une image de ta machine.',ps:[{c:'docker rmi',d:'Remove Image'},{c:'<id_image>',d:'L\'identifiant ou le nom de l\'image à supprimer. Ne supprime pas les conteneurs basés dessus.'}]},
  {l:'docker run --name devops-hello ubuntu:24.04 echo "Hello World!"',b:'pp',bl:'docker',d:'Crée et démarre un conteneur qui exécute une commande puis s\'arrête.',ps:[{c:'docker run',d:'Crée ET démarre un conteneur'},{c:'--name devops-hello',d:'Donne un nom au conteneur (sinon Docker en invente un aléatoire)'},{c:'ubuntu:24.04',d:'Image à utiliser'},{c:'echo "Hello World!"',d:'Commande exécutée DANS le conteneur après le démarrage'}]},
  {l:'docker run --rm ubuntu:24.04 echo "test"',b:'pp',bl:'docker',d:'Crée un conteneur temporaire, supprimé automatiquement après.',ps:[{c:'--rm',d:'Remove : supprime le conteneur dès qu\'il s\'arrête. Utile pour les tests.'}]},
  {l:'docker ps',b:'pb',bl:'info',d:'Liste les conteneurs EN COURS d\'exécution seulement.',ps:[{c:'docker ps',d:'Affiche : ID, image, commande, création, statut, ports, nom. Ne montre pas les conteneurs arrêtés.'}]},
  {l:'docker ps -a',b:'pb',bl:'info',d:'Liste TOUS les conteneurs (actifs ET arrêtés).',ps:[{c:'-a',d:'All : inclut les conteneurs arrêtés. Tu vois leur statut : "Exited", "Up", etc.'}]},
  {l:'docker logs devops-hello',b:'pb',bl:'info',d:'Affiche tout ce que le conteneur a affiché dans le terminal.',ps:[{c:'docker logs',d:'Lit l\'historique des sorties du conteneur'},{c:'devops-hello',d:'Nom ou ID du conteneur'}]},
  {l:'docker start devops-hello',b:'pg',bl:'docker',d:'Redémarre un conteneur existant (déjà créé, arrêté).',ps:[{c:'docker start',d:'Redémarre un conteneur arrêté sans le recréer. Il utilise la même commande qu\'à la création.'}]},
  {l:'docker run --name devops-sleep ubuntu:24.04 sleep 1800',b:'pp',bl:'docker',d:'Lance un conteneur qui dort 30 minutes (permet de l\'explorer).',ps:[{c:'sleep 1800',d:'Commande Unix qui attend 1800 secondes (30 min) avant de s\'arrêter. Le conteneur reste actif pendant ce temps.'}]},
  {l:'docker exec -it devops-sleep bash',b:'pp',bl:'exec',d:'Ouvre un terminal interactif DANS un conteneur qui tourne.',ps:[{c:'docker exec',d:'Exécute une commande dans un conteneur actif'},{c:'-i',d:'Interactive : garde stdin ouvert (ton clavier fonctionne)'},{c:'-t',d:'TTY : alloue un pseudo-terminal (comme une vraie console)'},{c:'devops-sleep',d:'Nom du conteneur cible'},{c:'bash',d:'Le shell à ouvrir (on peut aussi utiliser sh)'}]},
  {l:'docker stop devops-sleep',b:'pc',bl:'docker',d:'Arrête proprement un conteneur en cours d\'exécution.',ps:[{c:'docker stop',d:'Envoie un signal SIGTERM (arrêt propre). Attends 10s puis force l\'arrêt.'}]},
  {l:'docker rm devops-sleep',b:'pr',bl:'docker',d:'Supprime définitivement un conteneur arrêté.',ps:[{c:'docker rm',d:'Remove Container : supprime le conteneur (et ses données non-volume). L\'image reste intacte.'}]},
  {l:'docker commit -a "g12345" -m "git installé" <id_conteneur> ajout_de_git',b:'pa',bl:'docker',d:'Sauvegarde l\'état actuel d\'un conteneur comme nouvelle image.',ps:[{c:'docker commit',d:'Crée une image à partir d\'un conteneur existant'},{c:'-a "g12345"',d:'Author : nom de l\'auteur'},{c:'-m "message"',d:'Message décrivant les changements'},{c:'<id_conteneur>',d:'ID ou nom du conteneur source'},{c:'ajout_de_git',d:'Nom donné à la nouvelle image'}]},
  {l:'docker history ajout_de_git',b:'pb',bl:'info',d:'Affiche l\'historique des couches d\'une image.',ps:[{c:'docker history',d:'Montre toutes les couches de l\'image : instruction, taille, date'}]},
  {l:'docker build -f Dockerfile -t g12345/spring-demo-no-db .',b:'pa',bl:'build',d:'Construit une image Docker depuis un Dockerfile.',ps:[{c:'docker build',d:'Lance la construction de l\'image'},{c:'-f Dockerfile',d:'Spécifie le nom du fichier Dockerfile (par défaut c\'est "Dockerfile")'},{c:'-t g12345/spring-demo-no-db',d:'Tag : nom donné à l\'image. Format recommandé : utilisateur/nom'},{c:'.',d:'Le point = contexte de build = dossier où Docker cherche les fichiers à COPY'}]},
  {l:'docker run -p 9000:8080 g12345/spring-demo-no-db',b:'pp',bl:'docker',d:'Lance le conteneur avec redirection de port.',ps:[{c:'-p 9000:8080',d:'Port mapping. Format : PORT_MACHINE:PORT_CONTENEUR. localhost:9000 → port 8080 du conteneur.'}]},
  {l:'docker run -d -p 9000:8080 g12345/spring-demo-no-db',b:'pp',bl:'docker',d:'Lance en mode détaché (arrière-plan).',ps:[{c:'-d',d:'Detached : le conteneur tourne en arrière-plan. Tu récupères ton terminal immédiatement.'}]},
  {l:'docker run -e MYSQL_USER=g12345 -e MYSQL_PASSWORD=secret mysql:9.2.0',b:'pp',bl:'docker',d:'Passe des variables d\'environnement au conteneur.',ps:[{c:'-e MYSQL_USER=g12345',d:'Environment variable : configure MySQL avec cet utilisateur'},{c:'-e MYSQL_PASSWORD=secret',d:'Mot de passe de l\'utilisateur'},{c:'-e MYSQL_ROOT_PASSWORD=secret',d:'Mot de passe root MySQL (obligatoire)'},{c:'-e MYSQL_DATABASE=mydatabase',d:'Crée automatiquement cette base au démarrage'}]},
  {l:'docker run --env-file .env mysql:9.2.0',b:'pp',bl:'docker',d:'Charge les variables depuis un fichier .env.',ps:[{c:'--env-file .env',d:'Lit toutes les variables du fichier .env et les passe au conteneur. Plus pratique que -e pour beaucoup de variables.'}]},
  {l:'docker run -v /chemin/mysql_data:/var/lib/mysql mysql:9.2.0',b:'pa',bl:'volume',d:'Attache un volume pour persister les données MySQL.',ps:[{c:'-v',d:'Volume : crée un lien entre ta machine et le conteneur'},{c:'/chemin/mysql_data',d:'Chemin ABSOLU du dossier sur ta machine (utilise $(pwd)/mysql_data)'},{c:':/var/lib/mysql',d:'Chemin dans le conteneur. MySQL stocke ses données ici par défaut.'}]},
  {l:'docker exec -ti --user root <conteneur> chmod -R 777 /var/lib/mysql',b:'pp',bl:'exec',d:'Change les droits d\'un dossier dans le conteneur en tant que root.',ps:[{c:'--user root',d:'Exécute la commande en tant qu\'utilisateur root dans le conteneur'},{c:'chmod -R 777',d:'Donne tous les droits (lecture/écriture/exécution) récursivement'},{c:'/var/lib/mysql',d:'Dossier cible des données MySQL'}]},
];

/* ═══ FONCTIONS ═══ */
function xi(k){const e=XI[k];document.getElementById('xi-box').innerHTML=`<div class="fade"><p style="font-size:14px;font-weight:500;color:${e.c};margin:0 0 6px">${e.t}</p><p style="font-size:13px;margin:0;line-height:1.7;color:var(--color-text-primary)">${e.tx}</p></div>`;}

function showImg(i,btn){document.querySelectorAll('[id^=im]').forEach(b=>b.classList.remove('on'));if(btn)btn.classList.add('on');const m=IMGS[i];document.getElementById('img-box').innerHTML=`<div class="fade"><p style="font-size:14px;font-weight:500;color:var(--color-text-primary);margin:0 0 8px">${m.t}</p><div style="margin:8px 0">${m.svg}</div><div class="card"><p style="font-size:13px;margin:0;line-height:1.7;color:var(--color-text-primary)">${m.tx}</p></div></div>`;}

function showCv(i,btn){document.querySelectorAll('[id^=cv]').forEach(b=>b.classList.remove('on'));if(btn)btn.classList.add('on');const c=CVS[i];document.getElementById('cv-box').innerHTML=`<div class="fade"><p style="font-size:14px;font-weight:500;color:var(--color-text-primary);margin:0 0 8px">${c.t}</p><div style="margin:8px 0">${c.svg}</div><div class="card"><p style="font-size:13px;margin:0;line-height:1.7;color:var(--color-text-primary)">${c.tx}</p></div></div>`;}

function showDF(k){const d=DF[k];document.getElementById('df-box').innerHTML=`<div class="fade"><p style="font-size:14px;font-weight:500;color:${d.c};margin:0 0 8px">${d.t}</p><p style="font-size:13px;margin:0;line-height:1.8;color:var(--color-text-primary)">${d.tx}</p></div>`;}

function showVol(i,btn){document.querySelectorAll('[id^=v]').forEach(b=>b.classList.remove('on'));if(btn)btn.classList.add('on');const v=VOLS[i];document.getElementById('vol-box').innerHTML=`<div class="fade"><p style="font-size:14px;font-weight:500;color:var(--color-text-primary);margin:0 0 8px">${v.t}</p><div style="margin:8px 0">${v.svg}</div><div class="card"><p style="font-size:13px;margin:0;line-height:1.7;color:var(--color-text-primary)">${v.tx}</p></div></div>`;}

/* ═══ PORTS CANVAS ═══ */
function drawPort(hp){
  const cv=document.getElementById('port-canvas');if(!cv)return;
  const ctx=cv.getContext('2d'),W=660,H=240;
  ctx.clearRect(0,0,W,H);
  const isDark=window.matchMedia('(prefers-color-scheme:dark)').matches;
  const tl=isDark?'#9c9a92':'#73726c';
  // PC
  const pcC=isDark?'#0C447C':'#E6F1FB';
  ctx.fillStyle=pcC;ctx.strokeStyle='#185FA5';ctx.lineWidth=1;
  rr(ctx,20,70,180,100,10);ctx.fill();ctx.stroke();
  ctx.fillStyle='#0C447C';ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.fillText('💻 Ton PC',110,110);
  ctx.font='11px sans-serif';ctx.fillStyle='#185FA5';ctx.fillText('localhost:'+hp,110,130);
  ctx.fillStyle='#1D9E75';ctx.font='bold 11px sans-serif';ctx.fillText('✅ tu accèdes ici',110,148);
  // port box sur PC
  ctx.fillStyle=isDark?'#0C447C':'#B5D4F4';ctx.strokeStyle='#185FA5';ctx.lineWidth=1.5;
  rr(ctx,170,100,50,40,6);ctx.fill();ctx.stroke();
  ctx.fillStyle='#042C53';ctx.font='bold 12px sans-serif';ctx.fillText(hp,195,124);
  // arrow
  ctx.strokeStyle='#534AB7';ctx.lineWidth=2.5;
  ar2(ctx,222,120,308,120,'#534AB7');
  ctx.fillStyle='#534AB7';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillText('-p '+hp+':8080',265,112);
  // conteneur
  const cc=isDark?'#3C3489':'#EEEDFE';
  ctx.fillStyle=cc;ctx.strokeStyle='#534AB7';ctx.lineWidth=1;
  rr(ctx,310,40,320,160,12);ctx.fill();ctx.stroke();
  ctx.fillStyle='#3C3489';ctx.font='bold 13px sans-serif';ctx.fillText('📦 Conteneur',470,80);
  ctx.font='11px sans-serif';ctx.fillStyle='#534AB7';ctx.fillText('Spring Boot',470,100);
  ctx.fillStyle='#888780';ctx.font='10px sans-serif';ctx.fillText('isolé du reste',470,118);
  // port 8080 conteneur
  ctx.fillStyle=isDark?'#3C3489':'#AFA9EC';ctx.strokeStyle='#534AB7';ctx.lineWidth=1.5;
  rr(ctx,314,100,60,40,6);ctx.fill();ctx.stroke();
  ctx.fillStyle='#26215C';ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.fillText('8080',344,124);
  ctx.fillStyle='#888780';ctx.font='10px sans-serif';ctx.fillText('toujours 8080',344,148);
  document.getElementById('hp-label').textContent=hp;
}
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
function ar2(ctx,x1,y1,x2,y2,col){ctx.strokeStyle=col;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();const a=Math.atan2(y2-y1,x2-x1),h=10;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-h*Math.cos(a-.4),y2-h*Math.sin(a-.4));ctx.lineTo(x2-h*Math.cos(a+.4),y2-h*Math.sin(a+.4));ctx.closePath();ctx.fill();}

/* ═══ COMMANDES ═══ */
let openCmd=-1;
function buildCmds(){
  const div=document.getElementById('cmd-list');if(!div)return;
  div.innerHTML=CMDS.map((c,i)=>`
    <div class="card" style="cursor:pointer;margin-bottom:8px" onclick="toggleCmd(${i})">
      <div style="display:flex;align-items:flex-start;gap:8px;flex-wrap:wrap">
        <span class="pill ${c.b}">${c.bl}</span>
        <code style="font-family:var(--font-mono);font-size:11px;flex:1;word-break:break-all;color:var(--color-text-primary)">${c.l}</code>
        <span style="font-size:12px;color:var(--color-text-secondary)">${openCmd===i?'▲':'▼'}</span>
      </div>
      <p style="font-size:12px;color:var(--color-text-secondary);margin:5px 0 0">${c.d}</p>
      ${openCmd===i?`<div style="margin-top:10px;display:grid;grid-template-columns:auto 1fr;gap:6px 12px;align-items:start">${c.ps.map(p=>`<code style="font-family:var(--font-mono);font-size:11px;background:var(--color-background-secondary);padding:2px 6px;border-radius:4px;color:#534AB7;white-space:nowrap">${p.c}</code><span style="font-size:12px;color:var(--color-text-primary);line-height:1.6">${p.d}</span>`).join('')}</div>`:''}
    </div>`).join('');
}
function toggleCmd(i){openCmd=openCmd===i?-1:i;buildCmds();}

function tab(key,btn){
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('on'));
  if(btn)btn.classList.add('on');
  document.getElementById('zone').innerHTML=TABS[key];
  if(key==='images')showImg(0,document.getElementById('im0'));
  if(key==='conteneurs')showCv(0,document.getElementById('cv0'));
  if(key==='volumes')showVol(0,document.getElementById('v0'));
  if(key==='ports')setTimeout(()=>drawPort(9000),50);
  if(key==='commandes')buildCmds();
}

tab('intro',document.querySelector('.nb'));

