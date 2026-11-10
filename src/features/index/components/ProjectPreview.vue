<template>
  <img
    v-if="project.preview"
    class="preview-image"
    :src="project.preview"
    :alt="`${project.name} screenshot`"
    width="960"
    height="720"
    loading="lazy"
    decoding="async"
  />
  <ProjectPoster v-else :project="project" />
</template>

<script setup lang="ts">
import type { Project } from '../data'
import ProjectPoster from './ProjectPoster.vue'

/** Preview: a screenshot of the live site when there is one, else its Poster. */
defineProps<{ project: Project }>()
</script>
