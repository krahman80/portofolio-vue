import { nextTick, onBeforeUnmount } from 'vue'

const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Shared modal accessibility behaviour (FR-22, NFR-2).
 *
 * - Keeps Tab / Shift+Tab cycling inside `containerRef` while active.
 * - Remembers what had focus before activation and returns focus there on
 *   deactivate, so closing a modal puts the visitor back where they were.
 * - `getFallback()` is used when nothing useful was focused beforehand — for a
 *   mouse click on a non-focusable card, `document.activeElement` is `<body>`,
 *   which is not a useful thing to restore focus to.
 *
 * Esc handling and body-scroll locking stay with the caller, since both are
 * modal-specific rather than trap-specific.
 */
export function useFocusTrap(containerRef, { getFallback } = {}) {
    let previouslyFocused = null
    let isActive = false

    function focusableElements() {
        const root = containerRef.value
        return root ? [...root.querySelectorAll(FOCUSABLE)] : []
    }

    function onKeydown(event) {
        if (event.key !== 'Tab') return

        const items = focusableElements()

        if (!items.length) {
            // Nothing to tab to: keep focus on the container itself.
            event.preventDefault()
            containerRef.value?.focus()
            return
        }

        const first = items[0]
        const last = items[items.length - 1]
        const current = document.activeElement

        if (event.shiftKey && (current === first || current === containerRef.value)) {
            event.preventDefault()
            last.focus()
        } else if (!event.shiftKey && current === last) {
            event.preventDefault()
            first.focus()
        }
    }

    function activate() {
        if (isActive) return
        isActive = true

        const active = document.activeElement
        previouslyFocused =
            active instanceof HTMLElement && active !== document.body ? active : null

        document.addEventListener('keydown', onKeydown)

        nextTick(() => {
            const first = focusableElements()[0]
            ;(first ?? containerRef.value)?.focus()
        })
    }

    function deactivate() {
        if (!isActive) return
        isActive = false

        document.removeEventListener('keydown', onKeydown)

        const remembered =
            previouslyFocused && document.contains(previouslyFocused) ? previouslyFocused : null
        const target = remembered ?? getFallback?.() ?? null

        previouslyFocused = null
        target?.focus?.()
    }

    // Safety net: never leave a document-level listener behind.
    onBeforeUnmount(deactivate)

    return { activate, deactivate }
}
