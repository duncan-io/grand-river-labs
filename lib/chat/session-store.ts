import { sendToN8nForms } from "@/lib/n8n/forms";
import { getFireworksClient } from "./client";
import { chatConfig, getChatModel } from "./config";
import { CHAT_SUMMARY_PROMPT } from "./prompts";
import type { ChatMessage } from "./types";

const SUMMARY_MAX_TOKENS = 1024;
const TRANSCRIPT_MAX_CHARS = 12000;

type SessionEntry = {
  messages: ChatMessage[];
  updatedAt: number;
  email?: string;
  emailLogged?: boolean;
  humanVerified?: boolean;
  userTurns: number;
  sourcePage?: string;
  summary?: string;
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
    userTurns: 0,
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

export function getUserTurns(sessionId: string) {
  pruneExpired();
  const entry = sessions.get(sessionId);
  if (!entry) {
    return 0;
  }
  entry.updatedAt = Date.now();
  return entry.userTurns;
}

export function hasCapturedEmail(sessionId: string) {
  pruneExpired();
  const entry = sessions.get(sessionId);
  if (!entry?.email || !entry.emailLogged) {
    return false;
  }
  entry.updatedAt = Date.now();
  return true;
}

/** Keep the first validated page label for this session. */
export function setSourcePage(sessionId: string, label: string) {
  const entry = getOrCreateSession(sessionId);
  if (!entry.sourcePage) {
    entry.sourcePage = label;
  }
}

export function getSourcePage(sessionId: string) {
  pruneExpired();
  const entry = sessions.get(sessionId);
  if (!entry?.sourcePage) {
    return undefined;
  }
  entry.updatedAt = Date.now();
  return entry.sourcePage;
}

function formatTranscript(messages: ChatMessage[]) {
  const transcript = messages
    .filter((message) => message.content.trim())
    .map((message) => {
      const speaker = message.role === "user" ? "Visitor" : "Assistant";
      return `${speaker}: ${message.content.trim()}`;
    })
    .join("\n\n");

  return transcript.slice(0, TRANSCRIPT_MAX_CHARS);
}

async function summarizeTranscript(messages: ChatMessage[]) {
  const transcript = formatTranscript(messages);
  if (!transcript) {
    return null;
  }

  try {
    const client = getFireworksClient();
    const completion = await client.chat.completions.create({
      model: getChatModel(),
      messages: [
        { role: "system", content: CHAT_SUMMARY_PROMPT },
        { role: "user", content: transcript },
      ],
      temperature: 0.2,
      max_tokens: SUMMARY_MAX_TOKENS,
    });

    const summary = completion.choices[0]?.message?.content?.trim();
    return summary || null;
  } catch (error) {
    console.error("Chat lead summary failed", error);
    return null;
  }
}

const SUMMARY_DEADLINE_MS = 20_000;

/** A slow or failed summary must not block saving the lead. */
function summarizeWithDeadline(messages: ChatMessage[]) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<null>((resolve) => {
    timer = setTimeout(() => {
      console.error("Chat lead summary timed out");
      resolve(null);
    }, SUMMARY_DEADLINE_MS);
  });

  return Promise.race([summarizeTranscript(messages), deadline]).finally(() => {
    if (timer) {
      clearTimeout(timer);
    }
  });
}

/**
 * Attach a normalized email and forward to n8n once per session.
 * Returns a short transcript summary when one could be produced.
 */
export async function captureChatLead(
  sessionId: string,
  email: string,
): Promise<string | null> {
  const entry = getOrCreateSession(sessionId);
  entry.email = email;
  entry.updatedAt = Date.now();

  if (entry.emailLogged) {
    return entry.summary ?? null;
  }

  const summary = await summarizeWithDeadline(entry.messages);
  const transcript = formatTranscript(entry.messages);

  await sendToN8nForms({
    source: "chat",
    email,
    sessionId,
    submittedAt: new Date().toISOString(),
    ...(entry.sourcePage ? { sourcePage: entry.sourcePage } : {}),
    ...(summary ? { summary } : {}),
    ...(transcript ? { transcript } : {}),
  });

  entry.emailLogged = true;
  if (summary) {
    entry.summary = summary;
  }
  sessions.set(sessionId, entry);
  return summary;
}

export function markHumanVerified(sessionId: string) {
  const entry = getOrCreateSession(sessionId);
  entry.humanVerified = true;
  entry.updatedAt = Date.now();
}

export function isHumanVerified(sessionId: string) {
  pruneExpired();
  const entry = sessions.get(sessionId);
  if (!entry?.humanVerified) {
    return false;
  }

  entry.updatedAt = Date.now();
  return true;
}

/** True when this session has no captured email and is still inside the free-message allowance. */
export function canSendWithoutEmail(sessionId: string) {
  pruneExpired();
  const entry = sessions.get(sessionId);
  if (entry?.email && entry.emailLogged) {
    return true;
  }

  return (entry?.userTurns ?? 0) < chatConfig.freeMessages;
}

/**
 * True when this session completed the Turnstile-gated lead capture for `email`.
 */
export function isVerifiedChatSession(sessionId: string, email: string) {
  pruneExpired();
  const entry = sessions.get(sessionId);
  if (!entry?.email || !entry.emailLogged) {
    return false;
  }

  entry.updatedAt = Date.now();
  return entry.email === email;
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
    humanVerified: existing?.humanVerified,
    userTurns: (existing?.userTurns ?? 0) + 1,
    sourcePage: existing?.sourcePage,
    summary: existing?.summary,
  });
}
