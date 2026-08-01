import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

const friction = [
  {
    title: "Traffic that doesn’t convert",
    copy: "The site looks fine. Visits come in. Forms stay empty—because the path from interest to action is unclear, slow, or buried.",
  },
  {
    title: "SEO that never compounds",
    copy: "Pages ship without a plan for search. Titles, structure, and content don’t match how people look for you—so growth stays rented from ads.",
  },
  {
    title: "Tools that don’t talk",
    copy: "Forms dump into email. CRM stays empty. Booking, chat, and marketing each keep their own half-story of the lead.",
  },
  {
    title: "Nobody owns the site",
    copy: "Updates stall. Broken links linger. Plugins and hosts get ignored until something breaks—usually on a Monday morning.",
  },
];

const steps = [
  {
    title: "Discover",
    copy: "We review how the site performs today—search, conversion paths, and the systems it should feed—then prioritize what moves the business first.",
  },
  {
    title: "Improve & connect",
    copy: "We ship SEO and CRO improvements, wire integrations into your stack, and leave you with pages and forms that actually hand off cleanly.",
  },
  {
    title: "Maintain & refine",
    copy: "We stay close after launch: watch what converts, keep the site healthy, and tighten the next round so gains keep compounding.",
  },
];

function WsPageSegment({ offsetY }: { offsetY: number }) {
  const x = 1004;
  const w = 492;

  return (
    <g transform={`translate(0 ${offsetY})`}>
      {/* Nav */}
      <rect x={x} y={12} width={w} height={36} rx="6" fill="#EAF7F4" />
      <circle cx={x + 22} cy={30} r="8" fill="#057A72" opacity=".55" />
      <rect
        x={x + 40}
        y={24}
        width={72}
        height={8}
        rx="2"
        fill="#057A72"
        opacity=".28"
      />
      <rect
        x={x + w - 88}
        y={22}
        width={64}
        height={16}
        rx="4"
        fill="#057A72"
        opacity=".45"
      />

      {/* Hero block */}
      <rect
        x={x}
        y={60}
        width={w * 0.55}
        height={14}
        rx="3"
        fill="#075752"
        opacity=".55"
      />
      <rect
        x={x}
        y={84}
        width={w * 0.42}
        height={10}
        rx="2"
        fill="#3A948C"
        opacity=".35"
      />
      <rect
        x={x}
        y={102}
        width={w * 0.48}
        height={10}
        rx="2"
        fill="#3A948C"
        opacity=".28"
      />
      <rect
        x={x + w * 0.6}
        y={60}
        width={w * 0.4}
        height={88}
        rx="8"
        fill="url(#ws-block)"
        stroke="#057A72"
        strokeWidth="1"
        opacity=".9"
      />

      {/* Primary CTA */}
      <rect
        x={x}
        y={168}
        width={120}
        height={32}
        rx="6"
        fill="#057A72"
        opacity=".85"
      />
      <rect
        x={x + 18}
        y={180}
        width={70}
        height={8}
        rx="2"
        fill="#FFFDF4"
        opacity=".9"
      />

      {/* Content lines */}
      <rect
        x={x}
        y={220}
        width={w * 0.7}
        height={10}
        rx="2"
        fill="#3A948C"
        opacity=".3"
      />
      <rect
        x={x}
        y={238}
        width={w * 0.62}
        height={10}
        rx="2"
        fill="#3A948C"
        opacity=".24"
      />
      <rect
        x={x}
        y={256}
        width={w * 0.55}
        height={10}
        rx="2"
        fill="#3A948C"
        opacity=".2"
      />

      {/* Form / convert block */}
      <rect
        x={x}
        y={286}
        width={w}
        height={118}
        rx="10"
        fill="#F7FFFE"
        stroke="#057A72"
        strokeWidth="1.25"
        opacity=".95"
      />
      <rect
        x={x + 20}
        y={306}
        width={160}
        height={10}
        rx="2"
        fill="#075752"
        opacity=".45"
      />
      <rect
        x={x + 20}
        y={328}
        width={w - 40}
        height={22}
        rx="5"
        fill="#EAF7F4"
        stroke="#6FB8B0"
        strokeWidth="1"
      />
      <rect
        x={x + 20}
        y={360}
        width={w - 40}
        height={22}
        rx="5"
        fill="#EAF7F4"
        stroke="#6FB8B0"
        strokeWidth="1"
      />
      <rect
        x={x + w - 132}
        y={360}
        width={92}
        height={22}
        rx="5"
        fill="#057A72"
        opacity=".8"
      />

      {/* Feature cards */}
      <rect
        x={x}
        y={424}
        width={(w - 16) / 2}
        height={64}
        rx="8"
        fill="url(#ws-block)"
        stroke="#057A72"
        strokeWidth="1"
        opacity=".85"
      />
      <rect
        x={x + (w - 16) / 2 + 16}
        y={424}
        width={(w - 16) / 2}
        height={64}
        rx="8"
        fill="url(#ws-block)"
        stroke="#057A72"
        strokeWidth="1"
        opacity=".85"
      />

      {/* Footer stub */}
      <rect x={x} y={508} width={w} height={40} rx="6" fill="#EAF7F4" />
      <rect
        x={x + 20}
        y={524}
        width={90}
        height={8}
        rx="2"
        fill="#057A72"
        opacity=".25"
      />
    </g>
  );
}

function WebsiteStrategyScene() {
  const frame = { x: 980, y: 168, w: 540, h: 552 };
  const chromeH = 78;
  const clip = {
    x: frame.x + 12,
    y: frame.y + chromeH,
    w: frame.w - 24,
    h: frame.h - chromeH - 14,
  };
  const segmentH = 560;

  const conversions = [
    { x: 1120, y: 520, delay: "0s", kind: "check" as const },
    { x: 1280, y: 560, delay: "1.1s", kind: "plus" as const },
    { x: 1385, y: 500, delay: "2.2s", kind: "check" as const },
    { x: 1205, y: 590, delay: "3.4s", kind: "plus" as const },
    { x: 1335, y: 540, delay: "4.6s", kind: "check" as const },
  ];

  return (
    <svg
      className="mkt-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="ws-glow" x1="1180" y1="100" x2="1520" y2="420">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id="ws-frame" x1="980" y1="168" x2="1520" y2="720">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
        <linearGradient id="ws-block" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <clipPath id="ws-page-clip">
          <rect
            x={clip.x}
            y={clip.y}
            width={clip.w}
            height={clip.h}
            rx="6"
          />
        </clipPath>
        <filter id="ws-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <circle
        className="mkt-hero__glow"
        cx="1340"
        cy="200"
        r="150"
        fill="url(#ws-glow)"
        opacity=".85"
      />

      {/* Browser chrome */}
      <g className="ws-hero__browser">
        <rect
          x={frame.x}
          y={frame.y}
          width={frame.w}
          height={frame.h}
          rx="18"
          fill="url(#ws-frame)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <rect
          x={frame.x}
          y={frame.y}
          width={frame.w}
          height={chromeH}
          rx="18"
          fill="#EAF7F4"
        />
        <rect
          x={frame.x}
          y={frame.y + 28}
          width={frame.w}
          height={chromeH - 28}
          fill="#EAF7F4"
        />

        {/* Traffic lights */}
        <circle cx={frame.x + 28} cy={frame.y + 22} r="5" fill="#6FB8B0" />
        <circle cx={frame.x + 46} cy={frame.y + 22} r="5" fill="#3A948C" />
        <circle cx={frame.x + 64} cy={frame.y + 22} r="5" fill="#057A72" />

        {/* Address bar */}
        <rect
          x={frame.x + 88}
          y={frame.y + 42}
          width={frame.w - 120}
          height={24}
          rx="8"
          fill="#F7FFFE"
          stroke="#6FB8B0"
          strokeWidth="1"
        />
        <circle
          cx={frame.x + 106}
          cy={frame.y + 54}
          r="5"
          stroke="#057A72"
          strokeWidth="1.5"
          opacity=".55"
        />
        <rect
          x={frame.x + 120}
          y={frame.y + 50}
          width={140}
          height={8}
          rx="2"
          fill="#057A72"
          opacity=".28"
        />

        {/* Scrolling page */}
        <g clipPath="url(#ws-page-clip)">
          <rect
            x={clip.x}
            y={clip.y}
            width={clip.w}
            height={clip.h}
            fill="#F8FCFB"
          />
          <g transform={`translate(0 ${clip.y})`}>
            <g className="ws-hero__page">
              <WsPageSegment offsetY={0} />
              <WsPageSegment offsetY={segmentH} />
            </g>
          </g>
        </g>

        {/* Inner viewport stroke */}
        <rect
          x={clip.x}
          y={clip.y}
          width={clip.w}
          height={clip.h}
          rx="6"
          stroke="#057A72"
          strokeWidth="1"
          opacity=".18"
        />
      </g>

      {/* Conversions rise opposite the scroll */}
      {conversions.map((item) => (
        <g
          key={`${item.x}-${item.delay}`}
          transform={`translate(${item.x} ${item.y})`}
        >
          <g
            className="ws-hero__conversion"
            style={{ animationDelay: item.delay }}
          >
            <circle
              r="14"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.5"
              filter="url(#ws-soften)"
              opacity=".35"
            />
            <circle r="11" fill="#057A72" />
            {item.kind === "check" ? (
              <path
                d="M-4.5 0.5  -1.5 3.5  5 -3.5"
                stroke="#FFFDF4"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill="#FFFDF4"
                fontFamily="Georgia, serif"
                fontSize="11"
                fontWeight="700"
              >
                +1
              </text>
            )}
          </g>
        </g>
      ))}

      <path
        d="M0 780c260-50 520-40 780 8 220 40 420 35 820-25v137H0V780Z"
        fill="#EAF7F4"
        opacity=".9"
      />
    </svg>
  );
}

export function WebsiteStrategySections() {
  return (
    <>
      <section className="mkt-hero">
        <WebsiteStrategyScene />
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Website strategy</p>
            <p className="mkt-hero__brand">Grand River Labs</p>
            <h1 className="mkt-hero__headline">
              Websites That Grow Revenue
            </h1>
            <p className="mkt-hero__copy">
              SEO and conversion work that makes the site discoverable—and
              turns the traffic you earn into inquiries, bookings, and real
              conversations.
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
              <a className="button button-secondary" href="#how-it-fits">
                See how it fits
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#how-it-fits">
          See how it fits
        </a>
      </section>

      <section className="section ws-friction" id="friction">
        <div className="shell">
          <div className="ws-friction__top reveal">
            <div>
              <p className="eyebrow">The drag</p>
              <h2 className="section-heading">
                Where websites fall short.
              </h2>
            </div>
            <p className="section-copy">
              Design is rarely the whole problem. Search, conversion paths,
              disconnected tools, and unclear ownership are what leave growth
              on the table.
            </p>
          </div>
          <div className="ws-friction__grid reveal">
            {friction.map((item, index) => (
              <article className="ws-friction__cell" key={item.title}>
                <span className="ws-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section mkt-how" id="how-it-fits">
        <div className="shell">
          <div className="mkt-how__top reveal">
            <div>
              <p className="eyebrow">How it fits</p>
              <h2 className="section-heading">
                Strategy first. Then a site that stays healthy.
              </h2>
            </div>
            <p className="section-copy">
              We cover findability, conversion, integrations, and ownership—
              starting from how the business wins work, then improving the pages
              that matter and keeping clear ownership after launch.
            </p>
          </div>
          <ol className="mkt-how__steps reveal">
            {steps.map((step, index) => (
              <li className="mkt-how__step" key={step.title}>
                {index > 0 ? (
                  <span className="mkt-how__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="mkt-how__connector-line"
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
                <span className="mkt-how__number">
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

export function WebsiteStrategyCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s make the website earn its keep.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us how leads find you today. We&apos;ll map a practical path
            across SEO, conversion, integrations, and ongoing ownership.
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
            <a className="button button-secondary" href="/analytics">
              See analytics
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
