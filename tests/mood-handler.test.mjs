import test from 'node:test'
import assert from 'node:assert/strict'
import { createMoodHandler } from '../lib/server/mood-handler.ts'
const input = { mood: 'Tired', score: 4, reflection: 'I worked a long day and need a break.' }
const request = (body = input, origin = 'https://example.test') => new Request('https://example.test/api/mood', {
  method: 'POST', headers: { 'Content-Type': 'application/json', origin }, body: JSON.stringify(body),
})
const deps = { configured: true, authenticate: async () => 'test-user', suggest: async () => JSON.stringify({ summary: 'You described a long day.', suggestions: ['Take a short break.'], mood_score: 10, predicted_mood: 'Happy' }) }
test('anonymous requests never reach Gemini', async () => {
  let called = false
  const handler = createMoodHandler({ ...deps, authenticate: async () => null, suggest: async () => { called = true } })
  assert.equal((await handler(request())).status, 401); assert.equal(called, false)
})
test('unconfigured suggestions fail closed', async () => assert.equal((await createMoodHandler({ ...deps, configured: false })(request())).status, 503))
test('preserves self-reported mood and score even if provider invents values', async () => {
  const response = await createMoodHandler(deps)(request())
  assert.equal(response.status, 200)
  const result = await response.json()
  assert.equal(result.mood_score, 4); assert.equal(result.predicted_mood, 'Tired')
  assert.equal(result.confidence_level, undefined)
})
test('rejects images, out-of-range scores, and oversized reflections before provider call', async () => {
  for (const body of [{ ...input, image: 'data:image/jpeg;base64,fake' }, { ...input, score: 11 }, { ...input, reflection: 'x'.repeat(2001) }]) {
    let called = false
    assert.equal((await createMoodHandler({ ...deps, suggest: async () => { called = true } })(request(body))).status, 400)
    assert.equal(called, false)
  }
})
test('rejects cross-site requests', async () => assert.equal((await createMoodHandler(deps)(request(input, 'https://other.test'))).status, 403))
test('provider errors and invalid JSON do not leak details', async () => {
  for (const suggest of [async () => { throw new Error('secret-provider-key') }, async () => 'not json']) {
    const response = await createMoodHandler({ ...deps, suggest })(request())
    assert.equal(response.status, 502); assert.doesNotMatch(await response.text(), /secret-provider-key/)
  }
})
test('rate limits authenticated users', async () => {
  const handler = createMoodHandler(deps)
  for (let i = 0; i < 5; i++) assert.equal((await handler(request())).status, 200)
  assert.equal((await handler(request())).status, 429)
})
