import Image from "next/image";
import Link from "next/link";
import { BookCallLink } from "./book-call-link";
import { FiveStars } from "./five-stars";
import { testimonials } from "@/lib/testimonials";
import duncanPhoto from "@/public/team/duncan.png";
import {
  industriesNav,
  leadQualificationNav,
  leadSystemNav,
} from "./what-we-do-nav";
import { Arrow } from "./icons";
import "./sections.css";

const featuredCaseStudy = {
  href: "/case-studies/38-hvac-brand-sites",
  stat: "+78%",
  label: "Organic leads, year over year",
  client: "Midwest HVAC consolidator · 38 brands",
  summary:
    "Ownership, one content strategy run across every brand, and conversion work on the pages that already had traffic.",
};

const decisions = [
  {
    title: "Sets the plan",
    copy: "Where to invest next, what to stop, and what the next quarter looks like, written down with a budget against it. You keep the final say.",
  },
  {
    title: "Decides channel by channel",
    copy: "SEO, paid ads and Local Services Ads, your Google Business Profile, your website: what each one should be doing for you, and whether it has earned another dollar.",
  },
  {
    title: "Counts booked jobs",
    copy: "What each dollar booked, not what a report says it did. It works the same whether your leads live in a CRM or a spreadsheet.",
  },
  {
    title: "Checks whoever does the work",
    copy: "One agency or five. I brief them on the plan, check their numbers against the jobs you booked, and tell you when one has stopped earning its fee.",
  },
  {
    title: "Finds where leads get lost",
    copy: "Missed calls, forms that go nowhere, replies that take three days. Each one is ranked by what it costs you, with who should fix it.",
  },
  {
    title: "Gets more from what you have",
    copy: "More calls from the visitors you already get, and a fast next step for every inquiry, before you spend more on traffic.",
  },
];

const systems = [
  {
    ...leadSystemNav,
    kicker: "See every lead",
    copy: "Every lead in one count, with what each lead cost and what each booked job cost. Every vendor is measured on the same numbers, so you can see who is earning their fee.",
  },
  {
    ...leadQualificationNav,
    kicker: "Talk to real prospects",
    copy: "Form leads and missed calls get a text back within a minute. Every lead is then screened and scored: spam, renters and jobs outside your area are sorted out, and the best ones go on your estimator's calendar. You only talk to real prospects.",
  },
];

const processSteps = [
  {
    title: "Audit",
    copy: "I trace every path from the click or the call to the booked job: missed calls, forms, follow-up, and what your agency reports. You see where leads and money get lost.",
    artifact: "A leak map, ranked by what it's costing you.",
    roles: "You bring the context; I do the digging.",
  },
  {
    title: "Plan",
    copy: "We set the plan together: what to fix first, where to invest next, what to stop, and what next quarter's budget is for. Each fix gets an owner: your office, your vendor, or me.",
    artifact: "A written plan and budget for the quarter.",
    roles: "I recommend; you keep the final say.",
  },
  {
    title: "Check",
    copy: "Every month I set what your vendors report next to the jobs you actually booked, see what moved, and make the next call with you: fund it, pause it, or fix it.",
    artifact: "A monthly read on what booked, and the next call made.",
    roles: "I check the numbers; you decide.",
  },
];

/* The owner testimonial leads the homepage proof; the rest live on /work. */
const ownerTestimonial = testimonials[0];

const industryNotes: Record<
  (typeof industriesNav)[number]["href"],
  string
> = {
  "/home-improvement-marketing": "Established home improvement companies.",
  "/remodeling-marketing": "Design-build remodelers.",
  "/fractional-marketing-director/roofing": "Roofers running Local Services Ads.",
  "/fractional-marketing-director/contractors":
    "Trades and specialty contractors.",
};

export function FeaturedCaseStudy() {
  return (
    <section className="featured-study" aria-label="Featured case study">
      <div className="shell featured-study__layout">
        <p className="case-study-stat">
          <span className="case-study-stat__value">{featuredCaseStudy.stat}</span>
          <span className="case-study-stat__label">{featuredCaseStudy.label}</span>
        </p>
        <div>
          <p className="featured-study__client">{featuredCaseStudy.client}</p>
          <p className="featured-study__summary">{featuredCaseStudy.summary}</p>
          <Link className="featured-study__more" href={featuredCaseStudy.href}>
            Read the case study
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LeadershipSection() {
  return (
    <section className="section services" id="leadership">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">What your director does</p>
            <h2 className="section-heading">Sets the plan. Checks the work.</h2>
          </div>
          <p className="section-copy">
            One senior person who decides where your marketing goes next and
            checks that it&apos;s paying off. You keep the final say.
          </p>
        </div>

        <div className="director-intro reveal">
          <span className="director-intro__photo">
            <Image
              src={duncanPhoto}
              alt="Duncan McKee, founder of Grand River Labs"
              sizes="8rem"
              placeholder="blur"
            />
          </span>
          <div className="director-intro__body">
            <p className="director-intro__name">
              <strong>Duncan McKee</strong>
              <span>Founder · Grand Rapids, MI</span>
            </p>
            <p className="director-intro__copy">
              I&apos;ve sold marketing at an agency and bought it in-house,
              where I run the websites for a group of 38 home service
              companies. When you hire Grand River Labs, you work with me, not
              an account manager.
            </p>
          </div>
        </div>

        <ul className="services__grid reveal">
          {decisions.map((item) => (
            <li className="services__item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </li>
          ))}
        </ul>

        <p className="services__more reveal">
          <Link href="/fractional-marketing-director">
            See how the director engagement works →
          </Link>
        </p>
      </div>
    </section>
  );
}

export function SystemsSection() {
  return (
    <section className="section services" id="systems">
      {/* Keeps the old #services anchor working. */}
      <span className="anchor-alias" id="services" aria-hidden="true" />
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">Systems</p>
            <h2 className="section-heading">
              Two systems for the leads you already pay for.
            </h2>
          </div>
          <p className="section-copy">
            Each one is built into the phone line, forms and tools you already
            use. Buy either on its own, or run it alongside a director.
          </p>
        </div>

        <div className="lq-pair__cards reveal">
          {systems.map((item) => (
            <article className="lq-pair__card" key={item.href}>
              <p className="lq-pair__kicker">{item.kicker}</p>
              <h3>{item.label}</h3>
              <p>{item.copy}</p>
              <Link className="lq-pair__link" href={item.href}>
                See the {item.label}
                <Arrow />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProofSection() {
  return (
    <section className="section testimonials" id="testimonials">
      <div className="shell">
        <div className="testimonials__top reveal">
          <p className="eyebrow">From clients</p>
          <h2 className="testimonials__heading">Less noise. Better calls.</h2>
          <p className="testimonials__more">
            <Link href="/work">See the work →</Link>
          </p>
        </div>
      </div>

      <div className="shell">
        <ul className="testimonials__grid reveal">
          <li>
            <blockquote className="testimonial">
              <span className="testimonial__head">
                <span className="testimonial__mark" aria-hidden="true">
                  “
                </span>
                <FiveStars />
              </span>
              <p className="testimonial__quote">{ownerTestimonial.quote}</p>
              <footer className="testimonial__attribution">
                <cite className="testimonial__name">
                  {ownerTestimonial.name}
                </cite>
                <span className="testimonial__role">
                  {ownerTestimonial.role}
                </span>
              </footer>
            </blockquote>
          </li>
          <li>
            <article className="testimonial testimonial--study">
              <span className="testimonial__role">One example</span>
              <p className="case-study-stat">
                <span className="case-study-stat__value">
                  {featuredCaseStudy.stat}
                </span>
                <span className="case-study-stat__label">
                  {featuredCaseStudy.label}
                </span>
              </p>
              <p className="featured-study__client">
                {featuredCaseStudy.client}
              </p>
              <p className="testimonial__quote">{featuredCaseStudy.summary}</p>
              <Link className="featured-study__more" href={featuredCaseStudy.href}>
                Read the case study
                <Arrow />
              </Link>
            </article>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section process" id="how-we-work">
      <div className="shell">
        <div className="process__top reveal">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="section-heading">Find it, plan it, prove it.</h2>
          </div>
          <p className="section-copy">
            Month one is an audit. After that, it&apos;s a monthly rhythm:
            check what booked, decide where the next dollar goes, and update
            the plan — not another slide deck.
          </p>
        </div>

        <ol className="process__cards reveal" aria-label="How it works">
          {processSteps.map((step, index) => (
            <li className="process__card" key={step.title}>
              {index > 0 ? (
                <span className="process__connector" aria-hidden="true">
                  →
                </span>
              ) : null}
              <span className="process__marker">
                <span className="process__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <h3>{step.title}</h3>
              <p className="process__copy">{step.copy}</p>
              <p className="process__artifact">
                <span className="process__meta-label">What you get</span>
                {step.artifact}
              </p>
              <p className="process__roles">{step.roles}</p>
            </li>
          ))}
        </ol>

        <div className="process__footer reveal">
          <p className="process__loop">
            Then we do it again—same person, tighter plan.
          </p>
          <div className="process__cta">
            <BookCallLink
              className="button button-primary"
            >
              Book a call
              <Arrow />
            </BookCallLink>
            <a className="process__contact-link" href="#contact">
              Or tell me what&apos;s getting in the way →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function UseCaseStrip() {
  return (
    <section className="section use-cases-strip" id="use-cases">
      <div className="shell">
        <div className="use-cases-strip__top reveal">
          <div>
            <p className="eyebrow">Who I work with</p>
            <h2 className="section-heading">
              Built for home service companies.
            </h2>
          </div>
          <p className="section-copy">
            Owner-run companies selling high-ticket work: roofing,
            remodeling, windows and home improvement. One job can be worth
            thousands, so one lost lead is expensive.
          </p>
        </div>

        <ul className="use-cases-strip__list reveal">
          {industriesNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <span className="use-cases-strip__title">{item.label}</span>
                <span className="use-cases-strip__copy">
                  {industryNotes[item.href]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
