import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

const friction = [
  {
    title: "Numbers nobody trusts",
    copy: "Dashboards disagree. Marketing counts one story, sales another, and the weekly report takes half a day to reconcile by hand.",
  },
  {
    title: "Tags without a system",
    copy: "Pixels and scripts pile up. GTM becomes a junk drawer. Nobody knows what’s firing—or what breaks when a page ships.",
  },
  {
    title: "Events that don’t mean anything",
    copy: "Clicks and page views fill the charts. The outcomes that matter—quotes, bookings, qualified leads—aren’t tracked cleanly.",
  },
  {
    title: "Attribution guesswork",
    copy: "UTMs are inconsistent. Source paths break across tools. Spend and pipeline decisions rest on gut feel dressed up as data.",
  },
];

const ways = [
  {
    title: "GA4",
    lead: "Measurement that leaders can trust, not a default install left on auto.",
    setup:
      "GA4 properties, conversions, and reporting shaped to how your business actually works.",
    outcome:
      "Reporting that answers real questions—shared by marketing, sales, and leadership.",
  },
  {
    title: "Google Tag Manager",
    lead: "Clean tag management beats another temporary script that stays forever.",
    setup:
      "Containers, naming, and publishing habits under clear governance.",
    outcome:
      "Marketing and engineering can ship without fearing what breaks.",
  },
  {
    title: "Event tracking",
    lead: "Every event earns its place in the plan.",
    setup:
      "Events tied to outcomes—form submits, booking starts, key content engagement.",
    outcome: "Progress toward revenue, not vanity traffic filling the charts.",
  },
  {
    title: "Attribution",
    lead: "Know what earned the conversation—not archaeology every Monday.",
    setup:
      "Consistent UTMs, cleaner handoffs, and source paths across channels and CRM.",
    outcome:
      "Reporting that supports spend and pipeline decisions with confidence.",
  },
];

const steps = [
  {
    title: "Discover",
    copy: "We map what you need to measure, what fires today, and where trust in the numbers breaks—then prioritize the gaps that block decisions.",
  },
  {
    title: "Instrument",
    copy: "We configure GA4, GTM, and the events that matter, with documentation your team can follow when something changes.",
  },
  {
    title: "Validate & refine",
    copy: "We verify tracking in the wild, fix what’s noisy or missing, and leave you with attribution and reports people actually use.",
  },
];

/** One seamless tile: net rise of `rise` over `segmentWidth`, with sharp local zigzags. */
const TREND_SEGMENT_WIDTH = 900;
const TREND_RISE = 150;
const TREND_BASE_Y = 640;
const TREND_SEGMENTS = 5;
const TREND_DURATION = "12s";
/**
 * Signed step deltas (SVG y decreases = up). Must sum to TREND_RISE.
 * Negative values are short pullbacks so the line reads as a sharp zigzag.
 */
const TREND_CLIMBS = [30, -12, 36, -10, 28, -14, 40, -8, 24, -12, 32, -8, 24];

function buildTrendPoints() {
  const steps = TREND_CLIMBS.length;
  const stepX = TREND_SEGMENT_WIDTH / steps;
  const points: { x: number; y: number }[] = [];

  for (let seg = 0; seg < TREND_SEGMENTS; seg++) {
    let y = TREND_BASE_Y - seg * TREND_RISE;
    for (let i = 0; i <= steps; i++) {
      const x = seg * TREND_SEGMENT_WIDTH + i * stepX;
      if (!(seg > 0 && i === 0)) {
        points.push({ x, y });
      }
      if (i < steps) y -= TREND_CLIMBS[i];
    }
  }

  return points;
}

function pointsToLinePath(points: { x: number; y: number }[]) {
  return points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`,
    )
    .join(" ");
}

function pointsToAreaPath(points: { x: number; y: number }[], floorY: number) {
  const line = pointsToLinePath(points);
  const last = points[points.length - 1];
  const first = points[0];
  return `${line} L${last.x.toFixed(1)} ${floorY} L${first.x.toFixed(1)} ${floorY} Z`;
}

function AnalyticsScene() {
  const points = buildTrendPoints();
  const linePath = pointsToLinePath(points);
  const areaPath = pointsToAreaPath(points, 980);

  return (
    <svg
      className="analytics-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="analytics-glow" x1="1100" y1="100" x2="1500" y2="480">
          <stop stopColor="#FFFDF4" stopOpacity=".88" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".18" />
        </linearGradient>
        <linearGradient
          id="analytics-trend-stroke"
          x1="0"
          y1="0"
          x2="1600"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3A948C" stopOpacity=".45" />
          <stop offset=".5" stopColor="#057A72" stopOpacity=".95" />
          <stop offset="1" stopColor="#024E49" stopOpacity="1" />
        </linearGradient>
        <linearGradient
          id="analytics-trend-fill"
          x1="0"
          y1="200"
          x2="0"
          y2="900"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#057A72" stopOpacity=".22" />
          <stop offset=".55" stopColor="#6FB8B0" stopOpacity=".1" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity="0" />
        </linearGradient>
        <clipPath id="analytics-trend-clip">
          <rect x="0" y="0" width="1600" height="900" />
        </clipPath>
      </defs>

      <circle
        className="analytics-hero__glow"
        cx="1280"
        cy="220"
        r="150"
        fill="url(#analytics-glow)"
        opacity=".85"
      />

      <g clipPath="url(#analytics-trend-clip)">
        <g className="analytics-hero__trend">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={`${-TREND_SEGMENT_WIDTH} ${TREND_RISE}`}
            dur={TREND_DURATION}
            repeatCount="indefinite"
          />
          <path
            className="analytics-hero__trend-area"
            d={areaPath}
            fill="url(#analytics-trend-fill)"
          />
          <path
            className="analytics-hero__trend-line"
            d={linePath}
            stroke="url(#analytics-trend-stroke)"
            strokeWidth="3.25"
            strokeLinecap="round"
            strokeLinejoin="miter"
            strokeMiterlimit={3}
          />
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
      <section className="analytics-hero">
        <div className="analytics-hero__scene-wrap">
          <AnalyticsScene />
        </div>
        <div className="shell">
          <div className="analytics-hero__content">
            <p className="eyebrow">Analytics</p>
            <h1 className="analytics-hero__headline">
              Measurement you can make decisions on.
            </h1>
            <p className="analytics-hero__copy">
              GA4, Tag Manager, event tracking, and attribution—set up so
              marketing, sales, and leadership share one trustworthy story of
              what&apos;s working.
            </p>
            <div className="analytics-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#ways">
                See what&apos;s covered
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="analytics-hero__cue" href="#friction">
          Where trust breaks
        </a>
      </section>

      <section className="section analytics-friction" id="friction">
        <div className="shell">
          <div className="analytics-friction__top reveal">
            <div>
              <p className="eyebrow">The drag</p>
              <h2 className="section-heading">
                Where analytics stops earning trust.
              </h2>
            </div>
            <p className="section-copy">
              The tools are usually already there. What&apos;s missing is a
              clean measurement system—and events that map to outcomes, not
              noise.
            </p>
          </div>
          <div className="analytics-friction__list reveal">
            {friction.map((item, index) => (
              <article className="analytics-friction__row" key={item.title}>
                <span className="analytics-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
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
              <h2 className="section-heading">Ways we help analytics.</h2>
            </div>
            <p className="section-copy">
              We build the stack you need to see, trust, and act—without
              drowning the team in tags and dashboards nobody believes.
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
                  <span className="analytics-way__label">What we set up</span>
                  {item.setup}
                </p>
                <p className="analytics-way__outcome">
                  <span className="analytics-way__label">You get</span>
                  {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section analytics-flow" id="how-it-fits">
        <div className="shell">
          <div className="analytics-flow__top reveal">
            <div>
              <p className="eyebrow">How it fits</p>
              <h2 className="section-heading">
                Instrument once. Decide with confidence.
              </h2>
            </div>
            <p className="section-copy">
              We start from the questions you need answered, wire the stack
              cleanly, and validate until the numbers match reality.
            </p>
          </div>
          <ol className="analytics-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="analytics-flow__step" key={step.title}>
                {index > 0 ? (
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
    </>
  );
}

export function AnalyticsCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s get measurement you can trust.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us what you need to see. We&apos;ll map a practical path across
            GA4, Tag Manager, events, and attribution.
          </p>
          <div className="use-cases-cta__buttons">
            <a
              className="button button-primary"
              href={BOOK_CALL_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
              <Arrow />
            </a>
            <a className="button button-secondary" href="/website-strategy">
              See fractional website department
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
