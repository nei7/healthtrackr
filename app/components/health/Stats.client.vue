<script setup lang="ts">
import type { AreaChartItem } from '../dashboard/AreaChartCard.vue'
import AreaChartCard from '../dashboard/AreaChartCard.vue'

const props = defineProps<{
  recoveries: Recovery[]
  sleeps: Sleep[]
}>()

function mapValue<T extends object & { date: string }, U extends keyof T>(values: T[], key: U): AreaChartItem[] {
  return values.map(r => ({ value: Number(r[key]), date: r.date }))
}

const score = computed<AreaChartItem[]>(() => mapValue(props.recoveries, 'score'))

const hrv = computed<AreaChartItem[]>(() => mapValue(props.recoveries, 'hrv'))

const restingHeartRate = computed<AreaChartItem[]>(() => mapValue(props.recoveries, 'restingHeartRate'))
const sleepScore = computed<AreaChartItem[]>(() => props.sleeps.map(sleep => ({ value: sleep.sleepScore.performance, date: sleep.end })))

const stats = computed(() => {
  const lastRecovery = props.recoveries[0]
  if (!lastRecovery) return

  const sleep = props.sleeps[0]
  if (!sleep) return

  const { score, hrv, restingHeartRate } = lastRecovery

  return {
    score,
    hrv: (hrv * 1000).toFixed(),
    restingHeartRate,
    sleepScore: sleep.sleepScore.performance
  }
})
</script>

<template>
  <div>
    <div class="flex items-baseline gap-1 mb-4">
      <h2 class="text-lg font-semibold  sm:text-2xl ">
        Today
      </h2>
      <h2 class="font-medium  text-muted">
        vs. 7 day range
      </h2>
    </div>
    <UPageGrid
      v-if="stats"
      class="lg:grid-cols-4"
    >
      <AreaChartCard
        :data="score"
        title="Recovery"
        color="#22c55e"
      >
        <div>
          <div class="text-xl font-semibold">
            {{ stats.score }}%
          </div>
        </div>
      </AreaChartCard>

      <AreaChartCard
        :data="hrv"
        title="HRV"
        color="#db2777"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="text-xl font-semibold">
            {{ stats.hrv }} ms
          </div>

          <div class="text-sm font-medium text-success">
            +12.5%
          </div>
        </div>
      </AreaChartCard>
      <AreaChartCard
        :data="restingHeartRate"
        title="RHR"
        color="#0284c7"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="text-xl font-semibold">
            {{ stats.restingHeartRate }} bpm
          </div>

          <div class="text-sm font-medium text-success" />
        </div>
      </AreaChartCard>
      <AreaChartCard
        :data="sleepScore"
        title="Sleep performance"
        color="#9333ea"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="text-xl font-semibold">
            {{ stats.sleepScore }}%
          </div>
          <SleepScoreRating :value="stats.sleepScore" />
        </div>
      </AreaChartCard>
    </UPageGrid>
  </div>
</template>
