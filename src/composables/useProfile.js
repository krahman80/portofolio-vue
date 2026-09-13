import { computed, ref } from 'vue'

import profile from '@/data/profile.json'

const STORAGE_KEY = 'portfolio:avatar'

/**
 * `profile.json` stores root-absolute asset paths (e.g. `/assets/profile/avatar-1.jpg`)
 * that are served verbatim out of `public/`, so the JSON stays the single source of
 * truth and adding a photo is a data-only change — no imports, no bundler wiring.
 */

/** PRD §11.1 — fall back to the first entry if `defaultAvatarId` is missing or stale. */
const DEFAULT_AVATAR_ID = profile.defaultAvatarId ?? profile.avatars[0]?.id

function readStoredAvatarId() {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored && profile.avatars.some((avatar) => avatar.id === stored)) return stored
    } catch {
        // localStorage can be unavailable (private mode, blocked storage).
    }
    return DEFAULT_AVATAR_ID
}

/**
 * Module-level state: every component that calls `useProfile()` sees the same
 * selection, mirroring how `useLocale()` shares the active language.
 */
const selectedAvatarId = ref(readStoredAvatarId())

const selectedAvatar = computed(
    () =>
        profile.avatars.find((avatar) => avatar.id === selectedAvatarId.value) ??
        profile.avatars[0],
)

export function useProfile() {
    /** FR-9 — the chosen photo survives reloads via localStorage. */
    function setAvatar(id) {
        if (!profile.avatars.some((avatar) => avatar.id === id)) return
        selectedAvatarId.value = id
        try {
            window.localStorage.setItem(STORAGE_KEY, id)
        } catch {
            // Persistence is a bonus; never block the switch over it.
        }
    }

    return {
        profile,
        avatars: profile.avatars,
        selectedAvatarId,
        selectedAvatar,
        setAvatar,
    }
}
