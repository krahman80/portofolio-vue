<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import ImageCarousel from '@/components/work/ImageCarousel.vue'
import { useFocusTrap } from '@/composables/useFocusTrap'
import { useLocale } from '@/composables/useLocale'

const props = defineProps({
    project: { type: Object, required: true },
})

const emit = defineEmits(['close'])

const { t, tl } = useLocale()

const panelRef = ref(null)

/**
 * FR-22 / NFR-2 — focus stays inside the panel while open, and returns to the card that
 * opened it on close. `getFallback` covers the mouse case: clicking a card leaves
 * `document.activeElement` as `<body>`, which isn't worth restoring focus to.
 */
const { activate, deactivate } = useFocusTrap(panelRef, {
    getFallback: () => document.getElementById(`project-card-${props.project.id}`),
})

function close() {
    emit('close')
}

/** FR-22 — Esc dismisses. */
function onKeydown(event) {
    if (event.key !== 'Escape') return
    event.preventDefault()
    close()
}

onMounted(() => {
    activate()
    document.addEventListener('keydown', onKeydown)
    // Prevent the page behind the modal from scrolling.
    document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
    deactivate()
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
})
</script>

<template>
    <!-- FR-22 — backdrop click dismisses; .self keeps clicks inside the panel from closing it. -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        @click.self="close">
        <div ref="panelRef" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" tabindex="-1"
            class="relative w-full max-w-2xl max-h-[90vh] outline-none">
            <button type="button"
                class="absolute top-3 right-3 z-10 p-2 rounded-full bg-primary/70 text-white hover:bg-primary transition-colors cursor-pointer backdrop-blur-xs"
                :aria-label="t('work.close_dialog')" @click="close">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
            </button>

            <div class="bg-white border border-border-light rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
                <!-- FR-19 — the banner area is the carousel. -->
                <ImageCarousel v-if="project.images?.length" :images="project.images" />

                <div class="p-6 sm:p-8 space-y-4">
                    <div class="flex items-center justify-between gap-3 text-xs font-mono">
                        <span class="text-muted">
                            {{ t('work.project_id') }}: {{ project.id.toUpperCase() }}
                        </span>
                        <span class="bg-pill-bg border border-hairline px-2 py-0.5 rounded-xs text-secondary">
                            {{ project.category }}
                        </span>
                    </div>

                    <h3 id="project-modal-title" class="text-xl font-bold tracking-tight text-primary">
                        {{ tl(project.title) }}
                    </h3>

                    <p class="text-xs text-muted font-mono">{{ project.stats }}</p>

                    <div>
                        <h4 class="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                            {{ t('work.architecture') }}
                        </h4>
                        <p class="text-xs sm:text-[13px] text-secondary leading-relaxed">
                            {{ tl(project.description) }}
                        </p>
                    </div>

                    <div>
                        <h4 class="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                            {{ t('work.tech_stack') }}
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="tag in project.tags" :key="tag"
                                class="bg-pill-bg text-primary border border-border-light text-xs font-medium px-3 py-1 rounded-full">
                                {{ tag }}
                            </span>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-3">
                        <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary transition-colors cursor-pointer">
                            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
                                </path>
                                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                            </svg>
                            {{ t('work.github_repository') }}
                        </a>

                        <a :href="project.previewUrl" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary-hover transition-colors cursor-pointer">
                            {{ t('work.launch_live_app') }}
                            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 7h10v10"></path>
                                <path d="M7 17 17 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
