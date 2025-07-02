import { Sleep } from '~~/server/models/sleep.schema'

export default defineEventHandler(async (event) => {
  const { start, end } = getQuery(event)

  if (start && end) {
    const startDate = new Date(start.toString())

    const endDate = new Date(end.toString())

    const results = await Sleep.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ createdAt: -1 })

    return results
  }

  return Sleep.find({}).sort({ createdAt: -1 }).limit(25)
})
