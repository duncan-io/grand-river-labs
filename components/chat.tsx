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
import { Arrow } from "./site-header";
import type { SseEvent } from "@/lib/chat/types";

type Role = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
};

const SESSION_KEY = "grl-chat-session";

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

export function ChatPanel() {
  const listId = useId();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [sessionId, setSessionId] = useState("");
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
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  async function sendMessage(raw: string) {
    const message = raw.trim();
    if (!message || isSending || !sessionId) {
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
        body: JSON.stringify({ message, sessionId }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
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

  return (
    <section className="chat" aria-labelledby={`${listId}-title`}>
      <div className="shell chat__shell">
        <header className="chat__intro">
          <p className="eyebrow">Ask the assistant</p>
          <h1 className="display chat__title" id={`${listId}-title`}>
            Ask how automation could fit your workflow
          </h1>
          <p className="chat__lede">
            Chat with our AI to learn what we automate, how engagements work,
            and whether a first project makes sense for your team.
          </p>
        </header>

        <div
          className="chat__panel"
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
          <div ref={bottomRef} />
        </div>

        <form className="chat__composer" onSubmit={handleSubmit}>
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
            disabled={isSending || !sessionId}
            maxLength={4000}
          />
          <div className="chat__composer-footer">
            <p className="chat__hint">Enter to send · Shift+Enter for a new line</p>
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
      </div>
    </section>
  );
}
