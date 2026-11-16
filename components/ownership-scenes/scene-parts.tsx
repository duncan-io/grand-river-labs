type ScenePoint = { x: number; y: number };

export function quadPath(from: ScenePoint, to: ScenePoint, bend: number) {
  const midX = (from.x + to.x) / 2 + bend;
  const midY = (from.y + to.y) / 2 - bend * 0.35;
  return `M${from.x} ${from.y} Q${midX} ${midY} ${to.x} ${to.y}`;
}

export function SceneBrowser({
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

export type ChaosMotion = "oscillate" | "arrive" | "drift" | "cross";

export function chaosMotionAttrs(kind: ChaosMotion, dur: string, begin: string) {
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
