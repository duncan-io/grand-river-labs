const cards = [
  {
    label: "Today",
    value: "30 booked jobs",
    copy: "$8,000 a month in ads brings in 100 leads, and 30% of them book.",
    featured: false,
  },
  {
    label: "After the patch",
    value: "36 booked jobs",
    copy: "Faster pages, better forms and same-day follow-up lift booking to 36%.",
    featured: false,
  },
  {
    label: "The difference",
    value: "+72 jobs a year",
    copy: "Six more booked jobs every month from the same ad spend, for as long as the patch stays in place.",
    featured: true,
  },
];

export function FixValueSection() {
  return (
    <section className="section fix-value" id="what-a-fix-is-worth">
      <div className="shell">
        <div className="services__top reveal">
          <div>
            <p className="eyebrow">The math</p>
            <h2 className="section-heading">What a fix is worth.</h2>
          </div>
          <p className="section-copy">
            An illustration of what patching one leak looks like. Same ad
            spend, more booked jobs — and most sites have more than one leak.
          </p>
        </div>

        <ol className="fix-value__compare reveal">
          {cards.map((card) => (
            <li key={card.label}>
              <article
                className={
                  card.featured
                    ? "fix-value__card fix-value__card--difference"
                    : "fix-value__card"
                }
              >
                <p className="fix-value__label">{card.label}</p>
                <p className="fix-value__value">{card.value}</p>
                <p className="fix-value__note">{card.copy}</p>
              </article>
            </li>
          ))}
        </ol>

        <p className="fix-value__note fix-value__note--disclaimer reveal">
          The numbers are an example, not a client result.
        </p>
      </div>
    </section>
  );
}
