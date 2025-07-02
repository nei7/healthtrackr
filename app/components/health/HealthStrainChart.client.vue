<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { VisSingleContainer, VisDonut } from '@unovis/vue'

const props = defineProps<{
  value: number
}>()

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')
const { width } = useElementSize(cardRef)

const max = 21
const donutData = computed<number[]>(() => [
  props.value,
  Math.max(0, max - props.value)
])

const valueAccessor = (d: number) => d

const radius = 140
const arcWidth = 20

const color = (d: number, i: number) => ['var(--ui-primary)', 'var(--ui-bg-accented)'][i]
</script>

<template>
  <UPageCard
    ref="cardRef"
    title="Daily strain"
    spotlight
    class="strain-chart"
  >
    <VisSingleContainer :data="donutData" :width="width">
      <VisDonut
        :value="valueAccessor"
        :color="color"
        :radius="radius"
        :arc-width="arcWidth"
        :central-label="value.toFixed(1)"
        central-sub-label="Strain"
        :corner-radius="20"
        :central-label-offset-y="15"
      />
    </VisSingleContainer>
  </UPageCard>
</template>

<style>
.strain-chart {
    --vis-donut-central-label-font-size: 3rem;
    --vis-donut-central-sub-label-font-size: 1rem
}
</style>
