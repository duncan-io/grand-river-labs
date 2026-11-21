import Link from "next/link";
import { BookCallLink } from "./book-call-link";
import { DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { testimonials } from "@/lib/testimonials";
import { FiveStars } from "./five-stars";
import { FeaturedCaseStudy } from "./sections";
import { Arrow } from "./icons";
import { FaqSection } from "./faq-section";
import "./fractional-marketing-director.css";

const deliverables = [
  {
    title: "A weekly meeting with your director",
    copy: "Review the numbers, set priorities, and make decisions together. Between meetings, your director is a message away.",
  },
  {
    title: "A strategy and budget you own",
    copy: "Where to grow, where each dollar goes, and what it should return. Written down and updated every quarter. You keep the final say.",
  },
  {
    title: "A monthly scorecard",
    copy: "Leads and booked jobs from every channel, checked against your CRM, with a next step for each.",
  },
  {
    title: "A team that can run it",
    copy: "We coach whoever runs your marketing and train your office to answer and follow up on every lead.",
  },
];

const coverage: { label: string; href?: string; note: string }[] = [
  {
    label: "Strategy & budget",
    note: "Goals, priorities, and where the money goes.",
  },
  {
    label: "SEO",
    href: "/search-engine-optimization",
    note: "Pages and content that bring in local searches.",
  },
  {
    label: "Paid ads & LSA",
    href: "/local-ads",
    note: "Google Ads and Local Services Ads that book jobs.",
  },
  {
    label: "Google Business Profile",
    href: "/google-business-profile",
    note: "Categories, services, reviews, and tracked calls.",
  },
  {
    label: "Conversion rate optimization",
    href: "/conversion-rate-optimization",
    note: "More leads from the traffic you already have.",
  },
  {
    label: "Lead follow-up automation",
    href: "/automation",
    note: "Fast, consistent follow-up on every new lead.",
  },
  {
    label: "Call tracking & Lead Monitoring System",
    href: "/lead-system",
    note: "Every lead counted, from first call to booked job.",
  },
];

const steps = [
  {
    title: "Fit call",
    copy: "A free 30-minute call about your goals, your budget, and your team.",
  },
  {
    title: "Month one: learn and plan",
    copy: "We learn how your business runs and write the plan and budget with you.",
  },
  {
    title: "Every month after",
    copy: "We put the plan to work and track what it books each month.",
  },
];

export const faqs = [
  {
    question: "What is a fractional marketing director?",
    answer:
      "A senior marketing leader who works with your company part-time. Some people call it a fractional CMO. You get experienced leadership for the hours your business needs.",
  },
  {
    question: "What does it cost?",
    answer: `Advising starts at ${formatUsd(DIRECTOR_MONTHLY)}/month. That covers strategy, budget, and ongoing advice. Hands-on work can be added for one monthly fee. There are no long contracts.`,
  },
  {
    question: "What happens in the first 90 days?",
    answer:
      "Month one is for learning and planning. In months two and three, we fix the biggest lead leaks first. By day 90, you know which channels bring in booked jobs.",
  },
  {
    question: "How involved are you day to day?",
    answer:
      "You work with one senior person, the same one every time. Between meetings, you can reach us on Slack or email.",
  },
  {
    question: "Can you work alongside our current team and vendors?",
    answer:
      "Yes. We work with your team and the vendors you have now. We set the plan, share clear briefs, and keep everyone working toward the same goals.",
  },
];

const scorecardRows = [
  {
    channel: "Google Ads",
    claimed: 64,
    crm: 41,
    booked: 12,
    call: "Fund: add 20%",
    tone: "go",
  },
  {
    channel: "Local Services Ads",
    claimed: 38,
    crm: 29,
    booked: 9,
    call: "Dispute 6 junk leads",
    tone: "fix",
  },
  {
    channel: "SEO",
    claimed: 52,
    crm: 18,
    booked: 6,
    call: "Fix call tracking first",
    tone: "fix",
  },
  {
    channel: "Meta ads",
    claimed: 45,
    crm: 9,
    booked: 1,
    call: "Pause",
    tone: "stop",
  },
] as const;

const scorecardTotals = scorecardRows.reduce(
  (sum, row) => ({
    claimed: sum.claimed + row.claimed,
    crm: sum.crm + row.crm,
    booked: sum.booked + row.booked,
  }),
  { claimed: 0, crm: 0, booked: 0 },
);

/* One example week, matching the example scorecard below. */
const week = [
  {
    day: "Mon",
    what: "Weekly meeting with you",
    result: "Set the month's focus: kitchen remodels",
    area: "Strategy",
  },
  {
    day: "Tue",
    what: "Brief to the SEO agency",
    result: "Fix call tracking before new pages",
    area: "Vendors",
  },
  {
    day: "Wed",
    what: "Office training",
    result: "Every web lead called back in 5 minutes",
    area: "Your team",
  },
  {
    day: "Thu",
    what: "Paused Meta ads",
    result: "$1,200/mo moved to Google Ads",
    area: "Budget",
  },
  {
    day: "Fri",
    what: "Scorecard vs. your CRM",
    result: "6 junk LSA leads disputed",
    area: "Numbers",
  },
];

export function FractionalDirectorSections() {
  return (
    <>
      <section className="mkt-hero director-hero">
        <div className="shell">
          <div className="director-hero__layout">
            <div className="mkt-hero__content director-hero__content">
              <h1 className="mkt-hero__headline">
                A senior marketing leader on your team, without the full-time
                hire.
              </h1>
              <p className="mkt-hero__copy">
                A fractional marketing director is an experienced marketing
                leader who works with you part-time to plan your marketing,
                guide your budget, and grow your leads.
              </p>
              <div className="mkt-hero__actions">
                <BookCallLink className="button button-primary">
                  Book a 30-minute fit call
                  <Arrow />
                </BookCallLink>
              </div>
              <ul className="mkt-hero__facts">
                <li>Advising from {formatUsd(DIRECTOR_MONTHLY)}/month</li>
                <li>No long contracts</li>
                <li>Work directly with a senior director</li>
              </ul>
            </div>
            <figure className="leak-map director-week">
              <figcaption className="leak-map__head">
                <span className="leak-map__title">A week with your director</span>
                <span className="leak-map__tag">Example</span>
              </figcaption>
              <ol className="director-week__list">
                {week.map((item, index) => (
                  <li
                    className="director-week__item"
                    key={item.day}
                    style={{ animationDelay: `${0.35 + index * 0.15}s` }}
                  >
                    <span className="director-week__day">{item.day}</span>
                    <div className="director-week__body">
                      <p className="director-week__what">{item.what}</p>
                      <p className="director-week__result">{item.result}</p>
                    </div>
                    <span className="director-week__area">{item.area}</span>
                  </li>
                ))}
              </ol>
              <p className="leak-map__note">
                Same person every week, and on Slack between.
              </p>
            </figure>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#deliverable">
          What you get
        </a>
      </section>

      <FeaturedCaseStudy />

      <section className="section leak-deliverable" id="deliverable">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">What you get</p>
              <h2 className="section-heading">
                A clear plan, and proof of what&apos;s working.
              </h2>
            </div>
            <p className="section-copy">
              Each month, your director sets the plan with you and shows what
              every channel booked.
            </p>
          </div>

          <div className="leak-deliverable__layout reveal">
            <figure className="leak-map">
              <figcaption className="leak-map__head">
                <span className="leak-map__title">Monthly scorecard</span>
                <span className="leak-map__tag">Example</span>
              </figcaption>
              <table className="director-scorecard">
                <thead>
                  <tr>
                    <th scope="col">Channel</th>
                    <th scope="col">Vendor says</th>
                    <th scope="col">In your CRM</th>
                    <th scope="col">Booked</th>
                    <th scope="col">Next step</th>
                  </tr>
                </thead>
                <tbody>
                  {scorecardRows.map((row) => (
                    <tr key={row.channel}>
                      <th scope="row">{row.channel}</th>
                      <td
                        className="director-scorecard__claimed"
                        data-label="Vendor says"
                      >
                        {row.claimed}
                      </td>
                      <td data-label="In CRM">{row.crm}</td>
                      <td
                        className="director-scorecard__booked"
                        data-label="Booked"
                      >
                        {row.booked}
                      </td>
                      <td className="director-scorecard__call-cell">
                        <span
                          className={`director-scorecard__call director-scorecard__call--${row.tone}`}
                        >
                          {row.call}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">Total</th>
                    <td
                      className="director-scorecard__claimed"
                      data-label="Vendor says"
                    >
                      {scorecardTotals.claimed}
                    </td>
                    <td data-label="In CRM">{scorecardTotals.crm}</td>
                    <td
                      className="director-scorecard__booked"
                      data-label="Booked"
                    >
                      {scorecardTotals.booked}
                    </td>
                    <td className="director-scorecard__call-cell" />
                  </tr>
                </tfoot>
              </table>
              <p className="leak-map__note">
                Example numbers, not a client result.
              </p>
            </figure>

            <ul className="leak-deliverable__list">
              {deliverables.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section director-scope" id="scope">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">What we cover</p>
              <h2 className="section-heading">
                Every part of your marketing, under one plan.
              </h2>
            </div>
            <p className="section-copy">
              Your director plans and oversees all of it. Hands-on work can be
              added as needed.
            </p>
          </div>
          <ul className="director-scope__list reveal">
            {coverage.map((area) => (
              <li key={area.label}>
                {area.href ? (
                  <Link href={area.href}>
                    {area.label}
                    <Arrow />
                  </Link>
                ) : (
                  <span className="director-scope__label">{area.label}</span>
                )}
                <p>{area.note}</p>
              </li>
            ))}
          </ul>
          <p className="fdd-proof__more reveal">
            <Link href="/#services">See all our services →</Link>
          </p>
        </div>
      </section>

      <section className="section seo-flow director-steps" id="how-it-works">
        <div className="shell">
          <div className="seo-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                Three steps to a plan that works.
              </h2>
            </div>
            <p className="section-copy">
              Advising starts at {formatUsd(DIRECTOR_MONTHLY)}/month.
            </p>
          </div>
          <ol className="seo-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="seo-flow__step" key={step.title}>
                {index < steps.length - 1 ? (
                  <span className="seo-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="seo-flow__connector-line"
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
                <span className="seo-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="fdd-proof__more reveal">
            Want a one-time project first?{" "}
            <Link href="/lead-leak-audit">Start with a lead leak audit →</Link>
          </p>
        </div>
      </section>

      <section className="section fdd-proof" id="proof">
        <div className="shell">
          <div className="fdd-proof__top reveal">
            <div>
              <p className="eyebrow">From clients</p>
              <h2 className="section-heading">What clients say.</h2>
            </div>
          </div>
          <div className="fdd-proof__quotes reveal">
            {testimonials.map((item) => (
              <blockquote className="fdd-proof__quote" key={item.name}>
                <FiveStars />
                <p>{item.quote}</p>
                <footer>
                  <cite>{item.name}</cite>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="fdd-proof__more reveal">
            <Link href="/work">See the work →</Link>
          </p>
        </div>
      </section>

      <FaqSection faqs={faqs} />
    </>
  );
}
