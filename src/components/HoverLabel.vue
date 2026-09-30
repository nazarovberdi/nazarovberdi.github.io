<template>
  <span class="hover-label">
    <span class="hover-label-current">{{ label }}</span>
    <span class="hover-label-next" aria-hidden="true">{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>
