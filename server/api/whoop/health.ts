import type { GetCyclesApiResponse } from '~~/server/types/whoop'

export default defineEventHandler(async (event) => {
  const { start, end, nextToken, limit } = getQuery(event)

  const api = useWhoopApi()

  const response = await api<GetCyclesApiResponse>('developer/v1/cycle', {
    query: {
      start,
      end,
      limit,
      nextToken
    }
  })

  return response
})
