<script setup lang="ts">
// Eneba logo component
</script>

<template>
  <NuxtLink to="/" class="flex items-center shrink-0">
    <svg
      viewBox="0 0 112 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-auto"
    >
      <!-- Eneba logo SVG -->
      <path
        d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z"
        fill="#4ADE80"
      />
      <path
        d="M12 8h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z"
        fill="#22C55E"
      />
      <path
        d="M14 12h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z"
        fill="#16A34A"
      />
      <!-- Text "eneba" -->
      <text
        x="40"
        y="22"
        fill="white"
        font-family="Metropolis, Inter, sans-serif"
        font-size="18"
        font-weight="600"
      >
        eneba
      </text>
    </svg>
  </NuxtLink>
</template>
