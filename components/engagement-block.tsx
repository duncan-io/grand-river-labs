import { BookCallLink } from "./book-call-link";
import { AUDIT_FEE, DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { Arrow } from "./site-header";

export function EngagementBlock() {
  return (
    <section className="section engagement" id="engagement">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">What &ldquo;fractional&rdquo; means</p>
            <h2 className="section-heading">
              A senior marketing director, without the full-time hire.
            </h2>
          </div>
          <p className="section-copy">
            A fractional marketing director is a senior marketing leader who
            works with you part-time: same judgment and ownership of the plan,
            a fraction of the hours and the cost.
          </p>
        </div>

        <div className="engagement-compare reveal">
          <article className="engagement-compare__card">
            <p className="engagement-compare__label">A full-time hire</p>
            <p className="engagement-compare__value">Six figures</p>
            <p className="engagement-compare__note">
              Plus benefits and overhead — for more hours of marketing work
              than most lead-driven businesses actually have.
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
            <p className="engagement-compare__label">Your fractional director</p>
            <p className="engagement-compare__value">
              <span className="engagement-compare__period">Starting at </span>
              {formatUsd(DIRECTOR_MONTHLY)}
              <span className="engagement-compare__period">/month</span>
            </p>
            <p className="engagement-compare__note">
              One senior director who owns the plan: leaks patched, spend
              verified, vendors held to it — no long contracts.
            </p>
          </article>
        </div>

        <div className="engagement__cta reveal">
          <BookCallLink className="button button-primary">
            Book a 30-minute fit call
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
