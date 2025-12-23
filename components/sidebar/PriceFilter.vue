<script setup lang="ts">
const { filters, setPriceRange } = useFilters()
const { t, currentCurrency } = useLanguage()

const isExpanded = ref(true)
const minPrice = ref<string>('')
const maxPrice = ref<string>('')

// Sync with filters
watch(
  () => filters.value,
  (newFilters) => {
    minPrice.value = newFilters.minPrice?.toString() ?? ''
    maxPrice.value = newFilters.maxPrice?.toString() ?? ''
  },
  { immediate: true }
)

const applyPriceFilter = () => {
  const min = minPrice.value ? parseFloat(minPrice.value) : undefined
  const max = maxPrice.value ? parseFloat(maxPrice.value) : undefined
  setPriceRange(min, max)
}

// Debounce price input
let debounceTimer: ReturnType<typeof setTimeout> | null = null
const handlePriceChange = () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(applyPriceFilter, 500)
}
</script>

<template>
  <div class="filter-section">
    <button
      class="filter-title w-full px-4"
      @click="isExpanded = !isExpanded"
    >
      <span>{{ t('priceRange') }} ({{ currentCurrency.code }})</span>
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
        <div class="flex items-center gap-2">
          <input
            v-model="minPrice"
            type="number"
            :placeholder="currentCurrency.symbol"
            class="w-full px-3 py-2 bg-primary-950 border border-white/20 rounded text-white text-sm placeholder-muted focus:outline-none focus:border-white/40"
            min="0"
            @input="handlePriceChange"
          />
          <span class="text-muted">-</span>
          <input
            v-model="maxPrice"
            type="number"
            :placeholder="currentCurrency.symbol"
            class="w-full px-3 py-2 bg-primary-950 border border-white/20 rounded text-white text-sm placeholder-muted focus:outline-none focus:border-white/40"
            min="0"
            @input="handlePriceChange"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
