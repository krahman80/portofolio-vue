<script setup>
defineProps({
    skills: {
        type: Array,
        required: true,
    },
})
</script>

<template>
    <div id="hero-skills-row" class="flex flex-wrap gap-2 pt-1">
        <span v-for="skill in skills" :key="skill"
            class="bg-pill-bg border border-hairline text-emphasis text-xs font-medium px-3 py-1 rounded-full">
            {{ skill }}
        </span>
    </div>
</template>
