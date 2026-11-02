import { ADVISORY_MONTHLY, formatUsd } from "@/lib/pricing";

export function EngagementBlock() {
  return (
    <section className="section engagement" id="engagement">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">The engagement</p>
            <h2 className="section-heading">One rate, one answer.</h2>
          </div>
          <p className="section-copy">
            The usual answer to unclear marketing is another agency or a bigger
            budget. The alternative is someone whose only job is the truth about
            what&apos;s working.
          </p>
        </div>

        <div className="engagement-compare reveal">
          <article className="engagement-compare__card">
            <p className="engagement-compare__label">The usual path</p>
            <p className="engagement-compare__value">Another vendor</p>
            <p className="engagement-compare__note">
              A new agency, a bigger ad budget, or a channel you&apos;re not
              sure is working — sold by the people who report on it.
            </p>
          </article>
          <article className="engagement-compare__card engagement-compare__card--us">
            <p className="engagement-compare__label">With us</p>
            <p className="engagement-compare__value">
              From {formatUsd(ADVISORY_MONTHLY)}
              <span className="engagement-compare__period">/month</span>
            </p>
            <p className="engagement-compare__note">
              You work with the person who makes the calls. Leaks patched, spend
              verified, vendors held to the plan — no long contracts.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
