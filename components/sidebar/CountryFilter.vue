<script setup lang="ts">
const { filters, countries, setCountry } = useFilters()
const { t } = useLanguage()

const isExpanded = ref(true)
const selectedCountry = ref('All countries')

watch(
  () => filters.value.countries,
  (newCountries) => {
    selectedCountry.value = newCountries?.length ? newCountries[0] : 'All countries'
  },
  { immediate: true }
)

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  setCountry(target.value)
}
</script>

<template>
  <div class="filter-section">
    <button
      class="filter-title w-full px-4"
      @click="isExpanded = !isExpanded"
    >
      <span>{{ t('country') }}</span>
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
        <select
          :value="selectedCountry"
          class="w-full px-3 py-2 bg-primary-950 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40 cursor-pointer"
          @change="handleChange"
        >
          <option
            v-for="country in countries"
            :key="country"
            :value="country"
          >
            {{ country === 'All countries' ? t('allCountries') : country }}
          </option>
        </select>
      </div>
    </Transition>
  </div>
</template>
