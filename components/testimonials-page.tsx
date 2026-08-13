import { testimonials, formatTestimonialName } from "@/lib/testimonials";

export function TestimonialsPageContent() {
  return (
    <>
      <section className="section tp-hero">
        <div className="shell tp-hero__content reveal">
          <p className="eyebrow">From clients</p>
          <h1 className="section-heading tp-hero__headline">
            Results that feel personal.
          </h1>
          <p className="section-copy tp-hero__copy">
            Clarity and focus from people we&apos;ve worked with—local
            businesses and established brands alike.
          </p>
        </div>
      </section>

      <section className="section tp-quotes" aria-label="Client testimonials">
        <div className="shell">
          <div className="tp-quotes__list">
            {testimonials.map((item) => (
              <blockquote className="tp-quote reveal" key={item.name}>
                <span className="tp-quote__mark" aria-hidden="true">
                  “
                </span>
                <p className="tp-quote__body">{item.quote}</p>
                <footer className="tp-quote__attribution">
                  <cite className="tp-quote__name">
                    {formatTestimonialName(item.name)}
                  </cite>
                  <span className="tp-quote__role">{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
