import {
  vendorRows,
  vendorReportedTotal,
  vendorVerifiedTotal,
  vendorBarMax,
} from "./content";

function GapBar({
  value,
  kind,
}: {
  value: number;
  kind: "reported" | "verified";
}) {
  return (
    <span className="lead-gap__bar-line">
      <span
        className={`lead-gap__bar lead-gap__bar--${kind}`}
        style={{ width: `calc((100% - 3.5rem) * ${value / vendorBarMax})` }}
        aria-hidden="true"
      />
      <span className={`lead-gap__value lead-gap__value--${kind}`}>
        {value}
        <span className="visually-hidden">
          {kind === "reported" ? " reported" : " verified"}
        </span>
      </span>
    </span>
  );
}

export function VendorGapChart() {
  return (
    <figure className="lead-gap reveal">
      <figcaption className="lead-gap__head">
        <span className="lead-gap__title">Leads, October · sample data</span>
        <span className="lead-gap__legend" aria-hidden="true">
          <span>
            <span className="lead-gap__swatch lead-gap__swatch--reported" />
            Vendor reported
          </span>
          <span>
            <span className="lead-gap__swatch lead-gap__swatch--verified" />
            Verified in your CRM
          </span>
        </span>
      </figcaption>
      <ul className="lead-gap__rows">
        {vendorRows.map((row) => (
          <li className="lead-gap__row" key={row.vendor}>
            <span className="lead-gap__vendor">
              <span className="lead-gap__name">{row.vendor}</span>
              <span className="lead-gap__covers">{row.covers}</span>
            </span>
            <span className="lead-gap__bars">
              <GapBar value={row.reported} kind="reported" />
              <GapBar value={row.verified} kind="verified" />
            </span>
          </li>
        ))}
      </ul>
      <div className="lead-gap__total">
        <p className="lead-gap__sums">
          <span>
            <span className="lead-gap__sum lead-gap__sum--reported">
              {vendorReportedTotal}
            </span>{" "}
            reported
          </span>
          <span>
            <span className="lead-gap__sum lead-gap__sum--verified">
              {vendorVerifiedTotal}
            </span>{" "}
            held up
          </span>
        </p>
        <p className="lead-gap__note">
          The other {vendorReportedTotal - vendorVerifiedTotal} were spam,
          duplicates, or never reached the CRM.
        </p>
      </div>
    </figure>
  );
}
