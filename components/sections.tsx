import { industries } from "./industries";

const promises = [
  {
    label: "Time",
    title: "Save time",
    copy: "Cut hours off repetitive process work—so your team has capacity for higher-value work.",
  },
  {
    label: "Labor",
    title: "Save labor",
    copy: "Fewer handoffs, less re-entry, less busywork. More focus on work that moves the needle.",
  },
  {
    label: "Money",
    title: "Multiply impact",
    copy: "More throughput and results for less spend—productivity gained on every dollar.",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    copy: "We start by mapping where your time, labor, and cost leak—so we fix what matters most.",
  },
  {
    number: "02",
    title: "Automate",
    copy: "Then we build around your current workflow and the tools you already use.",
  },
  {
    number: "03",
    title: "Amplify",
    copy: "Finally, we measure the savings and refine so the gains keep compounding.",
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
      viewBox="0 0 640 300"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Inbound streams → shared merge */}
      <path
        d="M130 56 C 220 56, 280 70, 340 150"
        stroke="#69BDB6"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M130 150 H 340"
        stroke="#4EAAA2"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M130 244 C 220 244, 280 230, 340 150"
        stroke="#69BDB6"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* Outbound merged flow */}
      <path
        className="promise__confluence"
        d="M340 150 H 526"
        stroke="#057A72"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        className="promise__sheen"
        d="M360 150 H 500"
        stroke="#FFFFFF"
        strokeOpacity="0.35"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <g
        className="promise__current"
        stroke="#F5FCFB"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity=".7"
      >
        <path d="M385 150 h32" />
        <path d="M440 150 h32" />
      </g>

      {/* Source nodes + left labels */}
      <circle cx="118" cy="56" r="12" fill="#075752" />
      <circle cx="118" cy="150" r="12" fill="#075752" />
      <circle cx="118" cy="244" r="12" fill="#075752" />
      <circle cx="118" cy="56" r="5" fill="#EAF9F7" />
      <circle cx="118" cy="150" r="5" fill="#EAF9F7" />
      <circle cx="118" cy="244" r="5" fill="#EAF9F7" />

      <text
        x="100"
        y="60"
        textAnchor="end"
        fill="#075752"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.12em"
      >
        TIME
      </text>
      <text
        x="100"
        y="154"
        textAnchor="end"
        fill="#075752"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.12em"
      >
        LABOR
      </text>
      <text
        x="100"
        y="248"
        textAnchor="end"
        fill="#075752"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.12em"
      >
        MONEY
      </text>

      {/* Merge junction */}
      <circle cx="340" cy="150" r="15" fill="#057A72" />
      <circle cx="340" cy="150" r="6.5" fill="#EAF9F7" />

      {/* Impact node + label */}
      <circle cx="526" cy="150" r="17" fill="#075752" />
      <circle cx="526" cy="150" r="7.5" fill="#EAF9F7" />
      <text
        x="552"
        y="155"
        fill="#075752"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.12em"
      >
        IMPACT
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

export function PromiseSection() {
  return (
    <section className="section promise" id="approach">
      <div className="shell">
        <div className="promise__stage reveal">
          <div className="promise__intro">
            <p className="eyebrow">What you get</p>
            <h2 className="section-heading">
              Reclaim hours. Reduce effort. Cut cost. Increase impact.
            </h2>
            <p className="section-copy">
              The point isn&apos;t just less busywork—it&apos;s more output for
              every dollar. Automation should fit your business, free your team
              for higher-value work, and compound productivity without a
              rip-and-replace.
            </p>
          </div>
          <div className="promise__visual">
            <TributaryScene />
            <p className="promise__caption">
              Three leaks. One clearer path to impact.
            </p>
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
            <p className="eyebrow">Our process</p>
            <h2 className="section-heading">
              Here&apos;s how we&apos;ll work together.
            </h2>
          </div>
          <p className="section-copy">
            A clear path from today&apos;s bottleneck to measurable savings.
          </p>
        </div>

        <ol className="process-timeline reveal">
          {steps.map((step) => (
            <li className="process-timeline__step" key={step.number}>
              <span className="process-timeline__marker">
                <span className="process-timeline__number">{step.number}</span>
              </span>
              <div className="process-timeline__body">
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
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
