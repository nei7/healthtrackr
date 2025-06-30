<script lang="ts" setup>
const { data } = await useFetch('/api/whoop/health', { default: () => ({ records: [] }) })

const cycles = computed(() => data.value.records.sort(
  (a, b) =>
    new Date(b.start).getTime() - new Date(a.start).getTime()
) ?? [])

const currentCycle = computed(() => {
  return cycles.value.length > 0 ? cycles.value[0] : null;
})

</script>

<template>
  <div>
    <UDashboardPanel id="health">
      <template #header>
        <UDashboardNavbar title="Health" :ui="{ right: 'gap-3' }">
          <template #leading>
            <UDashboardSidebarCollapse class="cursor-pointer" />
          </template>

        </UDashboardNavbar>


      </template>

      <template #body>

        <UPageGrid class="xl:grid-cols-4" v-if="currentCycle">
          <HealthStrainChart :value="currentCycle.score.strain"></HealthStrainChart>


        </UPageGrid>
      </template>
    </UDashboardPanel>
  </div>
</template>
