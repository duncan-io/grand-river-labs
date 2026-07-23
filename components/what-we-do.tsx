import { Arrow } from "./site-header";

const services = [
  {
    title: "Business process automation",
    copy: "We map the work that slows your team down—handoffs, re-entry, approvals—and automate the path across the tools you already run. Same outcomes, fewer hours in the weeds.",
    href: "/what-we-do/business-process-automation",
    motif: "bpa" as const,
  },
  {
    title: "Marketing automation",
    copy: "Lead routing, nurture sequences, and campaign ops that fit your CRM and channels. Practical automation that keeps pipeline moving without rebuilding the stack.",
    href: "/marketing-automation",
    motif: "marketing" as const,
  },
  {
    title: "Automation consulting",
    copy: "White-glove discovery before a single workflow ships. We find where time and money leak, prioritize what to automate first, and leave you with a clear roadmap.",
    href: "/automation-consulting",
    motif: "consulting" as const,
  },
  {
    title: "AI automation",
    copy: "Practical AI inside the work—extraction, triage, drafting, assistants—tied to your real systems. No demos that die on a slide. Tools your team can trust day to day.",
    href: "/ai-automation",
    motif: "ai" as const,
  },
];

type ServiceMotifVariant = (typeof services)[number]["motif"];

function ServiceMotif({ variant }: { variant: ServiceMotifVariant }) {
  return (
    <svg
      className={`what-we-do-service__motif what-we-do-service__motif--${variant}`}
      aria-hidden="true"
      viewBox="0 0 280 160"
      fill="none"
    >
      <defs>
        <linearGradient id={`svc-node-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id={`svc-hub-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
      </defs>

      {variant === "bpa" ? (
        <>
          <path
            d="M36 118 C 72 118, 88 78, 120 78 C 152 78, 168 42, 204 42 C 228 42, 244 78, 252 110"
            stroke="#3A948C"
            strokeWidth="1.5"
            opacity=".35"
          />
          <path
            className="what-we-do-service__path"
            d="M36 118 C 72 118, 88 78, 120 78 C 152 78, 168 42, 204 42 C 228 42, 244 78, 252 110"
            stroke="#057A72"
            strokeWidth="2"
            strokeDasharray="6 10"
          />
          {[
            { cx: 36, cy: 118, r: 14, delay: "0s" },
            { cx: 120, cy: 78, r: 12, delay: "0.45s" },
            { cx: 204, cy: 42, r: 12, delay: "0.9s" },
            { cx: 252, cy: 110, r: 14, delay: "1.35s" },
          ].map((node) => (
            <g
              key={`${node.cx}-${node.cy}`}
              className="what-we-do-service__node"
              style={{ animationDelay: node.delay }}
            >
              <circle
                className="what-we-do-service__node-ring"
                cx={node.cx}
                cy={node.cy}
                r={node.r + 7}
                stroke="#6FB8B0"
                strokeWidth="1"
                style={{ animationDelay: node.delay }}
              />
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={`url(#svc-node-${variant})`}
                stroke="#057A72"
                strokeWidth="1.5"
              />
              <circle
                cx={node.cx}
                cy={node.cy}
                r="3.5"
                fill="#057A72"
                opacity=".55"
              />
            </g>
          ))}
          <circle
            className="what-we-do-service__packet"
            r="4"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.25"
          >
            <animateMotion
              dur="3.4s"
              repeatCount="indefinite"
              path="M36 118 C 72 118, 88 78, 120 78 C 152 78, 168 42, 204 42 C 228 42, 244 78, 252 110"
            />
          </circle>
        </>
      ) : null}

      {variant === "marketing" ? (
        <>
          {/* Sound waves from the megaphone */}
          {[
            { d: "M198 52 C 218 68, 218 92, 198 108", delay: "0s" },
            { d: "M214 40 C 242 62, 242 98, 214 120", delay: "0.45s" },
            { d: "M230 28 C 268 56, 268 104, 230 132", delay: "0.9s" },
          ].map((wave) => (
            <path
              key={wave.d}
              className="what-we-do-service__sound-wave"
              d={wave.d}
              stroke="#057A72"
              strokeWidth="2.25"
              strokeLinecap="round"
              style={{ animationDelay: wave.delay }}
            />
          ))}

          {/* Robot body */}
          <g className="what-we-do-service__robot">
            {/* Antenna */}
            <line
              x1="86"
              y1="34"
              x2="86"
              y2="48"
              stroke="#057A72"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              className="what-we-do-service__robot-antenna"
              cx="86"
              cy="28"
              r="5"
              fill="#057A72"
            />

            {/* Head */}
            <rect
              x="58"
              y="48"
              width="56"
              height="42"
              rx="12"
              fill={`url(#svc-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.75"
            />
            {/* Eyes */}
            <circle cx="74" cy="66" r="5" fill="#057A72" />
            <circle cx="98" cy="66" r="5" fill="#057A72" />
            <circle cx="75.5" cy="64.5" r="1.6" fill="#F7FFFE" />
            <circle cx="99.5" cy="64.5" r="1.6" fill="#F7FFFE" />
            {/* Mouth speaking */}
            <ellipse
              className="what-we-do-service__robot-mouth"
              cx="86"
              cy="80"
              rx="7"
              ry="3.5"
              fill="#057A72"
              opacity=".75"
            />

            {/* Torso */}
            <rect
              x="64"
              y="96"
              width="44"
              height="36"
              rx="10"
              fill={`url(#svc-hub-${variant})`}
            />
            <rect
              x="76"
              y="106"
              width="20"
              height="10"
              rx="3"
              fill="#FFFDF4"
              opacity=".45"
            />

            {/* Arms */}
            <path
              d="M64 108 C 48 112, 40 104, 38 92"
              stroke="#057A72"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M108 104 C 122 100, 132 92, 140 82"
              stroke="#057A72"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Legs */}
            <path
              d="M76 132 v18"
              stroke="#057A72"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M96 132 v18"
              stroke="#057A72"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          {/* Megaphone / loudspeaker */}
          <g className="what-we-do-service__megaphone">
            <path
              d="M140 72 L176 56 L176 104 L140 88 Z"
              fill={`url(#svc-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <rect
              x="128"
              y="72"
              width="14"
              height="16"
              rx="3"
              fill={`url(#svc-hub-${variant})`}
              stroke="#057A72"
              strokeWidth="1.4"
            />
            <path
              d="M148 88 L148 108 L158 108 L154 88 Z"
              fill="#6FB8B0"
              stroke="#057A72"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
            <circle cx="176" cy="80" r="3" fill="#057A72" opacity=".35" />
          </g>
        </>
      ) : null}

      {variant === "consulting" ? (
        <>
          <circle
            cx="140"
            cy="138"
            r="16"
            fill={`url(#svc-hub-${variant})`}
            opacity=".9"
          />
          <circle cx="140" cy="138" r="16" fill="#FFFDF4" opacity=".16" />
          <circle
            className="what-we-do-service__node-ring"
            cx="140"
            cy="138"
            r="26"
            stroke="#6FB8B0"
            strokeWidth="1.15"
          />
          {[
            {
              id: "b1",
              x: 42,
              y: 96,
              w: 74,
              h: 28,
              side: "left" as const,
              begin: "0s",
            },
            {
              id: "b2",
              x: 162,
              y: 90,
              w: 80,
              h: 26,
              side: "right" as const,
              begin: "1.15s",
            },
            {
              id: "b3",
              x: 56,
              y: 98,
              w: 66,
              h: 24,
              side: "left" as const,
              begin: "2.3s",
            },
            {
              id: "b4",
              x: 150,
              y: 92,
              w: 88,
              h: 28,
              side: "right" as const,
              begin: "3.45s",
            },
            {
              id: "b5",
              x: 72,
              y: 100,
              w: 60,
              h: 22,
              side: "left" as const,
              begin: "4.6s",
            },
          ].map((bubble) => {
            const tip =
              bubble.side === "left"
                ? `M${bubble.x + 14} ${bubble.y + bubble.h} l-6 10 l12 -8 Z`
                : `M${bubble.x + bubble.w - 14} ${bubble.y + bubble.h} l6 10 l-12 -8 Z`;
            const lineY1 = bubble.y + bubble.h * 0.38;
            const lineY2 = bubble.y + bubble.h * 0.62;
            return (
              <g
                key={bubble.id}
                className="what-we-do-service__bubble"
                opacity="0"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 14; 0 4; 0 -36; 0 -78; 0 -102"
                  keyTimes="0; 0.12; 0.5; 0.82; 1"
                  dur="5.5s"
                  begin={bubble.begin}
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.2 0.8 0.2 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.2 1"
                />
                <animate
                  attributeName="opacity"
                  values="0; 1; 0.95; 0.3; 0"
                  keyTimes="0; 0.12; 0.5; 0.82; 1"
                  dur="5.5s"
                  begin={bubble.begin}
                  repeatCount="indefinite"
                />
                <rect
                  x={bubble.x}
                  y={bubble.y}
                  width={bubble.w}
                  height={bubble.h}
                  rx="12"
                  fill={`url(#svc-node-${variant})`}
                  stroke="#057A72"
                  strokeWidth="1.35"
                />
                <path
                  d={tip}
                  fill="#EAF7F4"
                  stroke="#057A72"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d={`M${bubble.x + 12} ${lineY1} h${bubble.w - 28}`}
                  stroke="#057A72"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity=".35"
                />
                <path
                  d={`M${bubble.x + 12} ${lineY2} h${bubble.w - 42}`}
                  stroke="#057A72"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity=".22"
                />
              </g>
            );
          })}
        </>
      ) : null}

      {variant === "ai" ? (
        <>
          {/* Ground line */}
          <path
            d="M18 148 H262"
            stroke="#6FB8B0"
            strokeWidth="2"
            strokeLinecap="round"
            opacity=".35"
          />

          {/* Scene: box stacks the robots work among */}
          <g className="what-we-do-service__box-scene" opacity=".95">
            {/* Left stack — 3 high */}
            <rect
              x="8"
              y="120"
              width="30"
              height="28"
              rx="2.5"
              fill={`url(#svc-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.35"
            />
            <path
              d="M8 134 h30 M23 120 v28"
              stroke="#057A72"
              strokeWidth="1"
              opacity=".35"
            />
            <rect
              x="10"
              y="96"
              width="28"
              height="24"
              rx="2.5"
              fill={`url(#svc-hub-${variant})`}
              stroke="#057A72"
              strokeWidth="1.25"
            />
            <path
              d="M10 108 h28 M24 96 v24"
              stroke="#FFFDF4"
              strokeWidth="1"
              opacity=".35"
            />
            <rect
              x="12"
              y="76"
              width="26"
              height="20"
              rx="2.5"
              fill={`url(#svc-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.25"
            />
            <path
              d="M12 86 h26 M25 76 v20"
              stroke="#057A72"
              strokeWidth="1"
              opacity=".35"
            />

            {/* Mid stack — behind the walk path */}
            <rect
              x="108"
              y="124"
              width="28"
              height="24"
              rx="2.5"
              fill={`url(#svc-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.3"
            />
            <path
              d="M108 136 h28 M122 124 v24"
              stroke="#057A72"
              strokeWidth="1"
              opacity=".35"
            />
            <rect
              x="112"
              y="104"
              width="24"
              height="20"
              rx="2.5"
              fill={`url(#svc-hub-${variant})`}
              stroke="#057A72"
              strokeWidth="1.2"
            />
            <path
              d="M112 114 h24 M124 104 v20"
              stroke="#FFFDF4"
              strokeWidth="1"
              opacity=".32"
            />

            {/* Right stack — destination pile */}
            <rect
              x="236"
              y="122"
              width="32"
              height="26"
              rx="2.5"
              fill={`url(#svc-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.35"
            />
            <path
              d="M236 135 h32 M252 122 v26"
              stroke="#057A72"
              strokeWidth="1"
              opacity=".35"
            />
            <rect
              x="240"
              y="100"
              width="28"
              height="22"
              rx="2.5"
              fill={`url(#svc-hub-${variant})`}
              stroke="#057A72"
              strokeWidth="1.25"
            />
            <path
              d="M240 111 h28 M254 100 v22"
              stroke="#FFFDF4"
              strokeWidth="1"
              opacity=".35"
            />
            <rect
              x="244"
              y="82"
              width="24"
              height="18"
              rx="2.5"
              fill={`url(#svc-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.2"
            />
            <path
              d="M244 91 h24 M256 82 v18"
              stroke="#057A72"
              strokeWidth="1"
              opacity=".32"
            />

            {/* Loose box on the floor */}
            <rect
              x="92"
              y="132"
              width="22"
              height="16"
              rx="2"
              fill={`url(#svc-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.2"
            />
            <path
              d="M92 140 h22 M103 132 v16"
              stroke="#057A72"
              strokeWidth="1"
              opacity=".3"
            />
          </g>

          {/* Robot 1 — picks a box up and sets it down */}
          <g className="what-we-do-service__worker what-we-do-service__worker--lift">
            <line
              x1="64"
              y1="58"
              x2="64"
              y2="70"
              stroke="#057A72"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <circle cx="64" cy="54" r="4" fill="#057A72" />
            <rect
              x="46"
              y="70"
              width="36"
              height="26"
              rx="8"
              fill={`url(#svc-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.6"
            />
            <circle cx="57" cy="81" r="3.25" fill="#057A72" />
            <circle cx="71" cy="81" r="3.25" fill="#057A72" />
            <circle cx="58.2" cy="79.8" r="1.1" fill="#F7FFFE" />
            <circle cx="72.2" cy="79.8" r="1.1" fill="#F7FFFE" />
            <path
              d="M57 90 h14"
              stroke="#057A72"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity=".5"
            />
            <rect
              x="50"
              y="100"
              width="28"
              height="24"
              rx="6"
              fill={`url(#svc-hub-${variant})`}
            />
            <path
              d="M58 124 v24"
              stroke="#057A72"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M70 124 v24"
              stroke="#057A72"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Left arm — hinged at shoulder */}
            <g transform="translate(50 108)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="38; 118; 118; 38; 38"
                  keyTimes="0; 0.28; 0.48; 0.76; 1"
                  dur="3.6s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.6 1; 0.4 0 0.2 1; 0.4 0 0.6 1"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="30"
                  stroke="#057A72"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="30" r="3" fill="#057A72" />
              </g>
              <circle cx="0" cy="0" r="3.5" fill="#057A72" />
            </g>

            {/* Right arm — hinged at shoulder */}
            <g transform="translate(78 108)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-38; -118; -118; -38; -38"
                  keyTimes="0; 0.28; 0.48; 0.76; 1"
                  dur="3.6s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.6 1; 0.4 0 0.2 1; 0.4 0 0.6 1"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="30"
                  stroke="#057A72"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="30" r="3" fill="#057A72" />
              </g>
              <circle cx="0" cy="0" r="3.5" fill="#057A72" />
            </g>

            {/* Box lifts in sync with the arm swing */}
            <g className="what-we-do-service__lift-group">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 -26; 0 -26; 0 0; 0 0"
                keyTimes="0; 0.28; 0.48; 0.76; 1"
                dur="3.6s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.6 1; 0.4 0 0.2 1; 0.4 0 0.6 1"
              />
              <rect
                x="32"
                y="120"
                width="64"
                height="28"
                rx="3"
                fill={`url(#svc-node-${variant})`}
                stroke="#057A72"
                strokeWidth="1.6"
              />
              <path
                d="M32 134 h64 M64 120 v28"
                stroke="#057A72"
                strokeWidth="1.15"
                opacity=".4"
              />
            </g>
          </g>

          {/* Robot 2 — walks among the stacks; box covers lower face + torso */}
          <g className="what-we-do-service__worker what-we-do-service__worker--carry">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 56 0; 56 0; 0 0; 0 0"
              keyTimes="0; 0.4; 0.55; 0.95; 1"
              dur="5.2s"
              repeatCount="indefinite"
            />

            <line
              x1="158"
              y1="58"
              x2="158"
              y2="70"
              stroke="#057A72"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <circle cx="158" cy="54" r="4" fill="#057A72" />
            <rect
              x="140"
              y="70"
              width="36"
              height="26"
              rx="8"
              fill={`url(#svc-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.6"
            />
            <circle cx="151" cy="81" r="3.25" fill="#057A72" />
            <circle cx="165" cy="81" r="3.25" fill="#057A72" />
            <circle cx="152.2" cy="79.8" r="1.1" fill="#F7FFFE" />
            <circle cx="166.2" cy="79.8" r="1.1" fill="#F7FFFE" />

            <rect
              x="144"
              y="100"
              width="28"
              height="24"
              rx="6"
              fill={`url(#svc-hub-${variant})`}
            />
            <path
              className="what-we-do-service__leg what-we-do-service__leg--l"
              d="M152 124 v24"
              stroke="#057A72"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              className="what-we-do-service__leg what-we-do-service__leg--r"
              d="M164 124 v24"
              stroke="#057A72"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            <g className="what-we-do-service__face-box">
              <rect
                x="126"
                y="84"
                width="64"
                height="36"
                rx="3"
                fill={`url(#svc-node-${variant})`}
                stroke="#057A72"
                strokeWidth="1.6"
              />
              <path
                d="M126 102 h64 M158 84 v36"
                stroke="#057A72"
                strokeWidth="1.15"
                opacity=".4"
              />
            </g>

            <path
              d="M144 112 H126"
              stroke="#057A72"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M172 112 H190"
              stroke="#057A72"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>
        </>
      ) : null}
    </svg>
  );
}

const integration = [
  {
    number: "01",
    title: "Your tools stay",
    copy: "CRM, email, sheets, ops software, forms—we connect what you already trust. No rip-and-replace. No forced platform.",
  },
  {
    number: "02",
    title: "Workflows speed up",
    copy: "Information moves where it needs to go. Handoffs shrink. Your team spends less time chasing status and more time on work that matters.",
  },
  {
    number: "03",
    title: "Savings compound",
    copy: "Hours reclaimed. Effort reduced. Cost lowered. We measure what changed—then refine so the gains keep building.",
  },
];

const engagement = [
  {
    title: "Discover",
    copy: "We sit with your team, map the real workflow, and find the bottlenecks worth fixing—so we invest where it saves the most time and money.",
  },
  {
    title: "Design & connect",
    copy: "We design the automation around your existing systems, wire the integrations, and keep you in the loop until it feels right.",
  },
  {
    title: "Launch & stay with it",
    copy: "We launch carefully, watch the first weeks of real use, and stay close—so you get a working process, not a brittle handoff.",
  },
];

const networkNodes = [
  { id: "a", cx: 960, cy: 360, r: 26, delay: "0s" },
  { id: "b", cx: 1020, cy: 580, r: 22, delay: "0.55s" },
  { id: "c", cx: 1120, cy: 680, r: 24, delay: "1.1s" },
  { id: "d", cx: 1490, cy: 620, r: 22, delay: "1.65s" },
  { id: "e", cx: 1510, cy: 320, r: 24, delay: "2.2s" },
] as const;

const mergeJunctions = [
  { id: "j1", cx: 1110, cy: 450, r: 15, delay: "0.35s" },
  { id: "j2", cx: 1385, cy: 490, r: 15, delay: "1.9s" },
] as const;

const hub = { cx: 1260, cy: 470 } as const;

type Point = { cx: number; cy: number };

function spokeParts(
  from: Point,
  to: Point,
  bend: number,
) {
  const midX = (from.cx + to.cx) / 2 + bend;
  const midY = (from.cy + to.cy) / 2 - bend * 0.35;
  const q = `Q${midX} ${midY} ${to.cx} ${to.cy}`;
  return {
    d: `M${from.cx} ${from.cy} ${q}`,
    q,
  };
}

function WhatWeDoScene() {
  const [nodeA, nodeB, nodeC, nodeD, nodeE] = networkNodes;
  const [j1, j2] = mergeJunctions;

  const branchA = spokeParts(nodeA, j1, -36);
  const branchB = spokeParts(nodeB, j1, 30);
  const stemJ1 = spokeParts(j1, hub, -8);
  const directC = spokeParts(nodeC, hub, 20);
  const branchD = spokeParts(nodeD, j2, 32);
  const branchE = spokeParts(nodeE, j2, -26);
  const stemJ2 = spokeParts(j2, hub, 10);

  const segments = [
    { id: "a-j1", d: branchA.d, delay: "0s", weight: 1.35 },
    { id: "b-j1", d: branchB.d, delay: "0.7s", weight: 1.35 },
    { id: "j1-hub", d: stemJ1.d, delay: "0.35s", weight: 2.75 },
    { id: "c-hub", d: directC.d, delay: "1.1s", weight: 1.5 },
    { id: "d-j2", d: branchD.d, delay: "1.65s", weight: 1.35 },
    { id: "e-j2", d: branchE.d, delay: "2.4s", weight: 1.35 },
    { id: "j2-hub", d: stemJ2.d, delay: "1.9s", weight: 2.75 },
  ];

  const packets = [
    { id: "p-a", d: `${branchA.d} ${stemJ1.q}`, delay: "0s" },
    { id: "p-b", d: `${branchB.d} ${stemJ1.q}`, delay: "0.7s" },
    { id: "p-c", d: directC.d, delay: "1.1s" },
    { id: "p-d", d: `${branchD.d} ${stemJ2.q}`, delay: "1.65s" },
    { id: "p-e", d: `${branchE.d} ${stemJ2.q}`, delay: "2.4s" },
  ];

  return (
    <svg
      className="what-we-do-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="wwd-glow" x1="1100" y1="120" x2="1480" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".15" />
        </linearGradient>
        <linearGradient id="wwd-node" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id="wwd-hub" x1="1180" y1="320" x2="1380" y2="560">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <filter id="wwd-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <circle
        className="what-we-do-hero__glow"
        cx="1280"
        cy="240"
        r="160"
        fill="url(#wwd-glow)"
        opacity=".85"
      />

      <g className="what-we-do-hero__mesh" opacity=".22">
        <path
          d={`M${networkNodes[0].cx} ${networkNodes[0].cy} L${networkNodes[1].cx} ${networkNodes[1].cy} L${networkNodes[2].cx} ${networkNodes[2].cy}`}
          stroke="#075752"
          strokeWidth="1"
        />
        <path
          d={`M${networkNodes[2].cx} ${networkNodes[2].cy} L${networkNodes[3].cx} ${networkNodes[3].cy} L${networkNodes[4].cx} ${networkNodes[4].cy}`}
          stroke="#075752"
          strokeWidth="1"
        />
        <path
          d={`M${networkNodes[4].cx} ${networkNodes[4].cy} L${networkNodes[0].cx} ${networkNodes[0].cy}`}
          stroke="#075752"
          strokeWidth="1"
        />
      </g>

      <g className="what-we-do-hero__paths">
        {segments.map(({ id, d, delay, weight }) => {
          const isStem = id.endsWith("-hub") && id.startsWith("j");
          return (
            <g key={id}>
              <path
                d={d}
                stroke="#3A948C"
                strokeWidth={weight}
                opacity={isStem ? 0.4 : 0.26}
              />
              <path
                className="what-we-do-hero__path"
                d={d}
                stroke="#057A72"
                strokeWidth={weight + 0.5}
                strokeDasharray={isStem ? "9 12" : "7 14"}
                style={{ animationDelay: delay }}
              />
            </g>
          );
        })}
        {packets.map(({ id, d, delay }) => (
          <circle
            key={id}
            className="what-we-do-hero__packet"
            r="4.5"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.25"
            style={{ animationDelay: delay }}
          >
            <animateMotion
              dur="3.6s"
              begin={delay}
              repeatCount="indefinite"
              path={d}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        ))}
      </g>

      <g className="what-we-do-hero__network">
        {networkNodes.map((node) => (
          <g
            key={node.id}
            className="what-we-do-hero__node"
            style={{ animationDelay: node.delay }}
          >
            <circle
              className="what-we-do-hero__node-ring"
              cx={node.cx}
              cy={node.cy}
              r={node.r + 10}
              stroke="#6FB8B0"
              strokeWidth="1"
              style={{ animationDelay: node.delay }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="url(#wwd-node)"
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="#057A72"
              opacity=".55"
            />
          </g>
        ))}

        {mergeJunctions.map((junction) => (
          <g
            key={junction.id}
            className="what-we-do-hero__node what-we-do-hero__junction"
            style={{ animationDelay: junction.delay }}
          >
            <circle
              className="what-we-do-hero__node-ring"
              cx={junction.cx}
              cy={junction.cy}
              r={junction.r + 7}
              stroke="#6FB8B0"
              strokeWidth="1"
              style={{ animationDelay: junction.delay }}
            />
            <circle
              cx={junction.cx}
              cy={junction.cy}
              r={junction.r}
              fill="url(#wwd-node)"
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <circle
              cx={junction.cx}
              cy={junction.cy}
              r="3"
              fill="#057A72"
              opacity=".65"
            />
          </g>
        ))}

        <g className="what-we-do-hero__hub">
          <circle
            className="what-we-do-hero__hub-ring"
            cx={hub.cx}
            cy={hub.cy}
            r="78"
            stroke="#6FB8B0"
            strokeWidth="1.5"
            opacity=".45"
          />
          <circle
            className="what-we-do-hero__hub-ring what-we-do-hero__hub-ring--outer"
            cx={hub.cx}
            cy={hub.cy}
            r="108"
            stroke="#057A72"
            strokeWidth="1"
            opacity=".25"
          />
          <circle cx={hub.cx} cy={hub.cy} r="52" fill="url(#wwd-hub)" />
          <circle
            cx={hub.cx}
            cy={hub.cy}
            r="52"
            fill="#FFFDF4"
            opacity=".18"
            filter="url(#wwd-soften)"
          />
          <path
            d={`M${hub.cx - 18} ${hub.cy}h36M${hub.cx} ${hub.cy - 18}v36`}
            stroke="#F7FFFE"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity=".9"
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

export function WhatWeDoSections() {
  return (
    <>
      <section className="what-we-do-hero">
        <WhatWeDoScene />
        <div className="shell">
          <div className="what-we-do-hero__content">
            <p className="eyebrow">What we do</p>
            
            <h1 className="what-we-do-hero__headline">
              Automate the busywork between the tools you already trust.
            </h1>
            <p className="what-we-do-hero__copy">
              We integrate the systems you run today, speed up the handoffs in
              between, and stay with you from discovery through support—so you
              reclaim time and cost without a rip-and-replace.
            </p>
            <div className="what-we-do-hero__actions">
              <a
                className="button button-primary"
                href="mailto:hello@grandriverlabs.com?subject=Book%20a%20call"
              >
                Book a call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#services">
                See our services
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="what-we-do-hero__cue" href="#services">
          Explore services
        </a>
      </section>

      <section className="section what-we-do-services" id="services">
        <div className="shell">
          <div className="what-we-do-services__top reveal">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="section-heading">
                Four ways we help you move faster.
              </h2>
            </div>
            <p className="section-copy">
              From mapping the bottleneck to shipping the automation, we stay
              close to your business—so the work fits how you already operate.
            </p>
          </div>
          <div className="what-we-do-services__grid reveal">
            {services.map((item, index) => (
              <a
                className="what-we-do-service"
                href={item.href}
                key={item.title}
              >
                <div className="what-we-do-service__visual">
                  <ServiceMotif variant={item.motif} />
                </div>
                <div className="what-we-do-service__body">
                  <span className="what-we-do-service__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <span className="what-we-do-service__explore">
                    Explore
                    <Arrow />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section what-we-do-integrate" id="integrate">
        <div className="shell">
          <div className="what-we-do-integrate__intro reveal">
            <p className="eyebrow">Systems integration</p>
            <div>
              <h2 className="section-heading">
                Connect what you have. Speed up what you do.
              </h2>
              <p className="section-copy">
                Automation should fit into your business—not force your business
                to fit into automation. We plug into the tools your team already
                relies on and turn friction into flow.
              </p>
            </div>
          </div>
          <div className="what-we-do-integrate__points reveal">
            {integration.map((item) => (
              <article className="what-we-do-point" key={item.number}>
                <span className="what-we-do-point__number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section what-we-do-glove" id="how-we-work">
        <div className="shell">
          <div className="what-we-do-glove__top reveal">
            <div>
              <p className="eyebrow">White-glove engagement</p>
              <h2 className="section-heading">
                Personal enough to feel like a partner.
              </h2>
            </div>
            <p className="section-copy">
              You bring the business context. We bring the automation expertise—
              and stay with the work until it saves real time, labor, and money.
            </p>
          </div>
          <ol className="what-we-do-glove__steps reveal">
            {engagement.map((step, index) => (
              <li className="what-we-do-glove__step" key={step.title}>
                {index > 0 ? (
                  <span
                    className="what-we-do-glove__connector"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="what-we-do-glove__connector-line"
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
                <span className="what-we-do-glove__number">
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

export function WhatWeDoCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s find where automation pays for itself.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us how work moves today. We&apos;ll map a practical path from
            your existing systems to measurable time and cost savings.
          </p>
          <div className="use-cases-cta__buttons">
            <a
              className="button button-primary"
              href="mailto:hello@grandriverlabs.com?subject=Book%20a%20call"
            >
              Book a call
              <Arrow />
            </a>
            <a className="button button-secondary" href="/use-cases">
              Browse use cases
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
