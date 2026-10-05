import Link from "next/link";
import { renderInline } from "@/components/inline-links";
import { BOOK_CALL_HREF } from "@/lib/site";
import {
  DepartmentOwnershipScene,
  OwnershipGapScene,
  ServiceIcon,
} from "./ownership-scenes";
import { Arrow } from "./site-header";

const gaps = [
  {
    title: "The backlog never ends",
    copy: "Page updates, form tweaks, SEO fixes, and “quick” launches sit in a queue with no owner—so the site falls further behind the business.",
  },
  {
    title: "Vendors without a center",
    copy: "A designer here, a freelancer there, an agency for SEO. Nobody holds the whole picture, so work contradicts itself and quality drifts.",
  },
  {
    title: "Reactive, not deliberate",
    copy: "Something breaks. A campaign needs a landing page yesterday. Strategy becomes firefighting—and compounding gains never get a chance.",
  },
  {
    title: "Pages that underperform",
    copy: "Traffic arrives. Forms stay quiet. Search doesn’t compound. Without CRO, growth recommendations, and clear paths, the site leaves revenue on the table.",
  },
];

const services = [
  {
    label: "Guide",
    title: "Strategy & roadmaps",
    copy: "[Prioritize what the site should do next](/fractional-digital-department)—based on how you win work, not what’s loudest in the backlog.",
  },
  {
    label: "Ship",
    title: "On-demand website operations",
    copy: "Copy, layout, landing pages, and launches that ship when the business needs them—scoped, reviewed, and live without drama.",
  },
  {
    label: "Build",
    title: "Setup, build & host",
    copy: "Work inside the site you have—or help build and host a new one. [Forms, CRM, booking, and chat wired](/marketing-automation) so leads keep one story.",
  },
  {
    label: "Own",
    title: "Website ownership",
    copy: "Technical care, performance, accessibility, and the Monday-morning surprises—handled so you don’t carry the site alone.",
  },
  {
    label: "Grow",
    title: "Website growth recommendations",
    copy: "Structure, titles, crawlability, and content aligned to search intent—so findability compounds and growth isn’t rented from ads.",
    href: "/search-engine-optimization",
  },
  {
    label: "Convert",
    title: "CRO",
    copy: "Clearer journeys from visit to inquiry or booking: hierarchy, CTAs, forms, and tests that turn traffic into conversations—measured with clean [conversion tracking](/analytics).",
    href: "/conversion-rate-optimization",
  },
];

const cmsPlatforms = [
  "WordPress",
  "Webflow",
  "Wix",
  "Squarespace",
  "Custom Coded",
] as const;

const peacePaths = [
  {
    title: "Already have a site?",
    copy: "We take ownership of what you already have—operations, growth recommendations, and technical care without a rip-and-replace.",
  },
  {
    title: "Need a new one?",
    copy: "We help build and host a site that fits how you win work—then stay on as your Website Partner after launch.",
  },
];

const SCROLL_SEGMENT = 720;
const REDESIGN_DUR = "14s";

const kpiArrows = [
  { x: 0.22, y: 180, delay: "1.5s", label: "+12%" },
  { x: 0.72, y: 300, delay: "4s", label: "+8%" },
  { x: 0.4, y: 420, delay: "7s", label: "+19%" },
  { x: 0.58, y: 220, delay: "10s", label: "+5%" },
];

/** Hold → change → hold → reset. Reads as a redesign edit, not a pulse. */
function redesignAttrs(values: string, keyTimes: string, begin = "0s") {
  return {
    dur: REDESIGN_DUR,
    begin,
    repeatCount: "indefinite" as const,
    calcMode: "linear" as const,
    keyTimes,
    values,
  };
}

function PageSegment({
  offsetY,
  contentX,
  contentW,
}: {
  offsetY: number;
  contentX: number;
  contentW: number;
}) {
  const btnSmall = contentW * 0.32;
  const btnLarge = contentW * 0.52;
  const photoX = contentX + contentW * 0.53;
  const photoW = contentW * 0.47;

  return (
    <g transform={`translate(0 ${offsetY})`}>
      {/* Headline — lengthens as copy is rewritten */}
      <rect
        x={contentX}
        y={24}
        height="16"
        rx="3"
        fill="#075752"
        opacity=".55"
        width={contentW * 0.48}
      >
        <animate
          attributeName="width"
          {...redesignAttrs(
            `${contentW * 0.48};${contentW * 0.48};${contentW * 0.72};${contentW * 0.72};${contentW * 0.48}`,
            "0;0.18;0.28;0.88;1",
          )}
        />
      </rect>
      <rect
        x={contentX}
        y={52}
        width={contentW}
        height="9"
        rx="2"
        fill="#3A948C"
        opacity=".3"
      />
      <rect
        x={contentX}
        y={70}
        width={contentW * 0.78}
        height="9"
        rx="2"
        fill="#3A948C"
        opacity=".22"
      />

      {/* CTA — small button grows into a stronger primary */}
      <rect
        x={contentX}
        y={108}
        height="32"
        rx="7"
        fill="#057A72"
        opacity=".88"
        width={btnSmall}
      >
        <animate
          attributeName="width"
          {...redesignAttrs(
            `${btnSmall};${btnSmall};${btnLarge};${btnLarge};${btnSmall}`,
            "0;0.22;0.34;0.88;1",
            "0.4s",
          )}
        />
      </rect>

      {/* Left card — stays as text block */}
      <g>
        <rect
          x={contentX}
          y={168}
          width={contentW * 0.47}
          height="130"
          rx="10"
          fill="url(#fwd-block)"
          stroke="#057A72"
          strokeWidth="1.2"
          opacity=".75"
        />
        <rect
          x={contentX + 14}
          y={186}
          width={contentW * 0.28}
          height="8"
          rx="2"
          fill="#075752"
          opacity=".35"
        />
        <rect
          x={contentX + 14}
          y={204}
          width={contentW * 0.34}
          height="7"
          rx="2"
          fill="#3A948C"
          opacity=".25"
        />
        <rect
          x={contentX + 14}
          y={220}
          width={contentW * 0.3}
          height="7"
          rx="2"
          fill="#3A948C"
          opacity=".18"
        />
      </g>

      {/* Right slot — empty frame, then a photo drops in */}
      <rect
        x={photoX}
        y={168}
        width={photoW}
        height="130"
        rx="10"
        fill="#EAF7F4"
        stroke="#057A72"
        strokeWidth="1.2"
        strokeDasharray="5 6"
        opacity=".45"
      />
      <g className="fwd-hero__photo" opacity="0">
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.36;0.46;0.9;1"
          dur={REDESIGN_DUR}
          begin="0.8s"
          repeatCount="indefinite"
          calcMode="linear"
        />
        <rect
          x={photoX}
          y={168}
          width={photoW}
          height="130"
          rx="10"
          fill="url(#fwd-photo)"
          stroke="#057A72"
          strokeWidth="1.2"
        />
        {/* Simple landscape mark so it reads as an image */}
        <circle cx={photoX + photoW * 0.72} cy={198} r="12" fill="#FFFDF4" opacity=".7" />
        <path
          d={`M${photoX + 10} ${168 + 118} L${photoX + photoW * 0.35} ${168 + 72} L${photoX + photoW * 0.55} ${168 + 96} L${photoX + photoW * 0.78} ${168 + 58} L${photoX + photoW - 10} ${168 + 118} Z`}
          fill="#057A72"
          opacity=".35"
        />
      </g>

      {/* Feature band — height expands when section is redesigned */}
      <rect
        x={contentX}
        y={320}
        width={contentW}
        rx="10"
        fill="url(#fwd-block)"
        stroke="#057A72"
        strokeWidth="1.2"
        opacity=".7"
        height="56"
      >
        <animate
          attributeName="height"
          {...redesignAttrs("56;56;96;96;56", "0;0.42;0.52;0.9;1", "1.2s")}
        />
      </rect>
      <rect
        x={contentX + 18}
        y={342}
        width={contentW * 0.4}
        height="10"
        rx="2"
        fill="#075752"
        opacity=".4"
      />
      <rect
        x={contentX + 18}
        y={362}
        width={contentW * 0.55}
        height="8"
        rx="2"
        fill="#3A948C"
        opacity=".28"
      />

      {/* Form row — submit button widens */}
      <rect
        x={contentX}
        y={448}
        width={contentW}
        height="14"
        rx="2"
        fill="#3A948C"
        opacity=".22"
      />
      <rect
        x={contentX}
        y={476}
        width={contentW * 0.58}
        height="30"
        rx="6"
        fill="#FFFDF4"
        stroke="#057A72"
        strokeWidth="1.1"
        opacity=".8"
      />
      <rect
        x={contentX + contentW * 0.64}
        y={476}
        height="30"
        rx="6"
        fill="#057A72"
        opacity=".85"
        width={contentW * 0.22}
      >
        <animate
          attributeName="width"
          {...redesignAttrs(
            `${contentW * 0.22};${contentW * 0.22};${contentW * 0.36};${contentW * 0.36};${contentW * 0.22}`,
            "0;0.5;0.6;0.9;1",
            "1.6s",
          )}
        />
      </rect>

      {/* Stats row — third tile fades in as a new KPI card */}
      {[0, 1].map((i) => (
        <g key={i}>
          <rect
            x={contentX + i * (contentW * 0.34)}
            y={540}
            width={contentW * 0.3}
            height="64"
            rx="8"
            fill="url(#fwd-block)"
            stroke="#057A72"
            strokeWidth="1.1"
            opacity=".7"
          />
          <rect
            x={contentX + i * (contentW * 0.34) + 12}
            y={556}
            width={contentW * 0.14}
            height="10"
            rx="2"
            fill="#075752"
            opacity=".45"
          />
          <rect
            x={contentX + i * (contentW * 0.34) + 12}
            y={576}
            width={contentW * 0.18}
            height="7"
            rx="2"
            fill="#3A948C"
            opacity=".28"
          />
        </g>
      ))}
      <g opacity="0">
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.58;0.68;0.92;1"
          dur={REDESIGN_DUR}
          begin="2s"
          repeatCount="indefinite"
          calcMode="linear"
        />
        <rect
          x={contentX + 2 * (contentW * 0.34)}
          y={540}
          width={contentW * 0.3}
          height="64"
          rx="8"
          fill="url(#fwd-block)"
          stroke="#057A72"
          strokeWidth="1.1"
          opacity=".85"
        />
        <rect
          x={contentX + 2 * (contentW * 0.34) + 12}
          y={556}
          width={contentW * 0.14}
          height="10"
          rx="2"
          fill="#075752"
          opacity=".5"
        />
        <rect
          x={contentX + 2 * (contentW * 0.34) + 12}
          y={576}
          width={contentW * 0.18}
          height="7"
          rx="2"
          fill="#3A948C"
          opacity=".3"
        />
      </g>
    </g>
  );
}

function KpiArrow({ label }: { label: string }) {
  return (
    <g className="fwd-hero__kpi">
      <circle r="11" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.4" />
      <path
        d="M0 4.5v-9M-3.5 -1.5 0 -5 3.5 -1.5"
        stroke="#057A72"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        y="26"
        textAnchor="middle"
        fill="#075752"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.02em"
      >
        {label}
      </text>
    </g>
  );
}

function WebsiteHeroScene() {
  const bx = 920;
  const by = 210;
  const bw = 380;
  const bh = 520;
  const pad = 28;
  const contentX = bx + pad;
  const contentW = bw - pad * 2;
  const pageTop = by + 44;

  return (
    <svg
      className="mkt-hero__scene fwd-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="fwd-glow" x1="960" y1="120" x2="1380" y2="460">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id="fwd-browser" x1="920" y1="210" x2="1300" y2="730">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id="fwd-block" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
        <linearGradient id="fwd-photo" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#B0E4DC" />
          <stop offset="1" stopColor="#6FB8B0" />
        </linearGradient>
        <clipPath id="fwd-page-clip">
          <rect x={bx} y={pageTop} width={bw} height={bh - 44} />
        </clipPath>
      </defs>

      <circle
        className="mkt-hero__glow"
        cx="1160"
        cy="280"
        r="150"
        fill="url(#fwd-glow)"
        opacity=".85"
      />

      <g className="fwd-hero__browser">
        <rect
          x={bx}
          y={by}
          width={bw}
          height={bh}
          rx="18"
          fill="url(#fwd-browser)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <rect x={bx} y={by} width={bw} height="44" rx="18" fill="#EAF7F4" />
        <rect x={bx} y={by + 28} width={bw} height="16" fill="#EAF7F4" />
        <circle cx={bx + 28} cy={by + 22} r="5" fill="#6FB8B0" />
        <circle cx={bx + 46} cy={by + 22} r="5" fill="#3A948C" />
        <circle cx={bx + 64} cy={by + 22} r="5" fill="#057A72" />
        <rect
          x={bx + 92}
          y={by + 14}
          width={bw - 120}
          height="16"
          rx="8"
          fill="#FFFDF4"
          stroke="#3A948C"
          strokeWidth="1"
          opacity=".7"
        />

        <g clipPath="url(#fwd-page-clip)">
          <g transform={`translate(0 ${pageTop})`}>
            <g className="fwd-hero__scroll">
              <PageSegment offsetY={0} contentX={contentX} contentW={contentW} />
              <PageSegment
                offsetY={SCROLL_SEGMENT}
                contentX={contentX}
                contentW={contentW}
              />
            </g>
          </g>

          {kpiArrows.map((arrow) => (
            <g
              key={`${arrow.label}-${arrow.delay}`}
              transform={`translate(${contentX + contentW * arrow.x} ${pageTop + arrow.y})`}
            >
              <g
                className="fwd-hero__kpi-wrap"
                style={{ animationDelay: arrow.delay }}
              >
                <KpiArrow label={arrow.label} />
              </g>
            </g>
          ))}
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

export function WebsiteStrategySections() {
  return (
    <>
      <section className="mkt-hero fwd-hero">
        <WebsiteHeroScene />
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Website Partner</p>
            <h1 className="mkt-hero__headline">
              Website ownership, without the in-house hire.
            </h1>
            <p className="mkt-hero__copy">
              On-demand website operations, growth recommendations, setup, and
              CRO—under true website ownership. A trusted partner so you don&apos;t
              have to worry about the site day to day.
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
        <a className="mkt-hero__cue" href="#gap">
          Why ownership matters
        </a>
      </section>

      <section className="section ws-friction fwd-gap" id="gap">
        <div className="shell">
          <div className="ws-friction__top reveal">
            <div className="ws-friction__intro">
              <p className="eyebrow">The ownership gap</p>
              <h2 className="section-heading">
                Websites stall when nobody owns them.
              </h2>
              <p className="section-copy">
                Most sites don&apos;t fail from a lack of ideas. They fail from
                fragmented ownership—backlogs, vendors, and fire drills instead of
                a trusted partner that ships on purpose.
              </p>
            </div>
            <OwnershipGapScene />
          </div>
          <div className="ws-friction__grid reveal">
            {gaps.map((item, index) => (
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

      <section className="section fwd-services" id="partnership">
        <div className="shell">
          <div className="fwd-services__top reveal">
            <div className="fwd-services__intro">
              <p className="eyebrow">The partnership</p>
              <h2 className="section-heading">
                Everything a website team should cover.
              </h2>
              <p className="section-copy">
                Not a one-off project. A trusted Website
                Partner—strategy, on-demand operations, ownership, growth
                recommendations, and conversion—working as one system.
              </p>
            </div>
            <DepartmentOwnershipScene />
          </div>
          <div className="fwd-services__grid reveal">
            {services.map((item) => (
              <article className="fwd-services__card" key={item.title}>
                <span className="fwd-services__icon" aria-hidden="true">
                  <ServiceIcon label={item.label} />
                </span>
                <span className="fwd-services__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{renderInline(item.copy)}</p>
                {item.href ? (
                  <Link className="fwd-services__more" href={item.href}>
                    Learn more
                    <Arrow />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Also available</span>
            Vendor management—we can coordinate designers, developers, SEO
            partners, hosts, and other website-adjacent vendors so you have one
            owner of the relationship when you need it.
          </p>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Part of the bigger picture</span>
            The website is one lever. Whether it&apos;s the right one right now
            depends on everything else—that&apos;s what the{" "}
            <Link className="inline-link" href="/fractional-digital-department">
              Fractional Digital Department
            </Link>{" "}
            figures out.
          </p>
        </div>
      </section>

      <section className="section fwd-peace" id="peace-of-mind">
        <div className="shell">
          <div className="fwd-peace__top reveal">
            <div>
              <p className="eyebrow">Peace of mind</p>
              <h2 className="section-heading">
                You don&apos;t have to worry about the site anymore.
              </h2>
            </div>
            <p className="section-copy">
              A trusted Website Partner takes ownership—so the site
              stays healthy, findable, and converting while you run the
              business.
            </p>
          </div>
          <div className="fwd-peace__paths reveal">
            {peacePaths.map((path) => (
              <article className="fwd-peace__path" key={path.title}>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
              </article>
            ))}
          </div>
          <div className="fwd-peace__cms reveal">
            <p className="fwd-peace__cms-lead">
              Website ownership across the platforms you already use—and
              essentially any other CMS.
            </p>
            <ul className="fwd-peace__cms-list">
              {cmsPlatforms.map((name) => (
                <li key={name}>{name}</li>
              ))}
              <li className="fwd-peace__cms-more">And more</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
