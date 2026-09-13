# Project Instructions

## Project

This is a Vue 3 Single Page Application built with Vite.

## Architecture

- Frontend only
- No backend
- No Laravel
- No Node.js production server
- No external API
- Static files are deployed to shared hosting

## Vue

- Use Vue 3 Composition API
- Prefer `<script setup>`
- Use JavaScript unless there is a strong reason to use TypeScript
- Keep components small and reusable
- Prefer computed properties over duplicated derived state
- Avoid unnecessary watchers

## Data

- Small static datasets may be stored as JSON
- Static application data belongs in `src/data/`
- Files that must remain publicly accessible may go in `public/`
- Use localStorage when browser-side persistence is required

## Components

- Reusable UI components belong in `src/components/`
- Page-level components belong in `src/views/`
- Do not put large amounts of UI logic into `App.vue`

## Routing

- Use Vue Router for application navigation
- Prefer named routes
- Do not manipulate URLs manually when Vue Router can handle navigation

## Visual Design Reference

- `template.html` is the primary visual and design reference for this project.
- ALWAYS inspect and reference `template.html` before implementing or modifying UI.
- Treat `template.html` as the source of truth for the application's visual design unless the user explicitly requests a change.
- Match the visual language established in `template.html`, including:
  - Layout and spacing
  - Typography
  - Font sizes and weights
  - Colors
  - Backgrounds
  - Borders and border radius
  - Shadows
  - Buttons
  - Forms and inputs
  - Cards
  - Navigation
  - Responsive behavior
  - Hover, focus, active, and disabled states
  - Icons and visual elements
  - Overall visual hierarchy

- When creating a new Vue component or page, first determine how the equivalent UI is implemented or styled in `template.html`, then follow the same design patterns.
- Prefer reusing the existing classes, CSS variables, utility classes, and design patterns from `template.html` rather than inventing new styles.
- Do not introduce a different visual style, spacing system, color palette, component style, or typography system unless explicitly requested.
- If a requested feature does not have a direct equivalent in `template.html`, extend the existing design language consistently rather than creating a new design pattern.
- When converting HTML from `template.html` into Vue components, preserve the original appearance and behavior as closely as practical.
- Do not modify or redesign `template.html` unless the user explicitly asks for changes to the template itself.
- If there is uncertainty about how a UI element should look, inspect `template.html` and use the closest existing pattern as the reference instead of guessing.

## Styling

- Reuse existing styles and design patterns.
- `template.html` takes precedence as the visual reference for styling decisions.
- Do not introduce a CSS framework unless explicitly requested.
- Avoid inline styles unless necessary.
- Do not create duplicate styles when an existing style or pattern can be reused.
- Keep styling consistent across all pages and components.
- Ensure responsive behavior remains consistent with the design established in `template.html`.

## Dependencies

Before installing a new npm package:

1. Check whether the functionality can be implemented with Vue or browser APIs.
2. Check whether an existing dependency already provides it.
3. Only add a dependency when it provides meaningful value.

## Code Quality

- Do not rewrite unrelated files.
- Do not make speculative changes.
- Preserve existing behavior unless the task explicitly requires changing it.
- Before modifying code, inspect the relevant files.
- Before implementing UI changes, inspect `template.html` and the relevant existing components.
- After making changes, check for errors.
- Run the appropriate build/lint checks after significant changes.

## Agent Behavior

Work incrementally.

For larger tasks:

1. Inspect the existing implementation.
2. Inspect `template.html` when the task involves UI, layout, styling, or visual appearance.
3. Identify existing patterns that should be reused.
4. Explain the proposed change briefly.
5. Make the smallest appropriate changes.
6. Run validation.
7. Report what changed and any remaining issues.

### UI Development Rule

For every UI-related task:

1. Read `template.html` first.
2. Identify the closest existing design pattern.
3. Reuse that pattern in the Vue implementation.
4. Only create a new pattern when the existing template does not provide an appropriate one.
5. Keep the new implementation visually consistent with the template.

Do not implement unrelated improvements unless requested.
