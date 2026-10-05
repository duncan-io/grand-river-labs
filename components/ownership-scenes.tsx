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

const GAP_SLOTS = [
  { id: "backlog", label: "Backlog", x: 48, y: 42, delay: "0s", width: 68 },
  { id: "design", label: "Design", x: 372, y: 46, delay: "0.5s", width: 68 },
  { id: "seo", label: "SEO", x: 42, y: 236, delay: "1.1s", width: 68 },
  { id: "freelance", label: "Freelance", x: 378, y: 238, delay: "1.7s", width: 68 },
] as const;

/** Width of a label pill. Defaults keep the website partner page pixel-matched. */
function boxWidthFor(label: string) {
  return Math.max(56, Math.min(108, Math.ceil(label.length * 6.6) + 20));
}

function fitGapX(x: number, width: number) {
  const half = width / 2;
  return Math.min(Math.max(x, half + 2), 420 - half - 2);
}

export function OwnershipGapScene({
  labels,
}: {
  /** Four corner labels. Omit to keep Backlog, Design, SEO, and Freelance. */
  labels?: readonly string[];
} = {}) {
  const site = { x: 210, y: 140 };

  const labeled = GAP_SLOTS.map((slot, index) => {
    const next = labels?.[index];
    if (!next) return slot;
    const width = boxWidthFor(next);
    return { ...slot, label: next, width, x: fitGapX(slot.x, width) };
  });

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
              x={-node.width / 2}
              y="-14"
              width={node.width}
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

const HUB_SLOTS = [
  { id: "design", label: "Design", x: 58, y: 48, delay: "0s", w: 68 },
  { id: "dev", label: "Development", x: 58, y: 110, delay: "0.4s", w: 92 },
  { id: "seo", label: "SEO", x: 58, y: 172, delay: "0.8s", w: 56 },
  { id: "convert", label: "Convert", x: 58, y: 234, delay: "1.2s", w: 72 },
] as const;

export function DepartmentOwnershipScene({
  nodes,
  hubLabel = "GR Labs",
}: {
  /** Four inbound labels. Omit to keep Design, Development, SEO, and Convert. */
  nodes?: readonly string[];
  hubLabel?: string;
} = {}) {
  const hub = { x: 228, y: 132 };
  const site = { x: 358, y: 132 };

  const serviceNodes = HUB_SLOTS.map((slot, index) => {
    const next = nodes?.[index];
    if (!next) return slot;
    return { ...slot, label: next, w: boxWidthFor(next) };
  });

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
            {hubLabel}
          </text>
        </g>
      </g>

      <g transform={`translate(${site.x} ${site.y})`}>
        <SceneBrowser gradientId="ws-dept-browser" />
      </g>
    </svg>
  );
}

export function ServiceIcon({ label }: { label: string }) {
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
    case "Route":
      return (
        <svg {...common}>
          <rect
            x="16"
            y="8"
            width="16"
            height="32"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M21 12h6M22 33h4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Rank":
      return (
        <svg {...common}>
          <path
            d="M24 8 34 12v9.5c0 6.2-4.2 10.6-10 14.5-5.8-3.9-10-8.3-10-14.5V12L24 8Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="m18.5 23 3.5 3.5 7.5-8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Advise":
      return (
        <svg {...common}>
          <path
            d="M14 8.5 32 20.5l-7.2 1.6 4.4 8.2-3.6 1.9-4.5-8.2-6.1 5.4V8.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Target":
      return (
        <svg {...common}>
          <path
            d="M24 42s11-9.2 11-17.2A11 11 0 1 0 13 24.8C13 32.8 24 42 24 42Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    case "Site":
      return (
        <svg {...common}>
          <rect
            x="15"
            y="6"
            width="18"
            height="36"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <rect
            x="18"
            y="12"
            width="12"
            height="8"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M18 24.5h12M18 29h8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M22 37.5h4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Convert":
      return (
        <svg {...common}>
          <path
            d="M10 12h28L30 23H18L10 12Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M18 23h12l-2.2 6.5h-7.6L18 23Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M21.2 29.5h5.6L24 37l-2.8-7.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Compound":
      return (
        <svg {...common}>
          <path
            d="M8 34 18 24l6 6 14-16"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 14h10v10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
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
