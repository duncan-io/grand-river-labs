const engagement = [
  {
    title: "Discover",
    copy: "We sit with your team, map the real workflow, and find the bottlenecks worth fixing—so we invest where it saves the most time and money.",
    motif: "discover" as const,
  },
  {
    title: "Design & connect",
    copy: "We design the automation around your existing systems, wire the integrations, and keep you in the loop until it feels right.",
    motif: "design" as const,
  },
  {
    title: "Launch & monitor",
    copy: "We launch carefully, watch the first weeks of real use, and stay close—so you get a working process, not a brittle handoff.",
    motif: "launch" as const,
  },
];

type EngagementMotifVariant = (typeof engagement)[number]["motif"];

function EngagementMotif({ variant }: { variant: EngagementMotifVariant }) {
  return (
    <svg
      className={`what-we-do-glove__motif what-we-do-glove__motif--${variant}`}
      aria-hidden="true"
      viewBox="0 0 320 220"
      fill="none"
    >
      <defs>
        <linearGradient id={`glove-node-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id={`glove-hub-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
      </defs>

      {variant === "discover" ? (
        <>
          <rect
            x="36"
            y="38"
            width="248"
            height="148"
            rx="16"
            fill={`url(#glove-node-${variant})`}
            stroke="#057A72"
            strokeWidth="1.25"
            opacity=".55"
          />
          <path
            d="M64 78 H 220 M64 108 H 188 M64 138 H 204 M64 168 H 156"
            stroke="#3A948C"
            strokeWidth="2"
            strokeLinecap="round"
            opacity=".28"
          />
          <circle cx="92" cy="78" r="5" fill="#057A72" opacity=".28" />
          <circle cx="168" cy="108" r="5" fill="#057A72" opacity=".22" />
          <circle cx="140" cy="138" r="5" fill="#057A72" opacity=".3" />
          <circle
            className="what-we-do-glove__find"
            cx="188"
            cy="138"
            r="7"
            fill="#057A72"
            opacity=".45"
          />

          <g className="what-we-do-glove__magnifier">
            <animateMotion
              dur="7.5s"
              repeatCount="indefinite"
              path="M88 72 C 130 52, 160 52, 168 58 C 190 72, 220 100, 210 118 C 200 132, 194 136, 188 138 C 160 120, 110 100, 88 72"
              keyTimes="0;0.25;0.5;0.7;0.85;1"
              keyPoints="0;0.28;0.55;0.7;0.82;1"
              calcMode="spline"
              keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"
            />
            <g transform="rotate(-35)">
              <circle
                cx="0"
                cy="0"
                r="38"
                fill="rgba(247, 255, 254, 0.55)"
                stroke="#057A72"
                strokeWidth="4"
              />
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#6FB8B0"
                strokeWidth="1.25"
                opacity=".7"
              />
              <path
                d="M26 26 L52 56"
                stroke="#075752"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M28 28 L48 52"
                stroke="#6FB8B0"
                strokeWidth="3"
                strokeLinecap="round"
                opacity=".55"
              />
              <circle cx="-10" cy="-12" r="10" fill="#FFFDF4" opacity=".35" />
            </g>
          </g>
        </>
      ) : null}

      {variant === "design" ? (
        <>
          {[
            { x: 42, y: 48, label: "CRM" },
            { x: 42, y: 108, label: "Mail" },
            { x: 42, y: 168, label: "Ops" },
          ].map((tool, i) => (
            <g key={tool.label}>
              <rect
                x={tool.x}
                y={tool.y}
                width="56"
                height="28"
                rx="8"
                fill={`url(#glove-node-${variant})`}
                stroke="#057A72"
                strokeWidth="1.4"
              />
              <text
                x={tool.x + 28}
                y={tool.y + 18}
                textAnchor="middle"
                fill="#075752"
                fontSize="11"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
              >
                {tool.label}
              </text>
              <path
                className="what-we-do-glove__path"
                d={`M${tool.x + 56} ${tool.y + 14} C ${tool.x + 110} ${tool.y + 14}, 170 ${110 + (i - 1) * 8}, 210 110`}
                stroke="#057A72"
                strokeWidth="1.75"
                strokeDasharray="6 9"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </g>
          ))}
          <g className="what-we-do-glove__hub">
            <circle
              className="what-we-do-glove__hub-ring what-we-do-glove__hub-ring--outer"
              cx="232"
              cy="110"
              r="42"
              stroke="#6FB8B0"
              strokeWidth="1"
            />
            <circle
              className="what-we-do-glove__hub-ring"
              cx="232"
              cy="110"
              r="32"
              stroke="#6FB8B0"
              strokeWidth="1.25"
            />
            <circle
              cx="232"
              cy="110"
              r="22"
              fill={`url(#glove-hub-${variant})`}
              stroke="#075752"
              strokeWidth="1.5"
            />
            <circle cx="232" cy="110" r="5" fill="#FFFDF4" opacity=".9" />
          </g>
          <circle
            className="what-we-do-glove__packet"
            r="4"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.2"
          >
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              path="M98 62 C 152 62, 170 102, 210 110"
            />
          </circle>
          <circle
            className="what-we-do-glove__packet"
            r="4"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.2"
            style={{ animationDelay: "1.1s" }}
          >
            <animateMotion
              dur="3.2s"
              begin="1.1s"
              repeatCount="indefinite"
              path="M98 122 C 152 122, 170 110, 210 110"
            />
          </circle>
        </>
      ) : null}

      {variant === "launch" ? (
        <>
          {/* Massive multi-tier control wall */}
          <rect
            x="14"
            y="12"
            width="292"
            height="178"
            rx="14"
            fill={`url(#glove-node-${variant})`}
            stroke="#057A72"
            strokeWidth="1.75"
          />
          <rect
            x="22"
            y="20"
            width="276"
            height="128"
            rx="8"
            fill="#D7F0EC"
            stroke="#057A72"
            strokeWidth="1.15"
            opacity=".92"
          />

          {/* Three embedded monitors */}
          {[
            { x: 30, wave: "M38 52 C44 42,50 62,56 48 C62 36,68 60,74 46" },
            {
              x: 122,
              wave: "M130 50 C138 38,144 62,152 44 C160 32,166 58,174 46",
            },
            {
              x: 214,
              wave: "M222 54 C230 40,236 64,244 48 C252 36,258 60,266 44",
            },
          ].map((screen, i) => (
            <g key={screen.x} className="what-we-do-glove__monitor">
              <rect
                x={screen.x}
                y="28"
                width="76"
                height="42"
                rx="5"
                fill="#075752"
                opacity=".9"
              />
              <path
                className="what-we-do-glove__monitor-wave"
                d={screen.wave}
                stroke="#B0E4DC"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <circle
                className="what-we-do-glove__monitor-blip"
                cx={screen.x + 38}
                cy="38"
                r="2.5"
                fill="#FFFDF4"
                style={{ animationDelay: `${i * 0.55}s` }}
              />
            </g>
          ))}

          {/* Dial row */}
          {[42, 72, 102, 138, 168, 198, 234, 264].map((cx, i) => (
            <g key={`dial-${cx}`}>
              <circle
                cx={cx}
                cy="82"
                r="6.5"
                fill={`url(#glove-node-${variant})`}
                stroke="#057A72"
                strokeWidth="1.1"
              />
              <line
                className="what-we-do-glove__dial-needle"
                x1={cx}
                y1={82}
                x2={cx}
                y2={76}
                stroke="#057A72"
                strokeWidth="1.4"
                strokeLinecap="round"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </g>
          ))}

          {/* Dense button field — way more than one arm can manage */}
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 18 }, (_, col) => {
              const cx = 34 + col * 14.5;
              const cy = 98 + row * 10;
              const r = row % 2 === 0 ? 3 : 2.4;
              const delay = `${((row * 18 + col) % 20) * 0.25}s`;
              return (
                <circle
                  key={`b-${row}-${col}`}
                  className="what-we-do-glove__board-btn"
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={
                    (row + col) % 5 === 0
                      ? `url(#glove-hub-${variant})`
                      : "#6FB8B0"
                  }
                  stroke="#075752"
                  strokeWidth="0.65"
                  opacity={(row + col) % 3 === 0 ? 0.95 : 0.65}
                  style={{ animationDelay: delay }}
                />
              );
            }),
          )}

          {/* Lever strip across the lower board */}
          {Array.from({ length: 14 }, (_, i) => {
            const x = 36 + i * 19;
            const h = 10 + ((i * 7) % 17);
            return (
              <g
                key={`lever-${i}`}
                className="what-we-do-glove__lever"
                style={{ animationDelay: `${i * 0.28}s` }}
              >
                <line
                  x1={x}
                  y1={160}
                  x2={x}
                  y2={160 - h}
                  stroke="#057A72"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                />
                <circle
                  cx={x}
                  cy={160 - h}
                  r="3.5"
                  fill={`url(#glove-hub-${variant})`}
                  stroke="#075752"
                  strokeWidth="0.9"
                />
                <rect
                  x={x - 4.5}
                  y={160}
                  width="9"
                  height="4"
                  rx="1.2"
                  fill="#075752"
                  opacity=".4"
                />
              </g>
            );
          })}

          {/* Extra switch row tucked under levers */}
          {Array.from({ length: 20 }, (_, i) => {
            const x = 32 + i * 13.5;
            const on = i % 3 !== 1;
            return (
              <g key={`sw-${i}`}>
                <rect
                  x={x}
                  y="168"
                  width="9"
                  height="12"
                  rx="2"
                  fill="#CCEBE5"
                  stroke="#057A72"
                  strokeWidth="0.8"
                />
                <rect
                  x={x + 1.2}
                  y={on ? 169.5 : 174}
                  width="6.6"
                  height="5"
                  rx="1.2"
                  fill={on ? "#057A72" : "#6FB8B0"}
                  opacity=".85"
                />
              </g>
            );
          })}

          {/* Desk ledge */}
          <rect
            x="14"
            y="190"
            width="292"
            height="18"
            rx="5"
            fill="#B0E4DC"
            stroke="#057A72"
            strokeWidth="1.25"
          />

          {/* Small robot pacing the board */}
          <g className="what-we-do-glove__ops-robot">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="42 158; 42 158; 110 158; 110 158; 175 158; 175 158; 248 158; 248 158; 175 158; 175 158; 110 158; 110 158; 42 158"
              keyTimes="0;0.08;0.18;0.28;0.38;0.48;0.58;0.68;0.78;0.86;0.92;0.96;1"
              dur="18s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.2 1;0.45 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.45 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.45 0 0.2 1;0.4 0 0.2 1;0.45 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"
            />
            <g transform="scale(0.58)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 -1.5; 0 0; 0 -1.5; 0 0; 0 0; 0 -1.5; 0 0; 0 0; 0 -1.5; 0 0; 0 0; 0 0"
                  keyTimes="0;0.08;0.18;0.28;0.38;0.48;0.58;0.68;0.78;0.86;0.92;0.96;1"
                  dur="18s"
                  repeatCount="indefinite"
                />

                <line
                  x1="18"
                  y1="-28"
                  x2="18"
                  y2="-18"
                  stroke="#057A72"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  className="what-we-do-glove__ops-antenna"
                  cx="18"
                  cy="-32"
                  r="3.5"
                  fill="#057A72"
                />

                <g className="what-we-do-glove__ops-head">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 18 12; 18 18 12; 18 18 12; 0 18 12; 0 18 12; 20 18 12; 20 18 12; 0 18 12; 0 18 12; 16 18 12; 16 18 12; 0 18 12; 0 18 12"
                    keyTimes="0;0.08;0.14;0.18;0.28;0.32;0.44;0.48;0.68;0.72;0.82;0.86;1"
                    dur="18s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"
                  />
                  <rect
                    x="2"
                    y="-14"
                    width="32"
                    height="26"
                    rx="8"
                    fill={`url(#glove-node-${variant})`}
                    stroke="#057A72"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="-2" r="3.2" fill="#057A72" />
                  <circle cx="24" cy="-2" r="3.2" fill="#057A72" />
                  <circle cx="13" cy="-3.2" r="1.1" fill="#F7FFFE" />
                  <circle cx="25" cy="-3.2" r="1.1" fill="#F7FFFE" />
                  <ellipse
                    cx="18"
                    cy="6"
                    rx="4.5"
                    ry="2"
                    fill="#057A72"
                    opacity=".7"
                  />
                </g>

                <rect
                  x="6"
                  y="14"
                  width="24"
                  height="22"
                  rx="6"
                  fill={`url(#glove-hub-${variant})`}
                />
                <rect
                  x="12"
                  y="20"
                  width="12"
                  height="6"
                  rx="2"
                  fill="#FFFDF4"
                  opacity=".45"
                />

                <g className="what-we-do-glove__ops-arm-left">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 6 20; -28 6 20; -28 6 20; 0 6 20; 0 6 20; -32 6 20; -32 6 20; 0 6 20; 0 6 20; -24 6 20; -24 6 20; 0 6 20; 0 6 20"
                    keyTimes="0;0.09;0.14;0.18;0.28;0.33;0.44;0.48;0.68;0.73;0.82;0.86;1"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                  <path
                    d="M6 20 C -2 16, -8 8, -6 0"
                    stroke="#057A72"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="-6"
                    cy="-2"
                    r="3.5"
                    fill={`url(#glove-node-${variant})`}
                    stroke="#057A72"
                    strokeWidth="1.1"
                  />
                </g>

                <g className="what-we-do-glove__ops-arm">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 30 20; -35 30 20; -35 30 20; 0 30 20; 0 30 20; -40 30 20; -40 30 20; 0 30 20; 0 30 20; -30 30 20; -30 30 20; 0 30 20; 0 30 20"
                    keyTimes="0;0.09;0.14;0.18;0.28;0.33;0.44;0.48;0.68;0.73;0.82;0.86;1"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                  <path
                    d="M30 20 C 40 14, 46 4, 44 -4"
                    stroke="#057A72"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="44"
                    cy="-6"
                    r="3.5"
                    fill={`url(#glove-node-${variant})`}
                    stroke="#057A72"
                    strokeWidth="1.1"
                  />
                </g>

                <g className="what-we-do-glove__ops-leg what-we-do-glove__ops-leg--l">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 12 36; 18 12 36; 0 12 36; -18 12 36; 0 12 36; 0 12 36; 18 12 36; 0 12 36; -18 12 36; 0 12 36; 0 12 36; 14 12 36; 0 12 36"
                    keyTimes="0;0.08;0.13;0.18;0.28;0.38;0.43;0.48;0.58;0.68;0.78;0.86;1"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                  <path
                    d="M12 36 v16"
                    stroke="#057A72"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
                <g className="what-we-do-glove__ops-leg what-we-do-glove__ops-leg--r">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 24 36; -18 24 36; 0 24 36; 18 24 36; 0 24 36; 0 24 36; -18 24 36; 0 24 36; 18 24 36; 0 24 36; 0 24 36; -14 24 36; 0 24 36"
                    keyTimes="0;0.08;0.13;0.18;0.28;0.38;0.43;0.48;0.58;0.68;0.78;0.86;1"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                  <path
                    d="M24 36 v16"
                    stroke="#057A72"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </g>
          </g>
        </>
      ) : null}
    </svg>
  );
}

export function WhiteGloveEngagement() {
  return (
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
          <ol className="what-we-do-glove__journey reveal">
            {engagement.map((step, index) => {
              const flipped = index % 2 === 1;
              return (
                <li
                  className={`what-we-do-glove__row${flipped ? " what-we-do-glove__row--flip" : ""}`}
                  key={step.title}
                >
                  <div className="what-we-do-glove__marker" aria-hidden="true">
                    <span className="what-we-do-glove__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="what-we-do-glove__copy">
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                  <div className="what-we-do-glove__visual">
                    <EngagementMotif variant={step.motif} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
  );
}
