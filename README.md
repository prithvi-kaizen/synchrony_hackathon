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



________________________________________________________________________________________________________________________________________________________________________
________________________________________________________________________________________________________________________________________________________________________



# 🧠 Mood Check-in App for Developers

A lightweight web application that empowers developers to track their emotional well-being through daily reflections. It uses **Gemini API** to detect mood, stores data securely via **Supabase**, and visualizes trends over time using **Chart.js**.

🌐 **Live Demo**: [https://synchrony-hackathon-yemq.vercel.app](https://synchrony-hackathon-yemq.vercel.app)

---

## 🚀 Features

- ✨ **AI Mood Detection**  
  Analyze user input with Google’s **Gemini API** to predict emotional tone (e.g., happy, stressed, anxious).

- 📝 **Daily Mood Logging**  
  Clean, user-friendly interface where developers write a short journal-style entry.

- 📊 **Interactive Dashboard**  
  Visualizes mood data using **Chart.js**:
  - Line graph for daily mood changes
  - Pie chart for mood distribution
  - Weekly summary view

- 🛡️ **Secure Storage with Supabase**  
  Stores all user data with authentication and real-time syncing.

---

## 🛠️ Tech Stack

| Layer         | Tech Used              |
|---------------|------------------------|
| Frontend      | React.js               |
| Backend & DB  | Supabase               |
| AI Integration| Gemini API (LLM)       |
| Charts        | Chart.js               |
| Deployment    | Vercel                 |

---

## 🔄 How It Works

1. **User logs in**
2. **Writes a mood update** in natural language
3. **Gemini API** analyzes and returns the emotional tone
4. **Supabase** stores the entry and mood
5. **Dashboard** auto-updates to reflect the mood history
