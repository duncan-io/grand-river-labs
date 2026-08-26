const RANGE_MIN = 1_500;
const RANGE_MAX = 10_000;
const TYPICAL_MIN = 2_500;
const TYPICAL_MAX = 5_000;
const MEAN = (TYPICAL_MIN + TYPICAL_MAX) / 2;
const LEFT_SIGMA = 1_050;
const RIGHT_SIGMA = 2_400;

const WIDTH = 920;
const HEIGHT = 268;
const PAD = { left: 20, right: 28, top: 36, bottom: 58 };

function density(value: number): number {
  const sigma = value < MEAN ? LEFT_SIGMA : RIGHT_SIGMA;
  const z = (value - MEAN) / sigma;
  return Math.exp(-0.5 * z * z);
}

function xOf(value: number): number {
  const plotWidth = WIDTH - PAD.left - PAD.right;
  return (
    PAD.left + ((value - RANGE_MIN) / (RANGE_MAX - RANGE_MIN)) * plotWidth
  );
}

function yOf(value: number, peak: number): number {
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;
  const baseline = HEIGHT - PAD.bottom;
  return baseline - (density(value) / peak) * plotHeight;
}

function formatTick(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function buildCurve(peak: number) {
  const steps = 96;
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i <= steps; i += 1) {
    const value = RANGE_MIN + ((RANGE_MAX - RANGE_MIN) * i) / steps;
    points.push({ x: xOf(value), y: yOf(value, peak) });
  }

  const baseline = HEIGHT - PAD.bottom;
  const fill = [
    `M ${points[0].x} ${baseline}`,
    ...points.map((point) => `L ${point.x} ${point.y}`),
    `L ${points[points.length - 1].x} ${baseline}`,
    "Z",
  ].join(" ");
  const stroke = [
    `M ${points[0].x} ${points[0].y}`,
    ...points.slice(1).map((point) => `L ${point.x} ${point.y}`),
  ].join(" ");

  return { fill, stroke };
}

type FractionalRangeCurveProps = {
  monthly?: number;
};

export function FractionalRangeCurve({ monthly }: FractionalRangeCurveProps) {
  const peak = density(MEAN);
  const { fill, stroke } = buildCurve(peak);
  const baseline = HEIGHT - PAD.bottom;
  const typicalLeft = xOf(TYPICAL_MIN);
  const typicalRight = xOf(TYPICAL_MAX);
  const markerValue =
    monthly === undefined
      ? undefined
      : clamp(monthly, RANGE_MIN, RANGE_MAX);
  const markerX = markerValue === undefined ? undefined : xOf(markerValue);
  const markerY =
    markerValue === undefined ? undefined : yOf(markerValue, peak);
  const ticks = [RANGE_MIN, TYPICAL_MIN, TYPICAL_MAX, RANGE_MAX];

  return (
    <figure className="calc-curve reveal">
      <figcaption className="calc-curve__caption">
        <p className="calc-curve__kicker">Monthly range</p>
        <p className="calc-curve__lede">
          Engagements start at {formatTick(RANGE_MIN)}. Most land between{" "}
          {formatTick(TYPICAL_MIN)} and {formatTick(TYPICAL_MAX)}. Larger
          scopes can reach {formatTick(RANGE_MAX)}.
        </p>
        {monthly !== undefined ? (
          <p className="calc-curve__current">
            This scenario is modeled at {formatTick(monthly)}/month.
          </p>
        ) : null}
      </figcaption>
      <svg
        className="calc-curve__svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Bell curve of monthly investment from ${formatTick(RANGE_MIN)} to ${formatTick(RANGE_MAX)}, with most engagements between ${formatTick(TYPICAL_MIN)} and ${formatTick(TYPICAL_MAX)}.`}
      >
        <defs>
          <linearGradient id="calc-curve-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#057a72" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#057a72" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <rect
          className="calc-curve__typical"
          x={typicalLeft}
          y={PAD.top}
          width={typicalRight - typicalLeft}
          height={baseline - PAD.top}
        />
        <text
          className="calc-curve__band-label"
          x={(typicalLeft + typicalRight) / 2}
          y={22}
          textAnchor="middle"
          fill="#075752"
          fontSize="14"
        >
          Typical
        </text>
        <path d={fill} fill="url(#calc-curve-fill)" />
        <path
          d={stroke}
          fill="none"
          stroke="#075752"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <line
          x1={PAD.left}
          y1={baseline}
          x2={WIDTH - PAD.right}
          y2={baseline}
          stroke="rgba(16, 47, 47, 0.22)"
          strokeWidth="1"
        />
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={xOf(tick)}
              y1={baseline}
              x2={xOf(tick)}
              y2={baseline + 6}
              stroke="rgba(16, 47, 47, 0.35)"
              strokeWidth="1"
            />
            <text
              className="calc-curve__tick"
              x={xOf(tick)}
              y={baseline + 24}
              textAnchor={
                tick === RANGE_MIN
                  ? "start"
                  : tick === RANGE_MAX
                    ? "end"
                    : "middle"
              }
              fill="#075752"
              fontSize="16"
            >
              {formatTick(tick)}
            </text>
          </g>
        ))}
        {markerX !== undefined && markerY !== undefined && markerValue !== undefined ? (
          <g>
            <line
              x1={markerX}
              y1={markerY}
              x2={markerX}
              y2={baseline}
              stroke="#075752"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
            <circle cx={markerX} cy={markerY} r="5" fill="#075752" />
          </g>
        ) : null}
      </svg>
    </figure>
  );
}
