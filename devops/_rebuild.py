import re, os

downloads = r'c:\Users\rayan\Downloads'
workspace = r'c:\Users\rayan\Desktop\EspaceCoursESI\devops'

files = [
    'td03_docker_complet.html',
    'td04_docker_compose_complet.html',
    'td05_nginx_devops_complet.html',
]

header = '''<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap");
:root {
  --font-sans: "Lexend", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --color-background-primary: #2a2723;
  --color-background-secondary: #332f2b;
  --color-background-info: #183448;
  --color-border-secondary: #57514b;
  --color-border-tertiary: #48423d;
  --color-border-info: #2a5f83;
  --color-text-primary: #f3ede3;
  --color-text-secondary: #b8aea0;
  --color-text-tertiary: #888780;
  --color-text-info: #8fd3ff;
}
html, body {
  margin: 0;
  padding: 0;
  background: #1f1d1a;
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}
body { padding: 22px; }
body, div { font-family: var(--font-sans, sans-serif); }
svg { max-width: 100%; height: auto; }
a { color: #8fd3ff; }
</style>
'''

footer = '''
</body>
</html>
'''

for fname in files:
    src = os.path.join(downloads, fname)
    dst = os.path.join(workspace, fname)
    
    with open(src, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.strip()
    
    # Force dark-mode colors for syntax highlighting (since we use dark background)
    content = content.replace('.kw{color:#534AB7;font-weight:500}', '.kw{color:#AFA9EC;font-weight:500}')
    content = content.replace('.fl{color:#185FA5;font-weight:500}', '.fl{color:#85B7EB;font-weight:500}')
    content = content.replace('.st{color:#0F6E56}', '.st{color:#5DCAA5}')
    content = content.replace('.nm{color:#993C1D}', '.nm{color:#F0997B}')
    # Handle TD05 which has spaces in CSS
    content = content.replace('.kw{color:#534AB7;font-weight:500} ', '.kw{color:#AFA9EC;font-weight:500} ')
    content = content.replace('.fl{color:#185FA5;font-weight:500} ', '.fl{color:#85B7EB;font-weight:500} ')
    content = content.replace('.st{color:#0F6E56} ', '.st{color:#5DCAA5} ')
    
    # Force dark pill colors
    content = content.replace('.pb{background:#E6F1FB;color:#0C447C}', '.pb{background:#0C447C;color:#B5D4F4}')
    content = content.replace('.pg{background:#E1F5EE;color:#085041}', '.pg{background:#085041;color:#9FE1CB}')
    content = content.replace('.pp{background:#EEEDFE;color:#3C3489}', '.pp{background:#3C3489;color:#CECBF6}')
    content = content.replace('.pa{background:#FAEEDA;color:#633806}', '.pa{background:#633806;color:#FAC775}')
    content = content.replace('.pc{background:#FAECE7;color:#712B13}', '.pc{background:#712B13;color:#F5C4B3}')
    content = content.replace('.pr{background:#FCEBEB;color:#791F1F}', '.pr{background:#791F1F;color:#F7C1C1}')
    # TD05 different pill classes
    content = content.replace('.pb{background:#E6F1FB;color:#0C447C} ', '.pb{background:#0C447C;color:#B5D4F4} ')
    content = content.replace('.pg{background:#E1F5EE;color:#085041} ', '.pg{background:#085041;color:#9FE1CB} ')
    content = content.replace('.pp{background:#EEEDFE;color:#3C3489} ', '.pp{background:#3C3489;color:#CECBF6} ')
    content = content.replace('.pa{background:#FAEEDA;color:#633806} ', '.pa{background:#633806;color:#FAC775} ')
    content = content.replace('.pc{background:#FAECE7;color:#712B13} ', '.pc{background:#712B13;color:#F5C4B3} ')
    
    # Remove @media(prefers-color-scheme:dark) blocks (we already use dark colors)
    content = re.sub(
        r'@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}',
        '',
        content
    )
    
    # Wrap the main content div in a container with nice styling
    content = content.replace(
        '<div style="padding:1rem 0">',
        '<div style="max-width:1120px;margin:0 auto;padding:22px 24px;background:linear-gradient(180deg,#2a2723 0%,#26231f 100%);border:1px solid #413b35;border-radius:28px;box-shadow:0 20px 60px rgba(0,0,0,0.35)">'
    )
    
    result = header + content + footer
    
    with open(dst, 'w', encoding='utf-8') as f:
        f.write(result)
    
    print(f'Written: {fname} ({len(result)} chars)')

print('All files written!')
