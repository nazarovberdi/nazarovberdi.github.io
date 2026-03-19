<template>
  <div
    class="min-h-screen bg-[#f1efe8] dark:bg-[#2a2a27] px-4 py-8 font-sans text-[#1a1a18] dark:text-[#e8e6dc]"
  >
    <div class="max-w-[680px] mx-auto">
      <h1 class="text-[20px] font-medium mb-1">Vue / Vite OSS Roadmap</h1>
      <p class="text-[13px] text-[#5f5e5a] dark:text-[#9c9a92] mb-6">
        Check off items as you complete them — progress is saved in your browser.
      </p>

      <!-- Overall progress -->
      <div
        class="flex items-center gap-3 px-[14px] py-[10px] bg-white dark:bg-[#1e1e1c] rounded-lg border border-black/[0.08] dark:border-white/[0.08] mb-4"
      >
        <div class="flex-1">
          <strong class="text-[14px] font-medium"
            >{{ totalDone }} / {{ totalItems }} completed</strong
          >
          <div class="mt-1 h-[3px] rounded-full bg-[#f1efe8] dark:bg-[#2a2a27] overflow-hidden">
            <div
              class="h-full rounded-full bg-[#7F77DD] transition-all duration-300"
              :style="{ width: totalPercent + '%' }"
            />
          </div>
        </div>
        <span class="text-[12px] text-[#5f5e5a] dark:text-[#9c9a92]">{{ totalPercent }}%</span>
      </div>

      <!-- Phases -->
      <div class="pb-8 space-y-2">
        <div
          v-for="(phase, pi) in phases"
          :key="phase.num"
          class="rounded-xl border border-black/[0.08] dark:border-white/[0.08] overflow-hidden bg-white dark:bg-[#1e1e1c]"
        >
          <div class="px-[14px] pt-[12px] pb-[12px]">
            <!-- Phase header -->
            <div
              class="flex items-center gap-3 mb-3 cursor-pointer select-none"
              @click="togglePhase(pi)"
            >
              <div
                class="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium flex-shrink-0"
                :style="{ background: phase.bgColor, color: phase.color }"
              >
                {{ phase.num }}
              </div>
              <div>
                <div class="text-[15px] font-medium leading-tight">{{ phase.title }}</div>
                <div class="text-[12px] text-[#5f5e5a] dark:text-[#9c9a92] mt-px">
                  {{ phase.subtitle }}
                </div>
              </div>
              <div class="ml-auto flex items-center gap-2">
                <span class="text-[11px] text-[#5f5e5a] dark:text-[#9c9a92]">
                  {{ phaseDone(phase) }}/{{ phase.items.length }}
                </span>
                <span
                  class="text-[12px] text-[#888780] dark:text-[#6b6a64] inline-block transition-transform duration-200"
                  :style="{ transform: phase.open ? 'rotate(180deg)' : 'rotate(0deg)' }"
                  >▼</span
                >
              </div>
            </div>

            <!-- Phase progress bar -->
            <div
              class="h-[3px] rounded-full bg-[#f1efe8] dark:bg-[#2a2a27] overflow-hidden"
              :class="phase.open ? 'mb-3' : 'mb-0'"
            >
              <div
                class="h-full rounded-full transition-all duration-300"
                :style="{ width: phasePercent(phase) + '%', background: phase.color }"
              />
            </div>

            <!-- Items -->
            <div
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :style="{ maxHeight: phase.open ? phase.items.length * 100 + 'px' : '0px' }"
            >
              <div
                v-for="item in phase.items"
                :key="item.id"
                class="flex gap-[10px] px-3 py-[9px] mb-1.5 last:mb-0 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-[#f1efe8] dark:bg-[#2a2a27] cursor-pointer items-start transition-all duration-150 hover:border-black/[0.18] dark:hover:border-white/[0.16]"
                :class="{ 'opacity-55': state[item.id] }"
                @click="toggleItem(item.id)"
              >
                <!-- Checkbox dot -->
                <div
                  class="w-4 h-4 rounded-full border-[1.5px] flex-shrink-0 mt-px flex items-center justify-center transition-all duration-150"
                  :class="
                    state[item.id]
                      ? 'bg-[#e1f5ee] dark:bg-[#085041] border-[#9fe1cb] dark:border-[#0f6e56]'
                      : 'border-black/22 dark:border-white/18'
                  "
                >
                  <div
                    v-if="state[item.id]"
                    class="w-1.5 h-1.5 rounded-full bg-[#0f6e56] dark:bg-[#5dcaa5]"
                  />
                </div>
                <div>
                  <div class="text-[13px] font-medium leading-snug">{{ item.label }}</div>
                  <div class="text-[12px] text-[#5f5e5a] dark:text-[#9c9a92] mt-0.5 leading-snug">
                    {{ item.note }}
                  </div>
                </div>
              </div>
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

const STORAGE_KEY = 'vue-roadmap'

interface RoadmapItem {
  id: string
  label: string
  note: string
}

interface Phase {
  num: number
  color: string
  bgColor: string
  title: string
  subtitle: string
  open: boolean
  items: RoadmapItem[]
}

type CheckedState = Record<string, boolean>

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const phases = ref<Phase[]>([
  {
    num: 1,
    color: '#7F77DD',
    bgColor: prefersDark ? '#26215C' : '#EEEDFE',
    title: 'JS Engine Internals',
    subtitle: 'Weeks 1–4 · Foundation for everything else',
    open: true,
    items: JS_ENGINE_ITEMS,
  },
  {
    num: 2,
    color: '#1D9E75',
    bgColor: prefersDark ? '#04342C' : '#E1F5EE',
    title: 'Vue 3 Reactivity Source',
    subtitle: 'Weeks 5–8 · Read the engine, not just the docs',
    open: false,
    items: REACTIVITY,
  },
  {
    num: 3,
    color: '#BA7517',
    bgColor: prefersDark ? '#412402' : '#FAEEDA',
    title: 'Vite Plugin Pipeline',
    subtitle: 'Weeks 9–12 · Your entry point for OSS contributions',
    open: false,
    items: OSS_VITE,
  },
  {
    num: 4,
    color: '#D85A30',
    bgColor: prefersDark ? '#4A1B0C' : '#FAECE7',
    title: 'TypeScript as Design Tool',
    subtitle: 'Weeks 13–16 · Stop using it defensively, start using it expressively',
    open: false,
    items: OSS_VUE,
  },
  {
    num: 5,
    color: '#185FA5',
    bgColor: prefersDark ? '#042C53' : '#E6F1FB',
    title: 'OSS Contribution Path',
    subtitle: 'Month 4+ · Showing up in the ecosystem',
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

const totalPercent = computed<number>(() => Math.round((totalDone.value / totalItems.value) * 100))
</script>
