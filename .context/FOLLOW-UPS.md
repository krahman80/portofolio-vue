# Follow-ups

Work that is deliberately **not** part of v1.0.0. Kept here so it survives the closure of
`Portofolio-DEVELOPMENT-PLAN.md` — the sprint plan is now complete, which is exactly when loose
ends tend to get lost.

---

## 1. Contact form — deferred (PRD §6.7, FR-23, open question OQ-6)

**Status:** deferred. The blocking decision has not been made.

v1.0.0 ships **no contact form** — no fields, no submit handling, no success state. What exists
instead is intentionally backend-free:

- a **copy-email button** in the hero, which writes the address to the clipboard
- plain **`mailto:`** links in the header, the hero CTA, and the footer

**The blocker:** the site is static with no backend, so a real form needs a client-side relay or a
hosted form endpoint. No provider has been chosen.

When this is picked up, these need deciding:

1. **Delivery mechanism** — EmailJS, Formspree, Web3Forms, a serverless function, or staying with
   `mailto:`
2. **Spam handling** — honeypot field, CAPTCHA, or provider-side filtering
3. **Placement** — modal (as in `template.html`) or an inline section
4. **Failure states** — what a visitor sees when the network or the provider fails; the original
   design only ever shows a success state
5. **Localisation** — every new string must go in **both** `locales/en.json` and `locales/ja.json`

`template.html` already contains a complete contact modal — field styling, validation styling and a
success state. Reuse it rather than designing a new one.

---

## 2. Content and asset housekeeping

No functional impact, but worth doing before the site is promoted widely.

| Item                        | Detail                                                                                                                                                                                                                                                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pramana repo link**       | `githubUrl` is `https://github.com/krahman80/` — a profile, not a repository. The modal's "GitHub Repository" button therefore lands on the profile page                                                                                                                                                                     |
| **Sub-optimal screenshots** | `pramana/1.png` and `pramana/2.png` still show the WordPress admin bar. `pramana/3.png` is a clean capture of the same homepage — likely make that the cover                                                                                                                                                                 |
| **Near-duplicate images**   | `koya/2.png` and `koya/3.png` are both the homepage with the Spotlight banner. Also duplicated: `pramana/1.png` vs `pramana/3.png`                                                                                                                                                                                           |
| **Unused avatars ship**     | `avatar-2.jpg` and `avatar-3.jpg` are no longer referenced by `profile.json`, but `public/` is copied verbatim, so they are still deployed                                                                                                                                                                                   |
| **Image weight**            | The deployable bundle is **6.6 MB**, of which 3.9 MB is project screenshots. Several PNGs are 400–590 KB each. Converting to WebP, or re-exporting at a smaller size, would cut this substantially. Every image is already lazy-loaded and the carousel only renders the active slide, so this is purely about transfer size |

---

## 3. Decided as out of scope — do not reopen without a new decision

These were considered and consciously excluded. Recorded here so they are not re-litigated as
"oversights".

- **Analytics** — none (PRD §11.8). No GA4, Plausible, or equivalent.
- **Deep-linkable project URLs / Vue Router** — project details are a modal, not routes (PRD §11.7).
- **CMS or admin UI for the JSON** — content is edited as files and redeployed (PRD §3).
- **Languages beyond EN/JA** (PRD §3).
- **Prerendering / SSR for SEO** — out of scope; the static `<title>` and meta description are
  preserved at build time instead (PRD NFR-7).

---

## 4. Deployment — the one Sprint 6 task still outstanding

The release build is finished and verified at `dist/`, but it has **not been uploaded**. Deploying
needs host access, so it is left to the site owner:

1. Run `npm run build`
2. Upload the **contents** of `dist/` to the domain root — not the `dist/` folder itself
3. No `base` override is needed; the site is served from the domain root (PRD §11.10)
4. After uploading, smoke-test: language toggle, profile-photo switcher, a project modal, and the
   copy-email button
