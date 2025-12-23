<script setup lang="ts">
// Main header component
const { t } = useLanguage()
</script>

<template>
  <header class="sticky top-0 z-50 bg-primary">
    <!-- Top Bar -->
    <div class="border-b border-white/10">
      <div class="max-w-container mx-auto px-4">
        <div class="flex items-center justify-between h-16 gap-4">
          <!-- Logo -->
          <HeaderLogo />

          <!-- Search Bar -->
          <HeaderSearchBar class="flex-1 max-w-2xl" />

          <!-- Right Actions -->
          <div class="flex items-center gap-4">
            <!-- Region/Currency Selector -->
            <HeaderRegionSelector />

            <!-- User Actions -->
            <HeaderUserActions />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
