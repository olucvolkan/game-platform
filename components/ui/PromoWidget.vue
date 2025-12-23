<script setup lang="ts">
const isVisible = ref(true)
const countdown = ref({
  days: 5,
  hours: 10,
  minutes: 25,
  seconds: 33,
})

// Simple countdown timer
let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  interval = setInterval(() => {
    if (countdown.value.seconds > 0) {
      countdown.value.seconds--
    } else if (countdown.value.minutes > 0) {
      countdown.value.minutes--
      countdown.value.seconds = 59
    } else if (countdown.value.hours > 0) {
      countdown.value.hours--
      countdown.value.minutes = 59
      countdown.value.seconds = 59
    } else if (countdown.value.days > 0) {
      countdown.value.days--
      countdown.value.hours = 23
      countdown.value.minutes = 59
      countdown.value.seconds = 59
    }
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

const formatNumber = (num: number): string => {
  return num.toString().padStart(2, '0')
}

const close = () => {
  isVisible.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 -translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 -translate-x-full"
  >
    <div
      v-if="isVisible"
      class="fixed left-0 top-1/2 -translate-y-1/2 z-40"
    >
      <div class="relative bg-gradient-to-br from-accent to-accent-600 rounded-r-lg p-4 shadow-xl max-w-[140px]">
        <!-- Close Button -->
        <button
          class="absolute -top-2 -right-2 w-6 h-6 bg-primary-950 rounded-full flex items-center justify-center text-white hover:bg-primary-800 transition-colors"
          @click="close"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Content -->
        <div class="text-primary-950">
          <p class="text-xs font-bold leading-tight">
            UP TO 25%
          </p>
          <p class="text-lg font-bold leading-tight">
            CASHBACK!*
          </p>

          <p class="text-[10px] mt-2 opacity-80">
            ENDS IN:
          </p>

          <!-- Countdown -->
          <div class="flex gap-1 mt-1">
            <div class="bg-primary-950 text-white text-center rounded px-1 py-0.5">
              <div class="text-sm font-bold">{{ formatNumber(countdown.days) }}</div>
              <div class="text-[8px] opacity-70">DAYS</div>
            </div>
            <div class="bg-primary-950 text-white text-center rounded px-1 py-0.5">
              <div class="text-sm font-bold">{{ formatNumber(countdown.hours) }}</div>
              <div class="text-[8px] opacity-70">HRS</div>
            </div>
            <div class="bg-primary-950 text-white text-center rounded px-1 py-0.5">
              <div class="text-sm font-bold">{{ formatNumber(countdown.minutes) }}</div>
              <div class="text-[8px] opacity-70">MIN</div>
            </div>
            <div class="bg-primary-950 text-white text-center rounded px-1 py-0.5">
              <div class="text-sm font-bold">{{ formatNumber(countdown.seconds) }}</div>
              <div class="text-[8px] opacity-70">SEC</div>
            </div>
          </div>

          <!-- CTA -->
          <button class="w-full mt-3 bg-primary-950 text-accent text-xs font-bold py-2 rounded hover:bg-primary-800 transition-colors">
            See Offers
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
