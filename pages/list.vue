<script setup lang="ts">
import type { Game, PaginatedResponse } from '~/types'

const route = useRoute()
const { t } = useLanguage()
const { initFiltersFromUrl, filters, sortOptions } = useFilters()

// Initialize filters from URL
onMounted(() => {
  initFiltersFromUrl()
})

// Watch for URL changes
watch(
  () => route.query,
  () => {
    initFiltersFromUrl()
  }
)

// Current page state
const currentPage = ref(1)

// Build query params for API
const queryParams = computed(() => {
  const params: Record<string, string> = {
    page: String(currentPage.value),
    perPage: '20',
  }

  if (filters.value.search) params.search = filters.value.search
  if (filters.value.minPrice) params.minPrice = String(filters.value.minPrice)
  if (filters.value.maxPrice) params.maxPrice = String(filters.value.maxPrice)
  if (filters.value.productTypes?.length) params.types = filters.value.productTypes.join(',')
  if (filters.value.platforms?.length) params.platforms = filters.value.platforms.join(',')
  if (filters.value.genres?.length) params.genres = filters.value.genres.join(',')
  if (filters.value.sortBy) params.sort = filters.value.sortBy

  return params
})

// Fetch games using Laravel API
const { apiBase } = useApi()
const { data, pending, error, refresh } = await useFetch<PaginatedResponse<Game>>(`${apiBase}/list`, {
  query: queryParams,
  watch: [queryParams],
})

const games = computed(() => data.value?.data || [])
const meta = computed(() => data.value?.meta || { total: 0, page: 1, perPage: 20, lastPage: 1 })

// Update page
const updatePage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Watch filters to reset page
watch(
  () => filters.value,
  () => {
    currentPage.value = 1
  },
  { deep: true }
)

// Page title
useHead({
  title: filters.value.search
    ? `Search: ${filters.value.search} - Eneba`
    : 'Games & Gift Cards - Eneba',
})
</script>

<template>
  <div class="py-8">
    <!-- Page Title -->
    <h1 class="text-2xl md:text-3xl font-bold text-white mb-6">
      {{ t('pageTitle') }}
    </h1>

    <div class="flex gap-6">
      <!-- Sidebar -->
      <SidebarFilterSidebar class="hidden lg:block" />

      <!-- Main Content -->
      <div class="flex-1 min-w-0">
        <!-- Active Filters -->
        <ProductActiveFilters />

        <!-- Results Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p class="text-muted">
            {{ t('searchResults') }}: <span class="text-white font-medium">{{ meta.total }}</span>
          </p>

          <ProductSortDropdown />
        </div>

        <!-- Product Grid -->
        <ProductGrid
          :games="games"
          :loading="pending"
        />

        <!-- Pagination -->
        <UiPagination
          :current-page="currentPage"
          :total-pages="meta.lastPage"
          :total-items="meta.total"
          @update:current-page="updatePage"
        />
      </div>
    </div>
  </div>
</template>
