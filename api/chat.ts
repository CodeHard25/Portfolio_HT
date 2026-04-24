import { portfolioContext, chatSystemPrompt } from "../src/data/portfolio-context";

export const config = { runtime: "edge" };

const MAX_MESSAGES = 40;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: CORS_HEADERS,
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

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "Server configuration error",
        details: "Missing OPENAI_API_KEY",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      }
    );
  }
  const model = (process.env.OPENAI_MODEL || DEFAULT_MODEL).trim();

  try {
    const upstream = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 512,
        stream: true,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content: chatSystemPrompt(portfolioContext),
          },
          ...messages,
        ],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      let details = "OpenAI request failed";
      try {
        const errorBody = await upstream.json();
        const upstreamMessage = errorBody?.error?.message;
        if (typeof upstreamMessage === "string" && upstreamMessage.length > 0) {
          details = upstreamMessage;
        }
      } catch {
        // Ignore non-JSON error payloads.
      }

      const status = upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502;
      return new Response(
        JSON.stringify({
          error: "AI service error",
          status: upstream.status,
          model,
          details,
        }),
        {
          status,
          headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        }
      );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = upstream.body!.getReader();
        let buffer = "";
        let isClosed = false;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const events = buffer.split("\n\n");
            buffer = events.pop() || "";

            for (const event of events) {
              const lines = event.split("\n");
              for (const line of lines) {
                if (!line.startsWith("data:")) continue;
                const payload = line.slice(5).trim();
                if (!payload) continue;

                if (payload === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  controller.close();
                  isClosed = true;
                  return;
                }

                try {
                  const parsed = JSON.parse(payload);
                  const delta = parsed?.choices?.[0]?.delta?.content;
                  if (typeof delta === "string" && delta.length > 0) {
                    const data = JSON.stringify({ text: delta });
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                  }
                } catch {
                  // Ignore partial/invalid chunks and continue streaming.
                }
              }
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } finally {
          reader.releaseLock();
          if (!isClosed) {
            controller.close();
          }
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        ...CORS_HEADERS,
      },
    });
  } catch (error) {
    const details =
      error instanceof Error && error.message ? error.message : "Unknown server error";
    return new Response(
      JSON.stringify({
        error: "AI service error",
        model,
        details,
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      }
    );
  }
}
