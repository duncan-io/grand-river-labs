import { boxWidthFor } from "./gap-scene";
import { quadPath, SceneBrowser } from "./scene-parts";

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
