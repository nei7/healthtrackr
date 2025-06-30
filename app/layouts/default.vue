<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const open = ref(false)

const links = [[{
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/',
    onSelect: () => {
        open.value = false
    }
}, {
    label: 'Habit tracker',
    icon: 'i-lucide-notebook-pen',
    to: '/habits',
    onSelect: () => {
        open.value = false
    }
}, {
    label: 'Health',
    icon: 'i-lucide-heart-pulse',
    to: '/health',
    onSelect: () => {
        open.value = false
    }
},
{
    label: 'Sleep',
    icon: 'i-lucide-bed-double',
    to: '/sleep',
    onSelect: () => {
        open.value = false
    }
}
]] satisfies NavigationMenuItem[][]
</script>

<template>
    <UDashboardGroup unit="rem">
        <UDashboardSidebar id="default" v-model:open="open" collapsible resizable class="bg-elevated/25"
            :ui="{ footer: 'lg:border-t lg:border-default' }">

            <template #default="{ collapsed }">

                <UNavigationMenu :collapsed="collapsed" :items="links[0]" orientation="vertical" tooltip popover />

                <UNavigationMenu :collapsed="collapsed" :items="links[1]" orientation="vertical" tooltip
                    class="mt-auto" />
            </template>


        </UDashboardSidebar>


        <slot />

    </UDashboardGroup>
</template>