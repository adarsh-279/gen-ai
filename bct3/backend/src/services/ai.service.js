import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getAIResponse = async (message) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_completion_tokens: 1000,
      messages: [
        {
          role: "system",
          content: `
You are an AI Study Assistant.

Rules:
1. Explain in simple language.
2. Use headings and numbered points.
3. Use bullet points where needed.
4. Give examples whenever possible.
5. For coding:
   - Explain the concept.
   - Explain code line by line.
   - Mention output.
   - Mention common mistakes.
6. Never answer in one large paragraph.
7. End with a short summary.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);

    throw new Error("Failed to generate AI response.");
  }
};
