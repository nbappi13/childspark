import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        reply: "🤖 I'm currently unavailable. Please check the configuration.",
      })
    }

    // general-purpose AI assistant without any bias
    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system: `You are SmartAI, a helpful and knowledgeable AI assistant. You can help with a wide variety of topics including:

- General knowledge and information
- Technology and programming
- Science and mathematics
- History and culture
- Creative writing and brainstorming
- Problem-solving and analysis
- Education and learning
- Business and productivity
- Health and wellness (general information only)
- Entertainment and hobbies
- And much more!

Guidelines:
- Be helpful, accurate, and informative
- Provide clear, well-structured responses
- Use a friendly but professional tone
- If you're unsure about something, say so
- Keep responses concise but comprehensive
- Use examples when helpful
- Be objective and unbiased

You can discuss any topic the user is interested in. There's no specific focus area - just be a great general-purpose AI assistant!`,
      prompt: message,
      maxTokens: 600,
      temperature: 0.7,
    })

    return NextResponse.json({ reply: text })
  } catch (error) {
    console.error("Chat API error:", error)

    // better error handling with specific messages
    let errorMessage = "⚠️ I'm having trouble processing your request right now. Please try again in a moment."

    // check for specific error types
    const errorString = String(error)
    if (errorString.includes("model") && errorString.includes("decommissioned")) {
      errorMessage = "⚠️ The AI model is currently being updated. Please try again in a few minutes."
    } else if (errorString.includes("rate limit")) {
      errorMessage = "⚠️ We've reached our usage limit. Please try again in a minute."
    } else if (errorString.includes("API key")) {
      errorMessage = "⚠️ There's an issue with the AI configuration. Please contact support."
    }

    return NextResponse.json({ reply: errorMessage })
  }
}
