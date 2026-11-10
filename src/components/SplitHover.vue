<template>
  <span class="split-hover">
    <span class="sr-only">{{ label }}</span>
    <span v-for="row in 2" :key="row" :class="['split-hover-row', row === 2 && 'is-next']" aria-hidden="true">
      <span v-for="(char, i) in chars" :key="i" class="split-hover-char" :style="{ '--i': i }">{{
        char
      }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/** Split hover: the label rolls away letter by letter as a copy rolls in. */
const props = defineProps<{ label: string }>()

// Non-breaking, so spaces keep their width inside inline-block letters.
const chars = computed(() => Array.from(props.label, (c) => (c === ' ' ? ' ' : c)))
</script>
