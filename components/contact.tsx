"use client";

import { FormEvent, useState } from "react";
import { Arrow } from "./site-header";

type FormStatus = {
  state: "idle" | "success" | "error";
  message: string;
};

export function ContactSection() {
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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "We couldn’t send your note.");
      }

      form.reset();
      setStatus({
        state: "success",
        message: "Thanks—your note is with us. We’ll be in touch soon.",
      });
    } catch (error) {
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
    <section className="section contact" id="contact">
      <div className="shell contact__layout">
        <div className="contact__intro reveal">
          <p className="eyebrow">Start a conversation</p>
          <h2 className="section-heading">What&apos;s costing you time or money?</h2>
          <p className="section-copy">
            Tell us where work feels harder—or more expensive—than it should.
            We&apos;ll help you see what&apos;s possible: clearer, leaner, and
            without the jargon.
          </p>
          <a
            className="contact__direct"
            href="mailto:hello@grandriverlabs.com?subject=Book%20a%20call"
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
            <label htmlFor="message">Where are you losing time or money?</label>
            <textarea
              id="message"
              name="message"
              placeholder="A slow process, too much manual work, rising costs—start wherever you are."
              minLength={10}
              maxLength={3000}
              required
              disabled={isSubmitting}
            />
          </div>

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
              disabled={isSubmitting}
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
