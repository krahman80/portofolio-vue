<script setup>
import { useLocale } from '@/composables/useLocale'
import { useProfile } from '@/composables/useProfile'

const { t, tl } = useLocale()
const { profile } = useProfile()

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
    <footer id="page-footer" class="mt-20 border-t border-hairline bg-surface w-full">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-hairline">
                <!-- Column 1: Monogram & identity -->
                <div class="md:col-span-7 space-y-3">
                    <div class="flex items-center gap-2">
                        <span class="font-black text-xl tracking-tighter text-primary select-none">
                            KR
                        </span>
                        <span class="font-bold text-sm tracking-tight text-primary">
                            {{ profile.name }}.
                        </span>
                    </div>
                    <p class="text-xs text-secondary leading-relaxed max-w-md">
                        {{ tl(profile.bioShort) }}
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
                        <span>{{ profile.location.city }}, Japan {{ profile.location.coords }}</span>
                    </div>
                </div>

                <!-- Column 2: Contact & direct connect (pushed to the right) -->
                <div class="md:col-span-4 md:col-start-9 space-y-3 flex flex-col md:items-end md:text-right">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-primary">
                        {{ t('footer.connect') }}
                    </h4>
                    <div class="space-y-2 text-xs text-secondary">
                        <p>
                            {{ t('footer.email_label') }}
                            <a :href="`mailto:${profile.email}`"
                                class="text-primary underline hover:no-underline font-mono cursor-pointer">
                                {{ profile.email }}
                            </a>
                        </p>
                    </div>
                    <!-- Social icons -->
                    <div class="flex items-center gap-2.5 pt-0.5">
                        <a :href="profile.social.github" target="_blank" rel="noopener noreferrer"
                            class="p-2 bg-pill-bg border border-border-light rounded-md text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                            :title="t('footer.github_aria')" :aria-label="t('footer.github_aria')">
                            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
                                </path>
                                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                            </svg>
                        </a>
                        <a :href="`mailto:${profile.email}`"
                            class="p-2 bg-pill-bg border border-border-light rounded-md text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                            :title="t('footer.email_aria')" :aria-label="t('footer.email_aria')">
                            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                        </a>
                    </div>
                    <!-- Back to top, below the social icons -->
                    <div class="pt-1">
                        <button id="btn-footer-back-to-top" type="button"
                            class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pill-bg border border-border-light rounded-md text-xs font-medium text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                            :aria-label="t('footer.back_to_top')" @click="scrollToTop">
                            {{ t('footer.back_to_top') }}
                            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m5 12 7-7 7 7"></path>
                                <path d="M12 19V5"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bottom copyright strip -->
            <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-3">
                <p>{{ t('footer.copyright') }}</p>
                <p class="font-mono text-[11px]">{{ t('footer.colophon') }}</p>
            </div>
        </div>
    </footer>
</template>
