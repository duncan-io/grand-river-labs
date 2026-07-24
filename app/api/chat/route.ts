import { chatConfig } from "@/lib/chat/config";
import { getFireworksClient } from "@/lib/chat/client";
import { normalizeEmail } from "@/lib/chat/email";
import { SYSTEM_PROMPT } from "@/lib/chat/prompts";
import {
  appendTurn,
  getMessages,
  isVerifiedChatSession,
} from "@/lib/chat/session-store";
import type { SseEvent } from "@/lib/chat/types";

type ChatRequest = {
  message?: unknown;
  sessionId?: unknown;
  email?: unknown;
};

function encodeSse(event: SseEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(request: Request) {
  let body: ChatRequest;

  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return Response.json(
      { error: "Please send a valid chat message." },
      { status: 400 },
    );
  }

  const message =
    typeof body.message === "string" ? body.message.trim() : "";
  const sessionId =
    typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  const email = normalizeEmail(body.email);

  if (!message || message.length > 4000) {
    return Response.json(
      { error: "Please enter a message." },
      { status: 400 },
    );
  }

  if (!sessionId || sessionId.length > 128) {
    return Response.json(
      { error: "Missing chat session." },
      { status: 400 },
    );
  }

  if (!email) {
    return Response.json(
      { error: "Please enter a valid email to chat.", code: "email_required" },
      { status: 403 },
    );
  }

  if (!isVerifiedChatSession(sessionId, email)) {
    return Response.json(
      {
        error: "Please verify your email to start chatting.",
        code: "email_required",
      },
      { status: 403 },
    );
  }

  if (!process.env.FIREWORKS_API_KEY?.trim()) {
    return Response.json(
      { error: "Chat is not configured. Missing FIREWORKS_API_KEY." },
      { status: 500 },
    );
  }

  let client;
  try {
    client = getFireworksClient();
  } catch {
    return Response.json(
      { error: "Chat is not configured. Missing FIREWORKS_API_KEY." },
      { status: 500 },
    );
  }

  const history = getMessages(sessionId);
  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...history.map((entry) => ({
      role: entry.role,
      content: entry.content,
    })),
    { role: "user" as const, content: message },
  ];

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: SseEvent) => {
        controller.enqueue(encoder.encode(encodeSse(event)));
      };

      let assistantText = "";

      try {
        const completion = await client.chat.completions.create({
          model: chatConfig.model,
          messages,
          stream: true,
          temperature: chatConfig.temperature,
          max_tokens: chatConfig.maxTokens,
        });

        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (!delta) {
            continue;
          }

          assistantText += delta;
          send({ type: "token", content: delta });
        }

        if (!assistantText.trim()) {
          send({
            type: "error",
            error: "The assistant returned an empty reply.",
          });
          controller.close();
          return;
        }

        appendTurn(sessionId, message, assistantText);
        send({ type: "done" });
        controller.close();
      } catch {
        send({
          type: "error",
          error: "Couldn’t reach the assistant. Please try again.",
        });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
