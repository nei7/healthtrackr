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

export interface ISleep {
  nap: boolean
  respiratoryRate: number
  createdAt: Date
  updatedAt: Date
  sleepId: number
  start: Date
  end: Date
  sleepScore: SleepScore
  summary: SleepSummary
  sleepNeed: SleepNeed
}

export type DataRecord = { data: number, time: number }

export interface IHeartRate {
  start: number
  sleepId: number
  values: DataRecord[]
}
