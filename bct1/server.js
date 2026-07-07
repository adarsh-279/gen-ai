import dotenv from "dotenv"
dotenv.config()
import express from "express"
import Groq from "groq-sdk"

const app = express()
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY})

app.get("/", (req, res) => {
    res.send("server page")
})

app.post("/chat", async (req, res) => {
    const { message } = req.body
    
    const response = await groq.chat.completions.create({
        messages: [
            {
            role: "system",
            content: `You are an AI Study Assistant.
                    Follow these rules for EVERY response:
                    1. Explain everything in simple language.
                    2. Always answer in well-structured points.
                    3. Use headings and subheadings.
                    4. Number the main points (1, 2, 3...).
                    5. Use bullet points for sub-points.
                    6. Give real-world examples whenever possible.
                    7. If the topic involves coding:
                        - Explain the concept first.
                        - Explain the code line by line.
                        - Mention the output.
                        - Mention common mistakes.
                    8. If the answer is long, divide it into sections.
                    9. Never return one large paragraph.
                    10. End with a short summary or key takeaways.`,
            },
        {
            role: "user",
            content: message,
        },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_completion_tokens: 1000
    });

    res.status(200).json({
        answer: response.choices[0].message.content,
    })
})

app.listen(8000, () => {
    console.log("server started")
})