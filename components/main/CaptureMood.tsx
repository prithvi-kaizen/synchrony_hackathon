"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase/client'
import type { MoodAnalysisResult } from '@/lib/types/database'
import { moodService } from '@/lib/services/mood'

export default function CaptureMood() {
  const [open, setOpen] = useState(false)
  const [mood, setMood] = useState('')
  const [score, setScore] = useState(5)
  const [reflection, setReflection] = useState('')
  const [analysis, setAnalysis] = useState<MoodAnalysisResult | null>(null)
  const [busy, setBusy] = useState<'suggesting' | 'saving' | null>(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const changed = () => { setAnalysis(null); setSaved(false); setError('') }
  const suggest = async () => {
    setBusy('suggesting'); setError('')
    try {
      const response = await fetch('/api/mood', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, score, reflection }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Suggestions are unavailable.')
      setAnalysis(data)
    } catch (err) { setError(err instanceof Error ? err.message : 'Suggestions are unavailable.') }
    finally { setBusy(null) }
  }

  const save = async () => {
    setBusy('saving'); setError('')
    try {
      const { data: { user } } = await createClient().auth.getUser()
      if (!user) throw new Error('Sign in to save your check-in.')
      const result = await moodService.saveMoodCheckin(user.id, {
        mood_score: score, predicted_mood: mood.trim(), mood_description: reflection.trim(),
      }, reflection.trim() || undefined)
      if (!result) throw new Error('Your check-in could not be saved. Please try again.')
      setSaved(true)
    } catch (err) { setError(err instanceof Error ? err.message : 'Your check-in could not be saved.') }
    finally { setBusy(null) }
  }

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><Button>Write a mood check-in</Button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Your mood, in your words</DialogTitle>
        <DialogDescription>Choose how you feel and save a note. Suggestions are optional.</DialogDescription>
      </DialogHeader>
      <form className="space-y-4" onSubmit={event => { event.preventDefault(); void save() }}>
        <div className="space-y-2">
          <label htmlFor="checkin-mood" className="block text-sm font-medium">How would you describe your mood?</label>
          <input id="checkin-mood" required maxLength={50} value={mood} disabled={Boolean(busy)}
            onChange={event => { setMood(event.target.value); changed() }} placeholder="For example, relaxed or tired"
            className="w-full rounded-md border bg-background p-2 text-foreground focus-visible:outline focus-visible:outline-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="checkin-score" className="block text-sm font-medium">Mood score: {score} out of 10</label>
          <input id="checkin-score" type="range" min="1" max="10" value={score} disabled={Boolean(busy)}
            onChange={event => { setScore(Number(event.target.value)); changed() }} className="w-full" />
          <p className="text-sm text-muted-foreground">1 = very low, 10 = very good</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="checkin-note" className="block text-sm font-medium">What is on your mind? (optional)</label>
          <textarea id="checkin-note" rows={4} maxLength={2000} value={reflection} disabled={Boolean(busy)}
            onChange={event => { setReflection(event.target.value); changed() }}
            className="w-full resize-y rounded-md border bg-background p-2 text-foreground focus-visible:outline focus-visible:outline-2" />
          <p className="text-sm text-muted-foreground">Requesting suggestions sends your mood, score and note to Google Gemini. Saving alone does not.</p>
        </div>
        {analysis && <section aria-label="Optional reflection" className="space-y-2 rounded-md border p-3" aria-live="polite">
          <p>{analysis.mood_description}</p>
          <ul className="list-disc space-y-1 pl-5">{analysis.improvement_suggestions?.map((item, index) => <li key={index}>{item}</li>)}</ul>
          <p className="text-sm text-muted-foreground">Generated suggestions may be unhelpful. Keep what works for you.</p>
        </section>}
        {error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
        {saved && <p role="status" className="text-sm">Check-in saved. It will appear when you reload your dashboard.</p>}
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={Boolean(busy) || !mood.trim() || saved}>{busy === 'saving' ? 'Saving…' : saved ? 'Saved' : 'Save check-in'}</Button>
          <Button type="button" variant="outline" onClick={() => void suggest()}
            disabled={Boolean(busy) || !mood.trim() || reflection.trim().length < 10}>
            {busy === 'suggesting' ? 'Writing suggestions…' : 'Suggest a next step'}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
}
