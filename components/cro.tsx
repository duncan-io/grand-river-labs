import { BookCallLink } from "./book-call-link";
import Link from "next/link";
import { renderInline } from "@/components/inline-links";
import { AUDIT_FEE, DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import { Arrow } from "./site-header";

const friction = [
  {
    title: "Traffic that doesn't call",
    copy: "The report shows visits. The phone stays quiet. People find the site, look around, and call whichever company made the next step easier.",
  },
  {
    title: "A number you can't tap",
    copy: "The phone number sits in an image, the footer, or a desktop-only header. On a phone, calling takes three steps, and [nobody tracks the calls](/analytics) that do come in.",
  },
  {
    title: "Quote forms that lose people",
    copy: "Twelve fields, a CAPTCHA, and a submit button below the fold. Homeowners who were ready to book give up at the last step.",
  },
  {
    title: "Changes based on opinion",
    copy: "The homepage gets redesigned because someone has a feeling. Nothing is measured, so the next version is another guess.",
  },
];

const ways = [
  {
    title: "Drop-off review",
    lead: "See where the path from visit to call actually breaks.",
    setup:
      "A walk through the pages, devices, and steps between the click and the call, building on the [lead leak audit](/lead-leak-audit) if you've had one.",
    outcome:
      "A short list of the changes worth making first, not a fifty-point critique.",
  },
  {
    title: "Mobile call path",
    lead: "Most visits happen on a phone. Calling should take one tap.",
    setup:
      "Tap-to-call above the fold, a call button that stays in reach, and [call tracking](/analytics) that tells site calls apart from map and ad calls.",
    outcome: "More calls from the same visits, and a count you can trust.",
  },
  {
    title: "Quote forms and booking",
    lead: "The last step should be the easiest one.",
    setup:
      "Fewer fields, clearer labels, booking that doesn't make people start over, and every request [routed to a person](/marketing-automation) while it's warm.",
    outcome:
      "More of the homeowners who meant to ask for a quote actually finish.",
  },
  {
    title: "Service and ad landing pages",
    lead: "The page should match the search or the ad that brought someone in.",
    setup:
      "Service pages and [ad landing pages](/local-ads) with one job: a clear headline, proof like reviews and project photos, and one next step.",
    outcome:
      "Ad spend lands on a page built to convert, not the generic homepage.",
  },
  {
    title: "A/B testing, sized to your traffic",
    lead: "Test when the traffic can settle it. Measure when it can't.",
    setup:
      "Head-to-head tests on headlines, call buttons, and forms where there's enough traffic. Most home services sites can't support multivariate tests, so smaller changes get measured before and after.",
    outcome: "A winner you can keep, and a record of what you tried.",
  },
];

const steps = [
  {
    title: "Measure",
    copy: "We check where visitors arrive, stall, and leave, and whether calls and forms are tracked well enough to judge a change. If the numbers aren't trustworthy, that gets fixed first.",
  },
  {
    title: "Hypothesize",
    copy: "We pick the few changes most likely to turn a visit into a call or a quote request, and write down what we expect before anything ships.",
  },
  {
    title: "Test and ship",
    copy: "We change the call path, forms, page hierarchy, or a landing page, and run a proper test when there's enough traffic to learn from.",
  },
  {
    title: "Learn and repeat",
    copy: "We keep what moved calls and booked jobs, drop what didn't, and take the next change from evidence rather than the loudest opinion.",
  },
];

export const faqs = [
  {
    question: "What is conversion rate optimization?",
    answer:
      "Conversion rate optimization (CRO) is the work of getting more of the people who already visit your site to take the next step. For a home services company, that's usually a phone call, a quote request, or a booked estimate. It means finding where visitors drop off, changing the page, call path, or form, and measuring whether the change helped.",
  },
  {
    question: "What's a good conversion rate for a home services website?",
    answer:
      "It depends on where the traffic comes from. Someone who clicked an emergency ad behaves very differently from someone reading a blog post, so one industry average doesn't tell you much. We measure your own baseline by source and page, counting calls as well as forms. Most sites undercount calls and look worse than they are.",
  },
  {
    question: "Do we have enough traffic to A/B test?",
    answer:
      "Maybe not, and that's fine. A real A/B test needs enough calls and form fills to tell a winner from noise. When a page doesn't have that, we make the change most likely to help and measure before and after. Proper tests go on the pages with the most traffic, usually the ones your ads point to.",
  },
  {
    question: "Do you redesign our website?",
    answer:
      "No. We work on the site you already have, alongside your web vendor if you have one. Most gains come from the call path, the quote form, and a few key pages, not a new site. If a rebuild really is the answer, we'll say so and help you brief it.",
  },
  {
    question: "How do you count phone calls?",
    answer:
      "With [call tracking](/analytics) that separates calls from the website, your Google Business Profile, and your ads, tied back to the page and campaign that produced them. Without it, a site can look like it isn't working while the phone is actually ringing.",
  },
  {
    question: "How much does conversion rate optimization cost?",
    answer: `CRO is part of the [fractional marketing director](/fractional-marketing-director) engagement, starting at ${formatUsd(DIRECTOR_MONTHLY)}/month, rather than a separate project fee. Many clients start with the ${formatUsd(AUDIT_FEE)} [lead leak audit](/lead-leak-audit).`,
  },
  {
    question: "How long before we see results?",
    answer:
      "The first fixes, usually the call path and the main quote form, ship in the first month or two. Tests take longer, depending on traffic. You see what moved in the monthly scorecard, measured in calls and booked jobs rather than clicks.",
  },
];

const FUNNEL_CX = 1198;

const stages = [
  { id: "visit", label: "Visit", y: 248, width: 364, fill: "#075752" },
  {
    id: "engage",
    label: "Call tap or form start",
    y: 344,
    width: 304,
    fill: "#057A72",
    lift: "+12%",
  },
  {
    id: "form",
    label: "Lead",
    y: 440,
    width: 236,
    fill: "#3A948C",
    lift: "+19%",
  },
  {
    id: "inquiry",
    label: "Booked job",
    y: 536,
    width: 168,
    fill: "#024E49",
    lift: "+8%",
  },
] as const;

function LiftMark({ label }: { label: string }) {
  return (
    <g className="cro-hero__lift">
      <rect
        x="-34"
        y="-13"
        width="68"
        height="26"
        rx="13"
        fill="#FFFDF4"
        stroke="#057A72"
        strokeWidth="1.4"
      />
      <path
        d="M-18 3.5v-8M-21.2 -1.6 -18 -4.8 -14.8 -1.6"
        stroke="#057A72"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="8"
        y="4"
        textAnchor="middle"
        fill="#075752"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="11"
        fontWeight="700"
      >
        {label}
      </text>
    </g>
  );
}

function CroHeroScene() {
  return (
    <svg
      className="cro-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="cro-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="cro-panel" x1="968" y1="150" x2="1420" y2="720">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="cro-hero__glow"
        cx="1320"
        cy="240"
        r="160"
        fill="url(#cro-glow)"
        opacity=".85"
      />

      <g className="cro-hero__board">
        <rect
          x="968"
          y="156"
          width="452"
          height="560"
          rx="22"
          fill="url(#cro-panel)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <circle cx="996" cy="188" r="5" fill="#6FB8B0" />
        <circle cx="1014" cy="188" r="5" fill="#3A948C" />
        <circle className="cro-hero__live" cx="1032" cy="188" r="5" fill="#057A72" />
        <text
          x="1054"
          y="193"
          fill="#075752"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          EXAMPLE FUNNEL
        </text>

        {stages.map((stage) => {
          const x = FUNNEL_CX - stage.width / 2;
          return (
            <g key={stage.id}>
              <text
                x={FUNNEL_CX}
                y={stage.y - 12}
                textAnchor="middle"
                fill="#075752"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="12"
                fontWeight="700"
                letterSpacing="0.06em"
              >
                {stage.label.toUpperCase()}
              </text>
              <rect
                x={x}
                y={stage.y}
                width={stage.width}
                height="58"
                rx="10"
                fill="#FFFDF4"
                stroke="#057A72"
                strokeWidth="1.2"
                opacity="0.55"
              />
              <rect
                className={
                  stage.id === "visit" ? undefined : `cro-hero__bar cro-hero__bar--${stage.id}`
                }
                x={x}
                y={stage.y}
                width={stage.width}
                height="58"
                rx="10"
                fill={stage.fill}
              />
              {"lift" in stage ? (
                <g
                  transform={`translate(${x + stage.width - 28} ${stage.y + 29})`}
                >
                  <LiftMark label={stage.lift} />
                </g>
              ) : null}
            </g>
          );
        })}

        <g transform="translate(996 612)">
          <g className="cro-hero__variant">
          <rect
            width="396"
            height="80"
            rx="14"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.4"
          />
          <text
            x="18"
            y="28"
            fill="#3A948C"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            EXAMPLE · QUOTE FORM TEST
          </text>
          <text
            x="18"
            y="56"
            fill="#6FB8B0"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="13"
            fontWeight="650"
          >
            A 2.1%
          </text>
          <rect x="78" y="46" width="64" height="8" rx="4" fill="#B0E4DC" />
          <text
            x="214"
            y="56"
            fill="#057A72"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="13"
            fontWeight="700"
          >
            B 4.8%
          </text>
          <rect x="274" y="46" width="104" height="8" rx="4" fill="#057A72" />
          </g>
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

export function CroSections() {
  return (
    <>
      <section className="mkt-hero cro-hero">
        <div className="cro-hero__scene-wrap">
          <CroHeroScene />
        </div>
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Conversion rate optimization · Home services</p>
            <h1 className="mkt-hero__headline">
              More calls and quote requests from the traffic you already pay
              for.
            </h1>
            <p className="mkt-hero__copy">
              Conversion rate optimization for home services: the phone number
              one tap away, a quote form people finish, and pages that match the
              click. On the site you already have.
            </p>
            <div className="mkt-hero__actions">
              <BookCallLink className="button button-primary">
                Book a 30-minute call
                <Arrow />
              </BookCallLink>
              <a className="button button-secondary" href="#ways">
                See what we change
              </a>
            </div>
            <ul className="mkt-hero__facts">
              <li>Phone calls counted, not just forms</li>
              <li>Tests sized to your traffic</li>
              <li>Part of the fractional marketing director engagement</li>
            </ul>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#friction">
          Where visitors drop off
        </a>
      </section>

      <section className="section cro-friction" id="friction">
        <div className="shell">
          <div className="cro-friction__top reveal">
            <div>
              <p className="eyebrow">The leak</p>
              <h2 className="section-heading">
                The traffic is there. The calls aren&apos;t.
              </h2>
            </div>
            <p className="section-copy">
              Most home services sites don&apos;t need more visitors first. They
              need a path that makes calling or asking for a quote the obvious
              next step, and a way to know whether a change helped.
            </p>
          </div>
          <div className="cro-friction__grid reveal">
            {friction.map((item, index) => (
              <article className="cro-friction__cell" key={item.title}>
                <span className="cro-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cro-ways" id="ways">
        <div className="shell">
          <div className="cro-ways__top reveal">
            <div>
              <p className="eyebrow">What&apos;s covered</p>
              <h2 className="section-heading">What we change on your site.</h2>
            </div>
            <p className="section-copy">
              Conversion work on the pages, forms, and call paths you already
              have. Not a redesign for its own sake.
            </p>
          </div>
          <div className="cro-ways__grid reveal">
            {ways.map((item, index) => (
              <article className="cro-way" key={item.title}>
                <span className="cro-way__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p className="cro-way__lead">{item.lead}</p>
                <p className="cro-way__setup">
                  <span className="cro-way__label">What we do</span>
                  {renderInline(item.setup)}
                </p>
                <p className="cro-way__outcome">
                  <span className="cro-way__label">You get</span>
                  {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cro-flow" id="how-it-works">
        <div className="shell">
          <div className="cro-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                A loop, not a one-time redesign.
              </h2>
            </div>
            <p className="section-copy">
              CRO only works if calls and forms are counted. We start from the
              drop-off you can already see, and when the numbers aren&apos;t
              trustworthy yet, we fix the{" "}
              <Link href="/analytics">tracking</Link> first.
            </p>
          </div>
          <ol className="cro-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="cro-flow__step" key={step.title}>
                {index > 0 ? (
                  <span className="cro-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="cro-flow__connector-line"
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
                <span className="cro-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section leak-next cro-next" id="next">
        <div className="shell">
          <div className="services__top reveal">
            <div>
              <p className="eyebrow">Where CRO fits</p>
              <h2 className="section-heading">
                Part of the engagement, not a one-off project.
              </h2>
            </div>
            <p className="section-copy">
              Conversion is one lever. Whether it&apos;s the right one to pull
              first depends on where the leads are actually leaking.
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
                by what each leak costs. The right first step if you&apos;re not
                sure conversion is the problem.
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
                CRO is part of the hands-on work. We ship the changes, check they
                moved calls and booked jobs, and keep going month after month.
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
              Calls counted, tests sized to your traffic, and changes made on the
              site you already have.
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
