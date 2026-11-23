from pathlib import Path
from playwright.sync_api import sync_playwright
import time, json, urllib.request

ROOT=Path.home()/'projects'/'blutec-puppy-clone'
BASE='http://127.0.0.1:5173'
API='http://127.0.0.1:8080/api/puppies'
errors=[]
def ready(url, retries=40):
    for i in range(retries):
        try:
            with urllib.request.urlopen(url,timeout=4) as response:
                if response.status==200:
                    return True
        except Exception:
            time.sleep(.8)
    return False
assert ready(BASE), 'Frontend not ready'
assert ready(API), 'Java API not ready'
print('SERVICES_READY')
with sync_playwright() as playwright:
    browser=playwright.chromium.launch(
        executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        headless=True, args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':900})
    page.on('pageerror', lambda err:errors.append('JavaScript '+str(err)))
    for route in ['/','/puppies','/puppies/maltipoo-max-male','/gone-home',
                  '/happy-families','/how-it-works','/faq','/contact']:
        response=page.goto(BASE+route,wait_until='networkidle',timeout=30000)
        assert response.status==200, f'Route {route} HTTP {response.status}'
        assert page.locator('h1').count()>0, f'No page title at {route}'
        print('ROUTE_OK',route)
    page.goto(BASE+'/puppies',wait_until='networkidle')
    assert page.locator('.puppy-card').count()==15, 'Available cards should be 15'
    page.get_by_placeholder('Search puppies by name or breed...').fill(' MAX ')
    assert page.locator('.puppy-card').count()==1,'Search by Max failed'
    page.get_by_placeholder('Search puppies by name or breed...').fill('')
    page.get_by_role('button',name='Korean Teacup').click()
    assert page.locator('.puppy-card').count()>0
    page.get_by_role('button',name='Shih Tzu').click()
    assert page.get_by_text('No puppies found').is_visible(), 'Filter empty state missing'
    page.locator('.empty-state').get_by_role('button',name='Clear filters').click()
    assert page.locator('.puppy-card').count()==15, 'Clear filters does not reset all'
    page.locator('.puppy-card').first.click()
    assert '/puppies/' in page.url, 'Puppy details link broken'
    print('CATALOGUE_SEARCH_FILTER_RESET_AND_PROFILE_OK')
    page.goto(BASE+'/faq',wait_until='networkidle')
    questions=page.locator('.faq-question')
    assert questions.count() == 9
    questions.nth(1).click()
    assert page.locator('.faq-row.expanded').count()==1
    page.get_by_placeholder('Search your question...').fill('vaccinated')
    assert page.locator('.faq-question').count()>=1
    print('FAQ_OK')
    page.goto(BASE+'/happy-families',wait_until='networkidle')
    assert page.locator('.family-tile').count()==64
    page.locator('.family-tile').first.click()
    assert page.locator('.lightbox').is_visible()
    page.get_by_role('button',name='Next photo').click()
    assert page.locator('.lightbox-count').inner_text().startswith('2 ')
    page.keyboard.press('Escape')
    assert page.locator('.lightbox').count()==0
    print('GALLERY_OK')
    page.goto(BASE+'/contact?puppy=maltipoo-max-male',wait_until='networkidle')
    assert page.locator('select[name="puppySlug"]').input_value()=='maltipoo-max-male'
    page.get_by_label('Your name').fill('Integration Tester')
    phone=page.get_by_label('Phone number')
    phone.fill('bad-number')
    assert phone.evaluate('(el)=>el.validity.valid') is False
    assert phone.evaluate('(el)=>el.validationMessage')!=''
    phone.fill('+971501234567')
    assert phone.evaluate('(el)=>el.validity.valid') is True
    page.get_by_label('Email address').fill('browser-test@example.com')
    page.get_by_label('Area').fill('Dubai')
    page.locator('textarea[name="message"]').fill('Automated local integration verification')
    page.get_by_role('button',name='Send my little letter').click()
    page.locator('.form-result.success').wait_for(timeout=20000)
    assert 'saved in this demo' in page.locator('.form-result.success').inner_text().lower()
    print('CONTACT_VALIDATION_AND_POSTGRES_ENQUIRY_OK')
    page.goto(BASE+'/',wait_until='networkidle')
    assert page.locator('a[href*="wa.me/"]').count()==0, 'Wrong external WhatsApp destination'
    page.get_by_role('link',name='Send an enquiry').first.click()
    assert page.url.endswith('/contact'), 'Contact CTA not linked properly'
    print('CONTACT_LINKS_OK')
    for width,height in [(390,844),(768,1024)]:
        mobile=browser.new_page(viewport={'width':width,'height':height},is_mobile=True,has_touch=True)
        mobile.on('pageerror', lambda err:errors.append('Mobile JS '+str(err)))
        for route in ['/','/puppies','/contact','/how-it-works']:
            response=mobile.goto(BASE+route,wait_until='networkidle',timeout=30000)
            dims=mobile.evaluate('({body:document.body.scrollWidth,screen:window.innerWidth})')
            assert response.status==200
            assert dims['body']<=dims['screen']+5, f'Horizontal overflow at {width}px {route}: {dims}'
        mobile.goto(BASE+'/',wait_until='networkidle')
        if mobile.locator('button.hamburger').is_visible():
            mobile.get_by_role('button',name='Open menu').click()
            assert mobile.locator('.mobile-nav').count()==1
        mobile.close()
        print('RESPONSIVE_OK',width)
    browser.close()
print('PAGE_ERRORS',errors)
assert not errors, errors
print('END_TO_END_PASS')
