import { ref, watch } from 'vue'

import en from '@/locales/en.json'
import ja from '@/locales/ja.json'

const STORAGE_KEY = 'portfolio:locale'

/** PRD §11.2 — always start in English on a first visit, never guess from the browser. */
const DEFAULT_LOCALE = 'en'

const MESSAGES = { en, ja }

function readStoredLocale() {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored && stored in MESSAGES) return stored
    } catch {
        // localStorage can be unavailable (private mode, blocked storage).
    }
    return DEFAULT_LOCALE
}

/**
 * Module-level state: every component that calls `useLocale()` reads and writes
 * the same locale, so there is no need for a store or provide/inject.
 */
const locale = ref(readStoredLocale())

// Keep <html lang> in sync so the :lang(ja) font rule applies (NFR-8).
watch(
    locale,
    (value) => {
        document.documentElement.lang = value
    },
    { immediate: true },
)

function lookup(path, source) {
    return path
        .split('.')
        .reduce((node, key) => (node == null ? undefined : node[key]), source)
}

export function useLocale() {
    function setLocale(next) {
        if (!(next in MESSAGES)) return
        locale.value = next
        try {
            window.localStorage.setItem(STORAGE_KEY, next)
        } catch {
            // Persistence is a bonus; never block the language switch over it.
        }
    }

    /**
     * UI chrome string, addressed by dot path, falling back to English.
     * Optional `params` fill `{name}` placeholders, e.g. t('work.go_to_image', { n: 2 }).
     */
    function t(path, params) {
        const raw =
            lookup(path, MESSAGES[locale.value]) ??
            lookup(path, MESSAGES[DEFAULT_LOCALE]) ??
            path
        if (!params || typeof raw !== 'string') return raw
        return raw.replace(/\{(\w+)\}/g, (match, key) =>
            key in params ? String(params[key]) : match,
        )
    }

    /** Pick the active language out of a `{ en, ja }` field in the data files. */
    function tl(field) {
        if (field == null) return ''
        if (typeof field === 'string') return field
        return field[locale.value] ?? field[DEFAULT_LOCALE] ?? ''
    }

    return { locale, setLocale, t, tl }
}
