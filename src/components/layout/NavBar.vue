<script setup>
import { ref } from 'vue'

import { useLocale } from '@/composables/useLocale'

const { locale, setLocale, t } = useLocale()

/**
 * Local-only UI state. The language switcher itself is driven by `useLocale`,
 * so the choice is shared with every other component and persisted (FR-11–FR-13).
 */
const isMobileMenuOpen = ref(false)

function closeMobileMenu() {
    isMobileMenuOpen.value = false
}
</script>

<template>
    <header id="nav-header"
        class="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-hairline transition-all">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <!-- Branding / Logo -->
            <a id="nav-logo" href="#hero" class="flex items-center group cursor-pointer"
                :aria-label="t('nav.brand_aria')">
                <span
                    class="font-black text-2xl tracking-tighter text-primary select-none transition-transform group-hover:scale-105">
                    KR
                </span>
            </a>

            <!-- Menu Links -->
            <nav id="nav-links" class="hidden md:flex items-center gap-8">
                <a id="nav-link-about" href="#hero"
                    class="text-[13px] font-medium text-secondary hover:text-primary transition-colors cursor-pointer">
                    {{ t('nav.about') }}
                </a>
                <a id="nav-link-work" href="#work"
                    class="text-[13px] font-medium text-secondary hover:text-primary transition-colors cursor-pointer">
                    {{ t('nav.work') }}
                </a>
                <a id="nav-link-contact" href="mailto:kautsar.rahman@gmail.com"
                    class="text-[13px] font-medium text-secondary hover:text-primary transition-colors cursor-pointer">
                    {{ t('nav.contact') }}
                </a>
            </nav>

            <!-- Language / utility controls (EN / JPN) + mobile hamburger -->
            <div id="nav-utility-controls" class="flex items-center gap-2 sm:gap-3">
                <!-- Language switcher (EN / JPN) -->
                <div id="lang-switcher"
                    class="flex items-center bg-pill-bg p-0.5 rounded-full border border-border-light" role="group"
                    :aria-label="t('nav.language_aria')">
                    <button id="btn-lang-en" type="button"
                        class="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
                        :class="locale === 'en'
                            ? 'bg-primary text-white shadow-xs'
                            : 'text-secondary hover:text-primary'
                            " aria-label="Switch to English" :aria-pressed="locale === 'en'" @click="setLocale('en')">
                        EN
                    </button>
                    <button id="btn-lang-ja" type="button"
                        class="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
                        :class="locale === 'ja'
                            ? 'bg-primary text-white shadow-xs'
                            : 'text-secondary hover:text-primary'
                            " aria-label="日本語に切り替え" :aria-pressed="locale === 'ja'" @click="setLocale('ja')">
                        JPN
                    </button>
                </div>

                <!-- Quick contact action -->
                <a id="btn-nav-quick-contact" href="mailto:kautsar.rahman@gmail.com"
                    class="p-2 rounded-full text-primary hover:bg-pill-bg border border-transparent hover:border-border-light transition-all cursor-pointer"
                    :title="t('nav.email_title')" :aria-label="t('nav.email_aria')">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                </a>

                <!-- Mobile hamburger toggle -->
                <button id="btn-mobile-menu" type="button"
                    class="md:hidden p-2 rounded-lg text-primary hover:bg-pill-bg border border-transparent hover:border-border-light transition-all cursor-pointer flex items-center justify-center"
                    :aria-label="t('nav.menu_aria')" :aria-expanded="isMobileMenuOpen" aria-controls="mobile-menu"
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

        <!-- Mobile pull-down dropdown menu -->
        <!--
            `inert` (not just aria-hidden) while closed: the collapsed menu still contains
            focusable links, and an aria-hidden container with focusable descendants is an
            accessibility error — keyboard users would tab into invisible links.
        -->
        <div id="mobile-menu"
            class="md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/98 backdrop-blur-md border-b border-hairline"
            :class="isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'" :aria-hidden="!isMobileMenuOpen"
            :inert="!isMobileMenuOpen">
            <div class="max-w-6xl mx-auto px-4 py-4 space-y-1">
                <a id="mobile-nav-about" href="#hero"
                    class="flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold text-primary hover:bg-pill-bg transition-colors"
                    @click="closeMobileMenu">
                    {{ t('nav.about') }}
                    <span class="text-xs text-muted font-mono">01</span>
                </a>
                <a id="mobile-nav-work" href="#work"
                    class="flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold text-primary hover:bg-pill-bg transition-colors"
                    @click="closeMobileMenu">
                    {{ t('nav.work') }}
                    <span class="text-xs text-muted font-mono">02</span>
                </a>
                <a id="mobile-nav-contact" href="mailto:kautsar.rahman@gmail.com"
                    class="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold text-primary hover:bg-pill-bg transition-colors cursor-pointer text-left"
                    @click="closeMobileMenu">
                    {{ t('nav.contact') }}
                    <span class="text-xs text-muted font-mono">03</span>
                </a>
            </div>
        </div>
    </header>
</template>
