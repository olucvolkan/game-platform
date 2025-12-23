<script setup lang="ts">
import type { SortOption } from '~/types'

const { filters, sortOptions, setSort } = useFilters()
const { t } = useLanguage()

const isOpen = ref(false)

const currentSortLabel = computed(() => {
  const option = sortOptions.find(o => o.value === filters.value.sortBy)
  return option?.label || t('popularity')
})

const handleSelect = (value: SortOption) => {
  setSort(value)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.sort-dropdown')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="sort-dropdown relative">
    <button
      class="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/15 transition-colors"
      @click="isOpen = !isOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
        />
      </svg>
      <span class="text-white text-sm">
        {{ t('sortBy') }}: <span class="font-medium">{{ currentSortLabel }}</span>
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-muted transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute top-full right-0 mt-2 w-48 bg-primary-950 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
      >
        <ul class="py-1">
          <li
            v-for="option in sortOptions"
            :key="option.value"
          >
            <button
              class="w-full px-4 py-2 text-left text-sm transition-colors"
              :class="[
                filters.sortBy === option.value
                  ? 'bg-accent/20 text-accent'
                  : 'text-white hover:bg-white/10'
              ]"
              @click="handleSelect(option.value)"
            >
              {{ option.label }}
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
