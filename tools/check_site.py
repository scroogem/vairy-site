#!/usr/bin/env python3
"""Check generated routes, local resources, fragments and release-link configuration."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json, re, sys
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.refs=[];self.ids=set();self.headings=0;self.canonical=[];self.stack=[];self.errors=[]
        self.feed(text)
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if attrs.get('id'):self.ids.add(attrs['id'])
        if tag=='h1':self.headings+=1
        if tag=='link' and attrs.get('rel')=='canonical':self.canonical.append(attrs['href'])
        for key in ('href','src'):
            if attrs.get(key):self.refs.append(attrs[key])
        self.refs.extend('#'+value for value in attrs.get('aria-controls','').split())
        if tag not in ('area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'):self.stack.append(tag)
    def handle_endtag(self,tag):
        if not self.stack or self.stack[-1]!=tag:self.errors.append('Unexpected closing '+tag)
        else:self.stack.pop()
files=['index.html','me/index.html','m/index.html','projects/index.html','tryio/index.html','vairy/index.html','talky/index.html','support.html','privacy.html','terms.html','aperto/index.html','aperto/privacy.html','404.html']
pages={file:Page((ROOT/file).read_text()) for file in files}
failures=[]
for file,page in pages.items():
    if page.errors or page.stack:failures.append(f'{file}: unbalanced HTML {page.errors} {page.stack}')
    if file not in ('m/index.html','talky/index.html') and page.headings!=1:failures.append(f'{file}: expected one h1')
    if len(page.canonical)!=1:failures.append(f'{file}: expected one canonical')
    for ref in page.refs:
        url=urlsplit(ref)
        if url.scheme or url.netloc:continue
        target=(ROOT/unquote(url.path.lstrip('/'))) if url.path.startswith('/') else ROOT/file.rsplit('/',1)[0]/url.path if '/' in file else ROOT/url.path
        if not url.path:target=ROOT/file
        if target.is_dir():target/='index.html'
        if not target.exists():failures.append(f'{file}: missing {ref}')
        elif url.fragment and target.suffix=='.html':
            parsed=pages.get(str(target.relative_to(ROOT))) or Page(target.read_text())
            if url.fragment not in parsed.ids:failures.append(f'{file}: missing fragment {ref}')
    text=(ROOT/file).read_text()
    if '{{' in text or 'PLACEHOLDER' in text:failures.append(f'{file}: unresolved placeholder')
    if re.search(r'data-motion-toggle|id="motion-toggle"|id="image-reveal"',text):failures.append(f'{file}: unwanted settings')
for file in ['assets/site/site.css','assets/site/fonts.css']:
    for ref in re.findall(r'url\([\'\"]?([^\)\'\"]+)',(ROOT/file).read_text()):
        if not (ROOT/file).parent.joinpath(ref).exists():failures.append(f'{file}: missing {ref}')
css=(ROOT/'assets/site/site.css').read_text()
if css.count('{')!=css.count('}'):failures.append('CSS braces are unbalanced')
for product,data in json.loads((ROOT/'site/products.json').read_text()).items():
    if data['testflight'] and not data['testflight'].startswith('https://testflight.apple.com/join/'):failures.append(f'{product}: invalid TestFlight URL')
if failures:
    print('\n'.join(failures));sys.exit(1)
print(f'PASS: {len(files)} pages/aliases; local links, assets, fragment targets, HTML structure, canonical metadata, beta configuration.')
