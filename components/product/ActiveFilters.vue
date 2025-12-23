<script setup lang="ts">
const { hasActiveFilters, activeFilterTags, removeFilterTag, clearAllFilters } = useFilters()
const { t } = useLanguage()
</script>

<template>
  <div
    v-if="hasActiveFilters"
    class="flex flex-wrap items-center gap-2 mb-4"
  >
    <!-- Filter Tags -->
    <div
      v-for="tag in activeFilterTags"
      :key="tag.key"
      class="tag"
    >
      <span class="text-muted-light">{{ tag.label }}:</span>
      <span class="text-white">{{ tag.value }}</span>
      <button
        class="text-muted hover:text-white transition-colors"
        @click="removeFilterTag(tag.key)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Clear All Button -->
    <button
      class="text-accent hover:text-accent-400 text-sm font-medium transition-colors"
      @click="clearAllFilters"
    >
      {{ t('clearAll') }}
    </button>
  </div>
</template>
