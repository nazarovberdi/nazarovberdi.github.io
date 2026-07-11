<template>
  <span ref="root" class="hero-signature" aria-hidden="true" v-html="signatureRaw" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import signatureRaw from './signature.svg?raw'

const DRAW_DURATION_MS = 2000
const root = ref<HTMLElement>()

onMounted(() => {
  const paths = root.value?.querySelectorAll('path')
  if (!paths?.length) return
  const perSegment = DRAW_DURATION_MS / paths.length
  paths.forEach((path, i) => {
    path.setAttribute('pathLength', '1')
    path.style.setProperty('--sig-delay', `${Math.round(i * perSegment)}ms`)
    path.style.setProperty('--sig-duration', `${Math.round(perSegment * 2.5)}ms`)
  })
})
</script>
