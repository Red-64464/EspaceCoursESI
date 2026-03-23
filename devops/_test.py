from playwright.sync_api import sync_playwright
import os

workspace = r'c:\Users\rayan\Desktop\EspaceCoursESI\devops'
output = r'c:\Users\rayan\Desktop\EspaceCoursESI\output\playwright'

os.makedirs(output, exist_ok=True)

files_to_test = [
    ('td03_docker_complet.html', ['intro', 'images', 'conteneurs', 'dockerfile', 'ports', 'volumes', 'commandes']),
    ('td04_docker_compose_complet.html', ['intro', 'entrypoint', 'dockerignore', 'yaml', 'network', 'compose', 'commandes']),
    ('td05_nginx_devops_complet.html', ['concepts', 'commandes', 'proxy', 'lb', 'compose']),
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    for fname, tab_names in files_to_test:
        filepath = os.path.join(workspace, fname)
        page = browser.new_page(viewport={"width": 1200, "height": 900})
        page_errors = []
        
        page.on('pageerror', lambda exc: page_errors.append(str(exc)))
        
        page.goto('file:///' + filepath.replace(os.sep, '/'))
        page.wait_for_timeout(1500)
        
        name = fname.replace('.html', '')
        print(f'\n=== {fname} ===')
        
        # Check zone content
        zone = page.query_selector('#zone')
        buttons = page.query_selector_all('.nb')
        print(f'  Buttons: {len(buttons)}')
        print(f'  Zone exists: {zone is not None}')
        
        if zone:
            text = zone.inner_text()
            print(f'  Zone text length: {len(text)}')
        
        # Screenshot initial state
        page.screenshot(path=os.path.join(output, f'{name}_tab1.png'))
        print(f'  Screenshot 1 saved')
        
        # Click each tab and verify
        for i, btn in enumerate(buttons):
            if i >= len(tab_names):
                break
            btn.click()
            page.wait_for_timeout(600)
            
            zone = page.query_selector('#zone')
            text = zone.inner_text() if zone else ''
            has_content = len(text) > 20
            print(f'  Tab {i+1} ({tab_names[i]}): content={has_content} ({len(text)} chars)')
        
        # Screenshot after clicking last tab
        page.screenshot(path=os.path.join(output, f'{name}_tab_last.png'))
        print(f'  Screenshot last tab saved')
        
        if page_errors:
            print(f'  ERRORS: {page_errors}')
        else:
            print(f'  No JS errors!')
        
        page.close()
    
    # Test devops.html with iframes
    print('\n=== devops.html (iframes) ===')
    page = browser.new_page(viewport={"width": 1200, "height": 1200})
    page_errors = []
    page.on('pageerror', lambda exc: page_errors.append(str(exc)))
    
    filepath = os.path.join(workspace, 'devops.html')
    page.goto('file:///' + filepath.replace(os.sep, '/'))
    page.wait_for_timeout(2500)
    
    page.screenshot(path=os.path.join(output, 'devops_main.png'))
    
    # Click on each tab in devops.html
    tab_buttons = page.query_selector_all('.tab-btn')
    print(f'  Tab buttons in devops.html: {len(tab_buttons)}')
    
    for i, btn in enumerate(tab_buttons):
        btn.click()
        page.wait_for_timeout(1000)
        
        # Get the active panel's iframe
        active = page.query_selector('.panel.active')
        if active:
            iframe_el = active.query_selector('iframe')
            if iframe_el:
                frame = iframe_el.content_frame()
                if frame:
                    zone = frame.query_selector('#zone')
                    btns = frame.query_selector_all('.nb')
                    text = zone.inner_text() if zone else ''
                    print(f'  Panel {i+1}: buttons={len(btns)}, zone_text={len(text)}')
                    
                    # Click second button in iframe
                    if len(btns) > 1:
                        btns[1].click()
                        page.wait_for_timeout(500)
                        zone2 = frame.query_selector('#zone')
                        text2 = zone2.inner_text() if zone2 else ''
                        print(f'    After click tab2: changed={text != text2}')
    
    page.screenshot(path=os.path.join(output, 'devops_nginx.png'))
    
    if page_errors:
        print(f'  ERRORS: {page_errors}')
    else:
        print(f'  No JS errors!')
    
    page.close()
    browser.close()

print('\nALL TESTS DONE!')
