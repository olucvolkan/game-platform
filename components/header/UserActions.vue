<script setup lang="ts">
const { favorites, favoritesCount } = useFavorites()
const { cart, itemCount, isCartOpen, toggleCart } = useCart()
const { t } = useLanguage()

const showAuthModal = ref(false)
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Wishlist/Favorites -->
    <NuxtLink
      to="/favorites"
      class="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
      :title="t('favorites')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <!-- Badge -->
      <span
        v-if="favoritesCount > 0"
        class="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary-950 text-xs font-bold rounded-full flex items-center justify-center"
      >
        {{ favoritesCount > 99 ? '99+' : favoritesCount }}
      </span>
    </NuxtLink>

    <!-- Cart -->
    <div class="relative">
      <button
        class="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
        :title="t('cart')"
        @click="toggleCart"
        @mouseenter="isCartOpen = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <!-- Badge -->
        <span
          v-if="itemCount > 0"
          class="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary-950 text-xs font-bold rounded-full flex items-center justify-center"
        >
          {{ itemCount > 99 ? '99+' : itemCount }}
        </span>
      </button>

      <!-- Cart Popup -->
      <HeaderCartPopup />
    </div>

    <!-- Auth -->
    <div class="flex items-center gap-2 ml-2 pl-2 border-l border-white/20">
      <button
        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-white"
        @click="showAuthModal = true"
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span class="hidden sm:inline">{{ t('login') }} | {{ t('register') }}</span>
      </button>
    </div>
  </div>
</template>
