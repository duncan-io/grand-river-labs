import { BookCallLink } from "./book-call-link";
import { Arrow } from "./site-header";
import { industriesNav } from "./what-we-do-nav";

/** Short who-it's-for line and the key call-outs for each industry card. */
const industryDetails: Record<
  (typeof industriesNav)[number]["href"],
  { who: string; callouts: readonly string[] }
> = {
  "/home-improvement-marketing": {
    who: "Established companies with multiple crews and an office that's already full.",
    callouts: [
      "Lead flow that doesn't depend on the owner catching calls between jobs",
      "One person who owns the ad and lead-vendor spend already going out",
      "Vendor reports checked against booked jobs, not clicks",
    ],
  },
  "/remodeling-marketing": {
    who: "Design-build and kitchen and bath remodelers.",
    callouts: [
      "Every lead source in one view, from the lead vendor to the showroom",
      "Follow-up that holds through a weeks-long design decision",
      "Spend traced to signed jobs, so you know which dollar became a kitchen",
    ],
  },
  "/fractional-marketing-director/roofing": {
    who: "Roofers running Local Services Ads and buying leads.",
    callouts: [
      "Fast replies in storm weeks, while the homeowner is still in the driveway",
      "Shared leads and spam separated from real homeowners",
      "Local Services Ads and Google Ads checked against booked inspections",
    ],
  },
  "/fractional-marketing-director/contractors": {
    who: "Trades and specialty contractors.",
    callouts: [
      "Missed jobsite calls that still get a reply inside five minutes",
      "Price shoppers filtered out before they clog the day",
      "One director over routing, ads, and the vendors you already pay",
    ],
  },
};

type IndustryCard = {
  label: string;
  /** Industries without their own page have no link. */
  href?: string;
  who: string;
  callouts: readonly string[];
};

/** Industries we serve that don't have a dedicated page yet. */
const unlinkedIndustries: IndustryCard[] = [
  {
    label: "Painting",
    who: "Residential and commercial painting contractors.",
    callouts: [
      "Estimate requests answered while the homeowner is still comparing quotes",
      "Follow-up on open estimates, so quoted jobs don't go quiet",
      "Spend matched to booked jobs ahead of the busy season",
    ],
  },
  {
    label: "Professional services",
    who: "Law firms, accounting practices, and other firms where one client is worth thousands.",
    callouts: [
      "Every inquiry routed to the right person, not a shared inbox",
      "Intake calls returned before the prospect calls the next firm",
      "Spend traced to signed clients, not form fills",
    ],
  },
];

const industryCards: IndustryCard[] = [
  ...industriesNav.map((item) => ({
    label: item.label,
    href: item.href,
    ...industryDetails[item.href],
  })),
  ...unlinkedIndustries,
];

export function IndustriesSections() {
  return (
    <>
      <section className="mkt-hero industries-hero">
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Industries</p>
            <h1 className="mkt-hero__headline">
              Built for businesses where one lead is worth thousands.
            </h1>
            <p className="mkt-hero__copy">
              Home services is where we&apos;re deepest. The work is the same
              everywhere: patch the leaks, verify the spend, and hold the
              vendors to the plan.
            </p>
          </div>
        </div>
      </section>

      <section className="section industries-list" id="industries">
        <div className="shell">
          <ul className="industries-list__grid">
            {industryCards.map((card) => (
              <li className="industries-card" key={card.label}>
                <h2 className="industries-card__title">
                  {card.href ? <a href={card.href}>{card.label}</a> : card.label}
                </h2>
                <p className="industries-card__who">{card.who}</p>
                <ul className="industries-card__callouts">
                  {card.callouts.map((callout) => (
                    <li key={callout}>{callout}</li>
                  ))}
                </ul>
                {card.href ? (
                  <a
                    className="industries-card__more"
                    href={card.href}
                    aria-label={`${card.label}: learn more`}
                  >
                    Learn more
                    <Arrow />
                  </a>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="industries-more">
            <div>
              <h2 className="industries-more__title">
                Don&apos;t see your industry?
              </h2>
              <p className="industries-more__copy">
                We work with any business. We specialize in lead-driven ones.
                If a single inquiry is worth thousands, the work is the same.
              </p>
            </div>
            <BookCallLink className="button button-primary">
              Book a call
              <Arrow />
            </BookCallLink>
          </div>
        </div>
      </section>
    </>
  );
}
