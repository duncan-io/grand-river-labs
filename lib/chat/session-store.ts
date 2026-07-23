import { chatConfig } from "./config";
import type { ChatMessage } from "./types";

type SessionEntry = {
  messages: ChatMessage[];
  updatedAt: number;
};

// In-memory only: resets on deploy; multi-instance deploys do not share memory.
const sessions = new Map<string, SessionEntry>();

function pruneExpired(now = Date.now()) {
  for (const [sessionId, entry] of sessions) {
    if (now - entry.updatedAt > chatConfig.sessionTtlMs) {
      sessions.delete(sessionId);
    }
  }
}

function trimHistory(messages: ChatMessage[]): ChatMessage[] {
  const max = chatConfig.maxHistoryMessages;
  if (messages.length <= max) {
    return messages;
  }
  return messages.slice(messages.length - max);
}

export function getMessages(sessionId: string): ChatMessage[] {
  pruneExpired();
  const entry = sessions.get(sessionId);
  if (!entry) {
    return [];
  }
  entry.updatedAt = Date.now();
  return [...entry.messages];
}

export function appendTurn(
  sessionId: string,
  userMessage: string,
  assistantMessage: string,
) {
  pruneExpired();
  const existing = sessions.get(sessionId)?.messages ?? [];
  const next = trimHistory([
    ...existing,
    { role: "user", content: userMessage },
    { role: "assistant", content: assistantMessage },
  ]);

  sessions.set(sessionId, {
    messages: next,
    updatedAt: Date.now(),
  });
}
