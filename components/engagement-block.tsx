import { BookCallLink } from "./book-call-link";
import { AUDIT_FEE, DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { Arrow } from "./site-header";

type EngagementBlockProps = {
  eyebrow?: string;
  heading?: string;
  copy?: string;
  directorLabel?: string;
  ctaLabel?: string;
};

export function EngagementBlock({
  eyebrow = "What “fractional” means",
  heading = "A senior marketing director, without the full-time hire.",
  copy = "A fractional marketing director is a senior marketing leader who works with you part-time: same judgment and ownership of the plan, a fraction of the hours and the cost.",
  directorLabel = "Your fractional director",
  ctaLabel = "Book a 30-minute fit call",
}: EngagementBlockProps = {}) {
  return (
    <section className="section engagement" id="engagement">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-heading">{heading}</h2>
          </div>
          <p className="section-copy">{copy}</p>
        </div>

        <div className="engagement-compare reveal">
          <article className="engagement-compare__card">
            <p className="engagement-compare__label">A full-time hire</p>
            <p className="engagement-compare__value">Six figures</p>
            <p className="engagement-compare__note">
              Plus benefits and overhead — for more hours of marketing work
              than most home service companies actually have.
            </p>
          </article>
          <article className="engagement-compare__card">
            <p className="engagement-compare__label">Another agency</p>
            <p className="engagement-compare__value">Another vendor</p>
            <p className="engagement-compare__note">
              A new agency, a bigger ad budget, or a channel you&apos;re not
              sure is working — sold by the people who report on it.
            </p>
          </article>
          <article className="engagement-compare__card engagement-compare__card--us">
            <p className="engagement-compare__label">{directorLabel}</p>
            <p className="engagement-compare__value">
              <span className="engagement-compare__period">Starting at </span>
              {formatUsd(DIRECTOR_MONTHLY)}
              <span className="engagement-compare__period">/month</span>
            </p>
            <p className="engagement-compare__note">
              A weekly meeting with a senior director: the plan, the budget,
              and a straight answer on what&apos;s booking jobs. Add hands-on
              work as you need it — no long contracts.
            </p>
          </article>
        </div>

        <div className="engagement__cta reveal">
          <BookCallLink className="button button-primary">
            {ctaLabel}
            <Arrow />
          </BookCallLink>
          <a className="engagement__alt" href="/lead-leak-audit">
            Not ready for ongoing? Start with a {formatUsd(AUDIT_FEE)} lead leak
            audit →
          </a>
        </div>
      </div>
    </section>
  );
}
