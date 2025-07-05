import { isSameDay, isSameWeek, sub } from 'date-fns'

interface HealthDataStoreState {
  records: WhoopRecord[]
}

export const usehealthDataStore = defineStore('healthData', {
  state: (): HealthDataStoreState => {
    return {
      records: []
    }
  },
  getters: {
    currentRecord: state => state.records.find(record => isSameDay(new Date(), new Date(record.createdAt))),
    getRecord: state => (date: Date) => state.records.find(record => isSameDay(date, new Date(record.createdAt))),
    weeklyRecords: state => state.records.filter(record => isSameWeek(new Date(), record.createdAt))
  },
  actions: {
    async  fetchWhoopRecords() {
      const now = new Date()

      try {
        const data = await $fetch<WhoopRecord[]>('/api/whoop', {
          query: {
            start: sub(now, { months: 1 }).toISOString(),
            end: now.toISOString()
          }
        })
        this.records = data
      } catch (err) {
        console.error(err)
      }
    }

  }
})
