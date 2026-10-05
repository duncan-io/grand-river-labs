import Link from "next/link";
import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

const friction = [
  {
    title: "Leads shared with competitors",
    copy: "A bought lead gets sold to several companies at once. You're racing other people for a homeowner who already took three calls.",
  },
  {
    title: "Clicks that never become jobs",
    copy: "The search term is broad, the click is expensive, and the person never calls. The report still counts it as traffic.",
  },
  {
    title: "Spend outside the area you serve",
    copy: "The map is a vague circle. Clicks and leads arrive from towns you don't work, and the budget is gone by Thursday.",
  },
  {
    title: "Ads and the site telling different stories",
    copy: "The ad promises a call today. The page it opens is a homepage with no phone number above the fold.",
  },
];

const ways = [
  {
    title: "Local Services Ads strategy",
    lead: "A lead you own, at the top of Google, paid for when someone contacts you.",
    setup:
      "Whether LSA fits, what budget makes sense, which jobs to accept, and which leads to dispute.",
    outcome:
      "A plan for leads that are yours—not shared with four other companies, and not billed for a click.",
  },
  {
    title: "Local PPC strategy",
    lead: "Pay for the searches that can become a job, inside the area you actually serve.",
    setup:
      "Search terms, match types, and geo targeting reviewed against the spend you already make—and a list of what to pause.",
    outcome:
      "Fewer wasted clicks. The budget stays on the work you want, in the towns you cover.",
  },
  {
    title: "What a lead is worth",
    lead: "The useful number is what a contacted lead is worth if it becomes a job.",
    setup:
      "A comparison of what you pay now—shared leads, LSA, local search—against what actually turns into work.",
    outcome:
      "A decision you can defend. No flat cost-per-lead, and no push to spend more.",
  },
  {
    title: "The page and the phone path",
    lead: "A good click still dies if nobody can answer it.",
    setup:
      "The landing page, the call button, and where the lead goes after the tap—checked against the ad that bought the visit.",
    outcome:
      "The ad and the site tell the same story, and a new lead still gets a next step.",
  },
  {
    title: "Who runs the account",
    lead: "This is strategy and oversight, not day-to-day campaign management.",
    setup:
      "We set the rules—what to fund, test, pause, or dispute—and coordinate a specialist when someone else should run the account.",
    outcome:
      "One person accountable for the decision, without pretending to be the media buyer for every click.",
  },
];

const steps = [
  {
    title: "See what you pay now",
    copy: "We look at LSA, local search, and any shared leads—what you spend, what contacts you, and what turns into a job.",
  },
  {
    title: "Choose LSA, local PPC, or both",
    copy: "We say which one fits how you win work, and which spend should stop. Sometimes the answer is less, not another channel.",
  },
  {
    title: "Set the rules",
    copy: "Geography, the jobs you'll take, the terms worth bidding on, and what a bad lead looks like. Then someone can run the account without guessing.",
  },
  {
    title: "Review and cut",
    copy: "We come back to what contacted you and what didn't. Waste gets paused. What works stays. The budget doesn't grow by default.",
  },
];

function LocalAdsHeroScene() {
  return (
    <svg
      className="local-ads-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="local-ads-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="local-ads-panel" x1="988" y1="148" x2="1456" y2="748">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="local-ads-hero__glow"
        cx="1280"
        cy="220"
        r="160"
        fill="url(#local-ads-glow)"
        opacity=".85"
      />

      <g>
        <rect
          x="988"
          y="148"
          width="468"
          height="600"
          rx="22"
          fill="url(#local-ads-panel)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <circle cx="1016" cy="180" r="5" fill="#6FB8B0" />
        <circle cx="1034" cy="180" r="5" fill="#3A948C" />
        <circle cx="1052" cy="180" r="5" fill="#057A72" />
        <text
          x="1074"
          y="185"
          fill="#075752"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          SERVICE AREA
        </text>

        <circle
          cx="1168"
          cy="360"
          r="108"
          fill="#EAF7F4"
          stroke="#057A72"
          strokeWidth="1.4"
          strokeDasharray="4 6"
        />
        <circle cx="1168" cy="360" r="64" stroke="#3A948C" strokeWidth="1.2" opacity="0.7" />
        <path
          d="M1088 340h160M1128 292c28 40 28 96 0 136M1208 292c-28 40-28 96 0 136"
          stroke="#6FB8B0"
          strokeWidth="1.2"
          opacity="0.8"
        />
        <path
          d="M1168 332c-8 0-14 8-14 16 0 14 14 28 14 28s14-14 14-28c0-8-6-16-14-16Z"
          fill="#057A72"
        />
        <circle cx="1168" cy="346" r="4" fill="#FFFDF4" />

        <g transform="translate(1048 430)">
          <g className="local-ads-hero__lead">
            <rect
              width="196"
              height="78"
              rx="12"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <text
              x="16"
              y="28"
              fill="#3A948C"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.08em"
            >
              NEW LEAD
            </text>
            <text
              x="16"
              y="52"
              fill="#075752"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="14"
              fontWeight="700"
            >
              Yours — not shared
            </text>
          </g>
        </g>

        <g transform="translate(1268 268)">
          <text
            x="0"
            y="0"
            fill="#075752"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            SEARCH TERMS
          </text>
          <rect y="16" width="160" height="36" rx="8" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.2" />
          <text
            x="12"
            y="39"
            fill="#075752"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="12"
            fontWeight="650"
          >
            service, your city
          </text>
          <g className="local-ads-hero__waste">
            <rect y="62" width="160" height="36" rx="8" fill="#FFFDF4" stroke="#6FB8B0" strokeWidth="1.2" />
            <text
              x="12"
              y="85"
              fill="#6FB8B0"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="650"
            >
              jobs, any city
            </text>
            <path
              d="M12 78h136"
              stroke="#057A72"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>
        </g>

        <g transform="translate(1020 620)">
          <g className="local-ads-hero__per-lead">
            <rect width="150" height="36" rx="18" fill="#057A72" />
            <text
              x="75"
              y="23"
              textAnchor="middle"
              fill="#FFFDF4"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              Pay per lead
            </text>
          </g>
          <g className="local-ads-hero__per-click" transform="translate(166 0)">
            <rect width="150" height="36" rx="18" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.3" />
            <text
              x="75"
              y="23"
              textAnchor="middle"
              fill="#075752"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12"
              fontWeight="700"
            >
              Pay per click
            </text>
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

export function LocalAdsSections() {
  return (
    <>
      <section className="local-ads-hero">
        <div className="local-ads-hero__scene-wrap">
          <LocalAdsHeroScene />
        </div>
        <div className="shell">
          <div className="local-ads-hero__content">
            <p className="eyebrow">Local ads</p>
            <h1 className="local-ads-hero__headline">
              Spend on leads you can own.
            </h1>
            <p className="local-ads-hero__copy">
              Google Local Services Ads and local PPC—strategy for what to
              fund, pause, or dispute. Not a bigger budget, and not day-to-day
              campaign management.
            </p>
            <div className="local-ads-hero__actions">
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
        <a className="local-ads-hero__cue" href="#friction">
          Where local spend leaks
        </a>
      </section>

      <section className="section local-ads-friction" id="friction">
        <div className="shell">
          <div className="local-ads-friction__top reveal">
            <div>
              <p className="eyebrow">The leak</p>
              <h2 className="section-heading">
                Local spend leaks before it becomes a job.
              </h2>
            </div>
            <p className="section-copy">
              The problem usually isn&apos;t a missing channel. It&apos;s leads
              you don&apos;t own, clicks outside the area you serve, and a page
              that doesn&apos;t match the ad.
            </p>
          </div>
          <div className="local-ads-friction__grid reveal">
            {friction.map((item, index) => (
              <article className="local-ads-friction__cell" key={item.title}>
                <span className="local-ads-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section local-ads-ways" id="ways">
        <div className="shell">
          <div className="local-ads-ways__top reveal">
            <div>
              <p className="eyebrow">What&apos;s covered</p>
              <h2 className="section-heading">Google LSA and local PPC.</h2>
            </div>
            <p className="section-copy">
              Two ways to buy local demand. We decide which one fits, what to
              cut, and who should run the account.
            </p>
          </div>
          <div className="local-ads-ways__grid reveal">
            {ways.map((item, index) => (
              <article className="local-ads-way" key={item.title}>
                <span className="local-ads-way__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p className="local-ads-way__lead">{item.lead}</p>
                <p className="local-ads-way__setup">
                  <span className="local-ads-way__label">What we do</span>
                  {item.setup}
                </p>
                <p className="local-ads-way__outcome">
                  <span className="local-ads-way__label">You get</span>
                  {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section local-ads-flow" id="how-it-works">
        <div className="shell">
          <div className="local-ads-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                Strategy first. Someone else can click publish.
              </h2>
            </div>
            <p className="section-copy">
              This is not day-to-day campaign management.{" "}
              <Link href="/analytics">Analytics</Link> shows whether the spend
              turns into calls.{" "}
              <Link href="/website-strategy">The website</Link> is the page the
              click lands on.
            </p>
          </div>
          <ol className="local-ads-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="local-ads-flow__step" key={step.title}>
                {index > 0 ? (
                  <span className="local-ads-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="local-ads-flow__connector-line"
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
                <span className="local-ads-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Part of the bigger picture</span>
            Local ads are one lever. Whether more spend is the right move
            depends on the site, the routing, and everything else—that&apos;s
            what the{" "}
            <Link href="/fractional-digital-department">
              Fractional Digital Department
            </Link>{" "}
            figures out.
          </p>
        </div>
      </section>
    </>
  );
}

export function LocalAdsCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s look at what the spend is buying.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us how leads find you today. We&apos;ll map LSA, local search,
            and what&apos;s worth cutting before anyone adds budget.
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
            <Link className="button button-secondary" href="/fractional-digital-department">
              See the whole picture
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
