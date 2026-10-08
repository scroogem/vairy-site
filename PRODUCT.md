# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Photographers discovering Aperto and seeking beta access.
- Employers evaluating Maksim Logvinov's product judgment, delivery, and ability to build useful products.
- People exploring the author's other apps and projects.

## Product Purpose

Reorganize vairyapp.com around an Aperto landing page, an employer-facing personal portfolio at /me/, and a projects menu/catalog with real product links.

## Operating Context

Existing static HTML/CSS/JavaScript website, GitHub repository scroogem/vairy-site, GitHub Pages with CNAME vairyapp.com. Local checkout: /Users/maks/Documents/VAIRY/landing_page. Existing legal and support URLs must remain accessible. User asked to see visual concepts before implementation.

## Capabilities and Constraints

Aperto is a free manual iPhone camera for iOS 17+, built using SwiftUI and AVFoundation with no third-party dependencies. Manual ISO, shutter, white balance and focus; Natural RAW processing, night mode, macro, film styles, editor, Camera Control, and interactive photography lessons. Eleven interface languages. Optional one-time tips unlock additional icons; photography features are free. The last stored release record is version 1.2 build 6 submitted for App Review on 2026-09-25; current store status is unverified.

Public TestFlight links for Aperto and Tryio are pending: the user will provide them later. Do not fabricate links or present pending access as currently available. The old Vairy landing has https://testflight.apple.com/join/JVwUCaew; its present availability is unverified.

## Brand Commitments

Preserve the names Aperto, Vairy and Tryio and their existing product assets. The user wants expressive animation and product stories grounded in real achievements. Professional, specific writing, suitable for employers. Primary English copy follows existing site and professional CV; additional languages remain an open decision.

## Evidence on Hand

- Aperto README and AppStore/metadata.md under /Users/maks/Documents/Aperto.
- Actual composed App Store screenshots under AppStore/screenshots/en and ru. Viewfinder scenes use credited Unsplash simulation photos, not user photographs shot with Aperto.
- Existing Vairy screenshots in assets/images.
- Professional facts: /Users/maks/Documents/career-ops/cv.md, corroborated by Mem0 memories of the user's own statements.
- Maksim took Tryio from idea to App Store alone, with no team or funding; two pivots after feedback; a funnel dashboard; three App Review rejection cycles resolved. The CV records an unsuccessful acquisition experiment and subsequent shutdown. Treat this as historical context, not current verified availability. Do not imply proven growth, a current active release, or engineering employment.
- LinkedIn: https://www.linkedin.com/in/maksim-logvinov-94742040b; GitHub: https://github.com/scroogem. Public professional contact from CV: shblknmaks@gmail.com. Existing product support: help@vairyapp.com.
- Hearth is a peer-hosted Minecraft world project; current state requires verification before claiming completed capabilities.

## Product Principles

- Artifacts and specific decisions demonstrate ability.
- Every achievement, status, and endpoint must have evidence.
- Separate product discovery, personal hiring story, and project exploration while making navigation obvious.
- Preserve existing legal information and provide accessible, responsive, reduced-motion behavior.

## Portfolio editorial constraint
Do not use registration-speed reduction as an achievement or portfolio case. Ground the Tryio story in the actual product, user scenarios, learning mechanics, feedback, positioning, and product decisions.

## Tryio product evidence inspected on 2026-10-07

Source checkout: /Users/maks/Documents/VAIRY/Talky-v1 (last listed commits 2026-07-02).

- VairyDatingApp/screens/OnboardingScreen.js: contextual question; situation-specific opening; short practice; live feedback; initial assessment; optional save-progress step.
- VairyDatingApp/screens/PracticeScreen.js: goal-specific sessions; Empathy default; six primary goals with three behind More goals; Coach & Partner and Only Partner modes; core free goals and additional premium access.
- app.py, AI_COACH_PROMPTS and combined_system: guarded, short early partner replies; goal-specific behavior; coach evaluates only the latest human reply and gives a specific tip plus example. These are configured AI behaviors, not a guarantee of model compliance.
- VairyDatingApp/services/streakService.js and screens/PracticeChatScreen.js: streak advances on completed sessions with user participation.
- app.py, update_skills and admin NSM: feedback across confidence/empathy/flow/engagement; completed sessions per weekly active identity. Do not present AI feedback scores as validated real-world skill improvement.
- User explicitly rejects the registration-speed achievement. Portfolio leads with product decisions and user value. No numeric growth or confidence outcome is claimed.
- Public Apple App Store link id6773795148 returned Page not found in the US storefront on 2026-10-07. Do not add an active store or beta CTA until a working link is provided or verified.

## Imagery and concept workflow
Use original screenshots and existing photographs. The user rejects AI-generated photography. Show visual concepts as working browser prototypes before changing the actual site. Keep internal image-generation references out of user-facing outputs.

## Updated visual brief, 2026-10-07
The user rejected Gallery/Stories/Modules as too restrained. Wants an emotional first impression, original interface, expressive animation, fewer words, more concrete facts. ASCII is explicitly welcome. Build bold interactive browser concepts from original assets; no AI photography. Preserve the prohibition on the registration-speed achievement.

## Approved implementation, 2026-10-07
Pixel Studio approved. Build the complete static website with root Aperto, /me/ portfolio, /m/ alias, /projects/, /tryio/ case and /vairy/ archive. Preserve existing support and legal routes. Use raw screenshots captured from the actual Aperto app; no App Store poster crops. Smooth finite entrances, scroll depth and shutter reveal; immediate focus reticle response. Remove all visible motion toggles and settings. Respect the operating system reduced-motion preference. TestFlight URLs remain pending and are configured in site/products.json.
