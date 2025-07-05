<script setup lang="ts">
import { format } from 'date-fns'

export interface AreaChartItem {
  value: number
  date: string
}

const props = defineProps<{
  data: AreaChartItem[]
  title: string
  color: string
}>()

const categories = computed(() => ({
  value: {
    name: props.title,
    color: props.color
  }
}))

const data = computed(() => props.data.toSorted((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))

const xFormatter = (i: number): string => data.value[i]?.date ? format(data.value[i].date, 'MMM d') : ''
</script>

<template>
  <UPageCard :title="title">
    <div>
      <slot />
    </div>
    <AreaChart
      class="mt-5"
      :height="100"
      :data="data"
      :categories="categories"
      :y-grid-line="false"
      :hide-y-axis="true"
      :x-formatter="xFormatter"
      :curve-type="CurveType.Linear"
      :legend-position="LegendPosition.Top"
      :hide-legend="true"
      hide-tooltip
      min-max-ticks-only
    />
  </UPageCard>
</template>
