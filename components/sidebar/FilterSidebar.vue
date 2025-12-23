<script setup lang="ts">
const { t } = useLanguage()
</script>

<template>
  <aside class="w-[220px] shrink-0">
    <div class="sticky top-20 space-y-0 bg-filter rounded-lg overflow-hidden">
      <!-- Price Filter -->
      <SidebarPriceFilter />

      <!-- Country Filter -->
      <SidebarCountryFilter />

      <!-- Product Type Filter -->
      <SidebarProductTypeFilter />

      <!-- Platform Filter -->
      <SidebarPlatformFilter />

      <!-- Genre Filter -->
      <SidebarGenreFilter />
    </div>
  </aside>
</template>
