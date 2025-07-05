<script lang="ts" setup>
const { weeklyRecords } = usehealthDataStore()

const recoveries = computed(() => weeklyRecords.map(record => record.recovery))

const sleeps = computed(() => weeklyRecords.map(record => record.sleeps).flat())
</script>

<template>
  <UDashboardPanel id="health">
    <template #header>
      <UDashboardToolbar>
        <template #left>
          <div>Health</div>
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <HealthStats
        :recoveries="recoveries"
        :sleeps="sleeps"
      />
    </template>
  </UDashboardPanel>
</template>
