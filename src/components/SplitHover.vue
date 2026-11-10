<template>
  <span class="split-hover">
    <span class="sr-only">{{ label }}</span>
    <span v-for="row in 2" :key="row" :class="['split-hover-row', row === 2 && 'is-next']" aria-hidden="true">
      <template v-for="(word, w) in words" :key="w">
        <span class="split-hover-word"
          ><span v-for="c in word" :key="c.i" class="split-hover-char" :style="{ '--i': c.i }">{{ c.char }}</span></span
        >{{ w < words.length - 1 ? ' ' : '' }}
      </template>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Split hover: the label rolls away letter by letter as a copy rolls in.
 * Letters are grouped by word, so long labels wrap between words.
 */
const props = defineProps<{ label: string }>()

const words = computed(() => {
  let i = 0
  return props.label.split(' ').map((word) => Array.from(word, (char) => ({ char, i: i++ })))
})
</script>
