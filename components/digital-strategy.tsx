import type { CSSProperties } from "react";
import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

const strategyGaps = [
  {
    title: "Every channel wants the budget",
    copy: "Paid search, SEO, email, social, and the website all make a reasonable case. Without a shared decision framework, the loudest request wins.",
  },
  {
    title: "Activity is mistaken for progress",
    copy: "Campaigns keep shipping and calendars stay full, but nobody can clearly connect the work to the business goal it is meant to move.",
  },
  {
    title: "Measurement tells different stories",
    copy: "Platform dashboards claim credit in isolation. The team sees clicks and impressions, while leadership still cannot see what created demand or revenue.",
  },
  {
    title: "Priorities change with the week",
    copy: "A competitor launches, a trend spikes, or a tactic underperforms. The plan resets before useful work has enough time to compound.",
  },
];

const advisoryAreas = [
  {
    label: "Website",
    title: "Website strategy",
    copy: "Clarify the site’s job in the customer journey, the pages it needs, and which improvements will make the biggest commercial difference.",
  },
  {
    label: "Paid",
    title: "PPC & paid media",
    copy: "Decide where paid acquisition can create efficient demand, what to test, and when the economics say to scale—or stop.",
  },
  {
    label: "Search",
    title: "SEO & content",
    copy: "Find the search opportunities worth earning, shape a useful content system, and connect visibility to the offers that matter.",
  },
  {
    label: "Lifecycle",
    title: "Email & retention",
    copy: "Map the messages that should nurture, convert, onboard, and retain customers without turning every send into another promotion.",
  },
  {
    label: "Social",
    title: "Social media",
    copy: "Choose the audiences, platforms, and publishing rhythm that fit the business—without forcing a presence everywhere.",
  },
  {
    label: "Measure",
    title: "Analytics & marketing operations",
    copy: "Define the signals, reporting, tools, and handoffs needed to learn what is working and make the next decision with confidence.",
  },
];

const startingPoints = [
  {
    title: "Already investing in marketing?",
    copy: "We audit the goals, channel mix, customer journey, measurement, and team capacity you have—then stay with you to strengthen, pause, or stop what no longer earns its place.",
  },
  {
    title: "Building the plan from scratch?",
    copy: "We turn your goals, audience, offer, budget, and constraints into a focused starting strategy—then keep refining the sequence as you learn and grow.",
  },
];

const channels = [
  "Website",
  "PPC",
  "SEO",
  "Email",
  "Social media",
  "Content",
  "Analytics",
  "Marketing automation",
] as const;

const GAP_CYCLE = "10s";
const SCORECARD_CYCLE = "12s";

function cycleStyle(duration: string) {
  return { "--dsc-cycle": duration } as CSSProperties;
}

function RisingSpendScene() {
  const bars = [
    { label: "Paid", peak: 0.94 },
    { label: "SEO", peak: 0.78 },
    { label: "Email", peak: 0.86 },
    { label: "Social", peak: 0.98 },
  ];
  const barMax = 148;
  const barWidth = 30;
  const barBaseY = 218;
  const barStartX = 36;
  const barGap = 44;
  const gauge = { x: 318, y: 162 };

  return (
    <svg
      className="dsc-gap__scene"
      aria-hidden="true"
      viewBox="0 0 420 280"
      fill="none"
      style={cycleStyle(GAP_CYCLE)}
    >
      <defs>
        <linearGradient id="dsc-gap-panel" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
        <linearGradient id="dsc-gap-bar" x1="0" y1="1" x2="0" y2="0">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <linearGradient id="dsc-gap-gauge" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFFDF4" />
          <stop offset="1" stopColor="#B0E4DC" />
        </linearGradient>
      </defs>

      <text
        x="210"
        y="19"
        textAnchor="middle"
        fill="#5F7976"
        fontFamily="var(--font-outfit), sans-serif"
        fontSize="8.5"
        fontWeight="650"
        letterSpacing=".06em"
      >
        MORE INPUT · SAME OUTCOME
      </text>

      <rect
        x="14"
        y="34"
        width="208"
        height="228"
        rx="16"
        fill="url(#dsc-gap-panel)"
        stroke="#057A72"
        strokeWidth="1.4"
      />
      <text
        x="28"
        y="56"
        fill="#075752"
        fontFamily="var(--font-outfit), sans-serif"
        fontSize="9"
        fontWeight="750"
        letterSpacing=".1em"
      >
        CHANNEL SPEND
      </text>
      <path d="M28 66h180" stroke="#6FB8B0" strokeWidth="1" opacity=".35" />

      {[0.25, 0.5, 0.75, 1].map((ratio) => {
        const y = barBaseY - barMax * ratio;
        return (
          <path
            key={ratio}
            d={`M32 ${y}h172`}
            stroke="#6FB8B0"
            strokeWidth="1"
            strokeDasharray="3 6"
            opacity=".28"
          />
        );
      })}

      {bars.map((bar, index) => {
        const x = barStartX + index * barGap;
        return (
          <g key={bar.label}>
            <rect
              x={x}
              y={barBaseY - barMax}
              width={barWidth}
              height={barMax}
              rx="6"
              fill="#CCEBE5"
              opacity=".45"
            />
            <rect
              className={`dsc-gap__bar dsc-gap__bar--${index + 1}`}
              x={x}
              y={barBaseY - barMax}
              width={barWidth}
              height={barMax}
              rx="6"
              fill="url(#dsc-gap-bar)"
              style={{ "--dsc-bar-peak": String(bar.peak) } as CSSProperties}
            />
            <text
              x={x + barWidth / 2}
              y={barBaseY + 16}
              textAnchor="middle"
              fill="#5F7976"
              fontFamily="var(--font-outfit), sans-serif"
              fontSize="8"
              fontWeight="650"
            >
              {bar.label}
            </text>
          </g>
        );
      })}

      <g transform={`translate(${gauge.x} ${gauge.y})`}>
        <circle
          r="78"
          fill="url(#dsc-gap-gauge)"
          stroke="#057A72"
          strokeWidth="1.5"
        />
        <text
          y="-52"
          textAnchor="middle"
          fill="#075752"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="8.5"
          fontWeight="750"
          letterSpacing=".08em"
        >
          BUSINESS RESULT
        </text>
        <path
          d="M-52 18 A58 58 0 0 1 52 18"
          stroke="#6FB8B0"
          strokeWidth="8"
          strokeLinecap="round"
          opacity=".35"
        />
        <path
          d="M-52 18 A58 58 0 0 1 -28 -42"
          stroke="#057A72"
          strokeWidth="8"
          strokeLinecap="round"
          opacity=".22"
        />
        {[
          { angle: -150, label: "Low" },
          { angle: -90, label: "" },
          { angle: -30, label: "High" },
        ].map((tick) => {
          const rad = (tick.angle * Math.PI) / 180;
          const inner = 48;
          const outer = 58;
          const x1 = Math.cos(rad) * inner;
          const y1 = Math.sin(rad) * inner;
          const x2 = Math.cos(rad) * outer;
          const y2 = Math.sin(rad) * outer;
          const labelR = 68;
          return (
            <g key={tick.angle}>
              <path
                d={`M${x1} ${y1}L${x2} ${y2}`}
                stroke="#057A72"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity=".55"
              />
              {tick.label ? (
                <text
                  x={Math.cos(rad) * labelR}
                  y={Math.sin(rad) * labelR + 3}
                  textAnchor="middle"
                  fill="#5F7976"
                  fontFamily="var(--font-outfit), sans-serif"
                  fontSize="7.5"
                  fontWeight="650"
                >
                  {tick.label}
                </text>
              ) : null}
            </g>
          );
        })}
        <g className="dsc-gap__needle">
          <path
            d="M0 8 L-3.5 -38 L0 -48 L3.5 -38 Z"
            fill="#057A72"
          />
          <circle r="7" fill="#F7FFFE" stroke="#057A72" strokeWidth="1.6" />
          <circle r="2.5" fill="#057A72" />
        </g>
        <text
          y="48"
          textAnchor="middle"
          fill="#5F7976"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="8"
          fontWeight="650"
        >
          No lift
        </text>
      </g>
    </svg>
  );
}

function PrioritizationScene() {
  const columns = [
    { label: "WEBSITE", x: 182 },
    { label: "PPC", x: 272 },
    { label: "SEO", x: 362 },
  ];
  const criteria = [
    { label: "Goal fit", scores: [3, 2, 2] },
    { label: "Evidence", scores: [3, 1, 2] },
    { label: "Effort", scores: [3, 2, 1] },
    { label: "Economics", scores: [3, 1, 2] },
  ];

  return (
    <svg
      className="dsc-services__scene"
      aria-hidden="true"
      viewBox="0 0 420 280"
      fill="none"
      style={cycleStyle(SCORECARD_CYCLE)}
    >
      <defs>
        <linearGradient id="dsc-scorecard" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <rect
        x="10"
        y="14"
        width="400"
        height="252"
        rx="18"
        fill="url(#dsc-scorecard)"
        stroke="#057A72"
        strokeWidth="1.5"
      />
      <text
        x="28"
        y="41"
        fill="#075752"
        fontFamily="var(--font-outfit), sans-serif"
        fontSize="10"
        fontWeight="750"
        letterSpacing=".1em"
      >
        EXAMPLE DECISION SCORECARD
      </text>

      <rect
        className="dsc-scorecard__winner-column"
        x="146"
        y="54"
        width="72"
        height="164"
        rx="10"
        fill="#B0E4DC"
        opacity=".2"
        stroke="#057A72"
        strokeWidth="1.2"
      />

      {columns.map((column) => (
        <text
          key={column.label}
          x={column.x}
          y="70"
          textAnchor="middle"
          fill="#075752"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="8.5"
          fontWeight="750"
          letterSpacing=".05em"
        >
          {column.label}
        </text>
      ))}

      {criteria.map((criterion, rowIndex) => (
        <g
          className={`dsc-scorecard__row dsc-scorecard__row--${rowIndex + 1}`}
          key={criterion.label}
          transform={`translate(0 ${91 + rowIndex * 34})`}
        >
          <text
            x="28"
            y="4"
            fill="#075752"
            fontFamily="var(--font-outfit), sans-serif"
            fontSize="9.5"
            fontWeight="650"
          >
            {criterion.label}
          </text>
          <path d="M110 13h280" stroke="#6FB8B0" strokeWidth="1" opacity=".28" />
          {criterion.scores.map((score, columnIndex) => (
            <g
              key={`${criterion.label}-${columns[columnIndex]?.label}`}
              transform={`translate(${columns[columnIndex]?.x ?? 0} 0)`}
            >
              <rect
                x="-30"
                y="-10"
                width="60"
                height="20"
                rx="6"
                fill="#FFFFFF"
                opacity=".78"
              />
              {[0, 1, 2].map((dot) => (
                <circle
                  key={dot}
                  cx={-12 + dot * 12}
                  cy="0"
                  r="3.5"
                  fill={dot < score ? "#057A72" : "#CCEBE5"}
                  opacity={dot < score ? ".8" : ".7"}
                />
              ))}
            </g>
          ))}
        </g>
      ))}

      <g className="dsc-scorecard__recommendation" transform="translate(148 232)">
        <rect width="68" height="22" rx="7" fill="#057A72" />
        <text
          x="34"
          y="14"
          textAnchor="middle"
          fill="#F7FFFE"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="7.5"
          fontWeight="750"
          letterSpacing=".08em"
        >
          FOCUS FIRST
        </text>
      </g>
      <g className="dsc-scorecard__why" transform="translate(232 232)">
        <text
          y="14"
          fill="#5F7976"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="8.5"
          fontWeight="650"
        >
          Best combined fit for this goal
        </text>
      </g>
    </svg>
  );
}

function AdvisoryIcon({ label }: { label: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": true as const,
    className: "dsc-services__icon-svg",
  };

  if (label === "Website") {
    return (
      <svg {...common}>
        <rect x="8" y="10" width="32" height="27" rx="4" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 17h32M13 14h.1M17 14h.1M21 14h.1M14 24h20M14 29h13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (label === "Paid") {
    return (
      <svg {...common}>
        <path d="M11 31V17l22-7v28l-22-7Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M16 33v5h7l-2-5M36 18c2 2 2 10 0 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (label === "Search") {
    return (
      <svg {...common}>
        <circle cx="21" cy="21" r="10" stroke="currentColor" strokeWidth="1.75" />
        <path d="m29 29 9 9M16 21h10M21 16v10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (label === "Lifecycle") {
    return (
      <svg {...common}>
        <rect x="7" y="12" width="34" height="25" rx="4" stroke="currentColor" strokeWidth="1.75" />
        <path d="m9 15 15 12 15-12M17 32h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (label === "Social") {
    return (
      <svg {...common}>
        <circle cx="15" cy="15" r="4" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="34" cy="24" r="4" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="15" cy="35" r="4" stroke="currentColor" strokeWidth="1.75" />
        <path d="m18.5 17 12 5M18.5 33l12-7" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M9 38V24M18 38V16M27 38V28M36 38V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 38h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DigitalStrategySections() {
  return (
    <>
      <section className="mkt-hero dsc-hero">
        <div className="shell">
          <div className="mkt-hero__content dsc-hero__content">
            <p className="eyebrow">Fractional Digital Strategy Partner</p>
            <h1 className="mkt-hero__headline">
              Digital strategy ownership, without the in-house hire.
            </h1>
            <p className="mkt-hero__copy">
              Ongoing guidance across your website, PPC, SEO, email, social
              media, and the rest of your digital ecosystem—so every priority
              connects to a goal and earns its place in the plan.
            </p>
            <div className="mkt-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#contact">
                Contact us
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#strategy-gap">
          Why clarity matters
        </a>
      </section>

      <section className="section dsc-gap" id="strategy-gap">
        <div className="shell">
          <div className="dsc-gap__top reveal">
            <div className="dsc-gap__intro">
              <p className="eyebrow">The strategy gap</p>
              <h2 className="section-heading">
                More marketing is not always the answer.
              </h2>
              <p className="section-copy">
                The real question is what deserves attention now. Without a
                grounded strategy, teams spread effort across channels and hope
                the numbers eventually tell a useful story.
              </p>
            </div>
            <RisingSpendScene />
          </div>
          <div className="dsc-gap__grid reveal">
            {strategyGaps.map((item, index) => (
              <article className="dsc-gap__cell" key={item.title}>
                <span className="dsc-gap__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dsc-services" id="advisory">
        <div className="shell">
          <div className="dsc-services__top reveal">
            <div className="dsc-services__intro">
              <p className="eyebrow">The partnership</p>
              <h2 className="section-heading">
                Everything a digital strategy team should cover.
              </h2>
              <p className="section-copy">
                Not a one-off deck. A trusted Fractional Digital Strategy
                Partner—assessing each channel in context, then owning the mix
                that has a reason to work.
              </p>
            </div>
            <PrioritizationScene />
          </div>
          <div className="dsc-services__grid reveal">
            {advisoryAreas.map((item) => (
              <article className="dsc-services__card" key={item.title}>
                <span className="dsc-services__icon" aria-hidden="true">
                  <AdvisoryIcon label={item.label} />
                </span>
                <span className="dsc-services__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="dsc-services__also reveal">
            <span className="dsc-services__also-label">Channel-neutral by design</span>
            The right recommendation may be to invest, improve, test, wait, or
            stop. We do not start with a preferred tactic—we start with what
            success means for your business.
          </p>
        </div>
      </section>

      <section className="section dsc-roadmap" id="roadmap">
        <div className="shell">
          <div className="dsc-roadmap__top reveal">
            <div>
              <p className="eyebrow">A practical roadmap</p>
              <h2 className="section-heading">
                Know what to do now, next, and later.
              </h2>
            </div>
            <p className="section-copy">
              Work with a trusted Fractional Digital Strategy Partner that
              keeps priorities clear, explains the reasoning, and tightens the
              plan as evidence comes in—not a deck that sits untouched.
            </p>
          </div>
          <div className="dsc-roadmap__paths reveal">
            {startingPoints.map((path) => (
              <article className="dsc-roadmap__path" key={path.title}>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
              </article>
            ))}
          </div>
          <div className="dsc-roadmap__channels reveal">
            <p className="dsc-roadmap__channels-lead">
              Guidance across the channels and systems you already use—and the
              ones you are considering next.
            </p>
            <ul className="dsc-roadmap__channels-list">
              {channels.map((channel) => (
                <li key={channel}>{channel}</li>
              ))}
              <li className="dsc-roadmap__channels-more">And more</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
