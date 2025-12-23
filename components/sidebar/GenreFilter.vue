<script setup lang="ts">
const { filters, genres, toggleGenre } = useFilters()
const { t } = useLanguage()

const isExpanded = ref(true)
const searchQuery = ref('')

const filteredGenres = computed(() => {
  if (!searchQuery.value) return genres
  return genres.filter(genre =>
    genre.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const isSelected = (genre: string): boolean => {
  return filters.value.genres?.includes(genre) ?? false
}
</script>

<template>
  <div class="filter-section border-b-0">
    <button
      class="filter-title w-full px-4"
      @click="isExpanded = !isExpanded"
    >
      <span>{{ t('genre') }}</span>
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
        class="px-4 pt-3"
      >
        <!-- Genre Search -->
        <div class="relative mb-3">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search genres..."
            class="w-full px-3 py-2 bg-primary-950 border border-white/20 rounded text-white text-sm placeholder-muted focus:outline-none focus:border-white/40"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <!-- Genre List -->
        <div class="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
          <label
            v-for="genre in filteredGenres"
            :key="genre.value"
            class="checkbox-label"
          >
            <input
              type="checkbox"
              :checked="isSelected(genre.value)"
              class="w-4 h-4 rounded border-white/30 bg-transparent text-accent focus:ring-accent focus:ring-offset-0"
              @change="toggleGenre(genre.value)"
            />
            <span class="flex-1">{{ genre.label }}</span>
            <span class="text-muted text-sm">{{ genre.count }}</span>
          </label>
        </div>
      </div>
    </Transition>
  </div>
</template>
