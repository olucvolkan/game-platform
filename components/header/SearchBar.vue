<script setup lang="ts">
import type { AutocompleteSuggestion } from '~/types'

const searchQuery = ref('')
const isOpen = ref(false)
const suggestions = ref<AutocompleteSuggestion[]>([])
const isLoading = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const { search } = useSearch()
const router = useRouter()
const { apiBase } = useApi()

// Debounced autocomplete
let debounceTimer: ReturnType<typeof setTimeout> | null = null

const handleInput = async () => {
  if (debounceTimer) clearTimeout(debounceTimer)

  if (searchQuery.value.length < 2) {
    suggestions.value = []
    isOpen.value = false
    return
  }

  debounceTimer = setTimeout(async () => {
    isLoading.value = true
    try {
      const response = await $fetch<{ suggestions: AutocompleteSuggestion[] }>(
        `${apiBase}/autocomplete?q=${encodeURIComponent(searchQuery.value)}`
      )
      suggestions.value = response.suggestions
      isOpen.value = suggestions.value.length > 0
    } catch (error) {
      console.error('Autocomplete error:', error)
      suggestions.value = []
    } finally {
      isLoading.value = false
    }
  }, 300)
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/list', query: { search: searchQuery.value } })
    isOpen.value = false
  }
}

const selectSuggestion = (suggestion: AutocompleteSuggestion) => {
  searchQuery.value = suggestion.title
  isOpen.value = false
  router.push(`/game/${suggestion.slug}`)
}

const clearSearch = () => {
  searchQuery.value = ''
  suggestions.value = []
  isOpen.value = false
  inputRef.value?.focus()
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.search-container')) {
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
  <div class="search-container relative">
    <div class="relative flex items-center">
      <!-- Search Icon -->
      <div class="absolute left-3 text-muted pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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

      <!-- Input -->
      <input
        ref="inputRef"
        v-model="searchQuery"
        type="text"
        placeholder="Search games, gift cards..."
        class="w-full pl-10 pr-10 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-muted focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
        @input="handleInput"
        @keydown.enter="handleSearch"
        @focus="isOpen = suggestions.length > 0"
      />

      <!-- Clear Button -->
      <button
        v-if="searchQuery"
        class="absolute right-3 text-muted hover:text-white transition-colors"
        @click="clearSearch"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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

      <!-- Loading Spinner -->
      <div
        v-if="isLoading"
        class="absolute right-3 text-muted"
      >
        <svg
          class="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>

    <!-- Autocomplete Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen && suggestions.length > 0"
        class="absolute top-full left-0 right-0 mt-2 bg-primary-950 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
      >
        <ul class="py-2">
          <li
            v-for="suggestion in suggestions"
            :key="suggestion.id"
            class="px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors"
            @click="selectSuggestion(suggestion)"
          >
            <div class="flex items-center gap-3">
              <img
                v-if="suggestion.image"
                :src="suggestion.image"
                :alt="suggestion.title"
                class="w-10 h-10 object-cover rounded"
              />
              <div
                v-else
                class="w-10 h-10 bg-white/10 rounded flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span class="text-white">{{ suggestion.title }}</span>
            </div>
          </li>
        </ul>

        <!-- View All Results -->
        <div class="border-t border-white/10 px-4 py-3">
          <button
            class="w-full text-center text-accent hover:text-accent-400 text-sm font-medium transition-colors"
            @click="handleSearch"
          >
            View all results for "{{ searchQuery }}"
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
