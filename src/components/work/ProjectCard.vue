<script setup>
import { computed } from 'vue'

import { useLocale } from '@/composables/useLocale'

const props = defineProps({
    project: { type: Object, required: true },
    /** 1-based position, used for the "01 / 06" marker on the cover. */
    index: { type: Number, required: true },
    total: { type: Number, required: true },
})

const { t, tl } = useLocale()

/** FR-15 — the cover is the first entry in the project's `images[]`. */
const cover = computed(() => props.project.images?.[0] ?? null)

const pad = (n) => String(n).padStart(2, '0')
</script>

<template>
    <article :id="`project-card-${project.id}`"
        class="group flex flex-col bg-transparent rounded-[14px] p-0 transition-all duration-300">
        <!--
            FR-15 — the cover is `images[0]`. A project with no screenshots yet falls back to
            a dark banner built from its own data (category, stats, index), so adding images
            to works.json is enough to switch it over — no markup change needed.
        -->
        <div
            class="relative w-full h-48 bg-[#181A19] clipped-corner-card overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
            <img v-if="cover" :src="cover.src" :alt="cover.alt" loading="lazy"
                class="absolute inset-0 w-full h-full object-cover object-center" />
            <div v-else
                class="absolute inset-0 bg-linear-to-br from-[#1F2221] to-primary p-4 flex flex-col justify-between text-zinc-300 select-none">
                <span class="text-[10px] font-mono tracking-wider text-zinc-400">
                    {{ project.category }}
                </span>
                <span class="text-[11px] font-mono text-white/90">
                    {{ project.stats }}
                </span>
                <span class="text-[10px] font-mono text-zinc-400">
                    {{ pad(index) }} / {{ pad(total) }}
                </span>
            </div>
        </div>

        <div class="flex-1 flex flex-col pt-4">
            <h3 class="text-lg font-bold text-primary group-hover:text-black transition-colors">
                {{ tl(project.title) }}
            </h3>

            <div class="flex flex-wrap gap-1.5 mt-2.5 mb-3">
                <span v-for="tag in project.tags" :key="tag"
                    class="bg-pill-bg text-secondary text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-hairline">
                    {{ tag }}
                </span>
            </div>

            <p class="text-xs sm:text-[13px] text-secondary leading-[1.6] line-clamp-3 mb-5 flex-1">
                {{ tl(project.description) }}
            </p>

            <div class="pt-3 border-t border-hairline flex items-center justify-between gap-3 mt-auto">
                <!--
                    Sprint 3 is browse-only: the card has no detail view yet, so Preview is
                    explicitly disabled rather than silently doing nothing. Sprint 4 (FR-16)
                    wires it to the project modal.
                -->
                <button type="button" disabled
                    class="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs opacity-50 cursor-not-allowed"
                    :title="t('work.preview_coming_soon')">
                    <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                        </path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    {{ t('work.preview') }}
                </button>

                <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 text-xs font-medium text-secondary hover:text-primary transition-colors py-1 cursor-pointer">
                    <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
                        </path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                    {{ t('work.github') }}
                </a>
            </div>
        </div>
    </article>
</template>
