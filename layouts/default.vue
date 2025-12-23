<script setup lang="ts">
// Default layout with header and footer
</script>

<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <!-- Header -->
    <HeaderAppHeader />

    <!-- Main Content -->
    <main class="flex-1">
      <div class="max-w-container mx-auto px-4">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <FooterAppFooter />

    <!-- Floating promo widget (optional) -->
    <UiPromoWidget />
  </div>
</template>
