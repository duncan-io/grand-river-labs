import { BOOK_CALL_HREF } from "@/lib/site";
import { testimonials, formatTestimonialName } from "@/lib/testimonials";
import { Arrow } from "./site-header";

const positioningPoints = [
  {
    title: "Integrate into your process",
    copy: "We plug into how you already operate—not a parallel vendor workflow. Digital work happens without making leadership the project manager.",
  },
  {
    title: "Own the digital side",
    copy: "Website, tools, measurement, and the unnamed backlog have an experienced owner—so they don't wait for a spare hour.",
  },
  {
    title: "Refine, enhance, and consult",
    copy: "Ongoing judgment plus hands-on work: improve what's in place, build what's worth building, and advise on what comes next.",
  },
];

const capabilities = [
  {
    label: "Website",
    title: "Website management",
    copy: "Updates, technical care, UX, conversion improvements, and coordination with other vendors—so the site stays moving.",
  },
  {
    label: "Strategy",
    title: "Strategy & prioritization",
    copy: "Decide what deserves attention now—and what is not worth spending money on—based on the business, not a service list.",
  },
  {
    label: "Systems",
    title: "Systems & automation",
    copy: "Connect tools, improve lead routing and workflows, and remove busywork when automation is the right move.",
  },
  {
    label: "Measure",
    title: "Analytics & growth",
    copy: "Tracking, conversion measurement, local presence, and growth support—applied where it will actually move the business.",
  },
];

const operatingSteps = [
  {
    title: "Look",
    copy: "Study the business, the site, the tools, and the friction. We don't wait for a spec or a backlog you already named.",
  },
  {
    title: "Find",
    copy: "Surface the priorities and opportunities that will actually move the business—not the loudest request or the easiest ticket.",
  },
  {
    title: "Attack",
    copy: "Take on the work, review what changed, and keep hunting for the next improvement.",
  },
];

const faqs = [
  {
    question: "Is this right for my business?",
    answer:
      "It's built for owner-led growing businesses that rely on a website, tools, and digital channels—but don't have an experienced person owning that work. If you already have a marketing team, GR Labs can fill digital and technical gaps rather than replace people.",
  },
  {
    question: 'What does "fractional" mean?',
    answer:
      "You get ongoing access to experienced digital leadership without hiring a full-time digital employee. GR Labs works with your business on an ongoing basis and focuses on the highest-priority work.",
  },
  {
    question: "Who will I work with?",
    answer:
      "You work directly with experienced digital leadership—not a rotating account team. When a specialist or an existing vendor is the better fit for a piece of work, GR Labs helps coordinate rather than treating every task as something to keep in-house.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Engagements start at $1,500/month. The monthly investment depends on the scope of work and the priorities we take on. We'll confirm fit and scope on a 30-minute call.",
  },
  {
    question: "Do you only manage websites?",
    answer:
      "No. Website management is a core part of the offering. GR Labs can also help with digital strategy, analytics, automation, integrations, local presence, and technical SEO where those are the right next move. It is not a full-service SEO or marketing agency.",
  },
  {
    question: "Can you work with our existing team and vendors?",
    answer:
      "Yes. GR Labs is designed to complement internal people and existing vendors—coordinating when that makes the work better, not replacing relationships that already work.",
  },
  {
    question: "What happens if we need something outside your capabilities?",
    answer:
      "GR Labs will identify the requirement and, when appropriate, help coordinate with a specialist rather than pretending to be the right provider for every task.",
  },
];

function DepartmentHeroScene() {
  const hub = { cx: 1280, cy: 450 };
  const you = { cx: 1475, cy: 450 };
  const nodes = [
    { id: "site", label: "Website", cx: 1085, cy: 300, delay: "0s" },
    { id: "strategy", label: "Strategy", cx: 1070, cy: 360, delay: "0.35s" },
    { id: "analytics", label: "Analytics", cx: 1065, cy: 420, delay: "0.7s" },
    { id: "auto", label: "Automation", cx: 1065, cy: 480, delay: "1.05s" },
    { id: "local", label: "Local", cx: 1070, cy: 540, delay: "1.4s" },
    { id: "ops", label: "Systems", cx: 1085, cy: 600, delay: "1.75s" },
  ] as const;

  const inboundPaths = nodes.map((node, index) => {
    const midX = (node.cx + hub.cx) / 2 + (index % 2 === 0 ? 14 : -10);
    const midY = (node.cy + hub.cy) / 2;
    return {
      id: node.id,
      d: `M${node.cx + 42} ${node.cy} Q${midX} ${midY} ${hub.cx - 48} ${hub.cy}`,
      delay: node.delay,
    };
  });

  const outboundPath = {
    id: "you",
    d: `M${hub.cx + 48} ${hub.cy} Q${(hub.cx + you.cx) / 2} ${hub.cy - 6} ${you.cx - 48} ${you.cy}`,
    delay: "2.2s",
  };

  return (
    <svg
      className="mkt-hero__scene fdd-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="fdd-glow" x1="1180" y1="140" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".15" />
        </linearGradient>
        <linearGradient id="fdd-node" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id="fdd-you" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFFDF4" />
          <stop offset="1" stopColor="#B0E4DC" />
        </linearGradient>
        <linearGradient id="fdd-hub" x1="1220" y1="360" x2="1400" y2="560">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <marker
          id="fdd-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10Z" fill="#057A72" />
        </marker>
      </defs>

      <circle
        className="mkt-hero__glow"
        cx="1380"
        cy="280"
        r="160"
        fill="url(#fdd-glow)"
        opacity=".85"
      />

      {inboundPaths.map((path) => (
        <g key={path.id}>
          <path d={path.d} stroke="#3A948C" strokeWidth="1.4" opacity=".26" />
          <path
            className="mkt-hero__path"
            d={path.d}
            stroke="#057A72"
            strokeWidth="1.85"
            strokeDasharray="7 12"
            style={{ animationDelay: path.delay }}
          />
          <circle
            className="mkt-hero__packet"
            r="4.2"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.2"
          >
            <animateMotion
              dur="3.6s"
              begin={path.delay}
              repeatCount="indefinite"
              path={path.d}
            />
          </circle>
        </g>
      ))}

      <g>
        <path
          d={outboundPath.d}
          stroke="#3A948C"
          strokeWidth="2.2"
          opacity=".3"
        />
        <path
          className="mkt-hero__path fdd-hero__outbound"
          d={outboundPath.d}
          stroke="#057A72"
          strokeWidth="2.6"
          strokeDasharray="8 10"
          markerEnd="url(#fdd-arrow)"
          style={{ animationDelay: outboundPath.delay }}
        />
        <circle
          className="mkt-hero__packet"
          r="5.2"
          fill="#FFFDF4"
          stroke="#057A72"
          strokeWidth="1.4"
        >
          <animateMotion
            dur="3.2s"
            begin={outboundPath.delay}
            repeatCount="indefinite"
            path={outboundPath.d}
          />
        </circle>
      </g>

      {nodes.map((node) => (
        <g
          key={node.id}
          className="mkt-hero__node"
          style={{ animationDelay: node.delay }}
        >
          <circle
            className="mkt-hero__node-ring"
            cx={node.cx}
            cy={node.cy}
            r="28"
            stroke="#6FB8B0"
            strokeWidth="1"
            style={{ animationDelay: node.delay }}
          />
          <rect
            x={node.cx - 42}
            y={node.cy - 14}
            width="84"
            height="28"
            rx="8"
            fill="url(#fdd-node)"
            stroke="#057A72"
            strokeWidth="1.4"
          />
          <text
            x={node.cx}
            y={node.cy + 4}
            textAnchor="middle"
            fill="#057A72"
            fontFamily="var(--font-outfit), sans-serif"
            fontSize="10.5"
            fontWeight="650"
          >
            {node.label}
          </text>
        </g>
      ))}

      <g className="fdd-hero__hub">
        <circle
          className="fdd-hero__hub-ring"
          cx={hub.cx}
          cy={hub.cy}
          r="72"
          stroke="#6FB8B0"
          strokeWidth="1.5"
          opacity=".45"
        />
        <circle
          className="fdd-hero__hub-ring fdd-hero__hub-ring--outer"
          cx={hub.cx}
          cy={hub.cy}
          r="98"
          stroke="#057A72"
          strokeWidth="1"
          opacity=".22"
        />
        <circle cx={hub.cx} cy={hub.cy} r="48" fill="url(#fdd-hub)" />
        <text
          x={hub.cx}
          y={hub.cy + 5}
          textAnchor="middle"
          fill="#F7FFFE"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="13"
          fontWeight="700"
        >
          GR Labs
        </text>
      </g>

      <g className="fdd-hero__you mkt-hero__node" style={{ animationDelay: "2.2s" }}>
        <circle
          className="mkt-hero__node-ring"
          cx={you.cx}
          cy={you.cy}
          r="38"
          stroke="#6FB8B0"
          strokeWidth="1.25"
          style={{ animationDelay: "2.2s" }}
        />
        <rect
          x={you.cx - 48}
          y={you.cy - 18}
          width="96"
          height="36"
          rx="11"
          fill="url(#fdd-you)"
          stroke="#057A72"
          strokeWidth="1.8"
        />
        <text
          x={you.cx}
          y={you.cy + 5}
          textAnchor="middle"
          fill="#057A72"
          fontFamily="var(--font-outfit), sans-serif"
          fontSize="14"
          fontWeight="700"
        >
          You
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

function AreaIcon({ label }: { label: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": true as const,
    className: "fdd-areas__icon-svg",
  };

  switch (label) {
    case "Website":
      return (
        <svg {...common}>
          <rect x="10" y="12" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <path d="M10 18h28M16 12v6" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    case "Strategy":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.75" />
          <path d="M24 16v8l6 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "Systems":
      return (
        <svg {...common}>
          <circle cx="16" cy="18" r="4" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="32" cy="16" r="4" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="24" cy="32" r="4" stroke="currentColor" strokeWidth="1.75" />
          <path d="M19.5 20.5 22 29M28.5 19.2 26 29" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 34V22M20 34V16M28 34V26M36 34V12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
  }
}

export function FractionalDigitalDepartmentSections() {
  return (
    <>
      <section className="mkt-hero fdd-hero">
        <DepartmentHeroScene />
        <div className="shell">
          <div className="mkt-hero__content fdd-hero__content">
            <p className="eyebrow">GR Labs</p>
            <h1 className="mkt-hero__headline">
              Your Fractional Digital Department
            </h1>
            <p className="fdd-hero__support">
              Senior digital leadership and hands-on execution—without hiring a
              full-time team.
            </p>
            <p className="mkt-hero__copy">
              For owner-led growing businesses that rely on digital tools but
              don&apos;t have an experienced person owning them. GR Labs takes
              ownership of the highest-priority digital work: website, strategy,
              systems, and measurement.
            </p>
            <div className="mkt-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a 30-minute fit call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#how-it-works">
                See how it works
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#the-gap">
          How we fit in
        </a>
      </section>

      <section className="section fdd-problem" id="the-gap">
        <div className="shell">
          <div className="fdd-problem__top reveal">
            <div className="fdd-problem__intro">
              <p className="eyebrow">The gap</p>
              <h2 className="section-heading">
                We work inside how you already operate—and own the digital
                side.
              </h2>
              <p className="section-copy">
                Agencies and specialists sit outside the business. Consultants
                advise and leave. The gap is a partner who learns your process,
                takes ownership of website, tools, and systems, and keeps
                refining, enhancing, and advising.
              </p>
            </div>
          </div>
          <div className="fdd-problem__grid reveal">
            {positioningPoints.map((item, index) => (
              <article className="fdd-problem__cell" key={item.title}>
                <span className="fdd-problem__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="fdd-problem__insight reveal">
            Judgment, partnership, and execution inside your
            process—without a full-time hire or a rigid agency menu.
          </p>
        </div>
      </section>

      <section className="section fdd-areas" id="what-we-do">
        <div className="shell">
          <div className="fdd-areas__top reveal">
            <div>
              <p className="eyebrow">The work</p>
              <h2 className="section-heading">
                One partner. Across your highest-priority digital work.
              </h2>
            </div>
            <p className="section-copy">
              These are the areas GR Labs can own. The mix follows what will
              have the greatest impact for your business—not a predetermined
              monthly menu.
            </p>
          </div>
          <div className="fdd-areas__grid reveal">
            {capabilities.map((item) => (
              <article className="fdd-areas__card" key={item.title}>
                <span className="fdd-areas__icon" aria-hidden="true">
                  <AreaIcon label={item.label} />
                </span>
                <span className="fdd-areas__label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section fdd-flow" id="how-it-works">
        <div className="shell">
          <div className="fdd-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                You don&apos;t need a brief. We find the work worth doing.
              </h2>
            </div>
            <p className="section-copy">
              Don&apos;t arrive with a punch list. GR Labs looks at the
              business, seeks out the digital priorities and opportunities worth
              attacking, and takes them on—so you are not the one figuring out
              what to request.
            </p>
          </div>
          <ol className="fdd-flow__steps reveal">
            {operatingSteps.map((step, index) => (
              <li className="fdd-flow__step" key={step.title}>
                {index > 0 ? (
                  <span className="fdd-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="fdd-flow__connector-line"
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
                <span className="fdd-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="fdd-flow__promise reveal">
            You don&apos;t have to figure out what to ask us to do. That&apos;s
            part of what you&apos;re paying us for.
          </p>
          <div className="fdd-offer reveal">
            <div>
              <p className="fdd-offer__price">Starting at $1,500/month</p>
              <p className="fdd-offer__copy">
                Ongoing monthly support with direct access to experienced senior
                digital leadership. Hands-on execution, plus coordination with
                specialists or existing vendors when that is the right move.
                Scope is tailored to the business.
              </p>
            </div>
            <a
              className="button button-primary"
              href={BOOK_CALL_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a 30-minute fit call
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="section fdd-proof" id="proof">
        <div className="shell">
          <div className="fdd-proof__top reveal">
            <div>
              <p className="eyebrow">From clients</p>
              <h2 className="section-heading">
                Our work speaks for itself.
              </h2>
            </div>
            <p className="section-copy">
              Clients work with GR Labs to cut through digital noise and focus
              on what actually moves the business—with recommendations that fit
              how the business operates.
            </p>
          </div>
          <div className="fdd-proof__quotes reveal">
            {testimonials.map((item) => (
              <blockquote className="fdd-proof__quote" key={item.name}>
                <p>{item.quote}</p>
                <footer>
                  <cite>{formatTestimonialName(item.name)}</cite>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="fdd-proof__more reveal">
            <a href="/testimonials">All testimonials →</a>
          </p>
        </div>
      </section>

      <section className="section fdd-faq" id="faq">
        <div className="shell">
          <div className="fdd-faq__top reveal">
            <div>
              <p className="eyebrow">Questions</p>
              <h2 className="section-heading">What people usually ask.</h2>
            </div>
            <p className="section-copy">
              Ongoing access to experienced digital leadership—not a full-time
              hire, and not a one-off project. Engagements start at
              $1,500/month.
            </p>
          </div>
          <div className="fdd-faq__list reveal">
            {faqs.map((item) => (
              <details className="fdd-faq__item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
