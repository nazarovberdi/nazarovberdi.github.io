<template>
  <footer
    class="flex items-center justify-between gap-3 border-t border-[#e8e5de] pt-6 text-[12px] text-[#aaa] animate-fade-up [animation-delay:250ms] max-sm:flex-col max-sm:items-start"
  >
    <span>© {{ year }} Berdi Nazarov</span>
    <RouterLink
      to="/goals"
      class="text-[#888] transition-colors duration-150 hover:text-[#1a1916]"
    >
      Learning Roadmap →
    </RouterLink>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  year: number
}>()
</script>
