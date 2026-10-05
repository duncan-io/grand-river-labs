import Link from "next/link";
import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

const friction = [
  {
    title: "Traffic without inquiries",
    copy: "Visits show up in the report. The inbox stays quiet. The site is busy, and the business still isn't hearing from the people it wanted.",
  },
  {
    title: "Unclear next step",
    copy: "The offer is on the page. The action isn't. Visitors scroll, hesitate, and leave because nothing tells them what to do next.",
  },
  {
    title: "Forms that lose people",
    copy: "Too many fields, a buried submit, a booking flow that restarts the question. People who were ready to talk drop off at the last step.",
  },
  {
    title: "Changes based on opinion",
    copy: "The homepage gets redesigned because someone has a feeling. Nothing is measured, so the next version is another guess.",
  },
];

const ways = [
  {
    title: "Journey and funnel audit",
    lead: "See where the path from visit to inquiry actually breaks.",
    setup:
      "A walkthrough of the pages, steps, and dead ends between arrival and a conversation.",
    outcome:
      "A short list of the changes worth making first—not a fifty-point critique.",
  },
  {
    title: "Page hierarchy and CTAs",
    lead: "The page should make the next step obvious.",
    setup:
      "Headline, hierarchy, proof, and calls to action shaped around how you win the work.",
    outcome: "A page that points somewhere, instead of explaining everything at once.",
  },
  {
    title: "Form and booking flow",
    lead: "The last step should be the easiest one.",
    setup:
      "Shorter forms, clearer labels, and booking paths that don't make people start over.",
    outcome: "More of the people who meant to inquire actually finish.",
  },
  {
    title: "A/B and multivariate testing",
    lead: "Change something you can judge, not the whole page at once.",
    setup:
      "Tests on headlines, calls to action, forms, and layout—sized to the traffic you actually have.",
    outcome: "A winner you can keep, and a record of what you tried.",
  },
  {
    title: "Landing pages for campaigns",
    lead: "A campaign deserves a page that matches the click.",
    setup:
      "Focused pages for ads, offers, and seasons—one job, one next step.",
    outcome: "Spend lands on a page built to convert, not the generic homepage.",
  },
];

const steps = [
  {
    title: "Measure",
    copy: "We look at where people arrive, stall, and leave—and whether the tracking can support the decision. If the numbers aren't trustworthy yet, that gets fixed first.",
  },
  {
    title: "Hypothesize",
    copy: "We pick the few changes most likely to turn a visit into an inquiry, and say what we expect to happen before anything ships.",
  },
  {
    title: "Test and ship",
    copy: "We change hierarchy, calls to action, forms, or a landing page—and test when there's enough traffic to learn from.",
  },
  {
    title: "Learn and repeat",
    copy: "We keep what moved the number, drop what didn't, and take the next change from evidence rather than the loudest opinion.",
  },
];

const FUNNEL_CX = 1198;

const stages = [
  { id: "visit", label: "Visit", y: 248, width: 364, fill: "#075752" },
  {
    id: "engage",
    label: "Engage",
    y: 344,
    width: 304,
    fill: "#057A72",
    lift: "+12%",
  },
  {
    id: "form",
    label: "Form start",
    y: 440,
    width: 236,
    fill: "#3A948C",
    lift: "+19%",
  },
  {
    id: "inquiry",
    label: "Inquiry",
    y: 536,
    width: 168,
    fill: "#024E49",
    lift: "+8%",
  },
] as const;

function LiftMark({ label }: { label: string }) {
  return (
    <g className="cro-hero__lift">
      <rect
        x="-34"
        y="-13"
        width="68"
        height="26"
        rx="13"
        fill="#FFFDF4"
        stroke="#057A72"
        strokeWidth="1.4"
      />
      <path
        d="M-18 3.5v-8M-21.2 -1.6 -18 -4.8 -14.8 -1.6"
        stroke="#057A72"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="8"
        y="4"
        textAnchor="middle"
        fill="#075752"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="11"
        fontWeight="700"
      >
        {label}
      </text>
    </g>
  );
}

function CroHeroScene() {
  return (
    <svg
      className="cro-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="cro-glow" x1="1100" y1="80" x2="1520" y2="520">
          <stop stopColor="#FFFDF4" stopOpacity=".9" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="cro-panel" x1="968" y1="150" x2="1420" y2="720">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
      </defs>

      <circle
        className="cro-hero__glow"
        cx="1320"
        cy="240"
        r="160"
        fill="url(#cro-glow)"
        opacity=".85"
      />

      <g className="cro-hero__board">
        <rect
          x="968"
          y="156"
          width="452"
          height="560"
          rx="22"
          fill="url(#cro-panel)"
          stroke="#057A72"
          strokeWidth="1.75"
        />
        <circle cx="996" cy="188" r="5" fill="#6FB8B0" />
        <circle cx="1014" cy="188" r="5" fill="#3A948C" />
        <circle className="cro-hero__live" cx="1032" cy="188" r="5" fill="#057A72" />
        <text
          x="1054"
          y="193"
          fill="#075752"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          INQUIRY FUNNEL
        </text>

        {stages.map((stage) => {
          const x = FUNNEL_CX - stage.width / 2;
          return (
            <g key={stage.id}>
              <text
                x={FUNNEL_CX}
                y={stage.y - 12}
                textAnchor="middle"
                fill="#075752"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="12"
                fontWeight="700"
                letterSpacing="0.06em"
              >
                {stage.label.toUpperCase()}
              </text>
              <rect
                x={x}
                y={stage.y}
                width={stage.width}
                height="58"
                rx="10"
                fill="#FFFDF4"
                stroke="#057A72"
                strokeWidth="1.2"
                opacity="0.55"
              />
              <rect
                className={
                  stage.id === "visit" ? undefined : `cro-hero__bar cro-hero__bar--${stage.id}`
                }
                x={x}
                y={stage.y}
                width={stage.width}
                height="58"
                rx="10"
                fill={stage.fill}
              />
              {"lift" in stage ? (
                <g
                  transform={`translate(${x + stage.width - 28} ${stage.y + 29})`}
                >
                  <LiftMark label={stage.lift} />
                </g>
              ) : null}
            </g>
          );
        })}

        <g transform="translate(996 612)">
          <g className="cro-hero__variant">
          <rect
            width="396"
            height="80"
            rx="14"
            fill="#FFFDF4"
            stroke="#057A72"
            strokeWidth="1.4"
          />
          <text
            x="18"
            y="28"
            fill="#3A948C"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            VARIANT B
          </text>
          <text
            x="18"
            y="56"
            fill="#6FB8B0"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="13"
            fontWeight="650"
          >
            A 2.1%
          </text>
          <rect x="78" y="46" width="64" height="8" rx="4" fill="#B0E4DC" />
          <text
            x="214"
            y="56"
            fill="#057A72"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="13"
            fontWeight="700"
          >
            B 4.8%
          </text>
          <rect x="274" y="46" width="104" height="8" rx="4" fill="#057A72" />
          </g>
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

export function CroSections() {
  return (
    <>
      <section className="cro-hero">
        <div className="cro-hero__scene-wrap">
          <CroHeroScene />
        </div>
        <div className="shell">
          <div className="cro-hero__content">
            <p className="eyebrow">Conversion Rate Optimization</p>
            <h1 className="cro-hero__headline">
              Turn the traffic you already have into conversations.
            </h1>
            <p className="cro-hero__copy">
              Clearer journeys, stronger calls to action, and forms people
              finish. We improve the path from visit to inquiry—on the site you
              already have.
            </p>
            <div className="cro-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#ways">
                See what&apos;s covered
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="cro-hero__cue" href="#friction">
          Where visitors drop off
        </a>
      </section>

      <section className="section cro-friction" id="friction">
        <div className="shell">
          <div className="cro-friction__top reveal">
            <div>
              <p className="eyebrow">The leak</p>
              <h2 className="section-heading">
                The traffic is there. The conversations aren&apos;t.
              </h2>
            </div>
            <p className="section-copy">
              Most sites don&apos;t need more visitors first. They need a path
              that tells the right people what to do—and a way to know whether
              a change helped.
            </p>
          </div>
          <div className="cro-friction__grid reveal">
            {friction.map((item, index) => (
              <article className="cro-friction__cell" key={item.title}>
                <span className="cro-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cro-ways" id="ways">
        <div className="shell">
          <div className="cro-ways__top reveal">
            <div>
              <p className="eyebrow">What&apos;s covered</p>
              <h2 className="section-heading">What we change.</h2>
            </div>
            <p className="section-copy">
              Conversion work on the pages, forms, and campaigns you already
              run—not a redesign for its own sake.
            </p>
          </div>
          <div className="cro-ways__grid reveal">
            {ways.map((item, index) => (
              <article className="cro-way" key={item.title}>
                <span className="cro-way__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p className="cro-way__lead">{item.lead}</p>
                <p className="cro-way__setup">
                  <span className="cro-way__label">What we do</span>
                  {item.setup}
                </p>
                <p className="cro-way__outcome">
                  <span className="cro-way__label">You get</span>
                  {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cro-flow" id="how-it-works">
        <div className="shell">
          <div className="cro-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                A loop, not a one-time redesign.
              </h2>
            </div>
            <p className="section-copy">
              CRO depends on clean tracking. We start from the drop-off you can
              already see, and when the numbers aren&apos;t trustworthy yet, that
              gets fixed first—see <Link href="/analytics">Analytics</Link>.
            </p>
          </div>
          <ol className="cro-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="cro-flow__step" key={step.title}>
                {index > 0 ? (
                  <span className="cro-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="cro-flow__connector-line"
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
                <span className="cro-flow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">Part of the bigger picture</span>
            CRO is one lever, and it sits inside our{" "}
            <Link href="/website-strategy">Website Partner</Link>
            —the same site, owned end to end. Whether conversion is the right
            lever right now depends on everything else. That&apos;s what the{" "}
            <Link href="/fractional-digital-department">
              Fractional Digital Department
            </Link>{" "}
            figures out.
          </p>
        </div>
      </section>
    </>
  );
}

export function CroCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">Let&apos;s look at where the visits go.</h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us what the site is supposed to do. We&apos;ll map where people
            drop off and which changes are worth making first.
          </p>
          <div className="use-cases-cta__buttons">
            <a
              className="button button-primary"
              href={BOOK_CALL_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
              <Arrow />
            </a>
            <Link className="button button-secondary" href="/fractional-digital-department">
              See the whole picture
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
