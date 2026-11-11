import Link from "next/link";
import { BookCallLink } from "./book-call-link";
import { renderInline } from "@/components/inline-links";
import { AUDIT_FEE, DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { Arrow } from "./site-header";

const checkpoints = [
  {
    title: "The call",
    leak: "Calls ring out after hours, during storms, or while the crew is on a roof. The caller moves down the list to whoever answers.",
    check:
      "Call logs, after-hours coverage, and ring-out patterns, set against how many calls actually became booked jobs.",
  },
  {
    title: "The form",
    leak: "No error, no bounce. The notification lands in spam or the CRM sync stopped months ago, and the lead thinks they reached you.",
    check:
      "Every form submitted for real: delivery, spam folders, CRM sync, and what the prospect sees after they hit send.",
  },
  {
    title: "The reply",
    leak: "The inquiry sits in an inbox nobody owns. Someone replies three days later, after a competitor has already booked the appointment.",
    check:
      "Response times measured and routing rules traced: who gets which lead, how fast, and what happens when they're out.",
  },
  {
    title: "The tracking",
    leak: "Tags stop firing and calls go unattributed, so the channel that's working gets cut and the one that isn't keeps its budget.",
    check:
      "GA4, tags, and call tracking verified, including whether calls from the site and the map listing are tracked at all.",
  },
  {
    title: "The report",
    leak: "The vendor counts every call and form as a lead, including spam and wrong numbers. Booked jobs tell a different story.",
    check:
      "Agency, ad platform, and Local Services Ads reports reconciled against the CRM lead by lead, with junk LSA leads flagged for dispute.",
  },
];

const leakMapRows = [
  {
    leak: "After-hours calls ring out",
    cost: "$13,500",
    jobs: "≈ 3 jobs",
    owner: "Your office",
  },
  {
    leak: "Quote form not syncing to CRM",
    cost: "$9,000",
    jobs: "≈ 2 jobs",
    owner: "Web vendor",
  },
  {
    leak: "Web leads answered in 2+ days",
    cost: "$4,500",
    jobs: "≈ 1 job",
    owner: "Your office",
  },
  {
    leak: "LSA billed for spam leads",
    cost: "$620",
    jobs: "in credits",
    owner: "Dispute",
  },
];

const deliverables = [
  {
    title: "A written leak map",
    copy: "Every leak we find, what's causing it, and what it costs you each month, ranked so the first fix is the one that pays.",
  },
  {
    title: "A review call",
    copy: "An hour walking through the map with you and anyone else who should hear it, so nothing gets lost in a PDF.",
  },
  {
    title: "An owner for every fix",
    copy: "Each leak names who should fix it: your office, your web vendor, your agency, or a platform dispute.",
  },
];

const steps = [
  {
    title: "Scoping call",
    copy: "30 minutes, free. What you spend, where leads are supposed to go, and whether an audit is worth it for you.",
  },
  {
    title: "Two-week audit",
    copy: "We trace every path from the click or the call to the booked job. You give us read-only access and about an hour of your time.",
  },
  {
    title: "Leak map and review",
    copy: "You get the map, ranked by what each leak costs, and we walk through it together. Nothing is changed without you.",
  },
];

export const faqs = [
  {
    question: "What does the audit cost?",
    answer: `${formatUsd(AUDIT_FEE)}, flat. The scoping call is free, and there's no obligation to continue with the [fractional marketing director](/fractional-marketing-director) engagement.`,
  },
  {
    question: "What do you need from us?",
    answer:
      "About an hour over the two weeks: read-only access to your analytics, call tracking, CRM, and ad accounts, plus a few test calls and form fills we coordinate with your office. We don't change anything during the audit.",
  },
  {
    question: "Do you fix the leaks too?",
    answer:
      "The audit gives you the map: every leak ranked, with what's wrong, what it costs, and who should fix it. To have us own the fixes and check they held, that's the [fractional marketing director](/fractional-marketing-director) engagement.",
  },
  {
    question: "What if you don't find much?",
    answer:
      "Then you have proof the path from click to booked job works, and the spend can be judged on its own merits. That's worth knowing before you add budget. If we don't think an audit will pay for itself, we'll say so on the scoping call.",
  },
  {
    question: "Does our agency need to be involved?",
    answer:
      "Only for access. The audit checks their reports against your CRM, so we work alongside them rather than through them. Agencies that want to offer this to their own clients can [partner with us](/white-label).",
  },
];

/* Lead path from first contact to booked job, with leaks dripping off it. */
function LeakHeroScene() {
  const nodes = [
    { label: "Call / click", cx: 1130, cy: 240 },
    { label: "Form", cx: 1370, cy: 330 },
    { label: "Reply", cx: 1150, cy: 445 },
    { label: "CRM", cx: 1390, cy: 555 },
  ];
  const job = { label: "Booked job", cx: 1250, cy: 680 };
  const path =
    "M1130 240 Q1280 236 1370 330 Q1290 430 1150 445 Q1270 462 1390 555 Q1360 650 1250 680";
  const leaks = [
    { d: "M1402 346 Q1432 380 1440 420", tag: "Form to spam", x: 1440, y: 440, delay: "0s" },
    { d: "M1124 460 Q1100 492 1096 528", tag: "Replied in 3 days", x: 1096, y: 548, delay: "0.9s" },
    { d: "M1420 571 Q1450 600 1462 632", tag: "Never in the CRM", x: 1462, y: 652, delay: "1.8s" },
  ];

  return (
    <svg
      className="mkt-hero__scene leak-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="leak-hero-glow" x1="1180" y1="140" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".15" />
        </linearGradient>
        <linearGradient id="leak-hero-node" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id="leak-hero-job" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
      </defs>

      <circle
        className="mkt-hero__glow"
        cx="1400"
        cy="250"
        r="160"
        fill="url(#leak-hero-glow)"
        opacity=".85"
      />

      <path d={path} stroke="#3A948C" strokeWidth="2.2" opacity=".28" />
      <path
        className="mkt-hero__path"
        d={path}
        stroke="#057A72"
        strokeWidth="2.4"
        strokeDasharray="8 10"
      />
      {["0s", "1.6s", "3.2s"].map((delay) => (
        <circle
          key={delay}
          className="mkt-hero__packet"
          r="5"
          fill="#FFFDF4"
          stroke="#057A72"
          strokeWidth="1.4"
        >
          <animateMotion
            dur="4.8s"
            begin={delay}
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      ))}

      {leaks.map((leak) => (
        <g key={leak.tag} className="leak-hero__leak">
          <path
            d={leak.d}
            stroke="#B8743A"
            strokeWidth="1.6"
            strokeDasharray="3 5"
            opacity=".7"
          />
          <circle
            className="leak-hero__drop"
            r="3.6"
            fill="#B8743A"
            style={{ animationDelay: leak.delay }}
          >
            <animateMotion
              dur="2.7s"
              begin={leak.delay}
              repeatCount="indefinite"
              path={leak.d}
            />
          </circle>
          <rect
            x={leak.x - 66}
            y={leak.y - 13}
            width="132"
            height="26"
            rx="13"
            fill="#FFF6EC"
            stroke="#B8743A"
            strokeWidth="1.2"
          />
          <text
            x={leak.x}
            y={leak.y + 4}
            textAnchor="middle"
            fill="#8A4F1F"
            fontFamily="var(--font-outfit), sans-serif"
            fontSize="11"
            fontWeight="650"
          >
            {leak.tag}
          </text>
        </g>
      ))}

      {nodes.map((node) => (
        <g key={node.label}>
          <rect
            x={node.cx - 48}
            y={node.cy - 15}
            width="96"
            height="30"
            rx="9"
            fill="url(#leak-hero-node)"
            stroke="#057A72"
            strokeWidth="1.4"
          />
          <text
            x={node.cx}
            y={node.cy + 4}
            textAnchor="middle"
            fill="#057A72"
            fontFamily="var(--font-outfit), sans-serif"
            fontSize="11"
            fontWeight="650"
          >
            {node.label}
          </text>
        </g>
      ))}

      <g>
        <rect
          x={job.cx - 64}
          y={job.cy - 20}
          width="128"
          height="40"
          rx="12"
          fill="url(#leak-hero-job)"
        />
        <text
          x={job.cx}
          y={job.cy + 5}
          textAnchor="middle"
          fill="#F7FFFE"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="13"
          fontWeight="700"
        >
          {job.label}
        </text>
      </g>
    </svg>
  );
}

export function LeadLeakAuditSections() {
  return (
    <>
      <section className="mkt-hero leak-hero">
        <LeakHeroScene />
        <div className="shell">
          <div className="mkt-hero__content leak-hero__content">
            <p className="eyebrow">Lead leak audit</p>
            <h1 className="mkt-hero__headline">
              Find where your leads leak—and what each leak costs.
            </h1>
            <p className="mkt-hero__copy">
              A two-week, fixed-fee audit of everything between the click and
              the booked job: calls, forms, follow-up, tracking, and vendor
              reports. You get a leak map ranked in dollars, so you know what to
              fix first.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink className="button button-primary">
                Book a 30-minute scoping call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#contact">
                Contact us
              </a>
            </div>
            <ul className="mkt-hero__facts">
              <li>{formatUsd(AUDIT_FEE)} flat fee</li>
              <li>About 2 weeks</li>
              <li>A written leak map you keep</li>
            </ul>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#leak-path">
          Where leads leak
        </a>
      </section>

      <section className="section leak-path" id="leak-path">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">What we check</p>
              <h2 className="section-heading">
                The marketing worked. The lead still leaked.
              </h2>
            </div>
            <p className="section-copy">
              Five points between the first call and the booked job. None of
              these leaks get fixed by spending more.
            </p>
          </div>
          <ol className="leak-path__list reveal">
            {checkpoints.map((item, index) => (
              <li className="leak-path__item" key={item.title}>
                <span className="leak-path__marker" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p className="leak-path__detail">
                  <span className="leak-path__label leak-path__label--leak">
                    How it leaks
                  </span>
                  {item.leak}
                </p>
                <p className="leak-path__detail">
                  <span className="leak-path__label">What we check</span>
                  {item.check}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section leak-deliverable" id="deliverable">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">What you get</p>
              <h2 className="section-heading">
                A leak map, ranked by what it costs you.
              </h2>
            </div>
            <p className="section-copy">
              Not a deck of recommendations. A short list of what&apos;s broken,
              what it&apos;s worth, and who should fix it.
            </p>
          </div>

          <div className="leak-deliverable__layout reveal">
            <figure className="leak-map">
              <figcaption className="leak-map__head">
                <span className="leak-map__title">Leak map</span>
                <span className="leak-map__tag">Example</span>
              </figcaption>
              <table className="leak-map__table">
                <thead>
                  <tr>
                    <th scope="col">Leak</th>
                    <th scope="col">Cost / month</th>
                    <th scope="col">Who fixes it</th>
                  </tr>
                </thead>
                <tbody>
                  {leakMapRows.map((row, index) => (
                    <tr key={row.leak}>
                      <th scope="row">
                        <span className="leak-map__rank">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {row.leak}
                      </th>
                      <td>
                        <strong>{row.cost}</strong>
                        <span>{row.jobs}</span>
                      </td>
                      <td>{row.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="leak-map__note">
                Example numbers at a $4,500 average job, not a client result.
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

      <section className="section seo-flow leak-flow" id="how-it-works">
        <div className="shell">
          <div className="seo-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">Two weeks, start to finish.</h2>
            </div>
            <p className="section-copy">
              One scoping call, one audit, one review. {formatUsd(AUDIT_FEE)},
              flat.
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

      <section className="section leak-next" id="next">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">After the audit</p>
              <h2 className="section-heading">The map is yours. Two ways forward.</h2>
            </div>
            <p className="section-copy">
              The audit stands on its own. There&apos;s no obligation to keep
              working with us.
            </p>
          </div>
          <div className="engagement-compare leak-next__options reveal">
            <article className="engagement-compare__card">
              <p className="engagement-compare__label">Fix it yourself</p>
              <p className="engagement-compare__value">Hand it off</p>
              <p className="engagement-compare__note">
                Give the map to your team and vendors. Every leak comes with
                what&apos;s wrong, what it costs, and who should fix it.
              </p>
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
                We own the fixes, check they moved the number, and hold your
                vendors to the plan.
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
              {formatUsd(AUDIT_FEE)} flat, about two weeks, and the leak map
              is yours to keep.
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
