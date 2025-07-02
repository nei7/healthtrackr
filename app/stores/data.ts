import { isSameDay, sub } from "date-fns"

export const useDataStore = defineStore('data', () => {
    const loading = ref(false)
    const error = ref<Error | null>(null)

    const now = new Date()
    const records = ref<WhoopRecord[]>([])

    async function fetchData() {
        try {
            const data = await $fetch<WhoopRecord[]>('/api/whoop', {
                query: {
                    start: sub(now, { months: 1 }).toISOString(),
                    end: now.toISOString()
                }
            })
            records.value = data
        } catch (err: any) {
            error.value = err
        } finally {
            loading.value = false
        }
    }

    callOnce(() => fetchData())

    const getRecord = (date: Date) =>
        records.value.find(record => isSameDay(date, new Date(record.createdAt))) || null


    return {
        records,
        getRecord
    }
})
