import { Schema, model } from "mongoose";
import type { ISleep } from "~~/shared/types/models";

type SleepModel = ISleep & Document

const SleepSchema = new Schema<SleepModel>({
    nap: {
        type: Boolean,
        required: true
    },
    respiratoryRate: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    sleepId: {
        type: Number,
        required: true,
        unique: true
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
        },
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
        },

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
        },
    }
});


SleepSchema.index({ created_at: -1, sleepId: 1, nap: 1 })

export const Sleep = model<SleepModel>("sleep", SleepSchema);
