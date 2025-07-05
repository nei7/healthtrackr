<script lang="ts" setup>
import { format } from 'date-fns'

const props = defineProps<{ data: DataRecord[] }>()

const data = computed(() => props.data)

const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  data: {
    name: 'data',
    color: '#3b82f6'
  }
}))

const xFormatter = (i: number): string => format(data.value[i]!.time, 'HH:mm')
</script>

<template>
  <UPageCard title="Last night sleep">
    <AreaChart
      :data="data"
      :height="300"
      min-max-ticks-only
      :categories="categories"
      :y-grid-line="false"
      :x-grid-line="true"
      :x-num-ticks="1"
      :x-formatter="xFormatter"
      :hide-legend="true"
    />
  </UPageCard>
</template>
