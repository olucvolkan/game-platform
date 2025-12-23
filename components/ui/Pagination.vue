<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const current = props.currentPage
  const total = props.totalPages

  if (total <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (current > 3) {
      pages.push('...')
    }

    // Show pages around current
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 2) {
      pages.push('...')
    }

    // Always show last page
    pages.push(total)
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

const prevPage = () => {
  if (props.currentPage > 1) {
    goToPage(props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    goToPage(props.currentPage + 1)
  }
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-2 mt-8"
  >
    <!-- Previous Button -->
    <button
      class="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors"
      :class="[
        currentPage === 1
          ? 'text-muted cursor-not-allowed'
          : 'text-white hover:bg-white/10'
      ]"
      :disabled="currentPage === 1"
      @click="prevPage"
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span class="hidden sm:inline">Previous</span>
    </button>

    <!-- Page Numbers -->
    <div class="flex items-center gap-1">
      <template
        v-for="(page, index) in visiblePages"
        :key="index"
      >
        <span
          v-if="page === '...'"
          class="px-2 text-muted"
        >
          ...
        </span>
        <button
          v-else
          class="min-w-[40px] h-10 rounded-lg font-medium transition-colors"
          :class="[
            currentPage === page
              ? 'bg-accent text-primary-950'
              : 'text-white hover:bg-white/10'
          ]"
          @click="goToPage(page as number)"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button
      class="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors"
      :class="[
        currentPage === totalPages
          ? 'text-muted cursor-not-allowed'
          : 'text-white hover:bg-white/10'
      ]"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      <span class="hidden sm:inline">Next</span>
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
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </nav>
</template>
