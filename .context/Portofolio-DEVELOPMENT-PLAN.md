# Development Plan

## Kautsar Rahman Portfolio — Vue 3 + Tailwind CSS SPA

|                           |                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **Companion document**    | `PRD.md` (v1.0, all assumptions/open questions resolved except OQ-6)                   |
| **Sprint model**          | Vertical slicing — see §1                                                              |
| **Assumed team**          | 1 developer (Kautsar)                                                                  |
| **Assumed sprint length** | 1 week — adjust freely, the slice boundaries don't depend on the exact calendar length |

---

## 1. Methodology: Vertical Slices

A **horizontal** plan would build the project in stacked layers — "Sprint 1: all the JSON data files," "Sprint 2: all the Vue components," "Sprint 3: all the styling," "Sprint 4: all the interactivity." Nothing is actually usable until every layer is done.

This plan instead slices by **feature**, top to bottom, every sprint. Each sprint takes one user-facing capability from the PRD and delivers it **complete** — its data shape, its component, its styling, its interaction, its localization, its accessibility — so that at the end of every sprint there is a real, deployed increment a visitor could actually use, even though later sprints will add more capabilities on top.

Concretely: **Sprint 3 (Work Grid) includes its own i18n**, rather than "i18n" being a separate sprint bolted on afterward. Language switching for the hero is built in Sprint 1, and language switching for the work grid is built in Sprint 3 — as part of each feature slice, not as one giant cross-cutting sprint at the end.

The one deliberate exception is **Sprint 0**, a "walking skeleton" — the thinnest possible deployable slice (empty shell, design tokens, build pipeline) that every later slice builds on top of. Every plan needs a foundation; the point of vertical slicing is that the foundation is as thin as possible, not that it doesn't exist.

## 2. Content/Asset Dependencies (read this before Sprint 2)

Two sprints are **blocked on assets that only Kautsar can supply** — flagging this now so it doesn't surprise anyone mid-sprint:

| Sprint                               | Blocking asset                                                         | Confirmed requirement |
| ------------------------------------ | ---------------------------------------------------------------------- | --------------------- |
| Sprint 2 (Avatar Switcher)           | 3 predefined profile photos                                            | PRD §6.3, FR-7        |
| Sprint 4 (Project Detail + Carousel) | Real screenshots, **minimum 3–4 per project**, consistent aspect ratio | PRD §11.5             |

If these assets aren't ready when their sprint comes up, either reorder the backlog (pull forward a sprint that isn't asset-blocked) or use temporary placeholder images so the component work isn't stalled — but real assets must land before that sprint is marked Done.

## 3. Sprint Backlog

---

### Sprint 0 — Walking Skeleton

**Goal:** A deployed, empty-but-real Vue 3 + Tailwind app that already carries the design system — nothing dynamic yet, but nothing is a mockup either.

**User-facing outcome:** Visiting the live URL shows the correct fonts, colors, header, and footer — matching `index.html`'s chrome — with no content wired up yet.

**PRD coverage:** foundational for all FRs; establishes §8 (component structure) and NFR-5/6/8.

**Tasks:**

- [ ] Scaffold project with Vite + Vue 3 (Composition API) + Tailwind CSS
- [ ] Port design tokens from `index.html`'s `@theme` block into Tailwind config / CSS variables (colors, font stacks), and consume them **exclusively via their generated utilities** (`text-primary`, `bg-pill-bg`, `border-border-light`, …) rather than raw hex arbitrary values — see PRD §5 "Token usage convention" and §11.9
- [ ] Add Noto Sans JP alongside Plus Jakarta Sans; wire a `:lang(ja)` font-family rule (NFR-8)
- [ ] Recreate the `clipped-corner-photo`, `clipped-corner-card`, `dot-grid-pattern`, `highlighter-badge` CSS utilities as shared styles
- [ ] Build static `NavBar.vue` (logo, nav links, language switcher shell — non-functional toggle for now) and `Footer.vue` shells
- [ ] Set up `App.vue` shell with placeholder `<HeroSection />` / `<WorkSection />` slots
- [ ] Set up production build (`vite build`) and confirm the output is fully static (no server dependency) — NFR-5
- [ ] Deploy the empty shell to the target static host (Netlify/Vercel/GitHub Pages — pick one) to prove the pipeline end-to-end. Target is the **domain root**, so the default Vite `base` stays as-is (PRD §11.10)

**Definition of Done:** `npm run build && npm run preview` (or the live deployed URL) shows a styled header + footer matching the source design, on a real static hosting URL.

**Depends on:** nothing.

---

### Sprint 1 — Hero Section + Language Switcher (first vertical i18n slice)

**Goal:** The hero section is fully real and bilingual.

**User-facing outcome:** A visitor sees Kautsar's photo (single fixed photo for now — avatar switching comes in Sprint 2), name, tagline, bio, and skill pills, and can toggle EN ⇄ JA in the header to see the hero content and nav labels change instantly.

**PRD coverage:** FR-1 (single-page shell), FR-2 (nav, minus Contact modal behavior — see Sprint 5 note), FR-3, FR-4, FR-5, FR-6, FR-11, FR-12, FR-13.

**Tasks:**

- [ ] Author `data/profile.json` (name, role, bio, skills, location) with one placeholder avatar entry
- [ ] Author `locales/en.json` / `locales/ja.json` for nav + hero UI strings
- [ ] Build `composables/useLocale.js` (current language ref, `setLocale()`, `localStorage` persistence, default `en` — confirmed §11.2)
- [ ] Build `HeroSection.vue` consuming `profile.json` + `useLocale` — portrait frame (clipped/dot-grid decoration), status badge, location tag, headline with the inverted "highlighter" span, bio, skill pills
- [ ] Build `SkillPills.vue`
- [ ] Wire the header's language toggle buttons to `useLocale`
- [ ] Verify: switching language updates hero text and nav labels with no reload
- [ ] Verify: reloading the page after switching to JA keeps JA selected (localStorage)

**Definition of Done:** Hero section is pixel/behavior-equivalent to `index.html`'s hero, fully bilingual, language choice persists across reload.

**Depends on:** Sprint 0.

---

### Sprint 2 — Profile Picture Switcher

**Goal:** The avatar switcher is fully working.

**User-facing outcome:** Near the hero photo, a visitor sees 3 small selectable thumbnails; clicking one immediately swaps the large hero portrait. The choice survives a page reload.

**PRD coverage:** FR-7, FR-8, FR-9, FR-10.

**Blocked on:** the 3 real profile photos (see §2 table) — placeholders may be used temporarily but must be swapped before Done.

**Tasks:**

- [ ] Add the 3 real avatar entries to `profile.json` (`avatars[]`, `defaultAvatarId`)
- [ ] Build `composables/useProfile.js` (selected avatar id ref, `setAvatar()`, `localStorage` persistence, default = `defaultAvatarId` — confirmed §11.1)
- [ ] Build `AvatarSwitcher.vue`: 3 circular swatches, selected-state styling, keyboard operable (tab + Enter/Space), `aria-label` per swatch (FR-10)
- [ ] Mount `AvatarSwitcher.vue` inside `HeroSection.vue` only — confirmed not duplicated elsewhere (§11.6)
- [ ] Wire swatch selection to update the hero portrait `<img>` instantly
- [ ] Verify: reload after switching avatar keeps the chosen photo

**Definition of Done:** All 3 real photos load correctly, switching is instant and keyboard-accessible, selection persists across reload.

**Depends on:** Sprint 1 (Hero section must exist first).

---

### Sprint 3 — Work Grid (view-only vertical slice)

**Goal:** The portfolio grid is real, data-driven, and bilingual — browsing only, no detail view yet.

**User-facing outcome:** A visitor scrolls to "Work" and sees one card per project (title, tag pills, short description, tech stack, GitHub link, cover thumbnail), fully localized, in the current 1/2/3-column responsive grid. Clicking a card does nothing yet (that's Sprint 4) — cards can be visually inert or show a disabled/"coming soon" cursor state for this sprint only.

**PRD coverage:** FR-14, FR-15 (cover-image portion only), FR-17; extends FR-3/FR-12 i18n coverage to work content.

**Tasks:**

- [ ] Author `data/works.json` for all real projects, `{en, ja}` fields for title/description, tags, stats, githubUrl, `sortOrder` — `images[]` can stay a single-entry placeholder for now (full carousel content lands in Sprint 4)
- [ ] Extend `locales/en.json` / `locales/ja.json` with the Work section's chrome strings (eyebrow, section title/subtitle)
- [ ] Build `WorkSection.vue` (section header + responsive grid container, matching current 1/2/3-col breakpoints — NFR-3)
- [ ] Build `ProjectCard.vue`: cover thumbnail, title, tag pills, description, tech tags, GitHub link — localized via `useLocale`
- [ ] Verify: language toggle updates every card's visible text with no reload
- [ ] Verify: grid responsive behavior matches `index.html` at the same breakpoints

**Definition of Done:** All real projects render as cards with correct, bilingual content and responsive layout; GitHub links work; clicking the card is a known no-op for this sprint.

**Depends on:** Sprint 1 (shares `useLocale`).

---

### Sprint 4 — Project Detail Modal + Image Carousel

**Goal:** Cards become fully interactive — this is the sprint that completes the "click a project, browse its screenshots" story end-to-end.

**User-facing outcome:** Clicking anywhere on a card (thumbnail, title, or "Preview") opens a modal showing that project's full detail (category, title, stats, description, tech stack, GitHub + Launch Live App links) with an image carousel of that project's real screenshots — navigable by arrow buttons, dot indicators, keyboard ←/→, and touch swipe. Esc/backdrop-click/close-button all dismiss it, focus returns to the triggering card.

**PRD coverage:** FR-16, FR-18, FR-19, FR-20, FR-21, FR-22; completes FR-15 (real per-project cover thumbnails, now backed by real `images[]`).

**Blocked on:** real screenshots, minimum 3–4 per project, consistent aspect ratio (see §2 table).

**Tasks:**

- [ ] Populate every project's `images[]` in `works.json` with its real screenshots (3–4 minimum, per §11.5) and per-image alt text
- [ ] Build `composables/useFocusTrap.js` (shared modal focus-trap + restore-on-close behavior)
- [ ] Build `ImageCarousel.vue` (reusable): next/prev controls, dot indicators, ←/→ keyboard nav, swipe gesture, no auto-advance (FR-21), `prefers-reduced-motion` respected on slide transitions (NFR-4)
- [ ] Build `ProjectModal.vue`: consumes a project record + `ImageCarousel`, renders category/title/stats/description/tags/links, wires close via button/backdrop/Esc, uses `useFocusTrap`
- [ ] Wire `ProjectCard.vue` click handlers (thumbnail, title, Preview button) to open `ProjectModal` for that project's id
- [ ] Verify: carousel image aspect ratio is consistent per project (no layout jump between slides)
- [ ] Verify: keyboard-only user can open a card, navigate the carousel, and close the modal without a mouse
- [ ] Verify: closing the modal returns focus to the card that opened it

**Definition of Done:** Every project card is fully clickable end-to-end into a working, accessible, real-image carousel modal — this is the last functionally new capability in the plan.

**Depends on:** Sprint 3 (cards must exist), Sprint 0 (`useFocusTrap` styling conventions).

---

### Sprint 5 — Cross-Cutting Hardening

**Goal:** Everything built in Sprints 0–4 is verified together, not sprint-by-sprint in isolation.

**User-facing outcome:** No new visible features — this sprint is about the whole app holding up under scrutiny: accessibility, responsiveness, reduced-motion, and the header/hero CTA behavior change from removing the contact modal.

**PRD coverage:** NFR-1 through NFR-8; closes out FR-2's note about the "Contact" nav link / "Contact me" button now that the modal is gone (§6.7, §11.3).

**Tasks:**

- [ ] Update header "Contact" link and hero "Contact me" button to trigger the copy-email action (or a plain `mailto:`), per FR-2 — confirm final choice with Kautsar if still open (ties to OQ-6)
- [ ] Full keyboard-only pass across nav, mobile menu, avatar switcher, and project modal/carousel
- [ ] Full screen-reader spot check (VoiceOver or NVDA) on the same surfaces
- [ ] Lazy-load all images (`loading="lazy"`) per NFR-1; confirm carousel doesn't eagerly fetch non-active slides at full priority
- [ ] Confirm `prefers-reduced-motion` is respected across card hover, modal open/close, and carousel transitions (NFR-4)
- [ ] Responsive QA pass at mobile/`md`/`lg` breakpoints against the original `index.html` (NFR-3)
- [ ] Run Lighthouse; fix any accessibility finding below the ≥95 target (§10 checklist)
- [ ] Cross-browser smoke test: latest Chrome, Firefox, Safari, Edge (NFR-6)

**Definition of Done:** Every item in the PRD's §10 Success Criteria / Acceptance Checklist is checked off.

**Depends on:** Sprints 0–4 all complete.

---

### Sprint 6 — Production Build & Handoff

**Goal:** Ship it, and make sure Kautsar (as his own site's maintainer) can update it later without this plan in hand.

**User-facing outcome:** The site is live on its final static host. Kautsar has a short README explaining how to add/edit a project or swap a profile photo by editing JSON — no code changes required for routine updates.

**PRD coverage:** NFR-5, NFR-7, PRD §4 (secondary user / site owner).

**Tasks:**

- [ ] Final production build; confirm `<title>` and meta description/OG tags are preserved (NFR-7)
- [ ] Deploy to the chosen static host at the **domain root** (PRD §11.10) — no subdomain/subdirectory, so no Vite `base` override is required
- [ ] Write a short `CONTENT.md` (or `README.md` section) documenting: how to add a project to `works.json` (including the 3–4 image minimum), how to change/add a profile photo, how to edit locale strings — aimed at future-Kautsar, not a new developer
- [ ] Tag a `v1.0.0` release / commit
- [ ] File the deferred contact-form work (§6.7, OQ-6) as a tracked follow-up item, not lost in this plan once it closes

**Definition of Done:** Live production URL matches all Sprint 0–5 work; Kautsar can follow `CONTENT.md` to add a 7th project without touching a `.vue` file.

**Depends on:** Sprint 5.

---

## 4. Icebox (explicitly deferred, not part of this plan)

- Contact form (real submission mechanism) — PRD §6.7, blocked on OQ-6
- Any analytics — confirmed not required (PRD §11.8)
- Deep-linkable project URLs / Vue Router — confirmed not required (PRD §11.7)
- CMS/admin UI for editing JSON — confirmed out of scope (PRD §3)
- Any language beyond EN/JA

## 5. Sprint-to-Deliverable Summary

| Sprint | Deliverable a visitor could actually use                          |
| ------ | ----------------------------------------------------------------- |
| 0      | Styled, deployed empty shell                                      |
| 1      | Real, bilingual hero section                                      |
| 2      | Hero + working profile-photo switcher                             |
| 3      | + browsable, bilingual project grid                               |
| 4      | + fully interactive project detail carousel (feature-complete v1) |
| 5      | Same features, hardened (a11y/perf/responsive/cross-browser)      |
| 6      | Live in production, with a maintenance guide                      |

Sprint 4 is the meaningful "feature complete" milestone; Sprints 5–6 are quality and shipping, not new capability.
