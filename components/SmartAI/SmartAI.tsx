"use client";

import React, { useState, useEffect, useRef } from "react";
import faqData from "@/data/faqData";
import SmartAIButton from "./SmartAIButton";
import stringSimilarity from "string-similarity";

export default function SmartAI() {
  const [sampleShown, setSampleShown] = useState(true);
  const [open, setOpen] = useState(false);
  const [userClosed, setUserClosed] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I’m SmartAI — your assistant at SmartParentsHC. How can I help you today?",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  // auto-popup on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !open && !userClosed) {
        setOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, userClosed]);

  // auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input.trim() };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBotTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage.text);
      setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
      setBotTyping(false);
    }, 600);
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    setSampleShown(false); // hide after click
    setTimeout(handleSend, 100);
  };

  const getBotResponse = (userInput: string) => {
    const normalized = userInput.trim().toLowerCase();

    // first: try to match keywords
    for (const faq of faqData) {
      const question = faq.question.toLowerCase();
      const questionKeywords = question.split(/[\s,?.!]+/);
      const inputKeywords = normalized.split(/[\s,?.!]+/);

      const matchFound = questionKeywords.some((qWord: string) =>
        inputKeywords.includes(qWord)
      );

      if (matchFound) {
        return faq.answer;
      }
    }

    // fallback: fuzzy match
    const questions = faqData.map((faq) => faq.question.toLowerCase());
    const { bestMatch } = stringSimilarity.findBestMatch(normalized, questions);

    if (bestMatch.rating > 0.4) {
      const bestFaq = faqData.find(
        (faq) => faq.question.toLowerCase() === bestMatch.target
      );
      return bestFaq?.answer || "🤔 I'm not sure how to help with that.";
    }

    // nothing matched
    return "😅 Sorry! I’m here to help with SmartParentsHC only. Try asking about courses, payment, or certificates!";
  };

  return (
    <div>
      {/* floating button */}
      <SmartAIButton
        onClick={() => {
          if (open) setUserClosed(true);
          setOpen(!open);
        }}
        isOpen={open}
      />

      {/* chat window */}
      <div
        className={`fixed bottom-20 right-6 w-80 max-w-[90vw] bg-white shadow-lg border rounded-lg z-50 flex flex-col overflow-hidden transition-all duration-300 ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {/* header */}
        <div className="bg-blue-600 text-white p-3 font-semibold flex justify-between items-center">
          <span>SmartAI Assistant</span>
          <button
            onClick={() => {
              setOpen(false);
              setUserClosed(true);
            }}
            className="text-white hover:text-gray-200 text-lg"
            aria-label="Close Chat"
          >
            ❌
          </button>
        </div>

        {/* message area */}
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

          {botTyping && (
            <div className="p-2 bg-gray-100 rounded-lg text-sm max-w-[85%] self-start animate-pulse">
              SmartAI is typing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* one suggested sample question */}
        {sampleShown && (
          <div className="px-3 pb-2">
            <button
              onClick={() => handleSuggestionClick("How do I enroll?")}
              className="bg-gray-100 hover:bg-gray-200 text-xs px-2 py-1 rounded"
            >
              How do I enroll?
            </button>
          </div>
        )}

        {/* input box */}
        <div className="flex items-center border-t p-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about SmartParentsHC, payment, courses, certificate etc"
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
    </div>
  );
}
