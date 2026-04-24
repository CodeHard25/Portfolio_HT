import Anthropic from "@anthropic-ai/sdk";
import { portfolioContext, chatSystemPrompt } from "../src/data/portfolio-context";

export const config = { runtime: "edge" };

const MAX_MESSAGES = 40;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let messages: Message[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length > MAX_MESSAGES) {
      return new Response("Invalid request", { status: 400 });
    }
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response("Server configuration error", { status: 500 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const stream = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system: chatSystemPrompt(portfolioContext),
      messages,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              const data = JSON.stringify({ text: chunk.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return new Response("AI service error", { status: 502 });
  }
}
