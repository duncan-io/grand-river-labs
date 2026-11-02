import { Arrow } from "./site-header";

const steps = [
  {
    label: "Today",
    value: "30",
    unit: "/mo",
    copy: "booked jobs from 100 leads on $8,000 a month in ads",
    total: false,
  },
  {
    label: "After the patch",
    value: "36",
    unit: "/mo",
    copy: "faster pages, better forms and same-day follow-up",
    total: false,
  },
  {
    label: "The difference",
    value: "+72",
    unit: "/yr",
    copy: "more booked jobs from the same ad spend",
    total: true,
  },
];

export function FixValueSection() {
  return (
    <section className="section fix-value" id="what-a-fix-is-worth">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">The math</p>
            <h2 className="section-heading">What patching one leak is worth.</h2>
          </div>
          <p className="section-copy">
            An illustration of what patching one leak looks like. Same ad
            spend, more booked jobs — and most sites have more than one leak.
          </p>
        </div>

        <ol className="fix-value__equation reveal">
          {steps.map((step) => (
            <li
              className={
                step.total
                  ? "fix-value__term fix-value__term--total"
                  : "fix-value__term"
              }
              key={step.label}
            >
              <p className="fix-value__label">{step.label}</p>
              <p className="fix-value__value">
                {step.value}
                <span className="fix-value__unit">{step.unit}</span>
              </p>
              <p className="fix-value__note">{step.copy}</p>
            </li>
          ))}
        </ol>

        <div className="fix-value__footer reveal">
          <p className="fix-value__disclaimer">
            The numbers are an example, not a client result.
          </p>
          <a className="fix-value__more" href="/lead-leak-audit">
            Find your leaks
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
