<template>
  <section id="work" data-section="work" class="section">
    <header class="section-head">
      <p class="section-label">01 — Work</p>
      <h2 v-reveal class="section-title line-mask font-display">
        <span class="line"><span>Software people</span></span>
        <span class="line" style="--line: 1"><span>use every day.</span></span>
      </h2>
      <p class="section-aside">{{ projects.length }} projects · 2022 – 2026</p>
    </header>

    <ol class="work-list" @pointerleave="hide">
      <li
        v-for="(project, i) in projects"
        :key="project.name"
        v-reveal
        class="work-row"
        @pointerenter="show(i, $event)"
      >
        <component
          :is="projectHref(project) ? 'a' : 'div'"
          :href="projectHref(project)"
          :target="projectHref(project) ? '_blank' : undefined"
          :rel="projectHref(project) ? 'noopener' : undefined"
          class="work-row-main split-trigger"
        >
          <span class="work-index meta-label">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="work-name font-display"><SplitHover :label="project.name" /></span>
          <span class="work-kind meta-label">{{ project.client ?? kindLabel[project.kind] }}</span>
          <span class="work-year meta-label">{{ project.year }}</span>
          <span class="work-arrow" aria-hidden="true">{{ projectHref(project) ? '↗' : '' }}</span>
        </component>

        <div class="work-detail">
          <p>
            {{ project.summary }}
            <span v-if="project.outcome" class="work-outcome">{{ project.outcome }}.</span>
          </p>
          <p class="work-links meta-label">
            <span>{{ project.stack.join(' · ') }}</span>
            <a v-if="project.storeUrl" :href="project.storeUrl" target="_blank" rel="noopener">
              <SplitHover label="Google Play" />↗
            </a>
            <a v-if="project.liveUrl && project.repoUrl" :href="project.repoUrl" target="_blank" rel="noopener">
              <SplitHover label="Source" />↗
            </a>
          </p>
        </div>

        <!-- Touch screens have no hover, so each Preview sits in its row. -->
        <div v-reveal class="work-row-preview mask-reveal">
          <ProjectPreview :project="project" />
        </div>
      </li>
    </ol>

    <!-- One floating Preview that follows the pointer (fine pointers only). -->
    <div v-if="canHover" ref="floater" class="work-floater" :class="{ 'is-visible': active !== null }" aria-hidden="true">
      <div
        v-for="(project, i) in projects"
        :key="project.name"
        class="work-floater-layer"
        :class="{ 'is-active': i === active, 'was-active': i === previous }"
      >
        <ProjectPreview :project="project" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import SplitHover from '@/components/SplitHover.vue'

import { kindLabel, projectHref, type Project } from '../data'
import ProjectPreview from './ProjectPreview.vue'

defineProps<{ projects: readonly Project[] }>()

const canHover = ref(false)
const floater = ref<HTMLElement>()
const active = ref<number | null>(null)
const previous = ref<number | null>(null)

// The Preview trails the pointer: each frame it closes part of the gap.
const target = { x: 0, y: 0 }
const current = { x: 0, y: 0 }
let frame = 0
let placed = false

function follow() {
  current.x += (target.x - current.x) * 0.16
  current.y += (target.y - current.y) * 0.16
  floater.value?.style.setProperty('transform', `translate3d(${current.x}px, ${current.y}px, 0)`)
  frame = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.3 ? requestAnimationFrame(follow) : 0
}

function onPointerMove(event: PointerEvent) {
  target.x = event.clientX + 28
  target.y = event.clientY - (floater.value?.offsetHeight ?? 0) / 2
  if (!placed) {
    current.x = target.x
    current.y = target.y
    placed = true
  }
  if (!frame) frame = requestAnimationFrame(follow)
}

function show(i: number, event?: PointerEvent) {
  if (event && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
  if (i === active.value) return
  previous.value = active.value
  active.value = i
}

function hide() {
  previous.value = active.value
  active.value = null
  placed = false
}

onMounted(() => {
  canHover.value = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches
  window.addEventListener('pointermove', onPointerMove, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  cancelAnimationFrame(frame)
})
</script>
