<script setup lang="ts">
const { cart, isCartOpen, removeFromCart, total, itemCount, formatPrice } = useCart()
const { currentCurrency } = useLanguage()

// Close popup when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.cart-popup-container')) {
    isCartOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0 translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-1"
  >
    <div
      v-if="isCartOpen"
      class="cart-popup-container absolute top-full right-0 mt-2 w-80 bg-primary-950 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
      @mouseleave="isCartOpen = false"
    >
      <!-- Header -->
      <div class="p-4 border-b border-white/10">
        <h3 class="text-white font-medium">
          Shopping Cart
          <span class="text-muted text-sm">({{ itemCount }} items)</span>
        </h3>
      </div>

      <!-- Empty Cart -->
      <div
        v-if="cart.items.length === 0"
        class="p-8 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 mx-auto text-muted mb-4"
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
        <p class="text-muted">Your cart is empty</p>
        <NuxtLink
          to="/list"
          class="inline-block mt-4 btn btn-primary text-sm"
        >
          Browse Games
        </NuxtLink>
      </div>

      <!-- Cart Items -->
      <div
        v-else
        class="max-h-64 overflow-y-auto scrollbar-hide"
      >
        <div
          v-for="item in cart.items"
          :key="item.game.id"
          class="p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
        >
          <div class="flex gap-3">
            <img
              :src="item.game.image"
              :alt="item.game.title"
              class="w-16 h-16 object-cover rounded"
            />
            <div class="flex-1 min-w-0">
              <h4 class="text-white text-sm font-medium truncate">
                {{ item.game.title }}
              </h4>
              <p class="text-muted text-xs mt-1">
                {{ item.game.platform }} - {{ item.game.region }}
              </p>
              <div class="flex items-center justify-between mt-2">
                <span class="text-accent font-medium">
                  {{ formatPrice(item.game.price) }}
                </span>
                <button
                  class="text-muted hover:text-red-400 transition-colors"
                  @click="removeFromCart(item.game.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        v-if="cart.items.length > 0"
        class="p-4 bg-primary-950/50"
      >
        <div class="flex items-center justify-between mb-4">
          <span class="text-muted">Total:</span>
          <span class="text-white text-lg font-bold">
            {{ formatPrice(total) }}
          </span>
        </div>
        <NuxtLink
          to="/checkout"
          class="block w-full btn btn-primary text-center"
          @click="isCartOpen = false"
        >
          Proceed to Checkout
        </NuxtLink>
      </div>
    </div>
  </Transition>
</template>
