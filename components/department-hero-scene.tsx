"use client";

import { useId } from "react";

function svgId(reactId: string, name: string) {
  return `dept-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}-${name}`;
}

export function DepartmentHeroScene() {
  const reactId = useId();
  const glowId = svgId(reactId, "glow");
  const nodeFillId = svgId(reactId, "node");
  const youFillId = svgId(reactId, "you");
  const hubFillId = svgId(reactId, "hub");
  const arrowId = svgId(reactId, "arrow");

  const hub = { cx: 1280, cy: 450 };
  const you = { cx: 1475, cy: 450 };
  const nodes = [
    { id: "strategy", label: "Strategy", cx: 1080, cy: 310, delay: "0s" },
    { id: "auto", label: "Automation", cx: 1065, cy: 390, delay: "0.4s" },
    { id: "analytics", label: "Analytics", cx: 1065, cy: 510, delay: "0.8s" },
    { id: "execute", label: "Execute", cx: 1080, cy: 590, delay: "1.2s" },
  ] as const;

  const inboundPaths = nodes.map((node, index) => {
    const midX = (node.cx + hub.cx) / 2 + (index % 2 === 0 ? 14 : -10);
    const midY = (node.cy + hub.cy) / 2;
    return {
      id: node.id,
      d: `M${node.cx + 42} ${node.cy} Q${midX} ${midY} ${hub.cx - 48} ${hub.cy}`,
      delay: node.delay,
    };
  });

  const outboundPath = {
    id: "you",
    d: `M${hub.cx + 48} ${hub.cy} Q${(hub.cx + you.cx) / 2} ${hub.cy - 6} ${you.cx - 48} ${you.cy}`,
    delay: "1.8s",
  };

  return (
    <svg
      className="mkt-hero__scene fdd-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id={glowId} x1="1180" y1="140" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".15" />
        </linearGradient>
        <linearGradient id={nodeFillId} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id={youFillId} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFFDF4" />
          <stop offset="1" stopColor="#B0E4DC" />
        </linearGradient>
        <linearGradient id={hubFillId} x1="1220" y1="360" x2="1400" y2="560">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10Z" fill="#057A72" />
        </marker>
      </defs>

      <circle
        className="mkt-hero__glow"
        cx="1380"
        cy="280"
        r="160"
        fill={`url(#${glowId})`}
        opacity=".85"
      />

      {inboundPaths.map((path) => (
        <g key={path.id}>
          <path d={path.d} stroke="#3A948C" strokeWidth="1.4" opacity=".26" />
          <path
            className="mkt-hero__path"
            d={path.d}
            stroke="#057A72"
            strokeWidth="1.85"
            strokeDasharray="7 12"
            style={{ animationDelay: path.delay }}
          />
          <circle
            className="mkt-hero__packet"
            r="4.2"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.2"
          >
            <animateMotion
              dur="3.6s"
              begin={path.delay}
              repeatCount="indefinite"
              path={path.d}
            />
          </circle>
        </g>
      ))}

      <g>
        <path
          d={outboundPath.d}
          stroke="#3A948C"
          strokeWidth="2.2"
          opacity=".3"
        />
        <path
          className="mkt-hero__path fdd-hero__outbound"
          d={outboundPath.d}
          stroke="#057A72"
          strokeWidth="2.6"
          strokeDasharray="8 10"
          markerEnd={`url(#${arrowId})`}
          style={{ animationDelay: outboundPath.delay }}
        />
        <circle
          className="mkt-hero__packet"
          r="5.2"
          fill="#FFFDF4"
          stroke="#057A72"
          strokeWidth="1.4"
        >
          <animateMotion
            dur="3.2s"
            begin={outboundPath.delay}
            repeatCount="indefinite"
            path={outboundPath.d}
          />
        </circle>
      </g>

      {nodes.map((node) => (
        <g
          key={node.id}
          className="mkt-hero__node"
          style={{ animationDelay: node.delay }}
        >
          <circle
            className="mkt-hero__node-ring"
            cx={node.cx}
            cy={node.cy}
            r="28"
            stroke="#6FB8B0"
            strokeWidth="1"
            style={{ animationDelay: node.delay }}
          />
          <rect
            x={node.cx - 42}
            y={node.cy - 14}
            width="84"
            height="28"
            rx="8"
            fill={`url(#${nodeFillId})`}
            stroke="#057A72"
            strokeWidth="1.4"
          />
          <text
            x={node.cx}
            y={node.cy + 4}
            textAnchor="middle"
            fill="#057A72"
            fontFamily="var(--font-outfit), sans-serif"
            fontSize="10.5"
            fontWeight="650"
          >
            {node.label}
          </text>
        </g>
      ))}

      <g className="fdd-hero__hub">
        <circle
          className="fdd-hero__hub-ring"
          cx={hub.cx}
          cy={hub.cy}
          r="72"
          stroke="#6FB8B0"
          strokeWidth="1.5"
          opacity=".45"
        />
        <circle
          className="fdd-hero__hub-ring fdd-hero__hub-ring--outer"
          cx={hub.cx}
          cy={hub.cy}
          r="98"
          stroke="#057A72"
          strokeWidth="1"
          opacity=".22"
        />
        <circle cx={hub.cx} cy={hub.cy} r="48" fill={`url(#${hubFillId})`} />
        <text
          x={hub.cx}
          y={hub.cy + 5}
          textAnchor="middle"
          fill="#F7FFFE"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="13"
          fontWeight="700"
        >
          GR Labs
        </text>
      </g>

      <g className="fdd-hero__you mkt-hero__node" style={{ animationDelay: "1.8s" }}>
        <circle
          className="mkt-hero__node-ring"
          cx={you.cx}
          cy={you.cy}
          r="38"
          stroke="#6FB8B0"
          strokeWidth="1.25"
          style={{ animationDelay: "1.8s" }}
        />
        <rect
          x={you.cx - 48}
          y={you.cy - 18}
          width="96"
          height="36"
          rx="11"
          fill={`url(#${youFillId})`}
          stroke="#057A72"
          strokeWidth="1.8"
        />
        <text
          x={you.cx}
          y={you.cy + 5}
          textAnchor="middle"
          fill="#057A72"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="14"
          fontWeight="700"
        >
          You
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
