<script setup lang="ts">
import type { NavItem } from '~/types'

const { t } = useLanguage()

const navItems = computed<NavItem[]>(() => [
  { label: t('categories'), href: '#', icon: 'menu' },
  { label: t('cheapGames'), href: '/list?sort=price-asc' },
  { label: t('randomKeys'), href: '/list?type=random', highlight: true },
  { label: t('giftCards'), href: '/list?type=gift-card' },
  { label: 'Surfshark', href: '/surfshark' },
  { label: t('steamGiftCards'), href: '/list?platform=steam&type=gift-card' },
  { label: t('christmasGifts'), href: '/christmas' },
  { label: t('winterSale'), href: '/winter-sale', highlight: true, badge: 'HOT' },
])

const isMobileMenuOpen = ref(false)
</script>

<template>
  <nav class="bg-black/25">
    <div class="max-w-container mx-auto px-4">
      <div class="flex items-center h-12">
        <!-- Mobile Menu Toggle -->
        <button
          class="lg:hidden p-2 text-white"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <!-- Desktop Navigation -->
        <ul class="hidden lg:flex items-center gap-1">
          <li
            v-for="item in navItems"
            :key="item.href"
          >
            <NuxtLink
              :to="item.href"
              class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              :class="[
                item.highlight
                  ? 'bg-accent text-primary-950 hover:bg-accent-400'
                  : 'text-white hover:bg-white/10'
              ]"
            >
              <!-- Menu Icon -->
              <svg
                v-if="item.icon === 'menu'"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {{ item.label }}
              <!-- Badge -->
              <span
                v-if="item.badge"
                class="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded"
              >
                {{ item.badge }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMobileMenuOpen"
          class="lg:hidden pb-4"
        >
          <ul class="space-y-1">
            <li
              v-for="item in navItems"
              :key="item.href"
            >
              <NuxtLink
                :to="item.href"
                class="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors"
                :class="[
                  item.highlight
                    ? 'bg-accent text-primary-950'
                    : 'text-white hover:bg-white/10'
                ]"
                @click="isMobileMenuOpen = false"
              >
                {{ item.label }}
                <span
                  v-if="item.badge"
                  class="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded"
                >
                  {{ item.badge }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </nav>
</template>
