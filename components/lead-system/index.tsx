import { BookCallLink } from "../book-call-link";
import Link from "next/link";
import { DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { Arrow } from "../icons";
import { FaqSection } from "../faq-section";
import "./lead-system.css";
import {
  questions,
  steps,
  vendorRows,
  stackPoints,
  teaserFeatures,
  teaserTabs,
  teaserKpis,
  teaserSources,
  faqs,
} from "./content";
import { LeadSystemHeroScene } from "./scene";
import { VendorGapChart } from "./vendor-gap-chart";
export { faqs } from "./content";

export function LeadSystemSections() {
  return (
    <>
      <section className="mkt-hero lead-system-hero">
        <div className="lead-system-hero__scene-wrap">
          <LeadSystemHeroScene />
        </div>
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Lead Monitoring System · Home services</p>
            <h1 className="mkt-hero__headline">
              Know what a booked job really costs you, source by source.
            </h1>
            <p className="mkt-hero__copy">
              A custom system we build into the tools you already use: your
              analytics, ad accounts, and CRM. We do the hard setup, then blend
              the data with our own attribution model, so you can see what
              every lead really cost and put budget behind the sources that
              book jobs.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink className="button button-primary">
                Book a demo
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#contact">
                Contact us
              </a>
            </div>
            <ul className="mkt-hero__facts">
              <li>Lead counts verified against your CRM</li>
              <li>Cost per lead and per booked job, by source</li>
              <li>Built into your existing CRM and ad accounts</li>
            </ul>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#questions">
          What you can&apos;t see today
        </a>
      </section>

      <section className="section lead-system-friction" id="questions">
        <div className="shell">
          <div className="lead-system-friction__top reveal">
            <div>
              <p className="eyebrow">The blind spots</p>
              <h2 className="section-heading">
                Every vendor has a report. None of them agree.
              </h2>
            </div>
            <p className="section-copy">
              One month at a sample roofing company: what each vendor
              reported, and what the CRM shows.
            </p>
          </div>
          <VendorGapChart />
          <ol className="lead-gap__questions reveal">
            {questions.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section lead-system-flow" id="how-it-works">
        <div className="shell">
          <div className="lead-system-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                The tools are standard. Making them agree isn&apos;t.
              </h2>
            </div>
            <p className="section-copy">
              Your analytics, ad platforms, and CRM each see part of the
              picture. We wire them together, verify every handoff, and run the
              result through our attribution model. The{" "}
              <Link href="/lead-leak-audit">lead leak audit</Link> finds what&apos;s
              broken, the{" "}
              <Link href="/fractional-marketing-director">director</Link> acts
              on the numbers, and the Lead Monitoring System is where they come from.
            </p>
          </div>
          <ol className="lead-system-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="lead-system-flow__step" key={step.title}>
                {index < steps.length - 1 ? (
                  <span className="lead-system-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="lead-system-flow__connector-line"
                        d="M4 12h64"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="4 6"
                      />
                      <path
                        d="M62 5.5 72 12l-10 6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}
                <span className="lead-system-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section lead-system-stack" id="your-stack">
        <div className="shell">
          <div className="lead-system-flow__top reveal">
            <div>
              <p className="eyebrow">Built for your business</p>
              <h2 className="section-heading">
                Built into the stack you already run.
              </h2>
            </div>
            <p className="section-copy">
              No new CRM, no new phone system, nothing new for your team to
              learn. We build it around the tools you already pay for, and set
              it up to match how you sell.
            </p>
          </div>
          <ul className="lead-teaser__features reveal">
            {stackPoints.map((point) => (
              <li key={point.title}>
                <strong>{point.title}</strong>
                <span>{point.copy}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section lead-teaser" id="dashboard">
        <div className="shell">
          <div className="lead-system-flow__top reveal">
            <div>
              <p className="eyebrow">The dashboard</p>
              <h2 className="section-heading">
                The numbers that matter, in one view.
              </h2>
            </div>
            <p className="section-copy">
              Updated daily, checked against your CRM, and the same for every
              vendor.
            </p>
          </div>

          <ul className="lead-teaser__features reveal">
            {teaserFeatures.map((feature) => (
              <li key={feature.title}>
                <strong>{feature.title}</strong>
                <span>{feature.copy}</span>
              </li>
            ))}
          </ul>

          <figure className="lead-teaser__frame reveal">
            <figcaption className="lead-teaser__bar">
              <span className="lead-teaser__tabs" aria-hidden="true">
                {teaserTabs.map((tab) => (
                  <span key={tab}>{tab}</span>
                ))}
              </span>
              <span className="lead-teaser__range">
                Oct 1 – Oct 31 · vs. Sep · Sample data
              </span>
            </figcaption>

            <div className="lead-teaser__body">
              <ul className="lead-teaser__kpis" aria-label="Key numbers, October">
                {teaserKpis.map((kpi) => (
                  <li key={kpi.label}>
                    <span className="lead-teaser__kpi-label">{kpi.label}</span>
                    <span className="lead-teaser__kpi-value">{kpi.value}</span>
                    <span className="lead-teaser__kpi-change">{kpi.change}</span>
                  </li>
                ))}
              </ul>

              <div className="lead-teaser__panels">
                <div className="lead-teaser__panel">
                  <p className="lead-teaser__panel-title">Lead sources</p>
                  <table className="lead-teaser__table">
                    <thead>
                      <tr>
                        <th scope="col">Source</th>
                        <th scope="col">Leads</th>
                        <th scope="col">Booked</th>
                        <th scope="col">Per job</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teaserSources.map((row) => (
                        <tr key={row.source}>
                          <th scope="row">{row.source}</th>
                          <td>{row.leads}</td>
                          <td>{row.booked}</td>
                          <td>{row.cpb}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="lead-teaser__panel">
                  <p className="lead-teaser__panel-title">
                    Vendor scorecard · cost per lead
                  </p>
                  <table className="lead-teaser__table">
                    <thead>
                      <tr>
                        <th scope="col">Vendor</th>
                        <th scope="col" className="lead-teaser__reported">
                          Reported
                        </th>
                        <th scope="col" className="lead-teaser__verified">
                          Verified
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorRows.map((row) => (
                        <tr key={row.vendor}>
                          <th scope="row">{row.vendor}</th>
                          <td className="lead-teaser__reported">
                            {row.cplReported}
                          </td>
                          <td className="lead-teaser__verified">
                            {row.cplVerified}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="lead-teaser__fade">
              <p>See the full dashboard with your own numbers.</p>
              <BookCallLink className="button button-primary">
                Book a demo
                <Arrow />
              </BookCallLink>
            </div>
          </figure>
        </div>
      </section>

      <section className="section leak-next lead-system-next" id="pricing">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">Pricing</p>
              <h2 className="section-heading">
                On its own, or with a director.
              </h2>
            </div>
            <p className="section-copy">
              Your analytics, ad accounts, and CRM stay in your name.
            </p>
          </div>
          <div className="engagement-compare leak-next__options reveal">
            <article className="engagement-compare__card lead-pricing__card">
              <p className="engagement-compare__label">Lead Monitoring System</p>
              <p className="engagement-compare__value">
                Build fee
                <span className="engagement-compare__period"> + monthly</span>
              </p>
              <ul className="lead-pricing__list">
                <li>We build and verify the tracking and the dashboard</li>
                <li>Monthly scorecard and a quarterly review</li>
                <li>Daily checks on forms, calls, and ad accounts</li>
              </ul>
              <p className="engagement-compare__note">
                Scoped on the demo to your sources and vendors.
              </p>
              <BookCallLink className="button button-primary">
                Book a demo
                <Arrow />
              </BookCallLink>
            </article>
            <article className="engagement-compare__card engagement-compare__card--us lead-pricing__card">
              <p className="engagement-compare__label">
                Fractional marketing director
              </p>
              <p className="engagement-compare__value">
                <span className="engagement-compare__period">Starting at </span>
                {formatUsd(DIRECTOR_MONTHLY)}
                <span className="engagement-compare__period">/month</span>
              </p>
              <ul className="lead-pricing__list">
                <li>A weekly meeting with a senior director</li>
                <li>A plan and budget built on these numbers</li>
                <li>The call on every source: fund, pause, or fix</li>
              </ul>
              <Link
                className="leak-next__link"
                href="/fractional-marketing-director"
              >
                How the engagement works
                <Arrow />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs}>
        Anything else, we&apos;ll cover on the demo.
      </FaqSection>
    </>
  );
}
