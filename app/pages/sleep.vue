<script setup lang="ts">
import { startOfDay, endOfDay } from 'date-fns'

const now = new Date()

const range = shallowRef(now)

const sleepQuery = computed(() => {
  return {
    start: startOfDay(range.value).toISOString(),
    end: endOfDay(range.value).toISOString()
  }
})

const { data } = await useFetch<ISleep[]>('/api/whoop/sleep', {
  query: sleepQuery,
  default: () => []
})

const currentSleep = computed(() => {
  if (data.value) {
    return data.value.filter(sleep => !sleep.nap)[0]
  }
  return null
})

const { data: heartRate } = await useAsyncData<IHeartRate>(async () => {
  if (!currentSleep.value) return { values: [], sleepId: 0, start: 0 }

  return await $fetch<IHeartRate>(`/api/whoop/sleep/${currentSleep.value.sleepId}/heartRate`)
}, { watch: [data] })
</script>

<template>
  <UDashboardPanel id="sleep">
    <template #header>
      <UDashboardNavbar title="Sleep" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse class="cursor-pointer" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- NOTE: The `-ms-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
          <SleepRangePicker v-model="range" class="-ms-1" />

          <!-- <SleepPeriodSelect v-model="period" :range="range" /> -->
        </template>
      </UDashboardToolbar>
    </template>

    <template v-if="currentSleep" #body>
      <SleepStats :sleep="currentSleep" />

      <SleepChart v-if="heartRate" :data="heartRate?.values" />

      <SleepSummary :summary="currentSleep.summary" />
    </template>
  </UDashboardPanel>
</template>
