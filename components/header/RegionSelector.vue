<script setup lang="ts">
const { currentLanguage, currentCurrency, languages, currencies, setLanguage, setCurrency } = useLanguage()

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (code: string) => {
  setLanguage(code as 'en' | 'tr' | 'de')
}

const selectCurrency = (code: string) => {
  setCurrency(code as 'EUR' | 'USD' | 'TRY')
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.region-selector')) {
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
  <div class="region-selector relative">
    <button
      class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
      @click="toggleDropdown"
    >
      <!-- Flag -->
      <span class="text-lg">{{ currentLanguage.flag }}</span>

      <!-- Language & Currency -->
      <span class="text-sm text-white">
        {{ currentLanguage.name }} | {{ currentCurrency.code }}
      </span>

      <!-- Chevron -->
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
        class="absolute top-full right-0 mt-2 w-64 bg-primary-950 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
      >
        <!-- Language Section -->
        <div class="p-4 border-b border-white/10">
          <h3 class="text-sm font-medium text-muted mb-3">Language</h3>
          <div class="space-y-2">
            <button
              v-for="lang in languages"
              :key="lang.code"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
              :class="[
                currentLanguage.code === lang.code
                  ? 'bg-accent/20 text-accent'
                  : 'hover:bg-white/10 text-white'
              ]"
              @click="selectLanguage(lang.code)"
            >
              <span class="text-lg">{{ lang.flag }}</span>
              <span>{{ lang.nativeName }}</span>
              <svg
                v-if="currentLanguage.code === lang.code"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Currency Section -->
        <div class="p-4">
          <h3 class="text-sm font-medium text-muted mb-3">Currency</h3>
          <div class="space-y-2">
            <button
              v-for="curr in currencies"
              :key="curr.code"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
              :class="[
                currentCurrency.code === curr.code
                  ? 'bg-accent/20 text-accent'
                  : 'hover:bg-white/10 text-white'
              ]"
              @click="selectCurrency(curr.code)"
            >
              <span class="font-medium">{{ curr.symbol }}</span>
              <span>{{ curr.name }}</span>
              <svg
                v-if="currentCurrency.code === curr.code"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
