<script setup lang="ts">
import type { Platform } from '~/types'

const { filters, platforms, togglePlatform } = useFilters()
const { t } = useLanguage()

const isExpanded = ref(true)

const isSelected = (platform: Platform): boolean => {
  return filters.value.platforms?.includes(platform) ?? false
}
</script>

<template>
  <div class="filter-section">
    <button
      class="filter-title w-full px-4"
      @click="isExpanded = !isExpanded"
    >
      <span>{{ t('platform') }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-muted transition-transform"
        :class="{ 'rotate-180': !isExpanded }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isExpanded"
        class="px-4 pt-3 space-y-2"
      >
        <label
          v-for="platform in platforms"
          :key="platform.value"
          class="checkbox-label"
        >
          <input
            type="checkbox"
            :checked="isSelected(platform.value)"
            class="w-4 h-4 rounded border-white/30 bg-transparent text-accent focus:ring-accent focus:ring-offset-0"
            @change="togglePlatform(platform.value)"
          />
          <span class="flex-1">{{ platform.label }}</span>
          <span class="text-muted text-sm">{{ platform.count }}</span>
        </label>
      </div>
    </Transition>
  </div>
</template>
