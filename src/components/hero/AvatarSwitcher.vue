<script setup>
import { useLocale } from '@/composables/useLocale'
import { useProfile } from '@/composables/useProfile'

const { t } = useLocale()
const { avatars, selectedAvatarId, setAvatar } = useProfile()

/**
 * FR-7 – FR-10.
 *
 * There is no avatar picker in `template.html` (it is a new capability), so this is
 * built from the closest existing control pattern: the header's EN/JPN pill
 * (`bg-pill-bg` + hairline border + `rounded-full`), with the active state marked the
 * same way that switcher marks the active language (`bg-primary` → here, a primary ring).
 *
 * The swatches are real <button>s in the tab order with `aria-pressed`, matching the
 * language switcher, so "tab + Enter/Space" works without any extra key handling.
 */
</script>

<template>
    <div id="hero-avatar-switcher"
        class="inline-flex items-center gap-2 bg-pill-bg border border-border-light rounded-full p-1.5" role="group"
        :aria-label="t('hero.avatar_picker_label')">
        <button v-for="avatar in avatars" :key="avatar.id" type="button"
            class="w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            :class="avatar.id === selectedAvatarId
                ? 'border-primary opacity-100'
                : 'border-transparent opacity-50 hover:opacity-100'
                " :aria-label="avatar.alt" :aria-pressed="avatar.id === selectedAvatarId"
            @click="setAvatar(avatar.id)">
            <!-- Alt text lives on the button; an empty alt avoids a double announcement. -->
            <img :src="avatar.src" alt="" loading="lazy" decoding="async"
                class="w-full h-full object-cover object-center grayscale contrast-125 brightness-95" />
        </button>
    </div>
</template>
