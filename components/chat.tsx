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
import { chatConfig } from "@/lib/chat/config";
import { EMAIL_MAX_LENGTH, normalizeEmail } from "@/lib/chat/email";
import type { SseEvent } from "@/lib/chat/types";
import { BOOK_CALL_HREF, buildBookingHref } from "@/lib/site";
import { BookCallLink } from "./book-call-link";
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
const FROM_KEY = "grl-chat-from";

const WELCOME_MESSAGE =
  "What’s slowing your business down right now—your website, your measurement, or the manual work in between? I’m the Grand River Labs assistant. We run a Fractional Digital Department for home improvement, remodeling, roofing, HVAC, and contractor businesses.";

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
  const turnstileRef = useRef<TurnstileFieldHandle>(null);
  const [sessionId, setSessionId] = useState("");
  const [sourceFrom, setSourceFrom] = useState("");
  const [leadSummary, setLeadSummary] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [needsEmail, setNeedsEmail] = useState(false);
  const [humanVerified, setHumanVerified] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [emailDraft, setEmailDraft] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
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

    const fromParam = new URLSearchParams(window.location.search).get("from");
    if (fromParam) {
      sessionStorage.setItem(FROM_KEY, fromParam);
      setSourceFrom(fromParam);
      return;
    }

    const storedFrom = sessionStorage.getItem(FROM_KEY);
    if (storedFrom) {
      setSourceFrom(storedFrom);
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
    if (needsEmail && !emailUnlocked) {
      emailInputRef.current?.focus();
      return;
    }

    inputRef.current?.focus();
  }, [needsEmail, emailUnlocked]);

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeEmail(emailDraft);
    if (!normalized) {
      setEmailError("Please enter a valid email.");
      return;
    }

    if (!sessionId) {
      setEmailError("Chat isn’t ready yet. Please try again.");
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
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
        summary?: string | null;
      } | null;

      if (!response.ok) {
        throw new Error(
          result?.error ?? "We couldn’t save your email. Please try again.",
        );
      }

      sessionStorage.setItem(EMAIL_KEY, normalized);
      if (typeof result?.summary === "string" && result.summary.trim()) {
        setLeadSummary(result.summary.trim());
      }
      setEmail(normalized);
      setEmailDraft(normalized);
      setEmailUnlocked(true);
      setNeedsEmail(false);
      setError(null);
    } catch (error) {
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
    if (!message || isSending || !sessionId || (needsEmail && !emailUnlocked)) {
      return;
    }

    const token = humanVerified
      ? ""
      : (turnstileToken ?? turnstileRef.current?.getResponse() ?? "");
    if (!humanVerified && !token) {
      setError("Please complete the verification challenge.");
      return;
    }

    const userId = createId();
    const assistantId = createId();

    setError(null);
    setInput("");
    setIsSending(true);
    setStreamingId(assistantId);
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", content: message },
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          sessionId,
          ...(emailUnlocked && email ? { email } : {}),
          ...(sourceFrom ? { from: sourceFrom } : {}),
          ...(token ? { "cf-turnstile-response": token } : {}),
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          error?: string;
          code?: string;
        } | null;

        if (result?.code === "email_required") {
          setMessages((current) =>
            current.filter(
              (entry) => entry.id !== assistantId && entry.id !== userId,
            ),
          );
          setInput(message);
          setNeedsEmail(true);
          setEmailError(
            result.error ?? "Leave your email to keep chatting.",
          );
          return;
        }

        if (result?.code === "verification_required") {
          setMessages((current) =>
            current.filter(
              (entry) => entry.id !== assistantId && entry.id !== userId,
            ),
          );
          setInput(message);
          setHumanVerified(false);
          setTurnstileToken(null);
          turnstileRef.current?.reset();
          setError(
            result.error ?? "Please complete the verification challenge.",
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

      setHumanVerified(true);
      setTurnstileToken(null);
      const nextCount = userMessageCount + 1;
      setUserMessageCount(nextCount);
      if (!emailUnlocked && nextCount >= chatConfig.freeMessages) {
        setNeedsEmail(true);
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
      inputRef.current?.focus();
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

  const bookingHref = buildBookingHref({
    email: email || normalizeEmail(emailDraft) || undefined,
    summary: leadSummary ?? undefined,
  });

  return (
    <section className="chat" aria-labelledby={`${listId}-title`}>
      <SiteHeader embedded />

      <h1 className="visually-hidden" id={`${listId}-title`}>
        Ask about the website partner, analytics, or automation
      </h1>

      <div className="chat__body">
        <aside className="chat__rail">
          <p className="eyebrow">Ask the assistant</p>
          <p className="display chat__title">
            Ask about websites, analytics, or automation
          </p>
          <p className="chat__lede">
            Chat with our AI about an embedded website team, measurement you can
            trust, and automation & AI—and whether a first project makes sense
            for your team.
          </p>
          <p className="chat__disclaimer">
            This assistant can make mistakes. It can&apos;t make legally binding
            offers, commitments, or deals—anything binding comes from a human at
            Grand River Labs.
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
                    {message.role === "assistant" &&
                    !isStreaming &&
                    message.content.includes(BOOK_CALL_HREF) ? (
                      <BookCallLink
                        className="button button-primary chat__book"
                        href={bookingHref}
                      >
                        Book a call with Duncan
                      </BookCallLink>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>

          {needsEmail && !emailUnlocked ? (
            <form
              className="chat__composer chat__email-prompt"
              onSubmit={handleEmailSubmit}
              aria-labelledby={`${listId}-gate-title`}
            >
              <p className="chat__gate-copy" id={`${listId}-gate-title`}>
                Want to keep going? Leave your email.
              </p>
              <p className="chat__hint">
                We’ll only use this to follow up if it’s useful.
              </p>
              {emailError ? (
                <p className="chat__error" role="alert">
                  {emailError}
                </p>
              ) : null}
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
              <div className="chat__composer-footer">
                <BookCallLink className="chat__email-book" href={bookingHref}>
                  Book a call with Duncan
                </BookCallLink>
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={
                    isSubmittingEmail || !sessionId || !emailDraft.trim()
                  }
                >
                  {isSubmittingEmail ? "Saving…" : "Continue"}
                  {!isSubmittingEmail && <Arrow />}
                </button>
              </div>
            </form>
          ) : (
            <form className="chat__composer" onSubmit={handleSubmit}>
              {error ? (
                <p className="chat__error" role="alert">
                  {error}
                </p>
              ) : null}
              {!humanVerified ? (
                <TurnstileField
                  ref={turnstileRef}
                  siteKey={turnstileSiteKey}
                  onTokenChange={setTurnstileToken}
                />
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
                placeholder="Ask about websites, analytics, automation, or getting started…"
                disabled={isSending || !sessionId}
                maxLength={4000}
              />
              <div className="chat__composer-footer">
                <p className="chat__hint">
                  {!humanVerified && !turnstileToken
                    ? "Verifying you're human…"
                    : "Enter to send · Shift+Enter for a new line"}
                </p>
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={isSending || !sessionId || !input.trim()}
                >
                  Send
                  <Arrow />
                </button>
              </div>
            </form>
          )}

          <p className="chat__disclaimer chat__disclaimer--mobile">
            This assistant can make mistakes. It can&apos;t make legally binding
            offers, commitments, or deals—anything binding comes from a human at
            Grand River Labs.
          </p>
        </div>
      </div>
    </section>
  );
}
