<script setup lang="ts">
defineProps<{ title: string, value: string | number }>()
</script>

<template>
  <UPageCard
    :title="title"
  >
    <div class="flex items-center gap-2">
      <span class="text-2xl font-semibold text-highlighted">
        {{ value }}
      </span>
    </div>

    <slot />
  </UPageCard>
</template>
