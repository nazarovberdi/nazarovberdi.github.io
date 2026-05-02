<template>
  <footer
    class="eyebrow flex items-center justify-between gap-3 border-t border-[var(--line)] pt-6 text-[12px] animate-fade-up [animation-delay:250ms] max-sm:flex-col max-sm:items-start"
  >
    <span>© {{ year }} Nazarov Berdi</span>
    <RouterLink
      to="/goals"
      class="body-muted transition-colors duration-150 hover:text-[var(--page-text)]"
    >
      {{ t('footer.roadmap') }}
    </RouterLink>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  year: number
}>()
</script>
