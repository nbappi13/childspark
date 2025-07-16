"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Send, Bot, User, X } from "lucide-react"
import { useSmartAIStore } from "@/store/useSmartAIStore"
import SmartAIButton from "./SmartAIButton"

type Message = {
  id: string
  from: "user" | "bot"
  text: string
  timestamp: Date
}

export default function SmartAI() {
  const { isOpen, toggle, close } = useSmartAIStore()
  const [userClosed, setUserClosed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      from: "bot",
      text: "👋 Hello! I'm SmartAI, your intelligent assistant. I can help you with a wide variety of topics - from technology and science to creative projects and general knowledge. What would you like to know or discuss today?",
      timestamp: new Date(),
    },
  ])
  const [useBackupAPI, setUseBackupAPI] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // auto-popup on scroll (only if user hasn't manually closed)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !isOpen && !userClosed) {
        toggle()
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen, userClosed, toggle])

  // auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  // focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      from: "user",
      text: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // try the main API first, unless we know it's failing
      const endpoint = useBackupAPI ? "/api/chat-fallback" : "/api/chat"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        from: "bot",
        text: data.reply || "I'm sorry, I couldn't process that request.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Chat error:", error)

      // if main API failed and we weren't already using backup, try the backup
      if (!useBackupAPI) {
        setUseBackupAPI(true)
        try {
          const fallbackResponse = await fetch("/api/chat-fallback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage.text }),
          })

          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json()
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              from: "bot",
              text: data.reply,
              timestamp: new Date(),
            }
            setMessages((prev) => [...prev, botMessage])
          } else {
            throw new Error("Fallback API also failed")
          }
        } catch (fallbackError) {
          console.error("Fallback chat error:", fallbackError)
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            from: "bot",
            text: "⚠️ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, errorMessage])
        }
      } else {
        // both APIs failed
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          from: "bot",
          text: "⚠️ Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div>
      {/* floating toggle button */}
      <SmartAIButton
        onClick={() => {
          if (isOpen) setUserClosed(true)
          toggle()
        }}
        isOpen={isOpen}
      />

      {/* chat window */}
      <div
        className={`fixed bottom-20 right-6 w-80 max-w-[90vw] bg-white shadow-2xl border rounded-lg z-50 flex flex-col overflow-hidden transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {/* header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 font-semibold flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <span>SmartAI Assistant</span>
          </div>
          <button
            onClick={() => {
              close()
              setUserClosed(true)
            }}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close Chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* message history */}
        <div className="flex flex-col p-4 space-y-3 h-80 overflow-y-auto bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.from === "user" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                {msg.from === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`p-3 rounded-lg max-w-[75%] text-sm whitespace-pre-wrap ${
                  msg.from === "bot" ? "bg-white border shadow-sm" : "bg-blue-600 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="p-3 bg-white border shadow-sm rounded-lg text-sm max-w-[75%]">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* input box */}
        <div className="flex items-center border-t bg-white p-3 gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 text-sm outline-none px-3 py-2 border rounded-lg focus:border-blue-500 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
