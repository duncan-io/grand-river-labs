import {
  DEFAULT_ASSUMPTIONS,
  DEFAULT_FRACTIONAL_MONTHLY,
  calculateFullTimeCost,
  defaultTeamRoles,
  formatUsd,
} from "@/lib/fractional-team-calculator";

const fullTime = calculateFullTimeCost(
  defaultTeamRoles(),
  DEFAULT_ASSUMPTIONS,
);

export function EngagementBlock() {
  return (
    <section className="section engagement" id="engagement">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">The engagement</p>
            <h2 className="section-heading">One rate, instead of a hire.</h2>
          </div>
          <p className="section-copy">
            A full-time hire means salary, benefits, months of ramp-up, and
            the risk of a bad fit. This is the same judgment and the work
            behind it, billed monthly.
          </p>
        </div>

        <div className="engagement-compare reveal">
          <article className="engagement-compare__card">
            <p className="engagement-compare__label">In-house, year one</p>
            <p className="engagement-compare__value">
              {formatUsd(fullTime.year1)}
            </p>
            <p className="engagement-compare__note">
              A senior digital leader and a coordinator, with benefits, tools,
              and the cost of hiring. About{" "}
              {formatUsd(fullTime.monthlyOngoing)} a month after that.
            </p>
          </article>
          <article className="engagement-compare__card engagement-compare__card--us">
            <p className="engagement-compare__label">With us</p>
            <p className="engagement-compare__value">
              From {formatUsd(DEFAULT_FRACTIONAL_MONTHLY)}
              <span className="engagement-compare__period">/month</span>
            </p>
            <p className="engagement-compare__note">
              You work with the person who makes the calls. The plan follows
              what matters, and the work gets done — not just recommended.
            </p>
          </article>
        </div>

        <p className="engagement-compare__more reveal">
          <a href="/fractional-digital-team-calculator">
            Compare that with the team you would hire →
          </a>
        </p>
      </div>
    </section>
  );
}
