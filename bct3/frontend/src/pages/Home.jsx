import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Home = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `# 👋 Welcome to StudyGPT

I'm your AI Study Assistant.

You can ask me about:

- Programming
- AI / ML
- Web Development
- DSA
- College Subjects
- Interview Preparation`,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.botReply || data.answer,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Unable to connect to server.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white p-6">
      <div className="mx-auto flex h-[92vh] max-w-7xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Sidebar */}

        <aside className="hidden md:flex w-72 flex-col bg-slate-950 border-r border-white/10">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              StudyGPT
            </h1>

            <p className="text-sm text-gray-400 mt-2">Learn Faster with AI</p>
          </div>

          <div className="p-5">
            <button className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 py-3 font-semibold hover:opacity-90 transition">
              + New Chat
            </button>
          </div>

          <div className="px-5">
            <p className="text-xs uppercase text-gray-500 mb-3">Recent</p>

            <div className="space-y-2">
              <div className="rounded-lg bg-white/5 p-3 text-sm hover:bg-white/10 cursor-pointer transition">
                JavaScript Closures
              </div>

              <div className="rounded-lg bg-white/5 p-3 text-sm hover:bg-white/10 cursor-pointer transition">
                Learn AI in 30 Days
              </div>

              <div className="rounded-lg bg-white/5 p-3 text-sm hover:bg-white/10 cursor-pointer transition">
                React Interview
              </div>
            </div>
          </div>

          <div className="mt-auto p-5 text-sm text-gray-500">
            Powered by Groq AI
          </div>
        </aside>

        {/* Chat Section */}

        <section className="flex flex-1 flex-col bg-slate-900">
          {/* Header */}

          <div className="border-b border-white/10 bg-slate-900/80 backdrop-blur-xl px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">✨ AI Study Assistant</h2>

              <p className="text-gray-400 text-sm">
                Ask anything and learn interactively.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>

              <span className="text-sm text-gray-400">Online</span>
            </div>
          </div>

          {/* Chat */}

          <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-4 max-w-4xl ${
                    msg.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}

                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
                      msg.sender === "user"
                        ? "bg-linear-to-r from-indigo-500 to-purple-600"
                        : "bg-slate-700"
                    }`}
                  >
                    {msg.sender === "user" ? "👤" : "🤖"}
                  </div>

                  {/* Message */}

                  <div
                    className={`rounded-3xl px-6 py-5 ${
                      msg.sender === "user"
                        ? "bg-linear-to-r from-indigo-600 to-purple-600"
                        : "bg-slate-800 border border-white/10"
                    }`}
                  >
                    <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-200 prose-code:text-green-300 prose-pre:bg-black/40">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-4 max-w-4xl">
                  <div className="h-11 w-11 rounded-full bg-slate-700 flex items-center justify-center">
                    🤖
                  </div>

                  <div className="bg-slate-800 border border-white/10 rounded-3xl px-6 py-5">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></span>
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]"></span>
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}

          <div className="border-t border-white/10 bg-slate-900 p-6">
            <div className="rounded-2xl border border-white/10 bg-slate-800/80 backdrop-blur-lg p-3 flex items-end gap-3">
              <textarea
                rows={1}
                value={input}
                placeholder="Ask anything..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 resize-none bg-transparent outline-none text-white placeholder:text-slate-400 max-h-40 "
              />

              <button
                onClick={handleSend}
                disabled={loading}
                className="h-6 w-6 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center disabled:opacity-50 shadow-lg"
              >
                ➜
              </button>
            </div>

            <p className="text-center text-xs text-slate-500 mt-3">
              StudyGPT can make mistakes. Verify important information.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;