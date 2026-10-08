---
name: "Vairy · Pixel Studio"
description: "Independent products made tangible through pixels, real artifacts, and optical interaction."
colors:
  orange: "#ff895a"
  cyan: "#8cd9e6"
  mint: "#d0f291"
  ink: "#edf0ff"
  muted: "#b5bde3"
  ground: "#10132b"
  surface: "#1a2040"
  line: "#41496e"
  optical-ground: "#14172d"
  ascii-ground: "#14182f"
  maker-lavender: "#c6cef3"
  maker-ink: "#181e44"
  tryio-peach: "#ffb296"
  tryio-peach-ink: "#282646"
  learning-mint: "#d1f094"
  learning-ink: "#1c263d"
  partner-paper: "#ecf6d2"
  human-surface: "#242e4b"
  human-ink: "#edf3ff"
  catalog-mint: "#d2f294"
  catalog-surface: "#1c2c45"
  button-ink: "#1b162c"
  shutter-ink: "#2a1730"
  phone-ground: "#080911"
  phone-frame: "#3b3e58"
  editor-ground: "#23284b"
typography:
  display:
    fontFamily: "Doto, Onest, sans-serif"
    fontSize: "clamp(70px, 7vw, 96px)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  hero-promise:
    fontFamily: "Onest, sans-serif"
    fontSize: "clamp(36px, 4.3vw, 62px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Onest, sans-serif"
    fontSize: "clamp(40px, 5vw, 72px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  maker-display:
    fontFamily: "Onest, sans-serif"
    fontSize: "clamp(56px, 7.3vw, 96px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  work-title:
    fontFamily: "Onest, sans-serif"
    fontSize: "48px"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  project-title:
    fontFamily: "Onest, sans-serif"
    fontSize: "56px"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  catalog-wordmark:
    fontFamily: "Doto, Onest, sans-serif"
    fontSize: "40px"
    fontWeight: 700
  body:
    fontFamily: "Onest, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  prose-body:
    fontFamily: "Onest, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
  message:
    fontFamily: "Onest, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "Onest, sans-serif"
    fontSize: "13px"
    fontWeight: 600
  navigation:
    fontFamily: "Onest, sans-serif"
    fontSize: "13px"
    fontWeight: 400
  chip:
    fontFamily: "Onest, sans-serif"
    fontSize: "12px"
    fontWeight: 400
  label:
    fontFamily: "Onest, sans-serif"
    fontSize: "11px"
    fontWeight: 400
rounded:
  square: "0px"
  chip: "4px"
  conversation: "12px"
  phone: "13% / 6%"
  phone-image: "12% / 5.5%"
  circle: "50%"
spacing:
  phone-inset: "6px"
  small-gap: "12px"
  button-block: "14px"
  message-inline: "18px"
  compact-inset: "20px"
  button-inline: "22px"
  mobile-gutter: "24px"
  medium-gap: "28px"
  large-gap: "36px"
  section-mobile: "54px"
  section-tablet: "68px"
  section-desktop: "96px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.button-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "14px 22px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.mint}"
  underlined-link:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
    padding: "0 0 7px"
  navigation:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
    padding: "12px 0"
  shutter:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.shutter-ink}"
    rounded: "{rounded.circle}"
    size: "90px"
  shutter-pressed:
    backgroundColor: "{colors.mint}"
  decision-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.chip}"
    padding: "13px 17px"
  decision-chip-selected:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.ground}"
  project-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "34px 0"
    width: "100%"
  work-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "36px 0"
    width: "100%"
  catalog-tryio-art:
    backgroundColor: "{colors.catalog-surface}"
    textColor: "{colors.catalog-mint}"
    typography: "{typography.catalog-wordmark}"
    rounded: "{rounded.square}"
    height: "180px"
  conversation-card:
    backgroundColor: "{colors.learning-mint}"
    textColor: "{colors.learning-ink}"
    rounded: "{rounded.conversation}"
    padding: "26px"
  human-message:
    backgroundColor: "{colors.human-surface}"
    textColor: "{colors.human-ink}"
    typography: "{typography.message}"
    rounded: "{rounded.conversation}"
    padding: "15px 18px"
---

# Design System: Vairy · Pixel Studio

## Overview

**Creative North Star: "Pixel Studio"**

Pixel Studio makes independent product work feel physical: an indigo optical stage, a lavender maker stage, a warm shutter, a mint learning demonstration, and broad editorial project rows. Doto gives names and selected phrases a pixel texture; Onest carries promises, facts, controls, and reading.

Real product artifacts lead the composition. Full app screens occupy tilted planes, a photograph becomes ASCII, and the shutter opens the photograph from the pointer. Depth comes from perspective, finite arrivals, scroll position, and direct interaction. The approved working Pixel Studio is the authority for this implementation.

Values are extracted from the final shared CSS cascade, font declarations, JavaScript, and generated static pages on 2026-10-08. This extraction does not establish publishing status or measured browser performance. PRODUCT.md and the approved surface briefs supply the image, motion, route, and evidence constraints. The inherited `.impeccable/config.json` exploration preference remains unchanged; the approved implementation is code-led.

**Key Characteristics:**

- Pixel display lettering paired with clear supporting type.
- Indigo ground with lavender, orange, mint, cyan, and peach used for distinct roles.
- Whole genuine app screens, existing photographs, and explicitly labeled illustrations.
- Broad bordered rows, restrained corner rounding, and a circular shutter.
- Finite entrances and scroll or pointer-driven depth.

## Colors

The palette combines a deep optical ground, pale readable text, and saturated accents assigned to specific interactions or stages. The frontmatter preserves the source values, including the deliberately different mint shades; the sidecar's tonal strips are synthesized previews, not shipped CSS tokens.

### Primary

- **Shutter Orange** (`orange`): primary actions, shutter, current-navigation underline, keyboard focus, selection, and reading progress.
- **Optical Cyan** (`cyan`): camera annotations, capabilities, product status, decision selection, and reading links.

### Secondary

- **Action Mint** (`mint`): the pressed shutter and primary-action hover.
- **Learning Mint / Learning Ink** (`learning-mint`, `learning-ink`): the Tryio illustrative conversation surface and its text.
- **Partner Paper / Human Surface / Human Ink** (`partner-paper`, `human-surface`, `human-ink`): distinct partner and user messages inside that study.
- **Catalog Mint / Catalog Surface** (`catalog-mint`, `catalog-surface`): the pixel Tryio catalog artifact.

### Tertiary

- **Maker Lavender / Maker Ink** (`maker-lavender`, `maker-ink`): the full maker stage and its dark typography.
- **Tryio Peach / Peach Ink** (`tryio-peach`, `tryio-peach-ink`): the tilted typographic Tryio artifact in the maker composition.

### Neutral

- **Indigo Ground / Raised Indigo / Structural Line** (`ground`, `surface`, `line`): page ground, decision art and hover wipes, and one-pixel rules.
- **Pale Ink / Muted Ink** (`ink`, `muted`): primary and supporting text.
- **Optical Ground / ASCII Ground** (`optical-ground`, `ascii-ground`): the photo study's initial CSS and cached canvas grounds.
- **Phone Ground / Phone Frame / Editor Ground** (`phone-ground`, `phone-frame`, `editor-ground`): the app-screen surround, crisp frame ring, and editor evidence stage.
- **Button Ink / Shutter Ink** (`button-ink`, `shutter-ink`): dark text and icon colors on the orange controls.

One-off optical washes, alpha borders, and caption colors remain in source snippets rather than becoming a second general palette. Global `color-scheme: dark` and the orange-on-indigo scrollbar belong to the shared chrome; the maker stage sets its own light surface and dark text.

## Typography

**Display Font:** Doto, with Onest and sans-serif fallbacks. Only weight 700 is declared for Doto.

**Body Font:** Onest, with a sans-serif fallback. Self-hosted TrueType files declare weights 400, 500, 600, 700, and 800, all with `font-display: swap`; font synthesis is disabled. Normal font styles are used.

**Character:** Pixel names and selected phrases carry the expressive voice. Supporting Onest remains compact, specific, and readable. Headings balance their wraps and use tight negative tracking.

### Hierarchy

The frontmatter carries the desktop roles. Responsive overrides below are the final values after the complete stylesheet cascade.

| Role | Application and responsive behavior |
| --- | --- |
| `display` | Aperto name. At ≤1100px: 80px; ≤800px: 74px; ≤540px: 68px. |
| `hero-promise` | “Make it yours.” At ≤1100px: 44px; ≤800px: 37px; ≤540px: 33px. |
| `headline` | Shared section headings. At ≤800px: 48px; ≤540px: 39px. Specialized headings keep their own source sizes. |
| `maker-display` | Maker name in Onest, followed by Doto surname at weight 700. At ≤1100px: 78px; ≤800px: 82px; ≤540px: 60px with tracking −.035em. |
| `work-title` | Portfolio row titles. At ≤800px: 39px; ≤540px: 42px. |
| `project-title` | Catalog product titles. At ≤800px: 45px; ≤540px: 36px. |
| `catalog-wordmark` | Tryio tile. Desktop 40px; ≤800px 28px; ≤540px 18px. This is the final bounded correction. |
| `body` | Shared 15px supporting copy; component-specific copy spans 12–18px. Default paragraphs use a 1.55 line height. |
| `prose-body` | Legal/support reading at a 1.8 line height and maximum 72ch; ≤540px uses 14px. |
| `message` | Tryio messages; ≤540px uses 13px, keeping a 1.5 line height. |
| `button`, `navigation`, `chip`, `label` | Compact control and annotation roles. Final navigation is 12px at both ≤800px and ≤540px; chips become 11px on mobile. |

Other established display treatments: Tryio and Vairy product names use Doto at 96px on desktop. Tryio scales to 82px at ≤1100px, 84px at ≤800px, and 75px at ≤540px; its Onest promise is 56/46/46/40px. Vairy uses 96/96/84/72px, with its supporting promise at 50/43/46/37px. The catalog introduction uses Onest `clamp(56px, 6.7vw, 96px)` and a Doto continuation, then 70px at ≤800px and 45px at ≤540px (44px continuation). No fixed modular type ratio is imposed by the source.

**The Pixel Emphasis Rule.** Use Doto for product names and selected expressive phrases. Keep facts, controls, navigation, and reading in Onest.

## Layout

The system uses full-width stages and generous editorial sections. Desktop sections have percentage gutters (6.2%) and a broad vertical rhythm; two-column evidence, learning, contact, and decision layouts usually use a 9% gap. There is no universal fixed-width marketing container. Reading pages use a narrower centered measure (780px outer maximum, 24px inline padding, 72ch text maximum).

| Final range | Header | Section gutter / block padding | Optical stage | Maker stage |
| --- | --- | --- | --- | --- |
| >1100px | 82px high, 44px inline padding | 6.2% / 96px | `calc(100svh - 82px)`, min 670px, max 1050px | `calc(100svh - 82px)`, min 700px, max 1040px |
| 801–1100px | 82px high, 30px inline padding | 6.2% / 96px | Same stage bounds | Same stage bounds |
| 541–800px | 70px high, 24px inline padding | 7% / 68px | 790px high | 1080px high |
| ≤540px | 64px high, 20px inline padding | 24px / 54px | 790px high | 1035px high |

The ≤800px boundary hides the header contact link and moves Tryio, the learning stage, and the Vairy stage to one column. Camera evidence and decisions remain two columns until ≤540px; beta/contact, release facts, access strips, and decisions then stack. Mobile maker artifacts remain a spatial composition below the maker heading and proof list.

Catalog rows use an artifact / copy / arrow grid: 200px / 1fr / auto with a 70px gap; at ≤1100px the artifact column becomes 160px with a 45px gap; at ≤800px it becomes 130px with a 25px gap; at ≤540px it becomes 78px / 1fr / 20px with a 20px gap. Artifact heights are 180/160/150/115px across those ranges. Portfolio rows use 1fr / 1fr / auto with a 60px gap, then 32px, and finally a two-column mobile layout with the description on the second row.

The phone source proportion is 1320:2868. The desktop hero uses 1000px perspective, a phone at 75% stage height, and 11% right offset; final tablet/mobile placement is at 36% from the top, with 47%/46% height. Whole screenshots are contained within the frame. The learning spread is 570px high at desktop, 480px at ≤1100px, 570px at ≤800px, and 450px at ≤540px. Final lesson planes are 88% high with 22px side insets; mobile uses 84% and 18px insets. Section clipping keeps the genuine screens inside their stages.

### Browser and route behavior

Pages are ordinary English static HTML documents. Anchors and content work without JavaScript; native canvas and Web Animations progressively add the interactions. The implementation uses `100svh`, CSS perspective, `clip-path`, `translate`, `overflow: clip`, `IntersectionObserver`, `ResizeObserver`, `requestAnimationFrame`, and the Web Animations API. This lists source requirements, not a measured compatibility matrix.

| Path | Surface |
| --- | --- |
| `/` | Aperto optical landing |
| `/aperto/` | Aperto explanation |
| `/me/` | Maker portfolio |
| `/m/` | Static meta-refresh alias with an ordinary link to `/me/` |
| `/projects/` | Product catalog |
| `/tryio/` | Historical Tryio case |
| `/talky/` | Static meta-refresh alias with an ordinary link to `/tryio/` |
| `/vairy/` | Vairy archive |
| `/support.html`, `/aperto/support.html` | Preserved support paths |
| `/privacy.html`, `/terms.html`, `/aperto/privacy.html` | Preserved legal paths |

Canonical URLs, page titles, descriptions, and shared metadata are generated per real path. Navigation does not use PJAX, an SPA router, or View Transitions. Self-hosted fonts and product imagery come from `/assets/site/`. Content templates in `site/pages/` and beta status in `site/products.json` produce the checked-in route documents through `tools/build_site.py`; styling and motion remain in the shared CSS and JS.

## Elevation & Depth

Structural surfaces are flat, with one-pixel rules and tonal hover wipes. Product planes carry perspective and localized drop shadows. The orange circular shutter has a deeper button shadow; the phone has a crisp two-pixel ring rather than a diffuse UI-card shadow.

### Shadow Vocabulary

| Role | Source value | Use |
| --- | --- | --- |
| Hero phone | `drop-shadow(17px 26px 24px #080b2580)` | Optical phone plane |
| Phone frame | `0 0 0 2px #3b3e58` | App-screen box shadow / frame ring |
| Shutter | `0 14px 34px #0000004d` | Circular optical action |
| Maker phone | `drop-shadow(10px 25px 20px #303c692e)` | Lavender-stage Aperto artifact |
| Editor phone | `drop-shadow(14px 21px 18px #080b255c)` | Camera editor evidence |
| Lesson phone | `drop-shadow(12px 24px 18px #060c2480)` | Two-plane learning spread |

**The Artifact Truth Rule.** Use genuine product artifacts and existing credited photography. Preserve whole Aperto interfaces; label the Tryio exchange as illustrative.

### Motion grammar

The shared easing is `cubic-bezier(.16,1,.3,1)`. Entrances are finite: hero type arrives over 950ms with a 16px move and masked lower edge; the lead artifact arrives over 1100ms after 100ms, resolving a 28px offset and 3px blur. Observed section arrivals take 850ms. Capability and format children take 600ms with 60ms stagger; work rows, project rows, and release facts reveal over 800ms. Intersection entries unobserve after the first arrival.

Scroll is the clock for phone depth: the source applies a 0.045 factor and clamps travel to ±22px, skipping planes outside a 100px viewport margin. Maker pointer parallax uses x/y factors of .025/.02, with a 240ms transform transition; touch does not drive the hover effect. Product artifacts use finite hover transforms, never perpetual float loops.

The optical study caches the photo and ASCII layers in native canvases and samples the existing photograph once per build. Display resolution is capped at 1.5× device pixels. Glyph cells are 10px, or 8px below a 600px stage width, with a 1.23 row-height factor. Active drawing follows `requestAnimationFrame`; it stops re-scheduling when settled, offscreen, or hidden. A source-defined scan pass lasts up to 1800ms at first arrival. These are implementation facts, not measured frame-rate claims.

The 50px focus frame follows the pointer immediately; only its opacity transitions (160ms). Its corners are 10px with a crisp one-pixel stroke. The photo aperture uses a 28ms time constant for position, the full reveal uses 155ms, and the hover aperture approaches a 66px radius over 60ms. Clicking toggles a real photograph reveal and a 250ms shutter wash. The phone responds through a 200ms transform transition.

Tryio reply swaps take 330ms; decision-art swaps take 320ms. Work/catalog hover wipes take 550ms and row movement takes 500ms; arrow moves take 250ms. The shutter scales over 350ms, and its icon rotates over 650ms when pressed.

**The Driven Motion Rule.** Motion follows entrance, scroll, pointer, or a deliberate action. Do not add perpetual float loops or public motion settings; honor the operating system preference.

`prefers-reduced-motion: reduce` cancels running entrance animations, suppresses depth and pointer motion, hides the focus frame and reading-progress line, removes smooth scrolling, and makes the shutter reveal immediate. CSS removes animations and effectively eliminates transitions; the phone rests at a 2° rotation. The internal `?still=1` capture flag disables JavaScript animation and is not a visible visitor setting.

## Shapes

The shared language is mostly square: editorial rows, evidence panels, primary link buttons, and decision art. Decision controls use small rounded corners (`chip`); the conversation surface and messages use softer corners (`conversation`). The shutter alone is circular (`circle`). Phone and image radii remain elliptical percentage radii (`phone`, `phone-image`) so their silhouettes scale with the actual screenshot proportion.

Borders are generally one pixel. The app-screen surround has 6px padding and the frame ring from the elevation vocabulary. Product icons retain their established rounded asset treatment. Viewfinder corners, the focus frame, and ASCII glyphs reinforce the optical/pixel material without rounding every surface.

## Components

### Primary actions and underlined links

Primary actions are compact square anchors with the source button role, a 50px minimum height, 30px content gap, and orange ground. Hover changes to action mint and lifts by 2px over 200ms. Underlined links keep a one-pixel current-color bottom border, a 24px icon gap, and a 5px arrow move over 200ms; the hero variant has a 44px minimum height and 8px top padding. Icons are inline stroked SVG, generally 18px inside actions.

All interactive anchors, buttons, and any fields use a 3px orange `:focus-visible` outline with 5px offset. Disabled buttons/fields use .55 opacity and a default cursor. The current website has no input field or signup form; beta contact is an ordinary email action while public links are pending.

### Navigation

The shared header keeps the VAIRY wordmark (Onest 800, desktop 23px, −.04em) and a 7px orange square. Three real page links sit between the brand and contact action. The current path has a two-pixel orange underline; hover turns links orange. The header shrinks and hides contact at the ≤800px boundary. A keyboard skip link becomes visible on focus. The thin fixed reading-progress line follows scroll and disappears for reduced motion.

### Optical shutter and focus frame

The shutter uses orange with dark optical ink, zero border, circular shape, and the exact inline iris SVG. The desktop diameter is 90px, compressed desktop 72px, tablet 76px, and mobile 64px; the icon is 70/56/56/49px. Hover scales to 1.08; active press scales to .94. `aria-pressed=true` changes the ground to mint and rotates the iris 60°. Its accessible name and visible caption describe the next action. The control is disabled until the image loads; a load failure leaves a retry message, and lack of a canvas context hides the shutter.

The surrounding study uses a credited photographic fallback, an aria-hidden canvas, optical shade, corner marks, actual camera screen, and an immediate pointer focus frame. Motion behavior is defined in Elevation & Depth. No public motion controls are present.

### App-screen planes

Whole genuine Aperto screenshots use 1320:2868 aspect ratio, contain sizing, a dark inset frame, and percentage radii. Editor and lesson planes keep the actual camera/editor/learning interface and their full content. Tilts, perspective, and the shadow vocabulary make the app artifact spatial. Captions identify the real interface. Preserve the original asset files, not cropped App Store posters.

### Editorial rows

Catalog and portfolio rows are broad anchors divided by one-pixel structural rules. Copy, actual or typographic artifact, and a directional arrow form one hit target. Hover draws the raised-indigo wipe from left to right, moves the row 6px, turns the title orange, and shifts the arrow by (4px, −4px). Responsive grid values are in Layout. The Tryio catalog tile is Doto typography, not a screenshot, with the exact three-size wordmark in Typography.

### Tryio conversation study

The learning-mint surface has the conversation radius and desktop 26px padding (23px compressed desktop, 21px mobile). The header separates “Coach & Partner” and “Illustrative exchange” with a subtle line. Partner paper sits left, a dark human message right, and a transparent bordered coach message fills the reading width. Messages have 15px 18px padding (13px 15px mobile); the message stack has a 305px minimum height, 18px gap, and 28px block padding, becoming 280px / 16px / 22px on mobile. The full-width next-reply action updates copy in an `aria-live=polite` region. This is a demonstration of the learning loop, not an app screenshot or validated result.

### Product decision chips and panel

Outlined decision buttons use structural lines, 4px corners, and 13px 17px padding. Selected buttons use cyan ground, indigo text, and cyan border; hover changes the border to cyan. The group uses `aria-pressed`, not a fabricated tabs role. On mobile it becomes a two-column button grid with 13px 10px padding. The raised-indigo art panel and explanatory text form the decision display, update together in a polite live region, and stack at ≤540px.

### Reading and support surfaces

The same palette and type pairing support simple readable documents. Prose links use cyan and underlines; long URLs wrap; headings and lists retain a clear text hierarchy. Support presents a direct email action. Existing support and legal routes remain linked in the shared footer.

## Do's and Don'ts

### Do:

- **Do** preserve the approved Pixel Studio composition and the distinct optical, maker, and learning stages.
- **Do** show the entire raw Aperto interface with contain sizing and the existing phone proportions.
- **Do** keep real navigation and content usable without JavaScript.
- **Do** use the source breakpoints and preserve the Tryio catalog wordmark at 40px, 28px, and 18px.
- **Do** keep keyboard focus visible and respect operating system reduced motion.
- **Do** preserve pending beta status until a real public URL is provided and verified.
- **Do** keep Tryio illustrations labeled, its closed experiment status explicit, and product claims grounded in evidence.

### Don't:

- **Don't** introduce AI-generated photography, fabricated screenshots, or App Store poster crops.
- **Don't** imply that the credited demo photographs were shot with Aperto.
- **Don't** add perpetual floating animations, visible motion toggles, or motion settings.
- **Don't** convert the static routes into PJAX, an SPA, or a View Transition navigation system.
- **Don't** invent active store access, growth results, validated confidence improvement, or engineering employment.
- **Don't** use the registration-speed reduction claim as an achievement.
- **Don't** treat the inherited buildPath=comp setting as evidence of a generated comp for this implementation.

