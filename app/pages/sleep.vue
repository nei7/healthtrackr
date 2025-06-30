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

    <template #body>
      <SleepStats v-if="currentSleep" :sleep="currentSleep" />

      <!-- <SleepChart :data="heartRate" /> -->


      <div>
        <!-- <UPageGrid class="lg:grid-cols-2">
          <UPageCard v-for="metric in sleepData" spotlight>
            <div class="flex justify-between items-center ">
              <div class="flex ">
                <div class="flex items-center gap-2 font-normal text-muted">
                  {{ metric.title }}

                  <span :class="metric.color" class="font-bold">
                    {{ metric.total }}
                  </span>
                </div>
              </div>
              <div class="font-normal text-muted">
                {{ metric.duration }}
              </div>

            </div>
            <div class="mt-2">
              <component :is="metric.status"></component>
            </div>
          </UPageCard>

          <UPageCard title="Sleep cycles" spotlight>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-semibold text-highlighted">
                {{ currentSleep?.score.stage_summary.sleep_cycle_count }}
              </span>
            </div>
          </UPageCard>

          <UPageCard title="Disturbances" spotlight>
            <div class="flex items-center gap-2">
              <span class="text-2xl font-semibold text-highlighted">
                {{ currentSleep?.score.stage_summary.disturbance_count }}
              </span>
            </div>
          </UPageCard>
        </UPageGrid> -->
      </div>
    </template>
  </UDashboardPanel>
</template>
