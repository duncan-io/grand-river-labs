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

export function WhatWeDoScene() {
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
