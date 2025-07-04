<script setup lang="ts">
import SleepScoreRating from './SleepScoreRating.vue'
import { DashboardStatCard } from '#components'
import type { Sleep } from '~~/shared/types/models'

defineProps<{
  sleep: Sleep
}>()
</script>

<template>
  <UPageGrid class="xl:grid-cols-4">
    <DashboardStatCard
      title="Sleep performance"
      :value="`${sleep.sleepScore.performance}%`"
    >
      <SleepScoreRating :value="sleep.sleepScore.performance" />
    </DashboardStatCard>

    <DashboardStatCard
      title="Sleep consistency"
      :value="`${sleep.sleepScore.consistency}%`"
    >
      <SleepScoreRating :value="sleep.sleepScore.consistency" />
    </DashboardStatCard>

    <DashboardStatCard
      title="Sleep efficiency"
      :value="`${sleep.sleepScore.efficiency.toFixed()}%`"
    >
      <SleepScoreRating :value="sleep.sleepScore.efficiency" />
    </DashboardStatCard>

    <DashboardStatCard
      title="Slept for"
      :value="msToHHMM(sleep.sleepNeed.sleepTime)"
    >
      <span
        v-if="sleep.sleepNeed.sleepDebt <= 0"
        class="text-green-600 text-sm"
      >
        Optimal
      </span>
      <span
        v-else-if="sleep.sleepNeed.sleepDebt > 0"
        class="text-yellow-600 text-sm"
      >
        Insufficient
      </span>
    </DashboardStatCard>
  </UPageGrid>
</template>
