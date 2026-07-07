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
    const { students } = req.body

    if (!students || students.length === 0) {
        return res.status(400).json({
            error: "Student data is required."
        });
    }
    
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
You are an AI Student Performance Analyzer.

Analyze the given student(s) and generate a report containing:
- Overall Performance
- Subject-wise Analysis (Math, Reading, Writing)
- Strengths
- Weaknesses
- Personalized Study Plan
- Learning Resources
- Predicted Improvement
- Motivation

If multiple students are provided, also compare them by identifying:
- Best Performer
- Students Needing Improvement
- Class Average
- Overall Recommendations

Use Markdown, headings, bullet points, and simple language.
`,
        },
        {
          role: "user",
          content: `
Analyze the following student:

${JSON.stringify(students, null, 2)}
`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_completion_tokens: 1000,
    });

    res.status(200).json({
        answer: response.choices[0].message.content,
    })
})

app.listen(8000, () => {
    console.log("server started")
})