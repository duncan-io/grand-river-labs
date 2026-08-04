import { BOOK_CALL_HREF } from "@/lib/site";
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
    copy: "Prioritize what the site should do next—based on how you win work, not what’s loudest in the backlog.",
  },
  {
    label: "Ship",
    title: "On-demand website operations",
    copy: "Copy, layout, landing pages, and launches that ship when the business needs them—scoped, reviewed, and live without drama.",
  },
  {
    label: "Build",
    title: "Setup, build & host",
    copy: "Work inside the site you have—or help build and host a new one. Forms, CRM, booking, and chat wired so leads keep one story.",
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
  },
  {
    label: "Convert",
    title: "CRO",
    copy: "Clearer journeys from visit to inquiry or booking: hierarchy, CTAs, forms, and tests that turn traffic into conversations.",
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
    copy: "We help build and host a site that fits how you win work—then stay on as your Fractional Website Department after launch.",
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

function FractionalDeptScene() {
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

type ScenePoint = { x: number; y: number };

function quadPath(from: ScenePoint, to: ScenePoint, bend: number) {
  const midX = (from.x + to.x) / 2 + bend;
  const midY = (from.y + to.y) / 2 - bend * 0.35;
  return `M${from.x} ${from.y} Q${midX} ${midY} ${to.x} ${to.y}`;
}

function SceneBrowser({
  gradientId,
  className = "ws-ownership__site",
}: {
  gradientId: string;
  className?: string;
}) {
  return (
    <g className={className}>
      <circle
        className="ws-ownership__site-ring"
        r="52"
        stroke="#6FB8B0"
        strokeWidth="1.4"
        opacity=".4"
      />
      <circle
        className="ws-ownership__site-ring ws-ownership__site-ring--outer"
        r="70"
        stroke="#057A72"
        strokeWidth="1"
        opacity=".18"
      />
      <rect
        x="-42"
        y="-36"
        width="84"
        height="72"
        rx="10"
        fill={`url(#${gradientId})`}
        stroke="#057A72"
        strokeWidth="1.5"
      />
      <rect x="-42" y="-36" width="84" height="14" rx="10" fill="#EAF7F4" />
      <rect x="-42" y="-26" width="84" height="4" fill="#EAF7F4" />
      <circle cx="-32" cy="-29" r="2.25" fill="#6FB8B0" />
      <circle cx="-24" cy="-29" r="2.25" fill="#3A948C" />
      <circle cx="-16" cy="-29" r="2.25" fill="#057A72" />
      <rect x="-30" y="-12" width="36" height="4" rx="1.5" fill="#075752" opacity=".4" />
      <rect x="-30" y="-2" width="50" height="3.5" rx="1.5" fill="#3A948C" opacity=".28" />
      <rect x="-30" y="6" width="42" height="3.5" rx="1.5" fill="#3A948C" opacity=".2" />
      <rect x="-30" y="16" width="24" height="9" rx="3" fill="#057A72" opacity=".55" />
    </g>
  );
}

type ChaosMotion = "oscillate" | "arrive" | "drift" | "cross";

function chaosMotionAttrs(kind: ChaosMotion, dur: string, begin: string) {
  if (kind === "oscillate") {
    return {
      motion: {
        dur,
        begin,
        repeatCount: "indefinite" as const,
        keyPoints: "0;1;0",
        keyTimes: "0;0.5;1",
        calcMode: "linear" as const,
      },
      opacity: {
        values: "0;1;1;0.6;1;0",
        keyTimes: "0;0.08;0.45;0.5;0.92;1",
        dur,
        begin,
        repeatCount: "indefinite" as const,
      },
    };
  }
  if (kind === "arrive") {
    return {
      motion: {
        dur,
        begin,
        repeatCount: "indefinite" as const,
        keyPoints: "0;1",
        keyTimes: "0;1",
        calcMode: "linear" as const,
      },
      opacity: {
        values: "0;1;1;0",
        keyTimes: "0;0.12;0.82;1",
        dur,
        begin,
        repeatCount: "indefinite" as const,
      },
    };
  }
  if (kind === "drift") {
    return {
      motion: {
        dur,
        begin,
        repeatCount: "indefinite" as const,
        keyPoints: "0;1",
        keyTimes: "0;1",
        calcMode: "linear" as const,
      },
      opacity: {
        values: "0;1;0.7;0",
        keyTimes: "0;0.15;0.7;1",
        dur,
        begin,
        repeatCount: "indefinite" as const,
      },
    };
  }
  return {
    motion: {
      dur,
      begin,
      repeatCount: "indefinite" as const,
      keyPoints: "0;0.55;1;0.4;0",
      keyTimes: "0;0.3;0.55;0.78;1",
      calcMode: "linear" as const,
    },
    opacity: {
      values: "0;1;1;0.4;0",
      keyTimes: "0;0.1;0.5;0.75;1",
      dur,
      begin,
      repeatCount: "indefinite" as const,
    },
  };
}

function OwnershipGapScene() {
  const site = { x: 210, y: 140 };

  const labeled = [
    { id: "backlog", label: "Backlog", x: 48, y: 42, delay: "0s" },
    { id: "design", label: "Design", x: 372, y: 46, delay: "0.5s" },
    { id: "seo", label: "SEO", x: 42, y: 236, delay: "1.1s" },
    { id: "freelance", label: "Freelance", x: 378, y: 238, delay: "1.7s" },
  ] as const;

  const satellites = [
    { id: "s1", x: 110, y: 28, delay: "0.2s" },
    { id: "s2", x: 300, y: 22, delay: "0.8s" },
    { id: "s3", x: 18, y: 120, delay: "1.4s" },
    { id: "s4", x: 400, y: 128, delay: "0.4s" },
    { id: "s5", x: 95, y: 188, delay: "1.9s" },
    { id: "s6", x: 330, y: 190, delay: "1.2s" },
    { id: "s7", x: 160, y: 258, delay: "0.7s" },
    { id: "s8", x: 265, y: 262, delay: "2.1s" },
    { id: "s9", x: 175, y: 55, delay: "1.5s" },
    { id: "s10", x: 250, y: 48, delay: "0.3s" },
  ] as const;

  const routes: {
    id: string;
    d: string;
    kind: ChaosMotion;
    delay: string;
    dur: string;
    weight?: number;
  }[] = [
    {
      id: "arrive-backlog",
      d: quadPath(labeled[0], site, -36),
      kind: "arrive",
      delay: "0s",
      dur: "5.2s",
    },
    {
      id: "arrive-seo",
      d: quadPath(labeled[2], site, -24),
      kind: "arrive",
      delay: "2.4s",
      dur: "4.8s",
    },
    {
      id: "osc-design",
      d: quadPath(labeled[1], { x: 300, y: 110 }, 18),
      kind: "oscillate",
      delay: "0.4s",
      dur: "3.4s",
    },
    {
      id: "osc-freelance",
      d: quadPath(labeled[3], { x: 310, y: 180 }, -20),
      kind: "oscillate",
      delay: "1.1s",
      dur: "3.8s",
    },
    {
      id: "osc-s9",
      d: quadPath(satellites[8], satellites[9], 12),
      kind: "oscillate",
      delay: "0.6s",
      dur: "2.8s",
      weight: 1.1,
    },
    {
      id: "cross-1",
      d: quadPath(labeled[0], labeled[1], -50),
      kind: "cross",
      delay: "0.9s",
      dur: "6s",
    },
    {
      id: "cross-2",
      d: quadPath(labeled[2], labeled[3], 45),
      kind: "cross",
      delay: "1.6s",
      dur: "5.5s",
    },
    {
      id: "cross-3",
      d: quadPath(satellites[2], satellites[5], 30),
      kind: "cross",
      delay: "0.2s",
      dur: "4.6s",
      weight: 1.1,
    },
    {
      id: "cross-4",
      d: quadPath(satellites[0], satellites[4], -22),
      kind: "cross",
      delay: "2s",
      dur: "5s",
      weight: 1.1,
    },
    {
      id: "drift-1",
      d: quadPath(labeled[1], { x: 450, y: -10 }, 40),
      kind: "drift",
      delay: "0.3s",
      dur: "4.2s",
    },
    {
      id: "drift-2",
      d: quadPath(satellites[3], { x: 460, y: 200 }, 25),
      kind: "drift",
      delay: "1.8s",
      dur: "3.6s",
      weight: 1.1,
    },
    {
      id: "drift-3",
      d: quadPath(labeled[2], { x: -30, y: 300 }, -35),
      kind: "drift",
      delay: "1.3s",
      dur: "4.5s",
    },
    {
      id: "drift-4",
      d: quadPath(satellites[6], { x: 120, y: 320 }, 20),
      kind: "drift",
      delay: "2.2s",
      dur: "3.9s",
      weight: 1.1,
    },
    {
      id: "arrive-s5",
      d: quadPath(satellites[4], site, 16),
      kind: "arrive",
      delay: "3.1s",
      dur: "4.4s",
      weight: 1.1,
    },
    {
      id: "osc-s1",
      d: quadPath(satellites[0], { x: 140, y: 70 }, -10),
      kind: "oscillate",
      delay: "1.4s",
      dur: "3.1s",
      weight: 1.05,
    },
  ];

  return (
    <svg
      className="ws-friction__scene ws-ownership__scene"
      aria-hidden="true"
      viewBox="0 0 420 280"
      fill="none"
    >
      <defs>
        <linearGradient id="ws-gap-browser" x1="160" y1="90" x2="260" y2="200">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id="ws-gap-node" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <g className="ws-ownership__paths">
        {routes.map((route) => (
          <g key={route.id}>
            <path
              d={route.d}
              stroke="#3A948C"
              strokeWidth={route.weight ?? 1.35}
              opacity=".14"
            />
            <path
              className="ws-ownership__path"
              d={route.d}
              stroke="#057A72"
              strokeWidth={(route.weight ?? 1.35) + 0.25}
              strokeDasharray="6 11"
              opacity=".55"
              style={{ animationDelay: route.delay }}
            />
          </g>
        ))}
        {routes.map((route) => {
          const attrs = chaosMotionAttrs(route.kind, route.dur, route.delay);
          return (
            <circle
              key={`pkt-${route.id}`}
              className="ws-ownership__packet"
              r={route.weight && route.weight < 1.2 ? 3.2 : 3.8}
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.1"
            >
              <animateMotion path={route.d} {...attrs.motion} />
              <animate attributeName="opacity" {...attrs.opacity} />
            </circle>
          );
        })}
      </g>

      {satellites.map((dot) => (
        <g key={dot.id} transform={`translate(${dot.x} ${dot.y})`}>
          <g className="ws-ownership__dot" style={{ animationDelay: dot.delay }}>
            <circle
              className="ws-ownership__dot-ring"
              r="14"
              stroke="#6FB8B0"
              strokeWidth="1"
              style={{ animationDelay: dot.delay }}
            />
            <circle
              r="6"
              fill="url(#ws-gap-node)"
              stroke="#057A72"
              strokeWidth="1.2"
            />
          </g>
        </g>
      ))}

      {labeled.map((node) => (
        <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
          <g className="ws-ownership__node" style={{ animationDelay: node.delay }}>
            <circle
              className="ws-ownership__node-ring"
              r="26"
              stroke="#6FB8B0"
              strokeWidth="1"
              style={{ animationDelay: node.delay }}
            />
            <rect
              x="-34"
              y="-14"
              width="68"
              height="28"
              rx="8"
              fill="url(#ws-gap-node)"
              stroke="#057A72"
              strokeWidth="1.35"
            />
            <text
              y="4"
              textAnchor="middle"
              fill="#057A72"
              fontSize="9.5"
              fontFamily="var(--font-outfit), sans-serif"
              fontWeight="650"
              opacity=".78"
            >
              {node.label}
            </text>
          </g>
        </g>
      ))}

      <g transform={`translate(${site.x} ${site.y})`}>
        <SceneBrowser gradientId="ws-gap-browser" />
      </g>
    </svg>
  );
}

function DepartmentOwnershipScene() {
  const hub = { x: 228, y: 132 };
  const site = { x: 358, y: 132 };

  const serviceNodes = [
    { id: "design", label: "Design", x: 58, y: 48, delay: "0s", w: 68 },
    { id: "dev", label: "Development", x: 58, y: 110, delay: "0.4s", w: 92 },
    { id: "seo", label: "SEO", x: 58, y: 172, delay: "0.8s", w: 56 },
    { id: "convert", label: "Convert", x: 58, y: 234, delay: "1.2s", w: 72 },
  ] as const;

  const bends = [-28, -8, 12, 28];
  const inbound = serviceNodes.map((node, i) => ({
    id: `in-${node.id}`,
    d: quadPath(node, hub, bends[i] ?? 0),
    delay: node.delay,
    dur: "3.4s",
  }));
  const outbound = {
    id: "out-site",
    d: quadPath(hub, site, -6),
    delay: "0.9s",
    dur: "2.6s",
  };

  return (
    <svg
      className="fwd-services__scene ws-ownership__scene"
      aria-hidden="true"
      viewBox="0 0 420 280"
      fill="none"
    >
      <defs>
        <linearGradient id="ws-dept-browser" x1="300" y1="90" x2="390" y2="200">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id="ws-dept-node" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
        <linearGradient id="ws-dept-hub" x1="160" y1="100" x2="240" y2="180">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
      </defs>

      <g className="ws-ownership__paths">
        {inbound.map((path) => (
          <g key={path.id}>
            <path d={path.d} stroke="#3A948C" strokeWidth="1.4" opacity=".22" />
            <path
              className="ws-ownership__path"
              d={path.d}
              stroke="#057A72"
              strokeWidth="1.75"
              strokeDasharray="7 12"
              style={{ animationDelay: path.delay }}
            />
          </g>
        ))}
        <path d={outbound.d} stroke="#3A948C" strokeWidth="1.6" opacity=".28" />
        <path
          className="ws-ownership__path"
          d={outbound.d}
          stroke="#057A72"
          strokeWidth="2"
          strokeDasharray="8 10"
          style={{ animationDelay: outbound.delay }}
        />

        {inbound.map((path) => (
          <circle
            key={`pkt-${path.id}`}
            className="ws-ownership__packet"
            r="3.8"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.15"
          >
            <animateMotion
              dur={path.dur}
              begin={path.delay}
              repeatCount="indefinite"
              path={path.d}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.12;0.85;1"
              dur={path.dur}
              begin={path.delay}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        <circle
          className="ws-ownership__packet"
          r="4.2"
          fill="#FFFDF4"
          stroke="#057A72"
          strokeWidth="1.2"
        >
          <animateMotion
            dur={outbound.dur}
            begin={outbound.delay}
            repeatCount="indefinite"
            path={outbound.d}
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.85;1"
            dur={outbound.dur}
            begin={outbound.delay}
            repeatCount="indefinite"
          />
        </circle>
        {/* Second outbound packet staggered so the hub→site link stays busy */}
        <circle
          className="ws-ownership__packet"
          r="3.6"
          fill="#FFFDF4"
          stroke="#057A72"
          strokeWidth="1.1"
        >
          <animateMotion
            dur={outbound.dur}
            begin="2.1s"
            repeatCount="indefinite"
            path={outbound.d}
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.85;1"
            dur={outbound.dur}
            begin="2.1s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {serviceNodes.map((node) => (
        <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
          <g className="ws-ownership__node" style={{ animationDelay: node.delay }}>
            <circle
              className="ws-ownership__node-ring"
              r="24"
              stroke="#6FB8B0"
              strokeWidth="1"
              style={{ animationDelay: node.delay }}
            />
            <rect
              x={-node.w / 2}
              y="-13"
              width={node.w}
              height="26"
              rx="8"
              fill="url(#ws-dept-node)"
              stroke="#057A72"
              strokeWidth="1.3"
            />
            <text
              y="3.5"
              textAnchor="middle"
              fill="#057A72"
              fontSize="9.5"
              fontFamily="var(--font-outfit), sans-serif"
              fontWeight="650"
              opacity=".8"
            >
              {node.label}
            </text>
          </g>
        </g>
      ))}

      <g transform={`translate(${hub.x} ${hub.y})`}>
        <g className="ws-ownership__hub">
          <circle
            className="ws-ownership__hub-ring"
            r="48"
            stroke="#6FB8B0"
            strokeWidth="1.5"
            opacity=".45"
          />
          <circle
            className="ws-ownership__hub-ring ws-ownership__hub-ring--outer"
            r="64"
            stroke="#057A72"
            strokeWidth="1"
            opacity=".22"
          />
          <circle r="34" fill="url(#ws-dept-hub)" />
          <text
            y="4"
            textAnchor="middle"
            fill="#F7FFFE"
            fontSize="11"
            fontFamily="var(--font-outfit), sans-serif"
            fontWeight="700"
            opacity=".95"
          >
            GR Labs
          </text>
        </g>
      </g>

      <g transform={`translate(${site.x} ${site.y})`}>
        <SceneBrowser gradientId="ws-dept-browser" />
      </g>
    </svg>
  );
}

function ServiceIcon({ label }: { label: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": true as const,
    className: "fwd-services__icon-svg",
  };

  switch (label) {
    case "Guide":
      return (
        <svg {...common}>
          <path
            d="M12 36V14c0-1.1.9-2 2-2h14l8 8v16c0 1.1-.9 2-2 2H14c-1.1 0-2-.9-2-2Z"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M28 12v8h8M18 24h12M18 30h8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Ship":
      return (
        <svg {...common}>
          <path
            d="M14 30h20l4 6H10l4-6Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M18 30V18l6-6 6 6v12"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M24 20v6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Build":
      return (
        <svg {...common}>
          <rect
            x="10"
            y="14"
            width="12"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <rect
            x="26"
            y="22"
            width="12"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M22 20h4M32 22V18"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Own":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M24 18v8M24 30.5v.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Grow":
      return (
        <svg {...common}>
          <circle cx="22" cy="22" r="9" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M28.5 28.5 36 36"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path
            d="M14 32V16c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v16"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M18 32h12M20 26l4-8 4 8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function WebsiteStrategySections() {
  return (
    <>
      <section className="mkt-hero fwd-hero">
        <FractionalDeptScene />
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Fractional Website Department</p>
            <h1 className="mkt-hero__headline">
              Your website team—without hiring one.
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
                a department that ships on purpose.
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

      <section className="section fwd-services" id="department">
        <div className="shell">
          <div className="fwd-services__top reveal">
            <div className="fwd-services__intro">
              <p className="eyebrow">The department</p>
              <h2 className="section-heading">
                Everything a website team should cover.
              </h2>
              <p className="section-copy">
                Not a one-off project. An embedded Fractional Website
                Department—strategy, on-demand operations, ownership, growth
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
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Also available</span>
            Vendor management—we can coordinate designers, developers, SEO
            partners, hosts, and other website-adjacent vendors so you have one
            owner of the relationship when you need it.
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
              A trusted Fractional Website Department takes ownership—so the
              site stays healthy, findable, and converting while you run the
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
