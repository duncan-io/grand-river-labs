export function EngagementBlock() {
  return (
    <section className="section engagement" id="engagement">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">The engagement</p>
            <h2 className="section-heading">
              One rate. The whole digital picture.
            </h2>
          </div>
          <p className="section-copy">
            GR Labs works like a department you already employ, billed monthly
            instead of hired. Senior digital leadership and hands-on execution,
            for less than the cost of one mid-level hire.
          </p>
        </div>

        <ul className="services__grid reveal">
          <li className="services__item">
            <h3>One flat monthly rate.</h3>
            <p>
              Starting at $2,000/month, priced against the work that matters —
              not a menu of channel packages.
            </p>
          </li>
          <li className="services__item">
            <h3>Month to month.</h3>
            <p>The work earns its place every month. No annual lock-in.</p>
            {/* TODO(duncan): confirm contract terms before shipping */}
          </li>
          <li className="services__item">
            <h3>You work with the owner.</h3>
            <p>
              No account managers or handoffs. The person who sets the
              priorities is the person doing the work.
            </p>
          </li>
          <li className="services__item">
            <h3>The mix flexes.</h3>
            <p>
              One month it's the website, the next it's tracking or ads. The
              plan follows impact, not a predetermined menu.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
