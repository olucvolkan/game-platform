<script setup lang="ts">
const { favorites, favoritesCount } = useFavorites()
const { cart, itemCount, isCartOpen, toggleCart } = useCart()
const { t } = useLanguage()
const { isAuthenticated, user, logout } = useAuth()

const showAuthModal = ref(false)
const showUserMenu = ref(false)

const handleLogout = async () => {
  await logout()
  showUserMenu.value = false
  // Reload favorites after logout
  const { loadFavorites } = useFavorites()
  await loadFavorites()
}

// Close user menu when clicking outside
const userMenuRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  if (process.client) {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})
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
    <div
      ref="userMenuRef"
      class="flex items-center gap-2 ml-2 pl-2 border-l border-white/20"
    >
      <!-- Not Authenticated - Show Login Button -->
      <button
        v-if="!isAuthenticated"
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
        <span class="hidden sm:inline">{{ t('login') }}</span>
      </button>

      <!-- Authenticated - Show User Menu -->
      <div
        v-else
        class="relative"
      >
        <button
          class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          @click="showUserMenu = !showUserMenu"
        >
          <div class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary-950 font-semibold text-sm">
            {{ user?.name?.charAt(0).toUpperCase() }}
          </div>
          <span class="hidden sm:inline text-white text-sm">{{ user?.name }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-muted transition-transform"
            :class="showUserMenu ? 'rotate-180' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <Transition
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 translate-y-1"
          leave-to-class="opacity-0 translate-y-1"
        >
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-primary-950 rounded-lg shadow-xl border border-white/10 py-2 z-50"
          >
            <div class="px-4 py-2 border-b border-white/10">
              <p class="text-white text-sm font-medium truncate">{{ user?.name }}</p>
              <p class="text-muted text-xs truncate">{{ user?.email }}</p>
            </div>

            <NuxtLink
              to="/favorites"
              class="flex items-center gap-3 px-4 py-2 text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
              @click="showUserMenu = false"
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {{ t('favorites') }}
            </NuxtLink>

            <button
              class="w-full flex items-center gap-3 px-4 py-2 text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
              @click="handleLogout"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {{ t('logout') }}
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Auth Modal -->
    <AuthModal v-model="showAuthModal" />
  </div>
</template>
