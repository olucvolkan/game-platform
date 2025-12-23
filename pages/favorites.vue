<script setup lang="ts">
const { favorites, favoritesCount, clearFavorites } = useFavorites()
const { t } = useLanguage()

useHead({
  title: 'My Wishlist - Eneba',
})
</script>

<template>
  <div class="py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-white">
          {{ t('favorites') }}
        </h1>
        <p class="text-muted mt-1">
          {{ favoritesCount }} {{ favoritesCount === 1 ? 'item' : 'items' }} saved
        </p>
      </div>

      <button
        v-if="favoritesCount > 0"
        class="btn btn-outline text-sm"
        @click="clearFavorites"
      >
        Clear All
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-if="favorites.length === 0"
      class="text-center py-16"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto text-muted mb-4"
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
      <h2 class="text-white text-xl font-medium mb-2">Your wishlist is empty</h2>
      <p class="text-muted mb-6">Save games you're interested in to buy later</p>
      <NuxtLink
        to="/list"
        class="btn btn-primary"
      >
        Browse Games
      </NuxtLink>
    </div>

    <!-- Favorites Grid -->
    <ProductGrid
      v-else
      :games="favorites"
    />
  </div>
</template>
