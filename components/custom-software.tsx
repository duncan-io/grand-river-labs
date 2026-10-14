import Link from "next/link";
import { BOOK_CALL_HREF } from "@/lib/site";
import { Arrow } from "./site-header";

const paths = [
  {
    title: "A working example that needs to scale",
    copy: "You tried vibe coding—or another shortcut—and have something that works for you. It does not yet work for the team, the customers, or the next version.",
  },
  {
    title: "You already know custom is the fit",
    copy: "The workflow, or the way you win work, does not match an off-the-shelf product. Custom software is the right shape for the business.",
  },
];

const help = [
  {
    title: "From a prototype to something you can rely on",
    copy: "Take the working example and make it something the team and customers can use—structured, dependable, and ready to grow.",
  },
  {
    title: "Start from the job the software has to do",
    copy: "When there is no prototype yet, we begin with the work the software needs to carry and build from there.",
  },
  {
    title: "Stay understandable as the business changes",
    copy: "The software stays clear enough to change when the business does—without a rewrite every time the work shifts.",
  },
];

export function CustomSoftwareSections() {
  return (
    <>
      <section className="mkt-hero">
        <div className="shell">
          <div className="mkt-hero__content">
            <p className="eyebrow">Custom software</p>
            <h1 className="mkt-hero__headline">
              Custom software for the business you run.
            </h1>
            <p className="mkt-hero__copy">
              You may already have a working example, or you already know a
              packaged tool will not fit. Grand River Labs can help.
            </p>
            <div className="mkt-hero__actions">
              <a
                className="button button-primary"
                href={BOOK_CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
                <Arrow />
              </a>
              <a className="button button-secondary" href="#contact">
                Contact us
                <Arrow />
              </a>
            </div>
          </div>
        </div>
        <a className="mkt-hero__cue" href="#starting-points">
          Where to start
        </a>
      </section>

      <section className="section fwd-peace" id="starting-points">
        <div className="shell">
          <div className="fwd-peace__top reveal">
            <div>
              <p className="eyebrow">Where it starts</p>
              <h2 className="section-heading">Two ways this usually starts.</h2>
            </div>
            <p className="section-copy">
              Some clients arrive with a prototype. Others arrive with a clear
              need and no tool that covers it. Both are a place to begin.
            </p>
          </div>
          <div className="fwd-peace__paths reveal">
            {paths.map((path) => (
              <article className="fwd-peace__path" key={path.title}>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section analytics-friction" id="how-we-help">
        <div className="shell">
          <div className="analytics-friction__top reveal">
            <div>
              <p className="eyebrow">How we help</p>
              <h2 className="section-heading">What we take on.</h2>
            </div>
            <p className="section-copy">
              We turn a working example—or a clear need—into software the
              business can rely on.
            </p>
          </div>
          <div className="analytics-friction__list reveal">
            {help.map((item, index) => (
              <article className="analytics-friction__row" key={item.title}>
                <span className="analytics-friction__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="fwd-services__also reveal">
            <span className="fwd-services__also-label">A separate engagement</span>
            Custom software is its own engagement. Ongoing website, SEO, ads,
            and analytics live with the{" "}
            <Link className="inline-link" href="/fractional-digital-department">
              Fractional Digital Department
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
