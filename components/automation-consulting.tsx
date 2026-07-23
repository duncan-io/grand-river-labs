import { Arrow } from "./site-header";

const whenHelps = [
  {
    title: "Too many tools, no clear path",
    copy: "The stack grew one fix at a time. Nobody owns the map of how work actually moves—or which loop is worth automating first.",
  },
  {
    title: "Unclear ROI on automation",
    copy: "You’ve heard the pitch. What’s missing is a ranked list of bottlenecks with hours and cost attached—so you invest where it pays back.",
  },
  {
    title: "Team buried in handoffs",
    copy: "People retype, chase status, and glue systems together by hand. The work gets done—but the week disappears into the seams.",
  },
];

const examples = [
  {
    industry: "Accounting & professional services",
    title: "Document intake that ate the week",
    situation:
      "A mid-size firm’s juniors spent mornings opening client PDFs—invoices, contracts, statements—and keying the same fields into practice software. Partners wanted advisory capacity. The team was still stuck in retyping.",
    discovery:
      "Discovery mapped every intake path: email → shared drive → practice tool, plus the cleanup pass before month-end. The leak wasn’t “we need AI.” It was double entry on high-volume documents, then another pass to fix naming and duplicates.",
    prioritize:
      "First automation: pull structured fields from the highest-volume document types into the system of record, with a light human review on edge cases—before touching reporting or chatbots.",
    outcome:
      "A roadmap that put hours back into intake within weeks, with a clear second wave for client-data cleanup and partner-ready weekly briefs.",
  },
  {
    industry: "Home services",
    title: "Dispatch and follow-up ping-pong",
    situation:
      "A roofing and painting company won jobs on the site—and lost hours in the office. Estimates sat half-finished. Scheduling lived in texts. CRM notes never made it back from the field.",
    discovery:
      "We sat with the owner and office lead, traced lead → estimate → book → job, and timed the status chase. The expensive loop wasn’t installing—it was same-day proposals stalling and coordination eating evenings.",
    prioritize:
      "First automation: turn site notes and photos into CRM updates, then draft proposals from real scopes so quotes leave the same day—before building a full scheduling platform.",
    outcome:
      "A prioritized path: pipeline visibility and lead triage next, once the estimate loop stopped leaking deals and owner time.",
  },
  {
    industry: "Insurance brokerages",
    title: "Claims and certs across the inbox",
    situation:
      "Producers and CSRs lived in submissions, certificates, and renewal spreadsheets. Applications arrived in every format. Status lived in someone’s head—or a list rebuilt every Monday.",
    discovery:
      "We mapped paperwork in, status out: which fields were retyped, which renewals stalled on missing info, and which inbox questions were the same every week. The bottleneck was rework between documents and the system of record.",
    prioritize:
      "First automation: structured intake from the highest-volume applications and cert requests, with renewal visibility that doesn’t depend on spreadsheet archaeology.",
    outcome:
      "A consulting deliverable that ranked intake, renewals, and routine Q&A by hours returned—so the brokerage knew what to build first without a rip-and-replace.",
  },
  {
    industry: "Property management",
    title: "Tenant asks bouncing between portals",
    situation:
      "Leases and applications landed as PDFs. Tenant messages about keys, payments, and maintenance hit the same people every day. Managers assembled “what’s going on” from too many places.",
    discovery:
      "Walkthroughs with leasing and ops showed two expensive loops: retyping lease fields, and routine tenant asks blocking edge cases. Vendor handoffs added a third chase nobody owned end-to-end.",
    prioritize:
      "First automation: lease/application intake into the system of record, plus first-response coverage for the most common tenant questions—before a full ops dashboard.",
    outcome:
      "A roadmap with a weekly ops snapshot as wave two, once intake stuck and the inbox could breathe.",
  },
];

const deliverables = [
  {
    title: "Bottleneck map",
    copy: "A clear picture of how work moves today—handoffs, re-entry, and approvals—so everyone agrees where time and money leak.",
  },
  {
    title: "Prioritized roadmap",
    copy: "What to automate first, second, and later. Ranked by impact and effort, not by whichever tool is trending.",
  },
  {
    title: "Build-ready scopes",
    copy: "Enough detail to start delivery: systems involved, success criteria, and what stays human. No vague “add AI” slides.",
  },
  {
    title: "ROI hypotheses",
    copy: "Hours and cost framed in language your team trusts—so you can decide, fund, and measure the next step.",
  },
];

const steps = [
  {
    title: "Discover",
    copy: "We sit with your team, map the real workflow, and find the bottlenecks worth fixing—so we invest where it saves the most time and money.",
  },
  {
    title: "Prioritize",
    copy: "We rank opportunities by impact and effort, pressure-test assumptions with the people who do the work, and agree what ships first.",
  },
  {
    title: "Roadmap or build",
    copy: "You leave with a clear plan—or we hand off into design and delivery. Either way, you know what happens next and why.",
  },
];

function ConsultingScene() {
  return (
    <svg
      className="consulting-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="consult-glow" x1="1100" y1="100" x2="1500" y2="480">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="consult-lens" x1="1180" y1="300" x2="1420" y2="620">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <linearGradient id="consult-node" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <filter id="consult-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <circle
        className="consulting-hero__glow"
        cx="1280"
        cy="220"
        r="150"
        fill="url(#consult-glow)"
        opacity=".85"
      />

      {/* Scattered process nodes — the messy as-is work */}
      <g className="consulting-hero__scatter" opacity=".9">
        {[
          { cx: 980, cy: 280, r: 18, delay: "0s" },
          { cx: 1040, cy: 480, r: 16, delay: "0.4s" },
          { cx: 1120, cy: 640, r: 20, delay: "0.8s" },
          { cx: 1480, cy: 560, r: 17, delay: "1.2s" },
          { cx: 1520, cy: 340, r: 19, delay: "1.6s" },
          { cx: 1380, cy: 700, r: 15, delay: "2s" },
        ].map((node) => (
          <g
            key={`${node.cx}-${node.cy}`}
            className="consulting-hero__node"
            style={{ animationDelay: node.delay }}
          >
            <circle
              className="consulting-hero__node-ring"
              cx={node.cx}
              cy={node.cy}
              r={node.r + 8}
              stroke="#6FB8B0"
              strokeWidth="1"
              style={{ animationDelay: node.delay }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="url(#consult-node)"
              stroke="#057A72"
              strokeWidth="1.4"
            />
          </g>
        ))}
      </g>

      {/* Paths converging toward the lens / priority map */}
      <g className="consulting-hero__paths">
        {[
          {
            id: "p1",
            d: "M980 280 Q1100 360 1260 470",
            delay: "0s",
          },
          {
            id: "p2",
            d: "M1040 480 Q1140 500 1260 470",
            delay: "0.55s",
          },
          {
            id: "p3",
            d: "M1120 640 Q1180 560 1260 470",
            delay: "1.1s",
          },
          {
            id: "p4",
            d: "M1480 560 Q1380 520 1260 470",
            delay: "1.65s",
          },
          {
            id: "p5",
            d: "M1520 340 Q1400 400 1260 470",
            delay: "2.2s",
          },
        ].map(({ id, d, delay }) => (
          <g key={id}>
            <path d={d} stroke="#3A948C" strokeWidth="1.4" opacity=".28" />
            <path
              className="consulting-hero__path"
              d={d}
              stroke="#057A72"
              strokeWidth="1.9"
              strokeDasharray="7 14"
              style={{ animationDelay: delay }}
            />
            <circle
              className="consulting-hero__packet"
              r="4"
              fill="#FFFDF4"
              stroke="#057A72"
              strokeWidth="1.2"
              style={{ animationDelay: delay }}
            >
              <animateMotion
                dur="3.8s"
                begin={delay}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          </g>
        ))}
      </g>

      {/* Priority lens / map at the focus */}
      <g className="consulting-hero__lens">
        <circle
          className="consulting-hero__lens-ring"
          cx="1260"
          cy="470"
          r="88"
          stroke="#6FB8B0"
          strokeWidth="1.5"
          opacity=".45"
        />
        <circle
          className="consulting-hero__lens-ring consulting-hero__lens-ring--outer"
          cx="1260"
          cy="470"
          r="118"
          stroke="#057A72"
          strokeWidth="1"
          opacity=".22"
        />
        <circle cx="1260" cy="470" r="58" fill="url(#consult-lens)" />
        <circle
          cx="1260"
          cy="470"
          r="58"
          fill="#FFFDF4"
          opacity=".16"
          filter="url(#consult-soften)"
        />
        {/* Magnifier / map mark */}
        <circle
          cx="1254"
          cy="462"
          r="18"
          stroke="#F7FFFE"
          strokeWidth="2.5"
          opacity=".92"
        />
        <path
          d="M1268 476l14 14"
          stroke="#F7FFFE"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity=".92"
        />
        {/* Priority tick marks inside lens */}
        <path
          d="M1242 462h24M1254 450v24"
          stroke="#F7FFFE"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity=".55"
        />
      </g>

      <path
        d="M0 780c260-50 520-40 780 8 220 40 420 35 820-25v137H0V780Z"
        fill="#EAF7F4"
        opacity=".9"
      />
    </svg>
  );
}

export function ConsultingSections() {
  return (
    <>
      <section className="consulting-hero">
        <ConsultingScene />
        <div className="shell">
          <div className="consulting-hero__content">
            <p className="eyebrow">Automation consulting</p>
            <p className="consulting-hero__brand">Grand River Labs</p>
            <h1 className="consulting-hero__headline">
              Find where time and money leak—before you build a thing.
            </h1>
            <p className="consulting-hero__copy">
              White-glove discovery that maps the real work, prioritizes what to
              automate first, and leaves you with a roadmap you can fund and
              measure.
            </p>
            <div className="consulting-hero__actions">
              <a
                className="button button-primary"
                href="mailto:hello@grandriverlabs.com?subject=Automation%20consulting"
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
        <a className="consulting-hero__cue" href="#when">
          When consulting helps
        </a>
      </section>

      <section className="section consulting-when" id="when">
        <div className="shell">
          <div className="consulting-when__top reveal">
            <div>
              <p className="eyebrow">When it helps</p>
              <h2 className="section-heading">
                Discovery first. Build second.
              </h2>
            </div>
            <p className="section-copy">
              Consulting is for teams that know something is leaking—but need a
              clear, prioritized path before anyone writes a workflow.
            </p>
          </div>
          <div className="consulting-when__points reveal">
            {whenHelps.map((item, index) => (
              <article className="consulting-when__point" key={item.title}>
                <span className="consulting-when__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section consulting-examples" id="examples">
        <div className="shell">
          <div className="consulting-examples__top reveal">
            <div>
              <p className="eyebrow">Example engagements</p>
              <h2 className="section-heading">
                What consulting looks like in practice.
              </h2>
            </div>
            <p className="section-copy">
              Four discovery stories—situation, what we found, what we’d
              automate first, and the outcome of the engagement.
            </p>
          </div>
          <div className="consulting-examples__list">
            {examples.map((item, index) => (
              <article
                className={`consulting-example reveal${
                  index % 2 === 1 ? " consulting-example--offset" : ""
                }`}
                key={item.title}
              >
                <div className="consulting-example__meta">
                  <span className="consulting-example__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="consulting-example__industry">{item.industry}</p>
                </div>
                <div className="consulting-example__body">
                  <h3>{item.title}</h3>
                  <div className="consulting-example__blocks">
                    <div>
                      <p className="consulting-example__label">Situation</p>
                      <p>{item.situation}</p>
                    </div>
                    <div>
                      <p className="consulting-example__label">
                        What discovery surfaced
                      </p>
                      <p>{item.discovery}</p>
                    </div>
                    <div>
                      <p className="consulting-example__label">
                        First automation we&apos;d prioritize
                      </p>
                      <p>{item.prioritize}</p>
                    </div>
                    <div>
                      <p className="consulting-example__label">
                        Expected outcome
                      </p>
                      <p>{item.outcome}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section consulting-deliverables" id="deliverables">
        <div className="shell">
          <div className="consulting-deliverables__top reveal">
            <div>
              <p className="eyebrow">What you walk away with</p>
              <h2 className="section-heading">
                Concrete deliverables—not vague advice.
              </h2>
            </div>
            <p className="section-copy">
              You finish with artifacts your leadership and ops teams can act
              on—whether we build next or you take the roadmap in-house.
            </p>
          </div>
          <div className="consulting-deliverables__list reveal">
            {deliverables.map((item, index) => (
              <article className="consulting-deliverable" key={item.title}>
                <span className="consulting-deliverable__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section consulting-flow" id="how-we-work">
        <div className="shell">
          <div className="consulting-flow__top reveal">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-heading">
                A short engagement. A clear next step.
              </h2>
            </div>
            <p className="section-copy">
              You bring the business context. We bring the automation lens—and
              leave you with a path you can fund and measure.
            </p>
          </div>
          <ol className="consulting-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="consulting-flow__step" key={step.title}>
                {index > 0 ? (
                  <span
                    className="consulting-flow__connector"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="consulting-flow__connector-line"
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
                <span className="consulting-flow__number">
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

export function ConsultingCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s map where automation pays for itself.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us how work moves today. We&apos;ll run discovery, prioritize
            what to automate first, and leave you with a roadmap—or a clear path
            into build.
          </p>
          <div className="use-cases-cta__buttons">
            <a
              className="button button-primary"
              href="mailto:hello@grandriverlabs.com?subject=Automation%20consulting"
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
