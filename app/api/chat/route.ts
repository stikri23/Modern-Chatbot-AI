import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    system: `You are a helpful customer support agent. Be friendly, professional, and concise. 
    Always try to resolve customer issues and provide clear solutions. 
    If you cannot help with something, politely explain and suggest contacting human support.`,
    messages,
  })

  return result.toDataStreamResponse()
}
