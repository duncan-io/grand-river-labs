import { Arrow } from "./site-header";

const friction = [
  {
    title: "Re-entry between tools",
    copy: "The same fields get typed into a form, then a CRM, then a sheet. Every hop is time, and every hop is a chance to get it wrong.",
  },
  {
    title: "Approvals that sit",
    copy: "A request lands in an inbox or a Slack thread and waits. Nobody knows who owns it—or whether it already moved.",
  },
  {
    title: "Status chasing",
    copy: "Someone asks “where is this?” and the answer takes a hunt across email, tickets, and the system of record.",
  },
  {
    title: "Tool-to-tool gaps",
    copy: "Your stack works. The handoffs between the tools don’t. People become the glue—and the glue burns hours.",
  },
];

const examples = [
  {
    number: "01",
    title: "Lead & inquiry intake",
    before:
      "A form submission or inbound email arrives. Someone opens it, copies the name, company, and ask into the CRM, assigns an owner by gut feel, and types a confirmation by hand. If the inbox is busy, the lead waits. If the copy-paste slips, the record is wrong from day one.",
    after:
      "The message hits your existing inbox or form. Structured fields are pulled out, a CRM record is created or matched, an owner is assigned by your rules, and a confirmation goes out—without anyone retyping. Your team opens a clean lead, not a pile of admin.",
    flow: ["Inbox", "Extract", "Route", "Confirm"],
  },
  {
    number: "02",
    title: "Approval & handoff chains",
    before:
      "A discount, a change order, or an access request lands in email or Slack. Context is incomplete. The right person isn’t tagged. Days later someone digs up the thread, approves from memory, and someone else has to update the next system by hand.",
    after:
      "The request is captured with the fields you need, routed to the right approver with context attached, and logged when they approve or deny. The next system—CRM, ops tool, or sheet—updates automatically, and the requester hears back without a status ping.",
    flow: ["Request", "Route", "Decide", "Update"],
  },
  {
    number: "03",
    title: "Cross-system status sync",
    before:
      "A job moves from “in progress” to “done” in one tool. Someone remembers to update the CRM. Someone else updates the client sheet. A third person posts in Slack. When those steps don’t happen in order—or at all—the team works from three different truths.",
    after:
      "One source of truth owns the status. When it changes, the other systems update and the right people get notified. No second typing. No “did you update X?” threads. Everyone sees the same stage of the work.",
    flow: ["Change", "Sync", "Notify", "Align"],
  },
  {
    number: "04",
    title: "Recurring ops & reporting",
    before:
      "Every week someone exports numbers, pastes them into a spreadsheet, rebuilds the same summary, and emails it to the people who asked. The ritual takes an afternoon. If that person is out, the ritual stalls—or the summary doesn’t go out at all.",
    after:
      "On a schedule, data is pulled from the tools you already trust, shaped into the brief your team actually reads, and delivered to the right channel. Same story you’d assemble by hand—without the weekly scrape.",
    flow: ["Schedule", "Pull", "Draft", "Deliver"],
  },
];

const engagement = [
  {
    title: "Discover",
    copy: "We sit with your team, map the real workflow—not the org chart version—and find the handoffs that cost the most time and money.",
  },
  {
    title: "Design & connect",
    copy: "We design the automation around the tools you already run, wire the integrations, and keep you in the loop until the path feels right.",
  },
  {
    title: "Launch & stay with it",
    copy: "We launch carefully, watch the first weeks of real use, and stay close—so you get a working process, not a brittle handoff.",
  },
];

function BpaScene() {
  const stages = [
    { id: "s1", x: 980, y: 220, label: "A", delay: "0s" },
    { id: "s2", x: 980, y: 380, label: "B", delay: "0.4s" },
    { id: "s3", x: 980, y: 540, label: "C", delay: "0.8s" },
  ] as const;

  const merge = { x: 1180, y: 380 } as const;
  const out = [
    { x: 1320, y: 380 },
    { x: 1460, y: 340 },
    { x: 1540, y: 300 },
  ] as const;

  const paths = [
    {
      id: "in-a",
      d: `M${stages[0].x + 36} ${stages[0].y} Q${merge.x - 40} ${stages[0].y} ${merge.x} ${merge.y}`,
      delay: "0s",
    },
    {
      id: "in-b",
      d: `M${stages[1].x + 36} ${stages[1].y} L${merge.x} ${merge.y}`,
      delay: "0.4s",
    },
    {
      id: "in-c",
      d: `M${stages[2].x + 36} ${stages[2].y} Q${merge.x - 40} ${stages[2].y} ${merge.x} ${merge.y}`,
      delay: "0.8s",
    },
    {
      id: "out-1",
      d: `M${merge.x} ${merge.y} C${out[0].x} ${out[0].y} ${out[1].x} ${out[1].y} ${out[2].x} ${out[2].y}`,
      delay: "0.2s",
      weight: 3,
    },
  ];

  return (
    <svg
      className="bpa-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="bpa-glow" x1="1100" y1="100" x2="1500" y2="480">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".15" />
        </linearGradient>
        <linearGradient id="bpa-stage" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id="bpa-merge" x1="1120" y1="300" x2="1280" y2="460">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <filter id="bpa-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <circle
        className="bpa-hero__glow"
        cx="1320"
        cy="220"
        r="150"
        fill="url(#bpa-glow)"
        opacity=".85"
      />

      {/* Scattered “before” marks — messy handoffs */}
      <g opacity=".18" stroke="#075752" strokeWidth="1.25">
        <path d="M920 250h40M920 265h28" strokeDasharray="3 5" />
        <path d="M900 400h48M900 415h22" strokeDasharray="3 5" />
        <path d="M925 560h36M925 575h30" strokeDasharray="3 5" />
      </g>

      <g className="bpa-hero__paths">
        {paths.map(({ id, d, delay, weight = 1.5 }) => (
          <g key={id}>
            <path d={d} stroke="#3A948C" strokeWidth={weight} opacity={0.28} />
            <path
              className="bpa-hero__path"
              d={d}
              stroke="#057A72"
              strokeWidth={weight + 0.5}
              strokeDasharray={weight > 2 ? "10 12" : "7 14"}
              style={{ animationDelay: delay }}
            />
          </g>
        ))}
        {paths.slice(0, 3).map(({ id, d, delay }) => (
          <circle
            key={`pkt-${id}`}
            className="bpa-hero__packet"
            r="4.5"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.25"
            style={{ animationDelay: delay }}
          >
            <animateMotion
              dur="3.2s"
              begin={delay}
              repeatCount="indefinite"
              path={`${d} C${out[0].x} ${out[0].y} ${out[1].x} ${out[1].y} ${out[2].x} ${out[2].y}`}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        ))}
      </g>

      {stages.map((stage) => (
        <g
          key={stage.id}
          className="bpa-hero__stage"
          style={{ animationDelay: stage.delay }}
        >
          <rect
            x={stage.x - 36}
            y={stage.y - 28}
            width="72"
            height="56"
            rx="6"
            fill="url(#bpa-stage)"
            stroke="#057A72"
            strokeWidth="1.5"
          />
          <circle
            className="bpa-hero__stage-ring"
            cx={stage.x}
            cy={stage.y}
            r="42"
            stroke="#6FB8B0"
            strokeWidth="1"
            style={{ animationDelay: stage.delay }}
          />
          <text
            x={stage.x}
            y={stage.y + 5}
            textAnchor="middle"
            fill="#057A72"
            fontSize="14"
            fontFamily="var(--font-outfit), sans-serif"
            fontWeight="650"
            opacity=".7"
          >
            {stage.label}
          </text>
        </g>
      ))}

      <g className="bpa-hero__merge">
        <circle
          className="bpa-hero__merge-ring"
          cx={merge.x}
          cy={merge.y}
          r="58"
          stroke="#6FB8B0"
          strokeWidth="1.5"
          opacity=".45"
        />
        <circle
          className="bpa-hero__merge-ring bpa-hero__merge-ring--outer"
          cx={merge.x}
          cy={merge.y}
          r="82"
          stroke="#057A72"
          strokeWidth="1"
          opacity=".22"
        />
        <circle cx={merge.x} cy={merge.y} r="36" fill="url(#bpa-merge)" />
        <circle
          cx={merge.x}
          cy={merge.y}
          r="36"
          fill="#FFFDF4"
          opacity=".18"
          filter="url(#bpa-soften)"
        />
        <path
          d={`M${merge.x - 12} ${merge.y}h24M${merge.x} ${merge.y - 12}v24`}
          stroke="#F7FFFE"
          strokeWidth="2.25"
          strokeLinecap="round"
          opacity=".9"
        />
      </g>

      {/* Clean outflow markers */}
      <g opacity=".55">
        {out.map((pt, i) => (
          <circle
            key={`out-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={i === 2 ? 7 : 4.5}
            fill={i === 2 ? "#057A72" : "#CCEBE5"}
            stroke="#057A72"
            strokeWidth="1.25"
          />
        ))}
      </g>

      <path
        d="M0 780c260-50 520-40 780 8 220 40 420 35 820-25v137H0V780Z"
        fill="#EAF7F4"
        opacity=".9"
      />
    </svg>
  );
}

function FlowStrip({ steps }: { steps: string[] }) {
  return (
    <ol className="bpa-flow-strip" aria-label="Automation flow">
      {steps.map((step, index) => (
        <li className="bpa-flow-strip__step" key={step}>
          {index > 0 ? (
            <span className="bpa-flow-strip__connector" aria-hidden="true">
              <svg viewBox="0 0 80 24" fill="none">
                <path
                  className="bpa-flow-strip__connector-line"
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
          <span className="bpa-flow-strip__label">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function BpaSections() {
  return (
    <>
      <section className="bpa-hero">
        <BpaScene />
        <div className="shell">
          <div className="bpa-hero__content">
            <p className="eyebrow">Business process automation</p>
            <p className="bpa-hero__brand">Grand River Labs</p>
            <h1 className="bpa-hero__headline">
              Turn handoffs into flow—across the tools you already run.
            </h1>
            <p className="bpa-hero__copy">
              We map the busywork between systems, automate the path, and stay
              with it—so your team spends less time chasing status and more time
              on work that matters.
            </p>
            <div className="bpa-hero__actions">
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
        <a className="bpa-hero__cue" href="#friction">
          Where work stalls
        </a>
      </section>

      <section className="section bpa-friction" id="friction">
        <div className="shell">
          <div className="bpa-friction__top reveal">
            <div>
              <p className="eyebrow">Where work stalls</p>
              <h2 className="section-heading">
                The busywork between the tools.
              </h2>
            </div>
            <p className="section-copy">
              Most teams don’t need another platform. They need the gaps between
              the ones they already trust to stop eating the week.
            </p>
          </div>
          <div className="bpa-list reveal">
            {friction.map((item, index) => (
              <article className="bpa-row" key={item.title}>
                <span className="bpa-row__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bpa-examples" id="examples">
        <div className="shell">
          <div className="bpa-examples__top reveal">
            <div>
              <p className="eyebrow">Examples</p>
              <h2 className="section-heading">
                What business process automation looks like in practice.
              </h2>
            </div>
            <p className="section-copy">
              Four common paths—from intake to reporting—written out the way
              work actually moves. Same outcomes. Fewer hours in the weeds.
            </p>
          </div>

          <div className="bpa-examples__list">
            {examples.map((example) => (
              <article
                className="bpa-example reveal"
                key={example.number}
                id={`example-${example.number}`}
              >
                <header className="bpa-example__header">
                  <span className="bpa-example__number">{example.number}</span>
                  <h3 className="bpa-example__title">{example.title}</h3>
                </header>

                <div className="bpa-example__body">
                  <div className="bpa-example__phase">
                    <p className="bpa-example__phase-label">Before</p>
                    <p className="bpa-example__copy">{example.before}</p>
                  </div>
                  <div className="bpa-example__phase">
                    <p className="bpa-example__phase-label">After</p>
                    <p className="bpa-example__copy">{example.after}</p>
                  </div>
                </div>

                <FlowStrip steps={example.flow} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bpa-how" id="how-we-work">
        <div className="shell">
          <div className="bpa-how__top reveal">
            <div>
              <p className="eyebrow">How we automate</p>
              <h2 className="section-heading">
                Personal enough to feel like a partner.
              </h2>
            </div>
            <p className="section-copy">
              You bring the business context. We bring the process map and the
              build—and stay with the work until it saves real time, labor, and
              money.
            </p>
          </div>
          <ol className="bpa-how__steps reveal">
            {engagement.map((step, index) => (
              <li className="bpa-how__step" key={step.title}>
                {index > 0 ? (
                  <span className="bpa-how__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="bpa-how__connector-line"
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
                <span className="bpa-how__number">
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

export function BpaCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s map the process worth automating first.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us how work moves today. We&apos;ll find the handoffs that pay
            for themselves—and automate them across the tools you already trust.
          </p>
          <div className="use-cases-cta__buttons">
            <a
              className="button button-primary"
              href="mailto:hello@grandriverlabs.com?subject=Book%20a%20call"
            >
              Book a call
              <Arrow />
            </a>
            <a className="button button-secondary" href="/use-cases">
              Browse use cases
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
