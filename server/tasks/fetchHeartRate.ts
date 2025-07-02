import { Sleep } from '../models/sleep.schema'
import { HeartRate } from '../models/heartRate.schema'
import { useWhoopApi } from '~~/server/utils'

export default defineTask({
  meta: {
    name: 'fetchHeartRate',
    description: 'Get sleep heart rate from api and insert into database'
  },
  async run() {
    try {
      Sleep.find({}).sort({ createdAt: -1 }).limit(25)
      const sleep = await Sleep.findOne({ nap: false }).sort({ createdAt: -1 }).limit(1)

      if (!sleep) return { result: false }

      const api = useWhoopApi()

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
