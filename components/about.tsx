import { BookCallLink } from "./book-call-link";
import { renderInline } from "@/components/inline-links";
import { Arrow } from "./site-header";

const comparisons = [
  {
    dimension: "Who decides the work",
    agency: "You brief a channel. The agency executes what you asked for.",
    fractional: "We look at the whole picture and do what needs doing.",
  },
  {
    dimension: "What the engagement covers",
    agency: "Usually one channel, scoped as its own retainer.",
    fractional:
      "The mix flexes across the site, search, ads, measurement, and automation.",
  },
  {
    dimension: "Who you talk to",
    agency: "An account team, with handoffs between planning and execution.",
    fractional:
      "The owner. The person who sets the priorities is the person doing the work.",
  },
  {
    dimension: "Work nobody named",
    agency: "It waits until you ask. Unnamed work does not start.",
    fractional: "We find it and take it on.",
  },
  {
    dimension: "How you're billed",
    agency: "A quote per channel.",
    fractional: "One monthly rate, starting at $2,500.",
  },
  {
    dimension: "Specialists",
    agency: "The work stays inside the channel they were hired for.",
    fractional:
      "We coordinate existing vendors when they are the better fit.",
  },
] as const;

const changes = [
  {
    title: "Someone owns the picture",
    copy: "Agencies and specialists each optimize their own part. GR Labs stays with the goals, the channel mix, and the measurement, and decides where effort goes. That working model is the [fractional digital department](/fractional-digital-department).",
  },
  {
    title: "You work with the owner",
    copy: "No rotating account team. When a specialist is the better fit for a piece of work, we coordinate rather than keep every task in-house.",
  },
  {
    title: "One rate for the mix",
    copy: "Starting at $2,500 a month, priced against the work that matters. One engagement, not a quote for each channel. [Compare that with the team you would hire](/fractional-digital-team-calculator).",
  },
] as const;

const fits = [
  {
    label: "Agency",
    title: "When an agency is the right call",
    copy: "You already have someone setting priorities, and you need one channel executed well. Agencies can also partner with us under a [white-label arrangement](/white-label): we show up as the delivery bench.",
  },
  {
    label: "Fractional team",
    title: "When a fractional team is the right call",
    copy: "The business relies on a website, tools, and digital channels, and nobody experienced owns the whole picture. If a marketing team is already in place, GR Labs fills the gap of someone who decides where effort goes.",
  },
] as const;

export function AboutSections() {
  return (
    <>
      <section className="about-hero">
        <div className="shell about-hero__content">
          <p className="eyebrow">About GR Labs</p>
          <h1 className="about-hero__headline">
            <span>An agency waits for the brief.</span>
            <span>A fractional team finds the work.</span>
          </h1>
          <p className="about-hero__support">
            Grand River Labs is a fractional digital marketing team for
            owner-led growing businesses. We look across the website, channels,
            and measurement, then do the work—without a full-time hire.
          </p>
          <div className="about-hero__actions">
            <BookCallLink
              className="button button-primary"
            >
              Book a 30-minute fit call
              <Arrow />
            </BookCallLink>
            <a className="about-hero__link" href="/fractional-digital-department">
              See how the department works →
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
              An agency is hired for a channel and waits for direction. A
              fractional digital marketing team is hired to own the picture and
              do what needs doing.
            </p>
          </div>

          <div className="about-compare__board reveal">
            <div className="about-compare__head" aria-hidden="true">
              <span />
              <span className="about-compare__col about-compare__col--agency">
                An agency
              </span>
              <span className="about-compare__col about-compare__col--team">
                A fractional team
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
                  <span className="about-compare__side">A fractional team</span>
                  {row.fractional}
                </p>
              </article>
            ))}
          </div>

          <p className="about-compare__promise reveal">
            Not an agency. A fractional digital marketing team for the whole
            picture.
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
              agency job. A picture nobody owns is a fractional team job.
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
