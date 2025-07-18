## Clone and run locally

2. Install the app

   ```bash
   npm install
   ```

4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   NEXT_PUBLIC_GOOGLE_API_KEY=[INSERT GEMINI API KEY]
   ```

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```
