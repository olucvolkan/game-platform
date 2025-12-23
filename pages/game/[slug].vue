<script setup lang="ts">
import type { Game } from '~/types'

const route = useRoute()
const { formatPrice } = useLanguage()
const { addToCart, isInCart } = useCart()
const { toggleFavorite, isFavorite } = useFavorites()

const slug = computed(() => route.params.slug as string)

// Fetch game details
const { data: game, pending, error } = await useFetch<Game>(`/api/games/${slug.value}`)

// Computed
const inCart = computed(() => game.value ? isInCart(game.value.id) : false)
const inFavorites = computed(() => game.value ? isFavorite(game.value.id) : false)

// Selected screenshot
const selectedScreenshot = ref(0)

// Page meta
useHead({
  title: computed(() => game.value ? `${game.value.title} - Eneba` : 'Loading...'),
})
</script>

<template>
  <div class="py-8">
    <!-- Loading -->
    <div
      v-if="pending"
      class="flex items-center justify-center min-h-[50vh]"
    >
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
    </div>

    <!-- Error -->
    <div
      v-else-if="error || !game"
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
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 class="text-white text-xl font-medium mb-2">Game Not Found</h2>
      <p class="text-muted mb-6">The game you're looking for doesn't exist.</p>
      <NuxtLink
        to="/list"
        class="btn btn-primary"
      >
        Browse Games
      </NuxtLink>
    </div>

    <!-- Game Details -->
    <div
      v-else
      class="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <!-- Left Column - Images -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Main Image -->
        <div class="relative aspect-video rounded-lg overflow-hidden bg-card">
          <img
            :src="game.screenshots?.[selectedScreenshot] || game.image"
            :alt="game.title"
            class="w-full h-full object-cover"
          />

          <!-- Badges -->
          <div class="absolute top-4 left-4 flex gap-2">
            <span
              v-if="game.discount > 0"
              class="badge badge-discount text-sm"
            >
              -{{ game.discount }}%
            </span>
            <span
              v-if="game.hasCashback"
              class="badge badge-cashback text-sm"
            >
              {{ game.cashbackPercent }}% Cashback
            </span>
          </div>
        </div>

        <!-- Screenshot Thumbnails -->
        <div
          v-if="game.screenshots?.length"
          class="flex gap-2 overflow-x-auto scrollbar-hide"
        >
          <button
            v-for="(screenshot, index) in game.screenshots"
            :key="index"
            class="shrink-0 w-24 h-16 rounded overflow-hidden border-2 transition-all"
            :class="selectedScreenshot === index ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'"
            @click="selectedScreenshot = index"
          >
            <img
              :src="screenshot"
              :alt="`Screenshot ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </button>
        </div>

        <!-- Description -->
        <div class="bg-card rounded-lg p-6">
          <h2 class="text-white text-lg font-medium mb-4">About this game</h2>
          <p class="text-muted leading-relaxed">
            {{ game.description }}
          </p>
        </div>

        <!-- Game Info -->
        <div class="bg-card rounded-lg p-6">
          <h2 class="text-white text-lg font-medium mb-4">Game Details</h2>
          <dl class="grid grid-cols-2 gap-4">
            <div>
              <dt class="text-muted text-sm">Developer</dt>
              <dd class="text-white">{{ game.developer || 'Unknown' }}</dd>
            </div>
            <div>
              <dt class="text-muted text-sm">Publisher</dt>
              <dd class="text-white">{{ game.publisher || 'Unknown' }}</dd>
            </div>
            <div>
              <dt class="text-muted text-sm">Release Date</dt>
              <dd class="text-white">{{ game.releaseDate || 'Unknown' }}</dd>
            </div>
            <div>
              <dt class="text-muted text-sm">Platform</dt>
              <dd class="text-white">{{ game.platform }}</dd>
            </div>
            <div>
              <dt class="text-muted text-sm">Region</dt>
              <dd class="text-accent">{{ game.region }}</dd>
            </div>
            <div>
              <dt class="text-muted text-sm">Type</dt>
              <dd class="text-white">{{ game.productType }}</dd>
            </div>
          </dl>

          <!-- Genres -->
          <div
            v-if="game.genres?.length"
            class="mt-4"
          >
            <dt class="text-muted text-sm mb-2">Genres</dt>
            <dd class="flex flex-wrap gap-2">
              <span
                v-for="genre in game.genres"
                :key="genre"
                class="tag"
              >
                {{ genre }}
              </span>
            </dd>
          </div>
        </div>
      </div>

      <!-- Right Column - Purchase -->
      <div class="lg:col-span-1">
        <div class="sticky top-24 bg-card rounded-lg p-6 space-y-6">
          <!-- Title -->
          <div>
            <h1 class="text-white text-xl font-bold mb-2">
              {{ game.title }}
            </h1>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-muted">{{ game.platform }}</span>
              <span class="text-muted">|</span>
              <span class="text-accent">{{ game.region }}</span>
            </div>
          </div>

          <!-- Price -->
          <div class="flex items-end gap-3">
            <span class="text-white text-3xl font-bold">
              {{ formatPrice(game.price) }}
            </span>
            <span
              v-if="game.discount > 0"
              class="text-muted text-lg line-through"
            >
              {{ formatPrice(game.originalPrice) }}
            </span>
          </div>

          <!-- Cashback Info -->
          <div
            v-if="game.hasCashback"
            class="bg-accent/10 border border-accent/30 rounded-lg p-4"
          >
            <div class="flex items-center gap-2 text-accent">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="font-medium">Up to {{ game.cashbackPercent }}% Cashback</span>
            </div>
            <p class="text-muted text-sm mt-1">
              Get up to {{ formatPrice(game.price * game.cashbackPercent / 100) }} back!
            </p>
          </div>

          <!-- Actions -->
          <div class="space-y-3">
            <button
              class="w-full btn text-lg py-3"
              :class="inCart ? 'bg-green-500 text-white' : 'btn-primary'"
              @click="addToCart(game)"
            >
              {{ inCart ? 'Added to Cart' : 'Add to Cart' }}
            </button>

            <button
              class="w-full btn btn-outline flex items-center justify-center gap-2"
              @click="toggleFavorite(game)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                :fill="inFavorites ? 'currentColor' : 'none'"
                :class="inFavorites ? 'text-red-500' : ''"
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
              {{ inFavorites ? 'Remove from Wishlist' : 'Add to Wishlist' }}
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="border-t border-white/10 pt-6 space-y-3">
            <div class="flex items-center gap-3 text-muted text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Secure Payment</span>
            </div>
            <div class="flex items-center gap-3 text-muted text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Instant Delivery</span>
            </div>
            <div class="flex items-center gap-3 text-muted text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
