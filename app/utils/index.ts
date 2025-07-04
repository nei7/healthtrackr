export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomFrom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!
}

export function formatTime(ms: number) {
  const hours = (ms / (1000 * 60 * 60))

  if (hours <= 1) {
    return `${(ms / (1000 * 60)).toFixed()} minutes`
  }

  return `${hours.toFixed(1)} hours`
}

export function msToHHMM(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000) // 1 min = 60000 ms
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  const hh = String(hours).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')

  return `${hh}:${mm}`
}

