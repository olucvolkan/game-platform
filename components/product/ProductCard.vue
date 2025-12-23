<script setup lang="ts">
import type { Game } from '~/types'

const props = defineProps<{
  game: Game
}>()

const { addToCart, isInCart } = useCart()
const { toggleFavorite, isFavorite } = useFavorites()
const { formatPrice } = useLanguage()

const isHovered = ref(false)
const inCart = computed(() => isInCart(props.game.id))
const inFavorites = computed(() => isFavorite(props.game.id))

const handleAddToCart = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  addToCart(props.game)
}

const handleToggleFavorite = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  toggleFavorite(props.game)
}
</script>

<template>
  <NuxtLink
    :to="`/game/${game.slug}`"
    class="card group block"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Image Container -->
    <div class="relative aspect-[3/4] overflow-hidden">
      <img
        :src="game.image"
        :alt="game.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Platform Badge -->
      <div class="absolute top-2 left-2">
        <span class="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
          {{ game.platform }}
        </span>
      </div>

      <!-- Wishlist Button -->
      <button
        class="absolute top-2 right-2 p-2 bg-black/50 rounded-full transition-all"
        :class="[
          isHovered || inFavorites ? 'opacity-100' : 'opacity-0',
          inFavorites ? 'text-red-500' : 'text-white hover:text-red-400'
        ]"
        @click="handleToggleFavorite"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          :fill="inFavorites ? 'currentColor' : 'none'"
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
      </button>

      <!-- Cashback Badge -->
      <div
        v-if="game.hasCashback"
        class="absolute bottom-2 left-2"
      >
        <span class="badge badge-cashback flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          CASHBACK
        </span>
      </div>

      <!-- DLC Badge -->
      <div
        v-if="game.productType === 'DLC'"
        class="absolute bottom-2 right-2"
      >
        <span class="badge badge-dlc">DLC</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-3">
      <!-- Platform Icon & Title -->
      <div class="flex items-start gap-2 mb-2">
        <div class="shrink-0 mt-0.5">
          <UiPlatformIcon :platform="game.platform" class="w-4 h-4 text-muted" />
        </div>
        <h3 class="text-white text-sm font-medium line-clamp-2 leading-tight">
          {{ game.title }}
        </h3>
      </div>

      <!-- Region -->
      <p class="text-accent text-xs font-medium mb-3">
        {{ game.region }}
      </p>

      <!-- Price -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <!-- Discount Badge -->
          <span
            v-if="game.discount > 0"
            class="badge badge-discount"
          >
            -{{ game.discount }}%
          </span>

          <!-- Original Price (strikethrough) -->
          <span
            v-if="game.discount > 0"
            class="text-muted text-sm line-through"
          >
            {{ formatPrice(game.originalPrice) }}
          </span>
        </div>

        <!-- Current Price -->
        <span class="text-white font-bold">
          {{ formatPrice(game.price) }}
        </span>
      </div>

      <!-- Add to Cart Button (shows on hover) -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <button
          v-if="isHovered"
          class="w-full mt-3 btn text-sm"
          :class="inCart ? 'bg-green-500 text-white' : 'btn-primary'"
          @click="handleAddToCart"
        >
          {{ inCart ? 'In Cart' : 'Add to Cart' }}
        </button>
      </Transition>
    </div>
  </NuxtLink>
</template>
