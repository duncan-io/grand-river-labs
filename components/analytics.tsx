import { BookCallLink } from "./book-call-link";
import Link from "next/link";
import { renderInline } from "@/components/inline-links";
import { AUDIT_FEE, DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { Arrow } from "./site-header";

const friction = [
  {
    title: "Calls nobody can trace",
    copy: "One published number on the website, the Google Business Profile, and Yelp. The phone rings, nobody can say which listing or ad earned it, and the channel that books the most jobs gets no credit.",
  },
  {
    title: "Every vendor grades its own homework",
    copy: "The SEO agency, the ads account, and the lead sites each send a report showing a win. Added up, they claim more leads than the business got, and [spend decisions](/fractional-marketing-director) rest on whichever report arrived last.",
  },
  {
    title: "A Tag Manager junk drawer",
    copy: "Pixels and scripts from three past agencies still fire. Nobody knows what's tracked, what's counted twice, or what breaks when a page ships.",
  },
  {
    title: "Clicks counted, booked jobs not",
    copy: "The charts fill with page views and sessions. Quote requests aren't tracked cleanly, and the weekly report takes half a day to [reconcile by hand](/automation/business-process-automation).",
  },
];

const ways = [
  {
    title: "Call tracking",
    lead: "A ring should say where it came from.",
    setup:
      "Tracking numbers on the website, the [Google Business Profile](/google-business-profile), Local Services Ads, Yelp, and other listings, set up so your main number stays consistent everywhere it's listed.",
    outcome:
      "Every call tied to its source, ready to [score](/marketing-automation) while the lead is still warm.",
  },
  {
    title: "Vendor reports vs. the CRM",
    lead: "Every vendor reports its own version of success.",
    setup:
      "Agency and platform numbers checked against the CRM and the booked jobs, lead by lead, not dashboard against dashboard.",
    outcome:
      "The real cost per booked job behind each invoice, ready for the next contract conversation.",
  },
  {
    title: "GA4",
    lead: "Set up for how you win work, not left on the default install.",
    setup:
      "A property you own, with calls, quote requests, and booked estimates set up as key events and reports built around them.",
    outcome: "A report the owner can read in five minutes and act on.",
  },
  {
    title: "Event tracking",
    lead: "Every event earns its place.",
    setup:
      "Quote form submits, booking starts, tap-to-call, and chat starts tracked cleanly. Page views stay in the background.",
    outcome: "Progress toward booked jobs, not vanity traffic filling the charts.",
  },
  {
    title: "Google Tag Manager",
    lead: "One clean container beats scripts nobody remembers adding.",
    setup:
      "Old agency pixels audited and removed, consistent naming, and a publishing routine with notes your web vendor can follow.",
    outcome: "New pages ship without breaking the tracking.",
  },
  {
    title: "Attribution",
    lead: "Know what earned the job, without archaeology every Monday.",
    setup:
      "Consistent UTMs on ads, listings, and emails, with the [source carried into the CRM](/marketing-automation) so it survives the handoff.",
    outcome:
      "Spend decisions made on booked jobs by channel, not gut feel dressed up as data.",
  },
];

const steps = [
  {
    title: "Discover",
    copy: "We map what you need to know, what fires today, and where the numbers stop matching, then rank the gaps that block a decision.",
  },
  {
    title: "Instrument",
    copy: "We set up call tracking, GA4, Tag Manager, and the events that matter, with notes your team or web vendor can follow.",
  },
  {
    title: "Reconcile",
    copy: "We check every source against the CRM and booked jobs, fix what's noisy or missing, and flag vendor numbers that don't hold up.",
  },
  {
    title: "Report monthly",
    copy: "One scorecard: calls, quote requests, and booked jobs by source, and what each one cost. Next month's decisions start there.",
  },
];

export const faqs = [
  {
    question: "What is call tracking?",
    answer:
      "Call tracking gives each marketing source, like your website, Google Business Profile, ads, and Yelp, its own number that rings your normal line. Each call is logged with the source it came from, so you can see which channels make the phone ring and which of those calls became booked jobs.",
  },
  {
    question: "Will call tracking numbers hurt my Google Business Profile?",
    answer:
      "Not when it's set up properly. On the [Google Business Profile](/google-business-profile), the tracking number goes in as the primary phone and your main number stays listed as an additional phone, so the listing still matches your other listings. On the website, a script swaps the number for visitors, so your main number stays in the page itself.",
  },
  {
    question: "Do we need GA4 if our agency already sends reports?",
    answer:
      "Yes, and it should be yours. Agency reports come from the agency's own tools and show what the agency is paid to show. A GA4 property you own, with calls and quote requests set up as key events, gives you one source you control, and keeps the history when you change vendors.",
  },
  {
    question: "How do you check vendor reports against the CRM?",
    answer:
      "Lead by lead. We take what each platform says it delivered, whether leads, calls, or conversions, and match it against the CRM and the jobs that were actually booked. Duplicates, spam, and leads that never reached anyone come out. What's left is the real cost per booked job for each channel.",
  },
  {
    question: "What is Google Tag Manager, and do we need it?",
    answer:
      "Tag Manager is a free Google tool that keeps your tracking scripts in one place, so tags can be added or fixed without editing the site's code. Most home services sites benefit from it, especially after a few agencies have each added their own pixels.",
  },
  {
    question: "How much does analytics and call tracking setup cost?",
    answer: `Analytics and call tracking are part of the [fractional marketing director](/fractional-marketing-director) engagement, starting at ${formatUsd(DIRECTOR_MONTHLY)}/month, rather than a separate project fee. Many clients start with the ${formatUsd(AUDIT_FEE)} [lead leak audit](/lead-leak-audit).`,
  },
  {
    question: "How long until the numbers are trustworthy?",
    answer:
      "Call tracking and the main events are usually live within the first few weeks. Give it a full month of clean data before comparing channels. From then on you see calls, quote requests, and booked jobs by source in the monthly scorecard.",
  },
];

const BAR_X = 210;
const BAR_WIDTH = 128;

const sources = [
  { name: "Website", reported: 18, booked: 7 },
  { name: "Google Business Profile", reported: 31, booked: 12 },
  { name: "Local Services Ads", reported: 24, booked: 6 },
  { name: "Yelp", reported: 9, booked: 2 },
] as const;

const FONT = "system-ui, -apple-system, sans-serif";

function AnalyticsHeroScene() {
  return (
    <svg
      className="analytics-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="analytics-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="analytics-panel" x1="968" y1="150" x2="1420" y2="720">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="analytics-hero__glow"
        cx="1320"
        cy="240"
        r="160"
        fill="url(#analytics-glow)"
        opacity=".85"
      />

      <g>
        <rect
          x="968"
          y="156"
          width="452"
          height="560"
          rx="22"
          fill="url(#analytics-panel)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <circle cx="996" cy="188" r="5" fill="#6FB8B0" />
        <circle cx="1014" cy="188" r="5" fill="#3A948C" />
        <circle
          className="analytics-hero__live"
          cx="1032"
          cy="188"
          r="5"
          fill="#057A72"
        />
        <text
          x="1054"
          y="193"
          fill="#075752"
          fontFamily={FONT}
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          EXAMPLE · REPORTED VS. BOOKED
        </text>

        <g transform="translate(996 236)">
          <text
            x="18"
            fill="#3A948C"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            SOURCE
          </text>
          <text
            x={BAR_X}
            fill="#3A948C"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            BOOKED OF REPORTED
          </text>
        </g>

        {sources.map((source, index) => (
          <g
            key={source.name}
            className={`analytics-hero__row analytics-hero__row--${index + 1}`}
            transform={`translate(996 ${252 + index * 84})`}
          >
            <rect
              width="396"
              height="72"
              rx="12"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <text
              x="18"
              y="31"
              fill="#075752"
              fontFamily={FONT}
              fontSize="13"
              fontWeight="700"
            >
              {source.name}
            </text>
            <text
              x="18"
              y="51"
              fill="#365e5b"
              fontFamily={FONT}
              fontSize="11"
            >
              {source.reported} reported
            </text>
            <rect
              x={BAR_X}
              y="32"
              width={BAR_WIDTH}
              height="8"
              rx="4"
              fill="#B0E4DC"
            />
            <rect
              className="analytics-hero__booked"
              x={BAR_X}
              y="32"
              width={(BAR_WIDTH * source.booked) / source.reported}
              height="8"
              rx="4"
              fill="#057A72"
            />
            <text
              x="378"
              y="42"
              textAnchor="end"
              fill="#075752"
              fontFamily={FONT}
              fontSize="20"
              fontWeight="700"
            >
              {source.booked}
            </text>
            <g transform="translate(196 36)">
              <g className="analytics-hero__check">
                <circle r="8" fill="#057A72" />
                <path
                  d="m-3.5 0.2 2.3 2.3L3.6-2.6"
                  stroke="#FFFDF4"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </g>
        ))}

        <g transform="translate(996 600)">
          <rect
            width="396"
            height="88"
            rx="14"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.6"
          />
          <text
            x="18"
            y="30"
            fill="#3A948C"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            COST PER BOOKED JOB
          </text>
          <text
            x="18"
            y="62"
            fill="#6FB8B0"
            fontFamily={FONT}
            fontSize="13"
            fontWeight="650"
          >
            Platform report: $48 / lead
          </text>
          <text
            className="analytics-hero__cost"
            x="378"
            y="64"
            textAnchor="end"
            fill="#075752"
            fontFamily={FONT}
            fontSize="28"
            fontWeight="700"
          >
            $164
          </text>
        </g>
      </g>

      <path
        d="M0 780c260-50 520-40 780 8 220 40 420 35 820-25v137H0V780Z"
        fill="#EAF7F4"
        opacity=".9"
      />
    </svg>
  );
}

export function AnalyticsSections() {
  return (
    <>
      <section className="mkt-hero analytics-hero">
        <div className="analytics-hero__scene-wrap">
          <AnalyticsHeroScene />
        </div>
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Call tracking &amp; analytics · Home services</p>
            <h1 className="mkt-hero__headline">
              Know which calls, ads, and listings actually book jobs.
            </h1>
            <p className="mkt-hero__copy">
              Call tracking, GA4, Tag Manager, and attribution for home services
              companies. Every call and quote request gets a source, and every
              vendor report gets checked against your CRM.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink className="button button-primary">
                Book a 30-minute call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#ways">
                See what we set up
              </a>
            </div>
            <ul className="mkt-hero__facts">
              <li>Every call tied to its source</li>
              <li>Vendor reports checked against the CRM</li>
              <li>Part of the fractional marketing director engagement</li>
            </ul>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#friction">
          Where the numbers break
        </a>
      </section>

      <section className="section analytics-friction" id="friction">
        <div className="shell">
          <div className="analytics-friction__top reveal">
            <div>
              <p className="eyebrow">The blind spot</p>
              <h2 className="section-heading">
                The phone rings. Nobody knows why.
              </h2>
            </div>
            <p className="section-copy">
              Most home services companies already have the tools. What&apos;s
              missing is tracking that ties each call and quote request to its
              source, and someone checking the vendors&apos; numbers against the
              jobs that got booked.
            </p>
          </div>
          <div className="analytics-friction__grid reveal">
            {friction.map((item, index) => (
              <article className="analytics-friction__cell" key={item.title}>
                <span className="analytics-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section analytics-ways" id="ways">
        <div className="shell">
          <div className="analytics-ways__top reveal">
            <div>
              <p className="eyebrow">What&apos;s covered</p>
              <h2 className="section-heading">What we set up and check.</h2>
            </div>
            <p className="section-copy">
              First we audit what&apos;s firing and whether it can be trusted.
              Then we build only the tracking you need, without burying the team
              in tags and dashboards nobody believes.
            </p>
          </div>
          <div className="analytics-ways__grid reveal">
            {ways.map((item, index) => (
              <article className="analytics-way" key={item.title}>
                <span className="analytics-way__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p className="analytics-way__lead">{item.lead}</p>
                <p className="analytics-way__setup">
                  <span className="analytics-way__label">What we do</span>
                  {renderInline(item.setup)}
                </p>
                <p className="analytics-way__outcome">
                  <span className="analytics-way__label">You get</span>
                  {renderInline(item.outcome)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section analytics-flow" id="how-it-works">
        <div className="shell">
          <div className="analytics-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                Instrument once. Check it every month.
              </h2>
            </div>
            <p className="section-copy">
              Measurement comes before optimization. Once calls and forms are
              counted,{" "}
              <Link href="/conversion-rate-optimization">
                conversion rate optimization
              </Link>{" "}
              is how more of those visits turn into calls.
            </p>
          </div>
          <ol className="analytics-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="analytics-flow__step" key={step.title}>
                {index < steps.length - 1 ? (
                  <span className="analytics-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="analytics-flow__connector-line"
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
                <span className="analytics-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section leak-next analytics-next" id="next">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">Where analytics fits</p>
              <h2 className="section-heading">
                Part of the engagement, not a one-off setup.
              </h2>
            </div>
            <p className="section-copy">
              Tracking is the foundation. What to do with the numbers depends on
              where the leads are actually leaking.
            </p>
          </div>
          <div className="engagement-compare leak-next__options reveal">
            <article className="engagement-compare__card">
              <p className="engagement-compare__label">Start with the audit</p>
              <p className="engagement-compare__value">
                {formatUsd(AUDIT_FEE)}
                <span className="engagement-compare__period"> flat</span>
              </p>
              <p className="engagement-compare__note">
                Two weeks tracing calls, forms, follow-up, and tracking, ranked
                by what each leak costs. Includes what&apos;s firing today and
                which vendor numbers hold up.
              </p>
              <Link className="leak-next__link" href="/lead-leak-audit">
                What the audit covers
                <Arrow />
              </Link>
            </article>
            <article className="engagement-compare__card engagement-compare__card--us">
              <p className="engagement-compare__label">
                Fractional marketing director
              </p>
              <p className="engagement-compare__value">
                <span className="engagement-compare__period">Starting at </span>
                {formatUsd(DIRECTOR_MONTHLY)}
                <span className="engagement-compare__period">/month</span>
              </p>
              <p className="engagement-compare__note">
                Tracking and reporting are part of the hands-on work. We set it
                up, check it against the CRM every month, and use it to decide
                where the next dollar goes.
              </p>
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

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">What people usually ask.</h2>
            </div>
            <p className="section-copy">
              Call tracking, GA4, Tag Manager, and how vendor numbers get
              checked against the jobs you actually booked.
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
    </>
  );
}
