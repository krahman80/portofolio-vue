<script setup>
import { ref } from 'vue'

/**
 * Sprint 0 — static header chrome.
 *
 * Deferred on purpose (see DEVELOPMENT-PLAN):
 * - Language switcher is presentational only; Sprint 1 wires it to `useLocale`.
 * - "Contact" is a plain `mailto:` placeholder. The contact modal is removed
 *   from v1 entirely (PRD §6.7); FR-2/FE-24 settle the final copy-email
 *   affordance in a later sprint.
 */
const isMobileMenuOpen = ref(false)

function closeMobileMenu() {
    isMobileMenuOpen.value = false
}
</script>

<template>
    <header id="nav-header"
        class="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-[#EDEDED] transition-all">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <!-- Branding / Logo -->
            <a id="nav-logo" href="#hero" class="flex items-center group cursor-pointer"
                aria-label="Kautsar Rahman Portfolio">
                <span
                    class="font-black text-2xl tracking-tighter text-primary select-none transition-transform group-hover:scale-105">
                    KR
                </span>
            </a>

            <!-- Menu Links -->
            <nav id="nav-links" class="hidden md:flex items-center gap-8">
                <a id="nav-link-about" href="#hero"
                    class="text-[13px] font-medium text-secondary hover:text-primary transition-colors cursor-pointer">
                    About
                </a>
                <a id="nav-link-work" href="#work"
                    class="text-[13px] font-medium text-secondary hover:text-primary transition-colors cursor-pointer">
                    Work
                </a>
                <a id="nav-link-contact" href="mailto:kautsar.rahman@gmail.com"
                    class="text-[13px] font-medium text-secondary hover:text-primary transition-colors cursor-pointer">
                    Contact
                </a>
            </nav>

            <!-- Language / Utility Controls (EN / JPN) + Mobile Hamburger -->
            <div id="nav-utility-controls" class="flex items-center gap-2 sm:gap-3">
                <!-- Language Switcher (EN / JPN) — wired in Sprint 1 -->
                <div id="lang-switcher"
                    class="flex items-center bg-pill-bg p-0.5 rounded-full border border-border-light">
                    <button id="btn-lang-en" type="button"
                        class="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer bg-primary text-white shadow-xs"
                        aria-label="Switch to English" aria-pressed="true">
                        EN
                    </button>
                    <button id="btn-lang-ja" type="button"
                        class="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer text-secondary hover:text-primary"
                        aria-label="日本語に切り替え" aria-pressed="false">
                        JPN
                    </button>
                </div>

                <!-- Quick Contact Action -->
                <a id="btn-nav-quick-contact" href="mailto:kautsar.rahman@gmail.com"
                    class="p-2 rounded-full text-primary hover:bg-pill-bg border border-transparent hover:border-border-light transition-all cursor-pointer"
                    title="Get in touch" aria-label="Send an email">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                </a>

                <!-- Mobile Hamburger Toggle Button -->
                <button id="btn-mobile-menu" type="button"
                    class="md:hidden p-2 rounded-lg text-primary hover:bg-pill-bg border border-transparent hover:border-border-light transition-all cursor-pointer flex items-center justify-center"
                    aria-label="Toggle mobile menu" :aria-expanded="isMobileMenuOpen" aria-controls="mobile-menu"
                    @click="isMobileMenuOpen = !isMobileMenuOpen">
                    <svg v-show="!isMobileMenuOpen" id="hamburger-icon-bars" class="w-5 h-5 transition-transform"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12"></line>
                        <line x1="4" x2="20" y1="6" y2="6"></line>
                        <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                    <svg v-show="isMobileMenuOpen" id="hamburger-icon-close" class="w-5 h-5 transition-transform"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Pull-Down Dropdown Menu -->
        <div id="mobile-menu"
            class="md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/98 backdrop-blur-md border-b border-[#EDEDED]"
            :class="isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'" :aria-hidden="!isMobileMenuOpen">
            <div class="max-w-6xl mx-auto px-4 py-4 space-y-1">
                <a id="mobile-nav-about" href="#hero"
                    class="flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold text-primary hover:bg-pill-bg transition-colors"
                    @click="closeMobileMenu">
                    About
                    <span class="text-xs text-muted font-mono">01</span>
                </a>
                <a id="mobile-nav-work" href="#work"
                    class="flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold text-primary hover:bg-pill-bg transition-colors"
                    @click="closeMobileMenu">
                    Work
                    <span class="text-xs text-muted font-mono">02</span>
                </a>
                <a id="mobile-nav-contact" href="mailto:kautsar.rahman@gmail.com"
                    class="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold text-primary hover:bg-pill-bg transition-colors cursor-pointer text-left"
                    @click="closeMobileMenu">
                    Contact
                    <span class="text-xs text-muted font-mono">03</span>
                </a>
            </div>
        </div>
    </header>
</template>
