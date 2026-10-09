# Vairy · Pixel Studio

Static website for Aperto and the independent product work of Maksim Logvinov. Published through the existing GitHub Pages setup at vairyapp.com.

Routes: `/` Aperto, `/me/` portfolio (`/m/` alias), `/projects/` catalog, `/tryio/` case study (`/talky/` alias), `/vairy/` archive. Existing support and privacy URLs remain available.

## Build and preview

```sh
python3 tools/build_site.py
python3 tools/check_site.py
python3 -m http.server 57417 --bind 127.0.0.1
```

Edit page content in `site/pages/`. The build writes the static HTML files used by GitHub Pages. Shared styling, motion and assets live in `assets/site/`.

## Beta access

Set each product’s `testflight` in `site/products.json` to a real public `https://testflight.apple.com/join/…` URL, then run the build. Null means access is pending; Aperto offers direct email contact. No signup service or simulated form submission.

## Motion and evidence

Finite entrance animations, scroll-driven depth, a pointer focus frame and the interactive ASCII/photo shutter. Claudie, a small pixel companion in the shared header, has a finite arrival, pointer-aware eyes and authored page notes. It uses no external AI service. The six-blade shutter opens the photo from ASCII. A pointer lens uses the adapted Shaders Bulge formula through WebGPU with a Canvas fallback. The canvas caches photo and glyph layers; rendering stops while idle, offscreen or hidden. The OS reduced-motion preference is respected. There are no public animation settings.

App imagery comes from actual app screenshots and existing product artifacts, including Tryio’s original release poster, early Talky practice captures and Vairy’s match/chat flow. See `assets/site/CREDITS.md`. The mobile screenshot reel supports touch scrolling and left/right arrow keys. Tryio’s separate exchange is explicitly illustrative. Claims and historical status are grounded in the inspected product source and professional CV.

The build sources and internal product/design documentation are excluded from the GitHub Pages output in `_config.yml`.

Interactive screens switch between the original Camera, Edit and Learn captures. A labelled light study demonstrates brightness and a qualitative cool/warm tint independently of Aperto processing. Original screenshots open in a native dialog with keyboard navigation and focus restoration. Portfolio capabilities link directly to product evidence. Tryio offers three authored conversational examples, labelled illustrative; these make no AI request. All new visual effects are demand driven and respect reduced motion.
