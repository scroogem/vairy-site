#!/usr/bin/env python3
"""Build the static GitHub Pages site. No dependencies: python3 tools/build_site.py."""
from pathlib import Path
from html import escape
from datetime import date
from hashlib import sha256
import json

ROOT = Path(__file__).resolve().parents[1]
ASSET_VERSIONS = {name: sha256((ROOT/'assets/site'/name).read_bytes()).hexdigest()[:10] for name in ('site.css', 'site.js')}
PAGES = {
    'aperto': ('index.html', '/', 'Aperto — Make it yours.', 'A free manual iPhone camera. ISO, shutter, white balance, focus, Natural RAW and practical photography lessons.'),
    'me': ('me/index.html', '/me/', 'Maksim Logvinov — Independent product builder', 'Product thinking made tangible. Independent apps, product decisions and the work of Maksim Logvinov. Based in France.'),
    'projects': ('projects/index.html', '/projects/', 'Projects — Vairy', 'Explore Aperto, Tryio and Vairy: independent apps, real experiments and product case studies.'),
    'tryio': ('tryio/index.html', '/tryio/', 'Tryio — Practice, feedback, another try', 'The product case behind Tryio: contextual conversation practice, a separate AI coach, completed-session measurement and solo App Store delivery.'),
    'vairy': ('vairy/index.html', '/vairy/', 'Vairy — A place to start the conversation', 'A social discovery experiment by Maksim Logvinov. Original app artifacts and product context.'),
    'support': ('support.html', '/support.html', 'Support — Vairy', 'Get help with Aperto, Tryio or Vairy. Contact the independent maker directly.'),
    'privacy': ('privacy.html', '/privacy.html', 'Tryio — Privacy Policy', 'Privacy policy for Tryio.'),
    'terms': ('terms.html', '/terms.html', 'Tryio — Terms & Conditions', 'Terms and conditions for Tryio.'),
    'aperto-privacy': ('aperto/privacy.html', '/aperto/privacy.html', 'Aperto — Privacy Policy', 'Privacy policy for Aperto, the free manual iPhone camera.'),
    'aperto-support': ('aperto/index.html', '/aperto/', 'Aperto — Support', 'Answers about RAW, Night mode, editing and Camera Control in Aperto.'),
    '404': ('404.html', '/404.html', 'Page not found — Vairy', 'Find Aperto, projects or Maksim’s portfolio.'),
}
ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>'
products = json.loads((ROOT/'site/products.json').read_text())
COMPANION_NOTES = {
    'aperto': 'The real camera interface is on the right. Open the image to switch between ASCII and the photograph.',
    'me': 'Three independent products. Tryio went from idea to App Store, built solo. The cases show the decisions behind the screens.',
    'projects': 'Each product opens its own page. Public beta links will appear when they are available.',
    'tryio': 'Tryio started as Talky. Scroll down for the original practice, coaching and session-review screens.',
    'vairy': 'A match is the beginning. The original chat shows interest-based prompts beside the message composer.',
}
for name, product in products.items():
    url = product['testflight']
    if url and not url.startswith('https://testflight.apple.com/join/'):
        raise ValueError(f'{name}: expected a public TestFlight join URL')

def render(page, route, title, description, body):
    def nav(name, href, label):
        active = page == name or (name == 'projects' and page in ('tryio','vairy'))
        return f'<a href="{href}"'+(' aria-current="page"' if active else '')+f'>{label}</a>'
    icon = 'tryio-icon.png' if page in ('tryio','privacy','terms') else 'aperto-icon.png'
    image = 'https://vairyapp.com/assets/site/' + icon
    companion = ''
    if page in COMPANION_NOTES:
        companion = f'''<aside class="site-companion" aria-label="Studio companion">
    <div id="companion-note" class="companion-note" hidden><strong>Claudie</strong><p>{escape(COMPANION_NOTES[page])}</p></div>
    <button class="companion-button" aria-label="Claudie: show a note about this page" aria-expanded="false" aria-controls="companion-note"><svg viewBox="0 0 24 18" aria-hidden="true"><path d="M6 4h12v9H6zM4 6h2v5H4zM18 6h2v5h-2zM1 4h3v2H1zM20 4h3v2h-3zM2 2h2v2H2zM20 2h2v2h-2z"/><path class="companion-legs-a" d="M5 12h2v4H5zM12 12h2v4h-2z"/><path class="companion-legs-b" d="M9 12h2v4H9zM17 12h2v4h-2z"/><path class="companion-eyes" d="M8 7h2v3H8zM14 7h2v3h-2z"/></svg></button>
  </aside>'''
    return f'''<!doctype html>
<html lang="en" data-page="{page}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#10132b">
  <title>{escape(title)}</title>
  <meta name="description" content="{escape(description, quote=True)}">
  <link rel="canonical" href="https://vairyapp.com{route}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{escape(title, quote=True)}">
  <meta property="og:description" content="{escape(description, quote=True)}">
  <meta property="og:url" content="https://vairyapp.com{route}">
  <meta property="og:image" content="{image}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" type="image/png" href="/assets/site/{icon}">
  <link rel="preload" href="/assets/site/font-2.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="preload" href="/assets/site/doto-font.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="/assets/site/fonts.css">
  <link rel="stylesheet" href="/assets/site/site.css?v={ASSET_VERSIONS['site.css']}">
  <script src="/assets/site/site.js?v={ASSET_VERSIONS['site.js']}" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="header">
    <a class="brand" href="/" aria-label="Vairy — Aperto home">VAIRY<span aria-hidden="true"></span></a>
{('    '+companion+chr(10)) if companion else ''}    <nav aria-label="Main navigation">{nav('aperto','/','Aperto')}{nav('projects','/projects/','Projects')}{nav('me','/me/','Maksim')}</nav>
    <a class="contact-link" href="mailto:shblknmaks@gmail.com">Let’s talk<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a>
    <span class="reading-progress" aria-hidden="true"></span>
  </header>
  <main id="main">{body}</main>
  <footer class="footer"><a href="/me/">Made by Maksim Logvinov.</a><div><a href="/support.html">Support</a><a href="/aperto/privacy.html">Aperto privacy</a><a href="/privacy.html">Tryio privacy</a><a href="/terms.html">Terms</a></div><span>© {date.today().year} Vairy</span></footer>
</body>
</html>
'''

for page,(filename,route,title,description) in PAGES.items():
    source = ROOT/'site/pages'/f'{page}.html'
    body = source.read_text()
    aperto_url = products['aperto']['testflight'] or 'mailto:help@vairyapp.com?subject=Aperto%20beta'
    replacements = {
        '{{aperto_beta_url}}': escape(aperto_url, quote=True),
        '{{aperto_beta_label}}': 'Join TestFlight' if products['aperto']['testflight'] else 'Ask about beta',
        '{{archive_beta_status}}': 'Access links pending',
    }
    for token,value in replacements.items(): body = body.replace(token,value)
    if products['aperto']['testflight']:
        body = body.replace('The public TestFlight link is on its way.', 'The public beta is ready to try.').replace('Public beta link pending','TestFlight beta available')
    if page == 'projects':
        for name in ('tryio','vairy'):
            if products[name]['testflight']:
                body += f'<section class="archive-beta section"><a class="button" href="{escape(products[name]["testflight"],quote=True)}">{name.title()} · Join TestFlight{ARROW}</a></section>'
    target = ROOT/filename
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(render(page,route,title,description,body))
for old,new in [('m','/me/'),('talky','/tryio/')]:
    target=ROOT/old/'index.html'
    target.parent.mkdir(exist_ok=True)
    target.write_text(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Redirecting…</title><link rel="canonical" href="https://vairyapp.com{new}"><meta http-equiv="refresh" content="0;url={new}"></head><body><a href="{new}">Continue to {new}</a></body></html>\n')
urls=[route for _,route,_,_ in PAGES.values() if route != '/404.html']
(ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>https://vairyapp.com{url}</loc></url>\n' for url in urls)+'</urlset>\n')
(ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: https://vairyapp.com/sitemap.xml\n')
# Keep build sources and internal design context out of GitHub Pages output.
(ROOT/'_config.yml').write_text('exclude:\n  - site\n  - tools\n  - PRODUCT.md\n  - DESIGN.md\n  - README.md\n  - .impeccable\n')
print(f'Built {len(PAGES)} pages, 2 aliases and sitemap.')
