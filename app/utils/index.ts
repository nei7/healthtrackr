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