import { BookCallLink } from "./book-call-link";
import { renderInline } from "@/components/inline-links";
import { Arrow } from "./site-header";

const comparisons = [
  {
    dimension: "Who decides the work",
    agency: "You brief a channel. The agency executes what you asked for.",
    fractional:
      "We look at the whole picture and make the call on what's next.",
  },
  {
    dimension: "What the engagement covers",
    agency: "Usually one channel, scoped as its own retainer.",
    fractional:
      "Every channel, checked—plus the leaks where leads are lost.",
  },
  {
    dimension: "Who you talk to",
    agency: "An account team, with handoffs between planning and execution.",
    fractional:
      "The owner. The person who makes the calls is the person on the call.",
  },
  {
    dimension: "Who checks the work",
    agency: "The agency reports on the agency. Nobody verifies it.",
    fractional: "Vendor reports reconciled against your CRM, lead by lead.",
  },
  {
    dimension: "How you're billed",
    agency: "A quote per channel.",
    fractional: "One monthly rate, starting at $2,500.",
  },
  {
    dimension: "Specialists",
    agency: "The work stays inside the channel they were hired for.",
    fractional: "We manage existing vendors when they are the better fit.",
  },
] as const;

const changes = [
  {
    title: "Someone owns the picture",
    copy: "Agencies and specialists each optimize their own part, and report on it themselves. GR Labs stays with the goals, the channel mix, and the measurement—and decides where effort goes. That working model is [marketing advisory](/marketing-advisory).",
  },
  {
    title: "You work with the owner",
    copy: "No rotating account team. When a specialist is the better fit for a piece of work, we coordinate rather than keep every task in-house.",
  },
  {
    title: "One rate for the mix",
    copy: "Starting at $2,500 a month, priced against the work that matters. One engagement, not a quote for each channel—and no long contracts.",
  },
] as const;

const fits = [
  {
    label: "Agency",
    title: "When an agency is the right call",
    copy: "You already have someone setting priorities, and you need one channel executed well. Agencies can also partner with us under a [white-label arrangement](/white-label): we show up as the delivery bench.",
  },
  {
    label: "Marketing advisor",
    title: "When an advisor is the right call",
    copy: "The business has marketing running—ads, SEO, vendors, a site—but nobody who can answer \"is it working?\" with evidence. GR Labs patches the leaks, verifies the spend, and holds the vendors to the plan.",
  },
] as const;

export function AboutSections() {
  return (
    <>
      <section className="about-hero">
        <div className="shell about-hero__content">
          <p className="eyebrow">About GR Labs</p>
          <h1 className="about-hero__headline">
            <span>An agency sells you more marketing.</span>
            <span>An advisor tells you which marketing works.</span>
          </h1>
          <p className="about-hero__support">
            Grand River Labs is a marketing advisor for owner-led growing
            businesses. We patch the leaks where leads are lost, verify which
            spend is actually working, and manage the vendors who do the rest.
          </p>
          <div className="about-hero__actions">
            <BookCallLink
              className="button button-primary"
            >
              Book a 30-minute fit call
              <Arrow />
            </BookCallLink>
            <a className="about-hero__link" href="/marketing-advisory">
              See how the advisory works →
            </a>
          </div>
        </div>
      </section>

      <section className="section about-compare" id="the-difference">
        <div className="shell">
          <div className="about-compare__top reveal">
            <div>
              <p className="eyebrow">The difference</p>
              <h2 className="section-heading">Same words. A different job.</h2>
            </div>
            <p className="section-copy">
              An agency is hired for a channel and reports on itself. An
              advisor is hired to answer “is it working?”—with evidence.
            </p>
          </div>

          <div className="about-compare__board reveal">
            <div className="about-compare__head" aria-hidden="true">
              <span />
              <span className="about-compare__col about-compare__col--agency">
                An agency
              </span>
              <span className="about-compare__col about-compare__col--team">
                An advisor
              </span>
            </div>
            {comparisons.map((row) => (
              <article className="about-compare__row" key={row.dimension}>
                <h3 className="about-compare__dimension">{row.dimension}</h3>
                <p className="about-compare__cell about-compare__cell--agency">
                  <span className="about-compare__side">An agency</span>
                  {row.agency}
                </p>
                <p className="about-compare__cell about-compare__cell--team">
                  <span className="about-compare__side">An advisor</span>
                  {row.fractional}
                </p>
              </article>
            ))}
          </div>

          <p className="about-compare__promise reveal">
            Not another vendor. An advisor for the whole picture.
          </p>
        </div>
      </section>

      <section className="section about-changes" id="what-changes">
        <div className="shell">
          <div className="about-changes__top reveal">
            <div>
              <p className="eyebrow">What that changes</p>
              <h2 className="section-heading">
                Ownership, the person, and the rate.
              </h2>
            </div>
            <p className="section-copy">
              The engagement is built around those differences. The mix of work
              follows what will move the business.
            </p>
          </div>
          <div className="about-changes__grid reveal">
            {changes.map((item, index) => (
              <article className="about-changes__card" key={item.title}>
                <span className="about-changes__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-fit" id="which-fits">
        <div className="shell">
          <div className="about-fit__top reveal">
            <div>
              <p className="eyebrow">Which one fits</p>
              <h2 className="section-heading">
                Both models are useful. They answer different questions.
              </h2>
            </div>
            <p className="section-copy">
              A defined channel with someone already setting priorities is an
              agency job. A spend nobody verifies is an advisor job.
            </p>
          </div>
          <div className="about-fit__grid reveal">
            {fits.map((item) => (
              <article
                className={`about-fit__card about-fit__card--${item.label === "Agency" ? "agency" : "team"}`}
                key={item.title}
              >
                <span className="about-fit__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
