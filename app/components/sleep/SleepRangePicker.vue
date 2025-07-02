<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, CalendarDate } from '@internationalized/date'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const selected = defineModel<Date>({ required: true })

const toCalendarDate = (date: Date) => {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  )
}

const calendarRange = computed({
  get: () => toCalendarDate(selected.value),
  set: (value: CalendarDate | null) => {
    selected.value = value ? value.toDate(getLocalTimeZone()) : new Date()
  }
})
</script>

<template>
  <UPopover :content="{ align: 'start' }" :modal="true">
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-calendar"
      class="data-[state=open]:bg-elevated group"
    >
      <span class="truncate">
        <template v-if="selected">
          {{ df.format(selected) }}
        </template>
        <template v-else>
          Pick a date
        </template>
      </span>

      <template #trailing>
        <UIcon
          name="i-lucide-chevron-down"
          class="shrink-0 text-dimmed size-5 group-data-[state=open]:rotate-180 transition-transform duration-200"
        />
      </template>
    </UButton>

    <template #content>
      <div class="flex items-stretch sm:divide-x divide-default">
        <UCalendar v-model="calendarRange" class="p-2" />
      </div>
    </template>
  </UPopover>
</template>
