<script setup lang="ts">
defineProps<{
  value: number
  dark?: boolean
}>()
</script>

<template>
  <div class="text-sm">
    <span v-if="value > 67" :class="dark ? 'text-green-300' : 'text-green-600'">Good</span>
    <span v-else-if="value > 34" :class="dark ? 'text-yellow-300' : 'text-yellow-600'">Low</span>
    <span v-else-if="value > 0" :class="dark ? 'text-red-300' : 'text-red-600'">Bad</span>
  </div>
</template>
