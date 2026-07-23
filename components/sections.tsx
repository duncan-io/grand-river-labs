import { industries } from "./industries";

const promises = [
  {
    label: "Time",
    title: "Save time",
    copy: "Cut hours off repetitive process work—so your team gets the day back.",
  },
  {
    label: "Labor",
    title: "Save labor",
    copy: "Fewer handoffs, less re-entry, less busywork. Same throughput, less drag.",
  },
  {
    label: "Money",
    title: "Save money",
    copy: "Lower the cost of getting work done. Turn wasted effort into margin.",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    copy: "We map where time, labor, and cost leak—then fix what matters most.",
  },
  {
    number: "02",
    title: "Automate",
    copy: "We build around your current workflow and the tools you already use.",
  },
  {
    number: "03",
    title: "Amplify",
    copy: "We measure the savings, then refine so they keep compounding.",
  },
];

const industryLinks = industries.map((item) => ({
  href: `/use-cases/${item.slug}`,
  label: item.industry,
}));

function TributaryScene() {
  return (
    <svg
      className="promise__scene"
      aria-hidden="true"
      viewBox="0 0 720 280"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="promise-stream" x1="80" y1="40" x2="680" y2="220">
          <stop stopColor="#8ACEC7" />
          <stop offset="0.55" stopColor="#4EAAA2" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <linearGradient id="promise-sheen" x1="200" y1="60" x2="640" y2="240">
          <stop stopColor="#FFFFFF" stopOpacity=".55" />
          <stop offset="0.5" stopColor="#F7FFFE" stopOpacity=".2" />
          <stop offset="1" stopColor="#BCE8E4" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M40 58c120 8 180 42 250 88 52 34 98 52 150 58"
        stroke="url(#promise-stream)"
        strokeWidth="18"
        strokeLinecap="round"
        opacity=".55"
      />
      <path
        d="M40 140c110-6 170 10 240 36 70 26 130 42 200 48"
        stroke="url(#promise-stream)"
        strokeWidth="22"
        strokeLinecap="round"
        opacity=".7"
      />
      <path
        d="M40 222c130-18 200-8 280 18 70 22 130 34 200 36"
        stroke="url(#promise-stream)"
        strokeWidth="16"
        strokeLinecap="round"
        opacity=".5"
      />

      <path
        className="promise__confluence"
        d="M440 120c70 8 120 28 180 62 28 16 48 28 70 38"
        stroke="url(#promise-stream)"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <path
        className="promise__sheen"
        d="M460 118c60 10 110 30 165 58"
        stroke="url(#promise-sheen)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <g
        className="promise__current"
        stroke="#F5FCFB"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity=".55"
      >
        <path d="M120 56c28 4 48 12 68 24" />
        <path d="M100 138c36 2 62 10 90 22" />
        <path d="M110 218c34-2 60 4 88 14" />
        <path d="M500 140c36 10 64 22 90 36" />
      </g>

      <text
        x="36"
        y="42"
        fill="#075752"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.14em"
      >
        TIME
      </text>
      <text
        x="36"
        y="124"
        fill="#075752"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.14em"
      >
        LABOR
      </text>
      <text
        x="36"
        y="206"
        fill="#075752"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.14em"
      >
        MONEY
      </text>
      <text
        x="600"
        y="248"
        fill="#057A72"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.12em"
      >
        CLARITY
      </text>
    </svg>
  );
}

function AudienceAtmosphere() {
  return (
    <svg
      className="audience__scene"
      aria-hidden="true"
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <ellipse
        cx="1280"
        cy="420"
        rx="420"
        ry="220"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        transform="rotate(-12 1280 420)"
      />
      <ellipse
        cx="1320"
        cy="400"
        rx="280"
        ry="140"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        transform="rotate(-18 1320 400)"
      />
      <path
        d="M720 520c180-40 320-28 480 20 140 42 260 48 400 18"
        stroke="rgba(139,208,202,0.22)"
        strokeWidth="36"
        strokeLinecap="round"
      />
      <path
        d="M780 560c160-28 290-18 430 14 110 26 210 30 340 8"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <circle
        cx="1180"
        cy="160"
        r="90"
        fill="rgba(255,253,244,0.08)"
      />
      <circle cx="1180" cy="160" r="48" fill="rgba(255,251,234,0.1)" />
    </svg>
  );
}

function FlowConnector() {
  return (
    <span className="process-flow__connector" aria-hidden="true">
      <svg viewBox="0 0 80 24" fill="none">
        <path
          className="process-flow__connector-line"
          d="M4 12h64"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
        <path
          d="M62 5.5 72 12l-10 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function PromiseSection() {
  return (
    <section className="section promise" id="approach">
      <div className="shell">
        <div className="promise__stage reveal">
          <div className="promise__intro">
            <p className="eyebrow">What you get</p>
            <h2 className="section-heading">
              Reclaim hours. Reduce effort. Cut cost.
            </h2>
            <p className="section-copy">
              Automation should fit into your business—not the other way around.
              We simplify the work behind the work.
            </p>
          </div>
          <div className="promise__visual">
            <TributaryScene />
          </div>
        </div>

        <div className="promise__outcomes reveal">
          {promises.map((item) => (
            <article className="promise-outcome" key={item.title}>
              <span className="promise-outcome__label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section process" id="process">
      <div className="shell">
        <div className="process__top reveal">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="section-heading">Change without the upheaval.</h2>
          </div>
          <p className="section-copy">
            A clear path from today&apos;s bottleneck to measurable savings.
          </p>
        </div>

        <ol className="process-flow reveal">
          {steps.map((step, index) => (
            <li className="process-flow__step" key={step.number}>
              {index < steps.length - 1 ? <FlowConnector /> : null}
              <span className="process-flow__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AudienceSection() {
  return (
    <section className="section audience">
      <AudienceAtmosphere />
      <div className="shell audience__content reveal">
        <div className="audience__copy">
          <p className="eyebrow">Built for real businesses</p>
          <h2 className="section-heading">
            Big enough to transform. Small enough to feel personal.
          </h2>
          <p className="section-copy">
            From owner-led teams to growing enterprises—you bring the context,
            we bring the automation expertise.
          </p>
        </div>
        <nav className="audience__industries" aria-label="Industries">
          {industryLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="audience__industries-all" href="/use-cases">
            All use cases →
          </a>
        </nav>
      </div>
    </section>
  );
}
