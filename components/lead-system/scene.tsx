const BAR_X = 210;

const BAR_WIDTH = 128;

const sources = [
  { name: "Website", reported: 18, booked: 7 },
  { name: "Google Business Profile", reported: 31, booked: 12 },
  { name: "Local Services Ads", reported: 24, booked: 6 },
  { name: "Yelp", reported: 9, booked: 2 },
] as const;

const FONT = "system-ui, -apple-system, sans-serif";

export function LeadSystemHeroScene() {
  return (
    <svg
      className="lead-system-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="lead-system-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="lead-system-panel" x1="968" y1="150" x2="1420" y2="720">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="lead-system-hero__glow"
        cx="1320"
        cy="240"
        r="160"
        fill="url(#lead-system-glow)"
        opacity=".85"
      />

      <g>
        <rect
          x="968"
          y="156"
          width="452"
          height="560"
          rx="22"
          fill="url(#lead-system-panel)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <circle cx="996" cy="188" r="5" fill="#6FB8B0" />
        <circle cx="1014" cy="188" r="5" fill="#3A948C" />
        <circle
          className="lead-system-hero__live"
          cx="1032"
          cy="188"
          r="5"
          fill="#057A72"
        />
        <text
          x="1054"
          y="193"
          fill="#075752"
          fontFamily={FONT}
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          SAMPLE DATA · REPORTED VS. BOOKED
        </text>

        <g transform="translate(996 236)">
          <text
            x="18"
            fill="#3A948C"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            SOURCE
          </text>
          <text
            x={BAR_X}
            fill="#3A948C"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            BOOKED OF REPORTED
          </text>
        </g>

        {sources.map((source, index) => (
          <g
            key={source.name}
            className={`lead-system-hero__row lead-system-hero__row--${index + 1}`}
            transform={`translate(996 ${252 + index * 84})`}
          >
            <rect
              width="396"
              height="72"
              rx="12"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <text
              x="18"
              y="31"
              fill="#075752"
              fontFamily={FONT}
              fontSize="13"
              fontWeight="700"
            >
              {source.name}
            </text>
            <text
              x="18"
              y="51"
              fill="#365e5b"
              fontFamily={FONT}
              fontSize="11"
            >
              {source.reported} reported
            </text>
            <rect
              x={BAR_X}
              y="32"
              width={BAR_WIDTH}
              height="8"
              rx="4"
              fill="#B0E4DC"
            />
            <rect
              className="lead-system-hero__booked"
              x={BAR_X}
              y="32"
              width={(BAR_WIDTH * source.booked) / source.reported}
              height="8"
              rx="4"
              fill="#057A72"
            />
            <text
              x="378"
              y="42"
              textAnchor="end"
              fill="#075752"
              fontFamily={FONT}
              fontSize="20"
              fontWeight="700"
            >
              {source.booked}
            </text>
            <g transform="translate(196 36)">
              <g className="lead-system-hero__check">
                <circle r="8" fill="#057A72" />
                <path
                  d="m-3.5 0.2 2.3 2.3L3.6-2.6"
                  stroke="#FFFDF4"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </g>
        ))}

        <g transform="translate(996 600)">
          <rect
            width="396"
            height="88"
            rx="14"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.6"
          />
          <text
            x="18"
            y="30"
            fill="#3A948C"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            COST PER BOOKED JOB
          </text>
          <text
            x="18"
            y="62"
            fill="#6FB8B0"
            fontFamily={FONT}
            fontSize="13"
            fontWeight="650"
          >
            Platform report: $48 / lead
          </text>
          <text
            className="lead-system-hero__cost"
            x="378"
            y="64"
            textAnchor="end"
            fill="#075752"
            fontFamily={FONT}
            fontSize="28"
            fontWeight="700"
          >
            $164
          </text>
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
