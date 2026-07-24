"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EMAIL_MAX_LENGTH, normalizeEmail } from "@/lib/chat/email";
import type { SseEvent } from "@/lib/chat/types";
import { Arrow, SiteHeader } from "./site-header";
import {
  TurnstileField,
  type TurnstileFieldHandle,
} from "./turnstile-field";

type Role = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
};

const SESSION_KEY = "grl-chat-session";
const EMAIL_KEY = "grl-chat-email";

const WELCOME_MESSAGE =
  "Hi—I’m the Grand River Labs assistant. Ask me how AI automation could fit your workflow, what we typically build, or where to start.";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getOrCreateSessionId() {
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) {
    return existing;
  }

  const next = createId();
  sessionStorage.setItem(SESSION_KEY, next);
  return next;
}

function getStoredEmail() {
  const existing = sessionStorage.getItem(EMAIL_KEY);
  if (!existing) {
    return null;
  }

  return normalizeEmail(existing);
}

function parseSseChunk(buffer: string): { events: SseEvent[]; rest: string } {
  const events: SseEvent[] = [];
  const parts = buffer.split("\n\n");
  const rest = parts.pop() ?? "";

  for (const part of parts) {
    const dataLine = part
      .split("\n")
      .find((line) => line.startsWith("data: "));

    if (!dataLine) {
      continue;
    }

    try {
      events.push(JSON.parse(dataLine.slice(6)) as SseEvent);
    } catch {
      // Ignore malformed chunks mid-stream.
    }
  }

  return { events, rest };
}

type ChatPanelProps = {
  turnstileSiteKey: string;
};

export function ChatPanel({ turnstileSiteKey }: ChatPanelProps) {
  const listId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const gateTurnstileRef = useRef<TurnstileFieldHandle>(null);
  const [sessionId, setSessionId] = useState("");
  const [email, setEmail] = useState("");
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [gateTurnstileToken, setGateTurnstileToken] = useState<string | null>(
    null,
  );
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGE,
    },
  ]);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
    const stored = getStoredEmail();
    if (stored) {
      setEmailDraft(stored);
    }
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    panel.scrollTo({ top: panel.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  useEffect(() => {
    if (emailUnlocked) {
      inputRef.current?.focus();
      return;
    }

    emailInputRef.current?.focus();
  }, [emailUnlocked]);

  function lockChat(message?: string) {
    setEmailUnlocked(false);
    setEmail("");
    setGateTurnstileToken(null);
    gateTurnstileRef.current?.reset();
    if (message) {
      setEmailError(message);
    }
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeEmail(emailDraft);
    if (!normalized) {
      setEmailError("Please enter a valid work email.");
      return;
    }

    if (!sessionId) {
      setEmailError("Chat isn’t ready yet. Please try again.");
      return;
    }

    const token =
      gateTurnstileToken ?? gateTurnstileRef.current?.getResponse() ?? "";
    if (!token) {
      setEmailError("Please complete the verification challenge.");
      return;
    }

    setEmailError(null);
    setIsSubmittingEmail(true);

    try {
      const response = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalized,
          sessionId,
          "cf-turnstile-response": token,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          result?.error ?? "We couldn’t save your email. Please try again.",
        );
      }

      sessionStorage.setItem(EMAIL_KEY, normalized);
      setEmail(normalized);
      setEmailDraft(normalized);
      setEmailUnlocked(true);
      setGateTurnstileToken(null);
      setError(null);
    } catch (error) {
      gateTurnstileRef.current?.reset();
      setGateTurnstileToken(null);
      setEmailError(
        error instanceof Error
          ? error.message
          : "We couldn’t save your email. Please try again.",
      );
    } finally {
      setIsSubmittingEmail(false);
    }
  }

  async function sendMessage(raw: string) {
    const message = raw.trim();
    if (!message || isSending || !sessionId || !emailUnlocked || !email) {
      return;
    }

    const assistantId = createId();

    setError(null);
    setInput("");
    setIsSending(true);
    setStreamingId(assistantId);
    setMessages((current) => [
      ...current,
      { id: createId(), role: "user", content: message },
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId, email }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          error?: string;
          code?: string;
        } | null;

        if (result?.code === "email_required") {
          setMessages((current) =>
            current.filter((entry) => entry.id !== assistantId),
          );
          lockChat(
            result.error ?? "Please verify your email to start chatting.",
          );
          return;
        }

        throw new Error(
          result?.error ?? "Couldn’t reach the assistant. Please try again.",
        );
      }

      if (!response.body) {
        throw new Error("Couldn’t reach the assistant. Please try again.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let receivedDone = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const parsed = parseSseChunk(buffer);
        buffer = parsed.rest;

        for (const event of parsed.events) {
          if (event.type === "token") {
            setMessages((current) =>
              current.map((entry) =>
                entry.id === assistantId
                  ? { ...entry, content: entry.content + event.content }
                  : entry,
              ),
            );
          } else if (event.type === "error") {
            throw new Error(event.error);
          } else if (event.type === "done") {
            receivedDone = true;
          }
        }
      }

      if (!receivedDone) {
        throw new Error("Couldn’t reach the assistant. Please try again.");
      }

      setMessages((current) => {
        const assistant = current.find((entry) => entry.id === assistantId);
        if (assistant?.content.trim()) {
          return current;
        }

        return current.filter((entry) => entry.id !== assistantId);
      });
    } catch (err) {
      setMessages((current) =>
        current.filter(
          (entry) =>
            entry.id !== assistantId || entry.content.trim().length > 0,
        ),
      );

      const messageText =
        err instanceof Error
          ? err.message
          : "Couldn’t reach the assistant. Please try again.";
      setError(messageText);
    } finally {
      setIsSending(false);
      setStreamingId(null);
      if (emailUnlocked) {
        inputRef.current?.focus();
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <section className="chat" aria-labelledby={`${listId}-title`}>
      <SiteHeader embedded />

      <h1 className="visually-hidden" id={`${listId}-title`}>
        Ask how automation could fit your workflow
      </h1>

      <div className="chat__body">
        <aside className="chat__rail" aria-hidden="true">
          <p className="eyebrow">Ask the assistant</p>
          <p className="display chat__title">
            Ask how automation could fit your workflow
          </p>
          <p className="chat__lede">
            Chat with our AI to learn what we automate, how engagements work,
            and whether a first project makes sense for your team.
          </p>
        </aside>

        <div className="chat__main">
          <div
            className="chat__panel"
            ref={panelRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Chat messages"
          >
            <ul className="chat__messages" id={listId}>
              {messages.map((message) => {
                const isStreaming =
                  message.id === streamingId && message.role === "assistant";

                return (
                  <li
                    key={message.id}
                    className={`chat__bubble chat__bubble--${message.role}${
                      isStreaming ? " chat__bubble--streaming" : ""
                    }`}
                  >
                    <span className="chat__role">
                      {message.role === "user" ? "You" : "Assistant"}
                    </span>
                    {message.role === "assistant" ? (
                      <div className="chat__markdown">
                        {message.content ? (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          <p className="chat__streaming-placeholder">
                            Thinking…
                          </p>
                        )}
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <form
            className="chat__composer"
            onSubmit={handleSubmit}
            aria-hidden={!emailUnlocked}
          >
            {error ? (
              <p className="chat__error" role="alert">
                {error}
              </p>
            ) : null}
            <label className="visually-hidden" htmlFor={`${listId}-input`}>
              Message
            </label>
            <textarea
              id={`${listId}-input`}
              ref={inputRef}
              className="chat__input"
              rows={2}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about automation, use cases, or getting started…"
              disabled={!emailUnlocked || isSending || !sessionId}
              maxLength={4000}
            />
            <div className="chat__composer-footer">
              <p className="chat__hint">
                Enter to send · Shift+Enter for a new line
              </p>
              <button
                className="button button-primary"
                type="submit"
                disabled={
                  !emailUnlocked ||
                  isSending ||
                  !sessionId ||
                  !input.trim()
                }
              >
                Send
                <Arrow />
              </button>
            </div>
          </form>

          {!emailUnlocked ? (
            <div className="chat__gate-overlay">
              <form
                className="chat__gate-dialog"
                onSubmit={handleEmailSubmit}
                aria-labelledby={`${listId}-gate-title`}
              >
                <p className="chat__gate-copy" id={`${listId}-gate-title`}>
                  Leave your email to start chatting.
                </p>
                <p className="chat__hint">
                  We’ll only use this to follow up if it’s useful.
                </p>
                {emailError ? (
                  <p className="chat__error" role="alert">
                    {emailError}
                  </p>
                ) : null}
                <TurnstileField
                  ref={gateTurnstileRef}
                  siteKey={turnstileSiteKey}
                  onTokenChange={setGateTurnstileToken}
                />
                <label className="visually-hidden" htmlFor={`${listId}-email`}>
                  Email
                </label>
                <input
                  id={`${listId}-email`}
                  ref={emailInputRef}
                  className="chat__gate-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.com"
                  value={emailDraft}
                  onChange={(event) => {
                    setEmailDraft(event.target.value);
                    if (emailError) {
                      setEmailError(null);
                    }
                  }}
                  maxLength={EMAIL_MAX_LENGTH}
                  required
                  disabled={isSubmittingEmail}
                />
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={
                    isSubmittingEmail ||
                    !sessionId ||
                    !emailDraft.trim() ||
                    !gateTurnstileToken
                  }
                >
                  {isSubmittingEmail ? "Saving…" : "Continue"}
                  {!isSubmittingEmail && <Arrow />}
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
