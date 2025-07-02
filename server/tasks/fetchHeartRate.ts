import { WhoopRecord } from '../models/whoopRecord.schema'
import { HeartRate } from '../models/heartRate.schema'
import { useWhoopApi } from '~~/server/utils'

export default defineTask({
  meta: {
    name: 'fetchHeartRate',
    description: 'Get sleep heart rate from api and insert into database'
  },
  async run() {
    try {

      const record = await WhoopRecord.findOne({}).sort({ createdAt: -1 }).limit(1)

      if (!record) return { result: false }

      const api = useWhoopApi()

      const sleep = record.sleeps.filter(sleep => !sleep.nap).sort((a, b) => a.end.getTime() - b.end.getTime())[0]
      if (!sleep) return { result: false }

      const response = await api<{ start: number, values: { data: number, time: number }[] }>('metrics-service/v1/metrics/user/19039830', {
        query: {
          apiVersion: 7,
          start: sleep.start.toISOString(),
          end: sleep.end.toISOString(),
          name: 'heart_rate',
          step: 60,
          order: 't'
        }
      })

      await HeartRate.insertOne({ sleepId: sleep.sleepId, start: response.start, values: response.values })

      return { result: true }
    } catch (err) {
      console.error(err)
      return { result: err }
    }
  }
})
