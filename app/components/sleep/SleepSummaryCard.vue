<script setup lang="ts">
const props = withDefaults(defineProps<{
  percentage: number
  time: number
  title: string
  color?: keyof typeof colors
}>(), { color: 'neutral' })

const colors = {
  indigo: { text: 'text-indigo-600', bg: 'bg-indigo-600' },
  sky: { text: 'text-sky-600', bg: 'bg-sky-600' },
  neutral: { text: 'text-neutral-600', bg: 'bg-neutral-600' },
  pink: { text: 'text-pink-600', bg: 'bg-pink-600' }
}

const color = computed(() => colors[props.color])
</script>

<template>
  <UPageCard>
    <div class="flex justify-between items-center ">
      <div class="flex">
        <div class="flex items-center gap-2 ">
          <div
            class="h-2 w-2 rounded-full"
            :class="color.bg"
          />

          <span class="font-normal text-muted">{{ title }}</span>

          <span
            class="font-bold text-sm"
            :class="color.text"
          >
            {{ percentage.toFixed() }}%
          </span>
        </div>
      </div>
      <div class="font-normal text-muted">
        {{ msToHHMM(time) }}
      </div>
    </div>
    <div class="mt-2">
      <UProgress
        :model-value="percentage"
        :ui="{
          indicator: color.bg
        }"
      />
    </div>
  </UPageCard>
</template>
