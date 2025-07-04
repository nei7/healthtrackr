export default eventHandler(async (event) => {
  const query = getQuery(event)

  const days = typeof query.days === 'string' ? parseInt(query.days) : undefined

  const { result } = await runTask<boolean>('fetchWhoopData', { payload: { days } })

  return { synced: result ?? false }
})
