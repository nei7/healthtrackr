<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import { format } from 'date-fns'
import type { DataRecord } from '~~/shared/types/models'

defineProps<{
  data: DataRecord[]
}>()

const x = (d: DataRecord) => d.time
const y = (d: DataRecord) => d.data

const template = (d: DataRecord) => `${d.data} bpm`

const xTicks = (i: number) => {
  return format(i, 'HH:mm')
}
</script>

<template>
  <UPageCard :ui="{ body: '!px-0 !pt-0 !pb-3' }">
    <template #header>
      <div class="text-base text-pretty font-normal text-muted">
        Sleep heart rate
      </div>
    </template>

    <div class="px-4">
      <VisXYContainer :data="data" :padding="{ top: 40 }" class="h-96">
        <VisLine :x="x" :y="y" color="var(--ui-primary)" />
        <VisArea
          :x="x"
          :y="y"
          color="var(--ui-primary)"
          :opacity="0.1"
        />

        <VisAxis
          type="x"
          :x="x"
          :tick-format="xTicks"
          :min-max-ticks-only="true"
          tick-text-color="var(--ui-text-muted)"
          tick-text-font-size="16px"
        />

        <VisCrosshair color="var(--ui-primary)" :template="template" />

        <VisTooltip />
      </VisXYContainer>
    </div>
  </UPageCard>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-primary);

  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>
