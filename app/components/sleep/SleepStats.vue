<script setup lang="ts">
import type { ISleep } from '~~/shared/types/models'

defineProps<{
  sleep: ISleep
}>()
</script>

<template>
  <UPageGrid class="xl:grid-cols-4">
    <UPageCard title="Sleep performance">
      <div class="flex items-center gap-2 text-2xl font-semibold">
        {{ sleep.sleepScore.performance }}%
      </div>

      <SleepScoreBadge :value="sleep.sleepScore.performance" />
    </UPageCard>

    <UPageCard title="Sleep consistency">
      <div class="flex items-center gap-2 text-2xl font-semibold">
        {{ sleep.sleepScore.consistency }}%
      </div>
      <SleepScoreBadge :value="sleep.sleepScore.consistency" />
    </UPageCard>

    <UPageCard title="Sleep efficiency">
      <div class="flex items-center gap-2 text-2xl font-semibold">
        {{ sleep.sleepScore.efficiency.toFixed() }}%
      </div>

      <SleepScoreBadge :value="sleep.sleepScore.efficiency" />
    </UPageCard>

    <UPageCard title="Slept for">
      <span class="text-2xl font-semibold">
        {{ formatTime(sleep.sleepNeed.sleepTime) }}
      </span>
      <span v-if="sleep.sleepNeed.sleepDebt <= 0" class="text-green-600 text-sm">Optimal</span>
      <span v-else-if="sleep.sleepNeed.sleepDebt > 0" class="text-yellow-600 text-sm">Insufficient</span>
    </UPageCard>
  </UPageGrid>
</template>
