import { whatWeDoNav } from "./what-we-do-nav";

const promises = [
  {
    label: "Time",
    title: "Save time",
    copy: "Cut hours off repetitive process work—so your team has capacity for higher-value work.",
  },
  {
    label: "Efficiency",
    title: "Increase efficiency",
    copy: "Fewer handoffs, less re-entry, less busywork. Work that moves faster with less friction.",
  },
  {
    label: "Impact",
    title: "Magnify impact",
    copy: "More throughput and results from the same team—productivity that compounds.",
  },
];

const websiteStrategyPillars = [
  {
    label: "SEO",
    title: "Findability",
    copy: "Search, structure, and content that match how people look for you—so growth compounds instead of staying rented from ads.",
  },
  {
    label: "CRO",
    title: "Conversion",
    copy: "Clearer paths from interest to inquiry or booking—so visits turn into real conversations.",
  },
  {
    label: "Connect",
    title: "Integrations",
    copy: "Forms, CRM, booking, and chat that hand off cleanly—so every lead keeps one shared story.",
  },
  {
    label: "Measure",
    title: "Analytics",
    copy: "GA4, Tag Manager, event tracking, and attribution—so marketing, sales, and leadership share one trustworthy story of what’s working.",
  },
];

const offerings = [
  {
    label: "Build",
    title: "Custom AI tools",
    copy: "Purpose-built AI for your workflows—extraction, triage, drafting, assistants—tied to the systems you already run.",
    href: "/ai-automation",
  },
  {
    label: "Train",
    title: "Custom AI training",
    copy: "We train models on your data so they speak your business—and we equip your team to use them with confidence.",
    href: "/ai-automation",
  },
];

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
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.06em"
      >
        EFFICIENCY
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
        IMPACT
      </text>

      {/* Merge junction */}
      <circle cx="340" cy="150" r="15" fill="#057A72" />
      <circle cx="340" cy="150" r="6.5" fill="#EAF9F7" />

      {/* Results node + label */}
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
        RESULTS
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
              Reclaim hours. Work smarter. Magnify impact.
            </h2>
            <p className="section-copy">
              The point isn&apos;t just less busywork—it&apos;s more output from
              the same team. Automation should fit your business, free your team
              for higher-value work, and compound productivity without a
              rip-and-replace.
            </p>
          </div>
          <div className="promise__visual">
            <TributaryScene />
            <p className="promise__caption">
              Three gains. One clearer path to results.
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

export function WebsiteStrategySection() {
  return (
    <section className="section home-ws" id="website-strategy">
      <div className="shell">
        <div className="home-ws__top reveal">
          <div>
            <p className="eyebrow">Website strategy</p>
            <h2 className="section-heading">Websites that grow revenue.</h2>
          </div>
          <p className="section-copy">
            SEO and conversion work that makes the site discoverable—and turns
            the traffic you earn into inquiries, bookings, and real
            conversations.
          </p>
        </div>

        <div className="home-ws__grid reveal">
          {websiteStrategyPillars.map((item) => (
            <article className="home-ws__pillar" key={item.title}>
              <span className="home-ws__label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <p className="home-ws__more reveal">
          <a href="/website-strategy">See website strategy →</a>
        </p>
      </div>
    </section>
  );
}

export function OfferingsSection() {
  return (
    <section className="section offerings" id="offerings">
      <div className="shell">
        <div className="offerings__top reveal">
          <div>
            <p className="eyebrow">Also available</p>
            <h2 className="section-heading">Custom AI tools and training.</h2>
          </div>
          <p className="section-copy">
            Beyond process automation—tools built for your stack, models trained
            on your data, and a team ready to use them.
          </p>
        </div>

        <div className="offerings__grid reveal">
          {offerings.map((item) => (
            <article className="offering" key={item.title}>
              <span className="offering__label">{item.label}</span>
              <h3>
                <a href={item.href}>{item.title}</a>
              </h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <p className="offerings__more reveal">
          <a href="/automation">See Automation and AI →</a>
        </p>
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
            Website strategy, analytics, and automation—you bring the
            context, we bring the systems that make growth stick.
          </p>
        </div>
        <nav className="audience__industries" aria-label="Services">
          {whatWeDoNav.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="audience__industries-all" href="/automation">
            See what we do →
          </a>
        </nav>
      </div>
    </section>
  );
}
