import { GoogleGenAI } from '@google/genai';

// Initialize Gemini SDK
// Note: In production, never expose your real logic or keys to the client directly.
// This should be encapsulated in Firebase Cloud Functions.
// For demo/hackathon purposes, we use it client-side if a key is provided.

let aiClient: GoogleGenAI | null = null;
try {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'dummy_key';
  aiClient = new GoogleGenAI({ apiKey });
} catch {
  console.debug('Gemini Client initialization skipped.');
}

export const getAIPrediction = async (venueData: Record<string, unknown>, userQuery: string) => {
  if (!aiClient) {
    return 'AI system offline: Missing API Key.';
  }

  const prompt = `You are EventIQ, an autonomous AI event assistant for a stadium.
Current Venue State:
${JSON.stringify(venueData)}

User Query: "${userQuery}"

Provide a concise, helpful response. If they want routing, recommend the fastest path to avoid "congested" zones. If they want food, suggest the queue with the lowest wait time.`;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.debug('AI Error:', error);
    return 'I am currently analyzing the heatmap. Please wait a moment.';
  }
};
