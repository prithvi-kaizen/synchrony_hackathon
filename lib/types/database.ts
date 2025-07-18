export interface Database {
  public: {
    Tables: {
      mood_checkins: {
        Row: {
          id: string
          user_id: string
          mood_score: number
          predicted_mood: string
          user_note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mood_score: number
          predicted_mood: string
          user_note?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mood_score?: number
          predicted_mood?: string
          user_note?: string | null
          created_at?: string
        }
      }
    }
  }
}

export interface MoodAnalysisResult {
  mood_score: number
  predicted_mood: string
  confidence_level: number
  secondary_emotions?: string[]
  mood_description: string
  improvement_suggestions?: string[]
}
