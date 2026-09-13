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

## Styling

- Reuse existing styles and design patterns
- Do not introduce a CSS framework unless explicitly requested
- Avoid inline styles unless necessary

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
- After making changes, check for errors.
- Run the appropriate build/lint checks after significant changes.

## Deployment

Production is a static build.

Build with:

npm run build

The contents of `dist/` are uploaded to the shared hosting web root.

Do not introduce server-side requirements.

## Agent Behavior

Work incrementally.

For larger tasks:

1. Inspect the existing implementation.
2. Explain the proposed change briefly.
3. Make the smallest appropriate changes.
4. Run validation.
5. Report what changed and any remaining issues.

Do not implement unrelated improvements unless requested.
