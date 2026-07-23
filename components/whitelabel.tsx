import { Arrow } from "./site-header";

const audience = [
  {
    title: "Agencies",
    copy: "You already advise clients on ops, marketing, or tech. Add automation to the offer without staffing a delivery team.",
  },
  {
    title: "Consultants",
    copy: "You see the bottlenecks. We turn those recommendations into working automations—under your name.",
  },
  {
    title: "Freelancers",
    copy: "You own the relationship. We handle the build so you can sell the outcome without learning the stack.",
  },
];

const friction = [
  {
    title: "The learning curve never ends",
    copy: "New tools, models, and integrations every quarter. Becoming “the AI person” eats the time you need for clients.",
  },
  {
    title: "Delivery risk on your reputation",
    copy: "Clients hire you for trust. A half-built automation that fails mid-process puts that trust on the line.",
  },
  {
    title: "Tool sprawl, no clear path",
    copy: "Zapier here, a chatbot there, a spreadsheet glue job in between. Nothing compounds—and nothing looks like a real service.",
  },
  {
    title: "Hours away from billable work",
    copy: "Every hour spent figuring out prompts and APIs is an hour you aren’t selling, advising, or closing.",
  },
];

const benefits = [
  {
    title: "Your brand on the work",
    copy: "Clients see you. We stay behind the scenes—so you expand the offer without diluting the relationship.",
  },
  {
    title: "You keep the client",
    copy: "You own the conversation and the account. We show up as your delivery bench, not a competing agency.",
  },
  {
    title: "Discovery through support",
    copy: "We map the bottleneck, build the automation, and stay with it—so you’re not left holding a brittle demo.",
  },
  {
    title: "Fits how they already work",
    copy: "Practical automations around their current tools and workflows. No rip-and-replace. No jargon theater.",
  },
];

const steps = [
  {
    title: "Introduce",
    copy: "You bring the client and the context. We listen, map the work, and scope what will actually save time, labor, and money.",
  },
  {
    title: "We deliver under your brand",
    copy: "We build and launch the automation. You stay the face of the engagement—we stay the engine.",
  },
  {
    title: "You own the relationship",
    copy: "Results land with your client. You deepen the account; we refine and support so the savings keep compounding.",
  },
];

function WhitelabelScene() {
  return (
    <svg
      className="whitelabel-hero__scene"
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="wl-engine" x1="980" y1="280" x2="1380" y2="720">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#3A948C" />
        </linearGradient>
        <linearGradient id="wl-facade" x1="900" y1="200" x2="1180" y2="680">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#D7F0EC" />
        </linearGradient>
        <filter id="wl-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <circle
        className="whitelabel-hero__glow"
        cx="1180"
        cy="260"
        r="120"
        fill="#FFFDF4"
        opacity=".7"
        filter="url(#wl-soften)"
      />

      {/* Delivery / engine layer — sits behind the brand façade */}
      <g className="whitelabel-hero__engine" opacity=".88">
        <path
          d="M980 310c90-70 190-90 290-40 70 35 130 30 190-20v380c-80 40-170 55-270 20-95-33-180-10-260 45V310Z"
          fill="url(#wl-engine)"
        />
        <path
          d="M1040 420h280M1040 480h220M1040 540h250"
          stroke="#EAF9F7"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".45"
        />
        <circle cx="1070" cy="420" r="7" fill="#F5FCFB" opacity=".7" />
        <circle cx="1070" cy="480" r="7" fill="#F5FCFB" opacity=".55" />
        <circle cx="1070" cy="540" r="7" fill="#F5FCFB" opacity=".4" />
        <path
          className="whitelabel-hero__pulse-ring"
          d="M1280 500c28 0 50 22 50 50s-22 50-50 50-50-22-50-50 22-50 50-50Z"
          stroke="#EAF9F7"
          strokeWidth="2"
          opacity=".5"
        />
        <circle cx="1280" cy="550" r="14" fill="#F5FCFB" opacity=".65" />
      </g>

      {/* Front-stage brand façade */}
      <g className="whitelabel-hero__facade">
        <path
          d="M780 240h320c18 0 32 14 32 32v400c0 18-14 32-32 32H780c-18 0-32-14-32-32V272c0-18 14-32 32-32Z"
          fill="url(#wl-facade)"
        />
        <path
          d="M780 240h320c18 0 32 14 32 32v48H748v-48c0-18 14-32 32-32Z"
          fill="#CDEBE6"
          opacity=".85"
        />
        <path
          d="M820 360h200M820 410h160M820 460h180"
          stroke="#5F7976"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity=".35"
        />
        <rect
          x="820"
          y="520"
          width="110"
          height="36"
          rx="4"
          fill="#057A72"
          opacity=".85"
        />
        <text
          x="875"
          y="300"
          textAnchor="middle"
          fill="#075752"
          fontFamily="Georgia, serif"
          fontSize="22"
          fontWeight="600"
          letterSpacing="1.5"
          opacity=".75"
        >
          YOUR BRAND
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

export function WhitelabelSections() {
  return (
    <>
      <section className="whitelabel-hero">
        <WhitelabelScene />
        <div className="shell">
          <div className="whitelabel-hero__content">
            <h1 className="whitelabel-hero__brand">Grand River Labs</h1>
            <p className="eyebrow">For agencies &amp; freelancers</p>
            <p className="whitelabel-hero__headline">
              Offer AI automation without learning the stack.
            </p>
            <p className="whitelabel-hero__copy">
              Sell the outcome under your brand. We design and deliver behind
              the scenes—so you grow the offer without becoming an automation
              shop.
            </p>
            <div className="whitelabel-hero__actions">
              <a
                className="button button-primary"
                href="mailto:hello@grandriverlabs.com?subject=White-label%20partnership"
              >
                Talk about partnering
                <Arrow />
              </a>
              <a className="button button-secondary" href="/#contact">
                Get in touch
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="whitelabel-hero__cue" href="#how-it-works">
          See how it works
        </a>
      </section>

      <section className="section whitelabel-audience">
        <div className="shell">
          <div className="whitelabel-audience__top reveal">
            <div>
              <p className="eyebrow">Who it&apos;s for</p>
              <h2 className="section-heading">
                You own the relationship. We bring the delivery.
              </h2>
            </div>
            <p className="section-copy">
              Built for people who already serve clients—and want to add
              automation without rebuilding their business around it.
            </p>
          </div>
          <div className="whitelabel-personas reveal">
            {audience.map((item) => (
              <article className="whitelabel-persona" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section whitelabel-friction">
        <div className="shell">
          <div className="whitelabel-friction__top reveal">
            <div>
              <p className="eyebrow">The friction</p>
              <h2 className="section-heading">
                Why doing it yourself usually stalls.
              </h2>
            </div>
            <p className="section-copy">
              Clients ask for AI. The gap isn&apos;t demand—it&apos;s the cost of
              becoming the team that can deliver it.
            </p>
          </div>
          <div className="whitelabel-list reveal">
            {friction.map((item, index) => (
              <article className="whitelabel-row" key={item.title}>
                <span className="whitelabel-row__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section whitelabel-benefits">
        <div className="shell">
          <div className="whitelabel-benefits__top reveal">
            <div>
              <p className="eyebrow">What you get</p>
              <h2 className="section-heading">
                White-label delivery. Your name on the win.
              </h2>
            </div>
            <p className="section-copy">
              Expand what you can sell—without the complexity, the learning
              curve, or a new bench to hire.
            </p>
          </div>
          <div className="whitelabel-list reveal">
            {benefits.map((item, index) => (
              <article className="whitelabel-row" key={item.title}>
                <span className="whitelabel-row__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section whitelabel-flow" id="how-it-works">
        <div className="shell">
          <div className="whitelabel-flow__top reveal">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-heading">
                Simple partnership. Clear ownership.
              </h2>
            </div>
            <p className="section-copy">
              You stay close to the client. We handle the work that turns a
              conversation into a working automation.
            </p>
          </div>
          <ol className="whitelabel-flow__steps reveal">
            {steps.map((step, index) => (
              <li className="whitelabel-flow__step" key={step.title}>
                {index > 0 ? (
                  <span className="whitelabel-flow__connector" aria-hidden="true">
                    <svg viewBox="0 0 80 24" fill="none">
                      <path
                        className="whitelabel-flow__connector-line"
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
                <span className="whitelabel-flow__number">
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

export function WhitelabelCta() {
  return (
    <section className="section use-cases-cta">
      <div className="shell use-cases-cta__content reveal">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="section-heading">
            Add automation to your offer—without the overhead.
          </h2>
        </div>
        <div className="use-cases-cta__actions">
          <p className="section-copy">
            Tell us who you serve and what clients are asking for. We&apos;ll
            map a practical white-label path from first conversation to
            delivery.
          </p>
          <div className="use-cases-cta__buttons">
            <a
              className="button button-primary"
              href="mailto:hello@grandriverlabs.com?subject=White-label%20partnership"
            >
              Talk about partnering
              <Arrow />
            </a>
            <a className="button button-secondary" href="/#contact">
              Get in touch
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
