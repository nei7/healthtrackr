import type { FetchWhoopDataTaskResponse } from '~~/server/tasks/fetchWhoopData'

export default eventHandler(async (event) => {
  const query = getQuery(event)

  const days = typeof query.days === 'string' ? parseInt(query.days) : 1

  const { result } = await runTask<FetchWhoopDataTaskResponse>('fetchWhoopData', { payload: { days } })

  if (result && result.synced) {
    const { result } = await runTask('fetchHeartRate')
  }

  return { synced: result ?? false }
})
