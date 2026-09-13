# Product Requirements Document
## Kautsar Rahman Portfolio — Vue 3 + Tailwind CSS SPA

| | |
|---|---|
| **Author** | Kautsar Rahman |
| **Status** | Draft v1.0 |
| **Source reference** | `index.html` (existing static HTML/Tailwind landing page) |
| **Target stack** | Vue 3 (Composition API) + Tailwind CSS, static JSON data, no backend/database |

---

## 1. Overview

Kautsar currently has a single static HTML page (`index.html`) — a monochrome, bilingual (EN/JA) developer portfolio with a hero/profile section, a "Work" grid of project cards, a project preview modal, and a contact modal, all driven by inline vanilla JS.

This PRD defines the rebuild of that page as a **Vue 3 + Tailwind CSS single-page application (SPA)**, preserving the existing visual design system, and adding three new capabilities:

1. A **predefined profile picture switcher** (pick from 3 preset photos)
2. **Portfolio cards that open a project detail view with an image carousel** (multiple images per project, not just one static banner)
3. Content sourced entirely from **static JSON files** — no database, no backend API

## 2. Goals

- **G1.** Re-implement the current design (layout, monochrome palette, typography, clipped-corner cards, dot-grid decoration, "highlighter" headline, modals) as componentized Vue 3 code.
- **G2.** Move all copy, project data, and profile data out of the HTML/JS and into versioned JSON files, so Kautsar can update his portfolio by editing data, not markup.
- **G3.** Let a visitor switch the hero profile photo between 3 preset images.
- **G4.** Let a visitor switch the site language between English and Japanese, with every piece of UI text and content sourced from the JSON layer.
- **G5.** Let a visitor click a project card and view a multi-image carousel of that project's screenshots inside a detail modal.
- **G6.** Ship as a fully static build (HTML/CSS/JS only) deployable to any static host (e.g. Netlify, Vercel, GitHub Pages, S3) with no server-side component.

## 3. Non-Goals (out of scope for this PRD)

- No database, ORM, or server-rendered API of any kind.
- No CMS or admin UI for editing JSON data — data is edited directly as files and redeployed.
- No user accounts, authentication, or comments.
- **No contact form in v1.** The contact modal/form is explicitly deferred to a later phase (see §6.7 and §11.3) — this build only needs the existing "copy email to clipboard" affordance and a static `mailto:` link if one is wanted as a placeholder.
- No additional languages beyond English and Japanese.
- No analytics/tracking (GA4, Plausible, etc.) — confirmed not required (§11.8).
- No blog or long-form article system.

## 4. Users

- **Primary user:** a recruiter, hiring manager, or prospective client visiting the site to evaluate Kautsar's work and get in touch.
- **Secondary user (site owner):** Kautsar himself, editing JSON files to add/update projects, swap profile photos, or correct copy.

## 5. Current State Reference

The existing `index.html` already establishes the design system this rebuild must preserve:

| Token | Value | Notes |
|---|---|---|
| `--color-primary` | `#0E100F` | near-black, text/buttons/nav |
| `--color-secondary` | `#6B6B6B` | body copy |
| `--color-surface` | `#FFFFFF` | page background |
| `--color-border-light` | `#D4D4D4` | borders |
| `--color-pill-bg` | `#F7F7F7` | tag/pill fill |
| `--color-muted` | `#878787` | tertiary text |
| Font | Plus Jakarta Sans | ⚠️ see Risk R4 — no Japanese glyph coverage |
| Shape | `clip-path` angled corners on photo + cards, 0 shadow except soft card shadow | signature visual motif, must be preserved |
| Decoration | halftone dot-grid clusters, inverted "highlighter" span on headline | preserve as-is |

Existing sections to carry over 1:1 in behavior: sticky nav with EN/JPN switcher and mobile hamburger menu, hero (portrait + headline + bio + skill pills + CTAs + copy-email action), Work grid (currently 6 static cards), project preview modal, contact modal, footer.

## 6. Functional Requirements

Each requirement has an ID for traceability into the development plan.

### 6.1 Global / App Shell
- **FR-1.** The app is a single page (no routed sub-pages) with anchor-scroll navigation between Hero and Work, matching current `#hero` / `#work` behavior. Project detail views are modal-only and are not deep-linkable (confirmed, §11.7) — no Vue Router dependency is needed for this build.
- **FR-2.** Sticky header with logo, nav links, language switcher, and a mobile hamburger dropdown — behavior parity with current `toggleMobileMenu()` logic. The header's "Contact" link and the hero's "Contact me" button no longer open a modal (that modal is removed, §6.7); both instead trigger the existing "copy email to clipboard" action, or link to a plain `mailto:`, pending your call in OQ-6.
- **FR-3.** All user-facing strings (nav labels, buttons, section headers, form labels, empty/success states) come from a locale JSON file — no hardcoded EN or JA text in components.

### 6.2 Profile / Hero Section
- **FR-4.** Displays the profile photo, name, role/tagline, bio paragraph, and skill pills, all sourced from `profile.json`.
- **FR-5.** Retains the existing visual treatment: circular clipped/dot-grid frame, status badge, location tag.
- **FR-6.** Bio, tagline, and headline text are localized (EN/JA) via the locale files, consistent with FR-3.

### 6.3 Profile Picture Switcher (new)
- **FR-7.** The visitor can choose between **3 predefined profile photos**. Each photo is defined in `profile.json` (id, file path, alt text) — no upload capability.
- **FR-8.** The picker UI presents the 3 thumbnails (e.g. a small row of selectable circular swatches near the hero photo). Selecting one immediately updates the large hero portrait. This picker exists **only in the hero section** — it is not duplicated in a settings menu or elsewhere on the page (confirmed, §11.6).
- **FR-9.** The selected photo choice **persists across page reloads** using `localStorage` (assumption — see §11), defaulting to the first entry in `profile.json` if nothing is stored.
- **FR-10.** Picker is keyboard-operable (tab + enter/space) and each swatch has an `aria-label`.

### 6.4 Language Switcher
- **FR-11.** EN / JA toggle in the header, matching current placement and styling.
- **FR-12.** Switching language updates all visible text instantly, without a page reload, including currently-open modals.
- **FR-13.** The chosen language **persists across reloads** via `localStorage` (assumption — see §11), defaulting to `en` if unset (or optionally to the browser's `navigator.language`, see Open Question OQ-2).

### 6.5 Portfolio / Work Section
- **FR-14.** Renders one card per entry in `works.json`, in array order (or by a `sortOrder` field).
- **FR-15.** Each card shows: a real project screenshot as its cover thumbnail (the first entry in that project's `images[]`), title, tag pills, short description, tech stack, "Preview" action, and a GitHub link — matching current card anatomy but with a real image replacing the current CSS "code mockup."
- **FR-16.** Clicking anywhere on the card — the thumbnail image, the title, or the "Preview" button — opens the Project Detail Modal (§6.6) for that project.
- **FR-17.** Card titles/descriptions are localized per-project (`title.en`/`title.ja`, `description.en`/`description.ja` in the JSON schema).

### 6.6 Project Detail Modal + Image Carousel (new)
- **FR-18.** Opening a project shows a modal with: project category tag, localized title, stats line, localized architecture/description text, tech-stack tags, GitHub link, and a "Launch Live App" link — parity with the current modal.
- **FR-19.** **New:** the modal's banner area becomes an **image carousel** cycling through the `images[]` array defined for that project in `works.json`. Every project ships with a minimum of **3–4 real screenshots** (confirmed, §11.5) — the previous single-image CSS mockup banner is retired as the standard treatment, not kept as a permanent fallback.
- **FR-20.** Carousel supports: next/previous controls, clickable dot/thumbnail indicators, keyboard **←/→** navigation while the modal is focused, and (on touch devices) swipe gesture.
- **FR-21.** Carousel auto-pauses (does not auto-advance) — advancing is user-driven only, consistent with the low-motion, deliberate feel of the existing design.
- **FR-22.** Modal is dismissible via the close button, the backdrop click, and the **Esc** key; focus is trapped inside the modal while open and returns to the triggering card on close.

### 6.7 Contact — deferred to a later phase
- **FR-23 (deferred).** The full contact form (name/email/message fields, submit handling, success state) is **out of scope for this build** and will be scoped in a future PRD once a decision is made on how submissions actually get delivered without a backend.
- **FR-24.** For v1, the site keeps only the existing lightweight actions that need no backend at all: the "copy email to clipboard" button (header + hero + footer) and, optionally, a plain `mailto:` link. No modal, no form, no submit handling.

### 6.8 Footer
- **FR-25.** Retains current footer content (identity blurb, location, email, social links) sourced from `profile.json`, localized per FR-3.

## 7. Data Model (JSON files)

All content lives under `/src/data/`. No file talks to a database or external API at runtime except the optional contact-form relay (FR-24).

### 7.1 `profile.json`
```json
{
  "name": "Kautsar Rahman",
  "role": { "en": "Independent Web Developer & Engineer", "ja": "ウェブエンジニア / フロントエンド・フルスタック" },
  "location": { "city": "Sapporo, Hokkaido", "coords": "43°03'N 141°21'E" },
  "bio": { "en": "...", "ja": "..." },
  "skills": ["React / Next.js", "TypeScript", "Tailwind CSS v4", "Node.js & APIs", "Performance & a11y"],
  "email": "kautsar.rahman@gmail.com",
  "social": { "github": "https://github.com/...", "linkedin": "https://..." },
  "avatars": [
    { "id": "avatar-1", "src": "/assets/profile/avatar-1.jpg", "alt": "Kautsar Rahman portrait, option 1" },
    { "id": "avatar-2", "src": "/assets/profile/avatar-2.jpg", "alt": "Kautsar Rahman portrait, option 2" },
    { "id": "avatar-3", "src": "/assets/profile/avatar-3.jpg", "alt": "Kautsar Rahman portrait, option 3" }
  ],
  "defaultAvatarId": "avatar-1"
}
```

### 7.2 `works.json`
```json
[
  {
    "id": "sapporo-snow",
    "category": "WEB APPS",
    "sortOrder": 1,
    "title": { "en": "Sapporo Snow & Transit Engine", "ja": "札幌スノー＆都市交通エンジン" },
    "description": { "en": "...", "ja": "..." },
    "stats": "15-min live radar sync • Sub-second vector map rendering",
    "tags": ["React", "TypeScript", "Tailwind CSS", "Leaflet"],
    "githubUrl": "https://github.com/kautsar-rahman/sapporo-snow-radar",
    "previewUrl": "https://sapporo-snow.preview.dev",
    "images": [
      { "src": "/assets/works/sapporo-snow/1.jpg", "alt": "Radar map view" },
      { "src": "/assets/works/sapporo-snow/2.jpg", "alt": "Advisory panel" },
      { "src": "/assets/works/sapporo-snow/3.jpg", "alt": "Mobile view" },
      { "src": "/assets/works/sapporo-snow/4.jpg", "alt": "Road-clearing tracker view" }
    ]
  }
]
```
`images[]` requires a **minimum of 3 entries per project** (target 3–4) — this is the confirmed content requirement, not an optional array (§11.5).

### 7.3 Locale files — `locales/en.json`, `locales/ja.json`
Flat or nested key/value maps for **UI chrome only** (nav labels, button text, section eyebrows/subtitles, form labels, empty/success states, aria-labels). Project and profile content stays in `works.json` / `profile.json` per-field (`{en, ja}`) rather than in the locale files, since it's tied 1:1 to a data record.
```json
{
  "nav": { "about": "About", "work": "Work", "contact": "Contact" },
  "hero": { "cta_contact": "Contact me", "cta_work": "Check my work" },
  "work": { "eyebrow": "Selected Portfolio", "title": "Featured Works & Systems" },
  "contact": { "name_label": "Your Name", "submit": "Send Message" }
}
```

## 8. Proposed Component Structure

```
src/
├── App.vue
├── components/
│   ├── layout/
│   │   ├── NavBar.vue
│   │   ├── MobileMenu.vue
│   │   └── Footer.vue
│   ├── hero/
│   │   ├── HeroSection.vue
│   │   ├── AvatarSwitcher.vue      (FR-7 – FR-10)
│   │   └── SkillPills.vue
│   └── work/
│       ├── WorkSection.vue
│       ├── ProjectCard.vue
│       ├── ProjectModal.vue        (FR-18)
│       └── ImageCarousel.vue       (FR-19 – FR-21, reusable)
│   # note: no contact/ directory in v1 — deferred, see §6.7
├── composables/
│   ├── useLocale.js                 (language state + persistence)
│   ├── useProfile.js                 (avatar selection state + persistence)
│   └── useFocusTrap.js               (shared modal a11y behavior)
├── data/
│   ├── profile.json
│   └── works.json
├── locales/
│   ├── en.json
│   └── ja.json
└── assets/
    ├── profile/ (3 avatar images)
    └── works/<project-id>/ (carousel images per project)
```

**Library choices to confirm with Kautsar (see §11 Assumptions):**
- i18n: `vue-i18n` (recommended) vs. the lightweight custom `useLocale` composable outlined above. Given only 2 languages and content-heavy strings already modeled as `{en, ja}` objects in JSON, a small custom composable is likely sufficient and avoids an extra dependency — **recommendation: custom composable**, revisit only if the string count grows substantially.
- State management: plain Composition API composables (above) are sufficient at this scope; **Pinia is not recommended** unless the app grows additional shared state.
- Build tool: Vite (Vue 3 default).

## 9. Non-Functional Requirements

- **NFR-1 (Performance):** Images lazy-load (`loading="lazy"`); carousel images for non-active slides are not eagerly fetched at full priority.
- **NFR-2 (Accessibility):** WCAG AA color contrast (already satisfied by the existing monochrome palette), full keyboard operability for nav, avatar switcher, and carousel, visible focus states, modals trap focus and restore it on close, all interactive icons have `aria-label`s.
- **NFR-3 (Responsiveness):** Same breakpoints as the current Tailwind build (mobile / `md` / `lg`); Work grid: 1 col mobile → 2 col tablet → 3 col desktop, matching current behavior.
- **NFR-4 (Reduced motion):** Respect `prefers-reduced-motion` for card hover, modal transitions, and carousel slide animation.
- **NFR-5 (No backend):** The production build is static output only (HTML/CSS/JS/JSON/images) — deployable by copying `dist/` to any static host, no server process required.
- **NFR-6 (Browser support):** Latest 2 versions of Chrome, Firefox, Safari, Edge.
- **NFR-7 (SEO baseline):** Preserve the existing `<title>` and meta description/OG tags at build time (SPA client-side routing is not otherwise SEO-optimized; full prerendering is out of scope, see Non-Goals).
- **NFR-8 (Japanese typography):** Load **Noto Sans JP** alongside Plus Jakarta Sans; apply it via a `:lang(ja)` / locale-scoped font-family rule so Japanese text renders with proper glyph coverage instead of falling back to the OS default font (confirmed fix, §11.4).

## 10. Success Criteria / Acceptance Checklist

- [ ] All text visible on the page traces back to a JSON file (locale file or data file) — no hardcoded copy in `.vue` templates.
- [ ] Switching EN ⇄ JA updates every visible string, including inside open modals, without a reload.
- [ ] Switching the profile photo updates the hero image instantly and survives a page refresh.
- [ ] Clicking any project card (thumbnail, title, or Preview button) opens a modal showing that project's own image carousel — every project has at least 3 real screenshots to slide through, navigable by buttons, dots, keyboard, and swipe.
- [ ] Visual output matches the current `index.html` design system (colors, type, clipped corners, spacing) at the same breakpoints.
- [ ] `npm run build` produces a static bundle with no server dependency, and the site works when that bundle is served from a plain static host.
- [ ] Lighthouse accessibility score ≥ 95 on the built page.

## 11. Decisions (confirmed by Kautsar)

The gaps in the original draft have now been resolved as follows:

1. **Photo/avatar persistence:** confirmed — uses `localStorage`. A returning visitor on a different device or browser will simply see the default avatar again; this is accepted for v1.
2. **Language default:** confirmed — the site always defaults to **English** on first visit (not browser-language detection). The choice still persists via `localStorage` once a visitor switches to Japanese, per FR-13. This resolves former Open Question OQ-2.
3. **Contact form:** confirmed — **removed from this build entirely** and deferred to a later phase/PRD. See §3 (Non-Goals) and §6.7 (FR-23/FR-24) for what v1 keeps instead (copy-email action only, no form, no modal, no submission handling).
4. **Japanese font support:** confirmed — add **Noto Sans JP** as the font stack for Japanese-locale text, alongside Plus Jakarta Sans for Latin text. See NFR-8 below.
5. **Card thumbnails / carousel images:** confirmed — **every project ships with real screenshots, minimum 3–4 images each.** Clicking a project's card (including its thumbnail image) opens a modal overlay ("new window" here is read as an in-page modal/lightbox, consistent with the site's existing modal pattern from §6.6 — not a literal new browser tab; flag if you actually meant a separate browser window/tab and this gets revised). Inside that modal, the visitor slides through all of that project's images via the carousel controls (arrows, dots, keyboard, swipe — FR-20).

   Recommendation carried over from the earlier draft: keep a **consistent aspect ratio** (e.g. 16:9) across a single project's `images[]` array so slides don't jump/reflow when navigating.
6. **Avatar switcher placement:** confirmed — visible only near the hero photo (FR-8). Not duplicated in a settings/utility menu or anywhere else in the header/footer.
7. **Project detail navigation:** confirmed — **modal only, no routing.** No deep-linkable URLs per project (e.g. no `/#/work/sapporo-snow`); Vue Router is not needed for this build (consistent with the "no routed sub-pages" note in §6.1/§8).
8. **Analytics:** confirmed — **no analytics requirement.** No GA4/Plausible/etc. is added in this build.

## 12. Open Questions

- **OQ-6.** Still undecided — when the contact form returns in a later phase, no client-side relay (EmailJS/Formspree) or alternative approach has been chosen yet. Nothing blocks v1 on this; flagged only so it isn't forgotten when that phase starts.

## 13. Next Step

Once the assumptions in §11 and open questions in §12 are confirmed or corrected, the accompanying **Development Plan** will break this PRD down into milestones, task-level tickets, and a suggested build order (scaffolding → data layer → static layout parity → avatar switcher → i18n → carousel/modal → contact → polish/a11y/QA).
