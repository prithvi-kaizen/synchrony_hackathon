import { createClient } from '@/lib/supabase/client'
import { Database, MoodAnalysisResult } from '@/lib/types/database'

type MoodCheckin = Database['public']['Tables']['mood_checkins']['Row']

export class MoodService {
  private supabase = createClient()

  async getMoodCheckins(userId: string): Promise<MoodCheckin[]> {
    const { data, error } = await this.supabase
      .from('mood_checkins')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching mood check-ins:', error)
      return []
    }

    return data || []
  }

  async getRecentMoodTrend(userId: string, days: number = 7): Promise<MoodCheckin[]> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data, error } = await this.supabase
      .from('mood_checkins')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching mood trend:', error)
      return []
    }

    return data || []
  }

  async getMoodStats(userId: string): Promise<{
    averageMood: number
    totalCheckins: number
    mostCommonMood: string
    moodDistribution: Record<string, number>
  }> {
    const checkins = await this.getMoodCheckins(userId)
    
    if (checkins.length === 0) {
      return {
        averageMood: 0,
        totalCheckins: 0,
        mostCommonMood: 'No data',
        moodDistribution: {}
      }
    }

    const averageMood = checkins.reduce((sum, checkin) => sum + checkin.mood_score, 0) / checkins.length
    const moodCounts: Record<string, number> = {}
    
    checkins.forEach(checkin => {
      moodCounts[checkin.predicted_mood] = (moodCounts[checkin.predicted_mood] || 0) + 1
    })

    const mostCommonMood = Object.entries(moodCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown'

    return {
      averageMood: Math.round(averageMood * 10) / 10,
      totalCheckins: checkins.length,
      mostCommonMood,
      moodDistribution: moodCounts
    }
  }

  async saveMoodCheckin(
    userId: string, 
    analysis: MoodAnalysisResult, 
    userNote?: string
  ): Promise<MoodCheckin | null> {
    try {
      const { data, error } = await this.supabase
        .from('mood_checkins')
        .insert({
          user_id: userId,
          mood_score: analysis.mood_score,
          predicted_mood: analysis.predicted_mood,
          user_note: userNote
        })
        .select()
        .single()

      if (error) {
        console.error('Error saving mood check-in:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error saving mood check-in:', error)
      return null
    }
  }
}

export const moodService = new MoodService()
