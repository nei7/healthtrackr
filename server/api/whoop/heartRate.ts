export default defineEventHandler(async (event) => {
  const { start, end } = getQuery(event)

  const api = useWhoopApi()

  const response = await api<{ values: { data: number, time: number }[] }>('metrics-service/v1/metrics/user/19039830', {
    query: {
      apiVersion: 7,
      start,
      end,
      name: "heart_rate",
      step: 60,
      order: 't'
    }
  })

  return response.values
})
