<script setup lang="ts">
const now = new Date()

const range = shallowRef(now)

const { getRecord } = usehealthDataStore()

const record = computed(() => getRecord(range.value))

const sleep = computed(() => record.value?.sleeps.filter(sleep => !sleep.nap)[0])

const { data: heartRate } = useAsyncData(async () => {
  if (!sleep.value) return null
  const response = await $fetch<IHeartRate>(`/api/whoop/sleep/${sleep.value.id}/heartRate`)

  return response
}, { watch: [sleep] })
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardToolbar>
        <template #left>
          <SleepRangePicker
            v-model="range"
            class="-ms-1"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <SleepStats
        v-if="sleep"
        :sleep="sleep"
      />

      <SleepChart
        v-if="heartRate"
        :data="heartRate.values"
      />

      <SleepSummary
        v-if="sleep"
        :summary="sleep.summary"
      />
    </template>
  </UDashboardPanel>
</template>
