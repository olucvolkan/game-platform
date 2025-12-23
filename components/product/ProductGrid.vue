<script setup lang="ts">
import type { Game } from '~/types'

defineProps<{
  games: Game[]
  loading?: boolean
}>()

const skeletonCount = 8
</script>

<template>
  <div>
    <!-- Loading Skeleton -->
    <div
      v-if="loading"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="i in skeletonCount"
        :key="i"
        class="card animate-pulse"
      >
        <div class="aspect-[3/4] bg-white/10" />
        <div class="p-3 space-y-3">
          <div class="h-4 bg-white/10 rounded w-3/4" />
          <div class="h-3 bg-white/10 rounded w-1/2" />
          <div class="flex justify-between">
            <div class="h-5 bg-white/10 rounded w-16" />
            <div class="h-5 bg-white/10 rounded w-20" />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="games.length === 0"
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
      <h3 class="text-white text-lg font-medium mb-2">No games found</h3>
      <p class="text-muted">Try adjusting your filters or search query</p>
    </div>

    <!-- Product Grid -->
    <div
      v-else
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <ProductCard
        v-for="game in games"
        :key="game.id"
        :game="game"
      />
    </div>
  </div>
</template>
