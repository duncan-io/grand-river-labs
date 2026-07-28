import { Arrow } from "./site-header";

const audience = [
  {
    title: "Agencies",
    copy: "You already advise clients on ops, marketing, or tech. Add automation to the offer without staffing a delivery team.",
    motif: "agencies" as const,
  },
  {
    title: "Consultants",
    copy: "You see the bottlenecks. We turn those recommendations into working automations—under your name.",
    motif: "consultants" as const,
  },
  {
    title: "Freelancers",
    copy: "You own the relationship. We handle the build so you can sell the outcome without learning the stack.",
    motif: "freelancers" as const,
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
    motif: "brand" as const,
  },
  {
    title: "You keep the client",
    copy: "You own the conversation and the account. We show up as your delivery bench, not a competing agency.",
    motif: "keep" as const,
  },
  {
    title: "Discovery through support",
    copy: "We map the bottleneck, build the automation, and stay with it—so you’re not left holding a brittle demo.",
    motif: "support" as const,
  },
  {
    title: "Fits how they already work",
    copy: "Practical automations around their current tools and workflows. No rip-and-replace. No jargon theater.",
    motif: "fits" as const,
  },
];

const steps = [
  {
    title: "Introduce",
    copy: "You bring the client and the context. We listen, map the work, and scope what will actually save time, labor, and money.",
    motif: "introduce" as const,
  },
  {
    title: "We deliver under your brand",
    copy: "We build and launch the automation. You stay the face of the engagement—we stay the engine.",
    motif: "deliver" as const,
  },
  {
    title: "You own the relationship",
    copy: "Results land with your client. You deepen the account; we refine and support so the savings keep compounding.",
    motif: "own" as const,
  },
];

type AudienceMotifVariant = (typeof audience)[number]["motif"];
type BenefitMotifVariant = (typeof benefits)[number]["motif"];
type PartnershipMotifVariant = (typeof steps)[number]["motif"];

function AudienceMotif({ variant }: { variant: AudienceMotifVariant }) {
  return (
    <svg
      className={`whitelabel-persona__motif whitelabel-persona__motif--${variant}`}
      aria-hidden="true"
      viewBox="0 0 280 160"
      fill="none"
    >
      <defs>
        <linearGradient id={`wl-aud-node-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id={`wl-aud-hub-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
      </defs>

      {variant === "agencies" ? (
        <>
          {[
            { x: 28, y: 36, delay: "0s" },
            { x: 28, y: 88, delay: "0.35s" },
            { x: 92, y: 62, delay: "0.7s" },
          ].map((tile) => (
            <g
              key={`${tile.x}-${tile.y}`}
              className="whitelabel-motif__node"
              style={{ animationDelay: tile.delay }}
            >
              <rect
                x={tile.x}
                y={tile.y}
                width="48"
                height="36"
                rx="6"
                fill={`url(#wl-aud-node-${variant})`}
                stroke="#057A72"
                strokeWidth="1.5"
              />
              <path
                d={`M${tile.x + 10} ${tile.y + 14}h28M${tile.x + 10} ${tile.y + 22}h18`}
                stroke="#5F7976"
                strokeWidth="2"
                strokeLinecap="round"
                opacity=".35"
              />
            </g>
          ))}
          <path
            className="whitelabel-motif__path"
            d="M76 54 H 168 M76 106 H 168 M140 80 H 168"
            stroke="#057A72"
            strokeWidth="1.75"
            strokeDasharray="5 8"
            opacity=".55"
          />
          <g className="whitelabel-motif__hub">
            <circle
              className="whitelabel-motif__hub-ring whitelabel-motif__hub-ring--outer"
              cx="210"
              cy="80"
              r="42"
              stroke="#6FB8B0"
              strokeWidth="1"
              opacity=".45"
            />
            <circle
              className="whitelabel-motif__hub-ring"
              cx="210"
              cy="80"
              r="30"
              stroke="#057A72"
              strokeWidth="1.25"
              opacity=".4"
            />
            <circle
              cx="210"
              cy="80"
              r="22"
              fill={`url(#wl-aud-hub-${variant})`}
            />
            <path
              d="M200 80h20M210 70v20"
              stroke="#F5FCFB"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity=".85"
            />
          </g>
          <circle className="whitelabel-motif__packet" r="4" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.25">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M76 54 H 188" />
          </circle>
          <circle className="whitelabel-motif__packet" r="3.5" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.25" opacity=".8">
            <animateMotion dur="3.8s" begin="0.6s" repeatCount="indefinite" path="M76 106 H 188" />
          </circle>
        </>
      ) : null}

      {variant === "consultants" ? (
        <>
          <rect
            x="32"
            y="34"
            width="100"
            height="92"
            rx="10"
            fill={`url(#wl-aud-node-${variant})`}
            stroke="#057A72"
            strokeWidth="1.5"
          />
          <path
            d="M52 58 H 112 M52 78 H 98 M52 98 H 106"
            stroke="#3A948C"
            strokeWidth="2.25"
            strokeLinecap="round"
            opacity=".4"
          />
          <circle className="whitelabel-motif__find" cx="88" cy="98" r="6" fill="#057A72" opacity=".45" />
          <path
            className="whitelabel-motif__path"
            d="M132 80 H 168"
            stroke="#057A72"
            strokeWidth="2"
            strokeDasharray="5 7"
          />
          <g className="whitelabel-motif__hub">
            <circle
              className="whitelabel-motif__hub-ring"
              cx="208"
              cy="80"
              r="34"
              stroke="#6FB8B0"
              strokeWidth="1.25"
              opacity=".5"
            />
            <circle cx="208" cy="80" r="24" fill={`url(#wl-aud-hub-${variant})`} />
            <circle cx="208" cy="80" r="6" fill="#F5FCFB" opacity=".75" />
          </g>
          <circle className="whitelabel-motif__packet" r="4" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.25">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M132 80 H 184" />
          </circle>
        </>
      ) : null}

      {variant === "freelancers" ? (
        <>
          <g className="whitelabel-motif__engine" opacity=".75">
            <path
              d="M168 48c40-28 86-32 128-8v80c-48 28-96 20-128-8V48Z"
              fill={`url(#wl-aud-hub-${variant})`}
            />
            <path
              d="M188 78h72M188 98h52"
              stroke="#EAF9F7"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity=".45"
            />
            <circle
              className="whitelabel-motif__hub-ring"
              cx="248"
              cy="88"
              r="14"
              stroke="#EAF9F7"
              strokeWidth="1.5"
              opacity=".55"
            />
          </g>
          <g className="whitelabel-motif__facade">
            <rect
              x="48"
              y="36"
              width="120"
              height="96"
              rx="10"
              fill={`url(#wl-aud-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <rect x="48" y="36" width="120" height="28" rx="10" fill="#CDEBE6" opacity=".85" />
            <rect x="48" y="52" width="120" height="12" fill="#CDEBE6" opacity=".85" />
            <text
              x="108"
              y="56"
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="11"
              fontWeight="600"
              letterSpacing="1"
              opacity=".75"
            >
              YOUR BRAND
            </text>
            <path
              d="M68 84h72M68 100h52"
              stroke="#5F7976"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity=".35"
            />
            <rect x="68" y="112" width="40" height="12" rx="3" fill="#057A72" opacity=".8" />
          </g>
        </>
      ) : null}
    </svg>
  );
}

function BenefitMotif({ variant }: { variant: BenefitMotifVariant }) {
  return (
    <svg
      className={`whitelabel-benefit__motif whitelabel-benefit__motif--${variant}`}
      aria-hidden="true"
      viewBox="0 0 280 160"
      fill="none"
    >
      <defs>
        <linearGradient id={`wl-ben-node-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id={`wl-ben-hub-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
      </defs>

      {variant === "brand" ? (
        <>
          <g className="whitelabel-motif__engine" opacity=".7">
            <path
              d="M150 42c48-32 100-36 148-6v92c-56 32-110 22-148-10V42Z"
              fill={`url(#wl-ben-hub-${variant})`}
            />
            <path
              d="M176 78h80M176 98h58"
              stroke="#EAF9F7"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity=".4"
            />
            <circle
              className="whitelabel-motif__hub-ring"
              cx="236"
              cy="88"
              r="16"
              stroke="#EAF9F7"
              strokeWidth="1.5"
              opacity=".5"
            />
          </g>
          <g className="whitelabel-motif__facade">
            <rect
              x="36"
              y="28"
              width="132"
              height="108"
              rx="12"
              fill={`url(#wl-ben-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <rect x="36" y="28" width="132" height="30" rx="12" fill="#CDEBE6" opacity=".9" />
            <rect x="36" y="46" width="132" height="12" fill="#CDEBE6" opacity=".9" />
            <text
              x="102"
              y="50"
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="12"
              fontWeight="600"
              letterSpacing="1.2"
              opacity=".8"
            >
              YOUR BRAND
            </text>
            <path
              d="M58 82h88M58 100h64"
              stroke="#5F7976"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity=".35"
            />
            <rect x="58" y="114" width="48" height="14" rx="3" fill="#057A72" opacity=".85" />
          </g>
        </>
      ) : null}

      {variant === "keep" ? (
        <>
          <g className="whitelabel-motif__node" style={{ animationDelay: "0s" }}>
            <circle
              cx="64"
              cy="80"
              r="28"
              fill={`url(#wl-ben-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.75"
            />
            <text
              x="64"
              y="85"
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="11"
              fontWeight="600"
              opacity=".8"
            >
              YOU
            </text>
          </g>
          <path
            className="whitelabel-motif__path"
            d="M92 80 H 168"
            stroke="#057A72"
            strokeWidth="2"
            strokeDasharray="5 7"
          />
          <g className="whitelabel-motif__node" style={{ animationDelay: "0.5s" }}>
            <circle
              cx="196"
              cy="80"
              r="28"
              fill={`url(#wl-ben-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.75"
            />
            <text
              x="196"
              y="85"
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="11"
              fontWeight="600"
              opacity=".8"
            >
              CLIENT
            </text>
          </g>
          <g className="whitelabel-motif__hub" opacity=".55" transform="translate(0 0)">
            <circle cx="250" cy="128" r="16" fill={`url(#wl-ben-hub-${variant})`} />
            <path
              d="M244 128h12M250 122v12"
              stroke="#F5FCFB"
              strokeWidth="1.75"
              strokeLinecap="round"
              opacity=".8"
            />
          </g>
          <path
            d="M220 100 C 232 112, 240 118, 246 122"
            stroke="#6FB8B0"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            opacity=".45"
          />
          <circle className="whitelabel-motif__packet" r="4" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.25">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M92 80 H 168" />
          </circle>
        </>
      ) : null}

      {variant === "support" ? (
        <>
          {/* Discover — map / doc with magnifier */}
          <g className="whitelabel-motif__node">
            <rect
              x="18"
              y="36"
              width="72"
              height="88"
              rx="10"
              fill={`url(#wl-ben-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <path
              d="M34 58 H 74 M34 74 H 66 M34 90 H 70 M34 106 H 58"
              stroke="#3A948C"
              strokeWidth="2"
              strokeLinecap="round"
              opacity=".35"
            />
            <circle className="whitelabel-motif__find" cx="58" cy="90" r="5" fill="#057A72" opacity=".4" />
            <g className="whitelabel-motif__magnifier">
              <circle
                cx="72"
                cy="108"
                r="16"
                fill="rgba(247, 255, 254, 0.55)"
                stroke="#057A72"
                strokeWidth="3"
              />
              <circle cx="72" cy="108" r="11" fill="none" stroke="#6FB8B0" strokeWidth="1.1" opacity=".7" />
              <path
                d="M84 120 L96 134"
                stroke="#075752"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
          </g>

          <path
            className="whitelabel-motif__path"
            d="M98 80 H 122"
            stroke="#057A72"
            strokeWidth="1.75"
            strokeDasharray="4 6"
            opacity=".55"
          />

          {/* Build — hub forming */}
          <g className="whitelabel-motif__hub">
            <circle
              className="whitelabel-motif__hub-ring whitelabel-motif__hub-ring--outer"
              cx="148"
              cy="80"
              r="34"
              stroke="#6FB8B0"
              strokeWidth="1"
              opacity=".45"
            />
            <circle
              className="whitelabel-motif__hub-ring"
              cx="148"
              cy="80"
              r="24"
              stroke="#057A72"
              strokeWidth="1.25"
              opacity=".4"
            />
            <circle cx="148" cy="80" r="18" fill={`url(#wl-ben-hub-${variant})`} />
            <path
              d="M140 80h16M148 72v16"
              stroke="#F5FCFB"
              strokeWidth="2.25"
              strokeLinecap="round"
              opacity=".9"
            />
          </g>

          <path
            className="whitelabel-motif__path"
            d="M174 80 H 198"
            stroke="#057A72"
            strokeWidth="1.75"
            strokeDasharray="4 6"
            opacity=".55"
            style={{ animationDelay: "0.5s" }}
          />

          {/* Support — monitor wall */}
          <g className="whitelabel-motif__node" style={{ animationDelay: "0.6s" }}>
            <rect
              x="198"
              y="36"
              width="68"
              height="88"
              rx="10"
              fill={`url(#wl-ben-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.5"
            />
            <rect
              x="210"
              y="50"
              width="44"
              height="28"
              rx="4"
              fill="#EAF9F7"
              stroke="#057A72"
              strokeWidth="1"
              opacity=".7"
            />
            <path
              className="whitelabel-motif__path"
              d="M216 68 C 222 58, 228 78, 234 64 C 238 54, 244 72, 250 66"
              stroke="#057A72"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <circle className="whitelabel-motif__find" cx="232" cy="100" r="5" fill="#057A72" opacity=".55" />
            <path
              d="M214 112 H 250 M214 122 H 242"
              stroke="#3A948C"
              strokeWidth="2"
              strokeLinecap="round"
              opacity=".3"
            />
          </g>

          <circle className="whitelabel-motif__packet" r="3.5" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.15">
            <animateMotion dur="4s" repeatCount="indefinite" path="M90 80 H 122 H 174 H 206" />
          </circle>
        </>
      ) : null}

      {variant === "fits" ? (
        <>
          {/* Existing tools stay put — one bridge zigzags through all of them */}
          {[
            { x: 22, y: 28, label: "CRM", delay: "0s" },
            { x: 108, y: 28, label: "Mail", delay: "0.25s" },
            { x: 194, y: 28, label: "Sheets", delay: "0.5s" },
            { x: 64, y: 100, label: "Ops", delay: "0.75s" },
            { x: 150, y: 100, label: "Chat", delay: "1s" },
          ].map((tool) => (
            <g
              key={tool.label}
              className="whitelabel-motif__node"
              style={{ animationDelay: tool.delay }}
            >
              <rect
                x={tool.x}
                y={tool.y}
                width="64"
                height="30"
                rx="8"
                fill={`url(#wl-ben-node-${variant})`}
                stroke="#057A72"
                strokeWidth="1.4"
              />
              <text
                x={tool.x + 32}
                y={tool.y + 20}
                textAnchor="middle"
                fill="#075752"
                fontSize="11"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
                opacity=".85"
              >
                {tool.label}
              </text>
            </g>
          ))}

          <path
            className="whitelabel-motif__path"
            d="M54 43 L 96 115 L 140 43 L 182 115 L 226 43"
            stroke="#057A72"
            strokeWidth="1.75"
            strokeDasharray="5 8"
            opacity=".55"
            fill="none"
          />

          <circle className="whitelabel-motif__packet" r="3.5" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.1">
            <animateMotion
              dur="4.8s"
              repeatCount="indefinite"
              path="M54 43 L 96 115 L 140 43 L 182 115 L 226 43"
            />
          </circle>
        </>
      ) : null}
    </svg>
  );
}

function PartnershipMotif({ variant }: { variant: PartnershipMotifVariant }) {
  return (
    <svg
      className={`whitelabel-flow__motif whitelabel-flow__motif--${variant}`}
      aria-hidden="true"
      viewBox="0 0 320 220"
      fill="none"
    >
      <defs>
        <linearGradient id={`wl-flow-node-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F7FFFE" />
          <stop offset="1" stopColor="#CCEBE5" />
        </linearGradient>
        <linearGradient id={`wl-flow-hub-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6FB8B0" />
          <stop offset="1" stopColor="#057A72" />
        </linearGradient>
      </defs>

      {variant === "introduce" ? (
        <>
          {/* Us supports you — sits behind the partner */}
          <g className="whitelabel-motif__hub" opacity=".85">
            <circle
              className="whitelabel-motif__hub-ring"
              cx="78"
              cy="148"
              r="26"
              stroke="#6FB8B0"
              strokeWidth="1.25"
              opacity=".45"
            />
            <circle cx="78" cy="148" r="20" fill={`url(#wl-flow-hub-${variant})`} />
            <text
              x="78"
              y="153"
              textAnchor="middle"
              fill="#F5FCFB"
              fontFamily="Georgia, serif"
              fontSize="12"
              fontWeight="600"
              opacity=".95"
            >
              US
            </text>
          </g>
          <path
            className="whitelabel-motif__path"
            d="M78 128 V 106"
            stroke="#057A72"
            strokeWidth="1.75"
            strokeDasharray="4 6"
            opacity=".55"
          />

          {/* You own the intro to the client */}
          <g className="whitelabel-motif__node">
            <circle
              cx="78"
              cy="78"
              r="32"
              fill={`url(#wl-flow-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.75"
            />
            <text
              x="78"
              y="83"
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="14"
              fontWeight="600"
              opacity=".85"
            >
              YOU
            </text>
          </g>

          <path
            className="whitelabel-motif__path"
            d="M110 78 H 210"
            stroke="#057A72"
            strokeWidth="2.25"
            strokeDasharray="6 8"
          />
          <path
            d="M200 68l14 10-14 10"
            stroke="#057A72"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity=".7"
          />

          <g className="whitelabel-motif__node" style={{ animationDelay: "0.4s" }}>
            <circle
              cx="242"
              cy="78"
              r="32"
              fill={`url(#wl-flow-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.75"
            />
            <text
              x="242"
              y="83"
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="12"
              fontWeight="600"
              opacity=".85"
            >
              CLIENT
            </text>
          </g>

          <circle className="whitelabel-motif__packet" r="4.5" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.25">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M110 78 H 210" />
          </circle>
        </>
      ) : null}

      {variant === "deliver" ? (
        <>
          <g className="whitelabel-motif__engine" opacity=".78">
            <path
              d="M168 48c56-40 120-44 168-8v140c-64 40-128 28-168-16V48Z"
              fill={`url(#wl-flow-hub-${variant})`}
            />
            <path
              d="M198 100h96M198 128h72M198 156h84"
              stroke="#EAF9F7"
              strokeWidth="3"
              strokeLinecap="round"
              opacity=".4"
            />
            <circle
              className="whitelabel-motif__hub-ring"
              cx="268"
              cy="128"
              r="22"
              stroke="#EAF9F7"
              strokeWidth="2"
              opacity=".5"
            />
            <circle cx="268" cy="128" r="10" fill="#F5FCFB" opacity=".55" />
          </g>
          <g className="whitelabel-motif__facade">
            <rect
              x="36"
              y="42"
              width="148"
              height="140"
              rx="14"
              fill={`url(#wl-flow-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.75"
            />
            <rect x="36" y="42" width="148" height="36" rx="14" fill="#CDEBE6" opacity=".9" />
            <rect x="36" y="64" width="148" height="14" fill="#CDEBE6" opacity=".9" />
            <text
              x="110"
              y="68"
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="14"
              fontWeight="600"
              letterSpacing="1.4"
              opacity=".8"
            >
              YOUR BRAND
            </text>
            <path
              d="M60 108h96M60 132h72M60 156h84"
              stroke="#5F7976"
              strokeWidth="3"
              strokeLinecap="round"
              opacity=".32"
            />
            <rect x="60" y="168" width="56" height="16" rx="4" fill="#057A72" opacity=".85" />
          </g>
        </>
      ) : null}

      {variant === "own" ? (
        <>
          <g className="whitelabel-motif__node">
            <circle
              cx="90"
              cy="100"
              r="40"
              fill={`url(#wl-flow-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.75"
            />
            <text
              x="90"
              y="106"
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="14"
              fontWeight="600"
              opacity=".8"
            >
              YOU
            </text>
          </g>
          <path
            className="whitelabel-motif__path"
            d="M130 100 H 210"
            stroke="#057A72"
            strokeWidth="2.25"
            strokeDasharray="6 8"
          />
          <g className="whitelabel-motif__node" style={{ animationDelay: "0.45s" }}>
            <circle
              cx="250"
              cy="100"
              r="40"
              fill={`url(#wl-flow-node-${variant})`}
              stroke="#057A72"
              strokeWidth="1.75"
            />
            <text
              x="250"
              y="106"
              textAnchor="middle"
              fill="#075752"
              fontFamily="Georgia, serif"
              fontSize="13"
              fontWeight="600"
              opacity=".8"
            >
              CLIENT
            </text>
          </g>
          <g className="whitelabel-motif__hub" opacity=".6">
            <circle
              className="whitelabel-motif__hub-ring whitelabel-motif__hub-ring--outer"
              cx="170"
              cy="178"
              r="28"
              stroke="#6FB8B0"
              strokeWidth="1"
            />
            <circle
              className="whitelabel-motif__hub-ring"
              cx="170"
              cy="178"
              r="18"
              stroke="#057A72"
              strokeWidth="1.25"
              opacity=".45"
            />
            <circle cx="170" cy="178" r="12" fill={`url(#wl-flow-hub-${variant})`} />
          </g>
          <path
            d="M170 140 V 160"
            stroke="#6FB8B0"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            opacity=".5"
          />
          <circle className="whitelabel-motif__packet" r="5" fill="#FFFDF4" stroke="#057A72" strokeWidth="1.25">
            <animateMotion dur="3s" repeatCount="indefinite" path="M130 100 H 210" />
          </circle>
        </>
      ) : null}
    </svg>
  );
}

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
            <p className="eyebrow">Your clients are asking for AI</p>
            <p className="whitelabel-hero__brand">Grand River Labs</p>
            <h1 className="whitelabel-hero__headline">
              Offer automation. Keep the client. Skip the stack.
            </h1>
            <p className="whitelabel-hero__copy">
              Clients want workflows that save time and money. You keep the
              relationship and the margin. We design, build, and support under
              your brand—so you expand the offer without the stack, the hire, or
              the delivery risk.
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
                <div className="whitelabel-persona__visual">
                  <AudienceMotif variant={item.motif} />
                </div>
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
          <div className="whitelabel-friction__points reveal">
            {friction.map((item, index) => (
              <article className="whitelabel-point" key={item.title}>
                <span className="whitelabel-point__number">
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
          <div className="whitelabel-benefits__grid reveal">
            {benefits.map((item) => (
              <article className="whitelabel-benefit" key={item.title}>
                <div className="whitelabel-benefit__visual">
                  <BenefitMotif variant={item.motif} />
                </div>
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
          <ol className="whitelabel-flow__journey reveal">
            {steps.map((step, index) => {
              const flipped = index % 2 === 1;
              return (
                <li
                  className={`whitelabel-flow__row${flipped ? " whitelabel-flow__row--flip" : ""}`}
                  key={step.title}
                >
                  <div className="whitelabel-flow__marker" aria-hidden="true">
                    <span className="whitelabel-flow__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="whitelabel-flow__copy">
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                  <div className="whitelabel-flow__visual">
                    <PartnershipMotif variant={step.motif} />
                  </div>
                </li>
              );
            })}
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
