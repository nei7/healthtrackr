import type { AnyBulkWriteOperation } from 'mongoose'
import { sub } from 'date-fns'
import { WhoopRecord } from '../models/whoopRecord.schema'
import type { WhoopRecordResponse } from '../types/whoop'
import { applyTimezoneOffset, useWhoopApi } from '~~/server/utils'
import type { WhoopRecord as Record } from '~~/shared/types/models'
import { mapRecovery, mapCycle, mapSleep } from '../utils/whoop'

export interface FetchWhoopDataTaskResponse {
  error: Error | null
  synced: boolean
  from: string | null
  to: string | null
}

export default defineTask<FetchWhoopDataTaskResponse>({
  meta: {
    name: 'fetchWhoopData',
    description: 'Get whoop data from api and insert into database'
  },
  async run({ payload }) {
    const api = useWhoopApi()

    const now = new Date()

    let response: WhoopRecordResponse | undefined
    let months = 1
    let endDate = now.toISOString()

    do {
      try {
        const endTime = sub(now, { months: months - 1 }).toISOString()
        const startTime = sub(now, { days: payload.days as number || 0, months }).toISOString()

        endDate = startTime

        console.log('Fetching from: ', startTime, ' to: ', endTime)

        response = await api<WhoopRecordResponse>('/activities-service/v1/cycles/aggregate/range/19039830', {
          query: {
            apiVersion: 7,
            limit: 50,
            endTime,
            startTime
          },
          onResponseError(data) {
            console.error(data.response._data)
          }
        })

        const records = response.records.map<AnyBulkWriteOperation>((record) => {
          const sleeps = record.sleeps.map(mapSleep)
          const recovery = record.recovery ? mapRecovery(record.recovery) : undefined

          const cycle = mapCycle(record.cycle)
          return {
            updateOne: {
              upsert: true,
              filter: { cycleId: cycle.id },
              update: {
                $set: <Record>{
                  cycleId: cycle.id,
                  sleeps,
                  createdAt: applyTimezoneOffset(record.cycle.created_at, record.cycle.timezone_offset),
                  recovery,
                  cycle
                }
              }
            }
          }
        })

        await WhoopRecord.bulkWrite(records)

        if (payload.days) {
          return {
            result: {
              synced: true,
              from: now.toISOString(),
              to: endDate,
              error: null
            }
          }
        }

        months++
      } catch (err) {
        console.error(err)
        return {
          result: {
            synced: false,
            error: err as Error,
            from: null,
            to: null
          }
        }
      }
    } while (response && response.records.length > 0)

    return {
      result: {
        synced: true,
        from: now.toISOString(),
        to: endDate,
        error: null
      }
    }
  }
})
