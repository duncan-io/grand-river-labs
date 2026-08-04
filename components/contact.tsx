"use client";

import { FormEvent, useRef, useState } from "react";
import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";
import {
  TurnstileField,
  type TurnstileFieldHandle,
} from "./turnstile-field";

type FormStatus = {
  state: "idle" | "success" | "error";
  message: string;
};

type ContactSectionProps = {
  turnstileSiteKey: string;
  variant?: "default" | "cta";
  eyebrow?: string;
  heading?: string;
  copy?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
};

export function ContactSection({
  turnstileSiteKey,
  variant = "default",
  eyebrow = "Start a conversation",
  heading = "What's costing you time?",
  copy = "Tell us where work feels harder—or slower—than it should. We'll help you see what's possible: clearer, leaner, and without the jargon.",
  messageLabel = "Where are you losing time or efficiency?",
  messagePlaceholder = "A slow process, too much manual work, a stubborn bottleneck—start wherever you are.",
}: ContactSectionProps) {
  const turnstileRef = useRef<TurnstileFieldHandle>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({
    state: "idle",
    message: "We’ll get back to you within two business days.",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ state: "idle", message: "Sending your note…" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const token =
      turnstileToken ??
      turnstileRef.current?.getResponse() ??
      String(formData.get("cf-turnstile-response") ?? "");

    if (!token) {
      setIsSubmitting(false);
      setStatus({
        state: "error",
        message: "Please complete the verification challenge.",
      });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          "cf-turnstile-response": token,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "We couldn’t send your note.");
      }

      form.reset();
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setStatus({
        state: "success",
        message: "Thanks—your note is with us. We’ll be in touch soon.",
      });
    } catch (error) {
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className={`section contact${variant === "cta" ? " contact--cta" : ""}`}
      id="contact"
    >
      <div className="shell contact__layout">
        <div className="contact__intro reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-heading">{heading}</h2>
          <p className="section-copy">{copy}</p>
          <a
            className="contact__direct"
            href={BOOK_CALL_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prefer to talk? Book a call →
          </a>
        </div>

        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <div className="contact-form__row">
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Smith"
                minLength={2}
                maxLength={80}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Work email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@company.com"
                maxLength={254}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">{messageLabel}</label>
            <textarea
              id="message"
              name="message"
              placeholder={messagePlaceholder}
              minLength={10}
              maxLength={3000}
              required
              disabled={isSubmitting}
            />
          </div>

          <TurnstileField
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            onTokenChange={setTurnstileToken}
          />

          <div className="contact-form__footer">
            <p
              className="form-status"
              data-state={status.state}
              aria-live="polite"
            >
              {status.message}
            </p>
            <button
              className="button button-primary"
              type="submit"
              disabled={isSubmitting || !turnstileToken}
            >
              {isSubmitting ? "Sending…" : "Send your note"}
              {!isSubmitting && <Arrow />}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
