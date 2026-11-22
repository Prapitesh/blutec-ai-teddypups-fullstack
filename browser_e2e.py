from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path.home()/'projects'/'blutec-puppy-clone'
base='http://127.0.0.1:5173'
routes=['/','/puppies','/puppies/maltipoo-max-male','/gone-home','/happy-families','/how-it-works','/faq','/contact']
problems=[]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe',headless=True,args=['--no-sandbox'])
    desktop=browser.new_page(viewport={'width':1440,'height':900})
    desktop.on('pageerror',lambda err:problems.append(str(err)))
    for route in routes:
        res=desktop.goto(base+route,wait_until='networkidle',timeout=18000)
        title=desktop.locator('h1').first.inner_text(timeout=10000)
        print('PAGE',route,res.status,title[:60])
        if res.status!=200:problems.append('Route '+route+' status '+str(res.status))
    desktop.goto(base+'/',wait_until='networkidle')
    desktop.screenshot(path=str(root/'local-home-updated.png'))
    desktop.goto(base+'/puppies',wait_until='networkidle')
    desktop.screenshot(path=str(root/'local-puppies-updated.png'))
    desktop.get_by_placeholder('Search puppies by name or breed...').fill('Max')
    print('FILTER_MATCHES',desktop.locator('.puppy-card').count())
    assert desktop.locator('.puppy-card').count()==1
    desktop.locator('.puppy-card').first.click()
    assert '/puppies/maltipoo-max-male' in desktop.url
    print('DETAIL_NAVIGATION',desktop.url)
    desktop.goto(base+'/faq',wait_until='networkidle')
    desktop.get_by_role('button',name='Can I meet a puppy before I decide?').click()
    print('FAQ_EXPANDED',desktop.locator('.faq-row.expanded').count())
    desktop.goto(base+'/happy-families',wait_until='networkidle')
    desktop.locator('.family-tile').first.click()
    print('LIGHTBOX_OPEN',desktop.locator('.lightbox').count())
    desktop.locator('.lightbox-close').click()
    desktop.goto(base+'/contact',wait_until='networkidle')
    desktop.screenshot(path=str(root/'local-contact-updated.png'))
    desktop.locator('input[name=name]').fill('Browser Test')
    desktop.locator('input[name=phone]').fill('+971501234567')
    desktop.locator('input[name=email]').fill('browser-test@example.com')
    desktop.locator('textarea[name=message]').fill('Browser integration test')
    desktop.get_by_role('button',name='Send my little letter').click()
    desktop.locator('.form-result').wait_for(timeout=20000)
    print('CONTACT_FORM',desktop.locator('.form-result').inner_text())
    assert 'success' in desktop.locator('.form-result').get_attribute('class')
    mobile=browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
    mobile.on('pageerror',lambda err:problems.append('mobile '+str(err)))
    for route in ['/','/puppies','/contact','/how-it-works']:
        res=mobile.goto(base+route,wait_until='networkidle',timeout=18000)
        bounds=mobile.evaluate('({body:document.body.scrollWidth,view:window.innerWidth})')
        print('MOBILE',route,'http',res.status,'width',bounds)
        if bounds['body']>bounds['view']+5:problems.append('mobile overflow '+route+' '+str(bounds))
    mobile.goto(base+'/',wait_until='networkidle')
    mobile.get_by_role('button',name='Open menu').click()
    print('MOBILE_MENU',mobile.locator('.mobile-nav').count())
    mobile.screenshot(path=str(root/'local-mobile.png'))
    browser.close()
print('BROWSER_ERRORS',problems)
if problems:raise SystemExit(2)
print('E2E PASS')
