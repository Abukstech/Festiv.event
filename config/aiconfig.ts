import OpenAI from "openai";

// Initialize the OpenAI client
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const generateEventDescription = async (eventDetails: string) => {
  if (OPENAI_API_KEY) {
    const openai = new OpenAI();
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo",
        prompt: `Generate a detailed event description based on the following details: ${eventDetails}`,
      });

      return response.choices[0]?.text.trim();
    } catch (error) {
      console.error("Error generating event description:", error);
      throw new Error("Failed to generate event description");
    }
  }
};
