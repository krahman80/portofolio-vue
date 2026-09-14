<script setup>
import { computed, ref } from 'vue'

import ProjectCard from '@/components/work/ProjectCard.vue'
import ProjectModal from '@/components/work/ProjectModal.vue'
import { useLocale } from '@/composables/useLocale'
import works from '@/data/works.json'

const { t } = useLocale()

/** FR-14 — render one card per entry, in `sortOrder`. */
const projects = computed(() =>
    [...works].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
)

/** FR-16 — the open project, or null. Only one modal can be open at a time. */
const activeProject = ref(null)
</script>

<template>
    <section id="work" class="pt-10 scroll-mt-24 space-y-10">
        <!-- Section header -->
        <div id="work-section-header" class="pb-6 border-b border-hairline">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 bg-pill-bg border border-hairline rounded-full text-xs font-semibold text-secondary mb-2.5">
                {{ t('work.eyebrow') }}
            </div>
            <h2 id="work-title" class="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                {{ t('work.title') }}
            </h2>
            <p id="work-subtitle" class="text-sm text-secondary mt-1.5 max-w-xl">
                {{ t('work.subtitle') }}
            </p>
        </div>

        <!-- Cards grid — 1 col mobile / 2 tablet / 3 desktop (NFR-3) -->
        <div id="work-cards-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            <ProjectCard v-for="(project, i) in projects" :key="project.id" :project="project" :index="i + 1"
                :total="projects.length" @open="activeProject = project" />
        </div>

        <!-- FR-16/FR-22 — detail view. Mounting it conditionally is what triggers the
             focus trap and the focus-return-to-card behaviour on close. -->
        <ProjectModal v-if="activeProject" :project="activeProject" @close="activeProject = null" />
    </section>
</template>
