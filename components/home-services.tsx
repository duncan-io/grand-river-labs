import { BOOK_CALL_HREF } from "@/lib/site";
import { getIndustry } from "./industries";
import { Arrow } from "./site-header";

const content = getIndustry("home-services")!;

const fieldNodes = [
  { id: "lead", label: "Lead", cx: 980, cy: 210, delay: "0s" },
  { id: "notes", label: "Notes", cx: 900, cy: 370, delay: "0.5s" },
  { id: "estimate", label: "Estimate", cx: 940, cy: 540, delay: "1s" },
  { id: "crm", label: "CRM", cx: 1060, cy: 680, delay: "1.5s" },
] as const;

const hub = { cx: 1320, cy: 420 } as const;

type Point = { cx: number; cy: number };

function curveTo(from: Point, to: Point, bend: number) {
  const midX = (from.cx + to.cx) / 2 + bend;
  const midY = (from.cy + to.cy) / 2 - bend * 0.4;
  return `M${from.cx} ${from.cy} Q${midX} ${midY} ${to.cx} ${to.cy}`;
}

function HomeServicesScene() {
  const paths = [
    {
      id: "lead",
      d: curveTo(fieldNodes[0], hub, -36),
      delay: "0s",
      weight: 1.4,
    },
    {
      id: "notes",
      d: curveTo(fieldNodes[1], hub, 30),
      delay: "0.55s",
      weight: 1.5,
    },
    {
      id: "estimate",
      d: curveTo(fieldNodes[2], hub, -20),
      delay: "1.1s",
      weight: 1.45,
    },
    {
      id: "crm",
      d: curveTo(fieldNodes[3], hub, 34),
      delay: "1.65s",
      weight: 1.35,
    },
  ];

  return (
    <svg
      className="hs-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="hs-glow" x1="1180" y1="140" x2="1500" y2="480">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id="hs-node" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id="hs-hub" x1="1220" y1="280" x2="1420" y2="560">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <filter id="hs-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <circle
        className="hs-hero__glow"
        cx="1340"
        cy="220"
        r="150"
        fill="url(#hs-glow)"
        opacity=".85"
      />

      {/* Soft house silhouette behind the flow */}
      <g className="hs-hero__house" opacity=".16">
        <path
          d="M1180 520 L1320 400 L1460 520 V700 H1180 Z"
          stroke="#3A948C"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M1240 700 V580 H1400 V700"
          stroke="#3A948C"
          strokeWidth="1.25"
          fill="none"
        />
        <rect
          x="1295"
          y="620"
          width="50"
          height="80"
          stroke="#3A948C"
          strokeWidth="1.25"
          fill="none"
        />
      </g>

      <g className="hs-hero__paths">
        {paths.map(({ id, d, delay, weight }) => (
          <g key={id}>
            <path d={d} stroke="#3A948C" strokeWidth={weight} opacity={0.28} />
            <path
              className="hs-hero__path"
              d={d}
              stroke="#057A72"
              strokeWidth={weight + 0.4}
              strokeDasharray="7 14"
              style={{ animationDelay: delay }}
            />
            <circle
              className="hs-hero__packet"
              r="4.5"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.25"
              style={{ animationDelay: delay }}
            >
              <animateMotion
                dur="3.8s"
                begin={delay}
                repeatCount="indefinite"
                path={d}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          </g>
        ))}
      </g>

      <g className="hs-hero__channels">
        {fieldNodes.map((node) => (
          <g
            key={node.id}
            className="hs-hero__node"
            style={{ animationDelay: node.delay }}
          >
            <circle
              className="hs-hero__node-ring"
              cx={node.cx}
              cy={node.cy}
              r="32"
              stroke="#6FB8B0"
              strokeWidth="1"
              style={{ animationDelay: node.delay }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="22"
              fill="url(#hs-node)"
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <text
              x={node.cx}
              y={node.cy + 4}
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="11"
              fontWeight="600"
              letterSpacing="0.04em"
              opacity=".8"
            >
              {node.label}
            </text>
          </g>
        ))}
      </g>

      <g className="hs-hero__hub">
        <circle
          className="hs-hero__hub-ring"
          cx={hub.cx}
          cy={hub.cy}
          r="72"
          stroke="#6FB8B0"
          strokeWidth="1.5"
          opacity=".45"
        />
        <circle
          className="hs-hero__hub-ring hs-hero__hub-ring--outer"
          cx={hub.cx}
          cy={hub.cy}
          r="98"
          stroke="#057A72"
          strokeWidth="1"
          opacity=".22"
        />
        <circle cx={hub.cx} cy={hub.cy} r="48" fill="url(#hs-hub)" />
        <circle
          cx={hub.cx}
          cy={hub.cy}
          r="48"
          fill="#FFFDF4"
          opacity=".16"
          filter="url(#hs-soften)"
        />
        <text
          x={hub.cx}
          y={hub.cy - 4}
          textAnchor="middle"
          fill="#F7FFFE"
          fontFamily="Georgia, serif"
          fontSize="13"
          fontWeight="600"
          letterSpacing="0.12em"
        >
          JOB
        </text>
        <text
          x={hub.cx}
          y={hub.cy + 14}
          textAnchor="middle"
          fill="#EAF9F7"
          fontFamily="Georgia, serif"
          fontSize="10"
          letterSpacing="0.08em"
          opacity=".85"
        >
          BOOKED
        </text>
      </g>

      <path
        d="M0 780c260-50 520-40 780 8 220 40 420 35 820-25v137H0V780Z"
        fill="#EAF7F4"
        opacity=".9"
      />
    </svg>
  );
}

export function HomeServicesSections() {
  return (
    <>
      <section className="hs-hero">
        <HomeServicesScene />
        <div className="shell">
          <div className="hs-hero__content">
            <p className="eyebrow">{content.industry}</p>
            <p className="hs-hero__brand">Grand River Labs</p>
            <h1 className="hs-hero__headline">{content.headline}</h1>
            <p className="hs-hero__copy">{content.copy}</p>
            <div className="hs-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#drains">
                See where time goes
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="hs-hero__cue" href="#drains">
          Explore the week
        </a>
      </section>

      <section className="section hs-drains" id="drains">
        <div className="shell">
          <div className="hs-drains__top reveal">
            <div>
              <p className="eyebrow">{content.drainsEyebrow}</p>
              <h2 className="section-heading">{content.drainsHeading}</h2>
            </div>
            <p className="section-copy">{content.drainsIntro}</p>
          </div>
          <div className="hs-drains__list reveal">
            {content.drains.map((item, index) => (
              <article className="hs-drains__row" key={item.title}>
                <span className="hs-drains__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section hs-wins" id="wins">
        <div className="shell">
          <div className="hs-wins__top reveal">
            <div>
              <p className="eyebrow">{content.winsEyebrow}</p>
              <h2 className="section-heading">{content.winsHeading}</h2>
            </div>
            <p className="section-copy">{content.winsIntro}</p>
          </div>
          <div className="hs-wins__list reveal">
            {content.wins.map((item, index) => (
              <article
                className={`hs-win${index % 2 === 1 ? " hs-win--alt" : ""}`}
                key={item.title}
              >
                <span className="hs-win__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="hs-win__body">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section hs-how" id="how-we-work">
        <div className="shell">
          <div className="hs-how__top reveal">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-heading">{content.howHeading}</h2>
            </div>
            <p className="section-copy">{content.howCopy}</p>
          </div>
          <ol className="hs-how__steps reveal">
            {content.howSteps.map((step, index) => (
              <li className="hs-how__step" key={step.title}>
                {index > 0 ? (
                  <span className="hs-how__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="hs-how__connector-line"
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
                <span className="hs-how__number">
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

export function HomeServicesCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s get the office out of the way of the job.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us how leads become jobs today. We&apos;ll map a practical path
            from estimates and CRM busywork to hours back every week.
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
            <a className="button button-secondary" href="/use-cases">
              Back to use cases
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
