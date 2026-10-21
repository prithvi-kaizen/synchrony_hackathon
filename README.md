# Mood check-ins

A Next.js app for recording your own mood and reviewing check-in history. Supabase provides sign-in and storage; Chart.js displays trends.

Choose a mood label and a score from 1 to 10, then optionally write a note. **Save check-in** stores those values without calling an AI provider. **Suggest a next step** sends the written check-in to Google Gemini through the server. The app does not use a camera or infer mood from a face.

## Run locally

Use Node.js 22 or newer.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY` to your Supabase project values. Configure Supabase sign-in redirects for your local and deployed URLs.

For optional suggestions, set **server-only** `GOOGLE_API_KEY` and `GEMINI_MODEL` to a text model available to your Google project. See [Google's text generation documentation](https://ai.google.dev/gemini-api/docs/text-generation). Without both values, suggestions return an unavailable message and check-in saving still works.

Never use `NEXT_PUBLIC_GOOGLE_API_KEY`: Next.js embeds public variables in browser code. Remove that old variable from your hosting settings. If an earlier deployment used a real public key, revoke it in Google AI Studio and configure a replacement as `GOOGLE_API_KEY`, then redeploy. Do not commit `.env.local`.

## Storage and access

The existing `mood_checkins` table stores `user_id`, `mood_score`, `predicted_mood`, `user_note`, and `created_at`. The legacy column `predicted_mood` now contains the user's own label. Previous entries are unchanged.

Enable Supabase row-level security and policies that restrict select/insert/update/delete to rows whose `user_id = auth.uid()`. The public Supabase key does not replace database access rules. This change does not modify an existing database or its policies.

`POST /api/mood` validates the signed-in Supabase user before calling Gemini. It accepts text only, caps input and output, and limits each user to five suggestion requests per minute per server instance. For public production traffic, add a shared rate limiter and provider spending limits; instance memory does not enforce a deployment-wide quota. Reflections are sent to Google only when suggestions are requested. This is a personal reflection tool, not a diagnostic service.

## Checks

```sh
node --test tests/*.test.mjs
npx tsc --noEmit
npm run build
```

Builds require the public Supabase settings. Tests use stubs and do not send entries to a provider.
