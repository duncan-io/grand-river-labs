import { Arrow } from "./site-header";

const friction = [
  {
    title: "Leads sit in the inbox",
    copy: "Forms, ads, and chat dump names into a shared inbox. Someone sorts them when they can—and by then the warm ones have gone cold.",
  },
  {
    title: "Nurture that never updates",
    copy: "Sequences fire on a calendar, not on behavior. Prospects get the wrong email, sales gets the wrong signal, and nobody trusts the drip.",
  },
  {
    title: "Campaign ops glue work",
    copy: "Lists get exported. UTMs get fixed by hand. Attribution lives in a spreadsheet someone rebuilds every Monday.",
  },
  {
    title: "Reporting scramble",
    copy: "Marketing asks what closed. Sales asks what was sent. The answer takes half a day of stitching tools together.",
  },
];

const examples = [
  {
    title: "Inbound lead capture → enrich → score → route",
    copy: "A prospect fills out a form or lands from a paid click. Instead of landing in a shared inbox, the lead is enriched with company and role data, scored against your ICP, and assigned to the right owner—with a short brief already in the CRM. Sales opens a ready record, not a blank name.",
  },
  {
    title: "Behavior-triggered nurture that respects the CRM",
    copy: "Someone downloads a guide, then visits pricing twice. The sequence advances, pauses when a meeting is booked, and resumes only if they go quiet again. Stage changes in the CRM drive the emails—so nurture never argues with the salesperson.",
  },
  {
    title: "Form → sales alert with full context",
    copy: "High-intent submits don’t wait for the next inbox check. The right channel—Slack, email, or both—gets a ping with source, company, page, and what they asked for. Reps reply while the intent is still hot, without digging through form tools.",
  },
  {
    title: "Campaign ops: lists, UTMs, and clean attribution",
    copy: "Audience lists sync from your CRM. Campaign tags and UTMs stay consistent across channels. When a lead converts, the source story is already on the record—so reporting stops being a weekly archaeology project.",
  },
  {
    title: "No-show and abandoned-inquiry follow-up",
    copy: "A demo is missed or a quote request stalls mid-form. Automated, timed follow-ups go out with the right tone and a clear next step—then escalate to a human if there’s still no reply. Pipeline that would have leaked quietly gets a second chance.",
  },
  {
    title: "Closed-won → review, referral, and onboarding handoff",
    copy: "When a deal closes, marketing doesn’t start from a spreadsheet. A review request, referral ask, and onboarding welcome fire in sequence—while the account team gets a clean handoff with context. Expansion and proof start on day one, not month three.",
  },
];

const steps = [
  {
    title: "Discover",
    copy: "We map how leads enter, how nurture actually runs, and where campaign ops eats the week—then prioritize what moves pipeline first.",
  },
  {
    title: "Connect & automate",
    copy: "We wire your CRM, forms, email, and channels so routing, sequences, and alerts fit the tools you already trust. No rip-and-replace.",
  },
  {
    title: "Launch & refine",
    copy: "We launch carefully, watch the first weeks of real traffic, and tighten scoring, timing, and handoffs so the gains keep compounding.",
  },
];

const channelNodes = [
  { id: "ads", label: "Ads", cx: 980, cy: 220, delay: "0s" },
  { id: "web", label: "Web", cx: 920, cy: 380, delay: "0.5s" },
  { id: "form", label: "Forms", cx: 960, cy: 560, delay: "1s" },
  { id: "email", label: "Email", cx: 1080, cy: 680, delay: "1.5s" },
] as const;

const hub = { cx: 1320, cy: 420 } as const;

type Point = { cx: number; cy: number };

function curveTo(from: Point, to: Point, bend: number) {
  const midX = (from.cx + to.cx) / 2 + bend;
  const midY = (from.cy + to.cy) / 2 - bend * 0.4;
  return `M${from.cx} ${from.cy} Q${midX} ${midY} ${to.cx} ${to.cy}`;
}

function MarketingAutomationScene() {
  const paths = [
    {
      id: "ads",
      d: curveTo(channelNodes[0], hub, -40),
      delay: "0s",
      weight: 1.4,
    },
    {
      id: "web",
      d: curveTo(channelNodes[1], hub, 28),
      delay: "0.55s",
      weight: 1.5,
    },
    {
      id: "form",
      d: curveTo(channelNodes[2], hub, -18),
      delay: "1.1s",
      weight: 1.45,
    },
    {
      id: "email",
      d: curveTo(channelNodes[3], hub, 36),
      delay: "1.65s",
      weight: 1.35,
    },
  ];

  const nurtureOut = [
    { id: "n1", x: 1480, y: 300, delay: "0.3s" },
    { id: "n2", x: 1520, y: 420, delay: "0.9s" },
    { id: "n3", x: 1480, y: 540, delay: "1.5s" },
  ];

  return (
    <svg
      className="mkt-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="mkt-glow" x1="1180" y1="140" x2="1500" y2="480">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id="mkt-node" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id="mkt-hub" x1="1220" y1="280" x2="1420" y2="560">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <filter id="mkt-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <circle
        className="mkt-hero__glow"
        cx="1340"
        cy="220"
        r="150"
        fill="url(#mkt-glow)"
        opacity=".85"
      />

      {/* Soft funnel silhouette behind the flow */}
      <path
        className="mkt-hero__funnel"
        d="M900 160c80 40 140 120 180 220 28 70 48 140 40 210-6 55-30 100-70 140"
        stroke="#3A948C"
        strokeWidth="1.25"
        opacity=".18"
      />

      <g className="mkt-hero__paths">
        {paths.map(({ id, d, delay, weight }) => (
          <g key={id}>
            <path d={d} stroke="#3A948C" strokeWidth={weight} opacity={0.28} />
            <path
              className="mkt-hero__path"
              d={d}
              stroke="#057A72"
              strokeWidth={weight + 0.4}
              strokeDasharray="7 14"
              style={{ animationDelay: delay }}
            />
            <circle
              className="mkt-hero__packet"
              r="4.5"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.25"
              style={{ animationDelay: delay }}
            >
              <animateMotion
                dur="3.8s"
                begin={delay}
                repeatCount="indefinite"
                path={d}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          </g>
        ))}
      </g>

      {/* Outbound nurture pulses from hub */}
      {nurtureOut.map((node) => (
        <g key={node.id}>
          <path
            className="mkt-hero__path"
            d={curveTo(hub, { cx: node.x, cy: node.y }, 20)}
            stroke="#057A72"
            strokeWidth="1.2"
            strokeDasharray="5 10"
            opacity=".55"
            style={{ animationDelay: node.delay }}
          />
          <circle
            cx={node.x}
            cy={node.y}
            r="8"
            fill="url(#mkt-node)"
            stroke="#057A72"
            strokeWidth="1.25"
            opacity=".7"
          />
        </g>
      ))}

      <g className="mkt-hero__channels">
        {channelNodes.map((node) => (
          <g
            key={node.id}
            className="mkt-hero__node"
            style={{ animationDelay: node.delay }}
          >
            <circle
              className="mkt-hero__node-ring"
              cx={node.cx}
              cy={node.cy}
              r="32"
              stroke="#6FB8B0"
              strokeWidth="1"
              style={{ animationDelay: node.delay }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="22"
              fill="url(#mkt-node)"
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <text
              x={node.cx}
              y={node.cy + 4}
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="11"
              fontWeight="600"
              letterSpacing="0.04em"
              opacity=".8"
            >
              {node.label}
            </text>
          </g>
        ))}
      </g>

      <g className="mkt-hero__hub">
        <circle
          className="mkt-hero__hub-ring"
          cx={hub.cx}
          cy={hub.cy}
          r="72"
          stroke="#6FB8B0"
          strokeWidth="1.5"
          opacity=".45"
        />
        <circle
          className="mkt-hero__hub-ring mkt-hero__hub-ring--outer"
          cx={hub.cx}
          cy={hub.cy}
          r="98"
          stroke="#057A72"
          strokeWidth="1"
          opacity=".22"
        />
        <circle cx={hub.cx} cy={hub.cy} r="48" fill="url(#mkt-hub)" />
        <circle
          cx={hub.cx}
          cy={hub.cy}
          r="48"
          fill="#FFFDF4"
          opacity=".16"
          filter="url(#mkt-soften)"
        />
        <text
          x={hub.cx}
          y={hub.cy - 4}
          textAnchor="middle"
          fill="#F7FFFE"
          fontFamily="Georgia, serif"
          fontSize="13"
          fontWeight="600"
          letterSpacing="0.12em"
        >
          CRM
        </text>
        <text
          x={hub.cx}
          y={hub.cy + 14}
          textAnchor="middle"
          fill="#EAF9F7"
          fontFamily="Georgia, serif"
          fontSize="10"
          letterSpacing="0.08em"
          opacity=".85"
        >
          NURTURE
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

export function MarketingAutomationSections() {
  return (
    <>
      <section className="mkt-hero">
        <MarketingAutomationScene />
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Marketing & sales automation</p>
            <p className="mkt-hero__brand">Grand River Labs</p>
            <h1 className="mkt-hero__headline">
              Keep pipeline moving without babysitting the stack.
            </h1>
            <p className="mkt-hero__copy">
              Lead routing, nurture, and campaign ops that fit your CRM and
              channels—so marketing and sales stop chasing handoffs by hand.
            </p>
            <div className="mkt-hero__actions">
              <a
                className="button button-primary"
                href="mailto:hello@grandriverlabs.com?subject=Book%20a%20call"
              >
                Book a call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#examples">
                See examples
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#examples">
          Explore examples
        </a>
      </section>

      <section className="section mkt-friction" id="friction">
        <div className="shell">
          <div className="mkt-friction__top reveal">
            <div>
              <p className="eyebrow">The drag</p>
              <h2 className="section-heading">
                Where marketing hours disappear.
              </h2>
            </div>
            <p className="section-copy">
              The tools are usually fine. The gaps between them—triage,
              sequences, sync, reporting—are what slow the pipeline down.
            </p>
          </div>
          <div className="mkt-friction__list reveal">
            {friction.map((item, index) => (
              <article className="mkt-friction__row" key={item.title}>
                <span className="mkt-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section mkt-examples" id="examples">
        <div className="shell">
          <div className="mkt-examples__top reveal">
            <div>
              <p className="eyebrow">Examples</p>
              <h2 className="section-heading">
                What this looks like in practice.
              </h2>
            </div>
            <p className="section-copy">
              Full write-ups of automations we build around the tools you
              already run—so leads move, nurture stays honest, and campaign ops
              stops living in spreadsheets.
            </p>
          </div>
          <div className="mkt-examples__list reveal">
            {examples.map((item, index) => (
              <article
                className={`mkt-example${index % 2 === 1 ? " mkt-example--alt" : ""}`}
                key={item.title}
              >
                <span className="mkt-example__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mkt-example__body">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section mkt-how" id="how-it-fits">
        <div className="shell">
          <div className="mkt-how__top reveal">
            <div>
              <p className="eyebrow">How it fits</p>
              <h2 className="section-heading">
                Your stack stays. The busywork leaves.
              </h2>
            </div>
            <p className="section-copy">
              We connect what you already trust, automate the handoffs in
              between, and stay close until pipeline and hours both move in the
              right direction.
            </p>
          </div>
          <ol className="mkt-how__steps reveal">
            {steps.map((step, index) => (
              <li className="mkt-how__step" key={step.title}>
                {index > 0 ? (
                  <span className="mkt-how__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="mkt-how__connector-line"
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
                ) : null}
                <span className="mkt-how__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

export function MarketingAutomationCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s find where marketing & sales automation pays for itself.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us how leads move today. We&apos;ll map a practical path from
            your CRM and channels to cleaner routing, nurture, and campaign
            ops.
          </p>
          <div className="use-cases-cta__buttons">
            <a
              className="button button-primary"
              href="mailto:hello@grandriverlabs.com?subject=Book%20a%20call"
            >
              Book a call
              <Arrow />
            </a>
            <a className="button button-secondary" href="/what-we-do">
              Back to what we do
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
