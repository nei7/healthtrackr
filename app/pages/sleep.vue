<script setup lang="ts">
import { useDataStore } from '~/stores/data'

const now = new Date()

const range = shallowRef(now)

const { getRecord } = useDataStore()

const record = computed(() => getRecord(range.value))

const sleep = computed(() => record.value?.sleeps.filter(sleep => !sleep.nap)[0])

const { data: heartRate } = await useAsyncData<IHeartRate>(async () => {
  if (!sleep.value) return { values: [], sleepId: 0, start: 0 }
  return await $fetch<IHeartRate>(`/api/whoop/sleep/${sleep.value.id}/heartRate`)
}, { watch: [sleep] })
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardToolbar>
        <template #left>
          <!-- NOTE: The `-ms-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
          <SleepRangePicker v-model="range" class="-ms-1" />

          <!-- <SleepPeriodSelect v-model="period" :range="range" /> -->
        </template>
      </UDashboardToolbar>
    </template>

    <template v-if="sleep" #body>
      <SleepStats :sleep="sleep" />

      <SleepChart v-if="heartRate" :data="heartRate?.values" />

      <SleepSummary :summary="sleep.summary" />
    </template>
  </UDashboardPanel>
</template>
