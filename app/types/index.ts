
export interface Sale {
    id: string
    date: string
    email: string
    amount: number
}

export interface Notification {
    id: number
    unread?: boolean
    body: string
    date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
    start: Date
    end: Date
}
