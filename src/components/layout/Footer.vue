<script setup>
/**
 * Sprint 0 — static footer chrome.
 *
 * Deferred on purpose (see DEVELOPMENT-PLAN):
 * - All copy here is hardcoded English for now; Sprint 1 moves it into
 *   `profile.json` / locale files (FR-3, FR-25).
 * - Email is a plain `mailto:`; the copy-to-clipboard affordance (FR-24)
 *   lands in a later sprint.
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
    <footer id="page-footer" class="mt-20 border-t border-[#EDEDED] bg-surface w-full">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#EDEDED]">
                <!-- Column 1: Monogram & Identity -->
                <div class="md:col-span-7 space-y-3">
                    <div class="flex items-center gap-2">
                        <span class="font-black text-xl tracking-tighter text-primary select-none">
                            KR
                        </span>
                        <span class="font-bold text-sm tracking-tight text-primary">
                            Kautsar Rahman.
                        </span>
                    </div>
                    <p class="text-xs text-secondary leading-relaxed max-w-md">
                        Web developer crafting thoughtful digital products with architectural
                        restraint and modern TypeScript standards from Sapporo, Japan.
                    </p>
                    <div class="flex items-center gap-2 text-xs text-muted">
                        <svg class="w-3.5 h-3.5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path
                                d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0">
                            </path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>Sapporo, Hokkaido, Japan 43.0618° N, 141.3545° E</span>
                    </div>
                </div>

                <!-- Column 2: Contact & Direct Connect (pushed to the right) -->
                <div class="md:col-span-4 md:col-start-9 space-y-3 flex flex-col md:items-end md:text-right">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-primary">
                        Connect
                    </h4>
                    <div class="space-y-2 text-xs text-secondary">
                        <p>
                            Email:
                            <a href="mailto:kautsar.rahman@gmail.com"
                                class="text-primary underline hover:no-underline font-mono cursor-pointer">
                                kautsar.rahman@gmail.com
                            </a>
                        </p>
                    </div>
                    <!-- Social Media Icons -->
                    <div class="flex items-center gap-2.5 pt-0.5">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                            class="p-2 bg-pill-bg border border-border-light rounded-md text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                            title="GitHub profile" aria-label="GitHub profile">
                            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
                                </path>
                                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                            </svg>
                        </a>
                        <a href="mailto:kautsar.rahman@gmail.com"
                            class="p-2 bg-pill-bg border border-border-light rounded-md text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                            title="Send an email" aria-label="Send email">
                            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                        </a>
                    </div>
                    <!-- Back to Top placed below the social media icons -->
                    <div class="pt-1">
                        <button id="btn-footer-back-to-top" type="button"
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pill-bg border border-border-light rounded-md text-xs font-medium text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                            aria-label="Back to top" @click="scrollToTop">
                            Back to top
                            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m5 12 7-7 7 7"></path>
                                <path d="M12 19V5"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bottom Copyright Strip -->
            <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-3">
                <p>© 2026 Kautsar Rahman. All rights reserved.</p>
                <p class="font-mono text-[11px]">
                    Sapporo, Japan — Monochromatic Design System
                </p>
            </div>
        </div>
    </footer>
</template>
