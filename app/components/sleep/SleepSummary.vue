<script setup lang="ts">
import { DashboardStatCard } from '#components'

const { summary } = defineProps<{ summary: SleepSummary }>()
</script>

<template>
  <UPageGrid class="lg:grid-cols-2">
    <SleepSummaryCard
      title="Awake time"
      :percentage="summary.awakeTimePercentage"
      :time="summary.totalAwakeTime"
    />

    <SleepSummaryCard
      title="Light Sleep"
      :percentage="summary.lightSleepPercentage"
      :time="summary.totalLightSleepTime"
      color="indigo"
    />

    <SleepSummaryCard
      title="SWS Sleep"
      :percentage="summary.SWSPercentage"
      :time="summary.totalSWSSleepTime"
      color="pink"
    />

    <SleepSummaryCard
      title="REM Sleep"
      :percentage="summary.REMSleepPercentage"
      :time="summary.totalREMSleepTime"
      color="sky"
    />

    <DashboardStatCard
      title="Sleep cycles"
      :value="summary.sleepCycleCount"
    />

    <DashboardStatCard
      title="Disturbances"
      :value="summary.disturbanceCount"
    />
  </UPageGrid>
</template>
