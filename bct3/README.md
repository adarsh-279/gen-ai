# 🎓 StudyGPT - AI Study Assistant

An AI-powered Study Assistant built using the **MERN Stack** and **Groq AI** that helps students learn programming, AI/ML, DSA, web development, and other technical subjects with structured, easy-to-understand explanations.

---

## ✨ Features

- 🤖 AI-powered study assistant
- 💬 Real-time chatbot interface
- 📝 Markdown formatted responses
- 📚 Structured explanations with headings and bullet points
- 💻 Code explanations with examples
- ⚡ Powered by Groq Llama 3.3 70B
- 🌙 Modern SaaS-inspired UI
- 📱 Responsive design
- 🔄 Auto-scrolling chat
- ⌨️ Send message with Enter key

---

# 📸 Preview

<img width="1917" height="1077" alt="Screenshot 2026-07-08 120040" src="https://github.com/user-attachments/assets/f68e5684-23b1-4bea-9e42-8b66f62debfa" />

```
Frontend
-----------------------------
🤖 AI Study Assistant

Hello! How can I help you today?

You: Explain JavaScript Closures

AI:
• Definition
• Working
• Example
• Common Mistakes
• Summary
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Markdown
- Remark GFM

## Backend

- Node.js
- Express.js
- Groq SDK
- REST API

## AI Model

- Llama-3.3-70B-Versatile (Groq)

---

# 📂 Project Structure

```text
StudyGPT/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/adarsh-279/gen-ai/tree/main/bct3

cd bct3
```

---

## Install Backend

```bash
cd backend

npm install
```

---

## Install Frontend

```bash
cd frontend

npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=8000

GROQ_API_KEY=your_groq_api_key
```

---

# ▶️ Run the Project

## Backend

```bash
npm run dev
```

Runs on

```
http://localhost:8000
```

---

## Frontend

```bash
npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 📡 API Endpoint

## POST

```
/api/chat
```

### Request

```json
{
  "message": "Explain JavaScript Promises"
}
```

### Response

```json
{
  "success": true,
  "answer": "..."
}
```

---

# 🎯 What Can It Do?

Ask questions like:

- Explain React Hooks
- What is Machine Learning?
- Difference between SQL and NoSQL
- Explain Binary Search
- Write a Python Program
- Explain this JavaScript code
- DSA Interview Questions
- Web Development Roadmaps

---

# 💡 Future Improvements

- 🔐 User Authentication
- 💾 Chat History
- 📂 PDF Upload & Analysis
- 🎤 Voice Chat
- 📸 Image Understanding
- 🌐 Multi-language Support
- 📑 Notes Generation
- 📚 Quiz Generation
- 📈 Learning Progress Dashboard
- 📱 PWA Support

---

# 👨‍💻 Author

**Adarsh Shaw**

MERN Stack Developer

GitHub:
https://github.com/adarsh-279

LinkedIn:
https://www.linkedin.com/in/adarsh-shaw279/

Portfolio:
https://adarshshaw.vercel.app

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

It helps the project grow and motivates future improvements.

---

# 📄 License

This project is licensed under the MIT License.
