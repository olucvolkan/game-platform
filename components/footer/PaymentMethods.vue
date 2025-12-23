<script setup lang="ts">
const paymentMethods = [
  { name: 'Visa', icon: 'visa' },
  { name: 'Mastercard', icon: 'mastercard' },
  { name: 'PayPal', icon: 'paypal' },
  { name: 'Apple Pay', icon: 'apple-pay' },
  { name: 'Google Pay', icon: 'google-pay' },
  { name: 'Crypto', icon: 'crypto' },
  { name: 'Klarna', icon: 'klarna' },
  { name: 'Skrill', icon: 'skrill' },
]
</script>

<template>
  <div class="bg-white py-4">
    <div class="max-w-container mx-auto px-4">
      <div class="flex items-center justify-center gap-6 flex-wrap">
        <!-- Payment Icons (simplified) -->
        <div
          v-for="method in paymentMethods"
          :key="method.name"
          class="h-8 flex items-center"
        >
          <!-- Visa -->
          <svg
            v-if="method.icon === 'visa'"
            class="h-6"
            viewBox="0 0 48 16"
            fill="none"
          >
            <path d="M17.5 1L14 15H10.5L14 1H17.5Z" fill="#1A1F71" />
            <path d="M30.5 1.5C29.5 1 28 1 26.5 1H21L17.5 15H21L22 11H26C28 11 29.5 10.5 30.5 9L33 1.5H30.5Z" fill="#1A1F71" />
            <path d="M10 1L6 10.5L5.5 8L4 2C4 1.5 3.5 1 3 1H0V1.5C2 2 3.5 2.5 5 3.5L8 15H12L17.5 1H10Z" fill="#1A1F71" />
            <path d="M35 1L38.5 15H42L45 1H41L39 10L37 1H35Z" fill="#1A1F71" />
          </svg>

          <!-- Mastercard -->
          <svg
            v-else-if="method.icon === 'mastercard'"
            class="h-6"
            viewBox="0 0 32 20"
            fill="none"
          >
            <circle cx="12" cy="10" r="8" fill="#EB001B" />
            <circle cx="20" cy="10" r="8" fill="#F79E1B" />
            <path d="M16 4C17.5 5.5 18.5 7.5 18.5 10C18.5 12.5 17.5 14.5 16 16C14.5 14.5 13.5 12.5 13.5 10C13.5 7.5 14.5 5.5 16 4Z" fill="#FF5F00" />
          </svg>

          <!-- PayPal -->
          <svg
            v-else-if="method.icon === 'paypal'"
            class="h-6"
            viewBox="0 0 48 16"
            fill="none"
          >
            <path d="M8 1C12 1 14 2.5 14 5.5C14 9 11 11 7 11H5L4 16H1L4 1H8Z" fill="#003087" />
            <path d="M18 1C22 1 24 2.5 24 5.5C24 9 21 11 17 11H15L14 16H11L14 1H18Z" fill="#009CDE" />
          </svg>

          <!-- Apple Pay -->
          <svg
            v-else-if="method.icon === 'apple-pay'"
            class="h-6"
            viewBox="0 0 48 20"
            fill="none"
          >
            <path d="M10 4C9 4 8 5 8 6.5C8 8 9 9 10 9C11 9 12 8 12 6.5C12 5 11 4 10 4ZM10 10C7 10 5 8.5 5 6.5C5 4.5 7 3 10 3C13 3 15 4.5 15 6.5C15 8.5 13 10 10 10Z" fill="black" />
            <text x="20" y="12" fill="black" font-size="8" font-weight="600">Pay</text>
          </svg>

          <!-- Google Pay -->
          <svg
            v-else-if="method.icon === 'google-pay'"
            class="h-6"
            viewBox="0 0 48 20"
            fill="none"
          >
            <path d="M8 10C8 7 10 5 13 5H16V7H13C11 7 10 8 10 10C10 12 11 13 13 13H16V15H13C10 15 8 13 8 10Z" fill="#4285F4" />
            <text x="20" y="12" fill="#5F6368" font-size="7" font-weight="500">Pay</text>
          </svg>

          <!-- Crypto -->
          <svg
            v-else-if="method.icon === 'crypto'"
            class="h-6"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="10" fill="#F7931A" />
            <path d="M15 9C15 7 13.5 6 11 6V4H9V6C6.5 6 5 7.5 5 9.5C5 11.5 6.5 13 9 13V17C7.5 17 6.5 16 6.5 14.5H4.5C4.5 17 6.5 19 9 19V21H11V19C13.5 19 15 17.5 15 15.5C15 13.5 13.5 12 11 12V8C12.5 8 13 8.5 13 9.5H15V9Z" fill="white" />
          </svg>

          <!-- Klarna -->
          <div
            v-else-if="method.icon === 'klarna'"
            class="text-pink-500 font-bold text-sm"
          >
            Klarna
          </div>

          <!-- Skrill -->
          <div
            v-else-if="method.icon === 'skrill'"
            class="text-purple-600 font-bold text-sm"
          >
            Skrill
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
