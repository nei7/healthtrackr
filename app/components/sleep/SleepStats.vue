<script setup lang="ts">
import type { ISleep } from '~~/shared/types/models';

defineProps<{
  sleep: ISleep
}>()

</script>

<template>
  <UPageGrid class="xl:grid-cols-4">

    <UPageCard title="Sleep performance" spotlight>
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold">
          {{ sleep.sleepScore.performance }}%
        </span>
      </div>

      <SleepScoreBadge :value="sleep.sleepScore.performance"></SleepScoreBadge>
    </UPageCard>

    <UPageCard title="Sleep consistency" spotlight>
      <div class=" flex items-center gap-2">
        <span class="text-2xl font-semibold ">
          {{ sleep.sleepScore.consistency }}%
        </span>
      </div>
      <SleepScoreBadge :value="sleep.sleepScore.consistency"></SleepScoreBadge>
    </UPageCard>

    <UPageCard title="Sleep efficiency" spotlight>
      <div class="flex flex-col gap-2">
        <span class="text-3xl font-semibold">
          {{ sleep.sleepScore.efficiency.toFixed() }}%
        </span>

      </div>

      <SleepScoreBadge :value="sleep.sleepScore.efficiency"></SleepScoreBadge>
    </UPageCard>


    <UPageCard title="Slept for" spotlight>

      <span class="text-2xl font-semibold">
        {{ formatTime(sleep.sleepNeed.sleepTime) }}
      </span>
      <span class="text-green-600 text-sm" v-if="sleep.sleepNeed.sleepDebt <= 0">Optimal</span>
      <span class="text-yellow-600 text-sm" v-else-if="sleep.sleepNeed.sleepDebt > 0">Insufficient</span>

    </UPageCard>





    <!-- <UPageCard :icon="stat.icon" :title="stat.title" variant="subtle" :ui="{
        container: 'gap-y-1.5',
        wrapper: 'items-start',
        leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
        title: 'font-normal text-muted text-xs uppercase'
      }" class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1">
        <div class="flex items-center gap-2">
          <span class="text-2xl font-semibold text-highlighted">
            {{ stat.value }}
          </span>

          <UBadge :color="stat.variation > 0 ? 'success' : 'error'" variant="subtle" class="text-xs">
            {{ stat.variation > 0 ? '+' : '' }}{{ stat.variation }}%
          </UBadge>
        </div>
      </UPageCard> -->

  </UPageGrid>
</template>
