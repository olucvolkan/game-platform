<script setup lang="ts">
const { t } = useLanguage()
</script>

<template>
  <footer class="mt-auto">
    <!-- Payment Methods -->
    <FooterPaymentMethods />

    <!-- Main Footer -->
    <div class="bg-overlay py-12">
      <div class="max-w-container mx-auto px-4">

        <!-- Copyright -->
        <div class="py-4">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-muted text-sm">
              2024 Eneba Clone. {{ t('allRightsReserved') }}.
            </p>
            <div class="flex items-center gap-4">
              <span class="text-muted text-sm">Made with Vue.js + Nuxt 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
