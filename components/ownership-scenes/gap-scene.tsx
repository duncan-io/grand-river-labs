import {
  quadPath,
  SceneBrowser,
  ChaosMotion,
  chaosMotionAttrs,
} from "./scene-parts";

const GAP_SLOTS = [
  { id: "backlog", label: "Backlog", x: 48, y: 42, delay: "0s", width: 68 },
  { id: "design", label: "Design", x: 372, y: 46, delay: "0.5s", width: 68 },
  { id: "seo", label: "SEO", x: 42, y: 236, delay: "1.1s", width: 68 },
  { id: "freelance", label: "Freelance", x: 378, y: 238, delay: "1.7s", width: 68 },
] as const;

/** Width of a label pill. Defaults keep the website partner page pixel-matched. */
export function boxWidthFor(label: string) {
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
