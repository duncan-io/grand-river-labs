import Link from "next/link";
import { BookCallLink } from "./book-call-link";
import { renderInline } from "@/components/inline-links";
import { AUDIT_FEE, DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { testimonials } from "@/lib/testimonials";
import { EngagementBlock } from "./engagement-block";
import { NicheStrip } from "./niche-page";
import { FeaturedCaseStudy } from "./sections";
import { Arrow } from "./site-header";
import { directorAreas, leadSystemNav } from "./what-we-do-nav";

const scopeAreas = [...directorAreas, leadSystemNav] as const;

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

const deliverables = [
  {
    title: "A senior leader you meet with every week",
    copy: "Your director joins your weekly meeting to review the numbers, set priorities, and make decisions with you. Between meetings, they're a message away for the hire, the new market, or the agency pitch.",
  },
  {
    title: "A strategy and budget you own",
    copy: "Where to grow, where every dollar goes, and what it should return, written down and revisited each quarter. You keep the final say.",
  },
  {
    title: "A monthly scorecard",
    copy: "What each vendor claimed, what reached your CRM, and what became a booked job, with the call on every channel.",
  },
  {
    title: "A team that can run it",
    copy: "We coach whoever owns marketing and train the office on lead handling, and we fix the leaks ourselves along the way.",
  },
];

const scope: Record<
  (typeof scopeAreas)[number]["href"],
  { mode: "do" | "direct"; note: string }
> = {
  "/lead-leak-audit": {
    mode: "do",
    note: "Where leads leak after the click, ranked by what each leak costs.",
  },
  "/conversion-rate-optimization": {
    mode: "do",
    note: "More leads from the traffic you already pay for.",
  },
  "/lead-system": {
    mode: "do",
    note: "Included: tracking, daily checks, and a portal showing what booked.",
  },
  "/automation": {
    mode: "do",
    note: "Lead routing and follow-up that don't depend on someone remembering.",
  },
  "/search-engine-optimization": {
    mode: "direct",
    note: "The strategy, the brief, and a check on whoever writes the pages.",
  },
  "/local-ads": {
    mode: "direct",
    note: "What to fund, pause, or dispute. Your media buyer runs the campaigns.",
  },
  "/google-business-profile": {
    mode: "direct",
    note: "Categories, services, reviews, and whether its calls get tracked.",
  },
};

const scopeColumns = [
  {
    mode: "do",
    title: "We do it ourselves",
    copy: "Hands-on work on the leaks and the measurement.",
  },
  {
    mode: "direct",
    title: "We direct it",
    copy: "Every channel planned, briefed, and checked against booked jobs.",
  },
] as const;

const steps = [
  {
    title: "Fit call",
    copy: "30 minutes, free. What you spend, who does what, and whether a director is the seat you're missing.",
  },
  {
    title: "Month one: audit and plan",
    copy: "We learn how the business runs, run the lead leak audit, fix the tracking, and write the plan and budget. Already had the audit? We start from its findings.",
  },
  {
    title: "Every month after",
    copy: "You meet with your director every week to plan, review the numbers, and make the call on each channel. Between meetings we coach the team and check every vendor against the CRM. The scorecard shows what moved.",
  },
];

export const faqs = [
  {
    question: "What is a fractional marketing director?",
    answer:
      "A senior marketing leader who works with your company part-time, sometimes called a fractional CMO. You get the judgment and ownership of a marketing director without the salary, benefits, or forty-hour week of a full-time hire. In practice, you meet with them weekly to plan, set strategy, and get advice on the big decisions.",
  },
  {
    question: "What does a fractional marketing director do?",
    answer:
      "Meets with you every week to plan and set strategy, decides where the budget goes, and advises you on the big calls. Coaches whoever runs marketing day to day and holds every vendor to the plan. Hands-on, we fix where leads leak and the [tracking](/lead-system) behind the numbers, usually starting with a [lead leak audit](/lead-leak-audit).",
  },
  {
    question:
      "How is a fractional marketing director different from a full-time hire?",
    answer:
      "A full-time director costs six figures plus overhead, and most home services companies don't have forty hours a week of director-level work. A fractional director covers the part that needs senior judgment: the strategy, the budget calls, the advice, and the oversight. You pay only for those hours.",
  },
  {
    question: "How much does a fractional marketing director cost?",
    answer: `Engagements start at ${formatUsd(DIRECTOR_MONTHLY)}/month, one monthly fee rather than a quote per channel. The price depends on scope, and there are no long contracts. Many clients start with the ${formatUsd(AUDIT_FEE)} [lead leak audit](/lead-leak-audit).`,
  },
  {
    question: "Do you take on one-off projects?",
    answer: `Yes. Not every problem needs an ongoing director. The [lead leak audit](/lead-leak-audit) is a ${formatUsd(AUDIT_FEE)} flat standalone engagement, the [Lead System](/lead-system) is available on its own, and any area we oversee — conversion fixes, lead routing — can be scoped as a one-time project. We confirm scope and price on a 30-minute fit call.`,
  },
  {
    question: "Will you replace our agency or marketing hire?",
    answer:
      "No. We sit above your agencies: deciding where effort goes, what good looks like, and when to pause. Vendors who deliver stay. An in-house marketing hire gets a coach, not a replacement. Agencies can also [partner with us](/white-label).",
  },
  {
    question: "What happens in the first 90 days?",
    answer:
      "Month one is the [lead leak audit](/lead-leak-audit), the tracking fixes, and a written plan and budget. Months two and three bring the first fixes, vendor briefs, team coaching, and scorecards, so by day 90 you know which channels earn their budget.",
  },
  {
    question: "How involved are you day to day?",
    answer:
      "One senior person, the same one every time. We join your weekly meeting, stay on Slack or email between, coach whoever owns marketing, and run sessions with the office on speed to lead and follow-up. No rotating account team, and no junior learning on your budget.",
  },
];

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
              <p className="eyebrow">
                Fractional marketing director · Home services
              </p>
              <h1 className="mkt-hero__headline">
                A senior marketing leader on your team, without the full-time
                hire.
              </h1>
              <p className="mkt-hero__copy">
                Meet every week with an experienced marketing director who plans
                your strategy with you, decides where the budget goes, and
                advises you on the big calls. That&apos;s a fractional marketing
                director: senior leadership a few hours a week, for a fraction of
                a full-time salary.
              </p>
              <div className="mkt-hero__actions">
                <BookCallLink className="button button-primary">
                  Book a 30-minute fit call
                  <Arrow />
                </BookCallLink>
                <a className="button button-secondary" href="#deliverable">
                  See what you get
                </a>
              </div>
              <ul className="mkt-hero__facts">
                <li>Weekly meetings with your director</li>
                <li>Starting at {formatUsd(DIRECTOR_MONTHLY)}/month</li>
                <li>No long contracts</li>
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
                A senior leader to meet with, plan with, and lean on.
              </h2>
            </div>
            <p className="section-copy">
              You meet with the same director every week. Together you set the
              plan and the budget, and every month a scorecard shows what each
              channel actually booked.
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
                    <th scope="col">The call</th>
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
              <p className="eyebrow">What&apos;s in scope</p>
              <h2 className="section-heading">
                What we do ourselves, and what we direct.
              </h2>
            </div>
            <p className="section-copy">
              Every channel is in scope, held to one plan.
            </p>
          </div>
          <div className="director-scope__columns reveal">
            {scopeColumns.map((column) => (
              <div
                className={`director-scope__column director-scope__column--${column.mode}`}
                key={column.mode}
              >
                <h3 className="director-scope__title">{column.title}</h3>
                <p className="director-scope__copy">{column.copy}</p>
                <ul className="director-scope__list">
                  {scopeAreas
                    .filter((area) => scope[area.href].mode === column.mode)
                    .map((area) => (
                      <li key={area.href}>
                        <Link href={area.href}>
                          {area.label}
                          <Arrow />
                        </Link>
                        <p>{scope[area.href].note}</p>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <p
            className="fdd-proof__more director-scope__one-off reveal"
            id="one-off-projects"
          >
            Not ready for ongoing? Any of these can be scoped as a one-off
            project, or start with the{" "}
            <Link href="/lead-leak-audit">
              {formatUsd(AUDIT_FEE)} lead leak audit
            </Link>
            .{" "}
            <BookCallLink>Book a fit call to scope it →</BookCallLink>
          </p>
        </div>
      </section>

      <section className="section seo-flow director-steps" id="how-it-works">
        <div className="shell">
          <div className="seo-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                Audit first. Then a monthly rhythm.
              </h2>
            </div>
            <p className="section-copy">
              Starting at {formatUsd(DIRECTOR_MONTHLY)}/month, no long contracts.
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
        </div>
      </section>

      <EngagementBlock />

      <section className="section fdd-proof" id="proof">
        <div className="shell">
          <div className="fdd-proof__top reveal">
            <div>
              <p className="eyebrow">From clients</p>
              <h2 className="section-heading">What clients say.</h2>
            </div>
            <p className="section-copy">
              Less noise, and plans that fit how the business actually runs.
            </p>
          </div>
          <div className="fdd-proof__quotes reveal">
            {testimonials.map((item) => (
              <blockquote className="fdd-proof__quote" key={item.name}>
                <p>{item.quote}</p>
                <footer>
                  <cite>{item.name}</cite>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="fdd-proof__more reveal">
            <a href="/work">See the work →</a>
          </p>
        </div>
      </section>

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">What people usually ask.</h2>
            </div>
            <p className="section-copy">
              Starting at {formatUsd(DIRECTOR_MONTHLY)}/month, no long contracts, and
              your current vendors stay.
            </p>
          </div>
          <div className="fdd-faq__list reveal">
            {faqs.map((item) => (
              <details className="fdd-faq__item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{renderInline(item.answer)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <NicheStrip />
    </>
  );
}
