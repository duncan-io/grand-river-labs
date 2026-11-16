"use client";

import { FormEvent, useRef, useState } from "react";
import { BookCallLink } from "./book-call-link";
import { Arrow } from "./icons";
import {
  TurnstileField,
  type TurnstileFieldHandle,
} from "./turnstile-field";
import "./contact-form.css";

type FormStatus = {
  state: "idle" | "success" | "error";
  message: string;
};

type ContactFormProps = {
  turnstileSiteKey: string;
  messageLabel: string;
  messagePlaceholder: string;
};

/** The "send a note" form: posts to /api/contact behind a Turnstile check. */
export function ContactForm({
  turnstileSiteKey,
  messageLabel,
  messagePlaceholder,
}: ContactFormProps) {
  const turnstileRef = useRef<TurnstileFieldHandle>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({
    state: "idle",
    message: "We’ll get back to you within one business day.",
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
    <form className="contact-form reveal" onSubmit={handleSubmit}>
      <p className="contact-form__alt">Or send a note</p>
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
          <label htmlFor="email">Email</label>
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
          {status.state === "idle" && turnstileSiteKey && !turnstileToken
            ? "Verifying you're human…"
            : status.message}
          {status.state === "success" ? (
            <>
              {" "}
              <BookCallLink className="form-status__next">
                Want to skip the wait? Book a time →
              </BookCallLink>
            </>
          ) : null}
        </p>
        <button
          className="button button-secondary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send your note"}
          {!isSubmitting && <Arrow />}
        </button>
      </div>
    </form>
  );
}
