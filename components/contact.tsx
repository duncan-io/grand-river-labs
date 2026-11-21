import type { ReactNode } from "react";
import { getTurnstileSiteKey } from "@/lib/turnstile";
import { BookCallLink } from "./book-call-link";
import { ContactForm } from "./contact-form";
import { Arrow } from "./icons";

type ContactSectionProps = {
  variant?: "default" | "cta";
  atmosphere?: boolean;
  eyebrow?: string;
  heading?: string;
  copy?: string;
  directLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  /** Optional slim line under the book-a-call button. */
  footnote?: ReactNode;
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

/** Closing section of most pages: a pitch and "book a call" beside the contact form. */
export function ContactSection({
  variant = "default",
  atmosphere = false,
  eyebrow = "Start a conversation",
  heading = "What's getting in the way of more revenue?",
  copy = "Tell us the goal that isn't getting a clear plan—channel mix, the site's job, measurement, or work that still eats the team. We'll help you see what deserves attention now.",
  directLabel = "Book a call",
  messageLabel = "What should we look at first?",
  footnote,
  messagePlaceholder = "A growth target, a channel that isn't earning its keep, a site that isn't converting, or work that's still too manual—start wherever you are.",
}: ContactSectionProps) {
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
          <BookCallLink className="button button-primary contact__book">
            {directLabel}
            <Arrow />
          </BookCallLink>
          {footnote ? <p className="contact__footnote">{footnote}</p> : null}
        </div>

        <ContactForm
          turnstileSiteKey={getTurnstileSiteKey()}
          messageLabel={messageLabel}
          messagePlaceholder={messagePlaceholder}
        />
      </div>
    </section>
  );
}
