import { NextResponse } from "next/server"

// general-purpose fallback API without parenting bias
export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    // general knowledge responses as fallback
    const lowerMessage = message.toLowerCase()
    const reply = getGeneralResponse(lowerMessage)

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Fallback API error:", error)
    return NextResponse.json({
      reply: "I'm here to help with any questions you have! What would you like to know about?",
    })
  }
}

// general-purpose responses for common topics
function getGeneralResponse(message: string): string {
  // technology
  if (
    message.includes("programming") ||
    message.includes("coding") ||
    message.includes("javascript") ||
    message.includes("python")
  ) {
    return `I'd be happy to help with programming! 💻

I can assist with:
• Programming languages (JavaScript, Python, Java, etc.)
• Web development (HTML, CSS, React, Node.js)
• Problem-solving and debugging
• Best practices and code optimization
• Learning resources and tutorials

What specific programming topic or challenge are you working on?`
  }

  // science
  if (
    message.includes("science") ||
    message.includes("physics") ||
    message.includes("chemistry") ||
    message.includes("biology")
  ) {
    return `Science is fascinating! 🔬

I can help explain concepts in:
• Physics (mechanics, thermodynamics, quantum physics)
• Chemistry (organic, inorganic, biochemistry)
• Biology (genetics, ecology, human biology)
• Earth sciences and astronomy
• Scientific methods and research

What scientific topic interests you most?`
  }

  // history
  if (message.includes("history") || message.includes("historical")) {
    return `History offers incredible insights into human civilization! 📚

I can discuss:
• World history and major civilizations
• Specific historical periods and events
• Historical figures and their impact
• Cultural and social movements
• Wars, politics, and diplomacy

What historical period or topic would you like to explore?`
  }

  // math
  if (message.includes("math") || message.includes("mathematics") || message.includes("calculate")) {
    return `Mathematics is the language of the universe! 🔢

I can help with:
• Basic arithmetic and algebra
• Geometry and trigonometry
• Calculus and advanced mathematics
• Statistics and probability
• Mathematical problem-solving
• Real-world applications

What mathematical concept or problem can I help you with?`
  }

  // business
  if (message.includes("business") || message.includes("marketing") || message.includes("entrepreneur")) {
    return `Business and entrepreneurship are exciting fields! 💼

I can provide insights on:
• Business strategy and planning
• Marketing and branding
• Finance and investment basics
• Leadership and management
• Startup advice and innovation
• Market analysis and trends

What aspect of business interests you most?`
  }

  // health (general)
  if (message.includes("health") || message.includes("fitness") || message.includes("nutrition")) {
    return `Health and wellness are important topics! 🏃‍♂️

I can share general information about:
• Fitness and exercise principles
• Nutrition and healthy eating
• Mental health and stress management
• Sleep and recovery
• Preventive health measures

*Note: This is general information only, not medical advice. Always consult healthcare professionals for medical concerns.*

What health topic would you like to learn about?`
  }

  // creative topics
  if (
    message.includes("creative") ||
    message.includes("writing") ||
    message.includes("art") ||
    message.includes("music")
  ) {
    return `Creativity is wonderful! 🎨

I can help with:
• Creative writing and storytelling
• Art techniques and art history
• Music theory and composition
• Design principles and aesthetics
• Brainstorming and idea generation
• Creative problem-solving

What creative project or topic are you interested in?`
  }

  // travel
  if (message.includes("travel") || message.includes("country") || message.includes("culture")) {
    return `Travel and culture are fascinating subjects! 🌍

I can share information about:
• Countries and their cultures
• Travel tips and destinations
• Languages and communication
• Cultural traditions and customs
• Geography and landmarks
• Food and cuisine from around the world

What destination or cultural topic interests you?`
  }

  // default general response
  return `Hello! I'm SmartAI, your general-purpose AI assistant. 🤖

I can help you with a wide variety of topics including:
• Technology and programming
• Science and mathematics
• History and culture
• Business and productivity
• Health and wellness (general info)
• Creative projects and writing
• Travel and geography
• Education and learning
• Problem-solving and analysis

What would you like to know or discuss today? Feel free to ask me anything!`
}
