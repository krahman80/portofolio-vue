<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useLocale } from '@/composables/useLocale'

const props = defineProps({
    images: { type: Array, required: true },
})

const { t } = useLocale()

const current = ref(0)
const count = computed(() => props.images.length)
const slide = computed(() => props.images[current.value] ?? null)

// Reset to the first slide if this instance is reused for a different project.
watch(
    () => props.images,
    () => {
        current.value = 0
    },
)

/**
 * FR-21 — advancing is user-driven only; there is deliberately no autoplay timer.
 * The index wraps in both directions.
 */
function goTo(index) {
    if (!count.value) return
    current.value = (index + count.value) % count.value
}

const previous = () => goTo(current.value - 1)
const next = () => goTo(current.value + 1)

/** FR-20 — ←/→ while the modal is focused. The carousel only ever mounts inside the modal. */
function onKeydown(event) {
    if (event.key === 'ArrowLeft') {
        event.preventDefault()
        previous()
    } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        next()
    }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))

/** FR-20 — swipe on touch devices. */
let touchStartX = null

function onTouchStart(event) {
    touchStartX = event.changedTouches[0]?.clientX ?? null
}

function onTouchEnd(event) {
    if (touchStartX === null) return
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX
    if (Math.abs(delta) > 40) {
        if (delta < 0) next()
        else previous()
    }
    touchStartX = null
}
</script>

<template>
    <!--
        FR-19/NFR-4. The frame has a FIXED aspect ratio and the image is cropped into it,
        so slides cannot reflow between each other no matter how varied the source
        screenshots are (they currently range from 0.69 to 1.40). `object-top` keeps the
        top of each page capture — the part that identifies the project — in view.
        Only the active slide is rendered, so inactive images are never fetched (NFR-1).
    -->
    <div class="relative w-full aspect-4/3 bg-[#181A19] overflow-hidden select-none" @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd">
        <img v-if="slide" :key="slide.src" :src="slide.src" :alt="slide.alt" loading="lazy"
            class="carousel-slide absolute inset-0 w-full h-full object-cover object-top" />

        <template v-if="count > 1">
            <button type="button"
                class="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary/70 text-white hover:bg-primary transition-colors cursor-pointer backdrop-blur-xs"
                :aria-label="t('work.previous_image')" @click="previous">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
            </button>

            <button type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary/70 text-white hover:bg-primary transition-colors cursor-pointer backdrop-blur-xs"
                :aria-label="t('work.next_image')" @click="next">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>

            <span
                class="absolute top-3 left-3 px-2 py-0.5 rounded-xs bg-primary/70 backdrop-blur-xs text-[10px] font-mono text-white/90">
                {{ current + 1 }} / {{ count }}
            </span>

            <div class="absolute bottom-3 inset-x-0 flex justify-center gap-2">
                <button v-for="(image, i) in images" :key="image.src" type="button"
                    class="w-2 h-2 rounded-full transition-all cursor-pointer" :class="i === current
                        ? 'bg-white scale-125'
                        : 'bg-white/40 hover:bg-white/70'
                        " :aria-label="t('work.go_to_image', { n: i + 1 })" :aria-current="i === current"
                    @click="goTo(i)" />
            </div>
        </template>
    </div>
</template>

<style scoped>
@keyframes carousel-fade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.carousel-slide {
    animation: carousel-fade 200ms ease;
}

/* NFR-4 — no slide animation for visitors who ask for reduced motion. */
@media (prefers-reduced-motion: reduce) {
    .carousel-slide {
        animation: none;
    }
}
</style>
