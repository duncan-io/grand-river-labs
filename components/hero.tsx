import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

function RiverScene() {
  return (
    <svg
      className="hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="ridge-far" x1="200" y1="380" x2="1400" y2="720">
          <stop stopColor="#B5E0DA" />
          <stop offset="1" stopColor="#7FC4BC" />
        </linearGradient>
        <linearGradient id="ridge-near" x1="100" y1="520" x2="1500" y2="860">
          <stop stopColor="#8ACEC7" />
          <stop offset="1" stopColor="#4EAAA2" />
        </linearGradient>
        <linearGradient id="river" x1="200" y1="520" x2="1500" y2="780">
          <stop stopColor="#F7FFFE" />
          <stop offset="0.4" stopColor="#EAF9F7" />
          <stop offset="1" stopColor="#BCE8E4" />
        </linearGradient>
        <linearGradient id="river-sheen" x1="300" y1="540" x2="1400" y2="760">
          <stop stopColor="#FFFFFF" stopOpacity=".5" />
          <stop offset="0.5" stopColor="#F7FFFE" stopOpacity=".18" />
          <stop offset="1" stopColor="#BCE8E4" stopOpacity="0" />
        </linearGradient>
        <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <circle
        cx="1240"
        cy="212"
        r="102"
        fill="#FFFDF4"
        opacity=".88"
        filter="url(#soften)"
      />
      <circle cx="1240" cy="212" r="68" fill="#FFFBEA" opacity=".9" />

      <g fill="#fff" opacity=".52">
        <ellipse cx="985" cy="180" rx="90" ry="20" />
        <ellipse cx="1060" cy="164" rx="100" ry="28" />
        <ellipse cx="1450" cy="320" rx="130" ry="23" />
      </g>

      {/* Far bank — spans full width behind the channel */}
      <path
        d="M-40 560
          C180 470, 360 500, 520 540
          C700 590, 860 500, 1040 470
          C1220 440, 1380 500, 1640 460
          V900 H-40 Z"
        fill="url(#ridge-far)"
        opacity=".7"
      />

      {/* River — continuous meander across the hero */}
      <path
        d="M-60 620
          C120 560, 280 580, 420 620
          C580 670, 720 600, 880 560
          C1040 520, 1180 560, 1340 620
          C1460 665, 1560 680, 1660 660
          L1660 780
          C1520 800, 1400 790, 1280 750
          C1120 700, 980 660, 820 690
          C660 720, 520 780, 360 760
          C200 740, 80 700, -60 720
          Z"
        fill="url(#river)"
      />

      {/* Soft static sheen along the channel */}
      <path
        d="M40 640
          C200 590, 340 610, 480 650
          C640 695, 780 630, 940 590
          C1100 550, 1240 590, 1400 650
          C1480 680, 1560 690, 1620 680
          L1600 720
          C1480 730, 1360 710, 1220 670
          C1060 620, 920 590, 760 620
          C600 650, 460 700, 300 690
          C160 680, 60 660, 20 670
          Z"
        fill="url(#river-sheen)"
      />

      {/* Near bank accents along the lower edge */}
      <path
        d="M-40 760
          C160 720, 320 740, 480 790
          C660 850, 820 780, 1000 750
          C1180 720, 1360 770, 1640 740
          V900 H-40 Z"
        fill="url(#ridge-near)"
        opacity=".85"
      />

      {/* Static water highlight arcs */}
      <g strokeLinecap="round" fill="none">
        <path
          d="M180 640c70-18 140-10 200 18"
          stroke="#69BDB6"
          strokeWidth="3"
          opacity=".4"
        />
        <path
          d="M560 655c80-22 155-8 220 28"
          stroke="#F5FCFB"
          strokeWidth="4"
          opacity=".55"
        />
        <path
          d="M900 590c75-16 150-4 210 30"
          stroke="#69BDB6"
          strokeWidth="3"
          opacity=".38"
        />
        <path
          d="M1180 630c70-14 140 2 195 32"
          stroke="#F5FCFB"
          strokeWidth="4"
          opacity=".5"
        />
      </g>

      {/* Ridge light strokes */}
      <path
        d="M240 740c55-28 110-34 165-18M1280 710c50-30 105-38 160-20"
        stroke="#F5FCFB"
        strokeWidth="5"
        strokeLinecap="round"
        opacity=".4"
      />

      <path
        d="M0 820c278-44 505-31 750 11 200 34 391 36 850-19v88H0v-80Z"
        fill="#EAF7F4"
        opacity=".92"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <RiverScene />
      <div className="shell">
        <div className="hero__content">
          <h1 className="hero__headline">
            Your Fractional Digital Department
          </h1>
          <p className="hero__copy">
            Senior digital leadership and hands-on execution—without hiring a
            full-time team. One partner owns the digital side, sets priorities
            from business impact, and ships the work.
          </p>
          <div className="hero__actions">
            <a
              className="button button-primary"
              href={BOOK_CALL_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
              <Arrow />
            </a>
            <a className="button button-secondary" href="#contact">
              Tell us what&apos;s getting in the way
            </a>
          </div>
        </div>
      </div>
      <a className="hero__cue" href="#digital-strategy">
        See our approach
      </a>
    </section>
  );
}
