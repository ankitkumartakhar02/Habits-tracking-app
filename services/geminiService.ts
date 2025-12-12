
import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getMotivationalQuote = async (): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a short, powerful motivational quote about discipline and consistency. Only return the quote itself, without any introductory text or quotation marks.",
    });
    
    const text = response.text?.trim();

    if (!text) {
        throw new Error("Empty response from Gemini API");
    }

    // Clean up potential markdown or quotes
    return text.replace(/^"|"$|\*/g, '').trim();
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    // Provide a reliable fallback quote
    return "Discipline is the bridge between goals and accomplishment.";
  }
};
