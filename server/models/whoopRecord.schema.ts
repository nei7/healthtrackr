import { Schema, model } from 'mongoose'
import type { Sleep, WhoopRecord as Record } from '~~/shared/types/models'

type WhoopRecordModel = Record & Document

const SleepSchema = new Schema<Sleep & Document>({
  nap: {
    type: Boolean,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  respiratoryRate: {
    type: Number,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  sleepScore: {
    performance: {
      type: Number,
      required: true
    },
    consistency: {
      type: Number,
      required: true
    },
    efficiency: {
      type: Number,
      required: true
    }
  },
  summary: {
    totalInBedTime: {
      type: Number,
      required: true
    },
    totalAwakeTime: {
      type: Number,
      required: true
    },
    totalNoDataTime: {
      type: Number,
      required: true
    },
    totalLightSleepTime: {
      type: Number,
      required: true
    },
    totalREMSleepTime: {
      type: Number,
      required: true
    },
    totalSWSSleepTime: {
      type: Number,
      required: true
    },
    sleepCycleCount: {
      type: Number,
      required: true
    },
    disturbanceCount: {
      type: Number,
      required: true
    },

    awakeTimePercentage: {
      type: Number,
      required: true
    },

    lightSleepPercentage: {
      type: Number,
      required: true
    },
    REMSleepPercentage: {
      type: Number,
      required: true
    },
    SWSPercentage: {
      type: Number,
      required: true
    },
    noDataPercentage: {
      type: Number,
      required: true
    }

  },
  sleepNeed: {
    sleepTime: {
      type: Number,
      required: true
    },
    sleepDebt: {
      type: Number,
      required: true
    },
    baseline: {
      type: Number,
      required: true
    },
    needFromSleepDebt: {
      type: Number,
      required: true
    },
    needFromRecentStrain: {
      type: Number,
      required: true
    },
    needFromRecentNap: {
      type: Number,
      required: true
    }
  }
})

const WhoopRecordSchema = new Schema<WhoopRecordModel>({
  sleeps: [SleepSchema],
  cycleId: {
    type: Number,
    required: true,
    unique: true
  },
  sleepId: {
    type: Number,
    unique: true
  },
  recoveryId: {
    type: Number,
    unique: true
  },
  cycle: {
    avgHeartRate: {
      type: Number,
      required: true
    },
    kilojoules: {
      type: Number,
      required: true
    },
    scaledStrain: {
      type: Number,
      required: true
    },
    maxHeartRate: {
      type: Number,
      required: true
    }
  },
  recovery: {
    hrBaseline: {
      type: Number,
      required: true
    },
    skinTempCelsius: {
      type: Number,
      required: true
    },
    spo2: {
      type: Number,
      required: true
    },
    restingHeartRate: {
      type: Number,
      required: true
    },
    hrv: {
      type: Number,
      required: true
    },
    sleepId: {
      type: Number,
      required: true
    },
    calibrating: {
      type: Boolean,
      required: true
    },
    isNormal: {
      type: Boolean,
      required: true
    },
    recoveryId: {
      type: Boolean,
      required: true
    },
  },
  createdAt: {
    type: Date,
    required: true
  },
})


WhoopRecordSchema.index({ sleepId: 1, recoveryId: 1, cycleId: 1, createdAt: -1 })

export const WhoopRecord = model<WhoopRecordModel>('whoopRecord', WhoopRecordSchema)
