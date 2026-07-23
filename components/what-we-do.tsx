import { Arrow } from "./site-header";

const services = [
  {
    title: "Business process automation",
    copy: "We map the work that slows your team down—handoffs, re-entry, approvals—and automate the path across the tools you already run. Same outcomes, fewer hours in the weeds.",
  },
  {
    title: "Marketing automation",
    copy: "Lead routing, nurture sequences, and campaign ops that fit your CRM and channels. Practical automation that keeps pipeline moving without rebuilding the stack.",
    href: "/marketing-automation",
  },
  {
    title: "Automation consulting",
    copy: "White-glove discovery before a single workflow ships. We find where time and money leak, prioritize what to automate first, and leave you with a clear roadmap.",
    href: "/automation-consulting",
  },
  {
    title: "AI automation",
    copy: "Practical AI inside the work—extraction, triage, drafting, assistants—tied to your real systems. No demos that die on a slide. Tools your team can trust day to day.",
  },
];

const integration = [
  {
    number: "01",
    title: "Your tools stay",
    copy: "CRM, email, sheets, ops software, forms—we connect what you already trust. No rip-and-replace. No forced platform.",
  },
  {
    number: "02",
    title: "Workflows speed up",
    copy: "Information moves where it needs to go. Handoffs shrink. Your team spends less time chasing status and more time on work that matters.",
  },
  {
    number: "03",
    title: "Savings compound",
    copy: "Hours reclaimed. Effort reduced. Cost lowered. We measure what changed—then refine so the gains keep building.",
  },
];

const engagement = [
  {
    title: "Discover",
    copy: "We sit with your team, map the real workflow, and find the bottlenecks worth fixing—so we invest where it saves the most time and money.",
  },
  {
    title: "Design & connect",
    copy: "We design the automation around your existing systems, wire the integrations, and keep you in the loop until it feels right.",
  },
  {
    title: "Launch & stay with it",
    copy: "We launch carefully, watch the first weeks of real use, and stay close—so you get a working process, not a brittle handoff.",
  },
];

const networkNodes = [
  { id: "a", cx: 960, cy: 360, r: 26, delay: "0s" },
  { id: "b", cx: 1020, cy: 580, r: 22, delay: "0.55s" },
  { id: "c", cx: 1120, cy: 680, r: 24, delay: "1.1s" },
  { id: "d", cx: 1490, cy: 620, r: 22, delay: "1.65s" },
  { id: "e", cx: 1510, cy: 320, r: 24, delay: "2.2s" },
] as const;

const mergeJunctions = [
  { id: "j1", cx: 1110, cy: 450, r: 15, delay: "0.35s" },
  { id: "j2", cx: 1385, cy: 490, r: 15, delay: "1.9s" },
] as const;

const hub = { cx: 1260, cy: 470 } as const;

type Point = { cx: number; cy: number };

function spokeParts(
  from: Point,
  to: Point,
  bend: number,
) {
  const midX = (from.cx + to.cx) / 2 + bend;
  const midY = (from.cy + to.cy) / 2 - bend * 0.35;
  const q = `Q${midX} ${midY} ${to.cx} ${to.cy}`;
  return {
    d: `M${from.cx} ${from.cy} ${q}`,
    q,
  };
}

function WhatWeDoScene() {
  const [nodeA, nodeB, nodeC, nodeD, nodeE] = networkNodes;
  const [j1, j2] = mergeJunctions;

  const branchA = spokeParts(nodeA, j1, -36);
  const branchB = spokeParts(nodeB, j1, 30);
  const stemJ1 = spokeParts(j1, hub, -8);
  const directC = spokeParts(nodeC, hub, 20);
  const branchD = spokeParts(nodeD, j2, 32);
  const branchE = spokeParts(nodeE, j2, -26);
  const stemJ2 = spokeParts(j2, hub, 10);

  const segments = [
    { id: "a-j1", d: branchA.d, delay: "0s", weight: 1.35 },
    { id: "b-j1", d: branchB.d, delay: "0.7s", weight: 1.35 },
    { id: "j1-hub", d: stemJ1.d, delay: "0.35s", weight: 2.75 },
    { id: "c-hub", d: directC.d, delay: "1.1s", weight: 1.5 },
    { id: "d-j2", d: branchD.d, delay: "1.65s", weight: 1.35 },
    { id: "e-j2", d: branchE.d, delay: "2.4s", weight: 1.35 },
    { id: "j2-hub", d: stemJ2.d, delay: "1.9s", weight: 2.75 },
  ];

  const packets = [
    { id: "p-a", d: `${branchA.d} ${stemJ1.q}`, delay: "0s" },
    { id: "p-b", d: `${branchB.d} ${stemJ1.q}`, delay: "0.7s" },
    { id: "p-c", d: directC.d, delay: "1.1s" },
    { id: "p-d", d: `${branchD.d} ${stemJ2.q}`, delay: "1.65s" },
    { id: "p-e", d: `${branchE.d} ${stemJ2.q}`, delay: "2.4s" },
  ];

  return (
    <svg
      className="what-we-do-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="wwd-glow" x1="1100" y1="120" x2="1480" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".15" />
        </linearGradient>
        <linearGradient id="wwd-node" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id="wwd-hub" x1="1180" y1="320" x2="1380" y2="560">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <filter id="wwd-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <circle
        className="what-we-do-hero__glow"
        cx="1280"
        cy="240"
        r="160"
        fill="url(#wwd-glow)"
        opacity=".85"
      />

      <g className="what-we-do-hero__mesh" opacity=".22">
        <path
          d={`M${networkNodes[0].cx} ${networkNodes[0].cy} L${networkNodes[1].cx} ${networkNodes[1].cy} L${networkNodes[2].cx} ${networkNodes[2].cy}`}
          stroke="#075752"
          strokeWidth="1"
        />
        <path
          d={`M${networkNodes[2].cx} ${networkNodes[2].cy} L${networkNodes[3].cx} ${networkNodes[3].cy} L${networkNodes[4].cx} ${networkNodes[4].cy}`}
          stroke="#075752"
          strokeWidth="1"
        />
        <path
          d={`M${networkNodes[4].cx} ${networkNodes[4].cy} L${networkNodes[0].cx} ${networkNodes[0].cy}`}
          stroke="#075752"
          strokeWidth="1"
        />
      </g>

      <g className="what-we-do-hero__paths">
        {segments.map(({ id, d, delay, weight }) => {
          const isStem = id.endsWith("-hub") && id.startsWith("j");
          return (
            <g key={id}>
              <path
                d={d}
                stroke="#3A948C"
                strokeWidth={weight}
                opacity={isStem ? 0.4 : 0.26}
              />
              <path
                className="what-we-do-hero__path"
                d={d}
                stroke="#057A72"
                strokeWidth={weight + 0.5}
                strokeDasharray={isStem ? "9 12" : "7 14"}
                style={{ animationDelay: delay }}
              />
            </g>
          );
        })}
        {packets.map(({ id, d, delay }) => (
          <circle
            key={id}
            className="what-we-do-hero__packet"
            r="4.5"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.25"
            style={{ animationDelay: delay }}
          >
            <animateMotion
              dur="3.6s"
              begin={delay}
              repeatCount="indefinite"
              path={d}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        ))}
      </g>

      <g className="what-we-do-hero__network">
        {networkNodes.map((node) => (
          <g
            key={node.id}
            className="what-we-do-hero__node"
            style={{ animationDelay: node.delay }}
          >
            <circle
              className="what-we-do-hero__node-ring"
              cx={node.cx}
              cy={node.cy}
              r={node.r + 10}
              stroke="#6FB8B0"
              strokeWidth="1"
              style={{ animationDelay: node.delay }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="url(#wwd-node)"
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="4"
              fill="#057A72"
              opacity=".55"
            />
          </g>
        ))}

        {mergeJunctions.map((junction) => (
          <g
            key={junction.id}
            className="what-we-do-hero__node what-we-do-hero__junction"
            style={{ animationDelay: junction.delay }}
          >
            <circle
              className="what-we-do-hero__node-ring"
              cx={junction.cx}
              cy={junction.cy}
              r={junction.r + 7}
              stroke="#6FB8B0"
              strokeWidth="1"
              style={{ animationDelay: junction.delay }}
            />
            <circle
              cx={junction.cx}
              cy={junction.cy}
              r={junction.r}
              fill="url(#wwd-node)"
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <circle
              cx={junction.cx}
              cy={junction.cy}
              r="3"
              fill="#057A72"
              opacity=".65"
            />
          </g>
        ))}

        <g className="what-we-do-hero__hub">
          <circle
            className="what-we-do-hero__hub-ring"
            cx={hub.cx}
            cy={hub.cy}
            r="78"
            stroke="#6FB8B0"
            strokeWidth="1.5"
            opacity=".45"
          />
          <circle
            className="what-we-do-hero__hub-ring what-we-do-hero__hub-ring--outer"
            cx={hub.cx}
            cy={hub.cy}
            r="108"
            stroke="#057A72"
            strokeWidth="1"
            opacity=".25"
          />
          <circle cx={hub.cx} cy={hub.cy} r="52" fill="url(#wwd-hub)" />
          <circle
            cx={hub.cx}
            cy={hub.cy}
            r="52"
            fill="#FFFDF4"
            opacity=".18"
            filter="url(#wwd-soften)"
          />
          <path
            d={`M${hub.cx - 18} ${hub.cy}h36M${hub.cx} ${hub.cy - 18}v36`}
            stroke="#F7FFFE"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity=".9"
          />
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

export function WhatWeDoSections() {
  return (
    <>
      <section className="what-we-do-hero">
        <WhatWeDoScene />
        <div className="shell">
          <div className="what-we-do-hero__content">
            <p className="eyebrow">What we do</p>
            <p className="what-we-do-hero__brand">Grand River Labs</p>
            <h1 className="what-we-do-hero__headline">
              Automate the busywork between the tools you already trust.
            </h1>
            <p className="what-we-do-hero__copy">
              We integrate the systems you run today, speed up the handoffs in
              between, and stay with you from discovery through support—so you
              reclaim time and cost without a rip-and-replace.
            </p>
            <div className="what-we-do-hero__actions">
              <a
                className="button button-primary"
                href="mailto:hello@grandriverlabs.com?subject=Book%20a%20call"
              >
                Book a call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#services">
                See our services
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="what-we-do-hero__cue" href="#services">
          Explore services
        </a>
      </section>

      <section className="section what-we-do-services" id="services">
        <div className="shell">
          <div className="what-we-do-services__top reveal">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="section-heading">
                Four ways we help you move faster.
              </h2>
            </div>
            <p className="section-copy">
              From mapping the bottleneck to shipping the automation, we stay
              close to your business—so the work fits how you already operate.
            </p>
          </div>
          <div className="what-we-do-list reveal">
            {services.map((item, index) => {
              const body = (
                <>
                  <span className="what-we-do-row__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    {"href" in item && item.href ? (
                      <span className="what-we-do-row__explore">
                        Explore
                        <Arrow />
                      </span>
                    ) : null}
                  </div>
                  <p>{item.copy}</p>
                </>
              );

              if ("href" in item && item.href) {
                return (
                  <a
                    className="what-we-do-row what-we-do-row--link"
                    href={item.href}
                    key={item.title}
                  >
                    {body}
                  </a>
                );
              }

              return (
                <article className="what-we-do-row" key={item.title}>
                  {body}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section what-we-do-integrate" id="integrate">
        <div className="shell">
          <div className="what-we-do-integrate__intro reveal">
            <p className="eyebrow">Systems integration</p>
            <div>
              <h2 className="section-heading">
                Connect what you have. Speed up what you do.
              </h2>
              <p className="section-copy">
                Automation should fit into your business—not force your business
                to fit into automation. We plug into the tools your team already
                relies on and turn friction into flow.
              </p>
            </div>
          </div>
          <div className="what-we-do-integrate__points reveal">
            {integration.map((item) => (
              <article className="what-we-do-point" key={item.number}>
                <span className="what-we-do-point__number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
          <ol className="what-we-do-glove__steps reveal">
            {engagement.map((step, index) => (
              <li className="what-we-do-glove__step" key={step.title}>
                {index > 0 ? (
                  <span
                    className="what-we-do-glove__connector"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="what-we-do-glove__connector-line"
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
                <span className="what-we-do-glove__number">
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

export function WhatWeDoCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s find where automation pays for itself.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us how work moves today. We&apos;ll map a practical path from
            your existing systems to measurable time and cost savings.
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
