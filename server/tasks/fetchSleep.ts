import type { SleepCollectionResponse } from "~~/server/types/whoop"
import { applyTimezoneOffset, useWhoopApi } from "~~/server/utils"
import type { ISleep } from "~~/shared/types/models"
import { Sleep } from "../models/sleep.schema"
import type { AnyBulkWriteOperation } from "mongoose"

export default defineTask({
    meta: {
        name: "fetchSleep",
        description: "Get sleep data from api and insert into database",
    },
    async run(event) {
        try {
            console.info('running fetchSleep task')
            const api = useWhoopApi()

            const response = await api<SleepCollectionResponse>('developer/v1/activity/sleep')

            const records = response.records.map<AnyBulkWriteOperation<ISleep>>(data => {
                const {
                    nap,
                    created_at,
                    updated_at,
                    id,
                    start,
                    end,
                    score: {
                        sleep_needed: {
                            need_from_recent_nap_milli,
                            need_from_recent_strain_milli,
                            need_from_sleep_debt_milli,
                            baseline_milli,
                        },
                        sleep_consistency_percentage,
                        sleep_efficiency_percentage,
                        sleep_performance_percentage,
                        respiratory_rate,
                        stage_summary: {
                            sleep_cycle_count,
                            disturbance_count,
                            total_rem_sleep_time_milli,
                            total_awake_time_milli,
                            total_in_bed_time_milli,
                            total_light_sleep_time_milli,
                            total_no_data_time_milli,
                            total_slow_wave_sleep_time_milli
                        }
                    },
                    timezone_offset
                } = data

                const sleepTime = total_in_bed_time_milli - total_awake_time_milli

                const sleepDebt = (baseline_milli + need_from_sleep_debt_milli + need_from_recent_strain_milli + need_from_recent_nap_milli) - sleepTime

                return {
                    updateOne: {
                        upsert: true,
                        filter: { sleepId: id },
                        update: {
                            $set: <ISleep>{
                                start: new Date(start),
                                end: new Date(end),
                                nap,
                                createdAt: applyTimezoneOffset(created_at, timezone_offset),
                                updatedAt: applyTimezoneOffset(updated_at, timezone_offset),
                                respiratoryRate: respiratory_rate,
                                sleepId: id,
                                sleepNeed: {
                                    baseline: baseline_milli,
                                    needFromRecentNap: need_from_recent_nap_milli,
                                    needFromRecentStrain: need_from_recent_strain_milli,
                                    needFromSleepDebt: need_from_sleep_debt_milli,
                                    sleepDebt,
                                    sleepTime,
                                },
                                sleepScore: {
                                    performance: sleep_performance_percentage,
                                    efficiency: sleep_efficiency_percentage,
                                    consistency: sleep_consistency_percentage,

                                },
                                summary: {
                                    totalAwakeTime: total_awake_time_milli,
                                    totalInBedTime: total_in_bed_time_milli,

                                    totalLightSleepTime: total_light_sleep_time_milli,
                                    totalNoDataTime: total_no_data_time_milli,
                                    totalREMSleepTime: total_rem_sleep_time_milli,
                                    totalSWSSleepTime: total_slow_wave_sleep_time_milli,

                                    sleepCycleCount: sleep_cycle_count,
                                    disturbanceCount: disturbance_count,

                                    awakeTimePercentage: (total_awake_time_milli / total_in_bed_time_milli) * 100,
                                    noDataPercentage: (total_no_data_time_milli / total_in_bed_time_milli) * 100,
                                    REMSleepPercentage: (total_rem_sleep_time_milli / total_in_bed_time_milli) * 100,
                                    SWSPercentage: (total_slow_wave_sleep_time_milli / total_in_bed_time_milli) * 100,
                                    lightSleepPercentage: (total_light_sleep_time_milli / total_in_bed_time_milli) * 100
                                }
                            }
                        }
                    }

                }
            })

            await Sleep.bulkWrite(records)

            return { result: true }
        } catch (err) {
            console.error(err)
            return { result: err }
        }
    },
})