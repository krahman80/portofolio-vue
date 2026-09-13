import profile from '@/data/profile.json'

/**
 * `profile.json` stores root-absolute asset paths (e.g. `/assets/profile/avatar-1.jpg`)
 * that are served verbatim out of `public/`, so the JSON stays the single source of
 * truth and adding a photo is a data-only change — no imports, no bundler wiring.
 *
 * Sprint 2 adds selected-avatar state + localStorage persistence here.
 */
export function useProfile() {
    return { profile, avatars: profile.avatars }
}
