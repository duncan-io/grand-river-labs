import { sendToN8nForms } from "@/lib/n8n/forms";
import { chatConfig } from "./config";
import type { ChatMessage } from "./types";

type SessionEntry = {
  messages: ChatMessage[];
  updatedAt: number;
  email?: string;
  emailLogged?: boolean;
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

function getOrCreateSession(sessionId: string): SessionEntry {
  pruneExpired();
  const existing = sessions.get(sessionId);
  if (existing) {
    existing.updatedAt = Date.now();
    return existing;
  }

  const entry: SessionEntry = {
    messages: [],
    updatedAt: Date.now(),
  };
  sessions.set(sessionId, entry);
  return entry;
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

/**
 * Attach a normalized email and forward to n8n once per session.
 */
export async function captureChatLead(sessionId: string, email: string) {
  const entry = getOrCreateSession(sessionId);
  entry.email = email;
  entry.updatedAt = Date.now();

  if (entry.emailLogged) {
    return;
  }

  await sendToN8nForms({
    source: "chat",
    email,
    sessionId,
    submittedAt: new Date().toISOString(),
  });

  entry.emailLogged = true;
  sessions.set(sessionId, entry);
}

/**
 * Attach a normalized email to the session. Forwards to n8n once on first attach.
 */
export async function ensureSessionEmail(sessionId: string, email: string) {
  await captureChatLead(sessionId, email);
}

export function appendTurn(
  sessionId: string,
  userMessage: string,
  assistantMessage: string,
) {
  pruneExpired();
  const existing = sessions.get(sessionId);
  const priorMessages = existing?.messages ?? [];
  const next = trimHistory([
    ...priorMessages,
    { role: "user", content: userMessage },
    { role: "assistant", content: assistantMessage },
  ]);

  sessions.set(sessionId, {
    messages: next,
    updatedAt: Date.now(),
    email: existing?.email,
    emailLogged: existing?.emailLogged,
  });
}
