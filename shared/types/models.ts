import type { TimeRange } from '~~/server/utils/whoop'

export interface SleepScore {
  performance: number
  consistency: number
  efficiency: number
}

export interface SleepSummary {
  totalInBedTime: number
  totalAwakeTime: number
  totalNoDataTime: number
  totalLightSleepTime: number
  totalREMSleepTime: number
  totalSWSSleepTime: number

  awakeTimePercentage: number
  noDataPercentage: number
  lightSleepPercentage: number
  REMSleepPercentage: number
  SWSPercentage: number

  sleepCycleCount: number
  disturbanceCount: number
}

export interface SleepNeed {
  baseline: number
  needFromSleepDebt: number
  needFromRecentStrain: number
  needFromRecentNap: number
  sleepDebt: number
  sleepTime: number
}

export interface Sleep {
  nap: boolean
  respiratoryRate: number
  id: number
  start: Date
  end: Date
  sleepScore: SleepScore
  summary: SleepSummary
  sleepNeed: SleepNeed
  optimalSleepTimes: TimeRange | null
}

export interface WhoopRecord {
  cycleId: number
  sleepId: number
  recoveryId: number
  sleeps: Sleep[]
  recovery: Recovery
  cycle: Cycle
  createdAt: Date
}

export interface Cycle {
  avgHeartRate: number
  kilojoules: number
  scaledStrain: number
  maxHeartRate: number
  id: number
}

export interface Recovery {
  hrBaseline: number
  skinTempCelsius: number
  spo2: number
  restingHeartRate: number
  hrv: number // hrv_rmssd
  sleepId: number
  isNormal: boolean
  calibrating: boolean
  id: number
  score: number
  date: string
}

export type DataRecord = { data: number, time: number }

export interface IHeartRate {
  start: number
  sleepId: number
  values: DataRecord[]
}
