import { Schema, model } from 'mongoose'
import type { IHeartRate } from '~~/shared/types/models'

type HeartRateModel = IHeartRate & Document

const HeartRateSchema = new Schema<HeartRateModel>({
  start: {
    type: Number,
    required: true
  },

  sleepId: {
    type: Number,
    unique: true,
    required: true
  },
  values: [{
    data: {
      type: Number,
      required: true
    },
    time: {
      type: Number,
      required: true
    }
  }]
})

HeartRateSchema.index({ start: 1, sleepId: 1 })

export const HeartRate = model<HeartRateModel>('heartRate', HeartRateSchema)
