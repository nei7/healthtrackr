<script setup lang="ts">
const props = defineProps<{
  value: number
}>()

const rating = computed(() => {
  if (props.value > 67) {
    return {
      color: 'text-success',
      text: 'Good'
    }
  } else if (props.value > 34) {
    return {
      color: 'text-warning',
      text: 'Low'
    }
  } else {
    return {
      color: 'text-error',
      text: 'Bad'
    }
  }
})
</script>

<template>
  <div class="text-sm">
    <span :class="rating.color">{{ rating.text }}</span>
  </div>
</template>
