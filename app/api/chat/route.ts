import { chatConfig, getChatModel } from "@/lib/chat/config";
import { getFireworksClient } from "@/lib/chat/client";
import { normalizeEmail } from "@/lib/chat/email";
import { SYSTEM_PROMPT } from "@/lib/chat/prompts";
import {
  appendTurn,
  getMessages,
  isVerifiedChatSession,
} from "@/lib/chat/session-store";
import type { SseEvent } from "@/lib/chat/types";
import type OpenAI from "openai";

type ChatRequest = {
  message?: unknown;
  sessionId?: unknown;
  email?: unknown;
};

type ChatDelta = {
  content?: string | null;
  reasoning_content?: string | null;
};

type CompletionUsage = {
  completion_tokens?: number;
  prompt_tokens?: number;
  total_tokens?: number;
};

type StreamedReply = {
  assistantText: string;
  finishReason: string | null;
  hadReasoning: boolean;
  usage: CompletionUsage | null;
};

function encodeSse(event: SseEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

function logEmptyReply(details: {
  model: string;
  finishReason: string | null;
  hadReasoning: boolean;
  usage: CompletionUsage | null;
  maxTokens: number;
  attempt: number;
}) {
  console.error("Chat assistant returned an empty reply", details);
}

async function streamAssistantReply(
  client: OpenAI,
  params: {
    model: string;
    messages: OpenAI.Chat.ChatCompletionMessageParam[];
    maxTokens: number;
    send: (event: SseEvent) => void;
  },
): Promise<StreamedReply> {
  const completion = await client.chat.completions.create({
    model: params.model,
    messages: params.messages,
    stream: true,
    stream_options: { include_usage: true },
    temperature: chatConfig.temperature,
    max_tokens: params.maxTokens,
  });

  let assistantText = "";
  let finishReason: string | null = null;
  let hadReasoning = false;
  let usage: CompletionUsage | null = null;

  for await (const chunk of completion) {
    if (chunk.usage) {
      usage = {
        completion_tokens: chunk.usage.completion_tokens,
        prompt_tokens: chunk.usage.prompt_tokens,
        total_tokens: chunk.usage.total_tokens,
      };
    }

    const choice = chunk.choices[0];
    if (!choice) {
      continue;
    }

    if (choice.finish_reason) {
      finishReason = choice.finish_reason;
    }

    const delta = choice.delta as ChatDelta;
    if (delta.reasoning_content) {
      hadReasoning = true;
    }

    const token = delta.content;
    if (!token) {
      continue;
    }

    assistantText += token;
    params.send({ type: "token", content: token });
  }

  return { assistantText, finishReason, hadReasoning, usage };
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
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.map((entry) => ({
      role: entry.role,
      content: entry.content,
    })),
    { role: "user", content: message },
  ];

  const encoder = new TextEncoder();
  const model = getChatModel();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: SseEvent) => {
        controller.enqueue(encoder.encode(encodeSse(event)));
      };

      try {
        let attempt = 1;
        let maxTokens: number = chatConfig.maxTokens;
        let reply = await streamAssistantReply(client, {
          model,
          messages,
          maxTokens,
          send,
        });

        if (!reply.assistantText.trim() && reply.finishReason === "length") {
          logEmptyReply({
            model,
            finishReason: reply.finishReason,
            hadReasoning: reply.hadReasoning,
            usage: reply.usage,
            maxTokens,
            attempt,
          });

          attempt = 2;
          maxTokens = chatConfig.retryMaxTokens;
          reply = await streamAssistantReply(client, {
            model,
            messages,
            maxTokens,
            send,
          });
        }

        if (!reply.assistantText.trim()) {
          logEmptyReply({
            model,
            finishReason: reply.finishReason,
            hadReasoning: reply.hadReasoning,
            usage: reply.usage,
            maxTokens,
            attempt,
          });

          send({
            type: "error",
            error:
              reply.finishReason === "content_filter"
                ? "The assistant couldn’t answer that. Please try a different question."
                : "The assistant returned an empty reply.",
          });
          controller.close();
          return;
        }

        appendTurn(sessionId, message, reply.assistantText);
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
