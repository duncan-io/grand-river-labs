export function WhitelabelScene() {
  return (
    <svg
      className="whitelabel-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="wl-engine" x1="980" y1="280" x2="1380" y2="720">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#3A948C" />
        </linearGradient>
        <linearGradient id="wl-facade" x1="900" y1="200" x2="1180" y2="680">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
        <filter id="wl-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <circle
        className="whitelabel-hero__glow"
        cx="1180"
        cy="260"
        r="120"
        fill="#FFFDF4"
        opacity=".7"
        filter="url(#wl-soften)"
      />

      {/* Delivery / engine layer — sits behind the brand façade */}
      <g className="whitelabel-hero__engine" opacity=".88">
        <path
          d="M980 310c90-70 190-90 290-40 70 35 130 30 190-20v380c-80 40-170 55-270 20-95-33-180-10-260 45V310Z"
          fill="url(#wl-engine)"
        />
        <path
          d="M1040 420h280M1040 480h220M1040 540h250"
          stroke="#EAF9F7"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".45"
        />
        <circle cx="1070" cy="420" r="7" fill="#F5FCFB" opacity=".7" />
        <circle cx="1070" cy="480" r="7" fill="#F5FCFB" opacity=".55" />
        <circle cx="1070" cy="540" r="7" fill="#F5FCFB" opacity=".4" />
        <path
          className="whitelabel-hero__pulse-ring"
          d="M1280 500c28 0 50 22 50 50s-22 50-50 50-50-22-50-50 22-50 50-50Z"
          stroke="#EAF9F7"
          strokeWidth="2"
          opacity=".5"
        />
        <circle cx="1280" cy="550" r="14" fill="#F5FCFB" opacity=".65" />
      </g>

      {/* Front-stage brand façade */}
      <g className="whitelabel-hero__facade">
        <path
          d="M780 240h320c18 0 32 14 32 32v400c0 18-14 32-32 32H780c-18 0-32-14-32-32V272c0-18 14-32 32-32Z"
          fill="url(#wl-facade)"
        />
        <path
          d="M780 240h320c18 0 32 14 32 32v48H748v-48c0-18 14-32 32-32Z"
          fill="#CDEBE6"
          opacity=".85"
        />
        <path
          d="M820 360h200M820 410h160M820 460h180"
          stroke="#5F7976"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity=".35"
        />
        <rect
          x="820"
          y="520"
          width="110"
          height="36"
          rx="4"
          fill="#057A72"
          opacity=".85"
        />
        <text
          x="875"
          y="300"
          textAnchor="middle"
          fill="#075752"
          fontFamily="Georgia, serif"
          fontSize="22"
          fontWeight="600"
          letterSpacing="1.5"
          opacity=".75"
        >
          YOUR BRAND
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
