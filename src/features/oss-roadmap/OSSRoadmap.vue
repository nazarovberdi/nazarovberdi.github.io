<template>
  <div class="min-h-screen px-4 py-8 font-sans" style="background: var(--page-bg); color: var(--page-text)">
    <div class="mx-auto max-w-[680px]">
      <h1 class="mb-1 text-[20px] font-medium">Vue / Vite Learning Roadmap</h1>
      <p class="mb-6 text-[13px]" style="color: var(--page-muted)">
        A personal roadmap for building toward future contributions in the ecosystem. You can use it too, and progress is saved in your browser.
      </p>

      <div
        class="mb-4 flex items-center gap-3 rounded-lg px-[14px] py-[10px]"
        style="background: var(--panel-bg); border: 1px solid var(--line)"
      >
        <div class="flex-1">
          <strong class="text-[14px] font-medium">
            {{ totalDone }} / {{ totalItems }} completed
          </strong>
          <div
            class="mt-1 h-[3px] overflow-hidden rounded-full"
            style="background: var(--panel-bg-strong)"
          >
            <div
              class="h-full rounded-full transition-all duration-300"
              style="background: var(--accent)"
              :style="{ width: totalPercent + '%' }"
            />
          </div>
        </div>
        <span class="text-[12px]" style="color: var(--page-muted)">{{ totalPercent }}%</span>
      </div>

      <div class="space-y-2 pb-8">
        <div
          v-for="(phase, pi) in phases"
          :key="phase.num"
          class="overflow-hidden rounded-xl"
          style="background: var(--panel-bg); border: 1px solid var(--line)"
        >
          <div class="px-[14px] pb-[12px] pt-[12px]">
            <button
              type="button"
              class="mb-3 flex w-full cursor-pointer select-none items-center gap-3 text-left"
              @click="togglePhase(pi)"
            >
              <div
                class="flex size-7 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-medium"
                :style="{
                  background: `color-mix(in srgb, ${phase.color} 18%, var(--panel-bg-strong))`,
                  color: phase.color,
                }"
              >
                {{ phase.num }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-[15px] font-medium leading-tight" style="color: var(--page-text)">
                  {{ phase.title }}
                </div>
                <div class="mt-px text-[12px]" style="color: var(--page-muted)">
                  {{ phase.subtitle }}
                </div>
              </div>
              <div class="ml-auto flex flex-shrink-0 items-center gap-2">
                <span class="text-[11px]" style="color: var(--page-muted)">
                  {{ phaseDone(phase) }}/{{ phase.items.length }}
                </span>
                <span
                  class="inline-block text-[12px] transition-transform duration-200"
                  style="color: var(--page-muted)"
                  :style="{ transform: phase.open ? 'rotate(180deg)' : 'rotate(0deg)' }"
                  aria-hidden="true"
                  >▼</span
                >
              </div>
            </button>

            <div
              class="overflow-hidden rounded-full h-[3px]"
              :class="phase.open ? 'mb-3' : 'mb-0'"
              style="background: var(--panel-bg-strong)"
            >
              <div
                class="h-full rounded-full transition-all duration-300"
                :style="{ width: phasePercent(phase) + '%', background: phase.color }"
              />
            </div>

            <div
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :style="{ maxHeight: phase.open ? phase.items.length * 100 + 'px' : '0px' }"
            >
              <button
                v-for="item in phase.items"
                :key="item.id"
                type="button"
                class="roadmap-item mb-1.5 flex w-full cursor-pointer items-start gap-[10px] rounded-lg px-3 py-[9px] text-left last:mb-0"
                :class="{ 'opacity-55': state[item.id] }"
                style="background: var(--panel-bg-strong)"
                @click="toggleItem(item.id)"
              >
                <div
                  class="mt-px flex size-4 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-150"
                  :style="
                    state[item.id]
                      ? {
                          background: `color-mix(in srgb, var(--accent) 15%, transparent)`,
                          borderColor: `color-mix(in srgb, var(--accent) 50%, transparent)`,
                        }
                      : { borderColor: 'var(--line-strong)' }
                  "
                >
                  <div
                    v-if="state[item.id]"
                    class="size-1.5 rounded-full"
                    style="background: var(--accent)"
                  />
                </div>
                <div class="min-w-0">
                  <div class="text-[13px] font-medium leading-snug" style="color: var(--page-text)">
                    {{ item.label }}
                  </div>
                  <div class="mt-0.5 text-[12px] leading-snug" style="color: var(--page-muted)">
                    {{ item.note }}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

import { JS_ENGINE_ITEMS, OSS_CONTRIBUTION, OSS_VITE, OSS_VUE, REACTIVITY } from './phases'
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta(() => ({
  title: 'Vue / Vite Learning Roadmap',
  description: 'A personal roadmap for building toward future contributions in the ecosystem. You can use it too, and progress is saved in your browser.',
}))

const STORAGE_KEY = 'vue-roadmap'

interface RoadmapItem {
  id: string
  label: string
  note: string
}

interface Phase {
  num: number
  color: string
  title: string
  subtitle: string
  open: boolean
  items: RoadmapItem[]
}

type CheckedState = Record<string, boolean>

const phases = ref<Phase[]>([
  {
    num: 1,
    color: '#7F77DD',
    title: 'JS Engine Internals',
    subtitle: 'Weeks 1–4 · Foundation for everything else',
    open: true,
    items: JS_ENGINE_ITEMS,
  },
  {
    num: 2,
    color: '#1D9E75',
    title: 'Vue 3 Reactivity Source',
    subtitle: 'Weeks 5–8 · Read the engine, not just the docs',
    open: false,
    items: REACTIVITY,
  },
  {
    num: 3,
    color: '#BA7517',
    title: 'Vite Plugin Pipeline',
    subtitle: 'Weeks 9–12 · A good entry point for future contributions',
    open: false,
    items: OSS_VITE,
  },
  {
    num: 4,
    color: '#D85A30',
    title: 'TypeScript as Design Tool',
    subtitle: 'Weeks 13–16 · Stop using it defensively, start using it expressively',
    open: false,
    items: OSS_VUE,
  },
  {
    num: 5,
    color: '#185FA5',
    title: 'Contribution Readiness',
    subtitle: 'Month 4+ · Preparing to show up in the ecosystem',
    open: false,
    items: OSS_CONTRIBUTION,
  },
])

const state = ref<CheckedState>({})

onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) state.value = JSON.parse(saved) as CheckedState
  } catch {}
})

watch(
  state,
  (val: CheckedState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  },
  { deep: true },
)

function toggleItem(id: string): void {
  state.value = { ...state.value, [id]: !state.value[id] }
}

function togglePhase(pi: number): void {
  phases.value[pi]!.open = !phases.value[pi]!.open
}

function phaseDone(phase: Phase): number {
  return phase.items.filter((i) => state.value[i.id]).length
}

function phasePercent(phase: Phase): number {
  return Math.round((phaseDone(phase) / phase.items.length) * 100)
}

const totalItems = computed<number>(() => phases.value.reduce((s, p) => s + p.items.length, 0))
const totalDone = computed<number>(() => phases.value.reduce((s, p) => s + phaseDone(p), 0))
const totalPercent = computed<number>(() =>
  Math.round((totalDone.value / totalItems.value) * 100),
)
</script>
