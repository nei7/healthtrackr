import type { AnyBulkWriteOperation } from 'mongoose'
import { WhoopRecord } from '../models/whoopRecord.schema'
import { applyTimezoneOffset, useWhoopApi } from '~~/server/utils'
import type { Sleep, WhoopRecord as Record, Recovery, Cycle } from '~~/shared/types/models'
import { sub } from 'date-fns'
import type { CycleRecord, RecoveryRecord, SleepRecord, WhoopRecordResponse } from '../types/whoop'

export interface TimeRange {
  start: Date;
  end: Date;
}

export function parseDuringRange(rangeStr: string): TimeRange {
  const re = /'([^']+)'\s*,\s*'([^']+)'/;
  const m = rangeStr.match(re);
  if (!m) {
    throw new Error(`Invalid range format: ${rangeStr}`);
  }

  const [, startStr, endStr] = m;
  if (!startStr || !endStr) throw new Error('failed to parse range')

  return {
    start: new Date(startStr),
    end: new Date(endStr),
  };
}

function mapCycle(cycle: CycleRecord): Cycle {
  const { day_avg_heart_rate, day_kilojoules, scaled_strain, day_max_heart_rate, id } = cycle

  return {
    maxHeartRate: day_max_heart_rate,
    kilojoules: day_kilojoules,
    scaledStrain: scaled_strain,
    avgHeartRate: day_avg_heart_rate,
    id,
  }
}

function mapSleep(sleep: SleepRecord): Sleep {
  const { score, debt_post, during, is_nap, optimal_sleep_times, activity_id, credit_from_naps, debt_pre, habitual_sleep_need, rem_sleep_duration, in_sleep_efficiency, need_from_strain, no_data_duration, disturbances, wake_duration, time_in_bed, respiratory_rate, cycles_count, sleep_consistency, slow_wave_sleep_duration, light_sleep_duration } = sleep

  const range = parseDuringRange(optimal_sleep_times)
  const { start, end } = parseDuringRange(during)

  return {
    start,
    respiratoryRate: respiratory_rate,
    end,
    nap: is_nap,
    id: activity_id,
    optimalSleepTimes: range,
    summary: {
      totalAwakeTime: wake_duration,
      totalLightSleepTime: light_sleep_duration,
      totalSWSSleepTime: slow_wave_sleep_duration,
      totalREMSleepTime: rem_sleep_duration,
      totalInBedTime: time_in_bed,
      totalNoDataTime: no_data_duration,
      awakeTimePercentage: (wake_duration / time_in_bed) * 100,
      SWSPercentage: (slow_wave_sleep_duration / time_in_bed) * 100,
      REMSleepPercentage: (rem_sleep_duration / time_in_bed) * 100,
      lightSleepPercentage: (light_sleep_duration / time_in_bed) * 100,
      noDataPercentage: (no_data_duration / time_in_bed) * 100,
      sleepCycleCount: cycles_count,
      disturbanceCount: disturbances
    },
    sleepScore: {
      performance: score,
      consistency: sleep_consistency,
      efficiency: in_sleep_efficiency * 100
    },
    sleepNeed: {
      sleepDebt: debt_post,
      baseline: habitual_sleep_need,
      needFromRecentStrain: need_from_strain,
      needFromSleepDebt: debt_pre,
      sleepTime: time_in_bed - wake_duration,
      needFromRecentNap: credit_from_naps
    }
  }
}

function mapRecovery(recovery: RecoveryRecord): Recovery {
  const { sleep_id, spo2, skin_temp_celsius, resting_heart_rate, hrv_rmssd, hr_baseline, calibrating, is_normal, id } = recovery

  return {
    skinTempCelsius: skin_temp_celsius,
    spo2,
    sleepId: sleep_id,
    restingHeartRate: resting_heart_rate,
    hrv: hrv_rmssd,
    hrBaseline: hr_baseline,
    calibrating,
    isNormal: is_normal || false,
    id
  }
}

export default defineTask({
  meta: {
    name: 'fetchWhoopData',
    description: 'Get whoop data from api and insert into database'
  },
  async run() {
    try {
      console.info('running fetchSleep task')
      const api = useWhoopApi()

      const now = new Date()


      const response = await api<WhoopRecordResponse>('/activities-service/v1/cycles/aggregate/range/19039830', {
        query: {
          apiVersion: 7,
          limit: 31,
          endTime: now.toISOString(),
          startTime: sub(now, { months: 1 }).toISOString()
        },
        onResponseError(data) {
          console.error(data)
        }
      })


      const records = response.records.map((record) => {
        const sleeps = record.sleeps.map(mapSleep)
        const recovery = record.recovery ? mapRecovery(record.recovery) : undefined


        const cycle = mapCycle(record.cycle)
        return {
          updateOne: {
            upsert: true,
            filter: { cycleId: cycle.id },
            update: {
              $set: <Record>{
                sleepId: recovery?.sleepId,
                cycleId: cycle.id,
                recoveryId: recovery?.id,
                sleeps,
                createdAt: applyTimezoneOffset(record.cycle.predicted_end, record.cycle.timezone_offset),
                recovery,
                cycle,
              }
            }
          }
        }
      })

      await WhoopRecord.bulkWrite(records)

      return { result: true }
    } catch (err) {
      console.error(err)
      return { result: err }
    }
  }
})
