export interface GetCyclesApiResponse {
  records: WhoopRecordType[]
  next_token: string
}

export interface WhoopRecordType {
  id: number
  user_id: number
  created_at: string // ISO date string
  updated_at: string // ISO date string
  start: string // ISO date string
  end: string // ISO date string
  timezone_offset: string // e.g., "-05:00"
  score_state: ScoreState
  score: Score
}

export enum ScoreState {
  SCORED = 'SCORED',
  PENDING_SCORE = 'PENDING_SCORE',
  UNSCORABLE = 'UNSCORABLE'
}

export interface Score {
  strain: number
  kilojoule: number
  average_heart_rate: number
  max_heart_rate: number
}

export interface WhoopSleep {
  id: number
  user_id: number
  created_at: string // ISO 8601
  updated_at: string // ISO 8601
  start: string // ISO 8601
  end: string // ISO 8601
  timezone_offset: string // format '+hh:mm' / '-hh:mm' / 'Z'
  nap: boolean
  score_state: ScoreState
  score: WhoopSleepScore // obecny tylko, jeśli score_state = 'SCORED'
}

export interface WhoopSleepScore {
  stage_summary: StageSummary
  sleep_needed: WhoopSleepNeeded
  respiratory_rate: number
  sleep_performance_percentage: number
  sleep_consistency_percentage: number
  sleep_efficiency_percentage: number
}

export interface StageSummary {
  total_in_bed_time_milli: number
  total_awake_time_milli: number
  total_no_data_time_milli: number
  total_light_sleep_time_milli: number
  total_slow_wave_sleep_time_milli: number
  total_rem_sleep_time_milli: number
  sleep_cycle_count: number
  disturbance_count: number
}

export interface WhoopSleepNeeded {
  baseline_milli: number
  need_from_sleep_debt_milli: number
  need_from_recent_strain_milli: number
  need_from_recent_nap_milli: number
}

export interface SleepCollectionResponse {
  records: WhoopSleep[]
  next_token?: string
}
