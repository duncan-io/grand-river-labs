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
  atmosphere?: boolean;
  eyebrow?: string;
  heading?: string;
  copy?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
};

function ContactAtmosphere() {
  return (
    <svg
      className="contact__scene"
      aria-hidden="true"
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <ellipse
        cx="1280"
        cy="420"
        rx="420"
        ry="220"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        transform="rotate(-12 1280 420)"
      />
      <ellipse
        cx="1320"
        cy="400"
        rx="280"
        ry="140"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        transform="rotate(-18 1320 400)"
      />
      <path
        d="M720 520c180-40 320-28 480 20 140 42 260 48 400 18"
        stroke="rgba(139,208,202,0.22)"
        strokeWidth="36"
        strokeLinecap="round"
      />
      <path
        d="M780 560c160-28 290-18 430 14 110 26 210 30 340 8"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <circle
        cx="1180"
        cy="160"
        r="90"
        fill="rgba(255,253,244,0.08)"
      />
      <circle cx="1180" cy="160" r="48" fill="rgba(255,251,234,0.1)" />
    </svg>
  );
}

export function ContactSection({
  turnstileSiteKey,
  variant = "default",
  atmosphere = false,
  eyebrow = "Start a conversation",
  heading = "What's getting in the way of more revenue?",
  copy = "Tell us the goal that isn't getting a clear plan—channel mix, the site's job, measurement, or work that still eats the team. We'll help you see what deserves attention now.",
  messageLabel = "What should we look at first?",
  messagePlaceholder = "A growth target, a channel that isn't earning its keep, a site that isn't converting, or work that's still too manual—start wherever you are.",
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
      className={`section contact${variant === "cta" ? " contact--cta" : ""}${atmosphere ? " contact--atmosphere" : ""}`}
      id="contact"
    >
      {atmosphere ? <ContactAtmosphere /> : null}
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
