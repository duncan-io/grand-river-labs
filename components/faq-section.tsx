import type { ReactNode } from "react";
import type { Faq } from "@/lib/json-ld";
import { renderInline } from "./inline-links";

type FaqSectionProps = {
  faqs: readonly Faq[];
  eyebrow?: string;
  heading?: string;
  /** Optional one-line summary shown beside the heading. */
  children?: ReactNode;
};

/** Expandable question list that closes a service page. Answers may contain [label](href) links. */
export function FaqSection({
  faqs,
  eyebrow = "Questions",
  heading = "What people usually ask.",
  children,
}: FaqSectionProps) {
  return (
    <section className="section fdd-faq" id="faq">
      <div className="shell">
        <div className="fdd-faq__top reveal">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-heading">{heading}</h2>
          </div>
          {children ? <p className="section-copy">{children}</p> : null}
        </div>
        <div className="fdd-faq__list reveal">
          {faqs.map((faq) => (
            <details className="fdd-faq__item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{renderInline(faq.answer)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
