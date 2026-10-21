export type Checkin = { mood: string; score: number; reflection: string }
type Dependencies = {
  configured: boolean
  authenticate: () => Promise<string | null>
  suggest: (input: Checkin) => Promise<string>
}

export function createMoodHandler(deps: Dependencies) {
  const attempts = new Map<string, { count: number; expires: number }>()
  return async (request: Request): Promise<Response> => {
    const reply = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
    try {
      const userId = await deps.authenticate()
      if (!userId) return reply({ error: 'Sign in to request a reflection.' }, 401)
      if (!deps.configured) return reply({ error: 'Suggestions are not configured. You can still save your check-in.' }, 503)
      if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin) {
        return reply({ error: 'Request origin is not allowed.' }, 403)
      }
      if (Number(request.headers.get('content-length')) > 10000) return reply({ error: 'Check-in is too long.' }, 413)
      const raw = await request.text()
      if (raw.length > 10000) return reply({ error: 'Check-in is too long.' }, 413)
      let input: Checkin
      try { input = JSON.parse(raw) } catch { return reply({ error: 'Send a valid JSON check-in.' }, 400) }
      if (!input || Object.keys(input).some(key => !['mood', 'score', 'reflection'].includes(key)) ||
        typeof input.mood !== 'string' || !input.mood.trim() || input.mood.length > 50 ||
        !Number.isInteger(input.score) || input.score < 1 || input.score > 10 ||
        typeof input.reflection !== 'string' || input.reflection.trim().length < 10 || input.reflection.length > 2000) {
        return reply({ error: 'Enter a mood, a score from 1 to 10, and a reflection of 10 to 2000 characters.' }, 400)
      }
      const now = Date.now()
      for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key)
      const usage = attempts.get(userId) || { count: 0, expires: now + 60000 }
      if (usage.count >= 5 || attempts.size >= 10000 && !attempts.has(userId)) {
        return reply({ error: 'Please wait a minute before requesting another suggestion.' }, 429)
      }
      attempts.set(userId, { ...usage, count: usage.count + 1 })
      const result = JSON.parse(await deps.suggest({ ...input, mood: input.mood.trim(), reflection: input.reflection.trim() }))
      if (typeof result.summary !== 'string' || !result.summary.trim() || result.summary.length > 1200 ||
        !Array.isArray(result.suggestions) || result.suggestions.length > 3 ||
        result.suggestions.some((item: unknown) => typeof item !== 'string' || !item.trim() || item.length > 400)) {
        throw new Error('Invalid provider response')
      }
      return reply({ mood_score: input.score, predicted_mood: input.mood.trim(), mood_description: result.summary,
        improvement_suggestions: result.suggestions })
    } catch {
      return reply({ error: 'Suggestions are unavailable. Your check-in can still be saved.' }, 502)
    }
  }
}
