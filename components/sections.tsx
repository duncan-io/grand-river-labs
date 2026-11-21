import Image from "next/image";
import Link from "next/link";
import { BookCallLink } from "./book-call-link";
import { FiveStars } from "./five-stars";
import { testimonials } from "@/lib/testimonials";
import duncanPhoto from "@/public/team/duncan.png";
import { AUDIT_FEE, DIRECTOR_MONTHLY, formatUsd } from "@/lib/pricing";
import {
  directorNav,
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

type ProcessStep = {
  title: string;
  copy: string;
  artifact: string;
  /** Optional line on who decides; used once so "final say" isn't repeated. */
  roles?: string;
};

const processSteps: ProcessStep[] = [
  {
    title: "Audit",
    copy: "Month one, I learn your whole marketing picture: every channel, what you spend on it, who does the work, and which leads turn into booked jobs.",
    artifact: "A clear read on what each channel and vendor is booking.",
  },
  {
    title: "Plan",
    copy: "We set the plan together: where to invest next, what to stop, and what each channel is for, from SEO and ads to your Google Business Profile and website. Each priority gets an owner.",
    artifact: "A written plan and budget for the quarter.",
    roles: "I recommend; you keep the final say.",
  },
  {
    title: "Check",
    copy: "Every month I put what your vendors report next to the jobs you booked, and we make the next call together: fund it, pause it, or fix it.",
    artifact: "A monthly read on what booked, and the next call made.",
  },
];

type Offer = {
  title: string;
  /** Price or short tag shown with the title. */
  tag?: string;
  copy: string;
  href: string;
  linkLabel?: string;
};

/* Ways to work together. Edit, add or reorder offers here; the layout follows. */
const primaryOffer: Offer = {
  title: "Fractional marketing director",
  tag: `From ${formatUsd(DIRECTOR_MONTHLY)}/mo`,
  copy: "Senior marketing leadership, part-time: a weekly meeting, a written plan and budget, and a straight answer on each channel.",
  href: directorNav.href,
  linkLabel: "More on the director role",
};

const moreOffers: Offer[] = [
  {
    title: "Lead leak audit",
    tag: `${formatUsd(AUDIT_FEE)} flat`,
    copy: "A two-week look at where leads slip away after the click.",
    href: "/lead-leak-audit",
  },
  {
    title: leadSystemNav.label,
    copy: "Cost per lead and per booked job, for every vendor.",
    href: leadSystemNav.href,
  },
  {
    title: leadQualificationNav.label,
    copy: "A fast reply and a score for every new lead.",
    href: leadQualificationNav.href,
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

export function HowIWorkSection() {
  return (
    <section className="section process" id="how-we-work">
      <div className="shell">
        <div className="process__top reveal">
          <div>
            <p className="eyebrow">How I work</p>
            <h2 className="section-heading">
              See what&apos;s working, set the plan, check what books.
            </h2>
          </div>
          <p className="section-copy">
            One senior person who decides where your marketing goes next and
            checks that it&apos;s paying off, whether your leads live in a CRM
            or a spreadsheet.
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
              companies. When you hire Grand River Labs, you work with me
              directly.
            </p>
          </div>
        </div>

        <ol className="process__cards reveal" aria-label="How I work">
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
              {step.roles ? (
                <p className="process__roles">{step.roles}</p>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="process__footer reveal">
          <p className="process__loop">
            Then we do it again, same person, tighter plan.
          </p>
          <BookCallLink className="button button-primary">
            Book a call
            <Arrow />
          </BookCallLink>
        </div>
      </div>
    </section>
  );
}

export function WaysToWorkSection() {
  return (
    <section className="section ways" id="ways">
      <div className="shell">
        <div className="ways__top reveal">
          <p className="eyebrow">Ways to work together</p>
          <h2 className="section-heading">
            Start with a director. Bring in the rest when you need it.
          </h2>
        </div>

        <article className="ways__primary reveal">
          <div>
            <h3 className="ways__primary-title">{primaryOffer.title}</h3>
            {primaryOffer.tag ? (
              <p className="ways__primary-tag">{primaryOffer.tag}</p>
            ) : null}
          </div>
          <div>
            <p className="ways__primary-copy">{primaryOffer.copy}</p>
            <Link className="ways__primary-link" href={primaryOffer.href}>
              {primaryOffer.linkLabel ?? `See the ${primaryOffer.title}`}
              <Arrow />
            </Link>
          </div>
        </article>

        <p className="ways__more-label reveal">
          Alongside your director, or on their own
        </p>
        <ul className="ways__more reveal">
          {moreOffers.map((offer) => (
            <li key={offer.href}>
              <Link href={offer.href}>
                <span className="ways__more-title">
                  {offer.title}
                  {offer.tag ? (
                    <span className="ways__more-tag"> · {offer.tag}</span>
                  ) : null}
                </span>
                <span className="ways__more-copy">{offer.copy}</span>
              </Link>
            </li>
          ))}
        </ul>
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
            remodeling, windows and home improvement.
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
