<script setup lang="ts">
import { startOfDay, sub, endOfDay } from 'date-fns'
import type { Period, Range } from '~/types'

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')

const now = new Date()

const { data } = await useFetch<ISleep[]>('/api/whoop/sleep', {
  query: {
    start: startOfDay(now).toISOString(),
    end: endOfDay(now).toISOString()
  }, default: () => []
})


const currentSleep = computed(() => {
  if (data.value) {
    return data.value.filter((sleep) => !sleep.nap)[0]
  }
})


const { data: heartRate } = await useFetch<IHeartRate>(`/api/whoop/sleep/${currentSleep.value?.sleepId}/heartRate`)

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

          <SleepPeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body v-if="currentSleep">


      <SleepStats :sleep="currentSleep" />

      <SleepChart v-if="heartRate" :data="heartRate?.values" />


      <SleepSummary :summary="currentSleep.summary"></SleepSummary>
      <div>

      </div>
    </template>
  </UDashboardPanel>
</template>
