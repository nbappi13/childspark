"use client";

import React, { useState, useEffect } from "react";
import { faqData } from "@/data/faqData";
import SmartAIButton from "./SmartAIButton";

export default function SmartAI() {
  const [userClosed, setUserClosed] = useState(false);
  const [open, setOpen] = useState(false); // chat open or closed
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I’m SmartAI — your assistant at SmartParentsHC. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  // auto open chat when user scrolls 500px down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !open && !userClosed) {
        setOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, userClosed]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input.trim() };
    const botResponse = getBotResponse(input.trim());

    setMessages((prev) => [
      ...prev,
      userMessage,
      { from: "bot", text: botResponse },
    ]);
    setInput("");
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    setTimeout(handleSend, 200); // simulate send
  };

  const getBotResponse = (userInput: string) => {
    const normalized = userInput.trim().toLowerCase();

    // Try to find the best matching FAQ
    for (const faq of faqData) {
      const question = faq.question.toLowerCase();

      // simple smart match: checking if any keyword from question exists in input
      const questionKeywords = question.split(/[\s,?.!]+/);
      const inputKeywords = normalized.split(/[\s,?.!]+/);

      const matchFound = questionKeywords.some((qWord) =>
        inputKeywords.includes(qWord)
      );

      if (matchFound) {
        return faq.answer;
      }
    }

    // fallback if nothing matched
    return "😅 Sorry! I’m here to help with SmartParentsHC only. Try asking about courses, payment, or certificates!";
  };

  return (
    <div>
      {/* floating Chat bubble */}
      <SmartAIButton
        onClick={() => {
          if (open) {
            setUserClosed(true); // user clicked to close
          }
          setOpen(!open);
        }}
        isOpen={open}
      />

      {/* chat window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-lg border rounded-lg z-50 flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white p-3 font-semibold">
            SmartAI Assistant
          </div>

          <div className="flex flex-col p-3 space-y-2 h-72 overflow-y-auto text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[85%] ${
                  msg.from === "bot"
                    ? "bg-gray-100 self-start"
                    : "bg-blue-100 self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* suggested Questions */}
          <div className="px-3 pb-2 flex flex-wrap gap-2">
            {[
              "How do I enroll?",
              "Do I get a certificate?",
              "Tell me about Modern Parenting",
            ].map((text, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(text)}
                className="bg-gray-100 hover:bg-gray-200 text-xs px-2 py-1 rounded"
              >
                {text}
              </button>
            ))}
          </div>

          {/* input */}
          <div className="flex items-center border-t p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about SmartParentsHC..."
              className="flex-1 text-sm outline-none px-2 py-1"
            />
            <button
              onClick={handleSend}
              className="ml-2 text-blue-600 font-bold hover:text-blue-800"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
