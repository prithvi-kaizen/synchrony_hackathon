"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Calendar, Smile } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { moodService } from '@/lib/services/mood'
import { Database } from '@/lib/types/database'

type MoodCheckin = Database['public']['Tables']['mood_checkins']['Row']

export default function MoodDashboard() {
  const [checkins, setCheckins] = useState<MoodCheckin[]>([])
  const [stats, setStats] = useState({
    averageMood: 0,
    totalCheckins: 0,
    mostCommonMood: 'No data',
    moodDistribution: {} as Record<string, number>
  })
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadMoodData()
  }, [])

  const loadMoodData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setIsLoading(false)
        return
      }

      const [recentCheckins, moodStats] = await Promise.all([
        moodService.getRecentMoodTrend(user.id, 7),
        moodService.getMoodStats(user.id)
      ])

      setCheckins(recentCheckins)
      setStats(moodStats)
    } catch (error) {
      console.error('Error loading mood data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getMoodEmoji = (mood: string) => {
    const moodEmojis: Record<string, string> = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      anxious: '😰',
      content: '😌',
      excited: '🤩',
      calm: '😇',
      tired: '😴',
      stressed: '😫',
      neutral: '😐'
    }
    return moodEmojis[mood.toLowerCase()] || '😊'
  }

  const getMoodColor = (score: number) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-yellow-600'
    if (score >= 4) return 'text-orange-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <Card>
            <CardContent className="h-32 bg-gray-200 rounded"></CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageMood}/10</div>
            <p className="text-xs text-muted-foreground">
              Based on {stats.totalCheckins} check-ins
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Common Mood</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {getMoodEmoji(stats.mostCommonMood)}
              <span className="capitalize">{stats.mostCommonMood}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCheckins}</div>
            <p className="text-xs text-muted-foreground">
              Keep tracking your mood!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Check-ins */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Mood Check-ins (Last 7 days)</CardTitle>
        </CardHeader>
        <CardContent>
          {checkins.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No mood check-ins yet.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start capturing your mood to see your progress!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {checkins.map((checkin) => (
                <div key={checkin.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {getMoodEmoji(checkin.predicted_mood)}
                    </div>
                    <div>
                      <div className="font-medium capitalize">
                        {checkin.predicted_mood}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(checkin.created_at).toLocaleDateString()} at{' '}
                        {new Date(checkin.created_at).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getMoodColor(checkin.mood_score)}`}>
                      {checkin.mood_score}/10
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mood Distribution */}
      {Object.keys(stats.moodDistribution).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.moodDistribution)
                .sort(([,a], [,b]) => b - a)
                .map(([mood, count]) => (
                  <div key={mood} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getMoodEmoji(mood)}</span>
                      <span className="capitalize font-medium">{mood}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(count / stats.totalCheckins) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
