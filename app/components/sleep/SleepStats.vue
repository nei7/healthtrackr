<script setup lang="ts">
import type { ISleep } from '~~/shared/types/models';

defineProps<{
  sleep: ISleep
}>()
</script>

<template>
  <UPageGrid class="xl:grid-cols-4">

    <UPageCard title="Sleep performance">
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold">
          {{ sleep.sleepScore.performance }}%
        </span>
      </div>

      <SleepScoreBadge :value="sleep.sleepScore.performance"></SleepScoreBadge>
    </UPageCard>

    <UPageCard title="Sleep consistency">
      <div class=" flex items-center gap-2">
        <span class="text-2xl font-semibold ">
          {{ sleep.sleepScore.consistency }}%
        </span>
      </div>
      <SleepScoreBadge :value="sleep.sleepScore.consistency"></SleepScoreBadge>
    </UPageCard>

    <UPageCard title="Sleep efficiency">
      <div class="flex flex-col gap-2">
        <span class="text-3xl font-semibold">
          {{ sleep.sleepScore.efficiency.toFixed() }}%
        </span>

      </div>

      <SleepScoreBadge :value="sleep.sleepScore.efficiency"></SleepScoreBadge>
    </UPageCard>


    <UPageCard title="Slept for">

      <span class="text-2xl font-semibold">
        {{ formatTime(sleep.sleepNeed.sleepTime) }}
      </span>
      <span class="text-green-600 text-sm" v-if="sleep.sleepNeed.sleepDebt <= 0">Optimal</span>
      <span class="text-yellow-600 text-sm" v-else-if="sleep.sleepNeed.sleepDebt > 0">Insufficient</span>

    </UPageCard>

  </UPageGrid>
</template>
