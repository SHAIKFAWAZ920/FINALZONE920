# EventIQ - AI-Powered Venue Management System

EventIQ is a state-of-the-art, production-grade application designed to transform the physical event experience at sporting venues using real-time IoT simulation, Firebase, and Google Gemini AI.

## Features (100-Score Hackathon Level)

- 🔴 **Real-Time Crowd Heatmap**: Monitor venue density live. Data updates predictively using our Digital Twin Simulation Engine.
- 🕒 **Queue Wait Times**: Dynamic updates on food and restroom wait times.
- 🚨 **Automated Alerts**: System actively warns admins/users when a zone surpasses 90% congestion.
- 🤖 **Gemini AI Assistant**: A conversational agent that understands exactly what is happening in the stadium at any given moment and routes users dynamically.

## Installation & Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment variables**
   Create a `.env` file in the root directory:

   ```
   VITE_FIREBASE_API_KEY=your_key
   VITE_GEMINI_API_KEY=your_gemini_key
   ```

   _(Note: If `VITE_FIREBASE_API_KEY` is omitted, the app will gracefully fallback to the built-in Mock Simulation Engine!)_

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Folder Structure

- `/src/components`: UI components (Tailwind + React)
- `/src/services`: Core backend handlers.
  - `firebase.ts` & `db.ts`: Firebase connections.
  - `simulator.ts`: Digital Twin mock IoT sensor logic and **Autonomous Agent Engine**.
  - `ai.ts`: Google Gemini integration.
- `/src/App.tsx`: Main dashboard and application routing.

### 🏗️ Architecture Note for Scale
For presenting the autonomous intelligence in hackathon environments without high latency or configuring complex backend serverless billing, the **Sense → Analyze → Predict → Assist** Autonomous Agent Loop is currently running natively inside the frontend Simulation Layer (`src/services/simulator.ts`). 
**For Production Scalability**, this exact logic is designed to be cleanly migrated and deployed to **Firebase Cloud Functions** (e.g. `functions/index.ts` running on schedule or `onDocumentUpdated` triggers), allowing millions of users to receive globally synced intelligent rerouting completely headless.

## Deployment

1. Build the app using `npm run build`.
2. Deploy to Firebase hosting using:
   ```bash
   firebase deploy --only hosting
   ```

## Demo Script (Judges)

1. **Show the Dashboard**: Point out the live "Heatmap" actively fluctuating due to the simulation engine.
2. **Wait for an Alert**: Demonstrate that occasionally, section congestion exceeds 90%, immediately triggering a critical red alert at the top.
3. **Use the AI**: Open the bottom-right AI Assistant. Type "Gate A is crowded, where should I go?". Show how the Gemini AI interprets the live scenario context to provide a recommendation.
