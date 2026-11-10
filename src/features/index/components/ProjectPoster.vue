<template>
  <div class="poster" :style="{ '--poster-color': project.color }" aria-hidden="true">
    <div class="poster-top">
      <span>{{ project.client ?? kindLabel[project.kind] }}</span>
      <span>{{ project.year }}</span>
    </div>
    <span class="poster-block" />
    <p class="poster-name font-display">{{ project.name }}</p>
    <p v-if="project.outcome" class="poster-outcome">{{ project.outcome }}</p>
  </div>
</template>

<script setup lang="ts">
import { kindLabel, type Project } from '../data'

/** Poster: the typographic Preview for a Project with no live site to capture. */
defineProps<{ project: Project }>()
</script>
