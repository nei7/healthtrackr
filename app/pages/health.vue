<script lang="ts" setup>
// const { data } = await useFetch('/api/whoop/health', { default: () => ({ records: [] }) })
</script>

<template>
  <UDashboardPanel id="health">
    <template #header>
      <UDashboardNavbar title="Health" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse class="cursor-pointer" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <!-- <UPageGrid v-if="currentCycle" class="xl:grid-cols-4">
        <HealthStrainChart :value="currentCycle.score.strain" />
      </UPageGrid> -->
    </template>
  </UDashboardPanel>
</template>
