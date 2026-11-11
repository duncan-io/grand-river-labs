import Image from "next/image";
import Link from "next/link";
import { BookCallLink } from "./book-call-link";
import { Arrow } from "./site-header";
import { testimonials } from "@/lib/testimonials";
import duncanPhoto from "@/public/team/duncan.png";

const profileFacts = [
  { label: "Role", value: "Founder, fractional marketing director" },
  { label: "You talk to", value: "Duncan, not an account manager" },
  { label: "Engagement", value: "One monthly rate, no long contracts" },
  { label: "Worked with", value: "Close to 100 businesses" },
  { label: "Based in", value: "Grand Rapids, Michigan" },
] as const;

const takeaways = [
  {
    title: "He's been the agency",
    copy: "So he knows which reports to trust, and which questions get a straight answer.",
  },
  {
    title: "He's run marketing for home service companies",
    copy: "Seasonal swings, phones that have to ring, techs who need booked jobs. This isn't new to him.",
  },
  {
    title: "He checks the numbers himself",
    copy: "Leads are matched against your CRM and your calls, not against a vendor's dashboard.",
  },
] as const;

const featuredTestimonial = testimonials[0];

export function AboutSections() {
  return (
    <>
      <section className="about-hero">
        <div className="shell about-hero__layout">
          <div className="about-hero__content">
            <p className="eyebrow">About GR Labs</p>
            <h1 className="about-hero__headline">
              <span>An agency sells you more marketing.</span>
              <span>A director tells you what marketing makes money.</span>
            </h1>
            <p className="about-hero__support">
              Grand River Labs is a fractional marketing director firm for
              owner-led growing businesses. We patch the leaks where leads are
              lost, verify which spend is actually working, and manage the
              vendors who do the rest. It&apos;s run by Duncan McKee, who has
              worked on both the agency side and the in-house side of home
              services marketing.
            </p>
            <div className="about-hero__actions">
              <BookCallLink className="button button-primary">
                Book a 30-minute fit call
                <Arrow />
              </BookCallLink>
              <Link
                className="about-hero__link"
                href="/fractional-marketing-director"
              >
                See how the fractional director works →
              </Link>
            </div>
          </div>

          <figure className="about-hero__figure">
            <div className="about-hero__halo" aria-hidden="true">
              <span className="about-hero__ring about-hero__ring--outer" />
              <span className="about-hero__ring about-hero__ring--inner" />
              <span className="about-hero__disc" />
            </div>
            <Image
              className="about-hero__photo"
              src={duncanPhoto}
              alt="Duncan McKee, founder of Grand River Labs"
              sizes="(max-width: 900px) 22rem, 34rem"
              placeholder="blur"
              preload
            />
            <figcaption className="about-hero__tag">
              <strong>Duncan McKee</strong>
              <span>Founder · Grand Rapids, MI</span>
            </figcaption>
            <p className="about-hero__chip" aria-hidden="true">
              <span className="about-hero__chip-dot" />
              ~100 businesses worked with
            </p>
          </figure>
        </div>
      </section>

      <section className="section about-profile" id="meet-duncan">
        <div className="shell about-profile__layout">
          <div className="about-profile__head reveal">
            <p className="eyebrow">Who you&apos;ll work with</p>
            <h2 className="section-heading">Duncan McKee</h2>
          </div>
          <div className="about-profile__story reveal">
            <p className="about-profile__lead">
              Duncan has spent his career on both sides of the table: first
              selling marketing at an agency, then buying it and answering for
              the results in-house.
            </p>
            <p>
              He started as an SEO strategist at a digital marketing agency and
              worked up to SEO manager, running search strategy for client
              businesses. That&apos;s where he learned how agencies sell, how
              they report on themselves, and how a report can look good while
              the phone stays quiet.
            </p>
            <p>
              Then he went in-house. He built and leads the website team for a
              group of 38 home service companies, and works across the
              marketing and lead operations around it: where leads come from,
              how calls get answered, how follow-up runs through the CRM, and
              whether the numbers tie back to booked jobs. Digital is his
              specialty, but he looks at the whole system. His budget, his
              results, no agency to blame.
            </p>
            <p>
              Along the way he built LocalScout, a tool that shows local
              businesses not just where they rank on Google Maps, but why their
              top competitors outrank them.
            </p>
            <p>
              He has worked with close to 100 businesses, from local
              mom-and-pop shops to nationwide franchise brands. The size
              changes.{" "}
              <strong>
                The people don&apos;t: an owner who needs straight answers, and
                a team counting on the phone to ring.
              </strong>
            </p>
            <p className="about-profile__signoff">
              Grand River Labs is built for that owner. You get someone in the
              director&apos;s seat, without a full-time hire.
            </p>
          </div>
          <dl className="about-profile__facts reveal">
            {profileFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section about-meaning" id="what-it-means">
        <div className="shell">
          <div className="about-changes__top reveal">
            <div>
              <p className="eyebrow">What that means for you</p>
              <h2 className="section-heading">
                Someone who has sat in your seat.
              </h2>
            </div>
            <p className="section-copy">
              You get a straight read on what&apos;s working, from someone
              who has had to answer for the results.
            </p>
          </div>
          <div className="about-changes__grid reveal">
            {takeaways.map((item) => (
              <article className="about-changes__card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          {featuredTestimonial ? (
            <figure className="about-meaning__quote reveal">
              <blockquote>
                <p>“{featuredTestimonial.highlight ?? featuredTestimonial.quote}”</p>
              </blockquote>
              <figcaption>
                {featuredTestimonial.name} · {featuredTestimonial.role}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>
    </>
  );
}
