<template>
    <div class="flex justify-center rounded-xl-t">
        <span class="relative flex items-center select-none touch-none w-full">
            <span class="relative bg-accented overflow-hidden rounded-xl grow h-[10px]">
                <span :class="`absolute rounded-xl ${color} h-full`"
                    :style="`left: 0%; right: ${100 - percentage}%;`"></span>
            </span>
        </span>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    percentage: number
    color?: string
}>(), {
    color: 'bg-primary'
})
</script>