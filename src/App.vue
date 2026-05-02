<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import { useTheme } from './composables/useTheme'

useTheme()
</script>

<template>
  <AppHeader />
  <div style="padding-top: var(--header-height)">
    <router-view />
  </div>
</template>

<style scoped></style>
