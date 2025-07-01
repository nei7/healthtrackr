import { parseISO, addMinutes, subMinutes } from 'date-fns'

export const useWhoopApi = () =>
    $fetch.create({
        baseURL: 'https://api.prod.whoop.com',
        headers: {
            Authorization: `Bearer ${process.env.WHOOP_ACCESS_TOKEN}`
        },
        onResponseError(err) {
            console.log(JSON.stringify(err))
        }
    })


export function applyTimezoneOffset(dateStr: string, offsetStr: string): Date {
    const date = parseISO(dateStr)

    if (offsetStr === 'Z') return date

    const match = offsetStr.match(/^([+-])(\d{2}):(\d{2})$/)
    if (!match) throw new Error(`Invalid timezone offset: ${offsetStr}`)

    const [, sign, hours, minutes] = match

    const totalMinutes = parseInt(hours ?? '00') * 60 + parseInt(minutes ?? '00')

    return sign === '+' ? subMinutes(date, totalMinutes) : addMinutes(date, totalMinutes)
}
