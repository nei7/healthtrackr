export enum ScoreState {
  SCORED = 'SCORED',
  PENDING_SCORE = 'PENDING_SCORE',
  UNSCORABLE = 'UNSCORABLE'
}

export interface CycleRecord {
  id: number;
  created_at: string;         // ISO 8601 timestamp
  updated_at: string;         // ISO 8601 timestamp
  scaled_strain: number;
  during: string;             // time range as string
  user_id: number;
  sleep_need: number | null;
  predicted_end: string;      // ISO 8601 timestamp
  timezone_offset: string;    // e.g. "+0200"
  days: string;               // date range as string
  intensity_score: number | null;
  data_state: string;
  day_strain: number;
  day_kilojoules: number;
  day_avg_heart_rate: number;
  day_max_heart_rate: number;
}

export interface SleepRecord {
  cycle_id: number;
  created_at: string;
  updated_at: string;
  activity_id: number;
  score: number;
  quality_duration: number;
  latency: number;
  max_heart_rate: number | null;
  average_heart_rate: number | null;
  debt_pre: number;
  debt_post: number;
  need_from_strain: number;
  sleep_need: number;
  habitual_sleep_need: number;
  disturbances: number;
  time_in_bed: number;
  light_sleep_duration: number;
  slow_wave_sleep_duration: number;
  rem_sleep_duration: number;
  cycles_count: number;
  wake_duration: number;
  arousal_time: number;
  no_data_duration: number;
  in_sleep_efficiency: number;
  credit_from_naps: number;
  hr_baseline: number | null;
  respiratory_rate: number;
  sleep_consistency: number;
  algo_version: string;
  projected_score: number;
  projected_sleep: number;
  optimal_sleep_times: string; // time range as string
  kilojoules: number | null;
  user_id: number;
  timezone_offset: string;
  survey_response_id: number | null;
  percent_recorded: number;
  auto_detected: boolean;
  state: string;
  responded: boolean;
  team_act_id: number | null;
  source: string;
  prior_during: string | null;
  during: string;
  is_normal: boolean;
  is_significant: boolean;
  is_nap: boolean;
}

export interface RecoveryRecord {
  during: string;
  id: number;
  created_at: string;
  updated_at: string;
  date: string;
  user_id: number;
  sleep_id: number;
  survey_response_id: number | null;
  cycle_id: number;
  responded: boolean;
  recovery_score: number;
  resting_heart_rate: number;
  hrv_rmssd: number;
  state: string;
  calibrating: boolean;
  prob_covid: number | null;
  hr_baseline: number;
  skin_temp_celsius: number;
  spo2: number;
  algo_version: string;
  rhr_component: number;
  hrv_component: number;
  history_size: number;
  from_sws: boolean;
  recovery_rate: number | null;
  is_normal: boolean | null;
}

export interface Workout {
  cycle_id: number;
  created_at: string;
  updated_at: string;
  sport_id: number;
  activity_id: number;
  gps_enabled: boolean;
  intensity_score: number;
  max_heart_rate: number;
  average_heart_rate: number;
  distance: number | null;
  performance: number | null;
  energy: number | null;
  rpe: number | null;
  raw_intensity_score: number;
  altitude_gain: number | null;
  altitude_change: number | null;
  cumulative_workout_intensity: number;
  zone_durations: number[];
  projected_score: number | null;
  confidence: number | null;
  wac_prediction: number | null;
  kilojoules: number;
  user_id: number;
  timezone_offset: string;
  survey_response_id: number | null;
  percent_recorded: number;
  auto_detected: boolean;
  state: string;
  responded: boolean;
  team_act_id: number | null;
  source: string;
  prior_during: string | null;
  during: string;
}

export interface Metric {
  cycle: CycleRecord;
  sleeps: SleepRecord[];
  recovery: RecoveryRecord | null;
  workouts: Workout[];
  v2_activities: any[];  // currently empty or unknown structure
}

export interface WhoopRecordResponse {
  records: Metric[]
}

