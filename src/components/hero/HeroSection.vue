<script setup>
import { computed, ref } from 'vue'

import SkillPills from '@/components/hero/SkillPills.vue'
import { useLocale } from '@/composables/useLocale'
import { useProfile } from '@/composables/useProfile'

const { t, tl } = useLocale()
const { profile, avatars } = useProfile()

/**
 * Sprint 1 shows the default portrait only. Sprint 2 adds the 3-thumbnail
 * switcher plus localStorage persistence on top of `useProfile`.
 */
const avatar = computed(
    () => avatars.find((entry) => entry.id === profile.defaultAvatarId) ?? avatars[0],
)

const copied = ref(false)

async function copyEmail() {
    try {
        await navigator.clipboard.writeText(profile.email)
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch {
        // Clipboard is unavailable outside a secure context — the address is
        // rendered next to the button, so it can still be selected by hand.
    }
}
</script>

<template>
    <section id="hero"
        class="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 items-start pt-2 sm:pt-6 scroll-mt-24">
        <!-- Left Column: Portrait with circular frame & halftone dot-grid accents -->
        <div id="hero-portrait-column"
            class="lg:col-span-5 flex justify-center lg:justify-start order-1 lg:order-1 pt-0 lg:pt-12.5">
            <div class="relative w-70 sm:w-85">
                <!-- Decorative halftone dot-grid cluster (top-right) -->
                <div id="hero-dot-grid-top"
                    class="absolute -top-3 -right-3 w-20 h-20 dot-grid-pattern opacity-60 pointer-events-none z-0"
                    aria-hidden="true"></div>

                <!-- Decorative halftone dot-grid cluster (bottom-left) -->
                <div id="hero-dot-grid-bottom"
                    class="absolute -bottom-3 -left-3 w-24 h-20 dot-grid-pattern opacity-60 pointer-events-none z-0"
                    aria-hidden="true"></div>

                <!-- Outer circular framing container -->
                <div class="relative z-10 bg-surface p-2 border border-border-light rounded-full shadow-sm">
                    <div id="hero-portrait-frame"
                        class="relative w-full aspect-square bg-hairline rounded-full overflow-hidden">
                        <img id="hero-portrait-image" :src="avatar.src" :alt="avatar.alt"
                            class="w-full h-full object-cover object-center grayscale contrast-125 brightness-95 transition-transform duration-500 hover:scale-105" />

                        <!-- Monochromatic gradient vignette -->
                        <div
                            class="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none">
                        </div>

                        <!-- Status badge centered near the bottom of the circle -->
                        <div
                            class="absolute bottom-5 inset-x-0 flex justify-center text-white text-xs pointer-events-none">
                            <span
                                class="flex items-center gap-1.5 bg-primary/85 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-medium border border-white/15 shadow-xs">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                {{ tl(profile.status) }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Location tag below portrait -->
                <div class="mt-4 flex items-center justify-between px-2 text-xs text-muted">
                    <div class="flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path
                                d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0">
                            </path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{{ profile.location.city }}</span>
                    </div>
                    <span class="font-mono text-[11px]">{{ profile.location.coords }}</span>
                </div>
            </div>
        </div>

        <!-- Right Column: Headline, bio, and CTAs -->
        <div id="hero-content-column" class="lg:col-span-7 flex flex-col justify-start order-2 lg:order-2 space-y-6">
            <!-- Greeting tag -->
            <div
                class="inline-flex items-center gap-2 self-start px-3 py-1 bg-pill-bg border border-hairline rounded-full text-xs font-medium text-secondary">
                <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {{ tl(profile.role) }}
            </div>

            <!-- Headline with inverted "highlighter" span -->
            <h1 id="hero-headline"
                class="text-3xl sm:text-4xl lg:text-[44px] font-bold text-primary tracking-tight leading-[1.2]">
                {{ t('hero.headline_before') }}
                <span id="hero-highlighter"
                    class="bg-primary text-white px-2.5 py-0.5 rounded-xs inline-block font-bold tracking-tight transform -rotate-0.5">
                    {{ t('hero.headline_highlight') }}
                </span>
                {{ t('hero.headline_after') }}
            </h1>

            <!-- Brief bio -->
            <p id="hero-bio" class="text-secondary text-base sm:text-lg leading-[1.65] max-w-2xl font-normal">
                {{ tl(profile.bio) }}
            </p>

            <!-- Core competencies -->
            <SkillPills :skills="profile.skills" />

            <!-- Calls to action -->
            <div id="hero-ctas" class="flex flex-wrap items-center gap-4 pt-4 sm:pt-6">
                <a id="btn-cta-contact" :href="`mailto:${profile.email}`"
                    class="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-6 py-3.5 rounded-[10px] hover:bg-primary-hover transition-all cursor-pointer shadow-xs active:scale-[0.98]">
                    {{ t('hero.cta_contact') }}
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                    </svg>
                </a>

                <a id="btn-cta-work" href="#work"
                    class="inline-flex items-center justify-center gap-2 bg-white text-primary text-sm font-semibold px-6 py-3.5 rounded-[10px] border border-border-light hover:border-primary hover:bg-pill-bg transition-all cursor-pointer active:scale-[0.98]">
                    {{ t('hero.cta_work') }}
                </a>

                <button id="btn-copy-email" type="button"
                    class="inline-flex items-center gap-1.5 text-xs text-muted hover:text-primary py-2 px-2 transition-colors cursor-pointer"
                    :title="t('hero.copy_email_title')" @click="copyEmail">
                    <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                    </svg>
                    <span>{{ copied ? t('hero.copied') : profile.email }}</span>
                </button>
            </div>
        </div>
    </section>
</template>
