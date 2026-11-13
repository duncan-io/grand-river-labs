import { BookCallLink } from "./book-call-link";
import Link from "next/link";
import { renderInline } from "@/components/inline-links";
import { AUDIT_FEE, DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { Arrow } from "./site-header";

const questions = [
  {
    title: "How many leads were real?",
    copy: "Platforms count robocalls and repeat callers.",
  },
  {
    title: "What did each lead cost?",
    copy: "Spend is in four places. Leads are in one.",
  },
  {
    title: "Which channel books jobs?",
    copy: "Form leads arrive without a source.",
  },
  {
    title: "Is each vendor earning its fee?",
    copy: "Every agency grades its own homework.",
  },
];

const steps = [
  {
    title: "Build",
    copy: "This is the hard part, and we do all of it. A tracking number for each source, hidden form fields that carry the source into your CRM, analytics key events verified end to end, booked jobs sent back to Google Ads, and your CRM connected to the dashboard.",
  },
  {
    title: "Blend",
    copy: "Our attribution model matches every call, form, and CRM record, removes spam and duplicates, and gives each lead one source and one cost. Every vendor gets measured the same way, on the same numbers.",
  },
  {
    title: "Report",
    copy: "The dashboard stays current, a scorecard lands each month, and once a quarter we walk through it with you. Eight daily checks keep the tracking underneath it from quietly breaking.",
  },
];

type VendorRow = {
  vendor: string;
  covers: string;
  reported: number;
  verified: number;
  cplReported: string;
  cplVerified: string;
};

/* Sample data: Lakeshore Roofing (fictional), October. Vendor figures reconcile
   with teaserSources; the SEO agency covers the Business Profile and organic. */
const vendorRows: VendorRow[] = [
  {
    vendor: "Google Ads agency",
    covers: "Google Ads",
    reported: 120,
    verified: 96,
    cplReported: "$40",
    cplVerified: "$50",
  },
  {
    vendor: "Local Services Ads",
    covers: "Run in-house",
    reported: 83,
    verified: 74,
    cplReported: "$46",
    cplVerified: "$51",
  },
  {
    vendor: "SEO agency",
    covers: "Business Profile & organic",
    reported: 214,
    verified: 156,
    cplReported: "$8",
    cplVerified: "$12",
  },
];

const vendorReportedTotal = vendorRows.reduce((sum, row) => sum + row.reported, 0);
const vendorVerifiedTotal = vendorRows.reduce((sum, row) => sum + row.verified, 0);
const vendorBarMax = Math.max(...vendorRows.map((row) => row.reported));

const stackPoints = [
  {
    title: "Works with what you have",
    copy: "Your CRM, ad accounts, analytics, and Business Profile stay as they are. We connect to them.",
  },
  {
    title: "Custom to your business",
    copy: "Your sources, your vendors, and what counts as a booked job are set up for you. No template.",
  },
  {
    title: "Visibility you can act on",
    copy: "See which sources and vendors book jobs, and move budget toward them.",
  },
  {
    title: "Fewer leads slip through",
    copy: "Broken forms and tracking are caught within a day, so leads keep reaching your team.",
  },
];

const teaserFeatures = [
  { title: "Real lead counts", copy: "Spam and duplicates out." },
  { title: "Cost per lead and booked job", copy: "For every source and campaign." },
  { title: "Vendor scorecard", copy: "Reported vs. verified, side by side." },
  { title: "Daily system checks", copy: "Broken tracking caught within a day." },
];

const teaserTabs = ["Overview", "Budget & vendors", "Leads", "System health"];

const teaserKpis = [
  { label: "Real leads", value: "351", change: "+9% vs. Sep" },
  { label: "Booked jobs", value: "168", change: "+13% vs. Sep" },
  { label: "Cost per lead", value: "$51", change: "Paid sources" },
  { label: "Cost per booked job", value: "$108", change: "−10% vs. Sep" },
];

const teaserSources = [
  { source: "Business Profile", leads: 98, booked: 46, cpb: "—" },
  { source: "Google Ads", leads: 96, booked: 42, cpb: "$115" },
  { source: "Local Services Ads", leads: 74, booked: 38, cpb: "$100" },
  { source: "Organic & referrals", leads: 83, booked: 42, cpb: "—" },
];

export const faqs = [
  {
    question: "Do we have to switch CRMs or software?",
    answer:
      "No. It's built around the CRM, phone line, forms, and ad accounts you already use. We connect to them and run call tracking and the dashboard on our side. Your team keeps working the way it does now.",
  },
  {
    question: "Isn't this just analytics and call tracking?",
    answer:
      "No. Analytics, call tracking, your ad accounts, and your CRM are the inputs. On their own, each one counts leads its own way, and none of them agree. The dashboard, the attribution model, and the way the data is matched and blended are ours. That's what turns four conflicting reports into one lead count, one cost per lead, and one cost per booked job for every source and vendor.",
  },
  {
    question: "Who owns the accounts and the data?",
    answer:
      "Your analytics, ad accounts, Business Profile, domain, and CRM stay in your name, with us added as users. Call tracking, the dashboard, and the attribution model run on our side. Your accounts, and the history in them, stay with you if you ever stop working with us.",
  },
  {
    question: "How much does it cost?",
    answer: `A one-time build fee plus a monthly fee for the dashboard, reporting, and daily checks. Call tracking runs on our account, so there's no separate tool to sign up for. We scope both on the demo, based on how many sources, forms, ad accounts, and vendors you run. On the [fractional marketing director](/fractional-marketing-director) engagement, starting at ${formatUsd(DIRECTOR_MONTHLY)}/month, it's included.`,
  },
  {
    question: "Will call tracking numbers hurt my Google Business Profile?",
    answer:
      "Not when it's set up properly. On the [Google Business Profile](/google-business-profile), the tracking number goes in as the primary phone and your main number stays listed as an additional phone, so the listing still matches your other listings. On the website, a script swaps the number for visitors, so your main number stays in the page itself.",
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

function LeadSystemHeroScene() {
  return (
    <svg
      className="lead-system-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="lead-system-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="lead-system-panel" x1="968" y1="150" x2="1420" y2="720">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="lead-system-hero__glow"
        cx="1320"
        cy="240"
        r="160"
        fill="url(#lead-system-glow)"
        opacity=".85"
      />

      <g>
        <rect
          x="968"
          y="156"
          width="452"
          height="560"
          rx="22"
          fill="url(#lead-system-panel)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <circle cx="996" cy="188" r="5" fill="#6FB8B0" />
        <circle cx="1014" cy="188" r="5" fill="#3A948C" />
        <circle
          className="lead-system-hero__live"
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
          SAMPLE DATA · REPORTED VS. BOOKED
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
            className={`lead-system-hero__row lead-system-hero__row--${index + 1}`}
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
              className="lead-system-hero__booked"
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
              <g className="lead-system-hero__check">
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
            className="lead-system-hero__cost"
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

function GapBar({
  value,
  kind,
}: {
  value: number;
  kind: "reported" | "verified";
}) {
  return (
    <span className="lead-gap__bar-line">
      <span
        className={`lead-gap__bar lead-gap__bar--${kind}`}
        style={{ width: `calc((100% - 3.5rem) * ${value / vendorBarMax})` }}
        aria-hidden="true"
      />
      <span className={`lead-gap__value lead-gap__value--${kind}`}>
        {value}
        <span className="visually-hidden">
          {kind === "reported" ? " reported" : " verified"}
        </span>
      </span>
    </span>
  );
}

function VendorGapChart() {
  return (
    <figure className="lead-gap reveal">
      <figcaption className="lead-gap__head">
        <span className="lead-gap__title">Leads, October · sample data</span>
        <span className="lead-gap__legend" aria-hidden="true">
          <span>
            <span className="lead-gap__swatch lead-gap__swatch--reported" />
            Vendor reported
          </span>
          <span>
            <span className="lead-gap__swatch lead-gap__swatch--verified" />
            Verified in your CRM
          </span>
        </span>
      </figcaption>
      <ul className="lead-gap__rows">
        {vendorRows.map((row) => (
          <li className="lead-gap__row" key={row.vendor}>
            <span className="lead-gap__vendor">
              <span className="lead-gap__name">{row.vendor}</span>
              <span className="lead-gap__covers">{row.covers}</span>
            </span>
            <span className="lead-gap__bars">
              <GapBar value={row.reported} kind="reported" />
              <GapBar value={row.verified} kind="verified" />
            </span>
          </li>
        ))}
      </ul>
      <div className="lead-gap__total">
        <p className="lead-gap__sums">
          <span>
            <span className="lead-gap__sum lead-gap__sum--reported">
              {vendorReportedTotal}
            </span>{" "}
            reported
          </span>
          <span>
            <span className="lead-gap__sum lead-gap__sum--verified">
              {vendorVerifiedTotal}
            </span>{" "}
            held up
          </span>
        </p>
        <p className="lead-gap__note">
          The other {vendorReportedTotal - vendorVerifiedTotal} were spam,
          duplicates, or never reached the CRM.
        </p>
      </div>
    </figure>
  );
}

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
                <li>The Lead Monitoring System, included</li>
                <li>The {formatUsd(AUDIT_FEE)} lead leak audit, included</li>
                <li>A director who acts on the numbers</li>
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

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">What people usually ask.</h2>
            </div>
            <p className="section-copy">
              Anything else, we&apos;ll cover on the demo.
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
