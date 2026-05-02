<template>
  <section class="mb-16 animate-fade-up [animation-delay:240ms]">
    <div class="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
      <div>
        <p class="eyebrow mb-3 text-[11px] uppercase tracking-[0.12em]">{{ t('toolbox.eyebrow') }}</p>
        <h2 class="font-serif text-[clamp(28px,5vw,40px)] leading-[1.05] tracking-[-0.02em]">
          {{ t('toolbox.heading') }}
        </h2>
      </div>
      <p class="body-muted max-w-[280px] text-right text-[12px] leading-[1.7] max-sm:text-left">
        {{ t('toolbox.description') }}
      </p>
    </div>

    <div class="tool-grid grid grid-cols-[0.8fr_1.2fr] gap-4 max-sm:grid-cols-1">
      <div class="surface-card p-6">
        <div class="mb-5 flex items-center justify-between">
          <p class="eyebrow text-[11px] uppercase tracking-[0.1em]">{{ t('toolbox.coreStackLabel') }}</p>
          <span class="eyebrow text-[11px]">01</span>
        </div>

        <div class="flex flex-wrap gap-3">
          <span
            v-for="skill in coreSkills"
            :key="skill"
            class="pill animate-fade-soft px-4 py-2 text-[12px] text-[var(--page-muted)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="surface-panel surface-alt p-6">
        <div class="mb-5 flex items-center justify-between">
          <p class="eyebrow text-[11px] uppercase tracking-[0.1em]">{{ t('toolbox.operatingModeLabel') }}</p>
          <span class="eyebrow text-[11px]">02</span>
        </div>

        <div class="space-y-4">
          <div v-for="i in [0, 1, 2]" :key="i">
            <p class="body-muted text-[12px] uppercase tracking-[0.08em]">
              {{ t(`traits.${i}.title`) }}
            </p>
            <p class="body-muted mt-1 text-[13px] font-light leading-[1.7]">
              {{ t(`traits.${i}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  coreSkills: readonly string[]
}>()
</script>
