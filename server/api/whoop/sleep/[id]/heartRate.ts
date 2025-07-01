import { get } from "mongoose"

export default defineEventHandler(async (event) => {
  const sleepId = getRouterParam(event, 'id')


  return HeartRate.findOne({ sleepId })
})
