<script setup lang="ts">
defineProps<{
    value: number
    dark?: boolean
}>()

</script>

<template>
    <div class="text-sm">
        <span :class="dark ? 'text-green-300' : 'text-green-600'" v-if="value > 67">Good</span>
        <span :class="dark ? 'text-yellow-300' : 'text-yellow-600'" v-else-if="value > 34">Low</span>
        <span :class="dark ? 'text-red-300' : 'text-red-600'" v-else-if="value > 0">Bad</span>
    </div>
</template>