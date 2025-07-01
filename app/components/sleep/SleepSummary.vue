<script setup lang="ts">
import { format, formatDuration } from 'date-fns';



defineProps<{
    summary: SleepSummary
}>()
</script>

<template>
    <UPageGrid class="lg:grid-cols-2">
        <UPageCard>
            <div class="flex justify-between items-center ">
                <div class="flex ">
                    <div class="flex items-center gap-2 font-normal text-muted">
                        <div>Awake time</div>

                        <span class="font-bold text-neutral-600 text-sm">
                            {{
                                summary.awakeTimePercentage.toFixed()
                            }} %
                        </span>
                    </div>
                </div>
                <div class="font-normal text-muted">
                    {{ msToHHMM(summary.totalAwakeTime) }}
                </div>

            </div>
            <div class="mt-2">
                <UProgress v-model="summary.awakeTimePercentage" color="neutral" />
            </div>
        </UPageCard>


        <UPageCard>
            <div class="flex justify-between items-center ">
                <div class="flex ">
                    <div class="flex items-center gap-2 font-normal text-muted">
                        <div>Light Sleep</div>

                        <span class="font-bold text-indigo-600 text-sm">
                            {{ summary.lightSleepPercentage.toFixed() }}%
                        </span>
                    </div>
                </div>
                <div class="font-normal text-muted">
                    {{ msToHHMM(summary.totalLightSleepTime) }}
                </div>

            </div>
            <div class="mt-2">
                <UProgress v-model="summary.lightSleepPercentage" :ui="{
                    indicator: 'bg-indigo-600'
                }" />
            </div>
        </UPageCard>




        <UPageCard>
            <div class="flex justify-between items-center ">
                <div class="flex ">
                    <div class="flex items-center gap-2 font-normal text-muted">
                        <div>SWS Sleep</div>

                        <span class="font-bold text-pink-600 text-sm">
                            {{ summary.SWSPercentage.toFixed() }}%
                        </span>
                    </div>
                </div>
                <div class="font-normal text-muted">
                    {{ msToHHMM(summary.totalSWSSleepTime) }}
                </div>

            </div>
            <div class="mt-2">
                <UProgress v-model="summary.SWSPercentage" :ui="{
                    indicator: 'bg-pink-600'
                }" />
            </div>
        </UPageCard>

        <UPageCard>
            <div class="flex justify-between items-center ">
                <div class="flex ">
                    <div class="flex items-center gap-2 font-normal text-muted">
                        <div>REM Sleep</div>

                        <span class="font-bold text-sky-600 text-sm">
                            {{ summary.REMSleepPercentage.toFixed() }}%

                        </span>
                    </div>
                </div>
                <div class="font-normal text-muted">
                    {{ msToHHMM(summary.totalREMSleepTime) }}
                </div>

            </div>
            <div class="mt-2">
                <UProgress v-model="summary.REMSleepPercentage" :ui="{
                    indicator: 'bg-sky-600'
                }" />
            </div>
        </UPageCard>



        <UPageCard title="Sleep cycles">
            <div class="flex items-center gap-2">
                <span class="text-2xl font-semibold text-highlighted">
                    {{ summary.sleepCycleCount }}
                </span>
            </div>
        </UPageCard>

        <UPageCard title="Disturbances">
            <div class="flex items-center gap-2">
                <span class="text-2xl font-semibold text-highlighted">
                    {{ summary.disturbanceCount }}
                </span>
            </div>
        </UPageCard>
    </UPageGrid>
</template>