import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

const contrast = [
  {
    number: "01",
    title: "Rules when the path is clear",
    copy: "If the logic is if-this-then-that—status equals X, amount above Y, form field filled—we keep it as rules. Fast, predictable, easy to audit.",
  },
  {
    number: "02",
    title: "AI when judgment shows up",
    copy: "Unstructured email, messy PDFs, ambiguous tickets, “close enough” matches. AI reads the gray area, proposes a next step, and hands off when confidence drops.",
  },
  {
    number: "03",
    title: "Both, wired into your stack",
    copy: "The win isn’t a chat window. It’s AI and rules sitting inside the CRM, inbox, and ops tools your team already trusts—so work moves without a new island.",
  },
];

const examples = [
  {
    title: "Document extraction",
    scenario:
      "Invoices, contracts, and intake PDFs land in a shared inbox or drive. Someone opens each file, hunts for dates, amounts, parties, and line items, then retypes them into the CRM or ERP.",
    does: "AI reads the document, pulls the fields you care about, flags low-confidence values, and pushes clean records into the system of record—with a human check on exceptions.",
    outcome: "Hours of retyping disappear. Data lands where work already happens, same day.",
  },
  {
    title: "Inbox and ticket triage",
    scenario:
      "Support and ops queues fill with requests that look different every time. The first pass—sort, tag, route—eats half a morning before anyone solves a real problem.",
    does: "AI classifies intent, urgency, and account context, then routes to the right queue or owner. Edge cases and angry threads escalate with a short summary attached.",
    outcome: "The queue sorts itself. People start on the work that needs judgment, not the filing.",
  },
  {
    title: "Drafting with human review",
    scenario:
      "Proposals, client replies, and handoff notes follow the same shape, but every draft still starts from a blank page. Quality varies with who is writing and how rushed they are.",
    does: "AI drafts from your templates, CRM fields, and prior wins. Your team edits tone and specifics—then sends. Nothing ships without a person in the loop.",
    outcome: "First drafts in minutes. Consistency up, blank-page time down.",
  },
  {
    title: "Knowledge agents over your docs",
    scenario:
      "SOPs, manuals, and policy PDFs live in folders nobody searches well. New hires ask the same questions; veterans dig through Slack and old decks.",
    does: "An agent answers from your approved corpus—with citations back to the source. When the answer isn’t there, it says so and points to a human.",
    outcome: "Answers in seconds, grounded in what you’ve already written—not a generic chatbot.",
  },
  {
    title: "CRM cleaning and enrichment",
    scenario:
      "Duplicates, missing industries, stale titles, and half-filled accounts slow every campaign and forecast. Cleanup is always “next quarter.”",
    does: "AI spots duplicates, standardizes fields, and enriches records from approved sources. Changes land as suggested updates or auto-apply under your rules.",
    outcome: "A cleaner CRM without a multi-week spreadsheet project.",
  },
  {
    title: "Reporting and insight summaries",
    scenario:
      "Dashboards exist, but executives still ask for the story: what moved, what stalled, what needs a decision. Analysts spend Mondays assembling the narrative by hand.",
    does: "AI reads the numbers and open items, then drafts a weekly brief—patterns, exceptions, and suggested follow-ups—ready for a human to tighten.",
    outcome: "Less scrolling, more decisions. Like adding an analyst for the first pass.",
  },
  {
    title: "Sales prep and CRM updates",
    scenario:
      "Reps leave meetings and either update the CRM carefully or chase the next call. Notes go stale; prep for the next meeting starts from memory.",
    does: "After a call or from the transcript, AI drafts the CRM update, next steps, and a short prep brief for the follow-up—rep reviews and commits.",
    outcome: "CRM stays current. Prep takes minutes, not a scramble before the meeting.",
  },
  {
    title: "Support deflection with escalation",
    scenario:
      "The same FAQs, policy questions, and “where is my order?” threads repeat every day. Humans burn cycles on answers that never change—while real edge cases wait.",
    does: "AI handles high-confidence, repeatable asks with the same inputs every time: FAQs, policies, product data, past tickets. Anything uncertain escalates with context.",
    outcome: "Volume drops for the team. Customers get faster answers on the easy stuff.",
  },
];

const engagement = [
  {
    title: "Discover",
    copy: "We sit with the people who live the process, map where judgment and rework hide, and pick the AI use cases that save real time—not the ones that look flashy in a demo.",
  },
  {
    title: "Design into your stack",
    copy: "We wire extraction, triage, and assistants into the tools you already run. Guardrails, review steps, and fallbacks are part of the design—not an afterthought.",
  },
  {
    title: "Launch & refine",
    copy: "We launch carefully, watch the first weeks of real traffic, and tune prompts, routing, and handoffs until the automation earns trust day to day.",
  },
];

function AiAutomationScene() {
  const doc = { x: 980, y: 280 };
  const brain = { x: 1260, y: 420 };
  const system = { x: 1480, y: 560 };

  const pathDocBrain = `M${doc.x + 48} ${doc.y + 70} Q1120 360 ${brain.x - 56} ${brain.y}`;
  const pathBrainSystem = `M${brain.x + 56} ${brain.y + 20} Q1400 500 ${system.x - 40} ${system.y - 10}`;

  return (
    <svg
      className="ai-automation-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="ai-glow" x1="1100" y1="100" x2="1500" y2="480">
          <stop stopColor="#FFFDF4" stopOpacity=".88" />
          <stop offset="1" stopColor="#B0E4DC" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id="ai-doc" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
        <linearGradient id="ai-brain" x1="1180" y1="300" x2="1360" y2="540">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
        <linearGradient id="ai-system" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <filter id="ai-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <circle
        className="ai-automation-hero__glow"
        cx="1280"
        cy="220"
        r="150"
        fill="url(#ai-glow)"
        opacity=".85"
      />

      <g className="ai-automation-hero__paths">
        <path
          d={pathDocBrain}
          stroke="#3A948C"
          strokeWidth="1.6"
          opacity=".3"
        />
        <path
          className="ai-automation-hero__path"
          d={pathDocBrain}
          stroke="#057A72"
          strokeWidth="2"
          strokeDasharray="8 12"
        />
        <path
          d={pathBrainSystem}
          stroke="#3A948C"
          strokeWidth="1.6"
          opacity=".3"
        />
        <path
          className="ai-automation-hero__path"
          d={pathBrainSystem}
          stroke="#057A72"
          strokeWidth="2"
          strokeDasharray="8 12"
          style={{ animationDelay: "0.9s" }}
        />
        <circle
          className="ai-automation-hero__packet"
          r="4.5"
          fill="#FFFDF4"
          stroke="#057A72"
          strokeWidth="1.25"
        >
          <animateMotion
            dur="3.8s"
            repeatCount="indefinite"
            path={pathDocBrain}
          />
        </circle>
        <circle
          className="ai-automation-hero__packet"
          r="4.5"
          fill="#FFFDF4"
          stroke="#057A72"
          strokeWidth="1.25"
        >
          <animateMotion
            dur="3.8s"
            begin="0.9s"
            repeatCount="indefinite"
            path={pathBrainSystem}
          />
        </circle>
      </g>

      {/* Document */}
      <g className="ai-automation-hero__doc">
        <rect
          x={doc.x}
          y={doc.y}
          width="96"
          height="128"
          rx="8"
          fill="url(#ai-doc)"
          stroke="#057A72"
          strokeWidth="1.5"
        />
        <path
          d={`M${doc.x + 18} ${doc.y + 28}h60M${doc.x + 18} ${doc.y + 48}h48M${doc.x + 18} ${doc.y + 68}h54M${doc.x + 18} ${doc.y + 88}h36`}
          stroke="#3A948C"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity=".55"
        />
        <circle
          className="ai-automation-hero__node-ring"
          cx={doc.x + 48}
          cy={doc.y + 64}
          r="72"
          stroke="#6FB8B0"
          strokeWidth="1"
        />
      </g>

      {/* Judgment / AI hub */}
      <g className="ai-automation-hero__brain">
        <circle
          className="ai-automation-hero__brain-ring"
          cx={brain.x}
          cy={brain.y}
          r="78"
          stroke="#6FB8B0"
          strokeWidth="1.5"
          opacity=".45"
        />
        <circle
          className="ai-automation-hero__brain-ring ai-automation-hero__brain-ring--outer"
          cx={brain.x}
          cy={brain.y}
          r="108"
          stroke="#057A72"
          strokeWidth="1"
          opacity=".22"
        />
        <circle cx={brain.x} cy={brain.y} r="52" fill="url(#ai-brain)" />
        <circle
          cx={brain.x}
          cy={brain.y}
          r="52"
          fill="#FFFDF4"
          opacity=".16"
          filter="url(#ai-soften)"
        />
        {/* Simple “read” mark — arcs suggesting attention, not a brain emoji */}
        <path
          d={`M${brain.x - 16} ${brain.y - 6}c6-14 26-14 32 0M${brain.x - 10} ${brain.y + 10}c4 10 16 10 20 0`}
          stroke="#F7FFFE"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity=".92"
        />
        <circle cx={brain.x} cy={brain.y + 2} r="3.5" fill="#F7FFFE" opacity=".9" />
      </g>

      {/* System / CRM block */}
      <g className="ai-automation-hero__system">
        <rect
          x={system.x - 44}
          y={system.y - 44}
          width="88"
          height="88"
          rx="14"
          fill="url(#ai-system)"
          stroke="#057A72"
          strokeWidth="1.5"
        />
        <rect
          x={system.x - 28}
          y={system.y - 22}
          width="56"
          height="8"
          rx="2"
          fill="#057A72"
          opacity=".35"
        />
        <rect
          x={system.x - 28}
          y={system.y - 6}
          width="40"
          height="8"
          rx="2"
          fill="#057A72"
          opacity=".28"
        />
        <rect
          x={system.x - 28}
          y={system.y + 10}
          width="48"
          height="8"
          rx="2"
          fill="#057A72"
          opacity=".22"
        />
        <circle
          className="ai-automation-hero__node-ring"
          cx={system.x}
          cy={system.y}
          r="62"
          stroke="#6FB8B0"
          strokeWidth="1"
          style={{ animationDelay: "1.2s" }}
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

export function AiAutomationSections() {
  return (
    <>
      <section className="ai-automation-hero">
        <AiAutomationScene />
        <div className="shell">
          <div className="ai-automation-hero__content">
            <p className="eyebrow">AI automation</p>
            <p className="ai-automation-hero__brand">Grand River Labs</p>
            <h1 className="ai-automation-hero__headline">
              Practical AI inside the work you already do.
            </h1>
            <p className="ai-automation-hero__copy">
              Extraction, triage, drafting, and assistants—tied to your real
              systems. No demos that die on a slide. Tools your team can trust
              day to day.
            </p>
            <div className="ai-automation-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
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
        <a className="ai-automation-hero__cue" href="#when-ai">
          When AI belongs
        </a>
      </section>

      <section className="section ai-automation-contrast" id="when-ai">
        <div className="shell">
          <div className="ai-automation-contrast__intro reveal">
            <p className="eyebrow">When AI belongs</p>
            <div>
              <h2 className="section-heading">
                Rules for the clear path. AI for the gray area.
              </h2>
              <p className="section-copy">
                We don&apos;t bolt a model onto every step. Where judgment is
                needed—messy inputs, ambiguous routing, drafting—automation can
                include AI. Where rules are enough, we keep it simple.
              </p>
            </div>
          </div>
          <div className="ai-automation-contrast__points reveal">
            {contrast.map((item) => (
              <article className="ai-automation-point" key={item.number}>
                <span className="ai-automation-point__number">
                  {item.number}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section ai-automation-examples" id="examples">
        <div className="shell">
          <div className="ai-automation-examples__top reveal">
            <div>
              <p className="eyebrow">Examples</p>
              <h2 className="section-heading">
                Where AI pays off in real workflows.
              </h2>
            </div>
            <p className="section-copy">
              Full write-ups of the patterns we see most—situation, what the
              automation does, and the outcome your team feels.
            </p>
          </div>
          <div className="ai-automation-example-list reveal">
            {examples.map((item, index) => (
              <article className="ai-automation-example" key={item.title}>
                <span className="ai-automation-example__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="ai-automation-example__body">
                  <h3>{item.title}</h3>
                  <p className="ai-automation-example__scenario">
                    {item.scenario}
                  </p>
                  <p className="ai-automation-example__does">
                    <span className="ai-automation-example__label">
                      What we build
                    </span>
                    {item.does}
                  </p>
                  <p className="ai-automation-example__outcome">
                    <span className="ai-automation-example__label">
                      Outcome
                    </span>
                    {item.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section ai-automation-flow" id="how-we-work">
        <div className="shell">
          <div className="ai-automation-flow__top reveal">
            <div>
              <p className="eyebrow">How we put AI to work</p>
              <h2 className="section-heading">
                Discover. Design into your stack. Stay with it.
              </h2>
            </div>
            <p className="section-copy">
              White-glove from the first map of the bottleneck through the weeks
              after launch—so you get a working process, not a brittle handoff.
            </p>
          </div>
          <ol className="ai-automation-flow__steps reveal">
            {engagement.map((step, index) => (
              <li className="ai-automation-flow__step" key={step.title}>
                {index > 0 ? (
                  <span
                    className="ai-automation-flow__connector"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="ai-automation-flow__connector-line"
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
                <span className="ai-automation-flow__number">
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

export function AiAutomationCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Let&apos;s find where AI earns its keep.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us about a process that eats time in the gray area. We&apos;ll
            map a practical path from today&apos;s bottleneck to a working
            automation.
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
